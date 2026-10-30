import React, { useState } from 'react';
import {
  ShieldCheck,
  Download,
  Eye,
  Building2,
  CheckCircle2,
  Scale,
  Compass,
  Award,
  Landmark,
  FileText,
  FileCheck,
  ChevronRight,
  ExternalLink,
  BookOpen,
  ArrowRight,
  Layers,
  Sparkles,
  Users,
  Sun,
  Bot,
  Network,
  Cpu,
  Truck,
  Wrench,
  Workflow,
  Search,
} from 'lucide-react';
import {
  OFFICIAL_PROFILE_METADATA,
  OFFICIAL_CEO_PROFILE,
  CORE_VALUES_LIST,
  NINE_CORE_DIVISIONS,
  STRATEGIC_MARKETS_LIST,
  PROFILE_PAGES_MANIFEST,
} from '../../data/companyProfileData';
import { CorporatePdfViewer } from '../common/CorporatePdfViewer';
import { CompanyLogo } from '../common/CompanyLogo';

interface CorporateProfilePageProps {
  onNavigate: (view: string) => void;
  onOpenAssistant?: () => void;
}

export const CorporateProfilePage: React.FC<CorporateProfilePageProps> = ({
  onNavigate,
  onOpenAssistant,
}) => {
  const [activeDivisionTab, setActiveDivisionTab] = useState<string>('div-01');
  const [downloading, setDownloading] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const handleDownload = () => {
    setDownloading(true);
    setDownloadSuccess(false);

    const link = document.createElement('a');
    link.href = OFFICIAL_PROFILE_METADATA.directPdfUrl;
    link.setAttribute(
      'download',
      'LDL-Dhenze-Residential-Building-Construction-Corporate-Profile.pdf'
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setTimeout(() => {
      setDownloading(false);
      setDownloadSuccess(true);
      setTimeout(() => setDownloadSuccess(false), 5000);
    }, 1200);
  };

  const getDivisionIcon = (iconName: string) => {
    switch (iconName) {
      case 'Building2':
        return <Building2 className="w-5 h-5" />;
      case 'Truck':
        return <Truck className="w-5 h-5" />;
      case 'Wrench':
        return <Wrench className="w-5 h-5" />;
      case 'Compass':
        return <Compass className="w-5 h-5" />;
      case 'Sun':
        return <Sun className="w-5 h-5" />;
      case 'Cpu':
        return <Cpu className="w-5 h-5" />;
      case 'Network':
        return <Network className="w-5 h-5" />;
      case 'Bot':
        return <Bot className="w-5 h-5" />;
      case 'Workflow':
        return <Workflow className="w-5 h-5" />;
      default:
        return <Layers className="w-5 h-5" />;
    }
  };

  const selectedDivision =
    NINE_CORE_DIVISIONS.find((d) => d.id === activeDivisionTab) || NINE_CORE_DIVISIONS[0];

  return (
    <div className="min-h-screen bg-[#071A2F] text-slate-100 pt-28 pb-24 selection:bg-[#C6922D] selection:text-[#071A2F]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* ---------------------------------------------------- */}
        {/* 1. MANDATED PAGE HEADING & CORPORATE MOTTO */}
        {/* ---------------------------------------------------- */}
        <div className="border-b border-[#C6922D]/25 pb-10">
          <div className="flex items-center gap-2 text-[#C69A4B] text-xs font-bold uppercase tracking-widest font-['Montserrat'] mb-3">
            <span className="w-4 h-[1.5px] bg-[#C69A4B]" />
            <ShieldCheck className="w-4 h-4 text-[#C69A4B]" />
            <span>Official Corporate Identity &amp; Statutory Registrations</span>
          </div>

          <h1 className="text-2xl sm:text-4xl lg:text-[44px] font-bold text-white font-['Montserrat'] tracking-tight leading-tight">
            LDL DHENZE RESIDENTIAL BUILDING CONSTRUCTION
          </h1>

          <div className="mt-2.5 text-base sm:text-xl font-serif italic text-[#E5B95D]">
            Building Today. Engineering Tomorrow. Powering the Future.
          </div>

          <p className="mt-3.5 text-xs sm:text-sm text-slate-300 max-w-3xl leading-relaxed">
            A Single Proprietorship duly registered with the Department of Trade and Industry and the Bureau of Internal Revenue, Republic of the Philippines. Delivering disciplined development, coordinated engineering, and next-generation infrastructure.
          </p>

          {/* Quick Stats Banner */}
          <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
            <div className="bg-[#09223D] border border-white/10 rounded-xl p-3.5">
              <span className="text-slate-400 text-[10px] uppercase font-semibold">DTI Registration</span>
              <div className="font-mono font-bold text-white text-sm mt-0.5">#4812272</div>
              <div className="text-[10px] text-slate-400 mt-0.5">Valid 2023–2028</div>
            </div>
            <div className="bg-[#09223D] border border-white/10 rounded-xl p-3.5">
              <span className="text-slate-400 text-[10px] uppercase font-semibold">BIR Form 2303</span>
              <div className="font-mono font-bold text-white text-sm mt-0.5">306-113-062-00000</div>
              <div className="text-[10px] text-slate-400 mt-0.5">TIN • OCN 21ARC2025000002189</div>
            </div>
            <div className="bg-[#09223D] border border-white/10 rounded-xl p-3.5">
              <span className="text-slate-400 text-[10px] uppercase font-semibold">Line of Business</span>
              <div className="font-mono font-bold text-[#C6922D] text-sm mt-0.5">PSIC 42900</div>
              <div className="text-[10px] text-slate-400 mt-0.5">Construction of Other Civil Engineering</div>
            </div>
            <div className="bg-[#09223D] border border-white/10 rounded-xl p-3.5">
              <span className="text-slate-400 text-[10px] uppercase font-semibold">Official Document</span>
              <div className="font-mono font-bold text-emerald-400 text-sm mt-0.5">27 Pages (9.9 MB)</div>
              <div className="text-[10px] text-slate-400 mt-0.5">SHA-256 Verified</div>
            </div>
          </div>
        </div>

        {/* ---------------------------------------------------- */}
        {/* 2. INTEGRATED 27-PAGE PDF VIEWER (SECTION 4) */}
        {/* ---------------------------------------------------- */}
        <section id="pdf-viewer-section" className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="text-xs font-mono font-bold text-[#C6922D] uppercase tracking-widest">
                Interactive Document Center
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-white font-['Montserrat'] mt-1">
                View Official Corporate Profile (All 27 Pages)
              </h2>
              <p className="text-xs text-slate-300 mt-1">
                Read the authoritative publication online without downloading. Use full-screen, zoom, or page navigation.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={handleDownload}
                disabled={downloading}
                className="px-5 py-2.5 rounded-xl bg-[#C6922D] hover:bg-[#d8a339] text-[#071A2F] font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow-lg transition-all"
              >
                <Download className="w-4 h-4" />
                <span>
                  {downloading ? 'Downloading...' : 'Download Official PDF (9.9 MB)'}
                </span>
              </button>
            </div>
          </div>

          {/* PDF Viewer Component */}
          <CorporatePdfViewer initialPage={1} />

          {downloadSuccess && (
            <div className="p-3 bg-emerald-500/15 border border-emerald-500/30 rounded-xl text-xs text-emerald-300 flex items-center gap-2 animate-fadeIn">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>
                Download initiated for official document: <code className="font-mono">LDL-Dhenze-Residential-Building-Construction-Corporate-Profile.pdf</code>
              </span>
            </div>
          )}
        </section>

        {/* ---------------------------------------------------- */}
        {/* 3. CORPORATE OVERVIEW & COMPANY BACKGROUND */}
        {/* ---------------------------------------------------- */}
        <section className="bg-[#09223D] border border-white/10 rounded-3xl p-6 sm:p-10 shadow-xl space-y-6">
          <div className="max-w-3xl">
            <div className="text-xs font-mono font-bold text-[#C6922D] uppercase tracking-widest">
              Entity Profile
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white font-['Montserrat'] mt-1">
              Company Overview &amp; Background
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-8 space-y-4 text-xs sm:text-sm text-slate-300 leading-relaxed">
              <p>
                <span className="font-bold text-white">LDL Dhenze Residential Building Construction</span> is a Philippine construction and civil engineering enterprise duly established and registered to provide comprehensive, lawful, and professionally executed solutions for the development of residential, commercial, industrial, institutional, and infrastructure projects.
              </p>
              <p>
                The Company is strategically developing an integrated business platform encompassing Construction, Engineering, Materials, Heavy Equipment, Architecture, Green Energy, Technology, Smart City Solutions, and Artificial Intelligence, to be pursued in strict accordance with applicable law and, where required, through duly licensed professionals, accredited contractors, and appropriately regulated corporate vehicles.
              </p>
              <p>
                The Company holds the position that the construction industry of the future shall no longer be confined to concrete, steel, equipment, and manpower, but shall instead integrate physical infrastructure with renewable energy, intelligent systems, digital connectivity, automation, data, and Artificial Intelligence.
              </p>
            </div>

            <div className="lg:col-span-4 bg-[#051322] border border-[#C6922D]/30 rounded-2xl p-5 space-y-3">
              <div className="text-xs font-mono font-bold text-[#C6922D] uppercase tracking-wider">
                Our Core Commitments
              </div>
              <ul className="space-y-2 text-xs text-slate-300">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span><strong>Lawful &amp; Compliant:</strong> Full regulatory adherence</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span><strong>Professional Excellence:</strong> PRC-certified disciplines</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span><strong>Client-Focused:</strong> Long-term asset value</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span><strong>Sustainable Solutions:</strong> Clean energy &amp; efficiency</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span><strong>Strategic Partnerships:</strong> Shared growth</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* ---------------------------------------------------- */}
        {/* 4. FOUNDER'S MESSAGE & CEO DOSSIER (WITH CEO PHOTO) */}
        {/* ---------------------------------------------------- */}
        <section className="bg-[#081F38] border-2 border-[#C6922D]/40 rounded-3xl p-6 sm:p-10 shadow-2xl space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* CEO Photo (Preserving exact proportions) */}
            <div className="lg:col-span-5 flex flex-col items-center">
              <div className="relative w-full rounded-2xl overflow-hidden border-2 border-[#C6922D]/50 shadow-2xl bg-[#040E1B] group">
                <img
                  src={OFFICIAL_CEO_PROFILE.photoUrl}
                  alt="Leodenis Deveza Languisan, Founder and CEO of LDL Dhenze Residential Building Construction"
                  className="w-full h-auto object-cover object-center block"
                  loading="lazy"
                />
                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-[#071A2F]/95 via-[#071A2F]/70 to-transparent p-4 text-center">
                  <div className="text-xs font-mono font-bold text-[#E5B95D] uppercase tracking-wider">
                    {OFFICIAL_CEO_PROFILE.fullName}
                  </div>
                  <div className="text-[11px] text-slate-300">
                    {OFFICIAL_CEO_PROFILE.role}
                  </div>
                </div>
              </div>
              <p className="text-[11px] text-slate-400 italic text-center mt-2.5">
                Inside the LDL Dhenze Corporate Reception Office, Clark Pampanga
              </p>
            </div>

            {/* Founder Narrative */}
            <div className="lg:col-span-7 space-y-5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C6922D]/15 text-[#C6922D] text-xs font-bold font-mono uppercase tracking-wider">
                <Award className="w-3.5 h-3.5" />
                <span>Founder’s Address &amp; Solemn Pledge</span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-black text-white font-['Montserrat']">
                “When we build, we do not merely raise structures. We build opportunities.”
              </h2>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed italic border-l-2 border-[#C6922D] pl-4">
                “We build progress. We build legacies. And above all, we build trust. At LDL Dhenze, our mission is clear: to lawfully deliver world-class infrastructure and integrated solutions that improve lives and strengthen the nation—today, tomorrow, and for generations to come.”
              </p>

              <div className="grid grid-cols-2 gap-3 text-xs pt-2">
                <div className="bg-[#051322] p-3 rounded-xl border border-white/5">
                  <div className="text-slate-400 text-[10px] uppercase font-bold">Banking Background</div>
                  <div className="font-semibold text-white mt-0.5">JPMorgan Chase Operations</div>
                </div>
                <div className="bg-[#051322] p-3 rounded-xl border border-white/5">
                  <div className="text-slate-400 text-[10px] uppercase font-bold">Education</div>
                  <div className="font-semibold text-[#E5B95D] mt-0.5">B.Comm (Banking) &amp; B.S. IT</div>
                </div>
              </div>

              <div className="pt-2 flex flex-wrap items-center gap-3">
                <button
                  onClick={() => onNavigate('leadership')}
                  className="px-5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/20 text-slate-200 text-xs font-semibold uppercase tracking-wider flex items-center gap-2 transition-all"
                >
                  <span>Explore Full Leadership Profile</span>
                  <ChevronRight className="w-4 h-4 text-[#C6922D]" />
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* ---------------------------------------------------- */}
        {/* 5. CORPORATE VISION & MISSION */}
        {/* ---------------------------------------------------- */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          {/* Vision */}
          <div className="bg-[#09223D] border border-white/10 rounded-3xl p-6 sm:p-8 flex flex-col justify-between space-y-4">
            <div>
              <div className="w-10 h-10 rounded-xl bg-[#C6922D]/20 text-[#C6922D] flex items-center justify-center mb-3">
                <Compass className="w-5 h-5" />
              </div>
              <div className="text-[10px] font-mono font-bold text-[#C6922D] uppercase tracking-wider">
                Strategic Horizon
              </div>
              <h3 className="text-xl font-bold text-white font-['Montserrat'] mt-1">
                Corporate Vision
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mt-3">
                To be recognized as a Philippine integrated construction, engineering, infrastructure, green-energy, and technology solutions enterprise, capable of lawfully delivering sustainable, intelligent, resilient, and future-ready developments.
              </p>
            </div>
            <div className="border-t border-white/10 pt-4 font-serif italic text-xs sm:text-sm text-[#E5B95D]">
              “We do not simply envision buildings. We envision intelligent, connected, and sustainable communities built for generations.”
            </div>
          </div>

          {/* Mission */}
          <div className="bg-[#09223D] border border-white/10 rounded-3xl p-6 sm:p-8 flex flex-col justify-between space-y-4">
            <div>
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-3">
                <Award className="w-5 h-5" />
              </div>
              <div className="text-[10px] font-mono font-bold text-emerald-400 uppercase tracking-wider">
                Purpose &amp; Mandate
              </div>
              <h3 className="text-xl font-bold text-white font-['Montserrat'] mt-1">
                Corporate Mission
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mt-3">
                To provide innovative, dependable, efficient, sustainable, and technology-driven solutions to the construction and infrastructure industry, upholding strict standards of safety, integrity, accountability, and regulatory compliance in all undertakings.
              </p>
            </div>
            <div className="border-t border-white/10 pt-4 text-xs text-slate-400">
              Integrating physical construction, renewable energy deployment, smart-building systems, and AI-assisted project controls.
            </div>
          </div>
        </section>

        {/* ---------------------------------------------------- */}
        {/* 6. CORE VALUES (THE SEVEN PILLARS) */}
        {/* ---------------------------------------------------- */}
        <section className="space-y-6">
          <div className="text-center max-w-2xl mx-auto">
            <div className="text-xs font-mono font-bold text-[#C6922D] uppercase tracking-widest">
              Guiding Ethos
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white font-['Montserrat'] mt-1">
              Our Core Values
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Our Values. Our Commitment. Our Future.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {CORE_VALUES_LIST.map((val, idx) => (
              <div
                key={val.name}
                className="bg-[#09223D] border border-white/10 rounded-2xl p-5 hover:border-[#C6922D]/40 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="text-[10px] font-mono font-bold text-[#C6922D] uppercase tracking-wider mb-1">
                    0{idx + 1} • {val.pillar}
                  </div>
                  <h3 className="text-base font-bold text-white font-['Montserrat'] mb-2">
                    {val.name}
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {val.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ---------------------------------------------------- */}
        {/* 7. BUSINESS OPERATIONS: THE NINE CORE DIVISIONS (SECTION 7) */}
        {/* ---------------------------------------------------- */}
        <section id="core-business-divisions" className="space-y-6">
          <div className="max-w-3xl">
            <div className="text-xs font-mono font-bold text-[#C6922D] uppercase tracking-widest">
              Fields of Business
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white font-['Montserrat'] mt-1">
              Our Core Business Divisions
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-1">
              Presented in accordance with the official Corporate Profile, clearly delineating current registered operations from strategic development capabilities.
            </p>
          </div>

          {/* Division Selector Tabs */}
          <div className="flex flex-wrap gap-2 pb-2 border-b border-white/10">
            {NINE_CORE_DIVISIONS.map((div) => {
              const active = div.id === activeDivisionTab;
              return (
                <button
                  key={div.id}
                  onClick={() => setActiveDivisionTab(div.id)}
                  className={`px-3 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 border transition-all ${
                    active
                      ? 'bg-[#C6922D] text-[#071A2F] border-[#C6922D] shadow-lg font-bold'
                      : 'bg-[#09223D] text-slate-300 border-white/10 hover:border-white/20'
                  }`}
                >
                  <span className="font-mono text-[11px] opacity-75">{div.divisionNumber}</span>
                  <span className="truncate max-w-[150px] sm:max-w-none">{div.name}</span>
                </button>
              );
            })}
          </div>

          {/* Active Division Feature Card */}
          <div className="bg-[#09223D] border-2 border-[#C6922D]/35 rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              <div className="lg:col-span-8 space-y-5">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="w-10 h-10 rounded-xl bg-[#C6922D]/20 text-[#C6922D] flex items-center justify-center">
                    {getDivisionIcon(selectedDivision.iconName)}
                  </span>
                  <div>
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#C6922D]">
                      Division {selectedDivision.divisionNumber} • {selectedDivision.pageReference}
                    </span>
                    <h3 className="text-xl sm:text-2xl font-black text-white font-['Montserrat']">
                      {selectedDivision.name}
                    </h3>
                  </div>
                </div>

                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-semibold bg-white/5 border border-white/10">
                  <span className={`w-2 h-2 rounded-full ${selectedDivision.category === 'CURRENT_REGISTERED' ? 'bg-emerald-400' : 'bg-[#C6922D]'}`} />
                  <span className={selectedDivision.category === 'CURRENT_REGISTERED' ? 'text-emerald-300' : 'text-slate-300'}>
                    {selectedDivision.statusLabel}
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                  {selectedDivision.description}
                </p>

                {selectedDivision.statutoryBasis && (
                  <div className="bg-[#051322] border border-[#C6922D]/25 rounded-xl p-3.5 text-xs text-slate-300">
                    <span className="text-[#C6922D] font-bold">Statutory Governance: </span>
                    {selectedDivision.statutoryBasis}
                  </div>
                )}

                <div className="space-y-2 pt-2">
                  <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Scope of Capabilities
                  </div>
                  <ul className="space-y-2 text-xs text-slate-300">
                    {selectedDivision.highlights.map((h, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-[#C6922D] shrink-0 mt-0.5" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Division Subcategories Matrix */}
              <div className="lg:col-span-4 bg-[#051322] border border-white/10 rounded-2xl p-5 space-y-4">
                <div className="text-xs font-mono font-bold uppercase tracking-wider text-[#C6922D]">
                  Operational Disciplines
                </div>
                <div className="space-y-2">
                  {selectedDivision.subCategories.map((sub, i) => (
                    <div
                      key={i}
                      className="p-2.5 rounded-lg bg-[#071A2F] border border-white/5 text-xs text-slate-200 font-medium"
                    >
                      {sub}
                    </div>
                  ))}
                </div>

                <div className="pt-2 border-t border-white/10">
                  <a
                    href="#pdf-viewer-section"
                    className="text-xs text-[#C6922D] hover:underline flex items-center gap-1 font-semibold"
                  >
                    <span>View Division in PDF Viewer</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ---------------------------------------------------- */}
        {/* 8. STRATEGIC MARKETS & SECTORS */}
        {/* ---------------------------------------------------- */}
        <section className="space-y-6">
          <div className="max-w-3xl">
            <div className="text-xs font-mono font-bold text-[#C6922D] uppercase tracking-widest">
              Market Scope
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white font-['Montserrat'] mt-1">
              15 Strategic Target Sectors
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Subject to applicable licensing and accreditation requirements across the Philippines.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5">
            {STRATEGIC_MARKETS_LIST.map((mkt) => (
              <div
                key={mkt.id}
                className="bg-[#09223D] border border-white/5 rounded-xl p-3.5 hover:border-[#C6922D]/35 transition-all text-xs"
              >
                <div className="font-bold text-white mb-1">{mkt.title}</div>
                <div className="text-[11px] text-slate-400 line-clamp-2">{mkt.description}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ---------------------------------------------------- */}
        {/* 9. STATUTORY REGISTRATIONS & REGULATORY NOTICE */}
        {/* ---------------------------------------------------- */}
        <section className="bg-[#081F38] border-2 border-white/10 rounded-3xl p-6 sm:p-10 space-y-6">
          <div className="flex items-center gap-3 pb-4 border-b border-white/10">
            <Scale className="w-6 h-6 text-[#C6922D]" />
            <div>
              <h3 className="text-base sm:text-lg font-bold text-white font-['Montserrat']">
                Statement of Corporate Registration and Legal Status
              </h3>
              <p className="text-xs text-slate-400">
                Official statutory disclosures affirmed in accordance with Philippine law.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
            <div className="bg-[#051322] p-4 rounded-xl border border-white/5 space-y-1">
              <div className="text-slate-400 uppercase text-[10px] font-bold">Registered Entity Name</div>
              <div className="font-bold text-white">LDL DHENZE RESIDENTIAL BUILDING CONSTRUCTION</div>
              <div className="text-slate-400 text-[11px]">Single Proprietorship</div>
            </div>
            <div className="bg-[#051322] p-4 rounded-xl border border-white/5 space-y-1">
              <div className="text-slate-400 uppercase text-[10px] font-bold">DTI Registration Number</div>
              <div className="font-bold text-[#E5B95D] font-mono">4812272</div>
              <div className="text-slate-400 text-[11px]">Valid 22 March 2023 to 22 March 2028</div>
            </div>
            <div className="bg-[#051322] p-4 rounded-xl border border-white/5 space-y-1">
              <div className="text-slate-400 uppercase text-[10px] font-bold">BIR Tax Identification (TIN)</div>
              <div className="font-bold text-white font-mono">306-113-062-00000</div>
              <div className="text-slate-400 text-[11px]">OCN: 21ARC2025000002189 • PSIC 42900</div>
            </div>
          </div>

          <div className="p-4 bg-[#051322] border border-amber-500/20 rounded-xl text-xs text-slate-300 leading-relaxed">
            <span className="font-bold text-[#C6922D]">Mandatory Regulatory Notice: </span>
            The DTI Certificate of Business Name Registration referenced herein is not a license to engage in business or to practice a profession. It is a formal registration of business name and is valid solely within the scope and territorial coverage indicated in the certificate, subject to compliance with all applicable laws, rules, and regulations of the Republic of the Philippines, including but not limited to national and local government permits, professional regulatory requirements, and the applicable licensure of the Philippine Contractors Accreditation Board (PCAB), where required.
          </div>
        </section>

        {/* ---------------------------------------------------- */}
        {/* 10. DOWNLOAD CTA BANNER */}
        {/* ---------------------------------------------------- */}
        <section className="bg-gradient-to-r from-[#09223D] via-[#0D2E54] to-[#09223D] border-2 border-[#C6922D]/40 rounded-3xl p-8 sm:p-12 text-center space-y-6 shadow-2xl">
          <div className="max-w-2xl mx-auto space-y-3">
            <CompanyLogo variant="emblem" size="lg" className="mx-auto mb-2" />
            <h2 className="text-2xl sm:text-4xl font-black text-white font-['Montserrat']">
              Download the Official Corporate Profile
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Obtain the complete authorized 27-page PDF including official DTI and BIR registration certificates, organizational chart, and strategic capability roadmaps.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={handleDownload}
              disabled={downloading}
              className="px-8 py-4 rounded-xl bg-[#C6922D] hover:bg-[#d8a339] text-[#071A2F] font-extrabold text-xs uppercase tracking-wider flex items-center gap-2 shadow-2xl transition-all"
            >
              <Download className="w-5 h-5" />
              <span>
                {downloading ? 'Preparing Download...' : 'Download Official Corporate Profile (PDF)'}
              </span>
            </button>

            <button
              onClick={() => onNavigate('downloads')}
              className="px-6 py-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/20 text-slate-200 text-xs font-semibold uppercase tracking-wider flex items-center gap-2 transition-all"
            >
              <FileCheck className="w-4 h-4 text-[#C6922D]" />
              <span>Document Download Center</span>
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};
