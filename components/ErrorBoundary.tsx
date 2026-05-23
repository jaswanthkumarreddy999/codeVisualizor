'use client';

import React, { ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCcw } from 'lucide-react';

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends React.Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error in Visualizer:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="w-full h-full flex flex-col items-center justify-center bg-theme-secondary/20 rounded-2xl border border-red-500/20 p-8 text-center">
          <div className="w-16 h-16 rounded-full bg-red-500/10 flex items-center justify-center text-red-500 mb-4">
            <AlertTriangle size={32} />
          </div>
          <h2 className="text-xl font-bold text-theme-primary mb-2">Visualizer Crashed</h2>
          <p className="text-sm text-theme-secondary mb-6 max-w-md">
            Something went wrong while rendering the visualization. This usually happens when the execution state contains unexpected data structures.
          </p>
          <div className="bg-black/20 p-4 rounded-lg mb-6 w-full max-w-lg overflow-auto max-h-32 text-left">
            <code className="text-xs text-red-400 font-mono">
              {this.state.error?.message || 'Unknown error'}
            </code>
          </div>
          <button
            onClick={() => this.setState({ hasError: false })}
            className="flex items-center gap-2 px-6 py-2 bg-accent text-white rounded-lg font-bold hover:opacity-90 transition-all active:scale-95"
          >
            <RefreshCcw size={16} />
            Reset Visualizer
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
