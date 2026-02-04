'use client';

import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Save, FolderOpen, Trash2, Copy, X, Check, Edit2, Plus, LayoutGrid, Code, Search, ArrowLeft, FileCode } from 'lucide-react';
import { nanoid } from 'nanoid';

export interface SavedProject {
    id: string;
    name: string;
    updatedAt: number;
    code: string;
    language: 'typescript' | 'python' | 'java' | 'c' | 'cpp';
    visualizedVariables: string[];
    ignoredPointers: Record<string, string[]>;
}

interface ProjectManagerProps {
    currentCode: string;
    currentLanguage: 'typescript' | 'python' | 'java' | 'c' | 'cpp';
    currentVisualizedVars: string[];
    currentIgnoredPointers: Record<string, string[]>;
    onLoadProject: (project: SavedProject) => void;
}

export const ProjectManager: React.FC<ProjectManagerProps> = ({
    currentCode,
    currentLanguage,
    currentVisualizedVars,
    currentIgnoredPointers,
    onLoadProject
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [view, setView] = useState<'all' | 'create'>('all');
    const [projects, setProjects] = useState<SavedProject[]>([]);
    const [newProjectName, setNewProjectName] = useState('');
    const [activeProjectId, setActiveProjectId] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState('');

    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    // Load projects from local storage on mount
    useEffect(() => {
        const saved = localStorage.getItem('my-visualizer-projects');
        if (saved) {
            try {
                setProjects(JSON.parse(saved));
            } catch (e) {
                console.error("Failed to parse projects", e);
            }
        }
    }, [isOpen]);

    const saveToStorage = (newProjects: SavedProject[]) => {
        localStorage.setItem('my-visualizer-projects', JSON.stringify(newProjects));
        setProjects(newProjects);
    };

    const handleSaveNew = () => {
        if (!newProjectName.trim()) return;

        const newProject: SavedProject = {
            id: nanoid(),
            name: newProjectName.trim(),
            updatedAt: Date.now(),
            code: currentCode,
            language: currentLanguage,
            visualizedVariables: currentVisualizedVars,
            ignoredPointers: currentIgnoredPointers
        };

        const updatedProjects = [newProject, ...projects];
        saveToStorage(updatedProjects);
        setActiveProjectId(newProject.id);
        setView('all');
        setNewProjectName('');
        // Optional: Auto-close after saving? 
        // setIsOpen(false); 
    };

    const handleOverwrite = (id: string, e?: React.MouseEvent) => {
        e?.stopPropagation();
        const updatedProjects = projects.map(p =>
            p.id === id
                ? { ...p, code: currentCode, language: currentLanguage, visualizedVariables: currentVisualizedVars, ignoredPointers: currentIgnoredPointers, updatedAt: Date.now() }
                : p
        );
        saveToStorage(updatedProjects);
        setActiveProjectId(id);
        alert('Project updated successfully!');
    };

    const handleDelete = (id: string, e: React.MouseEvent) => {
        e.stopPropagation();
        if (confirm('Are you sure you want to delete this project?')) {
            const updatedProjects = projects.filter(p => p.id !== id);
            saveToStorage(updatedProjects);
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
        saveToStorage(updatedProjects);
    };

    const handleRename = (id: string, currentName: string, e: React.MouseEvent) => {
        e.stopPropagation();
        const newName = prompt("Enter new project name:", currentName);
        if (newName && newName.trim() !== "" && newName !== currentName) {
            const updatedProjects = projects.map(p =>
                p.id === id ? { ...p, name: newName.trim(), updatedAt: Date.now() } : p
            );
            saveToStorage(updatedProjects);
        }
    };

    const handleLoad = (project: SavedProject) => {
        onLoadProject(project);
        setActiveProjectId(project.id);
        setIsOpen(false);
    };

    const formatDate = (ts: number) => new Date(ts).toLocaleString(undefined, {
        year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
    });

    const filteredProjects = projects.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()));

    // Portal content
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
                        onClick={() => setView('create')}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg font-bold transition-all ${view === 'create' ? 'bg-accent text-white shadow-lg shadow-accent/20' : 'bg-theme-tertiary text-theme-secondary hover:text-theme-primary hover:bg-theme-main border border-theme'}`}
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

                {/* Sidebar (Project List) */}
                <div className="w-80 border-r border-theme bg-theme-secondary/30 flex flex-col shrink-0">
                    <div className="p-4 border-b border-theme">
                        <h3 className="text-xs font-bold text-theme-secondary uppercase tracking-wider mb-1">Your Projects</h3>
                        <p className="text-xs text-theme-secondary/70">{projects.length} saved files</p>
                    </div>
                    <div className="flex-grow overflow-y-auto p-2 space-y-1">
                        {filteredProjects.map(project => (
                            <button
                                key={project.id}
                                onClick={() => handleLoad(project)}
                                className={`w-full text-left p-3 rounded-lg flex items-start gap-3 transition-colors ${activeProjectId === project.id ? 'bg-accent/10 border border-accent/50' : 'hover:bg-theme-tertiary border border-transparent'}`}
                            >
                                <FileCode className={`mt-0.5 shrink-0 ${activeProjectId === project.id ? 'text-accent' : 'text-theme-secondary'}`} size={16} />
                                <div className="min-w-0">
                                    <div className={`font-medium truncate ${activeProjectId === project.id ? 'text-accent' : 'text-theme-primary'}`}>
                                        {project.name}
                                    </div>
                                    <div className="text-[10px] text-theme-secondary/70 mt-0.5">
                                        {formatDate(project.updatedAt)}
                                    </div>
                                </div>
                                {activeProjectId === project.id && <div className="ml-auto text-accent"><Check size={14} /></div>}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Central View */}
                <div className="flex-grow bg-theme-main p-8 overflow-y-auto flex justify-center">

                    {view === 'create' ? (
                        <div className="w-full max-w-xl animate-in fade-in slide-in-from-bottom-4 duration-300">
                            <div className="bg-theme-secondary border border-theme rounded-2xl p-8 shadow-2xl">
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="w-12 h-12 rounded-xl bg-accent/20 flex items-center justify-center text-accent">
                                        <Save size={24} />
                                    </div>
                                    <div>
                                        <h2 className="text-2xl font-bold">Save New Project</h2>
                                        <p className="text-theme-secondary">Save your current code state to access it later.</p>
                                    </div>
                                </div>

                                <label className="block text-sm font-bold text-theme-secondary mb-2">Project Name</label>
                                <input
                                    autoFocus
                                    type="text"
                                    value={newProjectName}
                                    onChange={(e) => setNewProjectName(e.target.value)}
                                    placeholder="e.g. Binary Search Tree Visualized"
                                    className="w-full bg-theme-main border border-theme rounded-xl px-4 py-4 text-lg mb-6 focus:outline-none focus:border-accent ring-4 ring-transparent focus:ring-accent/10 transition-all text-theme-primary"
                                    onKeyDown={(e) => e.key === 'Enter' && handleSaveNew()}
                                />

                                <div className="flex gap-3">
                                    <button
                                        onClick={() => setView('all')}
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
                    ) : (
                        <div className="w-full max-w-5xl">
                            <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                                <FolderOpen className="text-accent" />
                                All Projects
                            </h2>

                            {projects.length === 0 ? (
                                <div className="flex flex-col items-center justify-center h-64 border-2 border-dashed border-theme rounded-2xl bg-theme-secondary/50">
                                    <FolderOpen size={48} className="text-theme-secondary mb-4" />
                                    <h3 className="text-lg font-bold text-theme-secondary">No projects saved yet</h3>
                                    <p className="text-theme-secondary/70 mb-6">Save your current code to see it here.</p>
                                    <button
                                        onClick={() => setView('create')}
                                        className="bg-theme-tertiary hover:bg-theme-secondary text-theme-primary px-6 py-2 rounded-lg font-bold transition-colors border border-theme"
                                    >
                                        Create First Save
                                    </button>
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pb-20">
                                    {filteredProjects.map(project => (
                                        <div
                                            key={project.id}
                                            className={`group bg-theme-secondary border border-theme hover:border-accent/50 rounded-xl p-5 transition-all hover:shadow-xl hover:shadow-accent/5 flex flex-col ${activeProjectId === project.id ? 'ring-1 ring-accent border-accent' : ''}`}
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
                                    ))}

                                    {/* Add New Card */}
                                    <button
                                        onClick={() => setView('create')}
                                        className="border-2 border-dashed border-theme hover:border-accent/50 hover:bg-accent/5 rounded-xl p-5 flex flex-col items-center justify-center text-theme-secondary hover:text-accent transition-all min-h-[200px]"
                                    >
                                        <Plus size={32} className="mb-2" />
                                        <span className="font-bold">Create New Project</span>
                                    </button>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );

    // If SSR or not open, return trigger only (or null for portal part)
    // We return trigger buttons normally, and portal if open and mounted

    // We need to fetch ReactDOM from 'react-dom'
    // But since this is Next.js 13+ app dir, 'react-dom' is available.
    // However, clean way is to import { createPortal } from 'react-dom';
    // Let's assume we can import it at top, I will add the import in a follow-up or just use ReactDOM if globally available (it's not).
    // I need to add `import { createPortal } from 'react-dom';` to lines 1-5.

    return (
        <>
            {/* Trigger Buttons */}
            <div className="flex gap-2">
                <button
                    onClick={() => { setIsOpen(true); setView('all'); }}
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
                            setView('create');
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
