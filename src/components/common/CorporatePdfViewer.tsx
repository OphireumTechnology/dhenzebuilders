import React, { useState, useEffect, useRef } from 'react';
import {
  Download,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Minimize2,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  LayoutGrid,
  FileText,
  Eye,
  CheckCircle2,
  ExternalLink,
  ShieldCheck,
  Search,
  BookOpen,
  Info,
  Sliders,
} from 'lucide-react';
import {
  OFFICIAL_PROFILE_METADATA,
  PROFILE_PAGES_MANIFEST,
  ProfilePageItem,
} from '../../data/companyProfileData';

interface CorporatePdfViewerProps {
  initialPage?: number;
  className?: string;
  showMetadataBar?: boolean;
}

export const CorporatePdfViewer: React.FC<CorporatePdfViewerProps> = ({
  initialPage = 1,
  className = '',
  showMetadataBar = true,
}) => {
  const [currentPage, setCurrentPage] = useState<number>(initialPage);
  const [zoomLevel, setZoomLevel] = useState<number>(100);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [showThumbnails, setShowThumbnails] = useState<boolean>(false);
  const [showPageInfo, setShowPageInfo] = useState<boolean>(true);
  const [imageLoading, setImageLoading] = useState<boolean>(true);
  const [imageError, setImageError] = useState<boolean>(false);
  const [viewMode, setViewMode] = useState<'single' | 'all'>('single');
  const [searchFilter, setSearchFilter] = useState<string>('');

  const containerRef = useRef<HTMLDivElement>(null);
  const pageContainerRef = useRef<HTMLDivElement>(null);

  const totalPages = PROFILE_PAGES_MANIFEST.length;
  const activePageItem: ProfilePageItem =
    PROFILE_PAGES_MANIFEST[currentPage - 1] || PROFILE_PAGES_MANIFEST[0];

  // Sync initialPage if it changes externally
  useEffect(() => {
    if (initialPage >= 1 && initialPage <= totalPages) {
      setCurrentPage(initialPage);
    }
  }, [initialPage, totalPages]);

  // Reset image loading state on page change
  useEffect(() => {
    setImageLoading(true);
    setImageError(false);
  }, [currentPage]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Avoid hijacking if user is typing in an input
      if (
        document.activeElement?.tagName === 'INPUT' ||
        document.activeElement?.tagName === 'TEXTAREA'
      ) {
        return;
      }

      if (e.key === 'ArrowRight' || e.key === 'PageDown') {
        e.preventDefault();
        handleNextPage();
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        e.preventDefault();
        handlePrevPage();
      } else if (e.key === 'Escape' && isFullscreen) {
        setIsFullscreen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentPage, isFullscreen, totalPages]);

  const handlePrevPage = () => {
    setCurrentPage((prev) => (prev > 1 ? prev - 1 : totalPages));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => (prev < totalPages ? prev + 1 : 1));
  };

  const handleJumpToPage = (pageNum: number) => {
    if (pageNum >= 1 && pageNum <= totalPages) {
      setCurrentPage(pageNum);
      if (viewMode === 'all') {
        const el = document.getElementById(`doc-page-${pageNum}`);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  const handleZoomIn = () => {
    setZoomLevel((prev) => Math.min(prev + 25, 200));
  };

  const handleZoomOut = () => {
    setZoomLevel((prev) => Math.max(prev - 25, 50));
  };

  const handleResetZoom = () => {
    setZoomLevel(100);
  };

  const toggleFullscreen = () => {
    if (!isFullscreen) {
      if (containerRef.current?.requestFullscreen) {
        containerRef.current.requestFullscreen().catch(() => {
          setIsFullscreen(true);
        });
      } else {
        setIsFullscreen(true);
      }
    } else {
      if (document.fullscreenElement && document.exitFullscreen) {
        document.exitFullscreen().catch(() => {});
      }
      setIsFullscreen(false);
    }
  };

  // Sync fullscreen change with browser event
  useEffect(() => {
    const handleFsChange = () => {
      setIsFullscreen(Boolean(document.fullscreenElement));
    };
    document.addEventListener('fullscreenchange', handleFsChange);
    return () => document.removeEventListener('fullscreenchange', handleFsChange);
  }, []);

  const filteredThumbnails = PROFILE_PAGES_MANIFEST.filter(
    (p) =>
      p.title.toLowerCase().includes(searchFilter.toLowerCase()) ||
      p.category.toLowerCase().includes(searchFilter.toLowerCase()) ||
      p.description.toLowerCase().includes(searchFilter.toLowerCase()) ||
      p.keyPoints.some((k) => k.toLowerCase().includes(searchFilter.toLowerCase()))
  );

  return (
    <div
      ref={containerRef}
      className={`bg-[#051322] border border-[#C6922D]/35 rounded-2xl shadow-2xl overflow-hidden flex flex-col ${
        isFullscreen ? 'fixed inset-0 z-50 rounded-none w-screen h-screen' : 'w-full'
      } ${className}`}
    >
      {/* ---------------------------------------------------- */}
      {/* 1. TOP TOOLBAR: Brand, Controls, and Actions */}
      {/* ---------------------------------------------------- */}
      <div className="bg-[#071A2F] border-b border-white/10 px-4 py-3 flex flex-wrap items-center justify-between gap-3 text-slate-100 select-none">
        {/* Left: Document Info & Status */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-[#C6922D]/15 text-[#C6922D] flex items-center justify-center shrink-0 border border-[#C6922D]/30">
            <BookOpen className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-xs sm:text-sm text-white tracking-wide font-['Montserrat'] truncate max-w-[220px] sm:max-w-md">
                Official Corporate Profile
              </span>
              <span className="hidden md:inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono font-semibold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                <CheckCircle2 className="w-3 h-3" />
                <span>27 Pages • Verified</span>
              </span>
            </div>
            <div className="text-[11px] text-slate-400 font-mono hidden sm:block">
              DTI #4812272 • BIR TIN 306-113-062-00000 • 9.9 MB
            </div>
          </div>
        </div>

        {/* Center: Page Navigation Controls */}
        <div className="flex items-center gap-1.5 sm:gap-2 bg-[#040E1B] px-3 py-1.5 rounded-xl border border-white/10">
          <button
            onClick={handlePrevPage}
            disabled={currentPage <= 1}
            className="p-1 rounded-md text-slate-300 hover:text-white hover:bg-white/10 disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
            title="Previous Page (Left Arrow)"
            aria-label="Previous Page"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <div className="flex items-center gap-1 text-xs font-mono">
            <span className="text-slate-400">Page</span>
            <input
              type="number"
              min={1}
              max={totalPages}
              value={currentPage}
              onChange={(e) => {
                const val = parseInt(e.target.value, 10);
                if (!isNaN(val)) handleJumpToPage(val);
              }}
              className="w-10 text-center bg-[#071A2F] border border-[#C6922D]/40 rounded py-0.5 text-white font-bold focus:outline-none focus:border-[#C6922D]"
              aria-label="Current Page Number"
            />
            <span className="text-slate-400">of {totalPages}</span>
          </div>

          <button
            onClick={handleNextPage}
            disabled={currentPage >= totalPages}
            className="p-1 rounded-md text-slate-300 hover:text-white hover:bg-white/10 disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
            title="Next Page (Right Arrow)"
            aria-label="Next Page"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Right: Zoom, Thumbnails, and Action Controls */}
        <div className="flex items-center gap-1 sm:gap-2">
          {/* Zoom controls (hidden on small mobile) */}
          <div className="hidden sm:flex items-center gap-1 bg-[#040E1B] px-2 py-1 rounded-lg border border-white/10 text-xs">
            <button
              onClick={handleZoomOut}
              disabled={zoomLevel <= 50}
              className="p-1 text-slate-300 hover:text-white disabled:opacity-30 transition-colors"
              title="Zoom Out (-25%)"
              aria-label="Zoom Out"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <span className="font-mono text-[11px] text-slate-300 w-9 text-center">
              {zoomLevel}%
            </span>
            <button
              onClick={handleZoomIn}
              disabled={zoomLevel >= 200}
              className="p-1 text-slate-300 hover:text-white disabled:opacity-30 transition-colors"
              title="Zoom In (+25%)"
              aria-label="Zoom In"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={handleResetZoom}
              className="p-1 text-slate-400 hover:text-white ml-0.5"
              title="Reset Zoom to 100%"
              aria-label="Reset Zoom"
            >
              <RotateCcw className="w-3 h-3" />
            </button>
          </div>

          {/* Thumbnails Drawer Toggle */}
          <button
            onClick={() => setShowThumbnails(!showThumbnails)}
            className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 border transition-all ${
              showThumbnails
                ? 'bg-[#C6922D] text-[#071A2F] border-[#C6922D]'
                : 'bg-white/5 text-slate-200 border-white/10 hover:bg-white/10'
            }`}
            title="Toggle Page Thumbnails Overview"
          >
            <LayoutGrid className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Pages</span>
          </button>

          {/* Fullscreen Toggle */}
          <button
            onClick={toggleFullscreen}
            className="p-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-slate-200 transition-colors"
            title={isFullscreen ? 'Exit Full Screen' : 'View Full Screen'}
            aria-label={isFullscreen ? 'Exit Full Screen' : 'View Full Screen'}
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>

          {/* Download Official PDF Button */}
          <a
            href={OFFICIAL_PROFILE_METADATA.directPdfUrl}
            download="LDL-Dhenze-Residential-Building-Construction-Corporate-Profile.pdf"
            className="px-3 py-1.5 rounded-lg bg-[#C6922D] hover:bg-[#d8a339] text-[#071A2F] font-bold text-xs uppercase tracking-wider transition-all shadow-md flex items-center gap-1.5"
            title="Download the full original 27-page official PDF (9.9 MB)"
          >
            <Download className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Download PDF</span>
          </a>
        </div>
      </div>

      {/* ---------------------------------------------------- */}
      {/* 2. VIEWER BODY: Thumbnails Sidebar + Main Page Canvas */}
      {/* ---------------------------------------------------- */}
      <div className="flex-1 flex overflow-hidden relative min-h-[500px] lg:min-h-[680px]">
        {/* Thumbnails Sidebar / Drawer */}
        {showThumbnails && (
          <aside className="w-72 sm:w-80 bg-[#040E1B] border-r border-white/10 flex flex-col shrink-0 z-20 transition-all">
            {/* Search Filter Header */}
            <div className="p-3 border-b border-white/10 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-[#C6922D] font-mono">
                  All 27 Pages
                </span>
                <button
                  onClick={() => setShowThumbnails(false)}
                  className="text-slate-400 hover:text-white text-xs"
                >
                  Close ×
                </button>
              </div>
              <div className="relative">
                <Search className="w-3.5 h-3.5 absolute left-2.5 top-2.5 text-slate-400" />
                <input
                  type="text"
                  placeholder="Filter pages or topics..."
                  value={searchFilter}
                  onChange={(e) => setSearchFilter(e.target.value)}
                  className="w-full bg-[#071A2F] border border-white/10 rounded-lg pl-8 pr-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#C6922D]"
                />
              </div>
            </div>

            {/* Thumbnail Scroll List */}
            <div className="flex-1 overflow-y-auto p-3 space-y-2.5 custom-scrollbar">
              {filteredThumbnails.map((page) => {
                const isSelected = page.pageNumber === currentPage;
                return (
                  <button
                    key={page.pageNumber}
                    onClick={() => handleJumpToPage(page.pageNumber)}
                    className={`w-full text-left p-2 rounded-xl border transition-all flex items-start gap-3 group ${
                      isSelected
                        ? 'bg-[#C6922D]/15 border-[#C6922D] text-white shadow-lg'
                        : 'bg-[#071A2F]/60 border-white/5 hover:border-white/20 text-slate-300'
                    }`}
                  >
                    {/* Small thumbnail preview */}
                    <div className="w-14 aspect-[3/4] bg-[#020B14] rounded overflow-hidden border border-white/10 shrink-0 relative">
                      <img
                        src={page.imageUrl}
                        alt={`Page ${page.pageNumber}`}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                        loading="lazy"
                      />
                      <span className="absolute bottom-0.5 right-0.5 px-1 py-0.2 rounded bg-black/80 font-mono text-[9px] text-white">
                        p.{page.pageNumber}
                      </span>
                    </div>

                    {/* Metadata text */}
                    <div className="min-w-0 flex-1">
                      <div className="text-[10px] font-mono font-semibold uppercase tracking-wider text-[#C6922D]">
                        {page.category}
                      </div>
                      <div className="text-xs font-semibold text-white line-clamp-2 mt-0.5">
                        {page.title}
                      </div>
                      <div className="text-[11px] text-slate-400 line-clamp-1 mt-1">
                        {page.description}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </aside>
        )}

        {/* Main Document Display Stage */}
        <div
          ref={pageContainerRef}
          className="flex-1 bg-[#020A13] p-4 sm:p-6 lg:p-8 overflow-auto flex items-center justify-center relative custom-scrollbar"
        >
          {/* Document Floating Watermark */}
          <div className="absolute top-4 left-4 z-10 pointer-events-none opacity-40 text-[10px] font-mono text-slate-400">
            LDL DHENZE CORPORATE PROFILE • OFFICIAL CONTROLLED EDITION
          </div>

          {/* Loading Indicator */}
          {imageLoading && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#051322]/80 z-20 backdrop-blur-xs">
              <div className="w-10 h-10 border-3 border-[#C6922D] border-t-transparent rounded-full animate-spin mb-3" />
              <div className="text-xs font-mono text-slate-300">
                Loading Page {currentPage} of {totalPages}...
              </div>
            </div>
          )}

          {/* Page Image Container with Zoom Scaling */}
          <div
            className="transition-transform duration-200 ease-out flex justify-center max-w-full"
            style={{
              transform: `scale(${zoomLevel / 100})`,
              transformOrigin: 'top center',
            }}
          >
            <div className="bg-white rounded-lg shadow-2xl overflow-hidden border border-white/20 relative group max-w-[900px] w-full">
              <img
                src={activePageItem.imageUrl}
                alt={activePageItem.title}
                onLoad={() => setImageLoading(false)}
                onError={() => {
                  setImageLoading(false);
                  setImageError(true);
                }}
                className="w-full h-auto block select-none"
              />

              {imageError && (
                <div className="p-8 text-center text-slate-800 space-y-3">
                  <Info className="w-8 h-8 text-amber-600 mx-auto" />
                  <p className="font-semibold text-sm">Preview rendering unavailable</p>
                  <a
                    href={OFFICIAL_PROFILE_METADATA.directPdfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#071A2F] text-[#C6922D] rounded-lg text-xs font-bold"
                  >
                    Open in PDF Viewer <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Page Information Sidebar (Collapsible) */}
        {showPageInfo && !isFullscreen && (
          <aside className="hidden xl:flex w-80 bg-[#071A2F] border-l border-white/10 p-5 flex-col justify-between shrink-0 overflow-y-auto custom-scrollbar">
            <div className="space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#C6922D]">
                  Document Inspector
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-white/5 border border-white/10 text-slate-300">
                  Page {currentPage}/{totalPages}
                </span>
              </div>

              <div>
                <span className="text-[10px] uppercase font-mono tracking-widest text-[#E5B95D]">
                  {activePageItem.category}
                </span>
                <h3 className="text-base font-bold text-white font-['Montserrat'] mt-1 leading-snug">
                  {activePageItem.title}
                </h3>
                <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                  {activePageItem.description}
                </p>
              </div>

              {/* Key points on this page */}
              {activePageItem.keyPoints.length > 0 && (
                <div className="space-y-2 pt-3 border-t border-white/10">
                  <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                    Executive Highlights
                  </div>
                  <ul className="space-y-1.5">
                    {activePageItem.keyPoints.map((point, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#C6922D] shrink-0 mt-0.5" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Official Corporate Status Seal */}
              <div className="bg-[#051322] border border-[#C6922D]/30 rounded-xl p-3.5 space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-[#C6922D]">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Statutory Registration</span>
                </div>
                <div className="text-[11px] text-slate-300 leading-snug">
                  DTI Business Name No. <span className="text-white font-bold">4812272</span>
                  <br />
                  BIR TIN: <span className="text-white font-bold">306-113-062-00000</span>
                  <br />
                  Line of Business: PSIC 42900
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="pt-4 border-t border-white/10 space-y-2">
              <a
                href={OFFICIAL_PROFILE_METADATA.directPdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2 px-3 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-xs text-slate-200 font-semibold flex items-center justify-center gap-1.5 transition-colors"
              >
                <ExternalLink className="w-3.5 h-3.5 text-[#C6922D]" />
                <span>Open Raw PDF in New Tab</span>
              </a>

              <a
                href={OFFICIAL_PROFILE_METADATA.directPdfUrl}
                download="LDL-Dhenze-Residential-Building-Construction-Corporate-Profile.pdf"
                className="w-full py-2.5 px-3 rounded-lg bg-[#C6922D] hover:bg-[#d8a339] text-[#071A2F] font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg transition-all"
              >
                <Download className="w-4 h-4" />
                <span>Download Complete PDF</span>
              </a>
            </div>
          </aside>
        )}
      </div>

      {/* ---------------------------------------------------- */}
      {/* 3. BOTTOM FOOTER BAR: Page Slider & Quick Nav Strip */}
      {/* ---------------------------------------------------- */}
      <div className="bg-[#071A2F] border-t border-white/10 px-4 py-2.5 flex items-center justify-between text-xs text-slate-300">
        <div className="flex items-center gap-3">
          <span className="font-mono text-[11px] text-slate-400">
            Document Navigation:
          </span>
          <div className="flex items-center gap-1">
            <button
              onClick={() => handleJumpToPage(1)}
              className="px-2 py-0.5 rounded bg-white/5 hover:bg-white/10 text-[10px] font-mono text-slate-300"
              title="First Page: Cover"
            >
              Cover
            </button>
            <button
              onClick={() => handleJumpToPage(2)}
              className="px-2 py-0.5 rounded bg-white/5 hover:bg-white/10 text-[10px] font-mono text-slate-300"
              title="Founder's Message"
            >
              Founder
            </button>
            <button
              onClick={() => handleJumpToPage(3)}
              className="px-2 py-0.5 rounded bg-white/5 hover:bg-white/10 text-[10px] font-mono text-slate-300"
              title="CEO Profile"
            >
              CEO
            </button>
            <button
              onClick={() => handleJumpToPage(4)}
              className="px-2 py-0.5 rounded bg-white/5 hover:bg-white/10 text-[10px] font-mono text-slate-300"
              title="DTI Registration"
            >
              DTI
            </button>
            <button
              onClick={() => handleJumpToPage(5)}
              className="px-2 py-0.5 rounded bg-white/5 hover:bg-white/10 text-[10px] font-mono text-slate-300"
              title="BIR 2303"
            >
              BIR
            </button>
            <button
              onClick={() => handleJumpToPage(16)}
              className="px-2 py-0.5 rounded bg-white/5 hover:bg-white/10 text-[10px] font-mono text-slate-300"
              title="9 Business Divisions"
            >
              9 Divisions
            </button>
            <button
              onClick={() => handleJumpToPage(25)}
              className="px-2 py-0.5 rounded bg-white/5 hover:bg-white/10 text-[10px] font-mono text-slate-300"
              title="Core Values"
            >
              Values
            </button>
            <button
              onClick={() => handleJumpToPage(27)}
              className="px-2 py-0.5 rounded bg-white/5 hover:bg-white/10 text-[10px] font-mono text-slate-300"
              title="Back Cover"
            >
              Seal
            </button>
          </div>
        </div>

        {/* Page progress slider */}
        <div className="hidden md:flex items-center gap-3 w-64">
          <input
            type="range"
            min={1}
            max={totalPages}
            value={currentPage}
            onChange={(e) => handleJumpToPage(parseInt(e.target.value, 10))}
            className="w-full accent-[#C6922D] cursor-pointer"
            aria-label="Seek Page"
          />
          <span className="font-mono text-[11px] text-[#C6922D] w-12 text-right">
            {Math.round((currentPage / totalPages) * 100)}%
          </span>
        </div>
      </div>
    </div>
  );
};
