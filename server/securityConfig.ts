import crypto from 'crypto';
import fs from 'fs';
import path from 'path';

export interface SecurityAuditEvent {
  id: string;
  tenantId: string;
  organizationId?: string;
  projectId?: string;
  actor: {
    uid: string;
    email: string;
    role?: string;
    ip?: string;
  };
  target: string;
  action: string;
  outcome: 'SUCCESS' | 'DENIED' | 'FLAGGED' | 'REVOKED' | 'LOCKED';
  timestamp: string;
  sourceContext: string;
  reason?: string;
  correlationId: string;
  metadata?: Record<string, unknown>;
}

export type PortalType = 'client' | 'supplier' | 'partner' | 'operations' | 'admin';

export type PortalRole =
  | 'Prospective Client'
  | 'Active Client'
  | 'Supplier'
  | 'Partner'
  | 'Project Manager'
  | 'Compliance Reviewer'
  | 'System Administrator'
  | 'Executive Approver'
  | 'Auditor';

export interface UserAccount {
  uid: string;
  email: string;
  fullName: string;
  organizationId: string;
  organizationName: string;
  portalType: PortalType;
  role: PortalRole;
  assignedProjects: string[];
  assignedWorkPackages: string[];
  accountStatus: 'ACTIVE' | 'SUSPENDED' | 'LOCKED' | 'PENDING_FIRST_LOGIN';
  mfaEnrolled: boolean;
  mfaRequired: boolean;
  isEmailVerified: boolean;
  failedLoginAttempts: number;
  lockedUntil?: string;
  passwordHash: string;
  passwordSalt: string;
  mustChangePassword: boolean;
  sessionsRevokedAt?: string;
  createdAt: string;
  lastLoginAt?: string;
  accessExpiresAt?: string;
}

export interface PortalInvitation {
  id: string;
  tokenHash: string;
  email: string;
  fullName: string;
  organizationId: string;
  organizationName: string;
  portalType: PortalType;
  initialRole: PortalRole;
  assignedProjects: string[];
  assignedWorkPackages: string[];
  invitingAdmin: string;
  approvingAdmin: string;
  secondaryApprover?: string;
  createdAt: string;
  expiresAt: string;
  status: 'PENDING' | 'ACCEPTED' | 'REVOKED' | 'EXPIRED';
  mfaRequired: boolean;
  usedAt?: string;
  revokedAt?: string;
  revokedBy?: string;
  reason: string;
  auditReference: string;
}

// ----------------------------------------------------
// SERVER-CONTROLLED CONFIGURATION
// ----------------------------------------------------
// Section 1: Server-controlled feature flag. Defaults to false.
export const PORTALS_ENABLED: boolean = process.env.PORTALS_ENABLED === 'true';

// Section 1: Allowlisted emergency administrators who can access when PORTALS_ENABLED is false
const rawEmergencyAdmins = process.env.EMERGENCY_ADMIN_EMAILS || 'dhenzebuilders@gmail.com,security@ldldhenze.com,executive@ldldhenze.ph';
export const EMERGENCY_ADMIN_ALLOWLIST: string[] = rawEmergencyAdmins
  .split(',')
  .map((e) => e.trim().toLowerCase())
  .filter(Boolean);

// ----------------------------------------------------
// IMMUTABLE AUDIT LOGS STORE (Section 18)
// ----------------------------------------------------
const auditLogsStore: SecurityAuditEvent[] = [];

const DATA_DIR = path.join(process.cwd(), 'data');
const ACCOUNTS_FILE = path.join(DATA_DIR, 'auth_accounts.json');
const INVITATIONS_FILE = path.join(DATA_DIR, 'auth_invitations.json');
const AUDIT_LOGS_FILE = path.join(DATA_DIR, 'security_audit_logs.json');

function ensureDataDir(): void {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
}

export function persistAuditLogs(): void {
  try {
    ensureDataDir();
    fs.writeFileSync(AUDIT_LOGS_FILE, JSON.stringify(auditLogsStore.slice(0, 500), null, 2), 'utf-8');
  } catch (err) {
    console.error('[AUTH DB] Failed to persist audit logs:', err);
  }
}

export function loadAuditLogs(): void {
  try {
    ensureDataDir();
    if (fs.existsSync(AUDIT_LOGS_FILE)) {
      const raw = fs.readFileSync(AUDIT_LOGS_FILE, 'utf-8');
      const data = JSON.parse(raw);
      if (Array.isArray(data)) {
        auditLogsStore.length = 0;
        auditLogsStore.push(...data);
      }
    }
  } catch (err) {
    console.error('[AUTH DB] Failed to load audit logs from storage:', err);
  }
}

export function recordSecurityAudit(event: Omit<SecurityAuditEvent, 'id' | 'timestamp'>): SecurityAuditEvent {
  const fullEvent: SecurityAuditEvent = {
    ...event,
    id: `SEC-${Date.now()}-${crypto.randomBytes(4).toString('hex')}`,
    timestamp: new Date().toISOString(),
  };

  auditLogsStore.unshift(fullEvent);
  if (auditLogsStore.length > 1000) {
    auditLogsStore.pop();
  }

  // Persist to disk
  persistAuditLogs();

  // Safe structured output without secrets
  console.log(`[SECURITY AUDIT] ${fullEvent.action} by ${fullEvent.actor.email} [${fullEvent.outcome}] Target: ${fullEvent.target}`);
  return fullEvent;
}

export function getSecurityAuditLogs(limit = 100): SecurityAuditEvent[] {
  return auditLogsStore.slice(0, limit);
}

// ----------------------------------------------------
// INVITATION STORE (Section 4 & 5)
// ----------------------------------------------------
const invitationsStore = new Map<string, PortalInvitation>();

export function persistInvitations(): void {
  try {
    ensureDataDir();
    const invObj: Record<string, PortalInvitation> = {};
    for (const [key, val] of invitationsStore.entries()) {
      invObj[key] = val;
    }
    fs.writeFileSync(INVITATIONS_FILE, JSON.stringify(invObj, null, 2), 'utf-8');
  } catch (err) {
    console.error('[AUTH DB] Failed to persist invitations:', err);
  }
}

export function loadInvitations(): void {
  try {
    ensureDataDir();
    if (fs.existsSync(INVITATIONS_FILE)) {
      const raw = fs.readFileSync(INVITATIONS_FILE, 'utf-8');
      const data = JSON.parse(raw);
      invitationsStore.clear();
      for (const [key, val] of Object.entries(data)) {
        invitationsStore.set(key, val as PortalInvitation);
      }
    }
  } catch (err) {
    console.error('[AUTH DB] Failed to load invitations from storage:', err);
  }
}

export function hashSecret(secret: string): string {
  return crypto.createHash('sha256').update(secret).digest('hex');
}

export function createInvitation(params: {
  email: string;
  fullName: string;
  organizationId: string;
  organizationName: string;
  portalType: PortalType;
  initialRole: PortalRole;
  assignedProjects: string[];
  assignedWorkPackages: string[];
  invitingAdmin: string;
  approvingAdmin: string;
  secondaryApprover?: string;
  expirationHours?: number;
  mfaRequired?: boolean;
  reason: string;
}): { invitation: PortalInvitation; rawToken: string } {
  // Cryptographically secure token (64 hex characters)
  const rawToken = crypto.randomBytes(32).toString('hex');
  const tokenHash = hashSecret(rawToken);
  const id = `INV-${Date.now()}-${crypto.randomBytes(3).toString('hex')}`;
  const now = new Date();
  const expiresAt = new Date(now.getTime() + (params.expirationHours || 24) * 60 * 60 * 1000).toISOString();

  const invitation: PortalInvitation = {
    id,
    tokenHash,
    email: params.email.toLowerCase().trim(),
    fullName: params.fullName.trim(),
    organizationId: params.organizationId,
    organizationName: params.organizationName,
    portalType: params.portalType,
    initialRole: params.initialRole,
    assignedProjects: params.assignedProjects || [],
    assignedWorkPackages: params.assignedWorkPackages || [],
    invitingAdmin: params.invitingAdmin,
    approvingAdmin: params.approvingAdmin,
    secondaryApprover: params.secondaryApprover,
    createdAt: now.toISOString(),
    expiresAt,
    status: 'PENDING',
    mfaRequired: params.mfaRequired ?? true,
    reason: params.reason,
    auditReference: `AUD-INV-${Date.now()}`,
  };

  invitationsStore.set(id, invitation);

  recordSecurityAudit({
    tenantId: 'ldl-dhenze-ph',
    organizationId: params.organizationId,
    actor: { uid: params.invitingAdmin, email: params.invitingAdmin, role: 'System Administrator' },
    target: `Invitation:${id}:${params.email}`,
    action: 'CREATE_INVITATION',
    outcome: 'SUCCESS',
    sourceContext: 'AdminPortalAccessForm',
    reason: params.reason,
    correlationId: invitation.auditReference,
    metadata: {
      portalType: params.portalType,
      initialRole: params.initialRole,
      assignedProjects: params.assignedProjects,
    },
  });

  return { invitation, rawToken };
}

export function verifyInvitationToken(token: string): { valid: boolean; invitation?: PortalInvitation; error?: string } {
  const hash = hashSecret(token);
  for (const inv of invitationsStore.values()) {
    if (inv.tokenHash === hash) {
      if (inv.status === 'REVOKED') {
        return { valid: false, error: 'This invitation has been revoked by an Administrator.' };
      }
      if (inv.status === 'ACCEPTED') {
        return { valid: false, error: 'This invitation has already been used.' };
      }
      if (new Date(inv.expiresAt) < new Date()) {
        inv.status = 'EXPIRED';
        return { valid: false, error: 'This invitation link has expired. Request a new invitation from your Administrator.' };
      }
      return { valid: true, invitation: inv };
    }
  }
  return { valid: false, error: 'Invalid or unknown invitation token.' };
}

export function revokeInvitation(invitationId: string, revokedBy: string, reason: string): boolean {
  const inv = invitationsStore.get(invitationId);
  if (!inv) return false;
  inv.status = 'REVOKED';
  inv.revokedAt = new Date().toISOString();
  inv.revokedBy = revokedBy;

  recordSecurityAudit({
    tenantId: 'ldl-dhenze-ph',
    organizationId: inv.organizationId,
    actor: { uid: revokedBy, email: revokedBy, role: 'System Administrator' },
    target: `Invitation:${inv.id}:${inv.email}`,
    action: 'REVOKE_INVITATION',
    outcome: 'REVOKED',
    sourceContext: 'AdminInvitationConsole',
    reason,
    correlationId: `AUD-REV-${Date.now()}`,
  });

  return true;
}

export function listInvitations(): PortalInvitation[] {
  // Do not expose tokenHash in listings
  return Array.from(invitationsStore.values()).map(({ tokenHash, ...rest }) => ({
    ...rest,
    tokenHash: '[REDACTED_SECURE_HASH]',
  }));
}

// ----------------------------------------------------
// SECURE TEMPORARY PASSWORD GENERATOR (Section 5)
// ----------------------------------------------------
export function generateCryptographicTemporaryPassword(): string {
  // Minimum 16 chars with uppercase, lowercase, number, and symbol
  const uppers = 'ABCDEFGHJKLMNPQRSTUVWXYZ';
  const lowers = 'abcdefghijkmnopqrstuvwxyz';
  const numbers = '23456789';
  const symbols = '!@#$%^&*()-_=+[]{}';

  let password = '';
  password += uppers[crypto.randomInt(0, uppers.length)];
  password += lowers[crypto.randomInt(0, lowers.length)];
  password += numbers[crypto.randomInt(0, numbers.length)];
  password += symbols[crypto.randomInt(0, symbols.length)];

  const allChars = uppers + lowers + numbers + symbols;
  for (let i = password.length; i < 18; i++) {
    password += allChars[crypto.randomInt(0, allChars.length)];
  }

  // Shuffle securely
  const arr = password.split('');
  for (let i = arr.length - 1; i > 0; i--) {
    const j = crypto.randomInt(0, i + 1);
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr.join('');
}

// ----------------------------------------------------
// USER ACCOUNTS & SESSION CONTROL (Section 7, 8, 17)
// ----------------------------------------------------
export const userAccountsStore = new Map<string, UserAccount>();

export function persistUserAccounts(): void {
  try {
    ensureDataDir();
    const accountsObj: Record<string, UserAccount> = {};
    for (const [key, val] of userAccountsStore.entries()) {
      accountsObj[key] = val;
    }
    fs.writeFileSync(ACCOUNTS_FILE, JSON.stringify(accountsObj, null, 2), 'utf-8');
  } catch (err) {
    console.error('[AUTH DB] Failed to persist user accounts:', err);
  }
}

// Seed default accounts for authorized test/operational domains with hardened initial states
export function seedEmergencyAccounts(): void {
  const salt = crypto.randomBytes(16).toString('hex');
  const defaultHash = crypto.pbkdf2Sync('LdlDhenze#2026SecureAdmin!', salt, 100000, 64, 'sha512').toString('hex');

  const emergencyAdmin: UserAccount = {
    uid: 'usr-admin-dhenze-01',
    email: 'dhenzebuilders@gmail.com',
    fullName: 'Leodenis “Dhenze” Languisan',
    organizationId: 'org-dhenze-internal',
    organizationName: 'LDL Dhenze Residential Building Construction',
    portalType: 'admin',
    role: 'System Administrator',
    assignedProjects: ['all'],
    assignedWorkPackages: ['all'],
    accountStatus: 'PENDING_FIRST_LOGIN',
    mfaEnrolled: true,
    mfaRequired: true,
    isEmailVerified: true,
    failedLoginAttempts: 0,
    passwordHash: defaultHash,
    passwordSalt: salt,
    mustChangePassword: true,
    createdAt: '2026-09-01T00:00:00Z',
  };

  userAccountsStore.set(emergencyAdmin.email, emergencyAdmin);
}

export function loadUserAccounts(): void {
  try {
    ensureDataDir();
    if (fs.existsSync(ACCOUNTS_FILE)) {
      const raw = fs.readFileSync(ACCOUNTS_FILE, 'utf-8');
      const data = JSON.parse(raw);
      userAccountsStore.clear();
      for (const [key, val] of Object.entries(data)) {
        userAccountsStore.set(key, val as UserAccount);
      }
      return;
    }
  } catch (err) {
    console.error('[AUTH DB] Failed to load user accounts from storage:', err);
  }
  seedEmergencyAccounts();
  persistUserAccounts();
}

// Initialize and hydrate persistent disk stores
loadAuditLogs();
loadInvitations();
loadUserAccounts();

// Session revocation helper
export function revokeUserSessions(email: string, actor: string): boolean {
  const user = userAccountsStore.get(email.toLowerCase());
  if (!user) return false;
  user.sessionsRevokedAt = new Date().toISOString();
  persistUserAccounts();

  recordSecurityAudit({
    tenantId: 'ldl-dhenze-ph',
    organizationId: user.organizationId,
    actor: { uid: actor, email: actor, role: 'System Administrator' },
    target: `User:${user.uid}:${user.email}`,
    action: 'REVOKE_SESSIONS',
    outcome: 'SUCCESS',
    sourceContext: 'AdminConsole',
    reason: 'Administrative manual session revocation',
    correlationId: `AUD-SESS-REV-${Date.now()}`,
  });
  return true;
}

// Lock / Unlock account
export function setUserLockState(email: string, locked: boolean, actor: string, reason: string): boolean {
  const user = userAccountsStore.get(email.toLowerCase());
  if (!user) return false;
  user.accountStatus = locked ? 'LOCKED' : 'ACTIVE';
  if (!locked) {
    user.failedLoginAttempts = 0;
  }
  persistUserAccounts();

  recordSecurityAudit({
    tenantId: 'ldl-dhenze-ph',
    organizationId: user.organizationId,
    actor: { uid: actor, email: actor, role: 'System Administrator' },
    target: `User:${user.uid}:${user.email}`,
    action: locked ? 'LOCK_ACCOUNT' : 'UNLOCK_ACCOUNT',
    outcome: locked ? 'LOCKED' : 'SUCCESS',
    sourceContext: 'AdminConsole',
    reason,
    correlationId: `AUD-LOCK-${Date.now()}`,
  });
  return true;
}

// Suspend / Reactivate account
export function setUserSuspensionState(email: string, suspended: boolean, actor: string, reason: string): boolean {
  const user = userAccountsStore.get(email.toLowerCase());
  if (!user) return false;
  user.accountStatus = suspended ? 'SUSPENDED' : 'ACTIVE';
  persistUserAccounts();

  recordSecurityAudit({
    tenantId: 'ldl-dhenze-ph',
    organizationId: user.organizationId,
    actor: { uid: actor, email: actor, role: 'System Administrator' },
    target: `User:${user.uid}:${user.email}`,
    action: suspended ? 'SUSPEND_ACCOUNT' : 'REACTIVATE_ACCOUNT',
    outcome: suspended ? 'LOCKED' : 'SUCCESS',
    sourceContext: 'AdminConsole',
    reason,
    correlationId: `AUD-SUSP-${Date.now()}`,
  });
  return true;
}

// ----------------------------------------------------
// RBAC & ABAC EVALUATION (Section 7, 9, 10, 11, 12)
// ----------------------------------------------------
export function evaluateAccessDecision(
  user: UserAccount,
  requestedPortal: PortalType,
  targetOrganizationId?: string,
  targetProjectId?: string,
  resourceClassification?: string
): { allowed: boolean; reason: string } {
  // 1. Account status checks
  if (user.accountStatus === 'SUSPENDED') {
    return { allowed: false, reason: 'Account is currently suspended. Please contact LDL Dhenze Compliance.' };
  }
  if (user.accountStatus === 'LOCKED') {
    return { allowed: false, reason: 'Account is locked due to security policy. Please contact an Administrator.' };
  }
  if (user.accessExpiresAt && new Date(user.accessExpiresAt) < new Date()) {
    return { allowed: false, reason: 'Temporary access credentials have expired.' };
  }

  // 2. Portal boundary isolation
  if (requestedPortal === 'admin' && user.role !== 'System Administrator') {
    return { allowed: false, reason: 'Administrative operations restricted strictly to System Administrators.' };
  }

  if (requestedPortal === 'operations') {
    const operationsRoles: PortalRole[] = [
      'Project Manager',
      'Compliance Reviewer',
      'System Administrator',
      'Executive Approver',
      'Auditor',
    ];
    if (!operationsRoles.includes(user.role)) {
      return { allowed: false, reason: 'Internal operations dashboard restricted to authorized personnel.' };
    }
  }

  if (requestedPortal === 'client') {
    if (user.portalType !== 'client' && user.role !== 'System Administrator' && user.role !== 'Executive Approver') {
      return { allowed: false, reason: 'Client portal restricted to verified client accounts.' };
    }
    // Prospective Client boundary: cannot access active execution projects
    if (user.role === 'Prospective Client' && targetProjectId) {
      return {
        allowed: false,
        reason: 'Prospective Clients cannot view active commercial projects until onboarding and KYC approval are complete.',
      };
    }
  }

  if (requestedPortal === 'supplier') {
    if (user.portalType !== 'supplier' && user.role !== 'System Administrator') {
      return { allowed: false, reason: 'Supplier portal restricted to accredited material suppliers.' };
    }
  }

  if (requestedPortal === 'partner') {
    if (user.portalType !== 'partner' && user.role !== 'System Administrator') {
      return { allowed: false, reason: 'Partner portal restricted to accredited engineering partners and contractors.' };
    }
  }

  // 3. ABAC: Tenant/Organization isolation (Client A never sees Client B)
  if (targetOrganizationId && user.role !== 'System Administrator' && user.role !== 'Auditor') {
    if (user.organizationId !== targetOrganizationId) {
      return { allowed: false, reason: 'Cross-organization data access strictly prohibited under multi-tenant isolation policy.' };
    }
  }

  // 4. ABAC: Project assignment isolation
  if (targetProjectId && user.role !== 'System Administrator' && user.role !== 'Auditor' && user.role !== 'Executive Approver') {
    if (!user.assignedProjects.includes('all') && !user.assignedProjects.includes(targetProjectId)) {
      return { allowed: false, reason: 'Access denied: User is not assigned to this specific project.' };
    }
  }

  // 5. ABAC: Data Classification, Legal Holds & Separation of Duties (Section 13 & 14)
  if (
    resourceClassification === 'Restricted-Financial' ||
    resourceClassification === 'Sealed-Bids' ||
    resourceClassification === 'Executive-Payment-Approval' ||
    resourceClassification === 'Legal-Hold-Confidential'
  ) {
    if (user.role === 'System Administrator') {
      return {
        allowed: false,
        reason: 'Separation of Duties Policy: System Administrators manage IAM/infrastructure and are strictly excluded from sealed bids, executive payment releases, and confidential commercial transactions.',
      };
    }
  }

  if (resourceClassification === 'Restricted-Financial') {
    if (user.role !== 'Executive Approver' && user.role !== 'Active Client') {
      return {
        allowed: false,
        reason: 'Restricted-Financial documents are restricted to Executive Approvers and authorized Client principals (Separation of Duties).',
      };
    }
  }

  return { allowed: true, reason: 'Authorized' };
}
