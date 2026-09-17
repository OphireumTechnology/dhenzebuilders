import React, { useState, useEffect } from 'react';
import {
  PublicProjectRecord,
  PublicDocumentRecord,
  PublicGalleryItem,
  GalleryCategory,
} from '../../types/publicProjectTypes';
import { INITIAL_PUBLIC_PROJECTS } from '../../data/publicProjectSeedData';
import {
  ArrowLeft,
  MapPin,
  Calendar,
  CheckCircle2,
  Download,
  Eye,
  Share2,
  Copy,
  Check,
  Building2,
  FileText,
  Sparkles,
  ShieldCheck,
  Info,
  ExternalLink,
  Lock,
  ArrowRight,
  Maximize2,
  X,
  Clock,
  Layers,
  Award,
} from 'lucide-react';

interface ProjectDetailPageProps {
  projectSlug: string;
  onNavigate: (view: string) => void;
}

export const ProjectDetailPage: React.FC<ProjectDetailPageProps> = ({
  projectSlug,
  onNavigate,
}) => {
  const [project, setProject] = useState<PublicProjectRecord | null>(null);
  const [allProjects, setAllProjects] = useState<PublicProjectRecord[]>(INITIAL_PUBLIC_PROJECTS);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedGalleryCategory, setSelectedGalleryCategory] = useState<GalleryCategory>('All');
  const [activeLightboxMedia, setActiveLightboxMedia] = useState<PublicGalleryItem | null>(null);
  const [previewDocModal, setPreviewDocModal] = useState<PublicDocumentRecord | null>(null);
  const [gatedDocModal, setGatedDocModal] = useState<PublicDocumentRecord | null>(null);
  const [gatedForm, setGatedForm] = useState({
    name: '',
    email: '',
    company: '',
    purpose: '',
  });
  const [copyFeedback, setCopyFeedback] = useState<boolean>(false);

  // Fetch project by slug or ID
  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    fetch(`/api/public-projects/${projectSlug}`)
      .then((res) => (res.ok ? res.json() : Promise.reject(res)))
      .then((data) => {
        if (isMounted && data?.title) {
          setProject(data);
        }
      })
      .catch(() => {
        // Fallback to seed data search
        const found = INITIAL_PUBLIC_PROJECTS.find(
          (p) =>
            p.slug === projectSlug ||
            p.publicProjectId === projectSlug ||
            p.title.toLowerCase().replace(/\s+/g, '-').includes(projectSlug.toLowerCase())
        );
        if (isMounted) setProject(found || INITIAL_PUBLIC_PROJECTS[0]);
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    // Also fetch all published projects for related list
    fetch('/api/public-projects')
      .then((res) => (res.ok ? res.json() : Promise.reject(res)))
      .then((data) => {
        if (isMounted && data?.projects && Array.isArray(data.projects)) {
          setAllProjects(data.projects);
        }
      })
      .catch(() => {
        // Ignore fallback
      });

    return () => {
      isMounted = false;
    };
  }, [projectSlug]);

  // Update dynamic SEO & Structured Data
  useEffect(() => {
    if (project) {
      document.title = `${project.title} | Project Library | LDL Dhenze`;
      const descEl = document.querySelector('meta[name="description"]');
      if (descEl) descEl.setAttribute('content', project.summary);

      // JSON-LD Schema.org Structured Data
      const schemaScriptId = 'project-jsonld-schema';
      let script = document.getElementById(schemaScriptId) as HTMLScriptElement | null;
      if (!script) {
        script = document.createElement('script');
        script.id = schemaScriptId;
        script.type = 'application/ld+json';
        document.head.appendChild(script);
      }
      script.text = JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'RealEstateListing',
        name: project.title,
        description: project.summary,
        category: project.category,
        image: project.coverImage,
        location: {
          '@type': 'Place',
          name: project.publicLocation,
        },
        provider: {
          '@type': 'Organization',
          name: 'LDL Dhenze Residential Building Construction OPC',
          url: 'https://dhenzebuilder.com',
        },
      });
    }
  }, [project]);

  if (loading && !project) {
    return (
      <div className="min-h-screen bg-[#071A2F] text-slate-100 flex items-center justify-center pt-24">
        <div className="text-center">
          <div className="w-10 h-10 border-2 border-[#C6922D] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-xs text-slate-400 font-mono">Loading Project Publication...</p>
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-[#071A2F] text-slate-100 flex items-center justify-center pt-24 px-4">
        <div className="text-center max-w-md bg-[#061325] border border-white/10 p-8 rounded-2xl">
          <Building2 className="w-12 h-12 text-slate-500 mx-auto mb-4" />
          <h2 className="font-serif-display text-2xl text-white mb-2">Project Not Found</h2>
          <p className="text-xs text-slate-300 mb-6 font-sans-body leading-relaxed">
            The requested project could not be located in our public library. It may be restricted or undergoing executive review.
          </p>
          <button
            onClick={() => onNavigate('projects')}
            className="px-5 py-2.5 bg-[#C6922D] text-[#071A2F] font-bold text-xs rounded-xl"
          >
            ← Back to Project Library
          </button>
        </div>
      </div>
    );
  }

  // Filter gallery items by selected category
  const filteredGallery = project.gallery?.filter((item) => {
    if (selectedGalleryCategory === 'All') return true;
    return item.category === selectedGalleryCategory;
  }) || [];

  // Related projects
  const relatedProjects = allProjects
    .filter((p) => p.publicProjectId !== project.publicProjectId)
    .slice(0, 3);

  // Share handler
  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: project.title,
          text: project.summary,
          url: window.location.href,
        })
        .catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopyFeedback(true);
      setTimeout(() => setCopyFeedback(false), 2500);
    }
  };

  // Trigger file download
  const handleDownloadFile = (doc: PublicDocumentRecord) => {
    if (doc.requireContactForDownload) {
      setGatedDocModal(doc);
      return;
    }
    window.open(`/api/public-projects/documents/${doc.publicDocumentId}/download`, '_blank');
  };

  const handleGatedSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!gatedDocModal) return;

    fetch(`/api/public-projects/documents/${gatedDocModal.publicDocumentId}/gated-download`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(gatedForm),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.downloadUrl) {
          window.open(data.downloadUrl, '_blank');
        }
        setGatedDocModal(null);
      })
      .catch(() => {
        window.open(
          `/api/public-projects/documents/${gatedDocModal.publicDocumentId}/download`,
          '_blank'
        );
        setGatedDocModal(null);
      });
  };

  return (
    <div className="min-h-screen bg-[#071A2F] text-slate-100 selection:bg-[#C6922D] selection:text-[#071A2F]">
      {/* ---------------------------------------------------- */}
      {/* 1. TOP BREADCRUMB & ACTIONS BAR */}
      {/* ---------------------------------------------------- */}
      <div className="pt-28 pb-4 border-b border-white/5 bg-[#061325]/80 backdrop-blur-md sticky top-[76px] z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <button
            onClick={() => onNavigate('projects')}
            className="inline-flex items-center text-xs tracking-wider uppercase text-[#C6922D] hover:text-[#e5b95d] transition-colors font-medium"
          >
            <ArrowLeft className="w-4 h-4 mr-1.5" /> Back to Project Library
          </button>

          <div className="flex items-center gap-3">
            <button
              onClick={handleShare}
              className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-xs text-slate-200 flex items-center gap-1.5 transition-colors"
              title="Share Project"
            >
              {copyFeedback ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400 font-medium">Link Copied</span>
                </>
              ) : (
                <>
                  <Share2 className="w-3.5 h-3.5 text-[#C6922D]" />
                  <span>Share Project</span>
                </>
              )}
            </button>

            <button
              onClick={() => onNavigate('start-project')}
              className="hidden sm:inline-flex px-4 py-1.5 rounded-lg bg-[#C6922D] hover:bg-[#e5b95d] text-[#071A2F] text-xs font-bold transition-all items-center gap-1.5"
            >
              <span>Discuss Similar Scope</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* ---------------------------------------------------- */}
      {/* 2. PROJECT HERO SECTION */}
      {/* ---------------------------------------------------- */}
      <section className="py-12 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Left Header Info */}
            <div className="lg:col-span-7">
              {/* Badges */}
              <div className="flex flex-wrap items-center gap-2.5 mb-4">
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-[#C6922D]/20 text-[#e5b95d] border border-[#C6922D]/40">
                  {project.status}
                </span>
                <span className="px-3 py-1 rounded-full text-xs font-medium bg-white/5 text-slate-200 border border-white/10">
                  {project.category}
                </span>
                {project.publicLocation && (
                  <span className="text-xs text-slate-400 flex items-center gap-1 font-mono">
                    <MapPin className="w-3.5 h-3.5 text-[#C6922D]" />
                    {project.publicLocation}
                  </span>
                )}
              </div>

              {/* Title */}
              <h1 className="font-serif-display text-3xl sm:text-5xl lg:text-6xl text-white font-normal tracking-tight leading-[1.1] mb-6">
                {project.title}
              </h1>

              {/* Summary */}
              <p className="font-sans-body text-base sm:text-lg text-slate-300 leading-relaxed font-normal mb-8">
                {project.summary}
              </p>

              {/* Quick Metrics */}
              {project.verifiedMetrics && project.verifiedMetrics.length > 0 && (
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 border-t border-white/10">
                  {project.verifiedMetrics.map((metric, idx) => (
                    <div key={idx} className="bg-[#061325] border border-white/10 rounded-xl p-3">
                      <span className="text-[10px] uppercase font-semibold text-slate-400 tracking-wider block mb-1">
                        {metric.label}
                      </span>
                      <span className="text-xs sm:text-sm font-bold text-white block truncate">
                        {metric.value}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Right Hero Image Card */}
            <div className="lg:col-span-5">
              <div className="relative rounded-2xl overflow-hidden border border-white/15 shadow-2xl bg-slate-900 group">
                <img
                  src={project.coverImage}
                  alt={project.title}
                  className="w-full aspect-[4/3] object-cover"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src = '/assets/images/solar-storage.jpg';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />

                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-slate-200">
                  <span className="font-mono text-[11px] bg-black/70 backdrop-blur-md px-3 py-1 rounded-lg border border-white/10">
                    Official Project Record
                  </span>
                  {project.publishedAt && (
                    <span className="text-[11px] text-slate-400 flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {new Date(project.publishedAt).toLocaleDateString('en-US', {
                        month: 'short',
                        year: 'numeric',
                      })}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------- */}
      {/* 3. PROJECT OVERVIEW & SCOPE */}
      {/* ---------------------------------------------------- */}
      <section className="py-16 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Left Column: Full Description & Objectives */}
            <div className="lg:col-span-8 space-y-12">
              {/* Detailed Description */}
              <div>
                <h2 className="font-serif-display text-2xl text-white font-normal mb-4">
                  Project Overview
                </h2>
                <div className="prose prose-invert max-w-none text-slate-300 text-sm sm:text-base leading-relaxed space-y-4 font-sans-body">
                  <p>{project.description || project.summary}</p>
                </div>
              </div>

              {/* Objectives */}
              {project.projectObjectives && project.projectObjectives.length > 0 && (
                <div className="bg-[#061325] border border-white/10 rounded-2xl p-6 sm:p-8">
                  <h3 className="text-xs uppercase tracking-widest font-bold text-[#e5b95d] mb-4 flex items-center gap-2">
                    <Award className="w-4 h-4 text-[#C6922D]" />
                    <span>Key Development Objectives</span>
                  </h3>
                  <div className="grid grid-cols-1 gap-3">
                    {project.projectObjectives.map((obj, idx) => (
                      <div key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-slate-300">
                        <CheckCircle2 className="w-4 h-4 text-[#C6922D] shrink-0 mt-0.5" />
                        <span>{obj}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Scope of Execution */}
              {project.projectScope && project.projectScope.length > 0 && (
                <div>
                  <h3 className="font-serif-display text-2xl text-white font-normal mb-4">
                    Technical Scope of Execution
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {project.projectScope.map((scopeItem, idx) => (
                      <div
                        key={idx}
                        className="bg-[#081F38] border border-white/10 rounded-xl p-4 flex items-start gap-3"
                      >
                        <CheckCircle2 className="w-4 h-4 text-[#C6922D] shrink-0 mt-0.5" />
                        <span className="text-xs sm:text-sm text-slate-200 leading-snug">
                          {scopeItem}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right Column: Project Information Specifications Card */}
            <div className="lg:col-span-4">
              <div className="bg-[#061325] border border-white/15 rounded-2xl p-6 shadow-xl sticky top-32 space-y-6">
                <div>
                  <h3 className="text-xs uppercase tracking-widest font-bold text-[#e5b95d] mb-4 flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-[#C6922D]" />
                    <span>Project Information</span>
                  </h3>
                </div>

                <div className="space-y-4 text-xs">
                  <div className="flex justify-between py-2 border-b border-white/5">
                    <span className="text-slate-400">Classification:</span>
                    <span className="text-white font-semibold">{project.category}</span>
                  </div>

                  <div className="flex justify-between py-2 border-b border-white/5">
                    <span className="text-slate-400">Milestone Stage:</span>
                    <span className="text-[#e5b95d] font-semibold">{project.status}</span>
                  </div>

                  <div className="flex justify-between py-2 border-b border-white/5">
                    <span className="text-slate-400">Location:</span>
                    <span className="text-white text-right max-w-[180px]">{project.publicLocation}</span>
                  </div>

                  {project.completionDate && (
                    <div className="flex justify-between py-2 border-b border-white/5">
                      <span className="text-slate-400">Target / Completed:</span>
                      <span className="text-white">{project.completionDate}</span>
                    </div>
                  )}

                  {project.projectSize && (
                    <div className="flex justify-between py-2 border-b border-white/5">
                      <span className="text-slate-400">Project Dimension:</span>
                      <span className="text-white">{project.projectSize}</span>
                    </div>
                  )}

                  {project.clientName && (
                    <div className="flex justify-between py-2 border-b border-white/5">
                      <span className="text-slate-400">Client Disclosure:</span>
                      <span className="text-slate-300 text-right max-w-[180px] truncate">
                        {project.clientName}
                      </span>
                    </div>
                  )}

                  <div className="flex justify-between py-2 border-b border-white/5">
                    <span className="text-slate-400">Statutory Framework:</span>
                    <span className="text-[#C6922D] font-mono">RA 9266 / PSIC 42900</span>
                  </div>
                </div>

                {/* Professional Practice Notice */}
                <div className="p-3.5 bg-white/5 rounded-xl border border-white/10 text-[11px] text-slate-300 leading-relaxed flex items-start gap-2.5">
                  <ShieldCheck className="w-4 h-4 text-[#C6922D] shrink-0 mt-0.5" />
                  <div>
                    <strong>Statutory Practice Notice:</strong> All engineering and architectural documents are certified and sealed by PRC-licensed partner professionals.
                  </div>
                </div>

                <button
                  onClick={() => onNavigate('start-project')}
                  className="w-full py-3 bg-[#C6922D] hover:bg-[#e5b95d] text-[#071A2F] font-bold text-xs uppercase tracking-wider rounded-xl transition-colors shadow-lg flex items-center justify-center gap-2"
                >
                  <span>Inquire for Similar Project</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------- */}
      {/* 4. PROJECT MEDIA & GALLERY */}
      {/* ---------------------------------------------------- */}
      {project.gallery && project.gallery.length > 0 && (
        <section className="py-16 border-b border-white/10 bg-[#061325]/40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
              <div>
                <span className="text-xs font-semibold uppercase tracking-widest text-[#e5b95d] mb-1 block">
                  Visual Documentation
                </span>
                <h2 className="font-serif-display text-2xl sm:text-3xl text-white font-normal">
                  Project Gallery & Visual Studies
                </h2>
              </div>

              {/* Gallery Filter Categories */}
              <div className="flex flex-wrap items-center gap-1.5">
                {(['All', 'Architecture', 'Interior', 'Exterior', 'Construction', 'Site', 'Concept'] as GalleryCategory[]).map(
                  (cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedGalleryCategory(cat)}
                      className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${
                        selectedGalleryCategory === cat
                          ? 'bg-[#C6922D] text-[#071A2F] font-bold'
                          : 'bg-white/5 hover:bg-white/10 text-slate-300 border border-white/5'
                      }`}
                    >
                      {cat}
                    </button>
                  )
                )}
              </div>
            </div>

            {/* Gallery Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredGallery.map((item) => (
                <div
                  key={item.id}
                  onClick={() => setActiveLightboxMedia(item)}
                  className="group cursor-pointer bg-[#081F38] border border-white/10 hover:border-[#C6922D]/40 rounded-xl overflow-hidden shadow-lg transition-all hover:-translate-y-1"
                >
                  <div className="relative aspect-[16/10] overflow-hidden bg-slate-900">
                    <img
                      src={item.url}
                      alt={item.caption || project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).src =
                          '/assets/images/solar-storage.jpg';
                      }}
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <span className="p-2.5 rounded-full bg-black/60 text-white backdrop-blur-sm">
                        <Maximize2 className="w-5 h-5" />
                      </span>
                    </div>
                    <div className="absolute top-2.5 left-2.5">
                      <span className="px-2 py-0.5 rounded text-[10px] font-semibold uppercase bg-black/70 text-slate-200 backdrop-blur-sm border border-white/10">
                        {item.category}
                      </span>
                    </div>
                  </div>
                  {item.caption && (
                    <div className="p-3.5 text-xs text-slate-300 line-clamp-2 leading-relaxed font-sans-body">
                      {item.caption}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ---------------------------------------------------- */}
      {/* 5. DOWNLOAD CENTER & APPROVED MATERIALS */}
      {/* ---------------------------------------------------- */}
      <section id="download-center" className="py-16 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-8">
            <span className="text-xs font-semibold uppercase tracking-widest text-[#e5b95d] mb-1 block">
              Download Center
            </span>
            <h2 className="font-serif-display text-2xl sm:text-3xl text-white font-normal mb-3">
              Approved Project Documents & Publications
            </h2>
            <p className="font-sans-body text-xs sm:text-sm text-slate-300 leading-relaxed">
              Official publications, presentations, profiles, and technical briefs approved by LDL Dhenze project governance for public distribution.
            </p>
          </div>

          {project.publicDocuments && project.publicDocuments.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {project.publicDocuments.map((doc) => (
                <div
                  key={doc.publicDocumentId}
                  className="bg-[#081F38] border border-white/10 hover:border-[#C6922D]/40 rounded-xl p-6 flex flex-col justify-between shadow-xl transition-all group"
                >
                  <div>
                    {/* File Header */}
                    <div className="flex items-start justify-between gap-3 mb-4">
                      <div className="w-10 h-10 rounded-lg bg-[#C6922D]/15 border border-[#C6922D]/30 flex items-center justify-center shrink-0">
                        <FileText className="w-5 h-5 text-[#C6922D]" />
                      </div>
                      <div className="text-right">
                        <span className="inline-block px-2 py-0.5 rounded text-[10px] font-mono font-semibold bg-white/5 text-slate-300 border border-white/10">
                          {doc.fileType} • {doc.fileSize}
                        </span>
                        <div className="text-[10px] font-mono text-slate-400 mt-1">
                          Version: {doc.version}
                        </div>
                      </div>
                    </div>

                    <span className="text-[10px] uppercase font-bold text-[#e5b95d] tracking-wider block mb-1">
                      {doc.category}
                    </span>

                    <h4 className="font-serif-display text-lg text-white font-normal mb-2 leading-snug group-hover:text-[#e5b95d] transition-colors">
                      {doc.title}
                    </h4>

                    <p className="text-xs text-slate-300 leading-relaxed font-sans-body mb-6">
                      {doc.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-white/10 flex items-center justify-between gap-2">
                    {/* Preview Button */}
                    <button
                      onClick={() => setPreviewDocModal(doc)}
                      className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-xs text-slate-200 inline-flex items-center gap-1.5 transition-colors"
                    >
                      <Eye className="w-3.5 h-3.5 text-[#C6922D]" />
                      <span>Preview</span>
                    </button>

                    {/* Download Button */}
                    {doc.publicDownloadEnabled ? (
                      <button
                        onClick={() => handleDownloadFile(doc)}
                        className="px-4 py-1.5 rounded-lg bg-[#C6922D] hover:bg-[#e5b95d] text-[#071A2F] text-xs font-bold inline-flex items-center gap-1.5 transition-colors shadow-md"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>Download</span>
                      </button>
                    ) : (
                      <span className="text-[11px] font-mono text-slate-400 flex items-center gap-1">
                        <Lock className="w-3 h-3" />
                        <span>Preview Only</span>
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-8 bg-[#061325] border border-white/10 rounded-2xl text-center max-w-lg mx-auto">
              <FileText className="w-10 h-10 text-slate-500 mx-auto mb-3 stroke-1" />
              <h4 className="text-sm font-serif text-white mb-1">No Public Files Released</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Project materials for this undertaking are presently restricted or undergoing statutory review.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* ---------------------------------------------------- */}
      {/* 6. RELATED PROJECTS */}
      {/* ---------------------------------------------------- */}
      {relatedProjects.length > 0 && (
        <section className="py-16 border-b border-white/10 bg-[#061325]/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-8">
              <div>
                <span className="text-xs font-semibold uppercase tracking-widest text-[#e5b95d] mb-1 block">
                  More Publications
                </span>
                <h2 className="font-serif-display text-2xl sm:text-3xl text-white font-normal">
                  Related Projects & Developments
                </h2>
              </div>
              <button
                onClick={() => onNavigate('projects')}
                className="text-xs text-[#C6922D] hover:underline font-semibold flex items-center gap-1"
              >
                <span>View Full Library</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedProjects.map((rp) => (
                <div
                  key={rp.publicProjectId}
                  onClick={() => onNavigate(`projects/${rp.slug || rp.publicProjectId}`)}
                  className="group cursor-pointer bg-[#081F38] border border-white/10 hover:border-[#C6922D]/40 rounded-xl overflow-hidden transition-all flex flex-col justify-between"
                >
                  <div className="relative aspect-[16/10] overflow-hidden bg-slate-900">
                    <img
                      src={rp.coverImage}
                      alt={rp.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).src =
                          '/assets/images/solar-storage.jpg';
                      }}
                    />
                    <div className="absolute top-2.5 left-2.5">
                      <span className="px-2 py-0.5 rounded text-[10px] font-semibold uppercase bg-[#071A2F]/90 text-[#e5b95d] border border-[#C6922D]/30 backdrop-blur-sm">
                        {rp.status}
                      </span>
                    </div>
                  </div>
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="text-[11px] font-mono text-[#e5b95d] mb-1">
                        {rp.category}
                      </div>
                      <h3 className="font-serif-display text-lg text-white font-normal group-hover:text-[#e5b95d] transition-colors mb-2">
                        {rp.title}
                      </h3>
                      <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
                        {rp.summary}
                      </p>
                    </div>
                    <div className="pt-3 border-t border-white/5 text-right text-xs text-[#C6922D] font-medium flex items-center justify-end gap-1">
                      <span>View Specifications</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ---------------------------------------------------- */}
      {/* 7. BOTTOM CALL TO ACTION: START A PROJECT */}
      {/* ---------------------------------------------------- */}
      <section className="py-20 bg-gradient-to-b from-[#071A2F] to-[#051322]">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="font-serif-display text-3xl sm:text-4xl text-white font-normal mb-4">
            Interested in a Similar Project?
          </h2>
          <p className="font-sans-body text-sm sm:text-base text-slate-300 mb-8 leading-relaxed">
            Tell us about your proposed development and our team can review your requirements, regulatory requirements, and technical scope.
          </p>
          <button
            onClick={() => onNavigate('start-project')}
            className="px-8 py-3.5 bg-[#C6922D] hover:bg-[#e5b95d] text-[#071A2F] font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-xl inline-flex items-center gap-2"
          >
            <span>Start a Project</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>

      {/* ---------------------------------------------------- */}
      {/* MODAL: DOCUMENT PREVIEW */}
      {/* ---------------------------------------------------- */}
      {previewDocModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
          <div className="bg-[#09223d] border border-[#C6922D]/40 rounded-2xl p-6 sm:p-8 max-w-xl w-full shadow-2xl space-y-5">
            <div className="flex items-start justify-between border-b border-white/10 pb-4">
              <div>
                <span className="text-[11px] font-mono text-[#e5b95d] uppercase tracking-wider">
                  {previewDocModal.category} • {previewDocModal.version}
                </span>
                <h3 className="text-xl font-serif text-white font-normal mt-1">
                  {previewDocModal.title}
                </h3>
              </div>
              <button
                onClick={() => setPreviewDocModal(null)}
                className="text-slate-400 hover:text-white p-1"
                aria-label="Close Preview"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="bg-[#051322] border border-white/5 rounded-xl p-4 text-xs space-y-2">
              <div className="flex justify-between">
                <span className="text-slate-400">File Type:</span>
                <span className="text-white font-mono">{previewDocModal.fileType} Document</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">File Size:</span>
                <span className="text-white font-mono">{previewDocModal.fileSize}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Document Date:</span>
                <span className="text-white">{previewDocModal.documentDate}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Governance Status:</span>
                <span className="text-emerald-400 font-semibold">Approved for Public Release</span>
              </div>
            </div>

            <div>
              <h4 className="text-xs uppercase font-bold text-slate-300 tracking-wider mb-2">
                Executive Content Summary:
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed font-sans-body bg-white/5 p-4 rounded-xl border border-white/5">
                {previewDocModal.summaryPreview || previewDocModal.description}
              </p>
            </div>

            <div className="pt-4 flex items-center justify-end gap-3 border-t border-white/10">
              <button
                onClick={() => setPreviewDocModal(null)}
                className="px-4 py-2 rounded-lg text-xs font-semibold bg-white/5 text-slate-300 hover:bg-white/10"
              >
                Close Preview
              </button>
              {previewDocModal.publicDownloadEnabled && (
                <button
                  onClick={() => {
                    handleDownloadFile(previewDocModal);
                    setPreviewDocModal(null);
                  }}
                  className="px-5 py-2 rounded-lg text-xs font-bold bg-[#C6922D] text-[#071A2F] hover:bg-[#e5b95d] flex items-center gap-1.5"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download File ({previewDocModal.fileSize})</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ---------------------------------------------------- */}
      {/* MODAL: GATED DOWNLOAD CONTACT FORM */}
      {/* ---------------------------------------------------- */}
      {gatedDocModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
          <div className="bg-[#09223d] border border-[#C6922D]/40 rounded-2xl p-6 sm:p-8 max-w-md w-full shadow-2xl">
            <div className="flex items-start justify-between border-b border-white/10 pb-4 mb-4">
              <div>
                <span className="text-[11px] font-mono text-[#e5b95d] uppercase tracking-wider">
                  Verified Download Access
                </span>
                <h3 className="text-lg font-serif text-white font-normal mt-1">
                  Download {gatedDocModal.title}
                </h3>
              </div>
              <button
                onClick={() => setGatedDocModal(null)}
                className="text-slate-400 hover:text-white p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed mb-4">
              Please provide your professional contact information to receive this approved technical document.
            </p>

            <form onSubmit={handleGatedSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-300 mb-1">Full Name *</label>
                <input
                  type="text"
                  required
                  value={gatedForm.name}
                  onChange={(e) => setGatedForm({ ...gatedForm, name: e.target.value })}
                  placeholder="Engr. Juan Dela Cruz"
                  className="w-full px-3 py-2 bg-[#051322] border border-white/15 rounded-lg text-white"
                />
              </div>

              <div>
                <label className="block text-slate-300 mb-1">Professional Email *</label>
                <input
                  type="email"
                  required
                  value={gatedForm.email}
                  onChange={(e) => setGatedForm({ ...gatedForm, email: e.target.value })}
                  placeholder="jdelacruz@organization.com"
                  className="w-full px-3 py-2 bg-[#051322] border border-white/15 rounded-lg text-white"
                />
              </div>

              <div>
                <label className="block text-slate-300 mb-1">Organization / Developer Name</label>
                <input
                  type="text"
                  value={gatedForm.company}
                  onChange={(e) => setGatedForm({ ...gatedForm, company: e.target.value })}
                  placeholder="e.g. Apex Landholdings Corp."
                  className="w-full px-3 py-2 bg-[#051322] border border-white/15 rounded-lg text-white"
                />
              </div>

              <div>
                <label className="block text-slate-300 mb-1">Intended Purpose</label>
                <select
                  value={gatedForm.purpose}
                  onChange={(e) => setGatedForm({ ...gatedForm, purpose: e.target.value })}
                  className="w-full px-3 py-2 bg-[#051322] border border-white/15 rounded-lg text-white"
                >
                  <option value="Development Feasibility">Development Feasibility</option>
                  <option value="Architectural Benchmarking">Architectural Benchmarking</option>
                  <option value="Commercial Leasing Inquiry">Commercial Leasing Inquiry</option>
                  <option value="Subcontractor / Supplier Evaluation">Subcontractor / Supplier Evaluation</option>
                  <option value="Academic Research">Academic Research</option>
                </select>
              </div>

              <div className="pt-4 flex items-center justify-end gap-2 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setGatedDocModal(null)}
                  className="px-4 py-2 rounded-lg bg-white/5 text-slate-300 hover:bg-white/10"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-lg bg-[#C6922D] hover:bg-[#e5b95d] text-[#071A2F] font-bold flex items-center gap-1.5"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download Now</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ---------------------------------------------------- */}
      {/* MODAL: LIGHTBOX MEDIA VIEWER */}
      {/* ---------------------------------------------------- */}
      {activeLightboxMedia && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-in fade-in">
          <div className="max-w-4xl w-full relative">
            <button
              onClick={() => setActiveLightboxMedia(null)}
              className="absolute -top-10 right-0 text-slate-400 hover:text-white p-2 flex items-center gap-1 text-xs"
            >
              <X className="w-5 h-5" />
              <span>Close</span>
            </button>

            <div className="rounded-2xl overflow-hidden border border-white/15 bg-black shadow-2xl">
              <img
                src={activeLightboxMedia.url}
                alt={activeLightboxMedia.caption || project.title}
                className="w-full max-h-[75vh] object-contain mx-auto"
                referrerPolicy="no-referrer"
              />
            </div>

            {activeLightboxMedia.caption && (
              <div className="mt-3 text-center text-xs text-slate-300 font-sans-body">
                <span className="font-semibold text-[#e5b95d] mr-2">
                  [{activeLightboxMedia.category}]
                </span>
                {activeLightboxMedia.caption}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
