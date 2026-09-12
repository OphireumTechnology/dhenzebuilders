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
import { Sparkles, MessageSquare, ArrowUp } from 'lucide-react';

export default function App() {
  const [currentView, setCurrentView] = useState<string>('home');
  const [currentUserRole, setCurrentUserRole] = useState<UserRole>('ANONYMOUS_VISITOR');
  const [assistantOpen, setAssistantOpen] = useState<boolean>(false);
  const [selectedCapabilityId, setSelectedCapabilityId] = useState<string | undefined>();
  const [selectedIndustryId, setSelectedIndustryId] = useState<string | undefined>();

  // Scroll to top on navigation
  const handleNavigate = (view: string) => {
    // Check if view has params like "capabilities?id=cap-04" or similar
    if (view.startsWith('capabilities')) {
      const parts = view.split(':');
      if (parts[1]) setSelectedCapabilityId(parts[1]);
      setCurrentView('capabilities');
    } else if (view.startsWith('industries')) {
      const parts = view.split(':');
      if (parts[1]) setSelectedIndustryId(parts[1]);
      setCurrentView('industries');
    } else {
      setCurrentView(view);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#071A2F] text-slate-100 selection:bg-[#C6922D] selection:text-[#071A2F]">
      {/* Global Header with Navigation & Role Switcher */}
      <Header
        currentView={currentView}
        onNavigate={handleNavigate}
        currentUserRole={currentUserRole}
        onChangeUserRole={setCurrentUserRole}
        onOpenAssistant={() => setAssistantOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1">
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

      {/* Global Footer */}
      <Footer onNavigate={handleNavigate} />

      {/* Floating Action Buttons */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3">
        <button
          onClick={() => setAssistantOpen(true)}
          className="px-4 py-3 bg-[#C6922D] hover:bg-[#d8a339] text-[#071A2F] font-bold rounded-full shadow-2xl flex items-center gap-2 text-xs uppercase tracking-wider transition-transform hover:scale-105"
          aria-label="Open LDL Dhenze Builder Assistant"
        >
          <Sparkles className="w-4 h-4 fill-current" />
          <span className="hidden sm:inline">Builder Assistant</span>
        </button>
      </div>

      {/* Grounded Builder Assistant RAG Modal */}
      <BuilderAssistantModal
        isOpen={assistantOpen}
        onClose={() => setAssistantOpen(false)}
        currentUserRole={currentUserRole}
        onNavigate={handleNavigate}
      />
    </div>
  );
}
