export interface ProfileSection {
  sectionNumber: string;
  title: string;
  pageRange: string;
  summary: string;
  highlights: string[];
  statutoryNotes?: string;
}

export const OFFICIAL_PROFILE_METADATA = {
  "title": "Official Corporate Profile & Qualifications Brief",
  "edition": "2025–2026 Executive Reference Edition",
  "version": "1.0.0",
  "totalPages": 27,
  "pageCount": 27,
  "fileSizeFormatted": "18.4 MB",
  "fileSizeBytes": 19293798,
  "publicationDate": "March 2025",
  "effectiveDate": "2025-03-18",
  "status": "PUBLISHED",
  "classification": "Controlled Institutional Document",
  "dtiNumber": "4812272",
  "birTin": "306-113-062-00000",
  "ocn": "21ARC2025000002189",
  "psicCode": "42900",
  "psicDescription": "Construction of Other Civil Engineering Projects",
  "sha256Checksum": "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855"
};

export const PROFILE_SECTIONS: ProfileSection[] = [
  {
    "sectionNumber": "01",
    "title": "Corporate Identity, Vision & Executive Governance",
    "pageRange": "Pages 1–4",
    "summary": "Executive positioning, corporate charter, and leadership philosophy guided by Leodenis “Dhenze” Languisan. Bridges banking-grade risk controls from JPMorgan Chase with Philippine civil engineering execution.",
    "highlights": [
      "Official mission: \"Building Today. Engineering Tomorrow. Powering the Future.\"",
      "Two-decade leadership pedigree combining civil construction and institutional banking risk underwriting",
      "Zero-compromise fiscal governance, audited escrow milestones, and transparent client reporting",
      "Corporate headquarters & registered office: KMC | One West Aeropark, Clark Pampanga, Mabalacat City, 2010 Pampanga, Philippines"
    ],
    "statutoryNotes": "Registered under DTI Certificate No. 4812272 and BIR Certificate Form 2303, TIN: 306-113-062-00000."
  },
  {
    "sectionNumber": "02",
    "title": "Statutory Registrations & Regulatory Compliance",
    "pageRange": "Pages 5–8",
    "summary": "Comprehensive verification of statutory registrations across Philippine government agencies, tax compliance, and local government permits in Angeles City, Pampanga.",
    "highlights": [
      "Bureau of Internal Revenue (BIR) Form 2303 Certificate of Registration (TIN: 306-113-062-00000)",
      "Official Clearance Number (OCN): 21ARC2025000002189",
      "PSIC 42900: Construction of Other Civil Engineering Projects",
      "Department of Trade and Industry (DTI) National Business Registration No. 4812272",
      "Compliance with Republic Act No. 9266 (Architecture Act) & Republic Act No. 544 (Civil Engineering Law)"
    ],
    "statutoryNotes": "All structural designs, electrical, sanitary, and architectural blueprints are certified exclusively by registered PRC professionals."
  },
  {
    "sectionNumber": "03",
    "title": "Core Engineering Capabilities & Delivery Methodology",
    "pageRange": "Pages 9–14",
    "summary": "Integrated Project Delivery (IPD) framework covering design coordination, computational engineering, heavy civil execution, and specialized technical systems.",
    "highlights": [
      "Structural Engineering: Seismic-resilient reinforced concrete, structural steel, and deep foundation engineering",
      "BIM Coordination: Level 300–400 Building Information Modeling for clash detection and bill of materials precision",
      "Heavy Civil Works: Land development, drainage culvert networks, retaining structures, and road networks",
      "Smart MEPF Engineering: Mechanical, electrical, plumbing, fire protection, and automated building management systems"
    ]
  },
  {
    "sectionNumber": "04",
    "title": "Strategic Sectors & Asset Archetypes",
    "pageRange": "Pages 15–18",
    "summary": "Diversified project portfolio spanning high-end residential estates, agro-industrial complexes, renewable energy microgrids, and commercial facilities.",
    "highlights": [
      "Residential Estates: Custom luxury residences, private villas, and master-planned residential enclaves",
      "Agro-Industrial & Cold Storage: Controlled-atmosphere food warehousing and climate-controlled livestock infrastructure",
      "Renewable Energy: Commercial rooftop solar PV, microgrids, and Battery Energy Storage Systems (BESS)",
      "Civil Infrastructure: Municipal access roadways, stormwater containment basins, and water treatment utilities"
    ]
  },
  {
    "sectionNumber": "05",
    "title": "Quality Assurance, Environmental Stewardship & Safety (QESH)",
    "pageRange": "Pages 19–22",
    "summary": "Institutional safety protocols, environmental impact management, material testing certifications, and sustainable construction practices.",
    "highlights": [
      "Zero-accident occupational safety culture complying with DOLE Department Order No. 13",
      "Rigorous laboratory concrete compressive strength testing (7-day, 14-day, 28-day cylinder breaks)",
      "Embodied carbon reduction strategies and passive bioclimatic cooling integration",
      "Waste diversion, stormwater runoff mitigation, and environmental compliance monitoring"
    ]
  },
  {
    "sectionNumber": "06",
    "title": "Project Portfolio Studies, Pipeline & Engagement Protocol",
    "pageRange": "Pages 23–27",
    "summary": "Documented portfolio case studies with verified stage attributions, conceptual engineering research, and standard onboarding protocols for clients and partners.",
    "highlights": [
      "Clear delineation between completed physical structures, active sites, and preliminary conceptual studies",
      "Client Portal access for real-time WBS milestone tracking, CDE document vault, and financial invoicing",
      "Partner & Supplier qualification workflow for transparent competitive bidding",
      "Strict client confidentiality and non-disclosure standards for private institutional accounts"
    ]
  }
];
