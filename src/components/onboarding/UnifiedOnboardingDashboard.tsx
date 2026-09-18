import React, { useState } from 'react';
import {
  Building2,
  Users,
  Briefcase,
  User,
  ShieldCheck,
  ShieldAlert,
  AlertTriangle,
  CheckCircle2,
  Clock,
  FileText,
  Camera,
  Layers,
  Search,
  Menu,
  X,
  Bell,
  Sun,
  Moon,
  ChevronRight,
  LogOut,
  Sliders,
  Settings,
  FolderOpen,
  Award,
  Truck,
  BarChart3,
  ListFilter,
  CheckSquare,
  HelpCircle,
} from 'lucide-react';
import { UserRole } from '../../types';
import { CompanyLogo } from '../common/CompanyLogo';
import { VerificationCenterView, VerificationSubsection } from './VerificationCenterView';
import { DocumentUploadCenter } from './DocumentUploadCenter';
import { SiteMediaGallery } from './SiteMediaGallery';
import { ProjectParticipantDirectory } from './ProjectParticipantDirectory';
import { OnboardingEntitiesView } from './OnboardingEntitiesView';
import {
  INITIAL_CONTRACTORS,
  INITIAL_SUPPLIERS,
  INITIAL_PROFESSIONALS,
  INITIAL_CLIENTS,
  INITIAL_REQUIREMENT_RULES,
} from '../../data/onboardingMockData';

export type MainNavSection =
  | 'overview'
  | 'onboarding-contractors'
  | 'onboarding-suppliers'
  | 'onboarding-professionals'
  | 'onboarding-clients'
  | 'organizations'
  | 'people'
  | 'projects'
  | 'documents'
  | 'verification-center'
  | 'compliance'
  | 'site-media'
  | 'review-approval'
  | 'expiring-requirements'
  | 'reports'
  | 'audit-trail'
  | 'administration';

interface UnifiedOnboardingDashboardProps {
  initialSection?: MainNavSection;
  onNavigate?: (route: string) => void;
  currentUserRole?: UserRole;
  portalTheme?: 'dark' | 'light';
  onToggleTheme?: () => void;
}

export const UnifiedOnboardingDashboard: React.FC<UnifiedOnboardingDashboardProps> = ({
  initialSection = 'overview',
  onNavigate,
  currentUserRole = 'COMPLIANCE_REVIEWER',
  portalTheme = 'dark',
  onToggleTheme,
}) => {
  const [currentSection, setCurrentSection] = useState<MainNavSection>(initialSection);
  const [verificationSub, setVerificationSub] = useState<VerificationSubsection>('overview');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [globalSearch, setGlobalSearch] = useState('');
  const [localTheme, setLocalTheme] = useState<'dark' | 'light'>(portalTheme);

  const toggleTheme = () => {
    const next = localTheme === 'dark' ? 'light' : 'dark';
    setLocalTheme(next);
    onToggleTheme?.();
  };

  const isLight = localTheme === 'light';

  // Navigation Items according to Section 2
  const navItems: { id: MainNavSection; label: string; icon: any; badge?: string }[] = [
    { id: 'overview', label: 'Overview', icon: Building2 },
    { id: 'verification-center', label: 'Government Verification Center', icon: ShieldAlert, badge: 'DEMO' },
    { id: 'onboarding-contractors', label: 'Contractors (CTR-)', icon: Building2 },
    { id: 'onboarding-suppliers', label: 'Suppliers & Vendors (SUP-)', icon: Truck },
    { id: 'onboarding-professionals', label: 'Professionals (PRO-)', icon: Award },
    { id: 'onboarding-clients', label: 'Clients & Owners (CLI-)', icon: Users },
    { id: 'projects', label: 'Projects & Work Packages', icon: Briefcase },
    { id: 'documents', label: 'Universal Document Center', icon: FileText },
    { id: 'compliance', label: 'Project Compliance Linkage', icon: ShieldCheck },
    { id: 'site-media', label: 'Site Media & Photos (MED-)', icon: Camera },
    { id: 'expiring-requirements', label: 'Expiring Requirements', icon: Clock, badge: 'Alerts' },
    { id: 'review-approval', label: 'Review & Approval Queue', icon: CheckSquare },
    { id: 'reports', label: 'Reports & Export', icon: BarChart3 },
    { id: 'audit-trail', label: 'Audit Trail', icon: ListFilter },
    { id: 'administration', label: 'Administration', icon: Settings },
  ];

  // Breadcrumbs title helper
  const getBreadcrumbTitle = () => {
    const item = navItems.find((n) => n.id === currentSection);
    return item ? item.label : 'Onboarding Dashboard';
  };

  const containerBg = isLight ? 'bg-slate-50 text-slate-900' : 'bg-[#071A2F] text-slate-100';
  const sidebarBg = isLight ? 'bg-white border-slate-200' : 'bg-[#08182B] border-slate-800';
  const headerBg = isLight ? 'bg-white/90 border-slate-200 backdrop-blur-md' : 'bg-[#08182B]/90 border-slate-800 backdrop-blur-md';

  return (
    <div className={`min-h-screen flex flex-col font-sans ${containerBg}`} id="unified-onboarding-dashboard">
      {/* Top Banner: Internal Environment Label & Simulation Warning */}
      <header className="bg-amber-500/15 border-b border-amber-500/30 px-4 py-2 flex items-center justify-between text-xs z-30">
        <div className="flex items-center gap-2">
          <span className="px-2 py-0.5 rounded font-mono font-bold bg-amber-500 text-slate-950 uppercase tracking-wider text-[10px]">
            DEMO / DEVELOPMENT
          </span>
          <span className="text-amber-300 hidden sm:inline">
            Fictional simulation mode &bull; No live government systems or databases are connected
          </span>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-slate-400 font-mono text-[11px]">Role: <strong className="text-[#C6922D]">{currentUserRole}</strong></span>
          <button
            onClick={() => onNavigate?.('/')}
            className="text-slate-400 hover:text-white flex items-center gap-1 transition-colors text-[11px]"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Exit to Public Site</span>
          </button>
        </div>
      </header>

      {/* Main Top Navigation Bar */}
      <nav className={`sticky top-0 z-20 border-b px-4 sm:px-6 py-3 flex items-center justify-between gap-4 ${headerBg}`}>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-1.5 rounded-lg border border-slate-700 text-slate-300 hover:text-white hover:bg-slate-800 transition-colors lg:hidden"
            aria-label="Toggle navigation menu"
          >
            {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          <div className="flex items-center gap-3">
            <CompanyLogo variant="emblem" size="xs" onClick={() => onNavigate?.('/')} className="cursor-pointer" />
            <div>
              <div className="flex items-center gap-2">
                <span className="font-serif font-bold text-white text-base tracking-wide">
                  LDL DHENZE
                </span>
                <span className="text-xs text-slate-400">&bull;</span>
                <span className="text-xs font-semibold text-[#C6922D] uppercase tracking-wider">
                  Enterprise Onboarding & Verification Center
                </span>
              </div>
              {/* Breadcrumb */}
              <div className="flex items-center gap-1.5 text-[11px] text-slate-400 font-mono mt-0.5">
                <span>Portal</span>
                <ChevronRight className="w-3 h-3 text-slate-600" />
                <span className="text-slate-300">{getBreadcrumbTitle()}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Global Search & Action Badges */}
        <div className="flex items-center gap-3">
          <div className="relative hidden md:block w-64 lg:w-80">
            <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Global search (CTR-, SUP-, PRO-, CLI-, DOC-)..."
              value={globalSearch}
              onChange={(e) => setGlobalSearch(e.target.value)}
              className="w-full bg-slate-900/80 border border-slate-700 rounded-xl pl-9 pr-4 py-1.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-[#C6922D]"
            />
          </div>

          <button
            onClick={() => setNotificationsOpen(!notificationsOpen)}
            className="p-2 rounded-lg border border-slate-700 text-slate-300 hover:text-white hover:bg-slate-800 relative transition-colors"
            title="Notifications"
          >
            <Bell className="w-4 h-4" />
            <span className="w-2 h-2 rounded-full bg-amber-400 absolute top-1.5 right-1.5" />
          </button>

          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg border border-slate-700 text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
            title="Toggle theme"
          >
            {isLight ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
          </button>
        </div>
      </nav>

      {/* Main Workspace Layout */}
      <div className="flex-1 flex overflow-hidden">
        {/* Collapsible Left Sidebar Navigation */}
        <aside
          className={`w-64 lg:w-72 border-r flex flex-col justify-between shrink-0 overflow-y-auto transition-all duration-300 z-10 ${sidebarBg} ${
            sidebarOpen ? 'fixed inset-y-0 left-0 pt-20 lg:pt-0' : 'hidden lg:flex'
          }`}
        >
          <div className="p-3 space-y-1">
            <div className="px-3 py-2 text-[10px] uppercase tracking-wider font-mono font-bold text-slate-500">
              Navigation Modules
            </div>

            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setCurrentSection(item.id);
                    setSidebarOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-[#C6922D] text-slate-950 font-bold shadow-md'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className="w-4 h-4 shrink-0" />
                    <span className="truncate">{item.label}</span>
                  </div>
                  {item.badge && (
                    <span
                      className={`px-1.5 py-0.5 rounded text-[10px] font-mono font-bold ${
                        isActive
                          ? 'bg-slate-950 text-white'
                          : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          <div className="p-4 border-t border-slate-800/80 text-[11px] font-mono text-slate-500 space-y-1">
            <div>Framework: v2.6.0-SIM</div>
            <div>Tenant: ldl-dhenze-ph</div>
            <div className="text-amber-400 font-bold">SIMULATOR ACTIVE</div>
          </div>
        </aside>

        {/* Dynamic Center View Container */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto max-w-7xl mx-auto w-full">
          {/* 1. OVERVIEW DASHBOARD */}
          {currentSection === 'overview' && (
            <div className="space-y-6">
              {/* Quick Metrics Grid */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-1">
                  <div className="text-[11px] text-slate-400 uppercase tracking-wider font-mono">
                    Contractors (CTR-)
                  </div>
                  <div className="text-2xl font-bold text-white">2 Active</div>
                  <div className="text-xs text-emerald-400 font-mono">100% PCAB Verified (Sim)</div>
                </div>

                <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-1">
                  <div className="text-[11px] text-slate-400 uppercase tracking-wider font-mono">
                    Suppliers (SUP-)
                  </div>
                  <div className="text-2xl font-bold text-white">2 Cataloged</div>
                  <div className="text-xs text-amber-400 font-mono">1 Expiring in 28 Days</div>
                </div>

                <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-1">
                  <div className="text-[11px] text-slate-400 uppercase tracking-wider font-mono">
                    Professionals (PRO-)
                  </div>
                  <div className="text-2xl font-bold text-white">3 Registered</div>
                  <div className="text-xs text-rose-400 font-mono">1 Expired PRC License</div>
                </div>

                <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-1">
                  <div className="text-[11px] text-slate-400 uppercase tracking-wider font-mono">
                    Compliance Checks
                  </div>
                  <div className="text-2xl font-bold text-white">14 Scenarios</div>
                  <div className="text-xs text-blue-400 font-mono">Ready to simulate</div>
                </div>
              </div>

              {/* Shortcut Banner to Government Verification Center */}
              <div className="bg-gradient-to-r from-amber-500/20 to-slate-900 border border-amber-500/40 rounded-2xl p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div>
                  <h3 className="text-base font-bold text-white">
                    Government License & Credential Verification Center
                  </h3>
                  <p className="text-xs text-slate-300 mt-1 max-w-2xl leading-relaxed">
                    Access real-time simulated license status verification for PRC, PCAB, SEC, DTI, LGU, and BIR. Includes field-by-field diff comparison, discrepancy detection, and 14 switchable test scenarios.
                  </p>
                </div>
                <button
                  onClick={() => setCurrentSection('verification-center')}
                  className="px-4 py-2.5 bg-[#C6922D] hover:bg-[#b08024] text-slate-950 font-bold rounded-xl text-xs flex items-center gap-2 transition-colors whitespace-nowrap"
                >
                  <ShieldAlert className="w-4 h-4" />
                  Launch Verification Center
                </button>
              </div>

              {/* Requirements Matrix Preview */}
              <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 space-y-3">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <h3 className="text-sm font-bold text-white flex items-center gap-2">
                    <FileText className="w-4 h-4 text-[#C6922D]" />
                    Configurable Requirements Matrix Rules (Section 16)
                  </h3>
                  <span className="text-xs font-mono text-slate-400">8 Active Rules</span>
                </div>

                <div className="divide-y divide-slate-800/60 text-xs">
                  {INITIAL_REQUIREMENT_RULES.map((req) => (
                    <div key={req.id} className="py-2.5 flex items-center justify-between gap-4">
                      <div>
                        <div className="font-semibold text-white">{req.documentTitle}</div>
                        <div className="text-[11px] text-slate-400 font-mono">
                          {req.entityType} &bull; {req.statutoryReference}
                        </div>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        {req.requiresGovernmentVerification && (
                          <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-amber-500/20 text-amber-300 border border-amber-500/30">
                            Gov Verification Required
                          </span>
                        )}
                        <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-500/20 text-emerald-300">
                          Mandatory
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* 2. GOVERNMENT VERIFICATION CENTER (Section 31 - 46) */}
          {currentSection === 'verification-center' && (
            <VerificationCenterView
              currentSubsection={verificationSub}
              onSelectSubsection={setVerificationSub}
              portalTheme={localTheme}
            />
          )}

          {/* 3. CONTRACTORS ONBOARDING REGISTER */}
          {currentSection === 'onboarding-contractors' && (
            <OnboardingEntitiesView
              entityCategory="CONTRACTOR"
              portalTheme={localTheme}
              onNavigateToVerification={() => setCurrentSection('verification-center')}
            />
          )}

          {/* 4. SUPPLIERS ONBOARDING REGISTER */}
          {currentSection === 'onboarding-suppliers' && (
            <OnboardingEntitiesView
              entityCategory="SUPPLIER"
              portalTheme={localTheme}
              onNavigateToVerification={() => setCurrentSection('verification-center')}
            />
          )}

          {/* 5. PROFESSIONALS ONBOARDING REGISTER */}
          {currentSection === 'onboarding-professionals' && (
            <OnboardingEntitiesView
              entityCategory="PROFESSIONAL"
              portalTheme={localTheme}
              onNavigateToVerification={() => setCurrentSection('verification-center')}
            />
          )}

          {/* 6. CLIENTS ONBOARDING REGISTER */}
          {currentSection === 'onboarding-clients' && (
            <OnboardingEntitiesView
              entityCategory="CLIENT"
              portalTheme={localTheme}
              onNavigateToVerification={() => setCurrentSection('verification-center')}
            />
          )}

          {/* 7. PROJECTS & PARTICIPANTS DIRECTORY (Section 40) */}
          {(currentSection === 'projects' || currentSection === 'compliance') && (
            <ProjectParticipantDirectory portalTheme={localTheme} />
          )}

          {/* 8. UNIVERSAL DOCUMENT CENTER (Section 9 - 12) */}
          {currentSection === 'documents' && (
            <DocumentUploadCenter portalTheme={localTheme} />
          )}

          {/* 9. SITE MEDIA & INSPECTION (Section 13) */}
          {currentSection === 'site-media' && (
            <SiteMediaGallery portalTheme={localTheme} />
          )}

          {/* 10. EXPIRING REQUIREMENTS */}
          {currentSection === 'expiring-requirements' && (
            <div className="space-y-4">
              <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <Clock className="w-4 h-4 text-amber-400" />
                  Expiration & Renewal Monitoring Engine (Section 15)
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  Tracks expiring licenses and permits across 90-day, 60-day, 30-day, 15-day, and 7-day windows with automatic task reminders.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-slate-900 border border-amber-500/30 rounded-xl p-4 space-y-2">
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-amber-500/20 text-amber-300">
                    EXPIRES IN 28 DAYS
                  </span>
                  <h4 className="text-sm font-bold text-white">Apex Rebar & High-Tensile Steel Logistics</h4>
                  <p className="text-xs text-slate-400 font-mono">DTI Business Name BN-8472910 expires October 15, 2026</p>
                  <div className="text-[11px] text-slate-300">Automated reminder notification sent to Supplier Admin.</div>
                </div>

                <div className="bg-slate-900 border border-rose-500/30 rounded-xl p-4 space-y-2">
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-rose-500/20 text-rose-300">
                    EXPIRED 94 DAYS AGO
                  </span>
                  <h4 className="text-sm font-bold text-white">Arch. Roberto M. Gomez</h4>
                  <p className="text-xs text-slate-400 font-mono">PRC License DEMO-ARC-0031829 expired June 15, 2026</p>
                  <div className="text-[11px] text-rose-300">Project signing privileges suspended on PRJ-2026-000125.</div>
                </div>
              </div>
            </div>
          )}

          {/* 11. REVIEW & APPROVAL WORKFLOW */}
          {currentSection === 'review-approval' && (
            <div className="space-y-4">
              <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <CheckSquare className="w-4 h-4 text-[#C6922D]" />
                  Review & Approval Queue (Section 17)
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  Actions available: Approve, Reject, Request Correction, Request Additional Document, or Mark Verification Required.
                </p>
              </div>

              <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-xs font-bold text-white">
                      CTR-2026-000002 &bull; SolidPave Geosynthetics & Foundation Corp.
                    </h4>
                    <p className="text-[11px] text-slate-400">Status: Correction Requested (SEC Name Mismatch)</p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setCurrentSection('verification-center')}
                      className="px-3 py-1.5 bg-[#C6922D] text-slate-950 rounded-lg text-xs font-bold"
                    >
                      Audit Discrepancy
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 12. REPORTS CENTER */}
          {currentSection === 'reports' && (
            <div className="space-y-4">
              <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <BarChart3 className="w-4 h-4 text-[#C6922D]" />
                  Compliance & Onboarding Reports (Section 21)
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  Download or print verified project participant compliance reports for regulatory filing or project owner submission.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl space-y-2">
                  <h4 className="text-xs font-bold text-white">PRJ-2026-000125 Mobilization Audit</h4>
                  <p className="text-[11px] text-slate-400">Full audit log of contractors, engineers, and suppliers.</p>
                  <button
                    onClick={() => alert('Exporting simulated compliance report in CSV format...')}
                    className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs font-semibold"
                  >
                    Export CSV Report
                  </button>
                </div>

                <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl space-y-2">
                  <h4 className="text-xs font-bold text-white">Government Source Health Audit</h4>
                  <p className="text-[11px] text-slate-400">Latency, rate limits, and uptime of simulated connectors.</p>
                  <button
                    onClick={() => setCurrentSection('verification-center')}
                    className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs font-semibold"
                  >
                    View Connector Health
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* 13. AUDIT TRAIL */}
          {currentSection === 'audit-trail' && (
            <div className="space-y-4">
              <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <ListFilter className="w-4 h-4 text-[#C6922D]" />
                  Cryptographic Compliance Audit Trail (Section 22)
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  Immutable chronological records of credential checks, approvals, rejections, and manual overrides.
                </p>
              </div>

              <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 text-xs font-mono space-y-2 text-slate-300">
                <div className="p-2 bg-slate-950 rounded border border-slate-800 flex justify-between">
                  <span>[2026-09-17 09:30:15] VER-2026-000001: Verified Engr. Juan Dela Cruz (PRC Active)</span>
                  <span className="text-emerald-400 font-bold">MATCH</span>
                </div>
                <div className="p-2 bg-slate-950 rounded border border-slate-800 flex justify-between">
                  <span>[2026-09-16 16:00:12] VER-2026-000005: Flagged SolidPave SEC Name Mismatch</span>
                  <span className="text-rose-400 font-bold">DISCREPANCY</span>
                </div>
                <div className="p-2 bg-slate-950 rounded border border-slate-800 flex justify-between">
                  <span>[2026-09-15 11:15:00] VER-2026-000004: Flagged Arch. Roberto Gomez PRC License Expired</span>
                  <span className="text-rose-400 font-bold">EXPIRED</span>
                </div>
              </div>
            </div>
          )}

          {/* 14. ADMINISTRATION */}
          {currentSection === 'administration' && (
            <div className="space-y-4">
              <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <Settings className="w-4 h-4 text-[#C6922D]" />
                  Government Integration & Onboarding Administration
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  Configure simulation connectors, toggle demo scenarios, review requirement matrix rules, and enforce compliance policies.
                </p>
              </div>

              <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4">
                <h4 className="text-xs font-bold text-white">Simulator Configuration</h4>
                <div className="p-3 bg-slate-950 border border-amber-500/20 rounded-lg text-xs text-amber-300/90 leading-relaxed font-mono">
                  Environment: DEMO / DEVELOPMENT<br />
                  Real Government Database Transmission: STRICTLY DISABLED<br />
                  Mock Connectors: PRC, PCAB, SEC, DTI, LGU, BIR
                </div>
                <button
                  onClick={() => setCurrentSection('verification-center')}
                  className="px-4 py-2 bg-[#C6922D] text-slate-950 rounded-lg text-xs font-bold"
                >
                  Manage Connectors in Verification Center
                </button>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};
