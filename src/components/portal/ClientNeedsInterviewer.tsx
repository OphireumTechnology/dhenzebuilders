import React, { useState } from 'react';
import {
  FileText,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  Building2,
  MapPin,
  Compass,
  Hammer,
  DollarSign,
  ClipboardList,
  ChevronRight,
  ChevronLeft,
  Printer,
  Copy,
  Download,
  ShieldCheck,
  Zap,
  Clock,
  Layers,
  HelpCircle,
  RefreshCw,
  FolderKanban,
  Check,
} from 'lucide-react';
import { ClientInterviewAnswers, ClientNeedsNarrativeReport } from '../../types/clientPortal';

interface ClientNeedsInterviewerProps {
  onApplyReportToProject?: (report: ClientNeedsNarrativeReport, answers: ClientInterviewAnswers) => void;
  portalTheme?: 'dark' | 'light';
  clientOrganizationName?: string;
  activeProjectTitle?: string;
}

const DEFAULT_INTERVIEW_ANSWERS: ClientInterviewAnswers = {
  clientIntent: 'BUILD_PRIVATE_RESIDENCE',
  decisionMakingRole: 'MANAGING_PARTNER',
  projectMotivation:
    'Develop an upscale, climate-resilient 2-storey residential villa cluster with integrated solar microgrid, sustainable rainwater harvesting, and premium architectural finishes for executive long-term family estate and rental.',
  propertyLocation: {
    province: 'Pampanga',
    city: 'Angeles City',
    barangay: 'Anunas',
    subdivisionOrZone: 'Fil-Am Friendship Enclave Zone',
  },
  lotAreaSqM: 1250,
  lotCondition: 'GRADED_WITH_UTILITIES',
  titleOwnershipStatus: 'CLEAN_TCT_ON_HAND',
  tctNumber: 'TCT-040-2023004812',
  accessRoadWidthMeters: 10,
  utilityReadiness: {
    gridElectricityAvailable: true,
    potableWaterSupplyAvailable: true,
    drainageOutfallAvailable: true,
    telecomFiberAvailable: true,
  },
  buildingClassification: 'RESIDENTIAL_ESTATE',
  targetGrossFloorAreaSqM: 680,
  numberOfStoreys: 2,
  numberOfBedroomsOrUnits: 5,
  parkingSlotsRequired: 4,
  specialProgramFeatures: [
    'Solar PV + BESS Microgrid',
    'Rainwater Cistern 20,000L',
    'Swimming Pool & Cabana',
    'Home Automation & VRF HVAC',
    'High-Ceiling Double-Height Foyer',
  ],
  architecturalStylePreference: 'MODERN_TROPICAL',
  structuralSystemPreference: 'REINFORCED_CONCRETE_FRAME',
  mepfsRequirements: {
    backupGeneratorRequired: true,
    solarPVSystemRequired: true,
    rainwaterHarvestingSystem: true,
    centralAirConditioningVRF: true,
    fireSprinklerSystemRequired: false,
    sewageTreatmentPlantSTP: true,
    smartBuildingAutomation: true,
  },
  soilInvestigationStatus: 'SOIL_TEST_COMPLETED',
  lookingForContractorType: 'EPC_DESIGN_BUILD_TURNKEY',
  preferredPcabLicenseGrade: 'CATEGORY_AA_A',
  procurementMethod: 'COMPETITIVE_INVITED_BIDDING',
  targetContractorMobilizationDays: 20,
  mandatoryContractorRequirements: [
    'DOLE Accredited Safety Officer (COSH)',
    'PRC Licensed Project Civil Engineer on site',
    'Proven Track Record in High-End Residential or Commercial (₱30M+)',
    'Comprehensive All-Risk Insurance (CARI)',
  ],
  targetBudgetPHP: 32000000,
  fundingSource: 'SELF_FUNDED_CASH',
  commercialPaymentStructure: 'PROGRESS_BILLING_10_PERCENT_RETENTION',
  targetConstructionStartDate: '2026-11-01',
  targetCompletionDate: '2027-10-31',
  existingDocumentsStatus: {
    architecturalPlans: 'COMPLETE_SIGNED_SEALED',
    structuralPlans: 'COMPLETE_SIGNED_SEALED',
    mepfsPlans: 'IN_PROGRESS',
    boqCostEstimate: 'DETAILED_BOQ_AVAILABLE',
    buildingPermits: 'APPLICATION_FILED',
  },
  additionalSpecificNotes:
    'Client prioritizes energy self-reliance, high concrete durability (minimum 4,000 psi for structural slabs), and strict dual-custody verification of all material delivery certificates.',
};

export const ClientNeedsInterviewer: React.FC<ClientNeedsInterviewerProps> = ({
  onApplyReportToProject,
  portalTheme = 'dark',
  clientOrganizationName = 'Angeles Villa Holdings Group',
  activeProjectTitle = 'Angeles City Residential Villa Cluster',
}) => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [answers, setAnswers] = useState<ClientInterviewAnswers>(DEFAULT_INTERVIEW_ANSWERS);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [narrativeReport, setNarrativeReport] = useState<ClientNeedsNarrativeReport | null>(() =>
    generateReportFromAnswers(DEFAULT_INTERVIEW_ANSWERS, clientOrganizationName, activeProjectTitle)
  );
  const [copied, setCopied] = useState<boolean>(false);
  const [appliedSuccess, setAppliedSuccess] = useState<boolean>(false);

  const isLight = portalTheme === 'light';
  const cardBg = isLight ? 'bg-white border-slate-200 text-slate-900 shadow-sm' : 'bg-[#09223d] border-white/10 text-slate-100';
  const headerText = isLight ? 'text-slate-900' : 'text-white';
  const mutedText = isLight ? 'text-slate-500' : 'text-slate-400';
  const inputBg = isLight ? 'bg-slate-50 border-slate-300 text-slate-900' : 'bg-[#051322] border-white/10 text-white';

  const totalSteps = 7;

  function generateReportFromAnswers(
    data: ClientInterviewAnswers,
    orgName: string,
    projTitle: string
  ): ClientNeedsNarrativeReport {
    const costPerSqM = Math.round(data.targetBudgetPHP / Math.max(data.targetGrossFloorAreaSqM, 1));
    const contingency = Math.round(data.targetBudgetPHP * 0.08); // 8% standard Philippine contingency

    // Compute derived readiness based on actual answers
    let planningScore = 90;
    let ownershipScore = data.titleOwnershipStatus === 'CLEAN_TCT_ON_HAND' ? 100 : 60;
    let designScore =
      data.existingDocumentsStatus.architecturalPlans === 'COMPLETE_SIGNED_SEALED' &&
      data.existingDocumentsStatus.structuralPlans === 'COMPLETE_SIGNED_SEALED'
        ? 88
        : data.existingDocumentsStatus.architecturalPlans === 'DRAFT_SCHEMATICS_ONLY'
        ? 50
        : 25;
    let boqScore =
      data.existingDocumentsStatus.boqCostEstimate === 'DETAILED_BOQ_AVAILABLE'
        ? 95
        : data.existingDocumentsStatus.boqCostEstimate === 'ROUGH_ESTIMATE_ONLY'
        ? 55
        : 20;
    let budgetScore = data.targetBudgetPHP > 0 && data.fundingSource ? 95 : 40;
    let permitsScore =
      data.existingDocumentsStatus.buildingPermits === 'APPROVED_BUILDING_PERMIT'
        ? 100
        : data.existingDocumentsStatus.buildingPermits === 'APPLICATION_FILED'
        ? 65
        : 20;
    let procurementScore =
      data.lookingForContractorType && data.preferredPcabLicenseGrade ? 80 : 35;

    const overallScore = Math.round(
      (planningScore + ownershipScore + designScore + boqScore + budgetScore + permitsScore + procurementScore) / 7
    );

    const criticalMissing: string[] = [];
    if (data.existingDocumentsStatus.mepfsPlans !== 'COMPLETE_SIGNED_SEALED') {
      criticalMissing.push('Final MEPFS (Mechanical, Electrical, Plumbing, Sanitary) Signed & Sealed plans for LGU permit clearance');
    }
    if (data.existingDocumentsStatus.buildingPermits !== 'APPROVED_BUILDING_PERMIT') {
      criticalMissing.push('Official LGU Building Permit issued by City Building Official (OBO)');
    }
    if (data.soilInvestigationStatus !== 'SOIL_TEST_COMPLETED') {
      criticalMissing.push('Geotechnical Soil Boring Test (Minimum 2 boreholes, 10m depth) for foundation design certification');
    }
    if (data.existingDocumentsStatus.boqCostEstimate !== 'DETAILED_BOQ_AVAILABLE') {
      criticalMissing.push('Standardized Bill of Quantities (BOQ) with unit quantities before tender release');
    }

    let budgetAdequacy: 'OPTIMAL' | 'TIGHT_REQUIRES_VALUE_ENGINEERING' | 'GENEROUS_PREMIUM_FINISHES' = 'OPTIMAL';
    if (costPerSqM < 32000) {
      budgetAdequacy = 'TIGHT_REQUIRES_VALUE_ENGINEERING';
    } else if (costPerSqM > 52000) {
      budgetAdequacy = 'GENEROUS_PREMIUM_FINISHES';
    }

    return {
      id: `NARRATIVE-${Date.now()}`,
      generatedAt: new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }),
      projectReference: 'PROJECT-2026-000001',
      clientName: orgName,
      projectTitle: projTitle,
      executiveSummary: `The client organization ${orgName} seeks to execute "${projTitle}" located at ${data.propertyLocation.barangay}, ${data.propertyLocation.city}, ${data.propertyLocation.province}. The intent is to develop a high-performance ${data.numberOfStoreys}-storey ${data.buildingClassification.replace(/_/g, ' ').toLowerCase()} spanning approximately ${data.targetGrossFloorAreaSqM.toLocaleString()} m² of gross building area on a ${data.lotAreaSqM.toLocaleString()} m² parcel with ${data.titleOwnershipStatus.replace(/_/g, ' ').toLowerCase()}. The client has established a target development budget of ₱${data.targetBudgetPHP.toLocaleString()} funded via ${data.fundingSource.replace(/_/g, ' ').toLowerCase()}, and is seeking an accredited Philippine contractor under an ${data.lookingForContractorType.replace(/_/g, ' ')} arrangement to mobilize within ${data.targetContractorMobilizationDays} days of contract execution.`,
      spatialAndFunctionalNeeds: [
        `${data.numberOfStoreys}-storey architectural massing with ${data.targetGrossFloorAreaSqM.toLocaleString()} m² total gross floor area`,
        `${data.numberOfBedroomsOrUnits} master suites / habitable space units tailored to private executive occupancy`,
        `${data.parkingSlotsRequired} covered dedicated vehicular parking bays with direct access to ${data.accessRoadWidthMeters}m road right-of-way`,
        ...data.specialProgramFeatures,
        `Architectural aesthetic themed in ${data.architecturalStylePreference.replace(/_/g, ' ').toLowerCase()} with passive cooling overhangs and cross-ventilation`,
      ],
      engineeringAndComplianceMandates: [
        {
          statutoryCode: 'PD 1096 (National Building Code of the Philippines)',
          description: 'Zoning compliance, floor-to-lot area ratio (FLAR), setbacks, and firewalls for residential/commercial zoning.',
          complianceAction: 'Ensure architectural drawings comply with minimum 3.0m front and 2.0m rear/side property line setbacks.',
        },
        {
          statutoryCode: 'NSCP 2015 Vol. 1 (National Structural Code of the Philippines)',
          description: 'Seismic Zone 4 design parameters, wind loading of 270 kph for Central Luzon, and structural concrete specification.',
          complianceAction: 'Structural design must specify minimum 28-day cylinder compressive strength f\'c = 28 MPa (4,000 psi) and Grade 60 rebar.',
        },
        {
          statutoryCode: 'RA 9514 (Fire Code of the Philippines of 2008)',
          description: 'Egress paths, fire door ratings, emergency lighting, and Fire Safety Evaluation Clearance (FSEC).',
          complianceAction: 'Procure official FSEC from Bureau of Fire Protection (BFP) prior to building permit issuance.',
        },
        {
          statutoryCode: 'RA 9266 & RA 544 (Professional Practice Acts)',
          description: 'Mandatory signing and sealing of all working drawings by PRC-licensed Registered Architects and Civil Engineers.',
          complianceAction: 'All tender drawings must carry valid PRC license numbers, PTR receipts, and active professional seals.',
        },
      ],
      recommendedContractorProfile: {
        pcabCategory: data.preferredPcabLicenseGrade.replace(/_/g, ' '),
        deliveryModel: data.lookingForContractorType.replace(/_/g, ' '),
        recommendedContractType: data.commercialPaymentStructure.replace(/_/g, ' '),
        keyPersonnelNeeded: [
          'Full-Time Resident Civil/Structural Project Engineer (PRC Licensed)',
          'Safety Officer 2 / 3 (DOLE-BWC Certified under OSH Standards)',
          'Materials & Quality Control Engineer (DPWH Accredited or equivalent)',
          'Master Plumber & Registered Master Electrician (PRC)',
        ],
        contractorInspectionMandate:
          'Contractor must submit daily weather & manpower logs, cylinder compressive break reports at 7, 14, and 28 days, and mil-test mill certificates for all reinforcing steel.',
      },
      projectReadinessAssessment: {
        overallReadinessPercent: overallScore,
        planningReadiness: planningScore,
        ownershipReadiness: ownershipScore,
        designReadiness: designScore,
        boqReadiness: boqScore,
        budgetReadiness: budgetScore,
        permitsReadiness: permitsScore,
        procurementReadiness: procurementScore,
        criticalMissingItems: criticalMissing,
      },
      financialBenchmarking: {
        estimatedFloorAreaSqM: data.targetGrossFloorAreaSqM,
        targetBudgetPHP: data.targetBudgetPHP,
        estimatedCostPerSqMPHP: costPerSqM,
        marketBenchmarkPerSqMPHP: '₱42,000 – ₱52,000 / m² (High-End Finished Villa with MEPFS)',
        budgetAdequacyStatus: budgetAdequacy,
        recommendedContingencyPHP: contingency,
      },
      procurementRoadmapSteps: [
        {
          stepNumber: 1,
          title: 'Finalize Controlled Bidding Package',
          action: 'Assemble signed architectural, structural, and MEPFS drawings, technical specs, and unpriced BOQ.',
          timeframe: 'Days 1 – 7',
          mandatoryPrecondition: 'Approved detailed engineering plans.',
        },
        {
          stepNumber: 2,
          title: 'Issue Invitation to Bid & Site Inspection',
          action: 'Distribute controlled digital tender package to 3-5 pre-qualified PCAB contractors; conduct site inspection.',
          timeframe: 'Days 8 – 14',
          mandatoryPrecondition: 'Clear property boundary markers and access right-of-way confirmed.',
        },
        {
          stepNumber: 3,
          title: 'Bid Submission & Technical / Commercial Evaluation',
          action: 'Lock bid room; perform side-by-side BOQ price normalization and contractor qualification scoring.',
          timeframe: 'Days 15 – 24',
          mandatoryPrecondition: 'Minimum 2 competitive bids received under sealed submission.',
        },
        {
          stepNumber: 4,
          title: 'Contract Award & Notice to Proceed',
          action: 'Finalize Construction Agreement, verify CARI insurance and 10% performance bond, issue Notice to Proceed (NTP).',
          timeframe: 'Days 25 – 30',
          mandatoryPrecondition: 'LGU Building Permit in hand or conditional notice issued.',
        },
      ],
    };
  }

  const handleRunSynthesis = () => {
    setIsGenerating(true);
    setTimeout(() => {
      const report = generateReportFromAnswers(answers, clientOrganizationName, activeProjectTitle);
      setNarrativeReport(report);
      setIsGenerating(false);
    }, 700);
  };

  const handleCopyReport = () => {
    if (!narrativeReport) return;
    const textToCopy = `
LDL DHENZE RESIDENTIAL BUILDING CONSTRUCTION
CLIENT PROJECT NEEDS & PROCUREMENT NARRATIVE ASSESSMENT
======================================================
Project Title: ${narrativeReport.projectTitle}
Client: ${narrativeReport.clientName}
Reference: ${narrativeReport.projectReference}
Date: ${narrativeReport.generatedAt}

1. EXECUTIVE SUMMARY
--------------------
${narrativeReport.executiveSummary}

2. SPATIAL & PROGRAM NEEDS
--------------------------
${narrativeReport.spatialAndFunctionalNeeds.map((item) => `• ${item}`).join('\n')}

3. STATUTORY COMPLIANCE & CODES
-------------------------------
${narrativeReport.engineeringAndComplianceMandates
  .map((m) => `[${m.statutoryCode}]\n${m.description}\nAction: ${m.complianceAction}\n`)
  .join('\n')}

4. RECOMMENDED CONTRACTOR PROFILE
---------------------------------
• Required PCAB Grade: ${narrativeReport.recommendedContractorProfile.pcabCategory}
• Delivery Model: ${narrativeReport.recommendedContractorProfile.deliveryModel}
• Commercial Terms: ${narrativeReport.recommendedContractorProfile.recommendedContractType}
• Key Personnel: ${narrativeReport.recommendedContractorProfile.keyPersonnelNeeded.join(', ')}

5. READINESS SCORE: ${narrativeReport.projectReadinessAssessment.overallReadinessPercent}%
------------------------------------------------------
Critical Missing Items:
${narrativeReport.projectReadinessAssessment.criticalMissingItems.map((c) => `• ${c}`).join('\n')}

6. FINANCIAL BENCHMARK
----------------------
• Target Budget: ₱${narrativeReport.financialBenchmarking.targetBudgetPHP.toLocaleString()}
• Unit Rate: ₱${narrativeReport.financialBenchmarking.estimatedCostPerSqMPHP.toLocaleString()} / m²
• Market Benchmark: ${narrativeReport.financialBenchmarking.marketBenchmarkPerSqMPHP}
• Contingency Reserve: ₱${narrativeReport.financialBenchmarking.recommendedContingencyPHP.toLocaleString()} (8%)
    `.trim();

    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleApplyToProject = () => {
    if (!narrativeReport) return;
    if (onApplyReportToProject) {
      onApplyReportToProject(narrativeReport, answers);
    }
    setAppliedSuccess(true);
    setTimeout(() => setAppliedSuccess(false), 4000);
  };

  const toggleSpecialFeature = (feat: string) => {
    setAnswers((prev) => {
      const exists = prev.specialProgramFeatures.includes(feat);
      return {
        ...prev,
        specialProgramFeatures: exists
          ? prev.specialProgramFeatures.filter((f) => f !== feat)
          : [...prev.specialProgramFeatures, feat],
      };
    });
  };

  return (
    <div className="space-y-8">
      {/* Header & Purpose Banner */}
      <div className={`p-6 sm:p-8 rounded-3xl border ${cardBg}`}>
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-white/10">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#C6922D]/20 text-[#C6922D] border border-[#C6922D]/40">
                Client Needs Discovery Engine
              </span>
              <span className="text-xs text-slate-400 font-mono">PHILIPPINE BUILDING CODE READY</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mt-2">
              Project Needs Interviewer & Narrative Assessment
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl leading-relaxed">
              Answer the structured technical questionnaire below. Our system synthesizes your exact spatial,
              engineering, procurement, and budget requirements into an authoritative narrative assessment report to
              accurately pinpoint contractor specifications.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => {
                setAnswers(DEFAULT_INTERVIEW_ANSWERS);
                handleRunSynthesis();
              }}
              className="px-3.5 py-2 rounded-xl text-xs font-semibold border border-white/10 hover:bg-white/5 text-slate-300 flex items-center gap-2 transition-colors"
            >
              <RefreshCw className="w-3.5 h-3.5 text-[#C6922D]" />
              <span>Reset to Standard Villa Template</span>
            </button>
            <button
              onClick={handleRunSynthesis}
              className="px-4 py-2.5 rounded-xl bg-[#C6922D] hover:bg-[#d8a339] text-[#071A2F] font-bold text-xs uppercase tracking-wider flex items-center gap-2 transition-all shadow-lg"
            >
              <Sparkles className="w-4 h-4" />
              <span>{isGenerating ? 'Synthesizing...' : 'Regenerate Narrative'}</span>
            </button>
          </div>
        </div>

        {/* Step Indicator Bar */}
        <div className="pt-6">
          <div className="flex items-center justify-between text-xs mb-2">
            <span className="text-slate-400 font-semibold">
              Step {currentStep} of {totalSteps}:{' '}
              <strong className="text-white">
                {currentStep === 1 && 'Client Intent & Profile'}
                {currentStep === 2 && 'Property & Site Reality'}
                {currentStep === 3 && 'Spatial & Program Requirements'}
                {currentStep === 4 && 'Engineering & Technical Standards'}
                {currentStep === 5 && 'Contractor Search & Procurement'}
                {currentStep === 6 && 'Budget & Commercial Terms'}
                {currentStep === 7 && 'Existing Technical Assets & Readiness'}
              </strong>
            </span>
            <span className="font-mono text-[#C6922D] font-bold">
              {Math.round((currentStep / totalSteps) * 100)}% Complete
            </span>
          </div>

          <div className="w-full bg-[#051322] h-2 rounded-full overflow-hidden border border-white/10">
            <div
              className="bg-gradient-to-r from-[#C6922D] to-amber-400 h-full transition-all duration-300 rounded-full"
              style={{ width: `${(currentStep / totalSteps) * 100}%` }}
            />
          </div>

          {/* Quick Step Buttons */}
          <div className="grid grid-cols-7 gap-1 mt-3">
            {[1, 2, 3, 4, 5, 6, 7].map((s) => (
              <button
                key={s}
                onClick={() => setCurrentStep(s)}
                className={`py-1.5 px-1 rounded text-[10px] font-bold uppercase transition-all ${
                  currentStep === s
                    ? 'bg-[#C6922D] text-[#071A2F]'
                    : currentStep > s
                    ? 'bg-emerald-950/60 text-emerald-400 border border-emerald-800/40'
                    : 'bg-white/5 text-slate-400 hover:text-white'
                }`}
              >
                S{s}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Two-Column Layout: Questionnaire on Left / Live Narrative on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Interactive Questionnaire Card (7 cols) */}
        <div className={`lg:col-span-7 p-6 sm:p-8 rounded-3xl border ${cardBg} space-y-6`}>
          {/* STEP 1: CLIENT INTENT */}
          {currentStep === 1 && (
            <div className="space-y-5 animate-in fade-in duration-200">
              <div className="flex items-center gap-2 text-[#C6922D]">
                <Building2 className="w-5 h-5" />
                <h3 className="text-lg font-bold text-white">Client Profile & Core Intent</h3>
              </div>
              <p className="text-xs text-slate-400">
                Specify your primary motivation and role in executing this development project.
              </p>

              <div>
                <label className="block text-xs font-semibold uppercase text-slate-300 mb-1.5">
                  Development Classification
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  {[
                    { id: 'BUILD_PRIVATE_RESIDENTIAL_CLUSTER', label: 'Private Residential / Estate' },
                    { id: 'COMMERCIAL_DEVELOPMENT', label: 'Commercial Building / Office' },
                    { id: 'INDUSTRIAL_WAREHOUSE', label: 'Industrial Logistics / Warehouse' },
                    { id: 'RESIDENTIAL_SUBDIVISION', label: 'Residential Subdivision' },
                    { id: 'INSTITUTIONAL_FACILITY', label: 'Hospital / School / Clinic' },
                    { id: 'RENOVATION_EXPANSION', label: 'Major Renovation & Fit-Out' },
                  ].map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setAnswers({ ...answers, clientIntent: item.id as any })}
                      className={`p-3 rounded-xl border text-left font-medium transition-all ${
                        answers.clientIntent === item.id
                          ? 'border-[#C6922D] bg-[#C6922D]/10 text-white font-bold'
                          : 'border-white/5 bg-[#051322] text-slate-300 hover:border-white/20'
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-slate-300 mb-1.5">
                  Your Decision-Making Role
                </label>
                <select
                  value={answers.decisionMakingRole}
                  onChange={(e) => setAnswers({ ...answers, decisionMakingRole: e.target.value as any })}
                  className={`w-full p-2.5 rounded-xl border text-xs ${inputBg}`}
                >
                  <option value="SOLE_OWNER">Direct Landowner / Sole Proprietary Owner</option>
                  <option value="MANAGING_PARTNER">Managing Partner / Family Office Trustee</option>
                  <option value="CORPORATE_COMMITTEE">Corporate Board / Investment Committee</option>
                  <option value="AUTHORIZED_REPRESENTATIVE">Authorized Representative via Special Power of Attorney (SPA)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-slate-300 mb-1.5">
                  Project Intent & Vision Summary
                </label>
                <textarea
                  rows={3}
                  value={answers.projectMotivation}
                  onChange={(e) => setAnswers({ ...answers, projectMotivation: e.target.value })}
                  placeholder="Explain what you want to achieve with this project..."
                  className={`w-full p-3 rounded-xl border text-xs focus:border-[#C6922D] focus:outline-none ${inputBg}`}
                />
              </div>
            </div>
          )}

          {/* STEP 2: SITE & PROPERTY REALITY */}
          {currentStep === 2 && (
            <div className="space-y-5 animate-in fade-in duration-200">
              <div className="flex items-center gap-2 text-[#C6922D]">
                <MapPin className="w-5 h-5" />
                <h3 className="text-lg font-bold text-white">Property Location & Site Reality</h3>
              </div>
              <p className="text-xs text-slate-400">
                Accurate land parameters ensure your contractor package specifies proper mobilization, foundation, and boundary clearance.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="block font-semibold uppercase text-slate-300 mb-1">Province</label>
                  <input
                    type="text"
                    value={answers.propertyLocation.province}
                    onChange={(e) =>
                      setAnswers({
                        ...answers,
                        propertyLocation: { ...answers.propertyLocation, province: e.target.value },
                      })
                    }
                    className={`w-full p-2.5 rounded-xl border ${inputBg}`}
                  />
                </div>
                <div>
                  <label className="block font-semibold uppercase text-slate-300 mb-1">City / Municipality</label>
                  <input
                    type="text"
                    value={answers.propertyLocation.city}
                    onChange={(e) =>
                      setAnswers({
                        ...answers,
                        propertyLocation: { ...answers.propertyLocation, city: e.target.value },
                      })
                    }
                    className={`w-full p-2.5 rounded-xl border ${inputBg}`}
                  />
                </div>
                <div>
                  <label className="block font-semibold uppercase text-slate-300 mb-1">Barangay</label>
                  <input
                    type="text"
                    value={answers.propertyLocation.barangay}
                    onChange={(e) =>
                      setAnswers({
                        ...answers,
                        propertyLocation: { ...answers.propertyLocation, barangay: e.target.value },
                      })
                    }
                    className={`w-full p-2.5 rounded-xl border ${inputBg}`}
                  />
                </div>
                <div>
                  <label className="block font-semibold uppercase text-slate-300 mb-1">Lot Area (Square Meters)</label>
                  <input
                    type="number"
                    value={answers.lotAreaSqM}
                    onChange={(e) => setAnswers({ ...answers, lotAreaSqM: Number(e.target.value) })}
                    className={`w-full p-2.5 rounded-xl border ${inputBg}`}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="block font-semibold uppercase text-slate-300 mb-1">Land Ownership & Title Status</label>
                  <select
                    value={answers.titleOwnershipStatus}
                    onChange={(e) => setAnswers({ ...answers, titleOwnershipStatus: e.target.value as any })}
                    className={`w-full p-2.5 rounded-xl border ${inputBg}`}
                  >
                    <option value="CLEAN_TCT_ON_HAND">Clean Transfer Certificate of Title (TCT)</option>
                    <option value="CCT_CONDOMINIUM">Condominium Certificate of Title (CCT)</option>
                    <option value="TCT_IN_TRANSFER">TCT in Process of Transfer / Estate Tax</option>
                    <option value="MORTGAGED_TO_BANK">TCT Mortgaged to Bank</option>
                    <option value="AGRICULTURAL_NEEDS_CONVERSION">Agricultural / Needs DAR Exemption</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold uppercase text-slate-300 mb-1">TCT or Tax Dec Number</label>
                  <input
                    type="text"
                    value={answers.tctNumber || ''}
                    placeholder="e.g. TCT-040-2023004812"
                    onChange={(e) => setAnswers({ ...answers, tctNumber: e.target.value })}
                    className={`w-full p-2.5 rounded-xl border ${inputBg}`}
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-slate-300 mb-1.5">
                  Available Utility Infrastructure on Site
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                  {[
                    { key: 'gridElectricityAvailable', label: 'Grid Electricity' },
                    { key: 'potableWaterSupplyAvailable', label: 'Potable Water' },
                    { key: 'drainageOutfallAvailable', label: 'Drainage Outfall' },
                    { key: 'telecomFiberAvailable', label: 'Fiber Telecom' },
                  ].map((u) => {
                    const active = (answers.utilityReadiness as any)[u.key];
                    return (
                      <button
                        key={u.key}
                        type="button"
                        onClick={() =>
                          setAnswers({
                            ...answers,
                            utilityReadiness: {
                              ...answers.utilityReadiness,
                              [u.key]: !active,
                            },
                          })
                        }
                        className={`p-2.5 rounded-xl border flex items-center justify-between text-[11px] ${
                          active
                            ? 'border-emerald-500/50 bg-emerald-950/40 text-emerald-300 font-bold'
                            : 'border-white/5 bg-[#051322] text-slate-400'
                        }`}
                      >
                        <span>{u.label}</span>
                        <CheckCircle2 className={`w-3.5 h-3.5 ${active ? 'text-emerald-400' : 'text-slate-600'}`} />
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: SPATIAL & PROGRAM REQUIREMENTS */}
          {currentStep === 3 && (
            <div className="space-y-5 animate-in fade-in duration-200">
              <div className="flex items-center gap-2 text-[#C6922D]">
                <Layers className="w-5 h-5" />
                <h3 className="text-lg font-bold text-white">Spatial & Program Requirements</h3>
              </div>
              <p className="text-xs text-slate-400">
                Define the physical scale, storeys, rooms, and special amenities needed by your project.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                <div>
                  <label className="block font-semibold uppercase text-slate-300 mb-1">Target Floor Area (m²)</label>
                  <input
                    type="number"
                    value={answers.targetGrossFloorAreaSqM}
                    onChange={(e) => setAnswers({ ...answers, targetGrossFloorAreaSqM: Number(e.target.value) })}
                    className={`w-full p-2.5 rounded-xl border ${inputBg}`}
                  />
                </div>
                <div>
                  <label className="block font-semibold uppercase text-slate-300 mb-1">No. of Storeys / Levels</label>
                  <input
                    type="number"
                    value={answers.numberOfStoreys}
                    onChange={(e) => setAnswers({ ...answers, numberOfStoreys: Number(e.target.value) })}
                    className={`w-full p-2.5 rounded-xl border ${inputBg}`}
                  />
                </div>
                <div>
                  <label className="block font-semibold uppercase text-slate-300 mb-1">Bedrooms / Suites</label>
                  <input
                    type="number"
                    value={answers.numberOfBedroomsOrUnits}
                    onChange={(e) => setAnswers({ ...answers, numberOfBedroomsOrUnits: Number(e.target.value) })}
                    className={`w-full p-2.5 rounded-xl border ${inputBg}`}
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-slate-300 mb-1.5">
                  Architectural Style Preference
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
                  {[
                    { id: 'MODERN_TROPICAL', label: 'Modern Tropical' },
                    { id: 'CONTEMPORARY_MINIMALIST', label: 'Contemporary Minimalist' },
                    { id: 'MEDITERRANEAN', label: 'Mediterranean / Tuscan' },
                    { id: 'INDUSTRIAL_MODERN', label: 'Industrial Modern' },
                    { id: 'HERITAGE_FILIPINO', label: 'Neo-Filipino Heritage' },
                  ].map((style) => (
                    <button
                      key={style.id}
                      type="button"
                      onClick={() => setAnswers({ ...answers, architecturalStylePreference: style.id as any })}
                      className={`p-2.5 rounded-xl border text-center ${
                        answers.architecturalStylePreference === style.id
                          ? 'border-[#C6922D] bg-[#C6922D]/15 text-white font-bold'
                          : 'border-white/5 bg-[#051322] text-slate-400 hover:text-white'
                      }`}
                    >
                      {style.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-slate-300 mb-1.5">
                  Special Features & Program Packages
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
                  {[
                    'Solar PV + BESS Microgrid',
                    'Rainwater Cistern 20,000L',
                    'Swimming Pool & Cabana',
                    'Home Automation & VRF HVAC',
                    'High-Ceiling Double-Height Foyer',
                    'Basement / Lower Ground Parking',
                    'Heavy-Duty Commercial Kitchen',
                    'Elevator / Lift Shaft Rough-In',
                    'Roof Deck Entertainment Pavilion',
                  ].map((feat) => {
                    const selected = answers.specialProgramFeatures.includes(feat);
                    return (
                      <button
                        key={feat}
                        type="button"
                        onClick={() => toggleSpecialFeature(feat)}
                        className={`p-2.5 rounded-xl border text-left flex items-center justify-between text-[11px] ${
                          selected
                            ? 'border-[#C6922D] bg-[#C6922D]/10 text-white font-semibold'
                            : 'border-white/5 bg-[#051322] text-slate-400 hover:text-slate-200'
                        }`}
                      >
                        <span className="truncate">{feat}</span>
                        {selected ? (
                          <Check className="w-3.5 h-3.5 text-[#C6922D] shrink-0 ml-1" />
                        ) : (
                          <div className="w-3.5 h-3.5 rounded-full border border-slate-600 shrink-0 ml-1" />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* STEP 4: ENGINEERING & TECHNICAL STANDARDS */}
          {currentStep === 4 && (
            <div className="space-y-5 animate-in fade-in duration-200">
              <div className="flex items-center gap-2 text-[#C6922D]">
                <Compass className="w-5 h-5" />
                <h3 className="text-lg font-bold text-white">Engineering & Technical Standards</h3>
              </div>
              <p className="text-xs text-slate-400">
                Philippine structural & MEPFS requirements dictate contractor equipment and civil engineering credentials.
              </p>

              <div>
                <label className="block text-xs font-semibold uppercase text-slate-300 mb-1.5">
                  Structural System Preference
                </label>
                <select
                  value={answers.structuralSystemPreference}
                  onChange={(e) => setAnswers({ ...answers, structuralSystemPreference: e.target.value as any })}
                  className={`w-full p-2.5 rounded-xl border text-xs ${inputBg}`}
                >
                  <option value="REINFORCED_CONCRETE_FRAME">Reinforced Concrete Frame (DPWH Grade 60 Rebar, 4,000 psi)</option>
                  <option value="STRUCTURAL_STEEL_COMPOSITE">Structural Steel Frame with Composite Slabs (Wide Flange)</option>
                  <option value="POST_TENSIONED_SLABS">Post-Tensioned Concrete (Long Span, Minimal Columns)</option>
                  <option value="PRECAST_MODULAR">Pre-Cast Reinforced Concrete Modular</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-slate-300 mb-1.5">
                  Soil Investigation & Geotechnical Test
                </label>
                <select
                  value={answers.soilInvestigationStatus}
                  onChange={(e) => setAnswers({ ...answers, soilInvestigationStatus: e.target.value as any })}
                  className={`w-full p-2.5 rounded-xl border text-xs ${inputBg}`}
                >
                  <option value="SOIL_TEST_COMPLETED">Soil Boring Test Completed (Report Available)</option>
                  <option value="NEED_CONTRACTOR_TO_PERFORM_SOIL_TEST">Require Contractor to Conduct Soil Boring Test</option>
                  <option value="UNKNOWN">Not Sure / Need Engineering Recommendation</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-slate-300 mb-1.5">
                  MEPFS (Mechanical, Electrical, Plumbing, Fire) Specifications
                </label>
                <div className="space-y-2 text-xs">
                  {[
                    { key: 'backupGeneratorRequired', label: 'Standby Diesel Generator Set (Automatic Transfer Switch)' },
                    { key: 'solarPVSystemRequired', label: 'Solar Rooftop Grid-Tie with Battery Energy Storage (BESS)' },
                    { key: 'rainwaterHarvestingSystem', label: 'Rainwater Filtration Cistern for Landscaping & Flush' },
                    { key: 'centralAirConditioningVRF', label: 'Variable Refrigerant Flow (VRF) High-Efficiency Inverter AC' },
                    { key: 'sewageTreatmentPlantSTP', label: 'On-site Sewage Treatment Plant / Eco-Septic System' },
                  ].map((m) => {
                    const active = (answers.mepfsRequirements as any)[m.key];
                    return (
                      <div
                        key={m.key}
                        onClick={() =>
                          setAnswers({
                            ...answers,
                            mepfsRequirements: {
                              ...answers.mepfsRequirements,
                              [m.key]: !active,
                            },
                          })
                        }
                        className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer transition-colors ${
                          active
                            ? 'border-emerald-500/50 bg-emerald-950/30 text-emerald-200'
                            : 'border-white/5 bg-[#051322] text-slate-400'
                        }`}
                      >
                        <span className="font-medium">{m.label}</span>
                        <div
                          className={`w-4 h-4 rounded border flex items-center justify-center ${
                            active ? 'bg-emerald-500 border-emerald-400 text-white' : 'border-slate-600'
                          }`}
                        >
                          {active && <Check className="w-3 h-3" />}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* STEP 5: CONTRACTOR SEARCH & PROCUREMENT */}
          {currentStep === 5 && (
            <div className="space-y-5 animate-in fade-in duration-200">
              <div className="flex items-center gap-2 text-[#C6922D]">
                <Hammer className="w-5 h-5" />
                <h3 className="text-lg font-bold text-white">Looking for Contractors: Scope & Qualifications</h3>
              </div>
              <p className="text-xs text-slate-400">
                This is where you specify the exact contractor credentials, PCAB licensing tier, and procurement method.
              </p>

              <div>
                <label className="block text-xs font-semibold uppercase text-slate-300 mb-1.5">
                  Contractor Delivery Arrangement
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  {[
                    {
                      id: 'EPC_DESIGN_BUILD_TURNKEY',
                      title: 'Full EPC Design-Build Turnkey',
                      desc: 'One firm handles detailed engineering, permits, procurement, construction & turnover.',
                    },
                    {
                      id: 'GENERAL_BUILDING_CONTRACTOR',
                      title: 'General Contractor (Construction Only)',
                      desc: 'Client provides signed architectural & structural drawings; contractor executes civil works.',
                    },
                    {
                      id: 'CIVIL_STRUCTURAL_ONLY',
                      title: 'Civil & Structural Shell Contractor',
                      desc: 'Contractor builds foundation, frame, slab and roof; finishes done separately.',
                    },
                    {
                      id: 'MEPFS_SPECIALTY_CONTRACTOR',
                      title: 'Specialty MEPFS / Trade Packages',
                      desc: 'Separate tenders for electrical, plumbing, solar microgrid, and HVAC.',
                    },
                  ].map((c) => (
                    <button
                      key={c.id}
                      type="button"
                      onClick={() => setAnswers({ ...answers, lookingForContractorType: c.id as any })}
                      className={`p-3 rounded-xl border text-left transition-all ${
                        answers.lookingForContractorType === c.id
                          ? 'border-[#C6922D] bg-[#C6922D]/10 text-white font-bold'
                          : 'border-white/5 bg-[#051322] text-slate-300 hover:border-white/20'
                      }`}
                    >
                      <div className="text-xs font-bold">{c.title}</div>
                      <div className="text-[10px] text-slate-400 mt-1">{c.desc}</div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="block font-semibold uppercase text-slate-300 mb-1">
                    Preferred PCAB License Tier
                  </label>
                  <select
                    value={answers.preferredPcabLicenseGrade}
                    onChange={(e) => setAnswers({ ...answers, preferredPcabLicenseGrade: e.target.value as any })}
                    className={`w-full p-2.5 rounded-xl border ${inputBg}`}
                  >
                    <option value="CATEGORY_AAAA_AAA">PCAB Category AAAA / AAA (Mega Scale)</option>
                    <option value="CATEGORY_AA_A">PCAB Category AA / A (₱15M – ₱100M Scale)</option>
                    <option value="CATEGORY_B_C">PCAB Category B / C (Up to ₱30M Projects)</option>
                    <option value="ANY_QUALIFIED_PCAB_CONTRACTOR">Any DTI/PCAB Registered Contractor</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold uppercase text-slate-300 mb-1">
                    Procurement Method
                  </label>
                  <select
                    value={answers.procurementMethod}
                    onChange={(e) => setAnswers({ ...answers, procurementMethod: e.target.value as any })}
                    className={`w-full p-2.5 rounded-xl border ${inputBg}`}
                  >
                    <option value="COMPETITIVE_INVITED_BIDDING">Competitive Invited Bidding (3-5 Contractors)</option>
                    <option value="DIRECT_NEGOTIATION">Direct Commercial Negotiation with Preferred Builder</option>
                    <option value="TWO_STAGE_DESIGN_BID_BUILD">Two-Stage Design-Bid-Build Tender</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-slate-300 mb-1.5">
                  Mandatory Contractor Site Credentials
                </label>
                <div className="space-y-1.5 text-xs text-slate-300">
                  {answers.mandatoryContractorRequirements.map((req, idx) => (
                    <div key={idx} className="flex items-center gap-2 p-2 bg-[#051322] border border-white/5 rounded-lg">
                      <ShieldCheck className="w-4 h-4 text-[#C6922D] shrink-0" />
                      <span>{req}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* STEP 6: BUDGET & FINANCING */}
          {currentStep === 6 && (
            <div className="space-y-5 animate-in fade-in duration-200">
              <div className="flex items-center gap-2 text-[#C6922D]">
                <DollarSign className="w-5 h-5" />
                <h3 className="text-lg font-bold text-white">Target Budget, Financing & Dates</h3>
              </div>
              <p className="text-xs text-slate-400">
                Clear financial and commercial terms prevent cost overruns and set proper progress billing retention rules.
              </p>

              <div>
                <label className="block text-xs font-semibold uppercase text-slate-300 mb-1">
                  Target Construction Budget (Philippine Peso - PHP)
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 text-slate-400 font-bold font-mono">₱</span>
                  <input
                    type="number"
                    value={answers.targetBudgetPHP}
                    onChange={(e) => setAnswers({ ...answers, targetBudgetPHP: Number(e.target.value) })}
                    className={`w-full p-2.5 pl-8 rounded-xl border text-sm font-mono font-bold ${inputBg}`}
                  />
                </div>
                <div className="flex justify-between items-center text-[11px] text-slate-400 mt-1">
                  <span>
                    Approx. ₱
                    {Math.round(answers.targetBudgetPHP / Math.max(answers.targetGrossFloorAreaSqM, 1)).toLocaleString()}{' '}
                    / m²
                  </span>
                  <span className="text-[#C6922D]">
                    Estimated Contingency (8%): ₱{Math.round(answers.targetBudgetPHP * 0.08).toLocaleString()}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="block font-semibold uppercase text-slate-300 mb-1">Funding Model</label>
                  <select
                    value={answers.fundingSource}
                    onChange={(e) => setAnswers({ ...answers, fundingSource: e.target.value as any })}
                    className={`w-full p-2.5 rounded-xl border ${inputBg}`}
                  >
                    <option value="SELF_FUNDED_CASH">Self-Funded Cash / Equity</option>
                    <option value="BANK_CONSTRUCTION_LOAN">Bank Construction Loan (Mortgage Drawdowns)</option>
                    <option value="CORPORATE_EQUITY">Corporate Development Allocation</option>
                    <option value="SYNDICATED_FINANCING">Syndicated / Co-Development Investment</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold uppercase text-slate-300 mb-1">Commercial Payment Terms</label>
                  <select
                    value={answers.commercialPaymentStructure}
                    onChange={(e) => setAnswers({ ...answers, commercialPaymentStructure: e.target.value as any })}
                    className={`w-full p-2.5 rounded-xl border ${inputBg}`}
                  >
                    <option value="PROGRESS_BILLING_10_PERCENT_RETENTION">
                      Progress Billing with 10% Statutory Retention
                    </option>
                    <option value="MILESTONE_BASED_LUMP_SUM">Milestone-Based Fixed Lump Sum</option>
                    <option value="COST_PLUS_PERCENTAGE">Cost Plus Fixed Fee / Open Book</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="block font-semibold uppercase text-slate-300 mb-1">Target Start Date</label>
                  <input
                    type="date"
                    value={answers.targetConstructionStartDate}
                    onChange={(e) => setAnswers({ ...answers, targetConstructionStartDate: e.target.value })}
                    className={`w-full p-2.5 rounded-xl border ${inputBg}`}
                  />
                </div>
                <div>
                  <label className="block font-semibold uppercase text-slate-300 mb-1">Target Completion Date</label>
                  <input
                    type="date"
                    value={answers.targetCompletionDate}
                    onChange={(e) => setAnswers({ ...answers, targetCompletionDate: e.target.value })}
                    className={`w-full p-2.5 rounded-xl border ${inputBg}`}
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 7: EXISTING TECHNICAL ASSETS */}
          {currentStep === 7 && (
            <div className="space-y-5 animate-in fade-in duration-200">
              <div className="flex items-center gap-2 text-[#C6922D]">
                <ClipboardList className="w-5 h-5" />
                <h3 className="text-lg font-bold text-white">Existing Technical Assets & Documentation</h3>
              </div>
              <p className="text-xs text-slate-400">
                Identify what you currently have so our system detects what missing documentation is required prior to contractor bidding.
              </p>

              <div className="space-y-3 text-xs">
                <div>
                  <label className="block font-semibold uppercase text-slate-300 mb-1">Architectural Plans</label>
                  <select
                    value={answers.existingDocumentsStatus.architecturalPlans}
                    onChange={(e) =>
                      setAnswers({
                        ...answers,
                        existingDocumentsStatus: {
                          ...answers.existingDocumentsStatus,
                          architecturalPlans: e.target.value as any,
                        },
                      })
                    }
                    className={`w-full p-2.5 rounded-xl border ${inputBg}`}
                  >
                    <option value="COMPLETE_SIGNED_SEALED">Complete, Signed & Sealed by PRC Registered Architect</option>
                    <option value="DRAFT_SCHEMATICS_ONLY">Draft Floor Plans / Concept Schematics Only</option>
                    <option value="NONE_START_FROM_SCRATCH">None / Need Architect to Design from Scratch</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold uppercase text-slate-300 mb-1">Structural Calculations & Plans</label>
                  <select
                    value={answers.existingDocumentsStatus.structuralPlans}
                    onChange={(e) =>
                      setAnswers({
                        ...answers,
                        existingDocumentsStatus: {
                          ...answers.existingDocumentsStatus,
                          structuralPlans: e.target.value as any,
                        },
                      })
                    }
                    className={`w-full p-2.5 rounded-xl border ${inputBg}`}
                  >
                    <option value="COMPLETE_SIGNED_SEALED">Complete, Signed & Sealed by PRC Civil/Structural Engineer</option>
                    <option value="IN_PROGRESS">Structural Computations In Progress</option>
                    <option value="NONE">None / Need Structural Engineering Package</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold uppercase text-slate-300 mb-1">Bill of Quantities (BOQ)</label>
                  <select
                    value={answers.existingDocumentsStatus.boqCostEstimate}
                    onChange={(e) =>
                      setAnswers({
                        ...answers,
                        existingDocumentsStatus: {
                          ...answers.existingDocumentsStatus,
                          boqCostEstimate: e.target.value as any,
                        },
                      })
                    }
                    className={`w-full p-2.5 rounded-xl border ${inputBg}`}
                  >
                    <option value="DETAILED_BOQ_AVAILABLE">Standard CSI/DPWH Detailed Bill of Quantities Ready</option>
                    <option value="ROUGH_ESTIMATE_ONLY">Rough Area-Based Estimate Only</option>
                    <option value="NONE_NEED_BILL_OF_QUANTITIES">None / Require Quantity Surveyor to Produce BOQ</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold uppercase text-slate-300 mb-1">LGU Building Permit Status</label>
                  <select
                    value={answers.existingDocumentsStatus.buildingPermits}
                    onChange={(e) =>
                      setAnswers({
                        ...answers,
                        existingDocumentsStatus: {
                          ...answers.existingDocumentsStatus,
                          buildingPermits: e.target.value as any,
                        },
                      })
                    }
                    className={`w-full p-2.5 rounded-xl border ${inputBg}`}
                  >
                    <option value="APPROVED_BUILDING_PERMIT">Approved Building Permit Issued</option>
                    <option value="APPLICATION_FILED">Application Filed with Local OBO / Processing</option>
                    <option value="NOT_YET_FILED">Not Yet Filed / Need Documentation Complete First</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* Stepper Navigation Buttons */}
          <div className="pt-4 border-t border-white/10 flex items-center justify-between">
            <button
              disabled={currentStep === 1}
              onClick={() => setCurrentStep((prev) => Math.max(prev - 1, 1))}
              className="px-4 py-2 rounded-xl text-xs font-semibold border border-white/10 hover:bg-white/5 text-slate-300 disabled:opacity-30 disabled:cursor-not-allowed flex items-center gap-1.5 transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Previous Step</span>
            </button>

            <div className="flex gap-2">
              {currentStep < totalSteps ? (
                <button
                  onClick={() => setCurrentStep((prev) => Math.min(prev + 1, totalSteps))}
                  className="px-5 py-2 rounded-xl bg-[#C6922D] hover:bg-[#d8a339] text-[#071A2F] font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 transition-colors shadow-md"
                >
                  <span>Next Step</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  onClick={handleRunSynthesis}
                  className="px-6 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider flex items-center gap-2 transition-all shadow-md"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Generate Report</span>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Right Column: Live Summary Narrative Report (5 cols) */}
        <div className={`lg:col-span-5 p-6 sm:p-7 rounded-3xl border ${cardBg} flex flex-col justify-between space-y-6`}>
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-[#C6922D]" />
                <div>
                  <h3 className="text-base font-bold text-white">Client Needs Narrative Report</h3>
                  <p className="text-[10px] text-slate-400 font-mono">AUTONOMOUS SYNTHESIS MEMORANDUM</p>
                </div>
              </div>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-950 text-emerald-300 border border-emerald-800">
                Official
              </span>
            </div>

            {narrativeReport ? (
              <div className="mt-4 space-y-4 text-xs leading-relaxed max-h-[640px] overflow-y-auto pr-1">
                {/* Executive Summary */}
                <div className="p-3.5 bg-[#051322] border border-white/5 rounded-2xl">
                  <div className="text-[10px] uppercase font-bold text-[#C6922D] tracking-wider mb-1">
                    1. Executive Summary
                  </div>
                  <p className="text-slate-300 text-xs leading-relaxed">{narrativeReport.executiveSummary}</p>
                </div>

                {/* Spatial Program Needs */}
                <div className="p-3.5 bg-[#051322] border border-white/5 rounded-2xl">
                  <div className="text-[10px] uppercase font-bold text-[#C6922D] tracking-wider mb-2">
                    2. Spatial & Program Needs
                  </div>
                  <ul className="space-y-1.5 text-slate-300">
                    {narrativeReport.spatialAndFunctionalNeeds.map((need, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{need}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Recommended Contractor Profile */}
                <div className="p-3.5 bg-[#051322] border border-[#C6922D]/30 rounded-2xl">
                  <div className="text-[10px] uppercase font-bold text-[#C6922D] tracking-wider mb-2">
                    3. Contractor Procurement Specification
                  </div>
                  <div className="space-y-1.5 text-[11px]">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Required PCAB Tier:</span>
                      <strong className="text-white">{narrativeReport.recommendedContractorProfile.pcabCategory}</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Delivery Model:</span>
                      <strong className="text-white">{narrativeReport.recommendedContractorProfile.deliveryModel}</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Commercial Terms:</span>
                      <strong className="text-white">
                        {narrativeReport.recommendedContractorProfile.recommendedContractType}
                      </strong>
                    </div>
                  </div>
                </div>

                {/* Readiness Gauge */}
                <div className="p-3.5 bg-[#051322] border border-white/5 rounded-2xl">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] uppercase font-bold text-[#C6922D] tracking-wider">
                      4. Readiness Score
                    </span>
                    <span className="text-sm font-black font-mono text-emerald-400">
                      {narrativeReport.projectReadinessAssessment.overallReadinessPercent}%
                    </span>
                  </div>
                  <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden mb-3">
                    <div
                      className="bg-emerald-500 h-full rounded-full"
                      style={{ width: `${narrativeReport.projectReadinessAssessment.overallReadinessPercent}%` }}
                    />
                  </div>

                  {narrativeReport.projectReadinessAssessment.criticalMissingItems.length > 0 && (
                    <div className="space-y-1 text-[11px] text-amber-300">
                      <div className="font-semibold text-amber-400 flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5" /> Action Required Before Bidding:
                      </div>
                      {narrativeReport.projectReadinessAssessment.criticalMissingItems.map((item, idx) => (
                        <div key={idx} className="text-slate-300 text-[10px] pl-4">
                          • {item}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Financial Benchmark */}
                <div className="p-3.5 bg-[#051322] border border-white/5 rounded-2xl">
                  <div className="text-[10px] uppercase font-bold text-[#C6922D] tracking-wider mb-2">
                    5. Financial Benchmarking
                  </div>
                  <div className="space-y-1 text-[11px]">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Target Budget:</span>
                      <span className="font-mono font-bold text-white">
                        ₱{narrativeReport.financialBenchmarking.targetBudgetPHP.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Estimated Cost / m²:</span>
                      <span className="font-mono font-bold text-emerald-400">
                        ₱{narrativeReport.financialBenchmarking.estimatedCostPerSqMPHP.toLocaleString()} / m²
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Contingency Reserve (8%):</span>
                      <span className="font-mono text-slate-300">
                        ₱{narrativeReport.financialBenchmarking.recommendedContingencyPHP.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="py-12 text-center text-slate-500 text-xs">
                Fill the questionnaire and click "Generate Narrative" to review your report.
              </div>
            )}
          </div>

          {/* Report Action Buttons */}
          <div className="pt-4 border-t border-white/10 space-y-2">
            {appliedSuccess && (
              <div className="p-2.5 rounded-xl bg-emerald-950/80 border border-emerald-500 text-emerald-200 text-xs flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Successfully applied narrative specifications to active project workspace!</span>
              </div>
            )}

            <div className="grid grid-cols-2 gap-2 text-xs">
              <button
                onClick={handleCopyReport}
                className="py-2.5 px-3 rounded-xl border border-white/10 hover:bg-white/5 text-slate-300 flex items-center justify-center gap-1.5 transition-colors font-semibold"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-[#C6922D]" />}
                <span>{copied ? 'Copied!' : 'Copy Text'}</span>
              </button>

              <button
                onClick={() => window.print()}
                className="py-2.5 px-3 rounded-xl border border-white/10 hover:bg-white/5 text-slate-300 flex items-center justify-center gap-1.5 transition-colors font-semibold"
              >
                <Printer className="w-3.5 h-3.5 text-[#C6922D]" />
                <span>Print / PDF</span>
              </button>
            </div>

            <button
              onClick={handleApplyToProject}
              className="w-full py-2.5 px-4 rounded-xl bg-[#C6922D] hover:bg-[#d8a339] text-[#071A2F] font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-md"
            >
              <FolderKanban className="w-4 h-4" />
              <span>Apply Specifications to Project Workspace</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
