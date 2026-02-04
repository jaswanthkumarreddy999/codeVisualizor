'use client';

import React from 'react';
import { Play, Pause, RotateCcw, ChevronLeft, ChevronRight } from 'lucide-react';

interface TimelineProps {
    currentStep: number;
    totalSteps: number;
    onStepChange: (step: number) => void;
    description: string;
    isPlaying: boolean;
    onPlayPause: () => void;
    playbackSpeed: number;
    onSpeedChange: (speed: number) => void;
}

export const Timeline: React.FC<TimelineProps> = ({
    currentStep,
    totalSteps,
    onStepChange,
    description,
    isPlaying,
    onPlayPause,
    playbackSpeed,
    onSpeedChange
}) => {
    return (
        <div className="h-24 bg-theme-secondary border-t border-theme flex flex-col px-6 py-3 transition-colors">
            <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => onStepChange(0)}
                        className="text-theme-secondary hover:text-theme-primary transition-colors"
                    >
                        <RotateCcw size={18} />
                    </button>
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => onStepChange(Math.max(0, currentStep - 1))}
                            className="p-1 rounded hover:bg-theme-tertiary text-theme-secondary hover:text-theme-primary transition-colors"
                        >
                            <ChevronLeft size={20} />
                        </button>
                        <button
                            onClick={onPlayPause}
                            className="w-8 h-8 rounded-full bg-accent flex items-center justify-center text-white hover:opacity-90 transition-all shadow-lg shadow-accent/20"
                        >
                            {isPlaying ? <Pause size={16} fill="currentColor" /> : <Play size={16} fill="currentColor" />}
                        </button>
                        <button
                            onClick={() => onStepChange(Math.min(totalSteps - 1, currentStep + 1))}
                            className="p-1 rounded hover:bg-theme-tertiary text-theme-secondary hover:text-theme-primary transition-colors"
                        >
                            <ChevronRight size={20} />
                        </button>
                    </div>

                    {/* Speed Control */}
                    <div className="flex items-center gap-1 bg-theme-tertiary rounded-lg p-0.5 border border-theme">
                        {[1000, 500, 200, 50].map(speed => (
                            <button
                                key={speed}
                                onClick={() => onSpeedChange(speed)}
                                className={`text-[10px] px-2 py-1 rounded font-bold transition-colors ${playbackSpeed === speed
                                    ? 'bg-accent text-white shadow-sm'
                                    : 'text-theme-secondary hover:text-theme-primary'
                                    }`}
                            >
                                {speed === 1000 ? '0.5x' : speed === 500 ? '1x' : speed === 200 ? '2.5x' : '5x'}
                            </button>
                        ))}
                    </div>
                </div>
                <span className="text-theme-secondary font-mono text-sm">
                    Step {currentStep + 1} / {totalSteps || 1}
                </span>
            </div>
            <div className="text-theme-secondary text-sm font-medium italic">
                {description}
            </div>

            <div className="relative w-full h-2 bg-theme-tertiary rounded-full mt-2 cursor-pointer group">
                <input
                    type="range"
                    min={0}
                    max={Math.max(0, totalSteps - 1)}
                    value={currentStep}
                    onChange={(e) => onStepChange(parseInt(e.target.value))}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                />
                <div
                    className="absolute left-0 top-0 h-full bg-accent rounded-full transition-all duration-100"
                    style={{ width: `${(currentStep / Math.max(1, totalSteps - 1)) * 100}%` }}
                />
                <div
                    className="absolute h-4 w-4 bg-white rounded-full border-2 border-accent -mt-1 shadow-lg transform -translate-x-1/2 transition-all duration-100"
                    style={{ left: `${(currentStep / Math.max(1, totalSteps - 1)) * 100}%` }}
                />
            </div>
        </div>
    );
};
