import React, { useState, useEffect, useRef } from 'react';
import { BrandLogo } from '../common/BrandLogo';
import { UserRole } from '../../types';
import {
  Menu,
  X,
  ArrowRight,
  ShieldCheck,
  ChevronDown,
  Lock,
  Sparkles,
  MapPin,
  Mail,
  Compass,
  FileCheck,
  LayoutDashboard,
  ShieldAlert,
  Building2,
  Users,
} from 'lucide-react';

interface HeaderProps {
  currentView: string;
  onNavigate: (view: string) => void;
  onOpenAssistant: () => void;
  currentUserRole: UserRole;
  onChangeUserRole: (role: UserRole) => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentView,
  onNavigate,
  onOpenAssistant,
  currentUserRole,
  onChangeUserRole,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dashboardsOpen, setDashboardsOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDashboardsOpen(false);
      }
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMobileMenuOpen(false);
        setDashboardsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleNavClick = (view: string) => {
    setMobileMenuOpen(false);
    setDashboardsOpen(false);
    onNavigate(view);
  };

  const navItems = [
    { label: 'Home', view: 'home' },
    { label: 'Company', view: 'about' },
    { label: 'Expertise', view: 'capabilities' },
    { label: 'Sectors', view: 'industries' },
    { label: 'Selected Work', view: 'projects' },
    { label: 'Insights', view: 'insights' },
    { label: 'Contact', view: 'contact' },
  ];

  const isViewActive = (view: string) => {
    if (view === 'about' && (currentView === 'about' || currentView === 'sustainability' || currentView === 'technology' || currentView === 'partners')) return true;
    if (view === 'capabilities' && (currentView === 'capabilities' || currentView.startsWith('capability-') || currentView.startsWith('capabilities:'))) return true;
    if (view === 'industries' && (currentView === 'industries' || currentView.startsWith('industry-') || currentView.startsWith('industries:'))) return true;
    return currentView === view;
  };

  return (
    <header
      ref={headerRef}
      id="main-navigation-header"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 h-[76px] flex items-center ${
        isScrolled
          ? 'bg-[#061325]/95 backdrop-blur-md shadow-xl border-b border-[#C6922D]/25'
          : 'bg-[#071A2F]/90 backdrop-blur-sm border-b border-white/5'
      }`}
    >
      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-2 xl:gap-3 2xl:gap-6">
          {/* Logo */}
          <div className="shrink-0 flex items-center">
            <button
              onClick={() => handleNavClick('home')}
              className="inline-flex items-center text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C6922D] rounded py-1 transition-opacity hover:opacity-90"
              aria-label="LDL Dhenze Residential Building Construction - Home"
            >
              <BrandLogo variant="dark" size="sm" showTagline={false} />
            </button>
          </div>

          {/* Desktop Primary Navigation */}
          <nav
            id="desktop-primary-nav"
            className="hidden xl:flex items-center justify-center gap-0.5 2xl:gap-1.5 shrink-0 px-1"
            aria-label="Primary Navigation"
          >
            {navItems.map((item) => {
              const active = isViewActive(item.view);
              return (
                <button
                  key={item.label}
                  onClick={() => handleNavClick(item.view)}
                  className={`px-2.5 py-1.5 2xl:px-3 2xl:py-2 text-[11px] 2xl:text-xs font-semibold uppercase tracking-wider transition-colors rounded-md whitespace-nowrap focus:outline-none focus-visible:ring-1 focus-visible:ring-[#C6922D] ${
                    active
                      ? 'text-[#C6922D] bg-white/5 font-bold'
                      : 'text-slate-200 hover:text-[#C6922D] hover:bg-white/5'
                  }`}
                >
                  {item.label === 'Selected Work' ? (
                    <>
                      <span className="hidden 2xl:inline">Selected </span>Work
                    </>
                  ) : (
                    item.label
                  )}
                </button>
              );
            })}
          </nav>

          {/* Desktop Actions Cluster */}
          <div className="hidden sm:flex items-center gap-2 2xl:gap-2.5 shrink-0">
            {/* Dashboards & Portals Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                id="header-dashboards-btn"
                onClick={() => setDashboardsOpen(!dashboardsOpen)}
                className={`px-2.5 py-1.5 2xl:px-3.5 2xl:py-2 text-[11px] 2xl:text-xs font-semibold tracking-wider rounded-md transition-all inline-flex items-center gap-1.5 whitespace-nowrap focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C6922D] ${
                  dashboardsOpen ||
                  currentView.includes('portal') ||
                  currentView.includes('operations') ||
                  currentView === 'verification-center' ||
                  currentView === 'onboarding'
                    ? 'text-[#C6922D] bg-[#C6922D]/15 border border-[#C6922D]'
                    : 'text-slate-200 hover:text-[#C6922D] border border-white/10 hover:border-[#C6922D]/40 hover:bg-white/5'
                }`}
                aria-expanded={dashboardsOpen}
                aria-haspopup="true"
              >
                <LayoutDashboard className="w-3.5 h-3.5 text-[#C6922D]" />
                <span>Dashboards</span>
                <ChevronDown
                  className={`w-3 h-3 transition-transform ${
                    dashboardsOpen ? 'rotate-180 text-[#C6922D]' : 'text-slate-400'
                  }`}
                />
              </button>

              {/* Dropdown Menu */}
              {dashboardsOpen && (
                <div
                  id="header-dashboards-dropdown"
                  className="absolute right-0 mt-2 w-72 bg-[#07182C] border border-[#C6922D]/30 rounded-xl shadow-2xl p-2 z-50 backdrop-blur-xl animate-in fade-in"
                >
                  <div className="px-3 py-2 border-b border-white/10">
                    <p className="text-[10px] font-mono uppercase tracking-widest text-[#C6922D]">
                      Access Directory
                    </p>
                    <p className="text-xs font-serif text-white font-medium">
                      Portals & Verification Engines
                    </p>
                  </div>

                  <div className="py-1 space-y-0.5 text-xs">
                    <button
                      onClick={() => handleNavClick('verification-center')}
                      className="w-full text-left px-3 py-2 rounded-lg hover:bg-[#C6922D]/10 hover:text-white text-slate-200 flex items-start gap-2.5 transition-colors group"
                    >
                      <ShieldAlert className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                      <div>
                        <div className="font-semibold flex items-center gap-1.5">
                          Verification Center
                          <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-amber-400/20 text-amber-300">
                            DEMO
                          </span>
                        </div>
                        <div className="text-[11px] text-slate-400 font-sans">
                          Simulated PRC, PCAB, SEC, BIR check engine
                        </div>
                      </div>
                    </button>

                    <button
                      onClick={() => handleNavClick('onboarding')}
                      className="w-full text-left px-3 py-2 rounded-lg hover:bg-[#C6922D]/10 hover:text-white text-slate-200 flex items-start gap-2.5 transition-colors group"
                    >
                      <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <div>
                        <div className="font-semibold text-slate-200 group-hover:text-white">
                          Onboarding Master Portal
                        </div>
                        <div className="text-[11px] text-slate-400 font-sans">
                          Contractor, supplier, professional & client intake
                        </div>
                      </div>
                    </button>

                    <button
                      onClick={() => handleNavClick('operations/overview')}
                      className="w-full text-left px-3 py-2 rounded-lg hover:bg-[#C6922D]/10 hover:text-white text-slate-200 flex items-start gap-2.5 transition-colors group"
                    >
                      <Building2 className="w-4 h-4 text-[#C6922D] shrink-0 mt-0.5" />
                      <div>
                        <div className="font-semibold text-slate-200 group-hover:text-white">
                          Operations Command
                        </div>
                        <div className="text-[11px] text-slate-400 font-sans">
                          Multi-tenant management, audit & finance
                        </div>
                      </div>
                    </button>

                    <button
                      onClick={() => handleNavClick('portal')}
                      className="w-full text-left px-3 py-2 rounded-lg hover:bg-[#C6922D]/10 hover:text-white text-slate-200 flex items-start gap-2.5 transition-colors group"
                    >
                      <Users className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                      <div>
                        <div className="font-semibold text-slate-200 group-hover:text-white">
                          Client & Partner Portal
                        </div>
                        <div className="text-[11px] text-slate-400 font-sans">
                          Project milestones, billing & live documents
                        </div>
                      </div>
                    </button>

                    <button
                      onClick={() => handleNavClick('company-profile-admin')}
                      className="w-full text-left px-3 py-2 rounded-lg hover:bg-[#C6922D]/10 hover:text-white text-slate-200 flex items-start gap-2.5 transition-colors group border-t border-white/5 pt-2 mt-1"
                    >
                      <FileCheck className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                      <div>
                        <div className="font-semibold text-slate-200 group-hover:text-white">
                          Profile Admin Console
                        </div>
                        <div className="text-[11px] text-slate-400 font-sans">
                          Dual-custody verification & publication
                        </div>
                      </div>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Outlined Login Button (Strict public website boundary) */}
            <button
              id="header-login-btn"
              onClick={() => handleNavClick('login')}
              className="hidden md:inline-flex px-2.5 py-1.5 2xl:px-3.5 2xl:py-2 text-[11px] 2xl:text-xs font-semibold tracking-wider text-slate-200 hover:text-white border border-[#C6922D]/40 hover:border-[#C6922D] hover:bg-[#C6922D]/10 rounded-md transition-all items-center gap-1.5 whitespace-nowrap focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C6922D]"
            >
              <Lock className="w-3.5 h-3.5 text-[#C6922D]" />
              <span>Login</span>
            </button>

            {/* Primary CTA: Discuss a Project */}
            <button
              id="header-discuss-project-btn"
              onClick={() => handleNavClick('start-project')}
              className="px-3 py-1.5 2xl:px-4 2xl:py-2 text-[11px] 2xl:text-xs font-bold uppercase tracking-wider text-[#071A2F] bg-[#C6922D] hover:bg-[#d8a339] rounded-md transition-all shadow-md hover:shadow-lg inline-flex items-center gap-1.5 whitespace-nowrap focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C6922D]"
            >
              <span className="hidden lg:inline">Discuss a Project</span>
              <span className="lg:hidden">Discuss</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Mobile & Tablet Hamburger Toggle */}
          <div className="flex items-center gap-2 xl:hidden">
            <button
              onClick={() => handleNavClick('login')}
              className="md:hidden px-2.5 py-1.5 text-[11px] font-semibold text-slate-200 border border-[#C6922D]/40 rounded inline-flex items-center gap-1"
            >
              <Lock className="w-3 h-3 text-[#C6922D]" />
              <span>Login</span>
            </button>

            <button
              id="mobile-menu-toggle-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-200 hover:text-[#C6922D] hover:bg-white/5 rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C6922D]"
              aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile & Tablet Slide-Down / Full Drawer */}
      {mobileMenuOpen && (
        <div
          id="mobile-navigation-drawer"
          className="xl:hidden fixed inset-x-0 top-[76px] bottom-0 bg-[#061325]/98 border-t border-[#C6922D]/25 backdrop-blur-2xl z-50 overflow-y-auto px-6 py-8 flex flex-col justify-between animate-in fade-in slide-in-from-top-4 duration-200"
        >
          <div className="space-y-6">
            <div className="text-[11px] uppercase tracking-widest text-[#C6922D] font-bold pb-2 border-b border-white/10">
              Corporate Directory
            </div>
            <div className="flex flex-col space-y-2">
              {navItems.map((item) => {
                const active = isViewActive(item.view);
                return (
                  <button
                    key={item.label}
                    onClick={() => handleNavClick(item.view)}
                    className={`text-left px-3 py-3 text-sm font-semibold rounded-lg transition-colors flex items-center justify-between ${
                      active
                        ? 'text-[#C6922D] bg-[#C6922D]/10 font-bold'
                        : 'text-slate-200 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <span>{item.label}</span>
                    <ArrowRight className="w-4 h-4 text-slate-500" />
                  </button>
                );
              })}
            </div>

            <div className="pt-4 border-t border-white/10 space-y-3">
              {/* Dashboards & Portals Quick Access for Mobile */}
              <div className="bg-[#051323] border border-[#C6922D]/30 rounded-xl p-3 space-y-2">
                <div className="flex items-center gap-2 text-[11px] font-mono uppercase tracking-wider text-[#C6922D] font-semibold">
                  <LayoutDashboard className="w-3.5 h-3.5" />
                  <span>Portals & Dashboards</span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <button
                    onClick={() => handleNavClick('verification-center')}
                    className="p-2.5 rounded-lg bg-white/5 hover:bg-[#C6922D]/20 text-left border border-white/10 transition-colors"
                  >
                    <div className="font-semibold text-amber-400 flex items-center gap-1 text-[11px]">
                      <ShieldAlert className="w-3 h-3" />
                      Verification
                    </div>
                    <div className="text-[10px] text-slate-400">Gov Credential Demo</div>
                  </button>

                  <button
                    onClick={() => handleNavClick('onboarding')}
                    className="p-2.5 rounded-lg bg-white/5 hover:bg-[#C6922D]/20 text-left border border-white/10 transition-colors"
                  >
                    <div className="font-semibold text-emerald-400 flex items-center gap-1 text-[11px]">
                      <ShieldCheck className="w-3 h-3" />
                      Onboarding
                    </div>
                    <div className="text-[10px] text-slate-400">Master Compliance</div>
                  </button>

                  <button
                    onClick={() => handleNavClick('operations/overview')}
                    className="p-2.5 rounded-lg bg-white/5 hover:bg-[#C6922D]/20 text-left border border-white/10 transition-colors"
                  >
                    <div className="font-semibold text-[#C6922D] flex items-center gap-1 text-[11px]">
                      <Building2 className="w-3 h-3" />
                      Operations
                    </div>
                    <div className="text-[10px] text-slate-400">Command & Audit</div>
                  </button>

                  <button
                    onClick={() => handleNavClick('portal')}
                    className="p-2.5 rounded-lg bg-white/5 hover:bg-[#C6922D]/20 text-left border border-white/10 transition-colors"
                  >
                    <div className="font-semibold text-sky-400 flex items-center gap-1 text-[11px]">
                      <Users className="w-3 h-3" />
                      Client Portal
                    </div>
                    <div className="text-[10px] text-slate-400">Projects & Finance</div>
                  </button>
                </div>
              </div>

              <button
                onClick={() => handleNavClick('login')}
                className="w-full py-3 px-4 rounded-lg font-semibold text-xs tracking-wider text-slate-100 border border-[#C6922D]/40 bg-white/5 hover:bg-[#C6922D]/15 flex items-center justify-center gap-2"
              >
                <Lock className="w-4 h-4 text-[#C6922D]" />
                <span>Account Login</span>
              </button>

              <button
                onClick={() => handleNavClick('start-project')}
                className="w-full py-3 px-4 rounded-lg font-bold text-xs uppercase tracking-wider text-[#071A2F] bg-[#C6922D] hover:bg-[#d8a339] flex items-center justify-center gap-2 shadow-lg"
              >
                <span>Discuss a Project</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAssistant();
                }}
                className="w-full py-2.5 px-4 rounded-lg font-medium text-xs text-slate-300 hover:text-[#C6922D] hover:bg-white/5 flex items-center justify-center gap-2"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#C6922D]" />
                <span>Consult Builder Assistant</span>
              </button>
            </div>
          </div>

          <div className="pt-8 text-xs text-slate-400 space-y-2 border-t border-white/10 mt-6">
            <div className="font-semibold text-slate-300">LDL Dhenze Residential Building Construction</div>
            <div className="text-[11px] leading-relaxed">
              KMC | One West Aeropark, Clark Freeport Zone, Mabalacat City, 2010 Pampanga
            </div>
            <div className="text-[11px] font-mono text-slate-500">
              DTI BN: 4812272 • PSIC 42900 Civil Engineering
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
