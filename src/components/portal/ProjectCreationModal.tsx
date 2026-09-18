import React, { useState } from 'react';
import {
  X,
  FolderPlus,
  Building2,
  MapPin,
  DollarSign,
  Calendar,
  Layers,
  FileCheck,
  CheckCircle2,
  Compass,
} from 'lucide-react';
import { ClientProjectItem } from '../../types/clientPortal';

interface ProjectCreationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateProject: (project: ClientProjectItem) => void;
  clientOrgName?: string;
}

export const ProjectCreationModal: React.FC<ProjectCreationModalProps> = ({
  isOpen,
  onClose,
  onCreateProject,
  clientOrgName = 'Angeles Villa Holdings Group',
}) => {
  const [title, setTitle] = useState('');
  const [projectType, setProjectType] = useState('Residential Estate');
  const [province, setProvince] = useState('Pampanga');
  const [city, setCity] = useState('Angeles City');
  const [barangay, setBarangay] = useState('Anunas');
  const [lotAreaSqM, setLotAreaSqM] = useState(1250);
  const [buildingAreaSqM, setBuildingAreaSqM] = useState(680);
  const [numberOfFloors, setNumberOfFloors] = useState(2);
  const [targetBudgetPHP, setTargetBudgetPHP] = useState(32000000);
  const [fundingSource, setFundingSource] = useState('Self-Funded Cash Equity');
  const [procurementMethod, setProcurementMethod] = useState('EPC Design-Build Turnkey');
  const [targetStartDate, setTargetStartDate] = useState('2026-11-01');
  const [targetHandoverDate, setTargetHandoverDate] = useState('2027-10-31');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newProject: ClientProjectItem = {
      id: `PROJECT-${new Date().getFullYear()}-${Math.floor(100000 + Math.random() * 900000)}`,
      title: title || 'New Custom Development Project',
      clientOrganizationId: 'org-client-clark',
      clientOrganizationName: clientOrgName,
      projectType,
      status: 'PLANNING',
      location: `${barangay}, ${city}, ${province}`,
      province,
      lotAreaSqM: Number(lotAreaSqM),
      buildingAreaSqM: Number(buildingAreaSqM),
      numberOfFloors: Number(numberOfFloors),
      targetBudgetPHP: Number(targetBudgetPHP),
      committedBudgetPHP: 0,
      paidAmountPHP: 0,
      currentPhase: 'Engineering & Contractor Procurement',
      overallProgressPercent: 5,
      projectManagerName: 'Engr. J. Dela Cruz',
      targetStartDate,
      targetHandoverDate,
      fundingSource,
      procurementMethod,
      isPrivate: true,
      readinessPercent: 65,
    };
    onCreateProject(newProject);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
      <div className="bg-[#09223d] border border-[#C6922D]/40 rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl p-6 sm:p-8">
        <div className="flex items-center justify-between pb-4 border-b border-white/10">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-[#C6922D]/20 border border-[#C6922D]/40 flex items-center justify-center text-[#C6922D]">
              <FolderPlus className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Create New Client Project</h2>
              <p className="text-xs text-slate-400 font-mono">SECTION 3 STANDARD CREATION WIZARD</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4 text-xs">
          <div>
            <label className="block font-semibold uppercase text-slate-300 mb-1">
              Project Title / Development Name *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Angeles City Residential Villa Cluster"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-2.5 bg-[#051322] border border-white/10 rounded-xl text-white focus:border-[#C6922D] focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold uppercase text-slate-300 mb-1">Project Classification</label>
              <select
                value={projectType}
                onChange={(e) => setProjectType(e.target.value)}
                className="w-full p-2.5 bg-[#051322] border border-white/10 rounded-xl text-white"
              >
                <option value="Residential Estate">Residential Estate / Luxury Villa</option>
                <option value="Commercial Building">Commercial Building / Retail Complex</option>
                <option value="Industrial Logistics">Industrial Warehouse / Logistics Hub</option>
                <option value="Residential Subdivision">Residential Subdivision / Townhouses</option>
                <option value="Hospitality Resort">Hospitality / Boutique Resort</option>
                <option value="Major Renovation">Major Renovation & Adaptive Re-use</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold uppercase text-slate-300 mb-1">Target Procurement Model</label>
              <select
                value={procurementMethod}
                onChange={(e) => setProcurementMethod(e.target.value)}
                className="w-full p-2.5 bg-[#051322] border border-white/10 rounded-xl text-white"
              >
                <option value="EPC Design-Build Turnkey">EPC Design-Build Turnkey</option>
                <option value="General Contractor (Traditional)">General Contractor (Build Only)</option>
                <option value="Specialty Trade Packages">Trade Package Tenders</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block font-semibold uppercase text-slate-300 mb-1">Province</label>
              <input
                type="text"
                value={province}
                onChange={(e) => setProvince(e.target.value)}
                className="w-full p-2.5 bg-[#051322] border border-white/10 rounded-xl text-white"
              />
            </div>
            <div>
              <label className="block font-semibold uppercase text-slate-300 mb-1">City / Municipality</label>
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full p-2.5 bg-[#051322] border border-white/10 rounded-xl text-white"
              />
            </div>
            <div>
              <label className="block font-semibold uppercase text-slate-300 mb-1">Barangay</label>
              <input
                type="text"
                value={barangay}
                onChange={(e) => setBarangay(e.target.value)}
                className="w-full p-2.5 bg-[#051322] border border-white/10 rounded-xl text-white"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block font-semibold uppercase text-slate-300 mb-1">Lot Area (m²)</label>
              <input
                type="number"
                value={lotAreaSqM}
                onChange={(e) => setLotAreaSqM(Number(e.target.value))}
                className="w-full p-2.5 bg-[#051322] border border-white/10 rounded-xl text-white"
              />
            </div>
            <div>
              <label className="block font-semibold uppercase text-slate-300 mb-1">Building Area (m²)</label>
              <input
                type="number"
                value={buildingAreaSqM}
                onChange={(e) => setBuildingAreaSqM(Number(e.target.value))}
                className="w-full p-2.5 bg-[#051322] border border-white/10 rounded-xl text-white"
              />
            </div>
            <div>
              <label className="block font-semibold uppercase text-slate-300 mb-1">Storeys / Floors</label>
              <input
                type="number"
                value={numberOfFloors}
                onChange={(e) => setNumberOfFloors(Number(e.target.value))}
                className="w-full p-2.5 bg-[#051322] border border-white/10 rounded-xl text-white"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold uppercase text-slate-300 mb-1">
                Target Budget (PHP) *
              </label>
              <input
                type="number"
                required
                value={targetBudgetPHP}
                onChange={(e) => setTargetBudgetPHP(Number(e.target.value))}
                className="w-full p-2.5 bg-[#051322] border border-white/10 rounded-xl text-white font-mono font-bold"
              />
            </div>

            <div>
              <label className="block font-semibold uppercase text-slate-300 mb-1">Funding Source</label>
              <select
                value={fundingSource}
                onChange={(e) => setFundingSource(e.target.value)}
                className="w-full p-2.5 bg-[#051322] border border-white/10 rounded-xl text-white"
              >
                <option value="Self-Funded Cash Equity">Self-Funded Cash Equity</option>
                <option value="Bank Construction Loan">Bank Construction Loan</option>
                <option value="Corporate Capital Allocation">Corporate Capital Allocation</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold uppercase text-slate-300 mb-1">Target Start Date</label>
              <input
                type="date"
                value={targetStartDate}
                onChange={(e) => setTargetStartDate(e.target.value)}
                className="w-full p-2.5 bg-[#051322] border border-white/10 rounded-xl text-white"
              />
            </div>
            <div>
              <label className="block font-semibold uppercase text-slate-300 mb-1">Target Completion / Handover</label>
              <input
                type="date"
                value={targetHandoverDate}
                onChange={(e) => setTargetHandoverDate(e.target.value)}
                className="w-full p-2.5 bg-[#051322] border border-white/10 rounded-xl text-white"
              />
            </div>
          </div>

          <div className="pt-4 border-t border-white/10 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl border border-white/10 hover:bg-white/5 text-slate-300 font-semibold"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-[#C6922D] hover:bg-[#d8a339] text-[#071A2F] font-bold uppercase tracking-wider shadow-lg flex items-center gap-2"
            >
              <FolderPlus className="w-4 h-4" />
              <span>Initialize Project Workspace</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
