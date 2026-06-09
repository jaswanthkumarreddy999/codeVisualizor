'use client';

import React from 'react';
import { Play, Settings, ChevronLeft, ChevronRight, MessageSquarePlus } from 'lucide-react';
import { ProjectManager } from './ProjectManager';
import { AuthButton } from './AuthButton';
import { FeedbackModal } from './FeedbackModal';
import { SavedProject } from '@/types/Project';
import { AnimatePresence } from 'framer-motion';

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
  activeProject?: SavedProject | null;
  onNavigateProject?: (direction: 'prev' | 'next') => void;
  hasPrev?: boolean;
  hasNext?: boolean;
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
  language,
  activeProject,
  onNavigateProject,
  hasPrev,
  hasNext,
}) => {
  const [isFeedbackOpen, setIsFeedbackOpen] = React.useState(false);

  return (
    <nav className="h-14 shrink-0 bg-theme-secondary border-b border-theme flex items-center px-4 justify-between z-40 transition-colors">
      <div className="flex items-center gap-4">
        {/* Logo */}
        <div className="flex items-center gap-2 shrink-0">
          <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center text-white shadow-lg shadow-accent/20">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 20v2"/><path d="M12 2v2"/><path d="M17 20v2"/><path d="M17 2v2"/>
              <path d="M2 12h2"/><path d="M2 17h2"/><path d="M2 7h2"/>
              <path d="M20 12h2"/><path d="M20 17h2"/><path d="M20 7h2"/>
              <path d="M7 20v2"/><path d="M7 2v2"/>
              <rect x="4" y="4" width="16" height="16" rx="2"/>
              <rect x="8" y="8" width="8" height="8" rx="1"/>
            </svg>
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

        {/* Next/Prev navigation — shown when a project from a folder is active */}
        {activeProject && onNavigateProject && (
          <>
            <div className="h-6 w-px bg-theme-tertiary" />
            <div className="flex items-center gap-1">
              <button
                onClick={() => onNavigateProject('prev')}
                disabled={!hasPrev}
                className="p-1.5 rounded-lg text-theme-secondary hover:bg-theme-tertiary disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                title="Previous program in folder"
              >
                <ChevronLeft size={16} />
              </button>
              <span className="text-xs font-mono text-theme-secondary max-w-[180px] truncate px-1" title={activeProject.name}>
                {activeProject.name}
              </span>
              <button
                onClick={() => onNavigateProject('next')}
                disabled={!hasNext}
                className="p-1.5 rounded-lg text-theme-secondary hover:bg-theme-tertiary disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                title="Next program in folder"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </>
        )}
      </div>

      <div className="flex items-center gap-3">
        {/* Auth button — sign in/out with Google via Spring Boot */}
        <AuthButton />

        <button
          onClick={() => setIsFeedbackOpen(true)}
          className="p-2 rounded-lg text-theme-secondary hover:bg-theme-tertiary transition-colors flex items-center gap-2"
          title="Send Feedback"
        >
          <MessageSquarePlus size={20} />
          <span className="text-xs font-bold hidden md:inline">Feedback</span>
        </button>

        <button
          onClick={onToggleSettings}
          className="p-2 rounded-lg text-theme-secondary hover:bg-theme-tertiary transition-colors"
          title="Settings"
        >
          <Settings size={20} />
        </button>

        <AnimatePresence>
          {isFeedbackOpen && (
            <FeedbackModal onClose={() => setIsFeedbackOpen(false)} />
          )}
        </AnimatePresence>

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
