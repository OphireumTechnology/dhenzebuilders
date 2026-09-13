import React, { useState } from 'react';
import {
  ShieldCheck,
  Phone,
  Mail,
  MapPin,
  Building,
  GraduationCap,
  Landmark,
  Scale,
  Users,
  Globe,
  Award,
  ArrowRight,
  Maximize2,
  FileText,
  Download,
  CheckCircle2,
  Lock,
} from 'lucide-react';
import { CORPORATE_INFO } from '../../data/corporateInfo';
import { FoundersPledgeModal } from '../company/FoundersPledgeModal';

interface CeoCornerPageProps {
  onNavigate: (view: string) => void;
  onOpenAssistant?: () => void;
}

export const CeoCornerPage: React.FC<CeoCornerPageProps> = ({
  onNavigate,
  onOpenAssistant,
}) => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#051322] text-slate-100 pt-28 pb-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Page Header */}
        <div className="border-b border-[#C6922D]/20 pb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#C6922D]/10 border border-[#C6922D]/30 text-[#C6922D] text-xs font-bold uppercase tracking-widest font-['Montserrat'] mb-4">
            <ShieldCheck className="w-4 h-4" />
            <span>Executive Governance &amp; Leadership</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white font-['Montserrat'] tracking-tight">
            Founder’s Message &amp; CEO Corner
          </h1>

          <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-slate-300">
            <span className="font-semibold text-[#C6922D]">
              {CORPORATE_INFO.executive.publicDisplayName}
            </span>
            <span>•</span>
            <span>{CORPORATE_INFO.executive.professionalTitle}</span>
            <span>•</span>
            <span className="text-slate-400">Executive Office, Clark Freeport Zone</span>
          </div>
        </div>

        {/* Top Feature Grid: Image Poster & Executive Intro */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Official Poster Artifact with Viewer Trigger */}
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-[#071A2F] border-2 border-[#C6922D]/30 rounded-2xl p-5 shadow-2xl relative">
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/10 text-xs">
                <span className="font-mono text-[#C6922D] font-bold uppercase tracking-wider text-[11px]">
                  Solemn Pledge Artifact
                </span>
                <span className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-[10px] text-slate-300">
                  DTI 4812272
                </span>
              </div>

              <div
                className="relative bg-[#020B14] rounded-xl overflow-hidden border border-white/10 cursor-pointer aspect-[3/4] flex items-center justify-center p-2 group"
                onClick={() => setModalOpen(true)}
                title="Click to open interactive document viewer"
              >
                <img
                  src="/assets/images/founders-pledge.svg"
                  alt="Founder's Message & Solemn Pledge by Leodenis Deveza Languisan"
                  className="w-full h-full object-contain rounded transition-transform duration-300 group-hover:scale-[1.01]"
                />

                <div className="absolute inset-0 bg-[#071A2F]/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2 p-4 text-center backdrop-blur-xs">
                  <div className="w-12 h-12 rounded-full bg-[#C6922D] text-[#071A2F] flex items-center justify-center shadow-xl">
                    <Maximize2 className="w-6 h-6" />
                  </div>
                  <span className="text-xs font-bold text-white uppercase tracking-wider">
                    Click to Open Full Document Viewer
                  </span>
                  <span className="text-[11px] text-slate-300">
                    High-resolution zoom, pan, and accessible text
                  </span>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between gap-3 text-xs">
                <button
                  onClick={() => setModalOpen(true)}
                  className="text-[#C6922D] hover:text-[#e5b95d] font-semibold flex items-center gap-1.5 transition-colors"
                >
                  <Maximize2 className="w-3.5 h-3.5" />
                  <span>Full Screen Viewer</span>
                </button>
                <a
                  href="/assets/images/founders-pledge.svg"
                  download="LDL-Dhenze-Founders-Pledge.svg"
                  className="text-slate-300 hover:text-white font-medium flex items-center gap-1 transition-colors"
                >
                  <Download className="w-3.5 h-3.5 text-[#C6922D]" />
                  <span>Save Copy</span>
                </a>
              </div>
            </div>

            {/* Quick Contact Box */}
            <div className="bg-[#071A2F] border border-white/10 rounded-xl p-5 space-y-3 text-xs text-slate-300">
              <div className="font-bold text-white uppercase tracking-wider text-[11px] text-[#C6922D]">
                Executive Office Direct Contact
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2.5">
                  <Phone className="w-4 h-4 text-[#C6922D] shrink-0" />
                  <a
                    href={CORPORATE_INFO.contacts.telephoneLink}
                    className="hover:text-[#C6922D] transition-colors font-semibold text-slate-200"
                  >
                    {CORPORATE_INFO.contacts.telephoneDisplay}
                  </a>
                </div>
                <div className="flex items-start gap-2.5">
                  <Mail className="w-4 h-4 text-[#C6922D] shrink-0 mt-0.5" />
                  <div className="space-y-0.5">
                    <a
                      href={`mailto:${CORPORATE_INFO.contacts.primaryEmail}`}
                      className="hover:text-[#C6922D] transition-colors block text-slate-200"
                    >
                      {CORPORATE_INFO.contacts.primaryEmail}
                    </a>
                    <a
                      href={`mailto:${CORPORATE_INFO.contacts.secondaryEmail}`}
                      className="hover:text-[#C6922D] transition-colors block text-slate-400 text-[11px]"
                    >
                      {CORPORATE_INFO.contacts.secondaryEmail}
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-2.5 pt-1 border-t border-white/5">
                  <MapPin className="w-4 h-4 text-[#C6922D] shrink-0 mt-0.5" />
                  <span className="text-slate-400 leading-snug">
                    {CORPORATE_INFO.headquarters.fullFormatted}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Full Leadership Message & Executive Context */}
          <div className="lg:col-span-7 space-y-8">
            {/* Leadership Message Card */}
            <div className="bg-[#071A2F] border border-white/10 rounded-2xl p-6 sm:p-8 space-y-6">
              <div className="border-b border-white/10 pb-4">
                <div className="text-xs font-mono uppercase tracking-widest text-[#C6922D] font-bold">
                  Official Message from the Founder
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-white font-['Montserrat'] mt-1">
                  Building Foundations. Delivering Excellence.
                </h2>
              </div>

              <div className="space-y-4 text-slate-300 leading-relaxed text-sm sm:text-base font-sans">
                <p className="font-serif italic text-lg text-white font-semibold">
                  {CORPORATE_INFO.executive.founderMessage.salutation}
                </p>

                <blockquote className="border-l-4 border-[#C6922D] pl-4 py-1 text-white font-serif italic text-lg">
                  “{CORPORATE_INFO.executive.founderMessage.paragraphs[0]}”
                </blockquote>

                <p>{CORPORATE_INFO.executive.founderMessage.paragraphs[1]}</p>
                <p>{CORPORATE_INFO.executive.founderMessage.paragraphs[2]}</p>
                <p>{CORPORATE_INFO.executive.founderMessage.paragraphs[3]}</p>

                {/* Gratitude */}
                <div className="pt-3 border-t border-white/10 text-xs sm:text-sm text-slate-400 space-y-1">
                  <div>{CORPORATE_INFO.executive.founderMessage.gratitude.team}</div>
                  <div>{CORPORATE_INFO.executive.founderMessage.gratitude.partners}</div>
                  <div>{CORPORATE_INFO.executive.founderMessage.gratitude.clients}</div>
                </div>

                <div className="pt-2 text-sm sm:text-base font-serif italic text-[#C6922D] font-bold">
                  {CORPORATE_INFO.executive.founderMessage.closingCall}
                </div>

                {/* Sign-off */}
                <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                  <div>
                    <div className="font-bold text-white text-base">
                      {CORPORATE_INFO.executive.legalName}
                    </div>
                    <div className="text-xs text-[#C6922D]">
                      {CORPORATE_INFO.executive.professionalTitle}
                    </div>
                  </div>
                  <div className="text-right text-[11px] font-mono text-slate-500">
                    <div>Republic of the Philippines</div>
                    <div>DTI Registration No. 4812272</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Academic & Banking Credentials Breakdown */}
            <div className="bg-[#071A2F] border border-white/10 rounded-2xl p-6 sm:p-8 space-y-5">
              <h3 className="text-base font-bold text-white uppercase tracking-wider font-['Montserrat'] flex items-center gap-2">
                <GraduationCap className="w-5 h-5 text-[#C6922D]" />
                <span>Executive Background &amp; Institutional Governance</span>
              </h3>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {CORPORATE_INFO.executive.executiveSummary}
              </p>

              <div className="bg-[#051322] border border-[#C6922D]/30 rounded-xl p-5 space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-[#C6922D] uppercase tracking-wider">
                  <Landmark className="w-4 h-4" />
                  <span>Banking Risk Controls (JPMorgan Chase Operations Foundation)</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {CORPORATE_INFO.executive.bankingBackground}
                </p>
              </div>

              {/* Education Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {CORPORATE_INFO.executive.education.map((edu, idx) => (
                  <div key={idx} className="bg-[#051322] p-3.5 rounded-lg border border-white/5 text-xs">
                    <div className="font-semibold text-slate-200">{edu.degree}</div>
                    <div className="text-slate-400 text-[11px] mt-1">
                      {edu.institution}, {edu.location}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3 pt-2">
              <button
                onClick={() => onNavigate('book-consultation')}
                className="px-6 py-3.5 rounded-lg bg-[#C6922D] hover:bg-[#d8a339] text-[#071A2F] font-bold text-xs uppercase tracking-wider transition-colors shadow-lg flex items-center gap-2"
              >
                <span>Request Private Consultation</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => onNavigate('company-profile')}
                className="px-6 py-3.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-200 font-semibold text-xs tracking-wider border border-white/15 transition-colors flex items-center gap-2"
              >
                <FileText className="w-4 h-4 text-[#C6922D]" />
                <span>View Complete Corporate Profile</span>
              </button>

              <a
                href={CORPORATE_INFO.contacts.telephoneLink}
                className="px-6 py-3.5 rounded-lg bg-[#071A2F] hover:bg-[#0a2747] text-slate-200 font-semibold text-xs tracking-wider border border-[#C6922D]/30 transition-colors flex items-center gap-2"
              >
                <Phone className="w-4 h-4 text-[#C6922D]" />
                <span>Call Executive Office: {CORPORATE_INFO.contacts.telephoneDisplay}</span>
              </a>
            </div>
          </div>
        </div>

        {/* The 4 Pledge Pillars & 7 Core Values Sections */}
        <div className="space-y-10 pt-8 border-t border-white/10">
          <div>
            <div className="text-xs font-mono uppercase tracking-widest text-[#C6922D] font-bold mb-1">
              Foundational Principles
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white font-['Montserrat']">
              The Four Pledge Pillars
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {CORPORATE_INFO.pledgePillars.map((pillar) => (
              <div
                key={pillar.id}
                className="bg-[#071A2F] border border-white/10 rounded-xl p-5 hover:border-[#C6922D]/40 transition-colors space-y-2"
              >
                <div className="w-9 h-9 rounded-lg bg-[#C6922D]/10 text-[#C6922D] flex items-center justify-center">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <h3 className="text-sm font-bold text-white uppercase tracking-wider font-['Montserrat']">
                  {pillar.title}
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">{pillar.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* 7 Core Values */}
        <div className="space-y-6 pt-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
            <div>
              <div className="text-xs font-mono uppercase tracking-widest text-[#C6922D] font-bold mb-1">
                Institutional Conduct
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white font-['Montserrat']">
                Seven Core Corporate Values
              </h2>
            </div>
            <p className="text-xs text-slate-400">
              Corporate Profile Page 2 &amp; Page 25
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {CORPORATE_INFO.coreValues.map((val) => (
              <div
                key={val.id}
                className="bg-[#071A2F] border border-white/10 rounded-xl p-5 space-y-2 hover:border-[#C6922D]/30 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-[#C6922D] font-bold">{val.principleNumber}</span>
                  <span className="text-xs text-slate-400 italic">{val.tagline}</span>
                </div>
                <h3 className="text-base font-bold text-white font-['Montserrat']">{val.name}</h3>
                <p className="text-xs text-slate-300 leading-relaxed">{val.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Mandatory Statutory Statement Footer */}
        <div className="bg-[#071A2F]/60 border border-white/10 rounded-xl p-6 text-xs text-slate-400 leading-relaxed">
          <strong className="text-slate-300">Statutory Notice &amp; Practice Boundaries: </strong>
          {CORPORATE_INFO.statutoryNotice}
        </div>
      </div>

      {/* Interactive Modal Viewer */}
      <FoundersPledgeModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onNavigate={onNavigate}
      />
    </div>
  );
};
