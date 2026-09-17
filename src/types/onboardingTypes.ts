/**
 * LDL DHENZE ONBOARDING, CREDENTIAL & GOVERNMENT VERIFICATION TYPES
 * Strictly for DEMO / SIMULATION ENVIRONMENT (#31 - #46 & #1 - #30)
 */

export type OnboardingEntityType = 'CONTRACTOR' | 'SUPPLIER' | 'PROFESSIONAL' | 'CLIENT';

export type VerificationEnvironment = 'DEMO' | 'PRODUCTION';

export type GovernmentSourceCategory =
  | 'PROFESSIONAL_CREDENTIALS'
  | 'CONTRACTOR_LICENSING'
  | 'BUSINESS_REGISTRATION'
  | 'LOCAL_PERMITS'
  | 'TAX_CREDENTIALS'
  | 'OTHER_REGULATORY';

export type GovernmentIntegrationStatus =
  | 'API AVAILABLE'
  | 'API REQUIRES AUTHORIZATION'
  | 'MANUAL OFFICIAL-PORTAL VERIFICATION'
  | 'INTEGRATION NOT AVAILABLE'
  | 'NOT YET CONFIGURED';

export type VerificationConnectorId =
  | 'PRC_DEMO_CONNECTOR'
  | 'PCAB_DEMO_CONNECTOR'
  | 'SEC_DEMO_CONNECTOR'
  | 'DTI_DEMO_CONNECTOR'
  | 'LGU_DEMO_CONNECTOR'
  | 'BIR_DEMO_CONNECTOR';

export type LiveLicenseStatus =
  | 'Active'
  | 'Expired'
  | 'Expiring Soon'
  | 'Suspended / Restricted'
  | 'Record Found'
  | 'Record Not Found'
  | 'Information Mismatch'
  | 'Pending Verification'
  | 'Manual Verification Required'
  | 'Government Service Unavailable'
  | 'API Not Connected'
  | 'Verification Error'
  | 'Reverification Required';

export type VerificationBadgeType =
  | 'DEMO'
  | 'API VERIFIED'
  | 'MANUALLY VERIFIED'
  | 'PENDING'
  | 'UNVERIFIED'
  | 'REQUIRES REVIEW';

export type SubmissionStatus =
  | 'Draft'
  | 'Submitted'
  | 'AI Processing'
  | 'Needs Review'
  | 'Missing Requirements'
  | 'Correction Requested'
  | 'Under Verification'
  | 'Approved'
  | 'Rejected'
  | 'Expired'
  | 'Archived';

export type ExpirationAlertBracket =
  | 'VALID'
  | '90_DAYS'
  | '60_DAYS'
  | '30_DAYS'
  | '15_DAYS'
  | '7_DAYS'
  | 'EXPIRED';

export type ProjectPhase =
  | 'Pre-Construction'
  | 'Mobilization'
  | 'Site Clearing'
  | 'Earthworks'
  | 'Foundation'
  | 'Structural'
  | 'Architectural'
  | 'MEP'
  | 'Finishing'
  | 'Testing & Commissioning'
  | 'Punch List'
  | 'Turnover'
  | 'Post-Construction';

/**
 * Reusable API-Ready Government Verification Data Model (Section 44)
 */
export interface VerificationRecord {
  verificationId: string;
  credentialId: string;
  entityId: string;
  entityType: OnboardingEntityType;
  agency: string;
  connector: VerificationConnectorId;
  environment: VerificationEnvironment;
  verificationMethod: 'SIMULATED_CONNECTOR' | 'MANUAL_OFFICIAL_PORTAL' | 'API_CONNECTOR';
  requestTimestamp: string;
  responseTimestamp: string;
  status: LiveLicenseStatus;
  badge: VerificationBadgeType;
  recordMatch: boolean;
  nameMatch: boolean;
  licenseNumberMatch: boolean;
  expirationDate: string;
  governmentStatus: string;
  sourceReference: string;
  rawResponseReference?: string;
  reviewStatus: 'PENDING_HUMAN_REVIEW' | 'REVIEWED_ACCEPTED' | 'FLAGGED_DISCREPANCY' | 'OVERRIDDEN';
  reviewedBy?: string;
  reviewedAt?: string;
  notes: string;
  createdAt: string;
  updatedAt: string;
  // Field-by-field extracted comparison for Credential Matching (Section 36)
  comparisonFields: {
    fullName: { uploaded: string; government: string; match: boolean };
    companyName?: { uploaded: string; government: string; match: boolean };
    licenseNumber: { uploaded: string; government: string; match: boolean };
    registrationNumber?: { uploaded: string; government: string; match: boolean };
    professionalCategory?: { uploaded: string; government: string; match: boolean };
    licenseType?: { uploaded: string; government: string; match: boolean };
    issueDate?: { uploaded: string; government: string; match: boolean };
    expirationDate: { uploaded: string; government: string; match: boolean };
    currentStatus: { uploaded: string; government: string; match: boolean };
    issuingAuthority: { uploaded: string; government: string; match: boolean };
  };
  discrepancies: string[];
}

/**
 * Historical Verification Log Entry (Section 39)
 */
export interface VerificationHistoryEntry {
  id: string;
  verificationNumber: string;
  credentialId: string;
  entityId: string;
  personOrOrgName: string;
  governmentSource: string;
  connector: VerificationConnectorId;
  verificationTimestamp: string;
  previousResult: LiveLicenseStatus | 'INITIAL_SUBMISSION';
  currentResult: LiveLicenseStatus;
  responseReferenceId: string;
  verificationMode: 'DEMO' | 'PRODUCTION';
  reviewer: string;
  notes: string;
  discrepancyCount: number;
}

/**
 * Government Source Registry Definition (Section 33)
 */
export interface GovernmentSourceDefinition {
  id: string;
  code: string;
  name: string;
  agencyJurisdiction: string;
  category: GovernmentSourceCategory;
  integrationStatus: GovernmentIntegrationStatus;
  defaultConnector: VerificationConnectorId;
  electronicVerificationAvailable: boolean;
  portalUrl: string;
  statutoryBasis: string;
  rateLimitNote: string;
  notes: string;
}

/**
 * Government API Connector Specification (Section 34 & 42)
 */
export interface GovernmentConnectorSpec {
  id: VerificationConnectorId;
  agency: string;
  fullName: string;
  environment: 'DEMO';
  status: 'Simulated' | 'Active' | 'Degraded' | 'Offline';
  lastSuccessfulConnection: string;
  lastCheck: string;
  apiVersion: string;
  authenticationType: 'API_KEY' | 'OAUTH2_MUTUAL_TLS' | 'BEARER_TOKEN' | 'SIMULATED_HMAC';
  rateLimit: string;
  webhookSupport: boolean;
  productionEnabled: false;
  realDataTransmission: false;
  latencyMs: number;
  description: string;
}

/**
 * Demo Verification Test Scenario (Section 43)
 */
export interface DemoVerificationScenario {
  id: string;
  title: string;
  scenarioType:
    | 'VALID_PROFESSIONAL'
    | 'EXPIRED_PROFESSIONAL'
    | 'EXPIRING_30_DAYS'
    | 'LICENSE_NOT_FOUND'
    | 'NAME_MISMATCH'
    | 'COMPANY_REG_FOUND'
    | 'CONTRACTOR_ACTIVE'
    | 'CONTRACTOR_EXPIRED'
    | 'SUPPLIER_PERMIT_EXPIRED'
    | 'CORPORATE_AUTHORITY_RENEWAL'
    | 'SERVICE_UNAVAILABLE'
    | 'API_TIMEOUT'
    | 'AUTH_FAILURE'
    | 'MANUAL_VERIFICATION_REQUIRED';
  targetCredentialType: string;
  mockLicenseNumber: string;
  mockEntityName: string;
  connector: VerificationConnectorId;
  expectedStatus: LiveLicenseStatus;
  badge: VerificationBadgeType;
  description: string;
}

/**
 * Project Compliance Participation Record (Section 40 & 14)
 */
export interface ProjectParticipantRecord {
  id: string;
  projectId: string; // e.g. PRJ-2026-000001
  projectName: string;
  entityId: string; // CTR-, SUP-, PRO-, CLI-
  entityName: string;
  entityType: OnboardingEntityType;
  role: string;
  scope: string;
  contractReference: string;
  startDate: string;
  endDate?: string;
  approvalStatus: 'APPROVED' | 'PROVISIONAL' | 'SUSPENDED' | 'REVOKED';
  credentialStatus: 'COMPLIANT' | 'WARNING_EXPIRING' | 'NON_COMPLIANT_EXPIRED' | 'PENDING_CHECK';
  complianceAlert?: string;
  assignedWorkPackages: string[];
}

/**
 * Universal Document Record (Section 9, 10, 11, 12, 18)
 */
export interface OnboardingDocument {
  id: string; // DOC-2026-000001
  title: string;
  entityId: string;
  entityType: OnboardingEntityType;
  projectId?: string;
  category:
    | 'CONTRACTOR/LICENSE'
    | 'CONTRACTOR/INSURANCE'
    | 'SUPPLIER/BUSINESS-PERMIT'
    | 'SUPPLIER/BOARD-RESOLUTION'
    | 'PROFESSIONAL/PRC-LICENSE'
    | 'CLIENT/PROJECT-BRIEF'
    | 'PROJECT/DRAWING'
    | 'PROJECT/SITE-PHOTO'
    | 'PROJECT/SITE-VIDEO'
    | 'PROJECT/CONTRACT'
    | 'PROJECT/CHANGE-ORDER'
    | 'TAX/BIR-FORM-2303'
    | 'LGU/MAYORS-PERMIT';
  fileName: string;
  fileSizeKb: number;
  mimeType: string;
  uploadDate: string;
  uploadedBy: string;
  confidential: boolean;
  version: number;
  previousVersionDocId?: string;
  replacementReason?: string;
  sha256Hash: string;
  // Security Pipeline Verification
  pipelineStatus: {
    staged: boolean;
    signatureValidated: boolean;
    malwareCheckStatus: 'SIMULATED_PASSED' | 'PENDING_REAL_ENGINE' | 'FLAGGED';
    encryptedAtRest: boolean;
  };
  // AI Document Intelligence (Section 11)
  aiExtraction: {
    documentType: string;
    extractedLicenseNumber?: string;
    extractedIssuer?: string;
    extractedIssueDate?: string;
    extractedExpirationDate?: string;
    extractedEntityName?: string;
    confidenceScore: number;
    isVerifiedByHuman: boolean;
    humanConfirmedValue?: Record<string, any>;
  };
  lifecycleStatus: SubmissionStatus;
  reviewNotes?: string;
  downloadUrl?: string;
}

/**
 * Site Media Record (Section 13)
 */
export interface SiteMediaRecord {
  id: string; // MED-2026-000001
  projectId: string;
  fileId: string;
  title: string;
  mediaType: 'PHOTO' | 'VIDEO';
  thumbnailUrl: string;
  mediaUrl: string;
  uploadDate: string;
  captureDate: string;
  uploadedBy: string;
  description: string;
  phase: ProjectPhase;
  locationDescription: string;
  buildingOrStructure: string;
  floor: string;
  workPackage: string;
  contractorName: string;
  supplierName?: string;
  tags: string[];
  reviewStatus: 'APPROVED' | 'FLAGGED_ISSUE' | 'PENDING_REVIEW';
}

/**
 * Master Onboarding Profiles
 */
export interface ContractorProfile {
  id: string; // CTR-2026-000001
  registeredBusinessName: string;
  tradeName: string;
  companyType: 'Sole Proprietorship' | 'Corporation' | 'Partnership' | 'One Person Corporation';
  businessAddress: string;
  officeAddress: string;
  mailingAddress: string;
  contactNumbers: string;
  officialEmail: string;
  website: string;
  yearEstablished: number;
  taxIdentificationNumber: string;
  authorizedRepresentative: string;
  primaryContact: string;
  emergencyContact: string;
  // Capability Profile
  classification: string;
  specialization: string[];
  yearsExperience: number;
  geographicCoverage: string[];
  maxProjectCapacityPHP: number;
  equipmentOwned: string[];
  equipmentLeased: string[];
  totalEmployees: number;
  licensedEngineersCount: number;
  skilledWorkersCount: number;
  certifiedSafetyPersonnelCount: number;
  currentProjectsCount: number;
  completedProjectsCount: number;
  safetyRating: string;
  onboardingProgressPercent: number;
  status: SubmissionStatus;
  credentialIds: string[];
  createdAt: string;
}

export interface SupplierProfile {
  id: string; // SUP-2026-000001
  registeredCompanyName: string;
  tradeName: string;
  companyType: string;
  registrationNumber: string;
  taxIdentificationNumber: string;
  businessAddress: string;
  warehouseAddress: string;
  branches: string[];
  contactDetails: string;
  website: string;
  productCategories: string[];
  brandsRepresented: string[];
  leadTimeDays: number;
  minimumOrderPHP: number;
  deliveryCoverage: string[];
  paymentTerms: string;
  creditTerms: string;
  warrantyPeriod: string;
  returnPolicy: string;
  // Representation Authority Tracking (Section 6)
  authorizedSignatoryName: string;
  authorityDocumentType: 'Board Resolution' | "Secretary's Certificate" | 'Power of Attorney' | 'Authorized Representative Letter';
  authorityReviewDate: string;
  authorityRequiresAnnualReview: boolean;
  onboardingProgressPercent: number;
  status: SubmissionStatus;
  credentialIds: string[];
  createdAt: string;
}

export interface ProfessionalProfile {
  id: string; // PRO-2026-000001
  fullName: string;
  professionalTitle: string; // e.g. "PRC Registered Architect", "Civil & Structural Engineer"
  profession: 'Architect' | 'Civil Engineer' | 'Structural Engineer' | 'Electrical Engineer' | 'Mechanical Engineer' | 'Sanitary Engineer' | 'Geodetic Engineer' | 'Interior Designer' | 'Project Manager' | 'Safety Officer';
  contactInformation: string;
  businessAddress: string;
  professionalAddress: string;
  firmAffiliation: string;
  yearsExperience: number;
  specializations: string[];
  professionalBiography: string;
  prcLicenseNumber: string;
  prcExpiryDate: string;
  ptrNumber: string;
  accreditedOrgMembership: string; // e.g. "UAP National #12948", "PICE #048291"
  onboardingProgressPercent: number;
  status: SubmissionStatus;
  credentialIds: string[];
  assignedProjectsCount: number;
  createdAt: string;
}

export interface ClientProfile {
  id: string; // CLI-2026-000001
  clientType: 'INDIVIDUAL' | 'CORPORATE';
  fullNameOrCompanyName: string;
  contactDetails: string;
  officialEmail: string;
  address: string;
  authorizedRepresentative?: string;
  preferredCommunicationChannel: 'Email' | 'Phone' | 'Secure Portal' | 'In-Person';
  billingInformation: string;
  decisionMakers: string[];
  // Proposed Project Description (Section 8)
  proposedProjectTitle: string;
  projectType: string;
  projectLocation: string;
  siteAreaSqm: number;
  proposedFloorAreaSqm: number;
  numberOfFloors: number;
  intendedUse: string;
  projectDescription: string;
  objectives: string;
  scopeOfWork: string;
  preferredDesignStyle: string;
  specialRequirements: string;
  sustainabilityRequirements: string;
  budgetStatus: 'Preliminary' | 'Target' | 'Approved' | 'Under Financing' | 'To Be Determined';
  targetBudgetPHP: number;
  fundingStatus: string;
  targetCommencement: string;
  targetCompletion: string;
  knownSiteConditions: string;
  onboardingProgressPercent: number;
  status: SubmissionStatus;
  createdAt: string;
}

/**
 * Configurable Requirements Matrix Rule (Section 16)
 */
export interface RequirementRule {
  id: string;
  entityType: OnboardingEntityType;
  specificCategoryOrRole?: string;
  documentTitle: string;
  categoryLabel: string;
  mandatory: boolean;
  requiresGovernmentVerification: boolean;
  description: string;
  statutoryReference: string;
}
