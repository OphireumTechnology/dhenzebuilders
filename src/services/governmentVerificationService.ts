/**
 * GOVERNMENT VERIFICATION SERVICE & DEMO CONNECTOR ARCHITECTURE
 * Strictly for DEMO / SIMULATION ENVIRONMENT (#31 - #46)
 *
 * Architecture:
 * Dashboard -> Verification Service -> Government Connector Interface -> Demo Connector
 * Designed for seamless drop-in replacement by authorized production REST/mTLS connectors in future phases.
 */

import {
  VerificationRecord,
  VerificationHistoryEntry,
  VerificationConnectorId,
  DemoVerificationScenario,
  LiveLicenseStatus,
  GovernmentConnectorSpec,
} from '../types/onboardingTypes';
import {
  GOVERNMENT_CONNECTORS_LIST,
  DEMO_VERIFICATION_SCENARIOS,
  INITIAL_VERIFICATION_RECORDS,
  INITIAL_VERIFICATION_HISTORY,
} from '../data/onboardingMockData';

/**
 * Common Government Connector Interface (Section 34)
 * Both Demo Connectors and future Production Connectors implement this contract.
 */
export interface IGovernmentConnector {
  connectorId: VerificationConnectorId;
  agencyName: string;
  isProductionReady: boolean;
  verifyCredential(request: CredentialVerificationRequest): Promise<GovernmentRawVerificationResponse>;
}

export interface CredentialVerificationRequest {
  credentialId: string;
  entityId: string;
  entityName: string;
  licenseNumber: string;
  credentialType: string;
  issuingAuthority: string;
  claimedExpirationDate: string;
  uploadedDocumentUrl?: string;
}

export interface GovernmentRawVerificationResponse {
  connectorId: VerificationConnectorId;
  agency: string;
  rawReferenceNumber: string;
  responseTimestamp: string;
  recordFound: boolean;
  officialStatus: string;
  officialHolderName: string;
  officialLicenseNumber: string;
  officialExpirationDate: string;
  officialDisciplineCategory?: string;
  disciplinaryHolds: string[];
  latencyMs: number;
  environment: 'DEMO';
  simulatedError?: string;
}

/**
 * Base Demo Connector Implementation (Simulated Handshake)
 */
export class DemoGovernmentConnector implements IGovernmentConnector {
  public connectorId: VerificationConnectorId;
  public agencyName: string;
  public isProductionReady: boolean = false;

  constructor(id: VerificationConnectorId, agency: string) {
    this.connectorId = id;
    this.agencyName = agency;
  }

  async verifyCredential(request: CredentialVerificationRequest): Promise<GovernmentRawVerificationResponse> {
    // Simulate network latency (between 100ms - 350ms)
    const simulatedLatency = Math.floor(Math.random() * 200) + 120;
    await new Promise((resolve) => setTimeout(resolve, simulatedLatency));

    const now = new Date().toISOString();
    const refCode = `SIM-${this.agencyName.toUpperCase()}-${Date.now().toString(36).toUpperCase()}`;

    // Standard simulated match based on request data
    return {
      connectorId: this.connectorId,
      agency: this.agencyName,
      rawReferenceNumber: refCode,
      responseTimestamp: now,
      recordFound: true,
      officialStatus: 'ACTIVE_REGISTERED',
      officialHolderName: request.entityName,
      officialLicenseNumber: request.licenseNumber,
      officialExpirationDate: request.claimedExpirationDate || '2027-12-31',
      officialDisciplineCategory: request.credentialType,
      disciplinaryHolds: [],
      latencyMs: simulatedLatency,
      environment: 'DEMO',
    };
  }
}

/**
 * Connector Factory Registry
 */
export const DEMO_CONNECTORS: Record<VerificationConnectorId, IGovernmentConnector> = {
  PRC_DEMO_CONNECTOR: new DemoGovernmentConnector('PRC_DEMO_CONNECTOR', 'PRC'),
  PCAB_DEMO_CONNECTOR: new DemoGovernmentConnector('PCAB_DEMO_CONNECTOR', 'PCAB'),
  SEC_DEMO_CONNECTOR: new DemoGovernmentConnector('SEC_DEMO_CONNECTOR', 'SEC'),
  DTI_DEMO_CONNECTOR: new DemoGovernmentConnector('DTI_DEMO_CONNECTOR', 'DTI'),
  LGU_DEMO_CONNECTOR: new DemoGovernmentConnector('LGU_DEMO_CONNECTOR', 'LGU'),
  BIR_DEMO_CONNECTOR: new DemoGovernmentConnector('BIR_DEMO_CONNECTOR', 'BIR'),
};

/**
 * In-Memory Verification Storage (Hydrated with Initial Seed Records)
 */
let verificationRecordsStore: VerificationRecord[] = [...INITIAL_VERIFICATION_RECORDS];
let verificationHistoryStore: VerificationHistoryEntry[] = [...INITIAL_VERIFICATION_HISTORY];
let activeScenarioOverride: DemoVerificationScenario | null = null;

export const GovernmentVerificationService = {
  /**
   * List all stored verification records
   */
  getRecords(): VerificationRecord[] {
    return [...verificationRecordsStore];
  },

  /**
   * Get specific record
   */
  getRecordById(id: string): VerificationRecord | undefined {
    return verificationRecordsStore.find((r) => r.verificationId === id || r.credentialId === id);
  },

  /**
   * Get verification history for credential or entity
   */
  getHistory(credentialOrEntityId?: string): VerificationHistoryEntry[] {
    if (!credentialOrEntityId) {
      return [...verificationHistoryStore];
    }
    return verificationHistoryStore.filter(
      (h) => h.credentialId === credentialOrEntityId || h.entityId === credentialOrEntityId
    );
  },

  /**
   * List available connectors with current live stats
   */
  getConnectors(): GovernmentConnectorSpec[] {
    return [...GOVERNMENT_CONNECTORS_LIST];
  },

  /**
   * List switchable demo scenarios
   */
  getScenarios(): DemoVerificationScenario[] {
    return [...DEMO_VERIFICATION_SCENARIOS];
  },

  /**
   * Set active scenario override
   */
  setActiveScenario(scenarioId: string | null): DemoVerificationScenario | null {
    if (!scenarioId) {
      activeScenarioOverride = null;
      return null;
    }
    const found = DEMO_VERIFICATION_SCENARIOS.find((s) => s.id === scenarioId) || null;
    activeScenarioOverride = found;
    return activeScenarioOverride;
  },

  getActiveScenario(): DemoVerificationScenario | null {
    return activeScenarioOverride;
  },

  /**
   * Trigger Simulated Verification (Section 36 & 37)
   */
  async triggerVerification(
    request: CredentialVerificationRequest,
    connectorId: VerificationConnectorId,
    scenarioOverrideId?: string
  ): Promise<{ record: VerificationRecord; historyEntry: VerificationHistoryEntry }> {
    const connector = DEMO_CONNECTORS[connectorId] || DEMO_CONNECTORS.PRC_DEMO_CONNECTOR;
    const scenario = scenarioOverrideId
      ? DEMO_VERIFICATION_SCENARIOS.find((s) => s.id === scenarioOverrideId)
      : activeScenarioOverride;

    const reqTime = new Date().toISOString();
    const rawResponse = await connector.verifyCredential(request);
    const respTime = new Date().toISOString();

    // Determine status and comparison fields based on scenario
    let finalStatus: LiveLicenseStatus = 'Active';
    let governmentHolder = request.entityName;
    let governmentLicNo = request.licenseNumber;
    let governmentExpDate = request.claimedExpirationDate || '2027-12-31';
    let governmentOfficialStatus = 'ACTIVE & REGISTERED';
    let discrepancies: string[] = [];
    let badgeType: 'DEMO' | 'REQUIRES REVIEW' | 'MANUALLY VERIFIED' | 'UNVERIFIED' = 'DEMO';

    if (scenario) {
      switch (scenario.scenarioType) {
        case 'EXPIRED_PROFESSIONAL':
        case 'CONTRACTOR_EXPIRED':
        case 'SUPPLIER_PERMIT_EXPIRED':
          finalStatus = 'Expired';
          governmentExpDate = '2026-06-15';
          governmentOfficialStatus = 'EXPIRED (PAST RE-VALIDATION CUTOFF)';
          discrepancies.push(`License record expired on ${governmentExpDate}. Renewal required.`);
          badgeType = 'REQUIRES REVIEW';
          break;
        case 'EXPIRING_30_DAYS':
          finalStatus = 'Expiring Soon';
          governmentExpDate = '2026-10-12';
          governmentOfficialStatus = 'ACTIVE (EXPIRING IN LESS THAN 30 DAYS)';
          discrepancies.push('Expiration is within 30 days. Renewal notice triggered.');
          badgeType = 'DEMO';
          break;
        case 'LICENSE_NOT_FOUND':
          finalStatus = 'Record Not Found';
          governmentLicNo = '[NOT_FOUND_IN_REGISTRY]';
          governmentOfficialStatus = 'NO MATCHING RECORD FOUND';
          discrepancies.push('The license number was not found in the official registry database.');
          badgeType = 'REQUIRES REVIEW';
          break;
        case 'NAME_MISMATCH':
          finalStatus = 'Information Mismatch';
          governmentHolder = 'Carmen Santos Reyes';
          governmentOfficialStatus = 'REGISTERED UNDER ALTERNATE LEGAL NAME';
          discrepancies.push(`Name discrepancy: Uploaded "${request.entityName}" vs Government Record "${governmentHolder}"`);
          badgeType = 'REQUIRES REVIEW';
          break;
        case 'CORPORATE_AUTHORITY_RENEWAL':
          finalStatus = 'Reverification Required';
          governmentOfficialStatus = 'ANNUAL REVIEW CYCLE EXPIRED';
          discrepancies.push('Corporate signatory authority exceeded 12-month validity period.');
          badgeType = 'REQUIRES REVIEW';
          break;
        case 'SERVICE_UNAVAILABLE':
          finalStatus = 'Government Service Unavailable';
          governmentOfficialStatus = 'HTTP 503 SERVICE TEMPORARILY UNAVAILABLE';
          discrepancies.push('Upstream government database gateway returned 503 maintenance response.');
          badgeType = 'REQUIRES REVIEW';
          break;
        case 'API_TIMEOUT':
          finalStatus = 'Verification Error';
          governmentOfficialStatus = 'TIMEOUT > 10,000 MS';
          discrepancies.push('Connection to simulated agency endpoint timed out.');
          badgeType = 'REQUIRES REVIEW';
          break;
        case 'AUTH_FAILURE':
          finalStatus = 'API Not Connected';
          governmentOfficialStatus = 'MUTUAL TLS / TOKEN EXPIRED';
          discrepancies.push('Gateway authentication token expired or invalid handshake.');
          badgeType = 'UNVERIFIED';
          break;
        case 'MANUAL_VERIFICATION_REQUIRED':
          finalStatus = 'Manual Verification Required';
          governmentOfficialStatus = 'NO REST ENDPOINT - PHYSICAL INSPECTION REQUIRED';
          discrepancies.push('Agency lacks electronic public API. Manual review queue assigned.');
          badgeType = 'MANUALLY VERIFIED';
          break;
        default:
          finalStatus = scenario.expectedStatus;
          badgeType = scenario.badge as any;
          break;
      }
    }

    const nameMatch = request.entityName.trim().toLowerCase() === governmentHolder.trim().toLowerCase();
    const licenseNumberMatch = request.licenseNumber.trim() === governmentLicNo.trim();
    const expMatch = !discrepancies.some((d) => d.includes('expired') || d.includes('30 days'));

    const newRecordId = `VER-2026-${String(verificationRecordsStore.length + 1).padStart(6, '0')}`;

    const newRecord: VerificationRecord = {
      verificationId: newRecordId,
      credentialId: request.credentialId,
      entityId: request.entityId,
      entityType: request.entityId.startsWith('CTR')
        ? 'CONTRACTOR'
        : request.entityId.startsWith('SUP')
        ? 'SUPPLIER'
        : request.entityId.startsWith('CLI')
        ? 'CLIENT'
        : 'PROFESSIONAL',
      agency: connector.agencyName,
      connector: connectorId,
      environment: 'DEMO',
      verificationMethod: 'SIMULATED_CONNECTOR',
      requestTimestamp: reqTime,
      responseTimestamp: respTime,
      status: finalStatus,
      badge: badgeType,
      recordMatch: finalStatus !== 'Record Not Found',
      nameMatch,
      licenseNumberMatch,
      expirationDate: governmentExpDate,
      governmentStatus: governmentOfficialStatus,
      sourceReference: rawResponse.rawReferenceNumber,
      rawResponseReference: JSON.stringify(rawResponse),
      reviewStatus: discrepancies.length > 0 ? 'FLAGGED_DISCREPANCY' : 'REVIEWED_ACCEPTED',
      reviewedBy: 'Compliance Officer (Automated Simulator)',
      reviewedAt: respTime,
      notes:
        discrepancies.length > 0
          ? `Discrepancies identified during simulated query: ${discrepancies.join('; ')}`
          : 'Simulated verification completed with full field correspondence.',
      createdAt: reqTime,
      updatedAt: respTime,
      comparisonFields: {
        fullName: { uploaded: request.entityName, government: governmentHolder, match: nameMatch },
        licenseNumber: { uploaded: request.licenseNumber, government: governmentLicNo, match: licenseNumberMatch },
        professionalCategory: { uploaded: request.credentialType, government: request.credentialType, match: true },
        expirationDate: { uploaded: request.claimedExpirationDate, government: governmentExpDate, match: expMatch },
        currentStatus: { uploaded: 'Active', government: finalStatus, match: finalStatus === 'Active' },
        issuingAuthority: { uploaded: request.issuingAuthority, government: connector.agencyName, match: true },
      },
      discrepancies,
    };

    // Update or insert in store
    const existingIndex = verificationRecordsStore.findIndex(
      (r) => r.credentialId === request.credentialId || r.verificationId === request.credentialId
    );
    if (existingIndex >= 0) {
      verificationRecordsStore[existingIndex] = newRecord;
    } else {
      verificationRecordsStore.unshift(newRecord);
    }

    // Append to immutable verification history
    const historyEntry: VerificationHistoryEntry = {
      id: `vh-${Date.now().toString(36)}`,
      verificationNumber: `Verification #${verificationHistoryStore.length + 1}`,
      credentialId: request.credentialId,
      entityId: request.entityId,
      personOrOrgName: request.entityName,
      governmentSource: connector.agencyName,
      connector: connectorId,
      verificationTimestamp: new Date().toISOString().replace('T', ' ').substring(0, 19) + ' PHT',
      previousResult: existingIndex >= 0 ? verificationRecordsStore[existingIndex].status : 'INITIAL_SUBMISSION',
      currentResult: finalStatus,
      responseReferenceId: rawResponse.rawReferenceNumber,
      verificationMode: 'DEMO',
      reviewer: 'System Verification Service',
      notes: newRecord.notes,
      discrepancyCount: discrepancies.length,
    };

    verificationHistoryStore.unshift(historyEntry);

    return { record: newRecord, historyEntry };
  },

  /**
   * Recheck existing credential
   */
  async recheckCredential(verificationId: string): Promise<VerificationRecord | null> {
    const existing = verificationRecordsStore.find((r) => r.verificationId === verificationId);
    if (!existing) return null;

    const request: CredentialVerificationRequest = {
      credentialId: existing.credentialId,
      entityId: existing.entityId,
      entityName: existing.comparisonFields.fullName.uploaded,
      licenseNumber: existing.comparisonFields.licenseNumber.uploaded,
      credentialType: existing.comparisonFields.professionalCategory?.uploaded || 'Professional Credential',
      issuingAuthority: existing.agency,
      claimedExpirationDate: existing.comparisonFields.expirationDate.uploaded,
    };

    const { record } = await this.triggerVerification(request, existing.connector);
    return record;
  },

  /**
   * Human review decision override
   */
  updateHumanReview(
    verificationId: string,
    decision: 'REVIEWED_ACCEPTED' | 'FLAGGED_DISCREPANCY' | 'OVERRIDDEN',
    reviewerName: string,
    notes: string
  ): VerificationRecord | null {
    const record = verificationRecordsStore.find((r) => r.verificationId === verificationId);
    if (!record) return null;

    record.reviewStatus = decision;
    record.reviewedBy = reviewerName;
    record.reviewedAt = new Date().toISOString();
    record.notes = notes;
    record.updatedAt = new Date().toISOString();

    if (decision === 'REVIEWED_ACCEPTED') {
      record.badge = 'MANUALLY VERIFIED';
    }

    return { ...record };
  },
};
