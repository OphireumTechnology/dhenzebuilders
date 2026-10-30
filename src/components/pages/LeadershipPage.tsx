import React, { useState } from 'react';
import {
  ShieldCheck,
  Award,
  Landmark,
  GraduationCap,
  Scale,
  Compass,
  FileText,
  Download,
  CheckCircle2,
  Phone,
  Mail,
  MapPin,
  ExternalLink,
  BookOpen,
  ArrowRight,
  Sparkles,
  Users,
  Lightbulb,
  Building2,
  Cpu,
} from 'lucide-react';
import {
  OFFICIAL_CEO_PROFILE,
  OFFICIAL_PROFILE_METADATA,
} from '../../data/companyProfileData';
import { CompanyLogo } from '../common/CompanyLogo';

interface LeadershipPageProps {
  onNavigate: (view: string) => void;
  onOpenAssistant?: () => void;
}

export const LeadershipPage: React.FC<LeadershipPageProps> = ({
  onNavigate,
  onOpenAssistant,
}) => {
  const [downloading, setDownloading] = useState(false);

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

  return (
    <div className="min-h-screen bg-[#071A2F] text-slate-100 pt-28 pb-24 selection:bg-[#C6922D] selection:text-[#071A2F]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* ---------------------------------------------------- */}
        {/* 1. EXECUTIVE HERO HEADER */}
        {/* ---------------------------------------------------- */}
        <div className="border-b border-[#C6922D]/25 pb-10">
          <div className="flex items-center gap-2 text-[#C69A4B] text-xs font-bold uppercase tracking-widest font-['Montserrat'] mb-3">
            <span className="w-4 h-[1.5px] bg-[#C69A4B]" />
            <ShieldCheck className="w-4 h-4 text-[#C69A4B]" />
            <span>Executive Governance &amp; Corporate Leadership</span>
          </div>

          <h1 className="text-2xl sm:text-4xl lg:text-[44px] font-bold text-white font-['Montserrat'] tracking-tight leading-tight">
            Founder &amp; Chief Executive Officer
          </h1>

          <div className="mt-3 flex flex-wrap items-center gap-4 text-sm text-slate-300">
            <span className="font-bold text-[#E5B95D] text-base sm:text-lg">
              {OFFICIAL_CEO_PROFILE.fullName}
            </span>
            <span>•</span>
            <span className="text-slate-200">{OFFICIAL_CEO_PROFILE.role}</span>
            <span>•</span>
            <span className="text-slate-400 font-mono text-xs">
              LDL Dhenze Residential Building Construction
            </span>
          </div>
        </div>

        {/* ---------------------------------------------------- */}
        {/* 2. OFFICIAL CEO PRESENTATION: PHOTOGRAPH & OVERVIEW */}
        {/* ---------------------------------------------------- */}
        <section className="bg-[#09223D] border-2 border-[#C6922D]/40 rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* Left 6 Columns: Authentic CEO Photograph */}
            <div className="lg:col-span-6 flex flex-col items-center">
              <div className="relative w-full rounded-2xl overflow-hidden border-2 border-[#C6922D]/50 shadow-2xl bg-[#040E1B] group">
                <img
                  src={OFFICIAL_CEO_PROFILE.photoUrl}
                  alt="Leodenis Deveza Languisan, Founder and CEO of LDL Dhenze Residential Building Construction"
                  className="w-full h-auto object-cover object-center block transform group-hover:scale-[1.01] transition-transform duration-500"
                  loading="eager"
                />
                {/* Subtle gold accent frame line */}
                <div className="absolute inset-0 border border-white/10 rounded-2xl pointer-events-none" />
                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-[#071A2F]/95 via-[#071A2F]/70 to-transparent p-4 sm:p-5 text-center">
                  <div className="text-xs font-mono font-bold text-[#E5B95D] uppercase tracking-wider">
                    {OFFICIAL_CEO_PROFILE.fullName}
                  </div>
                  <div className="text-[11px] text-slate-300">
                    Founder and Chief Executive Officer • Corporate Reception Office
                  </div>
                </div>
              </div>
              <p className="text-[11px] text-slate-400 italic text-center mt-3 max-w-md">
                {OFFICIAL_CEO_PROFILE.photoCaption}
              </p>
            </div>

            {/* Right 6 Columns: Executive Introduction & Core Principles */}
            <div className="lg:col-span-6 space-y-6">
              <div>
                <div className="text-xs font-mono font-bold text-[#C6922D] uppercase tracking-widest">
                  Executive Leadership
                </div>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white font-['Montserrat'] mt-1">
                  {OFFICIAL_CEO_PROFILE.fullName}
                </h2>
                <div className="text-sm font-semibold text-[#E5B95D] mt-1">
                  {OFFICIAL_CEO_PROFILE.role}
                </div>
                <div className="text-xs text-slate-400 mt-0.5">
                  LDL Dhenze Residential Building Construction
                </div>
              </div>

              {/* Lead Motto from Profile */}
              <div className="bg-[#051322] border-l-4 border-[#C6922D] p-4 rounded-r-xl">
                <p className="text-sm sm:text-base font-serif italic text-slate-200 leading-relaxed">
                  “We Build Today. We Engineer Tomorrow. We Empower Generations. One Vision. One Company. Limitless Possibilities.”
                </p>
              </div>

              {/* Career Narrative Summary */}
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Leodenis Deveza Languisan brings to LDL Dhenze a multidisciplinary professional background spanning more than two decades across banking and financial services, corporate leadership, business development, operations, construction, cooperatives, technology, and financial markets. His professional foundation combines financial discipline, commercial experience, operational management, stakeholder relations, regulatory awareness, and strategic leadership.
              </p>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-wrap items-center gap-3">
                <button
                  onClick={handleDownloadProfile}
                  disabled={downloading}
                  className="px-5 py-3 rounded-xl bg-[#C6922D] hover:bg-[#d8a339] text-[#071A2F] font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow-lg transition-all"
                >
                  <Download className="w-4 h-4" />
                  <span>
                    {downloading ? 'Preparing Download...' : 'Download Corporate Profile (PDF)'}
                  </span>
                </button>

                <button
                  onClick={() => onNavigate('corporate-profile')}
                  className="px-5 py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/20 text-slate-200 text-xs font-semibold uppercase tracking-wider flex items-center gap-2 transition-all"
                >
                  <FileText className="w-4 h-4 text-[#C6922D]" />
                  <span>View Full Profile Online</span>
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* ---------------------------------------------------- */}
        {/* 3. FOUNDER'S MESSAGE (VERBATIM FROM PAGE 2 OF PROFILE) */}
        {/* ---------------------------------------------------- */}
        <section className="bg-[#081F38] border border-white/10 rounded-3xl p-6 sm:p-10 lg:p-12 shadow-xl space-y-8">
          <div className="max-w-3xl">
            <div className="text-xs font-mono font-bold text-[#C6922D] uppercase tracking-widest">
              Official Executive Address
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white font-['Montserrat'] mt-1">
              Founder’s Message
            </h2>
            <div className="text-xs text-slate-400 font-mono mt-1">
              To Our Clients, Partners, and Future Generations
            </div>
          </div>

          <div className="prose prose-invert max-w-none text-slate-200 text-sm sm:text-base leading-relaxed space-y-4">
            <p className="font-serif italic text-lg sm:text-xl text-[#E5B95D] border-l-2 border-[#C6922D] pl-4">
              When we build, we do not merely raise structures. We build opportunities. We build progress. We build legacies. And above all, we build trust.
            </p>

            <p>
              At LDL Dhenze Residential Building Construction, our mission is clear: to lawfully deliver world-class infrastructure and integrated solutions that improve lives and strengthen the nation—today, tomorrow, and for generations to come.
            </p>

            <p>
              Our commitment is anchored on integrity that never compromises, quality that never fails, and innovation that creates lasting value. We embrace technology, renewable energy, and Artificial Intelligence as tools to design smarter, build stronger, and operate more responsibly.
            </p>

            <p>
              We understand that every project we undertake carries public trust and a legal responsibility. That is why we strictly comply with all applicable laws, codes, and regulatory standards of the Republic of the Philippines. We build with discipline. We manage with transparency. We deliver with honor.
            </p>

            <p>
              To our team—thank you for your dedication.
              <br />
              To our partners—thank you for your confidence.
              <br />
              To our clients—thank you for allowing us to be part of your vision.
            </p>

            <p className="font-bold text-white">
              Together, let us continue building a better Philippines—stronger, smarter, and more sustainable.
            </p>
          </div>

          {/* Founder Signature Area */}
          <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="font-serif font-black text-xl text-white tracking-wide">
                LEODENIS DEVEZA LANGUISAN
              </div>
              <div className="text-xs text-[#C6922D] font-semibold mt-0.5">
                Founder &amp; Chief Executive Officer
              </div>
              <div className="text-[11px] text-slate-400 mt-0.5">
                LDL Dhenze Residential Building Construction
              </div>
            </div>

            <div className="flex items-center gap-3">
              <CompanyLogo variant="emblem" size="md" />
            </div>
          </div>
        </section>

        {/* ---------------------------------------------------- */}
        {/* 4. THE FOUR-PILLAR PLEDGE */}
        {/* ---------------------------------------------------- */}
        <section className="space-y-6">
          <div className="text-center max-w-2xl mx-auto">
            <div className="text-xs font-mono font-bold text-[#C6922D] uppercase tracking-widest">
              Our Solemn Pledge
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white font-['Montserrat'] mt-1">
              Guiding Principles of Corporate Conduct
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {OFFICIAL_CEO_PROFILE.fourPillarsPledge.map((pillar, idx) => (
              <div
                key={idx}
                className="bg-[#09223D] border border-white/10 rounded-2xl p-6 hover:border-[#C6922D]/40 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-[#C6922D]/15 text-[#C6922D] flex items-center justify-center font-black text-sm mb-4">
                    0{idx + 1}
                  </div>
                  <h3 className="text-base font-bold text-white font-['Montserrat'] mb-2">
                    {pillar.name}
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {pillar.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ---------------------------------------------------- */}
        {/* 5. EDUCATIONAL FOUNDATION & BANKING EXPERIENCE */}
        {/* ---------------------------------------------------- */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Column: Educational Foundation */}
          <div className="lg:col-span-6 bg-[#081F38] border border-white/10 rounded-3xl p-6 sm:p-8 flex flex-col justify-between space-y-6">
            <div>
              <div className="flex items-center gap-3 pb-4 border-b border-white/10">
                <div className="w-10 h-10 rounded-xl bg-[#C6922D]/20 text-[#C6922D] flex items-center justify-center">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[10px] font-mono font-bold text-[#C6922D] uppercase tracking-wider">
                    Academic Background
                  </div>
                  <h3 className="text-lg font-bold text-white font-['Montserrat']">
                    Educational Foundation
                  </h3>
                </div>
              </div>

              <div className="mt-6 space-y-4">
                {OFFICIAL_CEO_PROFILE.educationalFoundation.map((edu, i) => (
                  <div
                    key={i}
                    className="bg-[#051322] border border-white/5 rounded-xl p-4 space-y-1"
                  >
                    <div className="text-sm font-bold text-white">
                      {edu.degree}
                    </div>
                    <div className="text-xs font-semibold text-[#E5B95D]">
                      {edu.major}
                    </div>
                    <div className="text-xs text-slate-300">
                      {edu.institution}
                    </div>
                    <div className="text-[11px] text-slate-400 italic pt-1">
                      {edu.significance}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <p className="text-xs text-slate-400 italic border-t border-white/10 pt-4 leading-relaxed">
              The combination of finance and information technology is particularly relevant to LDL Dhenze’s intended evolution from a traditional construction enterprise toward an integrated platform involving engineering, renewable energy, technological solutions, smart infrastructure, and artificial intelligence.
            </p>
          </div>

          {/* Right Column: Banking Experience & Governance Foundation */}
          <div className="lg:col-span-6 bg-[#081F38] border border-white/10 rounded-3xl p-6 sm:p-8 flex flex-col justify-between space-y-6">
            <div>
              <div className="flex items-center gap-3 pb-4 border-b border-white/10">
                <div className="w-10 h-10 rounded-xl bg-[#C6922D]/20 text-[#C6922D] flex items-center justify-center">
                  <Landmark className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[10px] font-mono font-bold text-[#C6922D] uppercase tracking-wider">
                    Institutional Governance
                  </div>
                  <h3 className="text-lg font-bold text-white font-['Montserrat']">
                    JPMorgan Chase Bank Career Experience
                  </h3>
                </div>
              </div>

              <div className="mt-6 space-y-4 text-xs sm:text-sm text-slate-300 leading-relaxed">
                <p>
                  His career includes experience with <span className="font-bold text-white">JPMorgan Chase Bank</span> in mortgage and auto-loan operations, where his responsibilities included account servicing, payment processing and reconciliation, client issue resolution, coordination with underwriting and collections teams, and adherence to internal banking policies, risk controls, consumer-protection requirements, and data-privacy standards.
                </p>

                <div className="bg-[#051322] border border-[#C6922D]/25 rounded-xl p-4">
                  <div className="text-xs font-bold text-[#E5B95D] uppercase tracking-wider mb-1">
                    Corporate Rigor &amp; Risk Discipline
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {OFFICIAL_CEO_PROFILE.bankingExperience.takeaway}
                  </p>
                </div>
              </div>
            </div>

            <div className="border-t border-white/10 pt-4 text-xs text-slate-400">
              <span className="text-[#C6922D] font-bold">Foundation for LDL Dhenze:</span> Comprehensive exposure across financial analysis, budgeting, cash-flow management, procurement, compliance, and enterprise risk management.
            </div>
          </div>
        </section>

        {/* ---------------------------------------------------- */}
        {/* 6. LEADERSHIP PHILOSOPHY (5 TENETS) */}
        {/* ---------------------------------------------------- */}
        <section className="bg-[#09223D] border border-white/10 rounded-3xl p-6 sm:p-10 shadow-xl space-y-8">
          <div className="max-w-3xl">
            <div className="text-xs font-mono font-bold text-[#C6922D] uppercase tracking-widest">
              Executive Governance
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white font-['Montserrat'] mt-1">
              Leadership Philosophy
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-2">
              The founder’s operating philosophy anchors every project undertaken by LDL Dhenze on five foundational pillars.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {OFFICIAL_CEO_PROFILE.leadershipPhilosophy.map((phil, i) => (
              <div
                key={i}
                className="bg-[#051322] border border-white/5 rounded-2xl p-6 hover:border-[#C6922D]/40 transition-colors"
              >
                <div className="w-8 h-8 rounded-lg bg-[#C6922D]/15 text-[#C6922D] flex items-center justify-center font-bold text-xs mb-3">
                  0{i + 1}
                </div>
                <h3 className="text-base font-bold text-white font-['Montserrat'] mb-2">
                  {phil.title}
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {phil.description}
                </p>
              </div>
            ))}

            {/* Founder's Vision Callout */}
            <div className="bg-gradient-to-br from-[#071A2F] to-[#0D2E54] border border-[#C6922D]/40 rounded-2xl p-6 flex flex-col justify-between">
              <div>
                <div className="text-[10px] font-mono font-bold text-[#C6922D] uppercase tracking-wider mb-2">
                  Founder’s Vision
                </div>
                <p className="text-xs sm:text-sm font-serif italic text-white leading-relaxed">
                  “{OFFICIAL_CEO_PROFILE.founderVision}”
                </p>
              </div>
              <div className="text-[11px] text-[#E5B95D] font-bold font-mono mt-4">
                — Leodenis Deveza Languisan
              </div>
            </div>
          </div>
        </section>

        {/* ---------------------------------------------------- */}
        {/* 7. REGULATORY COMPLIANCE NOTICE & DOCUMENT CTA */}
        {/* ---------------------------------------------------- */}
        <section className="bg-[#040E1B] border border-amber-500/30 rounded-2xl p-6 sm:p-8 space-y-4">
          <div className="flex items-start gap-3">
            <Scale className="w-5 h-5 text-[#C6922D] shrink-0 mt-0.5" />
            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#C6922D]">
                Regulatory Disclosure &amp; Executive Profile Notice
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                {OFFICIAL_CEO_PROFILE.regulatoryDisclaimer}
              </p>
              <div className="pt-2 flex flex-wrap items-center gap-3">
                <button
                  onClick={() => onNavigate('corporate-profile')}
                  className="text-xs text-[#E5B95D] hover:underline font-semibold flex items-center gap-1"
                >
                  <span>Explore the complete 27-Page Corporate Profile</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
