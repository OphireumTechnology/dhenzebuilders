import React, { useState } from 'react';
import {
  ShieldCheck,
  CheckCircle2,
  FileText,
  Building,
  Upload,
  ArrowRight,
  AlertCircle,
} from 'lucide-react';

interface PartnersPageProps {
  onNavigate: (view: string) => void;
}

export const PartnersPage: React.FC<PartnersPageProps> = ({ onNavigate }) => {
  const [partnerForm, setPartnerForm] = useState({
    companyName: '',
    category: 'Materials Supplier (Aggregates / Steel / Cement)',
    dtiOrSec: '',
    birTin: '',
    pcabLicense: '',
    contactPerson: '',
    email: '',
    phone: '',
    city: '',
    complianceAgreed: false,
  });

  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<any | null>(null);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!partnerForm.companyName || !partnerForm.email || !partnerForm.phone) {
      setError('Please provide your company name, official email, and phone.');
      return;
    }
    if (!partnerForm.complianceAgreed) {
      setError('You must confirm adherence to Philippine regulatory standards.');
      return;
    }

    setSubmitting(true);
    setError('');

    try {
      const response = await fetch('/api/partners/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(partnerForm),
      });

      const data = await response.json();
      setResult(data);
    } catch (err) {
      setError('Failed to submit partner application.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#071A2F] text-slate-100 pt-32 pb-24 px-4 blueprint-grid">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#C6922D] mb-3 font-['Montserrat']">
            <Building className="w-4 h-4" />
            <span>Procurement & Supply Chain Ecosystem</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-white font-['Montserrat'] tracking-tight">
            Partner & Supplier Accreditation Gateway
          </h1>
          <p className="text-sm sm:text-base text-slate-300 mt-4 leading-relaxed">
            LDL Dhenze partners with accredited material manufacturers, heavy equipment fleets, licensed engineering consultants, and PCAB-licensed contractors across the Philippines.
          </p>
        </div>

        {/* Accreditation Criteria Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <div className="bg-[#09223d] border border-white/10 rounded-2xl p-6">
            <div className="text-xs font-bold text-[#C6922D] uppercase tracking-wider mb-2">
              01. Statutory Credentials
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Valid DTI or SEC Registration, BIR Form 2303, active Tax Clearance, and Philippine Standard Industrial Classification alignment.
            </p>
          </div>

          <div className="bg-[#09223d] border border-white/10 rounded-2xl p-6">
            <div className="text-xs font-bold text-[#C6922D] uppercase tracking-wider mb-2">
              02. Technical & Safety Compliance
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              PCAB License (for construction trades), PRC professional registrations (for design consultants), and DOLE DO 13 safety compliance track record.
            </p>
          </div>

          <div className="bg-[#09223d] border border-white/10 rounded-2xl p-6">
            <div className="text-xs font-bold text-[#C6922D] uppercase tracking-wider mb-2">
              03. Quality Standards
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Materials must strictly comply with Philippine National Standards (PNS) and DPWH Blue Book civil specifications.
            </p>
          </div>
        </div>

        {/* Accreditation Registration Form */}
        <div className="bg-[#09223d] border border-[#C6922D]/30 rounded-3xl p-6 sm:p-10 shadow-2xl max-w-3xl mx-auto">
          {result ? (
            <div className="text-center space-y-4 py-8">
              <div className="w-16 h-16 rounded-full bg-[#237A3B]/20 border-2 border-[#237A3B] flex items-center justify-center text-[#237A3B] mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-white">
                Partner Registration Lodged
              </h3>
              <p className="text-xs text-slate-300 max-w-md mx-auto">
                Application reference <strong className="text-[#C6922D] font-mono">{result.partnerId}</strong> has been logged in our procurement database. An audit reviewer will verify your documents within 3 business days.
              </p>
              <button
                onClick={() => setResult(null)}
                className="px-5 py-2 rounded-lg bg-[#C6922D] text-[#071A2F] font-bold text-xs uppercase"
              >
                Submit Another Accreditation
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="border-b border-white/10 pb-4">
                <h3 className="text-lg font-bold text-white">
                  Supplier / Subcontractor Accreditation Application
                </h3>
                <p className="text-xs text-slate-400">
                  Register your organization for procurement tenders and project delivery collaborations.
                </p>
              </div>

              {error && (
                <div className="p-3.5 rounded-xl bg-rose-950/60 border border-rose-600/40 text-rose-200 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
                  <span>{error}</span>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Company / Firm Legal Name *
                  </label>
                  <input
                    type="text"
                    value={partnerForm.companyName}
                    onChange={(e) => setPartnerForm({ ...partnerForm, companyName: e.target.value })}
                    placeholder="e.g. Pampanga Ready-Mix Corp."
                    className="w-full bg-[#051322] border border-white/10 focus:border-[#C6922D] rounded-xl px-4 py-2 text-xs text-white focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Supply / Service Discipline
                  </label>
                  <select
                    value={partnerForm.category}
                    onChange={(e) => setPartnerForm({ ...partnerForm, category: e.target.value })}
                    className="w-full bg-[#051322] border border-white/10 focus:border-[#C6922D] rounded-xl px-4 py-2 text-xs text-white focus:outline-none"
                  >
                    <option value="Materials Supplier (Aggregates / Steel / Cement)">Materials Supplier (Aggregates / Steel / Cement)</option>
                    <option value="Heavy Equipment & Machinery Fleet Provider">Heavy Equipment & Machinery Fleet Provider</option>
                    <option value="PCAB-Licensed Specialized Subcontractor">PCAB-Licensed Specialized Subcontractor</option>
                    <option value="PRC-Licensed Engineering / Architectural Consultant">PRC-Licensed Engineering / Architectural Consultant</option>
                    <option value="Solar PV & Renewable Energy Systems Integrator">Solar PV & Renewable Energy Systems Integrator</option>
                    <option value="Smart Building, MEP & Automation Systems">Smart Building, MEP & Automation Systems</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    DTI / SEC Registration Number
                  </label>
                  <input
                    type="text"
                    value={partnerForm.dtiOrSec}
                    onChange={(e) => setPartnerForm({ ...partnerForm, dtiOrSec: e.target.value })}
                    placeholder="e.g. CS2020XXXXX or DTI BN"
                    className="w-full bg-[#051322] border border-white/10 focus:border-[#C6922D] rounded-xl px-4 py-2 text-xs text-white focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    BIR Taxpayer Identification Number (TIN)
                  </label>
                  <input
                    type="text"
                    value={partnerForm.birTin}
                    onChange={(e) => setPartnerForm({ ...partnerForm, birTin: e.target.value })}
                    placeholder="000-000-000-000"
                    className="w-full bg-[#051322] border border-white/10 focus:border-[#C6922D] rounded-xl px-4 py-2 text-xs text-white focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Contact Person Name *
                  </label>
                  <input
                    type="text"
                    value={partnerForm.contactPerson}
                    onChange={(e) => setPartnerForm({ ...partnerForm, contactPerson: e.target.value })}
                    placeholder="Engr. / Mr. / Ms."
                    className="w-full bg-[#051322] border border-white/10 focus:border-[#C6922D] rounded-xl px-4 py-2 text-xs text-white focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Official Corporate Email *
                  </label>
                  <input
                    type="email"
                    value={partnerForm.email}
                    onChange={(e) => setPartnerForm({ ...partnerForm, email: e.target.value })}
                    placeholder="partner@domain.com"
                    className="w-full bg-[#051322] border border-white/10 focus:border-[#C6922D] rounded-xl px-4 py-2 text-xs text-white focus:outline-none"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Phone / Mobile Number *
                  </label>
                  <input
                    type="tel"
                    value={partnerForm.phone}
                    onChange={(e) => setPartnerForm({ ...partnerForm, phone: e.target.value })}
                    placeholder="+63 9XX XXX XXXX"
                    className="w-full bg-[#051322] border border-white/10 focus:border-[#C6922D] rounded-xl px-4 py-2 text-xs text-white focus:outline-none"
                  />
                </div>
              </div>

              <div className="pt-2">
                <label className="flex items-start gap-3 text-xs text-slate-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={partnerForm.complianceAgreed}
                    onChange={(e) => setPartnerForm({ ...partnerForm, complianceAgreed: e.target.checked })}
                    className="mt-0.5 rounded border-slate-600 text-[#C6922D] focus:ring-[#C6922D]"
                  />
                  <span>
                    We certify that all materials supplied or services rendered comply with Philippine National Standards, DOLE DO 13 occupational safety regulations, and the Data Privacy Act of 2012.
                  </span>
                </label>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full py-3 bg-[#C6922D] hover:bg-[#d8a339] disabled:opacity-50 text-[#071A2F] font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md"
              >
                {submitting ? 'Registering...' : 'Submit Accreditation Dossier'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
