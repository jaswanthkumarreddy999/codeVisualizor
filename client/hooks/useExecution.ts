import { useState, useEffect, useMemo, useCallback } from 'react';
import { instrument } from '@/lib/engine/instrumenter';
import { ExecutionEngine, StateSnapshot } from '@/lib/engine/state-machine';
import { hydrateBackendHistory } from '@/lib/engine/hydrateHistory';

export function useExecution(language: string, code: string, DEFAULT_TS_CODE: string) {
  const [history, setHistory] = useState<StateSnapshot[]>([]);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isCompiling, setIsCompiling] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(500);
  const [inputVal, setInputVal] = useState('');
  const [outputVal, setOutputVal] = useState('');

  const engine = useMemo(() => new ExecutionEngine(), []);

  const handleRun = useCallback(async () => {
    setIsCompiling(true);
    setIsPlaying(false);
    setOutputVal('');

    try {
      if (language === 'typescript') {
        const instrumented = instrument(code);
        try {
          const { history, stdout } = engine.run(instrumented, inputVal);
          setHistory(history);
          setOutputVal(stdout || '');
        } catch (err: any) {
          setOutputVal(`Runtime Error: ${err.message}`);
          setHistory([]);
        }
      } else if (language === 'python') {
        const res = await fetch('/api/run-python', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ code, input: inputVal })
        });
        const contentType = res.headers.get('content-type') || '';
        if (!contentType.includes('application/json')) {
          if (res.status === 502 || res.status === 503) {
            // Auto-retry for Python too
            setOutputVal('⏳ Server warming up, retrying automatically...');
            await new Promise(r => setTimeout(r, 5000));
            return handleRun();
          }
          setOutputVal('⚠ Server error. Please try again.');
          return;
        }
        const data = await res.json();
        if (data.error) {
          setOutputVal(`Error: ${data.error}\n${data.stderr || ''}`);
        } else {
          if (data.stdout) setOutputVal(data.stdout);
          if (data.history) setHistory(hydrateBackendHistory(data.history, code));
        }
      } else {
        const endpoint = language === 'java' ? '/api/run-java'
          : language === 'c' ? '/api/run-c'
            : '/api/run-cpp';

        // Helper: wait for backend to wake up, then execute once
        const runWithWarmup = async (): Promise<Response> => {
          const MAX_WAIT_MS = 120000; // 2 minutes max
          const PING_INTERVAL = 15000; // ping every 15 seconds — avoid rate limiting
          const startTime = Date.now();

          // First attempt — if it works, great
          const firstRes = await fetch(endpoint, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ code, input: inputVal })
          });
          const firstType = firstRes.headers.get('content-type') || '';
          if (firstType.includes('application/json') && firstRes.status !== 429) {
            return firstRes;
          }

          // Backend sleeping or rate-limited — ping lightweight endpoint until awake
          setOutputVal('⏳ Server warming up, please wait...');
          while (true) {
            const elapsed = Date.now() - startTime;
            const remaining = Math.max(0, Math.ceil((MAX_WAIT_MS - elapsed) / 1000));

            if (elapsed >= MAX_WAIT_MS) {
              setOutputVal('⚠ Backend did not respond after 2 minutes. Please try again later.');
              throw new Error('timeout');
            }

            setOutputVal(`⏳ Server warming up... (~${remaining}s remaining)`);
            await new Promise(r => setTimeout(r, PING_INTERVAL));

            // Ping lightweight endpoint to check if backend is awake
            try {
              const ping = await fetch('/api/public/folders', { method: 'GET' });
              // 429 or non-2xx means backend still spinning up
              if (ping.status === 429 || !ping.ok) continue;
            } catch {
              continue;
            }

            // Backend awake — now execute the actual code
            setOutputVal('⏳ Running code...');
            const res = await fetch(endpoint, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ code, input: inputVal })
            });
            // If still not ready (429 or non-JSON), keep waiting
            const resType = res.headers.get('content-type') || '';
            if (!resType.includes('application/json') || res.status === 429) {
              continue;
            }
            return res;
          }
        };

        let res: Response;
        try {
          res = await runWithWarmup();
        } catch {
          return;
        }

        // Check if response is still not JSON
        const contentType = res.headers.get('content-type') || '';
        if (!contentType.includes('application/json')) {
          setOutputVal(`⚠ Server error (${res.status}). Please try again.`);
          setHistory([]);
          return;
        }

        const data = await res.json();
        if (data.error) {
          // Parse javac stderr into clean, concise error messages
          const rawStderr = (data.stderr || '')
            .replace(/^Picked up JAVA_TOOL_OPTIONS:.*\n?/gm, '')
            .replace(/\/[^\s]*\/Main\.java/g, 'Main.java')
            .trim();

          // Extract individual errors: "Main.java:N: error: <message>"
          // Subtract lineOffset to map formatted file line → original editor line
          const offset = data.lineOffset || 0;
          const errorLines = rawStderr.split('\n');
          const errors: string[] = [];
          for (let i = 0; i < errorLines.length; i++) {
            const match = errorLines[i].match(/Main\.java:(\d+):\s*error:\s*(.+)/);
            if (match) {
              const lineNum = Math.max(1, parseInt(match[1]) - offset);
              const msg = match[2].trim();
              // Look ahead for symbol/location details
              let detail = '';
              for (let j = i + 1; j < Math.min(i + 4, errorLines.length); j++) {
                const sym = errorLines[j].match(/symbol:\s*(.+)/);
                if (sym) { detail = ` (${sym[1].trim()})`; break; }
              }
              errors.push(`Line ${lineNum}: ${msg}${detail}`);
            }
          }

          // Fallback: show raw if parsing failed
          const errorCount = rawStderr.match(/(\d+) error/)?.[1];
          const summary = errors.length > 0
            ? errors.join('\n')
            : (data.error === 'Compilation Failed' ? rawStderr : data.error);

          const header = errorCount
            ? `⚠ ${errorCount} Compilation Error${Number(errorCount) > 1 ? 's' : ''}:`
            : '⚠ Compilation Error:';

          setOutputVal(`${header}\n${summary}`);
        } else {
          // Clean up JVM noise from stderr
          const cleanStderr = data.stderr
            ? data.stderr.replace(/^Picked up JAVA_TOOL_OPTIONS:.*\n?/gm, '').trim()
            : '';

          // Format runtime errors from stderr into a readable message
          const formatRuntimeError = (stderr: string): string => {
            if (!stderr) return '';
            // Extract the meaningful first line (e.g. "Exception in thread "main" java.util.NoSuchElementException")
            const lines = stderr.split('\n').filter(l => l.trim());
            if (lines.length === 0) return '';

            // Find the root exception line (not a "at ..." stack frame)
            const exceptionLine = lines.find(l => !l.trim().startsWith('at ') && !l.trim().startsWith('...'));
            // Find the user code line reference (Main.java:XX)
            const userFrame = lines.find(l => l.includes('Main.main(Main.java:'));

            let msg = exceptionLine || lines[0];
            if (userFrame) {
              const lineMatch = userFrame.match(/Main\.java:(\d+)/);
              if (lineMatch) msg += `\n  → at line ${lineMatch[1]}`;
            }
            return msg;
          };

          const stdout = data.stdout || '';
          const errorMsg = formatRuntimeError(cleanStderr);

          if (stdout && errorMsg) {
            setOutputVal(stdout + '\n\n⚠ Runtime Error:\n' + errorMsg);
          } else if (errorMsg) {
            setOutputVal('⚠ Runtime Error:\n' + errorMsg);
          } else {
            setOutputVal(stdout);
          }

            if (data.history) {
              const hydrated = hydrateBackendHistory(data.history, code);
              // Apply line offset: tracer reports lines from the formatted/instrumented file,
              // but the editor shows the original user code. Subtract the offset to align them.
              const offset = data.lineOffset || 0;
              if (offset !== 0) {
                hydrated.forEach(snap => { snap.line = Math.max(1, snap.line - offset); });
              }
              // If there's a runtime error, attach it to the last step's stdout
              if (errorMsg && hydrated.length > 0) {
                const last = hydrated[hydrated.length - 1];
                last.stdout = (last.stdout ? last.stdout + '\n\n' : '') + '⚠ Runtime Error:\n' + errorMsg;
              }

              // Show warning if 2000 step limit is hit (common for backends)
              if (hydrated.length >= 2000) {
                setOutputVal(prev => prev + '\n\n⚠ Execution Limit: Truncated to 2000 steps.');
              }

              setHistory(hydrated);
            } else setHistory([]);
        }
      }
      setCurrentStepIndex(0);
    } catch (err: any) {
      console.error('Execution error:', err);
      setOutputVal(prev => prev + '\nError: ' + err.message);
    } finally {
      setIsCompiling(false);
    }
  }, [language, code, inputVal, engine]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentStepIndex(prev => {
          if (prev < history.length - 1) return prev + 1;
          setIsPlaying(false);
          return prev;
        });
      }, playbackSpeed);
    }
    return () => clearInterval(interval);
  }, [isPlaying, history.length, playbackSpeed]);

  useEffect(() => {
    if (language === 'typescript' && code === DEFAULT_TS_CODE) {
      const instrumented = instrument(code);
      const { history } = engine.run(instrumented);
      setHistory(history);
    }
  }, []);

  return {
    history, setHistory,
    currentStepIndex, setCurrentStepIndex,
    isCompiling,
    isPlaying, setIsPlaying,
    playbackSpeed, setPlaybackSpeed,
    inputVal, setInputVal,
    outputVal, setOutputVal,
    handleRun
  };
} 
