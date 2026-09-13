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
import { PricingPage } from './components/pages/PricingPage';
import { PortalPage } from './components/pages/PortalPage';
import { QATestingConsole } from './components/pages/QATestingConsole';
import { BuilderAssistantModal } from './components/assistant/BuilderAssistantModal';
import { Sparkles } from 'lucide-react';

const ROUTE_METADATA: Record<string, { title: string; description: string }> = {
  home: {
    title: 'LDL Dhenze Residential Building Construction | Building Today. Engineering Tomorrow. Powering the Future.',
    description: 'Integrated development, construction, civil works, renewable energy, and smart infrastructure across Central Luzon and the Philippines.',
  },
  about: {
    title: 'About LDL Dhenze | Corporate Identity, Governance & Statutory Compliance',
    description: 'DTI-registered construction enterprise (BN 4812272) led by Leodenis Deveza Languisan with institutional banking governance and compliance rigor.',
  },
  capabilities: {
    title: 'Capabilities | 14 Integrated Lines of Business & Services | LDL Dhenze',
    description: 'Comprehensive scope: civil works, direct supply networks, heavy fleet mobilization, architecture coordination, solar PV microgrids, and smart telemetry.',
  },
  industries: {
    title: 'Industries Served | Strategic Market Sectors | LDL Dhenze',
    description: 'Delivering tailored engineering solutions for residential developments, agro-industrial cold storage, clean energy, civil roads, and smart townships.',
  },
  projects: {
    title: 'Verified Project Portfolio | Projects & Studies | LDL Dhenze',
    description: 'Explore completed, under-construction, in-development, proposed, and conceptual developments with verified metrics and statutory disclaimers.',
  },
  sustainability: {
    title: 'Sustainability & ESG | Renewable Energy & Decarbonization | LDL Dhenze',
    description: 'Alignment with RA 9513 Renewable Energy Act, rooftop solar PV, BESS storage, water conservation, and low-carbon construction practices.',
  },
  technology: {
    title: 'Technology & Applied Innovation | BIM, Digital Twins & IoT | LDL Dhenze',
    description: 'Modern infrastructure technology: Building Information Modeling (BIM), 4D timeline simulation, IoT sensor networks, and autonomous site management.',
  },
  pricing: {
    title: 'Pricing & Commercial Structure | Transparent Unit Economics | LDL Dhenze',
    description: 'Institutional-grade commercial transparency: cost breakdowns, unit rates, AI engineering tier pricing, and direct bank reconciliation.',
  },
  insights: {
    title: 'Industry Insights & Technical Publications | LDL Dhenze',
    description: 'Philippine building code analysis, renewable microgrid engineering white papers, and regional infrastructure development intelligence.',
  },
  partners: {
    title: 'Partner Ecosystem & Subcontractor Onboarding | LDL Dhenze',
    description: 'Collaborating with PRC-licensed professionals, accredited material suppliers, and specialized engineering contractors.',
  },
  contact: {
    title: 'Contact Engineering Headquarters | Inquiries & Consultation | LDL Dhenze',
    description: 'Connect with LDL Dhenze in San Fernando, Pampanga. Direct phone, email, and location channels for commercial and technical inquiries.',
  },
  'start-project': {
    title: 'Project Opportunity Wizard | Start a Project | LDL Dhenze',
    description: 'Structured 6-step project qualification wizard for developers, landowners, and commercial investors in the Philippines.',
  },
  'book-consultation': {
    title: 'Book Technical Consultation | Engineering & Permitting Review | LDL Dhenze',
    description: 'Schedule a structured technical consultation with senior engineering and compliance specialists.',
  },
  portal: {
    title: 'Client & Partner Project Room | Secure Dashboard | LDL Dhenze',
    description: 'Real-time project room for milestone tracking, document verification, submittals, and multi-role audit logs.',
  },
  'qa-testing': {
    title: 'Automated 20-Point QA System Console | LDL Dhenze',
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

    if (view.startsWith('capability-')) {
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
    window.location.hash = view;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

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

        {currentView === 'pricing' && (
          <PricingPage
            onNavigate={handleNavigate}
            onOpenAssistant={() => setAssistantOpen(true)}
          />
        )}

        {currentView === 'portal' && (
          <PortalPage
            currentUserRole={currentUserRole}
            onChangeUserRole={setCurrentUserRole}
            onNavigate={handleNavigate}
          />
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

      {/* Floating Action Button for Builder Assistant */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3">
        <button
          id="floating-assistant-btn"
          onClick={() => setAssistantOpen(true)}
          className="px-4 py-3 bg-[#C6922D] hover:bg-[#d8a339] text-[#071A2F] font-bold rounded-full shadow-2xl flex items-center gap-2 text-xs uppercase tracking-wider transition-all hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C6922D]"
          aria-label="Open LDL Dhenze Builder AI Assistant"
        >
          <Sparkles className="w-4 h-4 fill-current" />
          <span className="hidden sm:inline">Builder Assistant</span>
        </button>
      </div>

      {/* Grounded Builder Assistant Modal */}
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
