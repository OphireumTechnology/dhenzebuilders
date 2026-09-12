import React, { useState } from 'react';
import { CAPABILITY_LIST, REGULATORY_COMPLIANCE } from '../../data/companyData';
import {
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Building2,
  Scale,
  Sparkles,
  ExternalLink,
  ChevronDown,
  Layers,
} from 'lucide-react';

interface CapabilitiesPageProps {
  onNavigate: (view: string) => void;
  selectedCapabilityId?: string;
}

export const CapabilitiesPage: React.FC<CapabilitiesPageProps> = ({
  onNavigate,
  selectedCapabilityId,
}) => {
  const [activeFilter, setActiveFilter] = useState<string>('All');
  const [expandedCapId, setExpandedCapId] = useState<string | null>(selectedCapabilityId || null);

  const categories = ['All', 'Core Engineering & Construction', 'Resources & Fleet', 'Design & Technology', 'Energy & Systems'];

  const filteredList = CAPABILITY_LIST.filter((cap) => {
    if (activeFilter === 'All') return true;
    if (activeFilter === 'Core Engineering & Construction') {
      return ['Construction & Civil Works', 'Integrated Development', 'Consulting & Management'].includes(cap.category);
    }
    if (activeFilter === 'Resources & Fleet') {
      return ['Materials & Supply', 'Heavy Equipment Fleet', 'Operational Lifecycle'].includes(cap.category);
    }
    if (activeFilter === 'Design & Technology') {
      return ['Architecture & Engineering Coordination', 'Smart Systems', 'Applied Technology'].includes(cap.category);
    }
    if (activeFilter === 'Energy & Systems') {
      return ['Sustainable Power', 'Agro-Industrial Solutions', 'Water & Ecological Infrastructure', 'Safety & Environmental'].includes(cap.category);
    }
    return true;
  });

  return (
    <div className="min-h-screen bg-[#071A2F] text-slate-100 pt-32 pb-24 px-4 blueprint-grid">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#C6922D] mb-3 font-['Montserrat']">
            <Layers className="w-4 h-4" />
            <span>Enterprise Scope of Services</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-white font-['Montserrat'] tracking-tight">
            Fourteen Integrated Capabilities
          </h1>
          <p className="text-sm sm:text-base text-slate-300 mt-4 leading-relaxed">
            Delivering multidisciplinary infrastructure solutions under a unified governance and execution framework. Each domain coordinates with licensed specialists and accredited partners.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
                activeFilter === cat
                  ? 'bg-[#C6922D] text-[#071A2F] font-bold shadow-md'
                  : 'bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Capabilities Accordion / Grid */}
        <div className="space-y-6">
          {filteredList.map((cap) => {
            const isExpanded = expandedCapId === cap.id || selectedCapabilityId === cap.id;

            return (
              <div
                key={cap.id}
                id={cap.id}
                className="bg-[#09223d] border border-white/10 rounded-2xl overflow-hidden hover:border-[#C6922D]/40 transition-all shadow-xl"
              >
                {/* Accordion Header */}
                <div
                  onClick={() => setExpandedCapId(isExpanded ? null : cap.id)}
                  className="p-6 cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#09223d] hover:bg-white/5 transition-colors"
                >
                  <div className="flex items-start gap-4">
                    <span className="font-mono text-sm font-black text-[#C6922D] bg-[#C6922D]/15 px-3 py-1.5 rounded-lg shrink-0 mt-0.5">
                      #{String(cap.order).padStart(2, '0')}
                    </span>
                    <div>
                      <div className="text-[11px] font-bold text-[#C6922D] uppercase tracking-wider">
                        {cap.category}
                      </div>
                      <h3 className="text-lg sm:text-xl font-bold text-white mt-0.5">
                        {cap.title}
                      </h3>
                      <p className="text-xs text-slate-300 mt-1 max-w-3xl line-clamp-2">
                        {cap.summary}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 self-end sm:self-center">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onNavigate('start-project');
                      }}
                      className="px-3.5 py-1.5 rounded-lg text-xs font-bold bg-white/10 hover:bg-[#C6922D] hover:text-[#071A2F] text-slate-200 transition-colors uppercase tracking-wider"
                    >
                      Inquire
                    </button>
                    <div
                      className={`p-2 rounded-lg bg-white/5 text-slate-400 transform transition-transform duration-200 ${
                        isExpanded ? 'rotate-180 text-[#C6922D]' : ''
                      }`}
                    >
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </div>
                </div>

                {/* Expanded Details Body */}
                {isExpanded && (
                  <div className="p-6 sm:p-8 border-t border-white/10 bg-[#06182c] space-y-6 animate-in slide-in-from-top-2 duration-200">
                    <div className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                      {cap.fullDescription}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                      <div className="bg-[#051322] p-4 rounded-xl border border-white/5">
                        <h4 className="text-xs font-bold text-[#C6922D] uppercase tracking-wider mb-3">
                          Verified Key Deliverables:
                        </h4>
                        <div className="space-y-2">
                          {cap.keyOfferings.map((off, idx) => (
                            <div key={idx} className="flex items-start gap-2 text-xs text-slate-200">
                              <CheckCircle2 className="w-3.5 h-3.5 text-[#C6922D] shrink-0 mt-0.5" />
                              <span>{off}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="bg-[#051322] p-4 rounded-xl border border-white/5 flex flex-col justify-between">
                        <div>
                          <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-2 flex items-center gap-2">
                            <Scale className="w-4 h-4 text-[#C6922D]" />
                            <span>Statutory & Licensing Alignment:</span>
                          </h4>
                          <p className="text-xs text-slate-400 leading-relaxed">
                            {cap.complianceNote}
                          </p>
                        </div>

                        <div className="pt-4 mt-4 border-t border-white/5 flex items-center justify-between">
                          <span className="text-[11px] text-slate-400 font-mono">
                            PSIC 42900 Verified Scope
                          </span>
                          <button
                            onClick={() => onNavigate('start-project')}
                            className="text-xs font-bold text-[#C6922D] hover:underline inline-flex items-center gap-1"
                          >
                            <span>Launch Opportunity Dossier</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
