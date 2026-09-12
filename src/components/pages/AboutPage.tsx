import React from 'react';
import {
  COMPANY_PROFILE,
  CORE_VALUES,
  LEADERSHIP_PROFILES,
  REGULATORY_COMPLIANCE,
} from '../../data/companyData';
import {
  ShieldCheck,
  Award,
  BookOpen,
  FileCheck,
  CheckCircle2,
  Building,
  HardHat,
  Scale,
  Users,
  Briefcase,
  Compass,
} from 'lucide-react';

interface AboutPageProps {
  onNavigate: (view: string) => void;
  onOpenAssistant: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate, onOpenAssistant }) => {
  const founder = LEADERSHIP_PROFILES[0];

  return (
    <div className="min-h-screen bg-[#071A2F] text-slate-100 pt-32 pb-24 px-4 blueprint-grid">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#C6922D] mb-3 font-['Montserrat']">
            <ShieldCheck className="w-4 h-4" />
            <span>Corporate Identity & Governance</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-white font-['Montserrat'] tracking-tight">
            Engineering Tomorrow With Institutional Integrity
          </h1>
          <p className="text-sm sm:text-base text-slate-300 mt-4 leading-relaxed">
            LDL Dhenze Residential Building Construction is an integrated construction, civil engineering, infrastructure, green-energy, and technology solutions enterprise founded under the laws of the Republic of the Philippines.
          </p>
        </div>

        {/* Official Statutory Registrations Card */}
        <div className="bg-[#09223d] border-2 border-[#C6922D]/40 rounded-3xl p-6 sm:p-10 shadow-2xl mb-16 relative overflow-hidden">
          <div className="blueprint-grid absolute inset-0 opacity-20" />
          <div className="relative z-10">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-white/10">
              <div>
                <span className="text-xs font-mono font-bold text-[#C6922D] uppercase tracking-widest">
                  Official Entity Registrations
                </span>
                <h2 className="text-xl sm:text-2xl font-black text-white mt-1">
                  {COMPANY_PROFILE.registeredName}
                </h2>
              </div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#237A3B]/20 border border-[#237A3B]/40 text-xs text-emerald-300 font-semibold">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Good Standing & Active Tax Compliance</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 py-6 border-b border-white/10 text-xs">
              <div className="bg-[#051322] p-4 rounded-xl border border-white/5">
                <div className="text-slate-400 uppercase text-[10px] font-semibold">DTI Business Name</div>
                <div className="text-sm font-bold text-white mt-1">{COMPANY_PROFILE.dtiRegistrationNumber}</div>
                <div className="text-slate-500 text-[10px] mt-1">{COMPANY_PROFILE.dtiRegistrationValidity}</div>
              </div>
              <div className="bg-[#051322] p-4 rounded-xl border border-white/5">
                <div className="text-slate-400 uppercase text-[10px] font-semibold">BIR Tax Identification</div>
                <div className="text-sm font-bold text-white mt-1">{COMPANY_PROFILE.birTin}</div>
                <div className="text-slate-500 text-[10px] mt-1">Certificate 2303 • OCN {COMPANY_PROFILE.birOcn}</div>
              </div>
              <div className="bg-[#051322] p-4 rounded-xl border border-white/5">
                <div className="text-slate-400 uppercase text-[10px] font-semibold">Primary Industry (PSIC)</div>
                <div className="text-sm font-bold text-[#C6922D] mt-1">{COMPANY_PROFILE.psicCode}</div>
                <div className="text-slate-400 text-[10px] mt-1">{COMPANY_PROFILE.psicDescription}</div>
              </div>
              <div className="bg-[#051322] p-4 rounded-xl border border-white/5">
                <div className="text-slate-400 uppercase text-[10px] font-semibold">Registered Headquarters</div>
                <div className="text-slate-200 font-medium text-xs mt-1">{COMPANY_PROFILE.registeredAddress}</div>
              </div>
            </div>

            {/* Mandatory Regulatory Statement */}
            <div className="pt-6">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#C6922D] flex items-center gap-2 mb-2">
                <Scale className="w-4 h-4" />
                <span>Statutory Practice Boundaries (Republic Act 9266 & Civil Engineering Law)</span>
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                {REGULATORY_COMPLIANCE.statutoryNotice}
              </p>
            </div>
          </div>
        </div>

        {/* Vision, Mission & Corporate Pledge */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div className="bg-[#0b2545] border border-white/10 rounded-2xl p-6 sm:p-8">
            <div className="w-10 h-10 rounded-xl bg-[#C6922D]/20 text-[#C6922D] flex items-center justify-center mb-4">
              <Compass className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Corporate Vision</h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {COMPANY_PROFILE.vision}
            </p>
          </div>

          <div className="bg-[#0b2545] border border-white/10 rounded-2xl p-6 sm:p-8">
            <div className="w-10 h-10 rounded-xl bg-[#237A3B]/20 text-emerald-400 flex items-center justify-center mb-4">
              <Award className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Corporate Mission</h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {COMPANY_PROFILE.mission}
            </p>
          </div>
        </div>

        {/* 7 Core Values */}
        <div className="mb-16">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-mono font-bold text-[#C6922D] uppercase tracking-widest">
              Foundational Principles
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
              The Seven Pillars of LDL Dhenze
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {CORE_VALUES.map((val) => (
              <div
                key={val.name}
                className="bg-[#09223d] border border-white/5 rounded-xl p-5 hover:border-[#C6922D]/30 transition-colors"
              >
                <div className="text-xs font-bold text-[#C6922D] uppercase tracking-wider mb-2">
                  {val.name}
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {val.shortDesc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Detailed Executive Profile */}
        <div className="bg-[#09223d] border border-white/10 rounded-3xl p-6 sm:p-10 mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-4 bg-[#051322] border border-[#C6922D]/30 rounded-2xl p-6 text-center">
              <div className="w-24 h-24 rounded-full bg-[#C6922D]/20 border-2 border-[#C6922D] flex items-center justify-center text-[#C6922D] mx-auto mb-4 font-black text-2xl font-['Montserrat']">
                LDL
              </div>
              <h3 className="text-lg font-bold text-white font-['Montserrat']">
                {founder.name}
              </h3>
              <p className="text-xs text-[#C6922D] font-semibold mt-0.5">
                {founder.title}
              </p>
              <div className="mt-4 pt-4 border-t border-white/10 text-[11px] text-slate-400 space-y-1">
                <div>B.Comm in Banking & Finance (STI College)</div>
                <div>B.S. Information Technology (DCCP)</div>
              </div>
            </div>

            <div className="lg:col-span-8 space-y-4 text-xs sm:text-sm text-slate-300 leading-relaxed">
              <span className="text-xs font-mono font-bold text-[#C6922D] uppercase tracking-widest">
                Executive Biography & Foundations
              </span>
              <p>{founder.bio}</p>
              <div className="bg-[#051322] p-4 rounded-xl border border-white/5 text-xs">
                <span className="text-slate-400 uppercase text-[10px] font-bold block mb-1">
                  Institutional Banking Disciplines:
                </span>
                <p className="text-slate-300">
                  {founder.bankingBackground}
                </p>
              </div>
              <blockquote className="border-l-2 border-[#C6922D] pl-4 text-slate-200 italic">
                “{founder.quote}”
              </blockquote>
            </div>
          </div>
        </div>

        {/* Safety Standards (DOLE DO 13) */}
        <div className="bg-[#06182c] border border-white/10 rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center shrink-0 text-amber-400">
              <HardHat className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">
                DOLE Department Order No. 13 Safety Mandate
              </h3>
              <p className="text-xs text-slate-300 mt-1 max-w-2xl leading-relaxed">
                We strictly enforce the Guidelines Governing Occupational Safety and Health in the Construction Industry across all project staging, machinery operations, and site installations.
              </p>
            </div>
          </div>
          <button
            onClick={() => onNavigate('contact')}
            className="px-5 py-2.5 bg-[#C6922D] text-[#071A2F] font-bold text-xs uppercase tracking-wider rounded-lg shrink-0 hover:bg-[#d8a339] transition-colors"
          >
            Connect With Management
          </button>
        </div>
      </div>
    </div>
  );
};
