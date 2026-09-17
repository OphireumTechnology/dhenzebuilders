import React from 'react';
import { PORTFOLIO_PROJECTS } from '../../data/companyData';
import { ArrowLeft, MapPin, Calendar, CheckCircle2, ShieldAlert, Award, FileText } from 'lucide-react';

interface ProjectDetailPageProps {
  projectSlug: string;
  onNavigate: (view: string) => void;
}

export const ProjectDetailPage: React.FC<ProjectDetailPageProps> = ({ projectSlug, onNavigate }) => {
  const project = PORTFOLIO_PROJECTS.find(
    (p) => p.id === projectSlug || p.name.toLowerCase().replace(/\s+/g, '-').includes(projectSlug.toLowerCase())
  ) || PORTFOLIO_PROJECTS[0];

  return (
    <div className="min-h-screen bg-[#071A2F] text-slate-100 pt-28 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <button
          onClick={() => onNavigate('projects')}
          className="inline-flex items-center text-xs tracking-wider uppercase text-[#C6922D] hover:text-[#dfad4b] mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to Project Pipeline
        </button>

        {/* Header */}
        <div className="border-b border-slate-800 pb-8 mb-8">
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-[#C6922D]/10 text-[#C6922D] border border-[#C6922D]/30">
              {project.stage}
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-medium bg-slate-800 text-slate-300">
              {project.sector}
            </span>
            <span className="text-xs text-slate-400 flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-[#C6922D]" /> {project.location}
            </span>
            <span className="text-xs text-slate-500">Code: {project.code}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-serif text-white tracking-tight mb-4">
            {project.name}
          </h1>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-3xl">
            {project.scope}
          </p>
        </div>

        {/* Hero Image */}
        {project.heroImage && (
          <div className="rounded-2xl overflow-hidden border border-slate-800 mb-10 shadow-2xl relative">
            <img
              src={project.heroImage}
              alt={project.name}
              className="w-full h-72 sm:h-96 object-cover"
              referrerPolicy="no-referrer"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).src = '/assets/images/solar-storage.jpg';
              }}
            />
            <div className="absolute bottom-4 left-4 bg-slate-950/80 backdrop-blur-md px-3 py-1.5 rounded text-xs text-slate-300 border border-slate-700">
              {project.stage === 'Completed' ? 'Verified Physical Build Record' : 'Architectural Concept & Feasibility Study'}
            </div>
          </div>
        )}

        {/* Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="md:col-span-2 space-y-6">
            <div className="bg-[#0c223c]/60 border border-slate-800 rounded-xl p-6">
              <h2 className="text-lg font-serif text-white mb-3 flex items-center gap-2">
                <Award className="w-4 h-4 text-[#C6922D]" /> Project Scope & Engineering Highlights
              </h2>
              <div className="space-y-4 text-sm text-slate-300 leading-relaxed mb-6">
                <div>
                  <h3 className="text-xs uppercase tracking-wider text-[#C6922D] font-bold mb-1">Engineering Challenge:</h3>
                  <p>{project.challenge}</p>
                </div>
                <div>
                  <h3 className="text-xs uppercase tracking-wider text-[#C6922D] font-bold mb-1">Delivered Solution:</h3>
                  <p>{project.solution}</p>
                </div>
              </div>

              {project.servicesByLdlDhenze && project.servicesByLdlDhenze.length > 0 && (
                <div className="space-y-2 mb-4">
                  <h3 className="text-xs uppercase tracking-wider text-slate-400 font-bold mb-2">Scope Undertaken by LDL Dhenze:</h3>
                  {project.servicesByLdlDhenze.map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                      <CheckCircle2 className="w-4 h-4 text-[#C6922D] shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              )}

              {project.sustainableFeatures && project.sustainableFeatures.length > 0 && (
                <div className="space-y-2">
                  <h3 className="text-xs uppercase tracking-wider text-emerald-400 font-bold mb-2">Resilient & Sustainable Features:</h3>
                  {project.sustainableFeatures.map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 shrink-0" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-[#0c223c]/60 border border-slate-800 rounded-xl p-6 space-y-4">
              <h2 className="text-sm uppercase tracking-wider text-slate-400 font-bold">Metadata & Verification</h2>
              <div>
                <span className="text-xs text-slate-400">Target Completion / Year:</span>
                <p className="text-sm font-medium text-white">{project.year || 'Phase-Controlled Execution'}</p>
              </div>
              <div>
                <span className="text-xs text-slate-400">Disclosure Classification:</span>
                <p className="text-sm font-medium text-white">{project.clientDisclosureStatus}</p>
              </div>

              {project.verifiedMetrics && project.verifiedMetrics.length > 0 && (
                <div className="pt-3 border-t border-slate-800 space-y-2">
                  <span className="text-xs text-slate-400 font-semibold">Verified Metrics:</span>
                  {project.verifiedMetrics.map((m, idx) => (
                    <div key={idx} className="flex justify-between text-xs py-1 border-b border-slate-800/60">
                      <span className="text-slate-400">{m.label}</span>
                      <span className="text-white font-medium">{m.value}</span>
                    </div>
                  ))}
                </div>
              )}

              <div className="pt-4 border-t border-slate-800">
                <button
                  onClick={() => onNavigate('portal/client/overview')}
                  className="w-full py-2.5 px-4 rounded-lg bg-[#C6922D] hover:bg-[#dfad4b] text-slate-950 font-semibold text-xs tracking-wider uppercase transition-colors text-center"
                >
                  Initiate Client Development
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
