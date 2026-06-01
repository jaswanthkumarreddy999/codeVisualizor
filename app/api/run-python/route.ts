import { NextResponse } from 'next/server';
import { writeFile, mkdir, rm, unlink } from 'fs/promises';
import { exec } from 'child_process';
import { join } from 'path';
import { nanoid } from 'nanoid';

export async function POST(req: Request) {
    let filePath = '';
    try {
        const { code, input } = await req.json();
        if (!code) return NextResponse.json({ error: 'No code provided' }, { status: 400 });

        const fileName = `temp_${nanoid()}.py`;
        const tmpDir = join(process.cwd(), 'tmp');
        filePath = join(tmpDir, fileName);
        const tracerPath = join(process.cwd(), 'lib/python/tracer.py');

        // Ensure tmp exists
        await mkdir(tmpDir, { recursive: true });

        await writeFile(filePath, code);

        try {
            // Run python script with tracer and spawn for better control and timeout
            const pythonCmd = process.platform === 'win32' ? 'python' : 'python3';
            
            const { stdout, stderr } = await new Promise<{ stdout: string, stderr: string }>((resolve, reject) => {
                const child = exec(`"${pythonCmd}" "${tracerPath}" "${filePath}"`, { 
                    timeout: 10000, // 10 second timeout
                    maxBuffer: 1024 * 1024 * 10,
                    killSignal: 'SIGKILL'
                }, (error, stdout, stderr) => {
                    if (error) {
                        if ((error as any).killed || error.signal === 'SIGTERM' || error.signal === 'SIGKILL') {
                            reject({ message: "Execution timed out (10s limit exceeded).", stderr });
                        } else {
                            reject({ message: error.message, stderr });
                        }
                    } else {
                        resolve({ stdout: stdout as string, stderr: stderr as string });
                    }
                });

                if (child.stdin) {
                  if (input) {
                    child.stdin.write(input);
                  }
                  child.stdin.end();
                }
            });

            try {
                // Stdout now contains the JSON result wrapper { history, stdout }
                const result = JSON.parse(stdout);
                if (stderr) result.stderr = stderr;
                return NextResponse.json(result);
            } catch (parseError) {
                console.error("JSON Parse Error:", stdout);
                return NextResponse.json({ error: "Failed to parse execution output", raw: stdout, stderr }, { status: 500 });
            }

        } catch (execError: any) {
            console.error("Exec error", execError);
            return NextResponse.json({ error: execError.message, stderr: execError.stderr }, { status: 500 });
        } finally {
            try { await unlink(filePath); } catch (e) { }
        }
    } catch (e: any) {
        return NextResponse.json({ error: e.message }, { status: 500 });
    }
}
