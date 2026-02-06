import { NextResponse } from 'next/server';
import { writeFile, mkdir, rm, unlink } from 'fs/promises';
import { exec } from 'child_process';
import { promisify } from 'util';
import { join } from 'path';
import { nanoid } from 'nanoid';

const execAsync = promisify(exec);

export async function POST(req: Request) {
    let tmpDir = '';
    try {
        const { code, input } = await req.json();
        if (!code) return NextResponse.json({ error: 'No code provided' }, { status: 400 });

        const id = nanoid();
        tmpDir = join(process.cwd(), 'tmp', id);
        const sourcePath = join(tmpDir, 'program.c');
        const binaryPath = join(tmpDir, 'program');

        await mkdir(tmpDir, { recursive: true });
        await writeFile(sourcePath, code);

        // Compile
        try {
            // Use -g for debug info, -O0 for no optimization (simpler stepping)
            await execAsync(`gcc -g -O0 "${sourcePath}" -o "${binaryPath}"`);
        } catch (compileError: any) {
            return NextResponse.json({
                error: "Compilation Failed",
                stderr: compileError.stderr || compileError.message
            });
        }

        // Run with GDB Tracer
        const tracerScript = join(process.cwd(), 'lib/c/gdb_tracer.py');
        const pythonCmd = process.platform === 'win32' ? 'python' : 'python3';
        
        const { stdout, stderr } = await new Promise<{ stdout: string, stderr: string }>((resolve, reject) => {
            const child = exec(`"${pythonCmd}" "${tracerScript}" "${binaryPath}"`, { timeout: 10000 }, (error, stdout, stderr) => {
                resolve({ stdout: stdout as string, stderr: stderr as string });
            });

            if (input && child.stdin) {
                child.stdin.write(input);
                child.stdin.end();
            }
        });

        try {
            const result = JSON.parse(stdout);
            return NextResponse.json(result);
        } catch (e) {
            return NextResponse.json({ stdout, stderr });
        }

    } catch (e: any) {
        return NextResponse.json({ error: e.message }, { status: 500 });
    } finally {
        if (tmpDir) {
            try { await rm(tmpDir, { recursive: true, force: true }); } catch (e) { }
        }
    }
}
