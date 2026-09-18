/**
 * CLIENT PROJECT DEVELOPMENT & PROCUREMENT PORTAL
 * Data Types & Interfaces
 * Meets Master Build Command Sections 1-48
 */

export interface ClientProfile {
  id: string;
  organizationName: string;
  tradeName?: string;
  clientType: 'INDIVIDUAL_LANDOWNER' | 'PRIVATE_DEVELOPER' | 'CORPORATE_ENTERPRISE' | 'INSTITUTIONAL' | 'GOVERNMENT_LGU';
  authorizedRepresentative: {
    fullName: string;
    designation: string;
    email: string;
    phone: string;
    idType: 'PASSPORT' | 'PRC_LICENSE' | 'UMID' | 'DRIVERS_LICENSE' | 'NATIONAL_ID';
    idNumber: string;
  };
  taxIdentificationNumber: string;
  secOrDtiRegistrationNumber: string;
  officialAddress: {
    street: string;
    barangay: string;
    city: string;
    province: string;
    postalCode: string;
  };
  preferredProcurementMethod: 'EPC_DESIGN_BUILD' | 'GENERAL_CONTRACTOR_TRADITIONAL' | 'SPECIALTY_TRADE_PACKAGES';
  authorizationDocumentType: 'BOARD_RESOLUTION' | 'SECRETARY_CERTIFICATE' | 'SPECIAL_POWER_OF_ATTORNEY' | 'DIRECT_OWNER';
  verificationStatus: 'VERIFIED' | 'UNDER_REVIEW' | 'PENDING_UPLOAD';
  updatedAt: string;
}

export interface ClientInterviewAnswers {
  // Step 1: Client & Intent Profile
  clientIntent: 'BUILD_PRIVATE_RESIDENCE' | 'COMMERCIAL_DEVELOPMENT' | 'INDUSTRIAL_WAREHOUSE' | 'RESIDENTIAL_SUBDIVISION' | 'INSTITUTIONAL_FACILITY' | 'RENOVATION_EXPANSION';
  decisionMakingRole: 'SOLE_OWNER' | 'MANAGING_PARTNER' | 'CORPORATE_COMMITTEE' | 'AUTHORIZED_REPRESENTATIVE';
  projectMotivation: string;

  // Step 2: Site & Property Reality
  propertyLocation: {
    province: string;
    city: string;
    barangay: string;
    subdivisionOrZone?: string;
  };
  lotAreaSqM: number;
  lotCondition: 'RAW_UNIMPROVED' | 'GRADED_WITH_UTILITIES' | 'EXISTING_STRUCTURE_DEMOLITION' | 'SLOPED_TERRAIN_REQUIRES_SHORING';
  titleOwnershipStatus: 'CLEAN_TCT_ON_HAND' | 'CCT_CONDOMINIUM' | 'TCT_IN_TRANSFER' | 'MORTGAGED_TO_BANK' | 'AGRICULTURAL_NEEDS_CONVERSION';
  tctNumber?: string;
  accessRoadWidthMeters: number;
  utilityReadiness: {
    gridElectricityAvailable: boolean;
    potableWaterSupplyAvailable: boolean;
    drainageOutfallAvailable: boolean;
    telecomFiberAvailable: boolean;
  };

  // Step 3: Spatial & Program Requirements
  buildingClassification: 'RESIDENTIAL_ESTATE' | 'COMMERCIAL_BUILDING' | 'INDUSTRIAL_LOGISTICS' | 'MIXED_USE' | 'HOSPITALITY_RESORT' | 'SCHOOL_INSTITUTIONAL';
  targetGrossFloorAreaSqM: number;
  numberOfStoreys: number;
  numberOfBedroomsOrUnits: number;
  parkingSlotsRequired: number;
  specialProgramFeatures: string[]; // e.g. 'Basement Parking', 'Roof Deck Lounge', 'Solar PV + BESS Microgrid', 'Swimming Pool', 'Heavy Floor Loading', 'Cold Storage'
  architecturalStylePreference: 'MODERN_TROPICAL' | 'CONTEMPORARY_MINIMALIST' | 'MEDITERRANEAN' | 'INDUSTRIAL_MODERN' | 'HERITAGE_FILIPINO';

  // Step 4: Engineering & Technical Standards
  structuralSystemPreference: 'REINFORCED_CONCRETE_FRAME' | 'STRUCTURAL_STEEL_COMPOSITE' | 'POST_TENSIONED_SLABS' | 'PRECAST_MODULAR' | 'LIGHT_GAUGE_STEEL';
  mepfsRequirements: {
    backupGeneratorRequired: boolean;
    solarPVSystemRequired: boolean;
    rainwaterHarvestingSystem: boolean;
    centralAirConditioningVRF: boolean;
    fireSprinklerSystemRequired: boolean;
    sewageTreatmentPlantSTP: boolean;
    smartBuildingAutomation: boolean;
  };
  soilInvestigationStatus: 'SOIL_TEST_COMPLETED' | 'NEED_CONTRACTOR_TO_PERFORM_SOIL_TEST' | 'UNKNOWN';

  // Step 5: Contractor Search & Procurement (Looking for Contractors)
  lookingForContractorType: 'EPC_DESIGN_BUILD_TURNKEY' | 'GENERAL_BUILDING_CONTRACTOR' | 'CIVIL_STRUCTURAL_ONLY' | 'MEPFS_SPECIALTY_CONTRACTOR';
  preferredPcabLicenseGrade: 'CATEGORY_AAAA_AAA' | 'CATEGORY_AA_A' | 'CATEGORY_B_C' | 'ANY_QUALIFIED_PCAB_CONTRACTOR';
  procurementMethod: 'COMPETITIVE_INVITED_BIDDING' | 'DIRECT_NEGOTIATION' | 'TWO_STAGE_DESIGN_BID_BUILD';
  targetContractorMobilizationDays: number;
  mandatoryContractorRequirements: string[]; // e.g. 'DOLE Certified Safety Officer', 'PRC Licensed Project Engineer', 'PhilGEPS Registered', 'Past Villa Portfolio'

  // Step 6: Budget, Financing & Commercial Terms
  targetBudgetPHP: number;
  fundingSource: 'SELF_FUNDED_CASH' | 'BANK_CONSTRUCTION_LOAN' | 'CORPORATE_EQUITY' | 'SYNDICATED_FINANCING';
  commercialPaymentStructure: 'PROGRESS_BILLING_10_PERCENT_RETENTION' | 'MILESTONE_BASED_LUMP_SUM' | 'COST_PLUS_PERCENTAGE';
  targetConstructionStartDate: string;
  targetCompletionDate: string;

  // Step 7: Existing Technical Assets
  existingDocumentsStatus: {
    architecturalPlans: 'COMPLETE_SIGNED_SEALED' | 'DRAFT_SCHEMATICS_ONLY' | 'NONE_START_FROM_SCRATCH';
    structuralPlans: 'COMPLETE_SIGNED_SEALED' | 'IN_PROGRESS' | 'NONE';
    mepfsPlans: 'COMPLETE_SIGNED_SEALED' | 'IN_PROGRESS' | 'NONE';
    boqCostEstimate: 'DETAILED_BOQ_AVAILABLE' | 'ROUGH_ESTIMATE_ONLY' | 'NONE_NEED_BILL_OF_QUANTITIES';
    buildingPermits: 'APPROVED_BUILDING_PERMIT' | 'APPLICATION_FILED' | 'NOT_YET_FILED';
  };

  additionalSpecificNotes?: string;
}

export interface ClientNeedsNarrativeReport {
  id: string;
  generatedAt: string;
  projectReference: string;
  clientName: string;
  projectTitle: string;
  executiveSummary: string;
  spatialAndFunctionalNeeds: string[];
  engineeringAndComplianceMandates: {
    statutoryCode: string;
    description: string;
    complianceAction: string;
  }[];
  recommendedContractorProfile: {
    pcabCategory: string;
    deliveryModel: string;
    recommendedContractType: string;
    keyPersonnelNeeded: string[];
    contractorInspectionMandate: string;
  };
  projectReadinessAssessment: {
    overallReadinessPercent: number;
    planningReadiness: number;
    ownershipReadiness: number;
    designReadiness: number;
    boqReadiness: number;
    budgetReadiness: number;
    permitsReadiness: number;
    procurementReadiness: number;
    criticalMissingItems: string[];
  };
  financialBenchmarking: {
    estimatedFloorAreaSqM: number;
    targetBudgetPHP: number;
    estimatedCostPerSqMPHP: number;
    marketBenchmarkPerSqMPHP: string;
    budgetAdequacyStatus: 'OPTIMAL' | 'TIGHT_REQUIRES_VALUE_ENGINEERING' | 'GENEROUS_PREMIUM_FINISHES';
    recommendedContingencyPHP: number;
  };
  procurementRoadmapSteps: {
    stepNumber: number;
    title: string;
    action: string;
    timeframe: string;
    mandatoryPrecondition: string;
  }[];
}

export interface ClientProjectItem {
  id: string; // e.g. PROJECT-2026-000001
  title: string;
  clientOrganizationId: string;
  clientOrganizationName: string;
  projectType: string;
  status: 'PLANNING' | 'PROCUREMENT_BIDDING' | 'CONSTRUCTION' | 'TURNOVER' | 'COMPLETED';
  location: string;
  province: string;
  lotAreaSqM: number;
  buildingAreaSqM: number;
  numberOfFloors: number;
  targetBudgetPHP: number;
  committedBudgetPHP: number;
  paidAmountPHP: number;
  currentPhase: string;
  overallProgressPercent: number;
  projectManagerName: string;
  targetStartDate: string;
  targetHandoverDate: string;
  fundingSource: string;
  procurementMethod: string;
  isPrivate: boolean;
  readinessPercent: number;
  narrativeReportId?: string;
}

export interface DocumentRecord {
  id: string; // e.g. DOC-2026-000001
  projectId: string;
  filename: string;
  title: string;
  virtualFolder: string; // '01 — Planning', '02 — Property', '03 — Design', etc.
  category: 'Planning' | 'Property & Ownership' | 'Design & Engineering' | 'Scope of Work' | 'BOQ & Cost' | 'Budget' | 'Procurement' | 'Bidding' | 'Permits' | 'Construction';
  subtype: string;
  revision: string; // Rev 0, Rev 1, Rev 2
  isCurrent: boolean;
  uploadDate: string;
  uploaderName: string;
  status: 'DRAFT' | 'SUBMITTED' | 'UNDER_REVIEW' | 'APPROVED' | 'SUPERSEDED' | 'REJECTED';
  aiConfidence: number; // e.g. 96%
  aiClassified: boolean;
  humanConfirmed: boolean;
  fileSizeKB: number;
  fileType: string;
  isSignedSealed: boolean;
  verificationBadge: 'INTERNALLY_REVIEWED' | 'PENDING_REVIEW' | 'EXTERNALLY_VERIFIED' | 'SIMULATED';
  notes?: string;
}

export interface ScopeOfWorkItem {
  id: string;
  category: string;
  divisionNumber: string;
  workPackage: string;
  assignment: 'INCLUDED' | 'EXCLUDED' | 'OPTIONAL' | 'OWNER_SUPPLIED' | 'CONTRACTOR_SUPPLIED' | 'TO_BE_DETERMINED';
  notes: string;
}

export interface BOQLineItem {
  id: string;
  itemNumber: string;
  division: string;
  description: string;
  specReference: string;
  unit: 'lot' | 'item' | 'm' | 'm²' | 'm³' | 'kg' | 'ton' | 'bag' | 'piece' | 'set' | 'day' | 'month';
  quantity: number;
  ownerEstimateUnitPrice: number;
  contractorUnitPrice: number;
  remarks: string;
}

export interface ContractorBidSubmission {
  contractorId: string;
  contractorName: string;
  pcabLicenseCategory: string;
  bidAmountPHP: number;
  adjustedBidAmountPHP: number;
  constructionDurationDays: number;
  mobilizationPercentage: number;
  retentionPercentage: number;
  warrantyPeriodYears: number;
  keyPersonnel: string;
  majorExclusions: string;
  technicalCompletenessPercent: number;
  clarificationsCount: number;
  status: 'SUBMITTED' | 'UNDER_EVALUATION' | 'SHORTLISTED' | 'AWARDED' | 'DISQUALIFIED';
  submissionDate: string;
}
