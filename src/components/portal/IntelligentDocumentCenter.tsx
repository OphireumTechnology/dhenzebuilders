import React, { useState } from 'react';
import {
  FileText,
  Upload,
  Camera,
  Folder,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  Download,
  Eye,
  Plus,
  Search,
  Filter,
  RefreshCw,
  Clock,
  ShieldCheck,
  Check,
  X,
  FileCheck,
} from 'lucide-react';
import { DocumentRecord } from '../../types/clientPortal';

interface IntelligentDocumentCenterProps {
  portalTheme?: 'dark' | 'light';
  projectId?: string;
}

const DEFAULT_DOCUMENTS: DocumentRecord[] = [
  {
    id: 'DOC-2026-000001',
    projectId: 'PROJECT-2026-000001',
    filename: 'TCT_040_2023004812_Angeles_Certified_True_Copy.pdf',
    title: 'Certified True Copy - Transfer Certificate of Title (TCT)',
    virtualFolder: '02 — Property & Ownership',
    category: 'Property & Ownership',
    subtype: 'Transfer Certificate of Title (TCT)',
    revision: 'Rev 0',
    isCurrent: true,
    uploadDate: '2026-09-02',
    uploaderName: 'Don Eduardo Miranda',
    status: 'APPROVED',
    aiConfidence: 99,
    aiClassified: true,
    humanConfirmed: true,
    fileSizeKB: 2480,
    fileType: 'application/pdf',
    isSignedSealed: true,
    verificationBadge: 'EXTERNALLY_VERIFIED',
  },
  {
    id: 'DOC-2026-000002',
    projectId: 'PROJECT-2026-000001',
    filename: 'Geotechnical_Soil_Boring_Investigation_Report_2025.pdf',
    title: 'Soil Boring Investigation & Allowable Bearing Capacity Report',
    virtualFolder: '11 — Site Information',
    category: 'Property & Ownership',
    subtype: 'Soil Boring Report',
    revision: 'Rev 0',
    isCurrent: true,
    uploadDate: '2026-09-04',
    uploaderName: 'Engr. L. Ocampo',
    status: 'APPROVED',
    aiConfidence: 97,
    aiClassified: true,
    humanConfirmed: true,
    fileSizeKB: 4120,
    fileType: 'application/pdf',
    isSignedSealed: true,
    verificationBadge: 'INTERNALLY_REVIEWED',
  },
  {
    id: 'DOC-2026-000003',
    projectId: 'PROJECT-2026-000001',
    filename: 'Architectural_Signed_Sealed_Working_Drawings_Set_A.pdf',
    title: 'Complete Architectural Working Drawings (A-01 to A-24)',
    virtualFolder: '03 — Design & Engineering',
    category: 'Design & Engineering',
    subtype: 'Architectural Drawings',
    revision: 'Rev 2',
    isCurrent: true,
    uploadDate: '2026-09-10',
    uploaderName: 'Arch. Don Eduardo Miranda',
    status: 'APPROVED',
    aiConfidence: 98,
    aiClassified: true,
    humanConfirmed: true,
    fileSizeKB: 18450,
    fileType: 'application/pdf',
    isSignedSealed: true,
    verificationBadge: 'EXTERNALLY_VERIFIED',
  },
  {
    id: 'DOC-2026-000004',
    projectId: 'PROJECT-2026-000001',
    filename: 'Structural_Computations_and_Drawings_Signed_Sealed.pdf',
    title: 'Structural Design Computations & Framing Plans (S-01 to S-16)',
    virtualFolder: '03 — Design & Engineering',
    category: 'Design & Engineering',
    subtype: 'Structural Plans',
    revision: 'Rev 1',
    isCurrent: true,
    uploadDate: '2026-09-11',
    uploaderName: 'Engr. Ferdinand David',
    status: 'APPROVED',
    aiConfidence: 96,
    aiClassified: true,
    humanConfirmed: true,
    fileSizeKB: 14200,
    fileType: 'application/pdf',
    isSignedSealed: true,
    verificationBadge: 'EXTERNALLY_VERIFIED',
  },
  {
    id: 'DOC-2026-000005',
    projectId: 'PROJECT-2026-000001',
    filename: 'Bill_of_Quantities_Itemized_Work_Packages_Rev1.xlsx',
    title: 'Standard CSI/DPWH Bill of Quantities (Unpriced Tender Copy)',
    virtualFolder: '05 — BOQ & Cost Estimate',
    category: 'BOQ & Cost',
    subtype: 'Bill of Quantities (BOQ)',
    revision: 'Rev 1',
    isCurrent: true,
    uploadDate: '2026-09-12',
    uploaderName: 'Quantity Surveyor Staff',
    status: 'APPROVED',
    aiConfidence: 95,
    aiClassified: true,
    humanConfirmed: true,
    fileSizeKB: 840,
    fileType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    isSignedSealed: false,
    verificationBadge: 'INTERNALLY_REVIEWED',
  },
  {
    id: 'DOC-2026-000006',
    projectId: 'PROJECT-2026-000001',
    filename: 'BFP_Fire_Safety_Evaluation_Clearance_FSEC_Approved.pdf',
    title: 'Bureau of Fire Protection - FSEC Clearance Certificate',
    virtualFolder: '12 — Permits & Clearances',
    category: 'Permits',
    subtype: 'Fire Clearance (FSEC)',
    revision: 'Rev 0',
    isCurrent: true,
    uploadDate: '2026-09-14',
    uploaderName: 'Admin Officer',
    status: 'APPROVED',
    aiConfidence: 99,
    aiClassified: true,
    humanConfirmed: true,
    fileSizeKB: 1200,
    fileType: 'application/pdf',
    isSignedSealed: true,
    verificationBadge: 'EXTERNALLY_VERIFIED',
  },
];

const VIRTUAL_FOLDERS = [
  '01 — Planning & Inception',
  '02 — Property & Ownership',
  '03 — Design & Engineering',
  '04 — Scope of Work',
  '05 — BOQ & Cost Estimate',
  '06 — Budget & Funding',
  '07 — Procurement',
  '08 — Contractor Bidding Room',
  '09 — Contracts & Agreements',
  '10 — Schedule & Milestones',
  '11 — Site Information & Soils',
  '12 — Permits & Clearances',
  '13 — Construction Execution',
  '14 — Daily Site Reports',
  '15 — QA/QC & Lab Tests',
  '16 — Progress Billings',
  '17 — Safety & DOLE OSHP',
  '18 — Legal & Corporate',
  '19 — Turnover & As-Built',
  '20 — Warranty & Operations',
  '21 — Project Communications',
];

export const IntelligentDocumentCenter: React.FC<IntelligentDocumentCenterProps> = ({
  portalTheme = 'dark',
  projectId = 'PROJECT-2026-000001',
}) => {
  const [documents, setDocuments] = useState<DocumentRecord[]>(DEFAULT_DOCUMENTS);
  const [selectedFolder, setSelectedFolder] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [stagedFile, setStagedFile] = useState<File | null>(null);
  const [aiClassificationResult, setAiClassificationResult] = useState<{
    proposedFolder: string;
    proposedCategory: any;
    proposedSubtype: string;
    proposedRev: string;
    confidence: number;
    title: string;
  } | null>(null);

  const isLight = portalTheme === 'light';
  const cardBg = isLight ? 'bg-white border-slate-200 text-slate-900 shadow-sm' : 'bg-[#09223d] border-white/10 text-slate-100';
  const innerBg = isLight ? 'bg-slate-50 border-slate-200' : 'bg-[#051322] border-white/5';

  const handleSimulatedFileUpload = (filename: string, fileType = 'application/pdf') => {
    setIsUploading(true);
    // Simulate AI Sorter processing
    setTimeout(() => {
      let folder = '03 — Design & Engineering';
      let category: any = 'Design & Engineering';
      let subtype = 'Engineering Plan';
      if (filename.toLowerCase().includes('tct') || filename.toLowerCase().includes('title')) {
        folder = '02 — Property & Ownership';
        category = 'Property & Ownership';
        subtype = 'Transfer Certificate of Title (TCT)';
      } else if (filename.toLowerCase().includes('boq') || filename.toLowerCase().includes('estimate')) {
        folder = '05 — BOQ & Cost Estimate';
        category = 'BOQ & Cost';
        subtype = 'Bill of Quantities (BOQ)';
      } else if (filename.toLowerCase().includes('permit') || filename.toLowerCase().includes('fsec')) {
        folder = '12 — Permits & Clearances';
        category = 'Permits';
        subtype = 'Statutory Permit';
      }

      setAiClassificationResult({
        proposedFolder: folder,
        proposedCategory: category,
        proposedSubtype: subtype,
        proposedRev: 'Rev 1',
        confidence: 96,
        title: filename.replace(/\.[^/.]+$/, '').replace(/_/g, ' '),
      });
      setIsUploading(false);
    }, 800);
  };

  const handleConfirmAiClassification = () => {
    if (!aiClassificationResult) return;
    const newDoc: DocumentRecord = {
      id: `DOC-${new Date().getFullYear()}-${Math.floor(100000 + Math.random() * 900000)}`,
      projectId,
      filename: `${aiClassificationResult.title.replace(/\s+/g, '_')}.pdf`,
      title: aiClassificationResult.title,
      virtualFolder: aiClassificationResult.proposedFolder,
      category: aiClassificationResult.proposedCategory,
      subtype: aiClassificationResult.proposedSubtype,
      revision: aiClassificationResult.proposedRev,
      isCurrent: true,
      uploadDate: new Date().toISOString().split('T')[0],
      uploaderName: 'Don Eduardo Miranda',
      status: 'APPROVED',
      aiConfidence: aiClassificationResult.confidence,
      aiClassified: true,
      humanConfirmed: true,
      fileSizeKB: 3200,
      fileType: 'application/pdf',
      isSignedSealed: true,
      verificationBadge: 'INTERNALLY_REVIEWED',
    };
    setDocuments([newDoc, ...documents]);
    setAiClassificationResult(null);
    setStagedFile(null);
  };

  const filteredDocs = documents.filter((doc) => {
    const matchFolder = selectedFolder === 'ALL' || doc.virtualFolder === selectedFolder;
    const matchSearch =
      doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.filename.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.id.toLowerCase().includes(searchQuery.toLowerCase());
    return matchFolder && matchSearch;
  });

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className={`p-6 sm:p-8 rounded-3xl border ${cardBg}`}>
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-white/10">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#C6922D]/20 text-[#C6922D] border border-[#C6922D]/40">
                Common Data Environment (CDE)
              </span>
              <span className="text-xs text-slate-400 font-mono">21-TIER VIRTUAL ARCHIVE</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mt-1.5">
              Intelligent Document Center & AI Sorter
            </h2>
            <p className="text-xs text-slate-300 mt-1 max-w-2xl leading-relaxed">
              Upload architectural plans, property titles, geotechnical reports, and permits. The intelligent ingestion
              engine automatically classifies document types, detects revisions, and validates signed & sealed
              credentials.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <label className="cursor-pointer px-4 py-2.5 rounded-xl bg-[#C6922D] hover:bg-[#d8a339] text-[#071A2F] font-bold text-xs uppercase tracking-wider flex items-center gap-2 transition-all shadow-md">
              <Upload className="w-4 h-4" />
              <span>Upload Document</span>
              <input
                type="file"
                className="hidden"
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    setStagedFile(e.target.files[0]);
                    handleSimulatedFileUpload(e.target.files[0].name, e.target.files[0].type);
                  }
                }}
              />
            </label>

            <button
              onClick={() => handleSimulatedFileUpload('Camera_Site_Photo_Boundary_Monument_Anunas.jpg', 'image/jpeg')}
              className="px-3.5 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white font-bold text-xs uppercase tracking-wider flex items-center gap-2 transition-colors"
            >
              <Camera className="w-4 h-4 text-[#C6922D]" />
              <span>Snapshot Photo</span>
            </button>
          </div>
        </div>

        {/* Missing Document Detector Alert */}
        <div className="pt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs bg-amber-950/40 border border-amber-500/30 p-3.5 rounded-2xl mt-4">
          <div className="flex items-center gap-2.5 text-amber-200">
            <AlertCircle className="w-4 h-4 text-amber-400 shrink-0" />
            <span>
              <strong>Missing Document Detector:</strong> Final MEPFS Signed & Sealed Drawings pending before Building
              Permit submission to Angeles City OBO.
            </span>
          </div>
          <button
            onClick={() => handleSimulatedFileUpload('MEPFS_Signed_Sealed_Package_Rev1.pdf')}
            className="px-3 py-1 bg-amber-500 text-[#071A2F] font-bold rounded-lg text-[11px] whitespace-nowrap hover:bg-amber-400"
          >
            Upload MEPFS Package
          </button>
        </div>
      </div>

      {/* AI Classification Staged Modal / Review Box */}
      {aiClassificationResult && (
        <div className="p-6 rounded-3xl bg-[#09223d] border border-[#C6922D] shadow-2xl animate-in fade-in space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-white/10">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-[#C6922D]" />
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                AI Document Sorter Classification Result
              </h3>
            </div>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold font-mono bg-emerald-950 text-emerald-300 border border-emerald-800">
              {aiClassificationResult.confidence}% Confidence
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-3 text-xs">
            <div>
              <span className="text-slate-400 block mb-1">Detected Document:</span>
              <strong className="text-white text-xs">{aiClassificationResult.title}</strong>
            </div>
            <div>
              <span className="text-slate-400 block mb-1">Assigned Virtual Folder:</span>
              <strong className="text-[#C6922D] font-mono">{aiClassificationResult.proposedFolder}</strong>
            </div>
            <div>
              <span className="text-slate-400 block mb-1">Subtype Classification:</span>
              <strong className="text-white">{aiClassificationResult.proposedSubtype}</strong>
            </div>
            <div>
              <span className="text-slate-400 block mb-1">Detected Revision:</span>
              <strong className="text-white font-mono">{aiClassificationResult.proposedRev}</strong>
            </div>
          </div>

          <div className="pt-2 flex justify-end gap-2 text-xs">
            <button
              onClick={() => setAiClassificationResult(null)}
              className="px-4 py-2 rounded-xl border border-white/10 hover:bg-white/5 text-slate-300 font-semibold"
            >
              Cancel
            </button>
            <button
              onClick={handleConfirmAiClassification}
              className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold flex items-center gap-1.5 shadow-md"
            >
              <Check className="w-4 h-4" />
              <span>Confirm & Ingest into CDE Archive</span>
            </button>
          </div>
        </div>
      )}

      {/* Main Document Explorer */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Virtual Folders Tree (4 cols) */}
        <div className={`lg:col-span-4 p-5 rounded-3xl border ${cardBg} space-y-3`}>
          <div className="text-xs font-bold uppercase text-slate-300 tracking-wider pb-2 border-b border-white/10 flex items-center justify-between">
            <span className="flex items-center gap-2">
              <Folder className="w-4 h-4 text-[#C6922D]" />
              <span>Virtual Filing Structure</span>
            </span>
            <span className="text-[10px] text-slate-400 font-mono">01 – 21</span>
          </div>

          <div className="space-y-1 max-h-[500px] overflow-y-auto text-xs pr-1">
            <button
              onClick={() => setSelectedFolder('ALL')}
              className={`w-full p-2 rounded-xl text-left flex items-center justify-between ${
                selectedFolder === 'ALL'
                  ? 'bg-[#C6922D] text-[#071A2F] font-bold'
                  : 'text-slate-300 hover:bg-white/5'
              }`}
            >
              <span>All Documents ({documents.length})</span>
            </button>

            {VIRTUAL_FOLDERS.map((f) => {
              const count = documents.filter((d) => d.virtualFolder === f).length;
              return (
                <button
                  key={f}
                  onClick={() => setSelectedFolder(f)}
                  className={`w-full p-2 rounded-xl text-left flex items-center justify-between transition-colors ${
                    selectedFolder === f
                      ? 'bg-[#C6922D] text-[#071A2F] font-bold'
                      : 'text-slate-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <span className="truncate">{f}</span>
                  {count > 0 && (
                    <span
                      className={`text-[10px] px-1.5 py-0.5 rounded font-mono ${
                        selectedFolder === f ? 'bg-[#071A2F] text-white' : 'bg-white/10 text-slate-300'
                      }`}
                    >
                      {count}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Right: Document List (8 cols) */}
        <div className={`lg:col-span-8 p-6 rounded-3xl border ${cardBg} space-y-4`}>
          {/* Search Bar */}
          <div className="flex items-center gap-3">
            <div className="relative flex-1">
              <Search className="w-4 h-4 absolute left-3 top-3 text-slate-500" />
              <input
                type="text"
                placeholder="Search documents by ID, title, filename or discipline..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full p-2.5 pl-9 rounded-xl bg-[#051322] border border-white/10 text-xs text-white focus:border-[#C6922D] focus:outline-none"
              />
            </div>
            <button
              onClick={() => setSearchQuery('')}
              className="p-2.5 rounded-xl border border-white/10 hover:bg-white/5 text-slate-400 hover:text-white"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>

          {/* Document Rows */}
          <div className="space-y-3">
            {filteredDocs.map((doc) => (
              <div
                key={doc.id}
                className="p-4 rounded-2xl bg-[#051322] border border-white/5 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:border-white/20 transition-all"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[10px] text-[#C6922D] font-bold">{doc.id}</span>
                    <span className="font-mono text-[10px] bg-white/10 text-slate-300 px-1.5 py-0.2 rounded font-semibold">
                      {doc.revision}
                    </span>
                    <h4 className="text-xs font-bold text-white">{doc.title}</h4>
                  </div>
                  <div className="text-[11px] text-slate-400 flex flex-wrap items-center gap-3">
                    <span>Folder: {doc.virtualFolder}</span>
                    <span>•</span>
                    <span>Uploaded: {doc.uploadDate}</span>
                    <span>•</span>
                    <span>By: {doc.uploaderName}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <div className="text-right">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-950 text-emerald-300 border border-emerald-800 block">
                      {doc.status}
                    </span>
                    <span className="text-[10px] text-slate-500 font-mono mt-0.5 block">
                      {(doc.fileSizeKB / 1024).toFixed(1)} MB
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => alert(`Simulating viewing ${doc.title}`)}
                      className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-colors"
                      title="Preview Document"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => alert(`Simulating downloading ${doc.filename}`)}
                      className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-colors"
                      title="Download Document"
                    >
                      <Download className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}

            {filteredDocs.length === 0 && (
              <div className="py-12 text-center text-slate-500 text-xs">
                No documents found matching the filter criteria.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
