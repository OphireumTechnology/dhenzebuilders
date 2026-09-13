import React, { useState } from 'react';
import {
  CAPABILITY_LIST,
  INDUSTRY_LIST,
  PORTFOLIO_PROJECTS,
  INTEGRATED_PLATFORM_STAGES,
  COMPANY_CREDENTIALS,
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
  Users,
  Briefcase,
  TrendingUp,
  Award,
  Zap,
  Leaf,
  Scale,
  Activity,
  ArrowUpRight,
} from 'lucide-react';

interface HomePageProps {
  onNavigate: (view: string) => void;
  onOpenAssistant: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate, onOpenAssistant }) => {
  const [activeStageIndex, setActiveStageIndex] = useState(0);

  // Selected industries for featured showcase
  const featuredIndustryIds = [
    'residential-development',
    'agriculture-agro-industrial-development',
    'renewable-energy-utilities',
    'commercial-development',
    'transportation-civil-works',
    'healthcare-facilities',
  ];

  const featuredIndustries = INDUSTRY_LIST.filter((ind) =>
    featuredIndustryIds.includes(ind.id)
  );

  return (
    <div className="min-h-screen bg-[#071A2F] text-slate-100 selection:bg-[#C6922D] selection:text-[#071A2F]">
      {/* ---------------------------------------------------- */}
      {/* 1. CINEMATIC HERO SECTION */}
      {/* ---------------------------------------------------- */}
      <section className="relative pt-20 pb-24 lg:pt-28 lg:pb-32 overflow-hidden border-b border-[#C6922D]/20">
        {/* Background Image with `<picture>` element and responsive overlay */}
        <div className="absolute inset-0 z-0">
          <picture>
            <source
              srcSet="/dhenzebuilders/assets/images/hero-central-luzon.jpg"
              type="image/jpeg"
            />
            <img
              src="/dhenzebuilders/assets/images/hero-central-luzon.jpg"
              alt="Central Luzon construction site, civil engineering infrastructure, and renewable energy by LDL Dhenze"
              className="w-full h-full object-cover object-center transform scale-105 transition-transform duration-1000 ease-out"
              loading="eager"
            />
          </picture>
          {/* Multi-layered dark navy gradient overlay ensuring WCAG AA contrast (≥7:1) */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#071A2F] via-[#071A2F]/90 to-[#071A2F]/65" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#071A2F] via-transparent to-[#071A2F]/50" />
          <div className="absolute inset-0 blueprint-grid opacity-25 pointer-events-none" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            {/* Verified Credentials Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#071A2F]/90 border border-[#C6922D]/40 text-xs text-slate-200 mb-6 shadow-lg backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-[#237A3B] animate-ping" />
              <span className="font-semibold text-[#C6922D]">Official Enterprise Platform</span>
              <span className="text-slate-500">|</span>
              <span className="font-mono text-[11px] text-slate-300">DTI BN: 4812272 • BIR TIN: 306-113-062-00000</span>
            </div>

            {/* Official Positioning Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black font-['Montserrat'] tracking-tight text-white leading-[1.12] mb-6">
              Building Today.{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-[#C6922D] to-amber-500">
                Engineering Tomorrow.
              </span>{' '}
              Powering the Future.
            </h1>

            {/* Sub-headline directly grounded in verified corporate mission */}
            <p className="text-base sm:text-lg text-slate-200 leading-relaxed max-w-2xl mb-8">
              LDL Dhenze Residential Building Construction is an integrated construction, civil engineering, infrastructure, green-energy, and technology solutions enterprise organized under Philippine law. We engineer sustainable, intelligent, and future-ready environments with institutional discipline.
            </p>

            {/* Hero CTAs */}
            <div className="flex flex-wrap items-center gap-4 mb-10">
              <button
                id="hero-start-project-btn"
                onClick={() => onNavigate('start-project')}
                className="px-6 py-3.5 rounded-md font-bold text-sm bg-[#C6922D] hover:bg-[#d8a339] text-[#071A2F] uppercase tracking-wider transition-all shadow-xl hover:shadow-[#C6922D]/25 transform hover:-translate-y-0.5 inline-flex items-center gap-2"
              >
                <span>Start a Project</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                id="hero-capabilities-btn"
                onClick={() => onNavigate('capabilities')}
                className="px-5 py-3.5 rounded-md font-semibold text-sm bg-white/10 hover:bg-white/15 text-white border border-white/20 transition-all inline-flex items-center gap-2 backdrop-blur-sm"
              >
                <span>Explore Capabilities</span>
                <ChevronRight className="w-4 h-4 text-[#C6922D]" />
              </button>

              <button
                onClick={onOpenAssistant}
                className="text-xs text-slate-300 hover:text-[#C6922D] font-medium underline underline-offset-4 decoration-[#C6922D]/50 transition-colors inline-flex items-center gap-1.5 ml-1"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#C6922D]" />
                <span>Consult Builder Assistant</span>
              </button>
            </div>

            {/* Key Assurance Indicators */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-white/15">
              <div className="space-y-1">
                <div className="text-[11px] text-slate-400 uppercase tracking-wider font-semibold">Registered PSIC</div>
                <div className="text-base font-bold text-white font-['Montserrat']">42900</div>
                <div className="text-[11px] text-slate-400">Civil Engineering Projects</div>
              </div>
              <div className="space-y-1">
                <div className="text-[11px] text-slate-400 uppercase tracking-wider font-semibold">PRC Compliance</div>
                <div className="text-base font-bold text-[#C6922D] font-['Montserrat']">RA 9266</div>
                <div className="text-[11px] text-slate-400">Licensed Professional Practice</div>
              </div>
              <div className="space-y-1">
                <div className="text-[11px] text-slate-400 uppercase tracking-wider font-semibold">Green Energy</div>
                <div className="text-base font-bold text-[#237A3B] font-['Montserrat']">RA 9513</div>
                <div className="text-[11px] text-slate-400">Solar PV & BESS Storage</div>
              </div>
              <div className="space-y-1">
                <div className="text-[11px] text-slate-400 uppercase tracking-wider font-semibold">Delivery Model</div>
                <div className="text-base font-bold text-white font-['Montserrat']">10 Stages</div>
                <div className="text-[11px] text-slate-400">Integrated Project Lifecycle</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------- */}
      {/* 2. TRUST AND REGISTRATION STRIP */}
      {/* ---------------------------------------------------- */}
      <section className="py-8 bg-[#09223d] border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-[#C6922D]/10 border border-[#C6922D]/30 flex items-center justify-center shrink-0 mt-0.5">
                <ShieldCheck className="w-5 h-5 text-[#C6922D]" />
              </div>
              <div>
                <h2 className="text-sm font-bold uppercase tracking-wider text-slate-200">
                  Institutional Transparency & Philippine Regulatory Standards
                </h2>
                <p className="text-xs text-slate-300 mt-1 max-w-4xl leading-relaxed">
                  LDL Dhenze Residential Building Construction is an officially registered Single Proprietorship (DTI BN 4812272, BIR TIN 306-113-062-00000, PSIC 42900: Construction of Other Civil Engineering Projects). All regulated architectural, structural, civil, mechanical, and electrical engineering plans are rendered exclusively through duly qualified and PRC-licensed professionals under RA 9266.
                </p>
              </div>
            </div>
            <button
              onClick={() => onNavigate('about')}
              className="shrink-0 px-4 py-2 rounded text-xs font-bold bg-white/5 hover:bg-white/10 text-slate-200 border border-white/10 transition-colors inline-flex items-center gap-1.5 self-start lg:self-center"
            >
              <span>View Legal Credentials</span>
              <ExternalLink className="w-3.5 h-3.5 text-[#C6922D]" />
            </button>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------- */}
      {/* 3. CORE CAPABILITIES (14 CAPABILITIES OVERVIEW) */}
      {/* ---------------------------------------------------- */}
      <section className="py-20 bg-[#071A2F] border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#C6922D] mb-2 font-['Montserrat']">
                <span className="w-2 h-2 rounded-full bg-[#C6922D]" />
                Integrated Platform Scope
              </div>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
                14 Core Engineering Capabilities
              </h2>
              <p className="text-sm text-slate-300 mt-2 max-w-2xl">
                Comprehensive multi-disciplinary capability spanning civil construction, direct supply networks, heavy machinery fleet mobilization, architecture coordination, solar PV microgrids, and smart telemetry.
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
                        <span className="truncate">{item}</span>
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
      {/* 4. FEATURED INDUSTRIES */}
      {/* ---------------------------------------------------- */}
      <section className="py-20 bg-[#09223d] border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#C6922D] mb-2 font-['Montserrat']">
                <span className="w-2 h-2 rounded-full bg-[#C6922D]" />
                Market Sectors & Practice Areas
              </div>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
                Featured Industry Sectors
              </h2>
              <p className="text-sm text-slate-300 mt-2 max-w-2xl">
                Delivering tailored civil, architectural, and renewable engineering solutions across diverse economic growth sectors in Central Luzon and nationwide.
              </p>
            </div>
            <button
              onClick={() => onNavigate('industries')}
              className="mt-4 md:mt-0 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#C6922D] hover:text-amber-300 transition-colors"
            >
              <span>View All 15 Industries</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredIndustries.map((ind) => (
              <div
                key={ind.id}
                onClick={() => onNavigate(`industry-${ind.id}`)}
                className="group bg-[#071A2F] border border-white/10 rounded-2xl overflow-hidden hover:border-[#C6922D]/40 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 cursor-pointer flex flex-col justify-between"
              >
                <div>
                  <div className="aspect-[16/9] relative overflow-hidden bg-slate-800">
                    <img
                      src={
                        ind.id === 'residential-development'
                          ? '/dhenzebuilders/assets/images/residential-team.jpg'
                          : ind.id === 'agriculture-agro-industrial-development'
                          ? '/dhenzebuilders/assets/images/agro-solar-logistics.jpg'
                          : ind.id === 'renewable-energy-utilities'
                          ? '/dhenzebuilders/assets/images/solar-storage.jpg'
                          : ind.id === 'commercial-development'
                          ? '/dhenzebuilders/assets/images/commercial-build.jpg'
                          : ind.id === 'transportation-civil-works'
                          ? '/dhenzebuilders/assets/images/civil-roads.jpg'
                          : '/dhenzebuilders/assets/images/healthcare-facility.jpg'
                      }
                      alt={`${ind.title} by LDL Dhenze`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#071A2F] via-[#071A2F]/30 to-transparent" />
                  </div>

                  <div className="p-6">
                    <h3 className="text-lg font-bold text-white group-hover:text-[#C6922D] transition-colors mb-2">
                      {ind.title}
                    </h3>
                    <p className="text-xs text-slate-300 leading-relaxed mb-4 line-clamp-2">
                      {ind.summary}
                    </p>

                    <div className="space-y-1.5 pt-2 border-t border-white/10">
                      {ind.targetProjects.slice(0, 2).map((srv, sIdx) => (
                        <div key={sIdx} className="flex items-center gap-2 text-[11px] text-slate-400">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#C6922D] shrink-0" />
                          <span className="truncate">{srv}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="px-6 py-4 bg-white/5 border-t border-white/5 flex items-center justify-between text-xs text-[#C6922D] font-semibold">
                  <span>Sector Capabilities</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------- */}
      {/* 5. VERIFIED PROJECT PORTFOLIO & PIPELINE */}
      {/* ---------------------------------------------------- */}
      <section className="py-20 bg-[#071A2F] border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#C6922D] mb-2 font-['Montserrat']">
                <span>Verified Project Pipeline</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
                Current Projects & Studies
              </h2>
              <p className="text-sm text-slate-300 mt-2 max-w-2xl">
                Strict corporate stage integrity: Every project is labeled by its real status (Completed, Under Construction, In Development, Proposed, or Conceptual Study). Renders and masterplans are never depicted as completed structures.
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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {PORTFOLIO_PROJECTS.map((prj) => (
              <div
                key={prj.id}
                className="bg-[#0b2545] border border-white/10 rounded-2xl overflow-hidden shadow-xl hover:border-[#C6922D]/40 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="aspect-[16/10] relative overflow-hidden bg-slate-800">
                    <img
                      src={prj.heroImage}
                      alt={prj.name}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0b2545] via-[#0b2545]/20 to-transparent" />
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
                  </div>

                  <div className="p-6">
                    <div className="text-[11px] font-mono text-[#C6922D] mb-1">{prj.code}</div>
                    <h3 className="text-lg font-bold text-white mb-1.5">{prj.name}</h3>
                    <p className="text-xs text-slate-400 font-semibold mb-3">{prj.sector} • {prj.location}</p>
                    <p className="text-xs text-slate-300 leading-relaxed mb-4">{prj.scope}</p>

                    {prj.isConceptual && (
                      <div className="p-2.5 rounded bg-amber-500/10 border border-amber-500/20 text-[11px] text-amber-300 leading-snug mb-3">
                        <strong>Disclaimer:</strong> Conceptual visualization. Not a photograph of a completed development.
                      </div>
                    )}
                  </div>
                </div>

                <div className="px-6 py-3 bg-black/20 border-t border-white/5 flex items-center justify-between text-xs">
                  <span className="text-slate-400 font-mono text-[11px]">{prj.clientDisclosureStatus}</span>
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
      {/* 6. INTEGRATED DELIVERY PROCESS (10-STAGE LIFECYCLE) */}
      {/* ---------------------------------------------------- */}
      <section className="py-20 bg-[#061626] border-b border-white/10 blueprint-grid-dense">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#C6922D] mb-2 font-['Montserrat']">
              <span>Integrated Project Delivery (IPD)</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              The 10-Stage Integrated Project Lifecycle
            </h2>
            <p className="text-sm text-slate-300 mt-2">
              From land assessment and feasibility studies through BIM coordination, civil execution, smart energy commissioning, and operations handover.
            </p>
          </div>

          {/* Interactive Horizontal 10-Stages Stepper */}
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

              <p className="text-sm text-slate-200 leading-relaxed my-5">
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
      {/* 7. WHY LDL DHENZE (INSTITUTIONAL VALUE PILLARS) */}
      {/* ---------------------------------------------------- */}
      <section className="py-20 bg-[#071A2F] border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#C6922D] mb-2 font-['Montserrat']">
              <span>Why Choose Us</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              Institutional Discipline. Engineering Rigor.
            </h2>
            <p className="text-sm text-slate-300 mt-2">
              Combining international banking-grade financial risk controls with field-proven Philippine construction logistics and licensed professional coordination.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-[#09223d] border border-white/10 p-6 rounded-2xl">
              <div className="w-12 h-12 rounded-xl bg-[#C6922D]/10 border border-[#C6922D]/30 flex items-center justify-center text-[#C6922D] mb-5">
                <Scale className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-white mb-2">Banking-Grade Governance</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Founded by leadership with two decades of JPMorgan Chase operations, mortgage risk controls, and regulatory audit background. Zero hidden markups.
              </p>
            </div>

            <div className="bg-[#09223d] border border-white/10 p-6 rounded-2xl">
              <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400 mb-5">
                <HardHat className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-white mb-2">Direct Supply & Fleet</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Direct partnerships with aggregate quarries, batching plants, and heavy machinery owners eliminate middleman delays and provide schedule certainty.
              </p>
            </div>

            <div className="bg-[#09223d] border border-white/10 p-6 rounded-2xl">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-5">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-white mb-2">Absolute PRC Compliance</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Full adherence to RA 9266 Architecture Act, PD 1096 National Building Code, and DPWH standards. Every plan signed and sealed by licensed professionals.
              </p>
            </div>

            <div className="bg-[#09223d] border border-white/10 p-6 rounded-2xl">
              <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400 mb-5">
                <Cpu className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-white mb-2">BIM & Digital Tracking</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Modern 3D/4D digital coordination, clash detection, and secure client project rooms with transparent submittal tracking and verifiable audit logs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------- */}
      {/* 8. SUSTAINABILITY AND APPLIED TECHNOLOGY */}
      {/* ---------------------------------------------------- */}
      <section className="py-20 bg-[#09223d] border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#C6922D] mb-2 font-['Montserrat']">
                <Leaf className="w-4 h-4" />
                <span>Clean Energy & Digital Twins</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
                Future-Proof Engineering for a Sustainable Philippines
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6">
                Under Republic Act 9513 (Renewable Energy Act of 2008), LDL Dhenze embeds solar rooftop arrays, containerized battery energy storage (BESS), and rainwater harvesting into structural developments. We pair physical resilience with IoT environmental sensors and BIM coordination.
              </p>

              <div className="space-y-4">
                <div className="flex items-start gap-3 p-3.5 rounded-xl bg-[#071A2F]/60 border border-white/5">
                  <Sun className="w-5 h-5 text-[#C6922D] shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-bold text-white">Solar Rooftop & Microgrid Integration</h4>
                    <p className="text-[11px] text-slate-400 mt-0.5">Custom PV yields and net-metering applications for residential subdivisions and industrial plants.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3.5 rounded-xl bg-[#071A2F]/60 border border-white/5">
                  <Zap className="w-5 h-5 text-[#237A3B] shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-bold text-white">Battery Energy Storage Systems (BESS)</h4>
                    <p className="text-[11px] text-slate-400 mt-0.5">Peak-shaving and critical emergency backup power ensuring zero downtime for agro-cold storage.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3.5 rounded-xl bg-[#071A2F]/60 border border-white/5">
                  <Cpu className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-bold text-white">Smart Building Telemetry & IoT Controls</h4>
                    <p className="text-[11px] text-slate-400 mt-0.5">Real-time acoustic water leak detection, solar inverter monitoring, and automated load control.</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 flex gap-4">
                <button
                  onClick={() => onNavigate('sustainability')}
                  className="px-5 py-2.5 rounded text-xs font-bold bg-[#237A3B] text-white uppercase tracking-wider hover:bg-[#1e6933] transition-colors inline-flex items-center gap-2"
                >
                  <span>Sustainability Framework</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => onNavigate('technology')}
                  className="px-5 py-2.5 rounded text-xs font-bold bg-white/10 text-white uppercase tracking-wider hover:bg-white/15 transition-colors inline-flex items-center gap-2"
                >
                  <span>Applied Technology</span>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="aspect-[4/5] rounded-2xl overflow-hidden border border-white/10 shadow-xl">
                <img
                  src="/dhenzebuilders/assets/images/solar-storage.jpg"
                  alt="Solar storage installation in Central Luzon"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <div className="aspect-[4/5] rounded-2xl overflow-hidden border border-white/10 shadow-xl mt-6">
                <img
                  src="/dhenzebuilders/assets/images/smart-building.jpg"
                  alt="Smart building telemetry and IoT systems"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------- */}
      {/* 9. LEADERSHIP PROFILE: FOUNDER & CEO */}
      {/* ---------------------------------------------------- */}
      <section className="py-20 bg-[#071A2F] border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5">
              <div className="relative">
                <div className="w-full rounded-2xl bg-gradient-to-tr from-[#071A2F] via-[#0d3159] to-[#071A2F] border-2 border-[#C6922D]/40 p-8 flex flex-col justify-between shadow-2xl relative overflow-hidden">
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

                  <div className="relative z-10 space-y-3 pt-6 mt-6 border-t border-white/10 text-xs text-slate-300">
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

              <div className="grid grid-cols-2 gap-4 pt-2">
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
      {/* 10. CLIENT & PARTNER PATHWAYS */}
      {/* ---------------------------------------------------- */}
      <section className="py-20 bg-[#09223d] border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#C6922D] mb-2 font-['Montserrat']">
              <span>Engagement Routes</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              Collaborate With LDL Dhenze
            </h2>
            <p className="text-sm text-slate-300 mt-2">
              Clear pathways for developers, institutional agencies, certified suppliers, and technical professionals.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div
              onClick={() => onNavigate('start-project')}
              className="bg-[#071A2F] border border-white/10 hover:border-[#C6922D]/50 p-6 rounded-2xl cursor-pointer transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between"
            >
              <div>
                <div className="w-10 h-10 rounded-lg bg-[#C6922D]/10 text-[#C6922D] flex items-center justify-center mb-4">
                  <Building2 className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-white mb-2">Developers & Landowners</h3>
                <p className="text-xs text-slate-300 leading-relaxed mb-4">
                  Feasibility analysis, turn-key civil works, subdivision horizontal development, and solar microgrids.
                </p>
              </div>
              <span className="text-xs text-[#C6922D] font-bold inline-flex items-center gap-1">
                Start Project Wizard <ChevronRight className="w-3.5 h-3.5" />
              </span>
            </div>

            <div
              onClick={() => onNavigate('contact')}
              className="bg-[#071A2F] border border-white/10 hover:border-[#C6922D]/50 p-6 rounded-2xl cursor-pointer transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between"
            >
              <div>
                <div className="w-10 h-10 rounded-lg bg-blue-500/10 text-blue-400 flex items-center justify-center mb-4">
                  <Briefcase className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-white mb-2">Institutional & Public</h3>
                <p className="text-xs text-slate-300 leading-relaxed mb-4">
                  Municipal road infrastructure, drainage mitigation canals, civic centers, and public facilities under PSIC 42900.
                </p>
              </div>
              <span className="text-xs text-[#C6922D] font-bold inline-flex items-center gap-1">
                Institutional Inquiries <ChevronRight className="w-3.5 h-3.5" />
              </span>
            </div>

            <div
              onClick={() => onNavigate('partners')}
              className="bg-[#071A2F] border border-white/10 hover:border-[#C6922D]/50 p-6 rounded-2xl cursor-pointer transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between"
            >
              <div>
                <div className="w-10 h-10 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center mb-4">
                  <Users className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-white mb-2">Suppliers & Subcontractors</h3>
                <p className="text-xs text-slate-300 leading-relaxed mb-4">
                  PNS-compliant concrete aggregates, steel rebar suppliers, heavy equipment rental fleets, and MEP contractors.
                </p>
              </div>
              <span className="text-xs text-[#C6922D] font-bold inline-flex items-center gap-1">
                Partner Onboarding <ChevronRight className="w-3.5 h-3.5" />
              </span>
            </div>

            <div
              onClick={() => onNavigate('contact')}
              className="bg-[#071A2F] border border-white/10 hover:border-[#C6922D]/50 p-6 rounded-2xl cursor-pointer transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between"
            >
              <div>
                <div className="w-10 h-10 rounded-lg bg-purple-500/10 text-purple-400 flex items-center justify-center mb-4">
                  <Award className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-white mb-2">Licensed Professionals</h3>
                <p className="text-xs text-slate-300 leading-relaxed mb-4">
                  PRC-registered Architects, Civil/Structural Engineers, Professional Electrical Engineers (PEE), and Sanitary Engineers.
                </p>
              </div>
              <span className="text-xs text-[#C6922D] font-bold inline-flex items-center gap-1">
                Join Network <ChevronRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------- */}
      {/* 11. STRONG INQUIRY CTA BANNER */}
      {/* ---------------------------------------------------- */}
      <section className="py-20 bg-gradient-to-b from-[#071A2F] to-[#040f1c]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-[#0b284c] border border-[#C6922D]/30 rounded-3xl p-8 sm:p-14 shadow-2xl relative overflow-hidden">
            <div className="blueprint-grid absolute inset-0 opacity-20 pointer-events-none" />
            <div className="relative z-10 max-w-2xl mx-auto">
              <span className="text-xs font-mono font-bold text-[#C6922D] uppercase tracking-widest">
                Start Your Development
              </span>
              <h2 className="text-2xl sm:text-4xl font-black text-white mt-2 mb-4 tracking-tight">
                Ready to Structure Your Next Infrastructure or Building Project?
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-8">
                Utilize our Project Opportunity Wizard to define your location, land control status, engineering parameters, and stage requirements for immediate project review.
              </p>

              <div className="flex flex-wrap items-center justify-center gap-4">
                <button
                  id="cta-start-wizard-btn"
                  onClick={() => onNavigate('start-project')}
                  className="px-7 py-3.5 bg-[#C6922D] hover:bg-[#d8a339] text-[#071A2F] font-bold text-xs uppercase tracking-wider rounded-lg shadow-xl transition-transform transform active:scale-95 inline-flex items-center gap-2"
                >
                  <span>Open Project Wizard</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  id="cta-book-consult-btn"
                  onClick={() => onNavigate('book-consultation')}
                  className="px-7 py-3.5 bg-white/10 hover:bg-white/15 text-white font-semibold text-xs uppercase tracking-wider rounded-lg border border-white/20 transition-colors"
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
