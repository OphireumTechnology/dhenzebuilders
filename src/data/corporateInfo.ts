/**
 * LDL DHENZE RESIDENTIAL BUILDING CONSTRUCTION
 * Authoritative Centralized Corporate Information & Governance Data
 *
 * All public and administrative components MUST source company details from this module.
 * Extracted and verified strictly from official DTI, BIR Form 2303, and Corporate Profile records.
 */

export interface ExecutiveLeadershipInfo {
  legalName: string;
  publicDisplayName: string;
  professionalTitle: string;
  signatureName: string;
  positionHierarchy: string;
  telephoneDisplay: string;
  telephoneLink: string;
  primaryEmail: string;
  secondaryEmail: string;
  officeAddress: {
    facility: string;
    building: string;
    zone: string;
    city: string;
    postalCode: string;
    province: string;
    country: string;
    fullDisplay: string;
  };
  education: Array<{
    degree: string;
    institution: string;
    location: string;
  }>;
  executiveSummary: string;
  bankingBackground: string;
  founderVision: string;
  founderMessage: {
    salutation: string;
    paragraphs: string[];
    gratitude: {
      team: string;
      partners: string;
      clients: string;
    };
    closingCall: string;
    signOffName: string;
    signOffTitle: string;
    complianceNote: string;
  };
}

export interface CompanyRegistrations {
  businessName: string;
  businessStructure: string;
  proprietor: string;
  dtiNumber: string;
  dtiValidity: string;
  dtiTerritorialScope: string;
  dtiLocality: string;
  birTradeName: string;
  birLineOfBusiness: string;
  psicCode: string;
  tin: string;
  rdo: string;
  birCertificateDate: string;
  birForm2303Ocn: string;
  taxRegisteredAddress: string;
}

export interface CoreValueItem {
  id: string;
  name: string;
  tagline: string;
  description: string;
  principleNumber: string;
}

export interface BusinessFieldItem {
  id: string;
  code: string;
  title: string;
  description: string;
  targetCapabilities: string[];
}

export interface StewardshipPillar {
  number: string;
  title: string;
  description: string;
}

export const CORPORATE_INFO = {
  companyName: 'LDL Dhenze Residential Building Construction',
  shortName: 'LDL Dhenze',
  tagline: 'BUILDING TODAY. ENGINEERING TOMORROW. POWERING THE FUTURE.',
  secondaryTagline: 'WE BUILD TODAY. WE ENGINEER TOMORROW. WE EMPOWER GENERATIONS.',
  motto: 'ONE VISION. ONE COMPANY. LIMITLESS POSSIBILITIES.',
  excellenceMotto: 'BUILDING FOUNDATIONS. DELIVERING EXCELLENCE.',

  // Authoritative Contacts
  contacts: {
    telephoneDisplay: '+63 917 966 8814',
    telephoneLink: 'tel:+639179668814',
    primaryEmail: 'info@dhenzebuilder.com',
    secondaryEmail: 'dhenzebuilders@gmail.com',
    combinedEmailDisplay: 'info@dhenzebuilder.com | dhenzebuilders@gmail.com',
    website: 'https://dhenzebuilder.com',
    operatingHours: 'Monday – Saturday: 8:00 AM – 5:00 PM PST',
  },

  // Authoritative Headquarters
  headquarters: {
    facility: 'KMC | One West Aeropark, Clark Pampanga',
    building: 'One West Aeropark, Clark Freeport Zone',
    city: 'Mabalacat City, 2010 Pampanga',
    country: 'Philippines',
    fullFormatted:
      'KMC | One West Aeropark, Clark Freeport Zone, Mabalacat City, 2010 Pampanga, Philippines',
    registeredTaxAddress:
      '704 Nile St., Anunas 2009, City of Angeles, Pampanga, Philippines',
  },

  // Executive Leadership
  executive: {
    legalName: 'Leodenis Deveza Languisan',
    publicDisplayName: 'Leodenis “Dhenze” Languisan',
    professionalTitle: 'Founder, President and Chief Executive Officer',
    signatureName: 'Leodenis Deveza Languisan',
    positionHierarchy: 'Executive Leadership • Board of Management',
    telephoneDisplay: '+63 917 966 8814',
    telephoneLink: 'tel:+639179668814',
    primaryEmail: 'info@dhenzebuilder.com',
    secondaryEmail: 'dhenzebuilders@gmail.com',

    officeAddress: {
      facility: 'KMC | One West Aeropark, Clark Pampanga',
      building: 'One West Aeropark, Clark Freeport Zone',
      zone: 'Clark Freeport Zone',
      city: 'Mabalacat City',
      postalCode: '2010',
      province: 'Pampanga',
      country: 'Philippines',
      fullDisplay:
        'KMC | One West Aeropark, Clark Freeport Zone, Mabalacat City, 2010 Pampanga, Philippines',
    },

    education: [
      {
        degree: 'Bachelor of Commerce, Major in Banking and Finance',
        institution: 'STI College',
        location: 'Baguio City, Philippines',
      },
      {
        degree: 'Bachelor of Science in Information Technology',
        institution: 'Data Center College of the Philippines',
        location: 'Baguio City, Philippines',
      },
    ],

    executiveSummary:
      'Leodenis Deveza Languisan brings to LDL Dhenze a multidisciplinary professional background spanning more than two decades across banking and financial services, corporate leadership, business development, operations, construction, petroleum, cooperatives, technology, and financial markets. His professional foundation combines financial discipline, commercial experience, operational management, stakeholder relations, regulatory awareness, and strategic leadership.',

    bankingBackground:
      'His career includes tenure at JPMorgan Chase Bank in mortgage and auto-loan operations, where his responsibilities included account servicing, payment processing and reconciliation, client issue resolution, coordination with underwriting and collections teams, and adherence to internal banking policies, risk controls, consumer-protection requirements, and data-privacy standards. This banking discipline provides the operational foundation for LDL Dhenze: financial accountability, documentation rigor, internal controls, regulatory compliance, and disciplined execution.',

    founderVision:
      'To build an enterprise where financial discipline meets engineering excellence, where technology strengthens infrastructure, and where every project is approached not merely as a structure to be completed, but as a long-term asset capable of creating enduring economic and social value.',

    founderMessage: {
      salutation: 'To Our Clients, Partners, and Future Generations,',
      paragraphs: [
        'When we build, we do not merely raise structures. We build opportunities. We build progress. We build legacies. And above all, we build trust.',
        'At LDL Dhenze Residential Building Construction, our mission is clear: to lawfully deliver world-class infrastructure and integrated solutions that improve lives and strengthen the nation—today, tomorrow, and for generations to come.',
        'Our commitment is anchored on integrity that never compromises, quality that never fails, and innovation that creates lasting value. We embrace technology, renewable energy, and Artificial Intelligence as tools to design smarter, build stronger, and operate more responsibly.',
        'We understand that every project we undertake carries public trust and a legal responsibility. That is why we strictly comply with all applicable laws, codes, and regulatory standards of the Republic of the Philippines. We build with discipline. We manage with transparency. We deliver with honor.',
      ],
      gratitude: {
        team: 'To our team—thank you for your dedication.',
        partners: 'To our partners—thank you for your confidence.',
        clients: 'To our clients—thank you for allowing us to be part of your vision.',
      },
      closingCall:
        'Together, let us continue building a better Philippines—stronger, smarter, and more sustainable.',
      signOffName: 'Leodenis Deveza Languisan',
      signOffTitle: 'Founder & President',
      complianceNote:
        'This message represents the Company’s commitment and intent. All undertakings are subject to compliance with applicable Philippine laws, regulations, permits, and approvals.',
    },
  },

  // Statutory Registrations
  registrations: {
    businessName: 'LDL DHENZE RESIDENTIAL BUILDING CONSTRUCTION',
    businessStructure:
      'Single Proprietorship duly organized and existing under the laws of the Republic of the Philippines',
    proprietor: 'Leodenis Deveza Languisan',
    dtiNumber: '4812272',
    dtiValidity: '22 March 2023 to 22 March 2028, inclusive',
    dtiTerritorialScope: 'City/Municipality',
    dtiLocality: 'Quezon City, National Capital Region, Second District',
    birTradeName: 'LDL Dhenze Residential Building Construction',
    birLineOfBusiness: 'Construction of Other Civil Engineering Projects',
    psicCode: '42900 — Construction of Other Civil Engineering Projects',
    tin: '306-113-062-00000',
    rdo: 'Revenue District Office No. 214A North Pampanga (Revenue Region No. 004 - City of San Fernando, Pampanga)',
    birCertificateDate: 'March 17, 2025',
    birForm2303Ocn: '21ARC2025000002189',
    taxRegisteredAddress:
      '704 Nile St., Anunas 2009, City of Angeles, Pampanga, Philippines',
  },

  // 4 Pledge Pillars
  pledgePillars: [
    {
      id: 'compliant-by-law',
      title: 'Compliant by Law',
      description: 'We observe all applicable laws, codes, and regulations.',
      icon: 'landmark',
    },
    {
      id: 'ethical-by-choice',
      title: 'Ethical by Choice',
      description: 'We do what is right even when no one is watching.',
      icon: 'scale',
    },
    {
      id: 'stronger-together',
      title: 'Stronger Together',
      description: 'We believe in the power of collaboration and shared success.',
      icon: 'users',
    },
    {
      id: 'building-the-nation',
      title: 'Building the Nation',
      description:
        'We contribute to a better, stronger, and more sustainable Philippines.',
      icon: 'globe',
    },
  ],

  // Core Corporate Values (Page 2 & Page 25 of Corporate Profile)
  coreValues: [
    {
      id: 'val-integrity',
      name: 'Integrity',
      tagline: 'Builds trust.',
      description:
        'Conducting business responsibly, transparently, and in strict compliance with applicable Philippine laws and commercial ethics.',
      principleNumber: '01',
    },
    {
      id: 'val-quality',
      name: 'Quality',
      tagline: 'Builds excellence.',
      description:
        'Pursuing uncompromising standards in workmanship, materials, structural engineering, and sustainable technology.',
      principleNumber: '02',
    },
    {
      id: 'val-innovation',
      name: 'Innovation',
      tagline: 'Builds the future.',
      description:
        'Embracing advanced digital technologies, renewable energy systems, and intelligent methods capable of transforming the built environment.',
      principleNumber: '03',
    },
    {
      id: 'val-safety',
      name: 'Safety',
      tagline: 'Protects lives.',
      description:
        'Making human safety, structural resilience, and occupational health a fundamental, non-negotiable consideration in every undertaking.',
      principleNumber: '04',
    },
    {
      id: 'val-sustainability',
      name: 'Sustainability',
      tagline: 'Preserves tomorrow.',
      description:
        'Supporting environmentally responsible development through green materials, energy efficiency, and resource conservation.',
      principleNumber: '05',
    },
    {
      id: 'val-accountability',
      name: 'Accountability',
      tagline: 'Delivers results.',
      description:
        'Taking full responsibility for the Company’s commitments, contractual timelines, regulatory obligations, and operational performance.',
      principleNumber: '06',
    },
    {
      id: 'val-partnership',
      name: 'Partnership',
      tagline: 'Creates legacy.',
      description:
        'Building lasting, good-faith relationships with clients, communities, licensed professionals, accredited suppliers, and institutional stakeholders.',
      principleNumber: '07',
    },
  ],

  // 9 Fields of Business (Corporate Profile Page 1 & Page 15)
  fieldsOfBusiness: [
    {
      id: 'field-01',
      code: '01',
      title: 'Construction & Civil Engineering',
      description:
        'Core registered business encompassing residential developments, commercial centers, industrial facilities, and public infrastructure works.',
      targetCapabilities: [
        'Residential developments & estates',
        'Commercial & mixed-use complexes',
        'Industrial & manufacturing facilities',
        'Roads, site development & drainage works',
      ],
    },
    {
      id: 'field-02',
      code: '02',
      title: 'Construction Materials & Supply',
      description:
        'Lawful procurement network providing certified cement, steel, aggregates, lumber, piping, electrical, and finishing materials.',
      targetCapabilities: [
        'Reinforcing & structural steel',
        'Ready-mix concrete & aggregates',
        'Piping & electrical conduits',
        'High-specification finishes & hardware',
      ],
    },
    {
      id: 'field-03',
      code: '03',
      title: 'Heavy Equipment & Machinery',
      description:
        'Sourcing, fleet deployment, and maintenance coordination for earthmoving, lifting, paving, and compaction machinery.',
      targetCapabilities: [
        'Excavators, bulldozers & backhoe loaders',
        'Mobile & tower crane coordination',
        'Transit mixers & concrete pumps',
        'Soil compactors & road graders',
      ],
    },
    {
      id: 'field-04',
      code: '04',
      title: 'Architectural Plans, Engineering & Design',
      description:
        'Comprehensive concept planning, structural computations, MEP engineering, and BIM rendered strictly through duly licensed Philippine professionals under RA 9266.',
      targetCapabilities: [
        'Architectural design & master planning',
        'Structural & civil engineering calculations',
        'MEPFS engineering coordination',
        'BIM modeling & 3D visualization',
      ],
    },
    {
      id: 'field-05',
      code: '05',
      title: 'Green & Renewable Energy',
      description:
        'Integration of clean energy systems consistent with Republic Act 9513 (Renewable Energy Act of 2008), DOE guidelines, and ERC standards.',
      targetCapabilities: [
        'Rooftop & ground-mounted solar PV',
        'Commercial battery storage (BESS)',
        'Resilient islandable microgrids',
        'EV charging station infrastructure',
      ],
    },
    {
      id: 'field-06',
      code: '06',
      title: 'Technological Solutions',
      description:
        'Intelligent digital layers including Building Management Systems (BMS), IoT sensors, fiber infrastructure, and cloud project governance.',
      targetCapabilities: [
        'Building management systems (BMS)',
        'Smart sensors & intelligent surveillance',
        'Access control & fiber telecommunications',
        'Digital twins & asset telemetry',
      ],
    },
    {
      id: 'field-07',
      code: '07',
      title: 'Smart City Solutions',
      description:
        'Integrated community ecosystems connecting buildings, clean mobility, smart utility grids, and centralized command platforms.',
      targetCapabilities: [
        'Smart buildings & energy optimization',
        'Intelligent traffic & mobility management',
        'Smart water & resource monitoring',
        'Centralized municipal governance platforms',
      ],
    },
    {
      id: 'field-08',
      code: '08',
      title: 'Artificial Intelligence Technology',
      description:
        'Application of machine learning, computer vision, and predictive analytics for construction scheduling, site risk mitigation, and energy management.',
      targetCapabilities: [
        'Construction scheduling optimization',
        'Predictive maintenance & asset analytics',
        'Automated document & drawing compliance',
        'Site safety & risk telemetry',
      ],
    },
    {
      id: 'field-09',
      code: '09',
      title: 'Integrated Project Delivery (IPD)',
      description:
        'Unified development strategy uniting design, procurement, construction execution, and operational handover under disciplined governance.',
      targetCapabilities: [
        'Concept feasibility & master programming',
        'Target-value design & cost optimization',
        'Synchronized trade coordination',
        'Commissioning & operational handover',
      ],
    },
  ],

  // Institutional Stewardship Framework (Phase 4 Specification)
  stewardship: {
    eyebrow: 'INSTITUTIONAL STEWARDSHIP',
    heading: 'Disciplined Development. Enduring Value.',
    body1:
      'LDL Dhenze Residential Building Construction coordinates the commercial, technical and operational disciplines required to move complex developments from early planning through responsible execution.',
    body2:
      'Our approach combines transparent project controls, qualified professional collaboration and long-term development thinking—helping clients protect project integrity while creating assets designed to serve communities and future generations.',
    supportingStatement:
      'Every engagement is approached with discretion, accountability and respect for applicable Philippine laws, professional standards and regulatory requirements.',
    actionLabel: 'Explore Our Approach',
    actionRoute: 'about',
    framework: [
      {
        number: '01',
        title: 'Governance',
        description:
          'Clear responsibilities, controlled approvals and traceable project decisions.',
      },
      {
        number: '02',
        title: 'Professional Coordination',
        description:
          'Collaboration with appropriately qualified and licensed professionals where regulated services are required.',
      },
      {
        number: '03',
        title: 'Long-Term Value',
        description:
          'Development decisions considered in relation to durability, operations, resilience and community impact.',
      },
    ],
  },

  // Mandatory Statutory Disclaimers
  statutoryNotice:
    'The DTI Certificate of Business Name Registration is a formal registration of business name and is not a license to engage in business or to practice a regulated profession. All architectural and engineering plans, designs, calculations, and professional services are rendered exclusively through duly qualified and PRC-licensed architects and engineers pursuant to Republic Act No. 9266 (The Architecture Act of the Philippines) and the Civil Engineering Law. Construction execution requiring PCAB (Philippine Contractors Accreditation Board) licensing is undertaken through qualified and accredited contractors. Renewable energy and specialized technology initiatives are pursued in full compliance with the Renewable Energy Act of 2008 (R.A. 9513), Department of Energy (DOE) requirements, and Energy Regulatory Commission (ERC) regulations.',
};
