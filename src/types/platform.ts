/**
 * LDL DHENZE PRIVATE DEVELOPMENT WORKSPACE
 * Comprehensive Multi-Tenant Platform Data Types & Interfaces
 * Meets Sections 1, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 21, 24, 25
 */

// ----------------------------------------------------
// 1. RBAC: 22 PLATFORM ROLES & PERMISSIONS
// ----------------------------------------------------
export type PlatformRole =
  | 'ANONYMOUS_VISITOR'
  | 'PROSPECTIVE_CLIENT'
  | 'ACTIVE_CLIENT'
  | 'VERIFIED_CLIENT'
  | 'CLIENT_EXECUTIVE'
  | 'CLIENT_FINANCE_VIEWER'
  | 'CLIENT_ORG_ADMIN'
  | 'PARTNER_SUPPLIER'
  | 'SUPPLIER_ADMIN'
  | 'SUPPLIER_CATALOG_MANAGER'
  | 'SUPPLIER_BIDDER'
  | 'SUPPLIER_FINANCE_USER'
  | 'PARTNER_ADMIN'
  | 'PARTNER_BID_MANAGER'
  | 'PARTNER_PROJECT_USER'
  | 'PROJECT_CONSULTANT'
  | 'PROJECT_TEAM_MEMBER'
  | 'PROJECT_MANAGER'
  | 'CONSTRUCTION_MANAGER'
  | 'PROCUREMENT_OFFICER'
  | 'QUANTITY_SURVEYOR'
  | 'FINANCE_OFFICER'
  | 'FINANCE_STAFF'
  | 'DOCUMENT_CONTROLLER'
  | 'CONTENT_EDITOR'
  | 'COMPLIANCE_REVIEWER'
  | 'EXECUTIVE_APPROVER'
  | 'EXECUTIVE'
  | 'SYSTEM_ADMIN'
  | 'SECURITY_ADMIN'
  | 'AUDITOR'
  | 'SUPPORT_USER';

export type UserRole = PlatformRole;

export type OrganizationType =
  | 'CLIENT'
  | 'SUPPLIER'
  | 'PARTNER_CONTRACTOR'
  | 'CONSULTANT'
  | 'INTERNAL_OPERATIONS';

export interface PlatformTenant {
  id: string;
  name: string;
  code: string;
  country: string;
  createdAt: string;
  status: 'ACTIVE' | 'FROZEN' | 'SUSPENDED';
}

export interface PlatformOrganization {
  id: string;
  tenantId: string;
  name: string;
  tradeName: string;
  type: OrganizationType;
  registrationNumber: string;
  taxIdentificationNumber: string;
  registeredAddress: string;
  primaryContactName: string;
  primaryContactEmail: string;
  primaryContactPhone: string;
  verified: boolean;
  status: 'ACTIVE' | 'ONBOARDING' | 'UNDER_REVIEW' | 'SUSPENDED' | 'FROZEN';
  createdAt: string;
  tier?: 'STANDARD' | 'PRIORITY' | 'INSTITUTIONAL' | 'STRATEGIC';
  totalProjectsCount?: number;
}

export interface PlatformUser {
  id: string;
  tenantId: string;
  organizationId: string;
  organizationName: string;
  email: string;
  fullName: string;
  title: string;
  phone: string;
  role: PlatformRole;
  isEmailVerified: boolean;
  isPhoneVerified: boolean;
  mfaEnabled: boolean;
  accountStatus: 'ACTIVE' | 'LOCKED' | 'SUSPENDED' | 'PENDING_INVITE';
  referralCodeUsed?: string;
  invitedBy?: string;
  lastLoginAt?: string;
  createdAt: string;
}

export interface UserSessionRecord {
  sessionId: string;
  userId: string;
  userEmail: string;
  ipAddress: string;
  userAgent: string;
  location: string;
  createdAt: string;
  expiresAt: string;
  isActive: boolean;
  requiresMfa: boolean;
}

export interface ReferralCodeRecord {
  id: string;
  code: string;
  originatorOrgId: string;
  originatorOrgName: string;
  campaignName: string;
  maxUses: number;
  currentUses: number;
  conversionStatus: 'ACTIVE' | 'EXPIRED' | 'REVOKED';
  createdAt: string;
  expiresAt: string;
}

// ----------------------------------------------------
// 2. CLIENT ONBOARDING & DEVELOPMENT INTAKE
// ----------------------------------------------------
export interface ClientInformationSheet {
  id: string;
  organizationId: string;
  clientType: 'INDIVIDUAL' | 'FAMILY_OFFICE' | 'CORPORATE' | 'INSTITUTIONAL' | 'LANDOWNER';
  legalName: string;
  tradeName: string;
  secOrDtiNumber: string;
  tin: string;
  registeredAddress: string;
  operatingAddress: string;
  beneficialOwners: string[];
  authorizedSignatories: { name: string; title: string; email: string }[];
  billingAddress: string;
  taxExemptionStatus: string;
  communicationPreference: 'PORTAL_PRIMARY' | 'EMAIL' | 'ENCRYPTED_CALL';
  identityDocumentsUploaded: string[];
  privacyConsentAccepted: boolean;
  confidentialityAccepted: boolean;
  status: 'DRAFT' | 'SUBMITTED' | 'UNDER_REVIEW' | 'APPROVED' | 'REVISION_REQUESTED';
  submittedAt?: string;
  reviewedBy?: string;
  reviewedAt?: string;
}

export interface DevelopmentIntakeRecord {
  id: string;
  organizationId: string;
  developmentName: string;
  projectClassification: 'RESIDENTIAL_ESTATE' | 'MIXED_USE' | 'HOSPITALITY' | 'LOGISTICS' | 'COMMERCIAL' | 'RENEWABLE_MICROGRID';
  siteAddress: string;
  province: string;
  municipality: string;
  lotAreaSqM: number;
  targetFloorAreaSqM: number;
  landOwnershipType: 'TITLED_OWNER' | 'LONG_TERM_LEASE' | 'JOINT_VENTURE' | 'ACQUISITION_TARGET';
  titleNumber: string;
  existingOccupantsOrEncumbrances: string;
  intendedUse: string;
  developmentGoals: string[];
  targetBudgetPHP: string;
  fundingSourceStatus: 'EQUITY_SECURED' | 'BANK_CREDIT_LINE' | 'SYNDICATED' | 'FAMILY_OFFICE_ALLOCATION';
  preferredArrangement: 'EPC_TURNKEY' | 'DESIGN_BUILD' | 'CONSTRUCTION_MANAGEMENT' | 'DEVELOPMENT_ADVISORY';
  targetCommencementDate: string;
  targetCompletionDate: string;
  requiredDisciplines: string[];
  surveyStatus: 'COMPLETED_GEODETIC' | 'TOPOGRAPHIC_IN_PROGRESS' | 'NOT_YET_SURVEYED';
  utilityReadiness: {
    gridPower: boolean;
    waterSource: boolean;
    telecom: boolean;
    roadRightOfWay: boolean;
  };
  sustainabilityGoals: string[];
  floodGeotechnicalRisks: string;
  governmentPermitsObtained: string[];
  confidentialityLevel: 'STANDARD' | 'RESTRICTED' | 'STRICT_NDA';
  status: 'DRAFT' | 'SUBMITTED' | 'TECHNICAL_ASSESSMENT' | 'QUALIFIED' | 'REJECTED';
  submittedAt?: string;
  updatedAt: string;
}

// ----------------------------------------------------
// 3. SUPPLIER CREDENTIALS, CATALOG & PROCUREMENT
// ----------------------------------------------------
export interface SupplierCredential {
  id: string;
  supplierOrgId: string;
  documentType: 'DTI_SEC_REGISTRATION' | 'BIR_COR_2303' | 'MAYORS_PERMIT' | 'TAX_CLEARANCE' | 'AUDITED_FS' | 'PRODUCT_CERTIFICATION' | 'ISO_9001' | 'SAFETY_ACCREDITATION';
  issuer: string;
  registrationNumber: string;
  issueDate: string;
  expirationDate: string;
  verificationStatus: 'VERIFIED' | 'UNDER_REVIEW' | 'EXPIRED' | 'REJECTED';
  reviewer?: string;
  fileUrl?: string;
  renewalAlertSent?: boolean;
}

export interface SupplierCatalogItem {
  id: string;
  supplierOrgId: string;
  supplierName: string;
  sku: string;
  title: string;
  category: 'CEMENT_AGGREGATES' | 'STRUCTURAL_STEEL' | 'REBAR' | 'ELECTRICAL_TRANSFORMERS' | 'SOLAR_PV_INVERTERS' | 'MECHANICAL_HVAC' | 'PLUMBING_PIPES' | 'FINISHES_GLASS';
  brand: string;
  specifications: string;
  unit: 'BAG' | 'TON' | 'PCS' | 'KG' | 'METER' | 'SET' | 'PALLET';
  minOrderQty: number;
  availableStockQty: number;
  basePricePHP: number;
  volumeDiscountTier?: string;
  leadTimeDays: number;
  stockLocation: string;
  serviceArea: string;
  warrantyMonths: number;
  approvalStatus: 'APPROVED' | 'PENDING_REVIEW' | 'REJECTED';
  effectiveUntil: string;
}

export interface RFQRecord {
  id: string;
  rfqNumber: string;
  projectId: string;
  projectName: string;
  title: string;
  category: string;
  issuingDate: string;
  submissionDeadline: string;
  status: 'DRAFT' | 'APPROVED' | 'ISSUED' | 'SUBMISSION_CLOSED' | 'UNDER_EVALUATION' | 'AWARDED' | 'CANCELLED';
  sealedBidding: boolean;
  requiredItems: {
    description: string;
    spec: string;
    quantity: number;
    unit: string;
  }[];
  invitedSupplierOrgIds: string[];
}

export interface SupplierQuotation {
  id: string;
  rfqId: string;
  rfqNumber: string;
  supplierOrgId: string;
  supplierName: string;
  quotationNumber: string;
  totalAmountPHP: number;
  isSealed: boolean;
  submittedAt: string;
  evaluationStatus: 'SEALED' | 'UNDER_REVIEW' | 'SHORTLISTED' | 'AWARDED' | 'DECLINED';
  validityDays: number;
  leadTimeDays: number;
  paymentTerms: string;
  technicalComplianceNotes: string;
}

export interface PurchaseOrderRecord {
  id: string;
  poNumber: string;
  projectId: string;
  supplierOrgId: string;
  supplierName: string;
  rfqReference?: string;
  totalAmountPHP: number;
  issuedDate: string;
  promisedDeliveryDate: string;
  status: 'DRAFT' | 'APPROVED' | 'ISSUED' | 'DELIVERY_PENDING' | 'PARTIALLY_DELIVERED' | 'DELIVERED_INSPECTED' | 'CLOSED';
  items: {
    itemTitle: string;
    quantity: number;
    unitPricePHP: number;
    totalPHP: number;
  }[];
  paymentTerms: string;
  approvedBy?: string;
}

export interface DeliveryReceiptRecord {
  id: string;
  deliveryNumber: string;
  poNumber: string;
  supplierName: string;
  deliveredAt: string;
  carrierName: string;
  driverPlateNumber: string;
  inspectionStatus: 'PENDING_QA' | 'ACCEPTED_COMPLIANT' | 'CONDITIONALLY_ACCEPTED' | 'REJECTED_NON_CONFORMANT';
  inspectorName: string;
  discrepancyNotes?: string;
  fileProofUrl?: string;
}

// ----------------------------------------------------
// 4. PARTNER QUALIFICATIONS, BIDS & WORK PACKAGES
// ----------------------------------------------------
export interface PartnerCapability {
  id: string;
  partnerOrgId: string;
  partnerName: string;
  primaryDiscipline: 'GENERAL_BUILDING' | 'CIVIL_EARTHWORKS' | 'STRUCTURAL_CONCRETE' | 'ELECTRICAL_MEPFS' | 'SOLAR_RENEWABLE' | 'ROAD_BRIDGE' | 'GEOTECHNICAL';
  pcabLicenseCategory: 'AAAA' | 'AAA' | 'AA' | 'A' | 'B' | 'C' | 'TRADE_SPECIALTY';
  pcabLicenseNumber: string;
  pcabValidityDate: string;
  maxProjectCapacityPHP: number;
  licensedEngineersCount: number;
  heavyEquipmentInventoryCount: number;
  referenceProjectsCount: number;
  qualificationStatus: 'QUALIFIED' | 'PROVISIONAL' | 'AWAITING_DOCS' | 'SUSPENDED';
}

export interface PartnerOpportunity {
  id: string;
  tenderNumber: string;
  projectId: string;
  title: string;
  scopeOverview: string;
  discipline: string;
  budgetBandPHP: string;
  bidDeadline: string;
  ndaRequired: boolean;
  status: 'OPEN_FOR_BIDS' | 'EVALUATION' | 'AWARDED' | 'CLOSED';
}

export interface PartnerBidSubmission {
  id: string;
  opportunityId: string;
  tenderNumber: string;
  partnerOrgId: string;
  partnerName: string;
  commercialAmountPHP: number;
  estimatedDurationMonths: number;
  technicalMethodologySummary: string;
  proposedProjectManager: string;
  submittedAt: string;
  status: 'SUBMITTED' | 'TECHNICAL_EVALUATION' | 'COMMERCIAL_REVIEW' | 'RECOMMENDED' | 'AWARDED' | 'NOT_SELECTED';
}

export interface WorkPackageRecord {
  id: string;
  packageNumber: string;
  projectId: string;
  title: string;
  assignedPartnerOrgId: string;
  assignedPartnerName: string;
  discipline: string;
  budgetAllocatedPHP: number;
  progressPercent: number;
  plannedStartDate: string;
  plannedEndDate: string;
  actualStartDate?: string;
  status: 'NOT_STARTED' | 'ACTIVE_IN_PROGRESS' | 'ON_HOLD' | 'INSPECTION_PENDING' | 'COMPLETED' | 'FROZEN';
}

// ----------------------------------------------------
// 5. PROJECT MANAGEMENT, WBS, TASKS, RFIS, SUBMITTALS
// ----------------------------------------------------
export interface MasterProjectRecord {
  id: string;
  projectNumber: string;
  title: string;
  clientOrgId: string;
  clientName: string;
  sector: string;
  location: string;
  currentPhase: 'FEASIBILITY' | 'PREDEVELOPMENT' | 'DETAILED_DESIGN' | 'PROCUREMENT' | 'CIVIL_CONSTRUCTION' | 'FITOUT' | 'COMMISSIONING' | 'HANDOVER';
  status: 'ACTIVE' | 'ON_HOLD' | 'FROZEN' | 'COMPLETED';
  budgetBaselinePHP: number;
  committedCostPHP: number;
  actualSpentPHP: number;
  scheduleBaselineDays: number;
  overallProgressPercent: number;
  targetCompletionDate: string;
  projectManagerName: string;
  projectManagerEmail: string;
  safetyDaysWithoutIncident: number;
}

export interface WBSTaskRecord {
  id: string;
  taskNumber: string;
  projectId: string;
  workPackageId?: string;
  title: string;
  description: string;
  phase: string;
  discipline: string;
  assignedToName: string;
  responsibleOrgName: string;
  priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  status: 'NOT_STARTED' | 'READY' | 'IN_PROGRESS' | 'BLOCKED' | 'SUBMITTED_FOR_REVIEW' | 'ACCEPTED' | 'CLOSED';
  progressPercent: number;
  plannedStartDate: string;
  plannedEndDate: string;
  actualEndDate?: string;
  dependencies: string[];
  budgetReferencePHP?: number;
  riskRating?: 'LOW' | 'MEDIUM' | 'HIGH';
}

export interface MilestoneRecord {
  id: string;
  projectId: string;
  title: string;
  phase: string;
  targetDate: string;
  actualDate?: string;
  completionPercent: number;
  status: 'PLANNED' | 'IN_PROGRESS' | 'ACHIEVED' | 'DELAYED';
  deliverableDocumentNumber?: string;
  signoffRequiredBy: string[];
}

export interface RFIRecord {
  id: string;
  rfiNumber: string;
  projectId: string;
  title: string;
  subjectDiscipline: 'ARCHITECTURAL' | 'STRUCTURAL' | 'ELECTRICAL' | 'MECHANICAL' | 'CIVIL' | 'PLUMBING';
  submittedByName: string;
  submittedByOrg: string;
  dateRaised: string;
  dateRequired: string;
  question: string;
  assignedResponderName: string;
  status: 'OPEN' | 'UNDER_REVIEW' | 'ANSWERED' | 'CLOSED';
  answerText?: string;
  answeredDate?: string;
  costImpactIdentified: boolean;
  scheduleImpactDays: number;
}

export interface SubmittalRecord {
  id: string;
  submittalNumber: string;
  projectId: string;
  specSection: string;
  title: string;
  type: 'SHOP_DRAWING' | 'PRODUCT_DATA' | 'MATERIAL_SAMPLE' | 'METHOD_STATEMENT' | 'TEST_REPORT';
  submittedByOrg: string;
  dateSubmitted: string;
  reviewStatus: 'UNDER_REVIEW' | 'APPROVED_AS_SUBMITTED' | 'APPROVED_WITH_COMMENTS' | 'REVISE_RESUBMIT' | 'REJECTED';
  reviewerName: string;
  reviewedDate?: string;
  comments?: string;
}

export interface SiteInspectionRecord {
  id: string;
  inspectionNumber: string;
  projectId: string;
  inspectionType: 'STRUCTURAL_REBAR' | 'CONCRETE_POUR' | 'ELECTRICAL_CONDUIT' | 'PLUMBING_PRESSURE_TEST' | 'SAFETY_ENVIRONMENTAL' | 'FINAL_PUNCHLIST';
  scheduledDate: string;
  inspectorName: string;
  result: 'PASSED' | 'CONDITIONAL_PASS' | 'FAILED_NON_CONFORMANCE' | 'PENDING';
  deficienciesNoted: string[];
  reInspectionRequired: boolean;
}

export interface NonconformanceReport {
  id: string;
  ncrNumber: string;
  projectId: string;
  title: string;
  severity: 'MINOR' | 'MAJOR' | 'CRITICAL_SAFETY';
  issueDate: string;
  issuedByName: string;
  responsibleOrgName: string;
  description: string;
  rootCause: string;
  correctiveActionRequired: string;
  status: 'OPEN' | 'CORRECTIVE_ACTION_PENDING' | 'VERIFICATION_INSPECTION' | 'RESOLVED_CLOSED';
  closureDate?: string;
}

export interface ChangeVariationRecord {
  id: string;
  variationNumber: string;
  projectId: string;
  title: string;
  reasonCategory: 'CLIENT_SCOPE_CHANGE' | 'SITE_UNFORESEEN_CONDITION' | 'REGULATORY_CODE_UPDATE' | 'DESIGN_OPTIMIZATION';
  costImpactPHP: number;
  timeImpactDays: number;
  status: 'PROPOSED' | 'TECHNICAL_EVALUATION' | 'COMMERCIAL_REVIEW' | 'APPROVED' | 'REJECTED';
  requestedByName: string;
  approvedByName?: string;
  approvalDate?: string;
}

// ----------------------------------------------------
// 6. COMMON DATA ENVIRONMENT (CDE) & DOCUMENT CONTROL
// ----------------------------------------------------
export interface CDEDocumentRecord {
  id: string;
  documentNumber: string;
  title: string;
  projectId: string;
  organizationId: string;
  discipline: 'ARCH' | 'STRUCT' | 'MEPFS' | 'CIVIL' | 'COMMERCIAL' | 'LEGAL' | 'QA_QC';
  documentType: 'DRAWING' | 'SPECIFICATION' | 'BOQ' | 'CONTRACT' | 'REPORT' | 'PERMIT' | 'SUBMITTAL';
  revision: string;
  status: 'DRAFT' | 'INTERNAL_REVIEW' | 'SHARED_FOR_REVIEW' | 'ACCEPTED' | 'REJECTED' | 'SUPERSEDED' | 'ARCHIVED' | 'FROZEN' | 'UNDER_LEGAL_HOLD';
  classification: 'PUBLIC' | 'CONFIDENTIAL' | 'RESTRICTED_COMMERCIAL' | 'STRICT_IP';
  authorName: string;
  authorOrgName: string;
  reviewStatus: string;
  fileHash: string;
  fileSizeKB: number;
  fileExtension: string;
  fileUrl?: string;
  createdDate: string;
  lastUpdated: string;
  downloadRestricted: boolean;
  watermarkRequired: boolean;
}

export interface DocumentTransmittalRecord {
  id: string;
  transmittalNumber: string;
  projectId: string;
  issuedByOrg: string;
  recipientOrg: string;
  issuedDate: string;
  purpose: 'FOR_INFORMATION' | 'FOR_REVIEW_APPROVAL' | 'FOR_CONSTRUCTION' | 'AS_BUILT_HANDOVER';
  documentNumbers: string[];
  acknowledgmentReceived: boolean;
}

// ----------------------------------------------------
// 7. COMPLIANCE REVIEW & SYSTEM FREEZES
// ----------------------------------------------------
export interface ComplianceItemRecord {
  id: string;
  entityType: 'SUPPLIER' | 'PARTNER' | 'PROJECT' | 'DOCUMENT';
  entityId: string;
  entityName: string;
  requirementTitle: string;
  governingLawOrCode: string;
  expirationDate: string;
  daysToExpiration: number;
  status: 'COMPLIANT' | 'EXPIRING_SOON' | 'EXPIRED' | 'MISSING' | 'HOLD_PLACED';
  holdPlaced: boolean;
  assignedReviewer: string;
  notes?: string;
}

export interface SystemFreezeRecord {
  id: string;
  freezeLevel: 'DOCUMENT' | 'FOLDER' | 'WORK_PACKAGE' | 'PROJECT' | 'ORGANIZATION' | 'PORTAL' | 'TENANT_EMERGENCY';
  targetIdentifier: string;
  targetTitle: string;
  reason: string;
  initiatedBy: string;
  approvedBy: string;
  active: boolean;
  createdAt: string;
  releasedAt?: string;
  requiresDualApproval: boolean;
  secondApprover?: string;
}

// ----------------------------------------------------
// 8. FINANCE, INVOICES & RETENTION
// ----------------------------------------------------
export interface InvoiceRecord {
  id: string;
  invoiceNumber: string;
  projectId: string;
  recipientOrgId: string;
  recipientOrgName: string;
  milestoneReference: string;
  grossAmountPHP: number;
  taxAmountPHP: number;
  retentionDeductionPHP: number;
  netPayablePHP: number;
  invoiceDate: string;
  dueDate: string;
  status: 'DRAFT' | 'ISSUED' | 'UNDER_REVIEW' | 'APPROVED_FOR_PAYMENT' | 'PAID' | 'DISPUTED';
  paymentDate?: string;
  bankReference?: string;
}

export interface PaymentApplicationRecord {
  id: string;
  applicationNumber: string;
  projectId: string;
  contractorOrgId: string;
  contractorName: string;
  billingPeriod: string;
  claimedGrossPHP: number;
  quantitySurveyorCertifiedPHP: number;
  retentionPHP: number;
  netCertifiedPHP: number;
  makerSignoff: string;
  checkerApproval?: string;
  status: 'SUBMITTED' | 'QS_CERTIFIED' | 'MAKER_REVIEWED' | 'CHECKER_APPROVED' | 'DISBURSED';
}

// ----------------------------------------------------
// 9. AI BRANDED ASSISTANTS & GOVERNANCE
// ----------------------------------------------------
export type BrandedAssistantMode =
  | 'DHENZE_PRIVATE_ASSISTANT'
  | 'DHENZE_SUPPLIER_ASSISTANT'
  | 'DHENZE_PARTNER_ASSISTANT'
  | 'DHENZE_PROJECT_ASSISTANT'
  | 'DHENZE_COMPLIANCE_ASSISTANT'
  | 'DHENZE_EXECUTIVE_ASSISTANT';

export interface AssistantChatMessage {
  id: string;
  sender: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: string;
  citations?: {
    sourceTitle: string;
    docNumber?: string;
    classification: string;
    relevance: string;
  }[];
  confidence?: string;
  classification?: string;
  disclaimerRequired?: boolean;
}

export type SupplierQuotationRecord = SupplierQuotation;
export type MaterialDeliveryRecord = DeliveryReceiptRecord;
export type SubcontractorProposal = PartnerBidSubmission;

export interface SupplierRecord extends PlatformOrganization {
  tierStatus?: string;
  onTimeDeliveryRate?: number;
  accreditationValidUntil?: string;
  pcabLicenseCategory?: string;
}

export interface PartnerRecord extends PlatformOrganization {
  pcabCategory?: string;
  pcabLicenseNumber?: string;
  certifiedPersonnelCount?: number;
  heavyEquipmentCount?: number;
  safetyRating?: number;
}

export interface AuditLogRecord {
  id: string;
  timestamp: string;
  actor: string;
  actorName?: string;
  actorRole: string;
  action: string;
  resource?: string;
  resourceType?: string;
  resourceId?: string;
  status?: 'SUCCESS' | 'FAILURE' | 'WARNING' | string;
  details?: string;
  ipAddress?: string;
  sha256Hash?: string;
}


