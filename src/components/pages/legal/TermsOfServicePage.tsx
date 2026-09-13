import React from 'react';
import { FileText, CheckCircle2, ShieldAlert, ArrowLeft } from 'lucide-react';

interface LegalPageProps {
  onNavigate: (view: string) => void;
}

export const TermsOfServicePage: React.FC<LegalPageProps> = ({ onNavigate }) => {
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
            <FileText className="w-3.5 h-3.5" /> Commercial & Operational Agreement
          </div>
          <h1 className="text-3xl sm:text-4xl font-serif text-white mb-3">
            Platform Terms of Service & Commercial Conditions
          </h1>
          <p className="text-sm text-slate-400">
            Applicable to all client organizations, institutional partners, accredited suppliers, and authorized portal participants.
          </p>
        </div>

        <div className="space-y-8 text-sm text-slate-300 leading-relaxed">
          <section className="bg-slate-900/60 border border-slate-800 rounded-xl p-6">
            <h2 className="text-lg font-serif text-white mb-3 flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-amber-400" /> 1. Acceptance and Authorized Access
            </h2>
            <p>
              By accessing the LDL Dhenze Private Development Workspace or any associated client, supplier, or partner portal, you agree to these Terms. Access to the authenticated workspace is strictly by invitation or verified referral code and subject to identity verification, professional licensing validation, and tenant association.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-lg font-serif text-white">2. Common Data Environment (CDE) Integrity</h2>
            <p>
              All architectural drawings, engineering schedules, structural calculations, Bills of Quantities (BOQ), and submittals stored in the platform constitute intellectual and commercial records. Users must not alter, backdate, or tamper with digital revision registers. All downloads are watermarked with the accessor's identity, IP address, and date-time stamp.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-lg font-serif text-white">3. Professional Practice and Engineering Seals</h2>
            <p>
              AI-generated suggestions, preliminary drafts, and spatial summaries provided by the Dhenze Assistant system are conceptual aids. In compliance with PRC Architecture Act (RA 9266) and Civil Engineering Law (RA 544), no construction execution may commence without the stamped, sealed, and signed approvals of licensed professionals of record.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-lg font-serif text-white">4. Procurement, Quotations & Sealed Bidding</h2>
            <p>
              Suppliers and contractors submitting bids through the portal confirm that all figures, unit prices, product certifications, and material specifications are legally binding for the stated validity period. Collusive bidding, unauthorized subcontracting, and duplicate submittals are strictly prohibited and result in immediate accreditation revocation.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-lg font-serif text-white">5. Freeze Controls & Legal Holds</h2>
            <p>
              LDL Dhenze reserves the right to initiate system, project, or document-level freezes in response to regulatory audits, contractual disputes, or safety nonconformance investigations. During a freeze, affected records enter read-only status and may not be mutated until dual-authorized release.
            </p>
          </section>

          <section className="bg-slate-900/60 border border-slate-800 rounded-xl p-6">
            <h2 className="text-lg font-serif text-white mb-2">6. Governing Law & Dispute Resolution</h2>
            <p className="text-slate-400">
              These terms are governed by the laws of the Republic of the Philippines. Construction and commercial disputes shall be referred to the Construction Industry Arbitration Commission (CIAC) or the competent courts of Angeles City / San Fernando, Pampanga.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};
