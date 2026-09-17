import React, { useState } from 'react';
import {
  Building2,
  Users,
  Briefcase,
  User,
  ShieldCheck,
  CheckCircle2,
  Clock,
  AlertTriangle,
  FileText,
  Plus,
  Search,
  ChevronRight,
  ExternalLink,
  Award,
  Truck,
  DollarSign,
  MapPin,
  Calendar,
} from 'lucide-react';
import {
  ContractorProfile,
  SupplierProfile,
  ProfessionalProfile,
  ClientProfile,
  OnboardingEntityType,
} from '../../types/onboardingTypes';
import {
  INITIAL_CONTRACTORS,
  INITIAL_SUPPLIERS,
  INITIAL_PROFESSIONALS,
  INITIAL_CLIENTS,
} from '../../data/onboardingMockData';

interface OnboardingEntitiesViewProps {
  entityCategory: OnboardingEntityType;
  portalTheme?: 'dark' | 'light';
  onNavigateToVerification?: () => void;
}

export const OnboardingEntitiesView: React.FC<OnboardingEntitiesViewProps> = ({
  entityCategory,
  portalTheme = 'dark',
  onNavigateToVerification,
}) => {
  const [contractors, setContractors] = useState<ContractorProfile[]>(INITIAL_CONTRACTORS);
  const [suppliers, setSuppliers] = useState<SupplierProfile[]>(INITIAL_SUPPLIERS);
  const [professionals, setProfessionals] = useState<ProfessionalProfile[]>(INITIAL_PROFESSIONALS);
  const [clients, setClients] = useState<ClientProfile[]>(INITIAL_CLIENTS);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedEntityId, setSelectedEntityId] = useState<string | null>(null);

  return (
    <div className="space-y-6">
      {/* Category Header */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-bold text-white tracking-tight flex items-center gap-2">
              {entityCategory === 'CONTRACTOR' && <Building2 className="w-5 h-5 text-[#C6922D]" />}
              {entityCategory === 'SUPPLIER' && <Truck className="w-5 h-5 text-[#C6922D]" />}
              {entityCategory === 'PROFESSIONAL' && <Award className="w-5 h-5 text-[#C6922D]" />}
              {entityCategory === 'CLIENT' && <Users className="w-5 h-5 text-[#C6922D]" />}
              {entityCategory === 'CONTRACTOR' && 'Contracting Companies Onboarding Register (CTR-)'}
              {entityCategory === 'SUPPLIER' && 'Suppliers & Vendors Master Directory (SUP-)'}
              {entityCategory === 'PROFESSIONAL' && 'Licensed Engineering & Architectural Professionals (PRO-)'}
              {entityCategory === 'CLIENT' && 'Project Owners & Commercial Clients (CLI-)'}
            </h2>
            <span className="px-2 py-0.5 rounded text-[11px] font-mono bg-blue-500/20 text-blue-300 border border-blue-500/30">
              Master Register
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            {entityCategory === 'CONTRACTOR' && 'Contractor capability profiles, PCAB licensing status, equipment fleet, and DOLE safety compliance.'}
            {entityCategory === 'SUPPLIER' && 'Vendor information sheets (CIS), corporate representation authority, product lines, and credit terms.'}
            {entityCategory === 'PROFESSIONAL' && 'PRC board licenses, PTR records, accredited professional organization memberships, and project assignments.'}
            {entityCategory === 'CLIENT' && 'Development intake briefs, lot coordinates, floor area requirements, and financing/budget status.'}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onNavigateToVerification}
            className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors"
          >
            <ShieldCheck className="w-4 h-4 text-[#C6922D]" />
            Verify Credentials in Simulator
          </button>
        </div>
      </div>

      {/* Contractors View */}
      {entityCategory === 'CONTRACTOR' && (
        <div className="grid grid-cols-1 gap-4">
          {contractors.map((c) => (
            <div
              key={c.id}
              className="bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-xl p-5 space-y-4 shadow-md transition-all"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-[#C6922D] font-mono">{c.id}</span>
                    <span className="text-xs text-slate-400">&bull;</span>
                    <span className="text-xs text-slate-300 font-mono">{c.classification}</span>
                  </div>
                  <h3 className="text-base font-bold text-white mt-0.5">{c.registeredBusinessName}</h3>
                  <p className="text-xs text-slate-400 font-mono">{c.businessAddress}</p>
                </div>

                <div className="text-right flex flex-col sm:items-end gap-1">
                  <span className="px-2.5 py-1 rounded text-xs font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    {c.status}
                  </span>
                  <div className="text-xs text-slate-400 font-mono">
                    Progress: <strong className="text-white">{c.onboardingProgressPercent}%</strong>
                  </div>
                </div>
              </div>

              {/* Capability Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs bg-slate-950 p-3 rounded-lg border border-slate-800 font-mono">
                <div>
                  <span className="text-slate-500 text-[10px] block">TIN NUMBER</span>
                  <span className="text-slate-200">{c.taxIdentificationNumber}</span>
                </div>
                <div>
                  <span className="text-slate-500 text-[10px] block">YEAR ESTABLISHED</span>
                  <span className="text-slate-200">{c.yearEstablished} ({c.yearsExperience} yrs)</span>
                </div>
                <div>
                  <span className="text-slate-500 text-[10px] block">MAX CAPACITY</span>
                  <span className="text-[#C6922D]">PHP {(c.maxProjectCapacityPHP / 1000000).toFixed(0)}M</span>
                </div>
                <div>
                  <span className="text-slate-500 text-[10px] block">LICENSED ENGINEERS</span>
                  <span className="text-slate-200">{c.licensedEngineersCount} PEs on staff</span>
                </div>
              </div>

              <div>
                <span className="text-[11px] font-semibold text-slate-400 block mb-1">Heavy Equipment Owned:</span>
                <div className="flex flex-wrap gap-1.5">
                  {c.equipmentOwned.map((eq, i) => (
                    <span key={i} className="px-2 py-0.5 rounded text-[11px] bg-slate-800 text-slate-300 font-mono">
                      {eq}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between text-xs pt-2 border-t border-slate-800 text-slate-400">
                <span>Authorized Representative: <strong className="text-slate-200">{c.authorizedRepresentative}</strong></span>
                <span className="text-emerald-400 font-mono">{c.safetyRating}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Suppliers View */}
      {entityCategory === 'SUPPLIER' && (
        <div className="grid grid-cols-1 gap-4">
          {suppliers.map((s) => (
            <div
              key={s.id}
              className="bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-xl p-5 space-y-4 shadow-md transition-all"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-[#C6922D] font-mono">{s.id}</span>
                    <span className="text-xs text-slate-400">&bull;</span>
                    <span className="text-xs text-slate-300 font-mono">{s.tradeName}</span>
                  </div>
                  <h3 className="text-base font-bold text-white mt-0.5">{s.registeredCompanyName}</h3>
                  <p className="text-xs text-slate-400 font-mono">{s.businessAddress}</p>
                </div>

                <div className="text-right flex flex-col sm:items-end gap-1">
                  <span className="px-2.5 py-1 rounded text-xs font-bold bg-blue-500/10 text-blue-400 border border-blue-500/20">
                    {s.status}
                  </span>
                  <div className="text-xs text-slate-400 font-mono">
                    Progress: <strong className="text-white">{s.onboardingProgressPercent}%</strong>
                  </div>
                </div>
              </div>

              {/* Vendor Specs Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs bg-slate-950 p-3 rounded-lg border border-slate-800 font-mono">
                <div>
                  <span className="text-slate-500 text-[10px] block">PAYMENT / CREDIT</span>
                  <span className="text-slate-200">{s.paymentTerms}</span>
                </div>
                <div>
                  <span className="text-slate-500 text-[10px] block">DELIVERY LEAD TIME</span>
                  <span className="text-[#C6922D]">{s.leadTimeDays} Calendar Days</span>
                </div>
                <div>
                  <span className="text-slate-500 text-[10px] block">SIGNATORY AUTHORITY</span>
                  <span className="text-slate-200">{s.authorityDocumentType}</span>
                </div>
                <div>
                  <span className="text-slate-500 text-[10px] block">AUTHORITY REVIEW CYCLE</span>
                  <span className="text-amber-400">{s.authorityReviewDate}</span>
                </div>
              </div>

              <div>
                <span className="text-[11px] font-semibold text-slate-400 block mb-1">Product Lines Cataloged:</span>
                <div className="flex flex-wrap gap-1.5">
                  {s.productCategories.map((cat, i) => (
                    <span key={i} className="px-2 py-0.5 rounded text-[11px] bg-slate-800 text-slate-300 font-mono">
                      {cat}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Professionals View */}
      {entityCategory === 'PROFESSIONAL' && (
        <div className="grid grid-cols-1 gap-4">
          {professionals.map((p) => (
            <div
              key={p.id}
              className="bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-xl p-5 space-y-4 shadow-md transition-all"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-[#C6922D] font-mono">{p.id}</span>
                    <span className="text-xs text-slate-400">&bull;</span>
                    <span className="text-xs text-blue-400 font-mono font-bold">{p.prcLicenseNumber}</span>
                  </div>
                  <h3 className="text-base font-bold text-white mt-0.5">{p.fullName}</h3>
                  <p className="text-xs text-slate-400 font-mono">{p.professionalTitle}</p>
                </div>

                <div className="text-right flex flex-col sm:items-end gap-1">
                  <span
                    className={`px-2.5 py-1 rounded text-xs font-bold ${
                      p.status === 'Approved'
                        ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                        : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                    }`}
                  >
                    {p.status}
                  </span>
                  <div className="text-xs text-slate-400 font-mono">
                    PRC Validity: <strong className="text-white">{p.prcExpiryDate}</strong>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs bg-slate-950 p-3 rounded-lg border border-slate-800 font-mono">
                <div>
                  <span className="text-slate-500 text-[10px] block">PRACTICING DISCIPLINE</span>
                  <span className="text-slate-200">{p.profession}</span>
                </div>
                <div>
                  <span className="text-slate-500 text-[10px] block">PTR RECEIPT</span>
                  <span className="text-slate-200">{p.ptrNumber}</span>
                </div>
                <div>
                  <span className="text-slate-500 text-[10px] block">ACCREDITED ORG</span>
                  <span className="text-[#C6922D] truncate block">{p.accreditedOrgMembership}</span>
                </div>
                <div>
                  <span className="text-slate-500 text-[10px] block">EXPERIENCE</span>
                  <span className="text-slate-200">{p.yearsExperience} Years</span>
                </div>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed font-sans">
                {p.professionalBiography}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* Clients View */}
      {entityCategory === 'CLIENT' && (
        <div className="grid grid-cols-1 gap-4">
          {clients.map((cli) => (
            <div
              key={cli.id}
              className="bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-xl p-5 space-y-4 shadow-md transition-all"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-[#C6922D] font-mono">{cli.id}</span>
                    <span className="text-xs text-slate-400">&bull;</span>
                    <span className="text-xs text-slate-300 font-mono">{cli.clientType} CLIENT</span>
                  </div>
                  <h3 className="text-base font-bold text-white mt-0.5">{cli.fullNameOrCompanyName}</h3>
                  <p className="text-xs text-slate-400 font-mono">{cli.address}</p>
                </div>

                <div className="text-right flex flex-col sm:items-end gap-1">
                  <span className="px-2.5 py-1 rounded text-xs font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    {cli.status}
                  </span>
                  <div className="text-xs text-[#C6922D] font-mono font-bold">
                    PHP {(cli.targetBudgetPHP / 1000000).toFixed(0)}M ({cli.budgetStatus})
                  </div>
                </div>
              </div>

              <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                <div className="flex items-center justify-between text-xs font-semibold text-white">
                  <span>Proposed Project: {cli.proposedProjectTitle}</span>
                  <span className="text-slate-400 font-mono">{cli.projectLocation}</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">{cli.projectDescription}</p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px] font-mono text-slate-400 pt-2 border-t border-slate-800/80">
                  <div>Site Area: <strong className="text-slate-200">{cli.siteAreaSqm.toLocaleString()} sqm</strong></div>
                  <div>Floor Area: <strong className="text-slate-200">{cli.proposedFloorAreaSqm.toLocaleString()} sqm</strong></div>
                  <div>Floors: <strong className="text-slate-200">{cli.numberOfFloors} Levels</strong></div>
                  <div>Funding: <strong className="text-emerald-400">{cli.fundingStatus}</strong></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
