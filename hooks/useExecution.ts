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
        const data = await res.json();
        if (data.error) setOutputVal(`Error: ${data.error}\n${data.stderr || ''}`);
        if (data.stdout) setOutputVal(data.stdout);
        if (data.history) setHistory(hydrateBackendHistory(data.history, code));
      } else {
        const endpoint = language === 'java' ? '/api/run-java'
          : language === 'c' ? '/api/run-c'
            : '/api/run-cpp';

        const res = await fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ code, input: inputVal })
        });
        const data = await res.json();
        if (data.error) {
          setOutputVal(`Error: ${data.error}\n${data.stderr || ''}`);
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
            // If there's a runtime error, attach it to the last step's stdout
            // so it's visible when stepping through to the end
            if (errorMsg && hydrated.length > 0) {
              const last = hydrated[hydrated.length - 1];
              last.stdout = (last.stdout ? last.stdout + '\n\n' : '') + '⚠ Runtime Error:\n' + errorMsg;
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
