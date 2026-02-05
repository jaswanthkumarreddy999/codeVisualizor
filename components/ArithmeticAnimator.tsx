'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export interface ArithmeticOperand {
    name: string;
    value: any;
    startPos: { x: number; y: number };
}

export interface ArithmeticTarget {
    name: string;
    endPos: { x: number; y: number };
}

export interface ArithmeticAnimatorProps {
    operands: ArithmeticOperand[];
    operator: string;
    target: ArithmeticTarget;
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

    // Calculate meeting point (average of operand positions)
    const midX = operands.reduce((acc, curr) => acc + curr.startPos.x, 0) / operands.length;
    const midY = operands.reduce((acc, curr) => acc + curr.startPos.y, 0) / operands.length;

    // Adjust meeting point slightly to be visible between them, or just use the mid point
    // If only 1 operand (like a+=1 where the second is literal/implicit), we might need logic.
    // For now assuming we get explicit operands.
    const meetingPoint = { x: midX, y: midY - 50 }; // Lift it up a bit

    useEffect(() => {
        // Sequence Management
        let t1: NodeJS.Timeout, t2: NodeJS.Timeout, t3: NodeJS.Timeout, t4: NodeJS.Timeout;

        if (secondaryOperator) {
            // Extended Sequence for 2-step operations
            // 0ms: Start (Spawn)
            // 500ms: Operands arrive & merge -> Show Intermediate Result (8)
            t1 = setTimeout(() => setStage(1), 100);

            // 1200ms: Show Secondary Op (/ 2) fading in next to 8
            t2 = setTimeout(() => setStage(2), 1200);

            // 2200ms: Transform 8 & /2 into Final Result (4) & Move to target
            t3 = setTimeout(() => setStage(3), 2200);

            // 3000ms: Finish
            t4 = setTimeout(() => onComplete(), 3000);
        } else {
            // Standard Sequence
            // 0ms: Start
            // 500ms: Arrive at meeting point
            // 1000ms: Result moves to target
            t1 = setTimeout(() => setStage(1), 100);
            t2 = setTimeout(() => setStage(3), 800); // Skip stage 2
            t3 = setTimeout(() => onComplete(), 1450);
        }

        return () => {
            clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4);
        };
    }, [secondaryOperator]);

    // Calculate intermediate result (e.g. 5 + 3 = 8)
    const intermediateResult = React.useMemo(() => {
        if (operands.length === 1) return operands[0].value;
        if (operands.length < 2) return '?';
        const val1 = Number(operands[0].value);
        const val2 = Number(operands[1].value);
        if (isNaN(val1) || isNaN(val2)) return '?';

        switch (operator) {
            case '+': return val1 + val2;
            case '-': return val1 - val2;
            case '*': return val1 * val2;
            case '/': return parseFloat((val1 / val2).toFixed(2));
            default: return '?';
        }
    }, [operands, operator]);

    // Calculate final result
    const resultValue = React.useMemo(() => {
        if (explicitResult !== undefined) return explicitResult;
        return intermediateResult;
    }, [operands, operator, explicitResult, intermediateResult]);

    return (
        <div className="absolute inset-0 pointer-events-none z-50 overflow-hidden">
            <AnimatePresence>
                {/* Operands Flying In (Visible until Stage 1 complete or Stage 2 start) */}
                {stage < 3 && operands.map((op, idx) => (
                    <motion.div
                        key={`op-${idx}`}
                        initial={{ x: op.startPos.x, y: op.startPos.y, opacity: 0.5, scale: 0.8 }}
                        animate={{
                            x: meetingPoint.x + (idx === 0 ? -20 : 20), // Slight separation
                            y: meetingPoint.y,
                            opacity: stage >= 1 ? 0 : 1, // Fade out once they meet (replaced by intermediate result)
                            scale: 1,
                        }}
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
                ))}

                {/* Operator Symbol */}
                {stage < 1 && operator !== 'assign' && (
                    <motion.div
                        key="operator"
                        initial={{ x: midX, y: midY, opacity: 0, scale: 0 }}
                        animate={{ x: meetingPoint.x, y: meetingPoint.y, opacity: 1, scale: 1.5 }}
                        transition={{ duration: 0.4, delay: 0.2 }}
                        className="absolute font-bold text-base text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]"
                    >
                        {operator}
                    </motion.div>
                )}

                {/* Intermediate Result (e.g. "8") */}
                {stage >= 1 && stage < 3 && (
                    <motion.div
                        key="intermediate"
                        initial={{ x: meetingPoint.x, y: meetingPoint.y, scale: 0.5, opacity: 0 }}
                        animate={{
                            scale: 1.2,
                            opacity: 1,
                            x: secondaryOperator ? (meetingPoint.x - 20) : meetingPoint.x // Shift left if showing secondary op
                        }}
                        exit={{ scale: 0.5, opacity: 0 }} // Fade out when transforming to final
                        transition={{ duration: 0.3 }}
                        className="absolute"
                    >
                        <div className="bg-theme-tertiary/90 text-white px-3 py-1 rounded-lg border border-white/20 shadow-lg font-bold text-xl">
                            {intermediateResult}
                        </div>
                    </motion.div>
                )}

                {/* Secondary Operator (e.g. "/ 2") */}
                {stage >= 2 && stage < 3 && secondaryOperator && (
                    <motion.div
                        key="secondary"
                        initial={{ x: meetingPoint.x + 20, y: meetingPoint.y, opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.5 }}
                        transition={{ duration: 0.4 }}
                        className="absolute font-mono text-lg text-accent font-bold bg-black/50 px-2 rounded ml-2"
                    >
                        {secondaryOperator}
                    </motion.div>
                )}

                {/* Final Result Flying to Target */}
                {stage >= 3 && (
                    <motion.div
                        key="final"
                        initial={{ x: meetingPoint.x, y: meetingPoint.y, scale: 1.2, opacity: 0 }} // Start invisible
                        animate={{
                            x: target.endPos.x,
                            y: target.endPos.y,
                            scale: 0.5,
                            opacity: [0, 1, 1, 0] // Fade in at start, then out at end
                        }}
                        transition={{ duration: 0.8, ease: "easeInOut" }}
                        className="absolute"
                    >
                        <div className="bg-accent text-white px-4 py-2 rounded-xl shadow-[0_0_30px_var(--accent)] font-bold text-xl min-w-[60px] text-center border-2 border-white/20">
                            {resultValue}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};
