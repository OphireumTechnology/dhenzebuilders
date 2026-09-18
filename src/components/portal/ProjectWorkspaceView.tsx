import React, { useState } from 'react';
import {
  FolderKanban,
  Building2,
  MapPin,
  Compass,
  FileText,
  DollarSign,
  Calendar,
  Layers,
  Hammer,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Clock,
  Plus,
  ArrowUpRight,
  Download,
  Eye,
  Check,
  Percent,
  Sliders,
  Sparkles,
  ExternalLink,
  ChevronRight,
  Filter,
} from 'lucide-react';
import {
  ClientProjectItem,
  ScopeOfWorkItem,
  BOQLineItem,
  ContractorBidSubmission,
  DocumentRecord,
} from '../../types/clientPortal';

interface ProjectWorkspaceViewProps {
  project: ClientProjectItem;
  onOpenNeedsInterviewer: () => void;
  onOpenUploadModal?: () => void;
  portalTheme?: 'dark' | 'light';
  subTab?: string;
  onSelectSubTab?: (tab: string) => void;
  onUpdateProject?: (updated: ClientProjectItem) => void;
}

const DEFAULT_SCOPE_ITEMS: ScopeOfWorkItem[] = [
  { id: 'SC-01', category: 'General', divisionNumber: '01', workPackage: 'Mobilization, Temporary Facilities, Safety & DOLE OSHP', assignment: 'INCLUDED', notes: 'Contractor to provide on-site field office, barracks, and safety signage.' },
  { id: 'SC-02', category: 'Civil', divisionNumber: '02', workPackage: 'Site Clearing, Topographic Verification & Earthworks', assignment: 'INCLUDED', notes: 'Cut & fill to road elevation; soil compaction test included.' },
  { id: 'SC-03', category: 'Structural', divisionNumber: '03', workPackage: 'Reinforced Concrete Substructure (Footings, Grade Beams, Cistern)', assignment: 'INCLUDED', notes: '4,000 psi ready-mix concrete, Grade 60 deformed rebar.' },
  { id: 'SC-04', category: 'Structural', divisionNumber: '03', workPackage: 'Superstructure Concrete Columns, Beams & Suspended Slabs', assignment: 'INCLUDED', notes: 'Includes formworks, shoring, and 28-day cylinder break tests.' },
  { id: 'SC-05', category: 'Masonry', divisionNumber: '04', workPackage: '6-inch & 4-inch Concrete Hollow Blocks (CHB) with Plastering', assignment: 'INCLUDED', notes: 'Minimum 500 psi load-bearing CHB with 10mm rebars at 400mm O.C.' },
  { id: 'SC-06', category: 'Steel & Roof', divisionNumber: '05', workPackage: 'Structural Steel Trusses, Purlins & Standing Seam Metal Roofing', assignment: 'INCLUDED', notes: 'Gauge 24 prepainted rib-type with 50mm double-sided foil insulation.' },
  { id: 'SC-07', category: 'Waterproofing', divisionNumber: '07', workPackage: 'Cementitious & Torched-On Bituminous Waterproofing (Balconies, Baths, Roof)', assignment: 'INCLUDED', notes: 'Mandatory 48-hour flood test certified prior to tile installation.' },
  { id: 'SC-08', category: 'Doors & Windows', divisionNumber: '08', workPackage: 'Heavy-Duty Powder-Coated Aluminum Windows & Tempered Glass', assignment: 'INCLUDED', notes: 'Euro-profile extruded aluminum with 8mm tinted tempered glass.' },
  { id: 'SC-09', category: 'Finishes', divisionNumber: '09', workPackage: 'Homogeneous Floor Tiles, Quartz Countertops & Paint Finishes', assignment: 'INCLUDED', notes: 'DuPont / Boysen Permacoat luxury matte paint spec.' },
  { id: 'SC-10', category: 'Plumbing', divisionNumber: '22', workPackage: 'Potable Water Distribution (PPR-C) & Sanitary Drainage (uPVC)', assignment: 'INCLUDED', notes: 'Includes grease traps and booster pump system.' },
  { id: 'SC-11', category: 'Electrical', divisionNumber: '26', workPackage: '3-Phase Primary Electrical Infeed, Panelboards, Wiring & Lighting', assignment: 'INCLUDED', notes: 'THHN copper wiring in PVC conduits; Schneider Breakers.' },
  { id: 'SC-12', category: 'Solar Microgrid', divisionNumber: '48', workPackage: '15 kWp Rooftop Solar PV System with 20 kWh Lithium BESS', assignment: 'INCLUDED', notes: 'Tier 1 TopCon monocrystalline solar panels with hybrid inverter.' },
  { id: 'SC-13', category: 'HVAC', divisionNumber: '23', workPackage: 'VRF Inverter Multi-Split Air Conditioning Units & Ducting', assignment: 'CONTRACTOR_SUPPLIED', notes: 'Daikin or Mitsubishi VRF high-efficiency system.' },
  { id: 'SC-14', category: 'Exterior', divisionNumber: '32', workPackage: 'Perimeter Security Wall, Automatic Driveway Gate & Paving', assignment: 'INCLUDED', notes: 'Includes Italian automatic gate motor with remote access.' },
  { id: 'SC-15', category: 'Specialty', divisionNumber: '13', workPackage: 'Inground Infinity Swimming Pool & Cabana Decking', assignment: 'OPTIONAL', notes: 'Quoted as separate trade additive option.' },
  { id: 'SC-16', category: 'Furniture', divisionNumber: '12', workPackage: 'Loose Interior Furniture, Curtains & Decorative Artwork', assignment: 'EXCLUDED', notes: 'By Owner Interior Designer separate contract.' },
];

const DEFAULT_BOQ_ITEMS: BOQLineItem[] = [
  { id: 'BOQ-01', itemNumber: '1.0', division: 'General Requirements', description: 'Temporary facilities, power, water, permits & safety equipment', specReference: 'Div 01 Specs', unit: 'lot', quantity: 1, ownerEstimateUnitPrice: 850000, contractorUnitPrice: 820000, remarks: 'Complies with DOLE OSHP' },
  { id: 'BOQ-02', itemNumber: '2.0', division: 'Earthworks', description: 'Site clearing, structural excavation, backfill & compaction', specReference: 'ASTM D1557', unit: 'm³', quantity: 450, ownerEstimateUnitPrice: 950, contractorUnitPrice: 920, remarks: 'Verified soil profile' },
  { id: 'BOQ-03', itemNumber: '3.1', division: 'Concrete Works', description: '4,000 psi Ready-Mix Concrete for footings, tie beams & slabs', specReference: 'ACI 318-19', unit: 'm³', quantity: 240, ownerEstimateUnitPrice: 6800, contractorUnitPrice: 6650, remarks: 'Includes 28-day break tests' },
  { id: 'BOQ-04', itemNumber: '3.2', division: 'Reinforcing Steel', description: 'Grade 60 Deformed Rebar fabricated and installed', specReference: 'PNS 49 / ASTM A615', unit: 'kg', quantity: 28500, ownerEstimateUnitPrice: 75, contractorUnitPrice: 73, remarks: 'Mill certificates required' },
  { id: 'BOQ-05', itemNumber: '4.0', division: 'Masonry Works', description: '6" exterior & 4" interior CHB with mortar & plaster', specReference: 'DPWH Bluebook', unit: 'm²', quantity: 820, ownerEstimateUnitPrice: 1450, contractorUnitPrice: 1380, remarks: 'Reinforced 10mm rebars' },
  { id: 'BOQ-06', itemNumber: '5.0', division: 'Roofing & Steel', description: 'Structural steel framing, purlins & rib-type metal roof', specReference: 'AISC 360', unit: 'lot', quantity: 1, ownerEstimateUnitPrice: 2450000, contractorUnitPrice: 2390000, remarks: 'Colorbond roofing sheet' },
  { id: 'BOQ-07', itemNumber: '6.0', division: 'Doors & Windows', description: 'Powder-coated aluminum frame windows and solid wood doors', specReference: 'Architectural Spec', unit: 'lot', quantity: 1, ownerEstimateUnitPrice: 3100000, contractorUnitPrice: 3200000, remarks: 'Tempered glass panels' },
  { id: 'BOQ-08', itemNumber: '7.0', division: 'Architectural Finishes', description: 'Tile floorings, bathroom fixtures, ceiling and exterior paints', specReference: 'Luxury Spec A', unit: 'm²', quantity: 680, ownerEstimateUnitPrice: 5200, contractorUnitPrice: 4950, remarks: 'Homogeneous matte tiles' },
  { id: 'BOQ-09', itemNumber: '8.0', division: 'Electrical & Solar', description: '3-phase wiring, LED fixtures, 15kWp Solar Microgrid with BESS', specReference: 'PEC 2017', unit: 'lot', quantity: 1, ownerEstimateUnitPrice: 3850000, contractorUnitPrice: 3750000, remarks: 'Hybrid inverter & battery' },
  { id: 'BOQ-10', itemNumber: '9.0', division: 'Plumbing & Drainage', description: 'PPR-C water lines, uPVC sanitary, 20kL rainwater cistern', specReference: 'NPCP 1999', unit: 'lot', quantity: 1, ownerEstimateUnitPrice: 1850000, contractorUnitPrice: 1780000, remarks: 'Tested at 100 psi' },
  { id: 'BOQ-11', itemNumber: '10.0', division: 'Mechanical / HVAC', description: 'VRF multi-split high efficiency inverter air conditioning', specReference: 'ASHRAE 90.1', unit: 'lot', quantity: 1, ownerEstimateUnitPrice: 2600000, contractorUnitPrice: 2550000, remarks: '5 outdoor & 12 indoor' },
];

const DEFAULT_CONTRACTOR_BIDS: ContractorBidSubmission[] = [
  {
    contractorId: 'CTR-001',
    contractorName: 'Pampanga Prime Structural Builders Inc.',
    pcabLicenseCategory: 'Category A (Principal: Building)',
    bidAmountPHP: 30450000,
    adjustedBidAmountPHP: 30450000,
    constructionDurationDays: 320,
    mobilizationPercentage: 15,
    retentionPercentage: 10,
    warrantyPeriodYears: 2,
    keyPersonnel: 'Engr. F. David (PE Civil), Safety Officer 3 (COSH)',
    majorExclusions: 'Deep well drilling permit fee (Owner supplied)',
    technicalCompletenessPercent: 96,
    clarificationsCount: 2,
    status: 'SHORTLISTED',
    submissionDate: '2026-09-12',
  },
  {
    contractorId: 'CTR-002',
    contractorName: 'Luzon Prestige Construction Corp.',
    pcabLicenseCategory: 'Category AA (General Engineering & Building)',
    bidAmountPHP: 32800000,
    adjustedBidAmountPHP: 31900000,
    constructionDurationDays: 300,
    mobilizationPercentage: 15,
    retentionPercentage: 10,
    warrantyPeriodYears: 3,
    keyPersonnel: 'Arch. M. Santos (PRC), Engr. R. Gomez (Structural)',
    majorExclusions: 'Landscape softscapes / plants',
    technicalCompletenessPercent: 98,
    clarificationsCount: 1,
    status: 'SUBMITTED',
    submissionDate: '2026-09-14',
  },
  {
    contractorId: 'CTR-003',
    contractorName: 'Central Luzon Elite Builders Co.',
    pcabLicenseCategory: 'Category B',
    bidAmountPHP: 28900000,
    adjustedBidAmountPHP: 29850000,
    constructionDurationDays: 360,
    mobilizationPercentage: 20,
    retentionPercentage: 10,
    warrantyPeriodYears: 1,
    keyPersonnel: 'Engr. T. Castro (Civil)',
    majorExclusions: 'Solar battery storage inverter (Quoted separately)',
    technicalCompletenessPercent: 88,
    clarificationsCount: 4,
    status: 'UNDER_EVALUATION',
    submissionDate: '2026-09-15',
  },
];

export const ProjectWorkspaceView: React.FC<ProjectWorkspaceViewProps> = ({
  project,
  onOpenNeedsInterviewer,
  onOpenUploadModal,
  portalTheme = 'dark',
  subTab = 'overview',
  onSelectSubTab,
}) => {
  const [activeSubTab, setActiveSubTab] = useState<string>(subTab);
  const [scopeList, setScopeList] = useState<ScopeOfWorkItem[]>(DEFAULT_SCOPE_ITEMS);
  const [boqList, setBoqList] = useState<BOQLineItem[]>(DEFAULT_BOQ_ITEMS);
  const [contractorBids, setContractorBids] = useState<ContractorBidSubmission[]>(DEFAULT_CONTRACTOR_BIDS);
  const [filterTrade, setFilterTrade] = useState<string>('ALL');

  const currentTab = onSelectSubTab ? subTab : activeSubTab;
  const setTab = onSelectSubTab || setActiveSubTab;

  const isLight = portalTheme === 'light';
  const cardBg = isLight ? 'bg-white border-slate-200 text-slate-900 shadow-sm' : 'bg-[#09223d] border-white/10 text-slate-100';
  const innerBg = isLight ? 'bg-slate-50 border-slate-200' : 'bg-[#051322] border-white/5';
  const headerText = isLight ? 'text-slate-900' : 'text-white';
  const mutedText = isLight ? 'text-slate-500' : 'text-slate-400';

  // Compute BOQ Totals
  const totalOwnerEstimate = boqList.reduce(
    (sum, item) => sum + item.quantity * item.ownerEstimateUnitPrice,
    0
  );
  const totalContractorBid = boqList.reduce(
    (sum, item) => sum + item.quantity * item.contractorUnitPrice,
    0
  );

  const subTabs = [
    { id: 'overview', label: 'Project Overview', icon: FolderKanban },
    { id: 'property', label: 'Property & Ownership', icon: MapPin },
    { id: 'design', label: 'Design & Engineering', icon: Compass },
    { id: 'scope', label: 'Scope of Work Builder', icon: Layers },
    { id: 'boq', label: 'BOQ & Cost Calculator', icon: DollarSign },
    { id: 'budget', label: 'Budget & Funding', icon: Percent },
    { id: 'contractors', label: 'Contractor Bidding & Comparison', icon: Hammer },
    { id: 'milestones', label: 'Schedule & Milestones', icon: Calendar },
    { id: 'permits', label: 'Permits & Clearances', icon: ShieldCheck },
  ];

  return (
    <div className="space-y-6">
      {/* Top Project Banner */}
      <div className={`p-6 sm:p-8 rounded-3xl border ${cardBg}`}>
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-white/10">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-mono text-xs text-[#C6922D] font-bold tracking-wider uppercase">
                {project.id}
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-950 text-amber-300 border border-amber-800/40 uppercase">
                {project.status.replace(/_/g, ' ')}
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-blue-950 text-blue-300 border border-blue-800/40 uppercase">
                {project.currentPhase}
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white mt-1.5">{project.title}</h1>
            <p className="text-xs text-slate-300 mt-1 flex flex-wrap items-center gap-3">
              <span>
                Location: <strong>{project.location}</strong>
              </span>
              <span>•</span>
              <span>
                Floor Area: <strong>{project.buildingAreaSqM} m²</strong> ({project.numberOfFloors} Storeys)
              </span>
              <span>•</span>
              <span>
                Lot Area: <strong>{project.lotAreaSqM} m²</strong>
              </span>
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={onOpenNeedsInterviewer}
              className="px-4 py-2.5 rounded-xl bg-[#C6922D] hover:bg-[#d8a339] text-[#071A2F] font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 transition-all shadow-md"
            >
              <Sparkles className="w-4 h-4" />
              <span>Needs Interviewer & Report</span>
            </button>
            {onOpenUploadModal && (
              <button
                onClick={onOpenUploadModal}
                className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 transition-colors"
              >
                <Plus className="w-4 h-4 text-[#C6922D]" />
                <span>Upload Documents</span>
              </button>
            )}
          </div>
        </div>

        {/* Workspace Sub-Navigation Tabs */}
        <div className="pt-4 flex items-center gap-1.5 overflow-x-auto no-scrollbar">
          {subTabs.map((st) => {
            const Icon = st.icon;
            const isActive = currentTab === st.id;
            return (
              <button
                key={st.id}
                onClick={() => setTab(st.id)}
                className={`py-2 px-3.5 rounded-xl text-xs font-semibold whitespace-nowrap flex items-center gap-2 transition-all ${
                  isActive
                    ? 'bg-[#C6922D] text-[#071A2F] font-bold shadow'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-[#071A2F]' : 'text-slate-400'}`} />
                <span>{st.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ---------------------------------------------------- */}
      {/* 1. OVERVIEW SUB-TAB */}
      {/* ---------------------------------------------------- */}
      {currentTab === 'overview' && (
        <div className="space-y-6">
          {/* Key Metric Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className={`p-5 rounded-2xl border ${cardBg}`}>
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span>Target Approved Budget</span>
                <DollarSign className="w-4 h-4 text-[#C6922D]" />
              </div>
              <div className="text-2xl font-bold font-mono text-white mt-1.5">
                ₱{project.targetBudgetPHP.toLocaleString()}
              </div>
              <div className="text-[11px] text-slate-400 mt-1">
                Funded via {project.fundingSource}
              </div>
            </div>

            <div className={`p-5 rounded-2xl border ${cardBg}`}>
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span>Lowest Contractor Bid</span>
                <Hammer className="w-4 h-4 text-emerald-400" />
              </div>
              <div className="text-2xl font-bold font-mono text-emerald-400 mt-1.5">
                ₱30,450,000
              </div>
              <div className="text-[11px] text-emerald-300 mt-1">
                4.8% below target ceiling budget
              </div>
            </div>

            <div className={`p-5 rounded-2xl border ${cardBg}`}>
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span>Project Readiness Score</span>
                <ShieldCheck className="w-4 h-4 text-sky-400" />
              </div>
              <div className="text-2xl font-bold font-mono text-sky-400 mt-1.5">
                {project.readinessPercent}%
              </div>
              <div className="text-[11px] text-slate-400 mt-1">
                Ready for competitive tender issue
              </div>
            </div>

            <div className={`p-5 rounded-2xl border ${cardBg}`}>
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span>Target Completion</span>
                <Calendar className="w-4 h-4 text-amber-400" />
              </div>
              <div className="text-xl font-bold text-white mt-1.5">{project.targetHandoverDate}</div>
              <div className="text-[11px] text-slate-400 mt-1">
                Target mobilization: {project.targetStartDate}
              </div>
            </div>
          </div>

          {/* Two-Column Detail Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Project Technical Synthesis */}
            <div className={`p-6 rounded-3xl border ${cardBg} space-y-4`}>
              <div className="flex items-center justify-between pb-2 border-b border-white/10">
                <h3 className="text-sm font-bold uppercase tracking-wider text-white flex items-center gap-2">
                  <FileText className="w-4 h-4 text-[#C6922D]" />
                  <span>Technical Specifications Summary</span>
                </h3>
                <span className="text-[10px] font-mono text-[#C6922D]">PHILIPPINE BUILDING CODE</span>
              </div>

              <div className="space-y-2.5 text-xs text-slate-300">
                <div className="flex justify-between p-2.5 rounded-xl bg-[#051322] border border-white/5">
                  <span className="text-slate-400">Structural System:</span>
                  <strong className="text-white">Reinforced Concrete Frame (4,000 psi, Grade 60)</strong>
                </div>
                <div className="flex justify-between p-2.5 rounded-xl bg-[#051322] border border-white/5">
                  <span className="text-slate-400">Architectural Aesthetic:</span>
                  <strong className="text-white">Modern Tropical Villa with Overhangs</strong>
                </div>
                <div className="flex justify-between p-2.5 rounded-xl bg-[#051322] border border-white/5">
                  <span className="text-slate-400">Solar Microgrid:</span>
                  <strong className="text-white">15 kWp Solar Rooftop + 20 kWh Lithium BESS</strong>
                </div>
                <div className="flex justify-between p-2.5 rounded-xl bg-[#051322] border border-white/5">
                  <span className="text-slate-400">Water Storage:</span>
                  <strong className="text-white">20,000L Underground Cistern + Rainwater Flush</strong>
                </div>
                <div className="flex justify-between p-2.5 rounded-xl bg-[#051322] border border-white/5">
                  <span className="text-slate-400">Procurement Delivery Model:</span>
                  <strong className="text-white">{project.procurementMethod}</strong>
                </div>
              </div>
            </div>

            {/* Contractor Bidding Room Status */}
            <div className={`p-6 rounded-3xl border ${cardBg} space-y-4`}>
              <div className="flex items-center justify-between pb-2 border-b border-white/10">
                <h3 className="text-sm font-bold uppercase tracking-wider text-white flex items-center gap-2">
                  <Hammer className="w-4 h-4 text-[#C6922D]" />
                  <span>Contractor Tender & Bidding Status</span>
                </h3>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-950 text-emerald-300 border border-emerald-800">
                  3 Bids Received
                </span>
              </div>

              <div className="space-y-2 text-xs">
                {contractorBids.map((bid) => (
                  <div
                    key={bid.contractorId}
                    className="p-3 rounded-xl bg-[#051322] border border-white/5 flex items-center justify-between"
                  >
                    <div>
                      <div className="font-bold text-white">{bid.contractorName}</div>
                      <div className="text-[11px] text-slate-400">
                        {bid.pcabLicenseCategory} • {bid.constructionDurationDays} Days
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-mono font-bold text-emerald-400 text-xs">
                        ₱{bid.bidAmountPHP.toLocaleString()}
                      </div>
                      <span className="text-[10px] uppercase font-bold text-slate-400">
                        {bid.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <button
                onClick={() => setTab('contractors')}
                className="w-full py-2 rounded-xl text-xs font-bold text-[#C6922D] hover:underline flex items-center justify-center gap-1 mt-2"
              >
                <span>View Full Side-by-Side Comparison Matrix</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ---------------------------------------------------- */}
      {/* 2. PROPERTY & OWNERSHIP SUB-TAB */}
      {/* ---------------------------------------------------- */}
      {currentTab === 'property' && (
        <div className={`p-6 sm:p-8 rounded-3xl border ${cardBg} space-y-6`}>
          <div className="pb-4 border-b border-white/10 flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <MapPin className="w-5 h-5 text-[#C6922D]" />
                <span>Property & Land Ownership Registry</span>
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Transfer Certificate of Title, Tax Declaration, Boundaries, and Right-of-Way.
              </p>
            </div>
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-950 text-emerald-300 border border-emerald-800">
              Clean Title Verified
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
            <div className={`p-4 rounded-2xl ${innerBg}`}>
              <span className="text-slate-400 block mb-1">Title Type & Number:</span>
              <strong className="text-white text-sm font-mono">TCT No. 040-2023004812</strong>
              <div className="text-[11px] text-emerald-400 mt-1">Registry of Deeds: Angeles City</div>
            </div>

            <div className={`p-4 rounded-2xl ${innerBg}`}>
              <span className="text-slate-400 block mb-1">Tax Declaration Number:</span>
              <strong className="text-white text-sm font-mono">TD-2024-03-01827</strong>
              <div className="text-[11px] text-slate-400 mt-1">Real Property Tax Paid (Current 2026)</div>
            </div>

            <div className={`p-4 rounded-2xl ${innerBg}`}>
              <span className="text-slate-400 block mb-1">Lot Area & Classification:</span>
              <strong className="text-white text-sm">1,250 m² (Residential R-2)</strong>
              <div className="text-[11px] text-slate-400 mt-1">Allowable Building Footprint: 70%</div>
            </div>

            <div className={`p-4 rounded-2xl ${innerBg}`}>
              <span className="text-slate-400 block mb-1">Road Right-of-Way (RROW):</span>
              <strong className="text-white text-sm">10.0 Meters Concrete Paved</strong>
              <div className="text-[11px] text-emerald-400 mt-1">Heavy Concrete Mixer Truck Accessible</div>
            </div>

            <div className={`p-4 rounded-2xl ${innerBg}`}>
              <span className="text-slate-400 block mb-1">Boundary Geodetic Survey:</span>
              <strong className="text-white text-sm">Monuments Verified (PRS92)</strong>
              <div className="text-[11px] text-slate-400 mt-1">Geodetic Engr. L. Ocampo • Oct 2025</div>
            </div>

            <div className={`p-4 rounded-2xl ${innerBg}`}>
              <span className="text-slate-400 block mb-1">Geotechnical Investigation:</span>
              <strong className="text-white text-sm">2 Boreholes (12m depth)</strong>
              <div className="text-[11px] text-emerald-400 mt-1">Allowable Soil Bearing: 220 kPa</div>
            </div>
          </div>
        </div>
      )}

      {/* ---------------------------------------------------- */}
      {/* 3. DESIGN & ENGINEERING SUB-TAB */}
      {/* ---------------------------------------------------- */}
      {currentTab === 'design' && (
        <div className={`p-6 sm:p-8 rounded-3xl border ${cardBg} space-y-6`}>
          <div className="pb-4 border-b border-white/10 flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Compass className="w-5 h-5 text-[#C6922D]" />
                <span>Design & Engineering Plans (Signed & Sealed)</span>
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Architectural, Structural, Electrical, Plumbing, and Mechanical drawings compliant with PD 1096.
              </p>
            </div>
            <button
              onClick={onOpenUploadModal}
              className="px-3 py-1.5 rounded-xl bg-[#C6922D] hover:bg-[#d8a339] text-[#071A2F] font-bold text-xs flex items-center gap-1.5"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Upload Revision</span>
            </button>
          </div>

          <div className="space-y-3 text-xs">
            {[
              {
                discipline: 'Architectural Working Drawings (A-01 to A-24)',
                professional: 'Arch. Don Eduardo Miranda, uap (PRC 0038912)',
                sheets: '24 Sheets (Plans, Elevations, Sections, Window/Door Schedules)',
                rev: 'Rev 2 (Issued for Tender)',
                status: 'Signed & Sealed',
              },
              {
                discipline: 'Structural Engineering Plans & Calculations (S-01 to S-16)',
                professional: 'Engr. Ferdinand David, MSCE (PRC 0081245)',
                sheets: '16 Sheets (Footing Details, Column/Beam Schedules, Slabs, Cistern)',
                rev: 'Rev 1 (Issued for Permit)',
                status: 'Signed & Sealed',
              },
              {
                discipline: 'Electrical & Solar Microgrid Design (E-01 to E-10)',
                professional: 'Engr. Roberto Gomez, PEE (PRC 0019482)',
                sheets: '10 Sheets (Single Line Diagram, Load Computation, PV Wiring, BESS)',
                rev: 'Rev 1 (Approved)',
                status: 'Signed & Sealed',
              },
              {
                discipline: 'Sanitary, Plumbing & Storm Drainage (P-01 to P-08)',
                professional: 'Engr. J. Manaloto, Master Plumber (PRC 004812)',
                sheets: '8 Sheets (Water Supply, Waste Layout, 20kL Cistern, STP Eco-Septic)',
                rev: 'Rev 1 (Approved)',
                status: 'Signed & Sealed',
              },
              {
                discipline: 'Mechanical & VRF Air Conditioning Layout (M-01 to M-06)',
                professional: 'Engr. C. Panganiban, PME (PRC 0023910)',
                sheets: '6 Sheets (VRF Piping, Ductwork, Kitchen Hood Exhaust)',
                rev: 'Rev 0 (Under Review)',
                status: 'Pending Final Seal',
              },
            ].map((plan, idx) => (
              <div
                key={idx}
                className="p-4 rounded-2xl bg-[#051322] border border-white/5 flex flex-col md:flex-row md:items-center justify-between gap-3"
              >
                <div>
                  <div className="font-bold text-white text-sm">{plan.discipline}</div>
                  <div className="text-slate-400 text-xs mt-0.5">{plan.professional}</div>
                  <div className="text-[11px] text-slate-500 mt-0.5">{plan.sheets}</div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <span className="font-mono text-xs font-semibold text-[#C6922D] block">
                      {plan.rev}
                    </span>
                    <span
                      className={`text-[10px] font-bold ${
                        plan.status === 'Signed & Sealed' ? 'text-emerald-400' : 'text-amber-400'
                      }`}
                    >
                      {plan.status}
                    </span>
                  </div>
                  <button className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300">
                    <Eye className="w-4 h-4" />
                  </button>
                  <button className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300">
                    <Download className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ---------------------------------------------------- */}
      {/* 4. SCOPE OF WORK BUILDER SUB-TAB */}
      {/* ---------------------------------------------------- */}
      {currentTab === 'scope' && (
        <div className={`p-6 sm:p-8 rounded-3xl border ${cardBg} space-y-6`}>
          <div className="pb-4 border-b border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Layers className="w-5 h-5 text-[#C6922D]" />
                <span>Scope of Work Builder (30 Construction Trades)</span>
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Define exact trade responsibility (Included, Excluded, Owner Supplied, Contractor Supplied).
              </p>
            </div>

            <div className="flex items-center gap-2 text-xs">
              <span className="text-slate-400">Filter:</span>
              <select
                value={filterTrade}
                onChange={(e) => setFilterTrade(e.target.value)}
                className="p-1.5 rounded-lg bg-[#051322] border border-white/10 text-white text-xs"
              >
                <option value="ALL">All Trade Divisions</option>
                <option value="General">General / Site</option>
                <option value="Civil">Civil Works</option>
                <option value="Structural">Structural Concrete</option>
                <option value="Steel & Roof">Roof & Steel</option>
                <option value="Finishes">Finishes</option>
              </select>
            </div>
          </div>

          <div className="space-y-2.5">
            {scopeList
              .filter((item) => filterTrade === 'ALL' || item.category === filterTrade)
              .map((item) => (
                <div
                  key={item.id}
                  className="p-4 rounded-2xl bg-[#051322] border border-white/5 flex flex-col md:flex-row md:items-center justify-between gap-4"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-[10px] font-bold text-[#C6922D] bg-[#C6922D]/10 px-2 py-0.5 rounded">
                        Div {item.divisionNumber}
                      </span>
                      <h4 className="text-xs font-bold text-white">{item.workPackage}</h4>
                    </div>
                    <p className="text-[11px] text-slate-400">{item.notes}</p>
                  </div>

                  <div className="flex flex-wrap items-center gap-1.5 shrink-0">
                    {[
                      { id: 'INCLUDED', label: 'Included', color: 'bg-emerald-950 text-emerald-300 border-emerald-800' },
                      { id: 'EXCLUDED', label: 'Excluded', color: 'bg-rose-950 text-rose-300 border-rose-800' },
                      { id: 'OPTIONAL', label: 'Optional', color: 'bg-amber-950 text-amber-300 border-amber-800' },
                      { id: 'OWNER_SUPPLIED', label: 'Owner Supply', color: 'bg-blue-950 text-blue-300 border-blue-800' },
                      { id: 'CONTRACTOR_SUPPLIED', label: 'Contractor Supply', color: 'bg-purple-950 text-purple-300 border-purple-800' },
                    ].map((status) => (
                      <button
                        key={status.id}
                        onClick={() => {
                          setScopeList(
                            scopeList.map((s) => (s.id === item.id ? { ...s, assignment: status.id as any } : s))
                          );
                        }}
                        className={`px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase border transition-all ${
                          item.assignment === status.id
                            ? `${status.color} shadow-sm ring-1 ring-[#C6922D]`
                            : 'bg-white/5 border-white/5 text-slate-400 hover:text-slate-200'
                        }`}
                      >
                        {status.label}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}

      {/* ---------------------------------------------------- */}
      {/* 5. BOQ & COST ESTIMATE WORKSPACE */}
      {/* ---------------------------------------------------- */}
      {currentTab === 'boq' && (
        <div className={`p-6 sm:p-8 rounded-3xl border ${cardBg} space-y-6`}>
          <div className="pb-4 border-b border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <DollarSign className="w-5 h-5 text-[#C6922D]" />
                <span>Bill of Quantities (BOQ) & Unit Rate Cost Workspace</span>
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Itemized work divisions with owner baseline estimate vs evaluated contractor unit rates.
              </p>
            </div>

            <div className="flex items-center gap-4 text-xs font-mono">
              <div>
                <span className="text-slate-400 block text-[10px]">Total Owner Estimate:</span>
                <strong className="text-white text-sm">₱{totalOwnerEstimate.toLocaleString()}</strong>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px]">Total Contractor Rate:</span>
                <strong className="text-emerald-400 text-sm">₱{totalContractorBid.toLocaleString()}</strong>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#051322] text-slate-400 uppercase text-[10px] font-mono border-b border-white/10">
                <tr>
                  <th className="p-3">Item #</th>
                  <th className="p-3">Work Division & Description</th>
                  <th className="p-3 text-center">Unit</th>
                  <th className="p-3 text-right">Qty</th>
                  <th className="p-3 text-right">Owner Rate (₱)</th>
                  <th className="p-3 text-right">Contractor Rate (₱)</th>
                  <th className="p-3 text-right">Total Amount (₱)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 font-sans">
                {boqList.map((item) => {
                  const lineTotal = item.quantity * item.contractorUnitPrice;
                  return (
                    <tr key={item.id} className="hover:bg-white/[0.02]">
                      <td className="p-3 font-mono font-bold text-[#C6922D]">{item.itemNumber}</td>
                      <td className="p-3">
                        <div className="font-semibold text-white">{item.description}</div>
                        <div className="text-[10px] text-slate-400">{item.division} • {item.specReference}</div>
                      </td>
                      <td className="p-3 text-center text-slate-400 font-mono">{item.unit}</td>
                      <td className="p-3 text-right font-mono text-white">{item.quantity.toLocaleString()}</td>
                      <td className="p-3 text-right font-mono text-slate-300">
                        ₱{item.ownerEstimateUnitPrice.toLocaleString()}
                      </td>
                      <td className="p-3 text-right font-mono text-emerald-400 font-bold">
                        ₱{item.contractorUnitPrice.toLocaleString()}
                      </td>
                      <td className="p-3 text-right font-mono font-bold text-white">
                        ₱{lineTotal.toLocaleString()}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ---------------------------------------------------- */}
      {/* 6. BUDGET & FUNDING SUB-TAB */}
      {/* ---------------------------------------------------- */}
      {currentTab === 'budget' && (
        <div className={`p-6 sm:p-8 rounded-3xl border ${cardBg} space-y-6`}>
          <div className="pb-4 border-b border-white/10">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Percent className="w-5 h-5 text-[#C6922D]" />
              <span>Project Budget, Funding & Retention Ledger</span>
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Authorized project ceiling, committed contracts, progress billings, and 10% statutory retention.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div className={`p-5 rounded-2xl ${innerBg}`}>
              <span className="text-slate-400 block mb-1">Approved Project Ceiling:</span>
              <strong className="text-2xl font-bold font-mono text-white">
                ₱{project.targetBudgetPHP.toLocaleString()}
              </strong>
              <div className="text-[11px] text-emerald-400 mt-1">100% Equity Allocation Confirmed</div>
            </div>

            <div className={`p-5 rounded-2xl ${innerBg}`}>
              <span className="text-slate-400 block mb-1">Contractor Contract Price:</span>
              <strong className="text-2xl font-bold font-mono text-emerald-400">₱30,450,000</strong>
              <div className="text-[11px] text-slate-400 mt-1">Pending Award to Lowest Responsible Bidder</div>
            </div>

            <div className={`p-5 rounded-2xl ${innerBg}`}>
              <span className="text-slate-400 block mb-1">Uncommitted Contingency Reserve:</span>
              <strong className="text-2xl font-bold font-mono text-amber-400">₱1,550,000</strong>
              <div className="text-[11px] text-slate-400 mt-1">Dedicated buffer for unforeseen subsoil/variations</div>
            </div>
          </div>
        </div>
      )}

      {/* ---------------------------------------------------- */}
      {/* 7. CONTRACTOR BIDDING & COMPARISON SUB-TAB */}
      {/* ---------------------------------------------------- */}
      {currentTab === 'contractors' && (
        <div className={`p-6 sm:p-8 rounded-3xl border ${cardBg} space-y-6`}>
          <div className="pb-4 border-b border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Hammer className="w-5 h-5 text-[#C6922D]" />
                <span>Side-by-Side Contractor Bid Comparison Matrix</span>
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Technical completeness, price normalization, PCAB credentials, and contract duration.
              </p>
            </div>

            <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#C6922D]/20 text-[#C6922D] border border-[#C6922D]/40">
              Contractor Procurement Stage
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#051322] text-slate-400 uppercase text-[10px] font-mono border-b border-white/10">
                <tr>
                  <th className="p-3">Contractor / Firm</th>
                  <th className="p-3">PCAB Category</th>
                  <th className="p-3 text-right">Submitted Bid</th>
                  <th className="p-3 text-right">Adjusted Bid</th>
                  <th className="p-3 text-center">Duration</th>
                  <th className="p-3 text-center">Mobilization</th>
                  <th className="p-3 text-center">Retention</th>
                  <th className="p-3 text-center">Completeness</th>
                  <th className="p-3 text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 font-sans">
                {contractorBids.map((bid) => (
                  <tr key={bid.contractorId} className="hover:bg-white/[0.02]">
                    <td className="p-3">
                      <div className="font-bold text-white">{bid.contractorName}</div>
                      <div className="text-[10px] text-slate-400">{bid.keyPersonnel}</div>
                    </td>
                    <td className="p-3 text-slate-300 font-semibold">{bid.pcabLicenseCategory}</td>
                    <td className="p-3 text-right font-mono font-bold text-white">
                      ₱{bid.bidAmountPHP.toLocaleString()}
                    </td>
                    <td className="p-3 text-right font-mono font-bold text-emerald-400">
                      ₱{bid.adjustedBidAmountPHP.toLocaleString()}
                    </td>
                    <td className="p-3 text-center font-mono text-slate-300">{bid.constructionDurationDays} Days</td>
                    <td className="p-3 text-center font-mono text-slate-300">{bid.mobilizationPercentage}%</td>
                    <td className="p-3 text-center font-mono text-slate-300">{bid.retentionPercentage}%</td>
                    <td className="p-3 text-center">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-950 text-emerald-300 border border-emerald-800">
                        {bid.technicalCompletenessPercent}%
                      </span>
                    </td>
                    <td className="p-3 text-center">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-white/10 text-slate-300">
                        {bid.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ---------------------------------------------------- */}
      {/* 8. SCHEDULE & MILESTONES SUB-TAB */}
      {/* ---------------------------------------------------- */}
      {currentTab === 'milestones' && (
        <div className={`p-6 sm:p-8 rounded-3xl border ${cardBg} space-y-6`}>
          <div className="pb-4 border-b border-white/10">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Calendar className="w-5 h-5 text-[#C6922D]" />
              <span>Project Construction Milestones</span>
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Key critical path milestones, target completion dates, and inspection requirements.
            </p>
          </div>

          <div className="space-y-3 text-xs">
            {[
              { phase: 'Phase 1: Site Clearing, Shoring & Foundation Excavation', date: 'Nov 2026', status: 'Upcoming', progress: 0 },
              { phase: 'Phase 2: Substructure Concrete & 20kL Cistern Construction', date: 'Jan 2027', status: 'Pending', progress: 0 },
              { phase: 'Phase 3: Superstructure Columns, Beams & 2nd Floor Slabs', date: 'Apr 2027', status: 'Pending', progress: 0 },
              { phase: 'Phase 4: Roofing, Exterior Enclosures & Waterproofing Tests', date: 'Jun 2027', status: 'Pending', progress: 0 },
              { phase: 'Phase 5: MEPFS Rough-Ins & Solar Microgrid Installation', date: 'Aug 2027', status: 'Pending', progress: 0 },
              { phase: 'Phase 6: Interior Architectural Finishes & Fixtures', date: 'Sep 2027', status: 'Pending', progress: 0 },
              { phase: 'Phase 7: Testing, Commissioning, Occupancy Permit & Handover', date: 'Oct 2027', status: 'Target Handover', progress: 0 },
            ].map((m, idx) => (
              <div key={idx} className="p-3.5 rounded-xl bg-[#051322] border border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-lg bg-[#C6922D]/20 border border-[#C6922D]/40 text-[#C6922D] flex items-center justify-center font-bold font-mono text-xs">
                    {idx + 1}
                  </div>
                  <div>
                    <div className="font-bold text-white">{m.phase}</div>
                    <div className="text-[11px] text-slate-400">Target Target: {m.date}</div>
                  </div>
                </div>
                <span className="text-[10px] font-bold uppercase px-2.5 py-1 rounded-full bg-white/10 text-slate-300">
                  {m.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ---------------------------------------------------- */}
      {/* 9. PERMITS & CLEARANCES SUB-TAB */}
      {/* ---------------------------------------------------- */}
      {currentTab === 'permits' && (
        <div className={`p-6 sm:p-8 rounded-3xl border ${cardBg} space-y-6`}>
          <div className="pb-4 border-b border-white/10">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-[#C6922D]" />
              <span>Statutory Permits & Local Government Clearances</span>
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Tracking mandatory clearances from the City Building Official (OBO), BFP, and DENR.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            {[
              { title: 'Locational Clearance (Zoning)', agency: 'City Planning & Development Office (CPDO)', status: 'Approved', badge: 'bg-emerald-950 text-emerald-300 border-emerald-800' },
              { title: 'Barangay Construction Clearance', agency: 'Barangay Anunas Council', status: 'Approved', badge: 'bg-emerald-950 text-emerald-300 border-emerald-800' },
              { title: 'Fire Safety Evaluation Clearance (FSEC)', agency: 'Bureau of Fire Protection (BFP)', status: 'Approved', badge: 'bg-emerald-950 text-emerald-300 border-emerald-800' },
              { title: 'LGU Building Permit (BP No. 2026-081)', agency: 'Office of the Building Official (OBO)', status: 'Processing', badge: 'bg-amber-950 text-amber-300 border-amber-800' },
              { title: 'Certificate of Non-Coverage (CNC)', agency: 'DENR Environmental Management Bureau', status: 'Approved', badge: 'bg-emerald-950 text-emerald-300 border-emerald-800' },
              { title: 'Occupancy Permit & Final Inspection', agency: 'OBO / BFP Joint Inspection Team', status: 'Pre-Construction', badge: 'bg-slate-800 text-slate-400 border-slate-700' },
            ].map((p, idx) => (
              <div key={idx} className="p-4 rounded-2xl bg-[#051322] border border-white/5 flex items-center justify-between">
                <div>
                  <div className="font-bold text-white text-xs">{p.title}</div>
                  <div className="text-[11px] text-slate-400 mt-0.5">{p.agency}</div>
                </div>
                <span className={`px-2.5 py-0.5 rounded text-[10px] font-bold uppercase border ${p.badge}`}>
                  {p.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
