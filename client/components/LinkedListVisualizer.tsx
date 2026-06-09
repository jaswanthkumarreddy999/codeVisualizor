'use client';

import React, { useMemo, useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, CornerDownRight } from 'lucide-react';

interface VisualizerProps {
    heap: Record<string, any>;
    variableName: string;
}

interface NodeData {
    id: string; // Unique viz ID
    value: any;
    nextId: string | null;
    originalRef: any;
    x: number;
    y: number;
    labels: string[]; // Variables pointing to this node (e.g. "head", "curr")
}

export const LinkedListVisualizer: React.FC<VisualizerProps> = ({ heap, variableName }) => {
    const containerRef = useRef<HTMLDivElement>(null);

    // 1. Traverse and Build Layout
    const { nodes, edges } = useMemo(() => {
        const nodeList: NodeData[] = [];
        const visitedIds = new Set<string>();
        const idToNodeMap = new Map<string, NodeData>();

        // Resolvers
        // Resolvers
        const getVizId = (obj: any) => obj?.__viz_id;
        const getValue = (obj: any) => {
            if (!obj || typeof obj !== 'object') return '?';

            // Explicit checks
            if ('val' in obj) return obj.val;
            if ('value' in obj) return obj.value;
            if ('data' in obj) return obj.data;
            if ('element' in obj) return obj.element;
            if ('info' in obj) return obj.info;

            // Heuristic: First key that is not internal
            const keys = Object.keys(obj).filter(k => !k.startsWith('__') && k !== 'next' && k !== 'prev' && k !== 'random');
            if (keys.length > 0) return obj[keys[0]];

            return '?';
        };
        const getNext = (obj: any) => obj?.next;

        // Start Node
        const startNode = heap[variableName];

        // DEBUG
        console.log(`[LinkedListVisualizer] Start: ${variableName}`, startNode);

        if (!startNode) return { nodes: [], edges: [] };

        // Identify all variables pointing to nodes in this heap
        const labelMap = new Map<string, string[]>();
        Object.entries(heap).forEach(([key, val]) => {
            if (val && typeof val === 'object' && val.__viz_id) {
                const id = val.__viz_id;
                if (!labelMap.has(id)) labelMap.set(id, []);
                labelMap.get(id)?.push(key);
            }
        });

        // Traversal
        let current = startNode;
        let index = 0;
        const SPACING = 200; // Increased spacing for larger nodes
        const START_X = 50;
        const Y_POS = 200;

        while (current && getVizId(current)) {
            const id = getVizId(current);

            // Cycle detected?
            if (visitedIds.has(id)) {
                // We'll handle the edge creation later, but stop traversing new nodes
                break;
            }

            visitedIds.add(id);

            const newNode: NodeData = {
                id,
                value: getValue(current),
                nextId: getVizId(getNext(current)) || null,
                originalRef: current,
                x: START_X + (index * SPACING),
                y: Y_POS,
                labels: labelMap.get(id) || []
            };

            nodeList.push(newNode);
            idToNodeMap.set(id, newNode);

            current = getNext(current);
            index++;
        }

        // Build Edges
        const edgeList: { from: NodeData, to: NodeData | null, isCycle: boolean }[] = [];

        nodeList.forEach(node => {
            if (node.nextId) {
                const targetNode = idToNodeMap.get(node.nextId);
                if (targetNode) {
                    // Check if it's a back-edge (cycle)
                    // A simple check is if target index <= source index
                    // But we used a set/array. Let's rely on x position since it's linear.
                    const isCycle = targetNode.x <= node.x;
                    edgeList.push({ from: node, to: targetNode, isCycle });
                } else {
                    // Points to null or unknown? We might want to show a NULL box.
                    // For now, let's treat null nextId as terminal.
                    // But if nextId exists but not in our map (maybe separate chain?), we skip.
                }
            } else {
                // Explicit null?
            }
        });

        return { nodes: nodeList, edges: edgeList };

    }, [heap, variableName]);


    return (
        <div
            ref={containerRef}
            className="w-full h-full relative overflow-auto bg-[var(--bg-secondary)] p-8 font-sans select-none"
        >
            <div className="absolute top-4 left-4 text-[var(--text-secondary)] text-[10px] font-mono uppercase tracking-[0.2em] border-b border-[var(--border)] pb-1">
                Linked List ({variableName})
            </div>

            <div className="relative min-w-[800px] min-h-[400px]">
                {/* SVG Connections Layer */}
                <svg className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-visible z-10">
                    <defs>
                        <marker id="arrowhead" markerWidth="6" markerHeight="4" refX="5" refY="2" orient="auto">
                            <polygon points="0 0, 6 2, 0 4" fill="var(--accent)" />
                        </marker>
                        <marker id="arrowhead-cycle" markerWidth="6" markerHeight="4" refX="5" refY="2" orient="auto">
                            <polygon points="0 0, 6 2, 0 4" fill="var(--accent)" />
                        </marker>
                    </defs>
                    <AnimatePresence>
                        {edges.map((edge) => {
                            if (edge.isCycle && edge.to) {
                                // Cycle Arrow
                                const cyclePath = `M ${edge.from.x + 85} ${edge.from.y + 30}
                                                   C ${edge.from.x + 120} ${edge.from.y + 30}, ${edge.from.x + 120} ${edge.from.y + 100}, ${(edge.from.x + edge.to.x) / 2} ${edge.from.y + 100}
                                                   S ${edge.to.x + 50} ${edge.to.y + 100}, ${edge.to.x + 50} ${edge.to.y + 62}`;

                                return (
                                    <motion.path
                                        key={`edge-${edge.from.id}-${edge.to.id}`}
                                        d={cyclePath}
                                        fill="none"
                                        stroke="var(--accent)"
                                        strokeWidth="2"
                                        markerEnd="url(#arrowhead-cycle)"
                                        initial={{ pathLength: 0, opacity: 0 }}
                                        animate={{ pathLength: 1, opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        transition={{ duration: 0.5 }}
                                    />
                                );

                            } else if (edge.to) {
                                // Normal Arrow
                                const startX = edge.from.x + 100; // Node width is 100
                                const startY = edge.from.y + 30; // Vertical Center (height 60)
                                const endX = edge.to.x;
                                const endY = edge.to.y + 30;

                                return (
                                    <motion.path
                                        key={`edge-${edge.from.id}-${edge.to.id}`}
                                        d={`M ${startX} ${startY} L ${endX - 5} ${endY}`}
                                        fill="none"
                                        stroke="var(--accent)"
                                        strokeWidth="2"
                                        markerEnd="url(#arrowhead)"
                                        initial={{ pathLength: 0, opacity: 0 }}
                                        animate={{ pathLength: 1, opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        transition={{ duration: 0.3 }}
                                    />
                                );
                            }
                            return null;
                        })}
                    </AnimatePresence>
                </svg>

                {/* Nodes Layer */}
                <AnimatePresence>
                    {nodes.map(node => (
                        <motion.div
                            key={node.id}
                            initial={{ opacity: 0, scale: 0.8, x: node.x, y: node.y }}
                            animate={{ opacity: 1, scale: 1, x: node.x, y: node.y }}
                            exit={{ opacity: 0, scale: 0 }}
                            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                            className="absolute w-[100px] h-[60px]"
                        >
                            {/* External Labels (Pointers) */}
                            <div className="absolute -top-8 left-1/2 -translate-x-1/2 flex flex-col-reverse items-center gap-1 w-max">
                                {node.labels.map(label => (
                                    <motion.div
                                        key={label}
                                        layoutId={`label-${label}`}
                                        className="px-2 py-0.5 bg-[var(--accent)] text-white text-[10px] font-bold rounded shadow-md z-20 flex flex-col items-center"
                                    >
                                        {label}
                                        <div className="w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-t-[4px] border-t-[var(--accent)] absolute -bottom-1" />
                                    </motion.div>
                                ))}
                            </div>

                            {/* Node Body - Theme Based */}
                            <div className="w-full h-full flex rounded shadow-lg overflow-hidden border border-[var(--border)] bg-[var(--bg-tertiary)] hover:border-[var(--accent)] transition-colors">
                                {/* Value Compartment */}
                                <div className="w-2/3 h-full flex items-center justify-center border-r border-[var(--border)]">
                                    <span className="text-[var(--text-primary)] font-bold text-xl">{String(node.value)}</span>
                                </div>
                                {/* Next Pointer Compartment */}
                                <div className="w-1/3 h-full bg-[var(--bg-secondary)] flex flex-col items-center justify-center relative group">
                                    <span className="text-[8px] text-[var(--text-secondary)] mb-0.5 lowercase">next</span>
                                    <div className="w-1.5 h-1.5 bg-[var(--accent)] rounded-full" />
                                </div>
                            </div>

                            {/* Next is Null Indicator */}
                            {!node.nextId && (
                                <div className="absolute top-1/2 -right-8 -translate-y-1/2 text-[var(--text-secondary)] font-mono text-[10px]">
                                    NULL
                                </div>
                            )}
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>
        </div>
    );
};
