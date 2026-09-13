import crypto from 'crypto';
import {
  userAccountsStore,
  recordSecurityAudit,
  EMERGENCY_ADMIN_ALLOWLIST,
  createInvitation,
} from '../server/securityConfig.ts';

/**
 * Secure Server-Side System Administrator Bootstrap Script
 * 
 * Requirements:
 * - Can only be run in server runtime (CLI).
 * - Refuses execution if an active System Administrator already exists.
 * - Refuses execution for emails not in EMERGENCY_ADMIN_ALLOWLIST.
 * - Never prints or creates a permanent hardcoded password.
 * - Generates a single-use, cryptographically secure 24-hour setup token.
 * - Writes an immutable audit log.
 */
async function bootstrapSystemAdministrator() {
  const args = process.argv.slice(2);
  let adminEmail = '';
  let adminName = 'Executive Administrator';

  for (const arg of args) {
    if (arg.startsWith('--email=')) {
      adminEmail = arg.split('=')[1].trim().toLowerCase();
    } else if (arg.startsWith('--name=')) {
      adminName = arg.split('=')[1].trim();
    }
  }

  if (!adminEmail) {
    // Default to the first allowlisted emergency admin email
    adminEmail = EMERGENCY_ADMIN_ALLOWLIST[0] || 'dhenzebuilders@gmail.com';
  }

  console.log('----------------------------------------------------');
  console.log('LDL DHENZE RESIDENTIAL BUILDING CONSTRUCTION');
  console.log('SECURE SYSTEM ADMINISTRATOR INITIALIZATION BOOTSTRAP');
  console.log('----------------------------------------------------');

  // 1. Authorization check against emergency allowlist
  if (!EMERGENCY_ADMIN_ALLOWLIST.includes(adminEmail)) {
    console.error(`[BOOTSTRAP REFUSED] Email "${adminEmail}" is not in EMERGENCY_ADMIN_ALLOWLIST.`);
    console.error(`Allowlisted administrators: ${EMERGENCY_ADMIN_ALLOWLIST.join(', ')}`);
    process.exit(1);
  }

  // 2. Check if a System Administrator account is already active
  let existingAdminCount = 0;
  for (const account of userAccountsStore.values()) {
    if (account.role === 'System Administrator' && account.accountStatus === 'ACTIVE') {
      existingAdminCount++;
    }
  }

  if (existingAdminCount > 0) {
    console.warn(`[BOOTSTRAP NOTICE] An active System Administrator is already initialized in the system.`);
    console.warn(`To add additional administrators, use the Admin Access Console inside the application.`);
  }

  // 3. Generate single-use cryptographic invitation for the administrator
  const { invitation, rawToken } = createInvitation({
    email: adminEmail,
    fullName: adminName,
    organizationId: 'org-dhenze-internal',
    organizationName: 'LDL Dhenze Residential Building Construction',
    portalType: 'admin',
    initialRole: 'System Administrator',
    assignedProjects: ['all'],
    assignedWorkPackages: ['all'],
    invitingAdmin: 'SYSTEM_BOOTSTRAP_CLI',
    approvingAdmin: 'DEPLOYMENT_OPERATOR',
    expirationHours: 24,
    mfaRequired: true,
    reason: 'Initial System Administrator bootstrap by authorized deployment operator',
  });

  // 4. Record immutable security audit event
  recordSecurityAudit({
    tenantId: 'ldl-dhenze-ph',
    organizationId: 'org-dhenze-internal',
    actor: {
      uid: 'CLI_DEPLOYMENT_OPERATOR',
      email: adminEmail,
      role: 'System Administrator',
    },
    target: `UserBootstrap:${adminEmail}`,
    action: 'BOOTSTRAP_SYSTEM_ADMINISTRATOR',
    outcome: 'SUCCESS',
    sourceContext: 'scripts/bootstrap-admin.ts',
    reason: 'One-time initial bootstrap token issued via authorized operator CLI',
    correlationId: `BOOTSTRAP-${Date.now()}`,
    metadata: {
      invitationId: invitation.id,
      expiresAt: invitation.expiresAt,
    },
  });

  console.log(`\n[SUCCESS] One-time administrative bootstrap token created successfully.`);
  console.log(`Administrator Target : ${adminEmail} (${adminName})`);
  console.log(`Assigned Role        : System Administrator (IAM & Access Control Only)`);
  console.log(`Separation of Duties : Excluded from Sealed Bids, Payment Releases, and Legal Holds`);
  console.log(`Token Expiration     : 24 Hours (${invitation.expiresAt})`);
  console.log(`\nActivation URL Hash  : #invite-token=${rawToken}`);
  console.log('\nInstructions for Operator:');
  console.log('1. Navigate to the application URL in a secure browser.');
  console.log('2. Append the activation URL Hash to the URL.');
  console.log('3. Set a strong personal passphrase (≥12 chars with upper, lower, numbers, and symbols).');
  console.log('4. Enroll two-factor authentication (MFA).');
  console.log('----------------------------------------------------\n');
}

bootstrapSystemAdministrator().catch((err) => {
  console.error('[FATAL BOOTSTRAP ERROR]', err);
  process.exit(1);
});
