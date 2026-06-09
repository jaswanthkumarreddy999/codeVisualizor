'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export interface ArithmeticOperand {
    name: string;
    value: any;
    startPos?: { x: number; y: number };
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
    const [stage, setStage] = useState(0);

    const visibleOperands = operands.filter(op => op.startPos);

    // Meeting point: midpoint of all visible operands, slightly above
    const meetingPoint = React.useMemo(() => {
        if (visibleOperands.length > 0) {
            const midX = visibleOperands.reduce((acc, op) => acc + op.startPos!.x, 0) / visibleOperands.length;
            const midY = visibleOperands.reduce((acc, op) => acc + op.startPos!.y, 0) / visibleOperands.length;
            return { x: midX, y: midY - 60 };
        }
        return { x: 500, y: 300 };
    }, []);

    useEffect(() => {
        let t1: NodeJS.Timeout, t2: NodeJS.Timeout, t3: NodeJS.Timeout, t4: NodeJS.Timeout, t5: NodeJS.Timeout;

        if (secondaryOperator) {
            t1 = setTimeout(() => setStage(1), 600);
            t2 = setTimeout(() => setStage(2), 1200);
            t3 = setTimeout(() => setStage(3), 2000);
            t4 = setTimeout(() => setStage(4), 3000);
            t5 = setTimeout(() => onComplete(), 3800);
        } else {
            // Simple: operands fly to meeting point (600ms), result flies to target (600ms), done
            t1 = setTimeout(() => setStage(1), 600);   // operands arrive
            t2 = setTimeout(() => setStage(2), 1200);  // result flies to target
            t3 = setTimeout(() => onComplete(), 1300); // reveal target 0.5s earlier
        }

        return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4); clearTimeout(t5); };
    }, [secondaryOperator]);

    const intermediateResult = React.useMemo(() => {
        if (operands.length === 1) return operands[0].value;
        if (operands.length < 2) return '?';
        const v1 = Number(operands[0].value);
        const v2 = Number(operands[1]?.value);
        switch (operator) {
            case '+': return v1 + v2;
            case '-': return v1 - v2;
            case '*': return v1 * v2;
            case '/': return parseFloat((v1 / v2).toFixed(2));
            case '%': return v1 % v2;
            case '==': return operands[0].value == operands[1].value;
            case '!=': return operands[0].value != operands[1].value;
            case '<':  return operands[0].value < operands[1].value;
            case '>':  return operands[0].value > operands[1].value;
            case '<=': return operands[0].value <= operands[1].value;
            case '>=': return operands[0].value >= operands[1].value;
            default: return '?';
        }
    }, [operands, operator]);

    const resultValue = explicitResult !== undefined ? explicitResult : intermediateResult;
    const strValue = String(resultValue).toLowerCase();
    const isBool = strValue === 'true' || strValue === 'false';
    const resultColor = isBool
        ? (strValue === 'true' ? 'bg-green-600 border-green-400' : 'bg-red-600 border-red-400')
        : 'bg-accent border-white/20';

    // For simple assign (one operand, operator='assign'), fly directly from source to target
    const isSimpleAssign = operator === 'assign' && visibleOperands.length === 1 && target;

    return (
        <div className="absolute inset-0 pointer-events-none z-50 overflow-hidden">
            <AnimatePresence>
                {isSimpleAssign ? (
                    // ── Simple assignment: single smooth arc from source to target ──
                    stage < 2 && (
                        <motion.div
                            key="assign-token"
                            className="absolute"
                            initial={{
                                left: visibleOperands[0].startPos!.x,
                                top: visibleOperands[0].startPos!.y,
                                x: '-50%',
                                y: '-50%',
                                scale: 1,
                                opacity: 0,
                            }}
                            animate={stage === 0 ? {
                                left: visibleOperands[0].startPos!.x,
                                top: visibleOperands[0].startPos!.y,
                                opacity: 1,
                            } : {
                                left: target!.endPos.x,
                                top: target!.endPos.y,
                                scale: 0.7,
                                opacity: 0,
                            }}
                            transition={stage === 0
                                ? { duration: 0.4, ease: 'easeOut' }
                                : { duration: 0.55, ease: [0.4, 0, 0.2, 1] }
                            }
                        >
                            <div className="bg-accent text-white px-4 py-2 rounded-xl border border-white/20 shadow-[0_0_24px_var(--accent-light)] font-mono font-bold text-xl whitespace-nowrap">
                                {String(operands[0].value)}
                            </div>
                            <div className="text-[11px] text-center text-theme-secondary mt-1 font-bold">
                                {operands[0].name}
                            </div>
                        </motion.div>
                    )
                ) : (
                    // ── Multi-operand / arithmetic / comparison ──
                    <>
                        {/* Operands flying to meeting point */}
                        {stage < 1 && operands.map((op, idx) => {
                            const start = op.startPos || {
                                x: meetingPoint.x + (idx === 0 ? -120 : 120),
                                y: meetingPoint.y,
                            };
                            return (
                                <motion.div
                                    key={`op-${idx}`}
                                    className="absolute"
                                    initial={{ left: start.x, top: start.y, x: '-50%', y: '-50%', opacity: op.startPos ? 1 : 0, scale: 1 }}
                                    animate={{ left: meetingPoint.x + (idx === 0 ? -55 : 55), top: meetingPoint.y, opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
                                    transition={{ duration: 0.55, ease: [0.4, 0, 0.2, 1] }}
                                >
                                    <div className="bg-theme-secondary/90 text-accent px-3 py-1 rounded-lg border border-accent shadow-lg backdrop-blur-md font-mono font-bold text-lg">
                                        {String(op.value)}
                                    </div>
                                    <div className="text-[10px] text-center text-theme-secondary mt-1 font-bold bg-theme-main/80 px-1 rounded">
                                        {op.name}
                                    </div>
                                </motion.div>
                            );
                        })}

                        {/* Operator symbol */}
                        {stage < 1 && operator !== 'assign' && (
                            <motion.div
                                key="operator"
                                className="absolute"
                                initial={{ left: meetingPoint.x, top: meetingPoint.y, x: '-50%', y: '-50%', opacity: 0, scale: 0 }}
                                animate={{ opacity: 1, scale: 1.5 }}
                                exit={{ opacity: 0, scale: 0 }}
                                transition={{ duration: 0.4, delay: 0.2 }}
                            >
                                <span className="font-bold text-base text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]">
                                    {operator}
                                </span>
                            </motion.div>
                        )}

                        {/* Intermediate result */}
                        {stage >= 1 && stage < 3 && (
                            <motion.div
                                key="intermediate"
                                className="absolute"
                                initial={{ left: meetingPoint.x, top: meetingPoint.y, x: '-50%', y: '-50%', scale: 0.5, opacity: 0 }}
                                animate={{ scale: 1.2, opacity: 1, left: secondaryOperator ? meetingPoint.x - 40 : meetingPoint.x }}
                                exit={{ opacity: 0, scale: 0.8 }}
                                transition={{ duration: 0.4 }}
                            >
                                <div className="text-white px-4 py-2 rounded-xl border-2 border-white/20 bg-accent shadow-2xl font-bold text-2xl">
                                    {String(intermediateResult).toUpperCase()}
                                </div>
                            </motion.div>
                        )}

                        {/* Secondary operator */}
                        {stage >= 2 && stage < 3 && secondaryOperator && (
                            <motion.div
                                key="secondary"
                                className="absolute"
                                initial={{ left: meetingPoint.x + 30, top: meetingPoint.y, x: '-50%', y: '-50%', opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.4 }}
                            >
                                <span className="font-mono text-xl text-white font-bold bg-white/10 border border-white/30 px-3 py-1 rounded-lg backdrop-blur-sm shadow-lg">
                                    {secondaryOperator}
                                </span>
                            </motion.div>
                        )}

                        {/* Final result flying to target */}
                        {stage >= 3 && (
                            <motion.div
                                key="final-result"
                                className="absolute"
                                initial={{ left: meetingPoint.x, top: meetingPoint.y, x: '-50%', y: '-50%', scale: 0.8, opacity: 0 }}
                                animate={{
                                    left: stage >= 4 && target ? target.endPos.x : meetingPoint.x,
                                    top: stage >= 4 && target ? target.endPos.y : meetingPoint.y,
                                    scale: stage >= 4 && target ? 0.5 : 1.5,
                                    opacity: stage >= 4 && target ? 0 : 1,
                                }}
                                transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
                            >
                                <div className={`text-white px-4 py-2 rounded-xl border-2 shadow-2xl font-bold text-2xl ${resultColor}`}>
                                    {String(resultValue).toUpperCase()}
                                </div>
                            </motion.div>
                        )}
                    </>
                )}
            </AnimatePresence>
        </div>
    );
};
