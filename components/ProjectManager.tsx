'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { createPortal } from 'react-dom';
import {
    Save, FolderOpen, Trash2, Copy, X, Check, Edit2, Plus, LayoutGrid, Code, Search,
    ArrowLeft, FileCode, Folder, FolderPlus, ChevronRight, ChevronDown, Hash,
    MoveHorizontal, PanelLeft, Layers, Link, GitBranch, Network, Grid3X3, Redo,
    Home, MoreVertical
} from 'lucide-react';
import { nanoid } from 'nanoid';
import { NEETCODE_150_PROJECTS } from '../lib/neetcode150';
import { ProjectFolder, SavedProject } from '../types/Project';

// ===================== INTERFACES =====================

// Interfaces moved to ../types/Project.ts

interface ProjectManagerProps {
    currentCode: string;
    currentLanguage: 'typescript' | 'python' | 'java' | 'c' | 'cpp';
    currentVisualizedVars: string[];
    currentIgnoredPointers: Record<string, string[]>;
    currentPositions: Record<string, { x: number, y: number }>;
    onLoadProject: (project: SavedProject) => void;
}

// ===================== ICON MAPPING =====================

const FOLDER_ICONS: Record<string, React.ElementType> = {
    'Hash': Hash,
    'MoveHorizontal': MoveHorizontal,
    'PanelLeft': PanelLeft,
    'Search': Search,
    'Layers': Layers,
    'Link': Link,
    'GitBranch': GitBranch,
    'Network': Network,
    'Grid3X3': Grid3X3,
    'Redo': Redo,
    'Folder': Folder,
    'Code': Code,
};

const FOLDER_COLORS = [
    '#10b981', // emerald
    '#3b82f6', // blue
    '#8b5cf6', // violet
    '#f59e0b', // amber
    '#ef4444', // red
    '#ec4899', // pink
    '#06b6d4', // cyan
    '#84cc16', // lime
];

// ===================== DEFAULT DEMO FOLDERS =====================

const DEFAULT_FOLDERS: ProjectFolder[] = [
    { id: 'basics', name: 'Java Basics', icon: 'Code', color: '#10b981', description: '50 Basic Problems: IO, Loops, Arrays', order: -1 },
    { id: 'arrays', name: 'Arrays & Hashing', icon: 'Hash', color: '#10b981', description: 'Two Sum, Contains Duplicate, Group Anagrams', order: 0 },
    { id: 'two-pointers', name: 'Two Pointers', icon: 'MoveHorizontal', color: '#3b82f6', description: '3Sum, Container with Water, Trapping Rain', order: 1 },
    { id: 'sliding-window', name: 'Sliding Window', icon: 'PanelLeft', color: '#8b5cf6', description: 'Max Subarray, Longest Substring', order: 2 },
    { id: 'stack', name: 'Stack', icon: 'Layers', color: '#ef4444', description: 'Valid Parentheses, Min Stack', order: 3 },
    { id: 'binary-search', name: 'Binary Search', icon: 'Search', color: '#f59e0b', description: 'Search Rotated, Find Min, Median Arrays', order: 4 },
    { id: 'linked-list', name: 'Linked List', icon: 'Link', color: '#ec4899', description: 'Reverse, Merge, Cycle Detection', order: 5 },
    { id: 'trees', name: 'Trees', icon: 'GitBranch', color: '#06b6d4', description: 'Traversals, BST, LCA', order: 6 },
    { id: 'tries', name: 'Tries', icon: 'Network', color: '#84cc16', description: 'Implement Trie, Word Dictionary', order: 7 },
    { id: 'heap', name: 'Heap / Priority Queue', icon: 'Grid3X3', color: '#14b8a6', description: 'Kth Largest, Task Scheduler', order: 8 },
    { id: 'backtracking', name: 'Backtracking', icon: 'Redo', color: '#f97316', description: 'Permutations, N-Queens, Subsets', order: 9 },
    { id: 'graphs', name: 'Graphs', icon: 'Network', color: '#84cc16', description: 'BFS, DFS, Dijkstra, Topo Sort', order: 10 },
    { id: 'advanced-graphs', name: 'Advanced Graphs', icon: 'Network', color: '#84cc16', description: 'Swim in Rising Water, Alien Dictionary', order: 11 },
    { id: '1d-dp', name: '1-D DP', icon: 'Grid3X3', color: '#a855f7', description: 'Climbing Stairs, House Robber', order: 12 },
    { id: '2d-dp', name: '2-D DP', icon: 'Grid3X3', color: '#a855f7', description: 'LCS, Edit Distance', order: 13 },
    { id: 'greedy', name: 'Greedy', icon: 'Code', color: '#eab308', description: 'Jump Game, Gas Station', order: 14 },
    { id: 'intervals', name: 'Intervals', icon: 'PanelLeft', color: '#6366f1', description: 'Merge Intervals, Meeting Rooms', order: 15 },
    { id: 'math', name: 'Math & Geometry', icon: 'Code', color: '#f43f5e', description: 'Rotate Image, Spiral Matrix', order: 16 },
    { id: 'bit-manipulation', name: 'Bit Manipulation', icon: 'Code', color: '#6b7280', description: 'Single Number, Reverse Bits', order: 17 },
];

// ===================== COMPONENT =====================

export const ProjectManager: React.FC<ProjectManagerProps> = ({
    currentCode,
    currentLanguage,
    currentVisualizedVars,
    currentIgnoredPointers,
    currentPositions,
    onLoadProject
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [view, setView] = useState<'folders' | 'create-project' | 'create-folder' | 'folder-contents'>('folders');
    const [projects, setProjects] = useState<SavedProject[]>([]);
    const [folders, setFolders] = useState<ProjectFolder[]>([]);
    const [newProjectName, setNewProjectName] = useState('');
    const [newFolderName, setNewFolderName] = useState('');
    const [newFolderIcon, setNewFolderIcon] = useState('Folder');
    const [newFolderColor, setNewFolderColor] = useState(FOLDER_COLORS[0]);
    const [activeProjectId, setActiveProjectId] = useState<string | null>(null);
    const [currentFolderId, setCurrentFolderId] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [savingToFolderId, setSavingToFolderId] = useState<string | null>(null);
    const [mounted, setMounted] = useState(false);
    const [sidebarCollapsed, setSidebarCollapsed] = useState<Record<string, boolean>>({});

    // Drag and Drop state
    const [draggedProjectId, setDraggedProjectId] = useState<string | null>(null);
    const [dragOverFolderId, setDragOverFolderId] = useState<string | null>(null);
    const [dragOverRoot, setDragOverRoot] = useState(false);



    useEffect(() => {
        setMounted(true);
    }, []);

    // Load from localStorage and Seed Data
    useEffect(() => {
        if (isOpen) {
            const savedProjects = localStorage.getItem('my-visualizer-projects');
            const savedFolders = localStorage.getItem('my-visualizer-folders');
            const hasImportedNeetcodeV6 = localStorage.getItem('neetcode-imported-v6');

            let currentProjects: SavedProject[] = [];
            let currentFolders: ProjectFolder[] = [];

            if (savedProjects) {
                try { currentProjects = JSON.parse(savedProjects); } catch (e) { console.error(e); }
            }

            if (savedFolders) {
                try { currentFolders = JSON.parse(savedFolders); } catch (e) { console.error(e); }
            }

            // Seed NeetCode 150 (Split Version) and Basics
            if (!hasImportedNeetcodeV6) {
                console.log("Seeding NeetCode 150 & Basics Projects (v6)...");

                // Remove old NeetCode projects to avoid duplicates
                currentProjects = currentProjects.filter(p => !p.id.startsWith('nc150-'));

                // Add new projects
                currentProjects = [...currentProjects, ...NEETCODE_150_PROJECTS];

                // Force update folders to ensure all categories exist (including new Basics)
                // Merge with existing folders if user created custom ones?
                // For simplicity, we'll re-add default folders if they are missing.
                // But replacing currentFolders = DEFAULT_FOLDERS wipes custom folders.
                // Better approach: Merge defaults into current.

                const existingFolderIds = new Set(currentFolders.map(f => f.id));
                const missingDefaults = DEFAULT_FOLDERS.filter(f => !existingFolderIds.has(f.id));
                currentFolders = [...currentFolders, ...missingDefaults];

                // Save to storage
                localStorage.setItem('my-visualizer-projects', JSON.stringify(currentProjects));
                localStorage.setItem('my-visualizer-folders', JSON.stringify(currentFolders));
                localStorage.setItem('neetcode-imported-v6', 'true'); // New flag
            } else if (!savedFolders) {
                // Initialize default folders if just starting out but flag somehow set (unlikely) or normal init
                currentFolders = DEFAULT_FOLDERS;
                localStorage.setItem('my-visualizer-folders', JSON.stringify(currentFolders));
            }

            setProjects(currentProjects);
            setFolders(currentFolders);
        }
    }, [isOpen]);

    const saveProjectsToStorage = (newProjects: SavedProject[]) => {
        localStorage.setItem('my-visualizer-projects', JSON.stringify(newProjects));
        setProjects(newProjects);
    };

    const saveFoldersToStorage = (newFolders: ProjectFolder[]) => {
        localStorage.setItem('my-visualizer-folders', JSON.stringify(newFolders));
        setFolders(newFolders);
    };

    // ===================== PROJECT CRUD =====================

    const handleSaveNew = () => {
        if (!newProjectName.trim()) return;

        const newProject: SavedProject = {
            id: nanoid(),
            name: newProjectName.trim(),
            updatedAt: Date.now(),
            code: currentCode,
            language: currentLanguage,
            visualizedVariables: currentVisualizedVars,
            ignoredPointers: currentIgnoredPointers,
            positions: currentPositions,
            folderId: savingToFolderId || currentFolderId || undefined
        };

        const updatedProjects = [newProject, ...projects];
        saveProjectsToStorage(updatedProjects);
        setActiveProjectId(newProject.id);
        setView(currentFolderId ? 'folder-contents' : 'folders');
        setNewProjectName('');
        setSavingToFolderId(null);
    };

    const handleOverwrite = (id: string, e?: React.MouseEvent) => {
        e?.stopPropagation();
        const updatedProjects = projects.map(p =>
            p.id === id
                ? { ...p, code: currentCode, language: currentLanguage, visualizedVariables: currentVisualizedVars, ignoredPointers: currentIgnoredPointers, positions: currentPositions, updatedAt: Date.now() }
                : p
        );
        saveProjectsToStorage(updatedProjects);
        setActiveProjectId(id);
    };

    const handleDelete = (id: string, e: React.MouseEvent) => {
        e.stopPropagation();
        if (confirm('Are you sure you want to delete this project?')) {
            const updatedProjects = projects.filter(p => p.id !== id);
            saveProjectsToStorage(updatedProjects);
            if (activeProjectId === id) setActiveProjectId(null);
        }
    };

    const handleDuplicate = (project: SavedProject, e: React.MouseEvent) => {
        e.stopPropagation();
        const newProject: SavedProject = {
            ...project,
            id: nanoid(),
            name: `${project.name} (Copy)`,
            updatedAt: Date.now()
        };
        const updatedProjects = [newProject, ...projects];
        saveProjectsToStorage(updatedProjects);
    };

    const handleRename = (id: string, currentName: string, e: React.MouseEvent) => {
        e.stopPropagation();
        const newName = prompt("Enter new project name:", currentName);
        if (newName && newName.trim() !== "" && newName !== currentName) {
            const updatedProjects = projects.map(p =>
                p.id === id ? { ...p, name: newName.trim(), updatedAt: Date.now() } : p
            );
            saveProjectsToStorage(updatedProjects);
        }
    };

    const handleLoad = (project: SavedProject) => {
        onLoadProject(project);
        setActiveProjectId(project.id);
        setIsOpen(false);
    };

    const handleMoveToFolder = (projectId: string, folderId: string | null) => {
        const updatedProjects = projects.map(p =>
            p.id === projectId ? { ...p, folderId: folderId || undefined } : p
        );
        saveProjectsToStorage(updatedProjects);
    };

    // ===================== DRAG AND DROP HANDLERS =====================

    const handleDragStart = (e: React.DragEvent, projectId: string) => {
        setDraggedProjectId(projectId);
        e.dataTransfer.effectAllowed = 'move';
        e.dataTransfer.setData('text/plain', projectId);
        // Add a slight delay for visual feedback
        setTimeout(() => {
            const elem = e.target as HTMLElement;
            elem.style.opacity = '0.5';
        }, 0);
    };

    const handleDragEnd = (e: React.DragEvent) => {
        setDraggedProjectId(null);
        setDragOverFolderId(null);
        setDragOverRoot(false);
        const elem = e.target as HTMLElement;
        elem.style.opacity = '1';
    };

    const handleDragOverFolder = (e: React.DragEvent, folderId: string) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
        if (dragOverFolderId !== folderId) {
            setDragOverFolderId(folderId);
            setDragOverRoot(false);
        }
    };

    const handleDragOverRoot = (e: React.DragEvent) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
        setDragOverRoot(true);
        setDragOverFolderId(null);
    };

    const handleDragLeave = () => {
        setDragOverFolderId(null);
        setDragOverRoot(false);
    };

    const handleDropOnFolder = (e: React.DragEvent, folderId: string) => {
        e.preventDefault();
        const projectId = e.dataTransfer.getData('text/plain') || draggedProjectId;
        if (projectId) {
            handleMoveToFolder(projectId, folderId);
        }
        setDraggedProjectId(null);
        setDragOverFolderId(null);
    };

    const handleDropOnRoot = (e: React.DragEvent) => {
        e.preventDefault();
        const projectId = e.dataTransfer.getData('text/plain') || draggedProjectId;
        if (projectId) {
            handleMoveToFolder(projectId, null);
        }
        setDraggedProjectId(null);
        setDragOverRoot(false);
    };

    // ===================== FOLDER CRUD =====================

    const handleCreateFolder = () => {
        if (!newFolderName.trim()) return;

        const newFolder: ProjectFolder = {
            id: nanoid(),
            name: newFolderName.trim(),
            icon: newFolderIcon,
            color: newFolderColor,
            description: '',
            order: folders.length
        };

        saveFoldersToStorage([...folders, newFolder]);
        setNewFolderName('');
        setNewFolderIcon('Folder');
        setNewFolderColor(FOLDER_COLORS[0]);
        setView('folders');
    };

    const handleDeleteFolder = (folderId: string, e: React.MouseEvent) => {
        e.stopPropagation();
        if (confirm('Delete this folder? Projects inside will be moved to root.')) {
            // Move projects to root
            const updatedProjects = projects.map(p =>
                p.folderId === folderId ? { ...p, folderId: undefined } : p
            );
            saveProjectsToStorage(updatedProjects);

            // Delete folder
            const updatedFolders = folders.filter(f => f.id !== folderId);
            saveFoldersToStorage(updatedFolders);

            if (currentFolderId === folderId) {
                setCurrentFolderId(null);
                setView('folders');
            }
        }
    };

    const handleRenameFolder = (folderId: string, currentName: string, e: React.MouseEvent) => {
        e.stopPropagation();
        const newName = prompt("Enter new folder name:", currentName);
        if (newName && newName.trim() !== "" && newName !== currentName) {
            const updatedFolders = folders.map(f =>
                f.id === folderId ? { ...f, name: newName.trim() } : f
            );
            saveFoldersToStorage(updatedFolders);
        }
    };

    // ===================== COMPUTED VALUES =====================

    const formatDate = (ts: number) => new Date(ts).toLocaleString(undefined, {
        year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
    });

    const getProjectsInFolder = (folderId: string | null) => {
        if (folderId === null) {
            return projects.filter(p => !p.folderId);
        }
        return projects.filter(p => p.folderId === folderId);
    };

    const filteredProjects = useMemo(() => {
        let filtered = currentFolderId
            ? projects.filter(p => p.folderId === currentFolderId)
            : projects;

        if (searchQuery) {
            filtered = filtered.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()));
        }
        return filtered;
    }, [projects, currentFolderId, searchQuery]);

    const currentFolder = folders.find(f => f.id === currentFolderId);

    const getFolderIcon = (iconName: string) => {
        const IconComponent = FOLDER_ICONS[iconName] || Folder;
        return IconComponent;
    };

    // ===================== RENDER HELPERS =====================

    const renderFolderCard = (folder: ProjectFolder) => {
        const IconComponent = getFolderIcon(folder.icon);
        const projectCount = getProjectsInFolder(folder.id).length;
        const isDropTarget = dragOverFolderId === folder.id;

        return (
            <div
                key={folder.id}
                onClick={() => { setCurrentFolderId(folder.id); setView('folder-contents'); }}
                onDragOver={(e) => handleDragOverFolder(e, folder.id)}
                onDragLeave={handleDragLeave}
                onDrop={(e) => handleDropOnFolder(e, folder.id)}
                className={`group bg-theme-secondary border-2 rounded-xl p-5 cursor-pointer transition-all hover:shadow-xl hover:shadow-black/10 flex flex-col ${isDropTarget ? 'border-accent bg-accent/10 scale-[1.02]' : 'border-theme hover:border-opacity-50'}`}
                style={{ '--folder-color': folder.color } as React.CSSProperties}
            >
                {/* Drop indicator */}
                {isDropTarget && (
                    <div className="absolute inset-0 rounded-xl border-2 border-dashed border-accent pointer-events-none animate-pulse" />
                )}

                <div className="flex justify-between items-start mb-4">
                    <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center transition-colors"
                        style={{ backgroundColor: `${folder.color}20`, color: folder.color }}
                    >
                        <IconComponent size={24} />
                    </div>
                    <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                            onClick={(e) => handleRenameFolder(folder.id, folder.name, e)}
                            className="p-1.5 text-theme-secondary hover:text-theme-primary hover:bg-theme-tertiary rounded-lg transition-colors"
                            title="Rename"
                        >
                            <Edit2 size={14} />
                        </button>
                        <button
                            onClick={(e) => handleDeleteFolder(folder.id, e)}
                            className="p-1.5 text-theme-secondary hover:text-red-400 hover:bg-theme-tertiary rounded-lg transition-colors"
                            title="Delete"
                        >
                            <Trash2 size={14} />
                        </button>
                    </div>
                </div>

                <h3 className="font-bold text-lg mb-1 text-theme-primary">{folder.name}</h3>
                <p className="text-xs text-theme-secondary mb-4 line-clamp-2">{folder.description || 'No description'}</p>

                <div className="mt-auto flex items-center justify-between pt-3 border-t border-theme">
                    <span className="text-xs text-theme-secondary">
                        {isDropTarget ? '📥 Drop here!' : `${projectCount} project${projectCount !== 1 ? 's' : ''}`}
                    </span>
                    <ChevronRight size={16} className="text-theme-secondary group-hover:translate-x-1 transition-transform" />
                </div>
            </div>
        );
    };

    const renderProjectCard = (project: SavedProject) => {
        const isDragging = draggedProjectId === project.id;

        return (
            <div
                key={project.id}
                draggable
                onDragStart={(e) => handleDragStart(e, project.id)}
                onDragEnd={handleDragEnd}
                className={`group bg-theme-secondary border border-theme hover:border-accent/50 rounded-xl p-5 transition-all hover:shadow-xl hover:shadow-accent/5 flex flex-col cursor-grab active:cursor-grabbing ${activeProjectId === project.id ? 'ring-1 ring-accent border-accent' : ''} ${isDragging ? 'opacity-50 scale-95' : ''}`}
            >
                <div className="flex justify-between items-start mb-4">
                    <div className="w-10 h-10 rounded-lg bg-theme-tertiary flex items-center justify-center group-hover:bg-accent/20 group-hover:text-accent transition-colors text-theme-secondary">
                        <Code size={20} />
                    </div>
                    {activeProjectId === project.id && (
                        <span className="text-[10px] font-bold bg-accent text-white px-2 py-1 rounded-full">ACTIVE</span>
                    )}
                </div>

                <h3 className="font-bold text-lg mb-1 truncate text-theme-primary" title={project.name}>{project.name}</h3>
                <p className="text-xs text-theme-secondary mb-6">
                    Last updated {formatDate(project.updatedAt)}
                </p>

                <div className="mt-auto flex gap-2 pt-4 border-t border-theme">
                    <button
                        onClick={() => handleLoad(project)}
                        className="flex-grow bg-theme-tertiary hover:bg-accent hover:text-white text-theme-secondary py-2 rounded-lg text-sm font-bold transition-colors"
                    >
                        Load
                    </button>
                    <button
                        onClick={(e) => handleOverwrite(project.id, e)}
                        className="p-2 text-theme-secondary hover:text-accent hover:bg-theme-tertiary rounded-lg transition-colors"
                        title="Overwrite"
                    >
                        <Save size={18} />
                    </button>
                    <button
                        onClick={(e) => handleRename(project.id, project.name, e)}
                        className="p-2 text-theme-secondary hover:text-accent hover:bg-theme-tertiary rounded-lg transition-colors"
                        title="Rename"
                    >
                        <Edit2 size={18} />
                    </button>
                    <button
                        onClick={(e) => handleDuplicate(project, e)}
                        className="p-2 text-theme-secondary hover:text-theme-primary hover:bg-theme-tertiary rounded-lg transition-colors"
                        title="Duplicate"
                    >
                        <Copy size={18} />
                    </button>
                    <button
                        onClick={(e) => handleDelete(project.id, e)}
                        className="p-2 text-theme-secondary hover:text-red-400 hover:bg-theme-tertiary rounded-lg transition-colors"
                        title="Delete"
                    >
                        <Trash2 size={18} />
                    </button>
                </div>
            </div>
        );
    };

    // ===================== SIDEBAR =====================

    const renderSidebar = () => (
        <div className="w-80 border-r border-theme bg-theme-secondary/30 flex flex-col shrink-0">
            <div className="p-4 border-b border-theme">
                <h3 className="text-xs font-bold text-theme-secondary uppercase tracking-wider mb-1">Collections</h3>
                <p className="text-xs text-theme-secondary/70">{folders.length} folders • {projects.length} projects</p>
            </div>

            <div className="flex-grow overflow-y-auto p-2 space-y-1">
                {/* All Projects */}
                <button
                    onClick={() => { setCurrentFolderId(null); setView('folders'); }}
                    className={`w-full text-left p-3 rounded-lg flex items-center gap-3 transition-colors ${!currentFolderId && view === 'folders' ? 'bg-accent/10 border border-accent/50' : 'hover:bg-theme-tertiary border border-transparent'}`}
                >
                    <Home className={`shrink-0 ${!currentFolderId ? 'text-accent' : 'text-theme-secondary'}`} size={16} />
                    <span className={`font-medium ${!currentFolderId ? 'text-accent' : 'text-theme-primary'}`}>All Collections</span>
                    <span className="ml-auto text-xs text-theme-secondary bg-theme-tertiary px-2 py-0.5 rounded-full">{projects.length}</span>
                </button>

                <div className="h-px bg-theme my-2" />

                {/* Folders */}
                {folders.sort((a, b) => a.order - b.order).map(folder => {
                    const IconComponent = getFolderIcon(folder.icon);
                    const projectCount = getProjectsInFolder(folder.id).length;
                    const isActive = currentFolderId === folder.id;
                    const isDropTarget = dragOverFolderId === folder.id;

                    return (
                        <div
                            key={folder.id}
                            onClick={() => { setCurrentFolderId(folder.id); setView('folder-contents'); }}
                            onDragOver={(e) => handleDragOverFolder(e, folder.id)}
                            onDragLeave={handleDragLeave}
                            onDrop={(e) => handleDropOnFolder(e, folder.id)}
                            className={`w-full text-left p-3 rounded-lg flex items-center gap-3 transition-all cursor-pointer ${isActive ? 'bg-accent/10 border border-accent/50' : 'hover:bg-theme-tertiary border border-transparent'} ${isDropTarget ? 'bg-accent/20 border-accent scale-[1.02] shadow-lg' : ''}`}
                        >
                            <IconComponent
                                className="shrink-0"
                                size={16}
                                style={{ color: isActive || isDropTarget ? folder.color : undefined }}
                            />
                            <span className={`font-medium truncate ${isActive ? 'text-accent' : 'text-theme-primary'}`}>
                                {isDropTarget ? '📥 Drop here' : folder.name}
                            </span>
                            <span className="ml-auto text-xs text-theme-secondary bg-theme-tertiary px-2 py-0.5 rounded-full">
                                {projectCount}
                            </span>
                        </div>
                    );
                })}

                {/* Create Folder Button */}
                <button
                    onClick={() => setView('create-folder')}
                    className="w-full text-left p-3 rounded-lg flex items-center gap-3 text-theme-secondary hover:text-accent hover:bg-theme-tertiary transition-colors border border-dashed border-theme hover:border-accent/50"
                >
                    <FolderPlus size={16} />
                    <span className="font-medium">New Folder</span>
                </button>
            </div>
        </div>
    );

    // ===================== MAIN CONTENT =====================

    const renderMainContent = () => {
        // Create Project View
        if (view === 'create-project') {
            return (
                <div className="w-full max-w-xl animate-in fade-in slide-in-from-bottom-4 duration-300">
                    <div className="bg-theme-secondary border border-theme rounded-2xl p-8 shadow-2xl">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-12 h-12 rounded-xl bg-accent/20 flex items-center justify-center text-accent">
                                <Save size={24} />
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold">Save New Project</h2>
                                <p className="text-theme-secondary">
                                    {currentFolder ? `Saving to ${currentFolder.name}` : 'Save to root level'}
                                </p>
                            </div>
                        </div>

                        <label className="block text-sm font-bold text-theme-secondary mb-2">Project Name</label>
                        <input
                            autoFocus
                            type="text"
                            value={newProjectName}
                            onChange={(e) => setNewProjectName(e.target.value)}
                            placeholder="e.g. Binary Search - Rotated Array"
                            className="w-full bg-theme-main border border-theme rounded-xl px-4 py-4 text-lg mb-4 focus:outline-none focus:border-accent ring-4 ring-transparent focus:ring-accent/10 transition-all text-theme-primary"
                            onKeyDown={(e) => e.key === 'Enter' && handleSaveNew()}
                        />

                        {/* Folder Selector */}
                        <label className="block text-sm font-bold text-theme-secondary mb-2">Save to Folder</label>
                        <div className="flex flex-wrap gap-2 mb-6">
                            <button
                                onClick={() => setSavingToFolderId(null)}
                                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${!savingToFolderId && !currentFolderId ? 'bg-accent text-white' : 'bg-theme-tertiary text-theme-secondary hover:text-theme-primary'}`}
                            >
                                Root
                            </button>
                            {folders.map(folder => {
                                const IconComponent = getFolderIcon(folder.icon);
                                const isSelected = savingToFolderId === folder.id || (!savingToFolderId && currentFolderId === folder.id);
                                return (
                                    <button
                                        key={folder.id}
                                        onClick={() => setSavingToFolderId(folder.id)}
                                        className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors flex items-center gap-1.5 ${isSelected ? 'bg-accent text-white' : 'bg-theme-tertiary text-theme-secondary hover:text-theme-primary'}`}
                                    >
                                        <IconComponent size={14} />
                                        {folder.name}
                                    </button>
                                );
                            })}
                        </div>

                        <div className="flex gap-3">
                            <button
                                onClick={() => { setView(currentFolderId ? 'folder-contents' : 'folders'); setSavingToFolderId(null); }}
                                className="flex-1 py-3 rounded-xl font-bold text-theme-secondary hover:bg-theme-tertiary transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleSaveNew}
                                disabled={!newProjectName.trim()}
                                className="flex-[2] bg-accent hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed text-white py-3 rounded-xl font-bold transition-all shadow-lg shadow-accent/20"
                            >
                                Save Project
                            </button>
                        </div>
                    </div>
                </div>
            );
        }

        // Create Folder View
        if (view === 'create-folder') {
            return (
                <div className="w-full max-w-xl animate-in fade-in slide-in-from-bottom-4 duration-300">
                    <div className="bg-theme-secondary border border-theme rounded-2xl p-8 shadow-2xl">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-12 h-12 rounded-xl bg-accent/20 flex items-center justify-center text-accent">
                                <FolderPlus size={24} />
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold">Create New Folder</h2>
                                <p className="text-theme-secondary">Organize your projects into collections</p>
                            </div>
                        </div>

                        <label className="block text-sm font-bold text-theme-secondary mb-2">Folder Name</label>
                        <input
                            autoFocus
                            type="text"
                            value={newFolderName}
                            onChange={(e) => setNewFolderName(e.target.value)}
                            placeholder="e.g. Sorting Algorithms"
                            className="w-full bg-theme-main border border-theme rounded-xl px-4 py-4 text-lg mb-4 focus:outline-none focus:border-accent ring-4 ring-transparent focus:ring-accent/10 transition-all text-theme-primary"
                            onKeyDown={(e) => e.key === 'Enter' && handleCreateFolder()}
                        />

                        {/* Icon Selector */}
                        <label className="block text-sm font-bold text-theme-secondary mb-2">Icon</label>
                        <div className="flex flex-wrap gap-2 mb-4">
                            {Object.entries(FOLDER_ICONS).map(([name, IconComponent]) => (
                                <button
                                    key={name}
                                    onClick={() => setNewFolderIcon(name)}
                                    className={`p-3 rounded-lg transition-colors ${newFolderIcon === name ? 'bg-accent text-white' : 'bg-theme-tertiary text-theme-secondary hover:text-theme-primary'}`}
                                >
                                    <IconComponent size={20} />
                                </button>
                            ))}
                        </div>

                        {/* Color Selector */}
                        <label className="block text-sm font-bold text-theme-secondary mb-2">Color</label>
                        <div className="flex flex-wrap gap-2 mb-6">
                            {FOLDER_COLORS.map(color => (
                                <button
                                    key={color}
                                    onClick={() => setNewFolderColor(color)}
                                    className={`w-10 h-10 rounded-lg transition-all ${newFolderColor === color ? 'ring-2 ring-offset-2 ring-offset-theme-secondary ring-white scale-110' : 'hover:scale-105'}`}
                                    style={{ backgroundColor: color }}
                                />
                            ))}
                        </div>

                        <div className="flex gap-3">
                            <button
                                onClick={() => setView('folders')}
                                className="flex-1 py-3 rounded-xl font-bold text-theme-secondary hover:bg-theme-tertiary transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleCreateFolder}
                                disabled={!newFolderName.trim()}
                                className="flex-[2] bg-accent hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed text-white py-3 rounded-xl font-bold transition-all shadow-lg shadow-accent/20"
                            >
                                Create Folder
                            </button>
                        </div>
                    </div>
                </div>
            );
        }

        // Folder Contents View
        if (view === 'folder-contents' && currentFolder) {
            const folderProjects = getProjectsInFolder(currentFolder.id);
            const IconComponent = getFolderIcon(currentFolder.icon);

            return (
                <div className="w-full max-w-5xl">
                    {/* Breadcrumb */}
                    <div className="flex items-center gap-2 mb-4 text-sm">
                        <button
                            onClick={() => { setCurrentFolderId(null); setView('folders'); }}
                            className="text-theme-secondary hover:text-accent transition-colors"
                        >
                            All Collections
                        </button>
                        <ChevronRight size={14} className="text-theme-secondary" />
                        <span className="text-theme-primary font-medium">{currentFolder.name}</span>
                    </div>

                    <div className="flex items-center gap-4 mb-6">
                        <div
                            className="w-14 h-14 rounded-xl flex items-center justify-center"
                            style={{ backgroundColor: `${currentFolder.color}20`, color: currentFolder.color }}
                        >
                            <IconComponent size={28} />
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold text-theme-primary">{currentFolder.name}</h2>
                            <p className="text-theme-secondary">{folderProjects.length} project{folderProjects.length !== 1 ? 's' : ''}</p>
                        </div>
                    </div>

                    {folderProjects.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-64 border-2 border-dashed border-theme rounded-2xl bg-theme-secondary/50">
                            <Folder size={48} className="text-theme-secondary mb-4" />
                            <h3 className="text-lg font-bold text-theme-secondary">No projects in this folder</h3>
                            <p className="text-theme-secondary/70 mb-6">Save your current code to this folder.</p>
                            <button
                                onClick={() => setView('create-project')}
                                className="bg-theme-tertiary hover:bg-theme-secondary text-theme-primary px-6 py-2 rounded-lg font-bold transition-colors border border-theme"
                            >
                                Add First Project
                            </button>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pb-20">
                            {folderProjects.map(renderProjectCard)}

                            {/* Add New Project Card */}
                            <button
                                onClick={() => setView('create-project')}
                                className="border-2 border-dashed border-theme hover:border-accent/50 hover:bg-accent/5 rounded-xl p-5 flex flex-col items-center justify-center text-theme-secondary hover:text-accent transition-all min-h-[200px]"
                            >
                                <Plus size={32} className="mb-2" />
                                <span className="font-bold">Add Project</span>
                            </button>
                        </div>
                    )}
                </div>
            );
        }

        // Folders Overview (default)
        const rootProjects = getProjectsInFolder(null);

        return (
            <div className="w-full max-w-5xl">
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                    <LayoutGrid className="text-accent" />
                    All Collections
                </h2>

                {folders.length === 0 && projects.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-64 border-2 border-dashed border-theme rounded-2xl bg-theme-secondary/50">
                        <FolderOpen size={48} className="text-theme-secondary mb-4" />
                        <h3 className="text-lg font-bold text-theme-secondary">No projects saved yet</h3>
                        <p className="text-theme-secondary/70 mb-6">Create folders and save your visualizations.</p>
                        <button
                            onClick={() => setView('create-folder')}
                            className="bg-theme-tertiary hover:bg-theme-secondary text-theme-primary px-6 py-2 rounded-lg font-bold transition-colors border border-theme"
                        >
                            Create First Folder
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pb-20">
                        {/* Render Folders */}
                        {folders.sort((a, b) => a.order - b.order).map(renderFolderCard)}

                        {/* Render Root Projects */}
                        {rootProjects.map(renderProjectCard)}

                        {/* Create New Folder Card */}
                        <button
                            onClick={() => setView('create-folder')}
                            className="border-2 border-dashed border-theme hover:border-accent/50 hover:bg-accent/5 rounded-xl p-5 flex flex-col items-center justify-center text-theme-secondary hover:text-accent transition-all min-h-[200px]"
                        >
                            <FolderPlus size={32} className="mb-2" />
                            <span className="font-bold">New Folder</span>
                        </button>
                    </div>
                )}
            </div>
        );
    };

    // ===================== DASHBOARD PORTAL =====================

    const dashboardContent = (
        <div className="fixed inset-0 z-[9999] bg-theme-main flex flex-col animate-in fade-in duration-200 text-theme-primary">
            {/* Top Navigation Bar */}
            <div className="h-16 border-b border-theme bg-theme-secondary/80 backdrop-blur-md flex items-center justify-between px-8 shrink-0">
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => setIsOpen(false)}
                        className="p-2 hover:bg-theme-tertiary rounded-lg text-theme-secondary hover:text-theme-primary transition-colors flex items-center gap-2"
                    >
                        <ArrowLeft size={20} />
                        <span className="font-bold">Back to Editor</span>
                    </button>
                    <div className="h-6 w-px bg-theme-tertiary mx-2" />
                    <h1 className="text-xl font-bold flex items-center gap-3">
                        <LayoutGrid className="text-accent" />
                        Project Dashboard
                    </h1>
                </div>

                <div className="flex items-center gap-4">
                    {/* Search */}
                    <div className="relative">
                        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-theme-secondary" />
                        <input
                            type="text"
                            placeholder="Search projects..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="bg-theme-tertiary border border-theme rounded-lg pl-10 pr-4 py-2 w-64 text-sm focus:outline-none focus:border-accent placeholder:text-theme-secondary/70 transition-colors"
                        />
                    </div>

                    <button
                        onClick={() => setView('create-project')}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg font-bold transition-all ${view === 'create-project' ? 'bg-accent text-white shadow-lg shadow-accent/20' : 'bg-theme-tertiary text-theme-secondary hover:text-theme-primary hover:bg-theme-main border border-theme'}`}
                    >
                        <Plus size={18} />
                        <span>New Project</span>
                    </button>

                    <button
                        onClick={() => setIsOpen(false)}
                        className="md:hidden p-2 hover:bg-theme-tertiary rounded-lg text-theme-secondary hover:text-theme-primary"
                    >
                        <X size={20} />
                    </button>
                </div>
            </div>

            {/* Main Content Area */}
            <div className="flex-grow flex overflow-hidden min-h-0">
                {renderSidebar()}

                {/* Central View */}
                <div className="flex-grow bg-theme-main p-8 overflow-y-auto flex justify-center">
                    {renderMainContent()}
                </div>
            </div>
        </div>
    );

    return (
        <>
            {/* Trigger Buttons */}
            <div className="flex gap-2">
                <button
                    onClick={() => { setIsOpen(true); setView('folders'); setCurrentFolderId(null); }}
                    className="flex items-center gap-2 bg-theme-tertiary hover:bg-theme-secondary text-theme-secondary px-4 py-1.5 rounded-lg font-bold transition-all hover:text-theme-primary border border-theme"
                >
                    <FolderOpen size={14} />
                    <span>PROJECTS</span>
                </button>
                <button
                    onClick={() => {
                        if (activeProjectId) {
                            handleOverwrite(activeProjectId);
                        } else {
                            setIsOpen(true);
                            setView('create-project');
                        }
                    }}
                    className="flex items-center gap-2 bg-theme-tertiary hover:bg-theme-secondary text-theme-secondary px-4 py-1.5 rounded-lg font-bold transition-all hover:text-theme-primary border border-theme"
                >
                    <Save size={14} />
                    <span>{activeProjectId ? 'SAVE' : 'SAVE AS'}</span>
                </button>
            </div>

            {(isOpen && mounted) ? (
                createPortal(dashboardContent, document.body)
            ) : null}
        </>
    );
};
