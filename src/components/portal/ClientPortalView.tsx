import React, { useState } from 'react';
import {
  Building2,
  Calendar,
  CheckCircle2,
  Clock,
  Download,
  Eye,
  FileText,
  Filter,
  Layers,
  Lock,
  MessageSquare,
  Paperclip,
  Plus,
  Send,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  Upload,
  AlertCircle,
  HelpCircle,
  CreditCard,
  UserCheck,
  Award,
} from 'lucide-react';
import {
  MasterProjectRecord,
  WBSTaskRecord,
  MilestoneRecord,
  CDEDocumentRecord,
  InvoiceRecord,
  RFIRecord,
  ClientInformationSheet,
  DevelopmentIntakeRecord,
  UserRole,
} from '../../types/platform';
import {
  SEED_PROJECTS,
  SEED_TASKS,
  SEED_MILESTONES,
  SEED_CDE_DOCUMENTS,
  SEED_INVOICES,
  SEED_RFIS,
} from '../../data/platformSeedData';

interface ClientPortalViewProps {
  currentSubRoute: string;
  onNavigate: (route: string) => void;
  currentUserRole: UserRole;
  portalTheme: 'dark' | 'light';
}

export const ClientPortalView: React.FC<ClientPortalViewProps> = ({
  currentSubRoute,
  onNavigate,
  currentUserRole,
  portalTheme,
}) => {
  // State for Projects, Tasks, Documents, Invoices
  const [projects] = useState<MasterProjectRecord[]>(SEED_PROJECTS);
  const [selectedProject, setSelectedProject] = useState<MasterProjectRecord>(SEED_PROJECTS[0]);
  const [tasks] = useState<WBSTaskRecord[]>(SEED_TASKS);
  const [milestones] = useState<MilestoneRecord[]>(SEED_MILESTONES);
  const [documents] = useState<CDEDocumentRecord[]>(SEED_CDE_DOCUMENTS);
  const [invoices] = useState<InvoiceRecord[]>(SEED_INVOICES);
  const [rfis] = useState<RFIRecord[]>(SEED_RFIS);

  // Client Intake state
  const [intakeForm, setIntakeForm] = useState<Partial<DevelopmentIntakeRecord>>({
    developmentName: 'Angeles Eco-Residential Reserve',
    projectClassification: 'RESIDENTIAL_ESTATE',
    siteAddress: 'Fil-Am Friendship Highway, Angeles City, Pampanga',
    province: 'Pampanga',
    municipality: 'Angeles City',
    lotAreaSqM: 850,
    targetFloorAreaSqM: 450,
    landOwnershipType: 'TITLED_OWNER',
    titleNumber: 'TCT-040-2023004812',
    targetBudgetPHP: '₱25,000,000 — ₱30,000,000',
    preferredArrangement: 'EPC_TURNKEY',
    targetCommencementDate: '2027-01-15',
    targetCompletionDate: '2027-12-20',
    confidentialityLevel: 'STRICT_NDA',
  });
  const [intakeSubmitted, setIntakeSubmitted] = useState(false);
  const [intakeStatus, setIntakeStatus] = useState<'DRAFT' | 'SUBMITTED'>('DRAFT');

  // Client Info Sheet state
  const [infoSheet, setInfoSheet] = useState<Partial<ClientInformationSheet>>({
    legalName: 'Angeles Villa Holdings Corporation',
    tradeName: 'Angeles Villa Group',
    secOrDtiNumber: 'SEC-CS201908471',
    tin: '419-821-002-000',
    registeredAddress: 'Anunas Executive Enclave, Angeles City, Pampanga',
    operatingAddress: 'Same as registered address',
    communicationPreference: 'PORTAL_PRIMARY',
    privacyConsentAccepted: true,
    confidentialityAccepted: true,
  });

  // Assistant messages state
  const [assistantInput, setAssistantInput] = useState('');
  const [assistantMessages, setAssistantMessages] = useState<Array<{ sender: 'user' | 'assistant'; text: string; time: string; citations?: string[] }>>([
    {
      sender: 'assistant',
      text: 'Mabuhay. I am your Dhenze Private Client Assistant. You are authorized to review master schedules, verified architectural drawings, submittal signoffs, and project billing for Angeles Villa Holdings Corporation. How may I assist your development today?',
      time: '10:00 AM',
      citations: ['CDE-Doc-001 (Ground Floor Architectural Masterplan)', 'Master Schedule baseline rev 2'],
    },
  ]);
  const [isAssistantLoading, setIsAssistantLoading] = useState(false);

  const handleSendAssistantMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!assistantInput.trim()) return;

    const userText = assistantInput;
    const userMsg = {
      sender: 'user' as const,
      text: userText,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    setAssistantMessages((prev) => [...prev, userMsg]);
    setAssistantInput('');
    setIsAssistantLoading(true);

    setTimeout(() => {
      setIsAssistantLoading(false);
      let responseText = `Regarding your inquiry on "${userText.slice(0, 40)}...": All structural rebar layouts for ${selectedProject.title} meet DPWH PNS 49 Grade 60 tensile standards. Second floor concrete pour is scheduled for Sept 19 under North Concrete inspection.`;
      let citations = ['ST-201 rev 3 (Structural Rebar)', 'PO-2026-0044 (Ready Mix 4,000 PSI)'];

      if (userText.toLowerCase().includes('budget') || userText.toLowerCase().includes('invoice') || userText.toLowerCase().includes('payment')) {
        responseText = `Current financial position for ${selectedProject.title}: Baseline budget is ₱${(selectedProject.budgetBaselinePHP / 1e6).toFixed(1)}M. Committed cost is ₱${(selectedProject.committedCostPHP / 1e6).toFixed(1)}M. Approved Invoice INV-2026-0182 for ₱12.75M net payable is due on Sept 30.`;
        citations = ['INV-2026-0182', 'Milestone 2 Signoff'];
      }

      setAssistantMessages((prev) => [
        ...prev,
        {
          sender: 'assistant',
          text: responseText,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          citations,
        },
      ]);
    }, 600);
  };

  const isLight = portalTheme === 'light';
  const cardBg = isLight ? 'bg-white border-slate-200 text-slate-900 shadow-sm' : 'bg-slate-900/70 border-slate-800 text-slate-100';
  const headerText = isLight ? 'text-slate-900' : 'text-white';
  const mutedText = isLight ? 'text-slate-500' : 'text-slate-400';

  // Sub-route routing
  const route = currentSubRoute || 'overview';

  return (
    <div className="space-y-6">
      {/* Dynamic Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800/60 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded text-[11px] font-semibold tracking-wider uppercase bg-[#C6922D]/10 text-[#C6922D] border border-[#C6922D]/30">
              Verified Client Portal
            </span>
            <span className={`text-xs ${mutedText}`}>Tenant: {selectedProject.clientName}</span>
          </div>
          <h1 className={`text-2xl sm:text-3xl font-serif ${headerText} mt-1`}>
            {route === 'overview' && 'Development Executive Summary'}
            {route === 'information-sheet' && 'Client Information & Corporate Entity Sheet'}
            {route === 'development-intake' && 'Development Intake & Site Technical Dossier'}
            {route === 'onboarding' && 'Client Onboarding & Compliance Verification'}
            {route === 'projects' && 'Active Projects & Site Pipeline'}
            {route === 'tasks' && 'Work Breakdown Structure & Progress Tasks'}
            {route === 'milestones' && 'Master Schedule & Milestones'}
            {route === 'documents' && 'Common Data Environment (CDE) Document Register'}
            {route === 'drawings' && 'Architectural & Engineering Drawings'}
            {route === 'approvals' && 'Pending Client Decisions & Approvals'}
            {route === 'rfis' && 'Requests for Information (RFIs)'}
            {route === 'reports' && 'Progress Reports & Site Photography'}
            {route === 'invoices' && 'Invoices & Progress Billing Statements'}
            {route === 'payments' && 'Payment Records & Reconciliation'}
            {route === 'assistant' && 'Dhenze Private Client Assistant'}
            {route === 'offerings' && 'Available Development Services & Offerings'}
            {route === 'usage' && 'AI Ledger & Compute Balance'}
            {route === 'settings' && 'Account & Security Governance'}
            {route === 'application-status' && 'Application & Permitting Tracker'}
          </h1>
        </div>

        {/* Project Selector */}
        <div className="flex items-center gap-2">
          <label className={`text-xs ${mutedText}`}>Selected Project:</label>
          <select
            value={selectedProject.id}
            onChange={(e) => {
              const p = projects.find((x) => x.id === e.target.value);
              if (p) setSelectedProject(p);
            }}
            className={`text-xs px-3 py-1.5 rounded-lg border focus:outline-none focus:border-[#C6922D] ${
              isLight ? 'bg-slate-100 border-slate-300 text-slate-900' : 'bg-slate-800 border-slate-700 text-white'
            }`}
          >
            {projects.map((p) => (
              <option key={p.id} value={p.id}>
                {p.title} ({p.currentPhase})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* 1. OVERVIEW VIEW */}
      {route === 'overview' && (
        <div className="space-y-6">
          {/* Top Metric Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className={`p-5 rounded-xl border ${cardBg}`}>
              <span className={`text-xs font-medium uppercase tracking-wider ${mutedText}`}>Overall Execution Progress</span>
              <div className="flex items-baseline justify-between mt-2">
                <span className="text-3xl font-serif text-[#C6922D] font-bold">{selectedProject.overallProgressPercent}%</span>
                <span className="text-xs text-emerald-400 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> On Schedule
                </span>
              </div>
              <div className="w-full bg-slate-800 h-1.5 rounded-full mt-3 overflow-hidden">
                <div
                  className="bg-[#C6922D] h-full rounded-full transition-all"
                  style={{ width: `${selectedProject.overallProgressPercent}%` }}
                />
              </div>
            </div>

            <div className={`p-5 rounded-xl border ${cardBg}`}>
              <span className={`text-xs font-medium uppercase tracking-wider ${mutedText}`}>Baseline Budget</span>
              <div className="flex items-baseline justify-between mt-2">
                <span className={`text-2xl font-serif ${headerText} font-bold`}>
                  ₱{(selectedProject.budgetBaselinePHP / 1e6).toFixed(1)}M
                </span>
                <span className={`text-xs ${mutedText}`}>PHP Currency</span>
              </div>
              <p className={`text-xs ${mutedText} mt-2`}>Committed: ₱{(selectedProject.committedCostPHP / 1e6).toFixed(1)}M</p>
            </div>

            <div className={`p-5 rounded-xl border ${cardBg}`}>
              <span className={`text-xs font-medium uppercase tracking-wider ${mutedText}`}>Days Without Lost-Time Incident</span>
              <div className="flex items-baseline justify-between mt-2">
                <span className="text-3xl font-serif text-emerald-400 font-bold">{selectedProject.safetyDaysWithoutIncident}</span>
                <span className="text-xs text-emerald-400 flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" /> DOLE Certified
                </span>
              </div>
              <p className={`text-xs ${mutedText} mt-2`}>Zero safety violations recorded</p>
            </div>

            <div className={`p-5 rounded-xl border ${cardBg}`}>
              <span className={`text-xs font-medium uppercase tracking-wider ${mutedText}`}>Target Completion</span>
              <div className="flex items-baseline justify-between mt-2">
                <span className={`text-2xl font-serif ${headerText} font-bold`}>
                  {selectedProject.targetCompletionDate}
                </span>
                <span className="text-xs text-amber-400 flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" /> Phase 2
                </span>
              </div>
              <p className={`text-xs ${mutedText} mt-2`}>PM: {selectedProject.projectManagerName}</p>
            </div>
          </div>

          {/* Quick Actions & Recent Highlights */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className={`lg:col-span-2 p-6 rounded-xl border ${cardBg}`}>
              <div className="flex items-center justify-between mb-4">
                <h2 className={`text-lg font-serif ${headerText}`}>Current Phase Work Breakdown</h2>
                <button
                  onClick={() => onNavigate('/portal/client/tasks')}
                  className="text-xs text-[#C6922D] hover:underline"
                >
                  View All Tasks →
                </button>
              </div>

              <div className="space-y-3">
                {tasks.slice(0, 3).map((task) => (
                  <div
                    key={task.id}
                    className={`p-3.5 rounded-lg border flex items-center justify-between gap-4 ${
                      isLight ? 'bg-slate-50 border-slate-200' : 'bg-slate-800/50 border-slate-700/60'
                    }`}
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-mono text-[#C6922D] font-bold">{task.taskNumber}</span>
                        <span className={`text-xs font-medium ${headerText}`}>{task.title}</span>
                      </div>
                      <p className={`text-[11px] ${mutedText} mt-0.5`}>
                        {task.phase} • Assigned to: {task.assignedToName} ({task.responsibleOrgName})
                      </p>
                    </div>
                    <div className="text-right shrink-0">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                        task.status === 'IN_PROGRESS' ? 'bg-amber-500/20 text-amber-300' : 'bg-emerald-500/20 text-emerald-300'
                      }`}>
                        {task.status.replace('_', ' ')}
                      </span>
                      <p className={`text-[10px] ${mutedText} mt-1`}>{task.progressPercent}% Done</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Actions Requiring Attention */}
            <div className={`p-6 rounded-xl border ${cardBg} space-y-4`}>
              <h2 className={`text-lg font-serif ${headerText}`}>Pending Sign-Offs</h2>
              <div className="p-3 rounded-lg bg-amber-500/10 border border-amber-500/20 text-xs text-amber-300 space-y-1">
                <p className="font-semibold flex items-center gap-1.5">
                  <AlertCircle className="w-4 h-4 text-amber-400" /> Milestone 2 Sign-Off
                </p>
                <p className="text-[11px] text-amber-200/80">
                  Substructure Ground Floor Concrete Pour inspection passed. Client counter-signature required for contractor release.
                </p>
                <button
                  onClick={() => onNavigate('/portal/client/approvals')}
                  className="mt-2 text-[11px] font-bold underline uppercase tracking-wider text-amber-400 hover:text-white"
                >
                  Review Submittal Dossier →
                </button>
              </div>

              <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/20 text-xs text-blue-300 space-y-1">
                <p className="font-semibold flex items-center gap-1.5">
                  <FileText className="w-4 h-4 text-blue-400" /> New Transmittal TR-2026-0091
                </p>
                <p className="text-[11px] text-blue-200/80">
                  2 Architectural & Structural drawing sheets delivered for review.
                </p>
                <button
                  onClick={() => onNavigate('/portal/client/drawings')}
                  className="mt-2 text-[11px] font-bold underline uppercase tracking-wider text-blue-400 hover:text-white"
                >
                  Open Drawings Viewer →
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 2. DEVELOPMENT INTAKE FORM */}
      {(route === 'development-intake' || route === 'onboarding') && (
        <div className={`p-6 sm:p-8 rounded-xl border ${cardBg}`}>
          <div className="max-w-3xl">
            <h2 className={`text-xl font-serif ${headerText} mb-2`}>
              Development Technical Intake & Site Profile
            </h2>
            <p className={`text-xs ${mutedText} mb-6 leading-relaxed`}>
              Provide parcel boundaries, title status, target investment scale, and infrastructure readiness for engineering evaluation by our Licensed Civil & Geodetic teams.
            </p>

            {intakeSubmitted ? (
              <div className="p-6 rounded-xl bg-emerald-950/40 border border-emerald-800 text-center space-y-3">
                <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
                <h3 className="text-base font-serif text-white font-bold">Technical Intake Successfully Filed</h3>
                <p className="text-xs text-slate-300 max-w-md mx-auto">
                  Your development proposal has been assigned Docket No. <span className="text-[#C6922D] font-mono font-bold">LDL-INT-2026-041</span>. Our Project Controls Director will issue the preliminary feasibility memorandum within 48 business hours.
                </p>
                <button
                  onClick={() => setIntakeSubmitted(false)}
                  className="mt-4 px-4 py-2 rounded-lg bg-slate-800 text-xs text-white hover:bg-slate-700"
                >
                  Edit Information / Resubmit
                </button>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setIntakeSubmitted(true);
                  setIntakeStatus('SUBMITTED');
                }}
                className="space-y-6"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className={`block text-xs font-semibold uppercase tracking-wider ${mutedText} mb-1`}>
                      Development Name
                    </label>
                    <input
                      type="text"
                      value={intakeForm.developmentName}
                      onChange={(e) => setIntakeForm({ ...intakeForm, developmentName: e.target.value })}
                      required
                      className={`w-full text-xs px-3 py-2 rounded-lg border focus:outline-none focus:border-[#C6922D] ${
                        isLight ? 'bg-slate-50 border-slate-300' : 'bg-slate-800 border-slate-700 text-white'
                      }`}
                    />
                  </div>

                  <div>
                    <label className={`block text-xs font-semibold uppercase tracking-wider ${mutedText} mb-1`}>
                      Classification
                    </label>
                    <select
                      value={intakeForm.projectClassification}
                      onChange={(e) => setIntakeForm({ ...intakeForm, projectClassification: e.target.value as any })}
                      className={`w-full text-xs px-3 py-2 rounded-lg border focus:outline-none focus:border-[#C6922D] ${
                        isLight ? 'bg-slate-50 border-slate-300' : 'bg-slate-800 border-slate-700 text-white'
                      }`}
                    >
                      <option value="RESIDENTIAL_ESTATE">Private Residential Estate</option>
                      <option value="MIXED_USE">Mixed-Use Commercial & Residential</option>
                      <option value="HOSPITALITY">Boutique Resort & Hospitality</option>
                      <option value="LOGISTICS">Industrial Logistics & Warehouse</option>
                      <option value="RENEWABLE_MICROGRID">Commercial Solar & Microgrid</option>
                    </select>
                  </div>

                  <div>
                    <label className={`block text-xs font-semibold uppercase tracking-wider ${mutedText} mb-1`}>
                      Site Address / Location
                    </label>
                    <input
                      type="text"
                      value={intakeForm.siteAddress}
                      onChange={(e) => setIntakeForm({ ...intakeForm, siteAddress: e.target.value })}
                      required
                      className={`w-full text-xs px-3 py-2 rounded-lg border focus:outline-none focus:border-[#C6922D] ${
                        isLight ? 'bg-slate-50 border-slate-300' : 'bg-slate-800 border-slate-700 text-white'
                      }`}
                    />
                  </div>

                  <div>
                    <label className={`block text-xs font-semibold uppercase tracking-wider ${mutedText} mb-1`}>
                      Lot Area (Sq. Meters)
                    </label>
                    <input
                      type="number"
                      value={intakeForm.lotAreaSqM}
                      onChange={(e) => setIntakeForm({ ...intakeForm, lotAreaSqM: Number(e.target.value) })}
                      required
                      className={`w-full text-xs px-3 py-2 rounded-lg border focus:outline-none focus:border-[#C6922D] ${
                        isLight ? 'bg-slate-50 border-slate-300' : 'bg-slate-800 border-slate-700 text-white'
                      }`}
                    />
                  </div>

                  <div>
                    <label className={`block text-xs font-semibold uppercase tracking-wider ${mutedText} mb-1`}>
                      Target Investment Scale (PHP)
                    </label>
                    <input
                      type="text"
                      value={intakeForm.targetBudgetPHP}
                      onChange={(e) => setIntakeForm({ ...intakeForm, targetBudgetPHP: e.target.value })}
                      required
                      className={`w-full text-xs px-3 py-2 rounded-lg border focus:outline-none focus:border-[#C6922D] ${
                        isLight ? 'bg-slate-50 border-slate-300' : 'bg-slate-800 border-slate-700 text-white'
                      }`}
                    />
                  </div>

                  <div>
                    <label className={`block text-xs font-semibold uppercase tracking-wider ${mutedText} mb-1`}>
                      Land Title Status
                    </label>
                    <input
                      type="text"
                      value={intakeForm.titleNumber}
                      onChange={(e) => setIntakeForm({ ...intakeForm, titleNumber: e.target.value })}
                      placeholder="e.g. TCT-040-2023004812"
                      className={`w-full text-xs px-3 py-2 rounded-lg border focus:outline-none focus:border-[#C6922D] ${
                        isLight ? 'bg-slate-50 border-slate-300' : 'bg-slate-800 border-slate-700 text-white'
                      }`}
                    />
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-800/60 flex items-center justify-between">
                  <span className={`text-xs ${mutedText}`}>Confidentiality: Strict NDA Enforced</span>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => alert('Draft saved locally.')}
                      className="px-4 py-2 rounded-lg border border-slate-700 text-xs text-slate-300 hover:bg-slate-800"
                    >
                      Save as Draft
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2 rounded-lg bg-[#C6922D] hover:bg-[#dfad4b] text-slate-950 font-bold text-xs uppercase tracking-wider transition-colors"
                    >
                      Submit Technical Intake
                    </button>
                  </div>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* 3. DRAWINGS & CDE REGISTER */}
      {(route === 'documents' || route === 'drawings') && (
        <div className={`p-6 rounded-xl border ${cardBg}`}>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <h2 className={`text-lg font-serif ${headerText}`}>
                {route === 'drawings' ? 'Architectural & Engineering Drawings Register' : 'Common Data Environment (CDE) Documents'}
              </h2>
              <p className={`text-xs ${mutedText}`}>
                Controlled drawings and technical specifications watermarked for Angeles Villa Holdings Corporation.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400">Filter:</span>
              <select className={`text-xs px-2.5 py-1.5 rounded border ${isLight ? 'bg-slate-50' : 'bg-slate-800 border-slate-700 text-white'}`}>
                <option>All Disciplines</option>
                <option>Architectural (ARCH)</option>
                <option>Structural (STRUCT)</option>
                <option>MEPFS</option>
              </select>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className={`border-b ${isLight ? 'border-slate-200 text-slate-600' : 'border-slate-800 text-slate-400'}`}>
                <tr>
                  <th className="pb-3 font-semibold uppercase tracking-wider">Document No.</th>
                  <th className="pb-3 font-semibold uppercase tracking-wider">Drawing Title</th>
                  <th className="pb-3 font-semibold uppercase tracking-wider">Rev</th>
                  <th className="pb-3 font-semibold uppercase tracking-wider">Discipline</th>
                  <th className="pb-3 font-semibold uppercase tracking-wider">Status</th>
                  <th className="pb-3 font-semibold uppercase tracking-wider text-right">Actions</th>
                </tr>
              </thead>
              <tbody className={`divide-y ${isLight ? 'divide-slate-200' : 'divide-slate-800'}`}>
                {documents.map((doc) => (
                  <tr key={doc.id} className="hover:bg-slate-800/20 transition-colors">
                    <td className="py-3 font-mono text-[#C6922D] font-bold">{doc.documentNumber}</td>
                    <td className={`py-3 font-medium ${headerText}`}>{doc.title}</td>
                    <td className="py-3 font-mono text-slate-400">{doc.revision}</td>
                    <td className="py-3 text-slate-300">{doc.discipline}</td>
                    <td className="py-3">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                        doc.status === 'ACCEPTED' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-amber-500/10 text-amber-400'
                      }`}>
                        {doc.status.replace('_', ' ')}
                      </span>
                    </td>
                    <td className="py-3 text-right">
                      <button
                        onClick={() => alert(`Watermarked PDF download initiated for ${doc.documentNumber} under user audit token.`)}
                        className="p-1.5 rounded hover:bg-slate-700/50 text-[#C6922D] transition-colors"
                        title="Download Controlled Copy"
                      >
                        <Download className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 4. INVOICES & PAYMENTS */}
      {(route === 'invoices' || route === 'payments' || route === 'financials') && (
        <div className={`p-6 rounded-xl border ${cardBg}`}>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className={`text-lg font-serif ${headerText}`}>Progress Billing Statements & Invoices</h2>
              <p className={`text-xs ${mutedText}`}>Progress payment certificates, statutory 10% retention, and BIR 2307 withholding accounts.</p>
            </div>
          </div>

          <div className="space-y-4">
            {invoices.map((inv) => (
              <div
                key={inv.id}
                className={`p-4 rounded-lg border flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                  isLight ? 'bg-slate-50 border-slate-200' : 'bg-slate-800/50 border-slate-700'
                }`}
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-[#C6922D]">{inv.invoiceNumber}</span>
                    <span className={`text-xs font-semibold ${headerText}`}>{inv.milestoneReference}</span>
                  </div>
                  <p className={`text-xs ${mutedText} mt-1`}>
                    Gross: ₱{(inv.grossAmountPHP / 1e6).toFixed(2)}M • 10% Retention: ₱{(inv.retentionDeductionPHP / 1e6).toFixed(2)}M • Net Payable: ₱{(inv.netPayablePHP / 1e6).toFixed(2)}M
                  </p>
                  <p className={`text-[11px] ${mutedText}`}>Invoice Date: {inv.invoiceDate} • Due Date: {inv.dueDate}</p>
                </div>

                <div className="flex items-center gap-3">
                  <span className="px-2.5 py-1 rounded text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    {inv.status.replace('_', ' ')}
                  </span>
                  <button
                    onClick={() => alert(`Official Receipt and Electronic BIR 2307 generated for ${inv.invoiceNumber}.`)}
                    className="px-3 py-1.5 rounded bg-slate-800 hover:bg-slate-700 text-xs text-white flex items-center gap-1.5 transition-colors"
                  >
                    <Download className="w-3.5 h-3.5" /> PDF
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 5. DHENZE PRIVATE CLIENT ASSISTANT */}
      {route === 'assistant' && (
        <div className={`rounded-xl border ${cardBg} flex flex-col h-[580px] overflow-hidden`}>
          <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-slate-900/80">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-[#C6922D]" />
              <div>
                <h3 className="text-sm font-serif text-white font-bold">Dhenze Private Client Assistant</h3>
                <p className="text-[11px] text-slate-400">Context filtered to {selectedProject.title} CDE records only</p>
              </div>
            </div>
            <span className="px-2 py-0.5 rounded text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              RBAC Verified
            </span>
          </div>

          {/* Chat Stream */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {assistantMessages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-xl rounded-xl p-3.5 text-xs leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-[#C6922D] text-slate-950 font-medium'
                      : isLight
                      ? 'bg-slate-100 text-slate-900 border border-slate-200'
                      : 'bg-slate-800 text-slate-200 border border-slate-700'
                  }`}
                >
                  <p>{msg.text}</p>
                  {msg.citations && msg.citations.length > 0 && (
                    <div className="mt-2 pt-2 border-t border-slate-700/50 text-[10px] text-slate-400 space-y-0.5">
                      <span className="font-bold text-[#C6922D]">Verified Sources:</span>
                      {msg.citations.map((c, i) => (
                        <div key={i} className="flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3 text-emerald-400" /> {c}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                <span className={`text-[10px] ${mutedText} mt-1`}>{msg.time}</span>
              </div>
            ))}
            {isAssistantLoading && (
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <Clock className="w-3.5 h-3.5 animate-spin text-[#C6922D]" />
                <span>Consulting CDE database & structural registers...</span>
              </div>
            )}
          </div>

          {/* Input Bar */}
          <form onSubmit={handleSendAssistantMessage} className="p-3 border-t border-slate-800 bg-slate-900/60 flex items-center gap-2">
            <input
              type="text"
              value={assistantInput}
              onChange={(e) => setAssistantInput(e.target.value)}
              placeholder="Ask about project milestones, concrete inspection results, or approved invoices..."
              className={`flex-1 text-xs px-3 py-2 rounded-lg border focus:outline-none focus:border-[#C6922D] ${
                isLight ? 'bg-white border-slate-300' : 'bg-slate-800 border-slate-700 text-white'
              }`}
            />
            <button
              type="submit"
              className="p-2 rounded-lg bg-[#C6922D] hover:bg-[#dfad4b] text-slate-950 transition-colors"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </div>
  );
};
