/**
 * LDL DHENZE RESIDENTIAL BUILDING CONSTRUCTION
 * Domain Types, Interfaces and Data Models
 * Official Positioning: "Building Today. Engineering Tomorrow. Powering the Future."
 */

export type UserRole =
  | 'ANONYMOUS_VISITOR'
  | 'PROSPECTIVE_CLIENT'
  | 'VERIFIED_CLIENT'
  | 'CLIENT_ORG_ADMIN'
  | 'PARTNER_SUPPLIER'
  | 'PROJECT_CONSULTANT'
  | 'PROJECT_TEAM_MEMBER'
  | 'PROJECT_MANAGER'
  | 'CONTENT_EDITOR'
  | 'COMPLIANCE_REVIEWER'
  | 'FINANCE_STAFF'
  | 'EXECUTIVE'
  | 'SYSTEM_ADMIN';

export type ProjectStage =
  | 'Concept'
  | 'Proposed'
  | 'Pre-development'
  | 'In Development'
  | 'Under Construction'
  | 'Completed';

export type DocumentLifecycleStatus =
  | 'Uploaded'
  | 'Processing'
  | 'Awaiting Classification'
  | 'Under Review'
  | 'Approved'
  | 'Indexed'
  | 'Suspended'
  | 'Rejected'
  | 'Superseded'
  | 'Archived'
  | 'Deleted';

export type AnswerConfidence =
  | 'Verified Answer'
  | 'General Guidance'
  | 'Information Not Found'
  | 'Human Review Recommended'
  | 'Restricted Information'
  | 'Outside Allowed Scope';

export interface CompanyCredentials {
  businessName: string;
  proprietor: string;
  businessStructure: string;
  dtiRegistrationNumber: string;
  dtiValidity: string;
  dtiTerritorialScope: string;
  dtiLocality: string;
  birRegisteredTradeName: string;
  birLineOfBusiness: string;
  psicCode: string;
  tin: string;
  rdo: string;
  birCertificateDate: string;
  birForm2303Ocn: string;
  registeredAddress: string;
  contactPhone: string;
  contactEmail: string;
  website: string;
}

export interface CapabilityItem {
  id: string;
  code: string;
  title: string;
  shortDesc: string;
  heroHeadline: string;
  heroSubtitle: string;
  outcomeText: string;
  scopeIncluded: string[];
  scopeOptional: string[];
  scopeExclusions: string[];
  deliveryProcess: { step: number; title: string; desc: string }[];
  applicableIndustries: string[];
  technologyStack: string[];
  sustainabilityFeatures: string[];
  complianceStatement: string;
  partnerDelivered: boolean;
  strategicOrFuture: boolean;
  iconName: string;
  image: string;
}

export interface IndustryItem {
  id: string;
  title: string;
  subtitle: string;
  category: 'core' | 'strategic' | 'future';
  overview: string;
  keyServices: string[];
  capabilitiesInvolved: string[];
  sustainabilityFocus: string[];
  featuredSolutions: { title: string; description: string }[];
  complianceRequirements: string;
  heroImage: string;
}

export interface PortfolioProject {
  id: string;
  name: string;
  code: string;
  sector: string;
  location: string;
  stage: ProjectStage;
  clientDisclosureStatus: 'Public' | 'Client Confidential' | 'Redacted Reference';
  scope: string;
  servicesByLdlDhenze: string[];
  servicesByPartners: string[];
  challenge: string;
  solution: string;
  verifiedMetrics: { label: string; value: string }[];
  heroImage: string;
  gallery: string[];
  isConceptual: boolean;
  sustainableFeatures: string[];
  year: string;
}

export interface KnowledgeChunk {
  id: string;
  category: string;
  title: string;
  section: string;
  content: string;
  sourceDoc: string;
  publicationDate: string;
  lastUpdated: string;
  classification: 'Public' | 'Client-Private' | 'Internal';
  approvalStatus: 'Approved' | 'Under Review' | 'Suspended' | 'Superseded';
  allowedRoles: UserRole[];
  pageOrArticleUrl?: string;
}

export interface AssistantSourceCitation {
  documentTitle: string;
  section: string;
  publicationDate: string;
  lastUpdatedDate: string;
  sourceClassification: string;
  url?: string;
  pageNumber?: number | string;
}

export type Citation = AssistantSourceCitation;

export interface AssistantMessage {
  id: string;
  sender: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: string;
  confidence?: AnswerConfidence;
  citations?: AssistantSourceCitation[];
  category?: string;
  feedback?: 'positive' | 'negative';
  flaggedForEscalation?: boolean;
  disclaimer?: string;
}

export interface ProjectInquiryData {
  inquiryNumber: string;
  fullName: string;
  organization: string;
  email: string;
  mobile: string;
  projectType: string;
  industry: string;
  location: string;
  landOwnershipStatus: string;
  landAreaSqMeters: string;
  currentStage: string;
  desiredServices: string[];
  budgetRange: string;
  desiredStartDate: string;
  expectedCompletionDate: string;
  financingStatus: string;
  hasExistingPlans: boolean;
  preferredConsultation: string;
  privacyConsent: boolean;
  accuracyConfirmed: boolean;
  submittedAt: string;
  status: 'Pending Review' | 'Assigned' | 'Under Evaluation' | 'Proposal Prepared' | 'Archived';
}

export interface ConsultationBooking {
  id: string;
  serviceCategory: string;
  consultantName: string;
  consultantRole: string;
  date: string;
  time: string;
  timeZone: string;
  meetingType: 'Virtual Conference' | 'On-Site Technical Review' | 'Headquarters Consultation';
  agenda: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  organization: string;
  status: 'Confirmed' | 'Completed' | 'Rescheduled' | 'Cancelled';
  createdAt: string;
}

export interface PartnerRegistration {
  id: string;
  companyName: string;
  contactPerson: string;
  email: string;
  phone: string;
  category: 'Supplier' | 'Subcontractor' | 'Engineering Consultant' | 'Equipment Provider' | 'Renewable Partner';
  coverageAreas: string[];
  pcabLicenseNo?: string;
  dtiOrSecNo: string;
  taxIdentificationNo: string;
  accreditationStatus: 'Under Review' | 'Accredited' | 'Conditional' | 'Rejected';
  complianceExpiryDate: string;
  submittedAt: string;
}

export interface AuditLogItem {
  id: string;
  timestamp: string;
  actor: string;
  actorRole: UserRole;
  action: string;
  resource: string;
  status: 'SUCCESS' | 'DENIED' | 'FLAGGED';
  ipAddress?: string;
  details: string;
}

// ----------------------------------------------------
// BUILDER AI SUBSCRIPTION & CREDITS DATA MODELS
// ----------------------------------------------------

export type SubscriptionTierId =
  | 'preview' // BUILDER PREVIEW ($0)
  | 'access' // BUILDER ACCESS ($80/mo)
  | 'professional' // BUILDER PROFESSIONAL ($200/mo)
  | 'executive' // BUILDER EXECUTIVE ($2,000/mo)
  | 'business' // BUILDER BUSINESS ($250-$300/user/mo)
  | 'enterprise'; // BUILDER ENTERPRISE (Custom Quotation)

export type BillingInterval = 'monthly' | 'annual';

export type SubscriptionStatus =
  | 'trialing'
  | 'active'
  | 'past_due'
  | 'grace_period'
  | 'suspended'
  | 'cancelled'
  | 'expired'
  | 'pending_payment'
  | 'pending_review'
  | 'refunded'
  | 'disputed';

export type CreditTransactionType =
  | 'SUBSCRIPTION_ALLOCATION'
  | 'GENERATION_CHARGE'
  | 'CREDIT_RESERVATION'
  | 'RESERVATION_RELEASE'
  | 'ADJUSTMENT'
  | 'REFUND'
  | 'PROMOTIONAL_CREDIT'
  | 'PURCHASED_ADDON'
  | 'EXPIRATION'
  | 'ADMIN_CORRECTION';

export interface PlanEntitlements {
  aiChat: boolean;
  publicKnowledgeSearch: boolean;
  privateKnowledgeSearch: boolean;
  projectWorkspace: boolean;
  fileUpload: boolean;
  documentGeneration: boolean;
  spreadsheetGeneration: boolean;
  imageGeneration: boolean;
  highResolutionImages: boolean;
  masterplanConcepts: boolean;
  planConcepts: boolean;
  budgetFrameworks: boolean;
  projectSchedules: boolean;
  professionalReviewRequests: boolean;
  teamWorkspace: boolean;
  organizationIndex: boolean;
  auditExports: boolean;
  customTemplates: boolean;
  customBranding: boolean;
  advancedAnalytics: boolean;
  priorityQueue: boolean;
  administratorControls: boolean;
  integrations: boolean;
  apiAccess: boolean;
}

export interface PlanAllowance {
  monthlyCredits: number;
  monthlyMessages: number;
  monthlyDocumentGenerations: number;
  monthlyImageGenerations: number;
  activeProjects: number;
  storageGB: number;
  maxFileSizeMB: number;
  includedUsers: number;
  maxUsers?: number;
  requestsPerMinute: number;
  requestsPerDay: number;
}

export interface SubscriptionPlan {
  id: SubscriptionTierId;
  name: string;
  tagline: string;
  badge?: string;
  isPopular?: boolean;
  isTeam?: boolean;
  monthlyPriceUSD: number;
  annualMonthlyPriceUSD: number;
  benchmarkReferencePriceUSD: number;
  benchmarkReferenceName: string;
  multiplier: number; // 10.00
  allowance: PlanAllowance;
  entitlements: PlanEntitlements;
  highlights: string[];
  restrictions: string[];
  recommendedFor: string;
}

export interface PriceVersion {
  id: string;
  planId: SubscriptionTierId;
  version: number;
  currency: string;
  monthlyAmountUSD: number;
  annualMonthlyAmountUSD: number;
  multiplier: number;
  benchmarkReference: {
    provider: string;
    tier: string;
    referencePriceUSD: number;
    billingInterval: string;
    dateVerified: string;
    verifiedSourceUrl: string;
  };
  effectiveFrom: string;
  effectiveUntil?: string;
  createdBy: string;
  approvedBy?: string;
  status: 'draft' | 'under_review' | 'approved' | 'superseded' | 'archived';
  notes?: string;
}

export interface CreditLedgerItem {
  id: string;
  timestamp: string;
  userId: string;
  orgId?: string;
  type: CreditTransactionType;
  amount: number;
  balanceAfter: number;
  activity: string;
  idempotencyKey?: string;
  details: string;
  receiptId?: string;
}

export interface CreditReservation {
  reservationId: string;
  userId: string;
  estimatedCredits: number;
  action: string;
  reservedAt: string;
  expiresAt: string;
  status: 'RESERVED' | 'COMMITTED' | 'RELEASED';
}

export interface UserSubscription {
  id: string;
  userId: string;
  userEmail: string;
  organizationName?: string;
  planId: SubscriptionTierId;
  priceVersionId: string;
  billingInterval: BillingInterval;
  status: SubscriptionStatus;
  currentPeriodStart: string;
  currentPeriodEnd: string;
  cancelAtPeriodEnd: boolean;
  cancelledAt?: string;
  seatsPurchased: number;
  activeSeats: number;
  paymentMethod: {
    type: 'card' | 'bank_transfer' | 'qr_digital' | 'invoice';
    last4?: string;
    brand?: string;
  };
  wallet: {
    subscriptionCreditsRemaining: number;
    topUpCreditsRemaining: number;
    totalCreditsRemaining: number;
    reservedCredits: number;
    lastAllocationDate: string;
  };
}

export interface TopUpPackage {
  id: string;
  name: string;
  credits: number;
  priceUSD: number;
  description: string;
  popular?: boolean;
}

export interface ProfitabilityMetrics {
  totalRevenueUSD: number;
  paymentGatewayFeesUSD: number;
  estimatedModelCostUSD: number;
  imageGenCostUSD: number;
  storageAndSearchCostUSD: number;
  supportAllocationsUSD: number;
  totalCostUSD: number;
  grossMarginUSD: number;
  grossMarginPercentage: number;
  activeSubscribers: number;
  totalCreditsIssued: number;
  totalCreditsConsumed: number;
  emergencyShutoffActive: boolean;
  marginAlertThreshold: number;
}

export interface PricingReconciliationRecord {
  planId: string;
  planName: string;
  currentConfiguredPrice: string;
  previousProposedPrice: string;
  currency: string;
  billingInterval: string;
  taxStatus: string;
  benchmarkSource: string;
  appliedMultiplier: number;
  finalApprovedSellingPrice: string;
  effectiveDate: string;
  approvalStatus: 'PENDING_EXECUTIVE_APPROVAL' | 'APPROVED' | 'DISCREPANCY_FLAGGED';
  maker: string;
  checker: string;
  discrepancyNote: string;
}

export interface UnifiedBenchmarkPolicy {
  planId: string;
  planName: string;
  benchmarkType: string;
  benchmarkProvider: string;
  benchmarkProduct: string;
  benchmarkTier: string;
  benchmarkPrice: number;
  benchmarkCurrency: string;
  benchmarkDate: string;
  multiplier: number;
  calculatedPrice: number;
  approvedSellingPrice: number;
  verifiedBy: string;
  approvedBy: string;
  auditNotes: string;
}

export interface TopUpPackageEconomicAudit {
  packageId: string;
  name: string;
  credits: number;
  priceUSD: number;
  pricePerCreditUSD: number;
  maxTextGenCostUSD: number;
  maxReasoningCostUSD: number;
  maxRetrievalCostUSD: number;
  maxImageGenCostUSD: number;
  maxDocProcessCostUSD: number;
  paymentProcessingFeeUSD: number;
  infrastructureAllocationUSD: number;
  supportAllocationUSD: number;
  totalMaxPotentialCostUSD: number;
  grossMarginFloorUSD: number;
  grossMarginFloorPercent: number;
}

export interface CreditLifecyclePolicy {
  expirationPeriodDays: number;
  consumptionOrder: 'FIFO_PROMO_THEN_SUBSCRIPTION_THEN_PREPAID';
  refundEligibility: string;
  transferRestrictions: string;
  accountClosureTreatment: string;
  dormancyTreatment: string;
  promotionalCreditRules: string;
  subscriptionCreditRules: string;
  prepaidCreditRules: string;
}

export interface BankTransferRecord {
  transferId: string;
  clientEmail: string;
  clientName: string;
  organizationName: string;
  planId: string;
  priceVersionId: string;
  amountUSD: number;
  bankReferenceNumber: string;
  recordedBy: string;
  recordedAt: string;
  status: 'PENDING_APPROVAL' | 'APPROVED' | 'REJECTED';
  approvedBy?: string;
  approvedAt?: string;
  rejectionReason?: string;
}

