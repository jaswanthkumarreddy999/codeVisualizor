export interface ProjectFolder {
    id: string;
    name: string;
    icon: string;
    color: string;
    description: string;
    order: number;
    isExpanded?: boolean;
}

export interface SavedProject {
    id: string;
    name: string;
    updatedAt: number;
    code: string;
    language: 'typescript' | 'python' | 'java' | 'c' | 'cpp';
    visualizedVariables: string[];
    ignoredPointers: Record<string, string[]>;
    positions?: Record<string, { x: number, y: number }>;
    folderId?: string; // null/undefined = root level
}
