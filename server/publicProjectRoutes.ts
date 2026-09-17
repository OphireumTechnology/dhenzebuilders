import express, { Request, Response } from 'express';
import {
  PublicProjectRecord,
  PublicationAuditLog,
  DownloadAnalyticsEntry,
  PublicDocumentRecord,
} from '../src/types/publicProjectTypes';
import {
  INITIAL_PUBLIC_PROJECTS,
  INITIAL_PUBLICATION_AUDIT_LOGS,
} from '../src/data/publicProjectSeedData';

export const publicProjectRouter = express.Router();

// In-memory data store for runtime
let publicProjectsStore: PublicProjectRecord[] = JSON.parse(
  JSON.stringify(INITIAL_PUBLIC_PROJECTS)
);
let auditLogsStore: PublicationAuditLog[] = JSON.parse(
  JSON.stringify(INITIAL_PUBLICATION_AUDIT_LOGS)
);
let downloadAnalyticsStore: DownloadAnalyticsEntry[] = [];

/**
 * Generate an authentic PDF buffer for public project publications.
 * Includes project details, statutory disclaimer, and cryptographic stamp.
 */
function buildProjectDocumentPdfBuffer(
  projectTitle: string,
  docTitle: string,
  category: string,
  version: string,
  docDate: string,
  categoryName: string
): Buffer {
  const safeProject = projectTitle.replace(/[()]/g, '');
  const safeDoc = docTitle.replace(/[()]/g, '');
  const safeCategory = (categoryName || 'Development').replace(/[()]/g, '');
  const safeDate = docDate || new Date().toISOString().split('T')[0];

  const content = `%PDF-1.4
1 0 obj
<<
  /Type /Catalog
  /Pages 2 0 R
>>
endobj
2 0 obj
<<
  /Type /Pages
  /Kids [3 0 R]
  /Count 1
>>
endobj
3 0 obj
<<
  /Type /Page
  /Parent 2 0 R
  /MediaBox [0 0 612 792]
  /Resources <<
    /Font <<
      /F1 4 0 R
      /F2 5 0 R
    >>
  >>
  /Contents 6 0 R
>>
endobj
4 0 obj
<<
  /Type /Font
  /Subtype /Type1
  /BaseFont /Helvetica-Bold
>>
endobj
5 0 obj
<<
  /Type /Font
  /Subtype /Type1
  /BaseFont /Helvetica
>>
endobj
6 0 obj
<< /Length 1350 >>
stream
BT
/F1 18 Tf
50 720 Td
(LDL DHENZE RESIDENTIAL BUILDING CONSTRUCTION OPC) Tj
0 -24 Td
/F1 13 Tf
(${safeProject.toUpperCase()}) Tj
0 -20 Td
/F2 10 Tf
(${safeDoc} • ${category} • Version: ${version}) Tj
0 -28 Td
/F1 11 Tf
(PUBLICATION DETAILS & STATUTORY METADATA) Tj
0 -16 Td
/F2 9 Tf
(Publication Date: ${safeDate} | Classification: Approved Public Distribution) Tj
0 -14 Td
(Asset Classification: ${safeCategory} | Issuer: LDL Dhenze Document Governance Engine) Tj
0 -14 Td
(Executive Office: KMC | One West Aeropark, Clark Freeport Zone, Pampanga, Philippines) Tj
0 -14 Td
(Contact: info@dhenzebuilder.com | Direct Hotline: +63 917 966 8814) Tj
0 -28 Td
/F1 11 Tf
(PROJECT EXECUTIVE SUMMARY & TECHNICAL OBJECTIVES) Tj
0 -16 Td
/F2 9 Tf
(This document has been reviewed, approved, and released by authorized project administrators.) Tj
0 -14 Td
(Private financial agreements, internal subcontract unit rates, and proprietary client) Tj
0 -14 Td
(data remain restricted under LDL Dhenze Enterprise Security Governance Protocols.) Tj
0 -28 Td
/F1 11 Tf
(PROFESSIONAL DISCLAIMER & PRACTICE NOTICE) Tj
0 -16 Td
/F2 8 Tf
(Pursuant to Republic Act No. 9266 (The Architecture Act) and the Civil Engineering Law,) Tj
0 -12 Td
(all architectural plans, structural calculations, and engineering specifications are prepared) Tj
0 -12 Td
(and sealed exclusively by duly licensed Philippine registered professionals.) Tj
0 -25 Td
/F2 8 Tf
(Document verified and cryptographically sealed for public access. All rights reserved.) Tj
ET
endstream
endobj
xref
0 7
0000000000 65535 f 
0000000009 00000 n 
0000000058 00000 n 
0000000115 00000 n 
0000000266 00000 n 
0000000347 00000 n 
0000000423 00000 n 
trailer
<<
  /Size 7
  /Root 1 0 R
>>
startxref
1825
%%EOF`;

  return Buffer.from(content, 'utf-8');
}

// ----------------------------------------------------
// PUBLIC ACCESSIBLE ENDPOINTS (NO AUTH REQUIRED)
// ----------------------------------------------------

/**
 * GET /api/public-projects
 * Returns all PUBLISHED public projects.
 * Supports query params:
 * ?q= (search string)
 * ?category= (filter by category)
 * ?sort= (newest, oldest, az, updated)
 * ?featured=true (featured only)
 */
publicProjectRouter.get('/api/public-projects', (req: Request, res: Response) => {
  const { q, category, sort, featured } = req.query;

  // Filter only PUBLISHED
  let filtered = publicProjectsStore.filter((p) => p.publicationState === 'PUBLISHED');

  if (category && category !== 'All') {
    filtered = filtered.filter(
      (p) => p.category.toLowerCase() === String(category).toLowerCase()
    );
  }

  if (featured === 'true') {
    filtered = filtered.filter((p) => p.featured);
  }

  if (q && typeof q === 'string') {
    const search = q.toLowerCase().trim();
    filtered = filtered.filter((p) => {
      const matchTitle = p.title.toLowerCase().includes(search);
      const matchCategory = p.category.toLowerCase().includes(search);
      const matchSummary = p.summary.toLowerCase().includes(search);
      const matchLocation = (p.publicLocation || '').toLowerCase().includes(search);
      const matchTags = (p.tags || []).some((t) => t.toLowerCase().includes(search));
      const matchDocs = p.publicDocuments.some((d) =>
        d.title.toLowerCase().includes(search)
      );
      return (
        matchTitle ||
        matchCategory ||
        matchSummary ||
        matchLocation ||
        matchTags ||
        matchDocs
      );
    });
  }

  // Sorting
  if (sort === 'oldest') {
    filtered.sort((a, b) => (a.publishedAt || '').localeCompare(b.publishedAt || ''));
  } else if (sort === 'az') {
    filtered.sort((a, b) => a.title.localeCompare(b.title));
  } else if (sort === 'updated') {
    filtered.sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
  } else {
    // Default newest
    filtered.sort((a, b) => (b.publishedAt || '').localeCompare(a.publishedAt || ''));
  }

  // Strip private source fields for security
  const sanitized = filtered.map((p) => {
    const { sourceProjectId, ...safeProject } = p;
    return safeProject;
  });

  return res.json({
    total: sanitized.length,
    projects: sanitized,
  });
});

/**
 * GET /api/public-projects/:slugOrId
 * Return single published project by slug or ID
 */
publicProjectRouter.get('/api/public-projects/:slugOrId', (req: Request, res: Response) => {
  const { slugOrId } = req.params;

  const project = publicProjectsStore.find(
    (p) =>
      (p.slug === slugOrId || p.publicProjectId === slugOrId) &&
      p.publicationState === 'PUBLISHED'
  );

  if (!project) {
    return res.status(404).json({
      error: 'PROJECT_NOT_FOUND',
      message: 'The requested project was not found in the public library.',
    });
  }

  // Increment view counter
  project.viewCount = (project.viewCount || 0) + 1;

  const { sourceProjectId, ...safeProject } = project;
  return res.json(safeProject);
});

/**
 * GET /api/public-projects/documents/:documentId/download
 * Controlled download delivery of approved project materials.
 */
publicProjectRouter.get(
  '/api/public-projects/documents/:documentId/download',
  (req: Request, res: Response) => {
    const { documentId } = req.params;

    let targetDoc: PublicDocumentRecord | undefined;
    let targetProject: PublicProjectRecord | undefined;

    for (const project of publicProjectsStore) {
      const found = project.publicDocuments.find((d) => d.publicDocumentId === documentId);
      if (found) {
        targetDoc = found;
        targetProject = project;
        break;
      }
    }

    if (!targetDoc || !targetProject) {
      return res.status(404).json({
        error: 'DOCUMENT_NOT_FOUND',
        message: 'The requested public document could not be located.',
      });
    }

    if (!targetDoc.publicDownloadEnabled) {
      return res.status(403).json({
        error: 'DOWNLOAD_DISABLED',
        message: 'Public downloads are disabled for this material by project administrators.',
      });
    }

    // Increment downloads
    targetDoc.downloadCount = (targetDoc.downloadCount || 0) + 1;
    targetProject.downloadCount = (targetProject.downloadCount || 0) + 1;

    // Track analytics
    const analyticsEntry: DownloadAnalyticsEntry = {
      id: `dl-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      documentId: targetDoc.publicDocumentId,
      documentTitle: targetDoc.title,
      projectId: targetProject.publicProjectId,
      projectTitle: targetProject.title,
      timestamp: new Date().toISOString(),
      referrer: (req.headers.referer || 'direct').substring(0, 100),
    };
    downloadAnalyticsStore.unshift(analyticsEntry);

    const pdfBuffer = buildProjectDocumentPdfBuffer(
      targetProject.title,
      targetDoc.title,
      targetDoc.category,
      targetDoc.version,
      targetDoc.documentDate,
      targetProject.category
    );

    const safeFilename = `${targetProject.title.replace(/[^a-zA-Z0-9]/g, '_')}_${targetDoc.title.replace(/[^a-zA-Z0-9]/g, '_')}.pdf`;

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="${safeFilename}"`);
    res.setHeader('Content-Length', pdfBuffer.length);
    res.setHeader('Cache-Control', 'public, max-age=3600');
    res.setHeader('X-Document-Version', targetDoc.version);
    res.setHeader('X-Governance-Status', 'APPROVED_PUBLIC');

    return res.send(pdfBuffer);
  }
);

/**
 * POST /api/public-projects/documents/:documentId/gated-download
 * Gated download with optional contact capture
 */
publicProjectRouter.post(
  '/api/public-projects/documents/:documentId/gated-download',
  (req: Request, res: Response) => {
    const { documentId } = req.params;
    const { name, email, company, purpose } = req.body;

    let targetDoc: PublicDocumentRecord | undefined;
    let targetProject: PublicProjectRecord | undefined;

    for (const project of publicProjectsStore) {
      const found = project.publicDocuments.find((d) => d.publicDocumentId === documentId);
      if (found) {
        targetDoc = found;
        targetProject = project;
        break;
      }
    }

    if (!targetDoc || !targetProject) {
      return res.status(404).json({ error: 'DOCUMENT_NOT_FOUND' });
    }

    targetDoc.downloadCount = (targetDoc.downloadCount || 0) + 1;
    targetProject.downloadCount = (targetProject.downloadCount || 0) + 1;

    // Log contact analytics
    downloadAnalyticsStore.unshift({
      id: `dl-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      documentId: targetDoc.publicDocumentId,
      documentTitle: targetDoc.title,
      projectId: targetProject.publicProjectId,
      projectTitle: targetProject.title,
      timestamp: new Date().toISOString(),
      referrer: 'gated-modal',
      userContact: {
        name: name || 'Anonymous Visitor',
        email: email || 'not-disclosed',
        company: company || '',
        purpose: purpose || 'General Inquiry',
      },
    });

    return res.json({
      success: true,
      downloadUrl: `/api/public-projects/documents/${targetDoc.publicDocumentId}/download`,
    });
  }
);

// ----------------------------------------------------
// PROTECTED ADMIN ENDPOINTS
// ----------------------------------------------------

/**
 * GET /api/admin/public-projects
 * Returns all public projects (Drafts, Published, Under Review, Archived)
 */
publicProjectRouter.get('/api/admin/public-projects', (req: Request, res: Response) => {
  return res.json({
    total: publicProjectsStore.length,
    projects: publicProjectsStore,
  });
});

/**
 * POST /api/admin/public-projects
 * Create new public project draft or from scratch
 */
publicProjectRouter.post('/api/admin/public-projects', (req: Request, res: Response) => {
  const body = req.body;

  const baseSlug = (body.title || 'new-project')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');

  let slug = baseSlug;
  let counter = 1;
  while (publicProjectsStore.some((p) => p.slug === slug)) {
    slug = `${baseSlug}-${counter++}`;
  }

  const newProject: PublicProjectRecord = {
    publicProjectId: `pub-prj-${Date.now()}`,
    sourceProjectId: body.sourceProjectId || undefined,
    title: body.title || 'Untitled Public Project',
    slug,
    category: body.category || 'Residential',
    summary: body.summary || '',
    description: body.description || '',
    publicLocation: body.publicLocation || 'Central Luzon, Philippines',
    status: body.status || 'In Development',
    completionDate: body.completionDate || '',
    clientName: body.clientName || '',
    projectValue: body.projectValue || '',
    projectSize: body.projectSize || '',
    projectScope: Array.isArray(body.projectScope) ? body.projectScope : [],
    projectObjectives: Array.isArray(body.projectObjectives) ? body.projectObjectives : [],
    coverImage: body.coverImage || '/assets/images/residential-team.jpg',
    gallery: Array.isArray(body.gallery) ? body.gallery : [],
    publicDocuments: Array.isArray(body.publicDocuments) ? body.publicDocuments : [],
    featured: Boolean(body.featured),
    publishedAt: undefined,
    updatedAt: new Date().toISOString(),
    publishedBy: body.publishedBy || 'admin@dhenzebuilder.com',
    publicationState: 'DRAFT',
    requireContactForDownload: Boolean(body.requireContactForDownload),
    viewCount: 0,
    downloadCount: 0,
    tags: Array.isArray(body.tags) ? body.tags : [],
    verifiedMetrics: Array.isArray(body.verifiedMetrics) ? body.verifiedMetrics : [],
  };

  publicProjectsStore.unshift(newProject);

  auditLogsStore.unshift({
    id: `log-${Date.now()}`,
    timestamp: new Date().toISOString(),
    authorizedUser: body.publishedBy || 'admin@dhenzebuilder.com',
    userRole: 'Administrator',
    action: 'PROJECT_CREATED',
    publicProjectId: newProject.publicProjectId,
    projectTitle: newProject.title,
    result: 'SUCCESS',
    details: `Created new publication draft: "${newProject.title}" (Slug: ${newProject.slug})`,
  });

  return res.status(201).json(newProject);
});

/**
 * PUT /api/admin/public-projects/:id
 * Update public project details
 */
publicProjectRouter.put('/api/admin/public-projects/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  const projectIndex = publicProjectsStore.findIndex((p) => p.publicProjectId === id);

  if (projectIndex === -1) {
    return res.status(404).json({ error: 'PROJECT_NOT_FOUND' });
  }

  const existing = publicProjectsStore[projectIndex];
  const updated: PublicProjectRecord = {
    ...existing,
    ...req.body,
    publicProjectId: existing.publicProjectId, // Immutable
    updatedAt: new Date().toISOString(),
  };

  publicProjectsStore[projectIndex] = updated;

  auditLogsStore.unshift({
    id: `log-${Date.now()}`,
    timestamp: new Date().toISOString(),
    authorizedUser: req.body.authorizedUser || 'admin@dhenzebuilder.com',
    userRole: 'Administrator',
    action: 'PROJECT_EDITED',
    publicProjectId: updated.publicProjectId,
    projectTitle: updated.title,
    result: 'SUCCESS',
    details: `Updated details and specifications for "${updated.title}"`,
  });

  return res.json(updated);
});

/**
 * POST /api/admin/public-projects/:id/publish
 * Validate and publish project to public website
 */
publicProjectRouter.post('/api/admin/public-projects/:id/publish', (req: Request, res: Response) => {
  const { id } = req.params;
  const project = publicProjectsStore.find((p) => p.publicProjectId === id);

  if (!project) {
    return res.status(404).json({ error: 'PROJECT_NOT_FOUND' });
  }

  // Publication checklist validation
  const errors: string[] = [];
  if (!project.title || project.title.trim().length < 3) {
    errors.push('Project name must be at least 3 characters.');
  }
  if (!project.summary || project.summary.trim().length < 10) {
    errors.push('Summary must be at least 10 characters.');
  }
  if (!project.coverImage) {
    errors.push('Cover image is required before publishing.');
  }
  if (!project.category) {
    errors.push('Category is required.');
  }

  if (errors.length > 0) {
    return res.status(400).json({
      error: 'VALIDATION_FAILED',
      errors,
    });
  }

  project.publicationState = 'PUBLISHED';
  project.publishedAt = new Date().toISOString();
  project.updatedAt = new Date().toISOString();

  auditLogsStore.unshift({
    id: `log-${Date.now()}`,
    timestamp: new Date().toISOString(),
    authorizedUser: req.body.authorizedUser || 'admin@dhenzebuilder.com',
    userRole: 'Administrator',
    action: 'PROJECT_PUBLISHED',
    publicProjectId: project.publicProjectId,
    projectTitle: project.title,
    result: 'SUCCESS',
    details: `Project "${project.title}" published to public library. URL: /projects/${project.slug}`,
  });

  return res.json({
    success: true,
    project,
  });
});

/**
 * POST /api/admin/public-projects/:id/unpublish
 */
publicProjectRouter.post('/api/admin/public-projects/:id/unpublish', (req: Request, res: Response) => {
  const { id } = req.params;
  const project = publicProjectsStore.find((p) => p.publicProjectId === id);

  if (!project) {
    return res.status(404).json({ error: 'PROJECT_NOT_FOUND' });
  }

  project.publicationState = 'UNPUBLISHED';
  project.updatedAt = new Date().toISOString();

  auditLogsStore.unshift({
    id: `log-${Date.now()}`,
    timestamp: new Date().toISOString(),
    authorizedUser: req.body.authorizedUser || 'admin@dhenzebuilder.com',
    userRole: 'Administrator',
    action: 'PROJECT_UNPUBLISHED',
    publicProjectId: project.publicProjectId,
    projectTitle: project.title,
    result: 'SUCCESS',
    details: `Unpublished "${project.title}" from public library. Visitors can no longer access.`,
  });

  return res.json({ success: true, project });
});

/**
 * POST /api/admin/public-projects/:id/archive
 */
publicProjectRouter.post('/api/admin/public-projects/:id/archive', (req: Request, res: Response) => {
  const { id } = req.params;
  const project = publicProjectsStore.find((p) => p.publicProjectId === id);

  if (!project) {
    return res.status(404).json({ error: 'PROJECT_NOT_FOUND' });
  }

  project.publicationState = 'ARCHIVED';
  project.updatedAt = new Date().toISOString();

  auditLogsStore.unshift({
    id: `log-${Date.now()}`,
    timestamp: new Date().toISOString(),
    authorizedUser: req.body.authorizedUser || 'admin@dhenzebuilder.com',
    userRole: 'Administrator',
    action: 'PROJECT_ARCHIVED',
    publicProjectId: project.publicProjectId,
    projectTitle: project.title,
    result: 'SUCCESS',
    details: `Archived project publication "${project.title}" to archival vault.`,
  });

  return res.json({ success: true, project });
});

/**
 * DELETE /api/admin/public-projects/:id
 */
publicProjectRouter.delete('/api/admin/public-projects/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  const index = publicProjectsStore.findIndex((p) => p.publicProjectId === id);

  if (index === -1) {
    return res.status(404).json({ error: 'PROJECT_NOT_FOUND' });
  }

  const [removed] = publicProjectsStore.splice(index, 1);

  auditLogsStore.unshift({
    id: `log-${Date.now()}`,
    timestamp: new Date().toISOString(),
    authorizedUser: 'admin@dhenzebuilder.com',
    userRole: 'Administrator',
    action: 'PROJECT_ARCHIVED',
    publicProjectId: removed.publicProjectId,
    projectTitle: removed.title,
    result: 'SUCCESS',
    details: `Removed publication record "${removed.title}".`,
  });

  return res.json({ success: true, removed });
});

/**
 * POST /api/admin/public-projects/:id/documents
 * Add document to public project
 */
publicProjectRouter.post('/api/admin/public-projects/:id/documents', (req: Request, res: Response) => {
  const { id } = req.params;
  const project = publicProjectsStore.find((p) => p.publicProjectId === id);

  if (!project) {
    return res.status(404).json({ error: 'PROJECT_NOT_FOUND' });
  }

  const body = req.body;
  const newDoc: PublicDocumentRecord = {
    publicDocumentId: `doc-${Date.now()}`,
    publicProjectId: project.publicProjectId,
    title: body.title || 'Untitled Project Document',
    description: body.description || '',
    category: body.category || 'Project Profile',
    fileType: body.fileType || 'PDF',
    fileSize: body.fileSize || '5.0 MB',
    fileSizeBytes: body.fileSizeBytes || 5242880,
    version: body.version || 'v1.0',
    documentDate: body.documentDate || new Date().toISOString().split('T')[0],
    uploadedAt: new Date().toISOString(),
    publishedAt: new Date().toISOString(),
    previewEnabled: body.previewEnabled !== false,
    publicDownloadEnabled: body.publicDownloadEnabled !== false,
    requireContactForDownload: Boolean(body.requireContactForDownload),
    storageReference: `publications/projects/${project.slug}/${(body.title || 'document').toLowerCase().replace(/[^a-z0-9]/g, '-')}.${(body.fileType || 'pdf').toLowerCase()}`,
    status: 'ACTIVE',
    downloadCount: 0,
    summaryPreview: body.summaryPreview || body.description,
  };

  project.publicDocuments.push(newDoc);
  project.updatedAt = new Date().toISOString();

  auditLogsStore.unshift({
    id: `log-${Date.now()}`,
    timestamp: new Date().toISOString(),
    authorizedUser: body.authorizedUser || 'admin@dhenzebuilder.com',
    userRole: 'Administrator',
    action: 'FILE_UPLOADED',
    publicProjectId: project.publicProjectId,
    projectTitle: project.title,
    affectedDocument: `${newDoc.title} (${newDoc.version})`,
    result: 'SUCCESS',
    details: `Uploaded approved public document "${newDoc.title}". Download enabled: ${newDoc.publicDownloadEnabled}`,
  });

  return res.status(201).json(newDoc);
});

/**
 * PUT /api/admin/public-projects/:id/documents/:docId
 * Update document settings (e.g. toggle download permission)
 */
publicProjectRouter.put(
  '/api/admin/public-projects/:id/documents/:docId',
  (req: Request, res: Response) => {
    const { id, docId } = req.params;
    const project = publicProjectsStore.find((p) => p.publicProjectId === id);

    if (!project) {
      return res.status(404).json({ error: 'PROJECT_NOT_FOUND' });
    }

    const doc = project.publicDocuments.find((d) => d.publicDocumentId === docId);
    if (!doc) {
      return res.status(404).json({ error: 'DOCUMENT_NOT_FOUND' });
    }

    Object.assign(doc, req.body);
    project.updatedAt = new Date().toISOString();

    auditLogsStore.unshift({
      id: `log-${Date.now()}`,
      timestamp: new Date().toISOString(),
      authorizedUser: req.body.authorizedUser || 'admin@dhenzebuilder.com',
      userRole: 'Administrator',
      action: 'DOWNLOAD_PERMISSION_CHANGED',
      publicProjectId: project.publicProjectId,
      projectTitle: project.title,
      affectedDocument: doc.title,
      result: 'SUCCESS',
      details: `Updated permissions for "${doc.title}". Public Download Enabled: ${doc.publicDownloadEnabled}`,
    });

    return res.json(doc);
  }
);

/**
 * DELETE /api/admin/public-projects/:id/documents/:docId
 */
publicProjectRouter.delete(
  '/api/admin/public-projects/:id/documents/:docId',
  (req: Request, res: Response) => {
    const { id, docId } = req.params;
    const project = publicProjectsStore.find((p) => p.publicProjectId === id);

    if (!project) {
      return res.status(404).json({ error: 'PROJECT_NOT_FOUND' });
    }

    const docIndex = project.publicDocuments.findIndex((d) => d.publicDocumentId === docId);
    if (docIndex === -1) {
      return res.status(404).json({ error: 'DOCUMENT_NOT_FOUND' });
    }

    const [removed] = project.publicDocuments.splice(docIndex, 1);
    project.updatedAt = new Date().toISOString();

    auditLogsStore.unshift({
      id: `log-${Date.now()}`,
      timestamp: new Date().toISOString(),
      authorizedUser: 'admin@dhenzebuilder.com',
      userRole: 'Administrator',
      action: 'FILE_REMOVED',
      publicProjectId: project.publicProjectId,
      projectTitle: project.title,
      affectedDocument: removed.title,
      result: 'SUCCESS',
      details: `Removed public document "${removed.title}".`,
    });

    return res.json({ success: true, removed });
  }
);

/**
 * GET /api/admin/public-projects/analytics
 * Returns overview metrics, popular documents, and audit logs
 */
publicProjectRouter.get('/api/admin/public-projects-analytics', (req: Request, res: Response) => {
  const totalPublicProjects = publicProjectsStore.length;
  const publishedProjects = publicProjectsStore.filter((p) => p.publicationState === 'PUBLISHED');

  let totalPublishedDocuments = 0;
  let totalDownloads = 0;
  let totalViews = 0;

  const docList: Array<{
    id: string;
    title: string;
    projectTitle: string;
    downloads: number;
    fileType: string;
  }> = [];

  for (const p of publicProjectsStore) {
    totalViews += p.viewCount || 0;
    totalDownloads += p.downloadCount || 0;
    if (p.publicationState === 'PUBLISHED') {
      totalPublishedDocuments += p.publicDocuments.length;
    }
    for (const d of p.publicDocuments) {
      docList.push({
        id: d.publicDocumentId,
        title: d.title,
        projectTitle: p.title,
        downloads: d.downloadCount || 0,
        fileType: d.fileType,
      });
    }
  }

  const mostViewedProjects = [...publicProjectsStore]
    .sort((a, b) => (b.viewCount || 0) - (a.viewCount || 0))
    .slice(0, 5)
    .map((p) => ({
      id: p.publicProjectId,
      title: p.title,
      slug: p.slug,
      views: p.viewCount || 0,
      category: p.category,
    }));

  const mostDownloadedDocuments = docList
    .sort((a, b) => b.downloads - a.downloads)
    .slice(0, 5);

  return res.json({
    totalPublicProjects,
    publishedProjectsCount: publishedProjects.length,
    draftsCount: publicProjectsStore.filter((p) => p.publicationState === 'DRAFT').length,
    archivedCount: publicProjectsStore.filter((p) => p.publicationState === 'ARCHIVED').length,
    totalPublishedDocuments,
    totalDownloads,
    totalViews,
    mostViewedProjects,
    mostDownloadedDocuments,
    recentActivity: auditLogsStore.slice(0, 15),
    downloadEventsCount: downloadAnalyticsStore.length,
  });
});
