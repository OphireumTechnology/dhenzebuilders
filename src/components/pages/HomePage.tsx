import React from 'react';
import {
  STRATEGIC_SECTORS_LIST,
  PORTFOLIO_PROJECTS,
  FOUNDER_INFO,
} from '../../data/companyData';
import { CORPORATE_INFO } from '../../data/corporateInfo';
import { CeoCornerSection } from '../company/CeoCornerSection';
import {
  ArrowRight,
  ShieldCheck,
  Building2,
  Lock,
  ChevronRight,
  Compass,
  FileCheck,
  Scale,
  Sparkles,
  ArrowUpRight,
  CheckCircle2,
} from 'lucide-react';

interface HomePageProps {
  onNavigate: (view: string) => void;
  onOpenAssistant: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate, onOpenAssistant }) => {
  // Highlighted projects with clear status classification
  const featuredProjects = PORTFOLIO_PROJECTS.slice(0, 4);

  return (
    <div className="min-h-screen bg-[#071A2F] text-slate-100 selection:bg-[#C6922D] selection:text-[#071A2F]">
      {/* ---------------------------------------------------- */}
      {/* 1. EDITORIAL HERO SECTION */}
      {/* ---------------------------------------------------- */}
      <section className="relative pt-24 pb-28 lg:pt-36 lg:pb-40 overflow-hidden border-b border-[#C6922D]/20">
        {/* Background Image with warm architectural overlay */}
        <div className="absolute inset-0 z-0">
          <picture>
            <source srcSet="/assets/images/hero-central-luzon.jpg" type="image/jpeg" />
            <img
              src="/assets/images/hero-central-luzon.jpg"
              alt="Central Luzon development and civil engineering site by LDL Dhenze"
              className="w-full h-full object-cover object-center transform scale-105 transition-transform duration-1000 ease-out"
              loading="eager"
            />
          </picture>
          <div className="absolute inset-0 bg-gradient-to-r from-[#071A2F] via-[#071A2F]/92 to-[#071A2F]/75" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#071A2F] via-transparent to-[#071A2F]/60" />
          <div className="absolute inset-0 blueprint-grid opacity-20 pointer-events-none" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            {/* Restrained Eyebrow Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-[#C6922D]/35 text-xs text-slate-200 mb-6 backdrop-blur-md">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C6922D]" />
              <span className="tracking-widest uppercase font-semibold text-[11px] text-[#e5b95d]">
                PRIVATE DEVELOPMENT • ENGINEERING • INFRASTRUCTURE
              </span>
            </div>

            {/* Headline */}
            <h1 className="font-serif-display text-4xl sm:text-6xl lg:text-7xl font-normal tracking-tight text-white leading-[1.08] mb-6">
              Building Enduring Assets for Generations.
            </h1>

            {/* Supporting Statement */}
            <p className="font-sans-body text-base sm:text-lg text-slate-200 leading-relaxed max-w-2xl mb-10 font-normal">
              LDL Dhenze brings disciplined development planning, coordinated engineering, construction execution, and resilient infrastructure together for private, institutional, and strategic projects across the Philippines.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4">
              <button
                id="hero-discuss-project-btn"
                onClick={() => onNavigate('start-project')}
                className="px-7 py-3.5 rounded-md font-semibold text-xs tracking-wider uppercase bg-[#C6922D] hover:bg-[#d8a339] text-[#071A2F] transition-all shadow-xl hover:shadow-[#C6922D]/20 inline-flex items-center gap-2"
              >
                <span>Discuss a Project</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                id="hero-explore-expertise-btn"
                onClick={() => onNavigate('capabilities')}
                className="px-6 py-3.5 rounded-md font-medium text-xs tracking-wider uppercase text-slate-200 hover:text-white bg-white/5 hover:bg-white/10 border border-white/20 transition-all inline-flex items-center gap-2 backdrop-blur-sm"
              >
                <span>Explore Our Expertise</span>
                <ChevronRight className="w-4 h-4 text-[#C6922D]" />
              </button>
            </div>

            {/* Subtle Assurance Indicators */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 pt-10 mt-10 border-t border-white/10 text-xs">
              <div>
                <div className="text-slate-400 text-[11px] uppercase tracking-wider">Corporate Status</div>
                <div className="font-semibold text-slate-200 mt-0.5">DTI Registered #4812272</div>
              </div>
              <div>
                <div className="text-slate-400 text-[11px] uppercase tracking-wider">Professional Standard</div>
                <div className="font-semibold text-slate-200 mt-0.5">RA 9266 & PRC Coordination</div>
              </div>
              <div>
                <div className="text-slate-400 text-[11px] uppercase tracking-wider">Executive Office</div>
                <div className="font-semibold text-slate-200 mt-0.5">Clark Freeport Zone, Pampanga</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------- */}
      {/* 2. INSTITUTIONAL STEWARDSHIP (ASYMMETRIC TWO-COLUMN LAYOUT) */}
      {/* ---------------------------------------------------- */}
      <section className="py-20 lg:py-28 bg-[#061325] border-b border-[#C6922D]/20 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Column A: Left 7 Columns - Narrative & Strategic Context */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C6922D]/10 border border-[#C6922D]/30 text-[#C6922D] text-xs font-mono font-bold uppercase tracking-widest">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>{CORPORATE_INFO.stewardship.eyebrow}</span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white font-['Montserrat'] tracking-tight leading-tight">
                {CORPORATE_INFO.stewardship.heading}
              </h2>

              <div className="space-y-4 text-base sm:text-lg text-slate-300 leading-relaxed font-sans font-normal">
                <p>{CORPORATE_INFO.stewardship.body1}</p>
                <p>{CORPORATE_INFO.stewardship.body2}</p>
              </div>

              <p className="text-xs sm:text-sm text-slate-400 italic pt-2 border-t border-white/10 font-serif">
                {CORPORATE_INFO.stewardship.supportingStatement}
              </p>

              <div className="pt-2">
                <button
                  onClick={() => onNavigate(CORPORATE_INFO.stewardship.actionRoute)}
                  className="px-6 py-3 rounded-lg bg-[#C6922D] hover:bg-[#d8a339] text-[#071A2F] font-bold text-xs uppercase tracking-wider transition-colors inline-flex items-center gap-2 shadow-lg"
                >
                  <span>{CORPORATE_INFO.stewardship.actionLabel}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Column B: Right 5 Columns - Stewardship Three-Pillar Framework */}
            <div className="lg:col-span-5 space-y-4">
              <div className="text-xs font-mono uppercase tracking-widest text-[#C6922D] font-bold pb-1">
                Core Governance Framework
              </div>

              {CORPORATE_INFO.stewardship.framework.map((item) => (
                <div
                  key={item.number}
                  className="bg-[#071A2F] border border-white/10 rounded-xl p-5 hover:border-[#C6922D]/40 transition-colors space-y-2 group"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-sm font-bold text-[#C6922D] group-hover:text-[#e5b95d]">
                      {item.number}
                    </span>
                    <span className="text-[10px] uppercase tracking-wider font-mono text-slate-500">
                      Discipline
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-white font-['Montserrat']">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed font-sans">
                    {item.description}
                  </p>
                </div>
              ))}

              <div className="bg-[#071A2F]/60 border border-white/5 rounded-xl p-4 text-[11px] text-slate-400 flex items-center gap-2.5">
                <Scale className="w-4 h-4 text-[#C6922D] shrink-0" />
                <span>Strict statutory compliance under RA 9266 and Philippine building laws.</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------- */}
      {/* 3. THREE PRINCIPAL EXPERTISE PILLARS */}
      {/* ---------------------------------------------------- */}
      <section className="py-24 lg:py-32 bg-[#071A2F] border-b border-[#C6922D]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 pb-6 border-b border-white/10">
            <div>
              <span className="text-xs font-mono text-[#C6922D] uppercase tracking-widest">
                Strategic Disciplines
              </span>
              <h2 className="font-serif-display text-3xl sm:text-4xl lg:text-5xl text-white font-normal mt-2">
                Integrated expertise for complex developments.
              </h2>
            </div>
            <p className="text-sm text-slate-300 max-w-md font-sans-body leading-relaxed">
              From early feasibility and technical coordination to construction delivery, renewable-energy integration, and project handover, LDL Dhenze provides a structured point of coordination throughout the development lifecycle.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Pillar 1 */}
            <div className="bg-[#081F38] border border-white/10 rounded-xl p-8 flex flex-col justify-between hover:border-[#C6922D]/40 transition-all group">
              <div>
                <div className="text-xs font-mono text-[#C6922D] uppercase tracking-wider mb-3">Pillar I</div>
                <h3 className="font-serif-display text-2xl text-white font-normal mb-3 group-hover:text-[#e5b95d] transition-colors">
                  Development Advisory & Feasibility
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed mb-6 font-sans-body">
                  Aligning site potential, zoning, title clearances, environmental guidelines, and capital expenditure sequencing to de-risk investment before ground is broken.
                </p>
                <ul className="space-y-2 text-xs text-slate-400">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#C6922D]" />
                    <span>Highest-and-best-use (HBU) valuation studies</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#C6922D]" />
                    <span>Statutory permitting roadmap & agency review</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#C6922D]" />
                    <span>Capital expenditure & cash-flow modeling</span>
                  </li>
                </ul>
              </div>
              <div className="pt-8 mt-6 border-t border-white/5">
                <button
                  onClick={() => onNavigate('capabilities')}
                  className="text-xs font-semibold text-[#C6922D] hover:text-[#e5b95d] inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform"
                >
                  <span>Learn about advisory</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Pillar 2 */}
            <div className="bg-[#081F38] border border-white/10 rounded-xl p-8 flex flex-col justify-between hover:border-[#C6922D]/40 transition-all group">
              <div>
                <div className="text-xs font-mono text-[#C6922D] uppercase tracking-wider mb-3">Pillar II</div>
                <h3 className="font-serif-display text-2xl text-white font-normal mb-3 group-hover:text-[#e5b95d] transition-colors">
                  Architecture & Civil Delivery
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed mb-6 font-sans-body">
                  Coordinating licensed Philippine professionals and accredited builders for structural engineering, MEPFS integration, and rigorous on-site execution.
                </p>
                <ul className="space-y-2 text-xs text-slate-400">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#C6922D]" />
                    <span>PRC-licensed architectural & structural sign-offs</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#C6922D]" />
                    <span>BIM multi-discipline clash resolution</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#C6922D]" />
                    <span>Accredited civil works & heavy earthworks</span>
                  </li>
                </ul>
              </div>
              <div className="pt-8 mt-6 border-t border-white/5">
                <button
                  onClick={() => onNavigate('capabilities')}
                  className="text-xs font-semibold text-[#C6922D] hover:text-[#e5b95d] inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform"
                >
                  <span>Explore engineering</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Pillar 3 */}
            <div className="bg-[#081F38] border border-white/10 rounded-xl p-8 flex flex-col justify-between hover:border-[#C6922D]/40 transition-all group">
              <div>
                <div className="text-xs font-mono text-[#C6922D] uppercase tracking-wider mb-3">Pillar III</div>
                <h3 className="font-serif-display text-2xl text-white font-normal mb-3 group-hover:text-[#e5b95d] transition-colors">
                  Renewable & Resilient Utilities
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed mb-6 font-sans-body">
                  Deploying rooftop solar PV, battery energy storage systems (BESS), and resilient stormwater systems engineered for operational autonomy.
                </p>
                <ul className="space-y-2 text-xs text-slate-400">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#C6922D]" />
                    <span>Commercial & industrial rooftop solar PV</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#C6922D]" />
                    <span>BESS battery peak-shaving & microgrids</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#C6922D]" />
                    <span>Flood control & stormwater retention networks</span>
                  </li>
                </ul>
              </div>
              <div className="pt-8 mt-6 border-t border-white/5">
                <button
                  onClick={() => onNavigate('capabilities')}
                  className="text-xs font-semibold text-[#C6922D] hover:text-[#e5b95d] inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform"
                >
                  <span>Review infrastructure</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------- */}
      {/* 4. SELECTED WORK OR VERIFIED PROJECT STUDIES */}
      {/* ---------------------------------------------------- */}
      <section className="py-24 lg:py-32 bg-[#061325] border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 pb-6 border-b border-white/10">
            <div>
              <span className="text-xs font-mono text-[#C6922D] uppercase tracking-widest">
                Portfolio Showcase
              </span>
              <h2 className="font-serif-display text-3xl sm:text-4xl lg:text-5xl text-white font-normal mt-2">
                Selected Work & Project Studies
              </h2>
            </div>
            <button
              onClick={() => onNavigate('projects')}
              className="text-xs font-semibold uppercase tracking-wider text-[#C6922D] hover:text-[#e5b95d] inline-flex items-center gap-1"
            >
              <span>View complete portfolio</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {featuredProjects.map((p) => {
              const isConceptual = p.isConceptual || p.stage?.toLowerCase().includes('concept') || p.stage?.toLowerCase().includes('planning');
              return (
                <div
                  key={p.id}
                  className="bg-[#081F38] border border-white/10 rounded-xl overflow-hidden group hover:border-[#C6922D]/40 transition-all flex flex-col"
                >
                  <div className="relative h-64 overflow-hidden bg-slate-900">
                    <img
                      src={p.heroImage}
                      alt={p.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      referrerPolicy="no-referrer"
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).src = '/assets/images/solar-storage.jpg';
                      }}
                    />
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 text-[11px] font-semibold uppercase tracking-wider bg-[#071A2F]/90 text-[#e5b95d] border border-[#C6922D]/40 rounded backdrop-blur-md">
                        {p.stage}
                      </span>
                    </div>
                  </div>

                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="text-[11px] font-mono text-slate-400 mb-1">
                        {p.location} • {p.sector}
                      </div>
                      <h3 className="font-serif-display text-xl text-white font-normal mb-2 group-hover:text-[#e5b95d] transition-colors">
                        {p.name}
                      </h3>
                      <p className="text-xs text-slate-300 leading-relaxed font-sans-body mb-4">
                        {p.scope}
                      </p>
                    </div>

                    {isConceptual && (
                      <div className="pt-3 border-t border-white/5 text-[10px] text-slate-400 italic">
                        * Conceptual visualization. Not a photograph of a completed development.
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------- */}
      {/* 5. STRATEGIC DEVELOPMENT SECTORS */}
      {/* ---------------------------------------------------- */}
      <section className="py-24 lg:py-32 bg-[#071A2F] border-b border-[#C6922D]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-16 pb-6 border-b border-white/10">
            <span className="text-xs font-mono text-[#C6922D] uppercase tracking-widest">
              Strategic Sectors
            </span>
            <h2 className="font-serif-display text-3xl sm:text-4xl lg:text-5xl text-white font-normal mt-2">
              Development sectors served across the Philippines.
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {STRATEGIC_SECTORS_LIST.map((sector) => (
              <div
                key={sector.id}
                onClick={() => onNavigate('industries')}
                className="bg-[#081F38] border border-white/10 rounded-xl p-6 hover:border-[#C6922D]/50 cursor-pointer transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="text-[10px] uppercase font-mono text-[#C6922D] tracking-wider mb-2">
                    Sector
                  </div>
                  <h4 className="font-serif-display text-lg text-white font-normal mb-2 group-hover:text-[#e5b95d] transition-colors">
                    {sector.title}
                  </h4>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {sector.subtitle}
                  </p>
                </div>
                <div className="pt-4 mt-4 border-t border-white/5 flex items-center justify-between text-xs text-slate-400 group-hover:text-[#C6922D]">
                  <span>Explore sector</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------- */}
      {/* 6. GOVERNANCE & DELIVERY METHODOLOGY */}
      {/* ---------------------------------------------------- */}
      <section className="py-24 lg:py-32 bg-[#061325] border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-6">
              <span className="text-xs font-mono text-[#C6922D] uppercase tracking-widest">
                Methodology & Governance
              </span>
              <h2 className="font-serif-display text-3xl sm:text-4xl lg:text-5xl text-white font-normal leading-tight">
                Discipline rooted in institutional finance and engineering integrity.
              </h2>
              <p className="text-sm text-slate-300 leading-relaxed font-sans-body">
                Large-scale developments fail most often not on the jobsite, but in the spreadsheet, contract, and uncoordinated drawing set. LDL Dhenze was created to bring institutional banking controls, transparent milestone accounting, and statutory diligence to Philippine property development.
              </p>

              <div className="space-y-4 pt-2">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded bg-white/5 border border-white/10 text-[#C6922D]">
                    <Scale className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                      Statutory & Professional Clearances
                    </h4>
                    <p className="text-xs text-slate-400 leading-relaxed mt-1">
                      Strict compliance with RA 9266 (The Architecture Act) and PRC regulations. All engineering designs and sign-offs are delivered exclusively by certified, qualified Filipino professionals.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 rounded bg-white/5 border border-white/10 text-[#C6922D]">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                      Transparent Milestone Accounting
                    </h4>
                    <p className="text-xs text-slate-400 leading-relaxed mt-1">
                      Independent quantity surveying, verified milestone inspection audits, and clear escrow accounting eliminate budget surprises and contractor cost overruns.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 rounded bg-white/5 border border-white/10 text-[#C6922D]">
                    <Building2 className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                      Accredited Contractor Ecosystem
                    </h4>
                    <p className="text-xs text-slate-400 leading-relaxed mt-1">
                      Construction execution requiring PCAB accreditation is undertaken in direct alliance with licensed builders and qualified specialist trades.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6 bg-[#081F38] border border-white/10 rounded-2xl p-8 lg:p-10 relative">
              <div className="text-xs font-mono text-[#C6922D] uppercase tracking-wider mb-2">
                Executive Leadership
              </div>
              <h3 className="font-serif-display text-2xl text-white font-normal mb-1">
                {FOUNDER_INFO.name}
              </h3>
              <div className="text-xs text-slate-400 mb-6 font-medium">
                {FOUNDER_INFO.title}
              </div>

              <blockquote className="text-xs sm:text-sm text-slate-200 italic leading-relaxed mb-6 pl-4 border-l-2 border-[#C6922D]">
                “Our vision is to build an integrated enterprise where architectural vision, banking-grade capital discipline, and sustainable civil engineering unite to create generational value for our clients and the nation.”
              </blockquote>

              <p className="text-xs text-slate-300 leading-relaxed mb-6 font-sans-body">
                Bringing more than two decades of multidisciplinary experience spanning JPMorgan Chase Bank loan and mortgage operations, financial risk analysis, and corporate operations, Leodenis Deveza Languisan directs LDL Dhenze with an unwavering focus on documentation integrity and fiscal stewardship.
              </p>

              <div className="pt-6 border-t border-white/10 flex items-center justify-between">
                <button
                  onClick={() => onNavigate('about')}
                  className="text-xs font-semibold text-[#C6922D] hover:text-[#e5b95d] inline-flex items-center gap-1"
                >
                  <span>Read leadership profile</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                <span className="text-[11px] font-mono text-slate-400">
                  Clark Freeport Zone, Pampanga
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------- */}
      {/* CEO CORNER & FOUNDER'S SOLEMN PLEDGE (PHASE 2) */}
      {/* ---------------------------------------------------- */}
      <CeoCornerSection onNavigate={onNavigate} />

      {/* ---------------------------------------------------- */}
      {/* 7. PRIVATE CONSULTATION CTA */}
      {/* ---------------------------------------------------- */}
      <section className="py-24 lg:py-32 bg-[#071A2F] border-b border-[#C6922D]/20 relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-[#C6922D]/35 text-xs text-[#e5b95d] mb-6">
            <Lock className="w-3.5 h-3.5 text-[#C6922D]" />
            <span className="font-mono text-[11px] uppercase tracking-wider">Confidential Discussion</span>
          </div>

          <h2 className="font-serif-display text-3xl sm:text-5xl lg:text-6xl text-white font-normal leading-tight mb-6">
            A considered beginning for an important development.
          </h2>

          <p className="text-sm sm:text-base text-slate-200 leading-relaxed max-w-2xl mx-auto mb-10 font-sans-body">
            Every successful project begins with a clear understanding of the site, objectives, constraints, capital structure, and intended legacy. Speak with our team in confidence about your development.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => onNavigate('start-project')}
              className="px-8 py-4 rounded-md font-bold text-xs uppercase tracking-wider bg-[#C6922D] hover:bg-[#d8a339] text-[#071A2F] transition-all shadow-xl hover:shadow-[#C6922D]/25 inline-flex items-center gap-2"
            >
              <span>Request a Private Consultation</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => onNavigate('portal')}
              className="px-6 py-4 rounded-md font-semibold text-xs tracking-wider text-slate-200 hover:text-white bg-white/5 hover:bg-white/10 border border-white/20 transition-all inline-flex items-center gap-2"
            >
              <Lock className="w-3.5 h-3.5 text-[#C6922D]" />
              <span>Client Portal</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
