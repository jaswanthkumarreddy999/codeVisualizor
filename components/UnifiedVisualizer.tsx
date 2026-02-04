'use client';

import React from 'react';
import { Visualizer } from './Visualizer';
import { motion } from 'framer-motion';
import { TreeVisualizer } from './TreeVisualizer';
import { HashMapVisualizer } from './HashMapVisualizer';
import { ArrayVisualizer } from './ArrayVisualizer';
import { PrimitiveVisualizer } from './PrimitiveVisualizer';
import { ArithmeticAnimator } from './ArithmeticAnimator';

interface UnifiedVisualizerProps {
    heap: Record<string, any>;
    visualizedVariables: string[];
    onRemoveVariable: (name: string) => void;
    onAddVariable: (name: string) => void;
    ignoredPointers: Record<string, string[]>;
    onToggleIgnoredPointer: (variableName: string, pointer: string) => void;
    code?: string;
    currentLine?: number;
    prevLine?: number;
    prevHeap?: Record<string, any>;
}

export const UnifiedVisualizer: React.FC<UnifiedVisualizerProps> = ({
    heap,
    visualizedVariables,
    onRemoveVariable,
    onAddVariable,
    ignoredPointers,
    onToggleIgnoredPointer,
    code,
    currentLine,
    prevLine,
    prevHeap
}) => {
    const [selectedVar, setSelectedVar] = React.useState<string | null>(null);
    const [viewModes, setViewModes] = React.useState<Record<string, 'bar' | 'box'>>({});
    const [explicitPointers, setExplicitPointers] = React.useState<Record<string, string[]>>({});
    // Store absolute positions (x, y) relative to the container
    const [positions, setPositions] = React.useState<Record<string, { x: number, y: number }>>({});

    const [animState, setAnimState] = React.useState<{
        line: number;
        completed: boolean;
    }>({ line: -1, completed: false });

    // Reset animation state when line changes
    if (prevLine !== undefined && prevLine !== animState.line) {
        setAnimState({ line: prevLine, completed: false });
    }

    // Synchronously derive animation data
    const activeAnim = React.useMemo(() => {
        if (!code || typeof prevLine !== 'number' || !prevHeap) return null;

        // Strict check: only animate if we haven't completed it for this line
        if (animState.line === prevLine && animState.completed) return null;

        const lines = code.split('\n');
        const lineContent = lines[prevLine - 1]?.trim();

        if (!lineContent) return null;

        let match = null;
        let targetName = '', op1Name = '', op2Name = '', operator = '';

        const assignmentRegex = /^([a-zA-Z_]\w*)\s*=\s*([a-zA-Z_]\w*)\s*([\+\-\*\/])\s*([a-zA-Z_]\w*)/;
        match = lineContent.match(assignmentRegex);

        if (match) {
            targetName = match[1]; op1Name = match[2]; operator = match[3]; op2Name = match[4];
        } else {
            const shorthandRegex = /^([a-zA-Z_]\w*)\s*([\+\-\*\/])=\s*([a-zA-Z_]\w*)/;
            match = lineContent.match(shorthandRegex);
            if (match) {
                targetName = match[1]; operator = match[2]; op2Name = match[3]; op1Name = targetName;
            }
        }

        if (targetName && op1Name && op2Name && operator) {
            const op1Pos = positions[op1Name];
            const op2Pos = positions[op2Name];
            const targetPos = positions[targetName];

            if (op1Pos && op2Pos && targetPos) {
                return {
                    operands: [
                        { name: op1Name, value: prevHeap[op1Name], startPos: op1Pos },
                        { name: op2Name, value: prevHeap[op2Name], startPos: op2Pos }
                    ],
                    operator,
                    target: { name: targetName, endPos: targetPos }
                };
            }
        }
        return null;
    }, [code, prevLine, prevHeap, positions, animState]);

    // Derived overrides
    const currentOverrideValues = React.useMemo(() => {
        if (activeAnim && prevHeap) {
            return { [activeAnim.target.name]: prevHeap[activeAnim.target.name] };
        }
        return {};
    }, [activeAnim, prevHeap]);
    React.useEffect(() => {
        setPositions(prev => {
            const newPositions = { ...prev };
            let hasChanges = false;
            let placedCount = 0; // Track newly placed items in this batch for offset

            visualizedVariables.forEach(varName => {
                if (!newPositions[varName]) {
                    // Simple cascade strategy to avoid total overlap
                    // We base it on the TOTAL number of known positions to keep shifting down-right
                    const totalItems = Object.keys(newPositions).length + placedCount;
                    const offset = 180; // Increased spacing
                    const startX = 50;
                    const startY = 50;

                    // Grid layout logic
                    const cols = 3;
                    const col = totalItems % cols;
                    const row = Math.floor(totalItems / cols);

                    newPositions[varName] = {
                        x: startX + (col * 300),
                        y: startY + (row * 200)
                    };
                    placedCount++;
                    hasChanges = true;
                }
            });

            return hasChanges ? newPositions : prev;
        });
    }, [visualizedVariables]);

    const handleDragEnd = (name: string, info: any) => {
        setPositions(prev => {
            const current = prev[name] || { x: 0, y: 0 };
            return {
                ...prev,
                [name]: {
                    x: current.x + info.offset.x,
                    y: current.y + info.offset.y
                }
            };
        });
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'copy';
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        const varName = e.dataTransfer.getData('application/react-dnd-var');
        if (varName) {
            onAddVariable(varName);
            // Optional: Use drop coordinates to set position?
            // To do this properly, we'd need to subtract container rect.
            // For now, let the useEffect handle placement, or improved later.
        }
    };

    return (
        <div
            className="w-full h-full relative overflow-auto bg-transparent p-4"
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            onClick={() => setSelectedVar(null)}
        >
            {/* Arithmetic Animation Layer */}
            {activeAnim && (
                <ArithmeticAnimator
                    operands={activeAnim.operands}
                    operator={activeAnim.operator}
                    target={activeAnim.target}
                    onComplete={() => {
                        // Delay clearing the animation/override to allow ghost to settle
                        setTimeout(() => {
                            if (prevLine !== undefined) {
                                setAnimState({ line: prevLine, completed: true });
                            }
                        }, 500);
                    }}
                />
            )}

            {visualizedVariables.length === 0 && (
                <div className="absolute inset-0 flex flex-col items-center justify-center text-theme-secondary pointer-events-none opacity-50">
                    <p className="text-lg mb-2 border-2 border-dashed border-theme rounded-3xl p-12">
                        Drag variables here from Heap Explorer
                    </p>
                </div>
            )}

            {visualizedVariables.map(varName => {
                const heapValue = heap[varName];
                // Apply overrides if animation is active for this variable
                const value = (currentOverrideValues[varName] !== undefined)
                    ? currentOverrideValues[varName]
                    : heapValue;

                if (value === undefined) return null;

                const isArray = Array.isArray(value);
                const isTree = value && typeof value === 'object' && (value.__viz_type === 'treenode' || 'left' in value || 'right' in value);
                const isSLL = value && typeof value === 'object' && (value.__viz_type === 'node' || 'next' in value);

                const commonProps = {
                    heap,
                    variableName: varName,
                    visualizedVariables,
                    ignoredPointers: ignoredPointers[varName] || [],
                    onToggleIgnoredPointer: (pointer: string) => onToggleIgnoredPointer(varName, pointer)
                };

                const pos = positions[varName] || { x: 0, y: 0 };

                let Content;
                let ContainerClasses;

                if (!isArray && !isTree && !isSLL) {
                    // Simple Value
                    Content = (
                        <PrimitiveVisualizer
                            name={varName}
                            value={value}
                            onRemove={() => onRemoveVariable(varName)}
                            selected={selectedVar === varName}
                            suppressAnimation={!!(activeAnim && activeAnim.target.name === varName)}
                        />
                    );
                    ContainerClasses = ''; // Logic moved inside PrimitiveVisualizer
                } else {
                    // Complex Visualizer
                    ContainerClasses = `absolute top-0 left-0 w-full max-w-4xl min-w-[600px] h-[500px] rounded-3xl overflow-hidden border transition-all ${selectedVar === varName
                        ? 'border-accent ring-2 ring-accent shadow-[0_0_30px_var(--accent-light)] z-40'
                        : 'border-transparent hover:border-theme-tertiary hover:bg-theme-secondary/5 z-0'
                        }`;

                    if (isArray) {
                        Content = (
                            <ArrayVisualizer
                                {...commonProps}
                                viewMode={viewModes[varName] || 'bar'}
                                onViewModeChange={(mode) => setViewModes(prev => ({ ...prev, [varName]: mode }))}
                                activePointers={explicitPointers[varName] || []}
                                onAddPointer={(pointerName) => setExplicitPointers(prev => {
                                    const current = prev[varName] || [];
                                    if (current.includes(pointerName)) return prev;
                                    return { ...prev, [varName]: [...current, pointerName] };
                                })}
                                onRemovePointer={(pointerName) => setExplicitPointers(prev => {
                                    const current = prev[varName] || [];
                                    return { ...prev, [varName]: current.filter(p => p !== pointerName) };
                                })}
                            />
                        );
                    } else if (isTree) {
                        Content = <TreeVisualizer {...commonProps} />;
                    } else {
                        Content = <Visualizer {...commonProps} />;
                    }
                    // Add close button for complex wrappers
                    Content = (
                        <>
                            <button
                                onClick={(e) => { e.stopPropagation(); onRemoveVariable(varName); }}
                                className="absolute top-4 right-4 z-10 bg-theme-tertiary rounded-full w-8 h-8 flex items-center justify-center text-theme-secondary hover:text-white hover:bg-red-500/80 transition-all opacity-0 group-hover:opacity-100"
                            >
                                ×
                            </button>
                            {Content}
                        </>
                    );
                }

                return (
                    <motion.div
                        key={varName}
                        drag
                        dragMomentum={false}
                        initial={pos}
                        animate={pos}
                        onDragEnd={(_, info) => handleDragEnd(varName, info)}
                        whileHover={{ cursor: 'grab', scale: 1.01 }}
                        whileDrag={{ cursor: 'grabbing', scale: 1.02, zIndex: 100 }}
                        onClick={(e) => { e.stopPropagation(); setSelectedVar(varName); }}
                        className={`group ${ContainerClasses}`}
                        style={{ x: 0, y: 0 }} // Reset any implicit checks, we drive via animate
                    >
                        {Content}
                    </motion.div>
                );
            })}
        </div>
    );
};
