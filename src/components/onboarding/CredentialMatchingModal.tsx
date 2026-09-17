import React, { useState } from 'react';
import {
  Shield,
  ShieldCheck,
  ShieldAlert,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  RefreshCw,
  X,
  FileText,
  Building,
  User,
  Clock,
  ExternalLink,
  ChevronRight,
  Sparkles,
} from 'lucide-react';
import { VerificationRecord, LiveLicenseStatus } from '../../types/onboardingTypes';
import { GovernmentVerificationService } from '../../services/governmentVerificationService';

interface CredentialMatchingModalProps {
  record: VerificationRecord | null;
  isOpen: boolean;
  onClose: () => void;
  onRecordUpdated?: (updated: VerificationRecord) => void;
}

export const CredentialMatchingModal: React.FC<CredentialMatchingModalProps> = ({
  record,
  isOpen,
  onClose,
  onRecordUpdated,
}) => {
  const [isRechecking, setIsRechecking] = useState(false);
  const [reviewNotes, setReviewNotes] = useState('');
  const [activeTab, setActiveTab] = useState<'comparison' | 'audit' | 'raw'>('comparison');
  const [currentRecord, setCurrentRecord] = useState<VerificationRecord | null>(record);

  React.useEffect(() => {
    setCurrentRecord(record);
    if (record) {
      setReviewNotes(record.notes || '');
    }
  }, [record]);

  if (!isOpen || !currentRecord) return null;

  const handleRecheck = async () => {
    setIsRechecking(true);
    try {
      const updated = await GovernmentVerificationService.recheckCredential(currentRecord.verificationId);
      if (updated) {
        setCurrentRecord(updated);
        onRecordUpdated?.(updated);
      }
    } finally {
      setIsRechecking(false);
    }
  };

  const handleHumanReview = (decision: 'REVIEWED_ACCEPTED' | 'FLAGGED_DISCREPANCY' | 'OVERRIDDEN') => {
    const updated = GovernmentVerificationService.updateHumanReview(
      currentRecord.verificationId,
      decision,
      'Compliance Officer (Authorized)',
      reviewNotes
    );
    if (updated) {
      setCurrentRecord(updated);
      onRecordUpdated?.(updated);
    }
  };

  const fields = currentRecord.comparisonFields;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl text-slate-100 overflow-hidden my-8">
        {/* Header with Mandatory Simulation Banner */}
        <div className="bg-gradient-to-r from-amber-500/20 via-amber-600/10 to-transparent border-b border-amber-500/30 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-amber-500/20 border border-amber-500/30 rounded-xl text-amber-400">
                <ShieldAlert className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded text-[11px] font-mono font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                    DEMO ENVIRONMENT
                  </span>
                  <span className="px-2 py-0.5 rounded text-[11px] font-mono font-bold bg-blue-500/20 text-blue-300 border border-blue-500/30">
                    SIMULATED GOVERNMENT VERIFICATION
                  </span>
                  <span className="text-xs text-slate-400 font-mono">{currentRecord.verificationId}</span>
                </div>
                <h2 className="text-lg font-bold text-white mt-1">
                  Credential Matching & Field-Level Audit
                </h2>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="mt-3 p-2.5 bg-slate-950/60 border border-amber-500/20 rounded-lg text-xs text-amber-200/90 leading-relaxed">
            <strong>Simulation Guardrail:</strong> Government verification results displayed in this development environment are simulated using fictional test records. No live government database or licensing portal is connected.
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-slate-800 bg-slate-950/40 px-6 pt-2">
          <button
            onClick={() => setActiveTab('comparison')}
            className={`px-4 py-2.5 text-xs font-semibold border-b-2 transition-colors ${
              activeTab === 'comparison'
                ? 'border-[#C6922D] text-[#C6922D]'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            Field Comparison (AI vs Simulated Government)
          </button>
          <button
            onClick={() => setActiveTab('audit')}
            className={`px-4 py-2.5 text-xs font-semibold border-b-2 transition-colors ${
              activeTab === 'audit'
                ? 'border-[#C6922D] text-[#C6922D]'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            Review & Compliance Decision
          </button>
          <button
            onClick={() => setActiveTab('raw')}
            className={`px-4 py-2.5 text-xs font-semibold border-b-2 transition-colors ${
              activeTab === 'raw'
                ? 'border-[#C6922D] text-[#C6922D]'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            Raw Simulated Response Payload
          </button>
        </div>

        {/* Body Content */}
        <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto">
          {activeTab === 'comparison' && (
            <div className="space-y-6">
              {/* Summary Cards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-3.5 bg-slate-800/60 border border-slate-700/60 rounded-xl">
                  <div className="text-[11px] text-slate-400">Target Entity & ID</div>
                  <div className="text-sm font-semibold text-white mt-1">
                    {fields.fullName.uploaded}
                  </div>
                  <div className="text-xs text-[#C6922D] font-mono mt-0.5">{currentRecord.entityId}</div>
                </div>

                <div className="p-3.5 bg-slate-800/60 border border-slate-700/60 rounded-xl">
                  <div className="text-[11px] text-slate-400">Connector & Agency</div>
                  <div className="text-sm font-semibold text-white mt-1">{currentRecord.agency}</div>
                  <div className="text-xs text-blue-400 font-mono mt-0.5">{currentRecord.connector}</div>
                </div>

                <div className="p-3.5 bg-slate-800/60 border border-slate-700/60 rounded-xl">
                  <div className="text-[11px] text-slate-400">Simulated Status</div>
                  <div className="flex items-center gap-2 mt-1">
                    <span
                      className={`px-2 py-0.5 rounded text-xs font-bold ${
                        currentRecord.status === 'Active'
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                          : currentRecord.status === 'Expiring Soon'
                          ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                          : 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                      }`}
                    >
                      {currentRecord.status}
                    </span>
                    <span className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-slate-700 text-slate-300">
                      {currentRecord.badge}
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-400 mt-1">
                    Ref: {currentRecord.sourceReference}
                  </div>
                </div>
              </div>

              {/* Discrepancy Callout if present */}
              {currentRecord.discrepancies.length > 0 && (
                <div className="p-4 bg-rose-500/10 border border-rose-500/30 rounded-xl space-y-2">
                  <div className="flex items-center gap-2 text-rose-400 text-xs font-bold">
                    <AlertTriangle className="w-4 h-4" />
                    <span>Discrepancies Identified During Simulated Matching:</span>
                  </div>
                  <ul className="list-disc list-inside text-xs text-rose-200/90 space-y-1 pl-1">
                    {currentRecord.discrepancies.map((d, i) => (
                      <li key={i}>{d}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Side-by-Side Comparison Table */}
              <div className="border border-slate-800 rounded-xl overflow-hidden">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-950/80 border-b border-slate-800 text-slate-300">
                    <tr>
                      <th className="p-3 w-1/4 font-semibold">Field Name</th>
                      <th className="p-3 w-1/3 font-semibold">Uploaded / Extracted</th>
                      <th className="p-3 w-1/3 font-semibold">Simulated Government Record</th>
                      <th className="p-3 w-16 text-center font-semibold">Match</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60 bg-slate-900/40">
                    <tr>
                      <td className="p-3 font-medium text-slate-400">Full Legal Name</td>
                      <td className="p-3 text-white font-mono">{fields.fullName.uploaded}</td>
                      <td className="p-3 text-slate-200 font-mono">{fields.fullName.government}</td>
                      <td className="p-3 text-center">
                        {fields.fullName.match ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 inline" />
                        ) : (
                          <XCircle className="w-4 h-4 text-rose-400 inline" />
                        )}
                      </td>
                    </tr>

                    <tr>
                      <td className="p-3 font-medium text-slate-400">License / Reg Number</td>
                      <td className="p-3 text-[#C6922D] font-mono font-bold">{fields.licenseNumber.uploaded}</td>
                      <td className="p-3 text-[#C6922D] font-mono font-bold">{fields.licenseNumber.government}</td>
                      <td className="p-3 text-center">
                        {fields.licenseNumber.match ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 inline" />
                        ) : (
                          <XCircle className="w-4 h-4 text-rose-400 inline" />
                        )}
                      </td>
                    </tr>

                    {fields.companyName && (
                      <tr>
                        <td className="p-3 font-medium text-slate-400">Corporate Entity Name</td>
                        <td className="p-3 text-white font-mono">{fields.companyName.uploaded}</td>
                        <td className="p-3 text-slate-200 font-mono">{fields.companyName.government}</td>
                        <td className="p-3 text-center">
                          {fields.companyName.match ? (
                            <CheckCircle2 className="w-4 h-4 text-emerald-400 inline" />
                          ) : (
                            <XCircle className="w-4 h-4 text-rose-400 inline" />
                          )}
                        </td>
                      </tr>
                    )}

                    {fields.professionalCategory && (
                      <tr>
                        <td className="p-3 font-medium text-slate-400">Professional Category</td>
                        <td className="p-3 text-white font-mono">{fields.professionalCategory.uploaded}</td>
                        <td className="p-3 text-slate-200 font-mono">{fields.professionalCategory.government}</td>
                        <td className="p-3 text-center">
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 inline" />
                        </td>
                      </tr>
                    )}

                    <tr>
                      <td className="p-3 font-medium text-slate-400">Expiration Date</td>
                      <td className="p-3 text-white font-mono">{fields.expirationDate.uploaded}</td>
                      <td className="p-3 text-slate-200 font-mono">{fields.expirationDate.government}</td>
                      <td className="p-3 text-center">
                        {fields.expirationDate.match ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 inline" />
                        ) : (
                          <XCircle className="w-4 h-4 text-rose-400 inline" />
                        )}
                      </td>
                    </tr>

                    <tr>
                      <td className="p-3 font-medium text-slate-400">Issuing Authority</td>
                      <td className="p-3 text-white font-mono">{fields.issuingAuthority.uploaded}</td>
                      <td className="p-3 text-slate-200 font-mono">{fields.issuingAuthority.government}</td>
                      <td className="p-3 text-center">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 inline" />
                      </td>
                    </tr>

                    <tr>
                      <td className="p-3 font-medium text-slate-400">Current Status</td>
                      <td className="p-3 text-white font-mono">{fields.currentStatus.uploaded}</td>
                      <td className="p-3 text-slate-200 font-mono">{fields.currentStatus.government}</td>
                      <td className="p-3 text-center">
                        {fields.currentStatus.match ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 inline" />
                        ) : (
                          <XCircle className="w-4 h-4 text-rose-400 inline" />
                        )}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* AI Disclaimer mandate */}
              <div className="p-3 bg-slate-950 border border-slate-800 rounded-lg flex items-start gap-2.5 text-xs text-slate-400">
                <Sparkles className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <p>
                  <strong>AI Governance Rule:</strong> AI extraction suggestions identify document text but never declare a license authentic without simulated government confirmation and authorized human compliance review.
                </p>
              </div>
            </div>
          )}

          {activeTab === 'audit' && (
            <div className="space-y-6">
              <div className="p-4 bg-slate-800/40 border border-slate-700/60 rounded-xl space-y-3">
                <h3 className="text-sm font-semibold text-white">Compliance Review Disposition</h3>
                <p className="text-xs text-slate-300">
                  Current Status: <span className="font-mono text-[#C6922D] font-bold">{currentRecord.reviewStatus}</span>
                  {currentRecord.reviewedBy && (
                    <span className="text-slate-400 ml-2">by {currentRecord.reviewedBy} at {currentRecord.reviewedAt}</span>
                  )}
                </p>

                <div className="space-y-1.5">
                  <label className="text-xs text-slate-400">Review Notes & Statutory Justification:</label>
                  <textarea
                    rows={3}
                    value={reviewNotes}
                    onChange={(e) => setReviewNotes(e.target.value)}
                    placeholder="Enter compliance determination, explanation of discrepancies, or conditions for provisional approval..."
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-xs text-slate-200 focus:outline-none focus:border-[#C6922D]"
                  />
                </div>

                <div className="flex flex-wrap gap-2 pt-2">
                  <button
                    onClick={() => handleHumanReview('REVIEWED_ACCEPTED')}
                    className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    Accept & Mark Manually Verified
                  </button>
                  <button
                    onClick={() => handleHumanReview('FLAGGED_DISCREPANCY')}
                    className="px-3.5 py-2 bg-rose-600 hover:bg-rose-500 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors"
                  >
                    <XCircle className="w-4 h-4" />
                    Flag Discrepancy (Request Correction)
                  </button>
                  <button
                    onClick={() => handleHumanReview('OVERRIDDEN')}
                    className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-600 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors"
                  >
                    Executive Override (Provisional Waiver)
                  </button>
                </div>
              </div>

              <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-2">
                <h4 className="text-xs font-semibold text-slate-300">Statutory and Regulatory References</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Republic Act No. 8981 (PRC Modernization Act) / RA 4566 (Contractors License Law) / National Building Code (PD 1096).
                  All project participants must hold active, unexpired licenses in good standing throughout physical site mobilization.
                </p>
              </div>
            </div>
          )}

          {activeTab === 'raw' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-400 font-mono">Raw Simulated Payload: {currentRecord.sourceReference}</span>
                <span className="text-[11px] text-amber-400 font-mono">Environment: DEMO_SANDBOX</span>
              </div>
              <pre className="p-4 bg-slate-950 border border-slate-800 rounded-xl text-xs font-mono text-emerald-400 overflow-x-auto leading-relaxed">
                {currentRecord.rawResponseReference || JSON.stringify(currentRecord, null, 2)}
              </pre>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="bg-slate-950 border-t border-slate-800 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <Clock className="w-3.5 h-3.5" />
            <span>Last Simulated Query: {currentRecord.responseTimestamp}</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleRecheck}
              disabled={isRechecking}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 rounded-lg text-xs font-semibold flex items-center gap-2 transition-colors disabled:opacity-50"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isRechecking ? 'animate-spin' : ''}`} />
              {isRechecking ? 'Querying Simulated Agency...' : 'Recheck Simulated Record'}
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-xs font-semibold transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
