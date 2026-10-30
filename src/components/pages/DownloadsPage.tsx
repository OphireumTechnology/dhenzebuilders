import React, { useState } from 'react';
import {
  FileText,
  Download,
  Eye,
  CheckCircle2,
  ShieldCheck,
  Lock,
  Calendar,
  Layers,
  FileCheck,
  AlertCircle,
  ExternalLink,
  BookOpen,
  ArrowRight,
  Sparkles,
} from 'lucide-react';
import {
  OFFICIAL_PROFILE_METADATA,
  PROFILE_PAGES_MANIFEST,
} from '../../data/companyProfileData';
import { CorporatePdfViewer } from '../common/CorporatePdfViewer';

interface DownloadsPageProps {
  onNavigate: (view: string) => void;
  onOpenAssistant?: () => void;
}

export const DownloadsPage: React.FC<DownloadsPageProps> = ({
  onNavigate,
  onOpenAssistant,
}) => {
  const [viewerModalOpen, setViewerModalOpen] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const [downloading, setDownloading] = useState(false);

  const handleDownload = () => {
    setDownloading(true);
    setDownloadSuccess(false);

    const link = document.createElement('a');
    link.href = OFFICIAL_PROFILE_METADATA.directPdfUrl;
    link.setAttribute(
      'download',
      'LDL-Dhenze-Residential-Building-Construction-Corporate-Profile.pdf'
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setTimeout(() => {
      setDownloading(false);
      setDownloadSuccess(true);
      setTimeout(() => setDownloadSuccess(false), 5000);
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-[#071A2F] text-slate-100 pt-28 pb-24 selection:bg-[#C6922D] selection:text-[#071A2F]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header Section */}
        <div className="border-b border-[#C6922D]/25 pb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#C6922D]/10 border border-[#C6922D]/35 text-[#C6922D] text-xs font-bold uppercase tracking-widest font-['Montserrat'] mb-4">
            <ShieldCheck className="w-4 h-4" />
            <span>Official Document Repository &amp; Verification Hub</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white font-['Montserrat'] tracking-tight">
            Corporate Document Download Center
          </h1>

          <p className="mt-4 text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed">
            Welcome to the official, verified public document repository for LDL Dhenze Residential Building Construction. Every document published herein has completed mandatory legal compliance verification, tax registration audit, and executive authorization before release.
          </p>
        </div>

        {/* ---------------------------------------------------- */}
        {/* FEATURED APPROVED DOCUMENT: OFFICIAL CORPORATE PROFILE */}
        {/* ---------------------------------------------------- */}
        <div className="bg-[#09223D] border-2 border-[#C6922D]/40 rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left 4 Columns: Official Cover Page Preview */}
            <div className="lg:col-span-5 flex flex-col items-center">
              <div
                onClick={() => setViewerModalOpen(true)}
                className="relative bg-[#040E1B] rounded-2xl overflow-hidden border-2 border-[#C6922D]/40 shadow-2xl cursor-pointer group w-full max-w-md aspect-[3/4]"
                title="Click to view all 27 pages online"
              >
                <img
                  src="/documents/pages/page-01.jpg"
                  alt="LDL Dhenze Corporate Profile Cover Page Preview"
                  className="w-full h-full object-contain group-hover:scale-[1.02] transition-transform duration-300"
                />

                {/* Hover overlay hint */}
                <div className="absolute inset-0 bg-[#071A2F]/75 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-3 p-4 text-center backdrop-blur-xs">
                  <div className="w-12 h-12 rounded-full bg-[#C6922D] text-[#071A2F] flex items-center justify-center shadow-lg">
                    <Eye className="w-6 h-6" />
                  </div>
                  <span className="text-sm font-bold text-white uppercase tracking-wider font-['Montserrat']">
                    View Complete 27 Pages Online
                  </span>
                  <span className="text-xs text-slate-300 font-mono">
                    Full-Screen • Zoom • Navigation
                  </span>
                </div>

                <div className="absolute top-3 left-3 px-2 py-0.5 rounded bg-black/80 text-[10px] font-mono text-[#E5B95D] border border-white/10">
                  Approved Document • 27 Pages
                </div>
              </div>

              <div className="mt-3 flex items-center gap-2 text-xs text-slate-400 font-mono">
                <span>SHA-256 Verified Seal</span>
                <span>•</span>
                <span className="text-[#C6922D]">Official 2025–2026 Edition</span>
              </div>
            </div>

            {/* Right 7 Columns: Document Specs & Actions */}
            <div className="lg:col-span-7 space-y-6">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-mono font-semibold flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Approved for Public Distribution</span>
                </span>
                <span className="px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-slate-300 text-xs font-mono">
                  Controlled PDF Release
                </span>
              </div>

              <div>
                <h2 className="text-2xl sm:text-3xl font-black text-white font-['Montserrat']">
                  LDL Dhenze — Official Corporate Profile
                </h2>
                <p className="text-sm text-[#E5B95D] font-serif italic mt-1">
                  “Building Today. Engineering Tomorrow. Powering the Future.”
                </p>
              </div>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                The authoritative 27-page comprehensive Corporate Profile of LDL Dhenze Residential Building Construction. Contains complete legal entity documentation, DTI Business Name Certificate No. 4812272, BIR Form 2303 registration, Founder's Message, leadership dossier, 9 core business divisions, organizational chart, and strategic development frameworks.
              </p>

              {/* Technical Specifications Matrix */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 py-4 border-t border-b border-white/10 text-xs">
                <div className="bg-[#051322] p-3 rounded-xl border border-white/5">
                  <span className="text-slate-400 text-[10px] uppercase font-semibold">Document Type</span>
                  <div className="font-bold text-white mt-0.5">Portable Document (PDF)</div>
                </div>
                <div className="bg-[#051322] p-3 rounded-xl border border-white/5">
                  <span className="text-slate-400 text-[10px] uppercase font-semibold">Page Count</span>
                  <div className="font-bold text-white mt-0.5">27 Pages (Complete)</div>
                </div>
                <div className="bg-[#051322] p-3 rounded-xl border border-white/5">
                  <span className="text-slate-400 text-[10px] uppercase font-semibold">File Size</span>
                  <div className="font-bold text-[#C6922D] mt-0.5">9.9 MB</div>
                </div>
                <div className="bg-[#051322] p-3 rounded-xl border border-white/5">
                  <span className="text-slate-400 text-[10px] uppercase font-semibold">Public Access</span>
                  <div className="font-bold text-emerald-400 mt-0.5">No Login Required</div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  onClick={handleDownload}
                  disabled={downloading}
                  className="px-6 py-3.5 rounded-xl bg-[#C6922D] hover:bg-[#d8a339] text-[#071A2F] font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow-xl hover:shadow-[#C6922D]/20 transition-all"
                >
                  <Download className="w-4 h-4" />
                  <span>
                    {downloading ? 'Preparing Download...' : 'Download Official Corporate Profile (PDF)'}
                  </span>
                </button>

                <button
                  onClick={() => setViewerModalOpen(true)}
                  className="px-6 py-3.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/20 text-slate-200 hover:text-white font-semibold text-xs uppercase tracking-wider flex items-center gap-2 transition-all"
                >
                  <Eye className="w-4 h-4 text-[#C6922D]" />
                  <span>View Document Online</span>
                </button>
              </div>

              {downloadSuccess && (
                <div className="p-3 bg-emerald-500/15 border border-emerald-500/30 rounded-xl text-xs text-emerald-300 flex items-center gap-2 animate-fadeIn">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>
                    Download started successfully! File: <code className="font-mono">LDL-Dhenze-Residential-Building-Construction-Corporate-Profile.pdf</code>
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ---------------------------------------------------- */}
        {/* DOCUMENT GOVERNANCE & VERIFICATION DISCLOSURE */}
        {/* ---------------------------------------------------- */}
        <div className="bg-[#081F38] border border-white/10 rounded-2xl p-6 sm:p-8 space-y-4">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-[#C6922D]/20 text-[#C6922D] flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div className="space-y-2">
              <h3 className="text-sm font-bold uppercase tracking-wider text-white">
                Strict Document Governance &amp; Administrative Review Policy
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                The Corporate Profile includes official government registration and tax-related materials (DTI Business Name No. 4812272, BIR Form 2303, Authority to Print). To safeguard corporate integrity, LDL Dhenze enforces a strict dual-custody verification policy: all proposed revisions must be uploaded by a verified administrator, undergo automated security and statutory checks, and receive written authorization from compliance and executive management prior to public distribution.
              </p>
              <div className="pt-2 text-[11px] font-mono text-slate-400">
                Cryptographic Checksum (SHA-256): <span className="text-[#C6922D] break-all">{OFFICIAL_PROFILE_METADATA.sha256Checksum}</span>
              </div>
            </div>
          </div>
        </div>

        {/* ---------------------------------------------------- */}
        {/* INLINE DOCUMENT VIEWER (EMBEDDED) */}
        {/* ---------------------------------------------------- */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white font-['Montserrat']">
                Interactive Online Viewer
              </h2>
              <p className="text-xs text-slate-400">
                Browse all 27 pages with full-screen, zoom, and navigation tools.
              </p>
            </div>
            <button
              onClick={() => onNavigate('corporate-profile')}
              className="text-xs text-[#C6922D] hover:underline font-semibold flex items-center gap-1"
            >
              <span>Dedicated Profile Page</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <CorporatePdfViewer initialPage={1} />
        </section>

        {/* Modal Viewer (when clicked from thumbnail) */}
        {viewerModalOpen && (
          <div className="fixed inset-0 z-50 bg-black/90 flex flex-col p-4 sm:p-6 backdrop-blur-md animate-fadeIn">
            <div className="flex items-center justify-between pb-3 text-white max-w-7xl mx-auto w-full">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-[#C6922D]" />
                <span className="font-bold text-sm">
                  LDL Dhenze — Official Corporate Profile (Online Viewer)
                </span>
              </div>
              <button
                onClick={() => setViewerModalOpen(false)}
                className="px-3 py-1 rounded bg-white/10 hover:bg-white/20 text-xs font-semibold text-white"
              >
                Close Viewer ✕
              </button>
            </div>
            <div className="flex-1 max-w-7xl mx-auto w-full overflow-hidden flex flex-col">
              <CorporatePdfViewer initialPage={1} className="flex-1" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
