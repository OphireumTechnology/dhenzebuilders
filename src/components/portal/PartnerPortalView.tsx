import React, { useState } from 'react';
import {
  Hammer,
  Truck,
  Users,
  Award,
  FileText,
  CheckCircle2,
  Calendar,
  DollarSign,
  Send,
  Plus,
  ArrowRight,
  ShieldCheck,
  TrendingUp,
} from 'lucide-react';
import {
  PartnerRecord,
  SubcontractorProposal,
  WBSTaskRecord,
  UserRole,
} from '../../types/platform';
import {
  SEED_PARTNERS,
  SEED_PROPOSALS,
  SEED_TASKS,
} from '../../data/platformSeedData';

interface PartnerPortalViewProps {
  currentSubRoute: string;
  onNavigate: (route: string) => void;
  currentUserRole: UserRole;
  portalTheme: 'dark' | 'light';
}

export const PartnerPortalView: React.FC<PartnerPortalViewProps> = ({
  currentSubRoute,
  onNavigate,
  currentUserRole,
  portalTheme,
}) => {
  const [partner] = useState<PartnerRecord>(SEED_PARTNERS[0]);
  const [proposals, setProposals] = useState<SubcontractorProposal[]>(SEED_PROPOSALS);
  const [tasks] = useState<WBSTaskRecord[]>(SEED_TASKS);

  // Billing Application state
  const [billingAmount, setBillingAmount] = useState<number>(450000);
  const [billingPeriod, setBillingPeriod] = useState('Sept 1 - Sept 15, 2026');
  const [billingNotes, setBillingNotes] = useState('Substructure excavation and soil compaction complete.');
  const [billingSubmitted, setBillingSubmitted] = useState(false);

  const isLight = portalTheme === 'light';
  const cardBg = isLight ? 'bg-white border-slate-200 text-slate-900 shadow-sm' : 'bg-slate-900/70 border-slate-800 text-slate-100';
  const headerText = isLight ? 'text-slate-900' : 'text-white';
  const mutedText = isLight ? 'text-slate-500' : 'text-slate-400';

  const route = currentSubRoute || 'overview';

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800/60 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded text-[11px] font-semibold tracking-wider uppercase bg-[#C6922D]/10 text-[#C6922D] border border-[#C6922D]/30">
              Contractor & Partner Hub
            </span>
            <span className={`text-xs ${mutedText}`}>{partner.tradeName} (PCAB: {partner.pcabLicenseNumber})</span>
          </div>
          <h1 className={`text-2xl sm:text-3xl font-serif ${headerText} mt-1`}>
            {route === 'overview' && 'Partner Execution Dashboard'}
            {route === 'opportunities' && 'Subcontracting Opportunities & Tenders'}
            {route === 'bids' && 'Submitted Proposals & Bids'}
            {route === 'work-packages' && 'Active Work Packages & WBS Allocation'}
            {route === 'personnel' && 'Site Engineers & Accredited Personnel'}
            {route === 'equipment' && 'Heavy Equipment & Fleet Deployment'}
            {route === 'billing' && 'Payment Applications & Billing Certificates'}
            {route === 'credentials' && 'PCAB Licensing & DOLE Certifications'}
            {route === 'assistant' && 'Dhenze Partner Assistant'}
          </h1>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5" /> PCAB {partner.pcabCategory} Verified
          </span>
        </div>
      </div>

      {/* 1. OVERVIEW */}
      {route === 'overview' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className={`p-5 rounded-xl border ${cardBg}`}>
              <span className={`text-xs font-medium uppercase tracking-wider ${mutedText}`}>Active Work Packages</span>
              <div className="flex items-baseline justify-between mt-2">
                <span className="text-3xl font-serif text-[#C6922D] font-bold">2 Sites</span>
                <span className="text-xs text-emerald-400">100% On-Track</span>
              </div>
              <p className={`text-xs ${mutedText} mt-2`}>Angeles & Clark Lots</p>
            </div>

            <div className={`p-5 rounded-xl border ${cardBg}`}>
              <span className={`text-xs font-medium uppercase tracking-wider ${mutedText}`}>Deployed Personnel</span>
              <div className="flex items-baseline justify-between mt-2">
                <span className={`text-3xl font-serif ${headerText} font-bold`}>{partner.certifiedPersonnelCount}</span>
                <span className="text-xs text-slate-400">All DOLE-Certified</span>
              </div>
              <p className={`text-xs ${mutedText} mt-2`}>3 Safety Officers on site</p>
            </div>

            <div className={`p-5 rounded-xl border ${cardBg}`}>
              <span className={`text-xs font-medium uppercase tracking-wider ${mutedText}`}>Heavy Equipment Units</span>
              <div className="flex items-baseline justify-between mt-2">
                <span className="text-3xl font-serif text-white font-bold">{partner.heavyEquipmentCount}</span>
                <span className="text-xs text-slate-400">Active Fleet</span>
              </div>
              <p className={`text-xs ${mutedText} mt-2`}>Excavators, compactors, transit mixers</p>
            </div>

            <div className={`p-5 rounded-xl border ${cardBg}`}>
              <span className={`text-xs font-medium uppercase tracking-wider ${mutedText}`}>Safety & EHS Index</span>
              <div className="flex items-baseline justify-between mt-2">
                <span className="text-3xl font-serif text-emerald-400 font-bold">{partner.safetyRating}/10</span>
                <span className="text-xs text-emerald-400 flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" /> High Discipline
                </span>
              </div>
              <p className={`text-xs ${mutedText} mt-2`}>Zero incidents across 480 days</p>
            </div>
          </div>

          {/* Active Work Packages Table */}
          <div className={`p-6 rounded-xl border ${cardBg}`}>
            <h2 className={`text-base font-serif ${headerText} mb-4`}>Contracted Work Breakdown & Milestones</h2>
            <div className="space-y-3">
              {tasks.slice(0, 3).map((t) => (
                <div key={t.id} className={`p-3.5 rounded-lg border flex items-center justify-between gap-4 ${
                  isLight ? 'bg-slate-50 border-slate-200' : 'bg-slate-800/50 border-slate-700'
                }`}>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-bold text-[#C6922D]">{t.taskNumber}</span>
                      <span className={`text-xs font-semibold ${headerText}`}>{t.title}</span>
                    </div>
                    <p className={`text-[11px] ${mutedText} mt-0.5`}>Phase: {t.phase} • Target Completion: {t.plannedEndDate}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-bold text-emerald-400">{t.progressPercent}% Complete</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 2. PAYMENT APPLICATION */}
      {route === 'billing' && (
        <div className={`p-6 rounded-xl border ${cardBg}`}>
          <h2 className={`text-lg font-serif ${headerText} mb-2`}>Subcontractor Payment Application</h2>
          <p className={`text-xs ${mutedText} mb-6`}>
            Submit your progress claim for quantity surveyor verification and maker-checker engineering disbursement.
          </p>

          {billingSubmitted ? (
            <div className="p-6 rounded-xl bg-emerald-950/40 border border-emerald-800 text-center space-y-2">
              <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto" />
              <h3 className="text-sm font-bold text-white">Payment Application Docketed</h3>
              <p className="text-xs text-slate-300">
                Application for ₱{billingAmount.toLocaleString()} submitted. Docket: <span className="text-[#C6922D] font-mono">PAY-APP-2026-091</span>.
              </p>
              <button onClick={() => setBillingSubmitted(false)} className="mt-3 px-3 py-1 text-xs bg-slate-800 text-white rounded">
                File Another Application
              </button>
            </div>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setBillingSubmitted(true);
              }}
              className="max-w-xl space-y-4 text-xs"
            >
              <div>
                <label className="block text-slate-400 font-semibold mb-1">Billing Period</label>
                <input
                  type="text"
                  value={billingPeriod}
                  onChange={(e) => setBillingPeriod(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded px-3 py-2 text-white"
                />
              </div>
              <div>
                <label className="block text-slate-400 font-semibold mb-1">Claim Amount (PHP)</label>
                <input
                  type="number"
                  value={billingAmount}
                  onChange={(e) => setBillingAmount(Number(e.target.value))}
                  className="w-full bg-slate-800 border border-slate-700 rounded px-3 py-2 text-white"
                />
              </div>
              <div>
                <label className="block text-slate-400 font-semibold mb-1">Work Accomplishment Narrative</label>
                <textarea
                  rows={3}
                  value={billingNotes}
                  onChange={(e) => setBillingNotes(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded px-3 py-2 text-white"
                />
              </div>
              <button
                type="submit"
                className="px-5 py-2.5 rounded-lg bg-[#C6922D] hover:bg-[#dfad4b] text-slate-950 font-bold uppercase tracking-wider"
              >
                Submit for Quantity Surveyor Inspection
              </button>
            </form>
          )}
        </div>
      )}

      {/* 3. PROPOSALS & BIDS */}
      {(route === 'opportunities' || route === 'bids') && (
        <div className={`p-6 rounded-xl border ${cardBg}`}>
          <h2 className={`text-lg font-serif ${headerText} mb-4`}>Subcontractor Tenders & Sealed Bids</h2>
          <div className="space-y-4">
            {proposals.map((p) => (
              <div key={p.id} className={`p-4 rounded-lg border ${isLight ? 'bg-slate-50 border-slate-200' : 'bg-slate-800/50 border-slate-700'}`}>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs font-mono font-bold text-[#C6922D]">{p.opportunityId}</span>
                  <span className="text-[10px] bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded border border-emerald-500/20">
                    {p.status}
                  </span>
                </div>
                <p className={`text-sm font-semibold ${headerText}`}>Earthworks & Subgrade Compaction Package</p>
                <p className={`text-xs ${mutedText} mt-1`}>
                  Proposal: ₱{(p.commercialAmountPHP / 1e6).toFixed(2)}M • Submitted: {p.submittedAt}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
