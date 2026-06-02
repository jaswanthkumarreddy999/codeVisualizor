'use client';

import React, { useState, useEffect } from 'react';
import { CodeEditor } from '@/components/CodeEditor';
import { UnifiedVisualizer } from '@/components/UnifiedVisualizer';
import { Timeline } from '@/components/Timeline';
import { WatchWindow } from '@/components/WatchWindow';
import { Navbar } from '@/components/Navbar';
import { SettingsModal } from '@/components/SettingsModal';
import { IOPanel } from '@/components/IOPanel';
import { ErrorBoundary } from '@/components/ErrorBoundary';

import { useTheme } from '@/hooks/useTheme';
import { useLayout } from '@/hooks/useLayout';
import { usePersistence } from '@/hooks/usePersistence';
import { useExecution } from '@/hooks/useExecution';
import { AnimatePresence } from 'framer-motion';

import { ChevronLeft, ChevronRight, PanelLeftOpen, PanelRightOpen } from 'lucide-react';
import { SavedProject } from '@/types/Project';

const DEFAULTS = {
  typescript: 'console.log("Hello, TypeScript!");\n',
  python: 'print("Hello, Python!")\n',
  java: 'public class Main {\n    public static void main(String[] args) {\n        System.out.println("Hello, Java!");\n    }\n}\n',
  c: '#include <stdio.h>\n\nint main() {\n    printf("Hello, C!\\n");\n    return 0;\n}\n',
  cpp: '#include <iostream>\n\nint main() {\n    std::cout << "Hello, C++!" << std::endl;\n    return 0;\n}\n'
};

export default function VisualizerPage() {
  const [language, setLanguage] = useState<keyof typeof DEFAULTS>('typescript');
  const [code, setCode] = useState(DEFAULTS.typescript);
  const [visualizedVariables, setVisualizedVariables] = useState<string[]>([]);
  const [ignoredPointers, setIgnoredPointers] = useState<Record<string, string[]>>({});
  const [visualizerPositions, setVisualizerPositions] = useState<Record<string, { x: number, y: number }>>({});

  // Silently wake up Spring Boot backend on page load so it's ready when user clicks Run
  useEffect(() => {
    fetch('/api/public/folders', { method: 'GET' }).catch(() => {});
  }, []);

  // Track active project for next/prev folder navigation
  const [activeProject, setActiveProject] = useState<SavedProject | null>(null);
  const [folderSiblings, setFolderSiblings] = useState<SavedProject[]>([]);

  const { themeMode, setThemeMode, accentColor, setAccentColor, isSettingsOpen, setIsSettingsOpen } = useTheme();
  const layout = useLayout();
  
  const exe = useExecution(language, code, DEFAULTS.typescript);
  
  usePersistence({
    language, code, visualizedVariables, visualizerPositions, ignoredPointers,
    setLanguage, setCode, setVisualizedVariables, setVisualizerPositions, setIgnoredPointers
  });

  const handleLanguageChange = (newLang: keyof typeof DEFAULTS) => {
    if (newLang === language) return;
    setLanguage(newLang);
    setCode(DEFAULTS[newLang]);
    exe.setHistory([]);
    exe.setCurrentStepIndex(0);
  };

  const handleClearAll = () => {
    setVisualizedVariables([]);
    setVisualizerPositions({});
    setIgnoredPointers({});
  };

  const handleLoadProject = (p: SavedProject) => {
    setCode(p.code);
    setLanguage(p.language as any);
    setVisualizedVariables(p.visualizedVariables);
    setIgnoredPointers(p.ignoredPointers);
    setVisualizerPositions(p.positions || {});
    exe.setHistory([]);
    exe.setCurrentStepIndex(0);
    setActiveProject(p);

    // Load folder siblings for next/prev navigation
    if (p.folderId) {
      try {
        const saved = localStorage.getItem('my-visualizer-projects');
        if (saved) {
          const all: SavedProject[] = JSON.parse(saved);
          const siblings = all.filter(s => s.folderId === p.folderId);
          setFolderSiblings(siblings);
        }
      } catch { setFolderSiblings([]); }
    } else {
      setFolderSiblings([]);
    }
  };

  const handleNavigateProject = (direction: 'prev' | 'next') => {
    if (!activeProject || folderSiblings.length === 0) return;
    const idx = folderSiblings.findIndex(s => s.id === activeProject.id);
    if (idx === -1) return;
    const nextIdx = direction === 'next' ? idx + 1 : idx - 1;
    if (nextIdx < 0 || nextIdx >= folderSiblings.length) return;
    handleLoadProject(folderSiblings[nextIdx]);
  };

  const activeIdx = activeProject ? folderSiblings.findIndex(s => s.id === activeProject.id) : -1;

  const currentSnapshot = exe.history[exe.currentStepIndex] || { heap: {}, stack: {}, line: 0, description: 'Initialization', stdout: '' };

  return (
    <main className="flex flex-col h-screen overflow-hidden bg-theme-main text-theme-primary transition-colors duration-300">
      <Navbar
        onRun={exe.handleRun}
        isCompiling={exe.isCompiling}
        onToggleSettings={() => setIsSettingsOpen(!isSettingsOpen)}
        onLoadProject={handleLoadProject}
        visualizedVariables={visualizedVariables}
        ignoredPointers={ignoredPointers}
        visualizerPositions={visualizerPositions}
        code={code}
        language={language}
        activeProject={activeProject}
        onNavigateProject={handleNavigateProject}
        hasPrev={activeIdx > 0}
        hasNext={activeIdx >= 0 && activeIdx < folderSiblings.length - 1}
      />

      <AnimatePresence>
        {isSettingsOpen && (
          <SettingsModal
            themeMode={themeMode}
            accentColor={accentColor}
            onThemeModeChange={setThemeMode}
            onAccentColorChange={setAccentColor}
            onClose={() => setIsSettingsOpen(false)}
          />
        )}
      </AnimatePresence>

      <div className="flex-grow flex min-h-0 relative">
        {!layout.isSidebarCollapsed ? (
          <div style={{ width: `${layout.editorWidth}%` }} className="flex flex-col border-r border-theme relative shrink-0 transition-all duration-300">
            <button
              onClick={layout.toggleSidebar}
              className="absolute top-1/2 -right-3 z-50 w-6 h-6 bg-theme-tertiary border border-theme rounded-full flex items-center justify-center hover:bg-accent text-theme-secondary hover:text-white transition-colors shadow-sm"
            >
              <ChevronLeft size={14} />
            </button>

            <div style={{ height: layout.isIOCollapsed ? 'calc(100% - 40px)' : `${layout.codeEditorHeight}%` }} className="relative border-b border-theme shrink-0 transition-all duration-300">
              <CodeEditor
                code={code}
                language={language}
                onLanguageChange={handleLanguageChange}
                onChange={(v) => setCode(v || '')}
                highlightedLine={currentSnapshot.line}
                conditionResult={currentSnapshot.conditionResult}
                isDarkMode={themeMode === 'dark' || themeMode === 'codenow'}
              />
              {!layout.isIOCollapsed && (
                <div
                  className="absolute left-0 right-0 bottom-0 h-1 cursor-row-resize hover:bg-accent active:bg-accent z-10 transition-colors"
                  onMouseDown={() => layout.setIsResizingCodeHeight(true)}
                />
              )}
            </div>

            {/* STDOUT display logic:
                - No history (not run / compile error): show exe.outputVal
                - History exists: use currentSnapshot.stdout (step-accurate)
                - DO NOT change — ensures output only appears after println executes */}
            <IOPanel
              inputVal={exe.inputVal}
              onInputChange={exe.setInputVal}
              outputVal={exe.history.length === 0 ? exe.outputVal : (currentSnapshot.stdout || '')}
              isIOCollapsed={layout.isIOCollapsed}
              onToggleIO={layout.toggleIO}
              inputWidth={layout.inputWidth}
              onInputWidthResize={layout.setIsResizingInputWidth}
            />

            <div
              className="absolute right-0 top-0 bottom-0 w-1 cursor-col-resize hover:bg-accent active:bg-accent z-10"
              onMouseDown={() => layout.setIsResizingEditor(true)}
            />
          </div>
        ) : (
          <div className="w-10 border-r border-theme h-full flex flex-col items-center py-4 bg-theme-tertiary/20 shrink-0">
            <button onClick={layout.toggleSidebar} className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-theme-secondary text-theme-secondary transition-all">
              <PanelLeftOpen size={18} />
            </button>
          </div>
        )}

        <div className="flex-grow flex flex-col min-w-0">
          <div className="flex-grow flex min-h-0 relative">
            <div className="flex-grow relative min-w-0 p-4">
              <ErrorBoundary>
                <UnifiedVisualizer
                  heap={currentSnapshot.heap}
                  stdout={currentSnapshot.stdout}
                  visualizedVariables={visualizedVariables}
                  onRemoveVariable={(name) => setVisualizedVariables(prev => prev.filter(v => v !== name))}
                  onAddVariable={(name) => setVisualizedVariables(prev => prev.includes(name) ? prev : [...prev, name])}
                  ignoredPointers={ignoredPointers}
                  onToggleIgnoredPointer={(varName, pointer) => {
                    setVisualizedVariables(prev => {
                      const list = ignoredPointers[varName] || [];
                      setIgnoredPointers({
                        ...ignoredPointers,
                        [varName]: list.includes(pointer) ? list.filter(p => p !== pointer) : [...list, pointer]
                      });
                      return prev;
                    });
                  }}
                  code={code}
                  currentLine={currentSnapshot.line}
                  prevLine={exe.history[exe.currentStepIndex - 1]?.line}
                  prevHeap={exe.history[exe.currentStepIndex - 1]?.heap}
                  initialPositions={visualizerPositions}
                  onPositionsChange={setVisualizerPositions}
                  onClearAll={handleClearAll}
                />
              </ErrorBoundary>
            </div>

            {!layout.isWatchCollapsed ? (
              <div style={{ width: `${layout.watchWindowWidth}px` }} className="border-l border-theme shrink-0 flex flex-col relative transition-all duration-300">
                <button
                  onClick={layout.toggleWatchWindow}
                  className="absolute top-1/2 -left-3 z-50 w-6 h-6 bg-theme-tertiary border border-theme rounded-full flex items-center justify-center hover:bg-accent text-theme-secondary hover:text-white transition-colors shadow-sm"
                >
                  <ChevronRight size={14} />
                </button>
                <WatchWindow heap={currentSnapshot.heap} stack={currentSnapshot.stack} />
                <div
                  className="absolute left-0 top-0 bottom-0 w-1 cursor-col-resize"
                  onMouseDown={() => layout.setIsResizingWatch(true)}
                />
              </div>
            ) : (
              <div className="w-10 border-l border-theme h-full flex flex-col items-center py-4 bg-theme-tertiary/20 shrink-0">
                <button onClick={layout.toggleWatchWindow} className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-theme-secondary text-theme-secondary transition-all">
                  <PanelRightOpen size={18} />
                </button>
              </div>
            )}
          </div>

          <Timeline
            currentStep={exe.currentStepIndex}
            totalSteps={exe.history.length}
            onStepChange={exe.setCurrentStepIndex}
            description={currentSnapshot.description}
            isPlaying={exe.isPlaying}
            onPlayPause={() => exe.setIsPlaying(!exe.isPlaying)}
            playbackSpeed={exe.playbackSpeed}
            onSpeedChange={exe.setPlaybackSpeed}
          />
        </div>
      </div>
    </main>
  );
}
