import { useEffect } from 'react';
import { SavedProject } from '@/types/Project';

interface PersistenceProps {
  language: string;
  code: string;
  visualizedVariables: string[];
  visualizerPositions: Record<string, { x: number; y: number }>;
  ignoredPointers: Record<string, string[]>;
  setLanguage: (lang: any) => void;
  setCode: (code: string) => void;
  setVisualizedVariables: (vars: string[]) => void;
  setVisualizerPositions: (pos: any) => void;
  setIgnoredPointers: (pointers: any) => void;
}

export function usePersistence({
  language,
  code,
  visualizedVariables,
  visualizerPositions,
  ignoredPointers,
  setLanguage,
  setCode,
  setVisualizedVariables,
  setVisualizerPositions,
  setIgnoredPointers
}: PersistenceProps) {
  // Load saved state
  useEffect(() => {
    const saved = localStorage.getItem('visualizer-current-state');
    if (saved) {
      try {
        const state: SavedProject = JSON.parse(saved);
        if (state.language) setLanguage(state.language);
        if (state.code) setCode(state.code);
        if (state.visualizedVariables) setVisualizedVariables(state.visualizedVariables);
        if (state.visualizerPositions) setVisualizerPositions(state.visualizerPositions);
        if (state.ignoredPointers) setIgnoredPointers(state.ignoredPointers);
      } catch (e) {
        console.error('Failed to parse saved state', e);
      }
    }
  }, []);

  // Save current state
  useEffect(() => {
    const state: SavedProject = {
      id: 'current',
      name: 'Current Session',
      language: language as any,
      code,
      visualizedVariables,
      visualizerPositions,
      ignoredPointers,
      lastModified: Date.now()
    };
    localStorage.setItem('visualizer-current-state', JSON.stringify(state));
  }, [language, code, visualizedVariables, visualizerPositions, ignoredPointers]);
} 
