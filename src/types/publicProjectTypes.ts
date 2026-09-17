export type PublicProjectCategory =
  | 'All'
  | 'Residential'
  | 'Commercial'
  | 'Mixed-Use'
  | 'Land Development'
  | 'Infrastructure'
  | 'Agriculture'
  | 'Industrial'
  | 'Healthcare'
  | 'Education'
  | 'Hospitality'
  | 'Renewable Energy'
  | 'Concept Development';

export type PublicProjectStage =
  | 'Completed'
  | 'Under Construction'
  | 'In Development'
  | 'Proposed'
  | 'Conceptual Study';

export type PublicationStatus =
  | 'DRAFT'
  | 'UNDER_REVIEW'
  | 'SCHEDULED'
  | 'PUBLISHED'
  | 'UNPUBLISHED'
  | 'ARCHIVED';

export type GalleryCategory =
  | 'All'
  | 'Concept'
  | 'Planning'
  | 'Site'
  | 'Pre-Construction'
  | 'Construction'
  | 'Development Progress'
  | 'Completed'
  | 'Architecture'
  | 'Interior'
  | 'Exterior'
  | 'Other';

export interface PublicGalleryItem {
  id: string;
  url: string;
  caption: string;
  category: GalleryCategory;
  isFeatured?: boolean;
  mediaType: 'image' | 'video';
  altText?: string;
  displayOrder?: number;
}

export type PublicDocumentCategory =
  | 'Project Profile'
  | 'Company Presentation'
  | 'Project Presentation'
  | 'Brochure'
  | 'Development Plan'
  | 'Executive Summary'
  | 'Feasibility Summary'
  | 'Public Drawings'
  | 'Public Plans'
  | 'Public Reports'
  | 'Public Specifications'
  | 'Other approved material';

export type PublicFileType =
  | 'PDF'
  | 'DOCX'
  | 'XLSX'
  | 'PPTX'
  | 'JPG'
  | 'PNG'
  | 'ZIP';

export interface PublicDocumentRecord {
  publicDocumentId: string;
  publicProjectId: string;
  title: string;
  description: string;
  category: PublicDocumentCategory;
  fileType: PublicFileType;
  fileSize: string;
  fileSizeBytes: number;
  version: string;
  documentDate: string;
  uploadedAt: string;
  publishedAt?: string;
  previewEnabled: boolean;
  publicDownloadEnabled: boolean;
  requireContactForDownload?: boolean;
  storageReference: string;
  status: 'ACTIVE' | 'SUPERSEDED' | 'ARCHIVED';
  downloadCount: number;
  summaryPreview?: string;
}

export interface PublicProjectRecord {
  publicProjectId: string;
  sourceProjectId?: string; // Internal reference only, stripped for anonymous/public visitors
  title: string;
  slug: string;
  category: Exclude<PublicProjectCategory, 'All'>;
  summary: string;
  description: string;
  publicLocation: string; // Only approved location disclosure
  status: PublicProjectStage;
  completionDate?: string;
  clientName?: string; // Optional, only if approved
  projectValue?: string; // Optional, only if approved
  projectSize?: string; // Optional (e.g. "750 sq.m gross floor area")
  projectScope: string[];
  projectObjectives: string[];
  coverImage: string;
  gallery: PublicGalleryItem[];
  publicDocuments: PublicDocumentRecord[];
  featured: boolean;
  publishedAt?: string;
  updatedAt: string;
  publishedBy: string;
  publicationState: PublicationStatus;
  requireContactForDownload: boolean;
  viewCount: number;
  downloadCount: number;
  tags?: string[];
  statutoryDisclaimer?: string;
  verifiedMetrics?: Array<{
    label: string;
    value: string;
  }>;
}

export interface PublicationAuditLog {
  id: string;
  timestamp: string;
  authorizedUser: string;
  userRole: string;
  action:
    | 'PROJECT_CREATED'
    | 'PROJECT_EDITED'
    | 'FILE_UPLOADED'
    | 'FILE_REMOVED'
    | 'FILE_REPLACED'
    | 'PROJECT_PUBLISHED'
    | 'PROJECT_UNPUBLISHED'
    | 'PROJECT_ARCHIVED'
    | 'DOWNLOAD_PERMISSION_CHANGED'
    | 'FEATURED_STATUS_CHANGED';
  publicProjectId: string;
  projectTitle?: string;
  affectedDocument?: string;
  result: 'SUCCESS' | 'FAILURE' | 'WARNING';
  details: string;
}

export interface DownloadAnalyticsEntry {
  id: string;
  documentId: string;
  documentTitle: string;
  projectId: string;
  projectTitle: string;
  timestamp: string;
  referrer: string;
  userContact?: {
    name: string;
    email: string;
    company?: string;
    purpose?: string;
  };
}

export interface PublishingAnalyticsSummary {
  totalPublicProjects: number;
  totalPublishedDocuments: number;
  totalDownloads: number;
  totalViews: number;
  mostViewedProjects: Array<{
    id: string;
    title: string;
    slug: string;
    views: number;
    category: string;
  }>;
  mostDownloadedDocuments: Array<{
    id: string;
    title: string;
    projectTitle: string;
    downloads: number;
    fileType: string;
  }>;
  recentActivity: PublicationAuditLog[];
}
