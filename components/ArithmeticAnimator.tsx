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
}

export const ArithmeticAnimator: React.FC<ArithmeticAnimatorProps> = ({
    operands,
    operator,
    target,
    onComplete
}) => {
    // Stage 0: Initial spawn
    // Stage 1: Move to meeting point
    // Stage 2: Show result moving to target
    const [stage, setStage] = useState(0);

    // Calculate meeting point (average of operand positions)
    const midX = operands.reduce((acc, curr) => acc + curr.startPos.x, 0) / operands.length;
    const midY = operands.reduce((acc, curr) => acc + curr.startPos.y, 0) / operands.length;

    // Adjust meeting point slightly to be visible between them, or just use the mid point
    // If only 1 operand (like a+=1 where the second is literal/implicit), we might need logic.
    // For now assuming we get explicit operands.
    const meetingPoint = { x: midX, y: midY - 50 }; // Lift it up a bit

    useEffect(() => {
        // Sequence: 
        // 0ms: Start
        // 500ms: Arrive at meeting point
        // 1000ms: Result moves to target
        // 1500ms: Finish

        const t1 = setTimeout(() => setStage(1), 100);
        const t2 = setTimeout(() => setStage(2), 800);
        // Reduce gap: 800 + 600ms transition = 1400ms. Provide small buffer 1450ms.
        const t3 = setTimeout(() => onComplete(), 1450);

        return () => {
            clearTimeout(t1);
            clearTimeout(t2);
            clearTimeout(t3);
        };
    }, []);

    // Calculate result for display
    const resultValue = React.useMemo(() => {
        if (operands.length < 2) return '?';
        const val1 = Number(operands[0].value);
        const val2 = Number(operands[1].value);

        if (isNaN(val1) || isNaN(val2)) return '?';

        switch (operator) {
            case '+': return val1 + val2;
            case '-': return val1 - val2;
            case '*': return val1 * val2;
            case '/': return parseFloat((val1 / val2).toFixed(2)); // Clean decimals
            default: return '?';
        }
    }, [operands, operator]);

    return (
        <div className="absolute inset-0 pointer-events-none z-50 overflow-hidden">
            <AnimatePresence>
                {/* Operands Flying In */}
                {stage < 2 && operands.map((op, idx) => (
                    <motion.div
                        key={`op-${idx}`}
                        initial={{ x: op.startPos.x, y: op.startPos.y, opacity: 0.5, scale: 0.8 }}
                        animate={{
                            x: meetingPoint.x + (idx === 0 ? -20 : 20), // Slight separation
                            y: meetingPoint.y,
                            opacity: 1,
                            scale: 1,
                        }}
                        exit={{ opacity: 0, scale: 0.5 }}
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
                {stage < 2 && (
                    <motion.div
                        initial={{ x: midX, y: midY, opacity: 0, scale: 0 }}
                        animate={{ x: meetingPoint.x, y: meetingPoint.y, opacity: 1, scale: 1.5 }}
                        transition={{ duration: 0.4, delay: 0.2 }}
                        className="absolute font-bold text-base text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]"
                    >
                        {operator}
                    </motion.div>
                )}

                {/* Result Flying to Target */}
                {stage >= 2 && (
                    <motion.div
                        initial={{ x: meetingPoint.x, y: meetingPoint.y, scale: 1.2, opacity: 1 }}
                        animate={{
                            x: target.endPos.x,
                            y: target.endPos.y,
                            scale: 0.5,
                            opacity: 0
                        }}
                        transition={{ duration: 0.6, ease: "backIn" }}
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
