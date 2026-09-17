import React, { useState, useEffect } from 'react';
import {
  Shield,
  Key,
  UserPlus,
  Lock,
  Unlock,
  UserX,
  RefreshCw,
  CheckCircle2,
  AlertCircle,
  FileCheck2,
  Clock,
  Send,
  Eye,
  Trash2,
  Terminal,
  Activity,
  Layers,
  Copy,
  ExternalLink,
  Building2,
} from 'lucide-react';
import { PublicProjectAdminConsole } from '../admin/PublicProjectAdminConsole';

interface AdminAccessConsoleProps {
  currentUser?: any;
  onNavigate?: (view: string) => void;
}

export const AdminAccessConsole: React.FC<AdminAccessConsoleProps> = ({ currentUser, onNavigate }) => {
  const [activeTab, setActiveTab] = useState<'create-access' | 'temp-access' | 'invitations' | 'qa-tests' | 'audit-trail' | 'public-content'>('create-access');

  // Form State for Invitation
  const [inviteForm, setInviteForm] = useState({
    fullName: '',
    email: '',
    organizationName: '',
    portalType: 'client',
    initialRole: 'Active Client',
    assignedProjects: ['angeles-reserve'],
    assignedWorkPackages: ['Civil Works'],
    expirationHours: 24,
    mfaRequired: true,
    reason: '',
    approvingAdmin: currentUser?.email || 'security@ldldhenze.com',
    secondaryApprover: 'compliance@ldldhenze.com',
  });

  // Temporary Access Form
  const [tempForm, setTempForm] = useState({
    fullName: '',
    email: '',
    organizationName: '',
    portalType: 'supplier',
    initialRole: 'Supplier',
    assignedProjects: ['angeles-reserve'],
    assignedWorkPackages: ['Structural Steel Supply'],
    expirationHours: 24,
    reason: 'Emergency on-site material verification & delivery coordination',
  });

  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [generatedInvite, setGeneratedInvite] = useState<{ rawToken: string; inviteLink: string } | null>(null);
  const [generatedTempPassword, setGeneratedTempPassword] = useState<{ password: string; expiresAt: string; email: string } | null>(null);

  // Invitations List
  const [invitations, setInvitations] = useState<any[]>([]);

  // QA Security Suite State
  const [qaResults, setQaResults] = useState<any | null>(null);
  const [qaLoading, setQaLoading] = useState(false);

  // Audit Logs State
  const [auditLogs, setAuditLogs] = useState<any[]>([]);
  const [auditLoading, setAuditLoading] = useState(false);

  // Load invitations
  const fetchInvitations = async () => {
    try {
      const res = await fetch('/api/admin/invitations');
      if (res.ok) {
        const data = await res.json();
        setInvitations(data.invitations || []);
      }
    } catch (err) {
      console.error('Failed to load invitations:', err);
    }
  };

  // Load audit logs
  const fetchAuditLogs = async () => {
    setAuditLoading(true);
    try {
      const res = await fetch('/api/security/audit-logs');
      if (res.ok) {
        const data = await res.json();
        setAuditLogs(data.logs || []);
      }
    } catch (err) {
      console.error('Failed to load audit logs:', err);
    } finally {
      setAuditLoading(false);
    }
  };

  // Run QA Security Suite
  const runSecuritySuite = async () => {
    setQaLoading(true);
    try {
      const res = await fetch('/api/qa/test-security-suite');
      if (res.ok) {
        const data = await res.json();
        setQaResults(data);
      }
    } catch (err) {
      console.error('Failed to run QA security suite:', err);
    } finally {
      setQaLoading(false);
    }
  };

  useEffect(() => {
    fetchInvitations();
  }, []);

  const handleCreateInvitation = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatusMessage(null);
    setGeneratedInvite(null);

    try {
      const res = await fetch('/api/admin/invitations/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...inviteForm,
          invitingAdmin: currentUser?.email || 'dhenzebuilders@gmail.com',
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        setStatusMessage({ type: 'error', text: data.error || 'Failed to generate invitation.' });
        setLoading(false);
        return;
      }

      setStatusMessage({ type: 'success', text: 'Invitation generated successfully with single-use token.' });
      setGeneratedInvite({ rawToken: data.rawToken, inviteLink: data.inviteLink });
      fetchInvitations();
    } catch (err: any) {
      setStatusMessage({ type: 'error', text: err.message || 'Network error.' });
    } finally {
      setLoading(false);
    }
  };

  const handleCreateTempAccess = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatusMessage(null);
    setGeneratedTempPassword(null);

    try {
      const res = await fetch('/api/admin/temporary-access/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...tempForm,
          adminEmail: currentUser?.email || 'dhenzebuilders@gmail.com',
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        setStatusMessage({ type: 'error', text: data.error || 'Failed to create temporary access.' });
        setLoading(false);
        return;
      }

      setStatusMessage({ type: 'success', text: 'Secure temporary credential created. Mandatory password change & MFA enrolled.' });
      setGeneratedTempPassword({
        password: data.temporaryPassword,
        expiresAt: data.expiresAt,
        email: data.email,
      });
    } catch (err: any) {
      setStatusMessage({ type: 'error', text: err.message || 'Network error.' });
    } finally {
      setLoading(false);
    }
  };

  const handleRevokeInvitation = async (id: string) => {
    if (!confirm('Are you sure you want to revoke this invitation? The token will be immediately invalidated.')) return;
    try {
      const res = await fetch(`/api/admin/invitations/${id}/revoke`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ revokedBy: currentUser?.email || 'Admin', reason: 'Administrative revocation' }),
      });
      if (res.ok) {
        fetchInvitations();
        setStatusMessage({ type: 'success', text: `Invitation ${id} successfully revoked.` });
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="bg-[#08182B] border border-white/10 rounded-2xl p-6 sm:p-8 text-slate-100 shadow-xl">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono font-bold tracking-wider text-[#C6922D] uppercase mb-1">
            <Shield className="w-4 h-4" />
            <span>Administrative Governance Console • Section 5 & 17</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-serif text-white">
            Identity, Access & Multi-Tenant Control
          </h2>
        </div>

        {/* Tab Selector */}
        <div className="flex flex-wrap items-center gap-1.5 bg-[#051322] p-1.5 rounded-xl border border-white/10 text-xs">
          <button
            onClick={() => setActiveTab('create-access')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
              activeTab === 'create-access' ? 'bg-[#C6922D] text-[#071A2F] font-bold shadow' : 'text-slate-300 hover:text-white'
            }`}
          >
            Create Invitation
          </button>
          <button
            onClick={() => setActiveTab('temp-access')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
              activeTab === 'temp-access' ? 'bg-[#C6922D] text-[#071A2F] font-bold shadow' : 'text-slate-300 hover:text-white'
            }`}
          >
            Temporary Access
          </button>
          <button
            onClick={() => {
              setActiveTab('invitations');
              fetchInvitations();
            }}
            className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
              activeTab === 'invitations' ? 'bg-[#C6922D] text-[#071A2F] font-bold shadow' : 'text-slate-300 hover:text-white'
            }`}
          >
            Invitations ({invitations.length})
          </button>
          <button
            onClick={() => {
              setActiveTab('qa-tests');
              if (!qaResults) runSecuritySuite();
            }}
            className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
              activeTab === 'qa-tests' ? 'bg-[#C6922D] text-[#071A2F] font-bold shadow' : 'text-slate-300 hover:text-white'
            }`}
          >
            QA Security Suite (21)
          </button>
          <button
            onClick={() => {
              setActiveTab('audit-trail');
              fetchAuditLogs();
            }}
            className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
              activeTab === 'audit-trail' ? 'bg-[#C6922D] text-[#071A2F] font-bold shadow' : 'text-slate-300 hover:text-white'
            }`}
          >
            Security Audit Trail
          </button>
          <button
            onClick={() => setActiveTab('public-content')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-all flex items-center gap-1.5 ${
              activeTab === 'public-content' ? 'bg-[#C6922D] text-[#071A2F] font-bold shadow' : 'text-slate-300 hover:text-white'
            }`}
          >
            <Building2 className="w-3.5 h-3.5" />
            <span>Public Content & Library</span>
          </button>
        </div>
      </div>

      {/* Notification Banner */}
      {statusMessage && (
        <div
          className={`mt-6 p-4 rounded-xl text-xs flex items-start gap-3 border ${
            statusMessage.type === 'success'
              ? 'bg-emerald-950/60 border-emerald-800/80 text-emerald-200'
              : 'bg-rose-950/60 border-rose-800/80 text-rose-200'
          }`}
        >
          {statusMessage.type === 'success' ? (
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
          ) : (
            <AlertCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
          )}
          <span className="font-sans leading-relaxed">{statusMessage.text}</span>
        </div>
      )}

      {/* TAB 1: CREATE INVITATION FORM */}
      {activeTab === 'create-access' && (
        <div className="mt-6">
          <p className="text-xs text-slate-300 mb-6 font-sans leading-relaxed">
            Unrestricted public account creation is permanently disabled. Access to private workspaces is granted solely by authorized Administrators via cryptographic, single-use invitation tokens expiring in 24 hours.
          </p>

          <form onSubmit={handleCreateInvitation} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Full Legal Name</label>
              <input
                type="text"
                value={inviteForm.fullName}
                onChange={(e) => setInviteForm({ ...inviteForm, fullName: e.target.value })}
                className="w-full px-3 py-2 bg-[#051322] border border-white/10 rounded-lg text-xs text-white focus:border-[#C6922D] focus:outline-none"
                placeholder="e.g. Maria Santos"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Verified Corporate Email</label>
              <input
                type="email"
                value={inviteForm.email}
                onChange={(e) => setInviteForm({ ...inviteForm, email: e.target.value })}
                className="w-full px-3 py-2 bg-[#051322] border border-white/10 rounded-lg text-xs text-white focus:border-[#C6922D] focus:outline-none"
                placeholder="e.g. m.santos@partnerholding.ph"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Organization / Entity Name</label>
              <input
                type="text"
                value={inviteForm.organizationName}
                onChange={(e) => setInviteForm({ ...inviteForm, organizationName: e.target.value })}
                className="w-full px-3 py-2 bg-[#051322] border border-white/10 rounded-lg text-xs text-white focus:border-[#C6922D] focus:outline-none"
                placeholder="e.g. Central Luzon Engineering Corp"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Workspace Portal Type</label>
              <select
                value={inviteForm.portalType}
                onChange={(e) => setInviteForm({ ...inviteForm, portalType: e.target.value })}
                className="w-full px-3 py-2 bg-[#051322] border border-white/10 rounded-lg text-xs text-white focus:border-[#C6922D] focus:outline-none"
              >
                <option value="client">Client Portal</option>
                <option value="supplier">Supplier Portal</option>
                <option value="partner">Partner / Subcontractor Portal</option>
                <option value="operations">Internal Operations Portal</option>
                <option value="admin">System Administration</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Initial Role (RBAC)</label>
              <select
                value={inviteForm.initialRole}
                onChange={(e) => setInviteForm({ ...inviteForm, initialRole: e.target.value })}
                className="w-full px-3 py-2 bg-[#051322] border border-white/10 rounded-lg text-xs text-white focus:border-[#C6922D] focus:outline-none"
              >
                <option value="Prospective Client">Prospective Client (Read-Only Concept)</option>
                <option value="Active Client">Active Client (Assigned Projects & Financials)</option>
                <option value="Supplier">Supplier (Catalog & RFQ Room)</option>
                <option value="Partner">Partner (Assigned Subcontract Packages)</option>
                <option value="Project Manager">Project Manager (Operations Coordination)</option>
                <option value="Compliance Reviewer">Compliance Reviewer (Quality & Regulatory Holds)</option>
                <option value="Executive Approver">Executive Approver (Financial Disbursements)</option>
                <option value="Auditor">Auditor (Read-Only Independent Review)</option>
                <option value="System Administrator">System Administrator (IAM & Security)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Assigned Project Scope</label>
              <select
                multiple
                value={inviteForm.assignedProjects}
                onChange={(e) => {
                  const opts = Array.from(e.target.selectedOptions, (o) => o.value);
                  setInviteForm({ ...inviteForm, assignedProjects: opts });
                }}
                className="w-full px-3 py-2 bg-[#051322] border border-white/10 rounded-lg text-xs text-white focus:border-[#C6922D] focus:outline-none h-20"
              >
                <option value="angeles-reserve">The Angeles Reserve Custom Residence</option>
                <option value="clark-tower">Clark Mixed-Use Commercial Tower</option>
                <option value="subic-logistics">Subic Bay Cold-Chain Logistics Hub</option>
                <option value="all">All Projects (Internal Operations)</option>
              </select>
            </div>

            <div className="md:col-span-2">
              <label className="block text-xs font-semibold text-slate-300 mb-1">Justification & Business Reason for Access</label>
              <textarea
                value={inviteForm.reason}
                onChange={(e) => setInviteForm({ ...inviteForm, reason: e.target.value })}
                rows={2}
                className="w-full px-3 py-2 bg-[#051322] border border-white/10 rounded-lg text-xs text-white focus:border-[#C6922D] focus:outline-none font-sans"
                placeholder="Detail client project engagement reference, work contract ID, or audit scope..."
                required
              />
            </div>

            <div className="md:col-span-2 flex items-center gap-3 pt-2">
              <input
                type="checkbox"
                id="mfaRequiredCheckbox"
                checked={inviteForm.mfaRequired}
                onChange={(e) => setInviteForm({ ...inviteForm, mfaRequired: e.target.checked })}
                className="rounded bg-[#051322] border-white/20 text-[#C6922D] focus:ring-0"
              />
              <label htmlFor="mfaRequiredCheckbox" className="text-xs text-slate-300 font-sans">
                <strong>Enforce Mandatory Multi-Factor Authentication (MFA/TOTP)</strong> upon account activation
              </label>
            </div>

            <div className="md:col-span-2 pt-4 border-t border-white/10 flex justify-end">
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-2.5 bg-[#C6922D] hover:bg-[#d8a339] text-[#071A2F] text-xs font-bold uppercase tracking-wider rounded-lg transition-all shadow-lg flex items-center gap-2 disabled:opacity-50"
              >
                {loading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                <span>Generate Cryptographic Single-Use Invitation</span>
              </button>
            </div>
          </form>

          {/* Display Generated Invitation */}
          {generatedInvite && (
            <div className="mt-6 p-5 bg-[#051322] border border-[#C6922D]/50 rounded-xl space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-[#C6922D] uppercase flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4" /> Single-Use Token Dispatched
                </span>
                <span className="text-[11px] font-mono text-slate-400">Expires in 24 Hours</span>
              </div>
              <div className="p-3 bg-[#08182B] rounded-lg border border-white/10">
                <div className="text-[11px] font-mono text-slate-400 mb-1">Direct Secure Activation Link:</div>
                <div className="text-xs font-mono text-white break-all">{generatedInvite.inviteLink}</div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* TAB 2: CREATE TEMPORARY ACCESS */}
      {activeTab === 'temp-access' && (
        <div className="mt-6">
          <p className="text-xs text-slate-300 mb-6 font-sans leading-relaxed">
            Emergency administrative access feature (Section 5): Generates an 18-character CSPRNG high-entropy temporary password meeting all uppercase, lowercase, number, and symbol criteria. The account is single-use, expires in 24 hours, and mandates an immediate password change and MFA enrollment upon first sign-in.
          </p>

          <form onSubmit={handleCreateTempAccess} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Temporary User Full Name</label>
              <input
                type="text"
                value={tempForm.fullName}
                onChange={(e) => setTempForm({ ...tempForm, fullName: e.target.value })}
                className="w-full px-3 py-2 bg-[#051322] border border-white/10 rounded-lg text-xs text-white focus:border-[#C6922D] focus:outline-none"
                placeholder="e.g. Juan De La Cruz (Site Inspector)"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Temporary User Email</label>
              <input
                type="email"
                value={tempForm.email}
                onChange={(e) => setTempForm({ ...tempForm, email: e.target.value })}
                className="w-full px-3 py-2 bg-[#051322] border border-white/10 rounded-lg text-xs text-white focus:border-[#C6922D] focus:outline-none"
                placeholder="e.g. inspector@dti-region3.gov.ph"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Organization / Agency</label>
              <input
                type="text"
                value={tempForm.organizationName}
                onChange={(e) => setTempForm({ ...tempForm, organizationName: e.target.value })}
                className="w-full px-3 py-2 bg-[#051322] border border-white/10 rounded-lg text-xs text-white focus:border-[#C6922D] focus:outline-none"
                placeholder="e.g. Municipal Structural Inspection Unit"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Temporary Role</label>
              <select
                value={tempForm.initialRole}
                onChange={(e) => setTempForm({ ...tempForm, initialRole: e.target.value })}
                className="w-full px-3 py-2 bg-[#051322] border border-white/10 rounded-lg text-xs text-white focus:border-[#C6922D] focus:outline-none"
              >
                <option value="Auditor">Auditor (Read-Only Compliance Review)</option>
                <option value="Compliance Reviewer">Compliance Reviewer</option>
                <option value="Supplier">Supplier (Submittal Verification)</option>
                <option value="Partner">Partner (Field Engineer)</option>
              </select>
            </div>

            <div className="md:col-span-2">
              <label className="block text-xs font-semibold text-slate-300 mb-1">Emergency Access Reason</label>
              <input
                type="text"
                value={tempForm.reason}
                onChange={(e) => setTempForm({ ...tempForm, reason: e.target.value })}
                className="w-full px-3 py-2 bg-[#051322] border border-white/10 rounded-lg text-xs text-white focus:border-[#C6922D] focus:outline-none"
                required
              />
            </div>

            <div className="md:col-span-2 pt-4 border-t border-white/10 flex justify-end">
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold uppercase tracking-wider rounded-lg transition-all shadow-lg flex items-center gap-2 disabled:opacity-50"
              >
                {loading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Key className="w-4 h-4" />}
                <span>Generate Cryptographic Temporary Credentials</span>
              </button>
            </div>
          </form>

          {/* Display Generated Temporary Password */}
          {generatedTempPassword && (
            <div className="mt-6 p-5 bg-[#051322] border border-amber-500/50 rounded-xl space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-amber-400 uppercase flex items-center gap-2">
                  <Key className="w-4 h-4" /> Temporary High-Entropy Password Generated
                </span>
                <span className="text-[11px] font-mono text-slate-400">Single-Use • 24h Expiry</span>
              </div>
              <div className="p-4 bg-[#08182B] rounded-lg border border-white/10 font-mono space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-400">Target User:</span>
                  <span className="text-white">{generatedTempPassword.email}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-slate-400">Temporary Password:</span>
                  <span className="text-amber-300 font-bold tracking-wider">{generatedTempPassword.password}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-slate-400">Expires At:</span>
                  <span className="text-slate-300">{new Date(generatedTempPassword.expiresAt).toLocaleString()}</span>
                </div>
                <div className="pt-2 text-[11px] text-amber-400 border-t border-white/10">
                  User will be prompted immediately to enter a permanent password and enroll in 2FA upon sign-in.
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* TAB 3: INVITATIONS LIST */}
      {activeTab === 'invitations' && (
        <div className="mt-6 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-slate-400">
              Active & Historic Single-Use Invitation Registry
            </span>
            <button
              onClick={fetchInvitations}
              className="px-2.5 py-1 bg-white/5 hover:bg-white/10 rounded text-xs text-slate-300 flex items-center gap-1"
            >
              <RefreshCw className="w-3 h-3" /> Refresh
            </button>
          </div>

          <div className="overflow-x-auto border border-white/10 rounded-xl">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-[#051322] text-slate-400 font-mono uppercase text-[10px] border-b border-white/10">
                <tr>
                  <th className="py-3 px-4">Recipient</th>
                  <th className="py-3 px-4">Organization</th>
                  <th className="py-3 px-4">Portal & Role</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Expires</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 font-sans">
                {invitations.map((inv) => (
                  <tr key={inv.id} className="hover:bg-white/5">
                    <td className="py-3 px-4">
                      <div className="font-semibold text-white">{inv.fullName}</div>
                      <div className="text-[11px] font-mono text-slate-400">{inv.email}</div>
                    </td>
                    <td className="py-3 px-4">{inv.organizationName}</td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-0.5 rounded bg-white/10 text-slate-200 font-mono text-[10px] mr-1 uppercase">
                        {inv.portalType}
                      </span>
                      <span className="text-slate-300">{inv.initialRole}</span>
                    </td>
                    <td className="py-3 px-4 font-mono text-[11px]">
                      {inv.status === 'PENDING' && (
                        <span className="text-amber-400 font-semibold">● PENDING</span>
                      )}
                      {inv.status === 'ACCEPTED' && (
                        <span className="text-emerald-400 font-semibold">● ACCEPTED</span>
                      )}
                      {inv.status === 'REVOKED' && (
                        <span className="text-rose-400 font-semibold">● REVOKED</span>
                      )}
                      {inv.status === 'EXPIRED' && (
                        <span className="text-slate-500 font-semibold">● EXPIRED</span>
                      )}
                    </td>
                    <td className="py-3 px-4 font-mono text-[11px] text-slate-400">
                      {new Date(inv.expiresAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </td>
                    <td className="py-3 px-4 text-right">
                      {inv.status === 'PENDING' && (
                        <button
                          onClick={() => handleRevokeInvitation(inv.id)}
                          className="px-2 py-1 text-rose-400 hover:bg-rose-950/50 rounded border border-rose-800/40 text-[11px] font-mono inline-flex items-center gap-1"
                        >
                          <Trash2 className="w-3 h-3" /> Revoke
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
                {invitations.length === 0 && (
                  <tr>
                    <td colSpan={6} className="py-8 text-center text-slate-500 text-xs">
                      No invitations recorded.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 4: QA SECURITY SUITE (21 TESTS) */}
      {activeTab === 'qa-tests' && (
        <div className="mt-6 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 bg-[#051322] border border-white/10 rounded-xl">
            <div>
              <div className="text-xs font-mono font-bold text-[#C6922D] uppercase flex items-center gap-2">
                <Terminal className="w-4 h-4" /> Section 21: Required Security Test Suite
              </div>
              <p className="text-xs text-slate-300 mt-1 font-sans">
                Executes all 21 mandatory test categories verifying multi-tenant boundaries, separation of duties, temporary access expiration, and AI retrieval isolation.
              </p>
            </div>
            <button
              onClick={runSecuritySuite}
              disabled={qaLoading}
              className="px-4 py-2 bg-[#C6922D] hover:bg-[#d8a339] text-[#071A2F] text-xs font-bold uppercase tracking-wider rounded-lg transition-all flex items-center gap-2 shrink-0 disabled:opacity-50"
            >
              {qaLoading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Activity className="w-4 h-4" />}
              <span>{qaLoading ? 'Executing Tests...' : 'Run All 21 Tests'}</span>
            </button>
          </div>

          {qaResults && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 font-mono text-center">
                <div className="p-3 bg-[#051322] border border-white/10 rounded-xl">
                  <div className="text-xs text-slate-400">Total Test Scenarios</div>
                  <div className="text-xl font-bold text-white mt-1">{qaResults.summary.total}</div>
                </div>
                <div className="p-3 bg-emerald-950/40 border border-emerald-800/40 rounded-xl">
                  <div className="text-xs text-emerald-400">Passed Verification</div>
                  <div className="text-xl font-bold text-emerald-400 mt-1">{qaResults.summary.passed}</div>
                </div>
                <div className="p-3 bg-rose-950/40 border border-rose-800/40 rounded-xl">
                  <div className="text-xs text-rose-400">Failures / Defects</div>
                  <div className="text-xl font-bold text-rose-400 mt-1">{qaResults.summary.failed}</div>
                </div>
              </div>

              <div className="overflow-x-auto border border-white/10 rounded-xl">
                <table className="w-full text-left text-xs text-slate-300">
                  <thead className="bg-[#051322] text-slate-400 font-mono uppercase text-[10px] border-b border-white/10">
                    <tr>
                      <th className="py-2.5 px-3">#</th>
                      <th className="py-2.5 px-3">Category</th>
                      <th className="py-2.5 px-3">Test Scenario</th>
                      <th className="py-2.5 px-3">Validation Evidence</th>
                      <th className="py-2.5 px-3 text-right">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5 font-sans">
                    {qaResults.results.map((t: any) => (
                      <tr key={t.id} className="hover:bg-white/5">
                        <td className="py-2.5 px-3 font-mono text-slate-400">{t.id}</td>
                        <td className="py-2.5 px-3 font-mono text-[11px] text-[#C6922D]">{t.category}</td>
                        <td className="py-2.5 px-3 font-semibold text-white">{t.name}</td>
                        <td className="py-2.5 px-3 text-slate-300 text-[11px] leading-relaxed max-w-xs">{t.details}</td>
                        <td className="py-2.5 px-3 text-right font-mono">
                          {t.status === 'PASSED' ? (
                            <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800 font-bold text-[10px]">
                              PASS
                            </span>
                          ) : (
                            <span className="px-2 py-0.5 rounded bg-rose-950 text-rose-400 border border-rose-800 font-bold text-[10px]">
                              FAIL
                            </span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      )}

      {/* TAB 5: SECURITY AUDIT TRAIL */}
      {activeTab === 'audit-trail' && (
        <div className="mt-6 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-slate-400">
              Immutable Server Audit Trail (Append-Only) • Section 18
            </span>
            <button
              onClick={fetchAuditLogs}
              disabled={auditLoading}
              className="px-2.5 py-1 bg-white/5 hover:bg-white/10 rounded text-xs text-slate-300 flex items-center gap-1"
            >
              <RefreshCw className="w-3 h-3" /> Refresh
            </button>
          </div>

          <div className="overflow-x-auto border border-white/10 rounded-xl max-h-96">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-[#051322] text-slate-400 font-mono uppercase text-[10px] border-b border-white/10 sticky top-0">
                <tr>
                  <th className="py-2.5 px-3">Timestamp</th>
                  <th className="py-2.5 px-3">Actor</th>
                  <th className="py-2.5 px-3">Action</th>
                  <th className="py-2.5 px-3">Target</th>
                  <th className="py-2.5 px-3">Outcome</th>
                  <th className="py-2.5 px-3">Reason / Context</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 font-mono text-[11px]">
                {auditLogs.map((log) => (
                  <tr key={log.id} className="hover:bg-white/5">
                    <td className="py-2.5 px-3 text-slate-400">
                      {new Date(log.timestamp).toLocaleTimeString()}
                    </td>
                    <td className="py-2.5 px-3 text-slate-200">
                      {log.actor.email} <span className="text-slate-500">({log.actor.role || 'user'})</span>
                    </td>
                    <td className="py-2.5 px-3 font-semibold text-white">{log.action}</td>
                    <td className="py-2.5 px-3 text-slate-400 truncate max-w-[120px]">{log.target}</td>
                    <td className="py-2.5 px-3">
                      {log.outcome === 'SUCCESS' ? (
                        <span className="text-emerald-400 font-bold">SUCCESS</span>
                      ) : (
                        <span className="text-rose-400 font-bold">DENIED</span>
                      )}
                    </td>
                    <td className="py-2.5 px-3 text-slate-400 truncate max-w-[200px]">{log.reason || log.sourceContext}</td>
                  </tr>
                ))}
                {auditLogs.length === 0 && (
                  <tr>
                    <td colSpan={6} className="py-8 text-center text-slate-500 text-xs">
                      No security audit records logged.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 6: PUBLIC CONTENT & PROJECT LIBRARY PUBLISHING */}
      {activeTab === 'public-content' && (
        <div className="mt-6">
          <PublicProjectAdminConsole currentUser={currentUser} onNavigate={onNavigate} />
        </div>
      )}
    </div>
  );
};
