import React, { useState } from 'react';
import {
  UploadCloud,
  Camera,
  Video,
  FileText,
  CheckCircle2,
  ShieldAlert,
  ShieldCheck,
  AlertTriangle,
  Lock,
  Sparkles,
  Eye,
  RefreshCw,
  Hash,
  X,
} from 'lucide-react';
import { OnboardingDocument, OnboardingEntityType } from '../../types/onboardingTypes';
import { INITIAL_DOCUMENTS } from '../../data/onboardingMockData';

interface DocumentUploadCenterProps {
  documents?: OnboardingDocument[];
  onDocumentAdded?: (doc: OnboardingDocument) => void;
  portalTheme?: 'dark' | 'light';
}

export const DocumentUploadCenter: React.FC<DocumentUploadCenterProps> = ({
  documents = INITIAL_DOCUMENTS,
  onDocumentAdded,
  portalTheme = 'dark',
}) => {
  const [docList, setDocList] = useState<OnboardingDocument[]>(documents);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadMode, setUploadMode] = useState<'FILE' | 'CAMERA' | 'VIDEO'>('FILE');
  const [cameraActive, setCameraActive] = useState(false);
  const [cameraSnapshot, setCameraSnapshot] = useState<string | null>(null);

  // Form state
  const [title, setTitle] = useState('');
  const [entityType, setEntityType] = useState<OnboardingEntityType>('PROFESSIONAL');
  const [entityId, setEntityId] = useState('PRO-2026-000001');
  const [projectId, setProjectId] = useState('PRJ-2026-000125');
  const [category, setCategory] = useState<OnboardingDocument['category']>('PROFESSIONAL/PRC-LICENSE');
  const [confidential, setConfidential] = useState(false);
  const [fileName, setFileName] = useState('PRC_Card_Scan_2026.pdf');
  const [notification, setNotification] = useState<string | null>(null);

  const simulateCameraSnap = () => {
    setCameraSnapshot('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="240" viewBox="0 0 400 240"><rect width="400" height="240" fill="%231e293b"/><text x="50%25" y="45%25" dominant-baseline="middle" text-anchor="middle" fill="%23c6922d" font-family="monospace" font-size="14" font-weight="bold">PRC CARD CAMERA SNAPSHOT (SIMULATED)</text><text x="50%25" y="60%25" dominant-baseline="middle" text-anchor="middle" fill="%2394a3b8" font-family="sans-serif" font-size="11">DEMO-CE-0089241 - Juan Dela Cruz</text></svg>');
    setCameraActive(false);
    setTitle('PRC Professional License - Camera Capture');
    setFileName(`Camera_Capture_${Date.now()}.png`);
  };

  const handleUploadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsUploading(true);

    setTimeout(() => {
      const newDocId = `DOC-2026-${String(docList.length + 1).padStart(6, '0')}`;
      const mockHash = Array.from({ length: 64 }, () => Math.floor(Math.random() * 16).toString(16)).join('');

      const newDoc: OnboardingDocument = {
        id: newDocId,
        title: title || `${category} - Submitted Record`,
        entityId,
        entityType,
        projectId,
        category,
        fileName: fileName || 'Uploaded_Document.pdf',
        fileSizeKb: Math.floor(Math.random() * 2500) + 400,
        mimeType: uploadMode === 'VIDEO' ? 'video/mp4' : 'application/pdf',
        uploadDate: new Date().toISOString(),
        uploadedBy: 'Compliance Officer (Session User)',
        confidential,
        version: 1,
        sha256Hash: mockHash,
        pipelineStatus: {
          staged: true,
          signatureValidated: true,
          malwareCheckStatus: 'SIMULATED_PASSED',
          encryptedAtRest: true,
        },
        aiExtraction: {
          documentType: category.replace('/', ' - '),
          extractedLicenseNumber: 'DEMO-EXT-' + Math.floor(100000 + Math.random() * 900000),
          extractedIssuer: 'Regulatory Authority (Extracted)',
          extractedIssueDate: '2024-01-15',
          extractedExpirationDate: '2027-12-31',
          extractedEntityName: entityId,
          confidenceScore: 0.94,
          isVerifiedByHuman: false,
        },
        lifecycleStatus: 'Submitted',
        reviewNotes: 'Staged in isolated quarantine; simulated security validations passed.',
      };

      setDocList([newDoc, ...docList]);
      onDocumentAdded?.(newDoc);
      setIsUploading(false);
      setNotification(`Document ${newDocId} successfully staged and cataloged.`);
      setTitle('');
      setCameraSnapshot(null);
    }, 600);
  };

  return (
    <div className="space-y-6">
      {/* Upload Wizard & Staging Card */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
          <div>
            <h2 className="text-lg font-bold text-white tracking-tight flex items-center gap-2">
              <UploadCloud className="w-5 h-5 text-[#C6922D]" />
              Universal Document Upload & Quarantine Staging Center
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Supports drag-and-drop, camera snapshots, multi-page captures, and video evidence with automated hash generation.
            </p>
          </div>

          <div className="flex items-center gap-1.5 bg-slate-950 p-1 rounded-xl border border-slate-800 self-start">
            <button
              type="button"
              onClick={() => { setUploadMode('FILE'); setCameraActive(false); }}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1.5 ${
                uploadMode === 'FILE' ? 'bg-[#C6922D] text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              File Drag & Drop
            </button>
            <button
              type="button"
              onClick={() => { setUploadMode('CAMERA'); setCameraActive(true); }}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1.5 ${
                uploadMode === 'CAMERA' ? 'bg-[#C6922D] text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Camera className="w-3.5 h-3.5" />
              Camera Snap
            </button>
            <button
              type="button"
              onClick={() => { setUploadMode('VIDEO'); setCameraActive(false); }}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1.5 ${
                uploadMode === 'VIDEO' ? 'bg-[#C6922D] text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Video className="w-3.5 h-3.5" />
              Site Video
            </button>
          </div>
        </div>

        {notification && (
          <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-xs text-emerald-300 flex items-center justify-between">
            <span>{notification}</span>
            <button onClick={() => setNotification(null)} className="font-bold ml-2">&times;</button>
          </div>
        )}

        <form onSubmit={handleUploadSubmit} className="space-y-5">
          {/* Dropzone / Camera Area */}
          {uploadMode === 'CAMERA' ? (
            <div className="p-6 bg-slate-950 border-2 border-dashed border-[#C6922D]/40 rounded-xl text-center space-y-4">
              {cameraSnapshot ? (
                <div className="space-y-3">
                  <div className="inline-block p-2 bg-slate-900 rounded-lg border border-slate-800">
                    <img src={cameraSnapshot} alt="Snapshot preview" className="max-h-40 mx-auto rounded" />
                  </div>
                  <div className="text-xs text-emerald-400 font-mono flex items-center justify-center gap-1">
                    <CheckCircle2 className="w-4 h-4" /> Camera photo captured and pre-processed for OCR.
                  </div>
                  <button
                    type="button"
                    onClick={() => { setCameraSnapshot(null); setCameraActive(true); }}
                    className="text-xs text-[#C6922D] hover:underline"
                  >
                    Retake Photo
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="w-12 h-12 bg-amber-500/10 text-amber-400 rounded-full flex items-center justify-center mx-auto border border-amber-500/20">
                    <Camera className="w-6 h-6 animate-pulse" />
                  </div>
                  <h4 className="text-sm font-semibold text-white">Camera Viewfinder Active (Simulated)</h4>
                  <p className="text-xs text-slate-400 max-w-sm mx-auto">
                    Position the physical PRC ID card, contractor certificate, or municipal tax receipt inside the viewfinder.
                  </p>
                  <button
                    type="button"
                    onClick={simulateCameraSnap}
                    className="px-4 py-2 bg-[#C6922D] hover:bg-[#b08024] text-slate-950 font-bold rounded-lg text-xs transition-colors"
                  >
                    Capture Document Photo
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="p-6 bg-slate-950 border-2 border-dashed border-slate-800 hover:border-[#C6922D]/50 rounded-xl text-center cursor-pointer transition-colors">
              <UploadCloud className="w-10 h-10 text-slate-500 mx-auto mb-2" />
              <div className="text-xs font-semibold text-slate-200">
                Drag and drop your file here, or <span className="text-[#C6922D] underline">browse local drive</span>
              </div>
              <p className="text-[11px] text-slate-500 mt-1 font-mono">
                Supports PDF, JPG, PNG, TIFF, and MP4 up to 50MB
              </p>
            </div>
          )}

          {/* Form Metadata Fields */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="space-y-1">
              <label className="text-xs text-slate-400">Document Title:</label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. PRC Card - Archon Structural PE"
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-[#C6922D]"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs text-slate-400">Target Entity Type:</label>
              <select
                value={entityType}
                onChange={(e) => setEntityType(e.target.value as OnboardingEntityType)}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-[#C6922D]"
              >
                <option value="PROFESSIONAL">Licensed Professional (PRO-)</option>
                <option value="CONTRACTOR">Contractor Company (CTR-)</option>
                <option value="SUPPLIER">Supplier / Vendor (SUP-)</option>
                <option value="CLIENT">Client / Owner (CLI-)</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-xs text-slate-400">Document Category:</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as any)}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-[#C6922D]"
              >
                <option value="PROFESSIONAL/PRC-LICENSE">PROFESSIONAL/PRC-LICENSE</option>
                <option value="CONTRACTOR/LICENSE">CONTRACTOR/PCAB-LICENSE</option>
                <option value="CONTRACTOR/INSURANCE">CONTRACTOR/DOLE-CSHP</option>
                <option value="SUPPLIER/BUSINESS-PERMIT">SUPPLIER/BUSINESS-PERMIT</option>
                <option value="SUPPLIER/BOARD-RESOLUTION">SUPPLIER/BOARD-RESOLUTION</option>
                <option value="TAX/BIR-FORM-2303">TAX/BIR-FORM-2303</option>
                <option value="LGU/MAYORS-PERMIT">LGU/MAYORS-PERMIT</option>
                <option value="PROJECT/DRAWING">PROJECT/DRAWING</option>
                <option value="PROJECT/SITE-PHOTO">PROJECT/SITE-PHOTO</option>
                <option value="PROJECT/SITE-VIDEO">PROJECT/SITE-VIDEO</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-xs text-slate-400">Associated Project ID:</label>
              <input
                type="text"
                value={projectId}
                onChange={(e) => setProjectId(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs text-slate-200 font-mono focus:outline-none focus:border-[#C6922D]"
              />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
            <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer">
              <input
                type="checkbox"
                checked={confidential}
                onChange={(e) => setConfidential(e.target.checked)}
                className="rounded bg-slate-950 border-slate-700 text-[#C6922D]"
              />
              <span>Mark as Confidential (Restricted to Executive Reviewers & Auditors)</span>
            </label>

            <button
              type="submit"
              disabled={isUploading}
              className="px-5 py-2.5 bg-[#C6922D] hover:bg-[#b08024] text-slate-950 font-bold rounded-xl text-xs flex items-center justify-center gap-2 transition-colors disabled:opacity-50"
            >
              <UploadCloud className="w-4 h-4" />
              {isUploading ? 'Executing Security Quarantine Pipeline...' : 'Upload & Stage Document'}
            </button>
          </div>
        </form>
      </div>

      {/* Uploaded Documents Register Table */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl overflow-hidden">
        <div className="p-4 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <FileText className="w-4 h-4 text-[#C6922D]" />
            Universal Document Repository ({docList.length} Records)
          </h3>
          <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
            SHA-256 Verified
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950/80 border-b border-slate-800 text-slate-300 font-semibold">
              <tr>
                <th className="p-3">Doc ID</th>
                <th className="p-3">Title & File</th>
                <th className="p-3">Category</th>
                <th className="p-3">Entity / Project</th>
                <th className="p-3">AI Suggestion</th>
                <th className="p-3">Security Pipeline</th>
                <th className="p-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-mono">
              {docList.map((doc) => (
                <tr key={doc.id} className="hover:bg-slate-800/30">
                  <td className="p-3 font-bold text-[#C6922D]">{doc.id}</td>
                  <td className="p-3 font-sans">
                    <div className="font-semibold text-white">{doc.title}</div>
                    <div className="text-[11px] text-slate-400 font-mono">{doc.fileName} ({doc.fileSizeKb} KB)</div>
                  </td>
                  <td className="p-3 text-slate-300">{doc.category}</td>
                  <td className="p-3">
                    <div className="text-white">{doc.entityId}</div>
                    <div className="text-[11px] text-slate-500">{doc.projectId || 'General'}</div>
                  </td>
                  <td className="p-3 font-sans">
                    <div className="flex items-center gap-1 text-emerald-400 text-[11px]">
                      <Sparkles className="w-3 h-3" />
                      <span>{Math.round(doc.aiExtraction.confidenceScore * 100)}% Match</span>
                    </div>
                    <div className="text-[10px] text-slate-400 font-mono truncate max-w-xs">
                      {doc.aiExtraction.extractedLicenseNumber || 'Lic: Valid'}
                    </div>
                  </td>
                  <td className="p-3">
                    <span className="px-2 py-0.5 rounded text-[10px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                      PASSED (Isolated)
                    </span>
                  </td>
                  <td className="p-3 font-sans">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-500/20 text-blue-300">
                      {doc.lifecycleStatus}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
