import React, { useState, useEffect, useRef, useCallback } from 'react';
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
  Scale,
  Layers,
  Leaf,
  Cpu,
  DollarSign,
  BookOpen,
  Users,
  ExternalLink,
} from 'lucide-react';

interface HeaderProps {
  currentView: string;
  onNavigate: (view: string) => void;
  onOpenAssistant: () => void;
  currentUserRole: UserRole;
  onChangeUserRole: (role: UserRole) => void;
}

type OpenMenuType = 'capabilities' | 'industries' | 'more' | 'role' | null;

export const Header: React.FC<HeaderProps> = ({
  currentView,
  onNavigate,
  onOpenAssistant,
  currentUserRole,
  onChangeUserRole,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState<OpenMenuType>(null);
  const [mobileSectionOpen, setMobileSectionOpen] = useState<string | null>(null);

  const headerRef = useRef<HTMLElement>(null);
  const capabilitiesMenuRef = useRef<HTMLDivElement>(null);
  const industriesMenuRef = useRef<HTMLDivElement>(null);
  const moreMenuRef = useRef<HTMLDivElement>(null);
  const roleMenuRef = useRef<HTMLDivElement>(null);

  // Scroll detection for header backdrop styling
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menus on outside click or Escape key
  const closeAllMenus = useCallback(() => {
    setOpenMenu(null);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeAllMenus();
        setMobileMenuOpen(false);
      }
    };

    const handleClickOutside = (e: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(e.target as Node)) {
        closeAllMenus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [closeAllMenus]);

  const toggleMenu = (menu: OpenMenuType) => {
    setOpenMenu((prev) => (prev === menu ? null : menu));
  };

  const handleLinkClick = (view: string) => {
    closeAllMenus();
    setMobileMenuOpen(false);
    onNavigate(view);
  };

  const roleLabels: Record<UserRole, string> = {
    ANONYMOUS_VISITOR: 'Client Portal',
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

  interface NavLinkItem {
    label: string;
    view: string;
    isMega?: 'capabilities' | 'industries';
  }

  // Primary desktop navigation items (always visible on desktop 1280px+)
  const primaryLinks: NavLinkItem[] = [
    { label: 'Home', view: 'home' },
    { label: 'About', view: 'about' },
    { label: 'Capabilities', view: 'capabilities', isMega: 'capabilities' },
    { label: 'Industries', view: 'industries', isMega: 'industries' },
    { label: 'Projects', view: 'projects' },
    { label: 'Contact', view: 'contact' },
  ];

  // Secondary items in "More" menu on 1280–1535px screens
  const secondaryLinks = [
    { label: 'Sustainability & ESG', view: 'sustainability', icon: Leaf, desc: 'Renewable energy, decarbonization & green building standards' },
    { label: 'Technology & BIM', view: 'technology', icon: Cpu, desc: 'Digital twins, automated telemetry & 4D construction scheduling' },
    { label: 'Pricing & Tiers', view: 'pricing', icon: DollarSign, desc: 'Transparent fee structures, unit metrics & subscription models' },
    { label: 'Industry Insights', view: 'insights', icon: BookOpen, desc: 'Regulatory explainers, engineering white papers & market intelligence' },
    { label: 'Partners & Ecosystem', view: 'partners', icon: Users, desc: 'PRC-licensed specialists, material suppliers & financial institutions' },
    { label: 'Legal & Credentials', view: 'about#credentials', icon: Scale, desc: 'DTI 4812272, BIR TIN, PSIC 42900 & RA 9266 compliance' },
  ];

  const isCapabilitiesActive = currentView === 'capabilities' || currentView.startsWith('capability-') || currentView.startsWith('capabilities:');
  const isIndustriesActive = currentView === 'industries' || currentView.startsWith('industry-') || currentView.startsWith('industries:');
  const isMoreActive = secondaryLinks.some((l) => currentView === l.view || (l.view.startsWith('about') && currentView === 'about'));

  return (
    <header
      ref={headerRef}
      id="main-navigation-header"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 h-[76px] flex items-center ${
        isScrolled
          ? 'bg-[#071A2F]/95 backdrop-blur-md shadow-2xl border-b border-[#C6922D]/20'
          : 'bg-[#071A2F]/90 backdrop-blur-sm border-b border-white/5'
      }`}
    >
      {/* Maximum 1440px width, centered, at least 24px horizontal padding */}
      <div className="w-full max-w-[1440px] mx-auto px-6">
        <div className="flex items-center justify-between gap-4">
          
          {/* Group 1: Brand Logo Block (Compact, Legible) */}
          <div className="shrink-0 flex items-center">
            <button
              onClick={() => handleLinkClick('home')}
              className="inline-flex items-center text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C6922D] rounded-md transition-opacity hover:opacity-90"
              id="brand-header-logo-btn"
              aria-label="LDL Dhenze Residential Building Construction - Return to Home"
            >
              <BrandLogo variant="dark" size="sm" showTagline={false} />
            </button>
          </div>

          {/* Group 2: Desktop Navigation (CSS Flex, min-width 0, responsive breakpoints) */}
          <nav
            id="desktop-primary-nav"
            className="hidden xl:flex items-center justify-center gap-1 2xl:gap-2 flex-1 min-w-0 px-2"
            aria-label="Main Navigation"
          >
            {/* Primary Navigation Items */}
            {primaryLinks.map((link) => {
              if (link.isMega === 'capabilities') {
                return (
                  <div key={link.label} className="relative">
                    <button
                      id="nav-capabilities-toggle"
                      aria-haspopup="true"
                      aria-expanded={openMenu === 'capabilities'}
                      aria-controls="capabilities-mega-menu"
                      onClick={() => toggleMenu('capabilities')}
                      className={`px-3 py-2 text-xs font-semibold uppercase tracking-wider transition-all inline-flex items-center gap-1 rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C6922D] ${
                        isCapabilitiesActive
                          ? 'text-[#C6922D] bg-white/5 font-bold'
                          : 'text-slate-200 hover:text-[#C6922D] hover:bg-white/5'
                      }`}
                    >
                      <span>{link.label}</span>
                      <ChevronDown
                        className={`w-3.5 h-3.5 transition-transform duration-200 ${
                          openMenu === 'capabilities' ? 'rotate-180 text-[#C6922D]' : 'text-slate-400'
                        }`}
                      />
                    </button>

                    {/* Capabilities Mega-Menu: Opens below header, max 760px, viewport contained, internally scrollable */}
                    {openMenu === 'capabilities' && (
                      <div
                        ref={capabilitiesMenuRef}
                        id="capabilities-mega-menu"
                        role="menu"
                        aria-label="Capabilities Menu"
                        className="absolute top-full left-0 mt-3 w-[720px] max-w-[calc(100vw-32px)] max-h-[calc(100vh-100px)] overflow-y-auto bg-[#071A2F]/98 border border-[#C6922D]/35 rounded-2xl shadow-2xl p-5 backdrop-blur-xl z-50 animate-in fade-in slide-in-from-top-2 duration-150"
                      >
                        <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/10">
                          <div className="flex items-center gap-2">
                            <Layers className="w-4 h-4 text-[#C6922D]" />
                            <span className="text-xs font-bold uppercase tracking-wider text-slate-200">
                              Integrated Scope of Capabilities
                            </span>
                          </div>
                          <span className="text-[11px] font-mono text-[#C6922D] bg-[#C6922D]/10 px-2 py-0.5 rounded">
                            14 Official Lines
                          </span>
                        </div>

                        {/* 2-Column Grid on Large Screen */}
                        <div className="grid grid-cols-2 gap-2">
                          {CAPABILITY_LIST.map((cap) => (
                            <button
                              key={cap.id}
                              role="menuitem"
                              onClick={() => handleLinkClick(`capability-${cap.id}`)}
                              className="w-full text-left p-2.5 rounded-xl hover:bg-white/5 border border-transparent hover:border-[#C6922D]/20 transition-all group flex items-start gap-2.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C6922D]"
                            >
                              <span className="text-[10px] font-mono font-bold text-[#C6922D] bg-[#C6922D]/15 px-1.5 py-0.5 rounded mt-0.5 shrink-0">
                                #{String(cap.order).padStart(2, '0')}
                              </span>
                              <div className="min-w-0">
                                <h4 className="text-xs font-bold text-slate-100 group-hover:text-[#C6922D] transition-colors truncate">
                                  {cap.title}
                                </h4>
                                <p className="text-[11px] text-slate-400 line-clamp-1 mt-0.5">
                                  {cap.summary}
                                </p>
                              </div>
                            </button>
                          ))}
                        </div>

                        {/* Mega-menu footer */}
                        <div className="pt-3 mt-3 border-t border-white/10 flex items-center justify-between text-xs">
                          <span className="text-[11px] text-slate-400">
                            Coordinated with PRC-Licensed Architects & Engineers
                          </span>
                          <button
                            role="menuitem"
                            onClick={() => handleLinkClick('capabilities')}
                            className="text-[#C6922D] font-bold inline-flex items-center gap-1 hover:underline text-xs"
                          >
                            Explore All 14 Capabilities <ArrowRight className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                );
              }

              if (link.isMega === 'industries') {
                return (
                  <div key={link.label} className="relative">
                    <button
                      id="nav-industries-toggle"
                      aria-haspopup="true"
                      aria-expanded={openMenu === 'industries'}
                      aria-controls="industries-mega-menu"
                      onClick={() => toggleMenu('industries')}
                      className={`px-3 py-2 text-xs font-semibold uppercase tracking-wider transition-all inline-flex items-center gap-1 rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C6922D] ${
                        isIndustriesActive
                          ? 'text-[#C6922D] bg-white/5 font-bold'
                          : 'text-slate-200 hover:text-[#C6922D] hover:bg-white/5'
                      }`}
                    >
                      <span>{link.label}</span>
                      <ChevronDown
                        className={`w-3.5 h-3.5 transition-transform duration-200 ${
                          openMenu === 'industries' ? 'rotate-180 text-[#C6922D]' : 'text-slate-400'
                        }`}
                      />
                    </button>

                    {/* Industries Mega-Menu: Opens below header, max 680px */}
                    {openMenu === 'industries' && (
                      <div
                        ref={industriesMenuRef}
                        id="industries-mega-menu"
                        role="menu"
                        aria-label="Industries Menu"
                        className="absolute top-full left-0 mt-3 w-[660px] max-w-[calc(100vw-32px)] max-h-[calc(100vh-100px)] overflow-y-auto bg-[#071A2F]/98 border border-[#C6922D]/35 rounded-2xl shadow-2xl p-5 backdrop-blur-xl z-50 animate-in fade-in slide-in-from-top-2 duration-150"
                      >
                        <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/10">
                          <div className="flex items-center gap-2">
                            <Building2 className="w-4 h-4 text-[#C6922D]" />
                            <span className="text-xs font-bold uppercase tracking-wider text-slate-200">
                              Target Market Sectors & Asset Classes
                            </span>
                          </div>
                          <span className="text-[11px] font-mono text-[#C6922D] bg-[#C6922D]/10 px-2 py-0.5 rounded">
                            Central Luzon & NCR
                          </span>
                        </div>

                        {/* 2-Column Grid of Industries */}
                        <div className="grid grid-cols-2 gap-2">
                          {INDUSTRY_LIST.map((ind) => (
                            <button
                              key={ind.id}
                              role="menuitem"
                              onClick={() => handleLinkClick(`industry-${ind.id}`)}
                              className="w-full text-left p-2.5 rounded-xl hover:bg-white/5 border border-transparent hover:border-[#C6922D]/20 transition-all group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C6922D]"
                            >
                              <h4 className="text-xs font-bold text-slate-100 group-hover:text-[#C6922D] transition-colors truncate">
                                {ind.title}
                              </h4>
                              <p className="text-[11px] text-slate-400 line-clamp-1 mt-0.5">
                                {ind.summary}
                              </p>
                            </button>
                          ))}
                        </div>

                        <div className="pt-3 mt-3 border-t border-white/10 flex items-center justify-between text-xs">
                          <span className="text-[11px] text-slate-400">
                            Custom Turnkey Delivery & Technical Consulting
                          </span>
                          <button
                            role="menuitem"
                            onClick={() => handleLinkClick('industries')}
                            className="text-[#C6922D] font-bold inline-flex items-center gap-1 hover:underline text-xs"
                          >
                            Explore All Industries <ArrowRight className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                );
              }

              return (
                <button
                  key={link.label}
                  onClick={() => handleLinkClick(link.view)}
                  className={`px-3 py-2 text-xs font-semibold uppercase tracking-wider transition-all rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C6922D] whitespace-nowrap ${
                    currentView === link.view
                      ? 'text-[#C6922D] bg-white/5 font-bold'
                      : 'text-slate-200 hover:text-[#C6922D] hover:bg-white/5'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}

            {/* "More" Dropdown: Holds Secondary Items at 1280–1535px (and preserves clean layout on 2xl) */}
            <div className="relative">
              <button
                id="nav-more-toggle"
                aria-haspopup="true"
                aria-expanded={openMenu === 'more'}
                aria-controls="secondary-more-menu"
                onClick={() => toggleMenu('more')}
                className={`px-3 py-2 text-xs font-semibold uppercase tracking-wider transition-all inline-flex items-center gap-1 rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C6922D] ${
                  isMoreActive
                    ? 'text-[#C6922D] bg-white/5 font-bold'
                    : 'text-slate-300 hover:text-[#C6922D] hover:bg-white/5'
                }`}
              >
                <span>More</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${
                    openMenu === 'more' ? 'rotate-180 text-[#C6922D]' : 'text-slate-400'
                  }`}
                />
              </button>

              {openMenu === 'more' && (
                <div
                  ref={moreMenuRef}
                  id="secondary-more-menu"
                  role="menu"
                  aria-label="Additional Navigation Menu"
                  className="absolute top-full right-0 mt-3 w-80 bg-[#071A2F]/98 border border-[#C6922D]/35 rounded-2xl shadow-2xl p-3 backdrop-blur-xl z-50 animate-in fade-in slide-in-from-top-2 duration-150"
                >
                  <div className="space-y-1">
                    {secondaryLinks.map((item) => {
                      const Icon = item.icon;
                      const isActive = currentView === item.view;
                      return (
                        <button
                          key={item.label}
                          role="menuitem"
                          onClick={() => handleLinkClick(item.view)}
                          className={`w-full text-left p-2.5 rounded-xl transition-all flex items-start gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C6922D] ${
                            isActive
                              ? 'bg-[#C6922D]/20 text-white'
                              : 'hover:bg-white/5 text-slate-200'
                          }`}
                        >
                          <Icon className="w-4 h-4 text-[#C6922D] shrink-0 mt-0.5" />
                          <div>
                            <div className="text-xs font-bold group-hover:text-[#C6922D] transition-colors">
                              {item.label}
                            </div>
                            <div className="text-[10px] text-slate-400 leading-tight mt-0.5">
                              {item.desc}
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </nav>

          {/* Group 3: Actions Cluster (Single prominent gold CTA, compact Builder Assistant & Client Login) */}
          <div className="shrink-0 flex items-center gap-2 sm:gap-2.5">
            {/* Builder Assistant Trigger: Compact secondary action */}
            <button
              id="header-assistant-btn"
              onClick={onOpenAssistant}
              className="relative inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-[#C6922D]/15 text-[#e5b95d] border border-[#C6922D]/40 hover:bg-[#C6922D]/25 transition-all shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C6922D]"
              aria-label="Open LDL Dhenze Builder AI Assistant"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#C6922D] animate-pulse" />
              <span className="hidden sm:inline">Assistant</span>
            </button>

            {/* Client Login / Role Switcher: Compact secondary action */}
            <div className="relative">
              <button
                id="header-portal-btn"
                aria-haspopup="true"
                aria-expanded={openMenu === 'role'}
                aria-controls="role-portal-menu"
                onClick={() => {
                  if (currentUserRole === 'ANONYMOUS_VISITOR') {
                    handleLinkClick('portal');
                  } else {
                    toggleMenu('role');
                  }
                }}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold bg-white/5 hover:bg-white/10 text-slate-200 border border-white/10 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C6922D]"
                aria-label="Client & Partner Portal Login"
              >
                <User className="w-3.5 h-3.5 text-[#C6922D]" />
                <span className="hidden md:inline">{roleLabels[currentUserRole]}</span>
                <ChevronDown className="w-3 h-3 text-slate-400" />
              </button>

              {/* Portal Simulation Switcher */}
              {openMenu === 'role' && (
                <div
                  ref={roleMenuRef}
                  id="role-portal-menu"
                  role="menu"
                  className="absolute right-0 top-full mt-2 w-64 bg-[#0a233f] border border-[#C6922D]/30 shadow-2xl rounded-xl p-2 z-50 text-xs animate-in fade-in duration-100"
                >
                  <div className="px-3 py-2 border-b border-white/10 font-bold text-slate-300">
                    Active Security Persona:
                    <div className="text-[11px] text-[#C6922D] font-mono mt-0.5">
                      {currentUserRole}
                    </div>
                  </div>
                  <div className="max-h-56 overflow-y-auto py-1 space-y-0.5">
                    {(Object.keys(roleLabels) as UserRole[]).map((r) => (
                      <button
                        key={r}
                        role="menuitem"
                        onClick={() => {
                          onChangeUserRole(r);
                          closeAllMenus();
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
                      role="menuitem"
                      onClick={() => handleLinkClick('portal')}
                      className="w-full text-center py-1.5 bg-[#C6922D] text-[#071A2F] font-bold rounded hover:bg-[#d8a339] transition-colors"
                    >
                      Open Portal Room
                    </button>
                    <button
                      role="menuitem"
                      onClick={() => handleLinkClick('qa-testing')}
                      className="w-full text-center py-1 text-[11px] text-slate-300 hover:text-[#C6922D] transition-colors"
                    >
                      Automated QA Console
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Prominent Gold Primary CTA: Start a Project (Single main CTA) */}
            <button
              id="header-start-project-btn"
              onClick={() => handleLinkClick('start-project')}
              className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-md text-xs font-bold bg-[#C6922D] hover:bg-[#d8a339] text-[#071A2F] uppercase tracking-wider transition-all shadow-md hover:shadow-lg transform active:scale-95 whitespace-nowrap focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C6922D]"
            >
              Start a Project
            </button>

            {/* Mobile / Tablet Hamburger Toggle Button with mandatory Accessible Name */}
            <button
              id="mobile-menu-toggle"
              aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-navigation-drawer"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2 text-slate-300 hover:text-white rounded-md hover:bg-white/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C6922D]"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>

        {/* Mobile / Tablet Drawer (Accessible, Viewport-Contained) */}
        {mobileMenuOpen && (
          <div
            id="mobile-navigation-drawer"
            className="xl:hidden mt-3 pt-4 pb-6 border-t border-white/10 space-y-2 max-h-[calc(100vh-90px)] overflow-y-auto bg-[#071A2F] animate-in slide-in-from-top duration-200"
          >
            {/* Primary Links */}
            <button
              onClick={() => handleLinkClick('home')}
              className={`w-full text-left px-4 py-2.5 rounded-lg text-sm font-semibold transition-colors ${
                currentView === 'home' ? 'bg-[#C6922D]/20 text-[#C6922D] font-bold' : 'text-slate-200 hover:bg-white/5'
              }`}
            >
              Home
            </button>
            <button
              onClick={() => handleLinkClick('about')}
              className={`w-full text-left px-4 py-2.5 rounded-lg text-sm font-semibold transition-colors ${
                currentView === 'about' ? 'bg-[#C6922D]/20 text-[#C6922D] font-bold' : 'text-slate-200 hover:bg-white/5'
              }`}
            >
              About
            </button>

            {/* Accordion: Capabilities */}
            <div className="border border-white/5 rounded-lg overflow-hidden">
              <button
                onClick={() => setMobileSectionOpen(mobileSectionOpen === 'capabilities' ? null : 'capabilities')}
                className="w-full text-left px-4 py-2.5 flex items-center justify-between text-sm font-semibold text-slate-200 hover:bg-white/5"
              >
                <span>Capabilities (14 Lines)</span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform ${
                    mobileSectionOpen === 'capabilities' ? 'rotate-180 text-[#C6922D]' : 'text-slate-400'
                  }`}
                />
              </button>
              {mobileSectionOpen === 'capabilities' && (
                <div className="p-2 space-y-1 bg-[#051424]">
                  {CAPABILITY_LIST.map((cap) => (
                    <button
                      key={cap.id}
                      onClick={() => handleLinkClick(`capability-${cap.id}`)}
                      className="w-full text-left px-3 py-2 rounded text-xs text-slate-300 hover:text-[#C6922D] hover:bg-white/5 flex items-center justify-between"
                    >
                      <span className="truncate">{cap.title}</span>
                      <span className="text-[10px] text-[#C6922D] font-mono">#{String(cap.order).padStart(2, '0')}</span>
                    </button>
                  ))}
                  <button
                    onClick={() => handleLinkClick('capabilities')}
                    className="w-full text-center py-2 text-xs font-bold text-[#C6922D] border-t border-white/10 mt-2 block"
                  >
                    Explore All Capabilities →
                  </button>
                </div>
              )}
            </div>

            {/* Accordion: Industries */}
            <div className="border border-white/5 rounded-lg overflow-hidden">
              <button
                onClick={() => setMobileSectionOpen(mobileSectionOpen === 'industries' ? null : 'industries')}
                className="w-full text-left px-4 py-2.5 flex items-center justify-between text-sm font-semibold text-slate-200 hover:bg-white/5"
              >
                <span>Industries Served</span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform ${
                    mobileSectionOpen === 'industries' ? 'rotate-180 text-[#C6922D]' : 'text-slate-400'
                  }`}
                />
              </button>
              {mobileSectionOpen === 'industries' && (
                <div className="p-2 space-y-1 bg-[#051424]">
                  {INDUSTRY_LIST.map((ind) => (
                    <button
                      key={ind.id}
                      onClick={() => handleLinkClick(`industry-${ind.id}`)}
                      className="w-full text-left px-3 py-2 rounded text-xs text-slate-300 hover:text-[#C6922D] hover:bg-white/5 block"
                    >
                      {ind.title}
                    </button>
                  ))}
                  <button
                    onClick={() => handleLinkClick('industries')}
                    className="w-full text-center py-2 text-xs font-bold text-[#C6922D] border-t border-white/10 mt-2 block"
                  >
                    Explore All Industries →
                  </button>
                </div>
              )}
            </div>

            <button
              onClick={() => handleLinkClick('projects')}
              className={`w-full text-left px-4 py-2.5 rounded-lg text-sm font-semibold transition-colors ${
                currentView === 'projects' ? 'bg-[#C6922D]/20 text-[#C6922D] font-bold' : 'text-slate-200 hover:bg-white/5'
              }`}
            >
              Projects
            </button>
            <button
              onClick={() => handleLinkClick('contact')}
              className={`w-full text-left px-4 py-2.5 rounded-lg text-sm font-semibold transition-colors ${
                currentView === 'contact' ? 'bg-[#C6922D]/20 text-[#C6922D] font-bold' : 'text-slate-200 hover:bg-white/5'
              }`}
            >
              Contact
            </button>

            {/* Secondary Links in Mobile */}
            <div className="pt-2 border-t border-white/10">
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#C6922D] px-4 py-1">
                More Information
              </div>
              <div className="grid grid-cols-2 gap-1 px-2 pt-1">
                <button
                  onClick={() => handleLinkClick('sustainability')}
                  className="text-left px-3 py-2 rounded text-xs text-slate-300 hover:bg-white/5"
                >
                  Sustainability
                </button>
                <button
                  onClick={() => handleLinkClick('technology')}
                  className="text-left px-3 py-2 rounded text-xs text-slate-300 hover:bg-white/5"
                >
                  Technology & BIM
                </button>
                <button
                  onClick={() => handleLinkClick('pricing')}
                  className="text-left px-3 py-2 rounded text-xs text-slate-300 hover:bg-white/5"
                >
                  Pricing
                </button>
                <button
                  onClick={() => handleLinkClick('insights')}
                  className="text-left px-3 py-2 rounded text-xs text-slate-300 hover:bg-white/5"
                >
                  Insights
                </button>
                <button
                  onClick={() => handleLinkClick('partners')}
                  className="text-left px-3 py-2 rounded text-xs text-slate-300 hover:bg-white/5"
                >
                  Partners
                </button>
                <button
                  onClick={() => handleLinkClick('book-consultation')}
                  className="text-left px-3 py-2 rounded text-xs text-slate-300 hover:bg-white/5"
                >
                  Book Consultation
                </button>
              </div>
            </div>

            {/* Mobile Actions */}
            <div className="pt-4 border-t border-white/10 space-y-2.5">
              <button
                onClick={() => handleLinkClick('start-project')}
                className="w-full py-3 bg-[#C6922D] text-[#071A2F] font-bold text-sm uppercase tracking-wider rounded-lg shadow text-center"
              >
                Start a Project
              </button>
              <button
                onClick={() => handleLinkClick('portal')}
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
