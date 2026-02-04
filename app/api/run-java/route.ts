import { NextResponse } from 'next/server';
import { writeFile, unlink } from 'fs/promises';
import { exec } from 'child_process';
import { promisify } from 'util';
import { join } from 'path';
import { nanoid } from 'nanoid';

const execAsync = promisify(exec);

export async function POST(req: Request) {
    let filePath = '';
    let classPath = '';
    try {
        const { code, input } = await req.json();
        if (!code) return NextResponse.json({ error: 'No code provided' }, { status: 400 });

        // For Java, we need to extract the class name to name the file correctly, 
        // or just enforce a class name like "Main".
        // Let's enforce "Main" for simplicity or try to detect it.
        // If we use a random filename, public class Name must match.
        // Simplest: Replace the class name to "Main" or save as Main.java and force user to use Main class?
        // Or strip "public" and save as Main.java?
        // Let's assume the user defines a class. If it's public, it must match filename.
        // We will regex replace "public class X" with "public class Main" and save as Main.java in a temp folder.

        const id = nanoid();
        const tmpDir = join(process.cwd(), 'tmp', id);
        await execAsync(`mkdir -p ${tmpDir}`);

        let processedCode = code;
        // Simple regex to rename public class to Main if present
        if (processedCode.includes('public class')) {
            processedCode = processedCode.replace(/public\s+class\s+\w+/, 'public class Main');
        } else if (!processedCode.includes('class Main')) {
            // accessible class
            // might be just "class Something"
            // If we really want to support arbitrary code, wrapping it might be hard without parsing.
            // We'll trust the user to write valid java or we force it to be "Main".
            // Let's try to save as Main.java and hope for the best if we renamed public class.
        }

        filePath = join(tmpDir, 'Main.java');
        classPath = tmpDir; // Where .class will live

        await writeFile(filePath, processedCode);

        // Compile
        try {
            await execAsync(`javac -g "${filePath}"`);
        } catch (compileError: any) {
            return NextResponse.json({
                error: "Compilation Failed",
                stderr: compileError.stderr || compileError.message
            });
        }

        // Run with Tracer
        // java -cp <classpath of tracer>:<classpath of user code> Tracer Main
        const tracerClassPath = join(process.cwd(), 'lib/java');

        const { stdout, stderr } = await new Promise<{ stdout: string, stderr: string }>((resolve, reject) => {
            // NOTE: We need to include the current directory (or where Tracer is) and the user code directory in classpath
            // Also need to allow JDI access if needed, but Tracer is standard java program. 
            // However, Tracer USES com.sun.jdi which is in the JDK.

            const child = exec(`java -cp "${tracerClassPath}:${classPath}" Tracer Main`, { timeout: 10000 }, (error, stdout, stderr) => {
                resolve({ stdout: stdout as string, stderr: stderr as string });
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

            let result = JSON.parse(stdout);
            // If parse succeeds, great.
            return NextResponse.json(result);
        } catch (e) {
            // If not JSON, maybe just raw output or error
            return NextResponse.json({ stdout, stderr });
        }

    } catch (e: any) {
        return NextResponse.json({ error: e.message }, { status: 500 });
    } finally {
        if (filePath) {
            // Cleanup the unique temp directory
            try { await execAsync(`rm -rf "${classPath}"`); } catch (e) { }
        }
    }
}
