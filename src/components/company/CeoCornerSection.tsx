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
  Users,
  Globe,
  Award,
  ChevronRight,
  ExternalLink,
} from 'lucide-react';
import { CORPORATE_INFO } from '../../data/corporateInfo';
import { FoundersPledgeModal } from './FoundersPledgeModal';

interface CeoCornerSectionProps {
  onNavigate: (view: string) => void;
}

export const CeoCornerSection: React.FC<CeoCornerSectionProps> = ({ onNavigate }) => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <section
      id="ceo-corner-section"
      className="relative py-24 bg-[#051322] border-t border-b border-[#C6922D]/20 text-slate-100 overflow-hidden"
    >
      {/* Background blueprint grid styling */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:24px_24px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Eyebrow & Header */}
        <div className="max-w-3xl mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#C6922D]/10 border border-[#C6922D]/30 text-[#C6922D] text-xs font-bold uppercase tracking-widest font-['Montserrat'] mb-4">
            <ShieldCheck className="w-4 h-4" />
            <span>Executive Leadership &amp; Corporate Stewardship</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white font-['Montserrat'] tracking-tight">
            The CEO Corner
          </h2>
          <p className="text-base sm:text-lg text-slate-300 mt-3 font-serif italic">
            “Disciplined Development. Institutional Integrity. Enduring Value.”
          </p>
        </div>

        {/* Main Content Asymmetric Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Column A: Left 5 Cols - Official Founder's Pledge Poster Viewer Card */}
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-[#071A2F] border-2 border-[#C6922D]/30 rounded-2xl p-4 sm:p-5 shadow-2xl relative group">
              {/* Top Card Badge */}
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/10 text-xs">
                <span className="font-mono text-[#C6922D] font-bold uppercase tracking-wider text-[11px]">
                  Official Document Artifact
                </span>
                <span className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-[10px] text-slate-300">
                  DTI 4812272
                </span>
              </div>

              {/* Poster Container with object-fit: contain */}
              <div
                className="relative bg-[#020B14] rounded-xl overflow-hidden border border-white/10 cursor-pointer aspect-[3/4] flex items-center justify-center p-2 group/img"
                onClick={() => setModalOpen(true)}
                title="Click to inspect full document"
              >
                <img
                  src="/assets/images/founders-pledge.svg"
                  alt="Founder's Message & Solemn Pledge by Leodenis Deveza Languisan"
                  className="w-full h-full object-contain rounded transition-transform duration-300 group-hover/img:scale-[1.01]"
                />

                {/* Hover overlay hint */}
                <div className="absolute inset-0 bg-[#071A2F]/60 opacity-0 group-hover/img:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2 p-4 text-center backdrop-blur-xs">
                  <div className="w-11 h-11 rounded-full bg-[#C6922D] text-[#071A2F] flex items-center justify-center shadow-lg">
                    <Maximize2 className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-bold text-white uppercase tracking-wider">
                    Inspect Full Resolution Pledge
                  </span>
                  <span className="text-[11px] text-slate-300">
                    Includes zoom, pan &amp; accessible transcript
                  </span>
                </div>
              </div>

              {/* Action Bar below image */}
              <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between gap-3">
                <button
                  onClick={() => setModalOpen(true)}
                  className="text-xs text-[#C6922D] hover:text-[#e5b95d] font-semibold flex items-center gap-1.5 transition-colors"
                >
                  <Maximize2 className="w-3.5 h-3.5" />
                  <span>Open Document Viewer</span>
                </button>
                <button
                  onClick={() => onNavigate('company-profile')}
                  className="text-xs text-slate-300 hover:text-white font-medium flex items-center gap-1 transition-colors"
                >
                  <FileText className="w-3.5 h-3.5 text-[#C6922D]" />
                  <span>Corporate Profile</span>
                </button>
              </div>
            </div>

            {/* Registered Head Office Detail Box */}
            <div className="bg-[#071A2F]/60 border border-white/10 rounded-xl p-4 text-xs text-slate-300 space-y-1.5">
              <div className="font-semibold text-slate-200 flex items-center gap-2">
                <Building className="w-3.5 h-3.5 text-[#C6922D]" />
                <span>Executive Office Location:</span>
              </div>
              <p className="text-slate-400 pl-5 leading-relaxed">
                {CORPORATE_INFO.headquarters.fullFormatted}
              </p>
            </div>
          </div>

          {/* Column B: Right 7 Cols - Executive Intro & Leadership Message */}
          <div className="lg:col-span-7 space-y-8">
            {/* Executive Bio Header */}
            <div className="border-b border-white/10 pb-6">
              <div className="flex flex-wrap items-center gap-3 mb-2">
                <span className="text-xs font-mono font-bold text-[#C6922D] uppercase tracking-wider">
                  Executive Profile
                </span>
                <span className="text-xs text-slate-400">•</span>
                <span className="text-xs text-slate-400">Two Decades Multidisciplinary Leadership</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-black text-white font-['Montserrat'] tracking-tight">
                {CORPORATE_INFO.executive.publicDisplayName}
              </h3>
              <p className="text-sm sm:text-base font-semibold text-[#C6922D] mt-1 font-['Montserrat']">
                {CORPORATE_INFO.executive.professionalTitle}
              </p>

              {/* Education & Banking Discipline Credentials */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4 pt-4 border-t border-white/5 text-xs text-slate-300">
                <div className="bg-[#071A2F] p-3 rounded-lg border border-white/5">
                  <div className="text-[10px] uppercase font-bold text-slate-400">Academic Background</div>
                  <div className="font-semibold text-slate-200 mt-0.5">
                    B.Com (Banking &amp; Finance) • BSIT
                  </div>
                  <div className="text-[11px] text-slate-400 mt-0.5">
                    STI College &amp; Data Center College, Baguio
                  </div>
                </div>
                <div className="bg-[#071A2F] p-3 rounded-lg border border-white/5">
                  <div className="text-[10px] uppercase font-bold text-[#C6922D]">Banking Rigor &amp; Controls</div>
                  <div className="font-semibold text-slate-200 mt-0.5">
                    JPMorgan Chase Operations Background
                  </div>
                  <div className="text-[11px] text-slate-400 mt-0.5">
                    Mortgage servicing, underwriting audit &amp; risk controls
                  </div>
                </div>
              </div>
            </div>

            {/* Approved Leadership Message (Word-for-Word Copy) */}
            <div className="space-y-4 text-sm sm:text-base text-slate-300 leading-relaxed font-sans">
              <p className="font-serif italic text-lg text-white">
                {CORPORATE_INFO.executive.founderMessage.salutation}
              </p>

              <blockquote className="border-l-2 border-[#C6922D] pl-4 my-3 text-white font-serif italic text-base sm:text-lg">
                “{CORPORATE_INFO.executive.founderMessage.paragraphs[0]}”
              </blockquote>

              <p>{CORPORATE_INFO.executive.founderMessage.paragraphs[1]}</p>
              <p>{CORPORATE_INFO.executive.founderMessage.paragraphs[2]}</p>
              <p>{CORPORATE_INFO.executive.founderMessage.paragraphs[3]}</p>

              {/* Gratitude Statement */}
              <div className="pt-2 text-xs sm:text-sm text-slate-400 space-y-1">
                <div>{CORPORATE_INFO.executive.founderMessage.gratitude.team}</div>
                <div>{CORPORATE_INFO.executive.founderMessage.gratitude.partners}</div>
                <div>{CORPORATE_INFO.executive.founderMessage.gratitude.clients}</div>
              </div>

              <div className="pt-2 text-sm sm:text-base font-serif italic text-[#C6922D] font-bold">
                {CORPORATE_INFO.executive.founderMessage.closingCall}
              </div>
            </div>

            {/* Four Pledge Pillars Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-4">
              {CORPORATE_INFO.pledgePillars.map((pillar) => (
                <div
                  key={pillar.id}
                  className="bg-[#071A2F] border border-white/10 rounded-lg p-3 hover:border-[#C6922D]/40 transition-colors"
                >
                  <div className="text-[11px] font-bold text-[#C6922D] uppercase tracking-wider font-['Montserrat']">
                    {pillar.title}
                  </div>
                  <div className="text-[11px] text-slate-400 mt-1 leading-snug">
                    {pillar.description}
                  </div>
                </div>
              ))}
            </div>

            {/* Solemn Pledge Banner */}
            <div className="bg-[#071A2F] border border-[#C6922D]/40 rounded-xl p-5 relative overflow-hidden">
              <div className="text-[10px] font-mono uppercase tracking-widest text-[#C6922D] font-bold mb-1">
                Solemn Corporate Pledge
              </div>
              <p className="text-xs sm:text-sm text-white italic font-serif leading-relaxed">
                “We pledge to uphold the highest standards of professionalism, safety, and environmental stewardship, to empower communities, and to create value that endures beyond our time.”
              </p>
              <div className="mt-3 flex items-center justify-between text-xs text-slate-400 pt-2 border-t border-white/5">
                <span className="font-semibold text-slate-200">
                  {CORPORATE_INFO.executive.legalName}
                </span>
                <span className="text-[#C6922D] font-mono text-[11px]">Founder &amp; President</span>
              </div>
            </div>

            {/* Required Action Cluster */}
            <div className="pt-4 border-t border-white/10">
              <div className="flex flex-wrap items-center gap-3">
                {/* Primary CTA: Request a Private Consultation */}
                <button
                  onClick={() => onNavigate('book-consultation')}
                  className="px-5 py-3 rounded-lg bg-[#C6922D] hover:bg-[#d8a339] text-[#071A2F] font-bold text-xs uppercase tracking-wider transition-colors shadow-lg flex items-center gap-2"
                >
                  <span>Request a Private Consultation</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                {/* Secondary CTA: Read the Founder's Message */}
                <button
                  onClick={() => onNavigate('ceo-corner')}
                  className="px-5 py-3 rounded-lg bg-white/5 hover:bg-white/10 text-slate-200 font-semibold text-xs tracking-wider border border-white/15 transition-colors flex items-center gap-2"
                >
                  <FileText className="w-4 h-4 text-[#C6922D]" />
                  <span>Read Founder’s Message</span>
                </button>

                {/* Telephone CTA: Call Executive Office */}
                <a
                  href={CORPORATE_INFO.contacts.telephoneLink}
                  className="px-5 py-3 rounded-lg bg-[#071A2F] hover:bg-[#0a2747] text-slate-200 font-semibold text-xs tracking-wider border border-[#C6922D]/30 transition-colors flex items-center gap-2"
                >
                  <Phone className="w-4 h-4 text-[#C6922D]" />
                  <span>Call Executive Office: {CORPORATE_INFO.contacts.telephoneDisplay}</span>
                </a>
              </div>
            </div>

            {/* Statutory Compliance Note */}
            <p className="text-[11px] text-slate-500 italic leading-relaxed pt-2">
              {CORPORATE_INFO.executive.founderMessage.complianceNote}
            </p>
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
