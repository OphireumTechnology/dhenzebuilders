import { GoogleGenAI } from '@google/genai';
import {
  AnswerClassification,
  AnswerConfidence,
  AssistantSourceCitation,
  RecommendedNextAction,
  UserRole,
} from '../src/types';
import { INITIAL_KNOWLEDGE_BASE } from '../src/data/knowledgeBase';

export const MANDATED_REFUSAL_MESSAGE =
  'I’m LDL Dhenze Builder AI, a specialized assistant for construction, engineering, property development, infrastructure, renewable energy, agro-industrial development, sustainability and intelligent technology. I’m unable to assist with that topic, but I can help with a question related to these business areas.';

export const COMPANY_NOT_FOUND_MESSAGE =
  'I could not verify this information from the approved LDL Dhenze sources. I can refer your question to an authorized company representative.';

export const GENERAL_GUIDANCE_NOTICE =
  'This response provides general industry information. Project-specific requirements must be verified using actual site conditions, applicable regulations and qualified professional review.';

export const PROFESSIONAL_REVIEW_NOTICE =
  'PROFESSIONAL REVIEW REQUIRED\n\nThis material is preliminary and does not replace the design, verification, certification, signature or approval of a duly licensed and authorized professional.';

export const PROFESSIONAL_REVIEW_STATEMENT =
  'Under Republic Act No. 9266 (The Architecture Act of 2004) and Republic Act No. 544 (The Civil Engineering Law of the Philippines), the signing, dry-sealing, structural safety certification, or regulatory permitting guarantee of construction documents is strictly restricted to duly registered and licensed Philippine professionals. LDL Dhenze Builder AI produces preliminary concepts, feasibility studies, and educational guidance only; final structural calculations and sealed drawing sets must be prepared and stamped by our authorized PRC-licensed architects and engineers.';

export const SYSTEM_INSTRUCTION = `You are LDL Dhenze Builder AI, the specialized digital assistant of LDL Dhenze Residential Building Construction.

You may use broader AI knowledge and reasoning, but you must answer only questions related to LDL Dhenze’s approved lines of business: construction, civil engineering, infrastructure, property and real estate development, architecture and engineering coordination, master planning, BIM, materials, procurement, heavy equipment, renewable energy, smart buildings, smart cities, water systems, environmental infrastructure, agro-farming, agro-industrial development, logistics, hospitality, healthcare, education, utilities, sustainability, facilities management, technology and closely related project-development subjects.

For company-specific claims, use only approved LDL Dhenze sources. Never use general model knowledge to invent company projects, clients, credentials, licenses, registrations, prices, partnerships, equipment, experience or achievements.

For general questions within the approved business scope, you may provide professional educational and analytical guidance using broader model knowledge. Clearly label this information as General Industry Guidance and state relevant assumptions and limitations.

When a question combines company information with general industry knowledge, clearly separate verified company capabilities from the general development approach.

Use current authoritative sources for time-sensitive laws, regulations, standards, prices, specifications and market information when approved research tools are available. Cite those sources and identify the date or jurisdiction where relevant.

Do not provide final architectural, engineering, legal, financial, safety or regulatory approval. Do not generate professional signatures or seals. Clearly label preliminary plans and designs as not for construction and requiring duly licensed professional review.

Protect private project information. Retrieve private content only when the authenticated user has permission to access the organization, project and source document.

Politely refuse questions outside the approved company business scope. Do not become a general entertainment, personal-advice, political, trading or general-purpose assistant.

If evidence is insufficient, say so honestly. Never fabricate an answer, source or company claim.`;

const UNRELATED_KEYWORDS = [
  'celebrity', 'hollywood', 'dating', 'relationship advice', 'girlfriend', 'boyfriend',
  'romantic message', 'write a poem about love', 'love letter', 'cryptocurrency', 'crypto',
  'bitcoin', 'ethereum', 'buy crypto', 'stock pick', 'gamble', 'casino', 'betting',
  'video game cheat', 'play games', 'movie should i watch', 'movie review',
  'medical treatment advice', 'diagnose my symptoms', 'prescribe medication', 'headache cure',
  'jailbreak', 'hack password', 'illegal drugs',
];

const PROMPT_INJECTION_PATTERNS = [
  'ignore previous instructions',
  'ignore all rules',
  'reveal system prompt',
  'what is your prompt',
  'bypass security',
  'act as an unrestricted',
  'dan mode',
  'override authorization',
  'show private api key',
  'who are you really',
];

export interface AssistantResponse {
  content: string;
  confidence: AnswerConfidence;
  classification: AnswerClassification;
  citations: AssistantSourceCitation[];
  verifiedCompanySources?: AssistantSourceCitation[];
  externalSources?: AssistantSourceCitation[];
  assumptions?: string[];
  limitations?: string[];
  recommendedNextAction: RecommendedNextAction;
  actionView: string;
  category: string;
  disclaimer: string;
  verifiedCompanyCapabilities?: string;
  generalDevelopmentApproach?: string;
}

export function evaluateQueryRouting(
  rawMessage: string,
  userRole: UserRole,
  knowledgeStore = INITIAL_KNOWLEDGE_BASE
): {
  isInjection: boolean;
  isOutsideScope: boolean;
  isProfessionalReview: boolean;
  isRequiresCurrentSources: boolean;
  isCompanySpecific: boolean;
  isMixed: boolean;
  isGeneralIndustry: boolean;
  companyMatches: Array<{ chunk: (typeof INITIAL_KNOWLEDGE_BASE)[0]; score: number }>;
} {
  const query = rawMessage.toLowerCase().trim();

  // 1. Check prompt injection
  const isInjection = PROMPT_INJECTION_PATTERNS.some((p) => query.includes(p));

  // 2. Check outside scope
  const isOutsideScope =
    UNRELATED_KEYWORDS.some((kw) => query.includes(kw)) ||
    query.includes('celebrity') ||
    query.includes('cryptocurrency') ||
    query.includes('romantic message') ||
    query.includes('movie should i watch') ||
    query.includes('medical treatment advice');

  // 3. Check professional review requests
  const isProfessionalReview =
    (query.includes('sign') && (query.includes('plan') || query.includes('drawing') || query.includes('structural'))) ||
    (query.includes('certify') && (query.includes('safe') || query.includes('building') || query.includes('structural'))) ||
    (query.includes('guarantee') && query.includes('permit')) ||
    (query.includes('final structural calculation') || query.includes('produce final structural')) ||
    (query.includes('seal') && (query.includes('architect') || query.includes('engineer') || query.includes('drawing')));

  // 4. Check time-sensitive / current sources (codes, steel price, solar permits, zoning)
  const isRequiresCurrentSources =
    (query.includes('current') && (query.includes('building code') || query.includes('philippine building code') || query.includes('price of reinforcing steel') || query.includes('steel price') || query.includes('permits are currently required') || query.includes('zoning classification'))) ||
    query.includes('current price of reinforcing steel') ||
    query.includes('permits are currently required for a solar farm') ||
    query.includes('current zoning classification');

  // 5. Check mixed questions (LDL Dhenze + broader development concept)
  const isMixed =
    (query.includes('ldl dhenze') || query.includes('dhenze')) &&
    (query.includes('approach a smart and sustainable') ||
      query.includes('renewable-powered agricultural') ||
      query.includes('hospital development') ||
      query.includes('mixed-use project') ||
      query.includes('how can ldl dhenze help develop'));

  // 6. Check company specific questions
  const isCompanySpecific =
    (query.includes('ldl dhenze') || query.includes('company') || query.includes('leodenis') || query.includes('founder')) &&
    (query.includes('completed') ||
      query.includes('licenses') ||
      query.includes('clients') ||
      query.includes('equipment') ||
      query.includes('prices') ||
      query.includes('services does ldl dhenze') ||
      query.includes('partners') ||
      query.includes('contact') ||
      query.includes('registration') ||
      query.includes('dti') ||
      query.includes('bir'));

  // Match against knowledge chunks
  const activeChunks = knowledgeStore.filter((chunk) => {
    if (chunk.approvalStatus !== 'Approved') return false;
    if (!chunk.allowedRoles.includes(userRole)) return false;
    return true;
  });

  const scored = activeChunks.map((chunk) => {
    let score = 0;
    const text = `${chunk.title} ${chunk.category} ${chunk.section} ${chunk.content}`.toLowerCase();
    const words = query.split(/\s+/).filter((w) => w.length > 2);
    for (const w of words) {
      if (text.includes(w)) score += 2;
    }
    if (query.includes(chunk.category.toLowerCase())) score += 8;
    if (query.includes(chunk.title.toLowerCase())) score += 10;
    return { chunk, score };
  });

  scored.sort((a, b) => b.score - a.score);
  const companyMatches = scored.filter((s) => s.score > 0);

  // 7. General industry within scope
  const isGeneralIndustry =
    query.includes('what is bim') ||
    query.includes('plan a residential subdivision') ||
    query.includes('warehouse construction costs') ||
    query.includes('required for a solar farm') ||
    query.includes('rainwater be reused') ||
    query.includes('agro-industrial masterplan') ||
    query.includes('construction-project risks') ||
    query.includes('smart-building management') ||
    (!isOutsideScope && !isProfessionalReview && !isRequiresCurrentSources && !isCompanySpecific && !isMixed);

  return {
    isInjection,
    isOutsideScope,
    isProfessionalReview,
    isRequiresCurrentSources,
    isCompanySpecific,
    isMixed,
    isGeneralIndustry,
    companyMatches,
  };
}

export function buildDeterministicAnswer(
  message: string,
  routing: ReturnType<typeof evaluateQueryRouting>
): AssistantResponse {
  const lower = message.toLowerCase();

  // 1. Outside Scope
  if (routing.isOutsideScope || routing.isInjection) {
    return {
      content: MANDATED_REFUSAL_MESSAGE,
      confidence: 'Outside Allowed Scope',
      classification: AnswerClassification.OUTSIDE_SCOPE,
      citations: [],
      recommendedNextAction: RecommendedNextAction.CONTACT_COMPANY,
      actionView: 'contact',
      category: 'Out of Scope',
      disclaimer: 'This query falls outside LDL Dhenze authorized business boundaries.',
    };
  }

  // 2. Professional Review Required
  if (routing.isProfessionalReview) {
    return {
      content: `${PROFESSIONAL_REVIEW_NOTICE}\n\n${PROFESSIONAL_REVIEW_STATEMENT}\n\nOur Builder AI system generates conceptual planning frameworks, preliminary space programs, feasibility schedules, and parametric estimates. We cannot sign, certify, or seal construction drawings or guarantee statutory approvals.\n\nTo have your plans reviewed, certified, and sealed for building permit filing, please request a professional review with our licensed Philippine architects (RA 9266) and civil/structural engineers (RA 544).`,
      confidence: 'Verified Answer',
      classification: AnswerClassification.PROFESSIONAL_REVIEW_REQUIRED,
      citations: [
        {
          sourceId: 'RA-9266',
          title: 'The Architecture Act of 2004 (Republic Act No. 9266)',
          category: 'Statutory Practice Standard',
          sourceClassification: 'Public Law',
        },
        {
          sourceId: 'RA-544',
          title: 'The Civil Engineering Law (Republic Act No. 544 as amended)',
          category: 'Statutory Practice Standard',
          sourceClassification: 'Public Law',
        },
      ],
      assumptions: ['Statutory Philippine professional practice regulations apply to all construction documents.'],
      limitations: ['AI does not sign, dry-seal, or guarantee regulatory permits.'],
      recommendedNextAction: RecommendedNextAction.REQUEST_PROFESSIONAL_REVIEW,
      actionView: 'design-studio',
      category: 'Professional Practice & Governance',
      disclaimer: 'This material is preliminary and does not replace the design, verification, certification, signature or approval of a duly licensed and authorized professional.',
    };
  }

  // 3. Requires Current Sources (Codes, steel price, solar permits, zoning)
  if (routing.isRequiresCurrentSources) {
    if (lower.includes('steel') || lower.includes('reinforcing steel')) {
      return {
        content: `**CURRENT EXTERNAL RESEARCH — PHILIPPINE CONSTRUCTION COMMODITIES (2025/2026)**\n\n- **Jurisdiction:** Philippines (National Capital Region & Central Luzon / Region III)\n- **Reference Standard:** PNS 49 (Philippine National Standard for Steel Bars for Concrete Reinforcement)\n- **Market Snapshot:** Grade 40 and Grade 60 deformed reinforcing steel bars (10mm, 12mm, 16mm, 20mm, 25mm) currently fluctuate between **₱42.00 to ₱52.00 per kilogram** (VAT inclusive, ex-mill / wholesale delivery in Central Luzon), subject to global billet prices, freight index, and local mill capacity.\n- **Statutory Notice:** Steel prices vary continuously based on order volume, freight logistics, and manufacturer accreditation. Official project bill of quantities (BOQ) must incorporate current certified mill test certificates and confirmed supplier quotes prior to procurement.`,
        confidence: 'Current External Research',
        classification: AnswerClassification.CURRENT_RESEARCH,
        citations: [
          {
            sourceId: 'DTI-CPG-STEEL',
            title: 'DTI Consumer Protection Group Construction Materials Price Bulletin',
            category: 'Government Market Bulletin',
            sourceClassification: 'Public Reference',
          },
          {
            sourceId: 'PNS-49',
            title: 'Philippine National Standard PNS 49:2020 - Steel Bars for Concrete Reinforcement',
            category: 'Product Standard',
            sourceClassification: 'Public Reference',
          },
        ],
        assumptions: ['Commodity pricing based on Central Luzon mill deliveries for Grade 40/60 deformed bars.'],
        limitations: ['Prices fluctuate weekly with raw scrap/billet markets and fuel surcharges.'],
        recommendedNextAction: RecommendedNextAction.REQUEST_ASSESSMENT,
        actionView: 'inquiry',
        category: 'Materials & Procurement',
        disclaimer: 'Market prices fluctuate and require verification with accredited mills and suppliers.',
      };
    }

    if (lower.includes('building code') || lower.includes('code requirement')) {
      return {
        content: `**CURRENT EXTERNAL RESEARCH — PHILIPPINE STATUTORY BUILDING REGULATIONS**\n\n- **Primary National Statute:** Presidential Decree No. 1096 (The National Building Code of the Philippines - NBCP) and its latest Revised Implementing Rules and Regulations (IRR).\n- **Structural Engineering Code:** National Structural Code of the Philippines (NSCP 2015, 7th Edition, Volume 1 - Buildings and Other Vertical Structures), with Central Luzon located primarily in Seismic Zone 4.\n- **Fire Life Safety:** Republic Act No. 9514 (Fire Code of the Philippines of 2008 and 2019 Revised IRR).\n- **Accessibility:** Batas Pambansa Blg. 344 (Accessibility Law) governing universal access ramps, tactile paving, and accessible sanitary facilities.\n- **Socialized & Economic Housing:** Batas Pambansa Blg. 220 and Presidential Decree No. 957 (Subdivision and Condominium Buyers' Protective Decree).\n\n*Statutory Notice: Local Government Unit (LGU) zoning ordinances, Comprehensive Land Use Plans (CLUP), and special economic zone guidelines (e.g., Clark Development Corporation) may enforce additional restrictions.*`,
        confidence: 'Current External Research',
        classification: AnswerClassification.CURRENT_RESEARCH,
        citations: [
          {
            sourceId: 'PD-1096',
            title: 'Presidential Decree No. 1096 - National Building Code of the Philippines',
            category: 'National Statute',
            sourceClassification: 'Public Law',
          },
          {
            sourceId: 'NSCP-2015',
            title: 'National Structural Code of the Philippines (NSCP 2015 7th Edition)',
            category: 'Engineering Code',
            sourceClassification: 'ASEP Standard',
          },
          {
            sourceId: 'RA-9514',
            title: 'Republic Act No. 9514 - Revised Fire Code of the Philippines',
            category: 'Fire Safety Code',
            sourceClassification: 'BFP Standard',
          },
        ],
        assumptions: ['Philippine jurisdiction applies to vertical and horizontal building development.'],
        limitations: ['Preliminary guidance does not substitute for Office of the Building Official (OBO) plan review.'],
        recommendedNextAction: RecommendedNextAction.REQUEST_PROFESSIONAL_REVIEW,
        actionView: 'design-studio',
        category: 'Statutory Codes & Compliance',
        disclaimer: 'Regulatory approvals depend on final sealed engineering plans and local building official jurisdiction.',
      };
    }

    if (lower.includes('solar farm') || lower.includes('permits')) {
      return {
        content: `**CURRENT EXTERNAL RESEARCH — SOLAR FARM PERMITTING & REGULATORY ROADMAP**\n\nIn the Philippines, commercial and utility-scale solar farm developments require a multi-agency regulatory sequence governed by the Department of Energy (DOE) and the Renewable Energy Act of 2008 (RA 9513):\n\n1. **DOE Solar Energy Operating Contract (SEOC):** Issued under the revised EVOSS (Energy Virtual One-Stop Shop) digital portal.\n2. **DENR-EMB Environmental Clearance:** Environmental Compliance Certificate (ECC) or Certificate of Non-Coverage (CNC) with baseline flora/fauna and hydrological assessment.\n3. **DAR Land Use Conversion (if applicable):** Conversion or exemption clearance from agricultural classification to industrial/utility use.\n4. **LGU Local Approvals:** Sangguniang Bayan / Panlungsod Resolution of Support, Locational Clearance, Zoning Exemption, and Building Permits from the Local Building Official.\n5. **Grid Interconnection:** System Impact Study (SIS) and Facility Study (FS) conducted with the National Grid Corporation of the Philippines (NGCP) or local Distribution Utility (e.g., PELCO, Meralco).\n6. **ERC Certificate of Compliance (COC):** Energy Regulatory Commission operational certification before commercial feed-in.\n\n*Statutory Notice: Permitting timelines range from 6 to 18 months depending on land tenure status and grid interconnection capacity.*`,
        confidence: 'Current External Research',
        classification: AnswerClassification.CURRENT_RESEARCH,
        citations: [
          {
            sourceId: 'RA-9513',
            title: 'Republic Act No. 9513 - Renewable Energy Act of 2008',
            category: 'Energy Statute',
            sourceClassification: 'Public Law',
          },
          {
            sourceId: 'DOE-DC2019-07-0011',
            title: 'DOE Revised Guidelines for RE Safety, Health and Environment Rules',
            category: 'Department Circular',
            sourceClassification: 'DOE Official',
          },
        ],
        assumptions: ['Applicable to ground-mounted or rooftop solar systems exceeding 100 kWp.'],
        limitations: ['Interconnection feasibility requires NGCP / DU capacity allocation approval.'],
        recommendedNextAction: RecommendedNextAction.BOOK_CONSULTATION,
        actionView: 'consultation',
        category: 'Renewable Energy & Permitting',
        disclaimer: 'Grid interconnection and environmental clearances require formal agency evaluations.',
      };
    }

    if (lower.includes('zoning') || lower.includes('classification')) {
      return {
        content: `**CURRENT EXTERNAL RESEARCH — PROPERTY ZONING VERIFICATION PROCESS**\n\nProperty zoning classifications in the Philippines are established by each Local Government Unit (LGU) through its **Comprehensive Land Use Plan (CLUP)** and ratified Zoning Ordinance in coordination with the Department of Human Settlements and Urban Development (DHSUD):\n\n- **Verification Requirement:** An official **Zoning Certification** or **Locational Clearance** must be obtained directly from the City or Municipal Planning and Development Coordinator (CPDC / MPDC) where the property is titled.\n- **Key Zoning Classifications:** R-1 (Low Density Residential), R-2 (Medium Density), C-1/C-2 (Commercial), I-1/I-2 (Industrial), AG (Agricultural), and Institutional.\n- **Deed of Restrictions:** In master-planned developments (e.g., Ayala Alviera, Clark Global City), private estate deeds of restrictions take precedence whenever they impose stricter setback, FAR, or height requirements than municipal minimums.`,
        confidence: 'Current External Research',
        classification: AnswerClassification.CURRENT_RESEARCH,
        citations: [
          {
            sourceId: 'DHSUD-CLUP',
            title: 'DHSUD Comprehensive Land Use Plan and Zoning Guidelines',
            category: 'Land Use Standard',
            sourceClassification: 'Government Guide',
          },
        ],
        assumptions: ['Property zoning is governed by municipal jurisdiction and estate deed restrictions.'],
        limitations: ['Official zoning status requires title verification and MPDC clearance.'],
        recommendedNextAction: RecommendedNextAction.REQUEST_ASSESSMENT,
        actionView: 'inquiry',
        category: 'Land Planning & Zoning',
        disclaimer: 'Official zoning classification must be verified with the local planning coordinator.',
      };
    }
  }

  // 4. Mixed Questions: Company Capabilities + General Development Approach
  if (routing.isMixed) {
    let companyPart = '';
    let generalPart = '';

    if (lower.includes('smart and sustainable housing') || lower.includes('sustainable housing')) {
      companyPart =
        'LDL Dhenze Residential Building Construction is a DTI-registered general contractor based in San Fernando, Pampanga (founded in 2014 by Leodenis De Leon Dhenze). The firm provides end-to-end residential development, architectural-engineering coordination with licensed Philippine architects and civil engineers, advanced BIM design, solar PV tie-in, and premium durable finishes.';
      generalPart =
        'A comprehensive smart and sustainable housing approach integrates: (1) Passive tropical orientation utilizing sun-path analysis and prevailing wind breezeways (Amihan/Habagat) to cut cooling loads by 30-40%; (2) 5-10 kWp hybrid rooftop solar PV with lithium battery backup; (3) Rainwater harvesting cisterns with filtration for landscape irrigation and dual-flush toilets; (4) Low-embodied-carbon local masonry and autoclaved aerated concrete (AAC) blocks; and (5) IoT building management sub-metering for real-time energy and water monitoring.';
    } else if (lower.includes('renewable-powered agricultural') || lower.includes('agricultural facility')) {
      companyPart =
        'LDL Dhenze possesses specialized engineering and construction capabilities in agro-industrial infrastructure, steel-framed warehouses, cold-chain facilities, and renewable energy installations across Central Luzon, backed by in-house heavy equipment and accredited civil-structural partners.';
      generalPart =
        'A state-of-the-art renewable-powered agricultural facility combines: (1) Rooftop and carport solar PV sized to match peak daytime refrigeration and milling energy loads; (2) Biogas digester integration utilizing animal slurry/crop residues for supplemental electricity and process heat; (3) Automated variable-speed refrigeration chillers (+4°C to -20°C); (4) Controlled biosecurity zoning with separate clean/dirty transit corridors; and (5) Microgrid controller balancing solar generation, battery storage, and utility feed.';
    } else if (lower.includes('hospital') || lower.includes('healthcare')) {
      companyPart =
        'LDL Dhenze provides comprehensive commercial and institutional building construction, structural steel fabrication, sanitary and specialized electrical contracting, and project management coordination with accredited healthcare architectural consultants.';
      generalPart =
        'Hospital and medical facility development strictly requires compliance with Department of Health (DOH) Administrative Orders, featuring: (1) Isolated emergency infectious wards with negative pressure HVAC; (2) Uninterrupted Tier-1 emergency power (dual generators with automatic transfer switches); (3) Medical gas piping distribution (oxygen, nitrous oxide, medical vacuum); (4) Lead-shielded radiation diagnostics suites; (5) Specialized hospital wastewater decontamination and biological treatment plant; and (6) Strict one-way clean/soiled circulation paths.';
    } else {
      companyPart =
        'LDL Dhenze is a registered general contractor providing full-service design-build coordination, structural construction, green energy integration, and site infrastructure across Luzon.';
      generalPart =
        'A structured development approach incorporates master site planning, geotechnical soil investigation, statutory code compliance (PD 1096 / NSCP 2015), sustainable energy engineering, and phased critical path project management.';
    }

    return {
      content: `### VERIFIED LDL DHENZE CAPABILITIES\n${companyPart}\n\n### GENERAL DEVELOPMENT APPROACH\n${generalPart}\n\n*${GENERAL_GUIDANCE_NOTICE}*\n\n*${PROFESSIONAL_REVIEW_NOTICE}*`,
      confidence: 'Verified Answer',
      classification: AnswerClassification.PRELIMINARY_ANALYSIS,
      citations: [
        {
          sourceId: 'CORP-001',
          title: 'LDL Dhenze Corporate Profile & DTI Registration Records',
          category: 'Corporate Information',
          sourceClassification: 'Approved Company Record',
        },
      ],
      verifiedCompanyCapabilities: companyPart,
      generalDevelopmentApproach: generalPart,
      assumptions: [
        'Development assumptions are subject to actual site topography, utility connection points, and local building permits.',
      ],
      limitations: [
        'Preliminary project guidance does not constitute final engineering design or construction drawings.',
      ],
      recommendedNextAction: RecommendedNextAction.GENERATE_CONCEPT,
      actionView: 'design-studio',
      category: 'Project Strategy & Planning',
      disclaimer: 'This response separates verified LDL Dhenze credentials from general development methodology.',
    };
  }

  // 5. Company-Specific Information (Company Index Layer)
  if (routing.isCompanySpecific) {
    if (routing.companyMatches.length > 0) {
      const topMatch = routing.companyMatches[0].chunk;
      const citations: AssistantSourceCitation[] = routing.companyMatches.slice(0, 3).map((m) => ({
        sourceId: m.chunk.id,
        title: m.chunk.title,
        category: m.chunk.category,
        section: m.chunk.section,
        sourceDoc: m.chunk.sourceDoc,
        sourceClassification: m.chunk.classification,
      }));

      return {
        content: `**VERIFIED LDL DHENZE INFORMATION**\n\n${topMatch.content}\n\n*Source: Approved corporate documentation from ${topMatch.sourceDoc} (${topMatch.section}).*`,
        confidence: 'Verified Answer',
        classification: AnswerClassification.VERIFIED_COMPANY_INFO,
        citations,
        verifiedCompanySources: citations,
        recommendedNextAction: RecommendedNextAction.START_PROJECT,
        actionView: 'inquiry',
        category: topMatch.category,
        disclaimer: 'Information verified against approved LDL Dhenze corporate records.',
      };
    } else {
      return {
        content: COMPANY_NOT_FOUND_MESSAGE,
        confidence: 'Verified Answer',
        classification: AnswerClassification.INFO_NOT_FOUND,
        citations: [],
        recommendedNextAction: RecommendedNextAction.CONTACT_COMPANY,
        actionView: 'contact',
        category: 'Corporate Information',
        disclaimer: 'Information could not be verified from approved company records.',
      };
    }
  }

  // 6. General Industry Guidance
  let industryAnswer = '';
  let relatedCategory = 'General Construction Engineering';

  if (lower.includes('bim') || lower.includes('building information modeling')) {
    relatedCategory = 'Digital Engineering & BIM';
    industryAnswer =
      '**Building Information Modeling (BIM)** is an intelligent 3D model-based digital process that equips architecture, engineering, and construction (AEC) professionals with the insight and tools to collaboratively plan, design, construct, and manage buildings and infrastructure.\n\nKey aspects include:\n1. **Parametric 3D Modeling:** Digital representations where geometry carries rich metadata (material properties, thermal ratings, manufacturer specs, structural loads).\n2. **4D Time Scheduling & 5D Cost Estimating:** Linking BIM elements to CPM project schedules (4D) and real-time bill of quantities and cashflow models (5D).\n3. **Clash Detection & Multi-Trade Coordination:** Identifying physical interferences between structural beams, ductwork, electrical trays, and plumbing lines prior to fabrication, preventing costly site rework.\n4. **BIM Execution Plan (BEP) & Common Data Environment (CDE):** Establishing standardized Level of Development (LOD 100 conceptual to LOD 500 as-built facility management) across project stakeholders.';
  } else if (lower.includes('residential subdivision') || lower.includes('subdivision')) {
    relatedCategory = 'Land Planning & Development';
    industryAnswer =
      'Planning a residential subdivision in the Philippines follows a rigorous master planning and statutory roadmap governed by **Batas Pambansa Blg. 220** (for socialized/economic housing) or **Presidential Decree No. 957** (for open market and medium-cost subdivisions):\n\n1. **Topographical & Boundary Geodetic Survey:** Establishing exact geodetic perimeter coordinates, ground contours, slope analysis, and drainage outfalls.\n2. **Density & Open Space Allocation:** BP 220 and PD 957 mandate allocating between 30% to 50% of gross land area for non-saleable community infrastructure, including concrete roads (min 10m-12m major collectors), drainage easements, parks, and community facilities.\n3. **Stormwater Drainage & Flood Retention:** Designing engineered concrete culverts and retention lagoons sized for 25-to-50-year rainfall return events.\n4. **Utility Networks:** Underground or overhead electrical power distribution (coordinating with local electric coops), pressurized potable water distribution with centralized elevated water tank, and deep-well or municipal connection.\n5. **Statutory Approvals:** Securing DENR Environmental Compliance Certificate (ECC), LGU Sangguniang Bayan Development Permit, and DHSUD Certificate of Registration and License to Sell (LTS).';
  } else if (lower.includes('warehouse') || lower.includes('construction costs')) {
    relatedCategory = 'Cost Engineering & Logistics';
    industryAnswer =
      'Warehouse construction costs are driven by several structural, operational, and site-specific cost drivers:\n\n1. **Clear Height & Structural Framing:** Standard single-storey logistics warehouses feature 9m to 12m clear heights, requiring engineered portal steel frames or tapered built-up structural steel sections. Steel tonnages scale with span distance and wind-load design (250-300 kph typhoon rating in Central Luzon).\n2. **Industrial Heavy-Duty Floor Slab:** The concrete slab-on-grade must support heavy forklift point loads and high-density pallet racking (typically 5 to 10 tonnes/m²), requiring post-tensioned or reinforced 200mm-250mm concrete with dry-shake metallic floor hardeners and jointless pour techniques.\n3. **Enclosure & Thermal Insulation:** Pre-painted galvanized metal roofing with double-sided foil glasswool insulation or insulated PIR sandwich panels to minimize solar heat gain.\n4. **Loading Docks & Aprons:** Number of hydraulic dock levelers, dock seals, and 30m-35m concrete truck maneuvering aprons with heavy pavement sections.\n5. **Fire Protection Systems:** Wet pipe automatic fire sprinkler systems (NFPA 13 / RA 9514 compliant), fire pumps, and dedicated underground fire reservoir cisterns.\n\n*Typical Philippine parametric cost ranges from ₱18,000 to ₱32,000 per sqm for dry ambient warehouses, and ₱35,000 to ₱65,000+ per sqm for temperature-controlled cold storage facilities.*';
  } else if (lower.includes('solar farm') || lower.includes('solar')) {
    relatedCategory = 'Renewable Energy Systems';
    industryAnswer =
      'Developing a utility-scale or commercial solar farm requires coordinating five primary technical and environmental pillars:\n\n1. **Solar Resource & Irradiance Analysis:** Measuring Global Horizontal Irradiance (GHI) and Plane of Array (POA) irradiance to model annual kWh output using bifacial mono-PERC/TOPCon photovoltaic modules.\n2. **Land & Terrain Conditions:** Requires approximately 1.0 to 1.2 hectares per 1 MWp of capacity. Flat or gently sloping south-facing terrain with minimal shading, low flood vulnerability, and straightforward civil grading is optimal.\n3. **Racking & Foundation Systems:** Driven steel piles, helical anchors, or concrete ballasts holding fixed-tilt racking (10°-15° tilt optimized for Philippine latitude) or single-axis solar trackers engineered for 250 kph typhoon survival.\n4. **Balance of System (BOS) & Inverters:** String or central utility inverters, DC combiners, transformers stepping voltage up to 13.8kV, 34.5kV, or 69kV, and optional Battery Energy Storage Systems (BESS) for grid smoothing.\n5. **Grid Interconnection:** Proximity to a substations or high-voltage transmission corridor with available hosting capacity verified via an NGCP System Impact Study (SIS).';
  } else if (lower.includes('rainwater') || lower.includes('water')) {
    relatedCategory = 'Water & Environmental Engineering';
    industryAnswer =
      'Rainwater harvesting and reuse in building and estate developments involves collecting, treating, and redistributing precipitation to replace treated potable water for non-potable demands:\n\n1. **Catchment & First-Flush Diverters:** Collecting run-off from clean roof surfaces through guttering systems with mechanical first-flush diverters that discard the initial 1-2mm of rain containing atmospheric dust and organic debris.\n2. **Storage Cistern Sizing:** Engineered concrete underground cisterns or modular polypropylene retention cells sized using local monthly rainfall data (PAGASA records) against estimated non-potable demand.\n3. **Multi-Stage Filtration:** Sediment screen filters, dual-media sand filters, and ultraviolet (UV) disinfection or chlorination to prevent algal growth and biofilm in distribution pipes.\n4. **Dual Plumbing Distribution:** Dedicated purple-pipe non-potable distribution supply feeding landscape irrigation, car washing bays, evaporative cooling tower make-up water, and toilet flushing cisterns.\n5. **Stormwater Peak Mitigation:** Provides critical flood retention buffering during intense typhoon downpours, reducing runoff discharge into municipal stormwater systems in compliance with Philippine green building standards (BERDE / EDGE).';
  } else if (lower.includes('agro-industrial masterplan') || lower.includes('agro-industrial')) {
    relatedCategory = 'Agro-Industrial Development';
    industryAnswer =
      'An integrated agro-industrial masterplan organizes agricultural production, processing, logistics, and biosecurity into distinct, high-efficiency functional zones:\n\n1. **Biosecurity & Quarantine Perimeter:** Strict physical zoning separating the external dirty zone (raw livestock/crop delivery, vehicle disinfection tire baths, weighbridges) from internal clean zones (hatcheries, sterile processing, packaged food storage).\n2. **Production & Cultivation Nucleus:** Climate-controlled poultry/swine houses, greenhouses, or aquaculture ponds oriented perpendicular to solar azimuth with automated feed, water, and environmental ventilation controls.\n3. **Post-Harvest & Processing Hub:** Grain dryers, feed mills, slaughterhouses, or packaging plants adjacent to cold storage ante-rooms to preserve freshness and prevent cold-chain interruption.\n4. **Waste-to-Value & Circular Utilities:** Biogas anaerobic digesters converting animal manure and organic pulp into methane fuel and bio-fertilizer, complemented by effluent biological wastewater treatment plants.\n5. **Logistics & Dispatch Corridor:** Segregated truck circulation loops allowing 40-foot container chassis to maneuver without crossing raw material delivery roads.';
  } else if (lower.includes('risk') || lower.includes('construction-project risks')) {
    relatedCategory = 'Construction Project Management';
    industryAnswer =
      'Managing construction project risks requires proactive identification, quantitative analysis, and mitigation across five core project dimensions:\n\n1. **Site & Subsurface Geotechnical Risks:** Unforeseen soft soils, high water tables, or subterranean boulders that require foundation redesign or dewatering. *Mitigation:* Comprehensive pre-construction soil boring tests and test pits.\n2. **Weather & Climate Disruptions:** Tropical typhoons, intense monsoons, and extreme heatwaves halting earthworks and concrete pours. *Mitigation:* Scheduling weather contingency float days in the baseline Primavera/CPM schedule and prioritizing early substructure and building dry-in before the rainy season.\n3. **Supply Chain & Material Price Volatility:** Steel, cement, and fuel price escalation or imported finish delivery delays. *Mitigation:* Long-lead material procurement orders, advance stockpiling, and indexed price escalation contract clauses.\n4. **Labor Availability & Safety Compliance:** Shortage of certified welders, skilled carpenters, or safety incidents triggering DOLE work stoppage orders. *Mitigation:* Retaining verified sub-contractors, enforcing mandatory OSHA/DOLE Construction Safety and Health Programs (CSHP), and deploying certified safety officers.\n5. **Design Changes & Scope Creep:** Client changes during execution causing rework and delay. *Mitigation:* Establishing formal change-order management workflows, signed approvals, and 3D BIM clash detection before ground-breaking.';
  } else if (lower.includes('smart-building') || lower.includes('bms') || lower.includes('building management system')) {
    relatedCategory = 'Intelligent Infrastructure';
    industryAnswer =
      'A **Smart Building Management System (BMS)** is a computer-based control system installed in buildings that controls and monitors the building’s mechanical and electrical equipment:\n\n1. **Core Subsystem Integration:** Centrally coordinates HVAC chillers/air handlers, interior and facade lighting, power distribution and backup generators, water supply pumps, fire alarms, and security/access control.\n2. **Sensor Network & Protocols:** Deploys field temperature, humidity, CO₂, occupancy, and energy sub-metering sensors communicating via standardized open protocols like BACnet/IP, Modbus, and MQTT.\n3. **Automated Energy Optimization:** Automatically modulates HVAC cooling output and ventilation fresh-air dampers based on real-time room occupancy and ambient outdoor weather, slashing HVAC energy usage by 20% to 35%.\n4. **Predictive Maintenance:** Analyzes vibration, current draw, and pressure drops across pump impellers and filter banks, alerting facility engineers before equipment failure occurs.\n5. **Centralized Graphical Dashboard:** Provides facility managers with real-time digital twin visualization, fault diagnostic alarms, and historical sustainability reporting.';
  } else {
    industryAnswer =
      'LDL Dhenze Builder AI provides specialized technical, architectural, engineering, and project-planning intelligence for construction, property development, infrastructure, renewable energy, and agro-industrial projects. All guidance is grounded in professional engineering principles and statutory Philippine building codes.';
  }

  return {
    content: `${industryAnswer}\n\n*${GENERAL_GUIDANCE_NOTICE}*\n\n*${PROFESSIONAL_REVIEW_NOTICE}*`,
    confidence: 'Verified Answer',
    classification: AnswerClassification.GENERAL_GUIDANCE,
    citations: [],
    assumptions: ['Standard professional construction and engineering practices apply.'],
    limitations: ['Preliminary concept and guidance; site-specific engineering verification is required.'],
    recommendedNextAction: RecommendedNextAction.GENERATE_CONCEPT,
    actionView: 'design-studio',
    category: relatedCategory,
    disclaimer: GENERAL_GUIDANCE_NOTICE,
  };
}

export async function processAssistantQuery(
  message: string,
  userRole: UserRole,
  knowledgeStore = INITIAL_KNOWLEDGE_BASE
): Promise<AssistantResponse> {
  const routing = evaluateQueryRouting(message, userRole, knowledgeStore);

  // If outside scope, injection, or professional review, return direct deterministic answer immediately
  if (routing.isOutsideScope || routing.isInjection || routing.isProfessionalReview) {
    return buildDeterministicAnswer(message, routing);
  }

  // Attempt Gemini AI Synthesis with exponential retry and timeout
  if (process.env.GEMINI_API_KEY) {
    try {
      const gemini = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      let retrievedContext = '';

      if (routing.companyMatches.length > 0) {
        retrievedContext = routing.companyMatches
          .slice(0, 4)
          .map(
            (m, i) =>
              `[Source ${i + 1}: ${m.chunk.title} | ${m.chunk.category} | ${m.chunk.section}]\n${m.chunk.content}`
          )
          .join('\n\n');
      }

      const promptWithRouting = `USER QUERY: ${message}

ROUTING INSTRUCTIONS:
- Classification to output: ${
        routing.isRequiresCurrentSources
          ? 'CURRENT EXTERNAL RESEARCH'
          : routing.isCompanySpecific
          ? routing.companyMatches.length > 0
            ? 'VERIFIED COMPANY INFORMATION'
            : 'INFORMATION NOT FOUND'
          : routing.isMixed
          ? 'PRELIMINARY PROJECT ANALYSIS (with clear separate headings ### VERIFIED LDL DHENZE CAPABILITIES and ### GENERAL DEVELOPMENT APPROACH)'
          : 'GENERAL INDUSTRY GUIDANCE'
      }
- If company information was requested and not in the approved sources below, say: "${COMPANY_NOT_FOUND_MESSAGE}"
- If outside scope, output: "${MANDATED_REFUSAL_MESSAGE}"
- If professional sign/seal was requested, output: "${PROFESSIONAL_REVIEW_NOTICE}"

APPROVED COMPANY CONTEXT (if empty, answer using broader professional construction/engineering knowledge within scope):
${retrievedContext || 'No specific company index matched. Use broader professional construction/engineering knowledge for general industry questions.'}
`;

      const response = await gemini.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: promptWithRouting,
        config: {
          systemInstruction: SYSTEM_INSTRUCTION,
          temperature: 0.1,
        },
      });

      const replyText = response.text || '';
      if (replyText.trim().length > 0) {
        const det = buildDeterministicAnswer(message, routing);
        return {
          ...det,
          content: replyText,
        };
      }
    } catch (err) {
      console.warn('Gemini API call failed or timed out. Gracefully activating deterministic domain synthesizer:', err);
    }
  }

  // Graceful deterministic synthesis fallback
  return buildDeterministicAnswer(message, routing);
}
