'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { CodeEditor } from '@/components/CodeEditor';
import { UnifiedVisualizer } from '@/components/UnifiedVisualizer';
import { Timeline } from '@/components/Timeline';
import { WatchWindow } from '@/components/WatchWindow';
import { instrument } from '@/lib/engine/instrumenter';
import { ExecutionEngine, StateSnapshot } from '@/lib/engine/state-machine';
import { ProjectManager } from '@/components/ProjectManager';
import { SavedProject } from '@/types/Project';

import { Play, Zap, FileCode, Cpu, ChevronDown, ChevronUp, ChevronLeft, ChevronRight, Maximize2, Minimize2, PanelLeftClose, PanelLeftOpen, PanelRightClose, PanelRightOpen } from 'lucide-react';

const DEFAULT_TS_CODE = `console.log("Hello, TypeScript!");
`;

const DEFAULT_PYTHON_CODE = `print("Hello, Python!")
`;

const DEFAULT_JAVA_CODE = `public class Main {
    public static void main(String[] args) {
        System.out.println("Hello, Java!");
    }
}
`;

const DEFAULT_C_CODE = `#include <stdio.h>

int main() {
    printf("Hello, C!\\n");
    return 0;
}
`;

const DEFAULT_CPP_CODE = `#include <iostream>

int main() {
    std::cout << "Hello, C++!" << std::endl;
    return 0;
}
`;

// Helper to hydrate Backend (Python/Java) history to JS StateSnapshot
function hydrateBackendHistory(history: any[]): StateSnapshot[] {
  return history.map((step, idx) => {
    const { store, line, stack } = step;
    let { roots } = step;
    const heap: Record<string, any> = {};
    const cache = new Map<string, any>();

    // Patch: If the current step is inside 'traceCondition' (instrumentation),
    // map the line number back to the caller (the user's code) to avoid jumping loops/scopes.
    let effectiveLine = line;
    if (Array.isArray(stack) && stack.length > 0 && stack[0].name === 'traceCondition') {
      if (stack.length > 1) {
        effectiveLine = stack[1].line;
      }
      // Also use the previous step's roots to show caller variables instead of traceCondition's local vars
      if (idx > 0) {
        roots = history[idx - 1].roots;
      }
    }

    const resolve = (val: any): any => {
      if (!val) return val;
      if (typeof val === 'object' && val.__viz_ref) {
        const id = val.__viz_ref;
        if (cache.has(id)) return cache.get(id);

        const rawObj = store[id];
        if (!rawObj) return null;

        const isArray = rawObj.type === 'array';
        const obj: any = isArray ? [] : {};

        // Establish identity first
        // Use Object.defineProperty to make these properties non-enumerable if desired,
        // but usually fine to be enumerable but filtered by visualizer (check UnifiedVisualizer)
        // UnifiedVisualizer checks __viz_type.
        Object.defineProperty(obj, '__viz_id', { value: rawObj.__viz_id, writable: true, enumerable: false });

        if (rawObj.__viz_type || isArray) {
          Object.defineProperty(obj, '__viz_type', { value: rawObj.__viz_type || 'object', writable: true, enumerable: false });
        }

        cache.set(id, obj);

        // Populate
        if (isArray) {
          (rawObj.value as any[]).forEach((item: any) => {
            obj.push(resolve(item));
          });
        } else {
          const source = rawObj.type === 'object' ? rawObj.value : rawObj;

          for (const k in source) {
            if (k.startsWith('__viz')) continue;
            // Ignore metadata keys if they exist in source
            if (k === 'type' && !source.type && rawObj.type === 'object') continue;

            obj[k] = resolve(source[k]);
          }
        }
        return obj;
      }
      return val;
    };

    for (const [key, val] of Object.entries(roots)) {
      if (key.startsWith('__viz')) continue;
      heap[key] = resolve(val);
    }

    return {
      heap,
      stack: stack || {}, // Hydrate stack from step
      line: effectiveLine,
      description: `Line ${effectiveLine}`,
      conditionResult: step.conditionResult
    };
  });
}

export default function Home() {
  const [language, setLanguage] = useState<'typescript' | 'python' | 'java' | 'c' | 'cpp'>('typescript');
  const [code, setCode] = useState(DEFAULT_TS_CODE);
  const [history, setHistory] = useState<StateSnapshot[]>([]);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isCompiling, setIsCompiling] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [visualizedVariables, setVisualizedVariables] = useState<string[]>([]);
  const [ignoredPointers, setIgnoredPointers] = useState<Record<string, string[]>>({});
  const [visualizerPositions, setVisualizerPositions] = useState<Record<string, { x: number, y: number }>>({});
  const [playbackSpeed, setPlaybackSpeed] = useState(500);

  // IO State
  const [inputVal, setInputVal] = useState('');
  const [outputVal, setOutputVal] = useState('');

  // ... (Keep existing Layout State)
  const [editorWidth, setEditorWidth] = useState(33.33); // Percentage
  const [watchWindowWidth, setWatchWindowWidth] = useState(320); // Pixels

  // New Resizable States
  const [codeEditorHeight, setCodeEditorHeight] = useState(50); // Percentage of Left Column
  const [inputWidth, setInputWidth] = useState(50); // Percentage of IO Panel

  // Collapse States
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isIOCollapsed, setIsIOCollapsed] = useState(false);
  const [isWatchCollapsed, setIsWatchCollapsed] = useState(false);
  const [isInputCollapsed, setIsInputCollapsed] = useState(false);
  const [isOutputCollapsed, setIsOutputCollapsed] = useState(false);

  // Ref to store previous widths before collapse
  const prevEditorWidth = React.useRef(33.33);
  const prevWatchWidth = React.useRef(320);
  const prevInputWidth = React.useRef(50);

  const toggleSidebar = () => {
    if (isSidebarCollapsed) {
      setEditorWidth(prevEditorWidth.current);
    } else {
      prevEditorWidth.current = editorWidth;
      setEditorWidth(0);
    }
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  const toggleWatchWindow = () => {
    setIsWatchCollapsed(!isWatchCollapsed);
  };

  const [isResizingEditor, setIsResizingEditor] = useState(false);
  const [isResizingWatch, setIsResizingWatch] = useState(false);
  const [isResizingCodeEditorHeight, setIsResizingCodeEditorHeight] = useState(false);
  const [isResizingInputWidth, setIsResizingInputWidth] = useState(false);

  // Theme State
  const [themeMode, setThemeMode] = useState<'dark' | 'light' | 'codenow'>('codenow');
  const [accentColor, setAccentColor] = useState('blue'); // blue, green, red, yellow
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const engine = useMemo(() => new ExecutionEngine(), []);

  // Initialize Theme from LocalStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem('visualizer-theme');
    const savedAccent = localStorage.getItem('visualizer-accent');

    if (savedTheme === 'light' || savedTheme === 'dark' || savedTheme === 'codenow') {
      setThemeMode(savedTheme);
    }
    if (savedAccent) setAccentColor(savedAccent);
  }, []);

  // Apply Theme to HTML tag (safer for globals)
  useEffect(() => {
    const root = document.documentElement;

    // Reset classes
    root.classList.remove('light-mode', 'theme-codenow');

    // Apply Theme Class
    if (themeMode === 'light') {
      root.classList.add('light-mode');
    } else if (themeMode === 'codenow') {
      root.classList.add('theme-codenow');
      // Force settings or just trust CSS overrides?
      // CSS overrides accent, but let's keep react state separate or synced?
      // For now, let CSS override accent variables.
    }

    // Update Accent Color (only matters for standard themes, CodeNow overrides specific vars)
    // Remove existing accent classes
    ['accent-blue', 'accent-green', 'accent-red', 'accent-yellow'].forEach(c => {
      root.classList.remove(c);
    });
    // Add new accent class, unless valid for codenow? 
    // CodeNow CSS has !important on accent, so this clashing is fine.
    root.classList.add(`accent-${accentColor}`);

    // Save preferences
    localStorage.setItem('visualizer-theme', themeMode);
    localStorage.setItem('visualizer-accent', accentColor);
  }, [themeMode, accentColor]);

  // Save State Persistence
  useEffect(() => {
    const stateToSave = {
      code,
      language,
      visualizedVariables,
      ignoredPointers,
      visualizerPositions,
      timestamp: Date.now()
    };
    localStorage.setItem('visualizer-current-state', JSON.stringify(stateToSave));
  }, [code, language, visualizedVariables, ignoredPointers, visualizerPositions]);

  // Load State Persistence
  useEffect(() => {
    const savedState = localStorage.getItem('visualizer-current-state');
    if (savedState) {
      try {
        const parsed = JSON.parse(savedState);
        if (parsed.code) setCode(parsed.code);
        if (parsed.language) setLanguage(parsed.language);
        if (parsed.visualizedVariables) setVisualizedVariables(parsed.visualizedVariables);
        if (parsed.ignoredPointers) setIgnoredPointers(parsed.ignoredPointers);
        if (parsed.visualizerPositions) setVisualizerPositions(parsed.visualizerPositions);
      } catch (e) {
        console.error("Failed to load saved state", e);
      }
    }
  }, []);

  // Update CodeEditor isDarkMode prop based on theme
  const isEditorDark = themeMode === 'dark';

  const handleLanguageChange = (newLang: 'typescript' | 'python' | 'java' | 'c' | 'cpp') => {
    if (newLang === language) return;
    setLanguage(newLang);

    // Reset code to default if it looks like the user hasn't edited much, or just force for now.
    // Better: ask confirmation? No, simple switch uses default for that language.
    if (newLang === 'typescript') {
      setCode(DEFAULT_TS_CODE);
    } else if (newLang === 'python') {
      setCode(DEFAULT_PYTHON_CODE);
    } else if (newLang === 'java') {
      setCode(DEFAULT_JAVA_CODE);
    } else if (newLang === 'c') {
      setCode(DEFAULT_C_CODE);
    } else if (newLang === 'cpp') {
      setCode(DEFAULT_CPP_CODE);
    }
    setHistory([]);
    setCurrentStepIndex(0);
  };

  const handleLoadProject = (project: SavedProject) => {
    setCode(project.code);
    if (project.language) {
      setLanguage(project.language);
    } else {
      // Fallback for old projects
      setLanguage('typescript');
    }
    setVisualizedVariables(project.visualizedVariables);
    setIgnoredPointers(project.ignoredPointers);
    if (project.positions) {
      setVisualizerPositions(project.positions);
    } else {
      setVisualizerPositions({});
    }
    setHistory([]);
    setCurrentStepIndex(0);
  };

  // History Playback
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentStepIndex(prev => {
          if (prev < history.length - 1) {
            return prev + 1;
          } else {
            setIsPlaying(false);
            return prev;
          }
        });
      }, playbackSpeed);
    }
    return () => clearInterval(interval);
  }, [isPlaying, history.length, playbackSpeed]);

  // In handleRun, we will need to update to pass input
  const handleRun = async () => {
    setIsCompiling(true);
    setIsPlaying(false);
    setOutputVal(''); // Clear output on run

    try {
      if (language === 'typescript') {
        const instrumented = instrument(code);
        const { history, stdout } = engine.run(instrumented, inputVal);
        setHistory(history);
        if (stdout) setOutputVal(stdout);
      } else if (language === 'python') {
        // Python Execution
        const res = await fetch('/api/run-python', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ code, input: inputVal }) // Pass input
        });
        const data = await res.json();

        if (data.stderr) {
          // If there's stderr but also history, we might want to show it?
          // Or if error only.
          console.log("Stderr:", data.stderr);
        }

        if (data.error) {
          console.error(data.error);
          setOutputVal(`Error: ${data.error}\n${data.stderr || ''}`);
          // Don't return, maybe there is partial history?
          if (!data.history) return;
        }

        // Output
        if (data.stdout) {
          setOutputVal(data.stdout);
        }

        if (data.history) {
          const executionHistory = hydrateBackendHistory(data.history || data); // Handle both formats if I change API
          setHistory(executionHistory);
        }
      } else {
        // Java, C, C++ Execution
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
          setOutputVal(data.stdout || '');
          if (data.stderr) {
            const cleanStderr = data.stderr.replace(/^Picked up JAVA_TOOL_OPTIONS:.*\n?/gm, '').trim();
            if (cleanStderr) {
              setOutputVal(prev => prev + '\nStderr:\n' + cleanStderr);
            }
          }

          if (data.history && (language === 'java' || language === 'c' || language === 'cpp')) {
            const executionHistory = hydrateBackendHistory(data.history);
            setHistory(executionHistory);
          } else {
            setHistory([]);
          }
        }
      }
      setCurrentStepIndex(0);
    } catch (err: any) {
      console.error('Compilation/Runtime error:', err);
      setOutputVal(prev => prev + '\nError: ' + err.message);
    } finally {
      setIsCompiling(false);
    }
  };

  // Initial Run
  useEffect(() => {
    if (language === 'typescript' && code === DEFAULT_TS_CODE) {
      const instrumented = instrument(code);
      const { history } = engine.run(instrumented);
      setHistory(history);
    }
  }, []);

  // Resizing Logic
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isResizingEditor) {
        const newWidth = (e.clientX / window.innerWidth) * 100;
        if (newWidth > 15 && newWidth < 70) setEditorWidth(newWidth);
      }
      if (isResizingWatch) {
        const newWidth = window.innerWidth - e.clientX;
        if (newWidth > 200 && newWidth < 600) setWatchWindowWidth(newWidth);
      }
      if (isResizingCodeEditorHeight) {
        // Calculate height percentage relative to window height (minus navbar and timeline)
        // Approximation: Main content area height is ~ screen height - 56px (navbar) - ~64px (timeline)
        // But we can just use percentage of the parent container if we ref it, or just use window height as proxy
        // since the parent is "h-screen" minus navbar.
        // Let's rely on window height for simplicity but offset by navbar
        const navbarHeight = 56;
        const availableHeight = window.innerHeight - navbarHeight;
        const newHeight = ((e.clientY - navbarHeight) / availableHeight) * 100;
        if (newHeight > 20 && newHeight < 80) setCodeEditorHeight(newHeight);
      }
      if (isResizingInputWidth) {
        // This one is relative to the editor width
        // We know the editor width percentage.
        const editorPixelWidth = (window.innerWidth * editorWidth) / 100;
        const newWidth = (e.clientX / editorPixelWidth) * 100;
        if (newWidth > 20 && newWidth < 80) setInputWidth(newWidth);
      }
    };

    const handleMouseUp = () => {
      setIsResizingEditor(false);
      setIsResizingWatch(false);
      setIsResizingCodeEditorHeight(false);
      setIsResizingInputWidth(false);
      document.body.style.cursor = 'default';
    };

    if (isResizingEditor || isResizingWatch || isResizingCodeEditorHeight || isResizingInputWidth) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);

      if (isResizingCodeEditorHeight) document.body.style.cursor = 'row-resize';
      else if (isResizingInputWidth || isResizingEditor || isResizingWatch) document.body.style.cursor = 'col-resize';
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isResizingEditor, isResizingWatch, isResizingCodeEditorHeight, isResizingInputWidth, editorWidth]);

  const handleClearAll = () => {
    setVisualizedVariables([]);
    setVisualizerPositions({});
    setIgnoredPointers({});
  };

  const currentSnapshot = history[currentStepIndex] || { heap: {}, stack: {}, line: 0, description: 'Initialization' };

  return (
    <main className="flex flex-col h-screen overflow-hidden bg-theme-main text-theme-primary transition-colors duration-300">
      {/* Navbar */}
      <nav className="h-14 border-b border-theme flex items-center justify-between px-6 bg-theme-secondary/80 backdrop-blur-xl z-20">
        <div className="flex items-center gap-3">
          {/* ... Logo ... */}
          <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center shadow-lg shadow-indigo-500/20">
            <Zap size={18} className="text-white" fill="white" />
          </div>
          <h1 className="text-lg font-bold tracking-tight hidden md:block">
            My <span className="text-accent">Visualizer</span>
          </h1>

          {/* Removed Language Selector from here */}

          <div className="ml-2 hidden md:flex items-center gap-2 px-3 py-1 bg-theme-tertiary rounded-full border border-theme">
            <Cpu size={14} className="text-accent" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-theme-secondary">Drag & Drop Enabled</span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          {/* ... ProjectManager & Buttons ... */}
          <ProjectManager
            currentCode={code}
            currentLanguage={language}
            currentVisualizedVars={visualizedVariables}
            currentIgnoredPointers={ignoredPointers}
            currentPositions={visualizerPositions}
            onLoadProject={handleLoadProject}
          />

          <button
            onClick={() => setIsSettingsOpen(!isSettingsOpen)}
            className="p-2 text-theme-secondary hover:text-theme-primary hover:bg-theme-tertiary rounded-lg transition-colors"
            title="Settings"
          >
            <div className="w-5 h-5 flex flex-col justify-between items-center py-0.5">
              <span className="w-full h-0.5 bg-current rounded-full"></span>
              <span className="w-full h-0.5 bg-current rounded-full"></span>
              <span className="w-full h-0.5 bg-current rounded-full"></span>
            </div>
          </button>

          <button
            onClick={handleRun}
            disabled={isCompiling}
            className="flex items-center gap-2 bg-accent hover:opacity-90 text-white px-6 py-1.5 rounded-lg font-bold transition-all hover:scale-105 active:scale-95 disabled:opacity-50 shadow-lg"
          >
            <Play size={14} fill="currentColor" />
            <span>RUN CODE</span>
          </button>
        </div>
      </nav>

      {/* ... Settings Modal ... */}
      {isSettingsOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-end p-4 bg-transparent" onClick={() => setIsSettingsOpen(false)}>
          {/* ... */}
          <div
            className="mt-14 w-72 bg-theme-secondary border border-theme rounded-2xl shadow-2xl p-6 animate-in slide-in-from-top-4 duration-200"
            onClick={e => e.stopPropagation()}
          >
            <h3 className="text-lg font-bold text-theme-primary mb-4">Appearance</h3>

            <div className="mb-6">
              <label className="text-xs font-bold text-theme-secondary uppercase tracking-wider mb-2 block">Theme Mode</label>
              <div className="grid grid-cols-3 gap-2 bg-theme-tertiary p-1 rounded-xl">
                <button
                  onClick={() => setThemeMode('light')}
                  className={`py-2 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-2 ${themeMode === 'light' ? 'bg-white text-slate-900 shadow-sm' : 'text-theme-secondary hover:text-theme-primary'}`}
                >
                  <span>Light</span>
                </button>
                <button
                  onClick={() => setThemeMode('dark')}
                  className={`py-2 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-2 ${themeMode === 'dark' ? 'bg-slate-700 text-white shadow-sm' : 'text-theme-secondary hover:text-theme-primary'}`}
                >
                  <span>Dark</span>
                </button>
                <button
                  onClick={() => setThemeMode('codenow')}
                  className={`py-2 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-2 overflow-hidden ${themeMode === 'codenow' ? 'bg-green-500 text-white shadow-sm' : 'text-theme-secondary hover:text-theme-primary'}`}
                >
                  <span className="truncate">CodeNow</span>
                </button>
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-theme-secondary uppercase tracking-wider mb-2 block">Accent Color</label>
              <div className={`grid grid-cols-4 gap-3 ${themeMode === 'codenow' ? 'opacity-50 pointer-events-none grayscale' : ''}`}>
                {['blue', 'green', 'red', 'yellow'].map((color) => (
                  <button
                    key={color}
                    onClick={() => setAccentColor(color)}
                    className={`h-10 rounded-full border-2 transition-all hover:scale-110 ${accentColor === color ? 'border-theme-primary scale-110 shadow-lg' : 'border-transparent opacity-70 hover:opacity-100'}`}
                    style={{ background: color === 'blue' ? '#3b82f6' : color === 'green' ? '#22c55e' : color === 'red' ? '#ef4444' : '#eab308' }}
                  />
                ))}
              </div>
              {themeMode === 'codenow' && <p className="text-[10px] text-theme-secondary mt-2">Accents handled by theme</p>}
            </div>
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex-grow flex min-h-0 relative">

        {/* Editor Sidebar (Split) */}
        {/* Editor Sidebar (Split) */}
        {!isSidebarCollapsed && (
          <div style={{ width: `${editorWidth}%` }} className="flex flex-col border-r border-theme relative shrink-0 transition-all duration-300">
            {/* Header / Collapse Trigger */}
            <button
              onClick={toggleSidebar}
              className="absolute top-1/2 -right-3 z-50 w-6 h-6 bg-theme-tertiary border border-theme rounded-full flex items-center justify-center hover:bg-accent text-theme-secondary hover:text-white transition-colors shadow-sm"
            >
              <ChevronLeft size={14} />
            </button>

            {/* Top Half: Code Editor */}
            <div style={{ height: isIOCollapsed ? 'calc(100% - 48px)' : `${codeEditorHeight}%` }} className="relative font-mono text-[13px] border-b border-theme shrink-0 transition-all duration-300">
              <CodeEditor
                code={code}
                language={language}
                onLanguageChange={handleLanguageChange}
                onChange={(v) => setCode(v || '')}
                highlightedLine={currentSnapshot.line}
                conditionResult={currentSnapshot.conditionResult}
                isDarkMode={isEditorDark}
              />

              {/* Height Resize Handle - Only show if IO is visible */}
              {!isIOCollapsed && (
                <div
                  className="absolute left-0 right-0 bottom-0 h-1 cursor-row-resize hover:bg-accent active:bg-accent z-10 transition-colors delay-100 flex justify-center group"
                  onMouseDown={() => setIsResizingCodeEditorHeight(true)}
                >
                  <div className="w-8 h-4 bg-theme-tertiary rounded-full border border-theme flex items-center justify-center -mb-2 overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="w-4 h-0.5 bg-theme-secondary"></div>
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Half: Input/Output */}
            <div className={`flex flex-col bg-theme-main min-h-0 transition-all duration-300 ${isIOCollapsed ? 'h-12 shrink-0' : 'flex-grow'}`}>
              {/* Tabs / Header */}
              <div className={`flex shrink-0 relative ${isIOCollapsed ? 'h-full bg-accent/10 border-t-2 border-accent' : 'border-b border-theme bg-theme-tertiary/50'}`}>
                {isIOCollapsed ? (
                  /* Collapsed state - show prominent expand bar */
                  <button
                    onClick={() => setIsIOCollapsed(false)}
                    className="flex-grow px-4 text-sm font-bold text-theme-primary flex items-center justify-center gap-4 hover:bg-accent/20 transition-colors group"
                  >
                    <ChevronUp size={18} className="text-accent animate-bounce" />
                    <span>INPUT / OUTPUT</span>
                    <span className="text-accent text-xs">— Click to expand —</span>
                    <Maximize2 size={16} className="text-accent" />
                  </button>
                ) : (
                  /* Expanded state - show input/output tabs */
                  <>
                    <div
                      style={{ width: `${inputWidth}%` }}
                      className="px-4 py-2 text-xs font-bold text-theme-secondary border-r border-theme transition-all flex justify-between items-center"
                    >
                      INPUT
                    </div>
                    <div className="flex-grow px-4 py-2 text-xs font-bold text-theme-secondary flex justify-between items-center">
                      OUTPUT
                      <button
                        onClick={() => setIsIOCollapsed(true)}
                        className="hover:text-accent transition-colors flex items-center gap-1"
                        title="Collapse Input/Output"
                      >
                        <ChevronDown size={14} />
                        <Minimize2 size={12} />
                      </button>
                    </div>
                  </>
                )}
              </div>

              {!isIOCollapsed && (
                <div className="flex-grow flex min-h-0 relative">
                  {/* Input Area */}
                  {!isInputCollapsed ? (
                    <div
                      style={{ width: isOutputCollapsed ? '100%' : `${inputWidth}%` }}
                      className="h-full border-r border-theme relative shrink-0 transition-all duration-300"
                    >
                      <textarea
                        className="w-full h-full bg-transparent p-4 text-sm font-mono text-theme-primary focus:outline-none resize-none"
                        placeholder="Enter input for your code here..."
                        value={inputVal}
                        onChange={(e) => setInputVal(e.target.value)}
                      />
                    </div>
                  ) : (
                    /* Collapsed Input - Show expand button */
                    <button
                      onClick={() => setIsInputCollapsed(false)}
                      className="w-10 h-full bg-accent/10 hover:bg-accent/20 border-r-2 border-accent flex flex-col items-center justify-center shrink-0 cursor-pointer transition-colors group"
                      title="Expand Input"
                    >
                      <ChevronRight size={16} className="text-accent group-hover:scale-110 transition-transform" />
                      <div className="mt-2 [writing-mode:vertical-rl] rotate-180 text-xs font-bold text-accent uppercase tracking-wider">
                        INPUT
                      </div>
                    </button>
                  )}

                  {/* Resize Handle with Bi-directional Arrows */}
                  {!isInputCollapsed && !isOutputCollapsed && (
                    <div
                      className="w-1 cursor-col-resize hover:bg-accent active:bg-accent z-10 transition-colors delay-100 relative shrink-0"
                      onMouseDown={() => setIsResizingInputWidth(true)}
                    >
                      {/* Collapse Buttons Container - Centered on divider */}
                      <div className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 flex gap-0.5 z-20">
                        {/* Collapse Input (Left Arrow) */}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            prevInputWidth.current = inputWidth;
                            setIsInputCollapsed(true);
                          }}
                          onMouseDown={(e) => e.stopPropagation()}
                          className="w-5 h-5 bg-theme-tertiary border border-theme rounded-l-full flex items-center justify-center hover:bg-accent text-theme-secondary hover:text-white transition-colors shadow-sm"
                          title="Collapse Input"
                        >
                          <ChevronLeft size={12} />
                        </button>
                        {/* Collapse Output (Right Arrow) */}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            prevInputWidth.current = inputWidth;
                            setIsOutputCollapsed(true);
                          }}
                          onMouseDown={(e) => e.stopPropagation()}
                          className="w-5 h-5 bg-theme-tertiary border border-theme rounded-r-full flex items-center justify-center hover:bg-accent text-theme-secondary hover:text-white transition-colors shadow-sm"
                          title="Collapse Output"
                        >
                          <ChevronRight size={12} />
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Output Area */}
                  {!isOutputCollapsed ? (
                    <div className="flex-grow h-full relative bg-theme-secondary/5 min-w-0 transition-all duration-300">
                      <textarea
                        readOnly
                        className="w-full h-full bg-transparent p-4 text-sm font-mono text-theme-primary focus:outline-none resize-none"
                        placeholder="Output will appear here..."
                        value={outputVal}
                      />
                    </div>
                  ) : (
                    /* Collapsed Output - Show expand button */
                    <button
                      onClick={() => setIsOutputCollapsed(false)}
                      className="w-10 h-full bg-accent/10 hover:bg-accent/20 border-l-2 border-accent flex flex-col items-center justify-center shrink-0 cursor-pointer transition-colors group"
                      title="Expand Output"
                    >
                      <ChevronLeft size={16} className="text-accent group-hover:scale-110 transition-transform" />
                      <div className="mt-2 [writing-mode:vertical-rl] rotate-180 text-xs font-bold text-accent uppercase tracking-wider">
                        OUTPUT
                      </div>
                    </button>
                  )}
                </div>
              )}
            </div>

            {/* Resize Handle (For Editor Width) */}
            <div
              className="absolute right-0 top-0 bottom-0 w-1 cursor-col-resize hover:bg-accent active:bg-accent z-10 transition-colors delay-100 group"
              onMouseDown={() => setIsResizingEditor(true)}
            >
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-8 bg-theme-tertiary rounded-l-md border border-theme border-r-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="w-0.5 h-4 bg-theme-secondary"></div>
              </div>
            </div>
          </div>

        )}

        {/* Start Collapsed Sidebar Trigger (When sidebar is hidden) */}
        {isSidebarCollapsed && (
          <div className="w-10 border-r border-theme h-full flex flex-col items-center py-4 gap-4 bg-theme-tertiary/20 shrink-0">
            <button
              onClick={toggleSidebar}
              className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-theme-secondary/50 text-theme-secondary hover:text-accent transition-all"
              title="Expand Editor"
            >
              <PanelLeftOpen size={18} />
            </button>
          </div>
        )}


        {/* Visualizer & Watch Window */}
        <div className="flex-grow flex flex-col min-w-0">
          <div className="flex-grow flex min-h-0 relative">

            {/* Visualizer */}
            <div className="flex-grow relative min-w-0">
              <UnifiedVisualizer
                heap={currentSnapshot.heap}
                visualizedVariables={visualizedVariables}
                onRemoveVariable={(name) => setVisualizedVariables(prev => prev.filter(v => v !== name))}
                onAddVariable={(name) => setVisualizedVariables(prev => prev.includes(name) ? prev : [...prev, name])}
                ignoredPointers={ignoredPointers}
                onToggleIgnoredPointer={(varName, pointer) => {
                  setIgnoredPointers(prev => {
                    const currentList = prev[varName] || [];
                    const newList = currentList.includes(pointer)
                      ? currentList.filter(p => p !== pointer)
                      : [...currentList, pointer];
                    return { ...prev, [varName]: newList };
                  });
                }}
                code={code}
                currentLine={currentSnapshot.line}
                prevLine={history[currentStepIndex - 1]?.line}
                prevHeap={history[currentStepIndex - 1]?.heap}
                initialPositions={visualizerPositions}
                onPositionsChange={setVisualizerPositions}
                onClearAll={handleClearAll}
              />
            </div>

            {/* Resize Handle for Watch Window */}
            {!isWatchCollapsed && (
              <div
                className="w-1 cursor-col-resize user-select-none hover:bg-accent active:bg-accent transition-colors delay-100 z-10 relative flex-shrink-0"
                onMouseDown={() => setIsResizingWatch(true)}
              />
            )}

            {/* Watch Window */}
            {isWatchCollapsed ? (
              <div className="w-10 border-l border-theme h-full flex flex-col items-center py-4 bg-theme-tertiary/20 shrink-0">
                <button
                  onClick={toggleWatchWindow}
                  className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-theme-secondary/50 text-theme-secondary hover:text-accent transition-all"
                  title="Open Watch Window"
                >
                  <PanelRightOpen size={18} />
                </button>
                <div className="mt-8 [writing-mode:vertical-rl] rotate-180 text-xs font-bold tracking-widest text-theme-secondary uppercase opacity-50">
                  Heap Explorer
                </div>
              </div>
            ) : (
              <div style={{ width: `${watchWindowWidth}px` }} className="border-l border-theme shrink-0 flex flex-col relative transition-all duration-300">
                <button
                  onClick={toggleWatchWindow}
                  className="absolute top-1/2 -left-3 z-50 w-6 h-6 bg-theme-tertiary border border-theme rounded-full flex items-center justify-center hover:bg-accent text-theme-secondary hover:text-white transition-colors shadow-sm"
                >
                  <ChevronRight size={14} />
                </button>
                <WatchWindow heap={currentSnapshot.heap} stack={currentSnapshot.stack} />
              </div>
            )}
          </div>

          {/* Timeline Footer */}
          <Timeline
            currentStep={currentStepIndex}
            totalSteps={history.length}
            onStepChange={setCurrentStepIndex}
            description={currentSnapshot.description}
            isPlaying={isPlaying}
            onPlayPause={() => setIsPlaying(!isPlaying)}
            playbackSpeed={playbackSpeed}
            onSpeedChange={setPlaybackSpeed}
          />
        </div>
      </div>
    </main>
  );
}
