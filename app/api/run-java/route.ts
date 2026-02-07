import { tmpdir } from 'os';
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
        const tmpDir = join(tmpdir(), id);
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
        // New Logic: 
        // 1. Start User Process with -agentlib:jdwp=transport=dt_socket,server=y,suspend=y,address=localhost:<PORT>
        // 2. Start Tracer Process with <PORT>

        const tracerClassPath = join(process.cwd(), 'lib/java');
        const sep = process.platform === 'win32' ? ';' : ':';

        // Robust retry mechanism for port selection and execution
        let attempts = 0;
        const maxAttempts = 3;

        while (attempts < maxAttempts) {
            attempts++;
            // Pick a random port (simple approach for now)
            const port = Math.floor(Math.random() * (40000 - 30000 + 1) + 30000).toString();

            await logDebug(`[${id}] Starting Java execution on port ${port} (Attempt ${attempts})`);
            await logDebug(`[${id}] ClassPath: ${classPath}`);
            await logDebug(`[${id}] TracerPath: ${tracerClassPath}`);

            try {
                const { stdout, stderr, tracerJson } = await new Promise<{ stdout: string, stderr: string, tracerJson?: string }>((resolve, reject) => {
                    // ... check for specific handshake error to reject and retry ...
                    // ACTUALLY, simpler to just let it fail and retry the whole block if tracer exit code is bad?
                    // But exec callback doesn't give clean exit code here easily without more refactoring.
                    // Let's rely on the stderr detection.

                    let userStdout = '';
                    let userStderr = '';
                    let tracerStdout = '';
                    let tracerStderr = '';
                    let processed = false;
                    let parsedOutput = false;

                    // --- 1. User Process ---
                    const userEnv = { ...process.env };
                    delete userEnv.JAVA_TOOL_OPTIONS;
                    delete userEnv._JAVA_OPTIONS;

                    const agentLib = `-agentlib:jdwp=transport=dt_socket,server=y,suspend=y,address=127.0.0.1:${port}`;
                    const memLimit = '-Xmx64m';

                    const userChild = exec(`java ${memLimit} ${agentLib} -cp "${tracerClassPath}${sep}${classPath}" Main`, {
                        timeout: 10000,
                        env: userEnv
                    }, (error, stdout, stderr) => {
                        userStdout = stdout as string;
                        userStderr = (stderr as string).replace(/^Picked up JAVA_TOOL_OPTIONS:.*\n?/gm, '').trim();
                        // If we see the handshake failure, we should probably fail this attempt hard so we retry.
                        if (userStderr.includes("Debugger failed to attach: handshake failed")) {
                            // This will be caught by the outer try-catch if we reject? 
                            // But we are inside a callback.
                            console.error(`[${id}] Handshake failed on port ${port}`);
                        }
                    });

                    if (input && userChild.stdin) {
                        userChild.stdin.write(input);
                        userChild.stdin.end();
                    }

                    // --- 2. Tracer Process ---
                    setTimeout(() => {
                        const tracerEnv = { ...process.env };
                        delete tracerEnv.JAVA_TOOL_OPTIONS;
                        delete tracerEnv._JAVA_OPTIONS;

                        const tracerChild = exec(`java --add-modules jdk.jdi -cp "${tracerClassPath}${sep}${classPath}" Tracer ${port} Main`, {
                            timeout: 10000,
                            env: tracerEnv
                        }, (error, stdout, stderr) => {
                            tracerStdout = stdout as string;
                            tracerStderr = (stderr as string).replace(/^Picked up JAVA_TOOL_OPTIONS:.*\n?/gm, '').trim();

                            if (!processed) {
                                processed = true;
                                // Check for specific failure in stderr to trigger retry
                                if (userStderr.includes("handshake failed") || tracerStderr.includes("Connection refused")) {
                                    reject(new Error("Handshake failed or Connection refused"));
                                    return;
                                }

                                resolve({ stdout: userStdout, stderr: userStderr, tracerJson: tracerStdout });
                            }
                        });
                    }, 500);
                });

                // If we got here, success!
                let result: any = {};
                const output = tracerJson || "";

                // ... parse ...
                const jsonStart = output.indexOf('{');
                const jsonEnd = output.lastIndexOf('}');

                if (jsonStart !== -1 && jsonEnd !== -1) {
                    const jsonString = output.substring(jsonStart, jsonEnd + 1);
                    result = JSON.parse(jsonString);
                }

                result.stdout = stdout;
                result.stderr = stderr;
                return NextResponse.json(result);

            } catch (err: any) {
                console.error(`[${id}] Attempt ${attempts} failed: ${err.message}`);
                if (attempts >= maxAttempts) {
                    throw err; // Re-throw to be caught by outer handler
                }
                // Wait a bit before retrying
                await new Promise(r => setTimeout(r, 200));
            }
        } // End of retry loop

        return NextResponse.json({ error: "Unexpected execution flow" }, { status: 500 });

    } catch (e: any) {
        return NextResponse.json({ error: e.message }, { status: 500 });
    } finally {
        if (classPath) {
            // Cleanup the unique temp directory
            try { await rm(classPath, { recursive: true, force: true }); } catch (e) { }
        }
    }
}
