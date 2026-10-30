export interface ProfilePageItem {
  pageNumber: number;
  title: string;
  category: string;
  description: string;
  imageUrl: string;
  keyPoints: string[];
}

export interface BusinessDivisionItem {
  id: string;
  divisionNumber: string;
  name: string;
  category: 'CURRENT_REGISTERED' | 'STRATEGIC_CAPABILITY';
  statusLabel: string;
  description: string;
  statutoryBasis?: string;
  iconName: string;
  highlights: string[];
  subCategories: string[];
  pageReference: string;
}

export interface StrategicMarketItem {
  id: string;
  title: string;
  description: string;
  iconName: string;
}

export interface CoreValueItem {
  name: string;
  description: string;
  pillar: string;
}

export const OFFICIAL_PROFILE_METADATA = {
  title: 'Official Corporate Profile & Qualifications Brief',
  companyName: 'LDL DHENZE RESIDENTIAL BUILDING CONSTRUCTION',
  legalForm: 'Single Proprietorship duly registered with the Department of Trade and Industry and the Bureau of Internal Revenue, Republic of the Philippines',
  tagline: 'Building Today. Engineering Tomorrow. Powering the Future.',
  secondaryMotto: 'Building Foundations. Delivering Excellence.',
  founderMotto: 'Plan. Build. Belong. — Building Better Tomorrows',
  edition: '2025–2026 Executive Reference Edition',
  version: '1.0.0',
  totalPages: 27,
  pageCount: 27,
  fileSizeFormatted: '9.9 MB',
  fileSizeBytes: 10344589,
  publicationDate: 'March 2025',
  effectiveDate: '2025-03-18',
  status: 'PUBLISHED',
  classification: 'Approved Official Corporate Profile',
  dtiNumber: '4812272',
  dtiValidity: '22 March 2023 to 22 March 2028',
  dtiJurisdiction: 'Quezon City, National Capital Region, Second District',
  birTin: '306-113-062-00000',
  ocn: '21ARC2025000002189',
  psicCode: '42900',
  psicDescription: 'Construction of Other Civil Engineering Projects',
  registeredAddress: '704 Nile St., Anunas 2009, City of Angeles, Pampanga, Philippines',
  executiveOffice: 'KMC | One West Aeropark, Clark Freeport Zone, Mabalacat City, 2010 Pampanga, Philippines',
  directPhone: '+63 917 966 8814',
  officialEmail: 'info@dhenzebuilder.com',
  sha256Checksum: '263e8d82712b42e7bd64208be7134c481d07eb89f444d630d091f156d0920d7c',
  pdfDownloadUrl: '/api/corporate-resources/company-profile/download',
  directPdfUrl: '/documents/LDL-Dhenze-Corporate-Profile.pdf',
  ceoPhotoUrl: '/images/leadership/official-ceo-photo.png',
};

export const OFFICIAL_CEO_PROFILE = {
  fullName: 'LEODENIS DEVEZA LANGUISAN',
  preferredName: 'Leodenis "Dhenze" Languisan',
  role: 'Founder and Chief Executive Officer',
  company: 'LDL Dhenze Residential Building Construction',
  photoUrl: '/images/leadership/official-ceo-photo.png',
  photoCaption: 'Leodenis Deveza Languisan, Founder and CEO, inside the LDL Dhenze Corporate Reception Office, Clark Pampanga.',
  leadStatement: 'We Build Today. We Engineer Tomorrow. We Empower Generations. One Vision. One Company. Limitless Possibilities.',
  founderMessage: `To Our Clients, Partners, and Future Generations,

When we build, we do not merely raise structures.
We build opportunities. We build progress. We build legacies.
And above all, we build trust.

At LDL Dhenze Residential Building Construction, our mission is clear: to lawfully deliver world-class infrastructure and integrated solutions that improve lives and strengthen the nation—today, tomorrow, and for generations to come.

Our commitment is anchored on integrity that never compromises, quality that never fails, and innovation that creates lasting value. We embrace technology, renewable energy, and Artificial Intelligence as tools to design smarter, build stronger, and operate more responsibly.

We understand that every project we undertake carries public trust and a legal responsibility. That is why we strictly comply with all applicable laws, codes, and regulatory standards of the Republic of the Philippines. We build with discipline. We manage with transparency. We deliver with honor.

To our team—thank you for your dedication.
To our partners—thank you for your confidence.
To our clients—thank you for allowing us to be part of your vision.

Together, let us continue building a better Philippines—stronger, smarter, and more sustainable.`,
  founderSignature: 'Leodenis Deveza Languisan',
  founderVision: 'To build an enterprise where financial discipline meets engineering excellence, where technology strengthens infrastructure, and where every project is approached not merely as a structure to be completed, but as a long-term asset capable of creating enduring economic and social value.',
  leadershipPhilosophy: [
    {
      title: 'Integrity',
      description: 'Business relationships must be supported by proper documentation, transparency, accountability, and responsible corporate conduct.',
    },
    {
      title: 'Financial Discipline',
      description: 'Projects must be evaluated not only for their engineering potential but also for financial viability, risk, cash-flow sustainability, and long-term economic value.',
    },
    {
      title: 'Strategic Execution',
      description: 'Vision must be translated into structured planning, appropriate resources, qualified professionals, measurable objectives, and disciplined implementation.',
    },
    {
      title: 'Innovation',
      description: 'Construction should progressively integrate renewable energy, digital technology, automation, data-driven systems, and artificial intelligence.',
    },
    {
      title: 'Long-Term Value Creation',
      description: 'The objective is not merely to complete projects but to establish infrastructure, partnerships, systems, and institutional capabilities capable of creating sustainable value.',
    },
  ],
  educationalFoundation: [
    {
      degree: 'Bachelor of Commerce',
      major: 'Major in Banking and Finance',
      institution: 'STI College, Baguio City',
      significance: 'Fiscal rigor, risk management, and capital allocation discipline',
    },
    {
      degree: 'Bachelor of Science in Information Technology',
      major: 'Information Technology & Systems',
      institution: 'Data Center College of the Philippines, Baguio City',
      significance: 'Digital engineering, IoT telemetry, automation, and technological convergence',
    },
  ],
  bankingExperience: {
    institution: 'JPMorgan Chase Bank',
    focus: 'Mortgage and auto-loan operations, account servicing, payment processing and reconciliation, client issue resolution, coordination with underwriting and collections teams, adherence to internal banking policies, risk controls, consumer-protection requirements, and data-privacy standards.',
    takeaway: 'This banking experience provides an important foundation for his approach to corporate management: financial accountability, documentation, controls, compliance, risk awareness, and disciplined execution.',
  },
  corporateLeadershipStatement: 'Under the leadership of Leodenis Deveza Languisan, LDL Dhenze seeks to establish itself on a foundation of financial discipline, responsible governance, engineering capability, commercial integrity, technological innovation, and strategic partnerships. The founder’s background across banking, finance, business management, construction-related headship and technology provides the company with a broad commercial perspective: major development projects require more than construction expertise alone. They require an understanding of capital, risk, contracts, procurement, operations, compliance, technology, stakeholders and long-term asset value.',
  fourPillarsPledge: [
    {
      name: 'Compliant by Law',
      desc: 'We observe all applicable laws, codes, and regulations of the Republic of the Philippines.',
    },
    {
      name: 'Ethical by Choice',
      desc: 'We do what is right even when no one is watching.',
    },
    {
      name: 'Stronger Together',
      desc: 'We believe in the power of collaboration and shared success.',
    },
    {
      name: 'Building the Nation',
      desc: 'We contribute to a better, stronger, and more sustainable Philippines.',
    },
  ],
  regulatoryDisclaimer: 'For legal and investor-facing use, this profile should be presented as a "Founder & Executive Profile" rather than a credential certification. All statements are based on the attached résumé and should be independently documented or verified before being represented as independently validated facts in financing, government procurement, licensing, or due-diligence materials.',
};

export const CORE_VALUES_LIST: CoreValueItem[] = [
  {
    name: 'Integrity',
    description: 'Conducting business responsibly, transparently, and in strict compliance with applicable law.',
    pillar: 'Builds trust',
  },
  {
    name: 'Quality',
    description: 'Pursuing high standards in workmanship, materials, engineering, and technology.',
    pillar: 'Builds excellence',
  },
  {
    name: 'Innovation',
    description: 'Embracing technologies capable of improving the built environment.',
    pillar: 'Builds the future',
  },
  {
    name: 'Safety',
    description: 'Making safety a fundamental and non-negotiable consideration in every undertaking.',
    pillar: 'Protects lives',
  },
  {
    name: 'Sustainability',
    description: 'Supporting environmentally responsible and resilient infrastructure development.',
    pillar: 'Preserves tomorrow',
  },
  {
    name: 'Accountability',
    description: 'Taking full responsibility for the Company’s commitments and performance.',
    pillar: 'Delivers results',
  },
  {
    name: 'Partnership',
    description: 'Building lasting, good-faith relationships with clients, communities, professionals, suppliers, institutions, and strategic partners.',
    pillar: 'Creates legacy',
  },
];

export const NINE_CORE_DIVISIONS: BusinessDivisionItem[] = [
  {
    id: 'div-01',
    divisionNumber: '01',
    name: 'Construction and Civil Engineering',
    category: 'CURRENT_REGISTERED',
    statusLabel: 'Current BIR & DTI Registered Line of Business',
    description: 'The Company’s core and currently registered business is construction and civil engineering, consistent with its BIR-registered line of business, Construction of Other Civil Engineering Projects (PSIC 42900).',
    statutoryBasis: 'BIR Form 2303 • PSIC 42900 • DTI Business Name 4812272',
    iconName: 'Building2',
    pageReference: 'Page 17',
    highlights: [
      'Residential: Houses and residential buildings, housing developments, subdivisions, townhouses, and condominium-related construction',
      'Commercial: Office buildings, hotels, resorts, retail facilities, shopping centers, and mixed-use developments',
      'Industrial: Manufacturing facilities, warehouses, logistics facilities, processing plants, and agro-industrial facilities',
      'Infrastructure: Roads, site development, drainage networks, earthworks, utility infrastructure, water systems, flood-control, and civil engineering works',
    ],
    subCategories: ['Residential', 'Commercial', 'Industrial', 'Infrastructure'],
  },
  {
    id: 'div-02',
    divisionNumber: '02',
    name: 'Construction Materials and Supply',
    category: 'STRATEGIC_CAPABILITY',
    statusLabel: 'Strategic Supply Network Capability',
    description: 'Intended lawful procurement and construction-material supply network serving internal projects and third-party developments, sourced from duly licensed and accredited suppliers.',
    statutoryBasis: 'Accredited Supplier Networks • Domestic and International Distribution',
    iconName: 'Truck',
    pageReference: 'Page 18',
    highlights: [
      'Cement, reinforcing and structural steel, ready-mix concrete, aggregates, sand and gravel',
      'Concrete products, roofing, glass, aluminum, lumber, pipes, plumbing and electrical materials',
      'Mechanical components, tiles, flooring, doors, windows, paint, waterproofing, insulation',
      'Construction chemicals, industrial hardware, and occupational safety equipment',
    ],
    subCategories: ['Cement & Steel', 'Aggregates & Pipes', 'Roofing & Glass', 'Electrical & Safety'],
  },
  {
    id: 'div-03',
    divisionNumber: '03',
    name: 'Heavy Equipment and Machinery',
    category: 'STRATEGIC_CAPABILITY',
    statusLabel: 'Fleet Coordination & Machinery Solutions',
    description: 'Equipment solutions appropriate to projects of varying scale and technical requirement, including sourcing, procurement, sale, leasing, and rental coordination.',
    statutoryBasis: 'Subject to applicable registrations, permits, and safety standards',
    iconName: 'Wrench',
    pageReference: 'Page 18',
    highlights: [
      'Earthmoving: Excavators, bulldozers, backhoe loaders, wheel loaders, motor graders, road rollers',
      'Hauling & Mixing: Dump trucks, concrete mixers and pumps, transport & hauling units',
      'Lifting & Access: Mobile and tower cranes, forklifts, telehandlers, manlifts, scissor lifts',
      'Specialized Utilities: Piling and drilling equipment, compactors, generators, air compressors, water trucks',
    ],
    subCategories: ['Excavators & Earthmoving', 'Cranes & Lifting', 'Concrete Equipment', 'Generators & Pumps'],
  },
  {
    id: 'div-04',
    divisionNumber: '04',
    name: 'Architectural Plans, Engineering and Design',
    category: 'STRATEGIC_CAPABILITY',
    statusLabel: 'Coordinated Professional Design Services',
    description: 'Through duly qualified and licensed professionals, the Company seeks to provide clients with coordinated architectural and engineering solutions spanning concept development, master planning, BIM, and documentation.',
    statutoryBasis: 'Rendered exclusively by licensed Philippine architects and engineers under Republic Act No. 9266 (The Architecture Act of the Philippines), Civil Engineering Law, and the Professional Regulation Commission (PRC).',
    iconName: 'Compass',
    pageReference: 'Page 19',
    highlights: [
      'Architectural planning, master planning, and 3D architectural visualization',
      'Structural engineering coordination, civil, electrical, mechanical, and sanitary systems',
      'Landscape and interior planning, value engineering, and construction documentation',
      'Building Information Modeling (BIM) Level 300–400 for clash detection and cost modeling',
    ],
    subCategories: ['Architectural Design', 'Structural Engineering', 'MEP & Sanitary', 'BIM Coordination'],
  },
  {
    id: 'div-05',
    divisionNumber: '05',
    name: 'Green and Renewable Energy',
    category: 'STRATEGIC_CAPABILITY',
    statusLabel: 'Clean Energy & Resilient Utility Initiatives',
    description: 'Renewable energy recognized as a fundamental component of next-generation infrastructure, pursued in full compliance with the Renewable Energy Act of 2008 (Republic Act No. 9513) and requirements of the Department of Energy (DOE) and Energy Regulatory Commission (ERC).',
    statutoryBasis: 'Republic Act No. 9513 (Renewable Energy Act of 2008) • DOE & ERC Regulatory Standards',
    iconName: 'Sun',
    pageReference: 'Page 20',
    highlights: [
      'Solar Energy: Rooftop solar PV, ground-mounted solar, solar farms, solar carports, solar streetlights, and building-integrated solar (BIPV)',
      'Energy Storage: Battery Energy Storage Systems (BESS), commercial and industrial storage, microgrids, and emergency backup-energy systems',
      'Sustainable Infrastructure: Energy-efficient buildings, smart-grid infrastructure, EV charging stations, waste-to-energy, biomass/biogas, water recycling, and rainwater harvesting',
    ],
    subCategories: ['Solar PV & Farms', 'BESS Storage', 'Microgrids & Resilient Power', 'Water & EV Infrastructure'],
  },
  {
    id: 'div-06',
    divisionNumber: '06',
    name: 'Technological Solutions',
    category: 'STRATEGIC_CAPABILITY',
    statusLabel: 'Intelligent Digital Infrastructure Layer',
    description: 'Integration of intelligent digital layers into infrastructure projects, in strict compliance with applicable data-privacy, telecommunications, and cybersecurity regulations, including the Data Privacy Act of 2012 (Republic Act No. 10173).',
    statutoryBasis: 'Republic Act No. 10173 (Data Privacy Act of 2012) • National Privacy Commission (NPC)',
    iconName: 'Cpu',
    pageReference: 'Page 21',
    highlights: [
      'Building Management Systems (BMS) and automated facility management',
      'Internet of Things (IoT) sensors, intelligent CCTV, and biometric access-control systems',
      'Fiber-optic networks, data communications, and cloud-connected infrastructure',
      'Smart metering, energy-management systems, command-and-control centers, and digital twins',
    ],
    subCategories: ['Building Management (BMS)', 'IoT & Smart Sensors', 'Fiber & Communications', 'Digital Twins & Security'],
  },
  {
    id: 'div-07',
    divisionNumber: '07',
    name: 'Smart City Solutions',
    category: 'STRATEGIC_CAPABILITY',
    statusLabel: 'Intelligent Ecosystem Integration',
    description: 'Long-term strategy for lawful participation in Smart City and intelligent-community development, integrating people, infrastructure, transportation, energy, communications, security, and technology.',
    statutoryBasis: 'Local Government Units (LGU) and National Agency Regulatory Oversight',
    iconName: 'Network',
    pageReference: 'Page 22',
    highlights: [
      'Smart Buildings: Connected and energy-efficient commercial and residential structures',
      'Smart Energy: Renewable generation, battery storage, microgrids, and intelligent load dispatch',
      'Smart Mobility & Security: EV charging, intelligent traffic management, automated surveillance, and emergency systems',
      'Smart Water & Environment: Water recycling, leak detection, environmental monitoring, and data-driven governance',
    ],
    subCategories: ['Connected Buildings', 'Intelligent Mobility', 'Smart Utilities', 'Central Command Centers'],
  },
  {
    id: 'div-08',
    divisionNumber: '08',
    name: 'Artificial Intelligence Technology',
    category: 'STRATEGIC_CAPABILITY',
    statusLabel: 'Advanced Computational & Predictive Technology',
    description: 'Artificial Intelligence represents one of the Company’s most significant future technology directions, to be developed and deployed in compliance with applicable data-privacy and consumer-protection law.',
    statutoryBasis: 'Philippine Data Privacy Act • AI Ethical Governance Standards',
    iconName: 'Bot',
    pageReference: 'Page 23',
    highlights: [
      'AI in Construction: Project scheduling optimization, construction-progress monitoring, cost and procurement forecasting, equipment utilization, quality-control assistance, predictive maintenance, and safety analytics',
      'AI in Buildings: Intelligent energy management, HVAC optimization, predictive maintenance, occupancy analytics, automated building operations, and smart security',
      'AI in Smart Cities: Traffic analysis, infrastructure and environmental monitoring, energy-demand forecasting, and emergency response',
      'AI in Corporate Operations: Document automation, procurement analytics, supply-chain forecasting, and executive dashboards',
    ],
    subCategories: ['AI in Construction', 'AI in Building Ops', 'AI in Smart Cities', 'AI in Corporate Systems'],
  },
  {
    id: 'div-09',
    divisionNumber: '09',
    name: 'Integrated Project Delivery',
    category: 'STRATEGIC_CAPABILITY',
    statusLabel: 'End-to-End Lifecycle Project Platform',
    description: 'Long-term objective to provide clients with an increasingly integrated project-delivery platform, coordinating multiple components of complex development projects under a unified project strategy.',
    statutoryBasis: 'Unified Contractual Governance • Lifecycle Quality Management',
    iconName: 'Workflow',
    pageReference: 'Page 23',
    highlights: [
      'Full lifecycle: Concept → Feasibility → Master Planning → Architecture & Engineering → Procurement → Construction → Equipment → Green Energy → Technology → AI Integration → Testing & Commissioning → Operations Support',
      'Cost efficiency, quality assurance, on-time delivery, and sustainable development',
      'Community impact, long-term asset value, and safety-first management',
    ],
    subCategories: ['Concept to Operations', 'Lifecycle Cost Control', 'Contract Coordination', 'Turnover & Handover'],
  },
];

export const STRATEGIC_MARKETS_LIST: StrategicMarketItem[] = [
  { id: 'mkt-1', title: 'Residential Development', description: 'Houses, townhouses, condominiums, and master-planned residential communities.', iconName: 'Home' },
  { id: 'mkt-2', title: 'Commercial Real Estate', description: 'Office buildings, retail complexes, shopping centers, and mixed-use developments.', iconName: 'Building' },
  { id: 'mkt-3', title: 'Industrial Development', description: 'Manufacturing facilities, modern warehouses, and processing plants.', iconName: 'Factory' },
  { id: 'mkt-4', title: 'Government Infrastructure', description: 'Public works, roads, municipal facilities, and institutional projects.', iconName: 'Landmark' },
  { id: 'mkt-5', title: 'Hospitality', description: 'Hotels, leisure resorts, eco-tourism lodges, and recreation facilities.', iconName: 'Palmtree' },
  { id: 'mkt-6', title: 'Healthcare', description: 'Hospitals, medical clinics, specialized wellness centers, and laboratories.', iconName: 'HeartPulse' },
  { id: 'mkt-7', title: 'Education', description: 'Schools, university campus buildings, vocational institutes, and dormitories.', iconName: 'GraduationCap' },
  { id: 'mkt-8', title: 'Agriculture & Agro-Industrial', description: 'Cold storage, grain handling, processing plants, and livestock infrastructure.', iconName: 'Wheat' },
  { id: 'mkt-9', title: 'Logistics', description: 'Distribution hubs, multi-modal transport facilities, and container yards.', iconName: 'Truck' },
  { id: 'mkt-10', title: 'Renewable Energy', description: 'Solar farms, rooftop PV installations, battery storage, and microgrids.', iconName: 'Sun' },
  { id: 'mkt-11', title: 'Technology Infrastructure', description: 'Data centers, fiber networks, communication towers, and command centers.', iconName: 'Server' },
  { id: 'mkt-12', title: 'Transportation', description: 'Roads, bridges, accessways, parking structures, and transit hubs.', iconName: 'Navigation' },
  { id: 'mkt-13', title: 'Utilities', description: 'Water distribution systems, wastewater treatment, stormwater, and power distribution.', iconName: 'Droplet' },
  { id: 'mkt-14', title: 'Township Development', description: 'Integrated mixed-use estates combining housing, retail, parks, and utilities.', iconName: 'Map' },
  { id: 'mkt-15', title: 'Smart Cities', description: 'Connected municipal ecosystems with IoT, renewable energy, and digital governance.', iconName: 'Radio' },
];

export const PROFILE_PAGES_MANIFEST: ProfilePageItem[] = [
  {
    pageNumber: 1,
    title: 'Cover Page: Official Corporate Profile',
    category: 'Corporate Identity',
    description: 'Official front cover with DTI Registration No. 4812272, company crest, core motto, and registered entity name.',
    imageUrl: '/documents/pages/page-01.jpg',
    keyPoints: ['DTI Business Name Registration No. 4812272', 'Single Proprietorship registered with DTI and BIR', '9 Core Fields of Business'],
  },
  {
    pageNumber: 2,
    title: 'Founder\'s Message: Leodenis Deveza Languisan',
    category: 'Executive Leadership',
    description: 'Executive address to clients, partners, and future generations with official portrait and solemn pledge.',
    imageUrl: '/documents/pages/page-02.jpg',
    keyPoints: ['"We Build Today. We Engineer Tomorrow. We Empower Generations."', 'Compliant by Law • Ethical by Choice • Stronger Together • Building the Nation'],
  },
  {
    pageNumber: 3,
    title: 'Founder & Chief Executive Officer Profile',
    category: 'Executive Profile',
    description: 'Executive pedigree combining 20+ years in banking risk operations (JPMorgan Chase), finance, and civil construction.',
    imageUrl: '/documents/pages/page-03.jpg',
    keyPoints: ['B.Comm in Banking & Finance (STI College) & B.S. IT (DCCP)', 'JPMorgan Chase mortgage and risk operations', 'Five tenets of corporate leadership philosophy'],
  },
  {
    pageNumber: 4,
    title: 'Certificate of Business Name Registration (DTI)',
    category: 'Government Registration',
    description: 'Official DTI Certificate No. 4812272 signed by DTI Secretary Alfredo E. Pascual.',
    imageUrl: '/documents/pages/page-04.jpg',
    keyPoints: ['Registration No. 4812272', 'Valid 22 March 2023 to 22 March 2028', 'Quezon City, NCR Second District'],
  },
  {
    pageNumber: 5,
    title: 'BIR Certificate of Registration (Form 2303) — Page 1',
    category: 'Tax Registration',
    description: 'Official Bureau of Internal Revenue Certificate Form 2303, TIN: 306-113-062-00000, OCN: 21ARC2025000002189.',
    imageUrl: '/documents/pages/page-05.jpg',
    keyPoints: ['TIN: 306-113-062-00000', 'PSIC 42900 Construction of Other Civil Engineering Projects', 'Registered Office: 704 Nile St., Anunas, Angeles City'],
  },
  {
    pageNumber: 6,
    title: 'BIR Certificate of Registration (Form 2303) — Page 2',
    category: 'Tax Registration',
    description: 'Official documentary stamp, RDO certification, and statutory compliance conditions under the National Internal Revenue Code.',
    imageUrl: '/documents/pages/page-06.jpg',
    keyPoints: ['Documentary Stamp Verified', 'RDO 214A North Pampanga', 'Conspicuous posting requirement'],
  },
  {
    pageNumber: 7,
    title: 'Authority to Print Official Receipts/Invoices (BIR Form 1921)',
    category: 'Tax Compliance',
    description: 'Official Bureau of Internal Revenue Authority to Print (ATP) for Service Invoices.',
    imageUrl: '/documents/pages/page-07.jpg',
    keyPoints: ['ATP OCN: 21AAU2025000003302', 'Accredited BIR Printer in San Fernando, Pampanga', 'Service Invoices 001 to 500'],
  },
  {
    pageNumber: 8,
    title: 'Official BIR Notice: "This Establishment MUST Issue Receipt/Invoice"',
    category: 'Statutory Posting',
    description: 'Mandatory BIR official public notice exhibited conspicuously in the place of business.',
    imageUrl: '/documents/pages/page-08.jpg',
    keyPoints: ['Trade Name: LDL Dhenze Residential Building Construction', 'Registered Name: Languisan, Leodenis Deveza', 'TIN: 306-113-062-00000'],
  },
  {
    pageNumber: 9,
    title: 'Legal Notice and Regulatory Disclaimer',
    category: 'Governance & Disclaimers',
    description: 'Clear statement of legal standing, regulatory boundaries, and notice regarding DTI business registration scope.',
    imageUrl: '/documents/pages/page-09.jpg',
    keyPoints: ['Informational and reference document', 'DTI certificate scope boundary', 'Subject to PCAB and professional licensing where required'],
  },
  {
    pageNumber: 10,
    title: 'Regulatory Compliance & Forward-Looking Capabilities Statement',
    category: 'Governance & Disclaimers',
    description: 'Clarification of strategic capabilities (architecture, green energy, smart cities, AI) pursued through duly qualified licensed professionals.',
    imageUrl: '/documents/pages/page-10.jpg',
    keyPoints: ['Target development capabilities delineated', 'Strict adherence to RA 9266 & Civil Engineering Law', 'Confidentiality and proprietary rights'],
  },
  {
    pageNumber: 11,
    title: 'Statement of Corporate Registration and Legal Status',
    category: 'Statutory Statement',
    description: 'Authoritative affirmation of single proprietorship status, DTI validity, BIR registration, and registered business address.',
    imageUrl: '/documents/pages/page-11.jpg',
    keyPoints: ['Duly executed statement of legal status', 'Signed by Leodenis Deveza Languisan, Proprietor/Principal', 'Angeles City, Pampanga'],
  },
  {
    pageNumber: 12,
    title: 'Company Overview & Corporate Commitments',
    category: 'Company Profile',
    description: 'Integrated business platform combining construction, engineering, materials, equipment, energy, technology, and AI.',
    imageUrl: '/documents/pages/page-12.jpg',
    keyPoints: ['Lawful & Compliant • Professional Excellence', 'Client-Focused • Sustainable Solutions • Innovation', 'Beyond concrete and steel into digital systems'],
  },
  {
    pageNumber: 13,
    title: 'Corporate Vision: "To Build the Infrastructure of Tomorrow"',
    category: 'Vision & Mission',
    description: 'Envisioning intelligent, connected, and sustainable communities built for generations.',
    imageUrl: '/documents/pages/page-13.jpg',
    keyPoints: ['Connected Future: Buildings, Transportation, Utilities, Energy, Telecoms, Security', 'Lawful compliance, sustainability, quality, and partnership'],
  },
  {
    pageNumber: 14,
    title: 'Corporate Mission: 8 Strategic Undertakings',
    category: 'Vision & Mission',
    description: 'Comprehensive operational mission spanning civil construction, materials supply, heavy equipment, design, renewable energy, and AI.',
    imageUrl: '/documents/pages/page-14.jpg',
    keyPoints: ['High-quality civil engineering compliance', 'Support DOE & ERC renewable energy deployment', 'Safety First • Integrity • Sustainability • Innovation'],
  },
  {
    pageNumber: 15,
    title: 'Corporate Organizational Chart',
    category: 'Governance Structure',
    description: 'Executive management hierarchy, operational officers, administrative branches, and 9 major operating divisions.',
    imageUrl: '/documents/pages/page-15.jpg',
    keyPoints: ['President / CEO: Leodenis Deveza Languisan', 'Quality Control / Surveyors / Consultants', '9 Operating Department Divisions'],
  },
  {
    pageNumber: 16,
    title: 'Company Field of Business: Nine Core Divisions Overview',
    category: 'Business Operations',
    description: 'Visual matrix of all 9 business fields with CEO portrait and corporate crest.',
    imageUrl: '/documents/pages/page-16.jpg',
    keyPoints: ['One Company. One Integrated Solution. Endless Possibilities.', 'Comprehensive coverage of physical and digital construction'],
  },
  {
    pageNumber: 17,
    title: 'Division 01: Construction and Civil Engineering',
    category: 'Business Operations',
    description: 'Detailed scope of registered core business (PSIC 42900): Residential, Commercial, Industrial, and Infrastructure.',
    imageUrl: '/documents/pages/page-17.jpg',
    keyPoints: ['Currently registered business line', 'Residential, Commercial, Industrial, Infrastructure', 'Built Today. Engineered for Tomorrow.'],
  },
  {
    pageNumber: 18,
    title: 'Division 02 & 03: Materials Supply and Heavy Equipment',
    category: 'Business Operations',
    description: 'Procurement networks for cement, steel, lumber, and heavy machinery fleet coordination (excavators, cranes, dump trucks).',
    imageUrl: '/documents/pages/page-18.jpg',
    keyPoints: ['Division 02: Construction Materials & Supply', 'Division 03: Heavy Equipment & Machinery', 'Earthmoving, Lifting, Hauling, and Pumping'],
  },
  {
    pageNumber: 19,
    title: 'Division 04: Architectural Plans, Engineering & Design',
    category: 'Business Operations',
    description: 'Coordinated design rendered exclusively through PRC-licensed Philippine architects and professional engineers.',
    imageUrl: '/documents/pages/page-19.jpg',
    keyPoints: ['Strict compliance with RA 9266 Architecture Act', 'BIM Level 300–400 3D visualization', 'Master planning and structural calculations'],
  },
  {
    pageNumber: 20,
    title: 'Division 05: Green and Renewable Energy',
    category: 'Business Operations',
    description: 'Solar PV, rooftop solar, solar farms, Battery Energy Storage Systems (BESS), microgrids, and sustainable building infrastructure under RA 9513.',
    imageUrl: '/documents/pages/page-20.jpg',
    keyPoints: ['Republic Act No. 9513 Renewable Energy Act compliance', 'Solar rooftop, ground-mounted, and carports', 'BESS energy storage and microgrids'],
  },
  {
    pageNumber: 21,
    title: 'Division 06: Technological Solutions',
    category: 'Business Operations',
    description: 'Building Management Systems (BMS), IoT sensors, intelligent CCTV, access control, fiber optics, and digital twins under RA 10173.',
    imageUrl: '/documents/pages/page-21.jpg',
    keyPoints: ['Data Privacy Act of 2012 compliance', 'Building Management Systems & IoT', 'Fiber-optic networks & command centers'],
  },
  {
    pageNumber: 22,
    title: 'Division 07: Smart City Solutions',
    category: 'Business Operations',
    description: 'Integrated intelligent ecosystems connecting buildings, mobility, energy, water, environment, and smart governance.',
    imageUrl: '/documents/pages/page-22.jpg',
    keyPoints: ['One City. One System. One Intelligent Ecosystem.', 'Smart Buildings, Mobility, Water, and Governance'],
  },
  {
    pageNumber: 23,
    title: 'Division 08 & 09: AI Technology & Integrated Project Delivery',
    category: 'Business Operations',
    description: 'AI-assisted scheduling, progress monitoring, predictive maintenance, and full lifecycle Integrated Project Delivery (IPD).',
    imageUrl: '/documents/pages/page-23.jpg',
    keyPoints: ['Division 08: AI in Construction, Buildings & Smart Cities', 'Division 09: Concept to Operations Support', 'One Vision. One Plan. One Team. One Success.'],
  },
  {
    pageNumber: 24,
    title: 'Strategic Markets & Corporate Business Philosophy',
    category: 'Market Strategy',
    description: '15 targeted market sectors and the philosophy of One Integrated Development Platform.',
    imageUrl: '/documents/pages/page-24.jpg',
    keyPoints: ['15 Strategic Market Sectors', 'Integrated Ecosystem: Design, Engineering, Materials, Equipment, Construction, Energy, Tech, AI'],
  },
  {
    pageNumber: 25,
    title: 'Corporate Core Values: Seven Pillars of Excellence',
    category: 'Core Values',
    description: 'Integrity, Quality, Innovation, Safety, Sustainability, Accountability, and Partnership.',
    imageUrl: '/documents/pages/page-25.jpg',
    keyPoints: ['Strong Values • Strong Systems • Strong Team • Strong Commitment', 'One Company. One Purpose. A Better Future.'],
  },
  {
    pageNumber: 26,
    title: 'Corporate Commitment & Regulatory Compliance Statement',
    category: 'Commitment & Notice',
    description: 'Formal regulatory compliance notice regarding statutory boundaries, verification of registration, and executive commitment.',
    imageUrl: '/documents/pages/page-26.jpg',
    keyPoints: ['DTI Certificate is not a license to engage in business without required permits', 'Inquiries directed to official company channels', 'We Comply • We Deliver Quality • We Build Partnerships'],
  },
  {
    pageNumber: 27,
    title: 'Back Cover: Corporate Identity & Registration Seal',
    category: 'Corporate Identity',
    description: 'Official back cover with corporate crest, motto, DTI Registration No. 4812272, and 9 business field icons.',
    imageUrl: '/documents/pages/page-27.jpg',
    keyPoints: ['DTI Business Name Registration No. 4812272', 'Building Today. Engineering Tomorrow. Powering the Future.', 'Official Reference Edition Seal'],
  },
];

export interface ProfileSection {
  sectionNumber: string;
  title: string;
  pageRange: string;
  summary: string;
  highlights: string[];
  statutoryNotes?: string;
}

export const PROFILE_SECTIONS: ProfileSection[] = [
  {
    sectionNumber: '01',
    title: 'Corporate Identity, Vision & Executive Governance',
    pageRange: 'Pages 1–4',
    summary: 'Executive positioning, corporate charter, and leadership philosophy guided by Leodenis Deveza Languisan. Combines banking-grade risk controls from JPMorgan Chase with Philippine civil engineering execution.',
    highlights: [
      'Official mission: "Building Today. Engineering Tomorrow. Powering the Future."',
      'Two-decade leadership pedigree combining civil construction and institutional banking risk underwriting',
      'Zero-compromise fiscal governance, audited escrow milestones, and transparent client reporting',
      'Corporate headquarters & registered office: KMC | One West Aeropark, Clark Pampanga, Mabalacat City, 2010 Pampanga, Philippines',
    ],
    statutoryNotes: 'Registered under DTI Certificate No. 4812272 and BIR Certificate Form 2303, TIN: 306-113-062-00000.',
  },
  {
    sectionNumber: '02',
    title: 'Statutory Registrations & Regulatory Compliance',
    pageRange: 'Pages 5–8',
    summary: 'Comprehensive verification of statutory registrations across Philippine government agencies, tax compliance, and local government permits in Angeles City, Pampanga.',
    highlights: [
      'Bureau of Internal Revenue (BIR) Form 2303 Certificate of Registration (TIN: 306-113-062-00000)',
      'Official Clearance Number (OCN): 21ARC2025000002189',
      'PSIC 42900: Construction of Other Civil Engineering Projects',
      'Department of Trade and Industry (DTI) National Business Registration No. 4812272',
      'Compliance with Republic Act No. 9266 (Architecture Act) & Republic Act No. 544 (Civil Engineering Law)',
    ],
    statutoryNotes: 'All structural designs, electrical, sanitary, and architectural blueprints are certified exclusively by registered PRC professionals.',
  },
  {
    sectionNumber: '03',
    title: 'Core Engineering Capabilities & Delivery Methodology',
    pageRange: 'Pages 9–14',
    summary: 'Integrated Project Delivery (IPD) framework covering design coordination, computational engineering, heavy civil execution, and specialized technical systems.',
    highlights: [
      'Structural Engineering: Seismic-resilient reinforced concrete, structural steel, and deep foundation engineering',
      'BIM Coordination: Level 300–400 Building Information Modeling for clash detection and bill of materials precision',
      'Heavy Civil Works: Land development, drainage culvert networks, retaining structures, and road networks',
      'Smart MEPF Engineering: Mechanical, electrical, plumbing, fire protection, and automated building management systems',
    ],
  },
  {
    sectionNumber: '04',
    title: 'Strategic Sectors & Asset Archetypes',
    pageRange: 'Pages 15–18',
    summary: 'Diversified project portfolio spanning high-end residential estates, agro-industrial complexes, renewable energy microgrids, and commercial facilities.',
    highlights: [
      'Residential Estates: Custom luxury residences, private villas, and master-planned residential enclaves',
      'Agro-Industrial & Cold Storage: Controlled-atmosphere food warehousing and climate-controlled livestock infrastructure',
      'Renewable Energy: Commercial rooftop solar PV, microgrids, and Battery Energy Storage Systems (BESS)',
      'Civil Infrastructure: Municipal access roadways, stormwater containment basins, and water treatment utilities',
    ],
  },
  {
    sectionNumber: '05',
    title: 'Quality Assurance, Environmental Stewardship & Safety (QESH)',
    pageRange: 'Pages 19–22',
    summary: 'Institutional safety protocols, environmental impact management, material testing certifications, and sustainable construction practices.',
    highlights: [
      'Zero-accident occupational safety culture complying with DOLE Department Order No. 13',
      'Rigorous laboratory concrete compressive strength testing (7-day, 14-day, 28-day cylinder breaks)',
      'Embodied carbon reduction strategies and passive bioclimatic cooling integration',
      'Waste diversion, stormwater runoff mitigation, and environmental compliance monitoring',
    ],
  },
  {
    sectionNumber: '06',
    title: 'Project Portfolio Studies, Pipeline & Engagement Protocol',
    pageRange: 'Pages 23–27',
    summary: 'Documented portfolio case studies with verified stage attributions, conceptual engineering research, and standard onboarding protocols for clients and partners.',
    highlights: [
      'Clear delineation between completed physical structures, active sites, and preliminary conceptual studies',
      'Transparent regulatory disclosures and independent verification procedures',
      'Client onboarding via structured milestone schedules and escrow agreements',
    ],
  },
];
