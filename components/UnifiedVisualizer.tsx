'use client';

import React from 'react';
import { Visualizer } from './Visualizer';
import { motion } from 'framer-motion';
import { TreeVisualizer } from './TreeVisualizer';
import { HashMapVisualizer } from './HashMapVisualizer';
import { ArrayVisualizer } from './ArrayVisualizer';
import { PrimitiveVisualizer } from './PrimitiveVisualizer';
import { ArithmeticAnimator } from './ArithmeticAnimator';
import { LinkedListVisualizer } from './LinkedListVisualizer';
import { MatrixVisualizer } from './MatrixVisualizer';
import { HashSetVisualizer } from './HashSetVisualizer';



import { PrintAnimator } from './PrintAnimator';

interface UnifiedVisualizerProps {
    heap: Record<string, any>;
    stdout?: string;
    visualizedVariables: string[];
    onRemoveVariable: (name: string) => void;
    onAddVariable: (name: string) => void;
    ignoredPointers: Record<string, string[]>;
    onToggleIgnoredPointer: (variableName: string, pointer: string) => void;
    code?: string;
    currentLine?: number;
    prevLine?: number;
    prevHeap?: Record<string, any>;
    initialPositions?: Record<string, { x: number, y: number }>;
    onPositionsChange?: (positions: Record<string, { x: number, y: number }>) => void;
    onClearAll?: () => void;
}

export const UnifiedVisualizer: React.FC<UnifiedVisualizerProps> = ({
    heap,
    stdout,
    visualizedVariables,
    onRemoveVariable,
    onAddVariable,
    ignoredPointers,
    onToggleIgnoredPointer,
    code,
    currentLine,
    prevLine,
    prevHeap,
    initialPositions,
    onPositionsChange,
    onClearAll
}) => {
    // Print Animation Logic
    const [printAnimText, setPrintAnimText] = React.useState<string | null>(null);
    const prevStdoutRef = React.useRef(stdout || "");

    React.useEffect(() => {
        const currentOut = stdout || "";
        const prevOut = prevStdoutRef.current;

        if (currentOut.length > prevOut.length && currentOut.startsWith(prevOut)) {
            const diff = currentOut.substring(prevOut.length).trim();
            if (diff) {
                setPrintAnimText(diff);
            }
        } else if (currentOut.length < prevOut.length) {
            // Reset / Clear
            setPrintAnimText(null);
        }

        prevStdoutRef.current = currentOut;
    }, [stdout]);

    const [selectedVar, setSelectedVar] = React.useState<string | null>(null);
    const [viewModes, setViewModes] = React.useState<Record<string, 'bar' | 'box' | 'stack'>>({});
    // explicitPointers: { arrayVarName: { pointerName: 'index' | 'value' | 'search' } }
    const [explicitPointers, setExplicitPointers] = React.useState<Record<string, Record<string, 'index' | 'value' | 'search'>>>({});
    // Store absolute positions (x, y) relative to the container
    const [positions, setPositions] = React.useState<Record<string, { x: number, y: number }>>(initialPositions || {});
    // Store sizes (width, height)
    const [sizes, setSizes] = React.useState<Record<string, { width: number, height: number }>>({});

    // Update positions if initialPositions changes (e.g. on load)
    React.useEffect(() => {
        if (initialPositions) {
            setPositions(initialPositions);
        }
    }, [initialPositions]);

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
        // 1. Check for average / complex pattern like: middle = (left + right) / 2
        // Capture the trailing operation in group 5
        // Updated to handle optional type declaration prefix (e.g., "int middle = ...")
        const complexRegex = /^(?:[\w\[\]<>]+\s+)?([a-zA-Z_]\w*)\s*=\s*\(\s*([a-zA-Z_]\w*)\s*([\+\-\*\/])\s*([a-zA-Z_]\w*)\s*\)\s*(\/.*)$/;
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
            const assignmentRegex = /^(?:[\w\[\]<>]+\s+)?([a-zA-Z_]\w*)\s*=\s*([a-zA-Z_]\w*)\s*([\+\-\*\/])\s*([a-zA-Z_]\w*)/;
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
                    const simpleAssignRegex = /^(?:[\w\[\]<>]+\s+)?([a-zA-Z_]\w*)\s*=\s*([a-zA-Z_]\w*)\s*;?$/;
                    match = lineContent.match(simpleAssignRegex);
                    if (match) {
                        targetName = match[1];
                        op1Name = match[2];
                        operator = 'assign';
                    } else {
                        // 5. Condition Check: if (a < b) or if (num % 2 == 0)
                        // Relaxed regex to allow trailing content (e.g. single line if)
                        const conditionRegex = /^\s*(?:if|while)\s*\(\s*(.+?)\s*\)/;
                        match = lineContent.match(conditionRegex);
                        if (match) {
                            const innerC = match[1];

                            // 5a. Check for Modulo/Complex: num % 2 == 0
                            const moduloRegex = /([a-zA-Z_]\w*)\s*(%)\s*(\d+|[a-zA-Z_]\w*)\s*(==|!=)\s*(\d+|[a-zA-Z_]\w*)/;
                            const modMatch = innerC.match(moduloRegex);

                            if (modMatch) {
                                op1Name = modMatch[1];
                                operator = modMatch[2]; // %
                                op2Name = modMatch[3];  // Divisor (e.g. 2)
                                secondaryOperator = `${modMatch[4]} ${modMatch[5]}`; // == 0

                                // Compute explicit result for modulo
                                const val1 = heap[op1Name];
                                const val2 = isNaN(Number(op2Name)) ? heap[op2Name] : Number(op2Name);
                                const checkVal = isNaN(Number(modMatch[5])) ? heap[modMatch[5]] : Number(modMatch[5]);

                                if (val1 !== undefined && val2 !== undefined) {
                                    const modResult = val1 % val2;
                                    const comparator = modMatch[4];
                                    if (comparator === '==') explicitResult = (modResult == checkVal);
                                    else if (comparator === '!=') explicitResult = (modResult != checkVal);
                                }
                            } else {
                                // 5b. Standard Binary: a < b or a < 5
                                const binaryOpRegex = /^(?:[\w\[\]<>]+\s+)?([a-zA-Z_]\w*)\s*(==|!=|<=|>=|<|>)\s*(\d+|[a-zA-Z_]\w*)/;
                                const innerMatch = innerC.match(binaryOpRegex);
                                if (innerMatch) {
                                    op1Name = innerMatch[1];
                                    operator = innerMatch[2];
                                    op2Name = innerMatch[3];

                                    // Compute result if op2 is literal
                                    if (!isNaN(Number(op2Name))) {
                                        const val1 = heap[op1Name];
                                        const val2 = Number(op2Name);
                                        if (val1 !== undefined) {
                                            switch (operator) {
                                                case '==': explicitResult = (val1 == val2); break;
                                                case '!=': explicitResult = (val1 != val2); break;
                                                case '<': explicitResult = (val1 < val2); break;
                                                case '>': explicitResult = (val1 > val2); break;
                                                case '<=': explicitResult = (val1 <= val2); break;
                                                case '>=': explicitResult = (val1 >= val2); break;
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }

        // Check if it's a condition/comparison operator (including modulo for animation purposes)
        const isCondition = ['==', '!=', '<', '>', '<=', '>=', '%'].includes(operator);

        const op1Pos = positions[op1Name];
        const op2Pos = op2Name ? positions[op2Name] : undefined;
        const targetPos = targetName ? positions[targetName] : undefined;

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

        // Allow animation if op1 exists OR if it's a condition check (even if op1 hidden)
        // For assignments, we still typically want at least op1 visible to animate "from" somewhere.
        // But for conditions, we want the result to show up regardless.
        // UPDATE: User wants animation ONLY if at least one variable is present on canvas.
        // Literal operands don't have positions, so checking (op1Pos || op2Pos) ensures at least one REAL variable is visualized.
        if (op1Pos || op2Pos) {
            const operands = [];

            // Add Op1
            if (op1Pos) {
                operands.push({ name: op1Name, value: prevHeap[op1Name], startPos: getCenter(op1Name, op1Pos) });
            } else if (isCondition) {
                // Virtual Op1
                operands.push({ name: op1Name, value: prevHeap[op1Name] });
            }

            // Add Op2 if exists
            if (op2Name) {
                if (op2Pos) {
                    operands.push({ name: op2Name, value: prevHeap[op2Name], startPos: getCenter(op2Name, op2Pos) });
                } else if (isCondition) {
                    // Virtual Op2 (could be variable or literal)
                    const val = (op2Name && !isNaN(Number(op2Name))) ? Number(op2Name) : prevHeap[op2Name];
                    operands.push({ name: op2Name, value: val });
                }
            }

            // If it's a condition, we proceed if we have at least one operand (virtual or real)
            // If it's assignment, we ensured op1Pos exists above.
            if (operands.length > 0) {
                return {
                    operands,
                    operator,
                    target: targetName && targetPos ? { name: targetName, endPos: getCenter(targetName, targetPos) } : undefined,
                    explicitResult,
                    secondaryOperator
                };
            }
        }
        return null;
    }, [code, prevLine, prevHeap, heap, positions, sizes, animState]);

    // Derived overrides
    const currentOverrideValues = React.useMemo(() => {
        if (activeAnim && activeAnim.target && prevHeap) {
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
                    const isMatrix = isArray && value.length > 0 && (
                        Array.isArray(value[0]) ||
                        (value[0] && typeof value[0] === 'object' && (value[0].__viz_type === 'array' || Array.isArray(value[0].data)))
                    );
                    const isTree = value && typeof value === 'object' && (value.__viz_type === 'treenode' || 'left' in value || 'right' in value);
                    const isSLL = value && typeof value === 'object' && (value.__viz_type === 'node' || 'next' in value);
                    const isHashMap = value && typeof value === 'object' && !Array.isArray(value) && value.__viz_type === 'hashmap';
                    const isHashSet = Array.isArray(value) && (value as any).__viz_type === 'hashset';

                    return {
                        ...prevSizes,
                        [varName]: (isArray || isMatrix || isTree || isSLL || isHashMap || isHashSet)
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

        const newPositions = {
            ...positions,
            [name]: { x: newX, y: newY }
        };

        setPositions(newPositions);
        onPositionsChange?.(newPositions);
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
            {/* Print Animation Layer */}
            {printAnimText && (
                <PrintAnimator
                    text={printAnimText}
                    onComplete={() => setPrintAnimText(null)}
                />
            )}

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
                        }, 100);
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

            {/* Clear All Button */}
            {visualizedVariables.length > 0 && onClearAll && (
                <button
                    onClick={(e) => { e.stopPropagation(); onClearAll(); }}
                    className="absolute top-4 right-4 z-50 bg-theme-tertiary hover:bg-red-500/20 hover:text-red-500 text-theme-secondary border border-theme hover:border-red-500/50 rounded-lg px-3 py-1.5 text-xs font-bold transition-all flex items-center gap-2 shadow-lg backdrop-blur-sm"
                    title="Clear All Visualizations"
                >
                    <span>Clear Canvas</span>
                </button>
            )}

            {visualizedVariables.map(varName => {
                const heapValue = heap[varName];
                // During animation targeting this variable, show blank until animation completes
                const isAnimTarget = !!(activeAnim && activeAnim.target && activeAnim.target.name === varName);
                const value = isAnimTarget
                    ? (prevHeap?.[varName] !== undefined ? prevHeap[varName] : '__anim_blank__')
                    : heapValue;

                if (value === undefined) return null;

                const isArray = Array.isArray(value);
                // 2D array: outer array whose first element is also an array (or hydrated array object)
                const isMatrix = isArray && value.length > 0 && (
                    Array.isArray(value[0]) ||
                    (value[0] && typeof value[0] === 'object' && (value[0].__viz_type === 'array' || Array.isArray(value[0].data)))
                );
                const isTree = value && typeof value === 'object' && (value.__viz_type === 'treenode' || 'left' in value || 'right' in value);
                const isSLL = (value && typeof value === 'object' && (
                    value.__viz_type === 'node' ||
                    ('val' in value && 'next' in value) ||
                    ('value' in value && 'next' in value)
                )) || (varName === 'head' || varName === 'prev' || varName === 'curr' || varName === 'node');

                const isHashMap = value && typeof value === 'object' && !Array.isArray(value) && (
                    value.__viz_type === 'hashmap'
                );

                // HashSet: JS array with __viz_type = 'hashset' set as non-enumerable property
                const isHashSet = Array.isArray(value) && (value as any).__viz_type === 'hashset';

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

                if (!isArray && !isTree && !isSLL && !isHashMap && !isHashSet) {
                    // Simple Value
                    Content = (
                        <PrimitiveVisualizer
                            name={varName}
                            value={value}
                            onRemove={() => onRemoveVariable(varName)}
                            selected={selectedVar === varName}
                            suppressAnimation={!!(activeAnim && activeAnim.target && activeAnim.target.name === varName)}
                        />
                    );
                    ContainerClasses = BaseClasses;
                } else {
                    // Complex Visualizer
                    ContainerClasses = `${BaseClasses} rounded-3xl overflow-hidden border transition-all ${selectedVar === varName
                        ? 'border-accent ring-2 ring-accent shadow-[0_0_30px_var(--accent-light)] z-40'
                        : 'border-transparent hover:border-theme-tertiary hover:bg-theme-secondary/5 z-0'
                        }`;

                    if (isMatrix) {
                        Content = (
                            <MatrixVisualizer
                                heap={heap}
                                variableName={varName}
                                activePointers={Object.keys(explicitPointers[varName] || {})}
                                onAddPointer={(pointerName) => setExplicitPointers(prev => {
                                    const current = prev[varName] || {};
                                    if (current[pointerName]) return prev;
                                    return { ...prev, [varName]: { ...current, [pointerName]: 'index' } };
                                })}
                                onRemovePointer={(pointerName) => setExplicitPointers(prev => {
                                    const current = { ...(prev[varName] || {}) };
                                    delete current[pointerName];
                                    return { ...prev, [varName]: current };
                                })}
                            />
                        );
                    } else if (isArray) {
                        Content = (
                            <ArrayVisualizer
                                {...commonProps}
                                viewMode={viewModes[varName] || 'bar'}
                                onViewModeChange={(mode) => setViewModes(prev => ({ ...prev, [varName]: mode }))}
                                activePointers={Object.keys(explicitPointers[varName] || {})}
                                pointerModes={explicitPointers[varName] || {}}
                                onAddPointer={(pointerName) => setExplicitPointers(prev => {
                                    const current = prev[varName] || {};
                                    if (current[pointerName]) return prev;
                                    // Auto-detect default mode: foreach → value, others → index
                                    const defaultMode: 'index' | 'value' | 'search' = 'index';
                                    return { ...prev, [varName]: { ...current, [pointerName]: defaultMode } };
                                })}
                                onRemovePointer={(pointerName) => setExplicitPointers(prev => {
                                    const current = { ...(prev[varName] || {}) };
                                    delete current[pointerName];
                                    return { ...prev, [varName]: current };
                                })}
                                onTogglePointerMode={(pointerName) => setExplicitPointers(prev => {
                                    const current = prev[varName] || {};
                                    const modes: ('index' | 'value' | 'search')[] = ['index', 'value', 'search'];
                                    const cur = current[pointerName] || 'index';
                                    const next = modes[(modes.indexOf(cur) + 1) % modes.length];
                                    return { ...prev, [varName]: { ...current, [pointerName]: next } };
                                })}
                            />
                        );
                    } else if (isTree) {
                        Content = <TreeVisualizer {...commonProps} />;
                    } else if (isSLL) {
                        Content = <LinkedListVisualizer {...commonProps} />;
                    } else if (isHashMap) {
                        Content = <HashMapVisualizer heap={heap} variableName={varName} />;
                    } else if (isHashSet) {
                        Content = <HashSetVisualizer heap={heap} variableName={varName} />;
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

                const defaultSize = (isArray || isMatrix || isTree || isSLL || isHashMap || isHashSet) ? { width: 600, height: 500 } : { width: 150, height: 120 };
                const currentSize = sizes[varName] || defaultSize;

                return (
                    <motion.div
                        key={varName}
                        ref={(el) => { itemsRef.current[varName] = el; }}
                        drag
                        dragMomentum={false}
                        dragElastic={0}
                        initial={false}
                        onDragEnd={() => handleDragEnd(varName)}
                        whileHover={{ cursor: 'grab', scale: 1.01 }}
                        whileDrag={{ cursor: 'grabbing', scale: 1.02, zIndex: 100 }}
                        onClick={(e) => { e.stopPropagation(); setSelectedVar(varName); }}
                        className={`group ${ContainerClasses}`}
                        style={{
                            width: currentSize.width,
                            height: currentSize.height,
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            x: pos.x,
                            y: pos.y,
                        }}
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
