'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export interface ArithmeticOperand {
    name: string;
    value: any;
    startPos?: { x: number; y: number }; // Optional for "virtual" operands (not on canvas)
}

export interface ArithmeticTarget {
    name: string;
    endPos: { x: number; y: number };
}

export interface ArithmeticAnimatorProps {
    operands: ArithmeticOperand[];
    operator: string;
    target?: ArithmeticTarget;
    onComplete: () => void;
    explicitResult?: any;
    secondaryOperator?: string;
}

export const ArithmeticAnimator: React.FC<ArithmeticAnimatorProps> = ({
    operands,
    operator,
    target,
    onComplete,
    explicitResult,
    secondaryOperator
}) => {
    // Stage 0: Initial spawn
    // Stage 1: Move to meeting point (Primary Op Merge) -> Shows Intermediate Result (e.g. 8)
    // Stage 2: Secondary Op Merge (if exists) -> Shows Secondary Op (e.g. / 2) interacting
    // Stage 3: Transform to Final Result (e.g. 4) -> Moves to target
    // Stage 4: Completed
    const [stage, setStage] = useState(0);

    // Filter out operands that don't have a startPos (virtual ones)
    const visibleOperands = operands.filter(op => op.startPos);

    let meetingPoint = { x: 0, y: 0 };

    if (visibleOperands.length > 0) {
        // Calculate meeting point from visible operands
        const midX = visibleOperands.reduce((acc, curr) => acc + curr.startPos!.x, 0) / visibleOperands.length;
        const midY = visibleOperands.reduce((acc, curr) => acc + curr.startPos!.y, 0) / visibleOperands.length;
        meetingPoint = { x: midX, y: midY - 50 };
    } else {
        // Fallback for when no variables are on canvas: Use center of viewport (approx) or a fixed offset
        // Since we are inside an absolute container, we might not know the exact "center" of the view.
        // But (WindowWidth/2, WindowHeight/2) is a decent guess if we can get it, or just a fixed safe spot.
        // Ideally, UnifiedVisualizer passes us a "center" prop, but for now let's try a reasonable default like (400, 300)
        // or try to center based on the container if possible.
        // A safe bet is a fixed position that looks good in the "empty" void.
        meetingPoint = { x: 500, y: 300 };
    }

    useEffect(() => {
        // Sequence Management
        let t1: NodeJS.Timeout, t2: NodeJS.Timeout, t3: NodeJS.Timeout, t4: NodeJS.Timeout, t5: NodeJS.Timeout;

        if (secondaryOperator) {
            // Extended Sequence for 2-step operations
            // 0ms: Start (Spawn)
            // 600ms: Operands arrive & merge -> Show Intermediate Result
            t1 = setTimeout(() => setStage(1), 600);

            // 1200ms: Show Secondary Op (e.g. == 0) fading in
            t2 = setTimeout(() => setStage(2), 1200);

            // 2000ms: Evaluation Pause -> Start Fade Swap to Final Result
            t3 = setTimeout(() => setStage(3), 2000);

            // 3000ms: Move to target (if exists) or Finish
            t4 = setTimeout(() => setStage(4), 3000);

            // 3800ms: Finish (Trigger onComplete)
            t5 = setTimeout(() => onComplete(), 3800);
        } else {
            // Standard Sequence
            // 0ms: Start
            // 600ms: Arrive at meeting point
            // 1500ms: Result moves to target
            t1 = setTimeout(() => setStage(1), 600);
            t2 = setTimeout(() => setStage(4), 1500);
            t3 = setTimeout(() => onComplete(), 2000);
        }

        return () => {
            clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4); clearTimeout(t5);
        };
    }, [secondaryOperator]);

    // Calculate intermediate result (e.g. 5 + 3 = 8)
    const intermediateResult = React.useMemo(() => {
        if (operands.length === 1 && operator !== '!') return operands[0].value;
        if (operands.length < 2 && operator !== '!') return '?'; // Unary operators?

        const rawVal1 = operands[0].value;
        const rawVal2 = operands[1] ? operands[1].value : undefined;

        // For Arithmetic, force numbers
        const numVal1 = Number(rawVal1);
        const numVal2 = Number(rawVal2);

        switch (operator) {
            case '+': return numVal1 + numVal2;
            case '-': return numVal1 - numVal2;
            case '*': return numVal1 * numVal2;
            case '/': return parseFloat((numVal1 / numVal2).toFixed(2));
            case '%': return numVal1 % numVal2;
            // Comparisons - Use raw values for '==' to allow string comparison, etc.
            // But prefer numeric comparison if both are numbers? JS handles (1 < 2) and ("a" < "b").
            case '==': return rawVal1 == rawVal2;
            case '!=': return rawVal1 != rawVal2;
            case '<': return rawVal1 < rawVal2;
            case '>': return rawVal1 > rawVal2;
            case '<=': return rawVal1 <= rawVal2;
            case '>=': return rawVal1 >= rawVal2;
            default: return '?';
        }
    }, [operands, operator]);

    // Calculate final result
    const resultValue = React.useMemo(() => {
        if (explicitResult !== undefined) return explicitResult;
        return intermediateResult;
    }, [operands, operator, explicitResult, intermediateResult]);

    const strValue = String(resultValue).toLowerCase();
    const isTrue = strValue === 'true';
    const isFalse = strValue === 'false';
    const isBooleanResult = isTrue || isFalse;

    const resultColorClass = isBooleanResult
        ? (isTrue ? 'bg-green-600 border-green-400 shadow-[0_0_20px_rgba(22,163,74,0.6)]' : 'bg-red-600 border-red-400 shadow-[0_0_20px_rgba(220,38,38,0.6)]')
        : 'bg-accent border-white/20';

    return (
        <div className="absolute inset-0 pointer-events-none z-50 overflow-hidden">
            <AnimatePresence>
                {/* Operands Flying In (Visible until Stage 1 complete) */}
                {stage < 1 && operands.map((op, idx) => {
                    const isVirtual = !op.startPos;
                    // Handle virtual operands by determining a start position if missing
                    const startPos = op.startPos || {
                        x: meetingPoint.x + (idx === 0 ? -100 : 100), // Larger offset for dramatic fly-in
                        y: meetingPoint.y
                    };

                    return (
                        <motion.div
                            key={`op-${idx}`}
                            initial={{
                                x: startPos.x,
                                y: startPos.y,
                                opacity: isVirtual ? 0 : 1, // Real vars visible immediately
                                scale: isVirtual ? 0.8 : 1
                            }}
                            animate={{
                                x: meetingPoint.x + (idx === 0 ? -60 : 60), // Increased separation from 20 to 60
                                y: meetingPoint.y,
                                opacity: 1,
                                scale: 1,
                            }}
                            exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
                            transition={{ duration: 0.6, ease: "easeInOut" }}
                            className="absolute flex flex-col items-center"
                        >
                            <div className="bg-theme-secondary/90 text-accent px-3 py-1 rounded-lg border border-accent shadow-lg backdrop-blur-md font-mono font-bold text-lg">
                                {String(op.value)}
                            </div>
                            <div className="text-[10px] text-theme-secondary mt-1 font-bold bg-theme-main/80 px-1 rounded">
                                {op.name}
                            </div>
                        </motion.div>
                    )
                })}

                {/* Operator Symbol */}
                {stage < 1 && operator !== 'assign' && (
                    <motion.div
                        key="operator"
                        initial={{ x: meetingPoint.x, y: meetingPoint.y, opacity: 0, scale: 0 }}
                        animate={{ x: meetingPoint.x, y: meetingPoint.y, opacity: 1, scale: 1.5 }}
                        exit={{ opacity: 0, scale: 0 }}
                        transition={{ duration: 0.4, delay: 0.2 }}
                        className="absolute font-bold text-base text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]"
                    >
                        {operator}
                    </motion.div>
                )}

                {/* Intermediate Result (e.g. '1') */}
                {/* Visible from Stage 1 -> Fades out at Stage 3 when Final Result fades in */}
                {stage >= 1 && stage < 3 && (
                    <motion.div
                        key="intermediate"
                        initial={{ x: meetingPoint.x, y: meetingPoint.y, scale: 0.5, opacity: 0 }}
                        animate={{
                            scale: 1.2,
                            opacity: 1,
                            x: secondaryOperator ? (meetingPoint.x - 40) : meetingPoint.x
                        }}
                        exit={{ opacity: 0, scale: 0.8, y: meetingPoint.y - 20 }}
                        transition={{ duration: 0.4 }}
                        className="absolute"
                    >
                        <div className="text-white px-4 py-2 rounded-xl border-2 border-white/20 bg-accent shadow-2xl font-bold text-2xl">
                            {String(intermediateResult).toUpperCase()}
                        </div>
                    </motion.div>
                )}

                {/* Secondary Operator (e.g. '== 0') */}
                {/* Visible from Stage 2 -> Fades out at Stage 3 */}
                {stage >= 2 && stage < 3 && secondaryOperator && (
                    <motion.div
                        key="secondary"
                        initial={{ x: meetingPoint.x + 30, y: meetingPoint.y, opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8, y: meetingPoint.y - 20 }}
                        transition={{ duration: 0.4 }}
                        className="absolute font-mono text-xl text-white font-bold bg-white/10 border border-white/30 px-3 py-1 rounded-lg backdrop-blur-sm shadow-lg ml-2"
                    >
                        {secondaryOperator}
                    </motion.div>
                )}

                {/* Final Result (e.g. 'FALSE') - DISTINCT ELEMENT */}
                {/* Fades in at Stage 3 (Evaluation Complete) */}
                {stage >= 3 && (
                    <motion.div
                        key="final-result"
                        initial={{ x: meetingPoint.x, y: meetingPoint.y, scale: 0.8, opacity: 0 }}
                        animate={{
                            x: (stage >= 4 && target) ? target.endPos.x : meetingPoint.x,
                            y: (stage >= 4 && target) ? target.endPos.y : meetingPoint.y,
                            scale: (stage >= 4 && target) ? 0.5 : 1.5, // Pop large then shrink if moving
                            opacity: (stage >= 4 && target) ? [1, 1, 0] : 1
                        }}
                        transition={{ duration: 0.6, ease: "easeInOut" }}
                        className="absolute"
                    >
                        <div className={`text-white px-4 py-2 rounded-xl border-2 shadow-2xl font-bold text-2xl ${resultColorClass}`}>
                            {String(resultValue).toUpperCase()}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};
