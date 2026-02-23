import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface PrintAnimatorProps {
    text: string;
    onComplete?: () => void;
}

export const PrintAnimator: React.FC<PrintAnimatorProps> = ({ text, onComplete }) => {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        console.log("PrintAnimator mounted:", text);
        // Hold the text for 2.5 seconds, then hide
        const timer = setTimeout(() => {
            setIsVisible(false);
        }, 2000);

        return () => clearTimeout(timer);
    }, [text]);

    return (
        <AnimatePresence onExitComplete={onComplete}>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.5, y: 20 }}
                    animate={{ opacity: 1, scale: 1.5, y: 0 }}
                    exit={{ opacity: 0, scale: 0.5, y: -50, transition: { duration: 0.5 } }}
                    transition={{
                        type: "spring",
                        stiffness: 200,
                        damping: 15,
                        duration: 0.5
                    }}
                    className="fixed top-1/3 left-1/2 -translate-x-1/2 z-[100] pointer-events-none"
                >
                    <div className="bg-black/80 backdrop-blur-md text-white font-mono text-xl px-8 py-4 rounded-xl shadow-2xl border border-white/20 whitespace-pre-wrap text-center">
                        <span className="text-gray-400 text-sm block mb-1">console output</span>
                        {text}
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};
