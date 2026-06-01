'use client';

import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

interface Props {
  children: ReactNode;
  name?: string;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class VisualizerErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error(`Visualizer Error [${this.props.name || 'Unknown'}]:`, error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="w-full h-full min-h-[150px] flex flex-col items-center justify-center p-6 bg-red-500/5 rounded-3xl border-2 border-dashed border-red-500/30 text-center backdrop-blur-sm">
          <div className="w-12 h-12 rounded-full bg-red-500/10 flex items-center justify-center mb-3">
            <AlertTriangle className="text-red-500" size={24} />
          </div>
          <h3 className="text-red-500 font-bold mb-1 uppercase tracking-wider text-xs">
            Visualizer Crashed
          </h3>
          <p className="text-theme-secondary text-[11px] mb-4 max-w-[200px] leading-relaxed">
            The {this.props.name || 'component'} encountered an error while rendering this step.
          </p>
          <button
            onClick={() => this.setState({ hasError: false })}
            className="flex items-center gap-2 px-3 py-1.5 bg-red-500 hover:bg-red-600 text-white rounded-lg text-[10px] font-bold transition-all shadow-lg active:scale-95"
          >
            <RefreshCw size={12} />
            Try Re-render
          </button>
          
          {process.env.NODE_ENV === 'development' && this.state.error && (
             <div className="mt-4 p-2 bg-black/40 rounded text-[9px] text-red-300 font-mono text-left max-w-full overflow-auto max-h-24 border border-red-500/20">
                {this.state.error.message}
             </div>
          )}
        </div>
      );
    }

    return this.props.children;
  }
}
