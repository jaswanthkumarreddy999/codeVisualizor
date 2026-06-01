package com.codevisualizer.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import java.io.*;
import java.nio.file.*;
import java.util.*;
import java.util.regex.*;

@Service
public class JavaExecutionService {

    @Value("${app.tracer.java-class-path}")
    private String tracerClassPath;

    private final ObjectMapper mapper = new ObjectMapper();

    public Map<String, Object> execute(String code, String input) throws Exception {
        String id = UUID.randomUUID().toString().replace("-", "").substring(0, 12);
        Path tmpDir = Files.createTempDirectory("jviz_" + id);

        try {
            // Step 1: Format and instrument code
            String formattedCode = formatJavaCode(code);
            String processedCode = instrumentCode(formattedCode);

            // Step 2: Write to file
            Path javaFile = tmpDir.resolve("Main.java");
            Files.writeString(javaFile, processedCode);

            // Step 3: Compute line offset
            int lineOffset = computeLineOffset(code, processedCode);

            // Step 4: Compile
            ProcessBuilder compileBuilder = new ProcessBuilder(
                "javac", "--release", "17", "-g", javaFile.toString()
            );
            compileBuilder.directory(tmpDir.toFile());
            compileBuilder.redirectErrorStream(false);
            Process compileProcess = compileBuilder.start();
            String compileStderr = new String(compileProcess.getErrorStream().readAllBytes());
            int compileExit = compileProcess.waitFor();

            if (compileExit != 0) {
                Map<String, Object> result = new HashMap<>();
                result.put("error", "Compilation Failed");
                result.put("stderr", compileStderr);
                result.put("lineOffset", lineOffset);
                return result;
            }

            // Step 5: Run with Tracer
            String sep = System.getProperty("os.name").toLowerCase().contains("win") ? ";" : ":";
            String cp = tracerClassPath + sep + tmpDir.toString();

            ProcessBuilder runBuilder = new ProcessBuilder(
                "java", "--add-modules", "jdk.jdi",
                "-cp", cp, "Tracer", tmpDir.toString(), "Main"
            );
            runBuilder.environment().remove("JAVA_TOOL_OPTIONS");
            runBuilder.environment().remove("_JAVA_OPTIONS");

            Process runProcess = runBuilder.start();

            // Write input to stdin
            if (input != null && !input.isEmpty()) {
                try (OutputStream os = runProcess.getOutputStream()) {
                    os.write((input.endsWith("\n") ? input : input + "\n").getBytes());
                }
            } else {
                runProcess.getOutputStream().close();
            }

            // Read output with timeout
            String tracerOutput = new String(runProcess.getInputStream().readAllBytes());
            runProcess.waitFor(30, java.util.concurrent.TimeUnit.SECONDS);
            if (runProcess.isAlive()) runProcess.destroyForcibly();

            // Parse JSON from tracer output
            int jsonStart = tracerOutput.indexOf('{');
            int jsonEnd   = tracerOutput.lastIndexOf('}');
            if (jsonStart == -1 || jsonEnd == -1) {
                Map<String, Object> err = new HashMap<>();
                err.put("error", "Execution Failed");
                err.put("stderr", "No output from tracer");
                return err;
            }

            @SuppressWarnings("unchecked")
            Map<String, Object> result = mapper.readValue(
                tracerOutput.substring(jsonStart, jsonEnd + 1), Map.class
            );
            result.put("lineOffset", lineOffset);
            return result;

        } finally {
            deleteDir(tmpDir);
        }
    }

    // ── Formatter: expand single-line code to multi-line ──────────────────────

    private String formatJavaCode(String code) {
        // Count meaningful non-import lines
        long meaningfulLines = Arrays.stream(code.split("\n"))
            .filter(l -> {
                String t = l.trim();
                return !t.isEmpty() && !t.startsWith("import ") && !t.startsWith("//") && !t.startsWith("/*") && !t.startsWith("*");
            }).count();
        if (meaningfulLines > 4) return code; // already formatted

        // Simple tokenizer: split on { } ; preserving strings and control-flow headers
        StringBuilder result = new StringBuilder();
        int indent = 0;
        String TAB = "    ";
        List<String> tokens = tokenize(code);

        for (int t = 0; t < tokens.size(); t++) {
            String tok = tokens.get(t);
            String next = t + 1 < tokens.size() ? tokens.get(t + 1) : "";
            if (tok.equals("}")) {
                indent = Math.max(0, indent - 1);
                result.append(TAB.repeat(indent)).append("}\n");
            } else if (tok.equals("{")) {
                result.append(" {\n");
                indent++;
            } else if (tok.equals(";")) {
                result.append(";\n");
            } else if (tok.startsWith("//") || tok.startsWith("/*")) {
                result.append(TAB.repeat(indent)).append(tok).append("\n");
            } else {
                if (next.equals("{")) result.append(TAB.repeat(indent)).append(tok);
                else if (next.equals(";")) result.append(TAB.repeat(indent)).append(tok);
                else result.append(TAB.repeat(indent)).append(tok).append("\n");
            }
        }
        return result.toString();
    }

    private List<String> tokenize(String code) {
        List<String> tokens = new ArrayList<>();
        StringBuilder current = new StringBuilder();
        int i = 0;

        while (i < code.length()) {
            char ch = code.charAt(i);

            // String literal
            if (ch == '"') {
                StringBuilder str = new StringBuilder("\"");
                i++;
                while (i < code.length() && code.charAt(i) != '"') {
                    if (code.charAt(i) == '\\') { str.append(code.charAt(i++)); }
                    str.append(code.charAt(i++));
                }
                str.append('"'); i++;
                current.append(str);
                continue;
            }

            // Control flow header: for/while/if
            String rest = code.substring(i);
            java.util.regex.Matcher cfm = Pattern.compile("^((?:else\\s+)?if|for|while)\\s*\\(").matcher(rest);
            if (cfm.find()) {
                flush(current, tokens);
                String keyword = cfm.group(0);
                i += keyword.length();
                // Read balanced paren
                int depth = 1;
                StringBuilder inner = new StringBuilder();
                while (i < code.length() && depth > 0) {
                    char c = code.charAt(i);
                    if (c == '(') depth++;
                    else if (c == ')') depth--;
                    inner.append(c); i++;
                }
                String header = keyword + inner;
                tokens.add(header);
                // Skip whitespace
                while (i < code.length() && (code.charAt(i) == ' ' || code.charAt(i) == '\t')) i++;
                // Braceless body?
                if (i < code.length() && code.charAt(i) != '{' && code.charAt(i) != '\n') {
                    tokens.add("{");
                    StringBuilder body = new StringBuilder();
                    while (i < code.length() && code.charAt(i) != ';' && code.charAt(i) != '{' && code.charAt(i) != '}') {
                        body.append(code.charAt(i++));
                    }
                    if (!body.toString().trim().isEmpty()) tokens.add(body.toString().trim());
                    if (i < code.length() && code.charAt(i) == ';') { tokens.add(";"); i++; }
                    tokens.add("}");
                }
                continue;
            }

            // Array initializer: keep { ... } as one token
            if (ch == '{') {
                String prev = current.toString().trim();
                boolean isInit = prev.endsWith("=") || prev.matches(".*=\\s*$") || prev.matches(".*new\\s+[\\w<>\\[\\]]+\\s*\\[\\d*\\]\\s*$");
                if (isInit) {
                    StringBuilder block = new StringBuilder("{"); i++;
                    int depth = 1;
                    while (i < code.length() && depth > 0) {
                        char c = code.charAt(i);
                        if (c == '{') depth++;
                        else if (c == '}') depth--;
                        if (depth > 0) block.append(c);
                        i++;
                    }
                    block.append('}');
                    current.append(block);
                    continue;
                }
            }

            if (ch == '{' || ch == '}' || ch == ';') {
                flush(current, tokens);
                tokens.add(String.valueOf(ch));
            } else if (ch == '\n') {
                flush(current, tokens);
            } else {
                current.append(ch);
            }
            i++;
        }
        flush(current, tokens);
        return tokens;
    }

    private void flush(StringBuilder sb, List<String> tokens) {
        String t = sb.toString().trim();
        if (!t.isEmpty()) tokens.add(t);
        sb.setLength(0);
    }

    // ── Instrumentation: inject traceCondition ─────────────────────────────────

    private String instrumentCode(String code) {
        boolean hasMainClass = Pattern.compile("(?:public\\s+)?(?:final\\s+|abstract\\s+)?class\\s+Main\\b").matcher(code).find();
        if (!hasMainClass) return code; // handled by wrapper (not implemented here for brevity)

        // Wrap conditions
        String processed = wrapConditions(code);

        // Inject traceCondition method
        Pattern classOpen = Pattern.compile("class\\s+Main\\b[^{]*\\{");
        Matcher m = classOpen.matcher(processed);
        int lastIdx = -1;
        while (m.find()) lastIdx = m.end();
        if (lastIdx != -1) {
            processed = processed.substring(0, lastIdx)
                + "\n    public static boolean traceCondition(boolean __viz_b) { return __viz_b; }\n"
                + processed.substring(lastIdx);
        }
        return processed;
    }

    private String wrapConditions(String text) {
        StringBuilder result = new StringBuilder();
        int i = 0;
        while (i < text.length()) {
            Matcher m = Pattern.compile("^(if|while|for)\\s*\\(").matcher(text.substring(i));
            if (m.find()) {
                String keyword = m.group(1);
                result.append(m.group(0));
                i += m.group(0).length();
                int balance = 1, start = i;
                while (i < text.length() && balance > 0) {
                    if (text.charAt(i) == '(') balance++;
                    else if (text.charAt(i) == ')') balance--;
                    i++;
                }
                String inner = text.substring(start, i - 1);
                if (keyword.equals("for")) {
                    String[] parts = inner.split(";", 3);
                    if (parts.length == 3) {
                        String cond = parts[1].trim();
                        String wrapped = !cond.isEmpty() && !cond.startsWith("Main.traceCondition")
                            ? "Main.traceCondition(" + cond + ")" : cond;
                        result.append(parts[0]).append(";").append(wrapped).append(";").append(parts[2]);
                    } else {
                        result.append(inner);
                    }
                } else {
                    if (!inner.trim().startsWith("Main.traceCondition"))
                        result.append("Main.traceCondition(").append(inner).append(")");
                    else result.append(inner);
                }
                result.append(")");
            } else {
                result.append(text.charAt(i++));
            }
        }
        return result.toString();
    }

    private int computeLineOffset(String original, String processed) {
        int origLine = findMainLine(original);
        int procLine = findMainLine(processed);
        if (origLine == -1 || procLine == -1) return 0;
        return procLine - origLine;
    }

    private int findMainLine(String src) {
        String[] lines = src.split("\n");
        for (int i = 0; i < lines.length; i++) {
            if (lines[i].matches(".*public\\s+static\\s+void\\s+main\\s*\\(.*")) return i + 1;
        }
        return -1;
    }

    private void deleteDir(Path dir) {
        try {
            Files.walk(dir).sorted(Comparator.reverseOrder()).forEach(p -> {
                try { Files.delete(p); } catch (IOException ignored) {}
            });
        } catch (IOException ignored) {}
    }
}
