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
  Download,
} from 'lucide-react';

interface HeaderProps {
  currentView: string;
  onNavigate: (view: string) => void;
  onOpenAssistant: () => void;
  currentUserRole: UserRole;
  onChangeUserRole: (role: UserRole) => void;
  authenticatedUser?: any;
  onSignOut?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentView,
  onNavigate,
  onOpenAssistant,
  currentUserRole,
  onChangeUserRole,
  authenticatedUser,
  onSignOut,
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
    { label: 'About Us', view: 'about' },
    { label: 'Corporate Profile', view: 'corporate-profile' },
    { label: 'Services', view: 'capabilities' },
    { label: 'Leadership', view: 'leadership' },
    { label: 'Projects', view: 'projects' },
    { label: 'Contact', view: 'contact' },
  ];

  const isViewActive = (view: string) => {
    if (view === 'about' && (currentView === 'about' || currentView === 'sustainability' || currentView === 'technology' || currentView === 'partners')) return true;
    if (view === 'corporate-profile' && (currentView === 'corporate-profile' || currentView === 'company-profile' || currentView === 'downloads')) return true;
    if (view === 'capabilities' && (currentView === 'capabilities' || currentView === 'services' || currentView.startsWith('capability-') || currentView.startsWith('capabilities:'))) return true;
    if (view === 'leadership' && (currentView === 'leadership' || currentView === 'ceo-corner')) return true;
    if (view === 'projects' && (currentView === 'projects' || currentView === 'project-detail' || currentView.startsWith('projects/') || currentView.startsWith('project-'))) return true;
    return currentView === view;
  };

  return (
    <header
      ref={headerRef}
      id="main-navigation-header"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 h-[76px] flex items-center ${
        isScrolled
          ? 'bg-[#061325]/95 backdrop-blur-md shadow-xl border-b border-[#C69A4B]/25'
          : 'bg-[#071A2F]/95 backdrop-blur-sm border-b border-white/10'
      }`}
    >
      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-3 lg:gap-4 xl:gap-6">
          {/* LEFT SECTION: Company Logo and Name */}
          <div className="shrink-0 flex items-center">
            <button
              onClick={() => handleNavClick('home')}
              className="inline-flex items-center text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C69A4B] rounded py-1 transition-opacity hover:opacity-90"
              aria-label="LDL Dhenze Residential Building Construction - Home"
            >
              <BrandLogo variant="dark" size="header" showTagline={false} />
            </button>
          </div>

          {/* CENTER SECTION: Main Navigation (Desktop) */}
          <nav
            id="desktop-primary-nav"
            className="hidden xl:flex items-center justify-center gap-4 2xl:gap-5 shrink-0"
            aria-label="Primary Navigation"
          >
            {navItems.map((item) => {
              const active = isViewActive(item.view);
              return (
                <button
                  key={item.label}
                  onClick={() => handleNavClick(item.view)}
                  className={`text-[12px] 2xl:text-[13px] font-semibold tracking-wider transition-colors py-1.5 whitespace-nowrap focus:outline-none focus-visible:ring-1 focus-visible:ring-[#C69A4B] relative ${
                    active
                      ? 'text-[#C69A4B] font-bold'
                      : 'text-slate-200 hover:text-[#C69A4B]'
                  }`}
                >
                  <span>{item.label}</span>
                  {active && (
                    <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#C69A4B] rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* RIGHT SECTION: Action Cluster (Desktop) */}
          <div className="hidden xl:flex items-center gap-2.5 2xl:gap-3 shrink-0">
            {/* Download Profile Button */}
            <a
              id="header-download-company-profile-btn"
              href="/documents/LDL-Dhenze-Corporate-Profile.pdf"
              download="LDL-Dhenze-Residential-Building-Construction-Corporate-Profile.pdf"
              className="h-[38px] px-4 text-[12px] font-bold uppercase tracking-wider text-[#071A2F] bg-[#C69A4B] hover:bg-[#d8a339] rounded-md transition-all shadow-sm hover:shadow-md inline-flex items-center justify-center gap-1.5 whitespace-nowrap focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C69A4B] shrink-0"
              title="Download Official 27-Page Corporate Profile (PDF) - Direct Download, No Login Required"
            >
              <Download className="w-3.5 h-3.5 shrink-0" />
              <span>DOWNLOAD PROFILE</span>
            </a>

            {/* Login / Authorized Session */}
            {authenticatedUser ? (
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => handleNavClick('operations/overview')}
                  className="h-[38px] px-3 text-[12px] font-mono text-emerald-300 border border-emerald-500/40 bg-emerald-950/40 hover:bg-emerald-900/50 rounded-md transition-all flex items-center gap-1.5 whitespace-nowrap"
                  title="Authorized Session"
                >
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="max-w-[90px] truncate">{authenticatedUser.loginId || 'Authorized'}</span>
                </button>
                <button
                  onClick={onSignOut}
                  className="h-[38px] px-2.5 text-[11px] text-slate-300 hover:text-white border border-white/15 hover:border-amber-400/40 hover:bg-white/10 rounded-md transition-all flex items-center gap-1"
                  title="Lock Portals & Sign Out"
                >
                  <Lock className="w-3.5 h-3.5 text-amber-400" />
                  <span className="text-[10px] font-mono">Lock</span>
                </button>
              </div>
            ) : (
              <button
                id="header-login-btn"
                onClick={() => handleNavClick('login')}
                className="h-[38px] px-3.5 text-[12px] font-semibold tracking-wider text-slate-200 hover:text-white border border-white/20 hover:border-[#C69A4B] hover:bg-white/5 rounded-md transition-all inline-flex items-center justify-center gap-1.5 whitespace-nowrap focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C69A4B]"
              >
                <Lock className="w-3.5 h-3.5 text-[#C69A4B]" />
                <span>Login</span>
              </button>
            )}

            {/* Dashboards & Portals Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                id="header-dashboards-btn"
                onClick={() => setDashboardsOpen(!dashboardsOpen)}
                className={`h-[38px] px-3.5 text-[12px] font-semibold tracking-wider rounded-md transition-all inline-flex items-center justify-center gap-1.5 whitespace-nowrap focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C69A4B] ${
                  dashboardsOpen ||
                  currentView.includes('portal') ||
                  currentView.includes('operations') ||
                  currentView === 'verification-center' ||
                  currentView === 'onboarding'
                    ? 'text-[#C69A4B] bg-[#C69A4B]/15 border border-[#C69A4B]'
                    : 'text-slate-200 hover:text-[#C69A4B] border border-white/20 hover:border-[#C69A4B]/50 hover:bg-white/5'
                }`}
                aria-expanded={dashboardsOpen}
                aria-haspopup="true"
              >
                <LayoutDashboard className="w-3.5 h-3.5 text-[#C69A4B]" />
                <span>Dashboards</span>
                <ChevronDown
                  className={`w-3 h-3 transition-transform ${
                    dashboardsOpen ? 'rotate-180 text-[#C69A4B]' : 'text-slate-400'
                  }`}
                />
              </button>

              {/* Dropdown Menu */}
              {dashboardsOpen && (
                <div
                  id="header-dashboards-dropdown"
                  className="absolute right-0 mt-2 w-72 bg-[#07182C] border border-[#C69A4B]/30 rounded-xl shadow-2xl p-2 z-50 backdrop-blur-xl animate-in fade-in"
                >
                  <div className="px-3 py-2 border-b border-white/10 flex items-center justify-between">
                    <div>
                      <p className="text-[10px] font-mono uppercase tracking-widest text-[#C69A4B]">
                        Access Directory
                      </p>
                      <p className="text-xs font-serif text-white font-medium">
                        Portals &amp; Verification Engines
                      </p>
                    </div>
                    {authenticatedUser ? (
                      <span className="text-[9px] font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-1.5 py-0.5 rounded flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                        UNLOCKED
                      </span>
                    ) : (
                      <span className="text-[9px] font-mono text-amber-400 bg-amber-400/10 border border-amber-400/30 px-1.5 py-0.5 rounded flex items-center gap-1">
                        <Lock className="w-2.5 h-2.5" />
                        PRIVATE
                      </span>
                    )}
                  </div>

                  <div className="py-1 space-y-0.5 text-xs">
                    <button
                      onClick={() => handleNavClick('verification-center')}
                      className="w-full text-left px-3 py-2 rounded-lg hover:bg-[#C69A4B]/10 hover:text-white text-slate-200 flex items-start gap-2.5 transition-colors group"
                    >
                      <ShieldAlert className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                      <div className="flex-1 min-w-0">
                        <div className="font-semibold flex items-center justify-between gap-1">
                          <span className="truncate">Verification Center</span>
                          {!authenticatedUser ? (
                            <span className="text-[9px] font-mono px-1 py-0.2 rounded bg-amber-400/15 text-amber-300 shrink-0 flex items-center gap-0.5">
                              <Lock className="w-2.5 h-2.5" /> Auth Req
                            </span>
                          ) : (
                            <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-amber-400/20 text-amber-300 shrink-0">
                              DEMO
                            </span>
                          )}
                        </div>
                        <div className="text-[11px] text-slate-400 font-sans">
                          Simulated PRC, PCAB, SEC, BIR check engine
                        </div>
                      </div>
                    </button>

                    <button
                      onClick={() => handleNavClick('onboarding')}
                      className="w-full text-left px-3 py-2 rounded-lg hover:bg-[#C69A4B]/10 hover:text-white text-slate-200 flex items-start gap-2.5 transition-colors group"
                    >
                      <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <div className="flex-1 min-w-0">
                        <div className="font-semibold text-slate-200 group-hover:text-white flex items-center justify-between gap-1">
                          <span className="truncate">Onboarding Master Portal</span>
                          {!authenticatedUser && (
                            <span className="text-[9px] font-mono px-1 py-0.2 rounded bg-amber-400/15 text-amber-300 shrink-0 flex items-center gap-0.5">
                              <Lock className="w-2.5 h-2.5" /> Auth Req
                            </span>
                          )}
                        </div>
                        <div className="text-[11px] text-slate-400 font-sans">
                          Contractor, supplier, professional &amp; client intake
                        </div>
                      </div>
                    </button>

                    <button
                      onClick={() => handleNavClick('operations/overview')}
                      className="w-full text-left px-3 py-2 rounded-lg hover:bg-[#C69A4B]/10 hover:text-white text-slate-200 flex items-start gap-2.5 transition-colors group"
                    >
                      <Building2 className="w-4 h-4 text-[#C69A4B] shrink-0 mt-0.5" />
                      <div className="flex-1 min-w-0">
                        <div className="font-semibold text-slate-200 group-hover:text-white flex items-center justify-between gap-1">
                          <span className="truncate">Operations Command</span>
                          {!authenticatedUser && (
                            <span className="text-[9px] font-mono px-1 py-0.2 rounded bg-amber-400/15 text-amber-300 shrink-0 flex items-center gap-0.5">
                              <Lock className="w-2.5 h-2.5" /> Auth Req
                            </span>
                          )}
                        </div>
                        <div className="text-[11px] text-slate-400 font-sans">
                          Multi-tenant management, audit &amp; finance
                        </div>
                      </div>
                    </button>

                    <button
                      onClick={() => handleNavClick('portal')}
                      className="w-full text-left px-3 py-2 rounded-lg hover:bg-[#C69A4B]/10 hover:text-white text-slate-200 flex items-start gap-2.5 transition-colors group"
                    >
                      <Users className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                      <div className="flex-1 min-w-0">
                        <div className="font-semibold text-slate-200 group-hover:text-white flex items-center justify-between gap-1">
                          <span className="truncate">Client &amp; Partner Portal</span>
                          {!authenticatedUser && (
                            <span className="text-[9px] font-mono px-1 py-0.2 rounded bg-amber-400/15 text-amber-300 shrink-0 flex items-center gap-0.5">
                              <Lock className="w-2.5 h-2.5" /> Auth Req
                            </span>
                          )}
                        </div>
                        <div className="text-[11px] text-slate-400 font-sans">
                          Project milestones, billing &amp; live documents
                        </div>
                      </div>
                    </button>

                    <button
                      onClick={() => handleNavClick('company-profile-admin')}
                      className="w-full text-left px-3 py-2 rounded-lg hover:bg-[#C69A4B]/10 hover:text-white text-slate-200 flex items-start gap-2.5 transition-colors group border-t border-white/5 pt-2 mt-1"
                    >
                      <FileCheck className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                      <div className="flex-1 min-w-0">
                        <div className="font-semibold text-slate-200 group-hover:text-white flex items-center justify-between gap-1">
                          <span className="truncate">Profile Admin Console</span>
                          {!authenticatedUser && (
                            <span className="text-[9px] font-mono px-1 py-0.2 rounded bg-amber-400/15 text-amber-300 shrink-0 flex items-center gap-0.5">
                              <Lock className="w-2.5 h-2.5" /> Auth Req
                            </span>
                          )}
                        </div>
                        <div className="text-[11px] text-slate-400 font-sans">
                          Dual-custody verification &amp; publication
                        </div>
                      </div>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* RESPONSIVE HEADER CONTROLS (Tablets & Mobile: < xl) */}
          <div className="flex xl:hidden items-center gap-2 sm:gap-3">
            {/* Tablet/Mobile Download Button (Direct PDF Access) */}
            <a
              id="header-download-company-profile-mobile-btn"
              href="/documents/LDL-Dhenze-Corporate-Profile.pdf"
              download="LDL-Dhenze-Residential-Building-Construction-Corporate-Profile.pdf"
              className="h-[36px] sm:h-[38px] px-3 sm:px-4 text-[11px] sm:text-[12px] font-bold uppercase tracking-wider text-[#071A2F] bg-[#C69A4B] hover:bg-[#d8a339] rounded-md transition-all shadow-sm inline-flex items-center justify-center gap-1.5 whitespace-nowrap focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C69A4B] shrink-0"
              title="Download Official 27-Page Corporate Profile (PDF)"
            >
              <Download className="w-3.5 h-3.5 shrink-0" />
              <span className="hidden xs:inline">DOWNLOAD PROFILE</span>
              <span className="xs:hidden">PROFILE</span>
            </a>

            {/* Mobile/Tablet Menu Drawer Toggle */}
            <button
              id="mobile-menu-toggle-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="h-[36px] w-[36px] sm:h-[38px] sm:w-[38px] flex items-center justify-center text-slate-200 hover:text-[#C69A4B] hover:bg-white/5 border border-white/15 rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C69A4B]"
              aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
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
                <div className="flex items-center justify-between text-[11px] font-mono uppercase tracking-wider text-[#C6922D] font-semibold">
                  <div className="flex items-center gap-2">
                    <LayoutDashboard className="w-3.5 h-3.5" />
                    <span>Portals & Dashboards</span>
                  </div>
                  {authenticatedUser ? (
                    <span className="text-[9px] text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/20">
                      UNLOCKED
                    </span>
                  ) : (
                    <span className="text-[9px] text-amber-400 bg-amber-400/10 px-1.5 py-0.5 rounded border border-amber-400/20">
                      PRIVATE
                    </span>
                  )}
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <button
                    onClick={() => handleNavClick('verification-center')}
                    className="p-2.5 rounded-lg bg-white/5 hover:bg-[#C6922D]/20 text-left border border-white/10 transition-colors"
                  >
                    <div className="font-semibold text-amber-400 flex items-center justify-between text-[11px]">
                      <span className="flex items-center gap-1">
                        <ShieldAlert className="w-3 h-3" />
                        Verification
                      </span>
                      {!authenticatedUser && <Lock className="w-2.5 h-2.5 text-amber-400/80" />}
                    </div>
                    <div className="text-[10px] text-slate-400">Gov Credential Demo</div>
                  </button>

                  <button
                    onClick={() => handleNavClick('onboarding')}
                    className="p-2.5 rounded-lg bg-white/5 hover:bg-[#C6922D]/20 text-left border border-white/10 transition-colors"
                  >
                    <div className="font-semibold text-emerald-400 flex items-center justify-between text-[11px]">
                      <span className="flex items-center gap-1">
                        <ShieldCheck className="w-3 h-3" />
                        Onboarding
                      </span>
                      {!authenticatedUser && <Lock className="w-2.5 h-2.5 text-amber-400/80" />}
                    </div>
                    <div className="text-[10px] text-slate-400">Master Compliance</div>
                  </button>

                  <button
                    onClick={() => handleNavClick('operations/overview')}
                    className="p-2.5 rounded-lg bg-white/5 hover:bg-[#C6922D]/20 text-left border border-white/10 transition-colors"
                  >
                    <div className="font-semibold text-[#C6922D] flex items-center justify-between text-[11px]">
                      <span className="flex items-center gap-1">
                        <Building2 className="w-3 h-3" />
                        Operations
                      </span>
                      {!authenticatedUser && <Lock className="w-2.5 h-2.5 text-amber-400/80" />}
                    </div>
                    <div className="text-[10px] text-slate-400">Command & Audit</div>
                  </button>

                  <button
                    onClick={() => handleNavClick('portal')}
                    className="p-2.5 rounded-lg bg-white/5 hover:bg-[#C6922D]/20 text-left border border-white/10 transition-colors"
                  >
                    <div className="font-semibold text-sky-400 flex items-center justify-between text-[11px]">
                      <span className="flex items-center gap-1">
                        <Users className="w-3 h-3" />
                        Client Portal
                      </span>
                      {!authenticatedUser && <Lock className="w-2.5 h-2.5 text-amber-400/80" />}
                    </div>
                    <div className="text-[10px] text-slate-400">Projects & Finance</div>
                  </button>
                </div>
              </div>

              {authenticatedUser ? (
                <div className="space-y-2">
                  <div className="py-2.5 px-3 rounded-lg font-mono text-xs text-emerald-300 border border-emerald-500/30 bg-emerald-950/40 flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      <span>Active: {authenticatedUser.loginId || 'Authorized User'}</span>
                    </span>
                    <span className="text-[10px] uppercase font-sans text-emerald-400">Authorized</span>
                  </div>
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      onSignOut?.();
                    }}
                    className="w-full py-2.5 px-4 rounded-lg font-semibold text-xs tracking-wider text-amber-200 border border-amber-500/40 bg-amber-950/30 hover:bg-amber-900/40 flex items-center justify-center gap-2"
                  >
                    <Lock className="w-4 h-4 text-amber-400" />
                    <span>Lock Portals & Sign Out</span>
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => handleNavClick('login')}
                  className="w-full py-3 px-4 rounded-lg font-semibold text-xs tracking-wider text-slate-100 border border-[#C6922D]/40 bg-white/5 hover:bg-[#C6922D]/15 flex items-center justify-center gap-2"
                >
                  <Lock className="w-4 h-4 text-[#C6922D]" />
                  <span>Portal Login</span>
                </button>
              )}

              {/* Mobile Prominent Download Button (No Login Required) */}
              <a
                href="/documents/LDL-Dhenze-Corporate-Profile.pdf"
                download="LDL-Dhenze-Residential-Building-Construction-Corporate-Profile.pdf"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-3.5 px-4 rounded-lg font-bold text-xs uppercase tracking-wider text-[#071A2F] bg-[#C69A4B] hover:bg-[#d8a339] flex items-center justify-center gap-2 shadow-lg"
              >
                <Download className="w-4 h-4" />
                <span>DOWNLOAD PROFILE (PDF)</span>
              </a>

              <button
                onClick={() => handleNavClick('start-project')}
                className="w-full py-3 px-4 rounded-lg font-bold text-xs uppercase tracking-wider text-slate-200 bg-white/5 hover:bg-white/10 border border-white/20 flex items-center justify-center gap-2"
              >
                <span>Discuss a Project</span>
                <ArrowRight className="w-4 h-4 text-[#C69A4B]" />
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
              <div className="text-slate-200 font-medium">KMC | One West Aeropark, Clark Pampanga</div>
              <div className="text-slate-400">Mabalacat City, 2010 Pampanga, Philippines</div>
            </div>
            <div className="text-[11px] text-slate-300 pt-1">
              <a href="tel:+639179668814" className="hover:text-[#C6922D] transition-colors font-medium text-slate-200">+63 917 966 8814</a>
            </div>
            <div className="text-[11px] space-y-0.5 text-slate-400">
              <a href="mailto:info@dhenzebuilder.com" className="block text-slate-200 hover:text-[#C6922D]">info@dhenzebuilder.com</a>
              <a href="mailto:dhenzebuilders@gmail.com" className="block text-slate-400 hover:text-[#C6922D]">dhenzebuilders@gmail.com</a>
            </div>
            <div className="text-[10px] font-mono text-slate-500 pt-1 border-t border-white/5">
              DTI BN: 4812272 • PSIC 42900 Civil Engineering
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
