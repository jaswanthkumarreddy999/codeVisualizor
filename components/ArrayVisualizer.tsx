'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BarChart2, StretchHorizontal, Layers } from 'lucide-react';

interface ArrayVisualizerProps {
    heap: Record<string, any>;
    variableName: string;
    visualizedVariables?: string[];
    ignoredPointers?: string[];
    onToggleIgnoredPointer: (variableName: string, pointer: string) => void;
    viewMode: 'bar' | 'box' | 'stack';
    onViewModeChange: (mode: 'bar' | 'box' | 'stack') => void;
    activePointers?: string[];
    onAddPointer?: (name: string) => void;
    onRemovePointer?: (name: string) => void;
}



export const ArrayVisualizer: React.FC<ArrayVisualizerProps> = ({
    heap,
    variableName,
    visualizedVariables = [],
    ignoredPointers = [],
    onToggleIgnoredPointer,
    viewMode,
    onViewModeChange,
    activePointers = [],
    onAddPointer,
    onRemovePointer
}) => {
    // 1. Identify arrays in the heap
    const arrayName = variableName;
    const data = heap[arrayName] || [];

    // 2. Pointer classification
    // Each active pointer is either:
    //   'foreach' — has __viz_foreach_of === arrayName (parsed from source, definitive)
    //   'index'   — numeric value that is a valid array index
    //   'value'   — numeric value that matches an element (fallback)
    const pointers = activePointers
        .map(name => {
            const raw = heap[name];
            if (raw === undefined || raw === null) return null;

            // Definitive: for-each iterator tagged by hydrateHistory
            if (raw && typeof raw === 'object' && raw.__viz_foreach_of === arrayName) {
                return { name, value: raw.value, kind: 'foreach' as const };
            }

            const val = typeof raw === 'number' ? raw : null;
            if (val === null) return null;

            const isValidIndex = Number.isInteger(val) && val >= 0 && val < data.length;
            const indexNamePattern = /^(i|j|k|l|r|idx|index|left|right|mid|lo|hi|start|end|ptr|pos|cur|prev|next|head|tail|top|bot|p|q)$/i;
            const kind: 'index' | 'value' = (isValidIndex && indexNamePattern.test(name)) ? 'index' : 'value';
            return { name, value: val, kind };
        })
        .filter((p): p is { name: string; value: number; kind: 'index' | 'value' | 'foreach' } => p !== null);

    const maxVal = Math.max(...(data.length > 0 ? data.map(Number) : [1]), 1);

    // 3. Find secondary data (water/stack)
    const secondaryEntry = Object.entries(heap).find(([key, val]) =>
        (key === 'water' || key === 'waterLevels' || key === 'water_levels' || key === 'stack' || key.includes('secondary')) &&
        Array.isArray(val) &&
        key !== variableName &&
        val.length === data.length
    );
    const secondaryData = secondaryEntry ? secondaryEntry[1] : [];



    // 4. Rectangle Highlight
    const rawRect = heap[`${variableName}_rect`];
    let rect: { start: number, end: number, height: number } | null = null;
    if (rawRect) {
        if (Array.isArray(rawRect) && rawRect.length >= 3) {
            rect = { start: Number(rawRect[0]), end: Number(rawRect[1]), height: Number(rawRect[2]) };
        } else if (typeof rawRect === 'object' && 'start' in rawRect) {
            rect = rawRect;
        }
    }

    const resolveValue = (val: any): number => {
        if (typeof val === 'number') return val;
        // Resolve Java Object References (e.g. Integer objects in Stack)
        if (val && typeof val === 'object' && val.__viz_ref) {
           const obj = heap[val.__viz_ref];
           if (obj) {
               // Java Wrapper types (Integer, Double) usually have a 'value' field.
               // Our tracer flattens fields into the object.
               if (obj.value !== undefined) {
                   const v = Number(obj.value);
                   if (!isNaN(v)) return v;
               }
           }
        }
        return Number(val);
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        e.dataTransfer.dropEffect = 'copy';
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        const varName = e.dataTransfer.getData('application/react-dnd-var');
        if (varName && onAddPointer) {
            onAddPointer(varName);
        }
    };

    return (
        <div
            className="relative w-full h-full overflow-hidden p-8 flex flex-col items-center justify-between"
            onDragOver={handleDragOver}
            onDrop={handleDrop}
        >
            {/* Header */}
            <div className="w-full flex justify-between items-center border-b border-theme pb-4 mb-4 shrink-0">
                <div className="text-theme-secondary text-xs font-mono uppercase tracking-[0.2em]">
                    Array Visualizer <span className="text-theme-tertiary">|</span> <span className="text-accent font-bold">{arrayName}</span>
                </div>

                {/* View Toggle */}
                <div className="flex bg-theme-tertiary rounded-lg p-1 gap-1">
                    <button
                        onClick={() => onViewModeChange('bar')}
                        className={`p-1.5 rounded-md transition-all ${viewMode === 'bar' ? 'bg-theme-secondary text-accent shadow-sm' : 'text-theme-secondary hover:text-theme-primary'}`}
                        title="Bar Graph View"
                    >
                        <BarChart2 size={16} />
                    </button>
                    <button
                        onClick={() => onViewModeChange('box')}
                        className={`p-1.5 rounded-md transition-all ${viewMode === 'box' ? 'bg-theme-secondary text-accent shadow-sm' : 'text-theme-secondary hover:text-theme-primary'}`}
                        title="Box View"
                    >
                        <StretchHorizontal size={16} />
                    </button>
                    <button
                        onClick={() => onViewModeChange('stack')}
                        className={`p-1.5 rounded-md transition-all ${viewMode === 'stack' ? 'bg-theme-secondary text-accent shadow-sm' : 'text-theme-secondary hover:text-theme-primary'}`}
                        title="Stack View"
                    >
                        <Layers size={16} />
                    </button>
                </div>
            </div>

            {/* Visualization Area */}
            {viewMode === 'bar' ? (
                /* Bar Chart Area - Flexible Height */
                <div className="flex-grow w-full flex items-end justify-center gap-1 pb-12 px-8 relative">
                    <AnimatePresence mode="popLayout">
                        {data.map((rawVal: any, idx: number) => {
                            const val = resolveValue(rawVal);
                            // Index pointers highlight by position
                            const isActiveByIndex = pointers.some(p => p.kind === 'index' && p.value === idx);
                            // For-each and value pointers highlight by matching element value
                            const isActiveByValue = pointers.some(p =>
                                (p.kind === 'foreach' || p.kind === 'value') && resolveValue(rawVal) === p.value
                            );
                            const isActive = isActiveByIndex || isActiveByValue || (rect && idx >= rect.start && idx <= rect.end);

                            // Calculate heights
                            const heightPct = Math.max((val / maxVal) * 100, 2);
                            const waterHeightPct = secondaryData && secondaryData[idx] ? (secondaryData[idx] / maxVal) * 100 : 0;

                            return (
                                <div key={idx} className="h-full flex-grow flex flex-col justify-end items-center group relative min-w-[20px] max-w-[60px]">
                                    {/* Total Stack Container */}
                                    <div className="w-full relative flex flex-col justify-end" style={{ height: `${heightPct + waterHeightPct}%`, transition: 'height 0.3s ease' }}>

                                        {/* Water/Stack Segment (Top) */}
                                        {waterHeightPct > 0 && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: `${(waterHeightPct / (heightPct + waterHeightPct)) * 100}%`, opacity: 1 }}
                                                className="w-full bg-cyan-500/80 backdrop-blur-sm border-t border-cyan-400/50 relative"
                                                style={{ borderTopLeftRadius: 4, borderTopRightRadius: 4 }}
                                            >
                                                <div className="absolute inset-0 bg-gradient-to-b from-cyan-400/20 to-transparent" />
                                                {/* Water Label */}
                                                <div className="absolute -top-5 left-1/2 -translate-x-1/2 text-[9px] font-bold text-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity">
                                                    +{secondaryData[idx]}
                                                </div>
                                            </motion.div>
                                        )}

                                        {/* Primary Value Segment (Bottom) */}
                                        <motion.div
                                            initial={{ height: 0 }}
                                            animate={{ height: `${(heightPct / (heightPct + waterHeightPct)) * 100}%` }}
                                            className={`w-full relative overflow-hidden transition-all duration-300 ${isActiveByValue
                                                ? 'bg-gradient-to-t from-teal-600 to-teal-400 shadow-[0_0_30px_rgba(20,184,166,0.3)]'
                                                : isActive
                                                    ? 'bg-gradient-to-t from-indigo-600 to-violet-500 shadow-[0_0_30px_rgba(139,92,246,0.3)]'
                                                    : 'bg-gradient-to-t from-slate-800 to-slate-700'
                                                }`}
                                            style={{
                                                borderRadius: waterHeightPct > 0 ? '0 0 4px 4px' : '4px 4px 0 0',
                                                opacity: isActive ? 1 : 0.8
                                            }}
                                            style={{
                                                borderRadius: waterHeightPct > 0 ? '0 0 4px 4px' : '4px 4px 0 0',
                                                opacity: isActive ? 1 : 0.8
                                            }}
                                        >
                                            {/* Value Label - Condition to show inside or above */}
                                            {heightPct > 15 ? (
                                                <div className={`absolute top-2 left-1/2 -translate-x-1/2 text-xs font-bold ${isActive ? 'text-white' : 'text-theme-primary'} z-20`}>
                                                    {val}
                                                </div>
                                            ) : null}
                                        </motion.div>

                                        {/* Rectangle Highlight */}
                                        {rect && idx >= rect.start && idx <= rect.end && (
                                            <motion.div
                                                initial={{ height: 0 }}
                                                animate={{ 
                                                    height: `${Math.min(100, ((rect.height / maxVal) * 100) / (heightPct + waterHeightPct) * 100)}%` 
                                                }}
                                                className="absolute bottom-0 w-full bg-yellow-500/50 border-t-2 border-yellow-400 z-30 shadow-[0_0_10px_rgba(234,179,8,0.3)] pointer-events-none"
                                            />
                                        )}

                                        {/* Label Above Bar (for small values) */}
                                        {heightPct <= 15 && (
                                            <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs font-bold text-theme-primary z-20">
                                                {val}
                                            </div>
                                        )}
                                    </div>

                                    {/* Index Label */}
                                    <div className="mt-3 text-[10px] font-mono text-theme-secondary group-hover:text-theme-primary transition-colors">
                                        {idx}
                                    </div>

                                    {/* Pointer Labels */}
                                    <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 w-max z-10">
                                        <div className="flex flex-col gap-1 items-center">
                                            {/* Index pointers — shown below bar as arrows */}
                                            {pointers.filter(p => p.kind === 'index' && p.value === idx).map(p => (
                                                <motion.div
                                                    key={p.name}
                                                    initial={{ opacity: 0, y: 10, scale: 0.8 }}
                                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                                    className="px-2 py-0.5 rounded-md text-white text-[10px] font-bold shadow-lg whitespace-nowrap bg-accent cursor-pointer hover:bg-red-500 transition-colors flex items-center gap-1"
                                                    style={{ boxShadow: '0 4px 6px -1px var(--accent-light)' }}
                                                    onClick={(e) => { e.stopPropagation(); }}
                                                    onDoubleClick={(e) => { e.stopPropagation(); onRemovePointer?.(p.name); }}
                                                    title="Double click to remove pointer"
                                                >
                                                    {p.name}
                                                    <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[3px] border-l-transparent border-r-[3px] border-r-transparent border-b-[4px]" style={{ borderBottomColor: 'var(--accent)' }} />
                                                </motion.div>
                                            ))}
                                            {/* For-each / value pointers — teal, show varName = value */}
                                            {pointers.filter(p =>
                                                (p.kind === 'foreach' || p.kind === 'value') && resolveValue(rawVal) === p.value
                                            ).map(p => (
                                                <motion.div
                                                    key={p.name}
                                                    initial={{ opacity: 0, y: 10, scale: 0.8 }}
                                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                                    className="px-2 py-0.5 rounded-md text-white text-[10px] font-bold shadow-lg whitespace-nowrap bg-teal-500 cursor-pointer hover:bg-red-500 transition-colors flex items-center gap-1"
                                                    style={{ boxShadow: '0 4px 6px -1px rgba(20,184,166,0.4)' }}
                                                    onClick={(e) => { e.stopPropagation(); }}
                                                    onDoubleClick={(e) => { e.stopPropagation(); onRemovePointer?.(p.name); }}
                                                    title={`${p.name} = ${p.value} — double click to remove`}
                                                >
                                                    {p.name} = {p.value}
                                                    <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[3px] border-l-transparent border-r-[3px] border-r-transparent border-b-[4px] border-b-teal-500" />
                                                </motion.div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </AnimatePresence>
                </div>
            ) : viewMode === 'stack' ? (
                /* Stack View Area */
                <div className="flex-grow w-full flex flex-col-reverse items-center justify-start gap-2 pb-12 px-8 relative overflow-y-auto">
                    <AnimatePresence mode="popLayout" initial={false}>
                        {data.map((rawVal: any, idx: number) => {
                            const val = resolveValue(rawVal);
                            const isActiveByIndex = pointers.some(p => p.kind === 'index' && p.value === idx);
                            const isActiveByValue = pointers.some(p =>
                                (p.kind === 'foreach' || p.kind === 'value') && resolveValue(rawVal) === p.value
                            );
                            const isActive = isActiveByIndex || isActiveByValue;

                            return (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.1 } }}
                                    className="relative group w-48"
                                >
                                    {/* Pointer Labels (Side) */}
                                    {pointers.filter(p =>
                                        (p.kind === 'index' && p.value === idx) ||
                                        ((p.kind === 'foreach' || p.kind === 'value') && resolveValue(rawVal) === p.value)
                                    ).length > 0 && (
                                        <div className="absolute right-full mr-4 top-1/2 -translate-y-1/2 flex flex-col items-end gap-1 w-max z-10">
                                            {pointers.filter(p =>
                                                (p.kind === 'index' && p.value === idx) ||
                                                ((p.kind === 'foreach' || p.kind === 'value') && resolveValue(rawVal) === p.value)
                                            ).map(p => (
                                                <motion.div
                                                    key={p.name}
                                                    initial={{ opacity: 0, x: 10 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    className={`px-2 py-0.5 rounded-md text-white text-[10px] font-bold shadow-lg whitespace-nowrap cursor-pointer hover:bg-red-500 transition-colors flex items-center gap-1 ${(p.kind === 'foreach' || p.kind === 'value') ? 'bg-teal-500' : 'bg-accent'}`}
                                                    onClick={(e) => { e.stopPropagation(); }}
                                                    onDoubleClick={(e) => { e.stopPropagation(); onRemovePointer?.(p.name); }}
                                                    title="Double click to remove pointer"
                                                >
                                                    {(p.kind === 'foreach' || p.kind === 'value') ? `${p.name} = ${p.value}` : p.name}
                                                    <div className="absolute top-1/2 -right-1 -translate-y-1/2 w-0 h-0 border-t-[3px] border-t-transparent border-b-[3px] border-b-transparent border-l-[4px]"
                                                        style={{ borderLeftColor: (p.kind === 'foreach' || p.kind === 'value') ? 'rgb(20,184,166)' : 'var(--accent)' }} />
                                                </motion.div>
                                            ))}
                                        </div>
                                    )}

                                    {/* Stack Item (Dish) */}
                                    <div
                                        className={`h-12 w-full flex items-center justify-center rounded-xl border-2 font-bold text-sm transition-all duration-300 relative shadow-sm ${isActive
                                            ? 'border-accent bg-accent/10 text-accent shadow-[0_0_20px_var(--accent-light)]'
                                            : 'border-theme-secondary/50 bg-theme-tertiary/50 text-theme-primary'
                                            }`}
                                    >
                                        <div className="absolute left-2 text-[9px] font-mono text-theme-secondary opacity-50">
                                            {idx}
                                        </div>
                                        {isNaN(val) ? String(rawVal) : val}
                                    </div>
                                </motion.div>
                            );
                        })}
                    </AnimatePresence>
                </div>
            ) : (
                /* Box View Area */
                <div className="flex-grow w-full flex items-center justify-center gap-2 pb-12 px-8 relative overflow-x-auto">
                    <AnimatePresence mode="popLayout">
                        {data.map((rawVal: any, idx: number) => {
                            const val = resolveValue(rawVal);
                            const isActiveByIndex = pointers.some(p => p.kind === 'index' && p.value === idx);
                            const isActiveByValue = pointers.some(p =>
                                (p.kind === 'foreach' || p.kind === 'value') && resolveValue(rawVal) === p.value
                            );
                            const isActive = isActiveByIndex || isActiveByValue;

                            return (
                                <motion.div
                                    key={idx}
                                    initial={{ scale: 0.8, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    exit={{ scale: 0.8, opacity: 0 }}
                                    className="flex flex-col items-center relative group min-w-[50px]"
                                >
                                    {/* Pointer Labels (Top) */}
                                    {pointers.filter(p =>
                                        (p.kind === 'index' && p.value === idx) ||
                                        ((p.kind === 'foreach' || p.kind === 'value') && resolveValue(rawVal) === p.value)
                                    ).length > 0 && (
                                        <div className="absolute -top-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 w-max z-10">
                                            {pointers.filter(p =>
                                                (p.kind === 'index' && p.value === idx) ||
                                                ((p.kind === 'foreach' || p.kind === 'value') && resolveValue(rawVal) === p.value)
                                            ).map(p => (
                                                <motion.div
                                                    key={p.name}
                                                    initial={{ opacity: 0, y: 10 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    className={`px-2 py-0.5 rounded-md text-white text-[10px] font-bold shadow-lg whitespace-nowrap cursor-pointer hover:bg-red-500 transition-colors flex items-center gap-1 ${(p.kind === 'foreach' || p.kind === 'value') ? 'bg-teal-500' : 'bg-accent'}`}
                                                    onClick={(e) => { e.stopPropagation(); }}
                                                    onDoubleClick={(e) => { e.stopPropagation(); onRemovePointer?.(p.name); }}
                                                    title={(p.kind === 'foreach' || p.kind === 'value') ? `${p.name} = ${p.value} (current value)` : 'Double click to remove'}
                                                >
                                                    {(p.kind === 'foreach' || p.kind === 'value') ? `${p.name} = ${p.value}` : p.name}
                                                    <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[3px] border-l-transparent border-r-[3px] border-r-transparent border-t-[4px]"
                                                        style={{ borderTopColor: (p.kind === 'foreach' || p.kind === 'value') ? 'rgb(20,184,166)' : 'var(--accent)' }} />
                                                </motion.div>
                                            ))}
                                        </div>
                                    )}

                                    {/* Box */}
                                    <div
                                        className={`w-12 h-12 flex items-center justify-center rounded-lg border-2 font-bold text-sm transition-all duration-300 relative ${isActive
                                            ? isActiveByValue
                                                ? 'border-teal-500 bg-teal-500/10 text-teal-400 shadow-[0_0_20px_rgba(20,184,166,0.3)] scale-110'
                                                : 'border-accent bg-accent/10 text-accent shadow-[0_0_20px_var(--accent-light)] scale-110'
                                            : 'border-theme-primary/20 bg-theme-tertiary/30 text-theme-primary group-hover:border-theme-primary/50'
                                            }`}
                                    >
                                        {val}
                                        {secondaryData[idx] > 0 && (
                                            <div className="absolute -top-2 -right-2 bg-cyan-500 text-white text-[9px] w-5 h-5 rounded-full flex items-center justify-center font-bold shadow-sm">
                                                +{secondaryData[idx]}
                                            </div>
                                        )}
                                    </div>

                                    {/* Index */}
                                    <div className="mt-2 text-[10px] font-mono text-theme-secondary group-hover:text-theme-primary transition-colors">
                                        {idx}
                                    </div>
                                </motion.div>
                            );
                        })}
                    </AnimatePresence>
                </div>
            )}

            {data.length === 0 && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="text-theme-secondary font-mono text-sm border-2 border-dashed border-theme rounded-xl p-8 w-64 text-center">
                        No active array data found.
                    </div>
                </div>
            )}

            {/* Global Variables Overlay (Floating) */}
            {(pointers.filter(p => !data[p.value]).length > 0 || Object.keys(heap).some(k => ['water', 'max', 'sum'].includes(k))) && (
                <div className="absolute top-20 right-8 bg-theme-secondary/80 backdrop-blur-md border border-theme rounded-xl p-4 flex flex-col gap-3 shadow-xl">
                    <span className="text-[9px] uppercase tracking-widest text-theme-secondary font-bold border-b border-theme pb-1 mb-1">Globals</span>
                    {Object.entries(heap)
                        .filter(([key, val]) =>
                            typeof val === 'number' &&
                            (key === 'water' || key === 'leftMax' || key === 'rightMax' || key === 'trapped') &&
                            !visualizedVariables.includes(key)
                        )
                        .map(([key, val]) => (
                            <div key={key} className="flex justify-between items-center gap-6">
                                <span className="text-xs text-theme-secondary font-mono">{key}</span>
                                <span className="text-sm font-bold text-accent font-mono">{String(val)}</span>
                            </div>
                        ))
                    }
                </div>
            )}
        </div>
    );
};
