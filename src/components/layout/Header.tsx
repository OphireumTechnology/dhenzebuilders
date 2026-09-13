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
  const [roleDropdownOpen, setRoleDropdownOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const roleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (roleRef.current && !roleRef.current.contains(e.target as Node)) {
        setRoleDropdownOpen(false);
      }
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMobileMenuOpen(false);
        setRoleDropdownOpen(false);
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
    setRoleDropdownOpen(false);
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
        <div className="flex items-center justify-between gap-4">
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
            className="hidden lg:flex items-center justify-center gap-1 xl:gap-2 flex-1 min-w-0 px-2"
            aria-label="Primary Navigation"
          >
            {navItems.map((item) => {
              const active = isViewActive(item.view);
              return (
                <button
                  key={item.label}
                  onClick={() => handleNavClick(item.view)}
                  className={`px-3 py-2 text-xs font-semibold uppercase tracking-wider transition-colors rounded-md whitespace-nowrap focus:outline-none focus-visible:ring-1 focus-visible:ring-[#C6922D] ${
                    active
                      ? 'text-[#C6922D] bg-white/5 font-bold'
                      : 'text-slate-200 hover:text-[#C6922D] hover:bg-white/5'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Desktop Actions Cluster */}
          <div className="hidden sm:flex items-center gap-2.5 shrink-0">
            {/* Outlined Login Button (Strict public website boundary) */}
            <button
              id="header-login-btn"
              onClick={() => handleNavClick('login')}
              className="px-3.5 py-2 text-xs font-semibold tracking-wider text-slate-200 hover:text-white border border-[#C6922D]/40 hover:border-[#C6922D] hover:bg-[#C6922D]/10 rounded-md transition-all inline-flex items-center gap-1.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C6922D]"
            >
              <Lock className="w-3.5 h-3.5 text-[#C6922D]" />
              <span>Login</span>
            </button>

            {/* Primary CTA: Discuss a Project */}
            <button
              id="header-discuss-project-btn"
              onClick={() => handleNavClick('start-project')}
              className="px-4 py-2 text-xs font-bold uppercase tracking-wider text-[#071A2F] bg-[#C6922D] hover:bg-[#d8a339] rounded-md transition-all shadow-md hover:shadow-lg inline-flex items-center gap-1.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C6922D]"
            >
              <span>Discuss a Project</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Mobile & Tablet Hamburger Toggle */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={() => handleNavClick('login')}
              className="sm:hidden px-2.5 py-1.5 text-[11px] font-semibold text-slate-200 border border-[#C6922D]/40 rounded inline-flex items-center gap-1"
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
          className="lg:hidden fixed inset-x-0 top-[76px] bottom-0 bg-[#061325]/98 border-t border-[#C6922D]/25 backdrop-blur-2xl z-50 overflow-y-auto px-6 py-8 flex flex-col justify-between animate-in fade-in slide-in-from-top-4 duration-200"
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
