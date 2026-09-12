/**
 * LDL DHENZE BUILDER ASSISTANT - AUTHORITATIVE KNOWLEDGE REPOSITORY
 * 25 Strictly Partitioned Categories based on Verified Corporate Documents
 */

import { KnowledgeChunk } from '../types';

export const KNOWLEDGE_CATEGORIES = [
  'Corporate Information',
  'Vision, Mission and Values',
  'Leadership',
  'Credentials and Registrations',
  'Construction and Civil Engineering',
  'Materials and Procurement',
  'Heavy Equipment',
  'Architecture, Engineering and BIM',
  'Real Estate and Property Development',
  'Green and Renewable Energy',
  'Agro-Farming and Agro-Industrial Development',
  'Smart Buildings and Smart Cities',
  'Artificial Intelligence and Digital Technology',
  'Water and Environmental Systems',
  'Integrated Project Delivery',
  'Sustainability',
  'Safety and Compliance',
  'Projects and Portfolio',
  'Partners and Suppliers',
  'Project Inquiry Procedures',
  'Client Portal Help',
  'Public Frequently Asked Questions',
  'Private Client Projects',
  'Internal Company Knowledge',
  'Archived or Superseded Content',
];

export const INITIAL_KNOWLEDGE_BASE: KnowledgeChunk[] = [
  {
    id: 'kc-01-corp-profile',
    category: 'Corporate Information',
    title: 'LDL Dhenze Residential Building Construction Corporate Overview',
    section: 'Company Overview & Registered Line of Business',
    sourceDoc: 'LDRBC Corporate Profile.pdf',
    publicationDate: 'May 14, 2025',
    lastUpdated: 'May 17, 2025',
    classification: 'Public',
    approvalStatus: 'Approved',
    allowedRoles: ['ANONYMOUS_VISITOR', 'PROSPECTIVE_CLIENT', 'VERIFIED_CLIENT', 'PARTNER_SUPPLIER', 'PROJECT_MANAGER', 'EXECUTIVE', 'SYSTEM_ADMIN'],
    pageOrArticleUrl: '/about',
    content: `LDL Dhenze Residential Building Construction is a single proprietorship duly organized and existing under the laws of the Republic of the Philippines. Registered with the Department of Trade and Industry under DTI Business Name Registration No. 4812272 (issued March 22, 2023, valid until March 22, 2028). The company is registered with the Bureau of Internal Revenue (TIN: 306-113-062-00000, BIR Certificate Form 2303 dated March 17, 2025, OCN: 21ARC2025000002189) under Philippine Standard Industrial Classification (PSIC) 42900: Construction of Other Civil Engineering Projects. Registered address: 704 Nile St., Anunas 2009, City of Angeles, Pampanga, Philippines. Official positioning: "Building Today. Engineering Tomorrow. Powering the Future."`,
  },
  {
    id: 'kc-02-vision-mission',
    category: 'Vision, Mission and Values',
    title: 'Corporate Vision, Mission and Pledge',
    section: 'Corporate Vision & Mission Statement',
    sourceDoc: 'LDRBC Corporate Profile.pdf (Pages 2, 13, 14)',
    publicationDate: 'May 14, 2025',
    lastUpdated: 'May 17, 2025',
    classification: 'Public',
    approvalStatus: 'Approved',
    allowedRoles: ['ANONYMOUS_VISITOR', 'PROSPECTIVE_CLIENT', 'VERIFIED_CLIENT', 'PARTNER_SUPPLIER', 'PROJECT_MANAGER', 'EXECUTIVE', 'SYSTEM_ADMIN'],
    pageOrArticleUrl: '/about',
    content: `Vision: To be recognized as a Philippine integrated construction, engineering, infrastructure, green-energy, and technology solutions enterprise, capable of lawfully delivering sustainable, intelligent, resilient, and future-ready developments. We do not simply envision buildings; we envision intelligent, connected, and sustainable communities built for generations.
Mission: To provide innovative, dependable, efficient, sustainable, and technology-driven solutions to the construction and infrastructure industry.
Pledge: Compliant by Law (observe all applicable laws, codes, and regulations); Ethical by Choice (do what is right even when no one is watching); Stronger Together (collaboration and shared success); Building the Nation (contribute to a better, stronger, and more sustainable Philippines).
Core Values: Integrity, Quality, Innovation, Safety, Sustainability, Accountability, Partnership.`,
  },
  {
    id: 'kc-03-leadership',
    category: 'Leadership',
    title: 'Founder & CEO Leodenis Deveza Languisan Profile',
    section: 'Founder & Chief Executive Profile',
    sourceDoc: 'LDRBC Corporate Profile.pdf (Page 3)',
    publicationDate: 'May 14, 2025',
    lastUpdated: 'May 17, 2025',
    classification: 'Public',
    approvalStatus: 'Approved',
    allowedRoles: ['ANONYMOUS_VISITOR', 'PROSPECTIVE_CLIENT', 'VERIFIED_CLIENT', 'PARTNER_SUPPLIER', 'PROJECT_MANAGER', 'EXECUTIVE', 'SYSTEM_ADMIN'],
    pageOrArticleUrl: '/about',
    content: `Leodenis Deveza Languisan is the Founder, President, and Chief Executive Officer of LDL Dhenze Residential Building Construction. Educational background: Bachelor of Commerce, Major in Banking and Finance (STI College, Baguio City); Bachelor of Science in Information Technology (Data Center College of the Philippines, Baguio City). He brings over two decades of multidisciplinary professional experience across banking and financial services, corporate leadership, business development, operations, construction, petroleum, cooperatives, technology, and financial markets. His career includes tenure at JPMorgan Chase Bank in mortgage and auto-loan operations, emphasizing financial accountability, risk controls, consumer protection, and disciplined compliance. Founder's Vision: "To build an enterprise where financial discipline meets engineering excellence, where technology strengthens infrastructure, and where every project is approached not merely as a structure to be completed, but as a long-term asset capable of creating enduring economic and social value."`,
  },
  {
    id: 'kc-04-credentials',
    category: 'Credentials and Registrations',
    title: 'Verified Corporate Registrations & Regulatory Compliance Boundary',
    section: 'Legal Notice and Regulatory Compliance Statement',
    sourceDoc: 'LDRBC Corporate Profile.pdf (Pages 4, 5, 9, 10, 11)',
    publicationDate: 'May 14, 2025',
    lastUpdated: 'May 17, 2025',
    classification: 'Public',
    approvalStatus: 'Approved',
    allowedRoles: ['ANONYMOUS_VISITOR', 'PROSPECTIVE_CLIENT', 'VERIFIED_CLIENT', 'PARTNER_SUPPLIER', 'PROJECT_MANAGER', 'EXECUTIVE', 'SYSTEM_ADMIN'],
    pageOrArticleUrl: '/about#credentials',
    content: `Verified Registrations:
- DTI Certificate of Business Name Registration No. 4812272 (issued March 22, 2023, valid until March 22, 2028; City/Municipality scope, Quezon City NCR Second District).
- BIR Certificate of Registration Form 2303, TIN: 306-113-062-00000, issued March 17, 2025, OCN: 21ARC2025000002189, RDO 214A North Pampanga. PSIC 42900: Construction of Other Civil Engineering Projects.
- BIR Authority to Print Form 1921, OCN: 21AAU2025000003302.
Important Regulatory Disclosures:
The DTI Certificate is a registration of business name and is not a license to engage in any kind of business or practice a profession. All regulated architectural, civil, structural, mechanical, and electrical engineering services are rendered exclusively through duly qualified and PRC-licensed professionals under RA 9266 and the Civil Engineering Law. Construction packages requiring PCAB (Philippine Contractors Accreditation Board) licensing and renewable energy initiatives requiring DOE/ERC approvals are executed in partnership with accredited contractors and regulated corporate entities.`,
  },
  {
    id: 'kc-05-construction',
    category: 'Construction and Civil Engineering',
    title: 'Core Construction and Civil Engineering Scope',
    section: 'Field of Business 01: Construction & Civil Engineering',
    sourceDoc: 'LDRBC Corporate Profile.pdf (Page 17)',
    publicationDate: 'May 14, 2025',
    lastUpdated: 'May 17, 2025',
    classification: 'Public',
    approvalStatus: 'Approved',
    allowedRoles: ['ANONYMOUS_VISITOR', 'PROSPECTIVE_CLIENT', 'VERIFIED_CLIENT', 'PARTNER_SUPPLIER', 'PROJECT_MANAGER', 'EXECUTIVE', 'SYSTEM_ADMIN'],
    pageOrArticleUrl: '/capabilities/construction-civil-engineering',
    content: `Core registered line of business (PSIC 42900). Target capabilities encompass:
1. Residential: Houses, residential buildings, housing developments, subdivisions, townhouses, condominium-related construction.
2. Commercial: Office buildings, hotels, resorts, retail facilities, shopping centers, mixed-use developments.
3. Industrial: Manufacturing facilities, warehouses, logistics facilities, processing plants, agro-industrial facilities.
4. Infrastructure: Roads, site development, drainage networks, earthworks, utility infrastructure, water systems, flood-control infrastructure, and civil engineering works.`,
  },
  {
    id: 'kc-06-materials',
    category: 'Materials and Procurement',
    title: 'Construction Materials & Supply Strategy',
    section: 'Field of Business 02: Materials & Supply',
    sourceDoc: 'LDRBC Corporate Profile.pdf (Page 18)',
    publicationDate: 'May 14, 2025',
    lastUpdated: 'May 17, 2025',
    classification: 'Public',
    approvalStatus: 'Approved',
    allowedRoles: ['ANONYMOUS_VISITOR', 'PROSPECTIVE_CLIENT', 'VERIFIED_CLIENT', 'PARTNER_SUPPLIER', 'PROJECT_MANAGER', 'EXECUTIVE', 'SYSTEM_ADMIN'],
    pageOrArticleUrl: '/capabilities/construction-materials-supply',
    content: `Procurement and supply network serving internal projects and third-party developments from duly licensed and accredited suppliers. Target product categories: Portland and Pozzolan cement, reinforcing steel bars (rebar), structural steel, ready-mix concrete, aggregates (sand and gravel), concrete products, roofing materials, glass, aluminum, lumber, PVC/HDPE pipes, plumbing and electrical supplies, mechanical components, tiles, flooring, doors, windows, paint, waterproofing, insulation, construction chemicals, hardware, and personal protective safety equipment. All materials meet Philippine National Standards (PNS) and DPWH Blue Book standards.`,
  },
  {
    id: 'kc-07-heavy-equipment',
    category: 'Heavy Equipment',
    title: 'Heavy Equipment and Machinery Fleet Solutions',
    section: 'Field of Business 03: Heavy Equipment & Machinery',
    sourceDoc: 'LDRBC Corporate Profile.pdf (Page 18)',
    publicationDate: 'May 14, 2025',
    lastUpdated: 'May 17, 2025',
    classification: 'Public',
    approvalStatus: 'Approved',
    allowedRoles: ['ANONYMOUS_VISITOR', 'PROSPECTIVE_CLIENT', 'VERIFIED_CLIENT', 'PARTNER_SUPPLIER', 'PROJECT_MANAGER', 'EXECUTIVE', 'SYSTEM_ADMIN'],
    pageOrArticleUrl: '/capabilities/heavy-equipment-machinery',
    content: `Equipment solutions for earthworks, civil engineering, and structural construction: hydraulic excavators, bulldozers, backhoe loaders, wheel loaders, motor graders, road vibratory rollers, dump trucks (10-wheelers), transit concrete mixers and concrete pumps, mobile and rough-terrain cranes, forklifts, telehandlers, piling and drilling rigs, compactors, diesel generators, air compressors, water trucks, and manlifts. Equipment operations are staffed by DOLE-certified and TESDA-trained operators following occupational safety protocols.`,
  },
  {
    id: 'kc-08-architecture-bim',
    category: 'Architecture, Engineering and BIM',
    title: 'Architectural Plans, Engineering Coordination, and BIM',
    section: 'Field of Business 04: Architectural Plans, Engineering & Design',
    sourceDoc: 'LDRBC Corporate Profile.pdf (Page 19)',
    publicationDate: 'May 14, 2025',
    lastUpdated: 'May 17, 2025',
    classification: 'Public',
    approvalStatus: 'Approved',
    allowedRoles: ['ANONYMOUS_VISITOR', 'PROSPECTIVE_CLIENT', 'VERIFIED_CLIENT', 'PARTNER_SUPPLIER', 'PROJECT_MANAGER', 'EXECUTIVE', 'SYSTEM_ADMIN'],
    pageOrArticleUrl: '/capabilities/architectural-plans-engineering-design',
    content: `Through duly qualified and licensed professionals, LDL Dhenze coordinates architectural and engineering solutions: concept development, master planning, architectural planning, structural engineering coordination, civil, electrical, and mechanical engineering, plumbing and sanitary systems, landscape and interior planning, Building Information Modeling (BIM LOD 200-400), 3D architectural visualization, quantity surveying, cost estimation, value engineering, and construction documentation.
All architectural and engineering services are rendered exclusively by duly licensed architects and professional engineers in compliance with RA 9266 (The Architecture Act of the Philippines) and the Professional Regulation Commission (PRC).`,
  },
  {
    id: 'kc-09-real-estate',
    category: 'Real Estate and Property Development',
    title: 'Real Estate and Property Development Strategic Services',
    section: 'Flagship Industry: Real Estate & Property',
    sourceDoc: 'LDL_Dhenze_Premium_Website_Architecture.pdf (Page 8)',
    publicationDate: 'May 14, 2025',
    lastUpdated: 'May 17, 2025',
    classification: 'Public',
    approvalStatus: 'Approved',
    allowedRoles: ['ANONYMOUS_VISITOR', 'PROSPECTIVE_CLIENT', 'VERIFIED_CLIENT', 'PARTNER_SUPPLIER', 'PROJECT_MANAGER', 'EXECUTIVE', 'SYSTEM_ADMIN'],
    pageOrArticleUrl: '/industries/real-estate-property-development',
    content: `Services encompass land assessment, highest-and-best-use studies, development feasibility, master planning, residential communities, subdivisions, townhouses, condominiums, mixed-use developments, commercial centers, development management, sustainable community design, smart-community systems, project marketing support, and property lifecycle operations. Services delivered through licensed professionals and accredited partners.`,
  },
  {
    id: 'kc-10-green-energy',
    category: 'Green and Renewable Energy',
    title: 'Green and Renewable Energy Solutions & RA 9513',
    section: 'Field of Business 05: Green & Renewable Energy',
    sourceDoc: 'LDRBC Corporate Profile.pdf (Page 20)',
    publicationDate: 'May 14, 2025',
    lastUpdated: 'May 17, 2025',
    classification: 'Public',
    approvalStatus: 'Approved',
    allowedRoles: ['ANONYMOUS_VISITOR', 'PROSPECTIVE_CLIENT', 'VERIFIED_CLIENT', 'PARTNER_SUPPLIER', 'PROJECT_MANAGER', 'EXECUTIVE', 'SYSTEM_ADMIN'],
    pageOrArticleUrl: '/capabilities/green-renewable-energy',
    content: `Subject to compliance with the Renewable Energy Act of 2008 (RA 9513) and requirements of the Department of Energy (DOE) and Energy Regulatory Commission (ERC):
- Solar: Rooftop solar, ground-mounted solar, solar farms, solar carports, solar streetlights, building-integrated photovoltaics (BIPV).
- Energy Storage: Battery Energy Storage Systems (BESS), commercial and industrial storage, microgrids, emergency and backup-energy systems.
- Sustainable Infrastructure: Energy-efficient buildings, smart-grid infrastructure, EV charging stations, waste-to-energy opportunities, biomass and biogas opportunities, water recycling and rainwater harvesting.`,
  },
  {
    id: 'kc-11-agro-farming',
    category: 'Agro-Farming and Agro-Industrial Development',
    title: 'Agro-Industrial and Smart Farm Infrastructure Scope',
    section: 'Flagship Industry: Agro-Farming & Agro-Industrial',
    sourceDoc: 'LDL_Dhenze_Premium_Website_Architecture.pdf (Page 8)',
    publicationDate: 'May 14, 2025',
    lastUpdated: 'May 17, 2025',
    classification: 'Public',
    approvalStatus: 'Approved',
    allowedRoles: ['ANONYMOUS_VISITOR', 'PROSPECTIVE_CLIENT', 'VERIFIED_CLIENT', 'PARTNER_SUPPLIER', 'PROJECT_MANAGER', 'EXECUTIVE', 'SYSTEM_ADMIN'],
    pageOrArticleUrl: '/industries/agriculture-agro-industrial-development',
    content: `Comprehensive farm master planning, site development, internal roads and drainage, irrigation and water systems, climate-controlled greenhouses, livestock and poultry housing, feed-production facilities, food-processing facilities, cold storage warehousing, renewable farm energy (solar and BESS), biomass and biogas waste-to-value systems, agro-logistics and traceability facilities, and smart-farm sensor monitoring. Unverified services are marked as intended, strategic, or partner-enabled capabilities.`,
  },
  {
    id: 'kc-12-smart-cities',
    category: 'Smart Buildings and Smart Cities',
    title: 'Smart City Solutions and Intelligent Infrastructure',
    section: 'Field of Business 07: Smart City Solutions',
    sourceDoc: 'LDRBC Corporate Profile.pdf (Page 22)',
    publicationDate: 'May 14, 2025',
    lastUpdated: 'May 17, 2025',
    classification: 'Public',
    approvalStatus: 'Approved',
    allowedRoles: ['ANONYMOUS_VISITOR', 'PROSPECTIVE_CLIENT', 'VERIFIED_CLIENT', 'PARTNER_SUPPLIER', 'PROJECT_MANAGER', 'EXECUTIVE', 'SYSTEM_ADMIN'],
    pageOrArticleUrl: '/capabilities/smart-city-solutions',
    content: `Long-term strategy includes lawful participation in Smart City and intelligent community development integrating: Smart Buildings (connected and energy-efficient), Smart Energy (renewable generation, BESS, microgrids, smart energy management), Smart Mobility (EV charging, intelligent transportation, connected mobility), Smart Security (intelligent CCTV surveillance, emergency systems, centralized command centers), Smart Water (water monitoring, recycling, leak detection, intelligent distribution), Smart Environment (waste management, environmental monitoring), and Smart Governance (digital platforms, data analytics, infrastructure monitoring).`,
  },
  {
    id: 'kc-13-ai-technology',
    category: 'Artificial Intelligence and Digital Technology',
    title: 'Artificial Intelligence Applications and Safety Boundaries',
    section: 'Field of Business 08: Artificial Intelligence Technology',
    sourceDoc: 'LDRBC Corporate Profile.pdf (Page 23)',
    publicationDate: 'May 14, 2025',
    lastUpdated: 'May 17, 2025',
    classification: 'Public',
    approvalStatus: 'Approved',
    allowedRoles: ['ANONYMOUS_VISITOR', 'PROSPECTIVE_CLIENT', 'VERIFIED_CLIENT', 'PARTNER_SUPPLIER', 'PROJECT_MANAGER', 'EXECUTIVE', 'SYSTEM_ADMIN'],
    pageOrArticleUrl: '/capabilities/artificial-intelligence-technology',
    content: `AI applications deployed in compliance with the Data Privacy Act of 2012 (RA 10173):
- AI in Construction: Project scheduling optimization, construction-progress monitoring, cost and procurement forecasting, equipment utilization, quality-control assistance, predictive maintenance, safety analytics, and risk identification.
- AI in Buildings: Intelligent energy management, HVAC optimization, predictive maintenance, occupancy analytics, automated building operations.
- AI in Smart Cities: Traffic analysis, infrastructure and environmental monitoring, energy-demand forecasting, water-management analytics, emergency-response support.
- AI in Corporate Operations: Document automation, procurement and inventory analytics, financial analytics, customer service automation, contract-management support.
Note: AI is strictly decision-support and never replaces licensed architects, engineers, or accountable human decision-makers.`,
  },
  {
    id: 'kc-14-water-environmental',
    category: 'Water and Environmental Systems',
    title: 'Water Treatment, Sewage Treatment Plants, and Rainwater Harvesting',
    section: 'Capability 14: Water & Environmental Systems',
    sourceDoc: 'LDRBC Corporate Profile.pdf & Architecture Guide',
    publicationDate: 'May 14, 2025',
    lastUpdated: 'May 17, 2025',
    classification: 'Public',
    approvalStatus: 'Approved',
    allowedRoles: ['ANONYMOUS_VISITOR', 'PROSPECTIVE_CLIENT', 'VERIFIED_CLIENT', 'PARTNER_SUPPLIER', 'PROJECT_MANAGER', 'EXECUTIVE', 'SYSTEM_ADMIN'],
    pageOrArticleUrl: '/capabilities/water-environmental-systems',
    content: `Water infrastructure solutions complying with the Clean Water Act of 2004 (RA 9275) and DENR standards: Sewage Treatment Plants (STP) using MBBR technology, wastewater recycling for irrigation and flush reuse, rainwater harvesting cisterns, detention basins and flood mitigation canals, deep well pumping, reverse osmosis filtration, and solid waste handling infrastructure.`,
  },
  {
    id: 'kc-15-ipd',
    category: 'Integrated Project Delivery',
    title: 'Integrated Project Delivery (IPD) 10-Stage Ecosystem',
    section: 'Field of Business 09: Integrated Project Delivery',
    sourceDoc: 'LDRBC Corporate Profile.pdf (Page 23)',
    publicationDate: 'May 14, 2025',
    lastUpdated: 'May 17, 2025',
    classification: 'Public',
    approvalStatus: 'Approved',
    allowedRoles: ['ANONYMOUS_VISITOR', 'PROSPECTIVE_CLIENT', 'VERIFIED_CLIENT', 'PARTNER_SUPPLIER', 'PROJECT_MANAGER', 'EXECUTIVE', 'SYSTEM_ADMIN'],
    pageOrArticleUrl: '/capabilities/integrated-project-delivery',
    content: `LDL Dhenze's IPD model structures complex developments under a unified project strategy:
1. Concept -> 2. Feasibility -> 3. Master Planning -> 4. Architecture & Engineering -> 5. Procurement -> 6. Construction -> 7. Equipment -> 8. Green Energy -> 9. Technology -> 10. Artificial Intelligence -> 11. Testing & Commissioning -> 12. Operations Support.
Key benefits: Integrated solutions, cost efficiency, quality assurance, on-time delivery, sustainable development, innovation driven, safety first, community impact, and long-term asset value.`,
  },
  {
    id: 'kc-16-sustainability',
    category: 'Sustainability',
    title: 'Corporate Sustainability Principles and Verification Gate',
    section: 'Sustainability Commitment and Environmental Policy',
    sourceDoc: 'LDRBC Corporate Profile.pdf (Pages 20, 25)',
    publicationDate: 'May 14, 2025',
    lastUpdated: 'May 17, 2025',
    classification: 'Public',
    approvalStatus: 'Approved',
    allowedRoles: ['ANONYMOUS_VISITOR', 'PROSPECTIVE_CLIENT', 'VERIFIED_CLIENT', 'PARTNER_SUPPLIER', 'PROJECT_MANAGER', 'EXECUTIVE', 'SYSTEM_ADMIN'],
    pageOrArticleUrl: '/sustainability',
    content: `LDL Dhenze commits to sustainable development, energy efficiency, carbon footprint reduction, water conservation, and environmentally responsible material selection. Mandatory corporate policy: Measurable environmental figures, energy savings percentages, or carbon reduction statistics are published only after formal engineering and administrator verification. No speculative greenwashing claims are permitted.`,
  },
  {
    id: 'kc-17-safety-compliance',
    category: 'Safety and Compliance',
    title: 'Jobsite Safety Standards and DOLE DO 13 Compliance',
    section: 'Safety Standards and Occupational Health',
    sourceDoc: 'LDRBC Corporate Profile.pdf (Page 25)',
    publicationDate: 'May 14, 2025',
    lastUpdated: 'May 17, 2025',
    classification: 'Public',
    approvalStatus: 'Approved',
    allowedRoles: ['ANONYMOUS_VISITOR', 'PROSPECTIVE_CLIENT', 'VERIFIED_CLIENT', 'PARTNER_SUPPLIER', 'PROJECT_MANAGER', 'EXECUTIVE', 'SYSTEM_ADMIN'],
    pageOrArticleUrl: '/about#safety',
    content: `Safety is our highest priority in every undertaking. Operations adhere strictly to DOLE Department Order No. 13 (Guidelines Governing Occupational Safety and Health in the Construction Industry). We enforce: mandatory certified PPE (helmets, safety shoes, high-vis vests), daily toolbox safety meetings, scaffolding structural inspections, DOLE-certified safety officers on jobsites, heavy machinery pre-start inspection protocols, and hazard identification and risk assessment (HIRA) procedures.`,
  },
  {
    id: 'kc-18-portfolio-projects',
    category: 'Projects and Portfolio',
    title: 'Verified Project Pipeline and Stage Classifications',
    section: 'Portfolio of Projects & Case Studies',
    sourceDoc: 'Official LDL Dhenze Project Register',
    publicationDate: 'May 14, 2025',
    lastUpdated: 'June 01, 2025',
    classification: 'Public',
    approvalStatus: 'Approved',
    allowedRoles: ['ANONYMOUS_VISITOR', 'PROSPECTIVE_CLIENT', 'VERIFIED_CLIENT', 'PARTNER_SUPPLIER', 'PROJECT_MANAGER', 'EXECUTIVE', 'SYSTEM_ADMIN'],
    pageOrArticleUrl: '/projects',
    content: `LDL Dhenze strictly classifies projects into six stages: Concept, Proposed, Pre-development, In Development, Under Construction, Completed. Renders and conceptual frameworks are never represented as completed built structures.
Active & Verified Projects:
1. Angeles City Residential Villa Cluster (Angeles City, Pampanga) - Under Construction. Built Area: 1,450 sq.m across 4 custom residential villas. Structural concrete framing, site development, zero lost-time incidents.
2. Central Luzon Agro-Industrial Logistics Staging (Pampanga) - In Development. 35,000 sq.m site area, planned 3,000 MT cold storage, 1.2 km paved heavy-load roads.
3. Commercial Solar Microgrid Integration Pilot (Clark Freeport Vicinity) - Proposed. 250 kWp DC rooftop solar PV and 100 kWh BESS storage.
4. Smart Eco-Township Masterplan Concept (Central Luzon Growth Corridor) - Concept. 45-hectare masterplanned conceptual study (Not built).`,
  },
  {
    id: 'kc-19-partners',
    category: 'Partners and Suppliers',
    title: 'Supplier Accreditation and Subcontractor Onboarding',
    section: 'Partner Portal and Procurement Gateway',
    sourceDoc: 'LDL_Dhenze_Premium_Website_Architecture.pdf (Page 10)',
    publicationDate: 'May 14, 2025',
    lastUpdated: 'May 17, 2025',
    classification: 'Public',
    approvalStatus: 'Approved',
    allowedRoles: ['ANONYMOUS_VISITOR', 'PROSPECTIVE_CLIENT', 'VERIFIED_CLIENT', 'PARTNER_SUPPLIER', 'PROJECT_MANAGER', 'EXECUTIVE', 'SYSTEM_ADMIN'],
    pageOrArticleUrl: '/partners',
    content: `Suppliers, subcontractors, equipment providers, and engineering consultants can apply for accreditation through the LDL Dhenze Partner Gateway. Requirements include: DTI/SEC registration, BIR Form 2303, Tax Clearance, PCAB license (for construction contractors), Professional Regulation Commission (PRC) licenses (for individual consultants), company profile, track record, and commercial insurance coverage. Accreditations are valid for one year subject to compliance renewal.`,
  },
  {
    id: 'kc-20-inquiries',
    category: 'Project Inquiry Procedures',
    title: 'Project Opportunity Wizard and Intake Workflow',
    section: 'Project Intake and Consultation Booking',
    sourceDoc: 'LDL_Dhenze_Premium_Website_Architecture.pdf (Pages 4, 10)',
    publicationDate: 'May 14, 2025',
    lastUpdated: 'May 17, 2025',
    classification: 'Public',
    approvalStatus: 'Approved',
    allowedRoles: ['ANONYMOUS_VISITOR', 'PROSPECTIVE_CLIENT', 'VERIFIED_CLIENT', 'PARTNER_SUPPLIER', 'PROJECT_MANAGER', 'EXECUTIVE', 'SYSTEM_ADMIN'],
    pageOrArticleUrl: '/start-project',
    content: `Prospective clients can submit structured project inquiries via the online Project Opportunity Wizard. Information collected: client name, company, email, mobile number, project type, industry, project location, land ownership/control status, land area (sq.m), current project stage, desired services, budget band, expected commencement date, financing status, and available drawings/documents. Upon submission, a unique tracking number (LDL-INQ-YYYYMMDD-XXXX) is generated, followed by an automated confirmation and review by an authorized project manager within 2 business days.`,
  },
  {
    id: 'kc-21-client-portal',
    category: 'Client Portal Help',
    title: 'Client Portal Navigation and Feature Guide',
    section: 'Project Progress Room and Client Services',
    sourceDoc: 'LDL_Dhenze_Premium_Website_Architecture.pdf (Page 10, 11)',
    publicationDate: 'May 14, 2025',
    lastUpdated: 'May 17, 2025',
    classification: 'Public',
    approvalStatus: 'Approved',
    allowedRoles: ['ANONYMOUS_VISITOR', 'PROSPECTIVE_CLIENT', 'VERIFIED_CLIENT', 'PROJECT_MANAGER', 'EXECUTIVE', 'SYSTEM_ADMIN'],
    pageOrArticleUrl: '/portal',
    content: `Verified clients gain access to the secure Client Portal (Project Progress Room). Features include: 24/7 project milestone tracking, viewing approved 3D BIM models and 2D architectural drawings, submittal and change request reviews, digital approval workflows, viewing inspection site photos and drone updates, Request for Information (RFI) threads, invoice tracking and payment history, consultation booking, and support request ticketing. Clients only access records belonging to their authorized organization.`,
  },
  {
    id: 'kc-22-public-faqs',
    category: 'Public Frequently Asked Questions',
    title: 'Frequently Asked Questions about LDL Dhenze',
    section: 'Public Knowledge & FAQs',
    sourceDoc: 'Official LDL Dhenze FAQ Compendium',
    publicationDate: 'May 14, 2025',
    lastUpdated: 'May 17, 2025',
    classification: 'Public',
    approvalStatus: 'Approved',
    allowedRoles: ['ANONYMOUS_VISITOR', 'PROSPECTIVE_CLIENT', 'VERIFIED_CLIENT', 'PARTNER_SUPPLIER', 'PROJECT_MANAGER', 'EXECUTIVE', 'SYSTEM_ADMIN'],
    pageOrArticleUrl: '/contact#faq',
    content: `Q: Where is LDL Dhenze located?
A: Our registered office is located at 704 Nile St., Anunas 2009, City of Angeles, Pampanga, Philippines.
Q: What is LDL Dhenze's primary business activity?
A: Our BIR registered line of business is Construction of Other Civil Engineering Projects (PSIC 42900). We provide residential, commercial, industrial, and civil infrastructure construction.
Q: Does LDL Dhenze provide architectural and engineering plans?
A: Yes. Coordinated through duly qualified and licensed Philippine Architects and Professional Engineers in strict compliance with RA 9266 and PRC regulations.
Q: Can LDL Dhenze integrate solar and battery storage into developments?
A: Yes. We coordinate rooftop solar, ground mounts, and battery storage (BESS) under RA 9513 with accredited renewable energy partners.
Q: How do I book a technical consultation?
A: You can use the "Book Consultation" feature on our website or contact us at info@ldldhenze.com or +63 912 345 6789.`,
  },
  {
    id: 'kc-23-private-client-project',
    category: 'Private Client Projects',
    title: 'Restricted Client Project Schedule & Submittals [DEMO ISO]',
    section: 'Private Client Milestone Track (Org: Angeles Villa Group)',
    sourceDoc: 'Internal Project Management Repository',
    publicationDate: 'May 14, 2025',
    lastUpdated: 'June 01, 2025',
    classification: 'Client-Private',
    approvalStatus: 'Approved',
    allowedRoles: ['VERIFIED_CLIENT', 'CLIENT_ORG_ADMIN', 'PROJECT_MANAGER', 'EXECUTIVE', 'SYSTEM_ADMIN'],
    content: `CONFIDENTIAL CLIENT DATA (Accessible only to authorized members of Angeles Villa Group):
Project: Angeles City Residential Villa Cluster (LDL-PRJ-2024-001)
Current Progress: 68% Complete.
Milestones:
- Milestone 1: Earthworks & Foundation Cast - Completed (March 2024)
- Milestone 2: 2nd Storey Superstructure Concrete Pour - Completed (August 2024)
- Milestone 3: Roof Truss & Solar Conduit Roughing-In - In Progress (Est. completion October 2024)
- Milestone 4: Interior Plaster & Floor Screed - Scheduled (December 2024)
Total Approved Change Orders: 2 (Structural rebar grade enhancement, underground water tank capacity increase).
Next Milestone Inspection: Scheduled with client representative on September 25, 2024.`,
  },
  {
    id: 'kc-24-internal-company',
    category: 'Internal Company Knowledge',
    title: 'Internal Standard Operating Procedures for Quality Audits',
    section: 'Corporate Standard Operating Procedures (SOP-QA-004)',
    sourceDoc: 'Internal Operations Manual',
    publicationDate: 'May 14, 2025',
    lastUpdated: 'May 17, 2025',
    classification: 'Internal',
    approvalStatus: 'Approved',
    allowedRoles: ['PROJECT_TEAM_MEMBER', 'PROJECT_MANAGER', 'CONTENT_EDITOR', 'COMPLIANCE_REVIEWER', 'EXECUTIVE', 'SYSTEM_ADMIN'],
    content: `INTERNAL USE ONLY: Quality Assurance Inspection Checklist before Concrete Pouring:
1. Verify rebar sizing, spacing, and tie wire gauge against approved structural drawings.
2. Confirm minimum concrete clear cover using approved concrete spacer blocks (75mm for footings, 40mm for columns/beams, 20mm for slabs).
3. Ensure all electrical conduits, plumbing sleeves, and mechanical penetrations are securely anchored with waterstop rings where below grade.
4. Clean out formwork debris, sawdust, and standing water before pre-pour inspection sign-off.
5. Record batch plant delivery ticket numbers, slump test result (target 100mm ± 25mm), and cast 3 test cylinder samples per 10 cubic meters.`,
  },
  {
    id: 'kc-25-superseded-content',
    category: 'Archived or Superseded Content',
    title: 'Superseded Draft Project Schedule 2023 [EXCLUDED FROM ACTIVE RETRIEVAL]',
    section: 'Archived Records',
    sourceDoc: 'Historical Archives',
    publicationDate: 'January 10, 2023',
    lastUpdated: 'January 10, 2023',
    classification: 'Internal',
    approvalStatus: 'Superseded',
    allowedRoles: ['SYSTEM_ADMIN'],
    content: `SUPERSEDED DRAFT: Historical preliminary planning estimates from 2023 superseded by official BIR 2303 registration and 2024 revised project schedule. This document is retained for archival compliance only and must NOT be used for current client answers.`,
  },
];
