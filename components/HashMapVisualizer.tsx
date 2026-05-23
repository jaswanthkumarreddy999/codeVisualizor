'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface HashMapVisualizerProps {
    heap: Record<string, any>;
    variableName: string;
}

/** Simple hash: sum of char codes % bucketCount */
function hashKey(key: string, buckets: number): number {
    let h = 0;
    for (let i = 0; i < key.length; i++) h = (h + key.charCodeAt(i)) % buckets;
    return h;
}

export const HashMapVisualizer: React.FC<HashMapVisualizerProps> = ({ heap, variableName }) => {
    const raw = heap[variableName];

    // Extract key-value pairs from the hydrated hashmap object
    // The object has __viz_type, __viz_id, and then all the actual k/v pairs
    const entries: [string, any][] = raw && typeof raw === 'object'
        ? Object.entries(raw).filter(([k]) => k !== '__viz_type' && k !== '__viz_id')
        : [];

    const BUCKET_COUNT = 8;

    const buckets: { index: number; entries: [string, any][] }[] = Array.from(
        { length: BUCKET_COUNT },
        (_, i) => ({ index: i, entries: [] })
    );

    entries.forEach(([key, value]) => {
        const b = hashKey(String(key), BUCKET_COUNT);
        buckets[b].entries.push([key, value]);
    });

    const formatValue = (v: any): string => {
        if (v === null || v === undefined) return 'null';
        if (typeof v === 'object') return JSON.stringify(v);
        return String(v);
    };

    return (
        <div className="relative w-full h-full overflow-hidden p-6 flex flex-col bg-theme-main">
            {/* Header */}
            <div className="flex justify-between items-center border-b border-theme pb-3 mb-4 shrink-0">
                <div className="text-theme-secondary text-xs font-mono uppercase tracking-[0.2em]">
                    HashMap <span className="text-theme-tertiary">|</span>{' '}
                    <span className="text-accent font-bold">{variableName}</span>
                    <span className="text-theme-tertiary ml-2 text-[10px]">
                        {entries.length} {entries.length === 1 ? 'entry' : 'entries'}
                    </span>
                </div>
                <div className="text-[10px] text-theme-secondary opacity-50 font-mono">
                    {BUCKET_COUNT} buckets
                </div>
            </div>

            {/* Bucket grid */}
            <div className="flex-grow flex items-start justify-center gap-2 overflow-auto pb-2">
                {buckets.map((bucket) => (
                    <div key={bucket.index} className="flex flex-col items-center gap-1.5 min-w-[80px]">
                        {/* Bucket index label */}
                        <div className={`text-[10px] font-mono font-bold transition-colors ${
                            bucket.entries.length > 0 ? 'text-accent' : 'text-theme-secondary opacity-40'
                        }`}>
                            [{bucket.index}]
                        </div>

                        {/* Bucket slot */}
                        <div className={`w-full min-h-[80px] rounded-xl border transition-colors duration-200 p-1.5 flex flex-col gap-1.5 ${
                            bucket.entries.length > 0
                                ? 'border-accent/30 bg-accent/5'
                                : 'border-theme bg-theme-tertiary/20'
                        }`}>
                            {bucket.entries.map(([key, value]) => (
                                    <div
                                        key={key}
                                        className="rounded-lg border border-accent/40 bg-accent/10 p-1.5 flex flex-col gap-0.5"
                                    >
                                        {/* Key */}
                                        <div className="text-accent font-bold text-[11px] font-mono truncate leading-tight">
                                            {String(key)}
                                        </div>
                                        {/* Separator */}
                                        <div className="w-full h-px bg-accent/20" />
                                        {/* Value — only animate when value changes */}
                                        <motion.div
                                            key={`${key}-${formatValue(value)}`}
                                            initial={{ opacity: 0.4, scale: 0.9 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            transition={{ duration: 0.15 }}
                                            className="text-theme-primary text-[11px] font-mono truncate leading-tight font-semibold"
                                        >
                                            {formatValue(value)}
                                        </motion.div>
                                    </div>
                                ))}

                            {/* Empty bucket indicator */}
                            {bucket.entries.length === 0 && (
                                <div className="flex-grow flex items-center justify-center">
                                    <div className="w-6 h-0.5 bg-theme-secondary/20 rounded-full" />
                                </div>
                            )}
                        </div>

                        {/* Collision indicator */}
                        {bucket.entries.length > 1 && (
                            <div className="text-[9px] text-orange-400 font-mono font-bold">
                                ×{bucket.entries.length}
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {/* Empty state */}
            {entries.length === 0 && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="text-theme-secondary font-mono text-sm border-2 border-dashed border-theme rounded-xl p-8 text-center opacity-50">
                        Map is empty
                    </div>
                </div>
            )}
        </div>
    );
};
