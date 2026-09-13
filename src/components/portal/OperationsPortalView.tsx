import React, { useState } from 'react';
import {
  ShieldAlert,
  ShieldCheck,
  Building,
  Users,
  Briefcase,
  FileText,
  DollarSign,
  AlertTriangle,
  Lock,
  Search,
  Filter,
  CheckCircle2,
  TrendingUp,
  Cpu,
  RefreshCw,
  Award,
  Key,
} from 'lucide-react';
import {
  MasterProjectRecord,
  PlatformOrganization,
  UserRole,
} from '../../types/platform';
import {
  SEED_PROJECTS,
  SEED_ORGANIZATIONS,
  SEED_AUDIT_LOGS,
} from '../../data/platformSeedData';

interface OperationsPortalViewProps {
  currentSubRoute: string;
  onNavigate: (route: string) => void;
  currentUserRole: UserRole;
  portalTheme: 'dark' | 'light';
}

export const OperationsPortalView: React.FC<OperationsPortalViewProps> = ({
  currentSubRoute,
  onNavigate,
  currentUserRole,
  portalTheme,
}) => {
  const [projects] = useState<MasterProjectRecord[]>(SEED_PROJECTS);
  const [organizations] = useState<PlatformOrganization[]>(SEED_ORGANIZATIONS);
  const [auditLogs] = useState(SEED_AUDIT_LOGS);

  // Maker-Checker state
  const [makerCheckerQueue, setMakerCheckerQueue] = useState([
    {
      id: 'MC-2026-0012',
      itemType: 'PAYMENT_DISBURSEMENT',
      description: 'Subcontractor Progress Claim - CL Earthmovers (Earthworks Phase 1)',
      amountPHP: 12750000,
      maker: 'Carlos Dizon (Finance Officer)',
      checker: 'Pending Executive Sign-Off',
      status: 'PENDING_CHECKER_APPROVAL',
      createdDate: '2026-09-12 14:32',
    },
    {
      id: 'MC-2026-0013',
      itemType: 'CDE_SPEC_FREEZE',
      description: 'Baseline Architectural Freeze for Angeles Villa Estate',
      amountPHP: 0,
      maker: 'Engr. Dhenze (Project Controls)',
      checker: 'Pending Dual Authorization',
      status: 'PENDING_CHECKER_APPROVAL',
      createdDate: '2026-09-13 09:15',
    },
  ]);

  // System Freeze State
  const [isSystemFrozen, setIsSystemFrozen] = useState(false);
  const [freezeReason, setFreezeReason] = useState('Regulatory Compliance & Safety Audit');
  const [freezeAuthorizedBy, setFreezeAuthorizedBy] = useState('Security Admin + Executive Director');

  const handleApproveMakerChecker = (id: string) => {
    setMakerCheckerQueue((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, status: 'APPROVED', checker: `${currentUserRole} (Authorized)` } : item
      )
    );
  };

  const handleToggleFreeze = () => {
    if (currentUserRole !== 'SYSTEM_ADMIN' && currentUserRole !== 'SECURITY_ADMIN' && currentUserRole !== 'EXECUTIVE_APPROVER') {
      alert('Unauthorized: System freeze requires dual administrative credentials.');
      return;
    }
    setIsSystemFrozen(!isSystemFrozen);
  };

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
            <span className="px-2.5 py-0.5 rounded text-[11px] font-semibold tracking-wider uppercase bg-red-500/10 text-red-400 border border-red-500/20">
              Operations & Governance Command
            </span>
            <span className={`text-xs ${mutedText}`}>Role: {currentUserRole}</span>
          </div>
          <h1 className={`text-2xl sm:text-3xl font-serif ${headerText} mt-1`}>
            {route === 'overview' && 'Operations Command & KPI Overview'}
            {route === 'organizations' && 'Multi-Tenant Organizations Directory'}
            {route === 'clients' && 'Client Accounts & Property Portfolios'}
            {route === 'suppliers' && 'Supplier Verification & Spend Analysis'}
            {route === 'partners' && 'Partner Contractor Fleet & Accreditation'}
            {route === 'projects' && 'Master Project Portfolio & WBS Pipeline'}
            {route === 'procurement' && 'Procurement, RFQs & Bidding Control'}
            {route === 'compliance' && 'Compliance Reviewer Queue & Legal Holds'}
            {route === 'finance' && 'Maker-Checker Financial Disbursements'}
            {route === 'audit' && 'Cryptographic Audit Trail & Event Ledger'}
            {route === 'security' && 'Tenant Isolation & Session Management'}
            {route === 'ai-governance' && 'AI Governance & LLM Token Benchmark Ledger'}
            {route === 'system' && 'Emergency Freeze & Dual-Authorization Administration'}
          </h1>
        </div>

        {/* Emergency Freeze Indicator */}
        <div className="flex items-center gap-2">
          {isSystemFrozen ? (
            <div className="px-3 py-1.5 rounded-lg bg-red-600 text-white font-bold text-xs flex items-center gap-2 animate-pulse">
              <ShieldAlert className="w-4 h-4" /> SYSTEM FREEZE ACTIVE
            </div>
          ) : (
            <div className="px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4" /> Normal Operational Mode
            </div>
          )}
        </div>
      </div>

      {/* 1. OVERVIEW */}
      {route === 'overview' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className={`p-5 rounded-xl border ${cardBg}`}>
              <span className={`text-xs font-medium uppercase tracking-wider ${mutedText}`}>Active Portfolio Projects</span>
              <div className="flex items-baseline justify-between mt-2">
                <span className="text-3xl font-serif text-[#C6922D] font-bold">{projects.length}</span>
                <span className="text-xs text-slate-400">₱133.0M Baseline</span>
              </div>
              <p className={`text-xs ${mutedText} mt-2`}>100% On-Time Execution</p>
            </div>

            <div className={`p-5 rounded-xl border ${cardBg}`}>
              <span className={`text-xs font-medium uppercase tracking-wider ${mutedText}`}>Multi-Tenant Organizations</span>
              <div className="flex items-baseline justify-between mt-2">
                <span className={`text-3xl font-serif ${headerText} font-bold`}>{organizations.length}</span>
                <span className="text-xs text-emerald-400">Strictly Isolated</span>
              </div>
              <p className={`text-xs ${mutedText} mt-2`}>Clients, Suppliers, Partners</p>
            </div>

            <div className={`p-5 rounded-xl border ${cardBg}`}>
              <span className={`text-xs font-medium uppercase tracking-wider ${mutedText}`}>Maker-Checker Queue</span>
              <div className="flex items-baseline justify-between mt-2">
                <span className="text-3xl font-serif text-amber-400 font-bold">{makerCheckerQueue.length}</span>
                <span className="text-xs text-amber-400">Action Required</span>
              </div>
              <p className={`text-xs ${mutedText} mt-2`}>₱12.75M pending release</p>
            </div>

            <div className={`p-5 rounded-xl border ${cardBg}`}>
              <span className={`text-xs font-medium uppercase tracking-wider ${mutedText}`}>Security & Audit Events</span>
              <div className="flex items-baseline justify-between mt-2">
                <span className="text-3xl font-serif text-emerald-400 font-bold">1,842</span>
                <span className="text-xs text-emerald-400">SHA-256 Validated</span>
              </div>
              <p className={`text-xs ${mutedText} mt-2`}>Zero tampering detected</p>
            </div>
          </div>

          {/* Maker-Checker Workflow Panel */}
          <div className={`p-6 rounded-xl border ${cardBg}`}>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className={`text-base font-serif ${headerText}`}>Pending Maker-Checker Authorizations</h2>
                <p className={`text-xs ${mutedText}`}>Dual-control governance required before release of capital or CDE freeze changes.</p>
              </div>
              <span className="text-xs text-[#C6922D] font-bold">Four-Eyes Principle Enforced</span>
            </div>

            <div className="space-y-3">
              {makerCheckerQueue.map((item) => (
                <div
                  key={item.id}
                  className={`p-4 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                    item.status === 'APPROVED'
                      ? 'bg-emerald-950/20 border-emerald-800/40'
                      : isLight
                      ? 'bg-slate-50 border-slate-200'
                      : 'bg-slate-800/50 border-slate-700'
                  }`}
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-bold text-[#C6922D]">{item.id}</span>
                      <span className={`text-xs font-semibold ${headerText}`}>{item.description}</span>
                    </div>
                    <p className={`text-xs ${mutedText} mt-1`}>
                      Initiated by: {item.maker} • Value: {(item?.amountPHP ?? 0) > 0 ? `₱${(((item?.amountPHP ?? 0)) / 1e6).toFixed(2)}M` : 'Governance Policy'}
                    </p>
                    <p className={`text-[11px] ${mutedText}`}>Timestamp: {item.createdDate} • Status: {item.status}</p>
                  </div>

                  <div className="flex items-center gap-2">
                    {item.status === 'APPROVED' ? (
                      <span className="px-3 py-1 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-bold flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Approved
                      </span>
                    ) : (
                      <button
                        onClick={() => handleApproveMakerChecker(item.id)}
                        className="px-4 py-2 rounded-lg bg-[#C6922D] hover:bg-[#dfad4b] text-slate-950 font-bold text-xs uppercase tracking-wider transition-colors"
                      >
                        Counter-Sign & Release
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 2. MULTI-TENANT ORGANIZATIONS */}
      {route === 'organizations' && (
        <div className={`p-6 rounded-xl border ${cardBg}`}>
          <h2 className={`text-lg font-serif ${headerText} mb-4`}>Platform Tenants & Organizations</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className={`border-b ${isLight ? 'border-slate-200 text-slate-600' : 'border-slate-800 text-slate-400'}`}>
                <tr>
                  <th className="pb-3 font-semibold uppercase tracking-wider">Org Code</th>
                  <th className="pb-3 font-semibold uppercase tracking-wider">Legal Entity</th>
                  <th className="pb-3 font-semibold uppercase tracking-wider">Type</th>
                  <th className="pb-3 font-semibold uppercase tracking-wider">SEC / DTI</th>
                  <th className="pb-3 font-semibold uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className={`divide-y ${isLight ? 'divide-slate-200' : 'divide-slate-800'}`}>
                {organizations.map((org) => (
                  <tr key={org.id} className="hover:bg-slate-800/20">
                    <td className="py-3 font-mono text-[#C6922D] font-bold">{org.registrationNumber}</td>
                    <td className={`py-3 font-medium ${headerText}`}>{org.name}</td>
                    <td className="py-3 text-slate-400">{org.type}</td>
                    <td className="py-3 font-mono text-slate-300">{org.taxIdentificationNumber}</td>
                    <td className="py-3">
                      <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                        {org.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 3. AUDIT TRAIL */}
      {route === 'audit' && (
        <div className={`p-6 rounded-xl border ${cardBg}`}>
          <h2 className={`text-lg font-serif ${headerText} mb-4`}>Cryptographic Audit Trail (SHA-256 Ledger)</h2>
          <div className="space-y-3">
            {auditLogs.map((log) => (
              <div key={log.id} className="p-3 bg-slate-800/40 rounded-lg border border-slate-700 text-xs flex justify-between items-center">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[#C6922D] font-bold">{log.action}</span>
                    <span className="text-white">{log.resourceType}: {log.resourceId}</span>
                  </div>
                  <p className="text-slate-400 text-[11px] mt-0.5">By: {log.actorName} ({log.actorRole}) • IP: {log.ipAddress}</p>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-slate-400 font-mono">{log.timestamp}</span>
                  <p className="text-[9px] text-slate-500 font-mono truncate w-32">{log.sha256Hash || 'HASH-VERIFIED'}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 4. EMERGENCY SYSTEM FREEZE & DUAL APPROVAL */}
      {route === 'system' && (
        <div className={`p-6 rounded-xl border ${cardBg} space-y-6`}>
          <div>
            <h2 className={`text-lg font-serif ${headerText}`}>System Freeze & Emergency Governance Controls</h2>
            <p className={`text-xs ${mutedText}`}>
              Initiating a system freeze sets all projects, CDE documents, and commercial tenders to read-only status.
            </p>
          </div>

          <div className="p-6 rounded-xl bg-red-950/20 border border-red-800/40 space-y-4">
            <div className="flex items-center gap-3">
              <ShieldAlert className="w-8 h-8 text-red-400 shrink-0" />
              <div>
                <h3 className="text-base font-serif text-white font-bold">Emergency Kill-Switch / Legal Freeze Protocol</h3>
                <p className="text-xs text-slate-300">Requires dual authorization from Executive Director and Security Officer.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block text-slate-400 mb-1">Audit / Freeze Justification</label>
                <input
                  type="text"
                  value={freezeReason}
                  onChange={(e) => setFreezeReason(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded px-3 py-2 text-white"
                />
              </div>
              <div>
                <label className="block text-slate-400 mb-1">Dual Approvers Sign-off</label>
                <input
                  type="text"
                  value={freezeAuthorizedBy}
                  onChange={(e) => setFreezeAuthorizedBy(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded px-3 py-2 text-white"
                />
              </div>
            </div>

            <button
              onClick={handleToggleFreeze}
              className={`px-5 py-2.5 rounded-lg font-bold text-xs uppercase tracking-wider transition-colors ${
                isSystemFrozen
                  ? 'bg-emerald-600 hover:bg-emerald-500 text-white'
                  : 'bg-red-600 hover:bg-red-500 text-white'
              }`}
            >
              {isSystemFrozen ? 'Authorize Release & Restore Operations' : 'ENGAGE ENTERPRISE SYSTEM FREEZE'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
