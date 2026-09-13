import React, { useState, useEffect, useRef } from 'react';
import {
  X,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Download,
  ShieldCheck,
  FileText,
  Maximize2,
  Minimize2,
  ExternalLink,
} from 'lucide-react';
import { CORPORATE_INFO } from '../../data/corporateInfo';

interface FoundersPledgeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate?: (view: string) => void;
}

export const FoundersPledgeModal: React.FC<FoundersPledgeModalProps> = ({
  isOpen,
  onClose,
  onNavigate,
}) => {
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [showHtmlText, setShowHtmlText] = useState<boolean>(false);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const modalRef = useRef<HTMLDivElement>(null);

  // Manage keyboard navigation and Escape key
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    // Prevent body scroll when modal is open
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleZoomIn = () => setZoomLevel((prev) => Math.min(prev + 0.25, 2.5));
  const handleZoomOut = () => setZoomLevel((prev) => Math.max(prev - 0.25, 0.75));
  const handleResetZoom = () => setZoomLevel(1);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="founders-pledge-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-[#020B14]/90 backdrop-blur-md animate-fadeIn"
    >
      <div
        ref={modalRef}
        className={`relative w-full ${
          isFullscreen ? 'max-w-none h-full' : 'max-w-5xl max-h-[92vh]'
        } bg-[#071A2F] border border-[#C6922D]/40 rounded-2xl shadow-2xl flex flex-col overflow-hidden transition-all duration-200`}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-3.5 border-b border-white/10 bg-[#051322]/90 shrink-0">
          <div className="flex items-center gap-2.5 min-w-0">
            <ShieldCheck className="w-5 h-5 text-[#C6922D] shrink-0" />
            <div className="min-w-0">
              <h2
                id="founders-pledge-modal-title"
                className="text-sm sm:text-base font-bold text-white truncate font-['Montserrat']"
              >
                Founder’s Message &amp; Solemn Pledge
              </h2>
              <p className="text-[11px] text-slate-400 truncate">
                {CORPORATE_INFO.executive.publicDisplayName} • {CORPORATE_INFO.executive.professionalTitle}
              </p>
            </div>
          </div>

          {/* Action Toolbar */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            <button
              onClick={() => setShowHtmlText(!showHtmlText)}
              className={`px-2.5 py-1.5 text-xs rounded font-medium transition-colors flex items-center gap-1.5 ${
                showHtmlText
                  ? 'bg-[#C6922D] text-[#071A2F] font-bold'
                  : 'bg-white/5 hover:bg-white/10 text-slate-200 border border-white/10'
              }`}
              title="Toggle accessible HTML transcript"
              aria-pressed={showHtmlText}
            >
              <FileText className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Accessible Text</span>
            </button>

            {!showHtmlText && (
              <>
                <button
                  onClick={handleZoomOut}
                  disabled={zoomLevel <= 0.75}
                  className="p-1.5 rounded bg-white/5 hover:bg-white/10 text-slate-200 border border-white/10 disabled:opacity-40"
                  title="Zoom out"
                  aria-label="Zoom out"
                >
                  <ZoomOut className="w-4 h-4" />
                </button>
                <span className="text-[11px] font-mono text-slate-400 w-10 text-center">
                  {Math.round(zoomLevel * 100)}%
                </span>
                <button
                  onClick={handleZoomIn}
                  disabled={zoomLevel >= 2.5}
                  className="p-1.5 rounded bg-white/5 hover:bg-white/10 text-slate-200 border border-white/10 disabled:opacity-40"
                  title="Zoom in"
                  aria-label="Zoom in"
                >
                  <ZoomIn className="w-4 h-4" />
                </button>
                <button
                  onClick={handleResetZoom}
                  className="p-1.5 rounded bg-white/5 hover:bg-white/10 text-slate-200 border border-white/10"
                  title="Reset zoom"
                  aria-label="Reset zoom"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
              </>
            )}

            <button
              onClick={() => setIsFullscreen(!isFullscreen)}
              className="hidden md:flex p-1.5 rounded bg-white/5 hover:bg-white/10 text-slate-200 border border-white/10"
              title={isFullscreen ? 'Exit fullscreen' : 'Fullscreen'}
              aria-label={isFullscreen ? 'Exit fullscreen' : 'Fullscreen'}
            >
              {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </button>

            <a
              href="/assets/images/founders-pledge.svg"
              download="LDL-Dhenze-Founders-Pledge.svg"
              className="p-1.5 rounded bg-white/5 hover:bg-white/10 text-slate-200 border border-white/10"
              title="Download image"
              aria-label="Download image"
            >
              <Download className="w-4 h-4" />
            </a>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-white/5 hover:bg-red-500/20 text-slate-300 hover:text-red-400 transition-colors border border-white/10 ml-1"
              title="Close modal (Esc)"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Main Content Canvas */}
        <div className="flex-1 overflow-auto bg-[#030D17] flex items-center justify-center p-4">
          {showHtmlText ? (
            /* Fully Accessible HTML Transcript */
            <div className="max-w-3xl w-full bg-[#071A2F] border border-white/10 rounded-xl p-6 sm:p-10 space-y-8 text-slate-200 my-auto">
              <div className="border-b border-[#C6922D]/30 pb-4">
                <div className="text-[11px] font-mono uppercase tracking-widest text-[#C6922D]">
                  LDL Dhenze Residential Building Construction • Official Executive Record
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-white mt-1">
                  Founder's Message &amp; Solemn Pledge
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  Authored by {CORPORATE_INFO.executive.legalName}, Founder, President and CEO
                </p>
              </div>

              <div className="space-y-4 text-sm sm:text-base leading-relaxed">
                <p className="italic font-serif text-[#C6922D] text-lg">
                  {CORPORATE_INFO.executive.founderMessage.salutation}
                </p>
                {CORPORATE_INFO.executive.founderMessage.paragraphs.map((p, idx) => (
                  <p key={idx} className="text-slate-300">
                    {p}
                  </p>
                ))}
              </div>

              {/* Four Pledge Pillars */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4 border-t border-white/10">
                {CORPORATE_INFO.pledgePillars.map((pillar) => (
                  <div key={pillar.id} className="bg-[#051322] border border-white/10 rounded-lg p-3">
                    <div className="text-xs font-bold text-[#C6922D] uppercase tracking-wider">
                      {pillar.title}
                    </div>
                    <div className="text-xs text-slate-300 mt-0.5">{pillar.description}</div>
                  </div>
                ))}
              </div>

              {/* Solemn Pledge Statement */}
              <div className="bg-[#0A223D] border-l-4 border-[#C6922D] p-4 rounded-r-lg">
                <div className="text-[11px] font-mono text-[#C6922D] uppercase tracking-wider mb-1 font-bold">
                  The Corporate Pledge
                </div>
                <p className="text-sm font-serif italic text-white leading-relaxed">
                  “We pledge to uphold the highest standards of professionalism, safety, and
                  environmental stewardship, to empower communities, and to create value that endures
                  beyond our time.”
                </p>
              </div>

              {/* Sign-off */}
              <div className="pt-2 text-right border-t border-white/10">
                <div className="text-base font-bold text-white">
                  {CORPORATE_INFO.executive.legalName}
                </div>
                <div className="text-xs text-[#C6922D]">
                  {CORPORATE_INFO.executive.professionalTitle}
                </div>
              </div>
            </div>
          ) : (
            /* High-Resolution Vector Image with object-fit: contain */
            <div
              className="transition-transform duration-150 flex items-center justify-center min-h-[400px] w-full"
              style={{ transform: `scale(${zoomLevel})`, transformOrigin: 'center center' }}
            >
              <img
                src="/assets/images/founders-pledge.svg"
                alt="Founder's Message and Solemn Pledge by Leodenis Deveza Languisan, Founder, President and CEO of LDL Dhenze Residential Building Construction"
                className="max-h-[82vh] w-auto max-w-full rounded-lg shadow-2xl border border-white/10"
                style={{ objectFit: 'contain' }}
                loading="eager"
              />
            </div>
          )}
        </div>

        {/* Modal Footer Bar */}
        <div className="px-4 sm:px-6 py-3 border-t border-white/10 bg-[#051322] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400 shrink-0">
          <div className="flex items-center gap-2 text-[11px]">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span>Official verified document • DTI No. 4812272 • PSIC 42900 Civil Engineering</span>
          </div>

          <div className="flex items-center gap-3">
            {onNavigate && (
              <button
                onClick={() => {
                  onClose();
                  onNavigate('ceo-corner');
                }}
                className="hover:text-[#C6922D] transition-colors flex items-center gap-1 font-medium text-slate-300"
              >
                <span>Visit CEO Corner Page</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </button>
            )}
            <button
              onClick={onClose}
              className="px-4 py-1.5 rounded-md bg-white/10 hover:bg-white/20 text-white font-medium transition-colors"
            >
              Close Viewer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
