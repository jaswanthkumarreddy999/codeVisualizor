'use client';

import React, { useMemo, useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ZoomIn, ZoomOut, RotateCcw, Maximize, Crosshair } from 'lucide-react';

interface VisualizerProps {
    heap: Record<string, any>;
    variableName: string;
}

interface NodeWithPos {
    id: string;
    uniqueVizId: string;
    value: any;
    label: string | null;
    x: number;
    y: number;
    level: number;
    parentId: string | null;
    parentX: number | null;
    parentY: number | null;
    data?: any;
    snapshot?: any;
    // For rendering
    prefix?: string | null;
    displayValue?: string | null;
}

export const TreeVisualizer: React.FC<VisualizerProps> = ({ heap, variableName }) => {
    const [scale, setScale] = useState(1);
    const containerRef = useRef<HTMLDivElement>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [startPan, setStartPan] = useState({ x: 0, y: 0 });
    const [scrollPos, setScrollPos] = useState({ x: 0, y: 0 });

    // Helper to resolve potential references
    const resolveNode = (n: any) => {
        if (!n) return null;
        if (n.__viz_ref) return heap[n.__viz_ref];
        return n;
    };

    // Helper to parse label for display
    const parseLabel = (label: string) => {
        if (!label) return { prefix: null, value: null };
        const parts = label.toString().split(':');
        if (parts.length > 1) {
            return { prefix: parts[0].trim(), value: parts.slice(1).join(':').trim() };
        }
        return { prefix: null, value: label };
    };

    // 1. Find root node
    const root = resolveNode(heap[variableName]);

    // Canvas Configuration
    // We use a large virtual canvas to ensure stability (prevent shifting when tree grows left)
    const CANVAS_WIDTH = 5000;
    const CANVAS_CENTER_X = CANVAS_WIDTH / 2;
    const VERTICAL_SPACING = 120;

    // 2. Build hierarchical structure for layout (Memoized)
    const { treeNodes, bounds } = useMemo(() => {
        if (!root) return { treeNodes: [], bounds: { maxY: 0 } };

        const nodes: NodeWithPos[] = [];
        let maxY = 0;

        // Recursive traversal to build coordinates
        const traverse = (nodeInput: any, level: number = 0, xPos: number = CANVAS_CENTER_X, parentId: string | null = null, parentX: number = 0, parentY: number = 0) => {
            const node = resolveNode(nodeInput);
            if (!node || !node.__viz_id) return;

            // Spacing logic: reduces as we go deeper
            // Level 0: +/- 300 (Total 600)
            // Level 1: +/- 150
            const spreadFactor = 300;
            const spacing = Math.max(80, spreadFactor / Math.pow(1.5, level));

            const currentY = level * VERTICAL_SPACING + 50; // +50 Top Padding

            if (currentY > maxY) maxY = currentY;

            const uniqueVizId = `${node.__viz_id}-${parentId || 'root'}-${level}-${xPos}`;
            const { prefix, value } = parseLabel(node.label || node.value || "");

            nodes.push({
                ...node,
                id: node.__viz_id,
                uniqueVizId,
                level,
                x: xPos,
                y: currentY,
                parentId,
                parentX: parentId ? parentX : null,
                parentY: parentId ? parentY : null,
                prefix,
                displayValue: value,
                label: node.label
            });

            if (node.left) {
                traverse(node.left, level + 1, xPos - spacing, uniqueVizId, xPos, currentY);
            }
            if (node.right) {
                traverse(node.right, level + 1, xPos + spacing, uniqueVizId, xPos, currentY);
            }
        };

        traverse(root);
        return { treeNodes: nodes, bounds: { maxY } };
    }, [heap, variableName, root]);

    // Initial Center Scroll & Auto-Center Logic
    useEffect(() => {
        if (containerRef.current && treeNodes.length > 0) {
            const container = containerRef.current;
            // Only center if we haven't actively scrolled away significantly?
            if (container.scrollLeft === 0) {
                const centerX = CANVAS_CENTER_X - (container.clientWidth / 2);
                container.scrollLeft = centerX;
            }
        }
    }, [treeNodes.length]);

    const handleCenterView = () => {
        if (containerRef.current) {
            const container = containerRef.current;
            const centerX = CANVAS_CENTER_X - (container.clientWidth / 2);
            container.scrollTo({ left: centerX, top: 0, behavior: 'smooth' });
        }
    };

    // Manual Pan Calculation (Optional enhancement for better UX than native scrollbars)
    const handleMouseDown = (e: React.MouseEvent) => {
        if (e.button !== 0) return; // Only left click
        setIsDragging(true);
        setStartPan({ x: e.clientX, y: e.clientY });
        if (containerRef.current) {
            setScrollPos({ x: containerRef.current.scrollLeft, y: containerRef.current.scrollTop });
        }
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!isDragging || !containerRef.current) return;
        e.preventDefault();
        const dx = e.clientX - startPan.x;
        const dy = e.clientY - startPan.y;
        containerRef.current.scrollLeft = scrollPos.x - dx;
        containerRef.current.scrollTop = scrollPos.y - dy;
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    const containerHeight = Math.max(bounds.maxY + 200, 800); // 200px bottom padding

    return (
        <div className="relative w-full h-full bg-theme-main/90 overflow-hidden flex flex-col items-center select-none group/canvas">
            {/* Header / Controls */}
            <div className="absolute top-4 left-4 z-20 flex items-center gap-4 pointer-events-none">
                <div className="text-theme-secondary text-[10px] font-mono uppercase tracking-[0.2em] border-b border-theme pb-1 bg-theme-main/80 backdrop-blur px-2 pointer-events-auto">
                    Binary Tree Visualizer
                </div>
                <div className="flex items-center gap-1 bg-theme-tertiary rounded-lg border border-theme p-1 shadow-md pointer-events-auto">
                    <button onClick={() => setScale(s => Math.max(0.2, s - 0.1))} className="p-1 hover:bg-theme-main rounded md:p-1.5 active:scale-95 transition-transform"><ZoomOut size={12} /></button>
                    <span className="text-[10px] w-8 text-center font-mono opacity-70">{Math.round(scale * 100)}%</span>
                    <button onClick={() => setScale(s => Math.min(2, s + 0.1))} className="p-1 hover:bg-theme-main rounded md:p-1.5 active:scale-95 transition-transform"><ZoomIn size={12} /></button>
                    <button onClick={handleCenterView} className="p-1 hover:bg-theme-main rounded md:p-1.5 border-l border-theme/50 ml-1 active:scale-95 transition-transform" title="Center View"><Crosshair size={12} /></button>
                </div>
            </div>

            {/* Scrollable Canvas Container */}
            <div
                ref={containerRef}
                className={`relative w-full h-full overflow-auto bg-[url('/grid-pattern.svg')] bg-repeat opacity-100 scrollbar-thin scrollbar-thumb-theme-secondary/20 hover:scrollbar-thumb-theme-secondary/40 ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
            >
                {/* Scalable Canvas */}
                <div
                    className="relative origin-top-left transition-transform duration-200 ease-out"
                    style={{
                        width: CANVAS_WIDTH,
                        height: containerHeight,
                        transform: `scale(${scale})`,
                        transformOrigin: `${CANVAS_CENTER_X}px 100px` // Zoom roughly towards center top
                    }}
                >
                    {/* SVG Connections Layer */}
                    <svg className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-visible">
                        <AnimatePresence>
                            {treeNodes.map((node) => (
                                node.parentId && (
                                    <motion.path
                                        key={`link-${node.uniqueVizId}`}
                                        initial={{ pathLength: 0, opacity: 0 }}
                                        animate={{
                                            d: `M ${node.parentX} ${node.parentY! + 30} 
                                                C ${node.parentX} ${(node.parentY! + node.y) / 2}, 
                                                  ${node.x} ${(node.parentY! + node.y) / 2}, 
                                                  ${node.x} ${node.y - 30}`,
                                            pathLength: 1,
                                            opacity: 0.4
                                        }}
                                        exit={{ opacity: 0 }}
                                        stroke="currentColor"
                                        className="text-theme-primary"
                                        strokeWidth="1.5"
                                        fill="none"
                                    />
                                )
                            ))}
                        </AnimatePresence>
                    </svg>

                    {/* Nodes Layer */}
                    <AnimatePresence mode="popLayout">
                        {treeNodes.map((node) => {
                            return (
                                <motion.div
                                    key={node.uniqueVizId}
                                    // Removed layoutId to prevent conflicting animations
                                    initial={{ opacity: 0, scale: 0.5, x: node.x - 30, y: node.y - 20 }}
                                    animate={{
                                        opacity: 1,
                                        scale: 1,
                                        x: node.x - 30, // Centered (-30px)
                                        y: node.y
                                    }}
                                    exit={{ opacity: 0, scale: 0 }}
                                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                                    // Removed hover:scale-110 to stop 'weird movement' on hover
                                    className="absolute w-[60px] h-[60px] rounded-xl bg-theme-tertiary/90 backdrop-blur-md border border-theme flex flex-col items-center justify-center p-1 shadow-xl shadow-black/20 z-10 group hover:border-accent hover:z-50 transition-colors duration-200 cursor-default"
                                >
                                    {/* Prefix Badge (e.g. L/R) */}
                                    {node.prefix && (
                                        <div className="absolute -top-2 -right-2 bg-accent text-white text-[9px] font-bold px-1.5 py-0.5 rounded-md shadow-sm z-20">
                                            {node.prefix}
                                        </div>
                                    )}

                                    {/* Node Content */}
                                    <div className="flex items-center justify-center w-full h-full overflow-hidden">
                                        {(Array.isArray(node.data) || Array.isArray(node.snapshot)) ? (
                                            <div className="flex gap-0.5 flex-wrap justify-center p-0.5">
                                                {(node.data || node.snapshot).slice(0, 6).map((val: any, idx: number) => (
                                                    <div key={idx} className="w-4 h-4 flex items-center justify-center bg-black/40 rounded-[2px] text-[8px] font-mono text-accent">
                                                        {val}
                                                    </div>
                                                ))}
                                                {(node.data || node.snapshot).length > 6 && <span className="text-[8px] text-theme-secondary">...</span>}
                                            </div>
                                        ) : (
                                            <span className="text-xs font-bold text-gray-100 truncate px-1 max-w-full" title={String(node.displayValue)}>
                                                {node.displayValue}
                                            </span>
                                        )}
                                    </div>

                                    {/* Tooltip on Hover */}
                                    <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 min-w-[140px] bg-theme-tertiary/95 backdrop-blur-xl border border-theme rounded-lg p-3 shadow-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity z-50 flex flex-col gap-1.5 translate-y-2 group-hover:translate-y-0 duration-200">
                                        <div className="text-[10px] font-bold text-accent uppercase tracking-wider border-b border-theme pb-1 mb-0.5 flex justify-between">
                                            <span>Node Details</span>
                                            <span className="text-theme-secondary/50">#{node.uniqueVizId.split('-')[0]?.slice(0, 4)}</span>
                                        </div>
                                        <div className="space-y-1">
                                            <div className="text-[11px] text-theme-primary font-mono grid grid-cols-[30px_1fr] gap-1">
                                                <span className="text-theme-secondary">Val:</span>
                                                <span className="truncate">{node.displayValue}</span>
                                            </div>
                                            {node.prefix && (
                                                <div className="text-[11px] text-theme-primary font-mono grid grid-cols-[30px_1fr] gap-1">
                                                    <span className="text-theme-secondary">Tags:</span>
                                                    <span className="text-accent">{node.prefix}</span>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </motion.div>
                            )
                        })}
                    </AnimatePresence>

                    {/* Empty State */}
                    {treeNodes.length === 0 && (
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center text-theme-secondary/50 gap-2">
                            <Maximize size={24} className="opacity-20" />
                            <div className="font-mono text-xs">Tree is empty</div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
