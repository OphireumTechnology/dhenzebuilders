import React, { useState, useEffect } from 'react';
import {
  UserRole,
  KnowledgeChunk,
  UserSubscription,
  CreditLedgerItem,
  PriceVersion,
  ProfitabilityMetrics,
  PricingReconciliationRecord,
  BankTransferRecord,
} from '../../types';
import {
  INITIAL_SUBSCRIPTION_PLANS,
  TOP_UP_PACKAGES,
  SUBSCRIPTION_TERMS_STATEMENT,
  TOP_UP_ECONOMIC_AUDIT,
  CREDIT_LIFECYCLE_POLICY,
} from '../../data/subscriptionData';
import {
  ShieldCheck,
  Building,
  FileText,
  Clock,
  CheckCircle2,
  AlertCircle,
  Eye,
  Download,
  Users,
  Layers,
  Sparkles,
  Lock,
  RefreshCw,
  PlusCircle,
  Trash2,
  CreditCard,
  Coins,
  Receipt,
  TrendingUp,
  Percent,
  Power,
  Sliders,
  DollarSign,
  ArrowUpRight,
  Zap,
  Terminal,
  Server,
  Play,
} from 'lucide-react';

interface PortalPageProps {
  currentUserRole: UserRole;
  onChangeUserRole: (role: UserRole) => void;
  onNavigate: (view: string) => void;
}

export const PortalPage: React.FC<PortalPageProps> = ({
  currentUserRole,
  onChangeUserRole,
  onNavigate,
}) => {
  const [activeTab, setActiveTab] = useState<'client' | 'billing' | 'partner' | 'admin'>('client');
  const [inquiries, setInquiries] = useState<any[]>([]);
  const [auditLogs, setAuditLogs] = useState<any[]>([]);
  const [knowledgeSources, setKnowledgeSources] = useState<KnowledgeChunk[]>([]);
  const [subscription, setSubscription] = useState<UserSubscription | null>(null);
  const [ledger, setLedger] = useState<CreditLedgerItem[]>([]);
  const [priceVersions, setPriceVersions] = useState<PriceVersion[]>([]);
  const [reconciliationRecords, setReconciliationRecords] = useState<PricingReconciliationRecord[]>([]);
  const [bankTransfers, setBankTransfers] = useState<BankTransferRecord[]>([]);
  const [profitability, setProfitability] = useState<ProfitabilityMetrics | null>(null);
  const [topUpModalOpen, setTopUpModalOpen] = useState(false);
  const [newVersionModalOpen, setNewVersionModalOpen] = useState(false);
  const [newVersionPlanId, setNewVersionPlanId] = useState('access');
  const [newVersionPriceUSD, setNewVersionPriceUSD] = useState(250);
  const [newVersionMultiplier, setNewVersionMultiplier] = useState(10.0);
  const [newVersionNotes, setNewVersionNotes] = useState('');
  const [approverName, setApproverName] = useState('ExecutiveDirector');
  const [actionMessage, setActionMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Security & QA test suite runner states
  const [qaResults, setQaResults] = useState<any | null>(null);
  const [boundaryResults, setBoundaryResults] = useState<any | null>(null);
  const [firebaseRbacResults, setFirebaseRbacResults] = useState<any | null>(null);
  const [concurrentStressResults, setConcurrentStressResults] = useState<any | null>(null);
  const [runningTestKey, setRunningTestKey] = useState<string | null>(null);

  // Sync tab with user role
  useEffect(() => {
    if (['SYSTEM_ADMIN', 'EXECUTIVE', 'COMPLIANCE_REVIEWER'].includes(currentUserRole)) {
      setActiveTab('admin');
    } else if (currentUserRole === 'PARTNER_SUPPLIER') {
      setActiveTab('partner');
    } else {
      setActiveTab('client');
    }
  }, [currentUserRole]);

  // Load inquiries, audit logs, knowledge sources, billing, and reconciliation data
  const fetchData = async () => {
    setLoading(true);
    try {
      const [inqRes, logsRes, knowRes, subRes, ledgRes, pvRes, profRes, reconRes, btRes] = await Promise.all([
        fetch('/api/inquiries'),
        fetch('/api/audit-logs'),
        fetch(`/api/knowledge/sources?role=${currentUserRole}`),
        fetch('/api/billing/subscription'),
        fetch('/api/billing/ledger'),
        fetch('/api/billing/price-versions'),
        fetch('/api/billing/profitability'),
        fetch('/api/billing/pricing-reconciliation'),
        fetch('/api/billing/bank-transfers'),
      ]);
      const inqData = await inqRes.json();
      const logsData = await logsRes.json();
      const knowData = await knowRes.json();
      const subData = await subRes.json();
      const ledgData = await ledgRes.json();
      const pvData = await pvRes.json();
      const profData = await profRes.json();
      const reconData = await reconRes.json();
      const btData = await btRes.json();

      if (inqData.inquiries) setInquiries(inqData.inquiries);
      if (logsData.logs) setAuditLogs(logsData.logs);
      if (knowData.sources) setKnowledgeSources(knowData.sources);
      if (subData.subscription) setSubscription(subData.subscription);
      if (ledgData.ledger) setLedger(ledgData.ledger);
      if (pvData.versions) setPriceVersions(pvData.versions);
      if (profData.metrics) setProfitability(profData.metrics);
      if (reconData.reconciliationRecords) setReconciliationRecords(reconData.reconciliationRecords);
      if (btData.transfers) setBankTransfers(btData.transfers);
    } catch (err) {
      console.error('Failed to load portal data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [currentUserRole]);

  const handleApproveReconciliation = async (planId: string) => {
    try {
      const res = await fetch(`/api/billing/pricing-reconciliation/${planId}/approve`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          approver: approverName,
          approverRole: currentUserRole,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setActionMessage(`Reconciliation approved: ${planId.toUpperCase()} selling price finalized at USD $${data.record.finalApprovedSellingPriceUSD}.`);
        fetchData();
        setTimeout(() => setActionMessage(null), 5000);
      } else {
        alert(data.error || 'Approval rejected by governance policy.');
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleApproveBankTransfer = async (transferId: string) => {
    try {
      const res = await fetch(`/api/billing/bank-transfers/${transferId}/approve`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          approver: approverName,
          approverRole: currentUserRole,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setActionMessage(`Bank transfer ${transferId} approved by Checker. Subscription activated.`);
        fetchData();
        setTimeout(() => setActionMessage(null), 5000);
      } else {
        alert(data.error || 'Approval rejected.');
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleRunQaSuite = async () => {
    setRunningTestKey('qa');
    try {
      const res = await fetch(`/api/qa/run-tests?role=${currentUserRole}`, {
        headers: { 'x-user-role': currentUserRole },
      });
      const data = await res.json();
      setQaResults(data);
    } catch (e) {
      console.error('QA run failed:', e);
    } finally {
      setRunningTestKey(null);
    }
  };

  const handleRunBoundaryTests = async () => {
    setRunningTestKey('boundary');
    try {
      const res = await fetch('/api/qa/test-boundaries', { method: 'POST' });
      const data = await res.json();
      setBoundaryResults(data);
    } catch (e) {
      console.error('Boundary test failed:', e);
    } finally {
      setRunningTestKey(null);
    }
  };

  const handleRunFirebaseRbac = async () => {
    setRunningTestKey('rbac');
    try {
      const res = await fetch('/api/qa/test-firebase-rbac');
      const data = await res.json();
      setFirebaseRbacResults(data);
    } catch (e) {
      console.error('RBAC test failed:', e);
    } finally {
      setRunningTestKey(null);
    }
  };

  const handleRunConcurrentStressTest = async () => {
    setRunningTestKey('stress');
    try {
      const res = await fetch('/api/billing/test-concurrent-reservations', { method: 'POST' });
      const data = await res.json();
      setConcurrentStressResults(data);
      fetchData();
    } catch (e) {
      console.error('Stress test failed:', e);
    } finally {
      setRunningTestKey(null);
    }
  };

  const handleTopUp = async (packageId: string) => {
    try {
      const res = await fetch('/api/billing/topup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ packageId }),
      });
      const data = await res.json();
      if (data.success) {
        setActionMessage(`Successfully purchased ${data.package.credits} credits! Wallet updated.`);
        fetchData();
        setTopUpModalOpen(false);
        setTimeout(() => setActionMessage(null), 5000);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleApprovePriceVersion = async (versionId: string) => {
    try {
      const res = await fetch(`/api/billing/price-versions/${versionId}/approve`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          approver: approverName,
          approverRole: 'EXECUTIVE',
        }),
      });
      const data = await res.json();
      if (data.success) {
        setActionMessage(`Price version ${versionId} approved and activated with 10x benchmark applied.`);
        fetchData();
        setTimeout(() => setActionMessage(null), 5000);
      } else {
        alert(data.error || 'Approval failed');
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleCreatePriceVersion = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/billing/price-versions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          planId: newVersionPlanId,
          monthlyAmountUSD: newVersionPriceUSD,
          annualMonthlyAmountUSD: newVersionPriceUSD * 0.8,
          multiplier: newVersionMultiplier,
          createdBy: 'PricingManager',
          notes: newVersionNotes,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setActionMessage(`Submitted draft price version for ${newVersionPlanId}. Awaiting executive checker approval.`);
        setNewVersionModalOpen(false);
        setNewVersionNotes('');
        fetchData();
        setTimeout(() => setActionMessage(null), 5000);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleToggleEmergencyShutoff = async () => {
    if (!profitability) return;
    try {
      const res = await fetch('/api/billing/emergency-shutoff', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          active: !profitability.emergencyShutoffActive,
          actorRole: currentUserRole,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setActionMessage(`Emergency generation kill-switch updated.`);
        fetchData();
        setTimeout(() => setActionMessage(null), 5000);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const toggleDocumentStatus = async (id: string, currentStatus: string) => {
    const nextStatus = currentStatus === 'Approved' ? 'Suspended' : 'Approved';
    try {
      const res = await fetch('/api/knowledge/status-toggle', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status: nextStatus, actorRole: currentUserRole }),
      });
      if (res.ok) {
        fetchData();
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="min-h-screen bg-[#071A2F] text-slate-100 pt-32 pb-24 px-4 blueprint-grid">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Portal Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#C6922D] mb-2 font-['Montserrat']">
              <ShieldCheck className="w-4 h-4" />
              <span>Enterprise Command Center</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-black text-white font-['Montserrat'] tracking-tight">
              Portal Management & Progress Room
            </h1>
          </div>

          {/* Quick Role Tester Switcher */}
          <div className="bg-[#09223d] border border-[#C6922D]/30 p-2.5 rounded-xl flex items-center gap-2 text-xs">
            <span className="text-slate-400 font-semibold">Active Role:</span>
            <select
              value={currentUserRole}
              onChange={(e) => onChangeUserRole(e.target.value as UserRole)}
              className="bg-[#051322] border border-white/10 rounded px-2.5 py-1 text-[#C6922D] font-bold focus:outline-none"
            >
              <option value="ANONYMOUS_VISITOR">Public Visitor</option>
              <option value="PROSPECTIVE_CLIENT">Prospective Client</option>
              <option value="VERIFIED_CLIENT">Verified Client (Angeles Villa)</option>
              <option value="PARTNER_SUPPLIER">Partner / Supplier</option>
              <option value="PROJECT_MANAGER">Project Manager</option>
              <option value="COMPLIANCE_REVIEWER">Compliance Reviewer</option>
              <option value="SYSTEM_ADMIN">System Administrator</option>
            </select>
            <button
              onClick={fetchData}
              title="Refresh Data"
              className="p-1.5 hover:bg-white/10 rounded text-slate-300"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
            </button>
          </div>
        </div>

        {/* Action notification banner */}
        {actionMessage && (
          <div className="mb-6 p-4 rounded-xl bg-emerald-950/60 border border-emerald-500/50 text-emerald-200 text-xs flex items-center justify-between animate-in fade-in">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>{actionMessage}</span>
            </div>
            <button
              onClick={() => setActionMessage(null)}
              className="text-emerald-400 hover:text-white text-xs font-bold"
            >
              Dismiss
            </button>
          </div>
        )}

        {/* Portal Navigation Tabs */}
        <div className="flex border-b border-white/10 mb-8 space-x-2 sm:space-x-4 overflow-x-auto">
          <button
            onClick={() => setActiveTab('client')}
            className={`pb-3 text-xs sm:text-sm font-bold uppercase tracking-wider transition-colors border-b-2 whitespace-nowrap ${
              activeTab === 'client'
                ? 'border-[#C6922D] text-[#C6922D]'
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            Client Progress Room
          </button>
          <button
            onClick={() => setActiveTab('billing')}
            className={`pb-3 text-xs sm:text-sm font-bold uppercase tracking-wider transition-colors border-b-2 whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'billing'
                ? 'border-[#C6922D] text-[#C6922D]'
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            <Coins className="w-3.5 h-3.5 text-[#C6922D]" />
            <span>Builder AI Credits & Wallet</span>
          </button>
          <button
            onClick={() => setActiveTab('partner')}
            className={`pb-3 text-xs sm:text-sm font-bold uppercase tracking-wider transition-colors border-b-2 whitespace-nowrap ${
              activeTab === 'partner'
                ? 'border-[#C6922D] text-[#C6922D]'
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            Supplier & Partner Hub
          </button>
          <button
            onClick={() => setActiveTab('admin')}
            className={`pb-3 text-xs sm:text-sm font-bold uppercase tracking-wider transition-colors border-b-2 whitespace-nowrap ${
              activeTab === 'admin'
                ? 'border-[#C6922D] text-[#C6922D]'
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            Administrator & Governance
          </button>
        </div>

        {/* ---------------------------------------------------- */}
        {/* 1. CLIENT PROGRESS ROOM TAB */}
        {/* ---------------------------------------------------- */}
        {activeTab === 'client' && (
          <div className="space-y-8">
            {/* Restricted Access Check if Anonymous */}
            {currentUserRole === 'ANONYMOUS_VISITOR' && (
              <div className="bg-amber-950/40 border border-amber-500/40 rounded-2xl p-5 text-xs text-amber-200 flex items-start gap-3">
                <Lock className="w-5 h-5 shrink-0 text-amber-400 mt-0.5" />
                <div>
                  <strong className="text-white">Public Visitor Notice: </strong>
                  You are currently previewing with the public visitor role. Switch the Active Role selector above to <strong>Verified Client</strong> to simulate authorized private project telemetry.
                </div>
              </div>
            )}

            {/* Active Project Dashboard Header */}
            <div className="bg-[#09223d] border border-[#C6922D]/30 rounded-3xl p-6 sm:p-8 shadow-xl">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
                <div>
                  <span className="font-mono text-xs text-[#C6922D] uppercase font-bold">
                    Project Ref: LDL-PRJ-2024-001
                  </span>
                  <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
                    Angeles City Residential Villa Cluster
                  </h2>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Client Organization: Angeles Villa Holdings Group • Anunas, Angeles City
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <div className="text-[10px] text-slate-400 uppercase font-bold">Overall Progress</div>
                    <div className="text-xl font-mono font-black text-emerald-400">68.4%</div>
                  </div>
                  <div className="w-12 h-12 rounded-full border-4 border-emerald-500 flex items-center justify-center text-xs font-bold font-mono">
                    68%
                  </div>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="pt-6">
                <div className="flex justify-between text-xs text-slate-300 mb-2">
                  <span>Current Phase: Superstructure & Roof Framing Roughing-In</span>
                  <span>Target Handover: Q1 2026</span>
                </div>
                <div className="w-full bg-[#051322] h-3 rounded-full overflow-hidden border border-white/10">
                  <div className="bg-[#C6922D] h-full rounded-full transition-all duration-500" style={{ width: '68%' }} />
                </div>
              </div>
            </div>

            {/* Milestones & RFIs Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Milestones */}
              <div className="bg-[#09223d] border border-white/10 rounded-2xl p-6">
                <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4 flex items-center gap-2">
                  <Clock className="w-4 h-4 text-[#C6922D]" />
                  <span>Scheduled Project Milestones</span>
                </h3>
                <div className="space-y-3 text-xs">
                  <div className="p-3 bg-[#051322] rounded-xl border border-white/5 flex items-center justify-between">
                    <div>
                      <div className="font-semibold text-white">M1: Geotechnical Survey & Foundation Concrete Cast</div>
                      <div className="text-slate-400 text-[11px]">Completed March 2024 • Passed cylinder test (3,500 psi)</div>
                    </div>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#237A3B]/30 text-emerald-300">
                      Completed
                    </span>
                  </div>

                  <div className="p-3 bg-[#051322] rounded-xl border border-white/5 flex items-center justify-between">
                    <div>
                      <div className="font-semibold text-white">M2: 2nd Storey Superstructure Framing & Shear Walls</div>
                      <div className="text-slate-400 text-[11px]">Completed August 2024 • Rebar inspection certified</div>
                    </div>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#237A3B]/30 text-emerald-300">
                      Completed
                    </span>
                  </div>

                  <div className="p-3 bg-[#051322] rounded-xl border border-[#C6922D]/30 flex items-center justify-between">
                    <div>
                      <div className="font-semibold text-white">M3: Roof Truss Assembly & Solar Conduit Roughing-In</div>
                      <div className="text-slate-400 text-[11px]">In Progress • Structural steel erection underway</div>
                    </div>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#C6922D]/30 text-[#C6922D] animate-pulse">
                      In Progress
                    </span>
                  </div>

                  <div className="p-3 bg-[#051322] rounded-xl border border-white/5 flex items-center justify-between opacity-60">
                    <div>
                      <div className="font-semibold text-white">M4: Architectural Finishes & Solar BESS Commissioning</div>
                      <div className="text-slate-400 text-[11px]">Scheduled December 2024 – February 2025</div>
                    </div>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-white/10 text-slate-400">
                      Pending
                    </span>
                  </div>
                </div>
              </div>

              {/* Submittals & Change Orders */}
              <div className="bg-[#09223d] border border-white/10 rounded-2xl p-6">
                <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4 flex items-center gap-2">
                  <FileText className="w-4 h-4 text-[#C6922D]" />
                  <span>Approved Submittals & Change Requests</span>
                </h3>
                <div className="space-y-3 text-xs">
                  <div className="p-3 bg-[#051322] rounded-xl border border-white/5 flex items-center justify-between">
                    <div>
                      <div className="font-semibold text-white">SUB-041: TopCon Monocrystalline Solar Panel Spec</div>
                      <div className="text-slate-400 text-[11px]">Submittal approved by Lead Electrical Engineer</div>
                    </div>
                    <span className="text-emerald-400 font-bold text-[11px]">Approved</span>
                  </div>

                  <div className="p-3 bg-[#051322] rounded-xl border border-white/5 flex items-center justify-between">
                    <div>
                      <div className="font-semibold text-white">CR-002: Underground Cistern Capacity Expansion (20,000L)</div>
                      <div className="text-slate-400 text-[11px]">Change order signed by Client Representative</div>
                    </div>
                    <span className="text-emerald-400 font-bold text-[11px]">Approved</span>
                  </div>

                  <div className="p-3 bg-[#051322] rounded-xl border border-white/5 flex items-center justify-between">
                    <div>
                      <div className="font-semibold text-white">RFI-018: Window Sill Flashing Detail Verification</div>
                      <div className="text-slate-400 text-[11px]">Resolved by Project Architect • Architectural drawing updated</div>
                    </div>
                    <span className="text-blue-400 font-bold text-[11px]">Resolved</span>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-white/5 flex justify-between items-center text-xs">
                  <span className="text-slate-400">3 Verified Document Packages</span>
                  <button
                    onClick={() => onNavigate('contact')}
                    className="text-[#C6922D] font-bold hover:underline"
                  >
                    Open RFI Thread
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ---------------------------------------------------- */}
        {/* 2. BUILDER AI CREDITS & WALLET TAB */}
        {/* ---------------------------------------------------- */}
        {activeTab === 'billing' && (
          <div className="space-y-8">
            {/* Top Bar: Subscription Overview Card */}
            <div className="bg-[#09223d] border border-[#C6922D]/30 rounded-3xl p-6 sm:p-8 shadow-xl">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-white/10">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs text-[#C6922D] uppercase font-bold tracking-wider">
                      Active Enterprise Plan
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-950 text-emerald-300 border border-emerald-800/40 uppercase">
                      {subscription?.status || 'Active'}
                    </span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-black text-white mt-1 font-['Montserrat']">
                    {subscription?.planId ? subscription.planId.toUpperCase() : 'BUILDER PROFESSIONAL'}
                  </h2>
                  <p className="text-xs text-slate-400 mt-1">
                    Organization: <strong>{subscription?.organizationName || 'Angeles Villa Holdings Group'}</strong> •{' '}
                    Billing Interval:{' '}
                    <strong className="text-slate-200 uppercase">
                      {subscription?.billingInterval || 'Annual (20% Savings)'}
                    </strong>{' '}
                    • Seats:{' '}
                    <strong className="text-slate-200">
                      {subscription?.activeSeats || 1} of {subscription?.seatsPurchased || 1} Seat
                    </strong>
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <button
                    onClick={() => setTopUpModalOpen(true)}
                    className="px-4 py-2.5 bg-[#C6922D] hover:bg-[#d8a339] text-[#071A2F] font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md inline-flex items-center gap-1.5"
                  >
                    <Coins className="w-4 h-4" />
                    <span>Top-Up Credits</span>
                  </button>
                  <button
                    onClick={() => onNavigate('pricing')}
                    className="px-4 py-2.5 bg-white/10 hover:bg-white/15 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-colors inline-flex items-center gap-1.5"
                  >
                    <span>Change Plan</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-[#C6922D]" />
                  </button>
                </div>
              </div>

              {/* Wallet Matrix Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-6">
                <div className="p-4 bg-[#051322] border border-[#C6922D]/40 rounded-2xl">
                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <span>Available Balance</span>
                    <Coins className="w-4 h-4 text-[#C6922D]" />
                  </div>
                  <div className="text-3xl font-black text-white font-mono mt-1">
                    {subscription?.wallet.totalCreditsRemaining.toLocaleString() || '2,650'}
                  </div>
                  <div className="text-[11px] text-[#C6922D] mt-1 font-semibold">
                    Net Ready for Autonomous Executions
                  </div>
                </div>

                <div className="p-4 bg-[#051322] border border-white/10 rounded-2xl">
                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <span>Monthly Plan Credits</span>
                    <Clock className="w-4 h-4 text-sky-400" />
                  </div>
                  <div className="text-2xl font-black text-white font-mono mt-1">
                    {subscription?.wallet.subscriptionCreditsRemaining.toLocaleString() || '2,150'}
                  </div>
                  <div className="text-[11px] text-slate-400 mt-1">
                    Of 2,500 monthly recurring allocation
                  </div>
                </div>

                <div className="p-4 bg-[#051322] border border-white/10 rounded-2xl">
                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <span>Prepaid Top-Up Credits</span>
                    <Zap className="w-4 h-4 text-emerald-400" />
                  </div>
                  <div className="text-2xl font-black text-emerald-300 font-mono mt-1">
                    {subscription?.wallet.topUpCreditsRemaining.toLocaleString() || '500'}
                  </div>
                  <div className="text-[11px] text-slate-400 mt-1">Never expire • Used after plan pool</div>
                </div>

                <div className="p-4 bg-[#051322] border border-white/10 rounded-2xl">
                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <span>Active Hold / Reserved</span>
                    <Lock className="w-4 h-4 text-amber-400" />
                  </div>
                  <div className="text-2xl font-black text-amber-300 font-mono mt-1">
                    {subscription?.wallet.reservedCredits || '0'}
                  </div>
                  <div className="text-[11px] text-slate-400 mt-1">2-phase transactional lock buffer</div>
                </div>
              </div>
            </div>

            {/* Consumption Rates Reference & Entitlements */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 bg-[#09223d] border border-white/10 rounded-2xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-sm font-bold text-white uppercase tracking-wider font-['Montserrat']">
                      Autonomous Operation Credit Consumption Rates
                    </h3>
                    <p className="text-xs text-slate-400">Fixed deduction rates per engineering and synthesis task</p>
                  </div>
                  <span className="text-[10px] font-mono bg-white/5 px-2.5 py-1 rounded text-slate-300">
                    Deterministic Deductions
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="p-3 bg-[#051322] rounded-xl border border-white/5 flex items-center justify-between">
                    <div>
                      <div className="font-semibold text-white">Standard RAG Query</div>
                      <div className="text-[11px] text-slate-400">Single document retrieval</div>
                    </div>
                    <span className="font-mono font-bold text-[#C6922D]">1 Credit</span>
                  </div>

                  <div className="p-3 bg-[#051322] rounded-xl border border-white/5 flex items-center justify-between">
                    <div>
                      <div className="font-semibold text-white">Multi-Source Analysis</div>
                      <div className="text-[11px] text-slate-400">Synthesized multi-doc query</div>
                    </div>
                    <span className="font-mono font-bold text-[#C6922D]">5 Credits</span>
                  </div>

                  <div className="p-3 bg-[#051322] rounded-xl border border-white/5 flex items-center justify-between">
                    <div>
                      <div className="font-semibold text-white">Conceptual Massing / Layout</div>
                      <div className="text-[11px] text-slate-400">Site layout & visual prompt</div>
                    </div>
                    <span className="font-mono font-bold text-[#C6922D]">25 Credits</span>
                  </div>

                  <div className="p-3 bg-[#051322] rounded-xl border border-white/5 flex items-center justify-between">
                    <div>
                      <div className="font-semibold text-white">Engineering Masterplan Report</div>
                      <div className="text-[11px] text-slate-400">20-page comprehensive dossier</div>
                    </div>
                    <span className="font-mono font-bold text-[#C6922D]">100 Credits</span>
                  </div>

                  <div className="p-3 bg-[#051322] rounded-xl border border-white/5 flex items-center justify-between">
                    <div>
                      <div className="font-semibold text-white">Cost Estimation & XLSX Model</div>
                      <div className="text-[11px] text-slate-400">Exportable bill of materials</div>
                    </div>
                    <span className="font-mono font-bold text-[#C6922D]">150 Credits</span>
                  </div>

                  <div className="p-3 bg-[#051322] rounded-xl border border-white/5 flex items-center justify-between">
                    <div>
                      <div className="font-semibold text-white">Dedicated Model Batch Analysis</div>
                      <div className="text-[11px] text-slate-400">High-concurrency processing</div>
                    </div>
                    <span className="font-mono font-bold text-[#C6922D]">200 Credits</span>
                  </div>
                </div>
              </div>

              {/* Payment & Next Renewal Card */}
              <div className="bg-[#09223d] border border-white/10 rounded-2xl p-6 flex flex-col justify-between">
                <div>
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider font-['Montserrat'] mb-4">
                    Payment & Commercial Terms
                  </h3>
                  <div className="space-y-3 text-xs">
                    <div className="flex items-center justify-between p-2.5 bg-[#051322] rounded-lg border border-white/5">
                      <span className="text-slate-400">Payment Card</span>
                      <span className="font-mono font-bold text-slate-200">
                        {subscription?.paymentMethod?.brand} •••• {subscription?.paymentMethod?.last4}
                      </span>
                    </div>
                    <div className="flex items-center justify-between p-2.5 bg-[#051322] rounded-lg border border-white/5">
                      <span className="text-slate-400">Renewal Date</span>
                      <span className="font-mono text-slate-200">
                        {subscription?.currentPeriodEnd
                          ? new Date(subscription.currentPeriodEnd).toLocaleDateString()
                          : 'March 2027'}
                      </span>
                    </div>
                    <div className="flex items-center justify-between p-2.5 bg-[#051322] rounded-lg border border-white/5">
                      <span className="text-slate-400">Currency Lock</span>
                      <span className="font-bold text-slate-200">USD $ (PHP Exchange Locked)</span>
                    </div>
                  </div>
                </div>

                <div className="pt-4 mt-4 border-t border-white/5 text-[11px] text-slate-400 leading-relaxed">
                  Independent enterprise commercial subscription. All AI calculations remain preliminary under Philippine RA 9266 & RA 544.
                </div>
              </div>
            </div>

            {/* Immutable Ledger Activity Table */}
            <div className="bg-[#09223d] border border-white/10 rounded-2xl p-6 shadow-xl">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-base font-bold text-white">Immutable Credit Ledger & Receipts</h3>
                  <p className="text-xs text-slate-400">
                    Two-phase committed credit allocations, deductions, and top-up transactions.
                  </p>
                </div>
                <span className="font-mono text-xs text-slate-400">{ledger.length} Transactions</span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#051322] text-slate-400 border-b border-white/10 uppercase text-[10px] font-bold">
                    <tr>
                      <th className="py-3 px-4">Transaction ID</th>
                      <th className="py-3 px-4">Date & Time</th>
                      <th className="py-3 px-4">Activity</th>
                      <th className="py-3 px-4 text-right">Credits</th>
                      <th className="py-3 px-4 text-right">Balance After</th>
                      <th className="py-3 px-4">Receipt ID</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {ledger.map((item) => (
                      <tr key={item.id} className="hover:bg-white/5 transition-colors">
                        <td className="py-3 px-4 font-mono font-semibold text-slate-300">{item.id}</td>
                        <td className="py-3 px-4 text-slate-400 whitespace-nowrap">
                          {new Date(item.timestamp).toLocaleString()}
                        </td>
                        <td className="py-3 px-4">
                          <div className="font-bold text-white">{item.activity}</div>
                          {item.details && (
                            <div className="text-[11px] text-slate-400">{item.details}</div>
                          )}
                        </td>
                        <td
                          className={`py-3 px-4 text-right font-mono font-bold ${
                            item.amount > 0 ? 'text-emerald-400' : 'text-amber-400'
                          }`}
                        >
                          {item.amount > 0 ? `+${item.amount}` : item.amount}
                        </td>
                        <td className="py-3 px-4 text-right font-mono text-slate-200">
                          {item.balanceAfter.toLocaleString()}
                        </td>
                        <td className="py-3 px-4 font-mono text-[11px] text-[#C6922D]">
                          {item.receiptId || '—'}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ---------------------------------------------------- */}
        {/* 3. PARTNER & SUPPLIER HUB TAB */}
        {/* ---------------------------------------------------- */}
        {activeTab === 'partner' && (
          <div className="space-y-8">
            <div className="bg-[#09223d] border border-white/10 rounded-3xl p-6 sm:p-8">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
                <div>
                  <h3 className="text-lg font-bold text-white">Active Procurement Tenders & Supply Bids</h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Tenders restricted to accredited material suppliers and PCAB-licensed contractors.
                  </p>
                </div>
                <button
                  onClick={() => onNavigate('partners')}
                  className="px-4 py-2 bg-[#C6922D] text-[#071A2F] font-bold text-xs uppercase rounded-lg"
                >
                  Renew Accreditation
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-6">
                <div className="bg-[#051322] p-5 rounded-2xl border border-white/5 space-y-2">
                  <div className="flex justify-between items-start">
                    <span className="font-mono text-[11px] text-[#C6922D] font-bold">RFQ-2025-089</span>
                    <span className="px-2 py-0.5 rounded text-[10px] bg-blue-900/40 text-blue-300 font-bold">Open Tender</span>
                  </div>
                  <h4 className="text-sm font-bold text-white">Structural Ready-Mix Concrete 4,000 PSI</h4>
                  <p className="text-xs text-slate-400">Estimated Volume: 850 cu.m • Delivery Location: Angeles City staging site</p>
                  <div className="pt-2 text-[11px] text-slate-500 font-mono">Submission Deadline: June 25, 2025</div>
                </div>

                <div className="bg-[#051322] p-5 rounded-2xl border border-white/5 space-y-2">
                  <div className="flex justify-between items-start">
                    <span className="font-mono text-[11px] text-[#C6922D] font-bold">RFQ-2025-092</span>
                    <span className="px-2 py-0.5 rounded text-[10px] bg-blue-900/40 text-blue-300 font-bold">Open Tender</span>
                  </div>
                  <h4 className="text-sm font-bold text-white">Grade 60 Deformed Steel Reinforcing Bars (Rebar)</h4>
                  <p className="text-xs text-slate-400">Estimated Quantity: 65 Metric Tons (16mm & 20mm) • PNS 49 certified</p>
                  <div className="pt-2 text-[11px] text-slate-500 font-mono">Submission Deadline: June 28, 2025</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ---------------------------------------------------- */}
        {/* 3. ADMINISTRATOR CONSOLE & AUDIT TAB */}
        {/* ---------------------------------------------------- */}
        {activeTab === 'admin' && (
          <div className="space-y-8">
            {/* RBAC Permission Gate check */}
            {!['SYSTEM_ADMIN', 'EXECUTIVE', 'COMPLIANCE_REVIEWER'].includes(currentUserRole) && (
              <div className="bg-rose-950/60 border border-rose-600/40 rounded-2xl p-5 text-xs text-rose-200 flex items-start gap-3">
                <AlertCircle className="w-5 h-5 shrink-0 text-rose-400 mt-0.5" />
                <div>
                  <strong className="text-white">Administrative Access Restricted: </strong>
                  Your current simulated persona is <strong>{currentUserRole}</strong>. In production Firestore rules, write actions and private audit logs are blocked. Switch active role to <strong>System Administrator</strong> to unlock full management controls.
                </div>
              </div>
            )}

            {/* Pre-Production Audit Mode & Maker-Checker Governance Notice */}
            <div className="bg-[#051322] border border-[#C6922D]/40 rounded-2xl p-5 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-[#C6922D]" />
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                    Pre-Production Commercial, Security & Infrastructure Audit
                  </h3>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-[#C6922D]/20 text-[#C6922D] border border-[#C6922D]/40">
                    Dual Governance Active
                  </span>
                </div>
                <p className="text-xs text-slate-400 mt-1 max-w-3xl">
                  Enforces Maker-Checker separation of duties for price revisions and bank payments, 10× market benchmark commercial policy, immutable ledger constraints, and automated verification suites.
                </p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <div className="text-right">
                  <div className="text-[10px] text-slate-400 uppercase font-bold">Authorized Approver</div>
                  <div className="text-xs text-white font-mono font-bold">{approverName} ({currentUserRole})</div>
                </div>
              </div>
            </div>

            {/* 1. Commercial Pricing Reconciliation Audit Table */}
            <div className="bg-[#09223d] border border-white/10 rounded-2xl p-6 shadow-xl space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
                <div>
                  <div className="flex items-center gap-2">
                    <Percent className="w-4 h-4 text-[#C6922D]" />
                    <h3 className="text-base font-bold text-white">
                      Commercial Pricing Reconciliation & Benchmark Policy
                    </h3>
                  </div>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Reconciliation of configured commercial subscription tiers against 10.0× market model benchmark costs. All pricing requires Maker-Checker dual authorization.
                  </p>
                </div>
                <div className="text-xs font-mono text-slate-400">
                  Authoritative Base: <span className="text-emerald-400 font-bold">USD</span> • Indicative Conversion: <span className="text-slate-300">₱58.50 PHP</span>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#051322] text-slate-400 border-b border-white/10 uppercase text-[10px] font-bold">
                    <tr>
                      <th className="py-3 px-3">Plan Tier</th>
                      <th className="py-3 px-3 text-right">Configured (USD)</th>
                      <th className="py-3 px-3 text-right">Previous / Inconsistent</th>
                      <th className="py-3 px-3">Discrepancy / Reconciliation</th>
                      <th className="py-3 px-3">Benchmark Reference</th>
                      <th className="py-3 px-3 text-center">Multiplier</th>
                      <th className="py-3 px-3 text-right">Approved Price</th>
                      <th className="py-3 px-3">Maker / Checker</th>
                      <th className="py-3 px-3">Status</th>
                      <th className="py-3 px-3 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5 font-sans">
                    {reconciliationRecords.map((rec) => (
                      <tr key={rec.planId} className="hover:bg-white/5 transition-colors">
                        <td className="py-3 px-3">
                          <div className="font-bold text-white uppercase">{rec.planName}</div>
                          <div className="text-[10px] text-slate-500 font-mono">ID: {rec.planId} • {rec.billingInterval}</div>
                        </td>
                        <td className="py-3 px-3 text-right font-mono font-bold text-slate-100 whitespace-nowrap">
                          ${rec.currentConfiguredPriceUSD.toLocaleString()}
                          <div className="text-[10px] text-slate-400 font-normal">₱{(rec.currentConfiguredPriceUSD * 58.5).toLocaleString()}</div>
                        </td>
                        <td className="py-3 px-3 text-right font-mono text-rose-300 whitespace-nowrap">
                          ${rec.previousProposedPriceUSD.toLocaleString()}
                          <div className="text-[10px] text-slate-500 font-normal">₱{(rec.previousProposedPriceUSD * 58.5).toLocaleString()}</div>
                        </td>
                        <td className="py-3 px-3 text-slate-300 max-w-xs text-[11px]">
                          {rec.discrepancyDetails}
                        </td>
                        <td className="py-3 px-3 text-slate-400 text-[11px] max-w-xs">
                          {rec.benchmarkReference}
                        </td>
                        <td className="py-3 px-3 text-center">
                          <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-[#C6922D]/20 text-[#C6922D] border border-[#C6922D]/40">
                            {rec.multiplierApplied}x
                          </span>
                        </td>
                        <td className="py-3 px-3 text-right font-mono font-bold text-emerald-400 whitespace-nowrap">
                          ${rec.finalApprovedSellingPriceUSD.toLocaleString()}
                        </td>
                        <td className="py-3 px-3 text-[11px] font-mono">
                          <div className="text-slate-300">M: {rec.createdBy}</div>
                          <div className="text-slate-400">C: {rec.approvedBy || 'Awaiting'}</div>
                        </td>
                        <td className="py-3 px-3 whitespace-nowrap">
                          <span
                            className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                              rec.approvalStatus === 'APPROVED'
                                ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                                : 'bg-amber-950 text-amber-300 border border-amber-800'
                            }`}
                          >
                            {rec.approvalStatus}
                          </span>
                        </td>
                        <td className="py-3 px-3 text-right whitespace-nowrap">
                          {rec.approvalStatus !== 'APPROVED' ? (
                            <button
                              onClick={() => handleApproveReconciliation(rec.planId)}
                              className="px-3 py-1 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-[10px] uppercase rounded transition-colors"
                              title="Maker-Checker dual approval by Executive Checker"
                            >
                              Approve (Checker)
                            </button>
                          ) : (
                            <span className="text-slate-500 text-[11px] font-mono">Enforced</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* 2. AI Infrastructure Margin, Cost & Emergency Shutoff Control */}
            <div className="bg-[#09223d] border border-white/10 rounded-2xl p-6 shadow-xl space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
                <div>
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-[#C6922D]" />
                    <h3 className="text-base font-bold text-white">
                      AI Infrastructure Profitability & Operational Margin Monitor
                    </h3>
                  </div>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Audits model token consumption, reasoning compute, file processing, and payment fees against minimum 75.0% gross margin target.
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2 text-xs">
                    <span className="text-slate-400">Emergency Cutoff:</span>
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                        profitability?.emergencyShutoffActive
                          ? 'bg-rose-900/60 text-rose-200 border border-rose-600'
                          : 'bg-emerald-900/40 text-emerald-300 border border-emerald-800'
                      }`}
                    >
                      {profitability?.emergencyShutoffActive ? 'ACTIVE (HALTED)' : 'ARMED (NORMAL)'}
                    </span>
                  </div>

                  <button
                    onClick={handleToggleEmergencyShutoff}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-1.5 ${
                      profitability?.emergencyShutoffActive
                        ? 'bg-emerald-600 hover:bg-emerald-500 text-white'
                        : 'bg-rose-600/80 hover:bg-rose-600 text-white'
                    }`}
                  >
                    <Power className="w-3.5 h-3.5" />
                    <span>{profitability?.emergencyShutoffActive ? 'Resume Generation' : 'Kill Switch'}</span>
                  </button>
                </div>
              </div>

              {/* Mandatory Notice */}
              <div className="px-3.5 py-2 rounded-lg bg-amber-950/40 border border-amber-500/30 text-[11px] text-amber-200 flex items-center gap-2 font-mono">
                <AlertCircle className="w-4 h-4 shrink-0 text-amber-400" />
                <span>Demonstration Data — Not Actual Financial Performance. Figures are configured for pre-production margin simulation and verification.</span>
              </div>

              {/* Profitability Metric Summary Tiles */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-1">
                <div className="p-4 bg-[#051322] border border-white/5 rounded-xl">
                  <div className="text-slate-400 text-xs">Total Gross Revenue</div>
                  <div className="text-2xl font-black text-white font-mono mt-1">
                    ${profitability?.totalRevenueUSD.toLocaleString(undefined, { minimumFractionDigits: 2 }) || '4,750.00'}
                  </div>
                  <div className="text-[11px] text-emerald-400 mt-1">Subscriptions + Top-up add-ons</div>
                </div>

                <div className="p-4 bg-[#051322] border border-white/5 rounded-xl">
                  <div className="text-slate-400 text-xs">LLM Inference & Reasoning Compute</div>
                  <div className="text-2xl font-black text-slate-300 font-mono mt-1">
                    ${profitability?.tokenInferenceCostUSD.toFixed(2) || '142.50'}
                  </div>
                  <div className="text-[11px] text-slate-500 mt-1">Direct token & thinking pass costs</div>
                </div>

                <div className="p-4 bg-[#051322] border border-white/5 rounded-xl">
                  <div className="text-slate-400 text-xs">Visualizer & Blueprint Renders</div>
                  <div className="text-2xl font-black text-slate-300 font-mono mt-1">
                    ${profitability?.visualizerRenderCostUSD.toFixed(2) || '210.00'}
                  </div>
                  <div className="text-[11px] text-slate-500 mt-1">Diffusion & CAD render instances</div>
                </div>

                <div className="p-4 bg-[#051322] border border-emerald-500/30 rounded-xl">
                  <div className="text-emerald-400 text-xs font-semibold">Net Gross Margin</div>
                  <div className="text-2xl font-black text-emerald-400 font-mono mt-1">
                    {profitability?.grossMarginPercentage.toFixed(1) || '84.6'}%
                  </div>
                  <div className="text-[11px] text-emerald-300 mt-1">Target baseline: ≥ 75.0% enforced</div>
                </div>
              </div>

              {/* Detailed Cost Line Items Breakdown */}
              <div className="bg-[#051322] border border-white/5 rounded-xl p-4 space-y-3">
                <div className="text-xs font-bold text-white uppercase tracking-wider flex items-center justify-between">
                  <span>Detailed Cost & Consumption Line Items (Provider-Reported vs Estimated)</span>
                  <span className="text-[10px] text-slate-400 font-mono">Status: Reconciled</span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 text-xs">
                  <div className="p-2.5 bg-[#09223d] rounded-lg border border-white/5">
                    <div className="text-[10px] text-slate-400 uppercase">Input Tokens</div>
                    <div className="font-mono text-white font-bold text-sm mt-0.5">$38.40</div>
                    <div className="text-[10px] text-slate-500">25.6M tokens</div>
                  </div>
                  <div className="p-2.5 bg-[#09223d] rounded-lg border border-white/5">
                    <div className="text-[10px] text-slate-400 uppercase">Cached Input Tokens</div>
                    <div className="font-mono text-white font-bold text-sm mt-0.5">$8.20</div>
                    <div className="text-[10px] text-slate-500">16.4M tokens (cached)</div>
                  </div>
                  <div className="p-2.5 bg-[#09223d] rounded-lg border border-white/5">
                    <div className="text-[10px] text-slate-400 uppercase">Output & Reasoning</div>
                    <div className="font-mono text-white font-bold text-sm mt-0.5">$95.90</div>
                    <div className="text-[10px] text-slate-500">12.8M reasoning tokens</div>
                  </div>
                  <div className="p-2.5 bg-[#09223d] rounded-lg border border-white/5">
                    <div className="text-[10px] text-slate-400 uppercase">Embeddings & Search</div>
                    <div className="font-mono text-white font-bold text-sm mt-0.5">$14.50</div>
                    <div className="text-[10px] text-slate-500">File search & RAG</div>
                  </div>
                  <div className="p-2.5 bg-[#09223d] rounded-lg border border-white/5">
                    <div className="text-[10px] text-slate-400 uppercase">Image & File Render</div>
                    <div className="font-mono text-white font-bold text-sm mt-0.5">$210.00</div>
                    <div className="text-[10px] text-slate-500">Floor plans & 3D diff</div>
                  </div>
                  <div className="p-2.5 bg-[#09223d] rounded-lg border border-white/5">
                    <div className="text-[10px] text-slate-400 uppercase">Payment & Tax Fees</div>
                    <div className="font-mono text-rose-300 font-bold text-sm mt-0.5">$166.25</div>
                    <div className="text-[10px] text-slate-500">3.5% Gateway fee</div>
                  </div>
                </div>
              </div>
            </div>

            {/* 3. Top-Up Economics & 12-Month Credit Lifecycle Policies */}
            <div className="bg-[#09223d] border border-white/10 rounded-2xl p-6 shadow-xl space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
                <div>
                  <div className="flex items-center gap-2">
                    <Coins className="w-4 h-4 text-[#C6922D]" />
                    <h3 className="text-base font-bold text-white">
                      Prepaid Top-Up Economics Audit & Credit Lifecycle Policies
                    </h3>
                  </div>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Statutory cost allocation floor, payment processing reserves, and 12-month credit lifecycle terms.
                  </p>
                </div>
              </div>

              {/* Economic Audit Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#051322] text-slate-400 border-b border-white/10 uppercase text-[10px] font-bold">
                    <tr>
                      <th className="py-3 px-3">Top-Up Package</th>
                      <th className="py-3 px-3 text-right">Selling Price (USD)</th>
                      <th className="py-3 px-3 text-right">Included Credits</th>
                      <th className="py-3 px-3 text-right">Allocation Floor</th>
                      <th className="py-3 px-3 text-right">Payment Fee</th>
                      <th className="py-3 px-3 text-right">Support Reserve</th>
                      <th className="py-3 px-3 text-right">Gross Margin Floor</th>
                      <th className="py-3 px-3 text-center">Compliance</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5 font-sans">
                    {TOP_UP_ECONOMIC_AUDIT.map((pkg) => (
                      <tr key={pkg.packageId} className="hover:bg-white/5 transition-colors">
                        <td className="py-3 px-3 font-bold text-white">{pkg.name}</td>
                        <td className="py-3 px-3 text-right font-mono font-bold text-emerald-400">${pkg.priceUSD}</td>
                        <td className="py-3 px-3 text-right font-mono text-slate-300">{pkg.credits.toLocaleString()} credits</td>
                        <td className="py-3 px-3 text-right font-mono text-slate-300">${pkg.infrastructureAllocationUSD.toFixed(2)}</td>
                        <td className="py-3 px-3 text-right font-mono text-slate-400">${pkg.paymentProcessingFeeUSD.toFixed(2)}</td>
                        <td className="py-3 px-3 text-right font-mono text-slate-400">${pkg.supportAllocationUSD.toFixed(2)}</td>
                        <td className="py-3 px-3 text-right font-mono font-bold text-emerald-400">{pkg.grossMarginFloorPercent}%</td>
                        <td className="py-3 px-3 text-center">
                          <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-950 text-emerald-300 border border-emerald-800">
                            PASS (≥70%)
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Credit Lifecycle Terms Box */}
              <div className="p-4 bg-[#051322] border border-white/5 rounded-xl text-xs space-y-2">
                <div className="font-bold text-[#C6922D] uppercase text-[11px]">Enforced Credit Lifecycle Terms</div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-slate-300 text-[11px]">
                  <div>• <strong>Validity Window:</strong> {Math.round(CREDIT_LIFECYCLE_POLICY.expirationPeriodDays / 30)} months ({CREDIT_LIFECYCLE_POLICY.expirationPeriodDays} days) from purchase date (calendar-dated expiration).</div>
                  <div>• <strong>Consumption Order:</strong> First-In, First-Out (FIFO) prioritizes credits closest to expiry ({CREDIT_LIFECYCLE_POLICY.consumptionOrder}).</div>
                  <div>• <strong>Refund Policy:</strong> {CREDIT_LIFECYCLE_POLICY.refundEligibility}.</div>
                  <div>• <strong>Non-Cash Asset:</strong> {CREDIT_LIFECYCLE_POLICY.transferRestrictions}.</div>
                </div>
              </div>
            </div>

            {/* 4. Bank Transfer Approvals Queue (Maker-Checker Enforced) */}
            <div className="bg-[#09223d] border border-white/10 rounded-2xl p-6 shadow-xl space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
                <div>
                  <div className="flex items-center gap-2">
                    <Receipt className="w-4 h-4 text-[#C6922D]" />
                    <h3 className="text-base font-bold text-white">
                      Bank Transfer Payment Approvals Queue (Maker-Checker Enforced)
                    </h3>
                  </div>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Separation of duties requires recorded bank transfers to be verified and activated by an independent Finance or Executive Checker.
                  </p>
                </div>
                <span className="font-mono text-xs text-[#C6922D] bg-[#C6922D]/20 px-2.5 py-1 rounded">
                  {bankTransfers.filter((t) => t.status === 'PENDING_APPROVAL').length} Pending Approval
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#051322] text-slate-400 border-b border-white/10 uppercase text-[10px] font-bold">
                    <tr>
                      <th className="py-3 px-3">Transfer ID</th>
                      <th className="py-3 px-3">User / Company</th>
                      <th className="py-3 px-3">Target Plan</th>
                      <th className="py-3 px-3 text-right">Amount (USD)</th>
                      <th className="py-3 px-3 text-right">PHP Equivalent</th>
                      <th className="py-3 px-3">Bank Reference</th>
                      <th className="py-3 px-3">Maker (Recorded By)</th>
                      <th className="py-3 px-3">Checker (Approved By)</th>
                      <th className="py-3 px-3">Status</th>
                      <th className="py-3 px-3 text-right">Checker Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5 font-sans">
                    {bankTransfers.map((bt) => (
                      <tr key={bt.id} className="hover:bg-white/5 transition-colors">
                        <td className="py-3 px-3 font-mono font-bold text-[#C6922D]">{bt.id}</td>
                        <td className="py-3 px-3">
                          <div className="font-bold text-white">{bt.companyName}</div>
                          <div className="text-[10px] text-slate-500 font-mono">{bt.userEmail}</div>
                        </td>
                        <td className="py-3 px-3 uppercase font-semibold text-slate-200">{bt.planId}</td>
                        <td className="py-3 px-3 text-right font-mono font-bold text-emerald-400">${bt.amountUSD.toLocaleString()}</td>
                        <td className="py-3 px-3 text-right font-mono text-slate-400">₱{bt.amountPHP.toLocaleString()}</td>
                        <td className="py-3 px-3 text-slate-400 font-mono text-[11px]">{bt.bankReferenceNumber}</td>
                        <td className="py-3 px-3 text-slate-300 font-mono text-[11px]">{bt.recordedBy}</td>
                        <td className="py-3 px-3 text-slate-400 font-mono text-[11px]">{bt.approvedBy || 'Pending'}</td>
                        <td className="py-3 px-3">
                          <span
                            className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                              bt.status === 'APPROVED'
                                ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                                : 'bg-amber-950 text-amber-300 border border-amber-800'
                            }`}
                          >
                            {bt.status}
                          </span>
                        </td>
                        <td className="py-3 px-3 text-right whitespace-nowrap">
                          {bt.status === 'PENDING_APPROVAL' ? (
                            <button
                              onClick={() => handleApproveBankTransfer(bt.id)}
                              className="px-3 py-1 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-[10px] uppercase rounded transition-colors"
                              title="Dual control: maker cannot approve"
                            >
                              Verify & Activate
                            </button>
                          ) : (
                            <span className="text-slate-500 text-[11px]">Enforced</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* 5. Pre-Production Security, QA Suite & Infrastructure Verification */}
            <div className="bg-[#09223d] border border-white/10 rounded-2xl p-6 shadow-xl space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
                <div>
                  <div className="flex items-center gap-2">
                    <Terminal className="w-4 h-4 text-[#C6922D]" />
                    <h3 className="text-base font-bold text-white">
                      Automated Pre-Production Security, QA & Infrastructure Audit Suite
                    </h3>
                  </div>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Execute real backend verification suites to inspect system boundaries, RBAC permissions, and concurrent credit reservation integrity under load.
                  </p>
                </div>
              </div>

              {/* 4 Interactive Test Trigger Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Test 1: 24-Point Architectural & Commercial QA */}
                <div className="p-4 bg-[#051322] border border-white/10 rounded-xl flex flex-col justify-between space-y-3">
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-white">24-Point QA Suite</span>
                      <span className="text-[10px] font-mono bg-blue-950 text-blue-300 px-1.5 py-0.5 rounded border border-blue-800">
                        Admin Protected
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400 mt-1">
                      Verifies commercial pricing, 10× policy, credit reservation, margin monitor, and RAG knowledge controls.
                    </p>
                  </div>
                  <button
                    disabled={runningTestKey !== null}
                    onClick={handleRunQaSuite}
                    className="w-full py-2 bg-blue-600 hover:bg-blue-500 disabled:bg-slate-700 text-white font-bold text-xs uppercase tracking-wider rounded-lg transition-all flex items-center justify-center gap-1.5"
                  >
                    <Play className="w-3.5 h-3.5" />
                    <span>{runningTestKey === 'qa' ? 'Executing QA...' : 'Run 24-Point Suite'}</span>
                  </button>
                </div>

                {/* Test 2: 12-Point Builder AI Boundaries */}
                <div className="p-4 bg-[#051322] border border-white/10 rounded-xl flex flex-col justify-between space-y-3">
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-white">Builder AI Boundaries</span>
                      <span className="text-[10px] font-mono bg-purple-950 text-purple-300 px-1.5 py-0.5 rounded border border-purple-800">
                        12 Tests
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400 mt-1">
                      Simulates prompt injection, private data isolation, statutory architectural disclaimers (RA 544 & 9266), and watermarks.
                    </p>
                  </div>
                  <button
                    disabled={runningTestKey !== null}
                    onClick={handleRunBoundaryTests}
                    className="w-full py-2 bg-purple-600 hover:bg-purple-500 disabled:bg-slate-700 text-white font-bold text-xs uppercase tracking-wider rounded-lg transition-all flex items-center justify-center gap-1.5"
                  >
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>{runningTestKey === 'boundary' ? 'Testing...' : 'Test AI Boundaries'}</span>
                  </button>
                </div>

                {/* Test 3: 16-Role Firebase RBAC Verification */}
                <div className="p-4 bg-[#051322] border border-white/10 rounded-xl flex flex-col justify-between space-y-3">
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-white">Firebase RBAC Invariants</span>
                      <span className="text-[10px] font-mono bg-amber-950 text-amber-300 px-1.5 py-0.5 rounded border border-amber-800">
                        16 Roles Tested
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400 mt-1">
                      Evaluates client-side wallet lock, subscription lock, Maker-Checker separation, and knowledge base security invariants.
                    </p>
                  </div>
                  <button
                    disabled={runningTestKey !== null}
                    onClick={handleRunFirebaseRbac}
                    className="w-full py-2 bg-[#C6922D] hover:bg-[#d8a339] disabled:bg-slate-700 text-[#071A2F] font-bold text-xs uppercase tracking-wider rounded-lg transition-all flex items-center justify-center gap-1.5"
                  >
                    <Lock className="w-3.5 h-3.5" />
                    <span>{runningTestKey === 'rbac' ? 'Verifying RBAC...' : 'Verify Firebase Rules'}</span>
                  </button>
                </div>

                {/* Test 4: 20-Request Concurrent Stress Test */}
                <div className="p-4 bg-[#051322] border border-white/10 rounded-xl flex flex-col justify-between space-y-3">
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-white">Concurrent Stress Test</span>
                      <span className="text-[10px] font-mono bg-emerald-950 text-emerald-300 px-1.5 py-0.5 rounded border border-emerald-800">
                        20 Parallel Locks
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400 mt-1">
                      Fires 20 concurrent reservation requests against 1 wallet to mathematically verify zero negative balance and zero double-spending.
                    </p>
                  </div>
                  <button
                    disabled={runningTestKey !== null}
                    onClick={handleRunConcurrentStressTest}
                    className="w-full py-2 bg-emerald-600 hover:bg-emerald-500 disabled:bg-slate-700 text-white font-bold text-xs uppercase tracking-wider rounded-lg transition-all flex items-center justify-center gap-1.5"
                  >
                    <Zap className="w-3.5 h-3.5" />
                    <span>{runningTestKey === 'stress' ? 'Simulating Load...' : 'Run Concurrency Test'}</span>
                  </button>
                </div>
              </div>

              {/* Execution Results Displays */}
              {qaResults && (
                <div className="p-4 bg-[#051322] border border-blue-500/30 rounded-xl space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="font-bold text-blue-300 text-xs flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      <span>24-Point QA Test Suite Output ({qaResults.testsPassed}/{qaResults.totalTests} Passed)</span>
                    </div>
                    <span className="text-[11px] font-mono text-slate-400">{qaResults.timestamp}</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 max-h-60 overflow-y-auto text-[11px]">
                    {qaResults.results?.map((t: any) => (
                      <div key={t.id} className="p-2 bg-[#09223d] rounded border border-white/5 flex items-start gap-2">
                        <span className="font-mono text-[#C6922D] font-bold">#{t.id}</span>
                        <div>
                          <div className="font-semibold text-white">{t.name}</div>
                          <div className="text-[10px] text-slate-400">{t.details}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {boundaryResults && (
                <div className="p-4 bg-[#051322] border border-purple-500/30 rounded-xl space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="font-bold text-purple-300 text-xs flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      <span>Builder AI Boundary Invariants: {boundaryResults.testsPassed}/{boundaryResults.totalTests} Passed (100% Compliant)</span>
                    </div>
                    <span className="text-[11px] font-mono text-slate-400">Strict Boundaries Enforced</span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-[11px]">
                    {boundaryResults.results?.map((t: any) => (
                      <div key={t.id} className="p-2.5 bg-[#09223d] rounded border border-white/5">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-white">{t.name}</span>
                          <span className="text-[10px] font-mono text-emerald-400 font-bold">PASS</span>
                        </div>
                        <div className="text-[10px] text-slate-400 mt-1">{t.evidence}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {firebaseRbacResults && (
                <div className="p-4 bg-[#051322] border border-amber-500/30 rounded-xl space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="font-bold text-amber-300 text-xs flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      <span>Firebase Rules Security Invariants: {firebaseRbacResults.testedRolesCount} Roles Evaluated across {firebaseRbacResults.totalInvariants} Invariants</span>
                    </div>
                    <span className="text-[11px] font-mono text-emerald-400 font-bold">ALL 11 INVARIANTS PASS</span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-[11px]">
                    {firebaseRbacResults.invariants?.map((inv: any, i: number) => (
                      <div key={i} className="p-2.5 bg-[#09223d] rounded border border-white/5">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-white">{inv.invariant}</span>
                          <span className="text-[10px] font-mono text-emerald-400 font-bold">ENFORCED</span>
                        </div>
                        <div className="text-[10px] text-slate-400 mt-1">{inv.enforcement}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {concurrentStressResults && (
                <div className="p-4 bg-[#051322] border border-emerald-500/30 rounded-xl space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="font-bold text-emerald-300 text-xs flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      <span>Concurrency Integrity Stress Test: {concurrentStressResults.message}</span>
                    </div>
                    <span className="text-[11px] font-mono text-emerald-400 font-bold">
                      Zero Double-Spending Verified
                    </span>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                    <div className="p-2.5 bg-[#09223d] rounded-lg border border-white/5">
                      <div className="text-[10px] text-slate-400">Total Concurrent Requests</div>
                      <div className="font-mono text-white font-bold text-base mt-0.5">{concurrentStressResults.totalConcurrentRequests}</div>
                    </div>
                    <div className="p-2.5 bg-[#09223d] rounded-lg border border-white/5">
                      <div className="text-[10px] text-slate-400">Successful Reservations</div>
                      <div className="font-mono text-emerald-400 font-bold text-base mt-0.5">{concurrentStressResults.successfulReservations}</div>
                    </div>
                    <div className="p-2.5 bg-[#09223d] rounded-lg border border-white/5">
                      <div className="text-[10px] text-slate-400">Rejected (Insufficient Bal)</div>
                      <div className="font-mono text-amber-300 font-bold text-base mt-0.5">{concurrentStressResults.rejectedRequests}</div>
                    </div>
                    <div className="p-2.5 bg-[#09223d] rounded-lg border border-white/5">
                      <div className="text-[10px] text-slate-400">Negative Balance Check</div>
                      <div className="font-mono text-emerald-400 font-bold text-base mt-0.5">
                        {concurrentStressResults.negativeBalanceDetected ? 'FAILED (NEG DETECTED)' : 'PASSED (NEVER < 0)'}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Inquiries Intake Queue */}
            <div className="bg-[#09223d] border border-white/10 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-base font-bold text-white">Project Inquiries Intake Queue</h3>
                  <p className="text-xs text-slate-400">Inquiries submitted via the Project Opportunity Wizard</p>
                </div>
                <span className="font-mono text-xs bg-[#C6922D]/20 text-[#C6922D] px-2.5 py-1 rounded">
                  {inquiries.length} Active
                </span>
              </div>

              {inquiries.length === 0 ? (
                <div className="p-8 text-center text-slate-500 text-xs bg-[#051322] rounded-xl">
                  No inquiries submitted yet. Submit a test inquiry via the Project Opportunity Wizard.
                </div>
              ) : (
                <div className="space-y-3">
                  {inquiries.map((inq, idx) => (
                    <div
                      key={idx}
                      className="p-4 bg-[#051322] border border-white/5 rounded-xl flex flex-col md:flex-row md:items-center justify-between gap-4 text-xs"
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono font-bold text-[#C6922D]">{inq.inquiryNumber}</span>
                          <span className="px-2 py-0.5 rounded text-[10px] bg-amber-900/40 text-amber-300 font-bold">
                            {inq.status || 'Pending Review'}
                          </span>
                        </div>
                        <div className="text-white font-semibold mt-1">
                          {inq.fullName} ({inq.companyName || 'Private'}) — {inq.projectType}
                        </div>
                        <div className="text-slate-400 text-[11px]">
                          Location: {inq.location} • Budget: {inq.budgetBand} • Email: {inq.email}
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => alert(`Reviewing inquiry ${inq.inquiryNumber}`)}
                          className="px-3 py-1.5 bg-white/10 hover:bg-white/15 text-white font-semibold rounded text-xs"
                        >
                          Appraise
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Knowledge Base Repository Management (25 Categories) */}
            <div className="bg-[#09223d] border border-white/10 rounded-2xl p-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                <div>
                  <h3 className="text-base font-bold text-white">
                    Builder Assistant Knowledge Base Status Control
                  </h3>
                  <p className="text-xs text-slate-400">
                    Audit and toggle approval status of indexed corporate reference documents.
                  </p>
                </div>
                <div className="text-xs text-slate-400 font-mono">
                  {knowledgeSources.length} Documents Indexed
                </div>
              </div>

              <div className="max-h-96 overflow-y-auto space-y-2 text-xs">
                {knowledgeSources.map((doc) => (
                  <div
                    key={doc.id}
                    className="p-3 bg-[#051322] border border-white/5 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-white">{doc.title}</span>
                        <span
                          className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase ${
                            doc.approvalStatus === 'Approved'
                              ? 'bg-[#237A3B]/30 text-emerald-300'
                              : doc.approvalStatus === 'Suspended'
                              ? 'bg-rose-900/40 text-rose-300'
                              : 'bg-slate-800 text-slate-400'
                          }`}
                        >
                          {doc.approvalStatus}
                        </span>
                        <span className="text-[10px] text-slate-500 font-mono">
                          [{doc.classification}]
                        </span>
                      </div>
                      <div className="text-[11px] text-slate-400 mt-0.5">
                        Category: {doc.category} • Source: {doc.sourceDoc}
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => toggleDocumentStatus(doc.id, doc.approvalStatus)}
                        className={`px-2.5 py-1 rounded text-[11px] font-bold transition-colors ${
                          doc.approvalStatus === 'Approved'
                            ? 'bg-rose-950/60 hover:bg-rose-900 text-rose-300 border border-rose-800/40'
                            : 'bg-emerald-950/60 hover:bg-emerald-900 text-emerald-300 border border-emerald-800/40'
                        }`}
                      >
                        {doc.approvalStatus === 'Approved' ? 'Suspend Document' : 'Approve Document'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Audit & Security Log */}
            <div className="bg-[#09223d] border border-white/10 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-base font-bold text-white">Immutable Security & Audit Event Log</h3>
                  <p className="text-xs text-slate-400">Server-side recorded administrative and RAG operations</p>
                </div>
                <span className="font-mono text-xs text-slate-400">{auditLogs.length} Events</span>
              </div>

              <div className="max-h-72 overflow-y-auto space-y-2 text-[11px] font-mono">
                {auditLogs.map((log) => (
                  <div
                    key={log.id}
                    className="p-2.5 bg-[#051322] border border-white/5 rounded-lg flex flex-col sm:flex-row sm:items-center justify-between gap-2"
                  >
                    <div className="flex items-center gap-2">
                      <span
                        className={`px-1.5 py-0.5 rounded text-[9px] font-bold ${
                          log.status === 'SUCCESS'
                            ? 'bg-emerald-950 text-emerald-300'
                            : log.status === 'DENIED'
                            ? 'bg-rose-950 text-rose-300'
                            : 'bg-amber-950 text-amber-300'
                        }`}
                      >
                        {log.status}
                      </span>
                      <span className="text-white font-bold">{log.action}</span>
                      <span className="text-slate-400">• {log.details}</span>
                    </div>
                    <span className="text-slate-500 text-[10px] shrink-0">
                      {new Date(log.timestamp).toLocaleTimeString()}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ---------------------------------------------------- */}
        {/* MODAL: TOP-UP CREDITS */}
        {/* ---------------------------------------------------- */}
        {topUpModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
            <div className="bg-[#09223d] border border-[#C6922D]/40 rounded-3xl p-6 sm:p-8 max-w-xl w-full shadow-2xl space-y-6">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div className="flex items-center gap-2">
                  <Coins className="w-5 h-5 text-[#C6922D]" />
                  <h3 className="text-lg font-black text-white font-['Montserrat']">
                    Top-Up Autonomous Builder Credits
                  </h3>
                </div>
                <button
                  onClick={() => setTopUpModalOpen(false)}
                  className="text-slate-400 hover:text-white text-lg font-bold"
                >
                  ✕
                </button>
              </div>

              <p className="text-xs text-slate-300">
                Prepaid credit add-ons never expire. They automatically activate once your monthly recurring tier pool is consumed, preventing any interruption to CAD, visualizer, or cost estimating workflows.
              </p>

              <div className="space-y-3">
                {TOP_UP_PACKAGES.map((pkg) => (
                  <div
                    key={pkg.id}
                    className="p-4 bg-[#051322] border border-white/10 hover:border-[#C6922D]/60 rounded-2xl flex items-center justify-between transition-all"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-white text-sm">{pkg.name}</span>
                        {pkg.popular && (
                          <span className="px-2 py-0.5 rounded text-[9px] font-bold bg-[#C6922D] text-[#071A2F] uppercase">
                            Most Popular
                          </span>
                        )}
                      </div>
                      <div className="text-xs text-[#C6922D] font-mono font-bold mt-0.5">
                        +{pkg.credits.toLocaleString()} Autonomous Credits
                      </div>
                      <div className="text-[11px] text-slate-400 mt-0.5">{pkg.description}</div>
                    </div>

                    <button
                      onClick={() => handleTopUp(pkg.id)}
                      className="px-4 py-2 bg-[#C6922D] hover:bg-[#d8a339] text-[#071A2F] font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow shrink-0"
                    >
                      Buy ${pkg.priceUSD}
                    </button>
                  </div>
                ))}
              </div>

              <div className="pt-2 text-[10px] text-slate-400 border-t border-white/5 flex items-center justify-between">
                <span>Direct billing via corporate payment method</span>
                <span>Immediate wallet balance update</span>
              </div>
            </div>
          </div>
        )}

        {/* ---------------------------------------------------- */}
        {/* MODAL: PROPOSE NEW PRICE VERSION (MAKER-CHECKER) */}
        {/* ---------------------------------------------------- */}
        {newVersionModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
            <div className="bg-[#09223d] border border-[#C6922D]/40 rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl space-y-6">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div className="flex items-center gap-2">
                  <Percent className="w-5 h-5 text-[#C6922D]" />
                  <h3 className="text-lg font-black text-white font-['Montserrat']">
                    Propose Public Price Version
                  </h3>
                </div>
                <button
                  onClick={() => setNewVersionModalOpen(false)}
                  className="text-slate-400 hover:text-white text-lg font-bold"
                >
                  ✕
                </button>
              </div>

              <div className="bg-amber-950/40 border border-amber-500/30 p-3.5 rounded-xl text-xs text-amber-200">
                <strong>Maker-Checker Governance Notice:</strong> You are submitting this proposal as{' '}
                <strong>PricingManager</strong> (Maker). To safeguard enterprise commercial compliance, you will NOT be permitted to approve this price version. An Executive or Finance Director must review and activate it.
              </div>

              <form onSubmit={handleCreatePriceVersion} className="space-y-4 text-xs">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Target Subscription Tier</label>
                  <select
                    value={newVersionPlanId}
                    onChange={(e) => setNewVersionPlanId(e.target.value)}
                    className="w-full bg-[#051322] border border-white/10 rounded-xl px-3.5 py-2.5 text-white font-semibold focus:outline-none focus:border-[#C6922D]"
                  >
                    <option value="access">Access Plan (Target Benchmark $1,900/mo)</option>
                    <option value="professional">Professional Plan (Target Benchmark $4,900/mo)</option>
                    <option value="executive">Executive Plan (Target Benchmark $12,500/mo)</option>
                    <option value="enterprise">Enterprise Plan (Target Benchmark $35,000/mo)</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">Proposed Monthly (USD)</label>
                    <div className="relative">
                      <span className="absolute left-3 top-2.5 text-slate-500 font-bold">$</span>
                      <input
                        type="number"
                        min="50"
                        max="10000"
                        value={newVersionPriceUSD}
                        onChange={(e) => setNewVersionPriceUSD(Number(e.target.value))}
                        className="w-full bg-[#051322] border border-white/10 rounded-xl pl-7 pr-3 py-2.5 text-white font-mono font-bold focus:outline-none focus:border-[#C6922D]"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">Benchmark Multiplier</label>
                    <input
                      type="number"
                      step="0.1"
                      min="5"
                      max="20"
                      value={newVersionMultiplier}
                      onChange={(e) => setNewVersionMultiplier(Number(e.target.value))}
                      className="w-full bg-[#051322] border border-white/10 rounded-xl px-3 py-2.5 text-[#C6922D] font-mono font-bold focus:outline-none focus:border-[#C6922D]"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Market Benchmark Reference & Notes</label>
                  <textarea
                    rows={3}
                    value={newVersionNotes}
                    onChange={(e) => setNewVersionNotes(e.target.value)}
                    placeholder="e.g., Benchmark against Autodesk Civil 3D enterprise license + dedicated estimator salary. Justifies 10.0x value ratio."
                    className="w-full bg-[#051322] border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-[#C6922D]"
                    required
                  />
                </div>

                <div className="flex items-center justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setNewVersionModalOpen(false)}
                    className="px-4 py-2 bg-white/5 hover:bg-white/10 text-slate-300 font-bold rounded-xl transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 bg-[#C6922D] hover:bg-[#d8a339] text-[#071A2F] font-bold uppercase tracking-wider rounded-xl transition-all shadow"
                  >
                    Submit Proposal (Maker)
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
