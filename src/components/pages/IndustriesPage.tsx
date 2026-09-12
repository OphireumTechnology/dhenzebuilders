import React, { useState } from 'react';
import { INDUSTRY_LIST } from '../../data/companyData';
import {
  Building2,
  Home,
  Factory,
  Compass,
  Sprout,
  Sun,
  Cpu,
  ArrowRight,
  CheckCircle2,
  ShieldCheck,
} from 'lucide-react';

interface IndustriesPageProps {
  onNavigate: (view: string) => void;
  selectedIndustryId?: string;
}

export const IndustriesPage: React.FC<IndustriesPageProps> = ({
  onNavigate,
  selectedIndustryId,
}) => {
  const [selectedIndustry, setSelectedIndustry] = useState<string>(
    selectedIndustryId || INDUSTRY_LIST[0].id
  );

  const activeData = INDUSTRY_LIST.find((i) => i.id === selectedIndustry) || INDUSTRY_LIST[0];

  return (
    <div className="min-h-screen bg-[#071A2F] text-slate-100 pt-32 pb-24 px-4 blueprint-grid">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#C6922D] mb-3 font-['Montserrat']">
            <Building2 className="w-4 h-4" />
            <span>Target Market Sectors</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-white font-['Montserrat'] tracking-tight">
            Industries Served
          </h1>
          <p className="text-sm sm:text-base text-slate-300 mt-4 leading-relaxed">
            Tailored engineering strategies for high-growth sectors across the Philippines. From masterplanned residential estates to cold chain agricultural staging and grid-tied solar microgrids.
          </p>
        </div>

        {/* Industry Selector Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-10">
          {INDUSTRY_LIST.map((ind) => (
            <button
              key={ind.id}
              onClick={() => setSelectedIndustry(ind.id)}
              className={`p-4 rounded-xl text-left border transition-all ${
                selectedIndustry === ind.id
                  ? 'bg-[#C6922D]/20 border-[#C6922D] text-white shadow-lg'
                  : 'bg-[#09223d] border-white/5 text-slate-400 hover:bg-white/5 hover:text-slate-200'
              }`}
            >
              <div className="text-xs font-bold font-['Montserrat'] mb-1">
                {ind.title}
              </div>
              <div className="text-[11px] text-slate-400 line-clamp-1">
                {ind.summary}
              </div>
            </button>
          ))}
        </div>

        {/* Detailed Industry Showcase */}
        <div className="bg-[#09223d] border border-[#C6922D]/30 rounded-3xl p-6 sm:p-10 shadow-2xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-white/10">
            <div>
              <span className="text-xs font-mono font-bold text-[#C6922D] uppercase tracking-widest">
                Sector Dossier
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-white mt-1">
                {activeData.title}
              </h2>
            </div>
            <button
              onClick={() => onNavigate('start-project')}
              className="px-5 py-2.5 bg-[#C6922D] hover:bg-[#d8a339] text-[#071A2F] font-bold text-xs uppercase tracking-wider rounded-lg shadow inline-flex items-center gap-2 shrink-0"
            >
              <span>Inquire For This Sector</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed my-6">
            {activeData.description}
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-[#051322] p-5 rounded-2xl border border-white/5">
              <h4 className="text-xs font-bold text-[#C6922D] uppercase tracking-wider mb-3">
                Target Project Types:
              </h4>
              <div className="space-y-2">
                {activeData.targetProjects.map((t, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-200">
                    <CheckCircle2 className="w-4 h-4 text-[#C6922D] shrink-0 mt-0.5" />
                    <span>{t}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-[#051322] p-5 rounded-2xl border border-white/5 flex flex-col justify-between">
              <div>
                <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-3">
                  Integrated Delivery Value:
                </h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  LDL Dhenze simplifies procurement by coordinating engineering feasibility, architectural planning through licensed professionals, heavy equipment dispatch, structural construction, and post-turnover operational maintenance.
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-xs text-slate-400">
                <span className="font-mono text-[11px]">DPWH & PNS Standards</span>
                <button
                  onClick={() => onNavigate('book-consultation')}
                  className="text-[#C6922D] font-bold hover:underline"
                >
                  Schedule Technical Briefing
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
