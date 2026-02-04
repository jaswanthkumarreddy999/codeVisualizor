'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface TreeNodeData {
    value: any;
    left: any;
    right: any;
    __viz_id: string;
}

interface VisualizerProps {
    heap: Record<string, any>;
    variableName: string;
}

export const TreeVisualizer: React.FC<VisualizerProps> = ({ heap, variableName }) => {
    // 1. Find root node
    const root = heap[variableName];

    // 2. Build hierarchical structure for layout
    const buildTreeLayout = (node: any, level: number = 0, pos: number = 0): any[] => {
        if (!node || !node.__viz_id) return [];

        const nodes: any[] = [];
        const spacing = 100 / Math.pow(2, level); // Adaptive spacing based on level

        nodes.push({
            ...node,
            level,
            pos,
            x: pos,
            y: level * 80
        });

        if (node.left) {
            nodes.push(...buildTreeLayout(node.left, level + 1, pos - spacing));
        }
        if (node.right) {
            nodes.push(...buildTreeLayout(node.right, level + 1, pos + spacing));
        }

        return nodes;
    };

    const treeNodes = buildTreeLayout(root);

    return (
        <div className="relative w-full h-full bg-slate-950 overflow-hidden p-8 flex flex-col items-center">
            <div className="absolute top-4 left-4 text-slate-500 text-[10px] font-mono uppercase tracking-[0.2em] border-b border-slate-800 pb-1">
                Binary Tree Visualizer
            </div>

            <div className="relative mt-20 w-full h-full flex justify-center">
                <AnimatePresence mode="popLayout">
                    {treeNodes.map((node) => (
                        <React.Fragment key={node.__viz_id}>
                            {/* Node Circle */}
                            <motion.div
                                layoutId={node.__viz_id}
                                initial={{ opacity: 0, scale: 0.5 }}
                                animate={{
                                    opacity: 1,
                                    scale: 1,
                                    x: node.x * 4, // Scale x position for visual breadth
                                    y: node.y
                                }}
                                exit={{ opacity: 0, scale: 0 }}
                                transition={{ type: "spring", stiffness: 200, damping: 20 }}
                                className="absolute w-12 h-12 rounded-full bg-teal-600 border-2 border-teal-400 flex items-center justify-center text-white font-bold shadow-lg shadow-teal-500/20 z-10"
                            >
                                {node.value}
                            </motion.div>

                            {/* Connectors (Simple lines for now) */}
                            {/* In a more advanced version, we'd render SVG lines between nodes */}
                        </React.Fragment>
                    ))}
                </AnimatePresence>

                {treeNodes.length === 0 && (
                    <div className="text-slate-800 font-mono text-sm border border-slate-900 rounded-xl p-8 w-64 text-center mt-20">
                        Tree is empty. Assign a node to &quot;root&quot; to begin.
                    </div>
                )}
            </div>
        </div>
    );
};
