import React, { useState } from 'react';
import {
  ShieldCheck,
  Phone,
  ArrowRight,
  Maximize2,
  FileText,
  Building,
  Scale,
  Landmark,
  GraduationCap,
  Download,
  CheckCircle2,
  Sparkles,
  Award,
} from 'lucide-react';
import { CORPORATE_INFO } from '../../data/corporateInfo';
import { FoundersPledgeModal } from './FoundersPledgeModal';

interface CeoCornerSectionProps {
  onNavigate: (view: string) => void;
}

export const CeoCornerSection: React.FC<CeoCornerSectionProps> = ({ onNavigate }) => {
  const [modalOpen, setModalOpen] = useState(false);

  const founderMessage = CORPORATE_INFO.executive.founderMessage;
  const pillars = CORPORATE_INFO.pledgePillars;

  return (
    <section
      id="ceo-corner-section"
      className="relative py-20 lg:py-24 bg-[#051322] border-t border-b border-[#C6922D]/20 text-slate-100 overflow-hidden"
    >
      {/* Background technical grid pattern */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:28px_28px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#C6922D]/10 border border-[#C6922D]/30 text-[#C6922D] text-xs font-bold uppercase tracking-widest font-['Montserrat'] mb-3">
            <ShieldCheck className="w-4 h-4 text-[#C6922D]" />
            <span>Executive Leadership &amp; Corporate Stewardship</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white font-['Montserrat'] tracking-tight">
            The CEO Corner
          </h2>
          <p className="text-base sm:text-lg text-slate-300 mt-2 font-serif italic">
            “Disciplined Development. Institutional Integrity. Enduring Value.”
          </p>
        </div>

        {/* Balanced Two-Column Architectural Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
          {/* =========================================================================
              COLUMN A: Executive Dossier & Official Artifact (5 Columns)
          ========================================================================= */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-6">
            {/* 1. Executive Identity & Institutional Pedigree */}
            <div className="bg-[#071A2F] border border-[#C6922D]/30 rounded-2xl p-6 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#C6922D]/5 rounded-bl-full pointer-events-none" />

              {/* Profile Header */}
              <div className="flex items-start gap-4 pb-5 border-b border-white/10">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#C6922D] to-[#8F6317] p-0.5 shadow-lg shrink-0">
                  <div className="w-full h-full bg-[#071A2F] rounded-[10px] flex items-center justify-center">
                    <span className="font-serif font-black text-lg text-[#C6922D] tracking-wider">
                      LDL
                    </span>
                  </div>
                </div>

                <div className="min-w-0">
                  <div className="inline-flex items-center gap-1.5 text-[10px] font-mono font-bold uppercase tracking-widest text-[#C6922D]">
                    <ShieldCheck className="w-3 h-3" />
                    <span>Executive Profile</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-black text-white font-['Montserrat'] tracking-tight truncate mt-0.5">
                    {CORPORATE_INFO.executive.publicDisplayName}
                  </h3>
                  <p className="text-xs font-semibold text-[#E5B95D] mt-0.5 truncate">
                    {CORPORATE_INFO.executive.professionalTitle}
                  </p>
                </div>
              </div>

              {/* Verified Credentials Duo */}
              <div className="mt-5 space-y-3">
                <div className="bg-[#040E1B] border border-white/5 rounded-xl p-3.5 flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#C6922D]/10 flex items-center justify-center shrink-0 mt-0.5 text-[#C6922D]">
                    <Landmark className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-[10px] uppercase font-bold text-[#C6922D] tracking-wider">
                      Banking Rigor &amp; Controls
                    </div>
                    <div className="text-xs font-semibold text-slate-200 mt-0.5">
                      JPMorgan Chase Operations Background
                    </div>
                    <div className="text-[11px] text-slate-400 mt-0.5 leading-snug">
                      Mortgage servicing, underwriting audit &amp; enterprise risk controls
                    </div>
                  </div>
                </div>

                <div className="bg-[#040E1B] border border-white/5 rounded-xl p-3.5 flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center shrink-0 mt-0.5 text-slate-300">
                    <GraduationCap className="w-4 h-4 text-[#C6922D]" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                      Academic Background
                    </div>
                    <div className="text-xs font-semibold text-slate-200 mt-0.5">
                      B.Com (Banking &amp; Finance) • BSIT
                    </div>
                    <div className="text-[11px] text-slate-400 mt-0.5 leading-snug">
                      STI College &amp; Data Center College, Baguio
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 2. Official Document Artifact Preview (Interactive) */}
            <div className="bg-[#071A2F] border border-white/10 rounded-2xl p-5 shadow-xl relative group flex-1 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/10 text-xs">
                  <span className="font-mono text-[#C6922D] font-bold uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                    <Award className="w-3.5 h-3.5" />
                    <span>Official Document Artifact</span>
                  </span>
                  <span className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-[10px] font-mono text-slate-300">
                    DTI 4812272
                  </span>
                </div>

                {/* Poster Preview Frame */}
                <div
                  className="relative bg-[#020B14] rounded-xl overflow-hidden border border-white/10 cursor-pointer aspect-[3/4] max-h-[320px] mx-auto flex items-center justify-center p-2 group/img"
                  onClick={() => setModalOpen(true)}
                  title="Click to inspect full high-resolution document"
                >
                  <img
                    src="/assets/images/founders-pledge.svg"
                    alt="Founder's Message & Solemn Pledge by Leodenis Deveza Languisan"
                    className="w-full h-full object-contain rounded transition-transform duration-300 group-hover/img:scale-[1.02]"
                  />

                  {/* Hover overlay hint */}
                  <div className="absolute inset-0 bg-[#071A2F]/70 opacity-0 group-hover/img:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2 p-4 text-center backdrop-blur-xs">
                    <div className="w-10 h-10 rounded-full bg-[#C6922D] text-[#071A2F] flex items-center justify-center shadow-lg">
                      <Maximize2 className="w-5 h-5" />
                    </div>
                    <span className="text-xs font-bold text-white uppercase tracking-wider">
                      Inspect Full Resolution Pledge
                    </span>
                    <span className="text-[11px] text-slate-300">
                      Zoom, pan &amp; accessible transcript
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Bar below artifact */}
              <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between gap-3 text-xs">
                <button
                  onClick={() => setModalOpen(true)}
                  className="text-xs text-[#C6922D] hover:text-[#e5b95d] font-semibold flex items-center gap-1.5 transition-colors"
                >
                  <Maximize2 className="w-3.5 h-3.5" />
                  <span>Open Document Viewer</span>
                </button>
                <button
                  onClick={() => onNavigate('company-profile')}
                  className="text-xs text-slate-300 hover:text-white font-medium flex items-center gap-1.5 transition-colors"
                >
                  <FileText className="w-3.5 h-3.5 text-[#C6922D]" />
                  <span>Corporate Profile</span>
                </button>
              </div>
            </div>

            {/* 3. Executive Office Location & Contact */}
            <div className="bg-[#071A2F]/70 border border-white/10 rounded-xl p-4 text-xs text-slate-300 flex items-start gap-3">
              <Building className="w-4 h-4 text-[#C6922D] shrink-0 mt-0.5" />
              <div className="min-w-0 leading-relaxed">
                <div className="font-semibold text-slate-200">
                  Executive Office Location:
                </div>
                <div className="text-slate-400 text-[11px] mt-0.5">
                  {CORPORATE_INFO.headquarters.fullFormatted}
                </div>
              </div>
            </div>
          </div>

          {/* =========================================================================
              COLUMN B: Official Executive Address & Solemn Covenant (7 Columns)
          ========================================================================= */}
          <div className="lg:col-span-7 bg-[#071A2F]/90 border border-[#C6922D]/30 rounded-2xl p-6 sm:p-8 lg:p-9 shadow-2xl relative overflow-hidden backdrop-blur-sm flex flex-col justify-between">
            {/* Watermark Crest */}
            <div className="absolute -bottom-10 -right-10 w-64 h-64 opacity-[0.025] pointer-events-none">
              <ShieldCheck className="w-full h-full text-[#C6922D]" />
            </div>

            <div>
              {/* Communiqué Top Header */}
              <div className="flex flex-wrap items-center justify-between gap-2 pb-4 mb-6 border-b border-white/10 text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#C6922D] animate-pulse" />
                  <span className="font-mono text-[#C6922D] font-bold uppercase tracking-widest text-[11px]">
                    Official Executive Address
                  </span>
                </div>
                <span className="text-slate-400 font-mono text-[11px]">
                  Republic of the Philippines • RA 9266 &amp; RA 544
                </span>
              </div>

              {/* Salutation */}
              <div className="mb-4">
                <h3 className="text-xl sm:text-2xl font-bold text-white font-serif tracking-tight">
                  {founderMessage.salutation}
                </h3>
              </div>

              {/* Guiding Principle / Pullquote */}
              <div className="my-5 p-4 sm:p-5 rounded-xl bg-gradient-to-r from-[#C6922D]/10 via-[#071A2F] to-[#071A2F] border-l-4 border-[#C6922D]">
                <blockquote className="text-white font-serif italic text-base sm:text-lg leading-relaxed">
                  “{founderMessage.quote || founderMessage.paragraphs[0]}”
                </blockquote>
              </div>

              {/* Core Narrative Paragraphs */}
              <div className="space-y-4 text-sm sm:text-base text-slate-300 leading-relaxed font-sans">
                {founderMessage.paragraphs.map((p, index) => (
                  <p key={index} className="text-slate-300 text-justify sm:text-left">
                    {p}
                  </p>
                ))}
              </div>

              {/* Four Pillars of Stewardship */}
              <div className="my-6 pt-6 border-t border-white/10">
                <div className="text-[10px] font-mono uppercase tracking-widest text-[#C6922D] font-bold mb-3">
                  Four Pillars of Institutional Stewardship
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {pillars.map((pillar) => (
                    <div
                      key={pillar.id}
                      className="bg-[#051322] border border-white/10 rounded-xl p-3.5 hover:border-[#C6922D]/40 transition-colors"
                    >
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#C6922D] shrink-0" />
                        <span className="text-xs font-bold text-white uppercase tracking-wider font-['Montserrat']">
                          {pillar.title}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-400 mt-1 pl-5.5 leading-snug">
                        {pillar.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Gratitude Statement */}
              <div className="bg-[#051322]/80 border border-white/5 rounded-xl p-4 text-xs text-slate-400 space-y-1.5">
                <div className="flex items-center gap-2 text-slate-300 font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C6922D]" />
                  <span>{founderMessage.gratitude.team}</span>
                </div>
                <div className="flex items-center gap-2 text-slate-300 font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C6922D]" />
                  <span>{founderMessage.gratitude.partners}</span>
                </div>
                <div className="flex items-center gap-2 text-slate-300 font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C6922D]" />
                  <span>{founderMessage.gratitude.clients}</span>
                </div>
              </div>

              {/* Closing Call */}
              <div className="mt-4 text-sm sm:text-base font-serif italic text-[#C6922D] font-bold">
                {founderMessage.closingCall}
              </div>

              {/* Solemn Pledge & Official Sign-off */}
              <div className="mt-6 pt-5 border-t border-white/10 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                <div className="space-y-1">
                  <div className="text-[10px] font-mono uppercase tracking-widest text-slate-400 font-bold">
                    Solemn Corporate Pledge
                  </div>
                  <p className="text-xs text-slate-300 italic font-serif max-w-lg leading-relaxed">
                    “{founderMessage.solemnPledge}”
                  </p>
                  <div className="pt-2">
                    <div className="font-bold text-white text-sm font-['Montserrat'] tracking-wide">
                      {CORPORATE_INFO.executive.legalName}
                    </div>
                    <div className="text-xs text-[#C6922D] font-medium">
                      Founder, President &amp; Chief Executive Officer
                    </div>
                  </div>
                </div>

                <div className="sm:text-right shrink-0 text-[11px] font-mono text-slate-400 border-t sm:border-t-0 pt-2 sm:pt-0 border-white/5">
                  <div className="text-slate-300 font-bold">LDL Dhenze Residential Building Construction</div>
                  <div>DTI Certificate No. 4812272</div>
                  <div className="text-[10px] text-[#C6922D]">KMC | One West Aeropark, Clark Pampanga</div>
                </div>
              </div>
            </div>

            {/* Action Buttons Cluster */}
            <div className="mt-8 pt-6 border-t border-white/10 flex flex-wrap items-center gap-3">
              <button
                onClick={() => onNavigate('book-consultation')}
                className="px-5 py-3 rounded-xl bg-[#C6922D] hover:bg-[#d8a339] text-[#071A2F] font-bold text-xs uppercase tracking-wider transition-colors shadow-lg flex items-center gap-2 cursor-pointer"
              >
                <span>Request Private Consultation</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => onNavigate('company-profile')}
                className="px-5 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-slate-200 font-semibold text-xs tracking-wider border border-white/15 transition-colors flex items-center gap-2 cursor-pointer"
              >
                <FileText className="w-4 h-4 text-[#C6922D]" />
                <span>View Corporate Profile</span>
              </button>

              <a
                href={CORPORATE_INFO.contacts.telephoneLink}
                className="px-5 py-3 rounded-xl bg-[#040E1B] hover:bg-[#071a2f] text-slate-300 hover:text-white font-medium text-xs tracking-wider border border-[#C6922D]/30 transition-colors flex items-center gap-2"
              >
                <Phone className="w-3.5 h-3.5 text-[#C6922D]" />
                <span>{CORPORATE_INFO.contacts.telephoneDisplay}</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Accessible Full-Resolution Modal Viewer */}
      <FoundersPledgeModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onNavigate={onNavigate}
      />
    </section>
  );
};

