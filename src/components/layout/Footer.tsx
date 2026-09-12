import React from 'react';
import { BrandLogo } from '../common/BrandLogo';
import { COMPANY_PROFILE, REGULATORY_COMPLIANCE } from '../../data/companyData';
import {
  ShieldCheck,
  Building,
  FileText,
  MapPin,
  Mail,
  Phone,
  Clock,
  ArrowUpRight,
  CheckCircle2,
} from 'lucide-react';

interface FooterProps {
  onNavigate: (view: string) => void;
  onOpenAssistant: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenAssistant }) => {
  return (
    <footer className="bg-[#051322] border-t border-[#C6922D]/20 text-slate-300 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          {/* Col 1: Brand & Official Mission */}
          <div className="lg:col-span-2 space-y-4">
            <BrandLogo variant="dark" size="md" showTagline={true} />
            <p className="text-xs text-slate-400 leading-relaxed max-w-md pt-2">
              An integrated development, civil engineering, infrastructure, green-energy, and technology enterprise organized under the laws of the Republic of the Philippines. Delivering sustainable, intelligent, and future-ready developments.
            </p>

            {/* Official Positioning Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded bg-white/5 border border-[#C6922D]/30 text-[#C6922D] text-xs font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-[#237A3B]" />
              “Building Today. Engineering Tomorrow. Powering the Future.”
            </div>

            {/* Quick Contact snippet */}
            <div className="space-y-2 pt-2 text-xs text-slate-300">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#C6922D] shrink-0 mt-0.5" />
                <span>{COMPANY_PROFILE.registeredAddress}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#C6922D] shrink-0" />
                <span>{COMPANY_PROFILE.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#C6922D] shrink-0" />
                <span>{COMPANY_PROFILE.phone}</span>
              </div>
            </div>
          </div>

          {/* Col 2: Core Capabilities */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-100 font-['Montserrat'] mb-4 flex items-center gap-2">
              <span className="w-1 h-3 bg-[#C6922D]" />
              Capabilities
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button
                  onClick={() => onNavigate('capability-cap-01')}
                  className="hover:text-[#C6922D] transition-colors text-left"
                >
                  Construction & Civil Works
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('capability-cap-02')}
                  className="hover:text-[#C6922D] transition-colors text-left"
                >
                  Materials & Supply Network
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('capability-cap-03')}
                  className="hover:text-[#C6922D] transition-colors text-left"
                >
                  Heavy Equipment Fleet
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('capability-cap-04')}
                  className="hover:text-[#C6922D] transition-colors text-left"
                >
                  Architecture, Engineering & BIM
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('capability-cap-05')}
                  className="hover:text-[#C6922D] transition-colors text-left"
                >
                  Green & Renewable Energy
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('capability-cap-07')}
                  className="hover:text-[#C6922D] transition-colors text-left"
                >
                  Smart City Solutions
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('capability-cap-09')}
                  className="hover:text-[#C6922D] transition-colors text-left"
                >
                  Integrated Project Delivery
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Flagship Industries */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-100 font-['Montserrat'] mb-4 flex items-center gap-2">
              <span className="w-1 h-3 bg-[#C6922D]" />
              Industries
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button
                  onClick={() => onNavigate('industry-ind-01')}
                  className="hover:text-[#C6922D] transition-colors text-left"
                >
                  Residential Developments
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('industry-ind-02')}
                  className="hover:text-[#C6922D] transition-colors text-left"
                >
                  Commercial & Hospitality
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('industry-ind-03')}
                  className="hover:text-[#C6922D] transition-colors text-left"
                >
                  Industrial & Logistics
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('industry-ind-04')}
                  className="hover:text-[#C6922D] transition-colors text-left"
                >
                  Infrastructure & Utilities
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('industry-ind-05')}
                  className="hover:text-[#C6922D] transition-colors text-left"
                >
                  Agro-Farming & Agro-Industrial
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('industry-ind-06')}
                  className="hover:text-[#C6922D] transition-colors text-left"
                >
                  Real Estate & Property
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Operations & Portals */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-100 font-['Montserrat'] mb-4 flex items-center gap-2">
              <span className="w-1 h-3 bg-[#C6922D]" />
              Client & Enterprise
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button
                  onClick={() => onNavigate('start-project')}
                  className="hover:text-[#C6922D] font-bold text-slate-200 transition-colors text-left flex items-center gap-1"
                >
                  Project Opportunity Wizard <ArrowUpRight className="w-3 h-3 text-[#C6922D]" />
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('book-consultation')}
                  className="hover:text-[#C6922D] transition-colors text-left"
                >
                  Book Technical Consultation
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('portal')}
                  className="hover:text-[#C6922D] transition-colors text-left"
                >
                  Client Project Progress Room
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('partners')}
                  className="hover:text-[#C6922D] transition-colors text-left"
                >
                  Supplier & Partner Onboarding
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('pricing')}
                  className="hover:text-[#C6922D] text-amber-300/90 font-bold transition-colors text-left flex items-center gap-1"
                >
                  Builder AI Plans & Pricing <ArrowUpRight className="w-3 h-3 text-[#C6922D]" />
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenAssistant}
                  className="hover:text-[#C6922D] text-amber-300/90 transition-colors text-left"
                >
                  LDL Dhenze Builder Assistant
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('qa-testing')}
                  className="hover:text-[#C6922D] font-mono text-[11px] text-slate-400 transition-colors text-left"
                >
                  System 20-Point QA Suite
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Corporate Credentials & Legal Registrations Bar */}
        <div className="border-t border-white/10 pt-8 pb-6">
          <div className="bg-[#071A2F] border border-[#C6922D]/20 rounded-xl p-5 mb-8">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-white/10">
              <div className="flex items-center gap-3">
                <ShieldCheck className="w-5 h-5 text-[#C6922D] shrink-0" />
                <h5 className="text-xs font-bold uppercase tracking-wider text-slate-200">
                  Authoritative Corporate Credentials & Tax Registrations
                </h5>
              </div>
              <div className="flex flex-wrap gap-2 text-[11px] font-mono text-slate-400">
                <span className="bg-white/5 px-2.5 py-1 rounded border border-white/10">
                  DTI BN: <strong className="text-slate-200">4812272</strong> (2023–2028)
                </span>
                <span className="bg-white/5 px-2.5 py-1 rounded border border-white/10">
                  BIR TIN: <strong className="text-slate-200">306-113-062-00000</strong>
                </span>
                <span className="bg-white/5 px-2.5 py-1 rounded border border-white/10">
                  OCN: <strong className="text-slate-200">21ARC2025000002189</strong>
                </span>
                <span className="bg-white/5 px-2.5 py-1 rounded border border-white/10">
                  PSIC: <strong className="text-[#C6922D]">42900 (Civil Engineering)</strong>
                </span>
              </div>
            </div>

            {/* Mandatory Regulatory Compliance Notice */}
            <p className="text-[11px] text-slate-400 leading-relaxed pt-3">
              <strong className="text-slate-300">Regulatory & Professional Compliance Notice: </strong>
              The DTI Certificate is a registration of business name and is not a license to engage in any kind of business or practice a profession. All architectural, civil, structural, electrical, and mechanical engineering plans and supervisory services are rendered exclusively through duly qualified and licensed Philippine professionals under Republic Act 9266 (The Architecture Act of the Philippines), the Civil Engineering Law, and Professional Regulation Commission (PRC) guidelines. Construction works requiring PCAB (Philippine Contractors Accreditation Board) licensing and renewable energy initiatives requiring Department of Energy (DOE) or Energy Regulatory Commission (ERC) permits are executed in direct partnership with accredited contractors and regulated corporate entities.
            </p>
          </div>

          {/* Bottom Copyright & Standard Links */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
            <div>
              &copy; {new Date().getFullYear()} LDL Dhenze Residential Building Construction. All rights reserved.
            </div>
            <div className="flex flex-wrap gap-4 text-slate-400">
              <button
                onClick={() => onNavigate('privacy')}
                className="hover:text-[#C6922D] transition-colors"
              >
                Privacy Policy (RA 10173)
              </button>
              <span>•</span>
              <button
                onClick={() => onNavigate('terms')}
                className="hover:text-[#C6922D] transition-colors"
              >
                Terms of Engagement
              </button>
              <span>•</span>
              <button
                onClick={() => onNavigate('about')}
                className="hover:text-[#C6922D] transition-colors"
              >
                Regulatory Disclosures
              </button>
              <span>•</span>
              <button
                onClick={() => onNavigate('contact')}
                className="hover:text-[#C6922D] transition-colors"
              >
                Contact Headquarters
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
