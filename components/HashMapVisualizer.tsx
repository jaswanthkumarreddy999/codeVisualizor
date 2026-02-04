'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface HashMapProps {
    heap: Record<string, any>;
    variableName: string;
}

export const HashMapVisualizer: React.FC<HashMapProps> = ({ heap, variableName }) => {
    // 1. Look for 'map' in heap (assumed object)
    const map = heap[variableName] || {};

    // 2. Mock a hashing function visual (for demonstration)
    // In a real hashmap viz, we'd show the buckets array
    const buckets = Array.from({ length: 8 }, (_, i) => ({
        index: i,
        entries: Object.entries(map).filter(([key]) => {
            // Simple hash for demo: sum of char codes % size
            const hash = Array.from(key).reduce((acc, char) => acc + char.charCodeAt(0), 0) % 8;
            return hash === i;
        })
    }));

    return (
        <div className="relative w-full h-full bg-slate-950 overflow-hidden p-8 flex flex-col">
            <div className="absolute top-4 left-4 text-slate-500 text-[10px] font-mono uppercase tracking-[0.2em] border-b border-slate-800 pb-1">
                HashMap Visualizer (Buckets & Collisions)
            </div>

            <div className="flex-grow flex items-center justify-center gap-4 mt-12">
                {buckets.map((bucket) => (
                    <div key={bucket.index} className="flex flex-col items-center gap-2">
                        {/* Bucket Index */}
                        <div className="text-[10px] font-mono text-slate-600">[{bucket.index}]</div>

                        {/* The Bucket Slot */}
                        <div className="w-24 min-h-[120px] rounded-xl bg-slate-900 border border-slate-800 p-2 flex flex-col gap-2">
                            <AnimatePresence mode="popLayout">
                                {bucket.entries.map(([key, value]) => (
                                    <motion.div
                                        key={key}
                                        layoutId={`hash-${key}`}
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.5 }}
                                        className="bg-orange-600/20 border border-orange-500/50 rounded-lg p-2 flex flex-col text-[10px] shadow-lg shadow-orange-500/5"
                                    >
                                        <span className="text-orange-300 font-bold truncate">{key}</span>
                                        <span className="text-slate-400 truncate">{String(value)}</span>
                                    </motion.div>
                                ))}
                            </AnimatePresence>

                            {bucket.entries.length === 0 && (
                                <div className="flex-grow flex items-center justify-center opacity-10">
                                    <div className="w-8 h-1 bg-slate-700 rounded-full" />
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            {Object.keys(map).length === 0 && (
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-slate-800 font-mono text-sm border border-slate-900 rounded-xl p-8 w-64 text-center">
                        Map is empty. Assign entries to &quot;map&quot; (e.g. map.key = val) to begin.
                    </div>
                </div>
            )}
        </div>
    );
};
