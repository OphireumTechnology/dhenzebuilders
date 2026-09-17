import React, { useState } from 'react';
import {
  Camera,
  Video,
  Layers,
  Calendar,
  User,
  MapPin,
  Tag,
  Building,
  CheckCircle2,
  AlertTriangle,
  Play,
  X,
  Filter,
  Plus,
} from 'lucide-react';
import { SiteMediaRecord, ProjectPhase } from '../../types/onboardingTypes';
import { INITIAL_SITE_MEDIA } from '../../data/onboardingMockData';

interface SiteMediaGalleryProps {
  mediaRecords?: SiteMediaRecord[];
  portalTheme?: 'dark' | 'light';
}

export const SiteMediaGallery: React.FC<SiteMediaGalleryProps> = ({
  mediaRecords = INITIAL_SITE_MEDIA,
  portalTheme = 'dark',
}) => {
  const [mediaList, setMediaList] = useState<SiteMediaRecord[]>(mediaRecords);
  const [selectedPhase, setSelectedPhase] = useState<string>('ALL');
  const [selectedMediaType, setSelectedMediaType] = useState<'ALL' | 'PHOTO' | 'VIDEO'>('ALL');
  const [activeMediaModal, setActiveMediaModal] = useState<SiteMediaRecord | null>(null);

  const filteredMedia = mediaList.filter((m) => {
    if (selectedPhase !== 'ALL' && m.phase !== selectedPhase) return false;
    if (selectedMediaType !== 'ALL' && m.mediaType !== selectedMediaType) return false;
    return true;
  });

  const phases: ProjectPhase[] = [
    'Pre-Construction',
    'Mobilization',
    'Site Clearing',
    'Earthworks',
    'Foundation',
    'Structural',
    'Architectural',
    'MEP',
    'Finishing',
    'Turnover',
  ];

  return (
    <div className="space-y-6">
      {/* Header & Filter Controls */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-bold text-white tracking-tight flex items-center gap-2">
              <Camera className="w-5 h-5 text-[#C6922D]" />
              Project Site Media & Inspection Intelligence
            </h2>
            <span className="px-2 py-0.5 rounded text-[11px] font-mono bg-blue-500/20 text-blue-300 border border-blue-500/30">
              PRJ-2026-000125
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Geotagged inspection photography and video evidence cataloged by construction phase, work package, and contractor.
          </p>
        </div>

        {/* Phase & Type Filters */}
        <div className="flex flex-wrap items-center gap-2">
          <select
            value={selectedPhase}
            onChange={(e) => setSelectedPhase(e.target.value)}
            className="bg-slate-950 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-[#C6922D]"
          >
            <option value="ALL">All Project Phases</option>
            {phases.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>

          <select
            value={selectedMediaType}
            onChange={(e) => setSelectedMediaType(e.target.value as any)}
            className="bg-slate-950 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-[#C6922D]"
          >
            <option value="ALL">All Media Types</option>
            <option value="PHOTO">Photos Only</option>
            <option value="VIDEO">Videos Only</option>
          </select>
        </div>
      </div>

      {/* Grid of Site Media Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {filteredMedia.map((item) => (
          <div
            key={item.id}
            onClick={() => setActiveMediaModal(item)}
            className="group bg-slate-900 border border-slate-800 hover:border-[#C6922D]/60 rounded-xl overflow-hidden cursor-pointer transition-all duration-200 shadow-md flex flex-col"
          >
            {/* Thumbnail Preview Area */}
            <div className="relative aspect-video bg-slate-950 overflow-hidden">
              <img
                src={item.thumbnailUrl}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute top-2 left-2 flex items-center gap-1.5">
                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-black/70 backdrop-blur-sm text-white">
                  {item.id}
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-[#C6922D]/90 text-slate-950">
                  {item.phase}
                </span>
              </div>

              {item.mediaType === 'VIDEO' && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                  <div className="w-10 h-10 rounded-full bg-[#C6922D] text-slate-950 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                    <Play className="w-5 h-5 fill-current ml-0.5" />
                  </div>
                </div>
              )}
            </div>

            {/* Meta details */}
            <div className="p-3.5 space-y-2 flex-1 flex flex-col justify-between">
              <div>
                <h4 className="text-xs font-bold text-white line-clamp-1 group-hover:text-[#C6922D] transition-colors">
                  {item.title}
                </h4>
                <p className="text-[11px] text-slate-400 line-clamp-2 mt-1 leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="pt-2 border-t border-slate-800/80 space-y-1 text-[10px] font-mono text-slate-400">
                <div className="flex items-center justify-between">
                  <span>Location:</span>
                  <span className="text-slate-300 truncate max-w-[120px]">{item.locationDescription}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Contractor:</span>
                  <span className="text-[#C6922D] truncate max-w-[120px]">{item.contractorName}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Date:</span>
                  <span className="text-slate-300">{item.captureDate}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Media Detail & Playback Modal */}
      {activeMediaModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="relative w-full max-w-3xl bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl text-slate-100 overflow-hidden">
            <div className="flex items-center justify-between p-4 border-b border-slate-800 bg-slate-950">
              <div className="flex items-center gap-2 font-mono text-xs">
                <span className="text-[#C6922D] font-bold">{activeMediaModal.id}</span>
                <span className="text-slate-500">&bull;</span>
                <span className="text-white font-sans font-semibold">{activeMediaModal.title}</span>
              </div>
              <button
                onClick={() => setActiveMediaModal(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div className="aspect-video bg-black rounded-xl overflow-hidden flex items-center justify-center">
                <img
                  src={activeMediaModal.mediaUrl}
                  alt={activeMediaModal.title}
                  className="w-full h-full object-contain"
                />
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-3 bg-slate-950 rounded-xl text-xs font-mono">
                <div>
                  <span className="text-slate-500 text-[10px] block">PROJECT ID</span>
                  <span className="text-white">{activeMediaModal.projectId}</span>
                </div>
                <div>
                  <span className="text-slate-500 text-[10px] block">CONSTRUCTION PHASE</span>
                  <span className="text-[#C6922D]">{activeMediaModal.phase}</span>
                </div>
                <div>
                  <span className="text-slate-500 text-[10px] block">WORK PACKAGE</span>
                  <span className="text-slate-200">{activeMediaModal.workPackage}</span>
                </div>
                <div>
                  <span className="text-slate-500 text-[10px] block">STRUCTURE / FLOOR</span>
                  <span className="text-slate-200">{activeMediaModal.buildingOrStructure} ({activeMediaModal.floor})</span>
                </div>
                <div>
                  <span className="text-slate-500 text-[10px] block">UPLOADED BY</span>
                  <span className="text-slate-200">{activeMediaModal.uploadedBy}</span>
                </div>
                <div>
                  <span className="text-slate-500 text-[10px] block">CAPTURE TIMESTAMP</span>
                  <span className="text-slate-200">{activeMediaModal.captureDate}</span>
                </div>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed">
                <strong>Inspector Narrative:</strong> {activeMediaModal.description}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
