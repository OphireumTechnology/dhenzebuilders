import React, { useState, useEffect } from 'react';
import {
  Building2,
  Users,
  Briefcase,
  FileText,
  DollarSign,
  ShieldCheck,
  ShieldAlert,
  Moon,
  Sun,
  ArrowLeft,
  ChevronRight,
  Menu,
  X,
  Lock,
  Layers,
  Sparkles,
  Truck,
  Hammer,
  CheckCircle2,
  LogOut,
  AlertCircle,
  HelpCircle,
} from 'lucide-react';
import { UserRole } from '../../types';
import { CompanyLogo } from '../common/CompanyLogo';
import { ClientPortalView } from './ClientPortalView';
import { SupplierPortalView } from './SupplierPortalView';
import { PartnerPortalView } from './PartnerPortalView';
import { OperationsPortalView } from './OperationsPortalView';

interface EnterprisePortalLayoutProps {
  currentPath: string;
  onNavigate: (route: string) => void;
  currentUserRole: UserRole;
  onChangeUserRole: (role: UserRole) => void;
}

export const EnterprisePortalLayout: React.FC<EnterprisePortalLayoutProps> = ({
  currentPath,
  onNavigate,
  currentUserRole,
  onChangeUserRole,
}) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [portalTheme, setPortalTheme] = useState<'dark' | 'light'>(() => {
    return (localStorage.getItem('portal_theme') as 'dark' | 'light') || 'dark';
  });

  const toggleTheme = () => {
    const next = portalTheme === 'dark' ? 'light' : 'dark';
    setPortalTheme(next);
    localStorage.setItem('portal_theme', next);
  };

  // Determine portal domain (client, supplier, partner, operations)
  let portalDomain: 'client' | 'supplier' | 'partner' | 'operations' = 'client';
  let subRoute = 'overview';

  if (currentPath.startsWith('/portal/supplier') || currentPath.startsWith('portal/supplier')) {
    portalDomain = 'supplier';
    subRoute = currentPath.split('/supplier/')[1] || 'overview';
  } else if (currentPath.startsWith('/portal/partner') || currentPath.startsWith('portal/partner')) {
    portalDomain = 'partner';
    subRoute = currentPath.split('/partner/')[1] || 'overview';
  } else if (currentPath.startsWith('/operations') || currentPath.startsWith('operations')) {
    portalDomain = 'operations';
    subRoute = currentPath.split('/operations/')[1] || 'overview';
  } else if (currentPath.startsWith('/portal/client') || currentPath.startsWith('portal/client')) {
    portalDomain = 'client';
    subRoute = currentPath.split('/client/')[1] || 'overview';
  } else {
    // Default by role
    if (['SUPPLIER_ADMIN', 'SUPPLIER_CATALOG_MANAGER', 'SUPPLIER_BIDDER', 'SUPPLIER_FINANCE_USER'].includes(currentUserRole)) {
      portalDomain = 'supplier';
    } else if (['PARTNER_ADMIN', 'PARTNER_BID_MANAGER', 'PARTNER_PROJECT_USER'].includes(currentUserRole)) {
      portalDomain = 'partner';
    } else if (['PROJECT_MANAGER', 'CONSTRUCTION_MANAGER', 'PROCUREMENT_OFFICER', 'QUANTITY_SURVEYOR', 'FINANCE_OFFICER', 'DOCUMENT_CONTROLLER', 'COMPLIANCE_REVIEWER', 'EXECUTIVE_APPROVER', 'SYSTEM_ADMIN', 'SECURITY_ADMIN', 'AUDITOR'].includes(currentUserRole)) {
      portalDomain = 'operations';
    }
  }

  // Navigation Links tailored to portal domain
  const clientNav = [
    { label: 'Overview', route: '/portal/client/overview', icon: Building2 },
    { label: 'Technical Intake', route: '/portal/client/development-intake', icon: FileText },
    { label: 'Tasks & WBS', route: '/portal/client/tasks', icon: Layers },
    { label: 'Drawings Register', route: '/portal/client/drawings', icon: Briefcase },
    { label: 'Pending Approvals', route: '/portal/client/approvals', icon: CheckCircle2 },
    { label: 'Invoices & Billing', route: '/portal/client/invoices', icon: DollarSign },
    { label: 'Dhenze Assistant', route: '/portal/client/assistant', icon: Sparkles },
  ];

  const supplierNav = [
    { label: 'Overview', route: '/portal/supplier/overview', icon: Building2 },
    { label: 'Material Catalog', route: '/portal/supplier/catalog', icon: Briefcase },
    { label: 'RFQs & Tenders', route: '/portal/supplier/rfqs', icon: FileText },
    { label: 'Purchase Orders', route: '/portal/supplier/purchase-orders', icon: CheckCircle2 },
    { label: 'Deliveries Registry', route: '/portal/supplier/deliveries', icon: Truck },
    { label: 'Performance Scorecard', route: '/portal/supplier/performance', icon: ShieldCheck },
    { label: 'Dhenze Assistant', route: '/portal/supplier/assistant', icon: Sparkles },
  ];

  const partnerNav = [
    { label: 'Overview', route: '/portal/partner/overview', icon: Building2 },
    { label: 'Tenders & Bids', route: '/portal/partner/bids', icon: FileText },
    { label: 'Work Packages', route: '/portal/partner/work-packages', icon: Layers },
    { label: 'Billing Applications', route: '/portal/partner/billing', icon: DollarSign },
    { label: 'Personnel & Safety', route: '/portal/partner/personnel', icon: Users },
    { label: 'Dhenze Assistant', route: '/portal/partner/assistant', icon: Sparkles },
  ];

  const operationsNav = [
    { label: 'Overview', route: '/operations/overview', icon: Building2 },
    { label: 'Project Library Publishing', route: '/operations/public-projects', icon: FileText },
    { label: 'Verification Center (Demo)', route: '/operations/verification-center', icon: ShieldAlert },
    { label: 'Onboarding Master', route: '/operations/onboarding', icon: ShieldCheck },
    { label: 'Organizations & Tenants', route: '/operations/organizations', icon: Users },
    { label: 'Maker-Checker Finance', route: '/operations/finance', icon: DollarSign },
    { label: 'Cryptographic Audit', route: '/operations/audit', icon: ShieldCheck },
    { label: 'System Freeze Control', route: '/operations/system', icon: ShieldAlert },
  ];

  const currentNav =
    portalDomain === 'supplier'
      ? supplierNav
      : portalDomain === 'partner'
      ? partnerNav
      : portalDomain === 'operations'
      ? operationsNav
      : clientNav;

  const isLight = portalTheme === 'light';
  const pageBg = isLight ? 'bg-slate-50 text-slate-900' : 'bg-[#061325] text-slate-100';
  const sidebarBg = isLight ? 'bg-white border-slate-200' : 'bg-[#0a1b33] border-slate-800';

  return (
    <div className={`min-h-screen flex flex-col md:flex-row ${pageBg}`}>
      {/* Mobile Top Bar */}
      <div className="md:hidden flex items-center justify-between p-3 border-b border-slate-800 bg-[#071A2F]">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-1.5 rounded-lg bg-slate-800 text-white"
            aria-label="Toggle sidebar"
          >
            {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
          <CompanyLogo variant="compact" size="xs" theme="dark" onClick={() => onNavigate('/')} />
        </div>
        <button
          onClick={() => onNavigate('/')}
          className="text-xs text-[#C6922D] font-semibold px-2 py-1 rounded bg-slate-800/60 hover:bg-slate-800"
        >
          Exit
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`${
          sidebarOpen ? 'block' : 'hidden'
        } md:block w-full md:w-64 border-r flex flex-col shrink-0 ${sidebarBg} transition-colors z-20`}
      >
        {/* Brand & Portal Header with Official Master Logo */}
        <div className="p-4 border-b border-slate-800/80">
          <button
            onClick={() => onNavigate('/')}
            className="w-full text-left transition-opacity hover:opacity-90 focus:outline-none mb-3"
            title="Back to Public Site"
          >
            <CompanyLogo variant="compact" size="sm" theme={isLight ? 'light' : 'dark'} showTagline={false} />
          </button>
          <div className="flex items-center justify-between text-[11px] pt-2 border-t border-slate-800/60">
            <div className="flex items-center gap-1.5 text-[#C6922D] font-semibold uppercase tracking-wider text-[10px]">
              <Lock className="w-3 h-3" />
              <span>Workspace</span>
            </div>
            <span className="font-semibold text-slate-300 uppercase text-[10px] bg-slate-800/80 px-2 py-0.5 rounded">
              {portalDomain}
            </span>
          </div>
        </div>

        {/* Domain Switcher Tabs */}
        <div className="p-3 border-b border-slate-800/60 grid grid-cols-2 gap-1 text-[11px]">
          <button
            onClick={() => onNavigate('/portal/client/overview')}
            className={`p-1.5 rounded text-center font-medium transition-colors ${
              portalDomain === 'client' ? 'bg-[#C6922D] text-slate-950 font-bold' : 'text-slate-400 hover:bg-slate-800'
            }`}
          >
            Client
          </button>
          <button
            onClick={() => onNavigate('/portal/supplier/overview')}
            className={`p-1.5 rounded text-center font-medium transition-colors ${
              portalDomain === 'supplier' ? 'bg-[#C6922D] text-slate-950 font-bold' : 'text-slate-400 hover:bg-slate-800'
            }`}
          >
            Supplier
          </button>
          <button
            onClick={() => onNavigate('/portal/partner/overview')}
            className={`p-1.5 rounded text-center font-medium transition-colors ${
              portalDomain === 'partner' ? 'bg-[#C6922D] text-slate-950 font-bold' : 'text-slate-400 hover:bg-slate-800'
            }`}
          >
            Partner
          </button>
          <button
            onClick={() => onNavigate('/operations/overview')}
            className={`p-1.5 rounded text-center font-medium transition-colors ${
              portalDomain === 'operations' ? 'bg-[#C6922D] text-slate-950 font-bold' : 'text-slate-400 hover:bg-slate-800'
            }`}
          >
            Operations
          </button>
        </div>

        {/* Nav Items */}
        <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
          {currentNav.map((item) => {
            const Icon = item.icon;
            const isActive = currentPath === item.route || currentPath.endsWith(item.route.split('/').pop() || '');
            return (
              <button
                key={item.route}
                onClick={() => {
                  onNavigate(item.route);
                  setSidebarOpen(false);
                }}
                className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                  isActive
                    ? 'bg-[#C6922D]/15 text-[#C6922D] font-bold border border-[#C6922D]/30'
                    : isLight
                    ? 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                    : 'text-slate-400 hover:bg-slate-800/60 hover:text-slate-200'
                }`}
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Role & Persona Switcher */}
        <div className="p-3 border-t border-slate-800/80 bg-slate-900/40">
          <label className="block text-[10px] uppercase tracking-wider text-slate-400 font-bold mb-1">
            Current Persona Role:
          </label>
          <select
            value={currentUserRole}
            onChange={(e) => onChangeUserRole(e.target.value as UserRole)}
            className={`w-full text-xs px-2.5 py-1.5 rounded border focus:outline-none ${
              isLight ? 'bg-slate-100 border-slate-300 text-slate-900' : 'bg-slate-800 border-slate-700 text-white'
            }`}
          >
            <optgroup label="Client Roles">
              <option value="PROSPECTIVE_CLIENT">Prospective Client</option>
              <option value="VERIFIED_CLIENT">Verified Client</option>
              <option value="ACTIVE_CLIENT">Active Client</option>
              <option value="CLIENT_EXECUTIVE">Client Executive</option>
            </optgroup>
            <optgroup label="Supplier Roles">
              <option value="SUPPLIER_ADMIN">Supplier Admin</option>
              <option value="SUPPLIER_CATALOG_MANAGER">Catalog Manager</option>
              <option value="SUPPLIER_BIDDER">Supplier Bidder</option>
              <option value="SUPPLIER_FINANCE_USER">Supplier Finance</option>
            </optgroup>
            <optgroup label="Partner Roles">
              <option value="PARTNER_ADMIN">Partner Admin</option>
              <option value="PARTNER_BID_MANAGER">Partner Bid Manager</option>
              <option value="PARTNER_PROJECT_USER">Partner Project User</option>
            </optgroup>
            <optgroup label="Operations & Governance">
              <option value="PROJECT_MANAGER">Project Manager</option>
              <option value="CONSTRUCTION_MANAGER">Construction Manager</option>
              <option value="PROCUREMENT_OFFICER">Procurement Officer</option>
              <option value="QUANTITY_SURVEYOR">Quantity Surveyor</option>
              <option value="FINANCE_OFFICER">Finance Officer</option>
              <option value="DOCUMENT_CONTROLLER">Document Controller</option>
              <option value="COMPLIANCE_REVIEWER">Compliance Reviewer</option>
              <option value="EXECUTIVE_APPROVER">Executive Approver</option>
              <option value="SYSTEM_ADMIN">System Admin</option>
              <option value="SECURITY_ADMIN">Security Admin</option>
              <option value="AUDITOR">Auditor</option>
            </optgroup>
          </select>
        </div>

        {/* Footer actions: Theme toggle and Return to Public Website */}
        <div className="p-3 border-t border-slate-800 flex items-center justify-between text-xs">
          <button
            onClick={toggleTheme}
            className="p-1.5 rounded hover:bg-slate-800 text-slate-400 hover:text-white flex items-center gap-1 transition-colors"
            title="Toggle theme"
          >
            {isLight ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
            <span className="text-[11px]">{isLight ? 'Dark' : 'Light'}</span>
          </button>
          <button
            onClick={() => onNavigate('/')}
            className="text-xs text-slate-400 hover:text-white flex items-center gap-1 transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Public Site</span>
          </button>
        </div>
      </aside>

      {/* Main View Area */}
      <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto max-w-7xl mx-auto w-full">
        {portalDomain === 'client' && (
          <ClientPortalView
            currentSubRoute={subRoute}
            onNavigate={onNavigate}
            currentUserRole={currentUserRole}
            portalTheme={portalTheme}
          />
        )}
        {portalDomain === 'supplier' && (
          <SupplierPortalView
            currentSubRoute={subRoute}
            onNavigate={onNavigate}
            currentUserRole={currentUserRole}
            portalTheme={portalTheme}
          />
        )}
        {portalDomain === 'partner' && (
          <PartnerPortalView
            currentSubRoute={subRoute}
            onNavigate={onNavigate}
            currentUserRole={currentUserRole}
            portalTheme={portalTheme}
          />
        )}
        {portalDomain === 'operations' && (
          <OperationsPortalView
            currentSubRoute={subRoute}
            onNavigate={onNavigate}
            currentUserRole={currentUserRole}
            portalTheme={portalTheme}
          />
        )}
      </main>
    </div>
  );
};
