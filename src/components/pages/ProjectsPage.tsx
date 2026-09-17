import React, { useState, useEffect, useMemo } from 'react';
import {
  PublicProjectRecord,
  PublicProjectCategory,
} from '../../types/publicProjectTypes';
import { INITIAL_PUBLIC_PROJECTS } from '../../data/publicProjectSeedData';
import {
  Search,
  Filter,
  ArrowRight,
  Download,
  MapPin,
  Calendar,
  Building2,
  CheckCircle2,
  Info,
  Sparkles,
  FileText,
  Clock,
  ArrowUpRight,
  ChevronDown,
} from 'lucide-react';

interface ProjectsPageProps {
  onNavigate: (view: string) => void;
}

const CATEGORIES: PublicProjectCategory[] = [
  'All',
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

type SortOption = 'newest' | 'oldest' | 'az' | 'updated';

export const ProjectsPage: React.FC<ProjectsPageProps> = ({ onNavigate }) => {
  const [projects, setProjects] = useState<PublicProjectRecord[]>(INITIAL_PUBLIC_PROJECTS);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<PublicProjectCategory>('All');
  const [selectedSort, setSelectedSort] = useState<SortOption>('newest');
  const [mobileCategoryOpen, setMobileCategoryOpen] = useState<boolean>(false);

  // Fetch approved published projects from the server repository
  useEffect(() => {
    let isMounted = true;
    fetch('/api/public-projects')
      .then((res) => (res.ok ? res.json() : Promise.reject(res)))
      .then((data) => {
        if (isMounted && data?.projects && Array.isArray(data.projects)) {
          setProjects(data.projects);
        }
      })
      .catch(() => {
        // Fallback gracefully to seed data
        if (isMounted) setProjects(INITIAL_PUBLIC_PROJECTS);
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  // Filter and sort projects
  const filteredProjects = useMemo(() => {
    let result = [...projects];

    if (selectedCategory !== 'All') {
      result = result.filter(
        (p) => p.category.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter((p) => {
        const titleMatch = p.title.toLowerCase().includes(q);
        const catMatch = p.category.toLowerCase().includes(q);
        const sumMatch = p.summary.toLowerCase().includes(q);
        const locMatch = (p.publicLocation || '').toLowerCase().includes(q);
        const tagMatch = (p.tags || []).some((t) => t.toLowerCase().includes(q));
        const docMatch = (p.publicDocuments || []).some((d) =>
          d.title.toLowerCase().includes(q)
        );
        return titleMatch || catMatch || sumMatch || locMatch || tagMatch || docMatch;
      });
    }

    if (selectedSort === 'oldest') {
      result.sort((a, b) => (a.publishedAt || '').localeCompare(b.publishedAt || ''));
    } else if (selectedSort === 'az') {
      result.sort((a, b) => a.title.localeCompare(b.title));
    } else if (selectedSort === 'updated') {
      result.sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
    } else {
      // Default: newest
      result.sort((a, b) => (b.publishedAt || '').localeCompare(a.publishedAt || ''));
    }

    return result;
  }, [projects, selectedCategory, searchQuery, selectedSort]);

  const featuredProjects = useMemo(() => {
    return projects.filter((p) => p.featured);
  }, [projects]);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Completed':
        return 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30';
      case 'Under Construction':
        return 'bg-[#C6922D]/20 text-[#e5b95d] border-[#C6922D]/40';
      case 'In Development':
        return 'bg-blue-500/15 text-blue-300 border-blue-500/30';
      case 'Proposed':
        return 'bg-amber-500/15 text-amber-300 border-amber-500/30';
      case 'Conceptual Study':
        return 'bg-purple-500/15 text-purple-300 border-purple-500/30';
      default:
        return 'bg-slate-700/50 text-slate-300 border-slate-600';
    }
  };

  return (
    <div className="min-h-screen bg-[#071A2F] text-slate-100 selection:bg-[#C6922D] selection:text-[#071A2F]">
      {/* ---------------------------------------------------- */}
      {/* 1. EDITORIAL HEADER */}
      {/* ---------------------------------------------------- */}
      <section className="relative pt-32 pb-16 lg:pt-36 lg:pb-20 border-b border-white/10 overflow-hidden bg-gradient-to-b from-[#061325] to-[#071A2F]">
        <div className="absolute inset-0 blueprint-grid opacity-15 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            {/* Category / Eyebrow badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-[#C6922D]/35 text-xs text-slate-200 mb-6 backdrop-blur-md">
              <Building2 className="w-3.5 h-3.5 text-[#C6922D]" />
              <span className="tracking-widest uppercase font-semibold text-[11px] text-[#e5b95d]">
                PUBLIC PROJECT REPOSITORY • APPROVED PUBLICATIONS
              </span>
            </div>

            {/* Main Title */}
            <h1
              id="projects-main-heading"
              className="font-serif-display text-4xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-white leading-[1.1] mb-6"
            >
              Our Projects
            </h1>

            {/* Supporting Text */}
            <p className="font-sans-body text-base sm:text-lg text-slate-300 leading-relaxed font-normal mb-6">
              Explore selected projects, developments, concepts, studies, and project materials published by LDL Dhenze Residential Building Construction OPC.
            </p>

            {/* Honesty & Statutory Notice */}
            <div className="bg-[#0b2545]/80 border border-[#C6922D]/30 rounded-xl p-4 flex items-start gap-3 text-xs text-slate-300 backdrop-blur-sm">
              <Info className="w-4 h-4 text-[#C6922D] shrink-0 mt-0.5" />
              <div>
                <strong className="text-white">Strict Stage Classification Protocol: </strong>
                In compliance with Philippine corporate governance and statutory disclosure standards, all publications are cataloged with verified milestones: <em>Completed, Under Construction, In Development, Proposed, or Conceptual Study</em>. Conceptual models are never presented as completed physical builds.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------- */}
      {/* 2. FEATURED PROJECTS SHOWCASE */}
      {/* ---------------------------------------------------- */}
      {featuredProjects.length > 0 && (
        <section className="py-12 border-b border-white/5 bg-[#061325]/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#C6922D]" />
                <h2 className="text-xs font-semibold uppercase tracking-wider text-[#e5b95d]">
                  Featured Developments
                </h2>
              </div>
              <span className="text-xs text-slate-400 font-mono">
                {featuredProjects.length} Highlighted
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredProjects.slice(0, 3).map((p) => (
                <div
                  key={p.publicProjectId}
                  onClick={() => onNavigate(`projects/${p.slug}`)}
                  className="group cursor-pointer bg-[#081F38] border border-white/10 hover:border-[#C6922D]/50 rounded-xl overflow-hidden transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between"
                >
                  <div className="relative aspect-[16/10] overflow-hidden bg-slate-900">
                    <img
                      src={p.coverImage}
                      alt={p.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      referrerPolicy="no-referrer"
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).src =
                          '/assets/images/solar-storage.jpg';
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#081F38] via-transparent to-black/20" />
                    <div className="absolute top-3 left-3">
                      <span
                        className={`px-2.5 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider border backdrop-blur-md ${getStatusBadge(
                          p.status
                        )}`}
                      >
                        {p.status}
                      </span>
                    </div>
                    <div className="absolute top-3 right-3">
                      <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-[#C6922D] text-[#071A2F] font-semibold">
                        Featured
                      </span>
                    </div>
                  </div>

                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 mb-1.5">
                        <span className="text-[#e5b95d] font-semibold">{p.category}</span>
                        {p.publicLocation && (
                          <span className="flex items-center gap-1">
                            <MapPin className="w-3 h-3 text-[#C6922D]" />
                            {p.publicLocation.split(',')[0]}
                          </span>
                        )}
                      </div>
                      <h3 className="font-serif-display text-xl text-white font-normal mb-2 group-hover:text-[#e5b95d] transition-colors leading-snug">
                        {p.title}
                      </h3>
                      <p className="text-xs text-slate-300 leading-relaxed font-sans-body line-clamp-2 mb-4">
                        {p.summary}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-white/5 flex items-center justify-between text-xs">
                      <span className="text-slate-400 text-[11px] flex items-center gap-1">
                        <FileText className="w-3 h-3 text-[#C6922D]" />
                        {p.publicDocuments?.length || 0} Documents
                      </span>
                      <span className="text-[#C6922D] group-hover:text-white font-medium inline-flex items-center gap-1 text-xs">
                        View Project
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ---------------------------------------------------- */}
      {/* 3. SEARCH & CONTROLS TOOLBAR */}
      {/* ---------------------------------------------------- */}
      <section className="py-8 border-b border-white/10 bg-[#071A2F] sticky top-[76px] z-30 shadow-md backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
            {/* Search Input */}
            <div className="relative flex-1 max-w-xl">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                id="public-project-search"
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search projects, categories, locations, keywords, or approved files..."
                className="w-full pl-10 pr-4 py-2.5 bg-[#061325] border border-white/15 focus:border-[#C6922D] rounded-xl text-xs sm:text-sm text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-[#C6922D] transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-3 self-end md:self-auto">
              <label htmlFor="sort-select" className="text-xs text-slate-400 font-medium whitespace-nowrap">
                Sort by:
              </label>
              <select
                id="sort-select"
                value={selectedSort}
                onChange={(e) => setSelectedSort(e.target.value as SortOption)}
                className="bg-[#061325] border border-white/15 text-xs text-slate-200 py-2.5 px-3 rounded-xl focus:outline-none focus:border-[#C6922D] cursor-pointer"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="az">A–Z (Name)</option>
                <option value="updated">Recently Updated</option>
              </select>
            </div>
          </div>

          {/* Category Filter Tabs (Desktop) */}
          <div className="hidden lg:flex flex-wrap items-center gap-2 mt-6 pt-4 border-t border-white/5">
            <span className="text-xs font-semibold text-slate-400 mr-2 flex items-center gap-1.5">
              <Filter className="w-3.5 h-3.5 text-[#C6922D]" /> Categories:
            </span>
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  selectedCategory === cat
                    ? 'bg-[#C6922D] text-[#071A2F] font-bold shadow-md'
                    : 'bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Category Filter Dropdown (Mobile / Tablet) */}
          <div className="lg:hidden mt-4 pt-3 border-t border-white/5">
            <div className="relative">
              <button
                onClick={() => setMobileCategoryOpen(!mobileCategoryOpen)}
                className="w-full flex items-center justify-between px-4 py-2.5 bg-[#061325] border border-white/15 rounded-xl text-xs text-slate-200"
              >
                <span className="flex items-center gap-2">
                  <Filter className="w-3.5 h-3.5 text-[#C6922D]" />
                  Category: <strong className="text-white">{selectedCategory}</strong>
                </span>
                <ChevronDown className="w-4 h-4 text-slate-400" />
              </button>

              {mobileCategoryOpen && (
                <div className="absolute left-0 right-0 top-full mt-2 bg-[#061325] border border-white/15 rounded-xl shadow-2xl p-2 z-40 max-h-64 overflow-y-auto grid grid-cols-2 gap-1">
                  {CATEGORIES.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => {
                        setSelectedCategory(cat);
                        setMobileCategoryOpen(false);
                      }}
                      className={`text-left px-3 py-2 rounded-lg text-xs transition-colors ${
                        selectedCategory === cat
                          ? 'bg-[#C6922D] text-[#071A2F] font-bold'
                          : 'text-slate-300 hover:bg-white/5'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------- */}
      {/* 4. MAIN PROJECT CARDS GRID */}
      {/* ---------------------------------------------------- */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Active Filter Counter */}
          <div className="flex items-center justify-between mb-8 pb-3 border-b border-white/5">
            <div className="text-xs text-slate-400">
              Showing <span className="text-white font-semibold">{filteredProjects.length}</span>{' '}
              {filteredProjects.length === 1 ? 'project' : 'projects'} in{' '}
              <span className="text-[#e5b95d] font-semibold">{selectedCategory}</span>
              {searchQuery && (
                <span>
                  {' '}
                  matching &ldquo;<strong>{searchQuery}</strong>&rdquo;
                </span>
              )}
            </div>

            {(selectedCategory !== 'All' || searchQuery) && (
              <button
                onClick={() => {
                  setSelectedCategory('All');
                  setSearchQuery('');
                }}
                className="text-xs text-[#C6922D] hover:underline"
              >
                Reset Filters
              </button>
            )}
          </div>

          {/* Empty State */}
          {filteredProjects.length === 0 ? (
            <div className="py-20 text-center max-w-md mx-auto bg-[#061325] border border-white/10 rounded-2xl p-8">
              <Building2 className="w-12 h-12 text-slate-500 mx-auto mb-4 stroke-1" />
              <h3 className="font-serif-display text-xl text-white mb-2">No Matching Projects Found</h3>
              <p className="text-xs text-slate-300 leading-relaxed mb-6 font-sans-body">
                No published projects match your selected category or query. Try refining your search terms or view all sectors.
              </p>
              <button
                onClick={() => {
                  setSelectedCategory('All');
                  setSearchQuery('');
                }}
                className="px-4 py-2 rounded-lg bg-[#C6922D] text-[#071A2F] text-xs font-bold hover:bg-[#e5b95d] transition-colors"
              >
                View All Projects
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.map((prj) => {
                const downloadableDocs = (prj.publicDocuments || []).filter(
                  (d) => d.publicDownloadEnabled
                );

                return (
                  <div
                    key={prj.publicProjectId}
                    id={`project-card-${prj.publicProjectId}`}
                    className="bg-[#081F38] border border-white/10 hover:border-[#C6922D]/40 rounded-xl overflow-hidden shadow-xl flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 group"
                  >
                    <div>
                      {/* Cover Image Container */}
                      <div className="aspect-[16/10] relative overflow-hidden bg-slate-900 cursor-pointer"
                        onClick={() => onNavigate(`projects/${pSlug(prj)}`)}
                      >
                        <img
                          src={prj.coverImage}
                          alt={`${prj.title} - ${prj.category} by LDL Dhenze`}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                          loading="lazy"
                          referrerPolicy="no-referrer"
                          onError={(e) => {
                            (e.currentTarget as HTMLImageElement).src =
                              '/assets/images/solar-storage.jpg';
                          }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#081F38] via-transparent to-black/30 pointer-events-none" />

                        {/* Top Badges */}
                        <div className="absolute top-3 left-3 flex items-center gap-1.5">
                          <span
                            className={`px-3 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider border backdrop-blur-md ${getStatusBadge(
                              prj.status
                            )}`}
                          >
                            {prj.status}
                          </span>
                        </div>

                        <div className="absolute top-3 right-3">
                          <span className="font-mono text-[10px] bg-black/70 backdrop-blur-md px-2.5 py-1 rounded text-[#e5b95d] border border-white/10">
                            {prj.category}
                          </span>
                        </div>
                      </div>

                      {/* Content Details */}
                      <div className="p-6">
                        {/* Location and Date */}
                        <div className="flex items-center justify-between text-xs text-slate-400 font-mono mb-2">
                          <span className="flex items-center gap-1.5 truncate">
                            <MapPin className="w-3.5 h-3.5 text-[#C6922D] shrink-0" />
                            <span className="truncate">{prj.publicLocation}</span>
                          </span>
                          {prj.completionDate && (
                            <span className="shrink-0 text-[11px] text-slate-400">
                              {prj.completionDate}
                            </span>
                          )}
                        </div>

                        {/* Title */}
                        <h3
                          onClick={() => onNavigate(`projects/${pSlug(prj)}`)}
                          className="font-serif-display text-xl text-white font-normal group-hover:text-[#e5b95d] transition-colors mb-2 cursor-pointer leading-tight"
                        >
                          {prj.title}
                        </h3>

                        {/* Short Description */}
                        <p className="text-xs text-slate-300 leading-relaxed mb-4 line-clamp-3 font-sans-body">
                          {prj.summary}
                        </p>

                        {/* Conceptual Tag Disclaimer if applicable */}
                        {prj.status === 'Conceptual Study' && (
                          <div className="p-2.5 rounded bg-purple-500/10 border border-purple-500/20 text-[11px] text-purple-200 leading-snug mb-4">
                            <strong>Notice:</strong> Conceptual study model. Not an active physical build.
                          </div>
                        )}

                        {/* Verified Metric Highlights */}
                        {prj.verifiedMetrics && prj.verifiedMetrics.length > 0 && (
                          <div className="grid grid-cols-2 gap-2 pt-3 border-t border-white/10 mb-2">
                            {prj.verifiedMetrics.slice(0, 2).map((m, idx) => (
                              <div key={idx} className="bg-white/5 p-2 rounded text-[11px]">
                                <span className="text-slate-400 block text-[10px]">{m.label}</span>
                                <span className="text-white font-semibold truncate block">
                                  {m.value}
                                </span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Card Actions Footer */}
                    <div className="px-6 py-4 bg-black/20 border-t border-white/5 flex items-center justify-between gap-3 text-xs">
                      {downloadableDocs.length > 0 ? (
                        <a
                          href={`/api/public-projects/documents/${downloadableDocs[0].publicDocumentId}/download`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[11px] text-[#e5b95d] hover:text-white inline-flex items-center gap-1 font-mono transition-colors"
                          title={`Download ${downloadableDocs[0].title}`}
                        >
                          <Download className="w-3.5 h-3.5" />
                          <span>PDF ({downloadableDocs[0].fileSize})</span>
                        </a>
                      ) : (
                        <span className="text-[11px] font-mono text-slate-400 flex items-center gap-1">
                          <FileText className="w-3 h-3" />
                          <span>Publication Overview</span>
                        </span>
                      )}

                      <button
                        onClick={() => onNavigate(`projects/${pSlug(prj)}`)}
                        className="px-3.5 py-1.5 bg-[#C6922D] hover:bg-[#e5b95d] text-[#071A2F] font-bold rounded-lg transition-colors inline-flex items-center gap-1 text-xs"
                      >
                        <span>View Project</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* ---------------------------------------------------- */}
      {/* 5. CALL TO ACTION: START A PROJECT */}
      {/* ---------------------------------------------------- */}
      <section className="py-20 border-t border-[#C6922D]/20 bg-gradient-to-b from-[#071A2F] to-[#051322]">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-slate-300 mb-6">
            <Sparkles className="w-3.5 h-3.5 text-[#C6922D]" />
            <span>COMMERCIAL • RESIDENTIAL • INDUSTRIAL • INFRASTRUCTURE</span>
          </div>
          <h2 className="font-serif-display text-3xl sm:text-4xl text-white font-normal mb-4">
            Interested in Developing a Similar Project?
          </h2>
          <p className="font-sans-body text-sm sm:text-base text-slate-300 max-w-2xl mx-auto mb-8 leading-relaxed">
            Tell us about your proposed development. Our team coordinates architectural feasibility, engineering planning, and statutory clearances across the Philippines.
          </p>
          <div className="flex flex-wrap justify-center items-center gap-4">
            <button
              onClick={() => onNavigate('start-project')}
              className="px-6 py-3 rounded-xl bg-[#C6922D] hover:bg-[#e5b95d] text-[#071A2F] font-bold text-xs uppercase tracking-wider transition-all shadow-lg flex items-center gap-2"
            >
              <span>Start a Project Inquiry</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => onNavigate('contact')}
              className="px-6 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-white font-semibold text-xs uppercase tracking-wider border border-white/15 transition-all"
            >
              Schedule Executive Discussion
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

// Helper to determine slug or ID
function pSlug(p: PublicProjectRecord): string {
  return p.slug || p.publicProjectId;
}
