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
    const [viewModes, setViewModes] = React.useState<Record<string, 'bar' | 'box' | 'stack'>>({});
    const [explicitPointers, setExplicitPointers] = React.useState<Record<string, string[]>>({});
    // Store absolute positions (x, y) relative to the container
    const [positions, setPositions] = React.useState<Record<string, { x: number, y: number }>>({});
    // Store sizes (width, height)
    const [sizes, setSizes] = React.useState<Record<string, { width: number, height: number }>>({});

    // Auto-detect view mode for new variables
    React.useEffect(() => {
        visualizedVariables.forEach(varName => {
            if (!viewModes[varName]) {
                const isStack = varName.toLowerCase().includes('stack');
                if (isStack) {
                    setViewModes(prev => ({ ...prev, [varName]: 'stack' }));
                }
            }
        });
    }, [visualizedVariables]);

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
        let explicitResult: any = undefined;
        let secondaryOperator: string | undefined = undefined;

        // 1. Check for average / complex pattern like: middle = (left + right) / 2
        // Capture the trailing operation in group 5
        const complexRegex = /^([a-zA-Z_]\w*)\s*=\s*\(\s*([a-zA-Z_]\w*)\s*([\+\-\*\/])\s*([a-zA-Z_]\w*)\s*\)\s*(\/.*)$/;
        match = lineContent.match(complexRegex);

        if (match) {
            targetName = match[1];
            op1Name = match[2];
            operator = match[3]; // Use the inner operator (e.g., +)
            op2Name = match[4];
            secondaryOperator = match[5]?.trim(); // e.g. "/ 2" or "/2"

            explicitResult = heap?.[targetName];
        } else {
            // 2. Standard binary assignment: c = a + b
            const assignmentRegex = /^([a-zA-Z_]\w*)\s*=\s*([a-zA-Z_]\w*)\s*([\+\-\*\/])\s*([a-zA-Z_]\w*)/;
            match = lineContent.match(assignmentRegex);

            if (match) {
                targetName = match[1]; op1Name = match[2]; operator = match[3]; op2Name = match[4];
            } else {
                // 3. Shorthand: a += b
                const shorthandRegex = /^([a-zA-Z_]\w*)\s*([\+\-\*\/])=\s*([a-zA-Z_]\w*)/;
                match = lineContent.match(shorthandRegex);
                if (match) {
                    targetName = match[1]; operator = match[2]; op2Name = match[3]; op1Name = targetName;
                } else {
                    // 4. Simple Assignment: neutral = n
                    const simpleAssignRegex = /^([a-zA-Z_]\w*)\s*=\s*([a-zA-Z_]\w*)\s*;?$/;
                    match = lineContent.match(simpleAssignRegex);
                    if (match) {
                        targetName = match[1];
                        op1Name = match[2];
                        operator = 'assign';
                    }
                }
            }
        }

        if (targetName && op1Name && (op2Name || operator === 'assign') && operator) {
            const op1Pos = positions[op1Name];
            const op2Pos = op2Name ? positions[op2Name] : undefined;
            const targetPos = positions[targetName];

            // Helper to get center
            const getCenter = (name: string, pos: { x: number, y: number }) => {
                const size = sizes[name] || (
                    // Fallback to default check logic if size not set yet (though useEffect handles it)
                    (Array.isArray(prevHeap[name]) || (prevHeap[name] && typeof prevHeap[name] === 'object' && 'left' in prevHeap[name]))
                        ? { width: 600, height: 500 }
                        : { width: 150, height: 120 }
                );
                return {
                    x: pos.x + size.width / 2,
                    y: pos.y + size.height / 2
                };
            };

            if (op1Pos && (op2Pos || operator === 'assign') && targetPos) {
                const operands = [
                    { name: op1Name, value: prevHeap[op1Name], startPos: getCenter(op1Name, op1Pos) }
                ];

                if (op2Name && op2Pos) {
                    operands.push({ name: op2Name, value: prevHeap[op2Name], startPos: getCenter(op2Name, op2Pos) });
                }

                return {
                    operands,
                    operator,
                    target: { name: targetName, endPos: getCenter(targetName, targetPos) },
                    explicitResult,
                    secondaryOperator
                };
            }
        }
        return null;
    }, [code, prevLine, prevHeap, heap, positions, sizes, animState]);

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
                // Initialize default sizes if missing
                setSizes(prevSizes => {
                    if (prevSizes[varName]) return prevSizes;
                    const value = heap[varName];
                    const isArray = Array.isArray(value);
                    const isTree = value && typeof value === 'object' && (value.__viz_type === 'treenode' || 'left' in value || 'right' in value);
                    const isSLL = value && typeof value === 'object' && (value.__viz_type === 'node' || 'next' in value);

                    return {
                        ...prevSizes,
                        [varName]: (isArray || isTree || isSLL)
                            ? { width: 600, height: 500 }
                            : { width: 150, height: 120 }
                    };
                });

                if (!newPositions[varName]) {
                    // Simple cascade strategy to avoid total overlap
                    // We base it on the TOTAL number of known positions to keep shifting down-right
                    const totalItems = Object.keys(newPositions).length + placedCount;
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
    }, [visualizedVariables, heap]);

    const containerRef = React.useRef<HTMLDivElement>(null);
    const itemsRef = React.useRef<Record<string, HTMLDivElement | null>>({});

    const handleDragEnd = (name: string) => {
        if (!containerRef.current) return;

        const element = itemsRef.current[name];
        if (!element) return;

        const container = containerRef.current;
        const containerRect = container.getBoundingClientRect();
        const elementRect = element.getBoundingClientRect();
        const startWidth = sizes[name]?.width || 150;
        const startHeight = sizes[name]?.height || 100;

        // Get container padding to correct the origin (absolute top-0 left-0 starts after padding)
        const computedStyle = window.getComputedStyle(container);
        const paddingLeft = parseFloat(computedStyle.paddingLeft) || 0;
        const paddingTop = parseFloat(computedStyle.paddingTop) || 0;

        // Calculate exact position relative to the scrollable container content
        // Origin (0,0) for the element is at (Left+PaddingLeft, Top+PaddingTop) of container
        // So we want: Delta from Border - Padding

        const newX = (elementRect.left - containerRect.left) + container.scrollLeft - paddingLeft;
        const newY = (elementRect.top - containerRect.top) + container.scrollTop - paddingTop;

        setPositions(prev => ({
            ...prev,
            [name]: { x: newX, y: newY }
        }));
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
        }
    };

    const handleResize = (name: string, e: React.MouseEvent, direction: string) => {
        e.stopPropagation();
        const startX = e.clientX;
        const startY = e.clientY;
        const startWidth = sizes[name]?.width || 150;
        const startHeight = sizes[name]?.height || 100;

        const onMouseMove = (moveEvent: MouseEvent) => {
            const deltaX = moveEvent.clientX - startX;
            const deltaY = moveEvent.clientY - startY;

            setSizes(prev => ({
                ...prev,
                [name]: {
                    width: Math.max(100, startWidth + deltaX),
                    height: Math.max(80, startHeight + deltaY)
                }
            }));
        };

        const onMouseUp = () => {
            window.removeEventListener('mousemove', onMouseMove);
            window.removeEventListener('mouseup', onMouseUp);
        };

        window.addEventListener('mousemove', onMouseMove);
        window.addEventListener('mouseup', onMouseUp);
    };

    return (
        <div
            ref={containerRef}
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
                    explicitResult={activeAnim.explicitResult}
                    secondaryOperator={activeAnim.secondaryOperator}
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

                // Base positioning classes
                const BaseClasses = "absolute top-0 left-0";

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
                    ContainerClasses = BaseClasses;
                } else {
                    // Complex Visualizer
                    ContainerClasses = `${BaseClasses} rounded-3xl overflow-hidden border transition-all ${selectedVar === varName
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

                const defaultSize = (isArray || isTree || isSLL) ? { width: 600, height: 500 } : { width: 150, height: 120 };
                const currentSize = sizes[varName] || defaultSize;

                return (
                    <motion.div
                        key={varName}
                        ref={(el) => { itemsRef.current[varName] = el; }}
                        drag
                        dragMomentum={false}
                        initial={pos}
                        animate={pos}
                        onDragEnd={() => handleDragEnd(varName)}
                        whileHover={{ cursor: 'grab', scale: 1.01 }}
                        whileDrag={{ cursor: 'grabbing', scale: 1.02, zIndex: 100 }}
                        onClick={(e) => { e.stopPropagation(); setSelectedVar(varName); }}
                        className={`group ${ContainerClasses}`}
                        style={{ width: currentSize.width, height: currentSize.height }} // Drive size via state
                    >
                        {Content}

                        {/* Resize Handle */}
                        {selectedVar === varName && (
                            <div
                                className="absolute bottom-1 right-1 w-4 h-4 cursor-nwse-resize z-50 flex items-center justify-center opacity-50 hover:opacity-100"
                                onMouseDown={(e) => handleResize(varName, e, 'se')}
                            >
                                <div className="w-0 h-0 border-l-[8px] border-l-transparent border-b-[8px] border-b-accent/50 max-w-full max-h-full" />
                            </div>
                        )}
                    </motion.div>
                );
            })}
        </div>
    );
};
