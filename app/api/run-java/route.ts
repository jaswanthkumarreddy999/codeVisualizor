
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

export async function POST(req: Request) {
    let filePath: string | undefined;
    let classPath: string | undefined;

    try {
        const { code, input } = await req.json();
        const id = nanoid();
        const tmpDir = join(process.cwd(), 'tmp', id);
        classPath = tmpDir;

        await mkdir(tmpDir, { recursive: true });

        // Robust Java Code Wrapper
        let processedCode = code;

        // Check if the user already provided a class named Main
        // Relaxed regex to catch 'class Main', 'public class Main', 'final class Main', etc.
        const hasMainClass = /(?:public\s+)?(?:final\s+|abstract\s+)?class\s+Main\b/.test(code);

        if (hasMainClass) {
            // User provided full class structure. Trust it.
            // We need to inject the traceCondition method into the existing class Main
            // And also instrument the code.
            // This is getting complicated to inject into user string.
            // For now, let's just REPLACE usage if we can, or insert the method.
            // Simpler: Just append the static method at the end of class body?
            // "class Main {" -> "class Main { public static boolean traceCondition(boolean b) { return b; }"
            // And run wrapConditions on the whole code.

            const wrapConditions = (text: string) => {
                let result = '';
                let i = 0;
                while (i < text.length) {
                    const ifMatch = text.substr(i).match(/^(if|while)\s*\(/);
                    if (ifMatch) {
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
                            const condition = text.substring(start, i - 1);
                            result += `Main.traceCondition(${condition})`;
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

            processedCode = wrapConditions(code);
            // Insert helper method before last brace
            const lastBrace = processedCode.lastIndexOf('}');
            if (lastBrace !== -1) {
                processedCode = processedCode.substring(0, lastBrace) +
                    ` public static boolean traceCondition(boolean b) { return b; } ` +
                    processedCode.substring(lastBrace);
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
                // Simple regex for "if (foo)" -> "if (Main.traceCondition(foo))"
                // This is tricky without a real parser because of nested parens "if ((a > b))"
                // But let's try a best-effort approach given the time constraints.
                // Match "if (" then read until matching paren.

                let result = '';
                let i = 0;
                while (i < text.length) {
                    const ifMatch = text.substr(i).match(/^(if|while)\s*\(/);
                    if (ifMatch) {
                        result += ifMatch[0]; // "if ("
                        i += ifMatch[0].length;

                        // Find closing paren for the condition
                        let balance = 1;
                        let start = i;
                        while (i < text.length && balance > 0) {
                            if (text[i] === '(') balance++;
                            else if (text[i] === ')') balance--;
                            i++;
                        }

                        if (balance === 0) {
                            // Extract condition
                            const condition = text.substring(start, i - 1);
                            // Wrap it
                            result += `Main.traceCondition(${condition})`;
                            result += ')'; // Closing paren of if
                        } else {
                            // Failed to find close, just append rest
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

        filePath = join(tmpDir, 'Main.java');
        classPath = tmpDir; // Where .class will live

        await writeFile(filePath, processedCode);

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
                    { timeout: 10000, env, maxBuffer: 50 * 1024 * 1024 },
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
