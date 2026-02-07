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
        // java -cp <classpath of tracer>:<classpath of user code> Tracer Main
        const tracerClassPath = join(process.cwd(), 'lib/java');
        const sep = process.platform === 'win32' ? ';' : ':';

        const { stdout, stderr } = await new Promise<{ stdout: string, stderr: string }>((resolve, reject) => {
            // NOTE: We need to include the current directory (or where Tracer is) and the user code directory in classpath
            // Also need to allow JDI access if needed, but Tracer is standard java program. 
            // However, Tracer USES com.sun.jdi which is in the JDK.

            // We unset JAVA_TOOL_OPTIONS to prevent "Picked up ..." message from interfering with JDI handshake
            // Memory limit is passed directly to the Tracer process via -Xmx64m
            const env = { ...process.env };
            delete env.JAVA_TOOL_OPTIONS;

            const child = exec(`java -Xmx64m -cp "${tracerClassPath}${sep}${classPath}" Tracer Main`, {
                timeout: 10000,
                env
            }, (error, stdout, stderr) => {
                const cleanStderr = (stderr as string).replace(/^Picked up JAVA_TOOL_OPTIONS:.*\n?/gm, '').trim();
                resolve({ stdout: stdout as string, stderr: cleanStderr });
            });

            if (input && child.stdin) {
                child.stdin.write(input);
                child.stdin.end();
            }
        });

        try {
            // Attempt to parse the stdout as JSON history
            // The Tracer prints the JSON blob at the end.
            // But if the user code prints something, it might be mixed? 
            // Actually, my Tracer implementation prints the JSON as the last line (or only thing if logic holds).
            // But the User code runs in the VM connected to the tracer...
            // Wait, `LaunchingConnector` launches the target VM. 
            // Does the Tracer inherit stdout of the target VM?
            // "The target VM's standard output and standard error are redirected to the process returned by launch()."
            // So Process (which we didn't expose in my Tracer code) holds the stream.
            // My Tracer `launchTarget` returns `VirtualMachine`. 
            // `LaunchingConnector.launch` returns `VirtualMachine`, but `Process` is available via `vm.process()`.
            // I need to forward that output or capture it in the Tracer!
            // I missed that in Tracer.java. 
            // The Tracer.java currently does NOT print the user's output.
            // I should update Tracer.java to capture `vm.process().getInputStream()` and print it or include it in JSON.
            // But for now let's see what happens. If I don't forward it, user output is lost.
            // The user wants visualization. 
            // Let's assume for now I will get the JSON.

            // Robust JSON extraction: Find start and end of JSON object
            const jsonStart = stdout.indexOf('{');
            const jsonEnd = stdout.lastIndexOf('}');

            if (jsonStart === -1 || jsonEnd === -1) {
                throw new Error("No JSON output found in stdout");
            }

            const jsonString = stdout.substring(jsonStart, jsonEnd + 1);
            let result = JSON.parse(jsonString);

            // Clean up stderr in the result object
            if (result.stderr) {
                result.stderr = (result.stderr as string).replace(/^Picked up JAVA_TOOL_OPTIONS:.*\n?/gm, '').trim();
            }

            // If parse succeeds, great.
            return NextResponse.json(result);
        } catch (e) {
            // If not JSON, maybe just raw output or error
            // Also clean this stderr just in case
            const finalStderr = (stderr as string).replace(/^Picked up JAVA_TOOL_OPTIONS:.*\n?/gm, '').trim();
            return NextResponse.json({ stdout, stderr: finalStderr });
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
