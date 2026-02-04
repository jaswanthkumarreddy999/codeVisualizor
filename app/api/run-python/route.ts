import { NextResponse } from 'next/server';
import { writeFile, unlink } from 'fs/promises';
import { exec } from 'child_process';
import { promisify } from 'util';
import { join } from 'path';
import { nanoid } from 'nanoid';

const execAsync = promisify(exec);

export async function POST(req: Request) {
    try {
        const { code, input } = await req.json();
        if (!code) return NextResponse.json({ error: 'No code provided' }, { status: 400 });

        const fileName = `temp_${nanoid()}.py`;
        const tmpDir = join(process.cwd(), 'tmp');
        const filePath = join(tmpDir, fileName);
        const tracerPath = join(process.cwd(), 'lib/python/tracer.py');

        // Ensure tmp exists
        await execAsync(`mkdir -p ${tmpDir}`);

        await writeFile(filePath, code);

        try {
            // Run python script with tracer and manual Promise to support stdin
            const { stdout, stderr } = await new Promise<{ stdout: string, stderr: string }>((resolve, reject) => {
                const child = exec(`python3 ${tracerPath} ${filePath}`, { maxBuffer: 1024 * 1024 * 10 }, (error, stdout, stderr) => {
                    if (error) {
                        reject({ message: error.message, stderr });
                    } else {
                        resolve({ stdout: stdout as string, stderr: stderr as string });
                    }
                });

                if (input && child.stdin) {
                    child.stdin.write(input);
                    child.stdin.end();
                }
            });

            try {
                // Stdout now contains the JSON result wrapper { history, stdout }
                // We should probably check if it starts with { 
                // In case of error printed before json?
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
