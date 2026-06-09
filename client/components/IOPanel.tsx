'use client';

import React from 'react';
import { ChevronUp, ChevronDown, Maximize2, Minimize2, ChevronLeft, ChevronRight } from 'lucide-react';

interface IOPanelProps {
  inputVal: string;
  onInputChange: (val: string) => void;
  outputVal: string;
  isIOCollapsed: boolean;
  onToggleIO: () => void;
  inputWidth: number;
  onInputWidthResize: (isResizing: boolean) => void;
}

export const IOPanel: React.FC<IOPanelProps> = ({
  inputVal,
  onInputChange,
  outputVal,
  isIOCollapsed,
  onToggleIO,
  inputWidth,
  onInputWidthResize
}) => {
  const [isInputCollapsed, setIsInputCollapsed] = React.useState(false);
  const [isOutputCollapsed, setIsOutputCollapsed] = React.useState(false);

  return (
    <div className={`flex flex-col bg-theme-main min-h-0 transition-all duration-300 ${isIOCollapsed ? 'h-10 shrink-0' : 'flex-grow'}`}>
      {/* Header */}
      <div className={`flex shrink-0 relative ${isIOCollapsed ? 'h-full bg-accent/5 border-t border-accent/20' : 'border-b border-theme bg-theme-tertiary/30'}`}>
        {isIOCollapsed ? (
          <button
            onClick={onToggleIO}
            className="flex-grow px-4 text-[10px] font-bold text-theme-secondary flex items-center justify-center gap-3 hover:bg-accent/10 transition-colors tracking-widest uppercase"
          >
            <ChevronUp size={14} className="text-accent" />
            Terminal Output & Input
            <Maximize2 size={12} className="text-accent opacity-50" />
          </button>
        ) : (
          <div className="flex w-full items-center">
            {!isInputCollapsed && (
              <div style={{ width: `${inputWidth}%` }} className="px-4 py-1.5 text-[10px] font-bold text-theme-secondary border-r border-theme flex items-center gap-2">
                INPUT.txt
              </div>
            )}
            {!isOutputCollapsed && (
              <div className="flex-grow px-4 py-1.5 text-[10px] font-bold text-theme-secondary flex justify-between items-center bg-theme-secondary/20">
                STDOUT
                <button
                  onClick={onToggleIO}
                  className="hover:text-accent transition-colors flex items-center gap-1 opacity-50 hover:opacity-100"
                  title="Collapse IO Panel"
                >
                  <ChevronDown size={14} />
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {(!isIOCollapsed) && (
        <div className="flex-grow flex min-h-0 relative">
          {/* Input Area */}
          {!isInputCollapsed ? (
            <div style={{ width: isOutputCollapsed ? '100%' : `${inputWidth}%` }} className="h-full border-r border-theme relative shrink-0">
              <textarea
                className="w-full h-full bg-transparent p-4 text-xs font-mono text-theme-primary focus:outline-none resize-none placeholder:opacity-30"
                placeholder="Enter standard input here..."
                value={inputVal}
                onChange={(e) => onInputChange(e.target.value)}
              />
              <button 
                onClick={() => setIsInputCollapsed(true)}
                className="absolute top-2 right-2 p-1 text-theme-secondary hover:text-accent opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <ChevronLeft size={14} />
              </button>
            </div>
          ) : (
            <button
              onClick={() => setIsInputCollapsed(false)}
              className="w-8 h-full bg-theme-tertiary border-r border-theme flex flex-col items-center justify-center hover:bg-theme-secondary transition-colors"
            >
              <div className="[writing-mode:vertical-rl] rotate-180 text-[9px] font-bold text-theme-secondary uppercase tracking-widest mb-2">INPUT</div>
              <ChevronRight size={12} className="text-accent" />
            </button>
          )}

          {/* Resize Handle */}
          {!isInputCollapsed && !isOutputCollapsed && (
            <div
              className="w-1 cursor-col-resize hover:bg-accent active:bg-accent z-10 transition-colors delay-75"
              onMouseDown={() => onInputWidthResize(true)}
            />
          )}

          {/* Output Area */}
          {!isOutputCollapsed ? (
            <div className="flex-grow h-full relative bg-theme-secondary/5 min-w-0">
              <textarea
                readOnly
                className="w-full h-full bg-transparent p-4 text-xs font-mono text-theme-primary focus:outline-none resize-none placeholder:opacity-30"
                placeholder="Standard output will appear here..."
                value={outputVal}
              />
              <button 
                onClick={() => setIsOutputCollapsed(true)}
                className="absolute top-2 left-2 p-1 text-theme-secondary hover:text-accent opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <ChevronRight size={14} />
              </button>
            </div>
          ) : (
            <button
              onClick={() => setIsOutputCollapsed(false)}
              className="w-8 h-full bg-theme-tertiary border-l border-theme flex flex-col items-center justify-center hover:bg-theme-secondary transition-colors"
            >
              <div className="[writing-mode:vertical-rl] rotate-180 text-[9px] font-bold text-theme-secondary uppercase tracking-widest mb-2">OUTPUT</div>
              <ChevronLeft size={12} className="text-accent" />
            </button>
          )}
        </div>
      )}
    </div>
  );
};
