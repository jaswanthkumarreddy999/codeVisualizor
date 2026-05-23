
import { join } from 'path';
import { writeFile, mkdir, rm } from 'fs/promises';
import { nanoid } from 'nanoid';
import { NextResponse } from 'next/server';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

// Debugging helper
const logDebug = async (msg: string) => {
    // console.log(msg); // Uncomment for verbose logging
};

/**
 * Formats Java code so each statement/brace is on its own line.
 * This ensures the JDI debugger reports correct line numbers even when
 * the user pastes code as a single line.
 * Also adds braces around braceless for/while/if bodies so the JDI
 * stepper can see loop variables in scope on every step.
 */
function formatJavaCode(code: string): string {
    // Only format if the code is essentially single-line (collapsed).
    // If the user already wrote multi-line code, don't reformat — it would
    // change line numbers and break the tracer line mapping.
    const meaningfulLines = code.split('\n').filter(l => {
        const t = l.trim();
        return t.length > 0 && !t.startsWith('import ') && !t.startsWith('//') && !t.startsWith('/*') && !t.startsWith('*');
    });
    // If there are already more than 4 meaningful lines, code is already formatted
    if (meaningfulLines.length > 4) return code;

    // ── Step 1: Tokenize ──────────────────────────────────────────────────────
    // Tokens are: text chunks, '{', '}', ';'
    // Special handling: when we see for/while/if followed by '(', we read the
    // full balanced header and emit it as its own token, then continue tokenizing
    // the body separately.
    const tokens: string[] = [];
    let i = 0;
    let current = '';

    const flushCurrent = () => {
        const t = current.trim();
        if (t) tokens.push(t);
        current = '';
    };

    // Read a balanced parenthesised expression starting AFTER the opening '('
    // Returns the full string including the closing ')'
    const readBalancedParen = (src: string, start: number): { text: string; end: number } => {
        let depth = 1, j = start, text = '';
        while (j < src.length && depth > 0) {
            const c = src[j];
            if (c === '"') {
                text += c; j++;
                while (j < src.length && src[j] !== '"') {
                    if (src[j] === '\\') { text += src[j]; j++; }
                    text += src[j]; j++;
                }
                text += '"'; j++;
                continue;
            }
            if (c === '(') depth++;
            else if (c === ')') depth--;
            text += c; j++;
        }
        return { text, end: j };
    };

    while (i < code.length) {
        const ch = code[i];

        // String literal
        if (ch === '"') {
            let str = '"'; i++;
            while (i < code.length && code[i] !== '"') {
                if (code[i] === '\\') { str += code[i]; i++; }
                str += code[i]; i++;
            }
            str += '"'; i++;
            current += str;
            continue;
        }

        // Char literal
        if (ch === "'") {
            let str = "'"; i++;
            while (i < code.length && code[i] !== "'") {
                if (code[i] === '\\') { str += code[i]; i++; }
                str += code[i]; i++;
            }
            str += "'"; i++;
            current += str;
            continue;
        }

        // Line comment
        if (ch === '/' && code[i + 1] === '/') {
            flushCurrent();
            let comment = '';
            while (i < code.length && code[i] !== '\n') { comment += code[i]; i++; }
            tokens.push(comment);
            continue;
        }

        // Block comment
        if (ch === '/' && code[i + 1] === '*') {
            flushCurrent();
            let comment = '';
            while (i < code.length && !(code[i] === '*' && code[i + 1] === '/')) {
                comment += code[i]; i++;
            }
            comment += '*/'; i += 2;
            tokens.push(comment);
            continue;
        }

        // Detect control-flow keyword: for/while/if/else-if
        // We need to check that 'current' ends with the keyword (or is empty + keyword at i)
        const rest = code.slice(i);
        const cfMatch = rest.match(/^((?:else\s+)?if|for|while)\s*\(/);
        if (cfMatch) {
            // Flush anything before the keyword that's already in current
            // (current might have leading whitespace only at this point)
            flushCurrent();
            const keyword = cfMatch[1];
            // Advance past keyword and opening paren
            i += cfMatch[0].length;
            const { text: innerParen, end: afterParen } = readBalancedParen(code, i);
            i = afterParen;
            // innerParen ends with ')' already included via readBalancedParen
            // Actually readBalancedParen stops AFTER the closing ), so innerParen
            // does NOT include the final ')'. Let's reconstruct:
            // cfMatch[0] already includes the '(' so header = keyword + '(' + innerParen
            // But innerParen consumed the ')' in depth tracking — the last char consumed
            // was ')' which decremented depth to 0, so it IS included in text.
            // Wait — let's re-check: depth starts at 1, when we see ')' depth becomes 0
            // and we still do text += c before j++. So ')' IS in text.
            const header = `${cfMatch[0]}${innerParen}`; // e.g. "for(" + "int x : arr)" = "for(int x : arr)"
            tokens.push(header);

            // Skip whitespace after header
            while (i < code.length && (code[i] === ' ' || code[i] === '\t')) i++;

            // If next char is '{', it's a normal block — push nothing extra, let { be handled
            if (code[i] === '{') {
                // normal — fall through
            } else if (code[i] !== '\n' && i < code.length) {
                // Braceless body — inject synthetic braces
                tokens.push('{');
                // Read body up to ';' (single statement)
                let body = '';
                while (i < code.length && code[i] !== ';' && code[i] !== '{' && code[i] !== '}') {
                    if (code[i] === '"') {
                        body += code[i]; i++;
                        while (i < code.length && code[i] !== '"') {
                            if (code[i] === '\\') { body += code[i]; i++; }
                            body += code[i]; i++;
                        }
                        body += '"'; i++;
                        continue;
                    }
                    body += code[i]; i++;
                }
                if (body.trim()) tokens.push(body.trim());
                if (i < code.length && code[i] === ';') { tokens.push(';'); i++; }
                tokens.push('}');
            }
            continue;
        }

        if (ch === '{' || ch === '}' || ch === ';') {
            // Check if '{' is an array/object initializer (preceded by '=' or 'new Type[]')
            // Do NOT treat method/constructor signatures ending with ')' as initializers
            if (ch === '{') {
                const prev = current.trim();
                const isInitializer = /=\s*$/.test(prev) ||           // assignment: int[] a = {
                    /new\s+[\w<>\[\]]+\s*\[\s*\]\s*$/.test(prev) ||   // new int[] {
                    /new\s+[\w<>\[\]]+\s*\[\d*\]\s*$/.test(prev);     // new int[5] {
                if (isInitializer) {
                    // Read the entire initializer block as one token
                    let block = '{'; i++;
                    let depth = 1;
                    while (i < code.length && depth > 0) {
                        const c = code[i];
                        if (c === '{') depth++;
                        else if (c === '}') depth--;
                        if (depth > 0) block += c;
                        i++;
                    }
                    block += '}';
                    current += block;
                    continue;
                }
            }
            flushCurrent();
            tokens.push(ch);
        } else if (ch === '\n') {
            flushCurrent();
        } else {
            current += ch;
        }
        i++;
    }
    flushCurrent();

    // ── Step 2: Rebuild with indentation ─────────────────────────────────────
    let result = '';
    let indent = 0;
    const TAB = '    ';

    for (let t = 0; t < tokens.length; t++) {
        const tok = tokens[t];
        const nextTok = tokens[t + 1];

        if (tok === '}') {
            indent = Math.max(0, indent - 1);
            result += TAB.repeat(indent) + '}\n';
        } else if (tok === '{') {
            result += ' {\n';
            indent++;
        } else if (tok === ';') {
            result += ';\n';
        } else if (tok.startsWith('//') || tok.startsWith('/*')) {
            result += TAB.repeat(indent) + tok + '\n';
        } else {
            if (nextTok === '{') {
                result += TAB.repeat(indent) + tok; // { appended next iteration
            } else if (nextTok === ';') {
                result += TAB.repeat(indent) + tok; // ; appended next iteration
            } else {
                result += TAB.repeat(indent) + tok + '\n';
            }
        }
    }

    return result;
}

export async function POST(req: Request) {
    let filePath: string | undefined;
    let classPath: string | undefined;

    try {
        const { code, input } = await req.json();
        const id = nanoid();
        const tmpDir = join(process.cwd(), 'tmp', id);
        classPath = tmpDir;

        await mkdir(tmpDir, { recursive: true });

        // Format the code FIRST — before any instrumentation.
        // This ensures braceless for-each/if/while bodies get braces,
        // and all statements are on separate lines for correct JDI line numbers.
        const formattedCode = formatJavaCode(code);

        // Robust Java Code Wrapper
        let processedCode = formattedCode;

        // Check if the user already provided a class named Main
        // Relaxed regex to catch 'class Main', 'public class Main', 'final class Main', etc.
        const hasMainClass = /(?:public\s+)?(?:final\s+|abstract\s+)?class\s+Main\b/.test(formattedCode);

        if (hasMainClass) {
            // User provided full class structure.
            // We need to inject the traceCondition method into the existing class Main
            // and instrument the code.
            
            const wrapConditions = (text: string) => {
                let result = '';
                let i = 0;
                while (i < text.length) {
                    const ifMatch = text.substr(i).match(/^(if|while|for)\s*\(/);
                    if (ifMatch) {
                        const keyword = ifMatch[1];
                        result += ifMatch[0];
                        i += ifMatch[0].length;
                        let balance = 1;
                        let start = i;
                        while (i < text.length && balance > 0) {
                            if (text[i] === '(') balance++;
                            else if (text[i] === ')') balance--;
                            i++;
                        }
                        if (balance === 0) {
                            const inner = text.substring(start, i - 1);
                            if (keyword === 'for') {
                                // for loops have 3 semicolon-separated clauses: init; condition; update
                                // Only wrap the condition (middle clause), not init or update
                                const parts = inner.split(';');
                                if (parts.length === 3) {
                                    const condition = parts[1].trim();
                                    const wrapped = condition && !condition.startsWith('Main.traceCondition')
                                        ? `Main.traceCondition(${condition})`
                                        : condition;
                                    result += `${parts[0]};${wrapped};${parts[2]}`;
                                } else {
                                    // Enhanced for-each or unusual form — don't wrap
                                    result += inner;
                                }
                            } else {
                                // if / while — wrap the whole condition
                                if (!inner.trim().startsWith('Main.traceCondition')) {
                                    result += `Main.traceCondition(${inner})`;
                                } else {
                                    result += inner;
                                }
                            }
                            result += ')';
                        } else {
                            result += text.substring(start);
                        }
                    } else {
                        result += text[i];
                        i++;
                    }
                }
                return result;
            };

            processedCode = wrapConditions(formattedCode);
            
            // Insert helper method before the last brace of the Main class
            // This is a heuristic.
            const mainClassRegex = /class\s+Main\b[^{]*{/g;
            let match;
            let lastMatchIndex = -1;
            while ((match = mainClassRegex.exec(processedCode)) !== null) {
                lastMatchIndex = match.index + match[0].length;
            }

            if (lastMatchIndex !== -1) {
                processedCode = processedCode.substring(0, lastMatchIndex) +
                    '\n    public static boolean traceCondition(boolean __viz_b) { return __viz_b; }\n' +
                    processedCode.substring(lastMatchIndex);
            }

        } else {
            // Existing wrapping logic will follow...
            // START WRAPPING LOGIC (Existing code continues below)


            // 1. Extract Imports
            const imports: string[] = [];
            const bodyLines: string[] = [];
            const rawLines = code.split('\n');

            for (const line of rawLines) {
                if (line.trim().startsWith('import ')) {
                    imports.push(line);
                } else {
                    bodyLines.push(line);
                }
            }

            // Add default imports if missing
            if (!imports.some(i => i.includes('java.util.*'))) imports.push('import java.util.*;');
            if (!imports.some(i => i.includes('java.util.concurrent.*'))) imports.push('import java.util.concurrent.*;');
            if (!imports.some(i => i.includes('java.util.stream.*'))) imports.push('import java.util.stream.*;');
            if (!imports.some(i => i.includes('java.io.*'))) imports.push('import java.io.*;');
            if (!imports.some(i => i.includes('java.math.*'))) imports.push('import java.math.*;');

            // 2. Parse Body to separate Members (Methods/Classes) from Script (Statements)
            const members: string[] = [];
            const script: string[] = [];

            const fullBody = bodyLines.join('\n');

            // Regex to identify potential method/class starts at top level
            // Matches: [modifiers] [type] name(...) {  OR  class Name {
            const memberStartRegex = /^\s*(?:(?:public|protected|private|static|final|abstract|synchronized)\s+)*(?:class|interface|enum|record|void|[\w<>\[\]]+)\s+\w+\s*(?:<[^>]+>)?\s*(?:\(.*\)|{)/;

            let braceBalance = 0;
            let currentChunkLines: string[] = [];
            let isParsingMember = false;

            // Simple line-by-line parser (heuristic)
            // A more robust but complex approach would be char-by-char or tokenizing
            // For NeetCode snippets, line-based usually suffices as formatting is standard

            for (let i = 0; i < bodyLines.length; i++) {
                const line = bodyLines[i];
                const trimmed = line.trim();

                // Skip comments for structure detection (but keep in output)
                if (!trimmed || trimmed.startsWith('//')) {
                    if (isParsingMember) {
                        members.push(line);
                    } else {
                        script.push(line);
                    }
                    continue;
                }

                // Check if this line starts a new member (if at depth 0)
                if (braceBalance === 0) {
                    if (memberStartRegex.test(trimmed) && trimmed.endsWith('{')) {
                        isParsingMember = true;
                    } else {
                        isParsingMember = false;
                    }
                }

                // Count braces in this line
                const openBraces = (line.match(/{/g) || []).length;
                const closeBraces = (line.match(/}/g) || []).length;

                braceBalance += openBraces - closeBraces;

                if (isParsingMember) {
                    members.push(line);
                } else {
                    script.push(line);
                }

                // Reset state if back to depth 0
                if (braceBalance === 0 && isParsingMember) {
                    isParsingMember = false; // Finished reading member
                }
            }

            // 3. Construct Main class
            // - Members go directly into class
            // - Script goes into main method

            // Ensure static members for Main if they aren't already class definitions
            // (We can't easily parse if it's a method or class, but classes can be static)
            // Actually, for methods to be called from main, they must be static.
            // We'll trust the user/generator (NeetCode snippets mostly use static methods or just script)
            // If the user defined 'void dfs()', it needs to be 'static void dfs()' to be called from main.
            // We can create an instance of Main to allow instance methods?
            // "new Main().run()" pattern.

            // Transform members: wrap if/while conditions
            // This is a naive regex replacement. Ideally we'd use a parser, but for simple snippets this works.
            const conditionRegex = /(if|while)\s*\((.*)\)/g; // Very naive, matches paired parens? No.
            // Better: Match keyword, spaces, open paren, then balance parens? 
            // Let's use a helper to wrap conditions in the text.

            const wrapConditions = (text: string) => {
                let result = '';
                let i = 0;
                while (i < text.length) {
                    const ifMatch = text.substr(i).match(/^(if|while|for)\s*\(/);
                    if (ifMatch) {
                        const keyword = ifMatch[1];
                        result += ifMatch[0];
                        i += ifMatch[0].length;

                        let balance = 1;
                        let start = i;
                        while (i < text.length && balance > 0) {
                            if (text[i] === '(') balance++;
                            else if (text[i] === ')') balance--;
                            i++;
                        }

                        if (balance === 0) {
                            const inner = text.substring(start, i - 1);
                            if (keyword === 'for') {
                                // for loops: init; condition; update — only wrap the condition (middle)
                                const parts = inner.split(';');
                                if (parts.length === 3) {
                                    const condition = parts[1].trim();
                                    const wrapped = condition && !condition.startsWith('Main.traceCondition')
                                        ? `Main.traceCondition(${condition})`
                                        : condition;
                                    result += `${parts[0]};${wrapped};${parts[2]}`;
                                } else {
                                    result += inner;
                                }
                            } else {
                                // if / while — wrap the whole condition
                                if (!inner.trim().startsWith('Main.traceCondition')) {
                                    result += `Main.traceCondition(${inner})`;
                                } else {
                                    result += inner;
                                }
                            }
                            result += ')';
                        } else {
                            result += text.substring(start);
                        }
                    } else {
                        result += text[i];
                        i++;
                    }
                }
                return result;
            };

            const processedMembers = wrapConditions(members.join('\n'));
            const processedScript = wrapConditions(script.join('\n'));

            processedCode = `
${imports.join('\n')}

public class Main {
    // User Members (Methods/Classes)
${processedMembers}

    public static void main(String[] args) {
        try {
            new Main().runScript();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    // Instance method for script execution (allows accessing instance members if any)
    public void runScript() {
        // User Script
${processedScript}
    }

    // Trace Helper
    public static boolean traceCondition(boolean __viz_b) {
        return __viz_b;
    }
}
`;
        } // End of wrapping logic

        // Re-format after instrumentation only if the original code was single-line.
        // For already-formatted multi-line code, the formatter would change line numbers.
        const wasAlreadyFormatted = code.split('\n').filter((l: string) => {
            const t = l.trim();
            return t.length > 0 && !t.startsWith('import ') && !t.startsWith('//') && !t.startsWith('/*') && !t.startsWith('*');
        }).length > 4;
        if (!wasAlreadyFormatted) {
            processedCode = formatJavaCode(processedCode);
        }

        filePath = join(tmpDir, 'Main.java');
        classPath = tmpDir; // Where .class will live

        await writeFile(filePath, processedCode);

        // Compute line offset: the formatter/instrumentation may add lines before main()
        // so tracer line numbers need to be adjusted back to match the original editor lines.
        const computeLineOffset = (original: string, processed: string): number => {
            // Find the line number of "public static void main" in both versions
            const findMainLine = (src: string) => {
                const lines = src.split('\n');
                for (let i = 0; i < lines.length; i++) {
                    if (/public\s+static\s+void\s+main\s*\(/.test(lines[i])) return i + 1; // 1-indexed
                }
                return -1;
            };
            const origLine = findMainLine(original);
            const procLine = findMainLine(processed);
            if (origLine === -1 || procLine === -1) return 0;
            return procLine - origLine;
        };
        const lineOffset = computeLineOffset(code, processedCode);

        // Compile
        try {
            await execAsync(`javac --release 17 -g "${filePath}"`);
        } catch (compileError: any) {
            await logDebug(`[${id}] Compilation Failed: ${compileError.stderr || compileError.message}`);
            return NextResponse.json({
                error: "Compilation Failed",
                stderr: compileError.stderr || compileError.message
            });
        }

        // Run with Tracer
        // New Logic (Launcher):
        // 1. Start Tracer Process with <CLASSPATH> <MainClass>
        // Tracer will launch the user process internally using JDI LaunchingConnector.
        // No ports, no retries needed.

        const tracerClassPath = join(process.cwd(), 'lib/java');
        const sep = process.platform === 'win32' ? ';' : ':';

        await logDebug(`[${id}] Starting Java execution via Tracer Launcher`);
        await logDebug(`[${id}] ClassPath: ${classPath}`);

        try {
            const runTracer = () => new Promise<{ stdout: string, stderr: string }>((resolve, reject) => {
                // Remove JAVA_TOOL_OPTIONS and _JAVA_OPTIONS to prevent interference
                const env = { ...process.env, JAVA_TOOL_OPTIONS: undefined, _JAVA_OPTIONS: undefined };

                const child = exec(
                    `java --add-modules jdk.jdi -cp "${tracerClassPath}${sep}${classPath}" Tracer "${classPath}" Main`,
                    { timeout: 30000, env, maxBuffer: 50 * 1024 * 1024 },
                    (error, stdout, stderr) => {
                        if (error && !stdout) {
                            // If there is stdout, it might be a valid execution with a non-zero exit code (e.g. Runtime Exception)
                            // But here Tracer usually exits 0 if it caught the exception.
                            // If error is present, it might be a timeout or specialized error.
                            // We resolve with what we have, and let the JSON parser decide if it's valid.
                            // However, if it's a timeout (signal SIGTERM), we should probably report it.
                            reject({ error, stdout, stderr });
                        } else {
                            resolve({ stdout, stderr });
                        }
                    }
                );

                if (input) {
                    // Append newline to ensure line-buffered inputs (like Scanner) don't hang waiting for delimiter
                    child.stdin?.write(input.endsWith('\n') ? input : input + '\n');
                    child.stdin?.end();
                } else {
                    child.stdin?.end();
                }
            });

            const { stdout, stderr } = await runTracer();

            // The Tracer output (stdout) IS the JSON result, which contains user's stdout/stderr/history
            let result: any = {};
            const output = stdout || "";  // Tracer prints JSON to its stdout

            // logDebug(`[${id}] Tracer Output: ${output}`);

            // Parse valid JSON from output (it might contain other noise if JVM prints stuff)
            const jsonStart = output.indexOf('{');
            const jsonEnd = output.lastIndexOf('}');

            if (jsonStart !== -1 && jsonEnd !== -1) {
                const jsonString = output.substring(jsonStart, jsonEnd + 1);
                try {
                    result = JSON.parse(jsonString);
                } catch (e) {
                    console.error(`[${id}] JSON Parse Error:`, e);
                    // Fallback: maybe capture raw output
                }
            } else {
                console.error(`[${id}] No JSON found in Tracer output`);
            }

            // If the Tracer failed to produce JSON but printed errors to its stderr, capture that
            if (!result.error && stderr) {
                // Remove JAVA_TOOL_OPTIONS noise
                const cleanStderr = stderr.replace(/^Picked up JAVA_TOOL_OPTIONS:.*\n?/gm, '').trim();
                if (cleanStderr) {
                    // Check for "Failed to launch" or similar
                    console.error(`[${id}] Tracer Stderr: ${cleanStderr}`);
                    if (!result.stderr) result.stderr = cleanStderr;
                    else result.stderr += "\n" + cleanStderr;
                }
            }

            // Debug logging for production:
            if (result.stdout) console.log(`[${id}] Java stdout length: ${result.stdout.length}`);
            if (result.stderr) console.log(`[${id}] Java stderr size: ${result.stderr.length}`);

            // Attach line offset so frontend can map tracer lines back to original editor lines
            result.lineOffset = lineOffset;

            return NextResponse.json(result);

        } catch (err: any) {
            console.error(`[${id}] Execution failed: ${err.message || err.error?.message}`);
            return NextResponse.json({
                error: "Execution Failed",
                stderr: err.stderr || err.message || err.error?.message
            }, { status: 500 });
        }

    } catch (e: any) {
        return NextResponse.json({ error: e.message }, { status: 500 });
    } finally {
        if (classPath) {
            // Cleanup the unique temp directory
            try { await rm(classPath, { recursive: true, force: true }); } catch (e) { }
        }
    }
}
