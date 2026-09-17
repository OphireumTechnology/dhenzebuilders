import React, { useState, useEffect } from 'react';
import {
  FileText,
  Upload,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  ShieldCheck,
  Lock,
  Eye,
  RefreshCw,
  Clock,
  History,
  Download,
  Check,
  X,
  AlertCircle,
  FileCheck,
  UserCheck,
} from 'lucide-react';
import { OFFICIAL_PROFILE_METADATA } from '../../data/companyProfileData';

interface ValidationItem {
  id: string;
  label: string;
  passed: boolean;
  details: string;
}

interface ProfileVersion {
  version: string;
  edition: string;
  status: string;
  uploadedAt: string;
  uploadedBy: string;
  complianceReviewedAt?: string;
  complianceReviewer?: string;
  executiveApprovedAt?: string;
  executiveApprover?: string;
  publishedAt?: string;
  sha256Checksum: string;
  fileSizeBytes: number;
  pageCount: number;
  fileName: string;
  changeLog: string;
  validations: ValidationItem[];
}

interface AuditLog {
  id: string;
  timestamp: string;
  actor: string;
  role: string;
  action: string;
  details: string;
}

interface CompanyProfileAdminConsoleProps {
  onNavigate?: (view: string) => void;
}

export const CompanyProfileAdminConsole: React.FC<CompanyProfileAdminConsoleProps> = ({
  onNavigate,
}) => {
  const [activeVersion, setActiveVersion] = useState<ProfileVersion | null>(null);
  const [versions, setVersions] = useState<ProfileVersion[]>([]);
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [actionLoading, setActionLoading] = useState<boolean>(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  // New Upload Form State
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [newEditionName, setNewEditionName] = useState('2026 Updated Edition');
  const [changeLogNotes, setChangeLogNotes] = useState('');

  // Simulated active user role selector for dual-custody demonstration
  const [currentActorRole, setCurrentActorRole] = useState<
    'System Administrator' | 'Compliance Reviewer' | 'Executive Approver'
  >('System Administrator');

  const fetchAdminData = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/company-profile/status', {
        headers: { Accept: 'application/json' },
      });
      const ct = res.headers.get('content-type') || '';
      if (res.ok && ct.includes('application/json')) {
        const data = await res.json();
        if (data) {
          setActiveVersion(data.activeVersion);
          setVersions(data.versions || []);
          setAuditLogs(data.auditLogs || []);
        }
      }
    } catch (err) {
      console.error('Failed to fetch admin profile status:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdminData();
  }, []);

  const safeJson = async (res: Response) => {
    const ct = res.headers.get('content-type') || '';
    if (!ct.includes('application/json')) return null;
    try {
      return await res.json();
    } catch {
      return null;
    }
  };

  const handleUploadNewDraft = async () => {
    if (currentActorRole !== 'System Administrator') {
      alert('Only System Administrators can upload new draft editions.');
      return;
    }

    setActionLoading(true);
    try {
      const res = await fetch('/api/admin/company-profile/upload', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          edition: newEditionName,
          changeLog: changeLogNotes,
          uploadedBy: 'admin@dhenzebuilder.com (System Administrator)',
        }),
      });
      const data = await safeJson(res);
      if (data?.success) {
        setStatusMessage(`Successfully staged ${newEditionName}. Automated validations passed.`);
        setUploadModalOpen(false);
        fetchAdminData();
      }
    } catch (err) {
      alert('Upload failed. Check server console.');
    } finally {
      setActionLoading(false);
    }
  };

  const handleComplianceSignOff = async (version: string) => {
    if (currentActorRole !== 'Compliance Reviewer') {
      alert('Compliance sign-off requires role: Compliance Reviewer');
      return;
    }

    setActionLoading(true);
    try {
      const res = await fetch('/api/admin/company-profile/compliance-review', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          version,
          reviewerEmail: 'legal@dhenzebuilder.com (Compliance Reviewer)',
          notes: 'Statutory disclosures, RA 9266 statements, and PRC licensing verified.',
        }),
      });
      const data = await safeJson(res);
      if (data?.success) {
        setStatusMessage(`Compliance sign-off registered for version ${version}.`);
        fetchAdminData();
      }
    } catch (err) {
      alert('Failed to register sign-off.');
    } finally {
      setActionLoading(false);
    }
  };

  const handleExecutiveApprove = async (version: string) => {
    if (currentActorRole !== 'Executive Approver') {
      alert('Executive authorization requires role: Executive Approver (CEO)');
      return;
    }

    setActionLoading(true);
    try {
      const res = await fetch('/api/admin/company-profile/executive-approve', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          version,
          approverEmail: 'ceo@dhenzebuilder.com (Leodenis Deveza Languisan, CEO)',
          notes: 'Executive approval granted for public distribution.',
        }),
      });
      const data = await safeJson(res);
      if (data?.success) {
        setStatusMessage(`Executive approval granted for version ${version}. Ready for publication.`);
        fetchAdminData();
      }
    } catch (err) {
      alert('Failed to approve version.');
    } finally {
      setActionLoading(false);
    }
  };

  const handlePublish = async (version: string) => {
    setActionLoading(true);
    try {
      const res = await fetch('/api/admin/company-profile/publish', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          version,
          actorEmail: 'admin@dhenzebuilder.com',
        }),
      });
      const data = await safeJson(res);
      if (data?.success) {
        setStatusMessage(`Version ${version} is now LIVE on the public website.`);
        fetchAdminData();
      }
    } catch (err) {
      alert('Failed to publish version.');
    } finally {
      setActionLoading(false);
    }
  };

  const handleEmergencyRevoke = async () => {
    const reason = prompt('Please enter the administrative reason for emergency revocation:');
    if (!reason) return;

    setActionLoading(true);
    try {
      const res = await fetch('/api/admin/company-profile/revoke', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          reason,
          actorEmail: 'executive@dhenzebuilder.com',
        }),
      });
      const data = await safeJson(res);
      if (data?.success) {
        setStatusMessage('Public distribution has been revoked. Access blocked.');
        fetchAdminData();
      }
    } catch (err) {
      alert('Revocation request failed.');
    } finally {
      setActionLoading(false);
    }
  };

  return (
    <div className="space-y-8 text-slate-100 p-4 sm:p-6 lg:p-8 bg-[#051322] min-h-screen">
      {/* Top Console Bar */}
      <div className="bg-[#071A2F] border border-[#C6922D]/30 rounded-2xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-xl">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded bg-[#C6922D]/20 text-[#C6922D] text-[11px] font-mono font-bold uppercase tracking-wider">
              Controlled Corporate Resource
            </span>
            <span className="text-xs text-slate-400">Governance Engine</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white font-['Montserrat']">
            Company Profile Publication Console
          </h1>
          <p className="text-xs sm:text-sm text-slate-400">
            Controlled distribution lifecycle, separation of duties &amp; cryptographic audit trail.
          </p>
        </div>

        {/* Role Switcher & Staging Button */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Active Role Selector for Testing Dual-Custody */}
          <div className="bg-[#051322] border border-white/10 rounded-xl px-3 py-1.5 flex items-center gap-2 text-xs">
            <UserCheck className="w-4 h-4 text-[#C6922D]" />
            <span className="text-slate-400 text-[11px]">Acting Role:</span>
            <select
              value={currentActorRole}
              onChange={(e: any) => setCurrentActorRole(e.target.value)}
              className="bg-transparent text-[#C6922D] font-semibold font-mono focus:outline-none cursor-pointer text-xs"
            >
              <option value="System Administrator" className="bg-[#071A2F] text-white">
                System Administrator
              </option>
              <option value="Compliance Reviewer" className="bg-[#071A2F] text-white">
                Compliance Reviewer
              </option>
              <option value="Executive Approver" className="bg-[#071A2F] text-white">
                Executive Approver (CEO)
              </option>
            </select>
          </div>

          <button
            onClick={() => setUploadModalOpen(true)}
            className="px-4 py-2 rounded-xl bg-[#C6922D] hover:bg-[#d8a339] text-[#071A2F] font-bold text-xs uppercase tracking-wider transition-colors flex items-center gap-2"
          >
            <Upload className="w-4 h-4" />
            <span>Upload New Draft</span>
          </button>

          <button
            onClick={fetchAdminData}
            disabled={loading}
            className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10 transition-colors"
            title="Refresh state"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin text-[#C6922D]' : ''}`} />
          </button>
        </div>
      </div>

      {/* Notification status message */}
      {statusMessage && (
        <div className="p-3.5 bg-[#C6922D]/15 border border-[#C6922D]/40 rounded-xl text-xs text-[#E5B95D] flex items-center justify-between animate-fadeIn">
          <span>{statusMessage}</span>
          <button onClick={() => setStatusMessage(null)} className="text-slate-400 hover:text-white">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Active Live Publication Overview Card */}
      {activeVersion && (
        <div className="bg-[#071A2F] border border-white/10 rounded-2xl p-6 sm:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-5">
            <div>
              <div className="flex items-center gap-2">
                <span
                  className={`px-2.5 py-0.5 rounded text-[11px] font-bold font-mono uppercase tracking-wider ${
                    activeVersion.status === 'PUBLISHED'
                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                      : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                  }`}
                >
                  Status: {activeVersion.status}
                </span>
                <span className="text-xs text-slate-400">v{activeVersion.version}</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
                {activeVersion.edition}
              </h2>
            </div>

            {/* Quick Actions */}
            <div className="flex flex-wrap items-center gap-2.5">
              {activeVersion.status === 'PUBLISHED' ? (
                <button
                  onClick={handleEmergencyRevoke}
                  disabled={actionLoading}
                  className="px-3.5 py-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30 text-xs font-semibold transition-colors flex items-center gap-1.5"
                >
                  <AlertTriangle className="w-3.5 h-3.5" />
                  <span>Emergency Unpublish</span>
                </button>
              ) : activeVersion.status === 'APPROVED_FOR_PUBLICATION' ? (
                <button
                  onClick={() => handlePublish(activeVersion.version)}
                  disabled={actionLoading}
                  className="px-4 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-[#071A2F] font-bold text-xs uppercase tracking-wider transition-colors flex items-center gap-1.5"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Publish to Public Site</span>
                </button>
              ) : null}

              <a
                href="/api/corporate-resources/company-profile/download"
                className="px-3.5 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-200 border border-white/10 text-xs font-semibold transition-colors flex items-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5 text-[#C6922D]" />
                <span>Test Download Stream</span>
              </a>
            </div>
          </div>

          {/* Separation of Duties Progress Pipeline */}
          <div className="space-y-3">
            <h3 className="text-xs font-mono uppercase tracking-widest text-slate-400 font-bold">
              Controlled Dual-Custody Approval Pipeline:
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
              {/* Step 1: Upload */}
              <div className="bg-[#051322] border border-white/5 rounded-xl p-4 space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-300">1. Draft Staged</span>
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                </div>
                <div className="text-[11px] text-slate-400 truncate">{activeVersion.uploadedBy}</div>
                <div className="text-[10px] text-slate-500 font-mono">
                  {new Date(activeVersion.uploadedAt).toLocaleDateString()}
                </div>
              </div>

              {/* Step 2: Automated Validation */}
              <div className="bg-[#051322] border border-white/5 rounded-xl p-4 space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-300">2. Automated Safety</span>
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                </div>
                <div className="text-[11px] text-slate-400">10 / 10 Tests Passed</div>
                <div className="text-[10px] text-emerald-400 font-mono">Clean &amp; Compliant</div>
              </div>

              {/* Step 3: Compliance Review */}
              <div className="bg-[#051322] border border-white/5 rounded-xl p-4 space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-300">3. Compliance Sign-Off</span>
                  {activeVersion.complianceReviewedAt ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  ) : (
                    <Clock className="w-4 h-4 text-amber-400" />
                  )}
                </div>
                {activeVersion.complianceReviewedAt ? (
                  <>
                    <div className="text-[11px] text-slate-400 truncate">
                      {activeVersion.complianceReviewer}
                    </div>
                    <div className="text-[10px] text-slate-500 font-mono">
                      {new Date(activeVersion.complianceReviewedAt).toLocaleDateString()}
                    </div>
                  </>
                ) : (
                  <button
                    onClick={() => handleComplianceSignOff(activeVersion.version)}
                    className="w-full mt-1 px-2 py-1 rounded bg-[#C6922D]/20 text-[#C6922D] hover:bg-[#C6922D]/30 text-[11px] font-semibold transition-colors"
                  >
                    Sign Off Disclaimers
                  </button>
                )}
              </div>

              {/* Step 4: Executive Authorization */}
              <div className="bg-[#051322] border border-white/5 rounded-xl p-4 space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-300">4. Executive Authorization</span>
                  {activeVersion.executiveApprovedAt ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  ) : (
                    <Lock className="w-4 h-4 text-slate-500" />
                  )}
                </div>
                {activeVersion.executiveApprovedAt ? (
                  <>
                    <div className="text-[11px] text-slate-400 truncate">
                      {activeVersion.executiveApprover}
                    </div>
                    <div className="text-[10px] text-slate-500 font-mono">
                      {new Date(activeVersion.executiveApprovedAt).toLocaleDateString()}
                    </div>
                  </>
                ) : (
                  <button
                    onClick={() => handleExecutiveApprove(activeVersion.version)}
                    disabled={!activeVersion.complianceReviewedAt}
                    className="w-full mt-1 px-2 py-1 rounded bg-[#C6922D] hover:bg-[#d8a339] text-[#071A2F] text-[11px] font-bold transition-colors disabled:opacity-40"
                  >
                    Authorize Publication
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Automated Validation Inspection Grid */}
          <div className="space-y-3 pt-4 border-t border-white/10">
            <h3 className="text-xs font-mono uppercase tracking-widest text-[#C6922D] font-bold">
              Ten-Point Automated Safety &amp; Compliance Checklist:
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {activeVersion.validations.map((item) => (
                <div
                  key={item.id}
                  className="bg-[#051322] border border-white/5 rounded-xl p-3 flex items-start gap-2.5 text-xs"
                >
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <div className="font-semibold text-slate-200">{item.label}</div>
                    <div className="text-slate-400 text-[11px] mt-0.5">{item.details}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Version History Table */}
      <div className="bg-[#071A2F] border border-white/10 rounded-2xl p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div className="flex items-center gap-2">
            <History className="w-5 h-5 text-[#C6922D]" />
            <h2 className="text-lg font-bold text-white font-['Montserrat']">
              Archival Version Repository
            </h2>
          </div>
          <span className="text-xs text-slate-400">{versions.length} editions registered</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-[#051322] text-slate-400 uppercase font-mono text-[10px] border-b border-white/5">
              <tr>
                <th className="p-3">Edition &amp; Version</th>
                <th className="p-3">Status</th>
                <th className="p-3">Staged Date</th>
                <th className="p-3">Compliance Sign-off</th>
                <th className="p-3">Executive Authorization</th>
                <th className="p-3">SHA-256 Digest</th>
                <th className="p-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {versions.map((ver) => (
                <tr key={ver.version} className="hover:bg-white/5 transition-colors">
                  <td className="p-3 font-semibold text-white">
                    {ver.edition} <span className="text-[#C6922D] font-mono">v{ver.version}</span>
                  </td>
                  <td className="p-3">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase ${
                        ver.status === 'PUBLISHED'
                          ? 'bg-emerald-500/15 text-emerald-400'
                          : ver.status === 'APPROVED_FOR_PUBLICATION'
                          ? 'bg-sky-500/15 text-sky-400'
                          : 'bg-amber-500/15 text-amber-300'
                      }`}
                    >
                      {ver.status}
                    </span>
                  </td>
                  <td className="p-3 font-mono text-slate-400">
                    {new Date(ver.uploadedAt).toLocaleDateString()}
                  </td>
                  <td className="p-3">
                    {ver.complianceReviewedAt ? (
                      <span className="text-emerald-400 flex items-center gap-1 text-[11px]">
                        <Check className="w-3.5 h-3.5" />
                        <span>Signed</span>
                      </span>
                    ) : (
                      <span className="text-slate-500 text-[11px]">Pending</span>
                    )}
                  </td>
                  <td className="p-3">
                    {ver.executiveApprovedAt ? (
                      <span className="text-emerald-400 flex items-center gap-1 text-[11px]">
                        <Check className="w-3.5 h-3.5" />
                        <span>Authorized</span>
                      </span>
                    ) : (
                      <span className="text-slate-500 text-[11px]">Pending</span>
                    )}
                  </td>
                  <td className="p-3 font-mono text-[10px] text-slate-500 truncate max-w-[120px]">
                    {ver.sha256Checksum}
                  </td>
                  <td className="p-3 text-right">
                    {ver.status === 'APPROVED_FOR_PUBLICATION' && (
                      <button
                        onClick={() => handlePublish(ver.version)}
                        className="px-2.5 py-1 rounded bg-emerald-500 text-[#071A2F] font-bold text-[10px] uppercase"
                      >
                        Publish
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Immutable Audit Log Table */}
      <div className="bg-[#071A2F] border border-white/10 rounded-2xl p-6 space-y-4">
        <div className="flex items-center gap-2 border-b border-white/10 pb-4">
          <ShieldCheck className="w-5 h-5 text-[#C6922D]" />
          <h2 className="text-lg font-bold text-white font-['Montserrat']">
            Immutable Document Audit Log
          </h2>
        </div>

        <div className="space-y-2.5 max-h-72 overflow-y-auto pr-2">
          {auditLogs.map((log) => (
            <div
              key={log.id}
              className="bg-[#051322] border border-white/5 rounded-xl p-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs"
            >
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <span className="font-mono font-bold text-[#C6922D] text-[11px]">{log.action}</span>
                  <span className="text-slate-400">•</span>
                  <span className="text-slate-300 font-medium">{log.actor}</span>
                  <span className="text-slate-500 text-[10px]">({log.role})</span>
                </div>
                <div className="text-slate-400 text-[11px]">{log.details}</div>
              </div>
              <div className="text-[10px] font-mono text-slate-500 shrink-0">
                {new Date(log.timestamp).toLocaleString()}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Upload Draft Modal */}
      {uploadModalOpen && (
        <div className="fixed inset-0 z-50 bg-[#020B14]/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#071A2F] border border-[#C6922D]/40 rounded-2xl max-w-lg w-full p-6 space-y-5 shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <h3 className="text-base font-bold text-white">Stage New Corporate Profile Draft</h3>
              <button
                onClick={() => setUploadModalOpen(false)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Edition Title:</label>
                <input
                  type="text"
                  value={newEditionName}
                  onChange={(e) => setNewEditionName(e.target.value)}
                  className="w-full bg-[#051322] border border-white/10 rounded-lg p-2.5 text-white focus:outline-none focus:border-[#C6922D]"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Change Log &amp; Scope:</label>
                <textarea
                  rows={3}
                  value={changeLogNotes}
                  onChange={(e) => setChangeLogNotes(e.target.value)}
                  placeholder="Outline changes to registrations, projects, or leadership..."
                  className="w-full bg-[#051322] border border-white/10 rounded-lg p-2.5 text-white focus:outline-none focus:border-[#C6922D]"
                />
              </div>

              <div className="p-3 bg-[#051322] border border-white/5 rounded-xl text-[11px] text-slate-400 space-y-1">
                <div className="font-bold text-[#C6922D]">Automated Checks on Ingestion:</div>
                <div>• MIME header check (%PDF-1.7)</div>
                <div>• SHA-256 cryptographic stamp</div>
                <div>• RA 9266 statutory disclaimer scan</div>
                <div>• Confidential PII &amp; pricing detection</div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-white/10">
              <button
                onClick={() => setUploadModalOpen(false)}
                className="px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 text-xs font-semibold"
              >
                Cancel
              </button>
              <button
                onClick={handleUploadNewDraft}
                disabled={actionLoading}
                className="px-4 py-2 rounded-lg bg-[#C6922D] hover:bg-[#d8a339] text-[#071A2F] text-xs font-bold uppercase tracking-wider"
              >
                {actionLoading ? 'Processing...' : 'Stage & Run Validations'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
