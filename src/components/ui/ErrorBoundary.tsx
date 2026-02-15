import React, { Component, ErrorInfo, ReactNode } from "react";
import { AlertTriangle } from "lucide-react";
import { Button } from "./Button";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-obsidian flex flex-col items-center justify-center text-center p-6">
          <div className="w-16 h-16 rounded-full bg-red-500/10 flex items-center justify-center mb-6 border border-red-500/20">
            <AlertTriangle className="w-8 h-8 text-red-500" />
          </div>
          <h1 className="text-3xl font-display text-silk-white mb-4">
            Something went wrong
          </h1>
          <p className="text-silk-white/50 max-w-md mb-8 font-light">
            We encountered an unexpected error. Please try refreshing the page
            or contact support if the problem persists.
          </p>
          <div className="flex gap-4">
            <Button
              className="bg-silk-white text-obsidian hover:bg-silk-white/90"
              onClick={() => window.location.reload()}
            >
              Refresh Page
            </Button>
            <Button
              className="bg-silk-white/5 text-silk-white hover:bg-silk-white/10"
              onClick={() => (window.location.href = "/")}
            >
              Go Home
            </Button>
          </div>
          {this.state.error && (
            <div className="mt-12 p-4 bg-obsidian-surface border border-silk-white/5 rounded-xl max-w-2xl w-full text-left overflow-hidden">
              <p className="text-xs font-mono text-red-400 mb-2">
                Error Details:
              </p>
              <pre className="text-[10px] sm:text-xs text-silk-white/30 font-mono overflow-auto whitespace-pre-wrap wrap-break-word">
                {this.state.error.toString()}
              </pre>
            </div>
          )}
        </div>
      );
    }

    return this.props.children;
  }
}
