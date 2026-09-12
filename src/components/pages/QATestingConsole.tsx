import React, { useState } from 'react';
import {
  ShieldCheck,
  CheckCircle2,
  XCircle,
  Play,
  RotateCw,
  AlertTriangle,
  FileCheck,
  Terminal,
} from 'lucide-react';

interface QATestingConsoleProps {
  onNavigate: (view: string) => void;
}

export const QATestingConsole: React.FC<QATestingConsoleProps> = ({ onNavigate }) => {
  const [running, setRunning] = useState(false);
  const [results, setResults] = useState<any[]>([]);
  const [summary, setSummary] = useState<{ total: number; passed: number; failed: number } | null>(
    null
  );

  const runAllTests = async () => {
    setRunning(true);
    setResults([]);
    setSummary(null);

    try {
      const res = await fetch('/api/qa/run-tests');
      const data = await res.json();
      const testList = data.results || data.tests || [];
      setResults(testList);
      setSummary({
        total: data.summary?.total || data.total || testList.length,
        passed: data.summary?.passed ?? data.passed ?? testList.filter((t: any) => t.status === 'PASSED' || t.passed).length,
        failed: data.summary?.failed ?? data.failed ?? testList.filter((t: any) => t.status === 'FAILED' || t.passed === false).length,
      });
    } catch (err) {
      console.error('QA Test execution failed:', err);
    } finally {
      setRunning(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#071A2F] text-slate-100 pt-32 pb-24 px-4 blueprint-grid">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#C6922D] mb-2 font-['Montserrat']">
              <ShieldCheck className="w-4 h-4" />
              <span>Compliance, Commercial & Security Verification</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-black text-white font-['Montserrat'] tracking-tight">
              24-Point Automated QA & Commercial Integrity Test Suite
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 mt-2">
              Validates regulatory adherence, RAG knowledge boundary assertions, role security gates, statutory practice laws, 10x benchmark commercial pricing models, maker-checker approvals, and transactional credit reservations.
            </p>
          </div>

          <button
            onClick={runAllTests}
            disabled={running}
            className="px-6 py-3 bg-[#C6922D] hover:bg-[#d8a339] disabled:opacity-50 text-[#071A2F] font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-lg inline-flex items-center gap-2 shrink-0 self-start sm:self-center"
          >
            {running ? (
              <>
                <RotateCw className="w-4 h-4 animate-spin" />
                <span>Executing Test Suite...</span>
              </>
            ) : (
              <>
                <Play className="w-4 h-4" />
                <span>Run 24-Point QA Tests</span>
              </>
            )}
          </button>
        </div>

        {/* Summary Metric Banner */}
        {summary && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            <div className="bg-[#09223d] border border-white/10 p-5 rounded-2xl">
              <div className="text-slate-400 text-xs font-semibold uppercase">Total Executed</div>
              <div className="text-2xl font-black text-white font-mono mt-1">{summary.total} Tests</div>
            </div>
            <div className="bg-[#09223d] border border-emerald-500/30 p-5 rounded-2xl">
              <div className="text-emerald-400 text-xs font-semibold uppercase">Passed Assertions</div>
              <div className="text-2xl font-black text-emerald-400 font-mono mt-1">{summary.passed} Passed</div>
            </div>
            <div className="bg-[#09223d] border border-white/10 p-5 rounded-2xl">
              <div className="text-slate-400 text-xs font-semibold uppercase">Failed Assertions</div>
              <div className={`text-2xl font-black font-mono mt-1 ${summary.failed > 0 ? 'text-rose-400' : 'text-slate-400'}`}>
                {summary.failed} Failed
              </div>
            </div>
          </div>
        )}

        {/* Test Cases Table */}
        <div className="bg-[#09223d] border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
          <div className="p-4 bg-[#051322] border-b border-white/10 flex items-center justify-between text-xs font-semibold text-slate-400">
            <div className="flex items-center gap-2">
              <Terminal className="w-4 h-4 text-[#C6922D]" />
              <span>Automated Verification Suite Log</span>
            </div>
            <span>Backend Endpoint: /api/qa/run-tests</span>
          </div>

          {results.length === 0 ? (
            <div className="p-12 text-center text-slate-400 text-xs space-y-3">
              <ShieldCheck className="w-10 h-10 text-slate-600 mx-auto" />
              <p>Test suite idle. Click "Run 20-Point QA Tests" to execute all verification assertions against the live backend.</p>
            </div>
          ) : (
            <div className="divide-y divide-white/5 max-h-[600px] overflow-y-auto">
              {results.map((t, idx) => {
                const isPassed = t.status === 'PASSED' || t.passed === true;
                return (
                  <div
                    key={t.id || idx}
                    className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs hover:bg-white/5 transition-colors"
                  >
                    <div className="flex items-start gap-3">
                      {isPassed ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      ) : (
                        <XCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                      )}
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono font-bold text-[#C6922D]">
                            #{String(t.id).padStart(2, '0')}
                          </span>
                          <span className="font-bold text-white">{t.name}</span>
                        </div>
                        {t.description && (
                          <p className="text-slate-400 text-[11px] mt-0.5">{t.description}</p>
                        )}
                        {t.details && (
                          <div className="text-[10px] font-mono text-slate-500 mt-1">
                            Assertion: {t.details}
                          </div>
                        )}
                      </div>
                    </div>

                    <span
                      className={`px-2.5 py-1 rounded-full text-[10px] font-bold font-mono uppercase tracking-wider self-start sm:self-center shrink-0 ${
                        isPassed
                          ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-800/40'
                          : 'bg-rose-950/80 text-rose-300 border border-rose-800/40'
                      }`}
                    >
                      {isPassed ? 'PASSED' : 'FAILED'}
                    </span>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
