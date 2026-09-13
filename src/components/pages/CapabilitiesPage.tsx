import React, { useState } from 'react';
import { STRATEGIC_EXPERTISE_LIST, REGULATORY_COMPLIANCE } from '../../data/companyData';
import {
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Building2,
  Scale,
  Sparkles,
  Layers,
  ChevronDown,
} from 'lucide-react';

interface CapabilitiesPageProps {
  onNavigate: (view: string) => void;
  selectedCapabilityId?: string;
}

export const CapabilitiesPage: React.FC<CapabilitiesPageProps> = ({
  onNavigate,
  selectedCapabilityId,
}) => {
  const [expandedId, setExpandedId] = useState<string | null>(
    selectedCapabilityId || STRATEGIC_EXPERTISE_LIST[0]?.id || null
  );

  return (
    <div className="min-h-screen bg-[#071A2F] text-slate-100 pt-32 pb-24 px-4 blueprint-grid">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Editorial Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#C6922D] mb-3">
            <Layers className="w-4 h-4" />
            <span>Strategic Disciplines & Practice Areas</span>
          </div>
          <h1 className="font-serif-display text-4xl sm:text-6xl font-normal text-white tracking-tight">
            Integrated Expertise for Complex Developments
          </h1>
          <p className="font-sans-body text-base text-slate-300 mt-4 leading-relaxed">
            Consolidating commercial planning, technical coordination, and physical execution into seven disciplined domains. Delivered in rigorous coordination with duly licensed Philippine professionals and accredited contractors.
          </p>
        </div>

        {/* Regulatory Governance Banner */}
        <div className="bg-[#061325] border border-[#C6922D]/30 rounded-2xl p-6 mb-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <Scale className="w-5 h-5 text-[#C6922D] shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">
                Professional Boundaries & Regulatory Rigor
              </h4>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed max-w-3xl">
                All architectural, structural, and specialty engineering designs, calculations, and official submittals are executed exclusively by duly licensed Philippine architects and professional engineers under RA 9266, the Civil Engineering Law, and PRC regulations. Construction requiring PCAB accreditation is performed in direct partnership with licensed builders.
              </p>
            </div>
          </div>
          <button
            onClick={() => onNavigate('about')}
            className="shrink-0 text-xs font-semibold text-[#C6922D] hover:text-[#e5b95d] inline-flex items-center gap-1"
          >
            <span>View compliance</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* 7 Consolidated Strategic Groups */}
        <div className="space-y-6 mb-16">
          {STRATEGIC_EXPERTISE_LIST.map((exp, index) => {
            const isExpanded = expandedId === exp.id;
            return (
              <div
                key={exp.id}
                id={exp.id}
                className={`bg-[#081F38] border rounded-2xl overflow-hidden transition-all shadow-xl ${
                  isExpanded ? 'border-[#C6922D]/60' : 'border-white/10 hover:border-white/20'
                }`}
              >
                {/* Accordion Trigger */}
                <div
                  onClick={() => setExpandedId(isExpanded ? null : exp.id)}
                  className="p-6 sm:p-8 cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-white/5 transition-colors"
                >
                  <div className="flex items-start sm:items-center gap-4">
                    <span className="font-mono text-xs font-bold text-[#C6922D] bg-[#C6922D]/15 px-3 py-1.5 rounded-lg shrink-0">
                      0{index + 1}
                    </span>
                    <div>
                      <h3 className="font-serif-display text-2xl text-white font-normal">
                        {exp.title}
                      </h3>
                      <div className="text-xs text-[#e5b95d] mt-1 font-medium">
                        {exp.tagline}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <span className="text-xs text-slate-400 hidden sm:inline">
                      {isExpanded ? 'Collapse' : 'Expand Details'}
                    </span>
                    <ChevronDown
                      className={`w-5 h-5 text-[#C6922D] transition-transform duration-300 ${
                        isExpanded ? 'rotate-180' : ''
                      }`}
                    />
                  </div>
                </div>

                {/* Expanded Details */}
                {isExpanded && (
                  <div className="px-6 pb-8 sm:px-8 pt-2 border-t border-white/5 animate-in fade-in duration-200">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                      <div className="lg:col-span-7 space-y-4">
                        <p className="text-sm text-slate-200 leading-relaxed font-sans-body">
                          {exp.description}
                        </p>

                        <div>
                          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-3">
                            Scope of Services & Deliverables:
                          </h4>
                          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs text-slate-300">
                            {exp.scope.map((item, idx) => (
                              <li key={idx} className="flex items-start gap-2 bg-white/5 p-3 rounded-lg border border-white/5">
                                <CheckCircle2 className="w-4 h-4 text-[#C6922D] shrink-0 mt-0.5" />
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="bg-[#061325] border border-white/5 rounded-xl p-4 text-xs text-slate-400 flex items-start gap-2.5">
                          <ShieldCheck className="w-4 h-4 text-[#C6922D] shrink-0 mt-0.5" />
                          <div>
                            <span className="font-semibold text-slate-300">Governance Note: </span>
                            {exp.governanceNote}
                          </div>
                        </div>
                      </div>

                      <div className="lg:col-span-5 space-y-4">
                        <div className="relative rounded-xl overflow-hidden h-52 border border-white/10 shadow-lg">
                          <img
                            src={exp.image}
                            alt={exp.title}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-[#071A2F]/90 via-transparent to-transparent" />
                          <div className="absolute bottom-3 left-3 text-[11px] font-mono text-[#e5b95d] bg-[#071A2F]/80 px-2 py-1 rounded backdrop-blur-sm">
                            {exp.title}
                          </div>
                        </div>

                        <button
                          onClick={() => onNavigate('start-project')}
                          className="w-full py-3 px-4 rounded-lg font-bold text-xs uppercase tracking-wider text-[#071A2F] bg-[#C6922D] hover:bg-[#d8a339] transition-all flex items-center justify-center gap-2 shadow-lg"
                        >
                          <span>Inquire About This Expertise</span>
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Private Consultation CTA */}
        <div className="bg-[#081F38] border border-white/10 rounded-2xl p-8 sm:p-12 text-center max-w-4xl mx-auto">
          <h3 className="font-serif-display text-3xl sm:text-4xl text-white font-normal mb-3">
            Coordinate Your Next Development
          </h3>
          <p className="text-sm text-slate-300 leading-relaxed max-w-xl mx-auto mb-8 font-sans-body">
            Speak directly with our senior development advisory team to review site viability, regulatory roadmaps, and capital timelines.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => onNavigate('start-project')}
              className="px-6 py-3.5 rounded-md font-bold text-xs uppercase tracking-wider bg-[#C6922D] hover:bg-[#d8a339] text-[#071A2F] transition-all inline-flex items-center gap-2"
            >
              <span>Discuss a Project</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => onNavigate('contact')}
              className="px-6 py-3.5 rounded-md font-medium text-xs tracking-wider uppercase text-slate-200 hover:text-white bg-white/5 border border-white/20 transition-all inline-flex items-center gap-2"
            >
              <span>Contact Headquarters</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
