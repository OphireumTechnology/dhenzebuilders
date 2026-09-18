import {
  PlatformOrganization,
  MasterProjectRecord,
  WBSTaskRecord,
  MilestoneRecord,
  CDEDocumentRecord,
  InvoiceRecord,
  RFIRecord,
  PartnerRecord,
  SubcontractorProposal,
  SupplierRecord,
  SupplierCatalogItem,
  RFQRecord,
  SupplierQuotationRecord,
  PurchaseOrderRecord,
  MaterialDeliveryRecord,
  AuditLogRecord,
} from '../types/platform';
export const SEED_ORGANIZATIONS: PlatformOrganization[] = [
  {
    "id": "org-client-clark",
    "tenantId": "tenant-ph-01",
    "name": "Clark Highlands Development Consortium",
    "tradeName": "Clark Highlands",
    "type": "CLIENT",
    "registrationNumber": "CS202100892",
    "taxIdentificationNumber": "402-881-992-000",
    "registeredAddress": "Executive Tower 2, Clark Global City, Mabalacat, Pampanga",
    "primaryContactName": "Don Eduardo Miranda",
    "primaryContactEmail": "e.miranda@clarkholdings.ph",
    "primaryContactPhone": "+63 917 888 7766",
    "verified": true,
    "status": "ACTIVE",
    "createdAt": "2026-08-01T08:00:00Z",
    "tier": "INSTITUTIONAL",
    "totalProjectsCount": 2
  },
  {
    "id": "org-partner-prime",
    "tenantId": "tenant-ph-01",
    "name": "Pampanga Prime Structural Builders Inc.",
    "tradeName": "Prime Structural",
    "type": "PARTNER_CONTRACTOR",
    "registrationNumber": "CS201208921",
    "taxIdentificationNumber": "210-987-654-000",
    "registeredAddress": "MacArthur Highway, Balibago, Angeles City, Pampanga",
    "primaryContactName": "Engr. Ferdinand David",
    "primaryContactEmail": "operations@primestructural.ph",
    "primaryContactPhone": "+63 45 888 1234",
    "verified": true,
    "status": "ACTIVE",
    "createdAt": "2026-08-01T08:00:00Z",
    "tier": "STRATEGIC",
    "totalProjectsCount": 4
  },
  {
    "id": "org-supplier-cl",
    "tenantId": "tenant-ph-01",
    "name": "Central Luzon Aggregates and Ready-Mix Corp.",
    "tradeName": "CL Ready-Mix",
    "type": "SUPPLIER",
    "registrationNumber": "CS201509182",
    "taxIdentificationNumber": "009-123-456-000",
    "registeredAddress": "Industrial Zone, Porac, Pampanga",
    "primaryContactName": "Victoria G. Dizon",
    "primaryContactEmail": "sales@clreadymix.ph",
    "primaryContactPhone": "+63 45 625 4321",
    "verified": true,
    "status": "ACTIVE",
    "createdAt": "2026-08-05T09:00:00Z",
    "tier": "STRATEGIC",
    "totalProjectsCount": 5
  }
] as unknown as PlatformOrganization[];
export const SEED_PROJECTS: MasterProjectRecord[] = [
  {
    "id": "PRJ-2026-000001",
    "projectNumber": "PRJ-2026-000001",
    "title": "The Clark Highlands Luxury Estate Villa",
    "clientOrgId": "org-client-clark",
    "clientName": "Clark Highlands Development Consortium",
    "sector": "Residential",
    "location": "Clark Highlands, Angeles City, Pampanga",
    "currentPhase": "PREDEVELOPMENT",
    "status": "ACTIVE",
    "budgetBaselinePHP": 42500000,
    "committedCostPHP": 38200000,
    "actualSpentPHP": 4850000,
    "scheduleBaselineDays": 365,
    "overallProgressPercent": 18,
    "targetCompletionDate": "2027-10-31",
    "projectManagerName": "Engr. Leodenis Languisan",
    "projectManagerEmail": "dhenzebuilders@gmail.com",
    "safetyDaysWithoutIncident": 142
  },
  {
    "id": "PRJ-2026-000002",
    "projectNumber": "PRJ-2026-000002",
    "title": "Porac Agro-Industrial Cold Storage Facility",
    "clientOrgId": "org-client-clark",
    "clientName": "Central Agro-Logistics Inc.",
    "sector": "Agriculture and Agro-Industrial",
    "location": "Porac Bypass Road, Pampanga",
    "currentPhase": "CIVIL_CONSTRUCTION",
    "status": "ACTIVE",
    "budgetBaselinePHP": 85000000,
    "committedCostPHP": 79000000,
    "actualSpentPHP": 28400000,
    "scheduleBaselineDays": 450,
    "overallProgressPercent": 35,
    "targetCompletionDate": "2027-04-30",
    "projectManagerName": "Engr. Ferdinand David",
    "projectManagerEmail": "operations@primestructural.ph",
    "safetyDaysWithoutIncident": 215
  }
] as unknown as MasterProjectRecord[];
export const SEED_TASKS: WBSTaskRecord[] = [
  {
    "id": "TSK-001",
    "taskNumber": "1.1.1",
    "projectId": "PRJ-2026-000001",
    "title": "Geodetic Site Boundary Verification & Topographic Survey",
    "description": "Verify all cadastral boundary pins with robotic total station and establish temporary site benchmark.",
    "phase": "Pre-Development",
    "discipline": "Civil / Geodetic",
    "assignedToName": "Engr. Ferdinand David",
    "responsibleOrgName": "Pampanga Prime Structural Builders Inc.",
    "priority": "HIGH",
    "status": "ACCEPTED",
    "progressPercent": 100,
    "plannedStartDate": "2026-08-15",
    "plannedEndDate": "2026-08-25",
    "actualEndDate": "2026-08-24",
    "dependencies": [],
    "budgetReferencePHP": 120000,
    "riskRating": "LOW"
  },
  {
    "id": "TSK-002",
    "taskNumber": "1.2.1",
    "projectId": "PRJ-2026-000001",
    "title": "Architectural Detailed Working Drawings & Specifications",
    "description": "Complete 1:100 scale plans, sections, elevations, and door/window schedules for building permit filing.",
    "phase": "Detailed Design",
    "discipline": "Architectural",
    "assignedToName": "Arch. Maria Elena Santos",
    "responsibleOrgName": "Studio Santos Architecture",
    "priority": "HIGH",
    "status": "IN_PROGRESS",
    "progressPercent": 75,
    "plannedStartDate": "2026-08-26",
    "plannedEndDate": "2026-09-30",
    "dependencies": [
      "TSK-001"
    ],
    "budgetReferencePHP": 850000,
    "riskRating": "MEDIUM"
  },
  {
    "id": "TSK-003",
    "taskNumber": "2.1.1",
    "projectId": "PRJ-2026-000001",
    "title": "Site Clearing, Grubbing & Temporary Facility Mobilization",
    "description": "Site mobilization, perimeter hoarding, guard station installation, and temporary electrical hookup.",
    "phase": "Civil Construction",
    "discipline": "Civil",
    "assignedToName": "Engr. Ferdinand David",
    "responsibleOrgName": "Pampanga Prime Structural Builders Inc.",
    "priority": "MEDIUM",
    "status": "READY",
    "progressPercent": 0,
    "plannedStartDate": "2026-10-01",
    "plannedEndDate": "2026-10-15",
    "dependencies": [
      "TSK-002"
    ],
    "budgetReferencePHP": 350000,
    "riskRating": "LOW"
  }
] as unknown as WBSTaskRecord[];
export const SEED_MILESTONES: MilestoneRecord[] = [
  {
    "id": "MLS-001",
    "projectId": "PRJ-2026-000001",
    "title": "Site Acquisition & Geotechnical Soil Investigation",
    "phase": "Feasibility",
    "targetDate": "2026-08-20",
    "actualDate": "2026-08-19",
    "completionPercent": 100,
    "status": "ACHIEVED",
    "deliverableDocumentNumber": "DOC-GEO-2026-001",
    "signoffRequiredBy": [
      "Owner",
      "Principal Civil Engineer"
    ]
  },
  {
    "id": "MLS-002",
    "projectId": "PRJ-2026-000001",
    "title": "100% Signed & Sealed Architectural & Engineering Blueprints",
    "phase": "Detailed Design",
    "targetDate": "2026-09-30",
    "completionPercent": 75,
    "status": "IN_PROGRESS",
    "deliverableDocumentNumber": "CDE-PRJ01-ARCH-SET-01",
    "signoffRequiredBy": [
      "Arch of Record",
      "Structural Engineer of Record",
      "Client"
    ]
  },
  {
    "id": "MLS-003",
    "projectId": "PRJ-2026-000001",
    "title": "LGU Building Permit Issuance & Breaking Ground",
    "phase": "Permitting",
    "targetDate": "2026-10-25",
    "completionPercent": 20,
    "status": "PLANNED",
    "signoffRequiredBy": [
      "Building Official",
      "General Contractor"
    ]
  }
] as unknown as MilestoneRecord[];
export const SEED_CDE_DOCUMENTS: CDEDocumentRecord[] = [
  {
    "id": "CDE-DOC-001",
    "documentNumber": "A-101-PLN",
    "title": "Ground Floor Architectural Floor Plan",
    "projectId": "PRJ-2026-000001",
    "organizationId": "org-client-clark",
    "discipline": "ARCH",
    "documentType": "DRAWING",
    "revision": "Rev 1",
    "status": "SHARED_FOR_REVIEW",
    "classification": "CONFIDENTIAL",
    "authorName": "Arch. Maria Elena Santos",
    "authorOrgName": "Studio Santos Architecture",
    "reviewStatus": "Pending Final Owner Concurrence",
    "fileHash": "9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08",
    "fileSizeKB": 3420,
    "fileExtension": "pdf",
    "createdDate": "2026-09-01T08:00:00Z",
    "lastUpdated": "2026-09-12T14:30:00Z",
    "downloadRestricted": false,
    "watermarkRequired": true
  },
  {
    "id": "CDE-DOC-002",
    "documentNumber": "S-001-CALC",
    "title": "Structural Design Criteria & Seismic Calculation Report",
    "projectId": "PRJ-2026-000001",
    "organizationId": "org-client-clark",
    "discipline": "STRUCT",
    "documentType": "REPORT",
    "revision": "Rev 0",
    "status": "ACCEPTED",
    "classification": "CONFIDENTIAL",
    "authorName": "Engr. Leodenis Languisan",
    "authorOrgName": "LDL Dhenze Residential Building Construction",
    "reviewStatus": "Approved by Structural Peer Reviewer",
    "fileHash": "5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8",
    "fileSizeKB": 8400,
    "fileExtension": "pdf",
    "createdDate": "2026-08-28T10:00:00Z",
    "lastUpdated": "2026-09-02T11:00:00Z",
    "downloadRestricted": true,
    "watermarkRequired": true
  }
] as unknown as CDEDocumentRecord[];
export const SEED_INVOICES: InvoiceRecord[] = [
  {
    "id": "INV-2026-0001",
    "invoiceNumber": "INV-2026-0001",
    "projectId": "PRJ-2026-000001",
    "recipientOrgId": "org-client-clark",
    "recipientOrgName": "Clark Highlands Development Consortium",
    "milestoneReference": "MLS-001: Feasibility & Geotechnical Completion",
    "grossAmountPHP": 1250000,
    "taxAmountPHP": 150000,
    "retentionDeductionPHP": 125000,
    "netPayablePHP": 1275000,
    "invoiceDate": "2026-08-25",
    "dueDate": "2026-09-24",
    "status": "PAID",
    "paymentDate": "2026-09-10",
    "bankReference": "BDO-REF-9921827"
  },
  {
    "id": "INV-2026-0002",
    "invoiceNumber": "INV-2026-0002",
    "projectId": "PRJ-2026-000001",
    "recipientOrgId": "org-client-clark",
    "recipientOrgName": "Clark Highlands Development Consortium",
    "milestoneReference": "MLS-002: Detailed Engineering 50% Submittal",
    "grossAmountPHP": 2500000,
    "taxAmountPHP": 300000,
    "retentionDeductionPHP": 250000,
    "netPayablePHP": 2550000,
    "invoiceDate": "2026-09-15",
    "dueDate": "2026-10-15",
    "status": "ISSUED"
  }
] as unknown as InvoiceRecord[];
export const SEED_RFIS: RFIRecord[] = [
  {
    "id": "RFI-001",
    "rfiNumber": "RFI-2026-001",
    "projectId": "PRJ-2026-000001",
    "title": "Reinforcement Lap Splice Details for Grade Beams at Grid 3-B",
    "subjectDiscipline": "STRUCTURAL",
    "submittedByName": "Engr. Ferdinand David",
    "submittedByOrg": "Pampanga Prime Structural Builders Inc.",
    "dateRaised": "2026-09-08",
    "dateRequired": "2026-09-15",
    "question": "Please confirm required tension lap length for 25mm rebar at continuous footing junctions.",
    "assignedResponderName": "Engr. Leodenis Languisan",
    "status": "ANSWERED",
    "answerText": "Provide 1200mm Class B tension lap splice with staggered splices not exceeding 50% at any section per Sheet S-501.",
    "answeredDate": "2026-09-10",
    "costImpactIdentified": false,
    "scheduleImpactDays": 0
  }
] as unknown as RFIRecord[];
export const SEED_PARTNERS: PartnerRecord[] = [
  {
    "id": "org-partner-prime",
    "tenantId": "tenant-ph-01",
    "name": "Pampanga Prime Structural Builders Inc.",
    "tradeName": "Prime Structural",
    "type": "PARTNER_CONTRACTOR",
    "registrationNumber": "CS201208921",
    "taxIdentificationNumber": "210-987-654-000",
    "registeredAddress": "MacArthur Highway, Balibago, Angeles City, Pampanga",
    "primaryContactName": "Engr. Ferdinand David",
    "primaryContactEmail": "operations@primestructural.ph",
    "primaryContactPhone": "+63 45 888 1234",
    "verified": true,
    "status": "ACTIVE",
    "createdAt": "2026-08-01T08:00:00Z",
    "tier": "STRATEGIC",
    "totalProjectsCount": 4,
    "pcabCategory": "Category AAA",
    "pcabLicenseNumber": "PCAB-48190-AAA",
    "certifiedPersonnelCount": 180,
    "heavyEquipmentCount": 15,
    "safetyRating": 98
  }
] as unknown as PartnerRecord[];
export const SEED_PROPOSALS: SubcontractorProposal[] = [
  {
    "id": "PRP-2026-001",
    "opportunityId": "OPP-001",
    "tenderNumber": "TND-2026-001",
    "partnerOrgId": "org-partner-prime",
    "partnerName": "Pampanga Prime Structural Builders Inc.",
    "commercialAmountPHP": 18500000,
    "estimatedDurationMonths": 6,
    "technicalMethodologySummary": "Slipform foundation casting with mobile boom pump and certified 4000 PSI ready-mix concrete.",
    "proposedProjectManager": "Engr. Ferdinand David",
    "submittedAt": "2026-08-20T14:00:00Z",
    "status": "AWARDED"
  }
] as unknown as SubcontractorProposal[];
export const SEED_SUPPLIERS: SupplierRecord[] = [
  {
    "id": "org-supplier-cl",
    "tenantId": "tenant-ph-01",
    "name": "Central Luzon Aggregates and Ready-Mix Corp.",
    "tradeName": "CL Ready-Mix",
    "type": "SUPPLIER",
    "registrationNumber": "CS201509182",
    "taxIdentificationNumber": "009-123-456-000",
    "registeredAddress": "Industrial Zone, Porac, Pampanga",
    "primaryContactName": "Victoria G. Dizon",
    "primaryContactEmail": "sales@clreadymix.ph",
    "primaryContactPhone": "+63 45 625 4321",
    "verified": true,
    "status": "ACTIVE",
    "createdAt": "2026-08-05T09:00:00Z",
    "tier": "STRATEGIC",
    "totalProjectsCount": 5,
    "tierStatus": "Tier 1 Accredited",
    "onTimeDeliveryRate": 98.4,
    "accreditationValidUntil": "2027-12-31",
    "pcabLicenseCategory": "General Supplier"
  }
] as unknown as SupplierRecord[];
export const SEED_CATALOG_ITEMS: SupplierCatalogItem[] = [
  {
    "id": "CAT-001",
    "supplierOrgId": "org-supplier-cl",
    "supplierName": "Central Luzon Aggregates and Ready-Mix Corp.",
    "sku": "RMC-4000-PSI",
    "title": "Ready-Mix Concrete 4000 PSI (28 Days) Ordinary Portland",
    "category": "CEMENT_AGGREGATES",
    "brand": "CL Ready-Mix UltraStrength",
    "specifications": "ASTM C94 compliant, 4-6 inch slump, aggregate size 3/4 inch.",
    "unit": "BAG",
    "minOrderQty": 10,
    "availableStockQty": 5000,
    "basePricePHP": 4200,
    "volumeDiscountTier": "5% discount on orders exceeding 100 cu.m.",
    "leadTimeDays": 2,
    "stockLocation": "Porac Batching Plant",
    "serviceArea": "Angeles City, Clark Freeport, San Fernando, Mabalacat",
    "warrantyMonths": 12,
    "approvalStatus": "APPROVED",
    "effectiveUntil": "2027-06-30"
  },
  {
    "id": "CAT-002",
    "supplierOrgId": "org-supplier-cl",
    "supplierName": "Central Luzon Aggregates and Ready-Mix Corp.",
    "sku": "AGGR-S1-WASHED",
    "title": "Washed Silica Sand S-1 (Screened)",
    "category": "CEMENT_AGGREGATES",
    "brand": "Pampanga Blue",
    "specifications": "Graded fine aggregate suitable for plastering and high-strength concrete mixes.",
    "unit": "TON",
    "minOrderQty": 20,
    "availableStockQty": 2500,
    "basePricePHP": 850,
    "leadTimeDays": 1,
    "stockLocation": "Porac Quarry Site 2",
    "serviceArea": "Central Luzon",
    "warrantyMonths": 12,
    "approvalStatus": "APPROVED",
    "effectiveUntil": "2027-06-30"
  }
] as unknown as SupplierCatalogItem[];
export const SEED_RFQS: RFQRecord[] = [
  {
    "id": "RFQ-2026-001",
    "rfqNumber": "RFQ-2026-001",
    "projectId": "PRJ-2026-000001",
    "projectName": "The Clark Highlands Luxury Estate Villa",
    "title": "Procurement of 4000 PSI Ready-Mix Concrete for Substructure",
    "category": "CEMENT_AGGREGATES",
    "issuingDate": "2026-09-01",
    "submissionDeadline": "2026-09-15",
    "status": "AWARDED",
    "sealedBidding": false,
    "requiredItems": [
      {
        "description": "4000 PSI Ready-Mix Concrete for Footings & Pedestals",
        "spec": "ASTM C94 Type 1 Portland cement, 3/4 inch max aggregate",
        "quantity": 350,
        "unit": "Cubic Meters"
      }
    ],
    "invitedSupplierOrgIds": [
      "org-supplier-cl"
    ]
  }
] as unknown as RFQRecord[];
export const SEED_QUOTATIONS: SupplierQuotationRecord[] = [
  {
    "id": "QUO-2026-001",
    "rfqId": "RFQ-2026-001",
    "rfqNumber": "RFQ-2026-001",
    "supplierOrgId": "org-supplier-cl",
    "supplierName": "Central Luzon Aggregates and Ready-Mix Corp.",
    "quotationNumber": "QT-CL-2026-889",
    "totalAmountPHP": 1470000,
    "isSealed": false,
    "submittedAt": "2026-09-05T11:00:00Z",
    "evaluationStatus": "AWARDED",
    "validityDays": 30,
    "leadTimeDays": 2,
    "paymentTerms": "30 Days Net on Certified Delivery Slips",
    "technicalComplianceNotes": "Full compliance with ASTM C94 and DPWH Blue Book standards."
  }
] as unknown as SupplierQuotationRecord[];
export const SEED_PURCHASE_ORDERS: PurchaseOrderRecord[] = [
  {
    "id": "PO-2026-001",
    "poNumber": "PO-2026-001",
    "projectId": "PRJ-2026-000001",
    "supplierOrgId": "org-supplier-cl",
    "supplierName": "Central Luzon Aggregates and Ready-Mix Corp.",
    "rfqReference": "RFQ-2026-001",
    "totalAmountPHP": 1470000,
    "issuedDate": "2026-09-10",
    "promisedDeliveryDate": "2026-10-10",
    "status": "ISSUED",
    "items": [
      {
        "itemTitle": "4000 PSI Ready-Mix Concrete for Footings & Pedestals",
        "quantity": 350,
        "unitPricePHP": 4200,
        "totalPHP": 1470000
      }
    ],
    "paymentTerms": "30 Days Net",
    "approvedBy": "Engr. Leodenis Languisan"
  }
] as unknown as PurchaseOrderRecord[];
export const SEED_DELIVERIES: MaterialDeliveryRecord[] = [
  {
    "id": "DEL-2026-001",
    "deliveryNumber": "DR-CL-00918",
    "poNumber": "PO-2026-001",
    "supplierName": "Central Luzon Aggregates and Ready-Mix Corp.",
    "deliveredAt": "2026-09-12T08:30:00Z",
    "carrierName": "CL Logistics Fleet",
    "driverPlateNumber": "NAA-8192",
    "inspectionStatus": "ACCEPTED_COMPLIANT",
    "inspectorName": "Engr. Ferdinand David",
    "discrepancyNotes": "Slump test: 5.5 inches. 3 cylinder sample specimens taken for 7, 14, and 28-day break tests."
  }
] as unknown as MaterialDeliveryRecord[];
export const SEED_AUDIT_LOGS: AuditLogRecord[] = [
  {
    "id": "LOG-001",
    "timestamp": "2026-09-12T08:30:00Z",
    "actor": "system",
    "actorName": "System Bootstrap",
    "actorRole": "SYSTEM_ADMIN",
    "action": "PLATFORM_INITIALIZATION",
    "resource": "System Registry",
    "resourceType": "PLATFORM",
    "resourceId": "TENANT-PH-01",
    "status": "SUCCESS",
    "details": "Workspace multi-tenant environment verified and operational."
  },
  {
    "id": "LOG-002",
    "timestamp": "2026-09-15T10:00:00Z",
    "actor": "dhenzebuilders@gmail.com",
    "actorName": "Leodenis Languisan",
    "actorRole": "EXECUTIVE",
    "action": "PRICE_MODEL_RECONCILIATION",
    "resource": "Billing Engine",
    "resourceType": "BILLING",
    "resourceId": "pv-pro-v1",
    "status": "SUCCESS",
    "details": "Approved 10x engineering domain multiplier across subscription tiers."
  }
] as unknown as AuditLogRecord[];
