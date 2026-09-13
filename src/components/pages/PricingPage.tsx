import React, { useState } from 'react';
import { BrandLogo } from '../common/BrandLogo';
import {
  INITIAL_SUBSCRIPTION_PLANS,
  TOP_UP_PACKAGES,
  BUILDER_AI_FAQS,
  CREDIT_CONSUMPTION_RATES,
  INDICATIVE_USD_TO_PHP_RATE,
  FX_RATE_TIMESTAMP,
  SUBSCRIPTION_TERMS_STATEMENT,
  STATUTORY_AI_DISCLAIMER,
} from '../../data/subscriptionData';
import { SubscriptionPlan, SubscriptionTierId, TopUpPackage } from '../../types';
import {
  Check,
  X,
  Sparkles,
  ShieldCheck,
  Building2,
  FileSpreadsheet,
  FileText,
  Image as ImageIcon,
  Zap,
  HelpCircle,
  Calculator,
  ArrowRight,
  Info,
  Lock,
  Layers,
  Users,
  Briefcase,
  ExternalLink,
  ChevronDown,
  CheckCircle2,
  AlertTriangle,
} from 'lucide-react';

interface PricingPageProps {
  onNavigate: (view: string) => void;
  onOpenAssistant: () => void;
  onOpenCheckout?: (planId: SubscriptionTierId, interval: 'monthly' | 'annual') => void;
}

export const PricingPage: React.FC<PricingPageProps> = ({
  onNavigate,
  onOpenAssistant,
  onOpenCheckout,
}) => {
  const [billingInterval, setBillingInterval] = useState<'monthly' | 'annual'>('annual');
  const [showPhpEquivalent, setShowPhpEquivalent] = useState<boolean>(false);
  const [activeFaqIndex, setActiveFaqIndex] = useState<number | null>(null);

  // Calculator State
  const [calcMessages, setCalcMessages] = useState<number>(400);
  const [calcDocs, setCalcDocs] = useState<number>(20);
  const [calcSheets, setCalcSheets] = useState<number>(5);
  const [calcImages, setCalcImages] = useState<number>(10);

  // Selected Plan for Checkout Modal
  const [checkoutModalPlan, setCheckoutModalPlan] = useState<SubscriptionPlan | null>(null);
  const [checkoutStep, setCheckoutStep] = useState<'details' | 'processing' | 'success'>('details');
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'bank_transfer' | 'qr_digital' | 'invoice'>('card');
  const [businessSeats, setBusinessSeats] = useState<number>(2);
  const [acceptedTerms, setAcceptedTerms] = useState<boolean>(false);
  const [acceptedDisclaimer, setAcceptedDisclaimer] = useState<boolean>(false);
  const [clientEmail, setClientEmail] = useState<string>('client@example.com');
  const [clientName, setClientName] = useState<string>('Development Partner');

  // Enterprise Quotation Modal
  const [enterpriseModalOpen, setEnterpriseModalOpen] = useState<boolean>(false);
  const [enterpriseUsers, setEnterpriseUsers] = useState<number>(15);
  const [enterpriseSla, setEnterpriseSla] = useState<string>('99.9% Uptime SLA with 1-Hour Critical Response');
  const [enterpriseSubmitted, setEnterpriseSubmitted] = useState<boolean>(false);

  // Top-Up Modal
  const [topUpModalOpen, setTopUpModalOpen] = useState<boolean>(false);
  const [selectedTopUp, setSelectedTopUp] = useState<TopUpPackage | null>(null);
  const [topUpSuccess, setTopUpSuccess] = useState<boolean>(false);

  // Calculate estimated credits for calculator
  const estimatedRequiredCredits =
    calcMessages * CREDIT_CONSUMPTION_RATES.STANDARD_CHAT.credits +
    calcDocs * CREDIT_CONSUMPTION_RATES.SCOPE_OF_WORK_PDF.credits +
    calcSheets * CREDIT_CONSUMPTION_RATES.BUDGET_BOQ_XLSX.credits +
    calcImages * CREDIT_CONSUMPTION_RATES.CONCEPTUAL_IMAGE.credits;

  const recommendedPlanForCalc = (() => {
    if (estimatedRequiredCredits <= 50) return INITIAL_SUBSCRIPTION_PLANS[0]; // preview
    if (estimatedRequiredCredits <= 500) return INITIAL_SUBSCRIPTION_PLANS[1]; // access
    if (estimatedRequiredCredits <= 2500) return INITIAL_SUBSCRIPTION_PLANS[2]; // professional
    if (estimatedRequiredCredits <= 18000) return INITIAL_SUBSCRIPTION_PLANS[3]; // executive
    return INITIAL_SUBSCRIPTION_PLANS[4]; // business
  })();

  const formatPrice = (usd: number) => {
    if (usd === 0) return 'USD $0';
    if (!showPhpEquivalent) {
      return `USD $${usd.toLocaleString()}`;
    }
    const php = Math.round(usd * INDICATIVE_USD_TO_PHP_RATE);
    return `USD $${usd.toLocaleString()} (~₱${php.toLocaleString()} PHP)`;
  };

  const handleOpenPlanCheckout = (plan: SubscriptionPlan) => {
    if (plan.id === 'enterprise') {
      setEnterpriseModalOpen(true);
      return;
    }
    setCheckoutModalPlan(plan);
    setCheckoutStep('details');
    setAcceptedTerms(false);
    setAcceptedDisclaimer(false);
  };

  const handleSimulatePayment = () => {
    if (!acceptedTerms || !acceptedDisclaimer) return;
    setCheckoutStep('processing');
    setTimeout(() => {
      setCheckoutStep('success');
    }, 1200);
  };

  return (
    <div className="pt-24 pb-20 bg-[#071A2F] text-slate-100 min-h-screen selection:bg-[#C6922D] selection:text-[#071A2F]">
      {/* Top Breadcrumb & Corporate Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-white/10">
          <div>
            <div className="flex items-center gap-2 text-xs text-[#C6922D] font-bold uppercase tracking-widest mb-1">
              <Sparkles className="w-4 h-4 text-[#C6922D]" />
              <span>LDL Dhenze Builder AI™ Commercial Platform</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white font-['Montserrat',sans-serif] tracking-tight">
              Subscription Plans & Builder Credits
            </h1>
            <p className="text-sm text-slate-300 mt-2 max-w-3xl leading-relaxed">
              Engineering intelligence calibrated for Philippine building codes, civil works, structural budgeting,
              and sustainable infrastructure. Transparent pricing built on independent company infrastructure and enforceable credits.
            </p>
          </div>

          {/* Currency / FX Toggle Indicator */}
          <div className="bg-[#051322] border border-[#C6922D]/30 p-3 rounded-xl flex flex-col gap-1.5 text-xs">
            <div className="flex items-center justify-between gap-3">
              <span className="text-slate-400 font-medium">Authoritative Currency:</span>
              <span className="font-mono font-bold text-white">USD ($) Base</span>
            </div>
            <button
              onClick={() => setShowPhpEquivalent(!showPhpEquivalent)}
              className="flex items-center gap-2 text-[11px] text-[#C6922D] hover:underline"
            >
              <span>{showPhpEquivalent ? '✓ Indicative ₱ PHP Active' : '+ Show Indicative ₱ PHP'}</span>
              <span className="text-slate-400 font-mono text-[10px]">(@ ₱{INDICATIVE_USD_TO_PHP_RATE}/$)</span>
            </button>
            <div className="text-[9px] text-slate-400 font-mono">
              Administrator-maintained indicative rate: PHP ₱58.50 per USD 1.00 (Source: BSP Indicative Reference, Last Updated: 2026-09-12 14:00:00 PST)
            </div>
          </div>
        </div>

        {/* Mandatory Independent Product Disclosure Banner */}
        <div className="mt-6 bg-[#0B2544]/60 border border-white/10 rounded-xl p-4 flex items-start gap-3 text-xs text-slate-300">
          <Info className="w-5 h-5 text-[#C6922D] shrink-0 mt-0.5" />
          <div>
            <div className="font-bold text-white mb-0.5">Commercial Architecture & Value Notice:</div>
            <p className="leading-relaxed">{SUBSCRIPTION_TERMS_STATEMENT}</p>
            <p className="mt-2 text-slate-400 leading-relaxed">
              <strong>LDL Dhenze Proprietary Value:</strong> Philippine National Building Code (PD 1096), NSCP 2015, DPWH Standard Specifications, dedicated project workspaces, automated Scope of Work PDF generators, preliminary BOQ quantity schedules, conceptual perspectives, private client document indexes, and PRC licensed professional review coordination.
            </p>
          </div>
        </div>
      </div>

      {/* Interval Selector Controls */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <div className="bg-[#051322] p-1 rounded-xl border border-white/10 flex items-center shadow-lg">
            <button
              onClick={() => setBillingInterval('monthly')}
              className={`px-6 py-2.5 rounded-lg text-xs font-bold tracking-wider uppercase transition-all ${
                billingInterval === 'monthly'
                  ? 'bg-[#C6922D] text-[#071A2F] shadow-md'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              Monthly Billing
            </button>
            <button
              onClick={() => setBillingInterval('annual')}
              className={`px-6 py-2.5 rounded-lg text-xs font-bold tracking-wider uppercase transition-all flex items-center gap-2 ${
                billingInterval === 'annual'
                  ? 'bg-[#C6922D] text-[#071A2F] shadow-md'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              <span>Annual Commitment</span>
              <span className="bg-[#071A2F] text-[#C6922D] text-[10px] px-2 py-0.5 rounded font-black border border-[#C6922D]/40">
                SAVE 20%
              </span>
            </button>
          </div>
          <span className="text-xs text-slate-400">
            {billingInterval === 'annual'
              ? '✨ 2 Months Free included with annual commitment'
              : 'Flexible month-to-month billing, cancel anytime'}
          </span>
        </div>
      </div>

      {/* Primary 6 Plans Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {INITIAL_SUBSCRIPTION_PLANS.map((plan) => {
            const isAnnual = billingInterval === 'annual';
            const price = isAnnual ? plan.annualMonthlyPriceUSD : plan.monthlyPriceUSD;
            const isBusiness = plan.id === 'business';
            const isEnterprise = plan.id === 'enterprise';

            return (
              <div
                key={plan.id}
                className={`relative flex flex-col justify-between rounded-2xl p-6 sm:p-7 transition-all duration-300 border ${
                  plan.isPopular
                    ? 'bg-gradient-to-b from-[#09223D] to-[#051526] border-[#C6922D] shadow-2xl shadow-[#C6922D]/10 ring-1 ring-[#C6922D]/40'
                    : plan.isTeam
                    ? 'bg-gradient-to-b from-[#082038] to-[#041220] border-sky-500/40 shadow-xl'
                    : 'bg-[#081F38]/70 border-white/10 hover:border-white/20'
                }`}
              >
                {/* Badge if Popular or Team */}
                {plan.badge && (
                  <div className="absolute -top-3 left-6">
                    <span
                      className={`text-[10px] uppercase font-black tracking-widest px-3 py-1 rounded-full shadow-md border ${
                        plan.isPopular
                          ? 'bg-[#C6922D] text-[#071A2F] border-amber-300'
                          : plan.isTeam
                          ? 'bg-sky-500 text-slate-950 border-sky-300'
                          : 'bg-white/10 text-slate-200 border-white/20'
                      }`}
                    >
                      {plan.badge}
                    </span>
                  </div>
                )}

                <div>
                  {/* Plan Name & Tagline */}
                  <div className="mb-4 mt-2">
                    <h3 className="text-2xl font-black text-white font-['Montserrat',sans-serif]">
                      {plan.name}
                    </h3>
                    <p className="text-xs text-slate-300 mt-1 line-clamp-2 leading-relaxed">
                      {plan.tagline}
                    </p>
                  </div>

                  {/* Price Block */}
                  <div className="py-4 my-2 border-y border-white/10">
                    {isEnterprise ? (
                      <div className="flex flex-col">
                        <span className="text-3xl font-black text-white">Custom Quotation</span>
                        <span className="text-xs text-slate-400 mt-1">Based on required infrastructure & SLA</span>
                      </div>
                    ) : (
                      <div className="flex flex-col">
                        <div className="flex items-baseline gap-1">
                          <span className="text-4xl font-black text-white tracking-tight">
                            USD ${price}
                          </span>
                          <span className="text-xs text-slate-300 font-medium">
                            {isBusiness ? '/ user / month' : '/ month'}
                          </span>
                        </div>
                        <div className="text-[10px] text-slate-400 font-mono mt-1">
                          {price === 0 ? '(Free Demonstration Tier)' : '(Exclusive of statutory VAT; applicable taxes calculated at checkout)'}
                        </div>
                        {showPhpEquivalent && price > 0 && (
                          <div className="text-xs text-[#C6922D] font-mono mt-1.5 bg-[#051322] p-1.5 rounded border border-[#C6922D]/20">
                            <div>Estimated PHP ₱{Math.round(price * INDICATIVE_USD_TO_PHP_RATE).toLocaleString()} / month</div>
                            <div className="text-[9px] text-slate-400 font-sans mt-0.5">
                              Estimated PHP equivalent only. The final amount is calculated during checkout.
                            </div>
                          </div>
                        )}
                        {isAnnual && price > 0 && (
                          <div className="text-[11px] text-emerald-400 font-medium mt-1">
                            Billed annually (USD ${price * 12} / year)
                          </div>
                        )}
                      </div>
                    )}

                    {/* Benchmark Note */}
                    <div className="mt-2 text-[10px] text-slate-400 font-mono">
                      Pricing Multiplier: <span className="text-[#C6922D] font-bold">{(plan?.multiplier ?? 1).toFixed(2)}x</span> on verified reference
                    </div>
                  </div>

                  {/* Builder Credits & Key Metrics */}
                  <div className="bg-[#051322] border border-white/5 rounded-xl p-3.5 my-4 space-y-2 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-300 font-medium flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-[#C6922D]" />
                        Monthly Builder Credits:
                      </span>
                      <span className="font-mono font-black text-[#C6922D]">
                        {isEnterprise ? 'Negotiated' : `${plan.allowance.monthlyCredits.toLocaleString()} Credits`}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-slate-400 text-[11px]">
                      <span>AI Messages:</span>
                      <span className="font-mono text-slate-200">
                        {isEnterprise ? 'Custom' : `${plan.allowance.monthlyMessages.toLocaleString()} / mo`}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-slate-400 text-[11px]">
                      <span>Document Generations:</span>
                      <span className="font-mono text-slate-200">
                        {isEnterprise ? 'Custom' : `${plan.allowance.monthlyDocumentGenerations} / mo`}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-slate-400 text-[11px]">
                      <span>Conceptual Visuals:</span>
                      <span className="font-mono text-slate-200">
                        {isEnterprise ? 'Custom' : `${plan.allowance.monthlyImageGenerations} / mo`}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-slate-400 text-[11px]">
                      <span>Workspaces & Storage:</span>
                      <span className="font-mono text-slate-200">
                        {isEnterprise ? 'Custom' : `${plan.allowance.activeProjects} active (${plan.allowance.storageGB} GB)`}
                      </span>
                    </div>
                  </div>

                  {/* Plan Features Checklist */}
                  <div className="space-y-2.5 my-5">
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                      Included Capabilities:
                    </div>
                    {plan.highlights.map((item, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-slate-200">
                        <Check className="w-4 h-4 text-[#C6922D] shrink-0 mt-0.5" />
                        <span className="leading-snug">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom Action Area */}
                <div className="pt-4 border-t border-white/10 mt-4">
                  <button
                    onClick={() => handleOpenPlanCheckout(plan)}
                    className={`w-full py-3 px-4 rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-lg ${
                      plan.isPopular
                        ? 'bg-[#C6922D] hover:bg-[#d8a339] text-[#071A2F] hover:shadow-[#C6922D]/20'
                        : plan.isTeam
                        ? 'bg-sky-500 hover:bg-sky-400 text-slate-950 hover:shadow-sky-500/20'
                        : isEnterprise
                        ? 'bg-white/10 hover:bg-white/20 text-white border border-white/20'
                        : 'bg-white/10 hover:bg-[#C6922D] hover:text-[#071A2F] text-white border border-white/10'
                    }`}
                  >
                    <span>
                      {isEnterprise
                        ? 'Request Enterprise Proposal'
                        : plan.id === 'preview'
                        ? 'Experience Free Preview'
                        : `Select ${plan.name}`}
                    </span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <div className="text-center text-[10px] text-slate-400 mt-2">
                    {plan.id === 'preview'
                      ? 'No credit card required. Preliminary concept limitations apply.'
                      : isEnterprise
                      ? 'Custom SLA & verification of corporate credentials required.'
                      : isBusiness
                      ? 'Minimum 2 seats. Centralized invoicing available.'
                      : 'Enforceable credit limits. Zero unexpected overage fees.'}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Interactive Builder Credits Estimator & Calculator */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="bg-[#051526] border border-[#C6922D]/30 rounded-3xl p-6 sm:p-10 shadow-2xl">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 pb-8 border-b border-white/10">
            <div>
              <div className="flex items-center gap-2 text-xs text-[#C6922D] font-bold uppercase tracking-widest mb-1">
                <Calculator className="w-4 h-4 text-[#C6922D]" />
                <span>Transparent Usage Estimator</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                Builder Credits Consumption Calculator
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl">
                Estimate your monthly project planning activities to see the exact credit requirements and recommended plan tier.
              </p>
            </div>

            <div className="bg-[#081F38] border border-white/10 p-4 rounded-2xl flex items-center gap-4">
              <div>
                <div className="text-[10px] uppercase font-bold text-slate-400">Estimated Total Requirement</div>
                <div className="text-2xl sm:text-3xl font-black text-[#C6922D] font-mono">
                  {estimatedRequiredCredits.toLocaleString()} Credits
                </div>
              </div>
              <div className="h-10 w-[1px] bg-white/10" />
              <div>
                <div className="text-[10px] uppercase font-bold text-slate-400">Recommended Tier</div>
                <div className="text-sm font-bold text-white flex items-center gap-1">
                  <span className="text-emerald-400">●</span> {recommendedPlanForCalc.name}
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-8">
            {/* Messages Slider */}
            <div className="bg-[#081F38]/60 p-4 rounded-xl border border-white/5">
              <div className="flex justify-between text-xs mb-2">
                <span className="font-semibold text-slate-200">AI Chat Messages</span>
                <span className="font-mono text-[#C6922D] font-bold">{calcMessages} msgs</span>
              </div>
              <input
                type="range"
                min={50}
                max={2500}
                step={50}
                value={calcMessages}
                onChange={(e) => setCalcMessages(Number(e.target.value))}
                className="w-full accent-[#C6922D] cursor-pointer"
              />
              <div className="text-[10px] text-slate-400 mt-2">
                1 Credit per query (Philippine code & civil guidance)
              </div>
            </div>

            {/* Scope of Work PDFs */}
            <div className="bg-[#081F38]/60 p-4 rounded-xl border border-white/5">
              <div className="flex justify-between text-xs mb-2">
                <span className="font-semibold text-slate-200">Scope of Work PDFs</span>
                <span className="font-mono text-[#C6922D] font-bold">{calcDocs} briefs</span>
              </div>
              <input
                type="range"
                min={0}
                max={100}
                step={5}
                value={calcDocs}
                onChange={(e) => setCalcDocs(Number(e.target.value))}
                className="w-full accent-[#C6922D] cursor-pointer"
              />
              <div className="text-[10px] text-slate-400 mt-2">
                12 Credits per detailed technical scope generation
              </div>
            </div>

            {/* Budget & BOQ Sheets */}
            <div className="bg-[#081F38]/60 p-4 rounded-xl border border-white/5">
              <div className="flex justify-between text-xs mb-2">
                <span className="font-semibold text-slate-200">Budget Frameworks (XLSX)</span>
                <span className="font-mono text-[#C6922D] font-bold">{calcSheets} sheets</span>
              </div>
              <input
                type="range"
                min={0}
                max={30}
                step={1}
                value={calcSheets}
                onChange={(e) => setCalcSheets(Number(e.target.value))}
                className="w-full accent-[#C6922D] cursor-pointer"
              />
              <div className="text-[10px] text-slate-400 mt-2">
                20 Credits per preliminary Bill of Quantities matrix
              </div>
            </div>

            {/* Conceptual Renderings */}
            <div className="bg-[#081F38]/60 p-4 rounded-xl border border-white/5">
              <div className="flex justify-between text-xs mb-2">
                <span className="font-semibold text-slate-200">Conceptual Visuals</span>
                <span className="font-mono text-[#C6922D] font-bold">{calcImages} renders</span>
              </div>
              <input
                type="range"
                min={0}
                max={50}
                step={2}
                value={calcImages}
                onChange={(e) => setCalcImages(Number(e.target.value))}
                className="w-full accent-[#C6922D] cursor-pointer"
              />
              <div className="text-[10px] text-slate-400 mt-2">
                25 Credits per conceptual architectural rendering
              </div>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs text-slate-300">
              Need more credits during peak development? You can always purchase prepaid add-on packs that never expire.
            </div>
            <button
              onClick={() => handleOpenPlanCheckout(recommendedPlanForCalc)}
              className="px-6 py-2.5 bg-[#C6922D] hover:bg-[#d8a339] text-[#071A2F] text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-md"
            >
              Choose Recommended {recommendedPlanForCalc.name}
            </button>
          </div>
        </div>
      </div>

      {/* Prepaid Top-Up Add-On Packages */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div>
            <div className="text-xs text-[#C6922D] font-bold uppercase tracking-widest mb-1">
              Audited Prepaid Add-Ons
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-['Montserrat',sans-serif]">
              Prepaid Builder Credit Top-Ups
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-3xl leading-relaxed">
              Add-on packs supplement active subscriptions during intensive procurement, feasibility runs, or bidding cycles.
              Prepaid add-on packs carry a 12-month rolling validity under active accounts, with First-In, First-Out (FIFO) consumption order.
              Unused packs are eligible for pro-rated refund within 14 calendar days of purchase per formal accounting policy.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TOP_UP_PACKAGES.map((pkg) => (
            <div
              key={pkg.id}
              className={`bg-[#081F38] rounded-2xl p-6 border flex flex-col justify-between transition-all ${
                pkg.popular ? 'border-[#C6922D] shadow-xl shadow-[#C6922D]/10 ring-1 ring-[#C6922D]/30' : 'border-white/10 hover:border-white/20'
              }`}
            >
              <div>
                {pkg.popular && (
                  <span className="text-[10px] font-black uppercase tracking-wider bg-[#C6922D] text-[#071A2F] px-2.5 py-0.5 rounded-full mb-3 inline-block">
                    Recommended Add-On
                  </span>
                )}
                <div className="text-base font-bold text-white">{pkg.name}</div>
                <div className="mt-2 mb-1">
                  <span className="text-3xl font-black text-[#C6922D] font-mono">
                    USD ${pkg.priceUSD}
                  </span>
                  <span className="text-xs text-slate-400 ml-1.5 font-medium">one-time</span>
                </div>
                <div className="text-[10px] text-slate-400 font-mono mb-2">
                  (Exclusive of statutory VAT; applicable taxes calculated at checkout)
                </div>
                {showPhpEquivalent && (
                  <div className="text-xs text-[#C6922D] font-mono mb-3 bg-[#051322] p-2 rounded border border-[#C6922D]/20">
                    <div>Estimated PHP ₱{Math.round(pkg.priceUSD * INDICATIVE_USD_TO_PHP_RATE).toLocaleString()} one-time</div>
                    <div className="text-[9px] text-slate-400 font-sans mt-0.5">
                      Estimated PHP equivalent only. The final amount is calculated during checkout.
                    </div>
                  </div>
                )}
                <div className="bg-[#051322] px-3 py-2 rounded-lg text-xs font-mono text-white mb-3 flex items-center justify-between">
                  <span className="text-slate-400">Pack Allocation:</span>
                  <span className="font-bold text-[#C6922D]">+{pkg.credits.toLocaleString()} Builder Credits</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {pkg.description}
                </p>
              </div>

              <button
                onClick={() => {
                  setSelectedTopUp(pkg);
                  setTopUpModalOpen(true);
                  setTopUpSuccess(false);
                }}
                className="mt-6 w-full py-2.5 bg-white/10 hover:bg-[#C6922D] hover:text-[#071A2F] text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-colors border border-white/10"
              >
                Purchase Top-Up Pack
              </button>
            </div>
          ))}
        </div>

        {/* Credit Lifecycle & Accounting Policy Disclosure */}
        <div className="mt-8 bg-[#051322] border border-white/10 rounded-2xl p-5 text-xs text-slate-300 space-y-3">
          <div className="flex items-center gap-2 font-bold text-white uppercase tracking-wider text-[11px]">
            <ShieldCheck className="w-4 h-4 text-[#C6922D]" />
            <span>Audited Credit Governance & Lifecycle Policy</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-1 text-[11px]">
            <div className="bg-[#081F38]/60 p-3 rounded-xl border border-white/5">
              <div className="text-[#C6922D] font-bold mb-1">12-Month Validity</div>
              <div className="text-slate-400">Prepaid add-ons maintain 365-day rolling validity under active accounts.</div>
            </div>
            <div className="bg-[#081F38]/60 p-3 rounded-xl border border-white/5">
              <div className="text-[#C6922D] font-bold mb-1">FIFO Consumption</div>
              <div className="text-slate-400">Credits are consumed in order: Promotional → Monthly Subscription → Prepaid.</div>
            </div>
            <div className="bg-[#081F38]/60 p-3 rounded-xl border border-white/5">
              <div className="text-[#C6922D] font-bold mb-1">14-Day Refund Window</div>
              <div className="text-slate-400">Unused prepaid packs are refundable within 14 days less payment provider fees.</div>
            </div>
            <div className="bg-[#081F38]/60 p-3 rounded-xl border border-white/5">
              <div className="text-[#C6922D] font-bold mb-1">Immutable Ledger</div>
              <div className="text-slate-400">Every deduction produces a cryptographic receipt ID and unalterable server audit entry.</div>
            </div>
          </div>
        </div>
      </div>

      {/* Comprehensive Feature Comparison Matrix */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-['Montserrat',sans-serif]">
            Detailed Plan Entitlement Matrix
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-2 max-w-2xl mx-auto">
            Review server-enforced entitlements and capability bounds across our six distinct service levels.
          </p>
        </div>

        <div className="overflow-x-auto border border-white/10 rounded-2xl bg-[#051526] shadow-2xl">
          <table className="w-full text-left text-xs text-slate-200">
            <thead className="bg-[#081F38] text-slate-300 uppercase tracking-wider font-semibold border-b border-white/10">
              <tr>
                <th className="p-4 w-1/4">Platform Capability / Entitlement</th>
                <th className="p-4 text-center">Preview ($0)</th>
                <th className="p-4 text-center">Access ($80)</th>
                <th className="p-4 text-center text-[#C6922D]">Professional ($200)</th>
                <th className="p-4 text-center">Executive ($2k)</th>
                <th className="p-4 text-center text-sky-400">Business ($250+)</th>
                <th className="p-4 text-center">Enterprise</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              <tr>
                <td className="p-4 font-semibold text-white">Monthly Builder Credits</td>
                <td className="p-4 text-center font-mono">50</td>
                <td className="p-4 text-center font-mono">500</td>
                <td className="p-4 text-center font-mono font-bold text-[#C6922D]">2,500</td>
                <td className="p-4 text-center font-mono font-bold">18,000</td>
                <td className="p-4 text-center font-mono text-sky-400">4,000 / seat</td>
                <td className="p-4 text-center font-mono">Custom</td>
              </tr>
              <tr>
                <td className="p-4 font-semibold text-white">Public Grounded Knowledge Graph</td>
                <td className="p-4 text-center"><Check className="w-4 h-4 text-[#C6922D] mx-auto" /></td>
                <td className="p-4 text-center"><Check className="w-4 h-4 text-[#C6922D] mx-auto" /></td>
                <td className="p-4 text-center"><Check className="w-4 h-4 text-[#C6922D] mx-auto" /></td>
                <td className="p-4 text-center"><Check className="w-4 h-4 text-[#C6922D] mx-auto" /></td>
                <td className="p-4 text-center"><Check className="w-4 h-4 text-[#C6922D] mx-auto" /></td>
                <td className="p-4 text-center"><Check className="w-4 h-4 text-[#C6922D] mx-auto" /></td>
              </tr>
              <tr>
                <td className="p-4 font-semibold text-white">Private Project Workspaces</td>
                <td className="p-4 text-center"><X className="w-4 h-4 text-slate-600 mx-auto" /></td>
                <td className="p-4 text-center font-mono">1 Project</td>
                <td className="p-4 text-center font-mono font-bold text-[#C6922D]">5 Projects</td>
                <td className="p-4 text-center font-mono font-bold">25 Projects</td>
                <td className="p-4 text-center font-mono text-sky-400">50 Projects</td>
                <td className="p-4 text-center font-mono">Custom</td>
              </tr>
              <tr>
                <td className="p-4 font-semibold text-white">Cloud Storage Allocation</td>
                <td className="p-4 text-center font-mono">250 MB</td>
                <td className="p-4 text-center font-mono">2 GB</td>
                <td className="p-4 text-center font-mono text-[#C6922D]">20 GB</td>
                <td className="p-4 text-center font-mono">200 GB</td>
                <td className="p-4 text-center font-mono text-sky-400">25 GB / seat</td>
                <td className="p-4 text-center font-mono">Custom</td>
              </tr>
              <tr>
                <td className="p-4 font-semibold text-white">Technical PDF Document Exports</td>
                <td className="p-4 text-center text-slate-500">Watermarked Preview</td>
                <td className="p-4 text-center"><Check className="w-4 h-4 text-[#C6922D] mx-auto" /></td>
                <td className="p-4 text-center"><Check className="w-4 h-4 text-[#C6922D] mx-auto" /></td>
                <td className="p-4 text-center"><Check className="w-4 h-4 text-[#C6922D] mx-auto" /></td>
                <td className="p-4 text-center"><Check className="w-4 h-4 text-[#C6922D] mx-auto" /></td>
                <td className="p-4 text-center"><Check className="w-4 h-4 text-[#C6922D] mx-auto" /></td>
              </tr>
              <tr>
                <td className="p-4 font-semibold text-white">Budget Framework & BOQ (XLSX)</td>
                <td className="p-4 text-center"><X className="w-4 h-4 text-slate-600 mx-auto" /></td>
                <td className="p-4 text-center"><X className="w-4 h-4 text-slate-600 mx-auto" /></td>
                <td className="p-4 text-center"><Check className="w-4 h-4 text-[#C6922D] mx-auto" /></td>
                <td className="p-4 text-center"><Check className="w-4 h-4 text-[#C6922D] mx-auto" /></td>
                <td className="p-4 text-center"><Check className="w-4 h-4 text-[#C6922D] mx-auto" /></td>
                <td className="p-4 text-center"><Check className="w-4 h-4 text-[#C6922D] mx-auto" /></td>
              </tr>
              <tr>
                <td className="p-4 font-semibold text-white">Conceptual Architectural Imagery</td>
                <td className="p-4 text-center"><X className="w-4 h-4 text-slate-600 mx-auto" /></td>
                <td className="p-4 text-center font-mono">5 / mo</td>
                <td className="p-4 text-center font-mono text-[#C6922D]">30 / mo</td>
                <td className="p-4 text-center font-mono">150 / mo</td>
                <td className="p-4 text-center font-mono text-sky-400">40 / seat</td>
                <td className="p-4 text-center font-mono">Custom</td>
              </tr>
              <tr>
                <td className="p-4 font-semibold text-white">Multi-Document Feasibility Synthesis</td>
                <td className="p-4 text-center"><X className="w-4 h-4 text-slate-600 mx-auto" /></td>
                <td className="p-4 text-center"><X className="w-4 h-4 text-slate-600 mx-auto" /></td>
                <td className="p-4 text-center"><Check className="w-4 h-4 text-[#C6922D] mx-auto" /></td>
                <td className="p-4 text-center"><Check className="w-4 h-4 text-[#C6922D] mx-auto" /></td>
                <td className="p-4 text-center"><Check className="w-4 h-4 text-[#C6922D] mx-auto" /></td>
                <td className="p-4 text-center"><Check className="w-4 h-4 text-[#C6922D] mx-auto" /></td>
              </tr>
              <tr>
                <td className="p-4 font-semibold text-white">Maker-Checker Approvals & Audit Trail</td>
                <td className="p-4 text-center"><X className="w-4 h-4 text-slate-600 mx-auto" /></td>
                <td className="p-4 text-center"><X className="w-4 h-4 text-slate-600 mx-auto" /></td>
                <td className="p-4 text-center"><X className="w-4 h-4 text-slate-600 mx-auto" /></td>
                <td className="p-4 text-center"><X className="w-4 h-4 text-slate-600 mx-auto" /></td>
                <td className="p-4 text-center"><Check className="w-4 h-4 text-sky-400 mx-auto" /></td>
                <td className="p-4 text-center"><Check className="w-4 h-4 text-sky-400 mx-auto" /></td>
              </tr>
              <tr>
                <td className="p-4 font-semibold text-white">PRC Professional Review Pathway</td>
                <td className="p-4 text-center text-slate-500">Standard Intake</td>
                <td className="p-4 text-center text-slate-500">Standard Intake</td>
                <td className="p-4 text-center font-bold text-[#C6922D]">Priority Routing</td>
                <td className="p-4 text-center font-bold text-[#C6922D]">Executive Coordination</td>
                <td className="p-4 text-center font-bold text-sky-400">Team Routing</td>
                <td className="p-4 text-center font-bold">Dedicated Liaison</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Statutory Architecture & Engineering Notice */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="bg-[#051322] border-l-4 border-[#C6922D] rounded-r-xl p-6 text-xs text-slate-300">
          <div className="flex items-center gap-2 font-bold text-white uppercase tracking-wider mb-2">
            <ShieldCheck className="w-5 h-5 text-[#C6922D]" />
            <span>Statutory Compliance Notice (Republic Acts 9266 & 544)</span>
          </div>
          <p className="leading-relaxed">
            {STATUTORY_AI_DISCLAIMER}
          </p>
        </div>
      </div>

      {/* Frequently Asked Questions */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="text-center mb-10">
          <div className="text-xs text-[#C6922D] font-bold uppercase tracking-widest mb-1">
            Commercial & Technical Clarity
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-['Montserrat',sans-serif]">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-3">
          {BUILDER_AI_FAQS.map((faq, idx) => {
            const isOpen = activeFaqIndex === idx;
            return (
              <div
                key={idx}
                className="bg-[#081F38] border border-white/5 rounded-xl overflow-hidden transition-colors"
              >
                <button
                  onClick={() => setActiveFaqIndex(isOpen ? null : idx)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 text-sm font-bold text-white hover:text-[#C6922D] transition-colors"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-[#C6922D] shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs text-slate-300 leading-relaxed border-t border-white/5">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* CHECKOUT / UPGRADE MODAL */}
      {checkoutModalPlan && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#071A2F] border border-[#C6922D]/40 rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl relative my-8">
            <button
              onClick={() => setCheckoutModalPlan(null)}
              className="absolute top-6 right-6 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            {checkoutStep === 'details' && (
              <div>
                <div className="flex items-center gap-3 pb-4 border-b border-white/10">
                  <div className="p-3 bg-[#C6922D]/15 rounded-xl border border-[#C6922D]/30">
                    <BrandLogo variant="dark" size="sm" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-[#C6922D] uppercase tracking-wider">
                      Internal Checkout Session
                    </div>
                    <h3 className="text-xl font-black text-white">
                      Subscribe to {checkoutModalPlan.name}
                    </h3>
                  </div>
                </div>

                {/* Plan Summary Box */}
                <div className="bg-[#051322] rounded-xl p-4 my-5 space-y-2 border border-white/5 text-xs">
                  <div className="flex justify-between text-slate-300">
                    <span>Selected Plan Tier:</span>
                    <span className="font-bold text-white">{checkoutModalPlan.name}</span>
                  </div>
                  <div className="flex justify-between text-slate-300">
                    <span>Billing Interval:</span>
                    <span className="font-bold text-[#C6922D] uppercase">{billingInterval}</span>
                  </div>
                  {checkoutModalPlan.id === 'business' && (
                    <div className="flex justify-between items-center text-slate-300 pt-2 border-t border-white/5">
                      <span>Purchased Seats (Min 2):</span>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setBusinessSeats(Math.max(2, businessSeats - 1))}
                          className="px-2 py-0.5 bg-white/10 rounded font-mono hover:bg-white/20"
                        >
                          -
                        </button>
                        <span className="font-mono font-bold text-white">{businessSeats}</span>
                        <button
                          onClick={() => setBusinessSeats(businessSeats + 1)}
                          className="px-2 py-0.5 bg-white/10 rounded font-mono hover:bg-white/20"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  )}
                  <div className="flex justify-between text-slate-300 pt-2 border-t border-white/5">
                    <span>Included Builder Credits:</span>
                    <span className="font-mono text-[#C6922D] font-bold">
                      {(checkoutModalPlan.id === 'business'
                        ? checkoutModalPlan.allowance.monthlyCredits * businessSeats
                        : checkoutModalPlan.allowance.monthlyCredits
                      ).toLocaleString()}{' '}
                      Credits / month
                    </span>
                  </div>
                  <div className="flex justify-between text-white font-bold text-sm pt-2 border-t border-white/10">
                    <span>Authoritative Payable Amount:</span>
                    <span className="font-mono text-emerald-400">
                      USD $
                      {(checkoutModalPlan.id === 'business'
                        ? (billingInterval === 'annual' ? checkoutModalPlan.annualMonthlyPriceUSD : checkoutModalPlan.monthlyPriceUSD) * businessSeats
                        : billingInterval === 'annual' ? checkoutModalPlan.annualMonthlyPriceUSD : checkoutModalPlan.monthlyPriceUSD
                      ).toLocaleString()}
                    </span>
                  </div>
                  {showPhpEquivalent && (
                    <div className="text-right text-[11px] text-slate-400 font-mono">
                      (Locked Exchange Rate: ~₱
                      {Math.round(
                        (checkoutModalPlan.id === 'business'
                          ? (billingInterval === 'annual' ? checkoutModalPlan.annualMonthlyPriceUSD : checkoutModalPlan.monthlyPriceUSD) * businessSeats
                          : billingInterval === 'annual' ? checkoutModalPlan.annualMonthlyPriceUSD : checkoutModalPlan.monthlyPriceUSD) *
                          INDICATIVE_USD_TO_PHP_RATE
                      ).toLocaleString()}{' '}
                      PHP)
                    </div>
                  )}
                </div>

                {/* Subscriber Profile Details */}
                <div className="space-y-3 mb-5 text-xs">
                  <div>
                    <label className="block text-slate-400 mb-1">Subscriber Full Name / Corporate Officer</label>
                    <input
                      type="text"
                      value={clientName}
                      onChange={(e) => setClientName(e.target.value)}
                      className="w-full bg-[#081F38] border border-white/10 rounded-lg p-2.5 text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 mb-1">Account & Billing Email</label>
                    <input
                      type="email"
                      value={clientEmail}
                      onChange={(e) => setClientEmail(e.target.value)}
                      className="w-full bg-[#081F38] border border-white/10 rounded-lg p-2.5 text-white"
                    />
                  </div>
                </div>

                {/* Payment Method Selector */}
                <div className="mb-5 text-xs">
                  <label className="block text-slate-400 mb-2">Select Approved Payment Method</label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('card')}
                      className={`p-3 rounded-lg border text-left flex items-center gap-2 ${
                        paymentMethod === 'card' ? 'border-[#C6922D] bg-[#C6922D]/10 text-white' : 'border-white/10 text-slate-300'
                      }`}
                    >
                      <Lock className="w-4 h-4 text-[#C6922D]" />
                      <span>Credit / Debit Card</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('bank_transfer')}
                      className={`p-3 rounded-lg border text-left flex items-center gap-2 ${
                        paymentMethod === 'bank_transfer' ? 'border-[#C6922D] bg-[#C6922D]/10 text-white' : 'border-white/10 text-slate-300'
                      }`}
                    >
                      <Building2 className="w-4 h-4 text-[#C6922D]" />
                      <span>Direct Bank Transfer</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('qr_digital')}
                      className={`p-3 rounded-lg border text-left flex items-center gap-2 ${
                        paymentMethod === 'qr_digital' ? 'border-[#C6922D] bg-[#C6922D]/10 text-white' : 'border-white/10 text-slate-300'
                      }`}
                    >
                      <Zap className="w-4 h-4 text-[#C6922D]" />
                      <span>QRPh / Digital Wallet</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('invoice')}
                      className={`p-3 rounded-lg border text-left flex items-center gap-2 ${
                        paymentMethod === 'invoice' ? 'border-[#C6922D] bg-[#C6922D]/10 text-white' : 'border-white/10 text-slate-300'
                      }`}
                    >
                      <FileText className="w-4 h-4 text-[#C6922D]" />
                      <span>Corporate Invoice</span>
                    </button>
                  </div>
                </div>

                {/* Affirmative Legal Consents */}
                <div className="space-y-3 mb-6 text-xs text-slate-300 border-t border-white/10 pt-4">
                  <label className="flex items-start gap-2.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={acceptedTerms}
                      onChange={(e) => setAcceptedTerms(e.target.checked)}
                      className="mt-0.5 accent-[#C6922D]"
                    />
                    <span>
                      I affirm that I am subscribing to <strong>LDL Dhenze Builder AI</strong>, an independent company service.
                      I acknowledge that this is not an official ChatGPT subscription, and I accept the platform terms.
                    </span>
                  </label>

                  <label className="flex items-start gap-2.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={acceptedDisclaimer}
                      onChange={(e) => setAcceptedDisclaimer(e.target.checked)}
                      className="mt-0.5 accent-[#C6922D]"
                    />
                    <span>
                      I understand that all AI-generated architectural layouts and engineering estimates represent preliminary conceptual drafts
                      and require professional evaluation by PRC-licensed practitioners prior to construction or permitting.
                    </span>
                  </label>
                </div>

                {/* Checkout CTA */}
                <button
                  disabled={!acceptedTerms || !acceptedDisclaimer}
                  onClick={handleSimulatePayment}
                  className="w-full py-3.5 bg-[#C6922D] hover:bg-[#d8a339] disabled:opacity-40 disabled:cursor-not-allowed text-[#071A2F] text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-xl flex items-center justify-center gap-2"
                >
                  <Lock className="w-4 h-4" />
                  <span>Confirm Subscription & Authorize Credits</span>
                </button>
              </div>
            )}

            {checkoutStep === 'processing' && (
              <div className="py-16 text-center">
                <div className="w-12 h-12 border-4 border-[#C6922D] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                <h4 className="text-lg font-bold text-white mb-2">Creating Idempotent Payment Session...</h4>
                <p className="text-xs text-slate-400">
                  Verifying server-side pricing version, creating credit wallet allocation, and recording immutable audit event.
                </p>
              </div>
            )}

            {checkoutStep === 'success' && (
              <div className="py-8 text-center space-y-4">
                <div className="w-16 h-16 bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 rounded-full flex items-center justify-center mx-auto shadow-xl">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="text-2xl font-extrabold text-white">Subscription Successfully Activated</h4>
                <p className="text-xs text-slate-300 max-w-md mx-auto leading-relaxed">
                  Your account has been upgraded to <strong>{checkoutModalPlan.name}</strong>.
                  Monthly Builder Credits have been deposited into your active credit wallet with full server-side entitlement enforcement.
                </p>

                <div className="bg-[#051322] border border-white/10 rounded-xl p-4 text-xs font-mono text-left max-w-sm mx-auto space-y-1">
                  <div className="text-slate-400">Session ID: CHK-{Date.now().toString().slice(-8)}</div>
                  <div className="text-slate-400">Plan: {checkoutModalPlan.name}</div>
                  <div className="text-[#C6922D]">
                    Allocated Credits: +{checkoutModalPlan.allowance.monthlyCredits.toLocaleString()}
                  </div>
                  <div className="text-emerald-400">Status: ACTIVE (Server Verified)</div>
                </div>

                <div className="pt-4 flex justify-center gap-3">
                  <button
                    onClick={() => {
                      setCheckoutModalPlan(null);
                      onOpenAssistant();
                    }}
                    className="px-6 py-2.5 bg-[#C6922D] text-[#071A2F] text-xs font-bold uppercase tracking-wider rounded-xl shadow-lg"
                  >
                    Open Builder Assistant
                  </button>
                  <button
                    onClick={() => {
                      setCheckoutModalPlan(null);
                      onNavigate('portal');
                    }}
                    className="px-6 py-2.5 bg-white/10 text-white text-xs font-bold uppercase tracking-wider rounded-xl hover:bg-white/20"
                  >
                    Manage in Billing Portal
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* TOP-UP MODAL */}
      {topUpModalOpen && selectedTopUp && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#071A2F] border border-[#C6922D]/40 rounded-3xl max-w-md w-full p-6 sm:p-7 shadow-2xl relative">
            <button
              onClick={() => setTopUpModalOpen(false)}
              className="absolute top-5 right-5 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            {!topUpSuccess ? (
              <div>
                <div className="text-xs font-bold text-[#C6922D] uppercase tracking-wider mb-1">
                  Prepaid Add-On Pack
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{selectedTopUp.name}</h3>
                <p className="text-xs text-slate-300 mb-4">{selectedTopUp.description}</p>

                <div className="bg-[#051322] border border-white/10 rounded-xl p-4 my-4 space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Add-On Credits:</span>
                    <span className="font-mono text-[#C6922D] font-bold">+{selectedTopUp.credits.toLocaleString()} Credits</span>
                  </div>
                  <div className="flex justify-between text-white font-bold pt-2 border-t border-white/5">
                    <span>Payable Total:</span>
                    <span className="font-mono text-emerald-400">USD ${selectedTopUp.priceUSD}</span>
                  </div>
                </div>

                <button
                  onClick={() => setTopUpSuccess(true)}
                  className="w-full py-3 bg-[#C6922D] hover:bg-[#d8a339] text-[#071A2F] text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-md"
                >
                  Authorize Purchase & Top Up Wallet
                </button>
              </div>
            ) : (
              <div className="py-6 text-center space-y-3">
                <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
                <h4 className="text-lg font-bold text-white">Credits Added to Wallet</h4>
                <p className="text-xs text-slate-300">
                  +{selectedTopUp.credits.toLocaleString()} Builder Credits have been credited to your active wallet balance.
                </p>
                <button
                  onClick={() => setTopUpModalOpen(false)}
                  className="px-6 py-2 bg-[#C6922D] text-[#071A2F] text-xs font-bold uppercase tracking-wider rounded-lg"
                >
                  Done
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ENTERPRISE CUSTOM PROPOSAL MODAL */}
      {enterpriseModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#071A2F] border border-white/20 rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative my-8">
            <button
              onClick={() => {
                setEnterpriseModalOpen(false);
                setEnterpriseSubmitted(false);
              }}
              className="absolute top-6 right-6 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            {!enterpriseSubmitted ? (
              <div>
                <div className="text-xs font-bold text-[#C6922D] uppercase tracking-wider mb-1">
                  Institutional Architecture
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Request Enterprise AI Proposal</h3>
                <p className="text-xs text-slate-300 mb-6 leading-relaxed">
                  Enterprise deployments are configured to your multi-department hierarchy, dedicated private knowledge repository,
                  and corporate governance requirements.
                </p>

                <div className="space-y-4 text-xs">
                  <div>
                    <label className="block text-slate-400 mb-1">Number of Organization Users / Project Teams</label>
                    <input
                      type="number"
                      min={10}
                      max={500}
                      value={enterpriseUsers}
                      onChange={(e) => setEnterpriseUsers(Number(e.target.value))}
                      className="w-full bg-[#051322] border border-white/10 rounded-lg p-2.5 text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-400 mb-1">Service Level Agreement (SLA) Requirement</label>
                    <select
                      value={enterpriseSla}
                      onChange={(e) => setEnterpriseSla(e.target.value)}
                      className="w-full bg-[#051322] border border-white/10 rounded-lg p-2.5 text-white"
                    >
                      <option>99.9% Uptime SLA with 1-Hour Critical Response</option>
                      <option>99.95% High-Availability SLA with Dedicated Account Director</option>
                      <option>Custom Private Cloud Hybrid Deployment with On-Premises Connector</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-slate-400 mb-1">Organization / Developer Entity</label>
                    <input
                      type="text"
                      placeholder="e.g. Luzon Infrastructure Conglomerate Corp."
                      className="w-full bg-[#051322] border border-white/10 rounded-lg p-2.5 text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-400 mb-1">Executive Contact Email</label>
                    <input
                      type="email"
                      placeholder="executive@company.com"
                      className="w-full bg-[#051322] border border-white/10 rounded-lg p-2.5 text-white"
                    />
                  </div>
                </div>

                <div className="pt-6 border-t border-white/10 mt-6">
                  <button
                    onClick={() => setEnterpriseSubmitted(true)}
                    className="w-full py-3 bg-[#C6922D] hover:bg-[#d8a339] text-[#071A2F] text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-lg"
                  >
                    Submit Enterprise Specification for Formal Quotation
                  </button>
                  <p className="text-[10px] text-slate-400 text-center mt-2">
                    Our technical solutions architect will respond within 1 business day with formal contract terms.
                  </p>
                </div>
              </div>
            ) : (
              <div className="py-8 text-center space-y-4">
                <div className="w-14 h-14 bg-[#C6922D]/20 text-[#C6922D] border border-[#C6922D]/40 rounded-full flex items-center justify-center mx-auto">
                  <Briefcase className="w-7 h-7" />
                </div>
                <h4 className="text-xl font-bold text-white">Quotation Specification Registered</h4>
                <p className="text-xs text-slate-300 max-w-sm mx-auto leading-relaxed">
                  Your custom enterprise parameters for <strong>{enterpriseUsers} users</strong> and chosen SLA have been submitted.
                  Reference Number: <span className="font-mono text-[#C6922D]">LDL-ENT-{Date.now().toString().slice(-6)}</span>
                </p>
                <button
                  onClick={() => {
                    setEnterpriseModalOpen(false);
                    setEnterpriseSubmitted(false);
                  }}
                  className="px-6 py-2 bg-white/10 text-white text-xs font-bold uppercase tracking-wider rounded-lg hover:bg-white/20"
                >
                  Close
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
