import React, { useState } from 'react';
import {
  COMPANY_PROFILE,
  CORE_VALUES,
  CAPABILITY_LIST,
  INDUSTRY_LIST,
  PORTFOLIO_PROJECTS,
  INTEGRATED_PLATFORM_STAGES,
  REGULATORY_COMPLIANCE,
} from '../../data/companyData';
import {
  ArrowRight,
  ShieldCheck,
  Building2,
  Cpu,
  Sun,
  HardHat,
  Trophy,
  CheckCircle2,
  Sparkles,
  Layers,
  ChevronRight,
  Compass,
  FileText,
  Clock,
  ExternalLink,
} from 'lucide-react';

interface HomePageProps {
  onNavigate: (view: string) => void;
  onOpenAssistant: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate, onOpenAssistant }) => {
  const [activeStageIndex, setActiveStageIndex] = useState(0);

  return (
    <div className="min-h-screen bg-[#071A2F] text-slate-100 selection:bg-[#C6922D] selection:text-[#071A2F]">
      {/* ---------------------------------------------------- */}
      {/* 1. CINEMATIC HERO SECTION */}
      {/* ---------------------------------------------------- */}
      <section className="relative pt-32 pb-24 lg:pt-40 lg:pb-32 overflow-hidden blueprint-grid border-b border-[#C6922D]/20">
        {/* Subtle architectural ambient lights */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-[#C6922D]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 right-10 w-[450px] h-[300px] bg-[#237A3B]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl">
            {/* Verified Credentials Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-[#C6922D]/40 text-xs text-slate-200 mb-6 backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-[#237A3B] animate-ping" />
              <span className="font-semibold text-[#C6922D]">Official Enterprise Platform</span>
              <span className="text-slate-400">|</span>
              <span className="font-mono text-[11px] text-slate-300">DTI BN: 4812272 • BIR TIN: 306-113-062-00000</span>
            </div>

            {/* Official Positioning Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black font-['Montserrat'] tracking-tight text-white leading-[1.15] mb-6">
              Building Today.{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-[#C6922D] to-amber-500">
                Engineering Tomorrow.
              </span>{' '}
              Powering the Future.
            </h1>

            {/* Sub-headline directly grounded in verified corporate mission */}
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-3xl mb-8">
              LDL Dhenze Residential Building Construction is an integrated construction, civil engineering, infrastructure, green-energy, and technology solutions enterprise organized under Philippine law. We engineer sustainable, intelligent, and future-ready environments with institutional discipline.
            </p>

            {/* Hero CTAs */}
            <div className="flex flex-wrap items-center gap-4 mb-12">
              <button
                id="hero-start-project-btn"
                onClick={() => onNavigate('start-project')}
                className="px-6 py-3.5 rounded-md font-bold text-sm bg-[#C6922D] hover:bg-[#d8a339] text-[#071A2F] uppercase tracking-wider transition-all shadow-lg hover:shadow-[#C6922D]/20 transform hover:-translate-y-0.5 inline-flex items-center gap-2"
              >
                <span>Launch Project Wizard</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                id="hero-assistant-btn"
                onClick={onOpenAssistant}
                className="px-5 py-3.5 rounded-md font-semibold text-sm bg-white/10 hover:bg-white/15 text-white border border-[#C6922D]/30 transition-all inline-flex items-center gap-2 backdrop-blur-sm"
              >
                <Sparkles className="w-4 h-4 text-[#C6922D]" />
                <span>Consult Builder Assistant</span>
              </button>

              <button
                onClick={() => onNavigate('capabilities')}
                className="px-5 py-3.5 rounded-md font-semibold text-sm text-slate-300 hover:text-white hover:bg-white/5 transition-all inline-flex items-center gap-1.5"
              >
                <span>View 14 Capabilities</span>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </button>
            </div>

            {/* Key Assurance Indicators */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-8 border-t border-white/10">
              <div className="space-y-1">
                <div className="text-xs text-slate-400 uppercase tracking-wider font-semibold">Registered PSIC</div>
                <div className="text-base font-bold text-white font-['Montserrat']">42900</div>
                <div className="text-[11px] text-slate-400">Civil Engineering Projects</div>
              </div>
              <div className="space-y-1">
                <div className="text-xs text-slate-400 uppercase tracking-wider font-semibold">PRC Compliance</div>
                <div className="text-base font-bold text-[#C6922D] font-['Montserrat']">RA 9266</div>
                <div className="text-[11px] text-slate-400">Licensed Professional Practice</div>
              </div>
              <div className="space-y-1">
                <div className="text-xs text-slate-400 uppercase tracking-wider font-semibold">Green Energy</div>
                <div className="text-base font-bold text-[#237A3B] font-['Montserrat']">RA 9513</div>
                <div className="text-[11px] text-slate-400">Solar PV & BESS Storage</div>
              </div>
              <div className="space-y-1">
                <div className="text-xs text-slate-400 uppercase tracking-wider font-semibold">Delivery Model</div>
                <div className="text-base font-bold text-white font-['Montserrat']">12 Stages</div>
                <div className="text-[11px] text-slate-400">Integrated Project Delivery</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------- */}
      {/* 2. STATUTORY DISCLOSURES & ENTERPRISE POSITIONING */}
      {/* ---------------------------------------------------- */}
      <section className="py-12 bg-[#09223d] border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-[#C6922D]/10 border border-[#C6922D]/30 flex items-center justify-center shrink-0 mt-0.5">
                <ShieldCheck className="w-5 h-5 text-[#C6922D]" />
              </div>
              <div>
                <h3 className="text-sm font-bold uppercase tracking-wider text-slate-200">
                  Institutional Transparency & Philippine Regulatory Standards
                </h3>
                <p className="text-xs text-slate-400 mt-1 max-w-3xl leading-relaxed">
                  LDL Dhenze Residential Building Construction operates under DTI BN 4812272 and BIR Form 2303. Regulated architectural, structural, civil, mechanical, and electrical engineering plans are rendered exclusively through duly qualified and PRC-licensed professionals.
                </p>
              </div>
            </div>
            <button
              onClick={() => onNavigate('about')}
              className="shrink-0 px-4 py-2 rounded text-xs font-bold bg-white/5 hover:bg-white/10 text-slate-200 border border-white/10 transition-colors inline-flex items-center gap-1.5"
            >
              <span>View Legal Credentials</span>
              <ExternalLink className="w-3.5 h-3.5 text-[#C6922D]" />
            </button>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------- */}
      {/* 3. 14 CAPABILITIES OVERVIEW (CORE CAPABILITIES) */}
      {/* ---------------------------------------------------- */}
      <section className="py-20 bg-[#071A2F] border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#C6922D] mb-2 font-['Montserrat']">
                <span className="w-2 h-2 rounded-full bg-[#C6922D]" />
                Fields of Business & Capabilities
              </div>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
                An Integrated Development Enterprise
              </h2>
              <p className="text-sm text-slate-400 mt-2 max-w-2xl">
                Fourteen verified capability domains spanning civil construction, supply networks, heavy machinery, licensed architecture, renewable energy, and smart technologies.
              </p>
            </div>
            <button
              onClick={() => onNavigate('capabilities')}
              className="mt-4 md:mt-0 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#C6922D] hover:text-amber-300 transition-colors"
            >
              <span>Explore All 14 Capabilities</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Capabilities Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {CAPABILITY_LIST.slice(0, 6).map((cap) => (
              <div
                key={cap.id}
                onClick={() => onNavigate(`capability-${cap.id}`)}
                className="bg-[#0b2545] border border-white/10 hover:border-[#C6922D]/40 rounded-xl p-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 cursor-pointer group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-xs font-bold text-[#C6922D] bg-[#C6922D]/10 px-2.5 py-1 rounded">
                      CAPABILITY {String(cap.order).padStart(2, '0')}
                    </span>
                    <span className="text-[11px] font-semibold text-slate-400 group-hover:text-slate-200">
                      {cap.category}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-white group-hover:text-[#C6922D] transition-colors mb-2">
                    {cap.title}
                  </h3>

                  <p className="text-xs text-slate-300 leading-relaxed mb-4">
                    {cap.summary}
                  </p>

                  <div className="space-y-1.5 pt-2 border-t border-white/5">
                    {cap.keyOfferings.slice(0, 3).map((item, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-[11px] text-slate-400">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#C6922D] shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-5 mt-4 border-t border-white/5 flex items-center justify-between text-xs text-[#C6922D] font-semibold">
                  <span>Detailed Specifications</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------- */}
      {/* 4. INTEGRATED PROJECT DELIVERY (12-STAGE TIMELINE) */}
      {/* ---------------------------------------------------- */}
      <section className="py-20 bg-[#061626] border-b border-white/10 blueprint-grid-dense">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#C6922D] mb-2 font-['Montserrat']">
              <span>Integrated Project Delivery (IPD)</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              The 12-Stage Lifecycle Platform
            </h2>
            <p className="text-sm text-slate-400 mt-2">
              From land assessment and feasibility studies through BIM coordination, civil execution, smart energy commissioning, and operations handover.
            </p>
          </div>

          {/* Interactive Horizontal Stages Stepper */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 mb-8">
            {INTEGRATED_PLATFORM_STAGES.map((stg, idx) => (
              <button
                key={stg.step}
                onClick={() => setActiveStageIndex(idx)}
                className={`p-3 rounded-lg text-left transition-all border ${
                  activeStageIndex === idx
                    ? 'bg-[#C6922D]/20 border-[#C6922D] text-white shadow-md'
                    : 'bg-white/5 border-white/5 text-slate-400 hover:bg-white/10 hover:text-slate-200'
                }`}
              >
                <div className="font-mono text-[10px] font-bold text-[#C6922D] mb-1">
                  STAGE {stg.step}
                </div>
                <div className="text-xs font-bold truncate">
                  {stg.title}
                </div>
              </button>
            ))}
          </div>

          {/* Active Stage Detailed Card */}
          {INTEGRATED_PLATFORM_STAGES[activeStageIndex] && (
            <div className="bg-[#09233f] border border-[#C6922D]/30 rounded-2xl p-6 sm:p-8 max-w-4xl mx-auto shadow-2xl">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
                <div>
                  <span className="font-mono text-xs font-bold text-[#C6922D] bg-[#C6922D]/15 px-3 py-1 rounded-full">
                    STAGE {INTEGRATED_PLATFORM_STAGES[activeStageIndex].step} OF 10
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold text-white mt-2">
                    {INTEGRATED_PLATFORM_STAGES[activeStageIndex].title}
                  </h3>
                </div>
                <button
                  onClick={() => onNavigate('start-project')}
                  className="px-4 py-2 rounded text-xs font-bold bg-[#C6922D] text-[#071A2F] uppercase tracking-wider hover:bg-[#d8a339] transition-colors shrink-0"
                >
                  Inquire For This Stage
                </button>
              </div>

              <p className="text-sm text-slate-300 leading-relaxed my-5">
                {INTEGRATED_PLATFORM_STAGES[activeStageIndex].desc}
              </p>

              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                  Integrated Execution Value:
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <div className="flex items-center gap-2 text-xs text-slate-200 bg-white/5 px-3 py-2 rounded border border-white/5">
                    <CheckCircle2 className="w-4 h-4 text-[#C6922D] shrink-0" />
                    <span>Statutory Alignment & PRC Licensed Professional Sign-Off</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-200 bg-white/5 px-3 py-2 rounded border border-white/5">
                    <CheckCircle2 className="w-4 h-4 text-[#C6922D] shrink-0" />
                    <span>Cost Certainty & Transparent Bill of Quantities Tracking</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ---------------------------------------------------- */}
      {/* 5. VERIFIED PORTFOLIO & PIPELINE */}
      {/* ---------------------------------------------------- */}
      <section className="py-20 bg-[#071A2F] border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#C6922D] mb-2 font-['Montserrat']">
                <span>Verified Project Pipeline</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
                Current Projects & Developments
              </h2>
              <p className="text-sm text-slate-400 mt-2 max-w-2xl">
                Strict corporate stage integrity: Every project is labeled by its real status. Renders and masterplans are never depicted as completed structures.
              </p>
            </div>
            <button
              onClick={() => onNavigate('projects')}
              className="mt-4 md:mt-0 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#C6922D] hover:text-amber-300 transition-colors"
            >
              <span>View Complete Portfolio</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {PORTFOLIO_PROJECTS.map((prj) => (
              <div
                key={prj.id}
                className="bg-[#0b2545] border border-white/10 rounded-2xl overflow-hidden shadow-xl hover:border-[#C6922D]/40 transition-all flex flex-col justify-between"
              >
                <div className="p-6 sm:p-8">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                    <span
                      className={`px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider ${
                        prj.stage === 'Under Construction'
                          ? 'bg-[#C6922D]/20 text-[#e5b95d] border border-[#C6922D]/40'
                          : prj.stage === 'In Development'
                          ? 'bg-blue-900/40 text-blue-300 border border-blue-700/40'
                          : prj.stage === 'Proposed'
                          ? 'bg-emerald-900/40 text-emerald-300 border border-emerald-700/40'
                          : 'bg-slate-800 text-slate-300'
                      }`}
                    >
                      {prj.stage}
                    </span>
                    <span className="font-mono text-xs text-slate-400">{prj.location}</span>
                  </div>

                  <h3 className="text-xl font-bold text-white mb-2">{prj.name}</h3>
                  <p className="text-xs text-[#C6922D] font-semibold mb-3">{prj.sector}</p>
                  <p className="text-xs text-slate-300 leading-relaxed mb-6">{prj.scope}</p>

                  <div className="grid grid-cols-2 gap-4 py-4 border-y border-white/10 text-xs">
                    {prj.location && (
                      <div>
                        <div className="text-slate-400 text-[10px] uppercase">Location</div>
                        <div className="text-white font-semibold">{prj.location}</div>
                      </div>
                    )}
                    {prj.code && (
                      <div>
                        <div className="text-slate-400 text-[10px] uppercase">Project Code</div>
                        <div className="text-white font-semibold">{prj.code}</div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="px-6 sm:px-8 py-4 bg-black/20 border-t border-white/5 flex items-center justify-between text-xs">
                  <span className="text-slate-400">
                    {prj.isConceptual ? 'Conceptual Framework' : 'Active Registered Track'}
                  </span>
                  <button
                    onClick={() => onNavigate('projects')}
                    className="text-[#C6922D] font-bold hover:underline inline-flex items-center gap-1"
                  >
                    Examine Specifications <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------- */}
      {/* 6. LEADERSHIP PROFILE: FOUNDER & CEO */}
      {/* ---------------------------------------------------- */}
      <section className="py-20 bg-[#09223d] border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5">
              <div className="relative">
                {/* Visual Architectural Frame */}
                <div className="w-full aspect-[4/5] rounded-2xl bg-gradient-to-tr from-[#071A2F] via-[#0d3159] to-[#071A2F] border-2 border-[#C6922D]/40 p-8 flex flex-col justify-between shadow-2xl relative overflow-hidden">
                  <div className="blueprint-grid absolute inset-0 opacity-25" />
                  <div className="relative z-10">
                    <span className="text-xs font-mono font-bold text-[#C6922D] uppercase tracking-widest">
                      Founder & Chief Executive Profile
                    </span>
                    <h3 className="text-2xl font-black text-white font-['Montserrat'] mt-2">
                      LEODENIS DEVEZA LANGUISAN
                    </h3>
                    <p className="text-xs text-slate-300 font-semibold mt-1">
                      Founder, President & Chief Executive Officer
                    </p>
                  </div>

                  <div className="relative z-10 space-y-3 pt-6 border-t border-white/10 text-xs text-slate-300">
                    <div>
                      <div className="text-[10px] text-slate-400 uppercase">Educational Credentials</div>
                      <div className="font-semibold text-white">Bachelor of Commerce, Major in Banking & Finance</div>
                      <div className="text-slate-400">STI College, Baguio City</div>
                    </div>
                    <div>
                      <div className="font-semibold text-white">Bachelor of Science in Information Technology</div>
                      <div className="text-slate-400">Data Center College of the Philippines, Baguio City</div>
                    </div>
                    <div>
                      <div className="text-[10px] text-slate-400 uppercase">Corporate Foundation</div>
                      <div className="text-slate-200">Former JPMorgan Chase Bank (Operations, Mortgages & Risk Controls)</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#C6922D] font-['Montserrat']">
                <span>Executive Philosophy & Governance</span>
              </div>

              <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
                Where Financial Discipline Meets Engineering Excellence
              </h2>

              <blockquote className="text-sm sm:text-base text-slate-200 italic leading-relaxed border-l-2 border-[#C6922D] pl-5">
                “To build an enterprise where financial discipline meets engineering excellence, where technology strengthens infrastructure, and where every project is approached not merely as a structure to be completed, but as a long-term asset capable of creating enduring economic and social value.”
              </blockquote>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                With over two decades of multidisciplinary leadership spanning international banking, technology systems, cooperative governance, and construction, Mr. Languisan guides LDL Dhenze with an emphasis on statutory compliance, consumer protection, and engineering precision.
              </p>

              {/* 4 Core Pillars */}
              <div className="grid grid-cols-2 gap-4 pt-4">
                <div className="bg-white/5 p-4 rounded-xl border border-white/5">
                  <div className="text-xs font-bold text-[#C6922D] mb-1">Compliant by Law</div>
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    Observe all applicable statutes, national building codes, and licensing boundaries.
                  </p>
                </div>
                <div className="bg-white/5 p-4 rounded-xl border border-white/5">
                  <div className="text-xs font-bold text-[#C6922D] mb-1">Ethical by Choice</div>
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    Uncompromising integrity in contracts, procurement, and worker welfare.
                  </p>
                </div>
              </div>

              <div>
                <button
                  onClick={() => onNavigate('about')}
                  className="px-5 py-2.5 rounded text-xs font-bold bg-[#C6922D] text-[#071A2F] uppercase tracking-wider hover:bg-[#d8a339] transition-colors inline-flex items-center gap-2"
                >
                  <span>Read Full Executive Profile</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------- */}
      {/* 7. PROJECT INQUIRY BANNER */}
      {/* ---------------------------------------------------- */}
      <section className="py-16 bg-gradient-to-b from-[#071A2F] to-[#051322]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-[#0b284c] border border-[#C6922D]/30 rounded-3xl p-8 sm:p-12 shadow-2xl relative overflow-hidden">
            <div className="blueprint-grid absolute inset-0 opacity-20" />
            <div className="relative z-10 max-w-2xl mx-auto">
              <span className="text-xs font-mono font-bold text-[#C6922D] uppercase tracking-widest">
                Start Your Development
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-2 mb-4">
                Ready to Structure Your Next Infrastructure or Building Project?
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-8">
                Utilize our Project Opportunity Wizard to define your location, land control status, engineering parameters, and stage requirements for immediate project review.
              </p>

              <div className="flex flex-wrap items-center justify-center gap-4">
                <button
                  onClick={() => onNavigate('start-project')}
                  className="px-6 py-3 bg-[#C6922D] hover:bg-[#d8a339] text-[#071A2F] font-bold text-xs uppercase tracking-wider rounded-lg shadow-lg transition-transform transform active:scale-95"
                >
                  Open Project Wizard
                </button>
                <button
                  onClick={() => onNavigate('book-consultation')}
                  className="px-6 py-3 bg-white/10 hover:bg-white/15 text-white font-semibold text-xs uppercase tracking-wider rounded-lg border border-white/10 transition-colors"
                >
                  Book Technical Consultation
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
