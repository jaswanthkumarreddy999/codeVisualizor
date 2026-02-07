import { tmpdir } from 'os';
import { join } from 'path';
import { writeFile, mkdir, rm } from 'fs/promises';
import { nanoid } from 'nanoid';
import { NextResponse } from 'next/server';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

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

        // Pick a random port (simple approach for now)
        const port = Math.floor(Math.random() * (40000 - 30000 + 1) + 30000).toString();

        const { stdout, stderr } = await new Promise<{ stdout: string, stderr: string, tracerJson?: string }>((resolve, reject) => {
            let userStdout = '';
            let userStderr = '';
            let tracerStdout = '';
            let tracerStderr = '';
            let processed = false;

            // --- 1. User Process ---
            // java -agentlib:... -cp ... Main
            const userEnv = { ...process.env };
            // Unset tool options for user process to allow clean output
            delete userEnv.JAVA_TOOL_OPTIONS;
            delete userEnv._JAVA_OPTIONS;

            // Construct command
            // WE USE 127.0.0.1 explicit IP to match Tracer
            const agentLib = `-agentlib:jdwp=transport=dt_socket,server=y,suspend=y,address=127.0.0.1:${port}`;
            // Add memory limit
            const memLimit = '-Xmx64m';

            // Allow preview features if needed, but keeping it simple for now
            const userChild = exec(`java ${memLimit} ${agentLib} -cp "${tracerClassPath}${sep}${classPath}" Main`, {
                timeout: 10000,
                env: userEnv
            }, (error, stdout, stderr) => {
                // User process finished
                userStdout = stdout as string;
                // Clean up stderr if needed
                userStderr = (stderr as string).replace(/^Picked up JAVA_TOOL_OPTIONS:.*\n?/gm, '').trim();

                // If tracer hasn't finished yet (unlikely if user process died, but possible),
                // we mainly wait for tracer to output JSON. 
                // However, if user process dies, tracer usually gets VMDisconnect event and finishes too.
            });

            if (input && userChild.stdin) {
                userChild.stdin.write(input);
                userChild.stdin.end();
            }

            // --- 2. Tracer Process ---
            // Wait a bit for User Process to initialize and open port?
            setTimeout(() => {
                const tracerEnv = { ...process.env };
                delete tracerEnv.JAVA_TOOL_OPTIONS;
                delete tracerEnv._JAVA_OPTIONS;

                // Add --add-modules jdk.jdi to ensure runtime access
                const tracerChild = exec(`java --add-modules jdk.jdi -cp "${tracerClassPath}${sep}${classPath}" Tracer ${port} Main`, {
                    timeout: 10000,
                    env: tracerEnv
                }, (error, stdout, stderr) => {
                    tracerStdout = stdout as string;
                    tracerStderr = (stderr as string).replace(/^Picked up JAVA_TOOL_OPTIONS:.*\n?/gm, '').trim();

                    if (!processed) {
                        processed = true;
                        // Combine results
                        resolve({ stdout: userStdout, stderr: userStderr, tracerJson: tracerStdout });
                    }
                });
            }, 500); // 500ms delay to let VM start
        });

        try {
            let result: any = {};
            // Tracer stdout should be the JSON
            const output = (stdout as any).tracerJson || "";
            // Debug logging
            console.log("Tracer Output Length:", output.length);
            if (output.length < 100) console.log("Tracer Output:", output);

            const jsonStart = output.indexOf('{');
            const jsonEnd = output.lastIndexOf('}');

            if (jsonStart !== -1 && jsonEnd !== -1) {
                const jsonString = output.substring(jsonStart, jsonEnd + 1);
                result = JSON.parse(jsonString);
            }

            // Inject User Output into Result
            result.stdout = (stdout as any).stdout;
            // Merge stderr if needed, or just take user stderr
            result.stderr = (stdout as any).stderr;

            // If tracer had a specific error (like connection failed), it might be in tracerStderr
            // But usually we just care about user code stderr.

            return NextResponse.json(result);

        } catch (e: any) {
            return NextResponse.json({
                stdout: (stdout as any).stdout,
                stderr: (stdout as any).stderr + "\n" + (stdout as any).tracerJson // Debug info
            });
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
