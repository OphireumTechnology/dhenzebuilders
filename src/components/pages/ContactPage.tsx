import React, { useState } from 'react';
import { CORPORATE_INFO } from '../../data/corporateInfo';
import {
  MapPin,
  Mail,
  Phone,
  Clock,
  Send,
  CheckCircle2,
  ChevronDown,
  Building,
  ShieldCheck,
} from 'lucide-react';

interface ContactPageProps {
  onNavigate: (view: string) => void;
  onOpenAssistant: () => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ onNavigate, onOpenAssistant }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'Project Inquiry',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: 'Where is LDL Dhenze Residential Building Construction officially located?',
      a: 'Our registered corporate office is situated at 704 Nile St., Anunas 2009, City of Angeles, Pampanga, Philippines. We serve project developments throughout Central Luzon, Metro Manila, and key Philippine growth regions.',
    },
    {
      q: 'What is LDL Dhenze’s registered line of business with the BIR?',
      a: 'LDL Dhenze is registered under Philippine Standard Industrial Classification (PSIC) 42900: Construction of Other Civil Engineering Projects (BIR Certificate Form 2303, TIN: 306-113-062-00000, OCN: 21ARC2025000002189).',
    },
    {
      q: 'Does LDL Dhenze provide certified architectural and engineering plans?',
      a: 'Yes. In strict compliance with Republic Act No. 9266 (The Architecture Act of 2004) and the Civil Engineering Law, all regulated architectural, structural, civil, mechanical, and electrical plans are prepared, signed, and sealed exclusively by duly qualified, PRC-licensed professionals.',
    },
    {
      q: 'Can LDL Dhenze integrate solar microgrids and battery storage into developments?',
      a: 'Yes. In alignment with the Renewable Energy Act of 2008 (RA 9513), we design and execute rooftop solar PV, ground mounts, and Battery Energy Storage Systems (BESS) for commercial, residential, and agro-industrial projects in coordination with accredited renewable energy partners.',
    },
    {
      q: 'How can I submit a formal project for technical review and quotation?',
      a: 'You can complete our online Project Opportunity Wizard to define your site footprint, zoning status, and stage requirements, or book a consultation with our project engineering team.',
    },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[#071A2F] text-slate-100 pt-32 pb-24 px-4 blueprint-grid">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#C6922D] mb-3 font-['Montserrat']">
            <MapPin className="w-4 h-4" />
            <span>Corporate Communications</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-white font-['Montserrat'] tracking-tight">
            Connect With Headquarters
          </h1>
          <p className="text-sm sm:text-base text-slate-300 mt-4 leading-relaxed">
            Reach our executive, project management, and procurement teams for technical evaluations, site inspections, and enterprise partnerships.
          </p>
        </div>

        {/* Contact Grid: Info + Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
          {/* Left: Contact Details Card */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-[#09223d] border border-[#C6922D]/30 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl">
              <div>
                <h3 className="text-lg font-bold text-white font-['Montserrat']">
                  Executive Headquarters &amp; Registered Office
                </h3>
                <p className="text-xs text-[#C6922D] mt-1 font-mono">
                  {CORPORATE_INFO.companyName}
                </p>
              </div>

              <div className="space-y-4 text-xs text-slate-300">
                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-lg bg-[#C6922D]/15 text-[#C6922D] flex items-center justify-center shrink-0 mt-0.5">
                    <Building className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[10px] text-slate-400 uppercase font-semibold">Executive Headquarters</div>
                    <div className="text-white font-medium mt-0.5 leading-relaxed">
                      {CORPORATE_INFO.headquarters.fullFormatted}
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-lg bg-[#C6922D]/15 text-[#C6922D] flex items-center justify-center shrink-0 mt-0.5">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[10px] text-slate-400 uppercase font-semibold">Tax Registered Address (BIR Form 2303)</div>
                    <div className="text-white font-medium mt-0.5 leading-relaxed">
                      {CORPORATE_INFO.registrations.taxRegisteredAddress}
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-lg bg-[#C6922D]/15 text-[#C6922D] flex items-center justify-center shrink-0 mt-0.5">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[10px] text-slate-400 uppercase font-semibold">Official Corporate Email</div>
                    <div className="text-white font-medium mt-0.5 space-y-0.5">
                      <div>
                        <a
                          href={`mailto:${CORPORATE_INFO.contacts.primaryEmail}`}
                          className="text-[#C6922D] hover:underline"
                        >
                          {CORPORATE_INFO.contacts.primaryEmail}
                        </a>
                      </div>
                      <div className="text-slate-400 text-[11px]">
                        <a
                          href={`mailto:${CORPORATE_INFO.contacts.secondaryEmail}`}
                          className="hover:text-slate-200"
                        >
                          {CORPORATE_INFO.contacts.secondaryEmail}
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-lg bg-[#C6922D]/15 text-[#C6922D] flex items-center justify-center shrink-0 mt-0.5">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[10px] text-slate-400 uppercase font-semibold">Direct Executive Line</div>
                    <div className="mt-0.5">
                      <a
                        href={CORPORATE_INFO.contacts.telephoneLink}
                        className="text-white font-medium hover:text-[#C6922D] transition-colors"
                      >
                        {CORPORATE_INFO.contacts.telephoneDisplay}
                      </a>
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-lg bg-[#C6922D]/15 text-[#C6922D] flex items-center justify-center shrink-0 mt-0.5">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[10px] text-slate-400 uppercase font-semibold">Operating Hours</div>
                    <div className="text-white font-medium mt-0.5">
                      {CORPORATE_INFO.contacts.operatingHours}
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-white/10 text-xs text-slate-400 space-y-2">
                <div className="flex justify-between">
                  <span>DTI Registration:</span>
                  <span className="font-mono text-white">BN {CORPORATE_INFO.registrations.dtiNumber} (2023–2028)</span>
                </div>
                <div className="flex justify-between">
                  <span>BIR TIN:</span>
                  <span className="font-mono text-white">{CORPORATE_INFO.registrations.tin}</span>
                </div>
                <div className="flex justify-between">
                  <span>PSIC Code:</span>
                  <span className="font-mono text-[#C6922D]">{CORPORATE_INFO.registrations.psicCode}</span>
                </div>
              </div>
            </div>

            <div className="bg-[#051322] border border-white/10 rounded-2xl p-6 text-xs text-slate-300">
              <span className="font-bold text-[#C6922D] block mb-1">
                Have a Complex Inquiry?
              </span>
              <p className="text-slate-400 leading-relaxed mb-4">
                You can also consult our AI Builder Assistant for instant grounded answers regarding corporate credentials and project milestones.
              </p>
              <button
                onClick={onOpenAssistant}
                className="w-full py-2.5 bg-white/10 hover:bg-white/15 text-white font-semibold rounded-lg transition-colors text-center"
              >
                Open Builder Assistant
              </button>
            </div>
          </div>

          {/* Right: Direct Transmission Form */}
          <div className="lg:col-span-7 bg-[#09223d] border border-white/10 rounded-3xl p-6 sm:p-10 shadow-2xl">
            {submitted ? (
              <div className="text-center py-12 space-y-4">
                <div className="w-16 h-16 rounded-full bg-[#237A3B]/20 border-2 border-[#237A3B] flex items-center justify-center text-[#237A3B] mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-white">Message Transmitted</h3>
                <p className="text-xs text-slate-300 max-w-md mx-auto">
                  Thank you for connecting with LDL Dhenze Residential Building Construction. An authorized team member will reply within 1 business day.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-5 py-2 bg-[#C6922D] text-[#071A2F] font-bold text-xs uppercase rounded-lg"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="border-b border-white/10 pb-4">
                  <h3 className="text-lg font-bold text-white">
                    Direct Corporate Transmission
                  </h3>
                  <p className="text-xs text-slate-400">
                    Send a direct message to LDL Dhenze administrative management.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Your Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Maria Cruz"
                      className="w-full bg-[#051322] border border-white/10 focus:border-[#C6922D] rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="maria@domain.com"
                      className="w-full bg-[#051322] border border-white/10 focus:border-[#C6922D] rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Contact Phone
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+63 9XX XXX XXXX"
                      className="w-full bg-[#051322] border border-white/10 focus:border-[#C6922D] rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Subject
                    </label>
                    <select
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full bg-[#051322] border border-white/10 focus:border-[#C6922D] rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none"
                    >
                      <option value="Project Inquiry">Project Inquiry</option>
                      <option value="Technical Consultation">Technical Consultation</option>
                      <option value="Procurement / Supplier Tender">Procurement / Supplier Tender</option>
                      <option value="Careers / Subcontracting">Careers / Subcontracting</option>
                      <option value="Corporate Governance">Corporate Governance</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Your Message / Scope Brief *
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Describe your inquiry, project location, or questions..."
                    className="w-full bg-[#051322] border border-white/10 focus:border-[#C6922D] rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-[#C6922D] hover:bg-[#d8a339] text-[#071A2F] font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md inline-flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Transmit Corporate Inquiry</span>
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Public Frequently Asked Questions Accordion */}
        <div id="faq" className="max-w-4xl mx-auto pt-8 border-t border-white/10">
          <div className="text-center mb-10">
            <span className="text-xs font-mono font-bold text-[#C6922D] uppercase tracking-widest">
              Authoritative FAQs
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-3">
            {faqs.map((f, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div
                  key={idx}
                  className="bg-[#09223d] border border-white/10 rounded-2xl overflow-hidden"
                >
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                    className="w-full p-5 text-left flex items-center justify-between gap-4 hover:bg-white/5 transition-colors"
                  >
                    <span className="text-xs sm:text-sm font-bold text-white">
                      {f.q}
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 text-[#C6922D] transform transition-transform duration-200 shrink-0 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 text-xs text-slate-300 leading-relaxed border-t border-white/5 pt-3 animate-in fade-in">
                      {f.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
