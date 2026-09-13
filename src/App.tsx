import React, { useState, useEffect } from 'react';
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
  'qa-testing': {
    title: 'Automated QA System Console | LDL Dhenze',
    description: 'Interactive diagnostic suite verifying API endpoints, data schema integrity, and security policies.',
  },
};

export default function App() {
  const [currentView, setCurrentView] = useState<string>('home');
  const [currentUserRole, setCurrentUserRole] = useState<UserRole>('ANONYMOUS_VISITOR');
  const [assistantOpen, setAssistantOpen] = useState<boolean>(false);
  const [selectedCapabilityId, setSelectedCapabilityId] = useState<string | undefined>();
  const [selectedIndustryId, setSelectedIndustryId] = useState<string | undefined>();

  // Synchronize route with URL hash for browser history & SPA bookmarking
  useEffect(() => {
    const parseHash = () => {
      const hash = window.location.hash.replace(/^#\/?/, '').trim();
      if (!hash) return;

      if (hash === 'pricing') {
        // Redirect obsolete public pricing link into authenticated client portal
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
    let targetView = view;

    if (view === 'pricing') {
      // Obsolete public pricing redirects to authenticated Client Portal
      targetView = 'portal';
    } else if (view.startsWith('capability-')) {
      const capId = view.replace('capability-', '');
      setSelectedCapabilityId(capId);
      targetView = 'capabilities';
    } else if (view.startsWith('capabilities:')) {
      const capId = view.split(':')[1];
      setSelectedCapabilityId(capId);
      targetView = 'capabilities';
    } else if (view === 'capabilities') {
      targetView = 'capabilities';
    } else if (view.startsWith('industry-')) {
      const indId = view.replace('industry-', '');
      setSelectedIndustryId(indId);
      targetView = 'industries';
    } else if (view.startsWith('industries:')) {
      const indId = view.split(':')[1];
      setSelectedIndustryId(indId);
      targetView = 'industries';
    } else if (view === 'industries') {
      targetView = 'industries';
    } else if (view.includes('#credentials')) {
      targetView = 'about';
    }

    setCurrentView(targetView);
    window.location.hash = targetView;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Dedicated Client Portal Shell: No public-site navigation or footer inside portal
  if (currentView === 'portal') {
    return (
      <div className="min-h-screen bg-[#061325] text-slate-100 selection:bg-[#C6922D] selection:text-[#071A2F]">
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
      />

      {/* Main Content Area (With pt-[76px] to prevent fixed header overlap) */}
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

        {currentView === 'qa-testing' && (
          <QATestingConsole onNavigate={handleNavigate} />
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
