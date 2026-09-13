import React, { useState } from 'react';
import { PORTFOLIO_PROJECTS } from '../../data/companyData';
import { PortfolioProject } from '../../types';
import {
  Building2,
  CheckCircle2,
  MapPin,
  ArrowRight,
  Info,
  ExternalLink,
  ShieldCheck,
  Filter,
} from 'lucide-react';

interface ProjectsPageProps {
  onNavigate: (view: string) => void;
}

export const ProjectsPage: React.FC<ProjectsPageProps> = ({ onNavigate }) => {
  const [selectedStage, setSelectedStage] = useState<string>('All');
  const [activeProjectModal, setActiveProjectModal] = useState<PortfolioProject | null>(null);

  const stages = [
    'All',
    'Completed',
    'Under Construction',
    'In Development',
    'Proposed',
    'Conceptual Study',
  ];

  const filteredProjects = PORTFOLIO_PROJECTS.filter((p) => {
    if (selectedStage === 'All') return true;
    return p.stage === selectedStage;
  });

  return (
    <div className="min-h-screen bg-[#071A2F] text-slate-100 pt-32 pb-24 px-4 blueprint-grid">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-8">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#C6922D] mb-3 font-['Montserrat']">
            <Building2 className="w-4 h-4" />
            <span>Project Pipeline & Portfolio</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-white font-['Montserrat'] tracking-tight">
            Verified Developments & Engineering Pipeline
          </h1>
          <p className="text-sm sm:text-base text-slate-300 mt-4 leading-relaxed">
            Every undertaking is cataloged with strict stage attribution. We uphold absolute honesty: conceptual frameworks and 3D renders are clearly delineated from active physical construction.
          </p>
        </div>

        {/* Mandatory Honesty & Stage Integrity Policy Banner */}
        <div className="bg-[#0b2545] border border-[#C6922D]/30 rounded-2xl p-4 sm:p-5 mb-10 flex items-start gap-3.5 text-xs text-slate-300">
          <Info className="w-5 h-5 text-[#C6922D] shrink-0 mt-0.5" />
          <div>
            <strong className="text-white">Strict Stage Classification Protocol: </strong>
            In adherence to Philippine corporate governance, projects are categorized under verifiable milestones: <em>Completed, Under Construction, In Development, Proposed, or Conceptual Study</em>. Conceptual models are never presented as finished physical builds.
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center gap-2 mb-10">
          <span className="text-xs font-semibold text-slate-400 mr-2 flex items-center gap-1.5">
            <Filter className="w-3.5 h-3.5 text-[#C6922D]" /> Filter by Stage:
          </span>
          {stages.map((stg) => (
            <button
              key={stg}
              onClick={() => setSelectedStage(stg)}
              className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
                selectedStage === stg
                  ? 'bg-[#C6922D] text-[#071A2F] font-bold shadow-lg'
                  : 'bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10'
              }`}
            >
              {stg}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((prj) => (
            <div
              key={prj.id}
              className="bg-[#09223d] border border-white/10 hover:border-[#C6922D]/40 rounded-2xl overflow-hidden shadow-xl flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 group"
            >
              <div>
                {/* Project Image */}
                <div className="aspect-[16/10] relative overflow-hidden bg-slate-800">
                  <img
                    src={prj.heroImage}
                    alt={`${prj.name} - ${prj.stage} by LDL Dhenze`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#09223d] via-transparent to-black/30" />
                  <div className="absolute top-3 left-3">
                    <span
                      className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                        prj.stage === 'Completed'
                          ? 'bg-[#237A3B] text-white'
                          : prj.stage === 'Under Construction'
                          ? 'bg-[#C6922D] text-[#071A2F]'
                          : prj.stage === 'In Development'
                          ? 'bg-blue-600 text-white'
                          : prj.stage === 'Proposed'
                          ? 'bg-amber-700 text-amber-100'
                          : 'bg-purple-800 text-purple-200'
                      }`}
                    >
                      {prj.stage}
                    </span>
                  </div>
                  <div className="absolute top-3 right-3">
                    <span className="font-mono text-[10px] bg-black/60 backdrop-blur-md px-2.5 py-0.5 rounded text-slate-200">
                      {prj.code}
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-center gap-1.5 text-xs text-slate-400 font-mono mb-1.5">
                    <MapPin className="w-3.5 h-3.5 text-[#C6922D]" />
                    <span>{prj.location}</span>
                  </div>

                  <h3 className="text-lg font-bold text-white group-hover:text-[#C6922D] transition-colors mb-1">
                    {prj.name}
                  </h3>
                  <div className="text-xs text-[#C6922D] font-semibold mb-3">
                    {prj.sector}
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed mb-4 line-clamp-3">
                    {prj.scope}
                  </p>

                  {prj.isConceptual && (
                    <div className="p-2.5 rounded bg-amber-500/10 border border-amber-500/20 text-[11px] text-amber-300 leading-snug mb-4">
                      <strong>Disclaimer:</strong> Conceptual visualization. Not a photograph of a completed development.
                    </div>
                  )}

                  {prj.servicesByLdlDhenze && prj.servicesByLdlDhenze.length > 0 && (
                    <div className="space-y-1.5 pt-3 border-t border-white/10">
                      <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider mb-1">
                        Scope of Execution:
                      </div>
                      {prj.servicesByLdlDhenze.slice(0, 2).map((h, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-[11px] text-slate-300">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#C6922D] shrink-0 mt-0.5" />
                          <span className="truncate">{h}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="px-6 py-4 bg-black/20 border-t border-white/5 flex items-center justify-between text-xs">
                <span className="text-[11px] font-mono text-slate-400">
                  {prj.clientDisclosureStatus}
                </span>
                <button
                  onClick={() => setActiveProjectModal(prj)}
                  className="px-3 py-1.5 bg-[#C6922D] hover:bg-[#d8a339] text-[#071A2F] font-bold rounded-lg transition-colors inline-flex items-center gap-1"
                >
                  <span>Specifications</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Modal for Project Dossier Details */}
        {activeProjectModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
            <div className="bg-[#09223d] border border-[#C6922D]/40 rounded-3xl p-6 sm:p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl space-y-4">
              <div className="flex items-start justify-between border-b border-white/10 pb-4">
                <div>
                  <span className="text-xs font-mono font-bold text-[#C6922D] uppercase tracking-wider">
                    {activeProjectModal.code} • {activeProjectModal.stage}
                  </span>
                  <h3 className="text-xl font-bold text-white mt-1">
                    {activeProjectModal.name}
                  </h3>
                  <div className="text-xs text-slate-400 mt-0.5">
                    {activeProjectModal.sector} • {activeProjectModal.location}
                  </div>
                </div>
                <button
                  onClick={() => setActiveProjectModal(null)}
                  className="text-slate-400 hover:text-white p-2 text-lg"
                  aria-label="Close Project Dossier Modal"
                >
                  ✕
                </button>
              </div>

              <div className="aspect-[16/9] rounded-xl overflow-hidden">
                <img
                  src={activeProjectModal.heroImage}
                  alt={activeProjectModal.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {activeProjectModal.isConceptual && (
                <div className="p-3 rounded-lg bg-amber-500/15 border border-amber-500/30 text-xs text-amber-200">
                  <strong>Notice of Conceptual Classification:</strong> This visualization reflects architectural studies and conceptual planning frameworks. Not a photograph of a completed structure.
                </div>
              )}

              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                {activeProjectModal.scope}
              </p>

              <div className="bg-[#051322] p-4 rounded-xl space-y-2 text-xs border border-white/5">
                <div className="flex justify-between">
                  <span className="text-slate-400">Location:</span>
                  <span className="text-white font-medium">{activeProjectModal.location}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Sector:</span>
                  <span className="text-white font-medium">{activeProjectModal.sector}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Client Disclosure Status:</span>
                  <span className="text-white font-medium">{activeProjectModal.clientDisclosureStatus}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Regulatory Framework:</span>
                  <span className="text-[#C6922D] font-mono">PSIC 42900 / RA 9266</span>
                </div>
              </div>

              {activeProjectModal.servicesByLdlDhenze && (
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                    Scope of Services Delivered / Planned:
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {activeProjectModal.servicesByLdlDhenze.map((s, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs text-slate-300 bg-white/5 p-2 rounded">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#C6922D] shrink-0" />
                        <span>{s}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="pt-4 flex justify-end gap-3 border-t border-white/10">
                <button
                  onClick={() => setActiveProjectModal(null)}
                  className="px-4 py-2 rounded-lg text-xs font-semibold bg-white/5 text-slate-300 hover:bg-white/10"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    setActiveProjectModal(null);
                    onNavigate('start-project');
                  }}
                  className="px-5 py-2 rounded-lg text-xs font-bold bg-[#C6922D] text-[#071A2F] hover:bg-[#d8a339] inline-flex items-center gap-1.5"
                >
                  <span>Submit Inquiry For Similar Scope</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
