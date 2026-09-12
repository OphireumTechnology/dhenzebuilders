import React, { useState } from 'react';
import { CAPABILITY_LIST, INDUSTRY_LIST } from '../../data/companyData';
import {
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  ShieldCheck,
  Building,
  FileCheck,
  AlertCircle,
  Clock,
  Sparkles,
  MapPin,
} from 'lucide-react';

interface StartProjectWizardProps {
  onNavigate: (view: string) => void;
}

export const StartProjectWizard: React.FC<StartProjectWizardProps> = ({ onNavigate }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [submissionResult, setSubmissionResult] = useState<any | null>(null);
  const [errorMessage, setErrorMessage] = useState('');

  // Form State
  const [formData, setFormData] = useState({
    // Step 1: Client Profile
    fullName: '',
    companyName: '',
    email: '',
    phone: '',
    contactPreference: 'Email',

    // Step 2: Project Classification
    industryCategory: 'Residential Construction',
    projectType: 'Multi-Unit Housing Development',

    // Step 3: Site Parameters
    location: '',
    landAreaSqM: '',
    landControlStatus: 'Titled and Owned',

    // Step 4: Scope & Services
    selectedCapabilities: ['Construction & Civil Engineering'] as string[],
    includeRenewableEnergy: true,
    includeSmartSystems: false,

    // Step 5: Budget & Schedule
    targetStartDate: '',
    budgetBand: 'PHP 50M to 150M',
    financingStatus: 'Self-Funded / Equity Ready',

    // Step 6: Consent
    privacyConsent: false,
    accuracyConfirmed: false,
  });

  const updateField = (field: string, val: any) => {
    setFormData((prev) => ({ ...prev, [field]: val }));
  };

  const toggleCapability = (title: string) => {
    setFormData((prev) => {
      const exists = prev.selectedCapabilities.includes(title);
      return {
        ...prev,
        selectedCapabilities: exists
          ? prev.selectedCapabilities.filter((c) => c !== title)
          : [...prev.selectedCapabilities, title],
      };
    });
  };

  const handleNext = () => {
    setErrorMessage('');
    if (currentStep === 1) {
      if (!formData.fullName || !formData.email || !formData.phone) {
        setErrorMessage('Please complete your full name, valid email, and contact phone number.');
        return;
      }
    }
    if (currentStep === 3) {
      if (!formData.location) {
        setErrorMessage('Please state the prospective project city or province.');
        return;
      }
    }
    if (currentStep === 6) {
      handleSubmit();
      return;
    }
    setCurrentStep((prev) => prev + 1);
  };

  const handleSubmit = async () => {
    if (!formData.privacyConsent || !formData.accuracyConfirmed) {
      setErrorMessage('You must confirm the privacy consent and information accuracy checkboxes to proceed.');
      return;
    }

    setSubmitting(true);
    setErrorMessage('');

    try {
      const response = await fetch('/api/inquiries/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (!response.ok) {
        setErrorMessage(data.error || 'Failed to submit project inquiry.');
      } else {
        setSubmissionResult(data);
      }
    } catch (err) {
      setErrorMessage('Network error submitting inquiry. Please verify your connection.');
    } finally {
      setSubmitting(false);
    }
  };

  const steps = [
    { num: 1, title: 'Identity' },
    { num: 2, title: 'Classification' },
    { num: 3, title: 'Site' },
    { num: 4, title: 'Scope' },
    { num: 5, title: 'Commercial' },
    { num: 6, title: 'Review & Legal' },
  ];

  if (submissionResult) {
    return (
      <div className="min-h-screen bg-[#071A2F] text-slate-100 pt-32 pb-24 px-4 blueprint-grid">
        <div className="max-w-2xl mx-auto bg-[#0a2442] border border-[#C6922D]/40 rounded-3xl p-8 sm:p-12 shadow-2xl text-center">
          <div className="w-16 h-16 rounded-full bg-[#237A3B]/20 border-2 border-[#237A3B] flex items-center justify-center text-[#237A3B] mx-auto mb-6">
            <CheckCircle2 className="w-8 h-8" />
          </div>

          <span className="text-xs font-mono font-bold text-[#C6922D] uppercase tracking-widest">
            Inquiry Successfully Registered
          </span>

          <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-2 mb-4">
            Project Opportunity Filed
          </h2>

          <div className="bg-[#051322] border border-white/10 rounded-xl p-5 mb-6 text-left space-y-2 font-mono text-xs">
            <div className="flex justify-between">
              <span className="text-slate-400">Tracking Number:</span>
              <span className="text-[#C6922D] font-bold">{submissionResult.inquiryNumber}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Project Type:</span>
              <span className="text-white">{formData.projectType}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Target Location:</span>
              <span className="text-white">{formData.location}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Review SLA:</span>
              <span className="text-emerald-400">2 Business Days</span>
            </div>
          </div>

          <p className="text-xs text-slate-300 leading-relaxed mb-8">
            An automated confirmation has been logged under audit reference{' '}
            <strong className="text-white">{submissionResult.inquiryNumber}</strong>. An authorized project manager will review the site zoning parameters and reach out via {formData.contactPreference.toLowerCase()}.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => onNavigate('portal')}
              className="px-6 py-3 bg-[#C6922D] hover:bg-[#d8a339] text-[#071A2F] font-bold text-xs uppercase tracking-wider rounded-lg shadow"
            >
              Access Client Portal
            </button>
            <button
              onClick={() => onNavigate('home')}
              className="px-6 py-3 bg-white/10 hover:bg-white/15 text-white font-semibold text-xs uppercase tracking-wider rounded-lg border border-white/10"
            >
              Return Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#071A2F] text-slate-100 pt-32 pb-24 px-4 blueprint-grid">
      <div className="max-w-4xl mx-auto">
        {/* Title Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#C6922D] mb-2 font-['Montserrat']">
            <Building className="w-4 h-4" />
            <span>Structured Intake System</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white font-['Montserrat'] tracking-tight">
            Project Opportunity Wizard
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-2">
            Formally register development specifications, engineering parameters, and site conditions for technical appraisal.
          </p>
        </div>

        {/* Stepper Indicator */}
        <div className="grid grid-cols-6 gap-2 mb-10">
          {steps.map((s) => (
            <div key={s.num} className="text-center">
              <div
                className={`h-1.5 rounded-full mb-2 transition-all ${
                  currentStep >= s.num ? 'bg-[#C6922D]' : 'bg-white/10'
                }`}
              />
              <span
                className={`text-[10px] font-bold uppercase tracking-wider hidden sm:block ${
                  currentStep === s.num ? 'text-[#C6922D]' : 'text-slate-400'
                }`}
              >
                {s.title}
              </span>
            </div>
          ))}
        </div>

        {/* Wizard Form Card */}
        <div className="bg-[#09223d] border border-[#C6922D]/30 rounded-3xl p-6 sm:p-10 shadow-2xl relative">
          {errorMessage && (
            <div className="mb-6 p-4 rounded-xl bg-rose-950/60 border border-rose-600/40 text-rose-200 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* STEP 1: IDENTITY & CLIENT PROFILE */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <div className="border-b border-white/10 pb-4">
                <h3 className="text-lg font-bold text-white">1. Client & Entity Profile</h3>
                <p className="text-xs text-slate-400">
                  Provide verified contact credentials for official correspondence and technical submittals.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Full Name / Authorized Signatory *
                  </label>
                  <input
                    type="text"
                    value={formData.fullName}
                    onChange={(e) => updateField('fullName', e.target.value)}
                    placeholder="e.g. Engr. Maria Santos"
                    className="w-full bg-[#051322] border border-white/10 focus:border-[#C6922D] rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Company / Organization Name
                  </label>
                  <input
                    type="text"
                    value={formData.companyName}
                    onChange={(e) => updateField('companyName', e.target.value)}
                    placeholder="e.g. Santos Land Holdings Corp."
                    className="w-full bg-[#051322] border border-white/10 focus:border-[#C6922D] rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Official Corporate Email *
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => updateField('email', e.target.value)}
                    placeholder="maria.santos@company.com"
                    className="w-full bg-[#051322] border border-white/10 focus:border-[#C6922D] rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Mobile / Direct Phone Number *
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => updateField('phone', e.target.value)}
                    placeholder="+63 9XX XXX XXXX"
                    className="w-full bg-[#051322] border border-white/10 focus:border-[#C6922D] rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none"
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: PROJECT CLASSIFICATION */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <div className="border-b border-white/10 pb-4">
                <h3 className="text-lg font-bold text-white">2. Project Classification</h3>
                <p className="text-xs text-slate-400">
                  Select the target domain and asset archetype.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-2">
                    Industry Sector
                  </label>
                  <select
                    value={formData.industryCategory}
                    onChange={(e) => updateField('industryCategory', e.target.value)}
                    className="w-full bg-[#051322] border border-white/10 focus:border-[#C6922D] rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none"
                  >
                    {INDUSTRY_LIST.map((ind) => (
                      <option key={ind.id} value={ind.title}>
                        {ind.title}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-2">
                    Development Archetype
                  </label>
                  <select
                    value={formData.projectType}
                    onChange={(e) => updateField('projectType', e.target.value)}
                    className="w-full bg-[#051322] border border-white/10 focus:border-[#C6922D] rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none"
                  >
                    <option value="Single Luxury Residential Estate">Single Luxury Residential Estate</option>
                    <option value="Multi-Unit Housing Development / Subdivision">Multi-Unit Housing Development / Subdivision</option>
                    <option value="Mid-Rise Commercial / Office Building">Mid-Rise Commercial / Office Building</option>
                    <option value="Cold Storage & Logistics Facility">Cold Storage & Logistics Facility</option>
                    <option value="Agro-Industrial / Livestock Farm Compound">Agro-Industrial / Livestock Farm Compound</option>
                    <option value="Solar Microgrid + BESS Energy Station">Solar Microgrid + BESS Energy Station</option>
                    <option value="Civil Infrastructure / Drainage Network">Civil Infrastructure / Drainage Network</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: SITE & LAND PARAMETERS */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <div className="border-b border-white/10 pb-4">
                <h3 className="text-lg font-bold text-white">3. Land & Site Conditions</h3>
                <p className="text-xs text-slate-400">
                  Provide geographical and legal boundary status of the prospective property.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Location (City / Municipality / Province) *
                  </label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => updateField('location', e.target.value)}
                    placeholder="e.g. Angeles City, Pampanga"
                    className="w-full bg-[#051322] border border-white/10 focus:border-[#C6922D] rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Approximate Land Area (sq.m / hectares)
                  </label>
                  <input
                    type="text"
                    value={formData.landAreaSqM}
                    onChange={(e) => updateField('landAreaSqM', e.target.value)}
                    placeholder="e.g. 2,500 sq.m or 5 hectares"
                    className="w-full bg-[#051322] border border-white/10 focus:border-[#C6922D] rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Land Ownership / Title Control Status
                  </label>
                  <select
                    value={formData.landControlStatus}
                    onChange={(e) => updateField('landControlStatus', e.target.value)}
                    className="w-full bg-[#051322] border border-white/10 focus:border-[#C6922D] rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none"
                  >
                    <option value="Titled and Owned by Proponent">Titled and Owned by Proponent</option>
                    <option value="Under Purchase Contract / Escrow Option">Under Purchase Contract / Escrow Option</option>
                    <option value="Joint Venture Agreement Proposed">Joint Venture Agreement Proposed</option>
                    <option value="Pre-acquisition Feasibility Due Diligence">Pre-acquisition Feasibility Due Diligence</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* STEP 4: SCOPE & CAPABILITIES SELECTION */}
          {currentStep === 4 && (
            <div className="space-y-6">
              <div className="border-b border-white/10 pb-4">
                <h3 className="text-lg font-bold text-white">4. Desired Capabilities & Engineering Scope</h3>
                <p className="text-xs text-slate-400">
                  Select all service disciplines required under our Integrated Project Delivery platform.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {CAPABILITY_LIST.map((c) => (
                  <div
                    key={c.id}
                    onClick={() => toggleCapability(c.title)}
                    className={`p-3 rounded-xl border text-xs cursor-pointer transition-all flex items-start gap-3 ${
                      formData.selectedCapabilities.includes(c.title)
                        ? 'bg-[#C6922D]/20 border-[#C6922D] text-white'
                        : 'bg-white/5 border-white/10 text-slate-300 hover:bg-white/10'
                    }`}
                  >
                    <div
                      className={`w-4 h-4 rounded mt-0.5 flex items-center justify-center shrink-0 border ${
                        formData.selectedCapabilities.includes(c.title)
                          ? 'bg-[#C6922D] border-[#C6922D] text-[#071A2F]'
                          : 'border-slate-500'
                      }`}
                    >
                      {formData.selectedCapabilities.includes(c.title) && (
                        <CheckCircle2 className="w-3.5 h-3.5" />
                      )}
                    </div>
                    <div>
                      <div className="font-bold">{c.title}</div>
                      <div className="text-[11px] text-slate-400 mt-0.5 line-clamp-1">
                        {c.category}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* STEP 5: BUDGET & COMMERCIAL TIMELINE */}
          {currentStep === 5 && (
            <div className="space-y-6">
              <div className="border-b border-white/10 pb-4">
                <h3 className="text-lg font-bold text-white">5. Commercial Band & Milestone Expectations</h3>
                <p className="text-xs text-slate-400">
                  Define budget envelope and financing readiness for resource allocation.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-2">
                    Estimated Development Budget Band (PHP)
                  </label>
                  <select
                    value={formData.budgetBand}
                    onChange={(e) => updateField('budgetBand', e.target.value)}
                    className="w-full bg-[#051322] border border-white/10 focus:border-[#C6922D] rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none"
                  >
                    <option value="Under PHP 10M">Under PHP 10M</option>
                    <option value="PHP 10M to 25M">PHP 10M to 25M</option>
                    <option value="PHP 25M to 50M">PHP 25M to 50M</option>
                    <option value="PHP 50M to 150M">PHP 50M to 150M</option>
                    <option value="PHP 150M to 500M">PHP 150M to 500M</option>
                    <option value="Above PHP 500M (Institutional)">Above PHP 500M (Institutional)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-2">
                    Financing Readiness
                  </label>
                  <select
                    value={formData.financingStatus}
                    onChange={(e) => updateField('financingStatus', e.target.value)}
                    className="w-full bg-[#051322] border border-white/10 focus:border-[#C6922D] rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none"
                  >
                    <option value="Self-Funded / Equity Ready">Self-Funded / Equity Ready</option>
                    <option value="Bank Construction Loan Pre-Approved">Bank Construction Loan Pre-Approved</option>
                    <option value="Cooperative / Investor Syndicate">Cooperative / Investor Syndicate</option>
                    <option value="Seeking Structuring Assistance">Seeking Structuring Assistance</option>
                  </select>
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Target Site Commencement Date
                  </label>
                  <input
                    type="date"
                    value={formData.targetStartDate}
                    onChange={(e) => updateField('targetStartDate', e.target.value)}
                    className="w-full bg-[#051322] border border-white/10 focus:border-[#C6922D] rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none"
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 6: REVIEW & STATUTORY CONSENT */}
          {currentStep === 6 && (
            <div className="space-y-6">
              <div className="border-b border-white/10 pb-4">
                <h3 className="text-lg font-bold text-white">6. Summary Verification & Regulatory Consent</h3>
                <p className="text-xs text-slate-400">
                  Review the intake dossier and affirm Philippine Data Privacy compliance.
                </p>
              </div>

              {/* Summary Box */}
              <div className="bg-[#051322] border border-white/10 rounded-2xl p-5 space-y-2 text-xs">
                <div className="flex justify-between border-b border-white/5 pb-1.5">
                  <span className="text-slate-400">Proponent:</span>
                  <span className="font-semibold text-white">{formData.fullName} ({formData.companyName || 'Private'})</span>
                </div>
                <div className="flex justify-between border-b border-white/5 pb-1.5">
                  <span className="text-slate-400">Target Project:</span>
                  <span className="font-semibold text-white">{formData.projectType} in {formData.location}</span>
                </div>
                <div className="flex justify-between border-b border-white/5 pb-1.5">
                  <span className="text-slate-400">Budget Range:</span>
                  <span className="font-semibold text-[#C6922D]">{formData.budgetBand}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Selected Disciplines:</span>
                  <span className="text-white text-right max-w-xs">{formData.selectedCapabilities.join(', ')}</span>
                </div>
              </div>

              {/* Legal Consents */}
              <div className="space-y-3 pt-2">
                <label className="flex items-start gap-3 text-xs text-slate-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.privacyConsent}
                    onChange={(e) => updateField('privacyConsent', e.target.checked)}
                    className="mt-0.5 rounded border-slate-600 text-[#C6922D] focus:ring-[#C6922D]"
                  />
                  <span>
                    I consent to the collection and processing of submitted project and contact data in accordance with the <strong>Data Privacy Act of 2012 (Republic Act No. 10173)</strong> for development evaluation and technical communication.
                  </span>
                </label>

                <label className="flex items-start gap-3 text-xs text-slate-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.accuracyConfirmed}
                    onChange={(e) => updateField('accuracyConfirmed', e.target.checked)}
                    className="mt-0.5 rounded border-slate-600 text-[#C6922D] focus:ring-[#C6922D]"
                  />
                  <span>
                    I confirm that the information submitted represents true project intentions, and acknowledge that regulated engineering submittals will be certified by duly qualified and licensed Philippine professionals.
                  </span>
                </label>
              </div>
            </div>
          )}

          {/* Navigation Controls */}
          <div className="flex items-center justify-between pt-8 mt-8 border-t border-white/10">
            {currentStep > 1 ? (
              <button
                type="button"
                onClick={() => setCurrentStep((prev) => prev - 1)}
                className="px-5 py-2.5 rounded-lg text-xs font-semibold text-slate-300 hover:text-white hover:bg-white/5 transition-colors inline-flex items-center gap-1.5"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Previous Step</span>
              </button>
            ) : (
              <div />
            )}

            <button
              type="button"
              onClick={handleNext}
              disabled={submitting}
              className="px-6 py-2.5 rounded-lg text-xs font-bold bg-[#C6922D] hover:bg-[#d8a339] disabled:opacity-50 text-[#071A2F] uppercase tracking-wider transition-all shadow-md inline-flex items-center gap-2"
            >
              <span>{currentStep === 6 ? (submitting ? 'Transmitting Dossier...' : 'Submit Project Inquiry') : 'Continue'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
