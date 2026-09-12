import React from 'react';
import {
  Cpu,
  Layers,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  Lock,
  ArrowRight,
  Database,
  BarChart3,
} from 'lucide-react';

interface TechnologyPageProps {
  onNavigate: (view: string) => void;
  onOpenAssistant: () => void;
}

export const TechnologyPage: React.FC<TechnologyPageProps> = ({ onNavigate, onOpenAssistant }) => {
  return (
    <div className="min-h-screen bg-[#071A2F] text-slate-100 pt-32 pb-24 px-4 blueprint-grid">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#C6922D] mb-3 font-['Montserrat']">
            <Cpu className="w-4 h-4" />
            <span>Digital Construction & Intelligence</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-white font-['Montserrat'] tracking-tight">
            Technology & Building Information Modeling
          </h1>
          <p className="text-sm sm:text-base text-slate-300 mt-4 leading-relaxed">
            Harnessing digital coordination, 4D BIM, drone telemetry, and predictive intelligence to eliminate design clashes, control procurement variances, and optimize asset longevity.
          </p>
        </div>

        {/* AI Decision-Support Boundary Notice */}
        <div className="bg-[#0b2545] border-2 border-[#C6922D]/40 rounded-2xl p-5 mb-12 flex items-start gap-4">
          <div className="w-9 h-9 rounded-xl bg-[#C6922D]/20 text-[#C6922D] flex items-center justify-center shrink-0 mt-0.5">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-200">
              Responsible AI & Professional Decision-Maker Policy
            </h3>
            <p className="text-xs text-slate-300 mt-1 leading-relaxed">
              All artificial intelligence, scheduling heuristics, and digital modeling algorithms deployed by LDL Dhenze operate strictly as decision-support systems. AI does not replace PRC-licensed architects, professional structural engineers, or safety officers who hold ultimate statutory responsibility.
            </p>
          </div>
        </div>

        {/* Core Tech Disciplines */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="bg-[#09223d] border border-white/10 rounded-2xl p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-[#C6922D]/15 text-[#C6922D] flex items-center justify-center mb-4">
                <Layers className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white mb-2">
                BIM (LOD 200–400) Modeling
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed mb-4">
                Full clash-detection across architectural, structural, mechanical, and electrical trades prior to concrete pouring.
              </p>
              <div className="space-y-1.5 text-xs text-slate-400">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#C6922D]" />
                  <span>Geometric spatial coordination</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#C6922D]" />
                  <span>Automated bill-of-quantities (BOQ)</span>
                </div>
              </div>
            </div>
            <div className="pt-4 mt-6 border-t border-white/5 text-[11px] font-mono text-slate-400">
              OpenBIM / IFC Interoperability
            </div>
          </div>

          <div className="bg-[#09223d] border border-white/10 rounded-2xl p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-blue-500/15 text-blue-400 flex items-center justify-center mb-4">
                <BarChart3 className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white mb-2">
                Predictive AI Project Analytics
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed mb-4">
                Algorithm-assisted weather forecasting, material delivery lead-time buffers, and critical path risk alerts.
              </p>
              <div className="space-y-1.5 text-xs text-slate-400">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-blue-400" />
                  <span>Continuous progress variance monitoring</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-blue-400" />
                  <span>Equipment utilization tracking</span>
                </div>
              </div>
            </div>
            <div className="pt-4 mt-6 border-t border-white/5 text-[11px] font-mono text-slate-400">
              Data Privacy Act (RA 10173)
            </div>
          </div>

          <div className="bg-[#09223d] border border-white/10 rounded-2xl p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-emerald-500/15 text-emerald-400 flex items-center justify-center mb-4">
                <Sparkles className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white mb-2">
                LDL Dhenze Builder Assistant
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed mb-4">
                Our controlled internal knowledge engine. Bases answers strictly on verified corporate documents with full citations.
              </p>
              <div className="space-y-1.5 text-xs text-slate-400">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Strict scope boundaries & refusal</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Client-Private data isolation</span>
                </div>
              </div>
            </div>
            <div className="pt-4 mt-6 border-t border-white/5">
              <button
                onClick={onOpenAssistant}
                className="text-xs font-bold text-[#C6922D] hover:underline inline-flex items-center gap-1"
              >
                <span>Launch Assistant Console</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
