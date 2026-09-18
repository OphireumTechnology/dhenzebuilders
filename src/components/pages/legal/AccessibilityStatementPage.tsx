import React from 'react';
import { Eye, CheckCircle2, ArrowLeft } from 'lucide-react';

interface LegalPageProps {
  onNavigate: (view: string) => void;
}

export const AccessibilityStatementPage: React.FC<LegalPageProps> = ({ onNavigate }) => {
  return (
    <div className="min-h-screen bg-[#0c121e] text-slate-200 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <button
          onClick={() => onNavigate('/')}
          className="inline-flex items-center text-xs tracking-wider uppercase text-amber-400/90 hover:text-amber-300 mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to Overview
        </button>

        <div className="border-b border-slate-800 pb-8 mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-medium mb-4">
            <Eye className="w-3.5 h-3.5" /> Inclusive Engineering
          </div>
          <h1 className="text-3xl sm:text-4xl font-serif text-white mb-3">
            Accessibility Statement & WCAG 2.2 AA Compliance
          </h1>
          <p className="text-sm text-slate-400">
            Our commitment to accessible digital engineering across public portals and private enterprise workspaces.
          </p>
        </div>

        <div className="space-y-8 text-sm text-slate-300 leading-relaxed">
          <section className="bg-slate-900/60 border border-slate-800 rounded-xl p-6">
            <h2 className="text-lg font-serif text-white mb-3">Standards & Conformance</h2>
            <p>
              LDL Dhenze Residential Building Construction is committed to ensuring digital accessibility for all users, including individuals with disabilities, vision impairments, and cognitive differences. We strive to conform to the Web Content Accessibility Guidelines (WCAG) 2.2 Level AA standard and comply with Republic Act No. 7277 (Magna Carta for Disabled Persons).
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-lg font-serif text-white">Implemented Measures</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-slate-900/40 border border-slate-800/80 rounded-lg">
                <h3 className="font-medium text-white mb-1">Color Contrast Ratios</h3>
                <p className="text-xs text-slate-400">All text elements maintain a minimum 4.5:1 contrast ratio against light or dark backgrounds. Data visualizations and badge borders maintain 3:1 contrast against adjacent colors.</p>
              </div>
              <div className="p-4 bg-slate-900/40 border border-slate-800/80 rounded-lg">
                <h3 className="font-medium text-white mb-1">Full Keyboard Navigation</h3>
                <p className="text-xs text-slate-400">Every portal interaction, modal trigger, tab switch, and form submission is accessible via Tab, Shift+Tab, Enter, Space, and Escape keys with visible focus rings.</p>
              </div>
              <div className="p-4 bg-slate-900/40 border border-slate-800/80 rounded-lg">
                <h3 className="font-medium text-white mb-1">Screen Reader Landmarks</h3>
                <p className="text-xs text-slate-400">All pages use semantic HTML5 elements (&lt;main&gt;, &lt;nav&gt;, &lt;header&gt;, &lt;section&gt;, &lt;article&gt;) and ARIA attributes for live regions and modal dialogs.</p>
              </div>
              <div className="p-4 bg-slate-900/40 border border-slate-800/80 rounded-lg">
                <h3 className="font-medium text-white mb-1">Reduced Motion Preference</h3>
                <p className="text-xs text-slate-400">The platform respects the user’s operating system prefers-reduced-motion settings, disabling smooth transitions and auto-advancing banners.</p>
              </div>
            </div>
          </section>

          <section className="bg-slate-900/60 border border-slate-800 rounded-xl p-6">
            <h2 className="text-lg font-serif text-white mb-2">Accessibility Feedback & Assistance</h2>
            <p className="text-slate-400">
              If you experience any accessibility barrier while accessing our drawings, reports, or submission workflows:
            </p>
            <p className="mt-2 text-white font-medium">Email: <span className="text-amber-400">info@dhenzebuilder.com</span> • <span className="text-amber-400">dhenzebuilders@gmail.com</span></p>
            <p className="mt-1 text-slate-300 text-xs">Direct Line: +63 917 966 8814 • Executive Office: KMC | One West Aeropark, Clark Pampanga, Mabalacat City, 2010 Pampanga, Philippines</p>
          </section>
        </div>
      </div>
    </div>
  );
};
