import React from 'react';
import { ShieldCheck, Lock, FileText, CheckCircle2, ArrowLeft } from 'lucide-react';

interface LegalPageProps {
  onNavigate: (view: string) => void;
}

export const PrivacyPolicyPage: React.FC<LegalPageProps> = ({ onNavigate }) => {
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
            <ShieldCheck className="w-3.5 h-3.5" /> Statutory Data Privacy Compliance
          </div>
          <h1 className="text-3xl sm:text-4xl font-serif text-white mb-3">
            Privacy Policy & Data Protection Notice
          </h1>
          <p className="text-sm text-slate-400">
            Governed by Republic Act No. 10173 (Philippine Data Privacy Act of 2012) and National Privacy Commission (NPC) Circulars.
          </p>
        </div>

        <div className="space-y-8 text-sm text-slate-300 leading-relaxed">
          <section className="bg-slate-900/60 border border-slate-800 rounded-xl p-6">
            <h2 className="text-lg font-serif text-white mb-3 flex items-center gap-2">
              <Lock className="w-4 h-4 text-amber-400" /> 1. Confidentiality Commitment
            </h2>
            <p>
              LDL Dhenze Residential Building Construction ("LDL Dhenze", "we", "our") maintains absolute confidentiality over all client property plans, geodetic surveys, structural calculations, commercial tenders, and private development blueprints. We enforce multi-tenant data isolation, role-based access control, cryptographic file integrity checking, and granular permission boundaries across all digital portals.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-lg font-serif text-white">2. Information We Collect</h2>
            <p>We process information strictly required for development feasibility, engineering coordination, contract execution, statutory permitting, and procurement operations:</p>
            <ul className="list-disc pl-6 space-y-2 text-slate-300">
              <li><strong>Client Identification:</strong> Legal entity names, SEC/DTI registration records, Tax Identification Numbers (TIN), beneficial ownership declarations, and authorized signatory credentials.</li>
              <li><strong>Project & Land Records:</strong> Transfer Certificates of Title (TCT), lot surveys, topographic maps, geohazard assessments, and site boundary specifications.</li>
              <li><strong>Supplier & Partner Credentials:</strong> PCAB licenses, PRC professional registrations, BIR Form 2303, DTI-BPS product quality certifications, and equipment inventories.</li>
              <li><strong>Operational & Audit Telemetry:</strong> Authenticated session records, IP verification logs, document watermarking timestamps, and immutable audit events.</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-lg font-serif text-white">3. Processing Purpose and Legal Basis</h2>
            <p>
              All personal and commercial data is processed in accordance with Section 12 (Criteria for Lawful Processing) of RA 10173, to perform construction contracts, verify contractor technical qualifications, fulfill DPWH building code mandates, and maintain Common Data Environment (CDE) integrity.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-lg font-serif text-white">4. Multi-Tenant Isolation & Zero Cross-Sharing</h2>
            <p>
              We enforce strict multi-tenant isolation. No client organization, property owner, supplier, or bidding contractor can access another entity’s drawings, commercial bids, financial applications, or private conversations. Sealed bids remain encrypted and inaccessible until the formal bid opening event.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-lg font-serif text-white">5. AI Governance & Data Safeguards</h2>
            <p>
              When utilizing the LDL Dhenze Builder Assistant system, your proprietary blueprints and commercially sensitive project figures are never used to train public foundation models. Prompts and contextual CDE records are strictly filtered by tenant organization boundaries before processing.
            </p>
          </section>

          <section className="bg-slate-900/60 border border-slate-800 rounded-xl p-6">
            <h2 className="text-lg font-serif text-white mb-2">6. Data Protection Officer (DPO) Contact</h2>
            <p className="text-slate-400">
              For privacy inquiries, rights of data subjects, or official certification requests:
            </p>
            <div className="mt-3 text-slate-300 space-y-1">
              <p><strong>Office of the Data Protection Officer</strong></p>
              <p>LDL Dhenze Residential Building Construction</p>
              <p>One West Aeropark, Clark Global City, Clark Freeport Zone, Pampanga 2023</p>
              <p>Email: <span className="text-amber-400">privacy@dhenzebuilder.com</span></p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};
