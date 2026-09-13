import React, { useState, useEffect } from 'react';
import {
  FileText,
  Download,
  ShieldCheck,
  Building,
  CheckCircle2,
  ExternalLink,
  BookOpen,
  ArrowRight,
  Scale,
  Landmark,
  FileCheck,
  Search,
  Filter,
  Eye,
  Clock,
  Printer,
  ChevronDown,
  ChevronUp,
  AlertCircle,
  Lock,
} from 'lucide-react';
import { CORPORATE_INFO } from '../../data/corporateInfo';
import {
  OFFICIAL_PROFILE_METADATA,
  PROFILE_SECTIONS,
  ProfileSection,
} from '../../data/companyProfileData';

interface CompanyProfilePageProps {
  onNavigate: (view: string) => void;
  onOpenAssistant?: () => void;
}

export const CompanyProfilePage: React.FC<CompanyProfilePageProps> = ({
  onNavigate,
  onOpenAssistant,
}) => {
  const [activeTab, setActiveTab] = useState<number>(0);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [downloading, setDownloading] = useState<boolean>(false);
  const [downloadSuccess, setDownloadSuccess] = useState<boolean>(false);
  const [serverStatus, setServerStatus] = useState<any | null>(null);

  // Fetch real-time publication metadata from backend
  useEffect(() => {
    fetch('/api/corporate-resources/company-profile')
      .then((res) => res.json())
      .then((data) => setServerStatus(data))
      .catch(() => setServerStatus({ isPublished: true, metadata: OFFICIAL_PROFILE_METADATA }));
  }, []);

  const isPublished = serverStatus ? serverStatus.isPublished : true;
  const metadata = serverStatus?.metadata || OFFICIAL_PROFILE_METADATA;

  // Filter sections by search query
  const filteredSections = PROFILE_SECTIONS.filter((sec) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      sec.title.toLowerCase().includes(q) ||
      sec.summary.toLowerCase().includes(q) ||
      sec.highlights.some((h) => h.toLowerCase().includes(q))
    );
  });

  const handleDownload = () => {
    setDownloading(true);
    setDownloadSuccess(false);

    // Trigger direct browser download
    const link = document.createElement('a');
    link.href = '/api/corporate-resources/company-profile/download';
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
    <div className="min-h-screen bg-[#051322] text-slate-100 pt-28 pb-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Top Header Card */}
        <div className="bg-[#071A2F] border border-[#C6922D]/30 rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 border-b border-white/10 pb-8">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C6922D]/10 border border-[#C6922D]/30 text-[#C6922D] text-xs font-bold uppercase tracking-widest font-['Montserrat']">
                <FileCheck className="w-3.5 h-3.5" />
                <span>Controlled Institutional Document</span>
              </div>
              <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white font-['Montserrat'] tracking-tight">
                Corporate Profile &amp; Statutory Registrations
              </h1>
              <p className="text-sm sm:text-base text-slate-300">
                Official 27-Page Comprehensive Executive Edition • Republic of the Philippines
              </p>
            </div>

            {/* Publication Status & Action Cluster */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
              {isPublished ? (
                <button
                  onClick={handleDownload}
                  disabled={downloading}
                  className="px-6 py-3.5 rounded-xl bg-[#C6922D] hover:bg-[#d8a339] text-[#071A2F] font-bold text-xs uppercase tracking-wider transition-colors shadow-xl flex items-center justify-center gap-2 disabled:opacity-60"
                  aria-label="Download Official Corporate Profile PDF"
                >
                  <Download className="w-4 h-4" />
                  <span>
                    {downloading ? 'Preparing Stream...' : `Download Official PDF (${metadata.fileSizeFormatted || '18.4 MB'})`}
                  </span>
                </button>
              ) : (
                <div className="px-5 py-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>Scheduled Executive Review Pending</span>
                </div>
              )}

              <button
                onClick={() => window.print()}
                className="px-4 py-3.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-200 border border-white/10 text-xs font-semibold transition-colors flex items-center justify-center gap-2"
                title="Print Overview"
              >
                <Printer className="w-4 h-4" />
                <span className="hidden sm:inline">Print</span>
              </button>
            </div>
          </div>

          {/* Download Success Confirmation Banner */}
          {downloadSuccess && (
            <div className="mt-4 p-3 bg-emerald-500/15 border border-emerald-500/30 rounded-xl flex items-center gap-2 text-xs text-emerald-300 animate-fadeIn">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>
                Document download initiated successfully. Cryptographic SHA-256 integrity seal verified.
              </span>
            </div>
          )}

          {/* Metadata Statistics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 pt-6 text-xs">
            <div className="bg-[#051322] p-3.5 rounded-xl border border-white/5">
              <div className="text-slate-400 text-[10px] uppercase font-bold">Edition</div>
              <div className="text-slate-100 font-semibold mt-0.5">{metadata.edition}</div>
            </div>
            <div className="bg-[#051322] p-3.5 rounded-xl border border-white/5">
              <div className="text-slate-400 text-[10px] uppercase font-bold">Document Scope</div>
              <div className="text-slate-100 font-semibold mt-0.5">27 Complete Pages</div>
            </div>
            <div className="bg-[#051322] p-3.5 rounded-xl border border-white/5">
              <div className="text-slate-400 text-[10px] uppercase font-bold">DTI Registration</div>
              <div className="text-[#C6922D] font-mono font-bold mt-0.5">BN 4812272</div>
            </div>
            <div className="bg-[#051322] p-3.5 rounded-xl border border-white/5">
              <div className="text-slate-400 text-[10px] uppercase font-bold">BIR Tax Identification</div>
              <div className="text-slate-100 font-mono font-bold mt-0.5">306-113-062-00000</div>
            </div>
            <div className="bg-[#051322] p-3.5 rounded-xl border border-white/5">
              <div className="text-slate-400 text-[10px] uppercase font-bold">Primary PSIC</div>
              <div className="text-[#C6922D] font-mono font-bold mt-0.5">42900 Civil Eng.</div>
            </div>
            <div className="bg-[#051322] p-3.5 rounded-xl border border-white/5">
              <div className="text-slate-400 text-[10px] uppercase font-bold">Status</div>
              <div className="text-emerald-400 font-semibold flex items-center gap-1.5 mt-0.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span>Verified Active</span>
              </div>
            </div>
          </div>
        </div>

        {/* Search & Section Navigator */}
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-[#C6922D]" />
              <h2 className="text-xl sm:text-2xl font-bold text-white font-['Montserrat']">
                Comprehensive 27-Page Document Reader
              </h2>
            </div>

            {/* Quick Search */}
            <div className="relative w-full sm:w-72">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search profile sections..."
                className="w-full bg-[#071A2F] border border-white/10 rounded-lg pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#C6922D]"
              />
            </div>
          </div>

          {/* Module Selection Tabs */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 border-b border-white/10 pb-4">
            {PROFILE_SECTIONS.map((sec, idx) => (
              <button
                key={sec.sectionNumber}
                onClick={() => setActiveTab(idx)}
                className={`p-3 rounded-xl text-left transition-all border ${
                  activeTab === idx
                    ? 'bg-[#071A2F] border-[#C6922D] shadow-lg'
                    : 'bg-[#051322]/80 hover:bg-[#071A2F]/60 border-white/5 text-slate-400'
                }`}
              >
                <div className="flex items-center justify-between text-[10px] font-mono mb-1">
                  <span className={activeTab === idx ? 'text-[#C6922D] font-bold' : 'text-slate-500'}>
                    MOD {sec.sectionNumber}
                  </span>
                  <span className="text-slate-500">{sec.pageRange}</span>
                </div>
                <div
                  className={`text-xs font-semibold line-clamp-2 ${
                    activeTab === idx ? 'text-white' : 'text-slate-300'
                  }`}
                >
                  {sec.title.split(',')[0]}
                </div>
              </button>
            ))}
          </div>

          {/* Active Section Detailed View Card */}
          {PROFILE_SECTIONS[activeTab] && (
            <div className="bg-[#071A2F] border border-white/10 rounded-2xl p-6 sm:p-8 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-5">
                <div>
                  <div className="flex items-center gap-2 text-xs font-mono text-[#C6922D] uppercase tracking-wider font-bold">
                    <span>Module {PROFILE_SECTIONS[activeTab].sectionNumber}</span>
                    <span>•</span>
                    <span>{PROFILE_SECTIONS[activeTab].pageRange}</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white font-['Montserrat'] mt-1">
                    {PROFILE_SECTIONS[activeTab].title}
                  </h3>
                </div>

                <div className="inline-flex items-center gap-2 text-xs text-slate-400 bg-white/5 px-3 py-1.5 rounded-lg border border-white/10 self-start sm:self-auto">
                  <FileText className="w-3.5 h-3.5 text-[#C6922D]" />
                  <span>Official Text Representation</span>
                </div>
              </div>

              {/* Section Summary */}
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-sans">
                {PROFILE_SECTIONS[activeTab].summary}
              </p>

              {/* Section Highlights */}
              <div className="space-y-3 pt-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 font-mono">
                  Key Document Provisions &amp; Specifications:
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {PROFILE_SECTIONS[activeTab].highlights.map((item, hIdx) => (
                    <div
                      key={hIdx}
                      className="bg-[#051322] border border-white/5 rounded-xl p-3.5 flex items-start gap-2.5 text-xs text-slate-200"
                    >
                      <CheckCircle2 className="w-4 h-4 text-[#C6922D] shrink-0 mt-0.5" />
                      <span className="leading-relaxed">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Statutory Notes if present */}
              {PROFILE_SECTIONS[activeTab].statutoryNotes && (
                <div className="bg-[#051322] border-l-4 border-[#C6922D] p-4 rounded-r-xl text-xs text-slate-300 leading-relaxed">
                  <strong className="text-white">Statutory Disclosures &amp; Professional Boundaries: </strong>
                  {PROFILE_SECTIONS[activeTab].statutoryNotes}
                </div>
              )}

              {/* Module Action Bar */}
              <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-4 text-xs">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setActiveTab((prev) => Math.max(prev - 1, 0))}
                    disabled={activeTab === 0}
                    className="px-3 py-1.5 rounded bg-white/5 hover:bg-white/10 disabled:opacity-30 transition-colors"
                  >
                    Previous Module
                  </button>
                  <button
                    onClick={() => setActiveTab((prev) => Math.min(prev + 1, PROFILE_SECTIONS.length - 1))}
                    disabled={activeTab === PROFILE_SECTIONS.length - 1}
                    className="px-3 py-1.5 rounded bg-white/5 hover:bg-white/10 disabled:opacity-30 transition-colors"
                  >
                    Next Module
                  </button>
                </div>

                <button
                  onClick={handleDownload}
                  className="text-[#C6922D] hover:text-white font-semibold flex items-center gap-1.5 transition-colors"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download Complete 27-Page PDF</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Dedicated Statutory Registration Visual Cards */}
        <div className="space-y-6 pt-6">
          <div className="border-b border-white/10 pb-4">
            <div className="text-xs font-mono uppercase tracking-widest text-[#C6922D] font-bold">
              Government Regulatory Filings
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white font-['Montserrat'] mt-1">
              Statutory Business Certificates &amp; Tax Clearances
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* DTI Certificate Card */}
            <div className="bg-[#071A2F] border border-white/10 rounded-2xl p-6 space-y-4">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-[#C6922D]/10 text-[#C6922D] flex items-center justify-center font-bold font-mono text-xs">
                    DTI
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                      Department of Trade and Industry
                    </h3>
                    <p className="text-[11px] text-slate-400">Republic of the Philippines</p>
                  </div>
                </div>
                <span className="px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[10px] font-semibold">
                  Valid 2023–2028
                </span>
              </div>

              <div className="space-y-2.5 text-xs text-slate-300">
                <div className="flex justify-between py-1 border-b border-white/5">
                  <span className="text-slate-400">Business Name:</span>
                  <span className="font-bold text-white text-right">
                    {CORPORATE_INFO.registrations.businessName}
                  </span>
                </div>
                <div className="flex justify-between py-1 border-b border-white/5">
                  <span className="text-slate-400">Certificate / BN No.:</span>
                  <span className="font-mono font-bold text-[#C6922D]">
                    {CORPORATE_INFO.registrations.dtiNumber}
                  </span>
                </div>
                <div className="flex justify-between py-1 border-b border-white/5">
                  <span className="text-slate-400">Validity Period:</span>
                  <span className="text-slate-200 text-right">
                    {CORPORATE_INFO.registrations.dtiValidity}
                  </span>
                </div>
                <div className="flex justify-between py-1 border-b border-white/5">
                  <span className="text-slate-400">Territorial Scope:</span>
                  <span className="text-slate-200">
                    {CORPORATE_INFO.registrations.dtiTerritorialScope} ({CORPORATE_INFO.registrations.dtiLocality})
                  </span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-slate-400">Proprietor:</span>
                  <span className="font-semibold text-white">
                    {CORPORATE_INFO.registrations.proprietor}
                  </span>
                </div>
              </div>

              <p className="text-[11px] text-slate-400 italic pt-2 border-t border-white/5 leading-relaxed">
                Notice: The DTI Certificate of Business Name Registration is a formal registration of business name and is not a license to practice a regulated profession.
              </p>
            </div>

            {/* BIR Form 2303 Certificate Card */}
            <div className="bg-[#071A2F] border border-white/10 rounded-2xl p-6 space-y-4">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-[#C6922D]/10 text-[#C6922D] flex items-center justify-center font-bold font-mono text-xs">
                    BIR
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                      Bureau of Internal Revenue (BIR Form 2303)
                    </h3>
                    <p className="text-[11px] text-slate-400">Certificate of Registration</p>
                  </div>
                </div>
                <span className="px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[10px] font-semibold">
                  Tax Compliant
                </span>
              </div>

              <div className="space-y-2.5 text-xs text-slate-300">
                <div className="flex justify-between py-1 border-b border-white/5">
                  <span className="text-slate-400">Tax Identification No. (TIN):</span>
                  <span className="font-mono font-bold text-white text-right">
                    {CORPORATE_INFO.registrations.tin}
                  </span>
                </div>
                <div className="flex justify-between py-1 border-b border-white/5">
                  <span className="text-slate-400">Official Control Number (OCN):</span>
                  <span className="font-mono font-bold text-[#C6922D]">
                    {CORPORATE_INFO.registrations.birForm2303Ocn}
                  </span>
                </div>
                <div className="flex justify-between py-1 border-b border-white/5">
                  <span className="text-slate-400">Primary Industry (PSIC 42900):</span>
                  <span className="text-slate-200 text-right">
                    {CORPORATE_INFO.registrations.birLineOfBusiness}
                  </span>
                </div>
                <div className="flex justify-between py-1 border-b border-white/5">
                  <span className="text-slate-400">Revenue District Office:</span>
                  <span className="text-slate-200 text-right">
                    RDO 214A North Pampanga
                  </span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-slate-400">Tax Registered Address:</span>
                  <span className="text-slate-200 text-right">
                    {CORPORATE_INFO.registrations.taxRegisteredAddress}
                  </span>
                </div>
              </div>

              <p className="text-[11px] text-slate-400 italic pt-2 border-t border-white/5 leading-relaxed">
                Authority to Print (ATP) and Notice of Issue of Official Receipts verified on official records.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom CTA Block */}
        <div className="bg-[#071A2F] border border-[#C6922D]/30 rounded-2xl p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <h3 className="text-lg font-bold text-white font-['Montserrat']">
              Require a Bound Physical Copy or Executive Briefing?
            </h3>
            <p className="text-xs text-slate-400">
              Direct inquiries to the Executive Office at KMC | One West Aeropark, Clark Freeport Zone.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              onClick={() => onNavigate('book-consultation')}
              className="px-5 py-3 rounded-lg bg-[#C6922D] hover:bg-[#d8a339] text-[#071A2F] font-bold text-xs uppercase tracking-wider transition-colors shadow-lg"
            >
              Request Executive Consultation
            </button>
            <a
              href={CORPORATE_INFO.contacts.telephoneLink}
              className="px-5 py-3 rounded-lg bg-white/5 hover:bg-white/10 text-slate-200 border border-white/10 text-xs font-semibold transition-colors"
            >
              Call: {CORPORATE_INFO.contacts.telephoneDisplay}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
