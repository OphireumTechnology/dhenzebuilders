import React, { useState } from 'react';
import {
  PORTFOLIO_PROJECTS,
} from '../../data/companyData';
import {
  OFFICIAL_CEO_PROFILE,
  OFFICIAL_PROFILE_METADATA,
  NINE_CORE_DIVISIONS,
} from '../../data/companyProfileData';
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
  Download,
  FileText,
  Truck,
  Wrench,
  Sun,
  Cpu,
  Network,
  Bot,
  Workflow,
  ExternalLink,
  Award,
  Layers,
  Eye,
} from 'lucide-react';

interface HomePageProps {
  onNavigate: (view: string) => void;
  onOpenAssistant: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate, onOpenAssistant }) => {
  const [downloading, setDownloading] = useState(false);
  const featuredProjects = PORTFOLIO_PROJECTS.slice(0, 4);

  const handleDownloadProfile = () => {
    setDownloading(true);
    const link = document.createElement('a');
    link.href = OFFICIAL_PROFILE_METADATA.directPdfUrl;
    link.setAttribute(
      'download',
      'LDL-Dhenze-Residential-Building-Construction-Corporate-Profile.pdf'
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setTimeout(() => setDownloading(false), 1500);
  };

  const getDivisionIcon = (iconName: string) => {
    switch (iconName) {
      case 'Building2':
        return <Building2 className="w-6 h-6 text-[#C69A4B]" />;
      case 'Truck':
        return <Truck className="w-6 h-6 text-[#C69A4B]" />;
      case 'Wrench':
        return <Wrench className="w-6 h-6 text-[#C69A4B]" />;
      case 'Compass':
        return <Compass className="w-6 h-6 text-[#C69A4B]" />;
      case 'Sun':
        return <Sun className="w-6 h-6 text-[#C69A4B]" />;
      case 'Cpu':
        return <Cpu className="w-6 h-6 text-[#C69A4B]" />;
      case 'Network':
        return <Network className="w-6 h-6 text-[#C69A4B]" />;
      case 'Bot':
        return <Bot className="w-6 h-6 text-[#C69A4B]" />;
      case 'Workflow':
        return <Workflow className="w-6 h-6 text-[#C69A4B]" />;
      default:
        return <Layers className="w-6 h-6 text-[#C69A4B]" />;
    }
  };

  return (
    <div className="min-h-screen bg-[#071A2F] text-slate-100 selection:bg-[#C69A4B] selection:text-[#071A2F]">
      {/* ---------------------------------------------------- */}
      {/* 1. PREMIUM CORPORATE HERO SECTION WITH ARCHITECTURAL BACKGROUND */}
      {/* ---------------------------------------------------- */}
      <section className="relative bg-[#F8FAFC] text-[#071A2F] pt-16 pb-20 sm:pt-20 sm:pb-24 border-b border-[#C69A4B]/30 overflow-hidden">
        {/* Photorealistic Architectural & Engineering Background Visualization */}
        <picture className="absolute inset-0 w-full h-full pointer-events-none select-none overflow-hidden">
          <source
            media="(max-width: 640px)"
            srcSet="/assets/images/ldl-dhenze-hero-architecture-mobile.webp"
            type="image/webp"
          />
          <source
            srcSet="/assets/images/ldl-dhenze-hero-architecture.webp"
            type="image/webp"
          />
          <img
            src="/assets/images/ldl-dhenze-hero-architecture.jpg"
            alt="LDL Dhenze Residential Building Construction — Engineering, Civil Works, and Infrastructure Development"
            className="w-full h-full object-cover object-[center_35%] lg:object-[center_28%] transition-transform duration-1000 scale-[1.01]"
            loading="eager"
            decoding="async"
          />
        </picture>

        {/* Multi-Layered Professional Architectural Overlay */}
        {/* 1. Base luminous soft white wash */}
        <div className="absolute inset-0 bg-white/45 backdrop-blur-[0.5px] pointer-events-none" />

        {/* 2. Responsive Radial Luminous Spotlight (75-85% opacity centered behind headline, tapering to left and right) */}
        <div
          className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,_rgba(255,255,255,0.92)_0%,_rgba(255,255,255,0.82)_45%,_rgba(255,255,255,0.52)_75%,_rgba(255,255,255,0.30)_100%)] sm:bg-[radial-gradient(ellipse_at_center,_rgba(255,255,255,0.88)_0%,_rgba(255,255,255,0.78)_40%,_rgba(255,255,255,0.45)_75%,_rgba(255,255,255,0.22)_100%)]"
        />

        {/* 3. Subtle vertical framing gradients (top header blend & bottom card foundation) */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/90 via-transparent to-white/90 pointer-events-none" />

        {/* 4. Architectural blueprint grid texture */}
        <div className="absolute inset-0 opacity-[0.025] pointer-events-none bg-[radial-gradient(#071A2F_1px,transparent_1px)] [background-size:24px_24px]" />

        {/* 5. Subtle champagne gold & navy corporate ambient accents */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#C69A4B]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#071A2F]/8 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            {/* Supporting Heading / Entity Identification Kicker (Unboxed Corporate Standard) */}
            <div className="flex items-center justify-center gap-2.5 mb-4">
              <span className="w-5 sm:w-8 h-[1.5px] bg-[#C69A4B] shrink-0" />
              <span className="font-['Montserrat'] font-bold tracking-[0.20em] uppercase text-xs sm:text-[13px] text-[#071A2F] drop-shadow-xs">
                LDL DHENZE RESIDENTIAL BUILDING CONSTRUCTION
              </span>
              <span className="w-5 sm:w-8 h-[1.5px] bg-[#C69A4B] shrink-0" />
            </div>

            {/* Main Heading — Balanced 42–52px Corporate Scale */}
            <h1 className="font-['Montserrat'] text-[28px] sm:text-[36px] md:text-[44px] lg:text-[48px] font-bold text-[#071A2F] tracking-tight leading-[1.16] max-w-[1000px] mx-auto mb-5 sm:mb-6">
              BUILDING TODAY.
              <br />
              <span className="text-[#071A2F]">ENGINEERING TOMORROW.</span>
              <br />
              <span className="bg-gradient-to-r from-[#C69A4B] via-[#d4a856] to-[#b88938] bg-clip-text text-transparent">
                POWERING THE FUTURE.
              </span>
            </h1>

            {/* Corporate Subtitle & Mission Statement */}
            <p className="text-[15px] sm:text-[17px] text-slate-700 max-w-[750px] mx-auto leading-relaxed font-sans font-medium mb-7 sm:mb-8">
              A Philippine development and civil engineering enterprise coordinating disciplined planning, licensed architecture, infrastructure delivery, renewable energy, and intelligent systems.
            </p>

            {/* Call-to-Action Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
              <button
                id="hero-explore-company-btn"
                onClick={() => onNavigate('corporate-profile')}
                className="h-[42px] px-6 rounded-md font-bold text-xs uppercase tracking-wider bg-[#071A2F] hover:bg-[#0c2847] text-white transition-all shadow-md hover:shadow-lg inline-flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Explore Our Company</span>
                <ArrowRight className="w-4 h-4 text-[#C69A4B]" />
              </button>

              <button
                id="hero-download-profile-btn"
                onClick={handleDownloadProfile}
                disabled={downloading}
                className="h-[42px] px-6 rounded-md font-bold text-xs uppercase tracking-wider bg-[#C69A4B] hover:bg-[#d8a339] text-[#071A2F] transition-all shadow-md hover:shadow-lg inline-flex items-center justify-center gap-2 cursor-pointer"
              >
                <Download className="w-4 h-4 shrink-0" />
                <span>
                  {downloading ? 'Preparing PDF...' : 'Download Corporate Profile'}
                </span>
              </button>
            </div>

            {/* Trust & Statutory Indicators — Elevated Frosted Glass Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-8 mt-6 border-t border-slate-200/90 text-xs">
              <div className="text-left bg-white/90 backdrop-blur-md border border-slate-200/90 p-3.5 rounded-xl shadow-xs hover:shadow-md transition-shadow">
                <div className="text-slate-500 text-[10px] uppercase font-bold tracking-wider">Entity Registration</div>
                <div className="font-bold text-[#071A2F] mt-0.5">DTI No. 4812272</div>
                <div className="text-[10px] text-slate-500">2023–2028 Validated</div>
              </div>
              <div className="text-left bg-white/90 backdrop-blur-md border border-slate-200/90 p-3.5 rounded-xl shadow-xs hover:shadow-md transition-shadow">
                <div className="text-slate-500 text-[10px] uppercase font-bold tracking-wider">Tax Registration</div>
                <div className="font-bold text-[#071A2F] mt-0.5">BIR Form 2303</div>
                <div className="text-[10px] text-slate-500">TIN 306-113-062-00000</div>
              </div>
              <div className="text-left bg-white/90 backdrop-blur-md border border-slate-200/90 p-3.5 rounded-xl shadow-xs hover:shadow-md transition-shadow">
                <div className="text-slate-500 text-[10px] uppercase font-bold tracking-wider">Primary Line (PSIC)</div>
                <div className="font-bold text-[#C69A4B] mt-0.5">PSIC 42900</div>
                <div className="text-[10px] text-slate-500">Other Civil Engineering</div>
              </div>
              <div className="text-left bg-white/90 backdrop-blur-md border border-slate-200/90 p-3.5 rounded-xl shadow-xs hover:shadow-md transition-shadow">
                <div className="text-slate-500 text-[10px] uppercase font-bold tracking-wider">Official Document</div>
                <div className="font-bold text-emerald-700 mt-0.5">27-Page Profile</div>
                <div className="text-[10px] text-slate-500">View Online or PDF</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------- */}
      {/* 2. CEO INTRODUCTION SECTION (SECTION 6) */}
      {/* ---------------------------------------------------- */}
      <section className="py-20 lg:py-28 bg-[#061325] border-b border-[#C69A4B]/20 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#09223D] border-2 border-[#C69A4B]/35 rounded-3xl p-6 sm:p-10 lg:p-12 shadow-2xl relative overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
              {/* Left Column (Desktop) / Top (Mobile): Official CEO Photograph */}
              <div className="lg:col-span-5 flex flex-col items-center">
                <div className="relative w-full rounded-2xl overflow-hidden border-2 border-[#C69A4B]/50 shadow-2xl bg-[#040E1B] group">
                  <img
                    src={OFFICIAL_CEO_PROFILE.photoUrl}
                    alt="Leodenis Deveza Languisan, Founder and CEO of LDL Dhenze Residential Building Construction"
                    className="w-full h-auto object-cover object-center block transform group-hover:scale-[1.01] transition-transform duration-500"
                    loading="eager"
                  />
                  <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-[#071A2F]/95 via-[#071A2F]/70 to-transparent p-4 text-center">
                    <div className="text-xs font-mono font-bold text-[#E5B95D] uppercase tracking-wider">
                      {OFFICIAL_CEO_PROFILE.fullName}
                    </div>
                    <div className="text-[11px] text-slate-300">
                      Founder and Chief Executive Officer
                    </div>
                  </div>
                </div>
                <p className="text-[11px] text-slate-400 italic text-center mt-3 max-w-sm">
                  {OFFICIAL_CEO_PROFILE.photoCaption}
                </p>
              </div>

              {/* Right Column: Executive Title, Introduction & Founder's Statement */}
              <div className="lg:col-span-7 space-y-6">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C69A4B]/15 text-[#C69A4B] text-xs font-mono font-bold uppercase tracking-wider mb-2">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>Founder &amp; Chief Executive Officer</span>
                  </div>
                  <h2 className="text-2xl sm:text-4xl font-black text-white font-['Montserrat'] tracking-tight">
                    {OFFICIAL_CEO_PROFILE.fullName}
                  </h2>
                  <div className="text-sm font-semibold text-[#E5B95D] mt-1">
                    Founder and Chief Executive Officer • LDL Dhenze Residential Building Construction
                  </div>
                </div>

                {/* Concise Founder's Message from Profile */}
                <div className="bg-[#051322] border-l-4 border-[#C69A4B] p-5 rounded-r-2xl space-y-2">
                  <p className="text-sm sm:text-base font-serif italic text-slate-200 leading-relaxed">
                    “When we build, we do not merely raise structures. We build opportunities. We build progress. We build legacies. And above all, we build trust.”
                  </p>
                  <p className="text-xs text-slate-300 leading-relaxed pt-1">
                    At LDL Dhenze, our mission is clear: to lawfully deliver world-class infrastructure and integrated solutions that improve lives and strengthen the nation—today, tomorrow, and for generations to come.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="bg-[#051322] p-3.5 rounded-xl border border-white/5">
                    <div className="text-[#C69A4B] uppercase text-[10px] font-bold">Banking Governance</div>
                    <div className="text-slate-200 font-semibold mt-0.5">JPMorgan Chase Experience</div>
                    <div className="text-slate-400 text-[11px] mt-0.5">Risk controls &amp; financial accountability</div>
                  </div>
                  <div className="bg-[#051322] p-3.5 rounded-xl border border-white/5">
                    <div className="text-[#C69A4B] uppercase text-[10px] font-bold">Educational Pedigree</div>
                    <div className="text-slate-200 font-semibold mt-0.5">B.Comm (Banking) &amp; B.S. IT</div>
                    <div className="text-slate-400 text-[11px] mt-0.5">STI College &amp; DCCP Baguio City</div>
                  </div>
                </div>

                {/* Actions */}
                <div className="pt-2 flex flex-wrap items-center gap-3">
                  <button
                    onClick={() => onNavigate('leadership')}
                    className="px-6 py-3 rounded-xl bg-[#C69A4B] hover:bg-[#d8a339] text-[#071A2F] font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow-lg transition-all"
                  >
                    <span>Read Full Leadership Profile</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => onNavigate('corporate-profile')}
                    className="px-5 py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/20 text-slate-200 text-xs font-semibold uppercase tracking-wider flex items-center gap-2 transition-all"
                  >
                    <FileText className="w-4 h-4 text-[#C69A4B]" />
                    <span>View 27-Page Corporate Profile</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------- */}
      {/* 3. CORPORATE BUSINESS OPERATIONS (SECTION 7) */}
      {/* ---------------------------------------------------- */}
      <section className="py-24 lg:py-32 bg-[#071A2F] border-b border-[#C69A4B]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-white/10">
            <div>
              <div className="text-xs font-mono text-[#C69A4B] uppercase tracking-widest font-bold">
                Fields of Business
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white font-['Montserrat'] tracking-tight mt-2">
                OUR CORE BUSINESS DIVISIONS
              </h2>
            </div>
            <p className="text-sm text-slate-300 max-w-md leading-relaxed">
              The nine core divisions described in the official Corporate Profile, distinguishing our BIR-registered construction core from strategic future capabilities.
            </p>
          </div>

          {/* 9 Divisions Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {NINE_CORE_DIVISIONS.map((div) => {
              const isCurrent = div.category === 'CURRENT_REGISTERED';
              return (
                <div
                  key={div.id}
                  className={`rounded-2xl p-6 sm:p-7 flex flex-col justify-between border transition-all group ${
                    isCurrent
                      ? 'bg-[#09223D] border-[#C69A4B]/60 shadow-xl'
                      : 'bg-[#081F38] border-white/10 hover:border-[#C69A4B]/40'
                  }`}
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="w-12 h-12 rounded-xl bg-[#051322] border border-white/10 flex items-center justify-center group-hover:border-[#C69A4B]/50 transition-colors">
                        {getDivisionIcon(div.iconName)}
                      </div>
                      <span className="font-mono text-xs font-bold text-[#C69A4B] px-2.5 py-1 rounded bg-[#051322] border border-white/10">
                        Division {div.divisionNumber}
                      </span>
                    </div>

                    <div>
                      <div className="inline-block mb-1.5">
                        <span
                          className={`text-[10px] font-mono font-semibold px-2 py-0.5 rounded ${
                            isCurrent
                              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                              : 'bg-white/5 text-slate-300 border border-white/10'
                          }`}
                        >
                          {isCurrent ? 'Current Registered Business' : 'Strategic Development Focus'}
                        </span>
                      </div>
                      <h3 className="text-lg font-bold text-white font-['Montserrat'] group-hover:text-[#E5B95D] transition-colors">
                        {div.name}
                      </h3>
                    </div>

                    <p className="text-xs text-slate-300 leading-relaxed">
                      {div.description}
                    </p>

                    <div className="space-y-1.5 pt-2 border-t border-white/5">
                      {div.highlights.slice(0, 2).map((h, idx) => (
                        <div key={idx} className="flex items-start gap-1.5 text-[11px] text-slate-400">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#C69A4B] shrink-0 mt-0.5" />
                          <span className="line-clamp-2">{h}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-6 mt-4 border-t border-white/10 flex items-center justify-between text-xs">
                    <span className="font-mono text-[10px] text-slate-500">
                      {div.pageReference}
                    </span>
                    <button
                      onClick={() => onNavigate('corporate-profile')}
                      className="font-semibold text-[#C69A4B] hover:text-[#e5b95d] flex items-center gap-1 group-hover:translate-x-0.5 transition-transform"
                    >
                      <span>Explore details</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------- */}
      {/* 4. SELECTED WORK & VERIFIED PROJECT STUDIES */}
      {/* ---------------------------------------------------- */}
      <section className="py-24 lg:py-32 bg-[#061325] border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-white/10">
            <div>
              <span className="text-xs font-mono text-[#C69A4B] uppercase tracking-widest font-bold">
                Portfolio Showcase
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white font-['Montserrat'] mt-2">
                Selected Work &amp; Project Studies
              </h2>
            </div>
            <button
              onClick={() => onNavigate('projects')}
              className="text-xs font-semibold uppercase tracking-wider text-[#C69A4B] hover:text-[#e5b95d] inline-flex items-center gap-1"
            >
              <span>View complete project library</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {featuredProjects.map((p) => {
              const isConceptual =
                p.isConceptual ||
                p.stage?.toLowerCase().includes('concept') ||
                p.stage?.toLowerCase().includes('planning');
              return (
                <div
                  key={p.id}
                  className="bg-[#081F38] border border-white/10 rounded-2xl overflow-hidden group hover:border-[#C69A4B]/40 transition-all flex flex-col"
                >
                  <div className="relative h-64 overflow-hidden bg-slate-900">
                    <img
                      src={p.heroImage}
                      alt={p.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      referrerPolicy="no-referrer"
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).src =
                          '/assets/images/solar-storage.jpg';
                      }}
                    />
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 text-[11px] font-semibold uppercase tracking-wider bg-[#071A2F]/90 text-[#e5b95d] border border-[#C69A4B]/40 rounded backdrop-blur-md">
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
      {/* 5. DOWNLOAD CTA SECTION */}
      {/* ---------------------------------------------------- */}
      <section className="py-20 bg-gradient-to-b from-[#071A2F] to-[#040E1B] text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#C69A4B]/10 border border-[#C69A4B]/30 text-[#C69A4B] text-xs font-mono font-bold uppercase tracking-widest">
            <FileCheck className="w-4 h-4" />
            <span>Public Document Center</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-white font-['Montserrat'] tracking-tight">
            Review the Official Corporate Profile
          </h2>

          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Access the complete 27-page official publication covering our registration certificates, organizational structure, leadership background, and comprehensive business divisions.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <button
              onClick={handleDownloadProfile}
              disabled={downloading}
              className="px-8 py-4 rounded-xl bg-[#C69A4B] hover:bg-[#d8a339] text-[#071A2F] font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow-2xl transition-all"
            >
              <Download className="w-4 h-4" />
              <span>
                {downloading ? 'Preparing PDF...' : 'Download Official PDF (9.9 MB)'}
              </span>
            </button>

            <button
              onClick={() => onNavigate('corporate-profile')}
              className="px-8 py-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/20 text-slate-200 text-xs font-semibold uppercase tracking-wider flex items-center gap-2 transition-all"
            >
              <Eye className="w-4 h-4 text-[#C69A4B]" />
              <span>View Online in PDF Viewer</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
