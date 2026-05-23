'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface HashSetVisualizerProps {
    heap: Record<string, any>;
    variableName: string;
}

export const HashSetVisualizer: React.FC<HashSetVisualizerProps> = ({ heap, variableName }) => {
    const raw = heap[variableName];
    const elements: any[] = Array.isArray(raw) ? raw : [];

    const formatVal = (v: any): string => {
        if (v === null || v === undefined) return 'null';
        if (typeof v === 'object') return JSON.stringify(v);
        return String(v);
    };

    // Track newly added element for highlight
    const prevRef = React.useRef<string[]>([]);
    const [addedVal, setAddedVal] = React.useState<string | null>(null);

    React.useEffect(() => {
        const prev = prevRef.current;
        const curr = elements.map(formatVal);
        const newItem = curr.find(v => !prev.includes(v));
        if (newItem !== undefined) {
            setAddedVal(newItem);
            const t = setTimeout(() => setAddedVal(null), 700);
            prevRef.current = curr;
            return () => clearTimeout(t);
        }
        prevRef.current = curr;
    }, [elements.map(formatVal).join(',')]);

    return (
        <div className="relative w-full h-full overflow-hidden p-6 flex flex-col bg-theme-main">
            {/* Header */}
            <div className="flex justify-between items-center border-b border-theme pb-3 mb-4 shrink-0">
                <div className="text-theme-secondary text-xs font-mono uppercase tracking-[0.2em]">
                    HashSet <span className="text-theme-tertiary">|</span>{' '}
                    <span className="text-accent font-bold">{variableName}</span>
                </div>
                <span className="text-[10px] text-theme-secondary font-mono opacity-60">
                    {elements.length} {elements.length === 1 ? 'element' : 'elements'}
                </span>
            </div>

            {/* Set elements as chips */}
            <div className="flex-grow overflow-auto">
                {elements.length > 0 ? (
                    <motion.div
                        className="relative rounded-xl overflow-hidden p-4"
                        style={{
                            boxShadow: '0 0 0 2px var(--accent), 0 0 20px var(--accent-light)',
                        }}
                    >
                        <div className="flex flex-wrap gap-2">
                            {elements.map((el, idx) => {
                                const display = formatVal(el);
                                const isNew = addedVal === display;
                                return (
                                    <motion.div
                                        key={`${display}-${idx}`}
                                        initial={{ opacity: 0, scale: 0.6 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                                        className={`
                                            px-3 py-1.5 rounded-lg font-mono font-bold text-sm
                                            border transition-colors duration-300
                                            ${isNew
                                                ? 'border-accent bg-accent/20 text-accent shadow-[0_0_12px_var(--accent-light)]'
                                                : 'border-theme-secondary/30 bg-theme-tertiary/30 text-theme-primary'
                                            }
                                        `}
                                    >
                                        {display}
                                    </motion.div>
                                );
                            })}
                        </div>
                    </motion.div>
                ) : (
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <div className="text-theme-secondary font-mono text-sm border-2 border-dashed border-theme rounded-xl p-8 text-center opacity-50">
                            Set is empty
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};
