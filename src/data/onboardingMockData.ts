import {
  GovernmentSourceDefinition,
  GovernmentConnectorSpec,
  DemoVerificationScenario,
  VerificationRecord,
  VerificationHistoryEntry,
  RequirementRule,
  ContractorProfile,
  SupplierProfile,
  ProfessionalProfile,
  ClientProfile,
  ProjectParticipantRecord,
  OnboardingDocument,
  SiteMediaRecord,
} from '../types/onboardingTypes';
export const GOVERNMENT_SOURCES_REGISTRY: GovernmentSourceDefinition[] = [
  {
    "id": "gov-src-prc",
    "code": "PRC",
    "name": "Professional Regulation Commission Online Verification System",
    "agencyJurisdiction": "Republic of the Philippines",
    "category": "PROFESSIONAL_CREDENTIALS",
    "integrationStatus": "API AVAILABLE",
    "defaultConnector": "PRC_DEMO_CONNECTOR",
    "electronicVerificationAvailable": true,
    "portalUrl": "https://online.prc.gov.ph/Verification",
    "statutoryBasis": "Republic Act No. 8981 (PRC Modernization Act)",
    "rateLimitNote": "60 queries/min in simulation mode",
    "notes": "Verifies architect and engineering professional licenses and validity dates."
  },
  {
    "id": "gov-src-pcab",
    "code": "PCAB",
    "name": "Philippine Contractors Accreditation Board Verification Portal",
    "agencyJurisdiction": "Construction Industry Authority of the Philippines (CIAP / DTI)",
    "category": "CONTRACTOR_LICENSING",
    "integrationStatus": "API AVAILABLE",
    "defaultConnector": "PCAB_DEMO_CONNECTOR",
    "electronicVerificationAvailable": true,
    "portalUrl": "https://pcabgovph.com",
    "statutoryBasis": "Republic Act No. 4566 (Contractors License Law)",
    "rateLimitNote": "30 queries/min in simulation mode",
    "notes": "Verifies contractor category (AAA, AA, A, B, C, D) and principal qualifying licenses."
  },
  {
    "id": "gov-src-sec",
    "code": "SEC",
    "name": "Securities and Exchange Commission Electronic Records Portal",
    "agencyJurisdiction": "Republic of the Philippines",
    "category": "BUSINESS_REGISTRATION",
    "integrationStatus": "API AVAILABLE",
    "defaultConnector": "SEC_DEMO_CONNECTOR",
    "electronicVerificationAvailable": true,
    "portalUrl": "https://esparc.sec.gov.ph",
    "statutoryBasis": "Republic Act No. 11232 (Revised Corporation Code of the Philippines)",
    "rateLimitNote": "120 queries/min",
    "notes": "Validates corporate registration status, articles of incorporation, and board resolutions."
  },
  {
    "id": "gov-src-dti",
    "code": "DTI",
    "name": "Department of Trade and Industry Business Name Registry System",
    "agencyJurisdiction": "Republic of the Philippines",
    "category": "BUSINESS_REGISTRATION",
    "integrationStatus": "API AVAILABLE",
    "defaultConnector": "DTI_DEMO_CONNECTOR",
    "electronicVerificationAvailable": true,
    "portalUrl": "https://bnrs.dti.gov.ph",
    "statutoryBasis": "Act No. 3883 (Business Names Act)",
    "rateLimitNote": "60 queries/min",
    "notes": "Validates sole proprietorship registration and territorial business jurisdiction."
  },
  {
    "id": "gov-src-bir",
    "code": "BIR",
    "name": "Bureau of Internal Revenue Taxpayer Identification Registry",
    "agencyJurisdiction": "Department of Finance, Philippines",
    "category": "TAX_CREDENTIALS",
    "integrationStatus": "API AVAILABLE",
    "defaultConnector": "BIR_DEMO_CONNECTOR",
    "electronicVerificationAvailable": true,
    "portalUrl": "https://www.bir.gov.ph",
    "statutoryBasis": "National Internal Revenue Code (NIRC)",
    "rateLimitNote": "30 queries/min",
    "notes": "Validates Tax Identification Number (TIN) formatting and Form 2303 registration."
  }
] as unknown as GovernmentSourceDefinition[];
export const GOVERNMENT_CONNECTORS_LIST: GovernmentConnectorSpec[] = [
  {
    "id": "PRC_DEMO_CONNECTOR",
    "agency": "PRC",
    "fullName": "PRC Licensure Verification Demo Engine",
    "environment": "DEMO",
    "status": "Active",
    "lastSuccessfulConnection": "2026-09-18T08:30:00Z",
    "lastCheck": "2026-09-18T09:00:00Z",
    "apiVersion": "v2.4-sim",
    "authenticationType": "SIMULATED_HMAC",
    "rateLimit": "60 req/min",
    "webhookSupport": true,
    "productionEnabled": false,
    "realDataTransmission": false,
    "latencyMs": 140,
    "description": "Simulates instantaneous professional license checks for architects, civil engineers, and master electricians."
  },
  {
    "id": "PCAB_DEMO_CONNECTOR",
    "agency": "PCAB",
    "fullName": "PCAB Contractor Accreditation Engine",
    "environment": "DEMO",
    "status": "Active",
    "lastSuccessfulConnection": "2026-09-18T08:35:00Z",
    "lastCheck": "2026-09-18T09:00:00Z",
    "apiVersion": "v1.8-sim",
    "authenticationType": "SIMULATED_HMAC",
    "rateLimit": "30 req/min",
    "webhookSupport": true,
    "productionEnabled": false,
    "realDataTransmission": false,
    "latencyMs": 195,
    "description": "Validates contractor licensing tiers, joint-venture eligibility, and qualifying license records."
  },
  {
    "id": "SEC_DEMO_CONNECTOR",
    "agency": "SEC",
    "fullName": "SEC Corporate Registry Engine",
    "environment": "DEMO",
    "status": "Active",
    "lastSuccessfulConnection": "2026-09-18T08:40:00Z",
    "lastCheck": "2026-09-18T09:00:00Z",
    "apiVersion": "v3.1-sim",
    "authenticationType": "BEARER_TOKEN",
    "rateLimit": "120 req/min",
    "webhookSupport": false,
    "productionEnabled": false,
    "realDataTransmission": false,
    "latencyMs": 120,
    "description": "Checks corporate existence, registered corporate officers, and authorized signatories."
  },
  {
    "id": "DTI_DEMO_CONNECTOR",
    "agency": "DTI",
    "fullName": "DTI Business Name Registry Engine",
    "environment": "DEMO",
    "status": "Active",
    "lastSuccessfulConnection": "2026-09-18T08:45:00Z",
    "lastCheck": "2026-09-18T09:00:00Z",
    "apiVersion": "v2.0-sim",
    "authenticationType": "API_KEY",
    "rateLimit": "60 req/min",
    "webhookSupport": false,
    "productionEnabled": false,
    "realDataTransmission": false,
    "latencyMs": 110,
    "description": "Checks national sole proprietor registrations and validity periods."
  },
  {
    "id": "BIR_DEMO_CONNECTOR",
    "agency": "BIR",
    "fullName": "BIR Form 2303 Taxpayer Validation Engine",
    "environment": "DEMO",
    "status": "Active",
    "lastSuccessfulConnection": "2026-09-18T08:50:00Z",
    "lastCheck": "2026-09-18T09:00:00Z",
    "apiVersion": "v1.0-sim",
    "authenticationType": "API_KEY",
    "rateLimit": "30 req/min",
    "webhookSupport": false,
    "productionEnabled": false,
    "realDataTransmission": false,
    "latencyMs": 230,
    "description": "Validates 9-digit or 12-digit Taxpayer Identification Numbers against test registries."
  }
] as unknown as GovernmentConnectorSpec[];
export const DEMO_VERIFICATION_SCENARIOS: DemoVerificationScenario[] = [
  {
    "id": "scen-01",
    "title": "Valid Active PRC Architect (High Confidence Match)",
    "scenarioType": "VALID_PROFESSIONAL",
    "targetCredentialType": "PRC Architect License",
    "mockLicenseNumber": "0029481",
    "mockEntityName": "Arch. Maria Elena Santos",
    "connector": "PRC_DEMO_CONNECTOR",
    "expectedStatus": "Active",
    "badge": "API VERIFIED",
    "description": "Demonstrates a verified PRC license with matching name, unexpired status, and clean standing."
  },
  {
    "id": "scen-02",
    "title": "Expired Professional License (Warning Flag)",
    "scenarioType": "EXPIRED_PROFESSIONAL",
    "targetCredentialType": "PRC Civil Engineer License",
    "mockLicenseNumber": "0081290",
    "mockEntityName": "Engr. Roberto D. Cruz",
    "connector": "PRC_DEMO_CONNECTOR",
    "expectedStatus": "Expired",
    "badge": "REQUIRES REVIEW",
    "description": "Triggers automatic portal warning and prevents stamping authority until renewal proof is submitted."
  },
  {
    "id": "scen-03",
    "title": "Active PCAB Category AAA General Engineering Contractor",
    "scenarioType": "CONTRACTOR_ACTIVE",
    "targetCredentialType": "PCAB License",
    "mockLicenseNumber": "PCAB-48190-AAA",
    "mockEntityName": "Luzon Heavy Foundations Corp.",
    "connector": "PCAB_DEMO_CONNECTOR",
    "expectedStatus": "Active",
    "badge": "API VERIFIED",
    "description": "Validates Tier AAA contractor status for high-rise or large infrastructure execution."
  }
] as unknown as DemoVerificationScenario[];
export const INITIAL_VERIFICATION_RECORDS: VerificationRecord[] = [
  {
    "verificationId": "VER-2026-000101",
    "credentialId": "CRD-PRC-0029481",
    "entityId": "PRO-2026-000001",
    "entityType": "PROFESSIONAL",
    "agency": "PRC",
    "connector": "PRC_DEMO_CONNECTOR",
    "environment": "DEMO",
    "verificationMethod": "SIMULATED_CONNECTOR",
    "requestTimestamp": "2026-09-15T10:00:00Z",
    "responseTimestamp": "2026-09-15T10:00:02Z",
    "status": "Active",
    "badge": "API VERIFIED",
    "recordMatch": true,
    "nameMatch": true,
    "licenseNumberMatch": true,
    "expirationDate": "2027-11-20",
    "governmentStatus": "Active & In Good Standing",
    "sourceReference": "PRC-E-VERIFY-REF-88912",
    "reviewStatus": "REVIEWED_ACCEPTED",
    "reviewedBy": "Compliance Officer Dhenze Team",
    "reviewedAt": "2026-09-15T10:30:00Z",
    "notes": "Verified PRC Architect license matching UAP registry.",
    "createdAt": "2026-09-15T10:00:00Z",
    "updatedAt": "2026-09-15T10:30:00Z",
    "comparisonFields": {
      "fullName": {
        "uploaded": "Arch. Maria Elena Santos",
        "government": "Arch. Maria Elena Santos",
        "match": true
      },
      "licenseNumber": {
        "uploaded": "0029481",
        "government": "0029481",
        "match": true
      },
      "expirationDate": {
        "uploaded": "2027-11-20",
        "government": "2027-11-20",
        "match": true
      },
      "currentStatus": {
        "uploaded": "Active",
        "government": "Active",
        "match": true
      },
      "issuingAuthority": {
        "uploaded": "Professional Regulation Commission",
        "government": "Professional Regulation Commission",
        "match": true
      }
    },
    "discrepancies": []
  }
] as unknown as VerificationRecord[];
export const INITIAL_VERIFICATION_HISTORY: VerificationHistoryEntry[] = [
  {
    "id": "VLOG-2026-0001",
    "verificationNumber": "VER-2026-000101",
    "credentialId": "CRD-PRC-0029481",
    "entityId": "PRO-2026-000001",
    "personOrOrgName": "Arch. Maria Elena Santos",
    "governmentSource": "PRC Online Registry",
    "connector": "PRC_DEMO_CONNECTOR",
    "verificationTimestamp": "2026-09-15T10:00:02Z",
    "previousResult": "INITIAL_SUBMISSION",
    "currentResult": "Active",
    "responseReferenceId": "PRC-RESP-88912",
    "verificationMode": "DEMO",
    "reviewer": "SYSTEM_AUTOMATION",
    "notes": "Automated connector match succeeded with 100% confidence.",
    "discrepancyCount": 0
  }
] as unknown as VerificationHistoryEntry[];
export const INITIAL_REQUIREMENT_RULES: RequirementRule[] = [
  {
    "id": "req-01",
    "entityType": "CONTRACTOR",
    "documentTitle": "PCAB Contractor License (Category A or above)",
    "categoryLabel": "Statutory Licensing",
    "mandatory": true,
    "requiresGovernmentVerification": true,
    "description": "Mandatory PCAB accreditation under Republic Act 4566 for general building or civil engineering.",
    "statutoryReference": "RA 4566 / CIAP Guidelines"
  },
  {
    "id": "req-02",
    "entityType": "PROFESSIONAL",
    "documentTitle": "PRC Professional Identification Card & PTR",
    "categoryLabel": "Professional License",
    "mandatory": true,
    "requiresGovernmentVerification": true,
    "description": "Duly registered PRC license and current Professional Tax Receipt under RA 9266 or RA 544.",
    "statutoryReference": "RA 9266 / RA 544"
  },
  {
    "id": "req-03",
    "entityType": "SUPPLIER",
    "documentTitle": "BIR Form 2303 Certificate of Registration",
    "categoryLabel": "Tax Compliance",
    "mandatory": true,
    "requiresGovernmentVerification": true,
    "description": "Official BIR Form 2303 indicating taxpayer classification, line of business, and registered address.",
    "statutoryReference": "National Internal Revenue Code (NIRC)"
  },
  {
    "id": "req-04",
    "entityType": "SUPPLIER",
    "documentTitle": "Board Resolution or Secretary's Certificate for Signatory",
    "categoryLabel": "Corporate Authority",
    "mandatory": true,
    "requiresGovernmentVerification": false,
    "description": "Corporate certification granting commercial signatory and bidding authority.",
    "statutoryReference": "Revised Corporation Code (RA 11232)"
  },
  {
    "id": "req-05",
    "entityType": "CLIENT",
    "documentTitle": "Land Title (TCT) or Certified True Copy of Lot Plan",
    "categoryLabel": "Site Proof",
    "mandatory": true,
    "requiresGovernmentVerification": false,
    "description": "Verification of property ownership or authorized development mandate.",
    "statutoryReference": "Property Registration Decree (PD 1529)"
  }
] as unknown as RequirementRule[];
export const INITIAL_CONTRACTORS: ContractorProfile[] = [
  {
    "id": "CTR-2026-000001",
    "registeredBusinessName": "Pampanga Prime Structural Builders Inc.",
    "tradeName": "Prime Structural",
    "companyType": "Corporation",
    "businessAddress": "MacArthur Highway, Balibago, Angeles City, Pampanga",
    "officeAddress": "MacArthur Highway, Balibago, Angeles City, Pampanga",
    "mailingAddress": "MacArthur Highway, Balibago, Angeles City, Pampanga",
    "contactNumbers": "+63 45 888 1234 / +63 917 555 9876",
    "officialEmail": "operations@primestructural.ph",
    "website": "https://primestructural.ph",
    "yearEstablished": 2012,
    "taxIdentificationNumber": "210-987-654-000",
    "authorizedRepresentative": "Engr. Ferdinand David",
    "primaryContact": "Engr. Ferdinand David",
    "emergencyContact": "+63 917 999 1122",
    "classification": "General Building / General Engineering",
    "specialization": [
      "Heavy Reinforced Concrete",
      "Structural Steel Erection",
      "Post-Tensioning",
      "Mass Earthworks"
    ],
    "yearsExperience": 14,
    "geographicCoverage": [
      "Angeles City",
      "Clark Freeport Zone",
      "San Fernando",
      "Tarlac",
      "Bataan"
    ],
    "maxProjectCapacityPHP": 250000000,
    "equipmentOwned": [
      "2x 30-ton Mobile Cranes",
      "4x CAT 320D Excavators",
      "8x 10-wheeler Dump Trucks",
      "Concrete Boom Pump"
    ],
    "equipmentLeased": [
      "Tower Cranes as needed"
    ],
    "totalEmployees": 180,
    "licensedEngineersCount": 12,
    "skilledWorkersCount": 140,
    "certifiedSafetyPersonnelCount": 4,
    "currentProjectsCount": 3,
    "completedProjectsCount": 48,
    "safetyRating": "Zero Lost-Time Incidents (Last 24 Months)",
    "onboardingProgressPercent": 100,
    "status": "Approved",
    "credentialIds": [
      "CRD-PCAB-01",
      "CRD-BIR-01"
    ],
    "createdAt": "2026-08-01T08:00:00Z"
  }
] as unknown as ContractorProfile[];
export const INITIAL_SUPPLIERS: SupplierProfile[] = [
  {
    "id": "SUP-2026-000001",
    "registeredCompanyName": "Central Luzon Aggregates and Ready-Mix Corp.",
    "tradeName": "CL Ready-Mix",
    "companyType": "Corporation",
    "registrationNumber": "CS201509182",
    "taxIdentificationNumber": "009-123-456-000",
    "businessAddress": "Industrial Zone, Porac, Pampanga",
    "warehouseAddress": "Batching Plant 1, Porac Bypass Road, Pampanga",
    "branches": [
      "Angeles Plant",
      "San Fernando Plant",
      "Clark North Plant"
    ],
    "contactDetails": "+63 45 625 4321 / sales@clreadymix.ph",
    "website": "https://clreadymix.ph",
    "productCategories": [
      "Ready-Mix Concrete (3000-6000 PSI)",
      "Washed Sand (S-1)",
      "Crushed Gravel (G-1, G-2)",
      "Paving Blocks"
    ],
    "brandsRepresented": [
      "CL Ready-Mix UltraStrength",
      "Pampanga Blue Aggregates"
    ],
    "leadTimeDays": 2,
    "minimumOrderPHP": 25000,
    "deliveryCoverage": [
      "Angeles City",
      "Mabalacat",
      "San Fernando",
      "Porac",
      "Clark Zone"
    ],
    "paymentTerms": "30 Days Net on Audited Delivery Slips",
    "creditTerms": "Up to ₱5,000,000 revolving credit line",
    "warrantyPeriod": "Mill Certificate & 28-day Laboratory Cylinder Break Verification",
    "returnPolicy": "Slump test rejection upon arrival prior to discharge",
    "authorizedSignatoryName": "Victoria G. Dizon",
    "authorityDocumentType": "Secretary's Certificate",
    "authorityReviewDate": "2026-01-15",
    "authorityRequiresAnnualReview": true,
    "onboardingProgressPercent": 100,
    "status": "Approved",
    "credentialIds": [
      "CRD-SUP-01"
    ],
    "createdAt": "2026-08-05T09:00:00Z"
  }
] as unknown as SupplierProfile[];
export const INITIAL_PROFESSIONALS: ProfessionalProfile[] = [
  {
    "id": "PRO-2026-000001",
    "fullName": "Arch. Maria Elena Santos",
    "professionalTitle": "PRC Registered & Licensed Architect",
    "profession": "Architect",
    "contactInformation": "+63 918 333 4455 / ar.santos@ldldhenze.com",
    "businessAddress": "Suite 401, Clark Center, Angeles City, Pampanga",
    "professionalAddress": "Suite 401, Clark Center, Angeles City, Pampanga",
    "firmAffiliation": "Studio Santos Architecture & Design",
    "yearsExperience": 16,
    "specializations": [
      "Tropical Modern Residential",
      "Master Planned Communities",
      "Commercial Retail Centers",
      "Biophilic Design"
    ],
    "professionalBiography": "Distinguished graduate of UST College of Architecture. Over 16 years leading high-profile residential developments and luxury resorts in Central Luzon.",
    "prcLicenseNumber": "0029481",
    "prcExpiryDate": "2027-11-20",
    "ptrNumber": "PTR-ANG-2026-88129",
    "accreditedOrgMembership": "United Architects of the Philippines (UAP) Angeles Chapter - Regular Member #14902",
    "onboardingProgressPercent": 100,
    "status": "Approved",
    "credentialIds": [
      "CRD-PRC-0029481"
    ],
    "assignedProjectsCount": 4,
    "createdAt": "2026-08-10T10:00:00Z"
  }
] as unknown as ProfessionalProfile[];
export const INITIAL_CLIENTS: ClientProfile[] = [
  {
    "id": "CLI-2026-000001",
    "clientType": "CORPORATE",
    "fullNameOrCompanyName": "Clark Highlands Development Consortium",
    "contactDetails": "+63 917 888 7766 / e.miranda@clarkholdings.ph",
    "officialEmail": "e.miranda@clarkholdings.ph",
    "address": "Executive Tower 2, Clark Global City, Mabalacat, Pampanga",
    "authorizedRepresentative": "Don Eduardo Miranda (Managing Director)",
    "preferredCommunicationChannel": "Secure Portal",
    "billingInformation": "Clark Highlands Development Consortium, BIR TIN: 402-881-992-000",
    "decisionMakers": [
      "Don Eduardo Miranda",
      "Atty. Cristina Gomez (General Counsel)"
    ],
    "proposedProjectTitle": "The Clark Highlands Luxury Estate Villa",
    "projectType": "Single-Family Luxury Residential Estate",
    "projectLocation": "Clark Highlands, Angeles City, Pampanga",
    "siteAreaSqm": 1200,
    "proposedFloorAreaSqm": 680,
    "numberOfFloors": 2,
    "intendedUse": "Private Executive Residence",
    "projectDescription": "Two-story luxury tropical villa with custom infinity pool, 15kW solar microgrid, and smart security automation.",
    "objectives": "Create an enduring generational estate with high thermal comfort and seismic resilience.",
    "scopeOfWork": "Complete Architectural & Engineering Design, Permitting, and Turnkey Civil Construction.",
    "preferredDesignStyle": "Contemporary Tropical Minimalist",
    "specialRequirements": "Seismic structural design exceeding NSCP 2015 Zone 4 mandates.",
    "sustainabilityRequirements": "Solar PV microgrid and rainwater harvesting cistern.",
    "budgetStatus": "Approved",
    "targetBudgetPHP": 42500000,
    "fundingStatus": "Fully Funded in Escrow",
    "targetCommencement": "2026-11-01",
    "targetCompletion": "2027-10-31",
    "knownSiteConditions": "Elevated terrain with excellent natural drainage and unobstructed Western mountain views.",
    "onboardingProgressPercent": 100,
    "status": "Approved",
    "createdAt": "2026-08-15T08:00:00Z"
  }
] as unknown as ClientProfile[];
export const INITIAL_PROJECT_PARTICIPANTS: ProjectParticipantRecord[] = [
  {
    "id": "PAR-2026-001",
    "projectId": "PRJ-2026-000001",
    "projectName": "The Clark Highlands Luxury Estate Villa",
    "entityId": "PRO-2026-000001",
    "entityName": "Arch. Maria Elena Santos",
    "entityType": "PROFESSIONAL",
    "role": "Principal Architect of Record",
    "scope": "Architectural Design, Permitting & Periodic Construction Inspection",
    "contractReference": "CTR-2026-ARCH-001",
    "startDate": "2026-08-15",
    "endDate": "2027-10-31",
    "approvalStatus": "APPROVED",
    "credentialStatus": "COMPLIANT",
    "assignedWorkPackages": [
      "WP-01-ARCH",
      "WP-02-PERMIT"
    ]
  },
  {
    "id": "PAR-2026-002",
    "projectId": "PRJ-2026-000001",
    "projectName": "The Clark Highlands Luxury Estate Villa",
    "entityId": "CTR-2026-000001",
    "entityName": "Pampanga Prime Structural Builders Inc.",
    "entityType": "CONTRACTOR",
    "role": "General Structural Contractor",
    "scope": "Substructure, Superstructure Reinforced Concrete, and Roofing Framing",
    "contractReference": "CTR-2026-CONST-004",
    "startDate": "2026-11-01",
    "endDate": "2027-08-31",
    "approvalStatus": "APPROVED",
    "credentialStatus": "COMPLIANT",
    "assignedWorkPackages": [
      "WP-03-CIVIL",
      "WP-04-STRUCTURAL"
    ]
  }
] as unknown as ProjectParticipantRecord[];
export const INITIAL_DOCUMENTS: OnboardingDocument[] = [
  {
    "id": "DOC-2026-000001",
    "title": "PRC Professional ID Card - Arch. Maria Elena Santos",
    "entityId": "PRO-2026-000001",
    "entityType": "PROFESSIONAL",
    "projectId": "PRJ-2026-000001",
    "category": "PROFESSIONAL/PRC-LICENSE",
    "fileName": "PRC_License_0029481_Santos.pdf",
    "fileSizeKb": 1420,
    "mimeType": "application/pdf",
    "uploadDate": "2026-08-10T10:15:00Z",
    "uploadedBy": "Arch. Maria Elena Santos",
    "confidential": false,
    "version": 1,
    "sha256Hash": "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
    "pipelineStatus": {
      "staged": true,
      "signatureValidated": true,
      "malwareCheckStatus": "SIMULATED_PASSED",
      "encryptedAtRest": true
    },
    "aiExtraction": {
      "documentType": "PRC Professional Identification Card",
      "extractedLicenseNumber": "0029481",
      "extractedIssuer": "Professional Regulation Commission",
      "extractedIssueDate": "2015-11-20",
      "extractedExpirationDate": "2027-11-20",
      "extractedEntityName": "Arch. Maria Elena Santos",
      "confidenceScore": 0.99,
      "isVerifiedByHuman": true
    },
    "lifecycleStatus": "Approved",
    "reviewNotes": "Verified against PRC Online database.",
    "downloadUrl": "/mock/docs/prc-license-santos.pdf"
  }
] as unknown as OnboardingDocument[];
export const INITIAL_SITE_MEDIA: SiteMediaRecord[] = [
  {
    "id": "MED-2026-000001",
    "projectId": "PRJ-2026-000001",
    "fileId": "DOC-2026-000002",
    "title": "Site Topography & Boundary Demarcation Survey",
    "mediaType": "PHOTO",
    "thumbnailUrl": "https://images.unsplash.com/photo-1541888946425-d0fbb186156f?auto=format&fit=crop&w=400&q=80",
    "mediaUrl": "https://images.unsplash.com/photo-1541888946425-d0fbb186156f?auto=format&fit=crop&w=1200&q=80",
    "uploadDate": "2026-08-20T11:00:00Z",
    "captureDate": "2026-08-19T14:30:00Z",
    "uploadedBy": "Engr. Ferdinand David",
    "description": "Geodetic survey pins confirmed at Western corner with Leica total station.",
    "phase": "Site Clearing",
    "locationDescription": "Northwest corner lot monument #4",
    "buildingOrStructure": "Main Residence Lot",
    "floor": "Grade Level",
    "workPackage": "WP-01-SURVEY",
    "contractorName": "Pampanga Prime Structural Builders Inc.",
    "tags": [
      "Survey",
      "Topography",
      "Monuments",
      "Pre-Construction"
    ],
    "reviewStatus": "APPROVED"
  }
] as unknown as SiteMediaRecord[];
