import React, { useState } from 'react';
import {
  ShieldCheck,
  ShieldAlert,
  AlertTriangle,
  FileText,
  Clock,
  RefreshCw,
  ExternalLink,
  ChevronRight,
  Eye,
  History,
  Sparkles,
  CheckCircle2,
} from 'lucide-react';
import { VerificationRecord, LiveLicenseStatus } from '../../types/onboardingTypes';
import { GovernmentVerificationService } from '../../services/governmentVerificationService';

interface VerificationStatusCardProps {
  record: VerificationRecord;
  onViewDetails: (record: VerificationRecord) => void;
  onViewHistory: (record: VerificationRecord) => void;
  onRecordUpdated?: (updated: VerificationRecord) => void;
  portalTheme?: 'dark' | 'light';
}

export const VerificationStatusCard: React.FC<VerificationStatusCardProps> = ({
  record,
  onViewDetails,
  onViewHistory,
  onRecordUpdated,
  portalTheme = 'dark',
}) => {
  const [rechecking, setRechecking] = useState(false);

  const handleRecheck = async (e: React.MouseEvent) => {
    e.stopPropagation();
    setRechecking(true);
    try {
      const updated = await GovernmentVerificationService.recheckCredential(record.verificationId);
      if (updated && onRecordUpdated) {
        onRecordUpdated(updated);
      }
    } finally {
      setRechecking(false);
    }
  };

  const isLight = portalTheme === 'light';

  // Status Styling Logic
  const getStatusBadge = (status: LiveLicenseStatus) => {
    switch (status) {
      case 'Active':
        return (
          <span className="px-2.5 py-1 rounded-md text-xs font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 inline-flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" />
            Active
          </span>
        );
      case 'Expiring Soon':
        return (
          <span className="px-2.5 py-1 rounded-md text-xs font-bold bg-amber-500/10 text-amber-400 border border-amber-500/20 inline-flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            Expiring Soon
          </span>
        );
      case 'Expired':
        return (
          <span className="px-2.5 py-1 rounded-md text-xs font-bold bg-rose-500/10 text-rose-400 border border-rose-500/20 inline-flex items-center gap-1">
            <AlertTriangle className="w-3.5 h-3.5" />
            Expired
          </span>
        );
      case 'Information Mismatch':
      case 'Record Not Found':
      case 'Verification Error':
        return (
          <span className="px-2.5 py-1 rounded-md text-xs font-bold bg-purple-500/10 text-purple-400 border border-purple-500/20 inline-flex items-center gap-1">
            <AlertTriangle className="w-3.5 h-3.5" />
            {status}
          </span>
        );
      default:
        return (
          <span className="px-2.5 py-1 rounded-md text-xs font-bold bg-blue-500/10 text-blue-400 border border-blue-500/20">
            {status}
          </span>
        );
    }
  };

  const containerBg = isLight
    ? 'bg-white border-slate-200 text-slate-900 shadow-sm hover:border-slate-300'
    : 'bg-slate-900/80 border-slate-800 text-slate-100 hover:border-slate-700';

  return (
    <div
      className={`rounded-xl border p-5 transition-all space-y-4 ${containerBg}`}
      id={`verification-card-${record.verificationId}`}
    >
      {/* Top Bar with Badges and Title */}
      <div className="flex flex-wrap items-start justify-between gap-2">
        <div>
          <div className="flex flex-wrap items-center gap-2 mb-1.5">
            <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-amber-500/20 text-amber-400 border border-amber-500/30">
              DEMO
            </span>
            <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-blue-500/20 text-blue-300 border border-blue-500/30">
              SIMULATION MODE
            </span>
            <span className="text-[11px] font-mono text-slate-400">{record.verificationId}</span>
          </div>
          <h3 className="text-base font-bold text-white tracking-tight">
            {record.comparisonFields.fullName.uploaded}
          </h3>
          <p className="text-xs text-slate-400">
            {record.comparisonFields.professionalCategory?.uploaded || 'Professional Credential'} &bull;{' '}
            <span className="text-[#C6922D] font-mono">{record.entityId}</span>
          </p>
        </div>

        <div className="text-right">
          {getStatusBadge(record.status)}
          <div className="text-[11px] text-slate-400 mt-1 font-mono">
            Badge: <strong className="text-slate-300">{record.badge}</strong>
          </div>
        </div>
      </div>

      {/* Structured Key-Value Metadata Grid (Section 37) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs bg-slate-950/40 p-3.5 rounded-lg border border-slate-800/60 font-mono">
        <div>
          <span className="text-slate-400 text-[10px] uppercase tracking-wider block">License No.</span>
          <span className="text-[#C6922D] font-bold">{record.comparisonFields.licenseNumber.uploaded}</span>
        </div>

        <div>
          <span className="text-slate-400 text-[10px] uppercase tracking-wider block">Issuing Authority</span>
          <span className="text-slate-200 truncate block">{record.agency}</span>
        </div>

        <div>
          <span className="text-slate-400 text-[10px] uppercase tracking-wider block">Gov Connection</span>
          <span className="text-amber-400 font-bold">DEMO (Simulated)</span>
        </div>

        <div>
          <span className="text-slate-400 text-[10px] uppercase tracking-wider block">Gov Record Status</span>
          <span className="text-slate-200 truncate block">{record.governmentStatus}</span>
        </div>

        <div>
          <span className="text-slate-400 text-[10px] uppercase tracking-wider block">Expiration Date</span>
          <span className="text-slate-200">{record.expirationDate}</span>
        </div>

        <div>
          <span className="text-slate-400 text-[10px] uppercase tracking-wider block">AI Extraction</span>
          <span className="text-emerald-400 font-bold">Verified Congruent</span>
        </div>

        <div>
          <span className="text-slate-400 text-[10px] uppercase tracking-wider block">Last Verification</span>
          <span className="text-slate-300 text-[11px]">{record.requestTimestamp.substring(0, 10)}</span>
        </div>

        <div>
          <span className="text-slate-400 text-[10px] uppercase tracking-wider block">Next Check (Auto)</span>
          <span className="text-slate-300 text-[11px]">30 Days</span>
        </div>

        <div>
          <span className="text-slate-400 text-[10px] uppercase tracking-wider block">Connector Used</span>
          <span className="text-blue-400 text-[10px]">{record.connector}</span>
        </div>
      </div>

      {/* Discrepancy Note Preview if any */}
      {record.discrepancies.length > 0 && (
        <div className="p-2.5 bg-rose-500/10 border border-rose-500/20 rounded-lg text-xs text-rose-300 flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 shrink-0" />
          <span className="truncate">{record.discrepancies[0]}</span>
        </div>
      )}

      {/* Action Buttons (Section 37) */}
      <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-800">
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => onViewDetails(record)}
            className="px-3 py-1.5 rounded-lg bg-[#C6922D]/10 hover:bg-[#C6922D]/20 border border-[#C6922D]/30 text-[#C6922D] text-xs font-semibold flex items-center gap-1 transition-colors"
          >
            <Eye className="w-3.5 h-3.5" />
            View Details
          </button>
          <button
            onClick={() => onViewHistory(record)}
            className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold flex items-center gap-1 transition-colors"
          >
            <History className="w-3.5 h-3.5" />
            History
          </button>
        </div>

        <button
          onClick={handleRecheck}
          disabled={rechecking}
          className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1.5 transition-colors disabled:opacity-50"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${rechecking ? 'animate-spin' : ''}`} />
          {rechecking ? 'Rechecking...' : 'Recheck'}
        </button>
      </div>
    </div>
  );
};
