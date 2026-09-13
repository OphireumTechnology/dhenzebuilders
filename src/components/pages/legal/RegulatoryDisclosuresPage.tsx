import React from 'react';
import { Award, ShieldCheck, Landmark, CheckCircle, ArrowLeft } from 'lucide-react';

interface LegalPageProps {
  onNavigate: (view: string) => void;
}

export const RegulatoryDisclosuresPage: React.FC<LegalPageProps> = ({ onNavigate }) => {
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
            <Landmark className="w-3.5 h-3.5" /> Corporate Legal Disclosure
          </div>
          <h1 className="text-3xl sm:text-4xl font-serif text-white mb-3">
            Regulatory, Licensing & Contractor Disclosures
          </h1>
          <p className="text-sm text-slate-400">
            Official statutory registration details for LDL Dhenze Residential Building Construction.
          </p>
        </div>

        <div className="space-y-8 text-sm text-slate-300 leading-relaxed">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-5">
              <span className="text-xs uppercase tracking-wider text-slate-400">DTI Registration</span>
              <p className="text-lg font-serif text-white mt-1">Certificate No. 05492184</p>
              <p className="text-xs text-slate-400 mt-2">Department of Trade and Industry, Region III, Republic of the Philippines. Valid through 2028.</p>
            </div>
            <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-5">
              <span className="text-xs uppercase tracking-wider text-slate-400">Tax Identification</span>
              <p className="text-lg font-serif text-white mt-1">TIN 284-918-372-000</p>
              <p className="text-xs text-slate-400 mt-2">Bureau of Internal Revenue (BIR) Revenue District Office (RDO) 021B - South Pampanga.</p>
            </div>
            <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-5">
              <span className="text-xs uppercase tracking-wider text-slate-400">Primary Classification</span>
              <p className="text-lg font-serif text-white mt-1">PSIC 41001</p>
              <p className="text-xs text-slate-400 mt-2">Residential Building Construction & General Engineering Contractor.</p>
            </div>
            <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-5">
              <span className="text-xs uppercase tracking-wider text-slate-400">Governing Standards</span>
              <p className="text-lg font-serif text-white mt-1">PD 1096 & NSCP 2015</p>
              <p className="text-xs text-slate-400 mt-2">National Building Code of the Philippines and National Structural Code of the Philippines.</p>
            </div>
          </div>

          <section className="space-y-4">
            <h2 className="text-lg font-serif text-white">Philippine Contractors Accreditation Board (PCAB) Guidelines</h2>
            <p>
              All vertical structures, horizontal roadworks, civil earthworks, and specialized MEPFS installations are executed in compliance with Republic Act No. 4566 (Contractors License Law). Where specialized specialty trade operations require particular license classifications (e.g. AAAA / AAA), work is executed through our verified, accredited consortium partners under direct LDL Dhenze project management oversight.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-lg font-serif text-white">Environmental Compliance & Safety Mandates</h2>
            <p>
              Every construction site under LDL Dhenze direction maintains a dedicated Safety Officer accredited by the Department of Labor and Employment (DOLE) Bureau of Working Conditions (DOLE DO-198), adhering to occupational safety and health standards. Environmental clearance is maintained in accordance with the Department of Environment and Natural Resources (DENR) Environmental Management Bureau (EMB).
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};
