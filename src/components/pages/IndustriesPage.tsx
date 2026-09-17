import React, { useState } from 'react';
import { STRATEGIC_SECTORS_LIST } from '../../data/companyData';
import {
  Building2,
  ArrowRight,
  CheckCircle2,
  ShieldCheck,
  Compass,
} from 'lucide-react';

interface IndustriesPageProps {
  onNavigate: (view: string) => void;
  selectedIndustryId?: string;
}

export const IndustriesPage: React.FC<IndustriesPageProps> = ({
  onNavigate,
  selectedIndustryId,
}) => {
  const [activeSectorId, setActiveSectorId] = useState<string>(
    selectedIndustryId || STRATEGIC_SECTORS_LIST[0]?.id || 'private-residential-estates'
  );

  const activeSector =
    STRATEGIC_SECTORS_LIST.find((s) => s.id === activeSectorId) || STRATEGIC_SECTORS_LIST[0];

  return (
    <div className="min-h-screen bg-[#071A2F] text-slate-100 pt-32 pb-24 px-4 blueprint-grid">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Editorial Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#C6922D] mb-3">
            <Building2 className="w-4 h-4" />
            <span>Development Sectors</span>
          </div>
          <h1 className="font-serif-display text-4xl sm:text-6xl font-normal text-white tracking-tight">
            Strategic Development Sectors
          </h1>
          <p className="font-sans-body text-base text-slate-300 mt-4 leading-relaxed">
            Focused development planning and civil engineering coordination for high-value asset classes across the Philippines, engineered for long-term capital preservation and operational excellence.
          </p>
        </div>

        {/* 8 Sectors Navigation Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-12">
          {STRATEGIC_SECTORS_LIST.map((sector) => {
            const isActive = activeSector.id === sector.id;
            return (
              <button
                key={sector.id}
                onClick={() => setActiveSectorId(sector.id)}
                className={`p-4 rounded-xl text-left border transition-all ${
                  isActive
                    ? 'bg-[#C6922D]/20 border-[#C6922D] text-white shadow-lg'
                    : 'bg-[#081F38] border-white/5 text-slate-400 hover:border-white/20 hover:text-slate-200'
                }`}
              >
                <div className="text-xs font-semibold uppercase tracking-wider mb-1 line-clamp-1">
                  {sector.title}
                </div>
                <div className="text-[11px] text-slate-400 line-clamp-1">
                  {sector.subtitle}
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Sector Showcase Card */}
        <div className="bg-[#081F38] border border-white/10 rounded-2xl overflow-hidden shadow-2xl mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            {/* Left Content */}
            <div className="lg:col-span-7 p-8 sm:p-12 flex flex-col justify-between">
              <div>
                <div className="inline-block text-xs font-mono text-[#C6922D] uppercase tracking-widest mb-2">
                  Sector Profile
                </div>
                <h2 className="font-serif-display text-3xl sm:text-4xl text-white font-normal mb-3">
                  {activeSector.title}
                </h2>
                <div className="text-sm text-[#e5b95d] font-medium mb-6">
                  {activeSector.subtitle}
                </div>
                <p className="text-sm text-slate-200 leading-relaxed font-sans-body mb-8">
                  {activeSector.description}
                </p>

                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-3">
                    Typical Development Scope:
                  </h4>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-300">
                    {activeSector.scope.map((item, idx) => (
                      <li key={idx} className="flex items-center gap-2 bg-white/5 p-3 rounded-lg border border-white/5">
                        <CheckCircle2 className="w-4 h-4 text-[#C6922D] shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-8 mt-8 border-t border-white/10 flex flex-wrap items-center gap-4">
                <button
                  onClick={() => onNavigate('start-project')}
                  className="px-6 py-3 rounded-md font-bold text-xs uppercase tracking-wider bg-[#C6922D] hover:bg-[#d8a339] text-[#071A2F] transition-all inline-flex items-center gap-2"
                >
                  <span>Inquire for this Sector</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => onNavigate('projects')}
                  className="px-5 py-3 rounded-md font-medium text-xs tracking-wider uppercase text-slate-200 hover:text-white bg-white/5 border border-white/20 transition-all"
                >
                  <span>View Projects</span>
                </button>
              </div>
            </div>

            {/* Right Image */}
            <div className="lg:col-span-5 relative min-h-[300px] lg:min-h-full">
              <img
                src={activeSector.image}
                alt={activeSector.title}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = '/assets/images/civil-roads.jpg';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#081F38] via-transparent to-transparent lg:hidden" />
            </div>
          </div>
        </div>

        {/* Complete 8 Sectors Architectural Grid */}
        <div className="mb-16">
          <div className="max-w-2xl mb-8">
            <span className="text-xs font-mono text-[#C6922D] uppercase tracking-widest">
              Comprehensive Sector Coverage
            </span>
            <h3 className="font-serif-display text-2xl sm:text-3xl text-white font-normal mt-1">
              All Eight Strategic Development Sectors
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {STRATEGIC_SECTORS_LIST.map((sec) => (
              <div
                key={sec.id}
                onClick={() => {
                  setActiveSectorId(sec.id);
                  window.scrollTo({ top: 300, behavior: 'smooth' });
                }}
                className="bg-[#081F38] border border-white/10 rounded-xl p-6 hover:border-[#C6922D]/40 cursor-pointer transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="h-40 rounded-lg overflow-hidden mb-4 relative">
                    <img
                      src={sec.image}
                      alt={sec.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).src = '/assets/images/civil-roads.jpg';
                      }}
                    />
                  </div>
                  <h4 className="font-serif-display text-lg text-white font-normal mb-1 group-hover:text-[#e5b95d] transition-colors">
                    {sec.title}
                  </h4>
                  <p className="text-xs text-slate-400 line-clamp-2">
                    {sec.subtitle}
                  </p>
                </div>
                <div className="pt-4 mt-4 border-t border-white/5 text-xs text-[#C6922D] font-semibold inline-flex items-center gap-1">
                  <span>View details</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
