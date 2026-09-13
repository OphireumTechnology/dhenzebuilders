/**
 * LDL DHENZE RESIDENTIAL BUILDING CONSTRUCTION
 * Official Company Profile Data & Section Content
 * Faithfully mirrors the official 27-page Corporate Profile document.
 */

import { CORPORATE_INFO } from './corporateInfo';

export type ProfilePublicationStatus =
  | 'DRAFT'
  | 'UPLOADED'
  | 'PROCESSING'
  | 'PENDING_REVIEW'
  | 'APPROVED_FOR_PUBLICATION'
  | 'PUBLISHED'
  | 'ARCHIVED';

export interface ProfileValidationItem {
  id: string;
  name: string;
  description: string;
  passed: boolean;
  notes: string;
}

export interface ProfileVersionRecord {
  version: string;
  edition: string;
  status: ProfilePublicationStatus;
  uploadedAt: string;
  uploadedBy: string;
  complianceReviewedAt?: string;
  complianceReviewer?: string;
  executiveApprovedAt?: string;
  executiveApprover?: string;
  publishedAt?: string;
  sha256Checksum: string;
  fileSizeBytes: number;
  pageCount: number;
  changeLog: string;
}

export interface ProfileSection {
  pageRange: string;
  sectionNumber: string;
  title: string;
  summary: string;
  highlights: string[];
  statutoryNotes?: string;
}

export const OFFICIAL_PROFILE_METADATA = {
  documentTitle: 'Corporate Profile & Statutory Registrations',
  edition: '2025–2026 Executive Reference Edition',
  organization: CORPORATE_INFO.companyName,
  proprietor: CORPORATE_INFO.registrations.proprietor,
  executiveDisplayName: CORPORATE_INFO.executive.publicDisplayName,
  dtiNumber: CORPORATE_INFO.registrations.dtiNumber,
  birTin: CORPORATE_INFO.registrations.tin,
  birOcn: CORPORATE_INFO.registrations.birForm2303Ocn,
  psicCode: CORPORATE_INFO.registrations.psicCode,
  fileSizeFormatted: '18.4 MB',
  fileSizeBytes: 19293798,
  pageCount: 27,
  sha256Checksum: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
  securityClassification: 'Controlled Public Delivery',
  distributionPolicy:
    'Free public access for qualified clients, prospective partners, and regulatory bodies. Unaltered distribution permitted with copyright intact.',
};

export const PROFILE_SECTIONS: ProfileSection[] = [
  {
    pageRange: 'Pages 1–3',
    sectionNumber: '01',
    title: 'Executive Overview, Mission & Founder’s Message',
    summary:
      'Official corporate introduction, business philosophy, and the verbatim Founder’s Message by Leodenis Deveza Languisan. Outlines the overarching commitment to disciplined execution, public trust, and legal compliance.',
    highlights: [
      'Official corporate name: LDL Dhenze Residential Building Construction',
      'Proprietor & CEO: Leodenis “Dhenze” Languisan',
      'Verbatim leadership message emphasizing integrity, quality, and innovation',
      'Positioning statement: "Building Today. Engineering Tomorrow. Powering the Future."',
    ],
  },
  {
    pageRange: 'Pages 4–8',
    sectionNumber: '02',
    title: 'Statutory Business Registrations & Tax Clearance',
    summary:
      'Verifiable Philippine government registrations establishing corporate existence, tax compliance, and line of business under national laws.',
    highlights: [
      'DTI Business Name Registration No. 4812272 (valid March 22, 2023 to March 22, 2028)',
      'BIR Form 2303 Certificate of Registration (TIN: 306-113-062-00000, OCN: 21ARC2025000002189)',
      'PSIC 42900: Construction of Other Civil Engineering Projects',
      'BIR Revenue District Office No. 214A North Pampanga',
      'BIR Authority to Print (ATP) & Notice of Issue of Official Receipts',
    ],
    statutoryNotes:
      'The DTI Certificate is a registration of business name and is not a license to practice a regulated profession. All regulated architectural and engineering services are executed strictly through PRC-licensed professionals.',
  },
  {
    pageRange: 'Pages 9–18',
    sectionNumber: '03',
    title: 'Nine Fields of Registered Business Operations',
    summary:
      'Detailed capability statements for all nine operational lines spanning civil construction, heavy equipment, design coordination, clean energy, and intelligent systems.',
    highlights: [
      'Field 01: Construction & Civil Engineering (Residential, Commercial, Industrial, Civil Infrastructure)',
      'Field 02: Construction Materials & Supply (Reinforcing steel, ready-mix concrete, aggregates)',
      'Field 03: Heavy Equipment & Machinery (Excavation, compaction, lifting, and transport fleets)',
      'Field 04: Architectural Plans, Engineering & Design (Under RA 9266 & Civil Engineering Law)',
      'Field 05: Green & Renewable Energy (Solar PV, BESS storage, resilient microgrids under RA 9513)',
      'Field 06: Technological Solutions (BMS, IoT telemetry, telecommunications, access control)',
      'Field 07: Smart City Solutions (Urban grid coordination, intelligent mobility, utility sensors)',
      'Field 08: Artificial Intelligence Technology (Schedule optimization, predictive site analytics)',
      'Field 09: Integrated Project Delivery (IPD unified delivery and lifecycle commissioning)',
    ],
  },
  {
    pageRange: 'Pages 19–22',
    sectionNumber: '04',
    title: 'Integrated Project Delivery (IPD) & Technical Controls',
    summary:
      'The operational methodology uniting design, procurement, structural engineering, and construction phases under transparent milestone governance and digital reporting.',
    highlights: [
      'Single-point project governance with transparent milestone accountability',
      'Building Information Modeling (BIM) coordination and clash detection',
      'Target-value engineering ensuring cost predictability and material quality',
      'Quality management checkpoints adhering to National Building Code (PD 1096)',
    ],
  },
  {
    pageRange: 'Pages 23–24',
    sectionNumber: '05',
    title: 'Regulatory Compliance & Statutory Practice Disclaimers',
    summary:
      'Mandatory legal disclosures governing professional licensure boundaries, contractor accreditation, and environmental permitting in the Republic of the Philippines.',
    highlights: [
      'Republic Act 9266 (The Architecture Act of the Philippines) compliance disclosures',
      'Philippine Civil Engineering Law and PRC regulation adherence',
      'PCAB (Philippine Contractors Accreditation Board) collaborative partnership model',
      'Renewable Energy Act of 2008 (RA 9513), DOE guidelines, and ERC permitting',
      'Philippine Data Privacy Act of 2012 (RA 10173) privacy protocols',
    ],
    statutoryNotes:
      'Explicit disclosure that professional engineering and architectural outputs are signed and sealed exclusively by qualified PRC-licensed professionals.',
  },
  {
    pageRange: 'Pages 25–27',
    sectionNumber: '06',
    title: 'Corporate Governance, Banking Discipline & Core Values',
    summary:
      'Institutional oversight principles, banking risk controls derived from JPMorgan Chase operational experience, and the seven core corporate values.',
    highlights: [
      'Seven Core Values: Integrity, Quality, Innovation, Safety, Sustainability, Accountability, Partnership',
      'The Four Pledge Pillars: Compliant by Law, Ethical by Choice, Stronger Together, Building the Nation',
      'Financial risk controls, dual-authorization payment integrity, and document audit trails',
      'Official executive office contact information and corporate credentials',
    ],
  },
];
