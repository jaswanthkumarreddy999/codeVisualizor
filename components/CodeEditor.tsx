'use client';

import React from 'react';
import Editor from '@monaco-editor/react';
import { ChevronDown, Code2 } from 'lucide-react';

interface CodeEditorProps {
    code: string;
    language: 'typescript' | 'python' | 'java' | 'c' | 'cpp';
    onLanguageChange: (lang: 'typescript' | 'python' | 'java' | 'c' | 'cpp') => void;
    onChange: (value: string | undefined) => void;
    highlightedLine?: number;
    isDarkMode: boolean;
}

export const CodeEditor: React.FC<CodeEditorProps> = ({ code, language, onLanguageChange, onChange, highlightedLine, isDarkMode }) => {
    const editorRef = React.useRef<any>(null);
    const decorationsRef = React.useRef<string[]>([]);
    const [isDropdownOpen, setIsDropdownOpen] = React.useState(false);

    React.useEffect(() => {
        if (editorRef.current && highlightedLine) {
            decorationsRef.current = editorRef.current.deltaDecorations(
                decorationsRef.current,
                [
                    {
                        range: {
                            startLineNumber: highlightedLine,
                            startColumn: 1,
                            endLineNumber: highlightedLine,
                            endColumn: 1,
                        },
                        options: {
                            isWholeLine: true,
                            className: 'current-line-highlight', // CSS class for highlighting
                        },
                    },
                ]
            );
            editorRef.current.revealLineInCenter(highlightedLine);
        } else if (editorRef.current && !highlightedLine) {
            decorationsRef.current = editorRef.current.deltaDecorations(decorationsRef.current, []);
        }
    }, [highlightedLine]);

    return (
        <div className="w-full h-full flex flex-col border-r border-theme">
            {/* Header */}
            <div className="h-10 shrink-0 bg-theme-tertiary border-b border-theme flex items-center px-4 justify-between">
                <div className="relative">
                    <button
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        className="flex items-center gap-2 text-xs font-bold text-theme-primary hover:bg-theme-secondary px-2 py-1 rounded-md transition-colors"
                    >
                        <Code2 size={14} className="text-accent" />
                        <span className="uppercase">{language}</span>
                        <ChevronDown size={12} className={`transition-transformDuration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} />
                    </button>

                    {isDropdownOpen && (
                        <>
                            <div className="fixed inset-0 z-10" onClick={() => setIsDropdownOpen(false)} />
                            <div className="absolute top-full left-0 mt-1 w-32 bg-theme-secondary border border-theme rounded-lg shadow-xl overflow-hidden z-20 flex flex-col animate-in fade-in zoom-in-95 duration-100">
                                <button
                                    onClick={() => { onLanguageChange('typescript'); setIsDropdownOpen(false); }}
                                    className={`px-4 py-2 text-xs font-bold text-left hover:bg-theme-tertiary transition-colors ${language === 'typescript' ? 'text-accent' : 'text-theme-primary'}`}
                                >
                                    TypeScript
                                </button>
                                <button
                                    onClick={() => { onLanguageChange('python'); setIsDropdownOpen(false); }}
                                    className={`px-4 py-2 text-xs font-bold text-left hover:bg-theme-tertiary transition-colors ${language === 'python' ? 'text-accent' : 'text-theme-primary'}`}
                                >
                                    Python
                                </button>
                                <button
                                    onClick={() => { onLanguageChange('java'); setIsDropdownOpen(false); }}
                                    className={`px-4 py-2 text-xs font-bold text-left hover:bg-theme-tertiary transition-colors ${language === 'java' ? 'text-accent' : 'text-theme-primary'}`}
                                >
                                    Java
                                </button>
                                <button
                                    onClick={() => { onLanguageChange('c'); setIsDropdownOpen(false); }}
                                    className={`px-4 py-2 text-xs font-bold text-left hover:bg-theme-tertiary transition-colors ${language === 'c' ? 'text-accent' : 'text-theme-primary'}`}
                                >
                                    C
                                </button>
                                <button
                                    onClick={() => { onLanguageChange('cpp'); setIsDropdownOpen(false); }}
                                    className={`px-4 py-2 text-xs font-bold text-left hover:bg-theme-tertiary transition-colors ${language === 'cpp' ? 'text-accent' : 'text-theme-primary'}`}
                                >
                                    C++
                                </button>
                            </div>
                        </>
                    )}
                </div>
                <div className="text-[10px] uppercase font-bold text-theme-secondary tracking-widest">Editor</div>
            </div>

            <div className="flex-grow min-h-0 relative">
                <Editor
                    height="100%"
                    language={language}
                    theme={isDarkMode ? "vs-dark" : "light"}
                    value={code}
                    onChange={onChange}
                    options={{
                        minimap: { enabled: false },
                        fontSize: 14,
                        scrollBeyondLastLine: false,
                        automaticLayout: true,
                        padding: { top: 20 },
                    }}
                    onMount={(editor) => {
                        editorRef.current = editor;
                    }}
                />
            </div>
        </div>
    );
};
