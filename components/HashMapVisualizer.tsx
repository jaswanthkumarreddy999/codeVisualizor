'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface HashMapVisualizerProps {
    heap: Record<string, any>;
    variableName: string;
}

export const HashMapVisualizer: React.FC<HashMapVisualizerProps> = ({ heap, variableName }) => {
    const raw = heap[variableName];

    // Extract key-value pairs — skip internal metadata fields
    const entries: [string, any][] = raw && typeof raw === 'object'
        ? Object.entries(raw).filter(([k]) => k !== '__viz_type' && k !== '__viz_id')
        : [];

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
                </div>
                <span className="text-[10px] text-theme-secondary font-mono opacity-60">
                    {entries.length} {entries.length === 1 ? 'entry' : 'entries'}
                </span>
            </div>

            {/* Table */}
            <div className="flex-grow overflow-auto">
                {entries.length > 0 ? (
                    <table className="w-full border-collapse font-mono text-sm">
                        <thead>
                            <tr className="border-b border-theme">
                                <th className="text-left text-[10px] uppercase tracking-widest text-theme-secondary font-bold pb-2 pr-4 w-1/2">
                                    Key
                                </th>
                                <th className="text-left text-[10px] uppercase tracking-widest text-theme-secondary font-bold pb-2 w-1/2">
                                    Value
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {entries.map(([key, value], idx) => (
                                <tr
                                    key={key}
                                    className={`border-b border-theme/50 transition-colors ${
                                        idx % 2 === 0 ? 'bg-theme-tertiary/10' : ''
                                    }`}
                                >
                                    {/* Key cell — stable, no animation */}
                                    <td className="py-2 pr-4 text-accent font-bold truncate max-w-0">
                                        {String(key)}
                                    </td>

                                    {/* Value cell — animates only when value changes */}
                                    <td className="py-2 text-theme-primary font-semibold truncate max-w-0">
                                        <motion.span
                                            key={`${key}-${formatValue(value)}`}
                                            initial={{ opacity: 0.3, x: -4 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ duration: 0.2 }}
                                            className="inline-block"
                                        >
                                            {formatValue(value)}
                                        </motion.span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <div className="text-theme-secondary font-mono text-sm border-2 border-dashed border-theme rounded-xl p-8 text-center opacity-50">
                            Map is empty
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};
