import React, { useState } from 'react';
import { PORTFOLIO_PROJECTS } from '../../data/companyData';
import { PortfolioProject, ProjectStage } from '../../types';
import {
  Building2,
  CheckCircle2,
  MapPin,
  Calendar,
  Layers,
  ShieldAlert,
  ArrowRight,
  Info,
  Clock,
} from 'lucide-react';

interface ProjectsPageProps {
  onNavigate: (view: string) => void;
}

export const ProjectsPage: React.FC<ProjectsPageProps> = ({ onNavigate }) => {
  const [selectedStage, setSelectedStage] = useState<string>('All');
  const [activeProjectModal, setActiveProjectModal] = useState<PortfolioProject | null>(null);

  const stages = ['All', 'Under Construction', 'In Development', 'Proposed', 'Concept'];

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
            In adherence to corporate compliance, projects are labeled under six verifiable milestones: <em>Concept, Proposed, Pre-development, In Development, Under Construction, or Completed</em>. No simulated accomplishments or false claims of built structures are permitted.
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap gap-2 mb-10">
          {stages.map((stg) => (
            <button
              key={stg}
              onClick={() => setSelectedStage(stg)}
              className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
                selectedStage === stg
                  ? 'bg-[#C6922D] text-[#071A2F] font-bold shadow'
                  : 'bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10'
              }`}
            >
              {stg}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredProjects.map((prj) => (
            <div
              key={prj.id}
              className="bg-[#09223d] border border-white/10 hover:border-[#C6922D]/40 rounded-3xl overflow-hidden shadow-xl flex flex-col justify-between transition-all"
            >
              <div className="p-6 sm:p-8">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                      prj.stage === 'Under Construction'
                        ? 'bg-[#C6922D]/20 text-[#e5b95d] border border-[#C6922D]/40'
                        : prj.stage === 'In Development'
                        ? 'bg-blue-900/40 text-blue-300 border border-blue-700/40'
                        : prj.stage === 'Proposed'
                        ? 'bg-emerald-900/40 text-emerald-300 border border-emerald-700/40'
                        : 'bg-slate-800 text-slate-300 border border-slate-700'
                    }`}
                  >
                    {prj.stage}
                  </span>
                  <div className="flex items-center gap-1.5 text-xs text-slate-400 font-mono">
                    <MapPin className="w-3.5 h-3.5 text-[#C6922D]" />
                    <span>{prj.location}</span>
                  </div>
                </div>

                <h3 className="text-xl font-bold text-white mb-2">{prj.name}</h3>
                <div className="text-xs text-[#C6922D] font-semibold mb-3">{prj.sector}</div>
                <p className="text-xs text-slate-300 leading-relaxed mb-6">{prj.scope}</p>

                <div className="grid grid-cols-2 gap-4 py-4 border-y border-white/10 text-xs">
                  <div>
                    <div className="text-slate-400 text-[10px] uppercase font-semibold">Project Code</div>
                    <div className="text-white font-medium mt-0.5">{prj.code}</div>
                  </div>
                  <div>
                    <div className="text-slate-400 text-[10px] uppercase font-semibold">Location</div>
                    <div className="text-white font-medium mt-0.5">{prj.location}</div>
                  </div>
                </div>

                {prj.servicesByLdlDhenze && prj.servicesByLdlDhenze.length > 0 && (
                  <div className="mt-4 space-y-1.5">
                    {prj.servicesByLdlDhenze.slice(0, 3).map((h, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-[11px] text-slate-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#C6922D] shrink-0 mt-0.5" />
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="px-6 sm:px-8 py-4 bg-black/20 border-t border-white/5 flex items-center justify-between text-xs">
                <span className="text-[11px] font-mono text-slate-400">
                  {prj.isConceptual ? 'Masterplanning Framework' : 'Active Registered Track'}
                </span>
                <button
                  onClick={() => setActiveProjectModal(prj)}
                  className="px-3.5 py-1.5 bg-[#C6922D] hover:bg-[#d8a339] text-[#071A2F] font-bold rounded-lg transition-colors inline-flex items-center gap-1.5"
                >
                  <span>Project Dossier</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Modal for Project Dossier Details */}
        {activeProjectModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
            <div className="bg-[#09223d] border border-[#C6922D]/40 rounded-3xl p-6 sm:p-8 max-w-2xl w-full shadow-2xl space-y-4">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div>
                  <span className="text-xs font-mono font-bold text-[#C6922D]">
                    {activeProjectModal.stage}
                  </span>
                  <h3 className="text-xl font-bold text-white mt-1">
                    {activeProjectModal.name}
                  </h3>
                </div>
                <button
                  onClick={() => setActiveProjectModal(null)}
                  className="text-slate-400 hover:text-white p-2"
                >
                  ✕
                </button>
              </div>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {activeProjectModal.scope}
              </p>

              <div className="bg-[#051322] p-4 rounded-xl space-y-2 text-xs border border-white/5">
                <div className="flex justify-between">
                  <span className="text-slate-400">Location:</span>
                  <span className="text-white font-medium">{activeProjectModal.location}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Development Sector:</span>
                  <span className="text-white font-medium">{activeProjectModal.sector}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Project Reference:</span>
                  <span className="text-white font-medium">{activeProjectModal.code}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Statutory Framework:</span>
                  <span className="text-[#C6922D] font-mono">PSIC 42900 / RA 9266</span>
                </div>
              </div>

              <div className="pt-2 flex justify-end gap-3">
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
                  className="px-5 py-2 rounded-lg text-xs font-bold bg-[#C6922D] text-[#071A2F] hover:bg-[#d8a339]"
                >
                  Submit Inquiry For Similar Scope
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
