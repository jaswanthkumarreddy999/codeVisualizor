'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface PrimitiveVisualizerProps {
    name: string;
    value: any;
    onRemove: () => void;
    selected: boolean;
    suppressAnimation?: boolean;
}

export const PrimitiveVisualizer: React.FC<PrimitiveVisualizerProps> = ({
    name,
    value,
    onRemove,
    selected,
    suppressAnimation
}) => {
    const prevValueRef = useRef<any>(value);
    const [diffs, setDiffs] = useState<{ id: string, text: string, color: string }[]>([]);

    const wasSuppressed = useRef(suppressAnimation);

    useEffect(() => {
        const isSuppressed = suppressAnimation;
        const prevSuppressed = wasSuppressed.current;
        wasSuppressed.current = isSuppressed;

        if (isSuppressed) {
            // While suppressed, just keep the ref in sync with whatever value we have 
            // (likely the overridden old value), effectively pausing diff detection.
            // Actually, we should NOT update ref if we want to diff against old value later,
            // BUT here we want to SKIP diff against old value.
            prevValueRef.current = value;
            return;
        }

        // If we just stopped suppressing, we skip the diff check because the 
        // external animation (Ghost) handled the transition visuals.
        if (prevSuppressed) {
            prevValueRef.current = value;
            return;
        }

        const prev = prevValueRef.current;
        if (value !== '__anim_blank__' && typeof prev === 'number' && typeof value === 'number' && prev !== value) {
            const diff = value - prev;
            const diffText = diff > 0 ? `+${diff}` : `${diff}`;
            const color = diff > 0 ? 'text-green-500' : 'text-red-500';

            const newDiff = {
                id: Math.random().toString(36).substr(2, 9),
                text: diffText,
                color
            };

            setDiffs(prevDiffs => [...prevDiffs, newDiff]);

            // Auto cleanup
            setTimeout(() => {
                setDiffs(prevDiffs => prevDiffs.filter(d => d.id !== newDiff.id));
            }, 1500);
        }

        prevValueRef.current = value;
    }, [value, suppressAnimation]);

    return (
        <div className={`
            w-full h-full flex flex-col items-center justify-center p-6 rounded-xl border transition-all backdrop-blur-sm bg-theme-secondary/30
            ${selected
                ? 'border-accent ring-2 ring-accent shadow-[0_0_20px_var(--accent-light)] z-50'
                : 'border-theme hover:border-theme-primary z-10'
            }
        `}>
            {/* Close Button */}
            <button
                onClick={(e) => { e.stopPropagation(); onRemove(); }}
                className="absolute top-2 right-2 text-theme-secondary hover:text-theme-primary opacity-0 group-hover:opacity-100 transition-opacity"
            >
                ×
            </button>

            {/* Label */}
            <span className="text-[10px] uppercase font-bold text-theme-secondary mb-2">{name}</span>

            {/* Value */}
            <span className="text-xl font-mono text-accent relative">
                {value === '__anim_blank__' ? (
                    <span className="opacity-20">—</span>
                ) : (
                    String(value)
                )}

                {/* Floating Animations */}
                <AnimatePresence>
                    {diffs.map(diff => (
                        <motion.div
                            key={diff.id}
                            initial={{ opacity: 1, y: 0, scale: 0.5 }}
                            animate={{ opacity: 0, y: -40, scale: 1.2 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 1.5, ease: "easeOut" }}
                            className={`absolute left-full ml-2 top-0 font-bold whitespace-nowrap ${diff.color}`}
                        >
                            {diff.text}
                        </motion.div>
                    ))}
                </AnimatePresence>
            </span>
        </div>
    );
};
