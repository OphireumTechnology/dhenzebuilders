import React, { useState, useEffect } from 'react';
import {
  PublicProjectRecord,
  PublicDocumentRecord,
  PublicGalleryItem,
  PublicProjectCategory,
  PublicProjectStage,
  PublicationStatus,
  PublicDocumentCategory,
  PublicationAuditLog,
} from '../../types/publicProjectTypes';
import { INITIAL_PUBLIC_PROJECTS, INITIAL_PUBLICATION_AUDIT_LOGS } from '../../data/publicProjectSeedData';
import { PORTFOLIO_PROJECTS } from '../../data/companyData';
import {
  Building2,
  Plus,
  Search,
  Filter,
  Eye,
  Edit,
  Upload,
  Download,
  Trash2,
  Archive,
  CheckCircle2,
  AlertCircle,
  Clock,
  ShieldCheck,
  FileText,
  Image as ImageIcon,
  Share2,
  Lock,
  Unlock,
  RefreshCw,
  ExternalLink,
  Layers,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  X,
  Copy,
  ChevronDown,
} from 'lucide-react';

interface PublicProjectAdminConsoleProps {
  onNavigate?: (view: string) => void;
  currentUser?: any;
}

type AdminConsoleTab =
  | 'projects-list'
  | 'create-or-edit'
  | 'import-existing'
  | 'media-library'
  | 'audit-trail';

const CATEGORIES: Exclude<PublicProjectCategory, 'All'>[] = [
  'Residential',
  'Commercial',
  'Mixed-Use',
  'Land Development',
  'Infrastructure',
  'Agriculture',
  'Industrial',
  'Healthcare',
  'Education',
  'Hospitality',
  'Renewable Energy',
  'Concept Development',
];

const STAGES: PublicProjectStage[] = [
  'Completed',
  'Under Construction',
  'In Development',
  'Proposed',
  'Conceptual Study',
];

const DOC_CATEGORIES: PublicDocumentCategory[] = [
  'Project Presentation',
  'Project Profile',
  'Company Presentation',
  'Brochure',
  'Development Plan',
  'Executive Summary',
  'Feasibility Summary',
  'Public Drawings',
  'Public Plans',
  'Public Reports',
  'Public Specifications',
  'Other approved material',
];

export const PublicProjectAdminConsole: React.FC<PublicProjectAdminConsoleProps> = ({
  onNavigate,
  currentUser,
}) => {
  const [activeTab, setActiveTab] = useState<AdminConsoleTab>('projects-list');
  const [projects, setProjects] = useState<PublicProjectRecord[]>(INITIAL_PUBLIC_PROJECTS);
  const [auditLogs, setAuditLogs] = useState<PublicationAuditLog[]>(INITIAL_PUBLICATION_AUDIT_LOGS);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [stateFilter, setStateFilter] = useState<string>('ALL');
  const [statusMessage, setStatusMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Form / Editing State
  const [editingProject, setEditingProject] = useState<Partial<PublicProjectRecord>>({
    title: '',
    slug: '',
    category: 'Residential',
    status: 'In Development',
    publicLocation: 'Pampanga, Philippines',
    summary: '',
    description: '',
    projectObjectives: [],
    projectScope: [],
    completionDate: 'Q4 2026',
    clientName: 'Confidential Family Office',
    featured: false,
    publicationState: 'DRAFT',
    coverImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80',
    gallery: [],
    publicDocuments: [],
  });

  // Objective / Scope item inputs
  const [tempObjective, setTempObjective] = useState('');
  const [tempScope, setTempScope] = useState('');

  // Upload Document Modal
  const [uploadDocModalOpen, setUploadDocModalOpen] = useState(false);
  const [newDocForm, setNewDocForm] = useState({
    title: '',
    category: 'Project Presentation' as PublicDocumentCategory,
    fileType: 'PDF' as const,
    fileSize: '4.8 MB',
    version: 'v1.0',
    description: '',
    summaryPreview: '',
    publicDownloadEnabled: true,
    requireContactForDownload: false,
  });

  // Upload Gallery Item Modal
  const [uploadGalleryModalOpen, setUploadGalleryModalOpen] = useState(false);
  const [newGalleryForm, setNewGalleryForm] = useState({
    url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    caption: '',
    category: 'Architecture' as const,
    isHero: false,
  });

  // Preview Modal
  const [previewProjectModal, setPreviewProjectModal] = useState<PublicProjectRecord | null>(null);

  // Load projects & audit logs from backend
  const loadBackendData = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/public-projects');
      if (res.ok) {
        const data = await res.json();
        if (data.projects) setProjects(data.projects);
        if (data.auditLogs) setAuditLogs(data.auditLogs);
      }
    } catch {
      // Keep local state
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBackendData();
  }, []);

  // Filter projects in list
  const filteredProjects = projects.filter((p) => {
    if (stateFilter !== 'ALL' && p.publicationState !== stateFilter) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        p.title.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.publicLocation?.toLowerCase().includes(q) ||
        p.summary.toLowerCase().includes(q)
      );
    }
    return true;
  });

  // Calculate high-level stats
  const stats = {
    total: projects.length,
    published: projects.filter((p) => p.publicationState === 'PUBLISHED').length,
    inReview: projects.filter((p) => p.publicationState === 'UNDER_REVIEW').length,
    drafts: projects.filter((p) => p.publicationState === 'DRAFT').length,
    archived: projects.filter((p) => p.publicationState === 'ARCHIVED').length,
    totalDownloads: projects.reduce(
      (acc, p) =>
        acc +
        (p.publicDocuments || []).reduce((dAcc, d) => dAcc + (d.downloadCount || 0), 0),
      0
    ),
  };

  // Actions: Publish, Unpublish, Archive, Delete
  const handleSetState = async (
    projectId: string,
    newState: PublicationStatus,
    reason: string
  ) => {
    try {
      const res = await fetch(`/api/admin/public-projects/${projectId}/publish`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          publicationState: newState,
          adminEmail: currentUser?.email || 'admin@ldldhenze.com',
          reason,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        setProjects((prev) =>
          prev.map((p) => (p.publicProjectId === projectId ? data.project : p))
        );
        setStatusMessage({
          type: 'success',
          text: `Project publication state successfully changed to ${newState}.`,
        });
        loadBackendData();
      } else {
        const err = await res.json();
        setStatusMessage({ type: 'error', text: err.error || 'Operation failed.' });
      }
    } catch {
      setStatusMessage({ type: 'error', text: 'Network connection error.' });
    }
  };

  const handleDeleteProject = async (projectId: string) => {
    if (!confirm('Are you sure you want to delete this public project record? This cannot be undone.')) return;
    try {
      const res = await fetch(`/api/admin/public-projects/${projectId}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          adminEmail: currentUser?.email || 'admin@ldldhenze.com',
        }),
      });

      if (res.ok) {
        setProjects((prev) => prev.filter((p) => p.publicProjectId !== projectId));
        setStatusMessage({ type: 'success', text: 'Project deleted successfully.' });
      }
    } catch {
      setStatusMessage({ type: 'error', text: 'Failed to delete project.' });
    }
  };

  // Start new project
  const handleStartNewProject = () => {
    setEditingProject({
      title: '',
      slug: '',
      category: 'Residential',
      status: 'In Development',
      publicLocation: 'Pampanga, Philippines',
      summary: '',
      description: '',
      projectObjectives: ['Deliver earthquake-resilient reinforced structural framework', 'Integrate solar PV rooftop generation'],
      projectScope: ['Architectural design & CDE modeling', 'Full turnkey construction & MEP installation'],
      completionDate: 'Target Q4 2026',
      clientName: 'Private Investor Group',
      featured: false,
      publicationState: 'DRAFT',
      coverImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80',
      gallery: [],
      publicDocuments: [],
    });
    setActiveTab('create-or-edit');
  };

  // Edit existing project
  const handleEditProject = (proj: PublicProjectRecord) => {
    setEditingProject({ ...proj });
    setActiveTab('create-or-edit');
  };

  // Save Project (Create or Update)
  const handleSaveProject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProject.title || !editingProject.summary) {
      setStatusMessage({ type: 'error', text: 'Title and Short Summary are required fields.' });
      return;
    }

    try {
      const isExisting = Boolean(editingProject.publicProjectId);
      const url = isExisting
        ? `/api/admin/public-projects/${editingProject.publicProjectId}`
        : '/api/admin/public-projects';
      const method = isExisting ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...editingProject,
          adminEmail: currentUser?.email || 'admin@ldldhenze.com',
        }),
      });

      const data = await res.json();
      if (res.ok) {
        setStatusMessage({
          type: 'success',
          text: `Project "${data.project.title}" saved successfully.`,
        });
        loadBackendData();
        setActiveTab('projects-list');
      } else {
        setStatusMessage({ type: 'error', text: data.error || 'Save failed.' });
      }
    } catch {
      setStatusMessage({ type: 'error', text: 'Network connection failed.' });
    }
  };

  // Import from Existing Portfolio
  const handleImportFromPortfolio = (portfolioId: string) => {
    const found = PORTFOLIO_PROJECTS.find((p) => p.id === portfolioId);
    if (!found) return;

    // Sanitize and transform into clean PublicProjectRecord
    const sanitizedTitle = found.name;
    const generatedSlug = sanitizedTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

    setEditingProject({
      sourceProjectId: found.id,
      title: sanitizedTitle,
      slug: generatedSlug,
      category: found.sector.includes('Residential') ? 'Residential' : found.sector.includes('Commercial') ? 'Commercial' : 'Concept Development',
      status: found.stage as PublicProjectStage,
      publicLocation: found.location,
      summary: found.scope,
      description: `${found.scope}\n\nDelivered Solution: ${found.solution}\n\nChallenge Addressed: ${found.challenge}`,
      projectObjectives: [
        `Deliver high-performance execution conforming to ${found.sector}`,
        'Strict statutory compliance with National Building Code (PD 1096)',
        'Resilient MEP utilities and structural safety factor',
      ],
      projectScope: found.servicesByLdlDhenze || [
        'Architectural design & engineering coordination',
        'Turnkey general construction management',
      ],
      completionDate: 'Verified Baseline',
      clientName: found.clientDisclosureStatus,
      featured: true,
      publicationState: 'DRAFT',
      coverImage: found.heroImage || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80',
      gallery: [
        {
          id: `gal-${Date.now()}-1`,
          url: found.heroImage || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80',
          caption: `${found.name} - Front Elevation & Architectural Visualization`,
          category: 'Architecture',
          isFeatured: true,
          mediaType: 'image',
          displayOrder: 1,
        },
      ],
      publicDocuments: [
        {
          publicDocumentId: `doc-${Date.now()}`,
          publicProjectId: generatedSlug,
          title: `${found.name} Project Profile & Executive Brief`,
          category: 'Project Profile',
          fileType: 'PDF',
          fileSize: '3.4 MB',
          fileSizeBytes: 3565158,
          version: 'v1.0',
          documentDate: '2026-09-17',
          uploadedAt: new Date().toISOString(),
          previewEnabled: true,
          storageReference: `publications/${generatedSlug}/profile.pdf`,
          status: 'ACTIVE',
          description: `Comprehensive project profile and architectural highlights for ${found.name}. Approved for public distribution.`,
          summaryPreview: 'Official publication brief covering architectural design parameters, structural methodology, and verified project scope.',
          publicDownloadEnabled: true,
          requireContactForDownload: false,
          downloadCount: 0,
        },
      ],
    });

    setStatusMessage({
      type: 'success',
      text: `Imported "${found.name}" into new Public Project Draft. Private project files remain securely locked.`,
    });
    setActiveTab('create-or-edit');
  };

  // Add Document to editing project
  const handleAddDocumentToProject = () => {
    if (!newDocForm.title) return;
    const newDoc: PublicDocumentRecord = {
      publicDocumentId: `doc-${Date.now()}`,
      publicProjectId: editingProject.publicProjectId || 'pub-prj-new',
      title: newDocForm.title,
      category: newDocForm.category,
      fileType: newDocForm.fileType,
      fileSize: newDocForm.fileSize,
      fileSizeBytes: 4800000,
      version: newDocForm.version,
      documentDate: new Date().toISOString().split('T')[0],
      uploadedAt: new Date().toISOString(),
      previewEnabled: true,
      storageReference: `publications/docs/${Date.now()}.pdf`,
      status: 'ACTIVE',
      description: newDocForm.description || `Official approved document: ${newDocForm.title}`,
      summaryPreview: newDocForm.summaryPreview || newDocForm.description,
      publicDownloadEnabled: newDocForm.publicDownloadEnabled,
      requireContactForDownload: newDocForm.requireContactForDownload,
      downloadCount: 0,
    };

    setEditingProject((prev) => ({
      ...prev,
      publicDocuments: [...(prev.publicDocuments || []), newDoc],
    }));

    setUploadDocModalOpen(false);
    setNewDocForm({
      title: '',
      category: 'Project Presentation',
      fileType: 'PDF',
      fileSize: '4.8 MB',
      version: 'v1.0',
      description: '',
      summaryPreview: '',
      publicDownloadEnabled: true,
      requireContactForDownload: false,
    });
  };

  // Add Gallery Item to editing project
  const handleAddGalleryItem = () => {
    if (!newGalleryForm.url) return;
    const item: PublicGalleryItem = {
      id: `gal-${Date.now()}`,
      url: newGalleryForm.url,
      caption: newGalleryForm.caption,
      category: newGalleryForm.category,
      isFeatured: newGalleryForm.isHero,
      mediaType: 'image',
      displayOrder: (editingProject.gallery?.length || 0) + 1,
    };

    setEditingProject((prev) => ({
      ...prev,
      coverImage: newGalleryForm.isHero ? newGalleryForm.url : prev.coverImage,
      gallery: [...(prev.gallery || []), item],
    }));

    setUploadGalleryModalOpen(false);
    setNewGalleryForm({
      url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
      caption: '',
      category: 'Architecture',
      isHero: false,
    });
  };

  return (
    <div className="space-y-6 text-slate-100">
      {/* ---------------------------------------------------- */}
      {/* TOP HEADER & STATS BAR */}
      {/* ---------------------------------------------------- */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded text-[11px] font-semibold tracking-wider uppercase bg-[#C6922D]/20 text-[#e5b95d] border border-[#C6922D]/40">
              PUBLIC CONTENT MANAGEMENT • PROJECT LIBRARY
            </span>
            <span className="text-xs text-slate-400 font-mono">
              Admin: {currentUser?.email || 'Authorized Administrator'}
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-serif text-white mt-1">
            Project Publishing & Materials Console
          </h1>
          <p className="text-xs text-slate-300 font-sans-body mt-1">
            Review, publish, and govern project presentations, profiles, architectural plans, and approved public download files.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {onNavigate && (
            <button
              onClick={() => onNavigate('projects')}
              className="px-3 py-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-xs text-slate-200 flex items-center gap-1.5 transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5 text-[#C6922D]" />
              <span>Live Website</span>
            </button>
          )}

          <button
            onClick={handleStartNewProject}
            className="px-4 py-2 rounded-lg bg-[#C6922D] hover:bg-[#e5b95d] text-[#071A2F] text-xs font-bold flex items-center gap-1.5 transition-all shadow-md"
          >
            <Plus className="w-4 h-4" />
            <span>Add Public Project</span>
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        <div className="bg-[#081F38] border border-white/10 rounded-xl p-3.5">
          <span className="text-[10px] uppercase font-semibold text-slate-400 tracking-wider block mb-1">
            Total Projects
          </span>
          <span className="text-2xl font-serif text-white font-bold">{stats.total}</span>
        </div>
        <div className="bg-[#081F38] border border-white/10 rounded-xl p-3.5">
          <span className="text-[10px] uppercase font-semibold text-emerald-400 tracking-wider block mb-1">
            Published Live
          </span>
          <span className="text-2xl font-serif text-emerald-400 font-bold">{stats.published}</span>
        </div>
        <div className="bg-[#081F38] border border-white/10 rounded-xl p-3.5">
          <span className="text-[10px] uppercase font-semibold text-blue-400 tracking-wider block mb-1">
            In Review
          </span>
          <span className="text-2xl font-serif text-blue-400 font-bold">{stats.inReview}</span>
        </div>
        <div className="bg-[#081F38] border border-white/10 rounded-xl p-3.5">
          <span className="text-[10px] uppercase font-semibold text-amber-400 tracking-wider block mb-1">
            Drafts
          </span>
          <span className="text-2xl font-serif text-amber-400 font-bold">{stats.drafts}</span>
        </div>
        <div className="bg-[#081F38] border border-white/10 rounded-xl p-3.5">
          <span className="text-[10px] uppercase font-semibold text-slate-400 tracking-wider block mb-1">
            Archived
          </span>
          <span className="text-2xl font-serif text-slate-300 font-bold">{stats.archived}</span>
        </div>
        <div className="bg-[#081F38] border border-white/10 rounded-xl p-3.5">
          <span className="text-[10px] uppercase font-semibold text-[#e5b95d] tracking-wider block mb-1">
            Public Downloads
          </span>
          <span className="text-2xl font-serif text-[#e5b95d] font-bold">{stats.totalDownloads}</span>
        </div>
      </div>

      {/* Notification Banner */}
      {statusMessage && (
        <div
          className={`p-4 rounded-xl text-xs flex items-start justify-between gap-3 border ${
            statusMessage.type === 'success'
              ? 'bg-emerald-950/60 border-emerald-800/80 text-emerald-200'
              : 'bg-rose-950/60 border-rose-800/80 text-rose-200'
          }`}
        >
          <div className="flex items-center gap-2">
            {statusMessage.type === 'success' ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            ) : (
              <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
            )}
            <span>{statusMessage.text}</span>
          </div>
          <button onClick={() => setStatusMessage(null)} className="text-slate-400 hover:text-white">
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Navigation Subtabs */}
      <div className="flex flex-wrap items-center gap-2 border-b border-white/10 pb-2">
        <button
          onClick={() => setActiveTab('projects-list')}
          className={`px-3.5 py-2 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
            activeTab === 'projects-list'
              ? 'bg-[#C6922D] text-[#071A2F] shadow-md'
              : 'bg-white/5 hover:bg-white/10 text-slate-300'
          }`}
        >
          <Building2 className="w-3.5 h-3.5" />
          <span>Project Library ({projects.length})</span>
        </button>

        <button
          onClick={() => {
            if (!editingProject.title) handleStartNewProject();
            setActiveTab('create-or-edit');
          }}
          className={`px-3.5 py-2 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
            activeTab === 'create-or-edit'
              ? 'bg-[#C6922D] text-[#071A2F] shadow-md'
              : 'bg-white/5 hover:bg-white/10 text-slate-300'
          }`}
        >
          <Edit className="w-3.5 h-3.5" />
          <span>
            {editingProject.publicProjectId ? `Edit: ${editingProject.title}` : '+ New Project Form'}
          </span>
        </button>

        <button
          onClick={() => setActiveTab('import-existing')}
          className={`px-3.5 py-2 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
            activeTab === 'import-existing'
              ? 'bg-[#C6922D] text-[#071A2F] shadow-md'
              : 'bg-white/5 hover:bg-white/10 text-slate-300'
          }`}
        >
          <Layers className="w-3.5 h-3.5" />
          <span>Import Existing Portfolio</span>
        </button>

        <button
          onClick={() => setActiveTab('media-library')}
          className={`px-3.5 py-2 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
            activeTab === 'media-library'
              ? 'bg-[#C6922D] text-[#071A2F] shadow-md'
              : 'bg-white/5 hover:bg-white/10 text-slate-300'
          }`}
        >
          <Download className="w-3.5 h-3.5" />
          <span>Public Download Center</span>
        </button>

        <button
          onClick={() => setActiveTab('audit-trail')}
          className={`px-3.5 py-2 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
            activeTab === 'audit-trail'
              ? 'bg-[#C6922D] text-[#071A2F] shadow-md'
              : 'bg-white/5 hover:bg-white/10 text-slate-300'
          }`}
        >
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Governance & Audit Trail</span>
        </button>
      </div>

      {/* ---------------------------------------------------- */}
      {/* TAB 1: PROJECTS LIST & MANAGEMENT TABLE */}
      {/* ---------------------------------------------------- */}
      {activeTab === 'projects-list' && (
        <div className="space-y-4">
          {/* Controls Bar */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-[#081F38] p-3 rounded-xl border border-white/10">
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search public projects..."
                className="w-full pl-9 pr-3 py-1.5 bg-[#051322] border border-white/10 rounded-lg text-xs text-white placeholder-slate-400 focus:outline-none focus:border-[#C6922D]"
              />
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400 flex items-center gap-1">
                <Filter className="w-3.5 h-3.5" /> Filter:
              </span>
              <select
                value={stateFilter}
                onChange={(e) => setStateFilter(e.target.value)}
                className="bg-[#051322] border border-white/10 text-xs text-slate-200 py-1.5 px-3 rounded-lg focus:outline-none cursor-pointer"
              >
                <option value="ALL">All States ({projects.length})</option>
                <option value="PUBLISHED">Published Live ({stats.published})</option>
                <option value="IN_REVIEW">In Review ({stats.inReview})</option>
                <option value="DRAFT">Drafts ({stats.drafts})</option>
                <option value="ARCHIVED">Archived ({stats.archived})</option>
              </select>

              <button
                onClick={loadBackendData}
                className="p-1.5 bg-white/5 hover:bg-white/10 rounded-lg border border-white/10 text-slate-300"
                title="Refresh Table"
              >
                <RefreshCw className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Table */}
          <div className="bg-[#081F38] border border-white/10 rounded-xl overflow-hidden shadow-xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#051322] text-slate-400 font-mono text-[10px] uppercase tracking-wider border-b border-white/10">
                  <tr>
                    <th className="p-3">Project Title & Slug</th>
                    <th className="p-3">Category</th>
                    <th className="p-3">Milestone Status</th>
                    <th className="p-3">Publication State</th>
                    <th className="p-3">Materials</th>
                    <th className="p-3">Last Updated</th>
                    <th className="p-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {filteredProjects.map((p) => (
                    <tr key={p.publicProjectId} className="hover:bg-white/5 transition-colors">
                      <td className="p-3">
                        <div className="font-semibold text-white flex items-center gap-2">
                          <span>{p.title}</span>
                          {p.featured && (
                            <span className="px-1.5 py-0.2 rounded text-[9px] bg-[#C6922D] text-[#071A2F] font-bold">
                              Featured
                            </span>
                          )}
                        </div>
                        <div className="text-[10px] font-mono text-slate-400 mt-0.5">
                          /projects/{p.slug}
                        </div>
                      </td>

                      <td className="p-3 text-slate-300">
                        <span>{p.category}</span>
                      </td>

                      <td className="p-3">
                        <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-white/5 border border-white/10 text-slate-200">
                          {p.status}
                        </span>
                      </td>

                      <td className="p-3">
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider border ${
                            p.publicationState === 'PUBLISHED'
                              ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                              : p.publicationState === 'UNDER_REVIEW'
                              ? 'bg-blue-500/20 text-blue-300 border-blue-500/30'
                              : p.publicationState === 'DRAFT'
                              ? 'bg-amber-500/20 text-amber-300 border-amber-500/30'
                              : 'bg-slate-700/50 text-slate-300 border-slate-600'
                          }`}
                        >
                          {p.publicationState}
                        </span>
                      </td>

                      <td className="p-3 font-mono text-[11px] text-slate-300">
                        {p.publicDocuments?.length || 0} Docs • {p.gallery?.length || 0} Images
                      </td>

                      <td className="p-3 text-slate-400 text-[11px]">
                        {new Date(p.updatedAt).toLocaleDateString()}
                      </td>

                      <td className="p-3 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          {/* Preview modal */}
                          <button
                            onClick={() => setPreviewProjectModal(p)}
                            className="p-1.5 rounded hover:bg-white/10 text-slate-300 hover:text-white"
                            title="Preview Project"
                          >
                            <Eye className="w-3.5 h-3.5" />
                          </button>

                          {/* Edit button */}
                          <button
                            onClick={() => handleEditProject(p)}
                            className="p-1.5 rounded hover:bg-white/10 text-slate-300 hover:text-white"
                            title="Edit Project"
                          >
                            <Edit className="w-3.5 h-3.5" />
                          </button>

                          {/* State Toggles: Publish / Unpublish */}
                          {p.publicationState !== 'PUBLISHED' ? (
                            <button
                              onClick={() =>
                                handleSetState(
                                  p.publicProjectId,
                                  'PUBLISHED',
                                  'Administrator approved for public library display.'
                                )
                              }
                              className="px-2 py-1 rounded bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-[10px]"
                              title="Publish Now"
                            >
                              Publish
                            </button>
                          ) : (
                            <button
                              onClick={() =>
                                handleSetState(
                                  p.publicProjectId,
                                  'UNPUBLISHED',
                                  'Unpublished for revisions.'
                                )
                              }
                              className="px-2 py-1 rounded bg-amber-600 hover:bg-amber-500 text-white font-semibold text-[10px]"
                              title="Unpublish to Draft"
                            >
                              Unpublish
                            </button>
                          )}

                          {/* Archive button */}
                          {p.publicationState !== 'ARCHIVED' && (
                            <button
                              onClick={() =>
                                handleSetState(
                                  p.publicProjectId,
                                  'ARCHIVED',
                                  'Archived from public index.'
                                )
                              }
                              className="p-1.5 rounded hover:bg-white/10 text-slate-400 hover:text-white"
                              title="Archive Project"
                            >
                              <Archive className="w-3.5 h-3.5" />
                            </button>
                          )}

                          {/* Delete button */}
                          <button
                            onClick={() => handleDeleteProject(p.publicProjectId)}
                            className="p-1.5 rounded hover:bg-rose-900/40 text-rose-400"
                            title="Delete Project"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
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
      {/* TAB 2: CREATE / EDIT PROJECT FORM (MULTI-SECTION) */}
      {/* ---------------------------------------------------- */}
      {activeTab === 'create-or-edit' && (
        <form onSubmit={handleSaveProject} className="space-y-8 max-w-4xl bg-[#081F38] border border-white/10 rounded-2xl p-6 sm:p-8">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div>
              <h2 className="text-xl font-serif text-white">
                {editingProject.publicProjectId ? `Edit Public Project: ${editingProject.title}` : 'Create New Public Project'}
              </h2>
              <p className="text-xs text-slate-300 mt-0.5">
                Ensure all public disclosures meet statutory honesty protocols. Private contractor documents remain locked.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setActiveTab('projects-list')}
                className="px-3 py-1.5 rounded-lg bg-white/5 text-slate-300 hover:bg-white/10 text-xs"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-1.5 rounded-lg bg-[#C6922D] hover:bg-[#e5b95d] text-[#071A2F] font-bold text-xs shadow-md"
              >
                Save Project
              </button>
            </div>
          </div>

          {/* Section 1: Basic Information */}
          <div className="space-y-4">
            <h3 className="text-xs uppercase font-bold text-[#e5b95d] tracking-wider">
              1. Project Classification & Basic Identity
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block text-slate-300 mb-1 font-semibold">Project Name *</label>
                <input
                  type="text"
                  required
                  value={editingProject.title || ''}
                  onChange={(e) => {
                    const title = e.target.value;
                    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
                    setEditingProject((prev) => ({ ...prev, title, slug: prev.slug || slug }));
                  }}
                  placeholder="e.g. Angeles Horizon Executive Reserve"
                  className="w-full px-3 py-2 bg-[#051322] border border-white/10 rounded-lg text-white"
                />
              </div>

              <div>
                <label className="block text-slate-300 mb-1 font-semibold">URL Slug *</label>
                <input
                  type="text"
                  required
                  value={editingProject.slug || ''}
                  onChange={(e) => setEditingProject({ ...editingProject, slug: e.target.value })}
                  placeholder="e.g. angeles-horizon-executive-reserve"
                  className="w-full px-3 py-2 bg-[#051322] border border-white/10 rounded-lg text-white font-mono"
                />
              </div>

              <div>
                <label className="block text-slate-300 mb-1 font-semibold">Category *</label>
                <select
                  value={editingProject.category || 'Residential'}
                  onChange={(e) =>
                    setEditingProject({
                      ...editingProject,
                      category: e.target.value as Exclude<PublicProjectCategory, 'All'>,
                    })
                  }
                  className="w-full px-3 py-2 bg-[#051322] border border-white/10 rounded-lg text-white cursor-pointer"
                >
                  {CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-slate-300 mb-1 font-semibold">Milestone Status *</label>
                <select
                  value={editingProject.status || 'In Development'}
                  onChange={(e) =>
                    setEditingProject({ ...editingProject, status: e.target.value as PublicProjectStage })
                  }
                  className="w-full px-3 py-2 bg-[#051322] border border-white/10 rounded-lg text-white cursor-pointer"
                >
                  {STAGES.map((stg) => (
                    <option key={stg} value={stg}>
                      {stg}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-slate-300 mb-1 font-semibold">Public Location *</label>
                <input
                  type="text"
                  required
                  value={editingProject.publicLocation || ''}
                  onChange={(e) => setEditingProject({ ...editingProject, publicLocation: e.target.value })}
                  placeholder="e.g. Pampanga, Philippines"
                  className="w-full px-3 py-2 bg-[#051322] border border-white/10 rounded-lg text-white"
                />
              </div>

              <div>
                <label className="block text-slate-300 mb-1 font-semibold">Target / Completion Date</label>
                <input
                  type="text"
                  value={editingProject.completionDate || ''}
                  onChange={(e) => setEditingProject({ ...editingProject, completionDate: e.target.value })}
                  placeholder="e.g. Completed Q3 2025"
                  className="w-full px-3 py-2 bg-[#051322] border border-white/10 rounded-lg text-white"
                />
              </div>

              <div>
                <label className="block text-slate-300 mb-1 font-semibold">Client Disclosure Name</label>
                <input
                  type="text"
                  value={editingProject.clientName || ''}
                  onChange={(e) => setEditingProject({ ...editingProject, clientName: e.target.value })}
                  placeholder="e.g. Private Family Office (Confidential)"
                  className="w-full px-3 py-2 bg-[#051322] border border-white/10 rounded-lg text-white"
                />
              </div>

              <div className="flex items-center gap-3 pt-6">
                <input
                  type="checkbox"
                  id="featured-toggle"
                  checked={editingProject.featured || false}
                  onChange={(e) => setEditingProject({ ...editingProject, featured: e.target.checked })}
                  className="w-4 h-4 rounded text-[#C6922D] bg-[#051322] border-white/20"
                />
                <label htmlFor="featured-toggle" className="text-xs text-white font-semibold cursor-pointer">
                  Featured on Homepage & Highlights
                </label>
              </div>
            </div>
          </div>

          {/* Section 2: Summary & Description */}
          <div className="space-y-4 pt-6 border-t border-white/10">
            <h3 className="text-xs uppercase font-bold text-[#e5b95d] tracking-wider">
              2. Editorial Content & Descriptions
            </h3>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Short Summary (1-2 sentences for cards & search snippets) *
              </label>
              <textarea
                required
                rows={2}
                value={editingProject.summary || ''}
                onChange={(e) => setEditingProject({ ...editingProject, summary: e.target.value })}
                placeholder="High-level overview of project scope and architectural identity..."
                className="w-full px-3 py-2 bg-[#051322] border border-white/10 rounded-lg text-xs text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Full Project Overview & Description *
              </label>
              <textarea
                required
                rows={5}
                value={editingProject.description || ''}
                onChange={(e) => setEditingProject({ ...editingProject, description: e.target.value })}
                placeholder="Detailed description of development phases, engineering solutions, and architectural standards..."
                className="w-full px-3 py-2 bg-[#051322] border border-white/10 rounded-lg text-xs text-white"
              />
            </div>

            {/* Dynamic Objectives List */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Key Objectives
              </label>
              <div className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={tempObjective}
                  onChange={(e) => setTempObjective(e.target.value)}
                  placeholder="e.g. Integrate net-zero solar microgrid with battery storage"
                  className="flex-1 px-3 py-1.5 bg-[#051322] border border-white/10 rounded-lg text-xs text-white"
                />
                <button
                  type="button"
                  onClick={() => {
                    if (!tempObjective) return;
                    setEditingProject((prev) => ({
                      ...prev,
                      projectObjectives: [...(prev.projectObjectives || []), tempObjective],
                    }));
                    setTempObjective('');
                  }}
                  className="px-3 py-1.5 bg-white/10 hover:bg-white/15 text-xs text-white rounded-lg"
                >
                  Add Objective
                </button>
              </div>

              <div className="space-y-1.5">
                {editingProject.projectObjectives?.map((obj, idx) => (
                  <div key={idx} className="flex items-center justify-between p-2 bg-[#051322] rounded-lg text-xs">
                    <span className="text-slate-200">{obj}</span>
                    <button
                      type="button"
                      onClick={() =>
                        setEditingProject((prev) => ({
                          ...prev,
                          projectObjectives: prev.projectObjectives?.filter((_, i) => i !== idx),
                        }))
                      }
                      className="text-slate-400 hover:text-rose-400"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Dynamic Scope List */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Scope of Execution Delivered / Planned
              </label>
              <div className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={tempScope}
                  onChange={(e) => setTempScope(e.target.value)}
                  placeholder="e.g. Reinforced concrete foundation & shear wall civil works"
                  className="flex-1 px-3 py-1.5 bg-[#051322] border border-white/10 rounded-lg text-xs text-white"
                />
                <button
                  type="button"
                  onClick={() => {
                    if (!tempScope) return;
                    setEditingProject((prev) => ({
                      ...prev,
                      projectScope: [...(prev.projectScope || []), tempScope],
                    }));
                    setTempScope('');
                  }}
                  className="px-3 py-1.5 bg-white/10 hover:bg-white/15 text-xs text-white rounded-lg"
                >
                  Add Scope
                </button>
              </div>

              <div className="space-y-1.5">
                {editingProject.projectScope?.map((sc, idx) => (
                  <div key={idx} className="flex items-center justify-between p-2 bg-[#051322] rounded-lg text-xs">
                    <span className="text-slate-200">{sc}</span>
                    <button
                      type="button"
                      onClick={() =>
                        setEditingProject((prev) => ({
                          ...prev,
                          projectScope: prev.projectScope?.filter((_, i) => i !== idx),
                        }))
                      }
                      className="text-slate-400 hover:text-rose-400"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Section 3: Visual Media & Gallery */}
          <div className="space-y-4 pt-6 border-t border-white/10">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xs uppercase font-bold text-[#e5b95d] tracking-wider">
                  3. Project Imagery & Media Gallery
                </h3>
                <p className="text-xs text-slate-400">Manage hero photography, floor plans, and architectural renders.</p>
              </div>
              <button
                type="button"
                onClick={() => setUploadGalleryModalOpen(true)}
                className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-xs text-slate-200 flex items-center gap-1.5 border border-white/10"
              >
                <Plus className="w-3.5 h-3.5 text-[#C6922D]" />
                <span>Add Image</span>
              </button>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Cover / Hero Image URL *
              </label>
              <input
                type="text"
                required
                value={editingProject.coverImage || ''}
                onChange={(e) => setEditingProject({ ...editingProject, coverImage: e.target.value })}
                placeholder="https://images.unsplash.com/photo-..."
                className="w-full px-3 py-2 bg-[#051322] border border-white/10 rounded-lg text-xs text-white font-mono"
              />
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {editingProject.gallery?.map((item) => (
                <div key={item.id} className="relative rounded-lg overflow-hidden bg-black border border-white/10 group">
                  <img src={item.url} alt="" className="w-full aspect-[4/3] object-cover" />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                    <button
                      type="button"
                      onClick={() =>
                        setEditingProject((prev) => ({
                          ...prev,
                          coverImage: item.url,
                        }))
                      }
                      className="px-2 py-1 bg-[#C6922D] text-[#071A2F] text-[10px] font-bold rounded"
                      title="Set as Hero Cover"
                    >
                      Hero
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        setEditingProject((prev) => ({
                          ...prev,
                          gallery: prev.gallery?.filter((g) => g.id !== item.id),
                        }))
                      }
                      className="p-1 bg-rose-600 text-white rounded"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>
                  <div className="absolute bottom-1 left-1 bg-black/80 px-1.5 py-0.5 rounded text-[9px] text-slate-200">
                    {item.category}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section 4: Approved Project Documents */}
          <div className="space-y-4 pt-6 border-t border-white/10">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xs uppercase font-bold text-[#e5b95d] tracking-wider">
                  4. Approved Public Documents & Download Center
                </h3>
                <p className="text-xs text-slate-400">
                  Only documents with &ldquo;Public Download Enabled&rdquo; can be downloaded by visitors.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setUploadDocModalOpen(true)}
                className="px-3 py-1.5 rounded-lg bg-[#C6922D] hover:bg-[#e5b95d] text-[#071A2F] text-xs font-bold flex items-center gap-1.5 shadow-md"
              >
                <Upload className="w-3.5 h-3.5" />
                <span>Upload Document</span>
              </button>
            </div>

            <div className="space-y-2">
              {editingProject.publicDocuments?.map((doc) => (
                <div
                  key={doc.publicDocumentId}
                  className="bg-[#051322] border border-white/10 rounded-xl p-3.5 flex items-center justify-between text-xs"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded bg-[#C6922D]/20 text-[#C6922D] flex items-center justify-center shrink-0">
                      <FileText className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-semibold text-white flex items-center gap-2">
                        <span>{doc.title}</span>
                        <span className="text-[10px] font-mono text-slate-400">
                          ({doc.fileType} • {doc.fileSize})
                        </span>
                      </div>
                      <div className="text-[11px] text-slate-400 mt-0.5">
                        {doc.category} • Version: {doc.version}
                        {doc.publicDownloadEnabled ? (
                          <span className="ml-2 text-emerald-400 font-semibold">• Download Enabled</span>
                        ) : (
                          <span className="ml-2 text-amber-400 font-semibold">• Preview Only</span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() =>
                        setEditingProject((prev) => ({
                          ...prev,
                          publicDocuments: prev.publicDocuments?.map((d) =>
                            d.publicDocumentId === doc.publicDocumentId
                              ? { ...d, publicDownloadEnabled: !d.publicDownloadEnabled }
                              : d
                          ),
                        }))
                      }
                      className="px-2 py-1 rounded bg-white/5 hover:bg-white/10 text-slate-300 text-[11px]"
                    >
                      {doc.publicDownloadEnabled ? 'Disable Download' : 'Enable Download'}
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        setEditingProject((prev) => ({
                          ...prev,
                          publicDocuments: prev.publicDocuments?.filter(
                            (d) => d.publicDocumentId !== doc.publicDocumentId
                          ),
                        }))
                      }
                      className="p-1 rounded text-slate-400 hover:text-rose-400"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section 5: Publication Governance State */}
          <div className="space-y-4 pt-6 border-t border-white/10">
            <h3 className="text-xs uppercase font-bold text-[#e5b95d] tracking-wider">
              5. Publication Lifecycle & Governance State
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Publication Status
                </label>
                <select
                  value={editingProject.publicationState || 'DRAFT'}
                  onChange={(e) =>
                    setEditingProject({
                      ...editingProject,
                      publicationState: e.target.value as PublicationStatus,
                    })
                  }
                  className="w-full px-3 py-2 bg-[#051322] border border-white/10 rounded-lg text-xs text-white"
                >
                  <option value="DRAFT">DRAFT (Hidden from public website)</option>
                  <option value="UNDER_REVIEW">UNDER REVIEW (Awaiting executive approval)</option>
                  <option value="PUBLISHED">PUBLISHED (Live on public Project Library)</option>
                  <option value="ARCHIVED">ARCHIVED (Archived, hidden from public)</option>
                </select>
              </div>

              <div className="flex items-end">
                <button
                  type="submit"
                  className="w-full py-2.5 bg-[#C6922D] hover:bg-[#e5b95d] text-[#071A2F] font-bold text-xs uppercase tracking-wider rounded-xl transition-colors shadow-lg"
                >
                  Save & Apply Changes
                </button>
              </div>
            </div>
          </div>
        </form>
      )}

      {/* ---------------------------------------------------- */}
      {/* TAB 3: IMPORT FROM EXISTING PORTFOLIO */}
      {/* ---------------------------------------------------- */}
      {activeTab === 'import-existing' && (
        <div className="space-y-6">
          <div className="bg-[#081F38] border border-white/10 rounded-2xl p-6">
            <h2 className="text-xl font-serif text-white mb-2">
              Select from Existing Portfolio Projects
            </h2>
            <p className="text-xs text-slate-300 leading-relaxed max-w-2xl">
              Copy verified baseline specifications from your internal engineering portfolio into a public publication profile. You can review and refine all text, sanitize confidential client markers, and attach public presentations before going live.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {PORTFOLIO_PROJECTS.map((pp) => (
              <div
                key={pp.id}
                className="bg-[#081F38] border border-white/10 rounded-xl overflow-hidden flex flex-col justify-between"
              >
                <div>
                  <div className="aspect-[16/10] relative overflow-hidden bg-slate-900">
                    <img src={pp.heroImage} alt={pp.name} className="w-full h-full object-cover" />
                    <div className="absolute top-2.5 left-2.5">
                      <span className="px-2.5 py-0.5 rounded text-[10px] font-bold uppercase bg-black/70 text-slate-200">
                        {pp.stage}
                      </span>
                    </div>
                  </div>

                  <div className="p-4">
                    <span className="text-[10px] font-mono text-[#e5b95d] uppercase tracking-wider">
                      {pp.code} • {pp.sector}
                    </span>
                    <h4 className="font-serif-display text-lg text-white font-normal mt-1 mb-2">
                      {pp.name}
                    </h4>
                    <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
                      {pp.scope}
                    </p>
                  </div>
                </div>

                <div className="p-4 border-t border-white/10 bg-black/20 flex items-center justify-between">
                  <span className="text-[11px] font-mono text-slate-400 truncate max-w-[150px]">
                    {pp.location}
                  </span>
                  <button
                    onClick={() => handleImportFromPortfolio(pp.id)}
                    className="px-3 py-1.5 bg-[#C6922D] hover:bg-[#e5b95d] text-[#071A2F] text-xs font-bold rounded-lg transition-colors flex items-center gap-1"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy to Public Draft</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ---------------------------------------------------- */}
      {/* TAB 4: PUBLIC DOWNLOAD CENTER MANAGEMENT */}
      {/* ---------------------------------------------------- */}
      {activeTab === 'media-library' && (
        <div className="space-y-6">
          <div className="bg-[#081F38] border border-white/10 rounded-2xl p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-serif text-white">
                Public Download Materials Repository
              </h2>
              <p className="text-xs text-slate-300 mt-1">
                Oversee all documents, fact sheets, brochures, and architectural plans made accessible for public visitor downloads.
              </p>
            </div>

            <button
              onClick={handleStartNewProject}
              className="px-4 py-2 rounded-lg bg-[#C6922D] text-[#071A2F] text-xs font-bold flex items-center gap-1.5 shrink-0"
            >
              <Upload className="w-3.5 h-3.5" />
              <span>Attach to Project</span>
            </button>
          </div>

          <div className="bg-[#081F38] border border-white/10 rounded-xl overflow-hidden shadow-xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#051322] text-slate-400 font-mono text-[10px] uppercase tracking-wider border-b border-white/10">
                  <tr>
                    <th className="p-3">File / Document Title</th>
                    <th className="p-3">Project Association</th>
                    <th className="p-3">Category</th>
                    <th className="p-3">Type & Size</th>
                    <th className="p-3">Version</th>
                    <th className="p-3">Public Access</th>
                    <th className="p-3 text-right">Direct Stream</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {projects.flatMap((p) =>
                    (p.publicDocuments || []).map((doc) => (
                      <tr key={doc.publicDocumentId} className="hover:bg-white/5 transition-colors">
                        <td className="p-3">
                          <div className="font-semibold text-white flex items-center gap-2">
                            <FileText className="w-4 h-4 text-[#C6922D]" />
                            <span>{doc.title}</span>
                          </div>
                          <div className="text-[10px] text-slate-400 line-clamp-1 mt-0.5">
                            {doc.description}
                          </div>
                        </td>

                        <td className="p-3 text-slate-300">
                          <span className="font-medium">{p.title}</span>
                        </td>

                        <td className="p-3">
                          <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-white/5 text-slate-200 border border-white/10">
                            {doc.category}
                          </span>
                        </td>

                        <td className="p-3 font-mono text-[11px] text-slate-300">
                          {doc.fileType} • {doc.fileSize}
                        </td>

                        <td className="p-3 font-mono text-[11px] text-slate-400">
                          {doc.version}
                        </td>

                        <td className="p-3">
                          {doc.publicDownloadEnabled ? (
                            <span className="px-2 py-0.5 rounded text-[10px] font-bold text-emerald-300 bg-emerald-500/20 border border-emerald-500/30">
                              Enabled
                            </span>
                          ) : (
                            <span className="px-2 py-0.5 rounded text-[10px] font-bold text-amber-300 bg-amber-500/20 border border-amber-500/30">
                              Restricted
                            </span>
                          )}
                        </td>

                        <td className="p-3 text-right">
                          <a
                            href={`/api/public-projects/documents/${doc.publicDocumentId}/download`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 px-2.5 py-1 bg-white/5 hover:bg-white/10 text-[#e5b95d] rounded border border-white/10 text-[11px] font-mono"
                          >
                            <Download className="w-3 h-3" />
                            <span>Download PDF</span>
                          </a>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ---------------------------------------------------- */}
      {/* TAB 5: GOVERNANCE & AUDIT TRAIL */}
      {/* ---------------------------------------------------- */}
      {activeTab === 'audit-trail' && (
        <div className="space-y-6">
          <div className="bg-[#081F38] border border-white/10 rounded-2xl p-6">
            <h2 className="text-xl font-serif text-white mb-1">
              Project Publication Governance Ledger
            </h2>
            <p className="text-xs text-slate-300">
              Immutable audit log tracking every administrative project creation, metadata update, document upload, and state transition.
            </p>
          </div>

          <div className="bg-[#081F38] border border-white/10 rounded-xl overflow-hidden shadow-xl">
            <div className="divide-y divide-white/5">
              {auditLogs.map((log) => (
                <div key={log.id} className="p-4 flex items-start justify-between gap-4 text-xs">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center shrink-0 mt-0.5">
                      <Clock className="w-4 h-4 text-[#C6922D]" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-white uppercase text-[11px]">
                          {log.action}
                        </span>
                        <span className="text-[10px] font-mono text-[#e5b95d]">
                          {log.publicProjectId}
                        </span>
                      </div>
                      <div className="text-slate-300 mt-1 leading-relaxed">{log.details}</div>
                      <div className="text-[10px] font-mono text-slate-400 mt-1">
                        Actor: {log.authorizedUser} ({log.userRole})
                      </div>
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <span className="font-mono text-[11px] text-slate-400">
                      {new Date(log.timestamp).toLocaleString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ---------------------------------------------------- */}
      {/* MODAL: UPLOAD NEW DOCUMENT */}
      {/* ---------------------------------------------------- */}
      {uploadDocModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
          <div className="bg-[#09223d] border border-[#C6922D]/40 rounded-2xl p-6 sm:p-8 max-w-lg w-full shadow-2xl space-y-4">
            <div className="flex items-start justify-between border-b border-white/10 pb-3">
              <h3 className="text-lg font-serif text-white">Upload Approved Project Document</h3>
              <button
                onClick={() => setUploadDocModalOpen(false)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-300 mb-1">Document Display Title *</label>
                <input
                  type="text"
                  required
                  value={newDocForm.title}
                  onChange={(e) => setNewDocForm({ ...newDocForm, title: e.target.value })}
                  placeholder="e.g. Master Architectural Plan & Elevation Brief"
                  className="w-full px-3 py-2 bg-[#051322] border border-white/15 rounded-lg text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 mb-1">Category *</label>
                  <select
                    value={newDocForm.category}
                    onChange={(e) =>
                      setNewDocForm({ ...newDocForm, category: e.target.value as PublicDocumentCategory })
                    }
                    className="w-full px-3 py-2 bg-[#051322] border border-white/15 rounded-lg text-white"
                  >
                    {DOC_CATEGORIES.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 mb-1">File Type</label>
                  <select
                    value={newDocForm.fileType}
                    onChange={(e) => setNewDocForm({ ...newDocForm, fileType: e.target.value as any })}
                    className="w-full px-3 py-2 bg-[#051322] border border-white/15 rounded-lg text-white"
                  >
                    <option value="PDF">PDF (Recommended)</option>
                    <option value="PPTX">PPTX (Presentation)</option>
                    <option value="DOCX">DOCX (Report)</option>
                    <option value="ZIP">ZIP (Drawings Archive)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 mb-1">Version</label>
                  <input
                    type="text"
                    value={newDocForm.version}
                    onChange={(e) => setNewDocForm({ ...newDocForm, version: e.target.value })}
                    placeholder="v1.0"
                    className="w-full px-3 py-2 bg-[#051322] border border-white/15 rounded-lg text-white font-mono"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 mb-1">Simulated Size</label>
                  <input
                    type="text"
                    value={newDocForm.fileSize}
                    onChange={(e) => setNewDocForm({ ...newDocForm, fileSize: e.target.value })}
                    className="w-full px-3 py-2 bg-[#051322] border border-white/15 rounded-lg text-white font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 mb-1">Description / Table of Contents</label>
                <textarea
                  rows={2}
                  value={newDocForm.description}
                  onChange={(e) => setNewDocForm({ ...newDocForm, description: e.target.value })}
                  placeholder="Summary of document sections and engineering highlights..."
                  className="w-full px-3 py-2 bg-[#051322] border border-white/15 rounded-lg text-white"
                />
              </div>

              <div className="space-y-2 pt-2 border-t border-white/10">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="doc-dl-enabled"
                    checked={newDocForm.publicDownloadEnabled}
                    onChange={(e) =>
                      setNewDocForm({ ...newDocForm, publicDownloadEnabled: e.target.checked })
                    }
                    className="w-4 h-4 rounded text-[#C6922D]"
                  />
                  <label htmlFor="doc-dl-enabled" className="text-white">
                    Enable direct public download on website
                  </label>
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="doc-require-contact"
                    checked={newDocForm.requireContactForDownload}
                    onChange={(e) =>
                      setNewDocForm({ ...newDocForm, requireContactForDownload: e.target.checked })
                    }
                    className="w-4 h-4 rounded text-[#C6922D]"
                  />
                  <label htmlFor="doc-require-contact" className="text-slate-300">
                    Require professional contact details before download (Lead Gate)
                  </label>
                </div>
              </div>

              <div className="pt-4 flex items-center justify-end gap-2 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setUploadDocModalOpen(false)}
                  className="px-4 py-2 rounded-lg bg-white/5 text-slate-300 hover:bg-white/10"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleAddDocumentToProject}
                  className="px-5 py-2 rounded-lg bg-[#C6922D] hover:bg-[#e5b95d] text-[#071A2F] font-bold flex items-center gap-1"
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Attach Document</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ---------------------------------------------------- */}
      {/* MODAL: ADD GALLERY ITEM */}
      {/* ---------------------------------------------------- */}
      {uploadGalleryModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
          <div className="bg-[#09223d] border border-[#C6922D]/40 rounded-2xl p-6 sm:p-8 max-w-md w-full shadow-2xl space-y-4">
            <div className="flex items-start justify-between border-b border-white/10 pb-3">
              <h3 className="text-lg font-serif text-white">Add Project Media / Photo</h3>
              <button
                onClick={() => setUploadGalleryModalOpen(false)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-300 mb-1">Image URL *</label>
                <input
                  type="text"
                  required
                  value={newGalleryForm.url}
                  onChange={(e) => setNewGalleryForm({ ...newGalleryForm, url: e.target.value })}
                  placeholder="https://images.unsplash.com/photo-..."
                  className="w-full px-3 py-2 bg-[#051322] border border-white/15 rounded-lg text-white font-mono"
                />
              </div>

              <div>
                <label className="block text-slate-300 mb-1">Category</label>
                <select
                  value={newGalleryForm.category}
                  onChange={(e) =>
                    setNewGalleryForm({
                      ...newGalleryForm,
                      category: e.target.value as any,
                    })
                  }
                  className="w-full px-3 py-2 bg-[#051322] border border-white/15 rounded-lg text-white"
                >
                  <option value="Architecture">Architecture</option>
                  <option value="Interior">Interior</option>
                  <option value="Exterior">Exterior</option>
                  <option value="Construction">Construction</option>
                  <option value="Site">Site</option>
                  <option value="Concept">Concept</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-300 mb-1">Caption / Description</label>
                <input
                  type="text"
                  value={newGalleryForm.caption}
                  onChange={(e) => setNewGalleryForm({ ...newGalleryForm, caption: e.target.value })}
                  placeholder="e.g. Master living wing with expansive glazing"
                  className="w-full px-3 py-2 bg-[#051322] border border-white/15 rounded-lg text-white"
                />
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="is-hero-check"
                  checked={newGalleryForm.isHero}
                  onChange={(e) => setNewGalleryForm({ ...newGalleryForm, isHero: e.target.checked })}
                  className="w-4 h-4 rounded text-[#C6922D]"
                />
                <label htmlFor="is-hero-check" className="text-white">
                  Set as primary Cover / Hero Image
                </label>
              </div>

              <div className="pt-4 flex items-center justify-end gap-2 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setUploadGalleryModalOpen(false)}
                  className="px-4 py-2 rounded-lg bg-white/5 text-slate-300 hover:bg-white/10"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleAddGalleryItem}
                  className="px-5 py-2 rounded-lg bg-[#C6922D] hover:bg-[#e5b95d] text-[#071A2F] font-bold"
                >
                  Add Media
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ---------------------------------------------------- */}
      {/* MODAL: LIVE PREVIEW MODAL */}
      {/* ---------------------------------------------------- */}
      {previewProjectModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-in fade-in">
          <div className="bg-[#071A2F] border border-[#C6922D]/40 rounded-3xl p-6 sm:p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl space-y-6">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded text-[10px] font-bold uppercase bg-[#C6922D] text-[#071A2F]">
                  Public Website Preview
                </span>
                <span className="text-xs text-slate-400">
                  State: {previewProjectModal.publicationState}
                </span>
              </div>
              <button
                onClick={() => setPreviewProjectModal(null)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="aspect-[16/9] rounded-2xl overflow-hidden bg-slate-900">
              <img
                src={previewProjectModal.coverImage}
                alt=""
                className="w-full h-full object-cover"
              />
            </div>

            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-[#e5b95d] mb-2">
                <span>{previewProjectModal.category}</span>
                <span>•</span>
                <span>{previewProjectModal.status}</span>
                <span>•</span>
                <span>{previewProjectModal.publicLocation}</span>
              </div>

              <h2 className="text-3xl font-serif text-white mb-3">
                {previewProjectModal.title}
              </h2>

              <p className="text-sm text-slate-300 leading-relaxed mb-6 font-sans-body">
                {previewProjectModal.description || previewProjectModal.summary}
              </p>

              <div className="bg-[#051322] p-4 rounded-xl space-y-2 text-xs border border-white/5">
                <div className="font-bold text-white mb-2 uppercase text-[10px] tracking-wider text-[#e5b95d]">
                  Available Public Download Materials:
                </div>
                {previewProjectModal.publicDocuments?.map((doc) => (
                  <div key={doc.publicDocumentId} className="flex justify-between items-center py-1">
                    <span className="text-slate-200">{doc.title} ({doc.fileSize})</span>
                    <span className="text-[#C6922D] font-mono">{doc.category}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 flex items-center justify-end gap-3 border-t border-white/10">
              <button
                onClick={() => setPreviewProjectModal(null)}
                className="px-4 py-2 rounded-lg bg-white/5 text-slate-300 text-xs hover:bg-white/10"
              >
                Close Preview
              </button>
              {previewProjectModal.publicationState !== 'PUBLISHED' && (
                <button
                  onClick={() => {
                    handleSetState(
                      previewProjectModal.publicProjectId,
                      'PUBLISHED',
                      'Published from preview inspection modal.'
                    );
                    setPreviewProjectModal(null);
                  }}
                  className="px-5 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs"
                >
                  Approve & Publish Now
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
