import React from 'react';
import { BrandLogo } from '../common/BrandLogo';
import { COMPANY_CREDENTIALS } from '../../data/companyData';
import {
  ShieldCheck,
  MapPin,
  Mail,
  ArrowUpRight,
  Lock,
  Compass,
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
          {/* Col 1 & 2: Brand & Official Mission */}
          <div className="lg:col-span-2 space-y-4">
            <BrandLogo variant="dark" size="md" showTagline={true} />
            <p className="text-xs text-slate-400 leading-relaxed max-w-md pt-2">
              LDL Dhenze Residential Building Construction coordinates disciplined development planning, engineering coordination, civil construction execution, and resilient infrastructure across the Philippines.
            </p>

            {/* Official Positioning Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded bg-white/5 border border-[#C6922D]/30 text-[#C6922D] text-xs font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-[#237A3B]" />
              “Building Today. Engineering Tomorrow. Powering the Future.”
            </div>

            {/* Verified Contact Details */}
            <div className="space-y-2 pt-2 text-xs text-slate-300">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#C6922D] shrink-0 mt-0.5" />
                <span className="leading-snug">{COMPANY_CREDENTIALS.registeredAddress}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#C6922D] shrink-0" />
                <a
                  href={`mailto:${COMPANY_CREDENTIALS.contactEmail}`}
                  className="hover:text-[#C6922D] transition-colors"
                >
                  {COMPANY_CREDENTIALS.contactEmail}
                </a>
              </div>
            </div>
          </div>

          {/* Col 3: Strategic Expertise */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-100 font-['Montserrat'] mb-4 flex items-center gap-2">
              <span className="w-1 h-3 bg-[#C6922D]" />
              Expertise
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button
                  onClick={() => onNavigate('capabilities')}
                  className="hover:text-[#C6922D] transition-colors text-left"
                >
                  Development Advisory
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('capabilities')}
                  className="hover:text-[#C6922D] transition-colors text-left"
                >
                  Architecture & Engineering
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('capabilities')}
                  className="hover:text-[#C6922D] transition-colors text-left"
                >
                  Construction & Civil Works
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('capabilities')}
                  className="hover:text-[#C6922D] transition-colors text-left"
                >
                  Project & Cost Management
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('capabilities')}
                  className="hover:text-[#C6922D] transition-colors text-left"
                >
                  Renewable Infrastructure
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('capabilities')}
                  className="hover:text-[#C6922D] transition-colors text-left"
                >
                  Building Technology & BIM
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Key Development Sectors */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-100 font-['Montserrat'] mb-4 flex items-center gap-2">
              <span className="w-1 h-3 bg-[#C6922D]" />
              Sectors
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button
                  onClick={() => onNavigate('industries')}
                  className="hover:text-[#C6922D] transition-colors text-left"
                >
                  Private Residential Estates
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('industries')}
                  className="hover:text-[#C6922D] transition-colors text-left"
                >
                  Commercial & Mixed-Use
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('industries')}
                  className="hover:text-[#C6922D] transition-colors text-left"
                >
                  Hospitality & Destinations
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('industries')}
                  className="hover:text-[#C6922D] transition-colors text-left"
                >
                  Healthcare Facilities
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('industries')}
                  className="hover:text-[#C6922D] transition-colors text-left"
                >
                  Industrial & Logistics
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('industries')}
                  className="hover:text-[#C6922D] transition-colors text-left"
                >
                  Renewable Microgrids
                </button>
              </li>
            </ul>
          </div>

          {/* Col 5: Governance & Consultation */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-100 font-['Montserrat'] mb-4 flex items-center gap-2">
              <span className="w-1 h-3 bg-[#C6922D]" />
              Engagement
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <button
                  onClick={() => onNavigate('start-project')}
                  className="hover:text-[#C6922D] font-bold text-slate-200 transition-colors text-left flex items-center gap-1"
                >
                  Discuss a Project <ArrowUpRight className="w-3 h-3 text-[#C6922D]" />
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('book-consultation')}
                  className="hover:text-[#C6922D] transition-colors text-left"
                >
                  Private Consultation
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('portal')}
                  className="hover:text-[#C6922D] text-slate-200 transition-colors text-left flex items-center gap-1"
                >
                  <Lock className="w-3 h-3 text-[#C6922D]" />
                  Client Portal Access
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('about')}
                  className="hover:text-[#C6922D] transition-colors text-left"
                >
                  Company & Leadership
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('projects')}
                  className="hover:text-[#C6922D] transition-colors text-left"
                >
                  Selected Work
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('insights')}
                  className="hover:text-[#C6922D] transition-colors text-left"
                >
                  Executive Insights
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Corporate Credentials & Regulatory Notice Bar */}
        <div className="border-t border-white/10 pt-8 pb-6">
          <div className="bg-[#071A2F] border border-[#C6922D]/20 rounded-xl p-5 mb-8">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-white/10">
              <div className="flex items-center gap-3">
                <ShieldCheck className="w-5 h-5 text-[#C6922D] shrink-0" />
                <h5 className="text-xs font-bold uppercase tracking-wider text-slate-200">
                  Authoritative Corporate Registrations & Compliance
                </h5>
              </div>
              <div className="flex flex-wrap gap-2 text-[11px] font-mono text-slate-400">
                <span className="bg-white/5 px-2.5 py-1 rounded border border-white/10">
                  DTI BN: <strong className="text-slate-200">{COMPANY_CREDENTIALS.dtiRegistrationNumber}</strong> (2023–2028)
                </span>
                <span className="bg-white/5 px-2.5 py-1 rounded border border-white/10">
                  PSIC: <strong className="text-[#C6922D]">42900 (Civil Engineering)</strong>
                </span>
                <span className="bg-white/5 px-2.5 py-1 rounded border border-white/10">
                  Location: <strong className="text-slate-200">Clark Freeport Zone, Pampanga</strong>
                </span>
              </div>
            </div>

            {/* Mandatory Regulatory Compliance Notice */}
            <p className="text-[11px] text-slate-400 leading-relaxed pt-3">
              <strong className="text-slate-300">Regulatory & Professional Compliance Notice: </strong>
              The DTI Certificate is a registration of business name and is not a license to practice a regulated profession. All architectural, civil, structural, electrical, and mechanical engineering plans, computations, and supervisory services are rendered exclusively through duly qualified and licensed Philippine professionals under Republic Act 9266 (The Architecture Act of the Philippines), the Civil Engineering Law, and PRC regulations. Construction works requiring PCAB (Philippine Contractors Accreditation Board) licensing and renewable energy initiatives requiring DOE or ERC permits are executed in direct partnership with accredited contractors and regulated corporate entities.
            </p>
          </div>

          {/* Bottom Copyright & Legal Links */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
            <div>
              &copy; {new Date().getFullYear()} LDL Dhenze Residential Building Construction. All rights reserved.
            </div>
            <div className="flex flex-wrap gap-4 text-slate-400">
              <button
                onClick={() => onNavigate('about')}
                className="hover:text-[#C6922D] transition-colors"
              >
                Company Credentials
              </button>
              <span>•</span>
              <button
                onClick={() => onNavigate('contact')}
                className="hover:text-[#C6922D] transition-colors"
              >
                Executive Inquiries
              </button>
              <span>•</span>
              <button
                onClick={() => onNavigate('portal')}
                className="hover:text-[#C6922D] transition-colors"
              >
                Client Portal
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
