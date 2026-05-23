'use client';

import React from 'react';
import { Play, Zap, FileCode, Cpu, Settings } from 'lucide-react';
import { ProjectManager } from './ProjectManager';
import { SavedProject } from '@/types/Project';

interface NavbarProps {
  onRun: () => void;
  isCompiling: boolean;
  onToggleSettings: () => void;
  onLoadProject: (project: SavedProject) => void;
  visualizedVariables: string[];
  ignoredPointers: Record<string, string[]>;
  visualizerPositions: Record<string, { x: number; y: number }>;
  code: string;
  language: string;
}

export const Navbar: React.FC<NavbarProps> = ({
  onRun,
  isCompiling,
  onToggleSettings,
  onLoadProject,
  visualizedVariables,
  ignoredPointers,
  visualizerPositions,
  code,
  language
}) => {
  return (
    <nav className="h-14 shrink-0 bg-theme-secondary border-b border-theme flex items-center px-4 justify-between z-40 transition-colors">
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center text-white shadow-lg shadow-accent/20">
            <Cpu size={20} />
          </div>
          <span className="font-bold tracking-tight text-theme-primary">
            Code<span className="text-accent">Visualizer</span>
          </span>
        </div>

        <div className="h-6 w-px bg-theme-tertiary" />

        <ProjectManager
          onLoadProject={onLoadProject}
          currentCode={code}
          currentLanguage={language as any}
          currentVisualizedVars={visualizedVariables}
          currentIgnoredPointers={ignoredPointers}
          currentPositions={visualizerPositions}
        />
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={onToggleSettings}
          className="p-2 rounded-lg text-theme-secondary hover:bg-theme-tertiary transition-colors"
          title="Settings"
        >
          <Settings size={20} />
        </button>

        <button
          onClick={onRun}
          disabled={isCompiling}
          className={`flex items-center gap-2 px-6 py-2 rounded-lg font-bold text-sm transition-all shadow-lg ${
            isCompiling
              ? 'bg-theme-tertiary text-theme-secondary cursor-not-allowed'
              : 'bg-accent text-white hover:opacity-90 active:scale-95 shadow-accent/25'
          }`}
        >
          {isCompiling ? (
            <>
              <div className="w-4 h-4 border-2 border-theme-secondary border-t-white rounded-full animate-spin" />
              Compiling...
            </>
          ) : (
            <>
              <Play size={16} fill="currentColor" />
              Run Code
            </>
          )}
        </button>
      </div>
    </nav>
  );
};
