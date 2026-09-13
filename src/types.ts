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
  | 'Conceptual Study'
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
  | 'Outside Allowed Scope'
  | 'Current External Research';

export enum AnswerClassification {
  VERIFIED_COMPANY_INFO = 'VERIFIED COMPANY INFORMATION',
  GENERAL_GUIDANCE = 'GENERAL INDUSTRY GUIDANCE',
  CURRENT_RESEARCH = 'CURRENT EXTERNAL RESEARCH',
  PRELIMINARY_ANALYSIS = 'PRELIMINARY PROJECT ANALYSIS',
  PRELIMINARY_CONCEPT = 'PRELIMINARY AI-GENERATED CONCEPT',
  PROFESSIONAL_REVIEW_REQUIRED = 'PROFESSIONAL REVIEW REQUIRED',
  INFO_NOT_FOUND = 'INFORMATION NOT FOUND',
  RESTRICTED_INFO = 'RESTRICTED INFORMATION',
  OUTSIDE_SCOPE = 'OUTSIDE ALLOWED BUSINESS SCOPE',
  PROMPT_DEFENSE = 'PROMPT INJECTION DEFENSE',
  COMMERCIAL_INQUIRY = 'COMMERCIAL INQUIRY',
}

export enum RecommendedNextAction {
  START_PROJECT = 'Start a Project',
  REQUEST_ASSESSMENT = 'Request a Project Assessment',
  GENERATE_CONCEPT = 'Generate a Preliminary Concept',
  UPLOAD_DOCUMENTS = 'Upload Project Documents',
  BOOK_CONSULTATION = 'Book a Technical Consultation',
  BOOK_DISCOVERY = 'Book a Technical Consultation',
  REQUEST_PROFESSIONAL_REVIEW = 'Request Professional Review',
  CONTACT_COMPANY = 'Contact LDL Dhenze',
  ASK_FOLLOWUP = 'Ask a Follow-up Question',
  EXPLORE_DESIGN_STUDIO = 'Explore AI Design Studio',
  CONSULT_PROFESSIONAL = 'Consult Licensed Professional',
  REACH_OUT_OFFICIAL = 'Connect With Project Manager',
  PURCHASE_SUBSCRIPTION = 'Upgrade Subscription Plan',
}

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
  documentTitle?: string;
  title?: string;
  section?: string;
  publicationDate?: string;
  lastUpdatedDate?: string;
  sourceClassification?: string;
  url?: string;
  pageNumber?: number | string;
  sourceId?: string;
  category?: string;
  sourceDoc?: string;
}

export type Citation = AssistantSourceCitation;

export interface AssistantMessage {
  id: string;
  sender: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: string;
  confidence?: AnswerConfidence;
  classification?: AnswerClassification;
  citations?: AssistantSourceCitation[];
  verifiedCompanySources?: AssistantSourceCitation[];
  externalSources?: AssistantSourceCitation[];
  assumptions?: string[];
  limitations?: string[];
  recommendedNextAction?: RecommendedNextAction;
  actionView?: string;
  category?: string;
  feedback?: 'positive' | 'negative';
  flaggedForEscalation?: boolean;
  disclaimer?: string;
  verifiedCompanyCapabilities?: string;
  generalDevelopmentApproach?: string;
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
  | 'ADMIN_CORRECTION'
  | 'USAGE_DESIGN_STUDIO';

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
  description?: string;
  referenceId?: string;
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
  tokenInferenceCostUSD?: number;
  visualizerRenderCostUSD?: number;
}

export interface PricingReconciliationRecord {
  planId: string;
  planName: string;
  currentConfiguredPrice: string;
  currentConfiguredPriceUSD?: number;
  previousProposedPrice: string;
  previousProposedPriceUSD?: number;
  currency: string;
  billingInterval: string;
  taxStatus: string;
  benchmarkSource: string;
  appliedMultiplier: number;
  multiplierApplied?: number;
  finalApprovedSellingPrice: string;
  finalApprovedSellingPriceUSD?: number;
  effectiveDate: string;
  approvalStatus: 'PENDING_EXECUTIVE_APPROVAL' | 'APPROVED' | 'DISCREPANCY_FLAGGED';
  maker: string;
  checker: string;
  discrepancyNote: string;
  discrepancyDetails?: string;
  benchmarkReference?: string;
  createdBy?: string;
  approvedBy?: string;
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
  id?: string;
  clientEmail: string;
  userEmail?: string;
  clientName: string;
  organizationName: string;
  companyName?: string;
  planId: string;
  priceVersionId: string;
  amountUSD: number;
  amountPHP?: number;
  bankReferenceNumber: string;
  recordedBy: string;
  recordedAt: string;
  status: 'PENDING_APPROVAL' | 'APPROVED' | 'REJECTED';
  approvedBy?: string;
  approvedAt?: string;
  rejectionReason?: string;
}

// ----------------------------------------------------
// LDL DHENZE AI DESIGN STUDIO ARCHITECTURE & DATA MODELS
// ----------------------------------------------------

export type DesignProjectSector =
  | 'Residential'
  | 'Commercial'
  | 'Industrial and Logistics'
  | 'Institutional'
  | 'Agriculture and Agro-Industrial'
  | 'Energy and Environment'
  | 'Infrastructure and Smart Development';

export type ProfessionalReviewStatus =
  | 'Preliminary Concept'
  | 'Client Accepted'
  | 'Internally Reviewed'
  | 'Professionally Reviewed'
  | 'Approved for Presentation'
  | 'Approved for Permit Development'
  | 'Approved for Construction';

export type DesignStudioModuleId =
  | 'project-setup'
  | 'site-info'
  | 'requirements-builder'
  | 'space-programming'
  | 'concept-generator'
  | 'site-planning'
  | 'floor-plan'
  | 'elevation'
  | 'section'
  | 'masterplan'
  | 'landscape'
  | 'interior'
  | 'exterior-viz'
  | 'structural'
  | 'electrical'
  | 'mechanical'
  | 'plumbing-sanitary'
  | 'fire-safety'
  | 'renewable-energy'
  | 'water-environmental'
  | 'agro-industrial'
  | 'smart-building'
  | 'smart-city'
  | 'materials-finishes'
  | 'preliminary-quantities'
  | 'budget-framework'
  | 'equipment-planning'
  | 'construction-schedule'
  | 'risk-compliance'
  | 'drawing-set-builder'
  | 'professional-review'
  | 'version-comparison'
  | 'client-presentation'
  | 'export-center'
  | 'credit-usage-center';

export interface SpaceProgramItem {
  id: string;
  name: string;
  zone: 'Public' | 'Semi-Public' | 'Private' | 'Service' | 'Circulation' | 'Technical';
  quantity: number;
  minAreaSqM: number;
  targetAreaSqM: number;
  maxAreaSqM: number;
  capacityPersons: number;
  occupancyType: string;
  adjacencies: string[];
  privacyLevel: 'Low' | 'Medium' | 'High' | 'Restricted';
  naturalLight: 'High' | 'Medium' | 'Low' | 'None Required';
  ventilation: 'Natural' | 'Mechanical' | 'Hybrid' | 'Controlled Clean Room';
  equipment: string[];
  notes?: string;
}

export interface DrawingSheet {
  id: string;
  sheetNumber: string;
  title: string;
  category: 'Architectural' | 'Structural' | 'Electrical' | 'Mechanical' | 'Sanitary' | 'Site' | 'Landscape' | 'Specialist';
  scale: string;
  status: ProfessionalReviewStatus;
  date: string;
  version: string;
  generatedBy: string;
  reviewerName?: string;
  reviewStatus: string;
  qrCode: string;
  disclaimer: string;
  notes: string;
  svgContent?: string;
}

export interface DesignOption {
  id: string;
  optionKey: 'Option A' | 'Option B' | 'Option C';
  title: string;
  description: string;
  floorAreaSqM: number;
  siteUtilizationPercent: number;
  capacityOccupants: number;
  circulationScore: number;
  naturalLightScore: number;
  costRangePHP: string;
  scheduleMonths: number;
  advantages: string[];
  limitations: string[];
  sustainabilityRating: string;
}

export interface DesignVersion {
  id: string;
  versionNumber: string;
  revisionNumber: number;
  description: string;
  timestamp: string;
  requestedBy: string;
  generatedBy: string;
  creditCost: number;
  reviewStatus: ProfessionalReviewStatus;
  assumptions: string[];
  limitations: string[];
  changesSummary: string;
}

export interface ProfessionalReviewRecord {
  id: string;
  projectId: string;
  reviewerName: string;
  profession: 'Architect' | 'Civil Engineer' | 'Structural Engineer' | 'Electrical Engineer' | 'Mechanical Engineer' | 'Sanitary Engineer' | 'Geodetic Engineer' | 'Environmental Specialist' | 'Quantity Surveyor';
  licenseNumber: string;
  licenseExpiry: string;
  verificationSource: string;
  verifiedDate: string;
  reviewScope: string;
  status: 'PENDING' | 'ACCEPTED' | 'REJECTED' | 'CONDITIONALLY_APPROVED';
  decision: string;
  comments: string;
  timestamp: string;
  conflictOfInterestDeclared: boolean;
}

export interface DesignProject {
  id: string;
  title: string;
  organizationId: string;
  clientName: string;
  clientEmail: string;
  sector: DesignProjectSector;
  projectType: string;
  description: string;
  location: string;
  stage: ProjectStage;
  status: 'Draft' | 'In Design' | 'Under Review' | 'Client Accepted' | 'Proposal Ready';
  floorAreaSqM: number;
  lotAreaSqM: number;
  floorsCount: number;
  estimatedBudgetPHP: string;
  targetCommencement: string;
  targetCompletion: string;
  createdAt: string;
  updatedAt: string;
  currentVersion: string;
  versionsCount: number;
  drawingSheetsCount: number;
  creditsSpent: number;
  // Detailed module contents
  siteInfo: {
    dimensions: string;
    boundaryNotes: string;
    roadAccess: string;
    orientation: string;
    topography: string;
    floodRisk: string;
    zoning: string;
    setbacks: string;
    easements: string;
    heightRestrictions: string;
  };
  requirements: {
    architecturalStyle: string;
    primaryMaterials: string[];
    sustainabilityGoals: string[];
    parkingSlots: number;
    accessibilityCompliance: boolean;
    solarReadiness: boolean;
    rainwaterHarvesting: boolean;
    bmsAutomation: boolean;
  };
  spaceProgram: SpaceProgramItem[];
  drawingSheets: DrawingSheet[];
  options: DesignOption[];
  versions: DesignVersion[];
  reviews: ProfessionalReviewRecord[];
}

export interface DesignStudioCreditEstimate {
  moduleId: DesignStudioModuleId;
  moduleName: string;
  baseCredits: number;
  complexityMultiplier: number;
  appliedFactors: string[];
  totalCreditsEstimated: number;
  availableBalance: number;
  remainingBalanceAfter: number;
  processingTimeEstimateSeconds: number;
}


