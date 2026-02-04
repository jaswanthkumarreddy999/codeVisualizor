'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

interface NodeData {
    value: any;
    next: any;
    __viz_id: string;
}

interface VisualizerProps {
    heap: Record<string, any>;
    variableName: string;
}

export const Visualizer: React.FC<VisualizerProps> = ({ heap, variableName }) => {
    // 1. Find all objects that look like Nodes in the heap
    const allNodes = Object.entries(heap)
        .filter(([_, val]) => val && typeof val === 'object' && val.__viz_id)
        .map(([key, val]) => ({ varName: key, ...val } as NodeData & { varName: string }));

    // 2. Identify the ones reachable from the start node (The List)
    const listNodes: NodeData[] = [];
    const visited = new Set();
    let current = heap[variableName];
    while (current && current.__viz_id && !visited.has(current.__viz_id)) {
        listNodes.push(current);
        visited.add(current.__viz_id);
        current = current.next;
    }

    // 3. The ones NOT reachable (The Staging/Creation Zone)
    const stagingNodes = allNodes.filter(n => !visited.has(n.__viz_id));

    // Determine positions:
    // List nodes: middle row
    // Staging nodes: top row (Creation Zone)

    return (
        <div className="relative w-full h-full bg-slate-950 overflow-hidden p-8 flex flex-col gap-20">
            {/* Creation Zone Label */}
            <div className="absolute top-4 left-4 text-slate-500 text-[10px] font-mono uppercase tracking-[0.2em] border-b border-slate-800 pb-1">
                Creation Zone
            </div>

            {/* Staging Area (Creation Zone) */}
            <div className="h-32 flex items-center gap-12 px-4 border-2 border-dashed border-slate-900 rounded-3xl">
                <AnimatePresence mode="popLayout">
                    {stagingNodes.map((node) => (
                        <motion.div
                            key={node.__viz_id}
                            initial={{ opacity: 0, y: -50, scale: 0.8 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.5 }}
                            transition={{ type: "spring", stiffness: 260, damping: 20 }}
                            className="relative"
                        >
                            <div className="w-16 h-16 rounded-xl bg-slate-800 border-2 border-slate-700 flex items-center justify-center text-slate-300 font-bold shadow-xl">
                                {node.value}
                            </div>
                            <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[10px] text-slate-500 font-mono whitespace-nowrap">
                                {node.varName}
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>

            {/* The List Area */}
            <div className="flex-grow flex items-center gap-12 px-4 relative">
                <div className="absolute -top-10 left-4 text-slate-500 text-[10px] font-mono uppercase tracking-[0.2em]">
                    Heap (Linked List)
                </div>

                <AnimatePresence mode="popLayout">
                    {listNodes.map((node, index) => (
                        <motion.div
                            key={node.__viz_id}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{
                                layout: { type: "spring", stiffness: 200, damping: 25 },
                                opacity: { duration: 0.2 }
                            }}
                            className="flex items-center"
                        >
                            {/* Node Box */}
                            <div className="w-20 h-20 rounded-xl bg-gradient-to-br from-indigo-600 to-violet-700 border-2 border-indigo-400 flex flex-col items-center justify-center shadow-2xl shadow-indigo-500/10">
                                <span className="text-white font-bold text-xl">{node.value}</span>
                                <div className="w-full h-1/3 border-t border-indigo-400/30 mt-2 flex items-center justify-center bg-black/10">
                                    <span className="text-indigo-200 text-[9px] font-bold tracking-tighter">NEXT</span>
                                </div>
                            </div>

                            {/* Arrow */}
                            {index < listNodes.length - 1 && (
                                <motion.div
                                    initial={{ opacity: 0, scaleX: 0 }}
                                    animate={{ opacity: 1, scaleX: 1 }}
                                    className="flex items-center -ml-px origin-left w-12"
                                >
                                    <div className="h-0.5 bg-indigo-500 flex-grow" />
                                    <ArrowRight className="text-indigo-500 w-4 h-4 -ml-2" />
                                </motion.div>
                            )}

                            {/* Markers */}
                            {index === 0 && (
                                <div className="absolute -top-8 left-10 -translate-x-1/2 flex flex-col items-center">
                                    <span className="text-pink-500 text-[9px] font-black uppercase">HEAD</span>
                                    <div className="w-1 h-2 bg-pink-500/50 mt-1" />
                                </div>
                            )}
                        </motion.div>
                    ))}
                </AnimatePresence>

                {listNodes.length === 0 && (
                    <div className="text-slate-800 font-mono text-sm border border-slate-900 rounded-xl p-8 w-full text-center">
                        List is empty. Assign a node to &quot;head&quot; to begin.
                    </div>
                )}
            </div>

            {/* Background Grid Decoration */}
            <div className="absolute inset-0 z-[-1] opacity-5"
                style={{ backgroundImage: 'radial-gradient(#4f46e5 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
        </div>
    );
};
