package com.codevisualizer.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import java.io.*;
import java.nio.file.*;
import java.util.*;
import java.util.concurrent.TimeUnit;

@Service
public class CExecutionService {

    @Value("${app.tracer.gdb-script}")
    private String gdbTracerScript;

    private final ObjectMapper mapper = new ObjectMapper();

    public Map<String, Object> execute(String code, String input, boolean isCpp) throws Exception {
        String id = UUID.randomUUID().toString().replace("-", "").substring(0, 12);
        Path tmpDir = Files.createTempDirectory("cviz_" + id);

        try {
            String ext = isCpp ? ".cpp" : ".c";
            String compiler = isCpp ? "g++" : "gcc";
            Path sourceFile = tmpDir.resolve("program" + ext);
            Path binaryFile = tmpDir.resolve("program");

            Files.writeString(sourceFile, code);

            // Compile
            ProcessBuilder compileBuilder = new ProcessBuilder(
                compiler, "-g", "-O0", sourceFile.toString(), "-o", binaryFile.toString()
            );
            compileBuilder.redirectErrorStream(false);
            Process compileProcess = compileBuilder.start();
            String compileStderr = new String(compileProcess.getErrorStream().readAllBytes());
            int compileExit = compileProcess.waitFor();

            if (compileExit != 0) {
                Map<String, Object> result = new HashMap<>();
                result.put("error", "Compilation Failed");
                result.put("stderr", compileStderr);
                return result;
            }

            // Run with GDB tracer
            String python = System.getProperty("os.name").toLowerCase().contains("win") ? "python" : "python3";
            ProcessBuilder runBuilder = new ProcessBuilder(python, gdbTracerScript, binaryFile.toString());
            runBuilder.redirectErrorStream(false);
            Process runProcess = runBuilder.start();

            if (input != null && !input.isEmpty()) {
                try (OutputStream os = runProcess.getOutputStream()) {
                    os.write(input.getBytes());
                }
            } else {
                runProcess.getOutputStream().close();
            }

            String stdout = new String(runProcess.getInputStream().readAllBytes());
            String stderr = new String(runProcess.getErrorStream().readAllBytes());
            runProcess.waitFor(10, TimeUnit.SECONDS);
            if (runProcess.isAlive()) runProcess.destroyForcibly();

            try {
                @SuppressWarnings("unchecked")
                Map<String, Object> result = mapper.readValue(stdout, Map.class);
                return result;
            } catch (Exception e) {
                Map<String, Object> err = new HashMap<>();
                err.put("stdout", stdout);
                err.put("stderr", stderr);
                return err;
            }
        } finally {
            deleteDir(tmpDir);
        }
    }

    private void deleteDir(Path dir) {
        try {
            Files.walk(dir).sorted(Comparator.reverseOrder()).forEach(p -> {
                try { Files.delete(p); } catch (IOException ignored) {}
            });
        } catch (IOException ignored) {}
    }
}
