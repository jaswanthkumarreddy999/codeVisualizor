export interface ProjectFolder {
    id: string;
    name: string;
    icon: string;
    color: string;
    description: string;
    order: number;
    isExpanded?: boolean;
}

export interface StateSnapshot {
  line: number;
  heap: Record<string, any>;
  stack: any;
  stdout: string;
  description: string;
  conditionResult?: boolean | null;
}

export interface SavedProject {
  id: string;
  name: string;
  code: string;
  language?: 'typescript' | 'python' | 'java' | 'c' | 'cpp';
  visualizedVariables: string[];
  visualizerPositions?: Record<string, { x: number; y: number }>;
  ignoredPointers: Record<string, string[]>;
  lastModified: number;
  // Legacy support
  positions?: Record<string, { x: number; y: number }>;
}
