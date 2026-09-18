import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';
import { CompanyLogo } from './CompanyLogo';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends React.Component<Props, State> {
  state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.warn('ErrorBoundary caught an error:', error, errorInfo);
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: null });
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#071A2F] text-slate-100 flex items-center justify-center p-6">
          <div className="max-w-md w-full bg-[#0a233f] border border-[#C6922D]/30 rounded-2xl p-6 text-center shadow-2xl space-y-4">
            <div className="flex justify-center mb-2">
              <CompanyLogo variant="emblem" size="md" />
            </div>
            <div className="w-10 h-10 rounded-full bg-amber-500/10 text-[#C6922D] flex items-center justify-center mx-auto">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <h2 className="text-lg font-bold text-white font-['Montserrat']">Application State Notice</h2>
            <p className="text-xs text-slate-400 leading-relaxed">
              A temporary display anomaly was detected. The system has safeguarded your data.
            </p>
            {this.state.error?.message && (
              <div className="bg-black/30 p-2.5 rounded-lg text-[11px] font-mono text-slate-400 text-left overflow-x-auto">
                {this.state.error.message}
              </div>
            )}
            <button
              onClick={this.handleReset}
              className="w-full py-2.5 px-4 bg-[#C6922D] hover:bg-[#d8a339] text-[#071A2F] font-bold text-xs uppercase tracking-wider rounded-xl flex items-center justify-center gap-2 transition-colors"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Reload Application</span>
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
