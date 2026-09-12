import React, { useState, useEffect } from 'react';
import { BrandLogo } from '../common/BrandLogo';
import { CAPABILITY_LIST, INDUSTRY_LIST } from '../../data/companyData';
import { UserRole } from '../../types';
import {
  Menu,
  X,
  ChevronDown,
  Sparkles,
  ShieldCheck,
  Building2,
  FileCheck,
  User,
  ArrowRight,
  Phone,
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
  const [capabilitiesOpen, setCapabilitiesOpen] = useState(false);
  const [industriesOpen, setIndustriesOpen] = useState(false);
  const [roleSwitcherOpen, setRoleSwitcherOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', view: 'home' },
    { label: 'About', view: 'about' },
    { label: 'Capabilities', view: 'capabilities', hasDropdown: true },
    { label: 'Industries', view: 'industries', hasDropdown: true },
    { label: 'Projects', view: 'projects' },
    { label: 'Sustainability', view: 'sustainability' },
    { label: 'Technology', view: 'technology' },
    { label: 'Pricing', view: 'pricing' },
    { label: 'Insights', view: 'insights' },
    { label: 'Partners', view: 'partners' },
    { label: 'Contact', view: 'contact' },
  ];

  const roleLabels: Record<UserRole, string> = {
    ANONYMOUS_VISITOR: 'Public Visitor',
    PROSPECTIVE_CLIENT: 'Prospective Client',
    VERIFIED_CLIENT: 'Client Portal',
    CLIENT_ORG_ADMIN: 'Client Org Admin',
    PARTNER_SUPPLIER: 'Partner / Supplier',
    PROJECT_CONSULTANT: 'Project Consultant',
    PROJECT_TEAM_MEMBER: 'Project Team',
    PROJECT_MANAGER: 'Project Manager',
    FINANCE_STAFF: 'Finance Staff',
    CONTENT_EDITOR: 'Content Editor',
    COMPLIANCE_REVIEWER: 'Compliance Officer',
    EXECUTIVE: 'Executive Board',
    SYSTEM_ADMIN: 'System Admin',
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#071A2F]/95 backdrop-blur-md shadow-2xl border-b border-[#C6922D]/20 py-2.5'
          : 'bg-[#071A2F]/80 backdrop-blur-sm border-b border-white/5 py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div
            onClick={() => onNavigate('home')}
            className="cursor-pointer"
            id="brand-header-logo"
          >
            <BrandLogo variant="dark" size="sm" showTagline={false} />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden xl:flex items-center space-x-1 lg:space-x-2">
            {navLinks.map((link) => {
              if (link.label === 'Capabilities') {
                return (
                  <div
                    key={link.label}
                    className="relative"
                    onMouseEnter={() => setCapabilitiesOpen(true)}
                    onMouseLeave={() => setCapabilitiesOpen(false)}
                  >
                    <button
                      onClick={() => onNavigate('capabilities')}
                      className={`px-2.5 py-2 text-xs font-semibold uppercase tracking-wider transition-colors inline-flex items-center gap-1 rounded-md ${
                        currentView === 'capabilities'
                          ? 'text-[#C6922D] bg-white/5 font-bold'
                          : 'text-slate-200 hover:text-[#C6922D] hover:bg-white/5'
                      }`}
                    >
                      {link.label}
                      <ChevronDown className="w-3.5 h-3.5 transition-transform duration-200" />
                    </button>

                    {/* Capabilities Mega Menu Dropdown */}
                    {capabilitiesOpen && (
                      <div className="absolute top-full left-1/2 -translate-x-1/2 w-[620px] bg-[#071A2F]/98 border border-[#C6922D]/30 shadow-2xl rounded-xl p-5 grid grid-cols-2 gap-3 mt-1 backdrop-blur-xl animate-in fade-in slide-in-from-top-2 duration-150">
                        {CAPABILITY_LIST.slice(0, 10).map((cap) => (
                          <div
                            key={cap.id}
                            onClick={() => {
                              onNavigate(`capability-${cap.id}`);
                              setCapabilitiesOpen(false);
                            }}
                            className="p-2.5 rounded-lg hover:bg-white/5 cursor-pointer border border-transparent hover:border-[#C6922D]/20 transition-all group"
                          >
                            <div className="flex items-start gap-2.5">
                              <span className="text-[10px] font-mono font-bold text-[#C6922D] bg-[#C6922D]/10 px-1.5 py-0.5 rounded mt-0.5">
                                #{String(cap.order).padStart(2, '0')}
                              </span>
                              <div>
                                <h4 className="text-xs font-bold text-slate-100 group-hover:text-[#C6922D] transition-colors">
                                  {cap.title}
                                </h4>
                                <p className="text-[11px] text-slate-400 line-clamp-1 mt-0.5">
                                  {cap.summary}
                                </p>
                              </div>
                            </div>
                          </div>
                        ))}
                        <div className="col-span-2 pt-2 mt-1 border-t border-white/10 flex justify-between items-center text-xs">
                          <span className="text-slate-400">14 Verified Lines of Business & Services</span>
                          <button
                            onClick={() => {
                              onNavigate('capabilities');
                              setCapabilitiesOpen(false);
                            }}
                            className="text-[#C6922D] font-bold inline-flex items-center gap-1 hover:underline"
                          >
                            Explore All 14 Capabilities <ArrowRight className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                );
              }

              if (link.label === 'Industries') {
                return (
                  <div
                    key={link.label}
                    className="relative"
                    onMouseEnter={() => setIndustriesOpen(true)}
                    onMouseLeave={() => setIndustriesOpen(false)}
                  >
                    <button
                      onClick={() => onNavigate('industries')}
                      className={`px-2.5 py-2 text-xs font-semibold uppercase tracking-wider transition-colors inline-flex items-center gap-1 rounded-md ${
                        currentView === 'industries'
                          ? 'text-[#C6922D] bg-white/5 font-bold'
                          : 'text-slate-200 hover:text-[#C6922D] hover:bg-white/5'
                      }`}
                    >
                      {link.label}
                      <ChevronDown className="w-3.5 h-3.5" />
                    </button>

                    {/* Industries Dropdown */}
                    {industriesOpen && (
                      <div className="absolute top-full left-1/2 -translate-x-1/2 w-[540px] bg-[#071A2F]/98 border border-[#C6922D]/30 shadow-2xl rounded-xl p-4 grid grid-cols-2 gap-2 mt-1 backdrop-blur-xl animate-in fade-in slide-in-from-top-2 duration-150">
                        {INDUSTRY_LIST.map((ind) => (
                          <div
                            key={ind.id}
                            onClick={() => {
                              onNavigate(`industry-${ind.id}`);
                              setIndustriesOpen(false);
                            }}
                            className="p-2 rounded-lg hover:bg-white/5 cursor-pointer border border-transparent hover:border-[#C6922D]/20 transition-all group"
                          >
                            <h4 className="text-xs font-bold text-slate-100 group-hover:text-[#C6922D] transition-colors">
                              {ind.title}
                            </h4>
                            <p className="text-[11px] text-slate-400 line-clamp-1 mt-0.5">
                              {ind.summary}
                            </p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              }

              return (
                <button
                  key={link.label}
                  onClick={() => onNavigate(link.view)}
                  className={`px-2.5 py-2 text-xs font-semibold uppercase tracking-wider transition-colors rounded-md ${
                    currentView === link.view
                      ? 'text-[#C6922D] bg-white/5 font-bold'
                      : 'text-slate-200 hover:text-[#C6922D] hover:bg-white/5'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
          </nav>

          {/* Right Action Cluster */}
          <div className="flex items-center space-x-2.5">
            {/* LDL Assistant Trigger */}
            <button
              id="header-assistant-btn"
              onClick={onOpenAssistant}
              className="relative inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold bg-[#C6922D]/15 text-[#e5b95d] border border-[#C6922D]/40 hover:bg-[#C6922D]/25 transition-all shadow-sm"
              title="Open LDL Dhenze Builder Assistant"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#C6922D] animate-pulse" />
              <span className="hidden sm:inline">Builder Assistant</span>
              <span className="sm:hidden">Assistant</span>
            </button>

            {/* Role & Portal Access Button */}
            <div className="relative">
              <button
                id="header-portal-btn"
                onClick={() => {
                  if (currentUserRole === 'ANONYMOUS_VISITOR') {
                    onNavigate('portal');
                  } else {
                    setRoleSwitcherOpen(!roleSwitcherOpen);
                  }
                }}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold bg-white/5 hover:bg-white/10 text-slate-200 border border-white/10 transition-colors"
              >
                <User className="w-3.5 h-3.5 text-[#C6922D]" />
                <span className="hidden md:inline">{roleLabels[currentUserRole]}</span>
                <ChevronDown className="w-3 h-3 text-slate-400" />
              </button>

              {/* Role Simulation Switcher for demo & verification */}
              {roleSwitcherOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-[#0a233f] border border-[#C6922D]/30 shadow-2xl rounded-xl p-2 z-50 text-xs animate-in fade-in duration-100">
                  <div className="px-3 py-2 border-b border-white/10 font-bold text-slate-300">
                    Active Security Persona:
                    <div className="text-[11px] text-[#C6922D] font-mono mt-0.5">
                      {currentUserRole}
                    </div>
                  </div>
                  <div className="max-h-60 overflow-y-auto py-1 space-y-0.5">
                    {(Object.keys(roleLabels) as UserRole[]).map((r) => (
                      <button
                        key={r}
                        onClick={() => {
                          onChangeUserRole(r);
                          setRoleSwitcherOpen(false);
                        }}
                        className={`w-full text-left px-3 py-1.5 rounded text-xs transition-colors flex items-center justify-between ${
                          currentUserRole === r
                            ? 'bg-[#C6922D]/20 text-[#C6922D] font-bold'
                            : 'text-slate-300 hover:bg-white/5'
                        }`}
                      >
                        <span>{roleLabels[r]}</span>
                        {currentUserRole === r && <ShieldCheck className="w-3.5 h-3.5" />}
                      </button>
                    ))}
                  </div>
                  <div className="pt-2 border-t border-white/10 flex flex-col gap-1">
                    <button
                      onClick={() => {
                        onNavigate('portal');
                        setRoleSwitcherOpen(false);
                      }}
                      className="w-full text-center py-1.5 bg-[#C6922D] text-[#071A2F] font-bold rounded hover:bg-[#d8a339] transition-colors"
                    >
                      Open Portal Dashboard
                    </button>
                    <button
                      onClick={() => {
                        onNavigate('qa-testing');
                        setRoleSwitcherOpen(false);
                      }}
                      className="w-full text-center py-1 text-[11px] text-slate-300 hover:text-[#C6922D] transition-colors"
                    >
                      Automated 20-Point QA Console
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Primary Action Button: Start a Project */}
            <button
              id="header-start-project-btn"
              onClick={() => onNavigate('start-project')}
              className="hidden sm:inline-flex items-center gap-1.5 px-4 py-1.5 rounded-md text-xs font-bold bg-[#C6922D] hover:bg-[#d8a339] text-[#071A2F] uppercase tracking-wider transition-all shadow-md hover:shadow-lg transform active:scale-95"
            >
              Start Project
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              id="mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2 text-slate-300 hover:text-white rounded-md hover:bg-white/5"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Drawer */}
        {mobileMenuOpen && (
          <div className="xl:hidden mt-3 pt-4 pb-6 border-t border-white/10 space-y-2 animate-in slide-in-from-top duration-200">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => {
                  onNavigate(link.view);
                  setMobileMenuOpen(false);
                }}
                className={`w-full text-left px-4 py-2.5 rounded-lg text-sm font-semibold transition-colors flex items-center justify-between ${
                  currentView === link.view
                    ? 'bg-[#C6922D]/20 text-[#C6922D] font-bold'
                    : 'text-slate-200 hover:bg-white/5'
                }`}
              >
                <span>{link.label}</span>
                {link.hasDropdown && <ChevronDown className="w-4 h-4 text-slate-400" />}
              </button>
            ))}

            <div className="pt-4 border-t border-white/10 space-y-2.5">
              <button
                onClick={() => {
                  onNavigate('start-project');
                  setMobileMenuOpen(false);
                }}
                className="w-full py-3 bg-[#C6922D] text-[#071A2F] font-bold text-sm uppercase tracking-wider rounded-lg shadow text-center"
              >
                Start a Project
              </button>
              <button
                onClick={() => {
                  onNavigate('portal');
                  setMobileMenuOpen(false);
                }}
                className="w-full py-2.5 bg-white/10 text-white font-semibold text-sm rounded-lg text-center"
              >
                Client & Partner Portal
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
