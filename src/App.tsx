import React, { useState, useEffect } from 'react';
import { Shield } from 'lucide-react';
import { UserRole } from './types';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { HomePage } from './components/pages/HomePage';
import { AboutPage } from './components/pages/AboutPage';
import { CapabilitiesPage } from './components/pages/CapabilitiesPage';
import { IndustriesPage } from './components/pages/IndustriesPage';
import { ProjectsPage } from './components/pages/ProjectsPage';
import { SustainabilityPage } from './components/pages/SustainabilityPage';
import { TechnologyPage } from './components/pages/TechnologyPage';
import { InsightsPage } from './components/pages/InsightsPage';
import { PartnersPage } from './components/pages/PartnersPage';
import { ContactPage } from './components/pages/ContactPage';
import { StartProjectWizard } from './components/pages/StartProjectWizard';
import { BookConsultationPage } from './components/pages/BookConsultationPage';
import { PortalPage } from './components/pages/PortalPage';
import { QATestingConsole } from './components/pages/QATestingConsole';
import { BuilderAssistantModal } from './components/assistant/BuilderAssistantModal';
import { PrivacyPolicyPage } from './components/pages/legal/PrivacyPolicyPage';
import { TermsOfServicePage } from './components/pages/legal/TermsOfServicePage';
import { RegulatoryDisclosuresPage } from './components/pages/legal/RegulatoryDisclosuresPage';
import { AccessibilityStatementPage } from './components/pages/legal/AccessibilityStatementPage';
import { AuthPages } from './components/auth/AuthPages';
import { ProjectDetailPage } from './components/pages/ProjectDetailPage';
import { InsightDetailPage } from './components/pages/InsightDetailPage';
import { EnterprisePortalLayout } from './components/portal/EnterprisePortalLayout';
import { EmergencyPortalLockScreen } from './components/security/EmergencyPortalLockScreen';
import { AdminAccessConsole } from './components/security/AdminAccessConsole';
import { CeoCornerPage } from './components/pages/CeoCornerPage';
import { CompanyProfilePage } from './components/pages/CompanyProfilePage';
import { CompanyProfileAdminConsole } from './components/admin/CompanyProfileAdminConsole';
import { UnifiedOnboardingDashboard } from './components/onboarding/UnifiedOnboardingDashboard';
import { VerificationCenterView } from './components/onboarding/VerificationCenterView';

const ROUTE_METADATA: Record<string, { title: string; description: string }> = {
  home: {
    title: 'LDL Dhenze | Private Development, Engineering & Infrastructure',
    description: 'LDL Dhenze brings disciplined development planning, coordinated engineering, construction execution, and resilient infrastructure together for private, institutional, and strategic projects across the Philippines.',
  },
  about: {
    title: 'Company & Governance | LDL Dhenze Residential Building Construction',
    description: 'Philippine development and construction enterprise coordinating commercial, technical, and operational disciplines with institutional banking governance.',
  },
  capabilities: {
    title: 'Strategic Disciplines & Expertise | LDL Dhenze',
    description: 'Development advisory, coordinated architecture and engineering, civil infrastructure, renewable utilities, and project controls across the Philippines.',
  },
  industries: {
    title: 'Strategic Development Sectors | LDL Dhenze',
    description: 'Private residential estates, mixed-use commercial, hospitality, healthcare, logistics, and renewable microgrids across the Philippines.',
  },
  projects: {
    title: 'Selected Work & Developments | LDL Dhenze',
    description: 'Verified portfolio of completed, under-construction, and planned development projects across the Philippines with rigorous status classification.',
  },
  sustainability: {
    title: 'Sustainability & Resilient Utilities | LDL Dhenze',
    description: 'Alignment with RA 9513 Renewable Energy Act, commercial rooftop solar PV, BESS storage, water conservation, and resilient construction practices.',
  },
  technology: {
    title: 'Building Technology & Digital Project Controls | LDL Dhenze',
    description: 'Building Information Modeling (BIM), 4D timeline simulation, IoT telemetry, and transparent digital milestone tracking.',
  },
  insights: {
    title: 'Executive Insights & Technical Publications | LDL Dhenze',
    description: 'Philippine building code analysis, renewable microgrid engineering white papers, and regional infrastructure development intelligence.',
  },
  partners: {
    title: 'Professional Partners & Ecosystem | LDL Dhenze',
    description: 'Collaborating with PRC-licensed professionals, accredited material suppliers, and specialized engineering contractors.',
  },
  contact: {
    title: 'Executive Inquiries & Headquarters | LDL Dhenze',
    description: 'Direct inquiries to LDL Dhenze executive offices at KMC | One West Aeropark, Clark Freeport Zone, Pampanga.',
  },
  'start-project': {
    title: 'Discuss a Project | Development Inquiry | LDL Dhenze',
    description: 'Structured development qualification for developers, landowners, family offices, and commercial investors in the Philippines.',
  },
  'book-consultation': {
    title: 'Request a Private Consultation | LDL Dhenze',
    description: 'Schedule a confidential consultation with senior development advisory and engineering specialists.',
  },
  portal: {
    title: 'Client Portal | Secure Project Workspace | LDL Dhenze',
    description: 'Restricted client workspace for milestones, technical documentation, architectural drawings, and commercial proposals.',
  },
  privacy: {
    title: 'Data Privacy & Protection Notice | LDL Dhenze',
    description: 'Statutory compliance under RA 10173 (Philippine Data Privacy Act of 2012) and National Privacy Commission regulations.',
  },
  terms: {
    title: 'Terms of Service & Commercial Conditions | LDL Dhenze',
    description: 'Operational and commercial conditions governing client development workspaces, supplier accreditation, and partner tendering.',
  },
  'regulatory-disclosures': {
    title: 'Licensing & Regulatory Disclosures | LDL Dhenze',
    description: 'Statutory business registrations, DTI certification, tax identification, and professional practice disclosures.',
  },
  accessibility: {
    title: 'Accessibility Statement & WCAG 2.2 AA Compliance | LDL Dhenze',
    description: 'Commitment to accessible digital engineering across public portals and private enterprise workspaces.',
  },
  login: {
    title: 'Authenticated Workspace Access | LDL Dhenze',
    description: 'Secure multi-tenant login for clients, suppliers, partner contractors, and project controllers.',
  },
  'qa-testing': {
    title: 'Automated QA System Console | LDL Dhenze',
    description: 'Interactive diagnostic suite verifying API endpoints, data schema integrity, and security policies.',
  },
  'ceo-corner': {
    title: 'Founder’s Message & CEO Corner | LDL Dhenze Residential Building Construction',
    description: 'Official leadership message, founder pledge, and governance principles by Leodenis “Dhenze” Languisan, Founder, President and CEO.',
  },
  'company-profile': {
    title: 'Corporate Profile & Statutory Registrations | LDL Dhenze',
    description: 'Official comprehensive Corporate Profile, DTI Certificate No. 4812272, BIR Form 2303, PSIC 42900, and nine registered business fields.',
  },
  'company-profile-admin': {
    title: 'Corporate Profile Publication Console | LDL Dhenze Admin',
    description: 'Dual-custody verification, automated safety checks, and publication lifecycle management for official corporate profile.',
  },
  'verification-center': {
    title: 'Government License & Credential Verification Center | LDL Dhenze',
    description: 'Simulated government licensing verification engine across PRC, PCAB, SEC, DTI, LGU, and BIR.',
  },
  onboarding: {
    title: 'Unified Onboarding & Compliance Dashboard | LDL Dhenze',
    description: 'Comprehensive contractor, supplier, professional, and client onboarding portal with credential verification.',
  },
  'onboarding-dashboard': {
    title: 'Unified Onboarding & Compliance Dashboard | LDL Dhenze',
    description: 'Comprehensive contractor, supplier, professional, and client onboarding portal with credential verification.',
  },
};

export default function App() {
  const [currentView, setCurrentView] = useState<string>('home');
  const [currentUserRole, setCurrentUserRole] = useState<UserRole>('ANONYMOUS_VISITOR');
  const [assistantOpen, setAssistantOpen] = useState<boolean>(false);
  const [selectedCapabilityId, setSelectedCapabilityId] = useState<string | undefined>();
  const [selectedIndustryId, setSelectedIndustryId] = useState<string | undefined>();
  const [selectedProjectSlug, setSelectedProjectSlug] = useState<string>('angeles-reserve');
  const [selectedInsightSlug, setSelectedInsightSlug] = useState<string>('art-01');
  const [portalsEnabled, setPortalsEnabled] = useState<boolean>(false);
  const [isEmergencyAdmin, setIsEmergencyAdmin] = useState<boolean>(false);
  const [authenticatedUser, setAuthenticatedUser] = useState<any | null>(null);

  // Query server for portal lock state
  useEffect(() => {
    fetch('/api/security/portal-status')
      .then((res) => res.json())
      .then((data) => {
        setPortalsEnabled(Boolean(data.portalsEnabled));
      })
      .catch(() => {
        setPortalsEnabled(false);
      });

    // Hydrate existing session from storage if present
    try {
      const storedUser = sessionStorage.getItem('ldl_auth_user');
      if (storedUser) {
        const parsed = JSON.parse(storedUser);
        setAuthenticatedUser(parsed);
        setCurrentUserRole('SYSTEM_ADMIN');
        setIsEmergencyAdmin(true);
        setPortalsEnabled(true);
      }
    } catch {
      // ignore
    }
  }, []);

  const handleLogout = () => {
    try {
      sessionStorage.removeItem('ldl_auth_user');
      sessionStorage.removeItem('ldl_auth_role');
      sessionStorage.removeItem('ldl_portal_auth');
    } catch {
      // ignore
    }
    setAuthenticatedUser(null);
    setCurrentUserRole('ANONYMOUS_VISITOR');
    setIsEmergencyAdmin(false);
    handleNavigate('home');
  };

  // Synchronize route with URL hash for browser history & SPA bookmarking
  useEffect(() => {
    const parseHash = () => {
      const hash = window.location.hash.replace(/^#\/?/, '').trim();
      if (!hash) return;

      if (hash === 'pricing') {
        setCurrentView('portal');
        return;
      }

      if (hash.startsWith('capability-')) {
        setSelectedCapabilityId(hash.replace('capability-', ''));
        setCurrentView('capabilities');
      } else if (hash.startsWith('capabilities:')) {
        setSelectedCapabilityId(hash.split(':')[1]);
        setCurrentView('capabilities');
      } else if (hash.startsWith('industry-')) {
        setSelectedIndustryId(hash.replace('industry-', ''));
        setCurrentView('industries');
      } else if (hash.startsWith('industries:')) {
        setSelectedIndustryId(hash.split(':')[1]);
        setCurrentView('industries');
      } else if (hash.startsWith('projects/') || hash.startsWith('projects:')) {
        const slug = hash.includes('/') ? hash.split('/')[1] : hash.split(':')[1];
        setSelectedProjectSlug(slug);
        setCurrentView('project-detail');
      } else if (hash.startsWith('insights/') || hash.startsWith('insights:')) {
        const slug = hash.includes('/') ? hash.split('/')[1] : hash.split(':')[1];
        setSelectedInsightSlug(slug);
        setCurrentView('insight-detail');
      } else if (hash.startsWith('portal/') || hash.startsWith('operations/')) {
        setCurrentView(hash);
      } else if (ROUTE_METADATA[hash]) {
        setCurrentView(hash);
      }
    };

    parseHash();
    window.addEventListener('hashchange', parseHash);
    return () => window.removeEventListener('hashchange', parseHash);
  }, []);

  // Update document title & meta tags whenever view changes
  useEffect(() => {
    const meta = ROUTE_METADATA[currentView] || ROUTE_METADATA.home;
    document.title = meta.title;

    const descEl = document.querySelector('meta[name="description"]');
    if (descEl) descEl.setAttribute('content', meta.description);

    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute('content', meta.title);

    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) ogDesc.setAttribute('content', meta.description);
  }, [currentView]);

  // Robust navigation handler
  const handleNavigate = (view: string) => {
    let clean = view.replace(/^#\/?/, '').replace(/^\//, '');
    let targetView = clean;

    if (clean === 'pricing') {
      targetView = 'portal';
    } else if (clean.startsWith('capability-')) {
      const capId = clean.replace('capability-', '');
      setSelectedCapabilityId(capId);
      targetView = 'capabilities';
    } else if (clean.startsWith('capabilities:')) {
      const capId = clean.split(':')[1];
      setSelectedCapabilityId(capId);
      targetView = 'capabilities';
    } else if (clean.startsWith('industry-')) {
      const indId = clean.replace('industry-', '');
      setSelectedIndustryId(indId);
      targetView = 'industries';
    } else if (clean.startsWith('industries:')) {
      const indId = clean.split(':')[1];
      setSelectedIndustryId(indId);
      targetView = 'industries';
    } else if (clean.startsWith('projects/') || clean.startsWith('projects:')) {
      const slug = clean.includes('/') ? clean.split('/')[1] : clean.split(':')[1];
      setSelectedProjectSlug(slug);
      targetView = 'project-detail';
    } else if (clean.startsWith('insights/') || clean.startsWith('insights:')) {
      const slug = clean.includes('/') ? clean.split('/')[1] : clean.split(':')[1];
      setSelectedInsightSlug(slug);
      targetView = 'insight-detail';
    } else if (clean.includes('#credentials')) {
      targetView = 'about';
    }

    setCurrentView(targetView);
    window.location.hash = targetView;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Check if target is a private portal path (strictly non-public)
  const isPortalPath =
    currentView === 'verification-center' ||
    currentView === 'onboarding' ||
    currentView === 'onboarding-dashboard' ||
    currentView === 'company-profile-admin' ||
    currentView === 'portal' ||
    currentView.startsWith('portal/') ||
    currentView.startsWith('/portal/') ||
    currentView.startsWith('operations/') ||
    currentView.startsWith('/operations/') ||
    currentView === 'admin' ||
    currentView.startsWith('admin/') ||
    currentView.startsWith('/admin/') ||
    currentView.startsWith('projects/private/') ||
    currentView.startsWith('/projects/private/');

  // 1. Authentication Gateway: Non-authenticated visitors attempting portal access (Section 3 & 4)
  if (isPortalPath && (!authenticatedUser || currentUserRole === 'ANONYMOUS_VISITOR')) {
    return (
      <div className="min-h-screen bg-[#071A2F]">
        <AuthPages
          mode="login"
          targetView={currentView}
          onNavigate={handleNavigate}
          currentUserRole={currentUserRole}
          onChangeUserRole={setCurrentUserRole}
          onLoginSuccess={(user) => {
            setAuthenticatedUser(user);
            setIsEmergencyAdmin(true);
            setPortalsEnabled(true);
          }}
        />
      </div>
    );
  }

  // 2. Emergency Portal Lock Guard (Section 1)
  if (isPortalPath && !portalsEnabled && !isEmergencyAdmin) {
    return (
      <EmergencyPortalLockScreen
        onNavigate={handleNavigate}
        currentUser={authenticatedUser}
      />
    );
  }

  // 3. System Administrator IAM & Access Management Console (Section 5 & 17)
  if (currentView === 'admin' || currentView.startsWith('admin/') || currentView.startsWith('/admin/')) {
    if (currentUserRole !== 'SYSTEM_ADMIN') {
      return (
        <div className="min-h-screen bg-[#050E1A] text-slate-100 flex items-center justify-center p-4">
          <div className="max-w-md w-full bg-[#08182B] border border-rose-500/30 rounded-2xl p-6 sm:p-8 text-center space-y-4">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-rose-500/10 text-rose-400 border border-rose-500/20">
              <Shield className="w-6 h-6" />
            </div>
            <h2 className="text-xl font-serif font-bold text-white">403 Forbidden: Administrator Only</h2>
            <p className="text-xs text-slate-300 leading-relaxed">
              Access to the System Administration and IAM Console is strictly restricted to accounts with the verified <code className="text-[#C6922D] font-mono">System Administrator</code> role.
            </p>
            <div className="pt-2 flex justify-center gap-3">
              <button
                onClick={() => handleNavigate('home')}
                className="px-4 py-2 text-xs font-semibold text-slate-300 hover:text-white bg-white/5 border border-white/10 rounded-lg"
              >
                Return Home
              </button>
              <button
                onClick={() => handleNavigate('operations/overview')}
                className="px-4 py-2 text-xs font-semibold text-[#071A2F] bg-[#C6922D] hover:bg-[#d8a339] rounded-lg"
              >
                Go to Workspace
              </button>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="min-h-screen bg-[#050E1A] text-slate-100 p-4 sm:p-8 blueprint-grid">
        <div className="max-w-7xl mx-auto space-y-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => handleNavigate('home')}
              className="text-xs text-slate-400 hover:text-white flex items-center gap-1 font-semibold"
            >
              ← Return to Corporate Home
            </button>
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono text-[#C6922D]">
                Session: {authenticatedUser?.email || 'Authorized Administrator'}
              </span>
              <button
                onClick={() => handleNavigate('operations/overview')}
                className="text-xs px-2.5 py-1 rounded bg-[#C6922D]/20 text-[#C6922D] border border-[#C6922D]/40 font-mono"
              >
                Operations Dashboard →
              </button>
            </div>
          </div>
          <AdminAccessConsole currentUser={authenticatedUser} onNavigate={handleNavigate} />
        </div>
      </div>
    );
  }

  // Unified Onboarding & Government Verification Dashboard
  if (
    currentView === 'onboarding' ||
    currentView === 'onboarding-dashboard' ||
    currentView === 'verification-center'
  ) {
    return (
      <div className="min-h-screen bg-[#071A2F] text-slate-100 selection:bg-[#C6922D] selection:text-[#071A2F]">
        <UnifiedOnboardingDashboard
          initialSection={currentView === 'verification-center' ? 'verification-center' : 'overview'}
          currentUserRole={currentUserRole}
          onNavigate={handleNavigate}
        />
        <BuilderAssistantModal
          isOpen={assistantOpen}
          onClose={() => setAssistantOpen(false)}
          currentUserRole={currentUserRole}
          onChangeUserRole={setCurrentUserRole}
          onNavigate={handleNavigate}
        />
      </div>
    );
  }

  // Enterprise Multi-Tenant Portal Routes
  if (
    currentView.startsWith('portal/') ||
    currentView.startsWith('/portal/') ||
    currentView.startsWith('operations/') ||
    currentView.startsWith('/operations/')
  ) {
    return (
      <div className="min-h-screen bg-[#061325] text-slate-100 selection:bg-[#C6922D] selection:text-[#071A2F]">
        {isEmergencyAdmin && (
          <div className="bg-amber-950/80 border-b border-amber-800/80 px-4 py-1.5 text-xs text-amber-200 flex items-center justify-between font-mono">
            <span>● Emergency Admin Bypass Mode Active • Audit logging all actions</span>
            <button
              onClick={() => handleNavigate('admin')}
              className="underline hover:text-white font-bold"
            >
              Open Access Console
            </button>
          </div>
        )}
        <EnterprisePortalLayout
          currentPath={`/${currentView.replace(/^\//, '')}`}
          onNavigate={handleNavigate}
          currentUserRole={currentUserRole}
          onChangeUserRole={setCurrentUserRole}
        />
        <BuilderAssistantModal
          isOpen={assistantOpen}
          onClose={() => setAssistantOpen(false)}
          currentUserRole={currentUserRole}
          onChangeUserRole={setCurrentUserRole}
          onNavigate={handleNavigate}
        />
      </div>
    );
  }

  // Legacy Single Client Portal View
  if (currentView === 'portal') {
    return (
      <div className="min-h-screen bg-[#061325] text-slate-100 selection:bg-[#C6922D] selection:text-[#071A2F]">
        {isEmergencyAdmin && (
          <div className="bg-amber-950/80 border-b border-amber-800/80 px-4 py-1.5 text-xs text-amber-200 flex items-center justify-between font-mono">
            <span>● Emergency Admin Bypass Mode Active • Audit logging all actions</span>
            <button
              onClick={() => handleNavigate('admin')}
              className="underline hover:text-white font-bold"
            >
              Open Access Console
            </button>
          </div>
        )}
        <PortalPage
          currentUserRole={currentUserRole}
          onChangeUserRole={setCurrentUserRole}
          onNavigate={handleNavigate}
        />
        <BuilderAssistantModal
          isOpen={assistantOpen}
          onClose={() => setAssistantOpen(false)}
          currentUserRole={currentUserRole}
          onChangeUserRole={setCurrentUserRole}
          onNavigate={handleNavigate}
        />
      </div>
    );
  }

  // Public Website Shell
  return (
    <div className="min-h-screen flex flex-col bg-[#071A2F] text-slate-100 selection:bg-[#C6922D] selection:text-[#071A2F]">
      {/* Accessibility: Skip to Content */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-[#C6922D] focus:text-[#071A2F] focus:font-bold focus:rounded-md focus:shadow-2xl focus:outline-none"
      >
        Skip to main content
      </a>

      {/* Global Responsive Header (76px fixed height) */}
      <Header
        currentView={currentView}
        onNavigate={handleNavigate}
        currentUserRole={currentUserRole}
        onChangeUserRole={setCurrentUserRole}
        onOpenAssistant={() => setAssistantOpen(true)}
        authenticatedUser={authenticatedUser}
        onSignOut={handleLogout}
      />

      {/* Main Content Area */}
      <main id="main-content" tabIndex={-1} className="flex-1 pt-[76px] focus:outline-none">
        {currentView === 'home' && (
          <HomePage
            onNavigate={handleNavigate}
            onOpenAssistant={() => setAssistantOpen(true)}
          />
        )}

        {currentView === 'about' && (
          <AboutPage
            onNavigate={handleNavigate}
            onOpenAssistant={() => setAssistantOpen(true)}
          />
        )}

        {currentView === 'capabilities' && (
          <CapabilitiesPage
            onNavigate={handleNavigate}
            selectedCapabilityId={selectedCapabilityId}
          />
        )}

        {currentView === 'industries' && (
          <IndustriesPage
            onNavigate={handleNavigate}
            selectedIndustryId={selectedIndustryId}
          />
        )}

        {currentView === 'projects' && (
          <ProjectsPage onNavigate={handleNavigate} />
        )}

        {currentView === 'project-detail' && (
          <ProjectDetailPage
            projectSlug={selectedProjectSlug}
            onNavigate={handleNavigate}
          />
        )}

        {currentView === 'sustainability' && (
          <SustainabilityPage onNavigate={handleNavigate} />
        )}

        {currentView === 'technology' && (
          <TechnologyPage
            onNavigate={handleNavigate}
            onOpenAssistant={() => setAssistantOpen(true)}
          />
        )}

        {currentView === 'insights' && (
          <InsightsPage onNavigate={handleNavigate} />
        )}

        {currentView === 'insight-detail' && (
          <InsightDetailPage
            articleSlug={selectedInsightSlug}
            onNavigate={handleNavigate}
          />
        )}

        {currentView === 'partners' && (
          <PartnersPage onNavigate={handleNavigate} />
        )}

        {currentView === 'contact' && (
          <ContactPage
            onNavigate={handleNavigate}
            onOpenAssistant={() => setAssistantOpen(true)}
          />
        )}

        {currentView === 'start-project' && (
          <StartProjectWizard onNavigate={handleNavigate} />
        )}

        {currentView === 'book-consultation' && (
          <BookConsultationPage onNavigate={handleNavigate} />
        )}

        {currentView === 'privacy' && (
          <PrivacyPolicyPage onNavigate={handleNavigate} />
        )}

        {currentView === 'terms' && (
          <TermsOfServicePage onNavigate={handleNavigate} />
        )}

        {currentView === 'regulatory-disclosures' && (
          <RegulatoryDisclosuresPage onNavigate={handleNavigate} />
        )}

        {currentView === 'accessibility' && (
          <AccessibilityStatementPage onNavigate={handleNavigate} />
        )}

        {currentView === 'login' && (
          <AuthPages
            mode="login"
            onNavigate={handleNavigate}
            currentUserRole={currentUserRole}
            onChangeUserRole={setCurrentUserRole}
            onLoginSuccess={(user) => {
              setAuthenticatedUser(user);
              setIsEmergencyAdmin(true);
              setPortalsEnabled(true);
            }}
          />
        )}

        {currentView === 'forgot-password' && (
          <AuthPages
            mode="forgot-password"
            onNavigate={handleNavigate}
            currentUserRole={currentUserRole}
            onChangeUserRole={setCurrentUserRole}
          />
        )}

        {currentView === 'verify-email' && (
          <AuthPages
            mode="verify-email"
            onNavigate={handleNavigate}
            currentUserRole={currentUserRole}
            onChangeUserRole={setCurrentUserRole}
          />
        )}

        {currentView === 'qa-testing' && (
          <QATestingConsole onNavigate={handleNavigate} />
        )}

        {currentView === 'ceo-corner' && (
          <CeoCornerPage
            onNavigate={handleNavigate}
            onOpenAssistant={() => setAssistantOpen(true)}
          />
        )}

        {currentView === 'company-profile' && (
          <CompanyProfilePage
            onNavigate={handleNavigate}
            onOpenAssistant={() => setAssistantOpen(true)}
          />
        )}

        {currentView === 'company-profile-admin' && (
          <CompanyProfileAdminConsole onNavigate={handleNavigate} />
        )}
      </main>

      {/* Global Comprehensive Footer */}
      <Footer
        onNavigate={handleNavigate}
        onOpenAssistant={() => setAssistantOpen(true)}
      />

      {/* Builder Assistant Modal */}
      <BuilderAssistantModal
        isOpen={assistantOpen}
        onClose={() => setAssistantOpen(false)}
        currentUserRole={currentUserRole}
        onChangeUserRole={setCurrentUserRole}
        onNavigate={handleNavigate}
      />
    </div>
  );
}
