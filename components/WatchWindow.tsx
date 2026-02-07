'use client';

import React from 'react';
import { Database, Box } from 'lucide-react';

interface WatchWindowProps {
    heap: Record<string, any>;
    stack: Record<string, any>;
}

export const WatchWindow: React.FC<WatchWindowProps> = ({ heap, stack }) => {
    return (
        <div className="w-full h-full flex flex-col">
            <div className="p-4 border-b border-theme flex items-center gap-2 text-theme-secondary">
                <Database size={16} />
                <span className="text-xs font-bold uppercase tracking-wider">Heap Explorer</span>
            </div>

            <div className="flex-grow overflow-auto p-4 space-y-4 font-mono text-sm text-theme-primary">
                {Object.entries(heap).map(([key, value]) => (
                    <div
                        key={key}
                        className="group cursor-grab active:cursor-grabbing hover:bg-theme-secondary/10 p-2 rounded-lg transition-colors border border-transparent hover:border-theme"
                        draggable={true}
                        onDragStart={(e) => {
                            e.dataTransfer.setData('application/react-dnd-var', key);
                            e.dataTransfer.effectAllowed = 'copy';
                        }}
                    >
                        <div className="flex items-center gap-2 pointer-events-none">
                            <span className="text-pink-500 font-bold">{key}</span>
                            <span className="text-theme-secondary">:</span>
                            <span className="text-accent truncate max-w-[150px]">
                                {typeof value === 'object' && value !== null ?
                                    (Array.isArray(value) ? `Array(${value.length})` : '{ ... }')
                                    : String(value)}
                            </span>
                        </div>
                        {typeof value === 'object' && value !== null && (
                            <div className="pl-4 mt-1 border-l border-theme space-y-1">
                                {Object.entries(value).map(([prop, val]) => (
                                    <div key={prop} className="flex gap-2 text-[12px]">
                                        <span className="text-teal-600">{prop}</span>
                                        <span className="text-theme-secondary">=</span>
                                        <span className="text-theme-secondary">{String(val)}</span>
                                    </div>
                                ))}
                                <div className="text-[10px] text-theme-secondary italic">ID: {value.__viz_id}</div>
                            </div>
                        )}
                    </div>
                ))}
                {Object.keys(heap).length === 0 && (
                    <div className="text-theme-secondary italic">Heap is empty</div>
                )}
            </div>

            <div className="p-4 border-t border-theme flex items-center gap-2 text-theme-secondary">
                <Box size={16} />
                <span className="text-xs font-bold uppercase tracking-wider">Stack Trace</span>
            </div>
            <div className="flex-grow h-32 overflow-auto p-4 text-xs font-mono text-theme-secondary space-y-2">
                {Array.isArray(stack) && stack.length > 0 ? (
                    stack
                        .filter((frame: any) => frame.name !== 'traceCondition')
                        .map((frame: any, idx: number) => (
                            <div key={idx} className="flex flex-col border-l-2 border-theme pl-2">
                                <span className="font-bold text-accent">{frame.name}</span>
                                <div className="flex justify-between items-center text-[10px] opacity-70">
                                    <span>{frame.class || 'Unknown'}</span>
                                    <span>Line {frame.line}</span>
                                </div>
                            </div>
                        ))
                ) : (
                    <div className="italic opacity-50">(No local scope active)</div>
                )}
            </div>
        </div>
    );
};
