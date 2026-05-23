'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface HashMapVisualizerProps {
    heap: Record<string, any>;
    variableName: string;
}

export const HashMapVisualizer: React.FC<HashMapVisualizerProps> = ({ heap, variableName }) => {
    const raw = heap[variableName];

    const entries: [string, any][] = raw && typeof raw === 'object'
        ? Object.entries(raw).filter(([k]) => k !== '__viz_type' && k !== '__viz_id')
        : [];

    const formatValue = (v: any): string => {
        if (v === null || v === undefined) return 'null';
        if (typeof v === 'object') return JSON.stringify(v);
        return String(v);
    };

    // Track which key's value changed most recently for row highlight
    const prevEntriesRef = React.useRef<Record<string, string>>({});
    const [changedKey, setChangedKey] = React.useState<string | null>(null);

    React.useEffect(() => {
        const prev = prevEntriesRef.current;
        let changed: string | null = null;

        for (const [k, v] of entries) {
            const formatted = formatValue(v);
            if (prev[k] !== formatted) {
                changed = k;
                break;
            }
        }

        if (changed) {
            setChangedKey(changed);
            const t = setTimeout(() => setChangedKey(null), 600);
            return () => clearTimeout(t);
        }

        // Update ref
        const next: Record<string, string> = {};
        for (const [k, v] of entries) next[k] = formatValue(v);
        prevEntriesRef.current = next;
    }, [entries.map(([k, v]) => `${k}:${formatValue(v)}`).join(',')]);

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

            {/* Table with animated border */}
            <div className="flex-grow overflow-auto">
                {entries.length > 0 ? (
                    <motion.div
                        className="relative rounded-xl overflow-hidden"
                        animate={{
                            boxShadow: changedKey
                                ? '0 0 0 2px var(--accent), 0 0 20px var(--accent-light)'
                                : '0 0 0 1px rgba(255,255,255,0.08)',
                        }}
                        transition={{ duration: 0.2 }}
                    >
                        <table className="w-full border-collapse font-mono text-sm">
                            <thead>
                                <tr className="bg-theme-tertiary/40">
                                    <th className="text-left text-[10px] uppercase tracking-widest text-theme-secondary font-bold px-4 py-2.5 w-1/2 border-b border-theme">
                                        Key
                                    </th>
                                    <th className="text-left text-[10px] uppercase tracking-widest text-theme-secondary font-bold px-4 py-2.5 w-1/2 border-b border-theme border-l border-theme">
                                        Value
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <AnimatePresence initial={false}>
                                    {entries.map(([key, value], idx) => {
                                        const isChanged = changedKey === key;
                                        return (
                                            <motion.tr
                                                key={key}
                                                initial={{ opacity: 0, x: -10 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ duration: 0.2, delay: idx * 0.03 }}
                                                className={`border-b border-theme/40 transition-colors duration-200 ${
                                                    isChanged
                                                        ? 'bg-accent/10'
                                                        : idx % 2 === 0
                                                            ? 'bg-theme-tertiary/10'
                                                            : ''
                                                }`}
                                            >
                                                {/* Key */}
                                                <td className="px-4 py-2.5 text-accent font-bold">
                                                    {String(key)}
                                                </td>

                                                {/* Value — animates on change */}
                                                <td className="px-4 py-2.5 border-l border-theme/40">
                                                    <motion.span
                                                        key={`${key}-${formatValue(value)}`}
                                                        initial={{ opacity: 0, scale: 0.85, x: -6 }}
                                                        animate={{ opacity: 1, scale: 1, x: 0 }}
                                                        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                                                        className={`inline-block font-semibold ${
                                                            isChanged ? 'text-accent' : 'text-theme-primary'
                                                        }`}
                                                    >
                                                        {formatValue(value)}
                                                    </motion.span>
                                                </td>
                                            </motion.tr>
                                        );
                                    })}
                                </AnimatePresence>
                            </tbody>
                        </table>
                    </motion.div>
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
