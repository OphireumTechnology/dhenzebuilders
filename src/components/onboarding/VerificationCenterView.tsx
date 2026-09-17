import React, { useState, useMemo } from 'react';
import {
  ShieldAlert,
  ShieldCheck,
  Building,
  Users,
  Briefcase,
  FileText,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Filter,
  Search,
  RefreshCw,
  Play,
  History,
  Layers,
  ExternalLink,
  ChevronRight,
  Info,
  Sliders,
  Server,
  Key,
} from 'lucide-react';
import {
  VerificationRecord,
  VerificationHistoryEntry,
  GovernmentSourceDefinition,
  GovernmentConnectorSpec,
  DemoVerificationScenario,
  LiveLicenseStatus,
} from '../../types/onboardingTypes';
import {
  GOVERNMENT_SOURCES_REGISTRY,
  GOVERNMENT_CONNECTORS_LIST,
  DEMO_VERIFICATION_SCENARIOS,
} from '../../data/onboardingMockData';
import { GovernmentVerificationService } from '../../services/governmentVerificationService';
import { VerificationStatusCard } from './VerificationStatusCard';
import { CredentialMatchingModal } from './CredentialMatchingModal';

export type VerificationSubsection =
  | 'overview'
  | 'professional-licenses'
  | 'contractor-licenses'
  | 'business-registrations'
  | 'business-permits'
  | 'tax-credentials'
  | 'government-credentials'
  | 'pending-verification'
  | 'verification-issues'
  | 'expiring-credentials'
  | 'expired-credentials'
  | 'government-sources'
  | 'api-connections'
  | 'verification-history';

interface VerificationCenterViewProps {
  currentSubsection?: VerificationSubsection;
  onSelectSubsection?: (sub: VerificationSubsection) => void;
  portalTheme?: 'dark' | 'light';
}

export const VerificationCenterView: React.FC<VerificationCenterViewProps> = ({
  currentSubsection = 'overview',
  onSelectSubsection,
  portalTheme = 'dark',
}) => {
  const [activeSubsection, setActiveSubsection] = useState<VerificationSubsection>(currentSubsection);
  const [records, setRecords] = useState<VerificationRecord[]>(() => GovernmentVerificationService.getRecords());
  const [history, setHistory] = useState<VerificationHistoryEntry[]>(() => GovernmentVerificationService.getHistory());
  const [selectedRecordForModal, setSelectedRecordForModal] = useState<VerificationRecord | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedScenarioId, setSelectedScenarioId] = useState<string>('scen-01');
  const [isTriggeringScenario, setIsTriggeringScenario] = useState(false);
  const [scenarioNotification, setScenarioNotification] = useState<string | null>(null);

  const handleSubsectionChange = (sub: VerificationSubsection) => {
    setActiveSubsection(sub);
    onSelectSubsection?.(sub);
  };

  // Sync records
  const refreshRecords = () => {
    setRecords(GovernmentVerificationService.getRecords());
    setHistory(GovernmentVerificationService.getHistory());
  };

  // 14 Subsections definition (Section 32)
  const subsectionsList: { id: VerificationSubsection; label: string; count?: number }[] = [
    { id: 'overview', label: 'Verification Overview' },
    { id: 'professional-licenses', label: 'Professional Licenses', count: records.filter((r) => r.entityType === 'PROFESSIONAL').length },
    { id: 'contractor-licenses', label: 'Contractor Licenses', count: records.filter((r) => r.entityType === 'CONTRACTOR').length },
    { id: 'business-registrations', label: 'Business Registrations', count: records.filter((r) => r.agency.includes('SEC') || r.agency.includes('DTI')).length },
    { id: 'business-permits', label: 'Business Permits', count: records.filter((r) => r.agency.includes('LGU')).length },
    { id: 'tax-credentials', label: 'Tax/Registration Credentials', count: records.filter((r) => r.agency.includes('BIR')).length },
    { id: 'government-credentials', label: 'Government Credentials', count: records.length },
    { id: 'pending-verification', label: 'Pending Verification', count: records.filter((r) => r.status === 'Pending Verification').length },
    { id: 'verification-issues', label: 'Verification Issues', count: records.filter((r) => r.discrepancies.length > 0).length },
    { id: 'expiring-credentials', label: 'Expiring Credentials', count: records.filter((r) => r.status === 'Expiring Soon').length },
    { id: 'expired-credentials', label: 'Expired Credentials', count: records.filter((r) => r.status === 'Expired').length },
    { id: 'government-sources', label: 'Government Sources', count: GOVERNMENT_SOURCES_REGISTRY.length },
    { id: 'api-connections', label: 'API Connections', count: GOVERNMENT_CONNECTORS_LIST.length },
    { id: 'verification-history', label: 'Verification History', count: history.length },
  ];

  // Filtering records based on active subsection and search query
  const filteredRecords = useMemo(() => {
    return records.filter((record) => {
      // Subsection filter
      if (activeSubsection === 'professional-licenses' && record.entityType !== 'PROFESSIONAL') return false;
      if (activeSubsection === 'contractor-licenses' && record.entityType !== 'CONTRACTOR') return false;
      if (activeSubsection === 'business-registrations' && !record.agency.includes('SEC') && !record.agency.includes('DTI')) return false;
      if (activeSubsection === 'business-permits' && !record.agency.includes('LGU')) return false;
      if (activeSubsection === 'tax-credentials' && !record.agency.includes('BIR')) return false;
      if (activeSubsection === 'pending-verification' && record.status !== 'Pending Verification') return false;
      if (activeSubsection === 'verification-issues' && record.discrepancies.length === 0) return false;
      if (activeSubsection === 'expiring-credentials' && record.status !== 'Expiring Soon') return false;
      if (activeSubsection === 'expired-credentials' && record.status !== 'Expired') return false;

      // Query filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const name = record.comparisonFields.fullName.uploaded.toLowerCase();
        const lic = record.comparisonFields.licenseNumber.uploaded.toLowerCase();
        const agency = record.agency.toLowerCase();
        const id = record.verificationId.toLowerCase();
        const entityId = record.entityId.toLowerCase();
        return name.includes(q) || lic.includes(q) || agency.includes(q) || id.includes(q) || entityId.includes(q);
      }

      return true;
    });
  }, [records, activeSubsection, searchQuery]);

  // Execute Demo Verification Scenario (#43)
  const handleRunScenario = async () => {
    const scenario = DEMO_VERIFICATION_SCENARIOS.find((s) => s.id === selectedScenarioId);
    if (!scenario) return;

    setIsTriggeringScenario(true);
    setScenarioNotification(null);

    try {
      const mockReq = {
        credentialId: `CRED-SIM-${Date.now().toString(36).toUpperCase()}`,
        entityId: scenario.scenarioType.includes('CONTRACTOR')
          ? 'CTR-2026-000001'
          : scenario.scenarioType.includes('SUPPLIER')
          ? 'SUP-2026-000001'
          : 'PRO-2026-000001',
        entityName: scenario.mockEntityName,
        licenseNumber: scenario.mockLicenseNumber,
        credentialType: scenario.targetCredentialType,
        issuingAuthority: scenario.connector.replace('_DEMO_CONNECTOR', ''),
        claimedExpirationDate: '2026-12-31',
      };

      const result = await GovernmentVerificationService.triggerVerification(
        mockReq,
        scenario.connector,
        scenario.id
      );

      refreshRecords();
      setScenarioNotification(
        `Scenario Executed: ${scenario.title}. Status returned: ${result.record.status} with ${result.record.discrepancies.length} discrepancy flag(s).`
      );
      setSelectedRecordForModal(result.record);
    } finally {
      setIsTriggeringScenario(false);
    }
  };

  const isLight = portalTheme === 'light';

  return (
    <div className="space-y-6" id="verification-center-container">
      {/* MANDATORY DEMO ENVIRONMENT BANNER (Section 31 & 32) */}
      <div className="bg-gradient-to-r from-amber-500/20 via-amber-600/15 to-transparent border border-amber-500/40 rounded-2xl p-5 shadow-lg">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3.5">
            <div className="p-2.5 bg-amber-500/20 border border-amber-500/40 rounded-xl text-amber-400 shrink-0 mt-0.5">
              <ShieldAlert className="w-7 h-7" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-amber-500 text-slate-950 uppercase tracking-wide">
                  DEMO ENVIRONMENT
                </span>
                <span className="text-xs font-mono text-amber-300 font-semibold">
                  SIMULATED GOVERNMENT VERIFICATION ACTIVE
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-200 mt-1.5 leading-relaxed max-w-4xl">
                Government verification results displayed in this development environment are simulated using fictional data. No live government database or licensing portal is currently connected.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
            <span className="text-[11px] font-mono text-slate-400">Production Mode:</span>
            <span className="px-2 py-0.5 rounded text-[11px] font-mono font-bold bg-rose-500/20 text-rose-300 border border-rose-500/30">
              DISABLED
            </span>
          </div>
        </div>
      </div>

      {/* Title & Interactive Scenario Switcher (#43) */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 space-y-4">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold text-white tracking-tight">
                Government License & Credential Verification Center
              </h1>
              <span className="px-2 py-0.5 rounded text-[11px] font-mono bg-blue-500/20 text-blue-300 border border-blue-500/30">
                Phase 1 Simulation
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Automated simulated verification, credential matching, and compliance monitoring across PRC, PCAB, SEC, DTI, LGU, and BIR.
            </p>
          </div>

          {/* Scenario Runner Controls */}
          <div className="flex flex-wrap items-center gap-2.5 w-full lg:w-auto">
            <div className="flex items-center gap-1.5 text-xs text-amber-400 font-medium">
              <Sliders className="w-4 h-4" />
              <span>Simulate Scenario:</span>
            </div>
            <select
              value={selectedScenarioId}
              onChange={(e) => setSelectedScenarioId(e.target.value)}
              className="bg-slate-950 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-[#C6922D] max-w-xs"
            >
              {DEMO_VERIFICATION_SCENARIOS.map((scen) => (
                <option key={scen.id} value={scen.id}>
                  {scen.title}
                </option>
              ))}
            </select>
            <button
              onClick={handleRunScenario}
              disabled={isTriggeringScenario}
              className="px-3.5 py-1.5 bg-[#C6922D] hover:bg-[#b08024] text-slate-950 font-bold rounded-lg text-xs flex items-center gap-1.5 transition-colors disabled:opacity-50"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              {isTriggeringScenario ? 'Simulating...' : 'Run Simulation'}
            </button>
          </div>
        </div>

        {scenarioNotification && (
          <div className="p-3 bg-blue-500/10 border border-blue-500/30 rounded-xl text-xs text-blue-300 flex items-center justify-between">
            <span>{scenarioNotification}</span>
            <button
              onClick={() => setScenarioNotification(null)}
              className="text-blue-400 hover:text-white font-bold ml-2"
            >
              &times;
            </button>
          </div>
        )}
      </div>

      {/* Subsections Navigation Bar (Section 32) */}
      <div className="flex items-center gap-1 overflow-x-auto pb-2 border-b border-slate-800 scrollbar-thin">
        {subsectionsList.map((sub) => {
          const isActive = activeSubsection === sub.id;
          return (
            <button
              key={sub.id}
              onClick={() => handleSubsectionChange(sub.id)}
              className={`px-3 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                isActive
                  ? 'bg-[#C6922D] text-slate-950 shadow-md font-bold'
                  : 'bg-slate-900/60 text-slate-400 hover:text-slate-200 hover:bg-slate-800'
              }`}
            >
              <span>{sub.label}</span>
              {typeof sub.count === 'number' && (
                <span
                  className={`px-1.5 py-0.2 rounded-full text-[10px] font-mono ${
                    isActive ? 'bg-slate-950/30 text-slate-900' : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  {sub.count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Search & Filter Bar */}
      {activeSubsection !== 'government-sources' &&
        activeSubsection !== 'api-connections' &&
        activeSubsection !== 'verification-history' && (
          <div className="flex items-center justify-between gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search by name, license number, agency, or ID..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-900/70 border border-slate-800 rounded-xl pl-9 pr-4 py-2 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-[#C6922D]"
              />
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400">
                Showing <strong>{filteredRecords.length}</strong> record(s)
              </span>
              <button
                onClick={refreshRecords}
                className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg transition-colors"
                title="Refresh Records"
              >
                <RefreshCw className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

      {/* MAIN CONTENT PANELS BY SUBSECTION */}

      {/* 1. Standard Credential Card Listing */}
      {activeSubsection !== 'government-sources' &&
        activeSubsection !== 'api-connections' &&
        activeSubsection !== 'verification-history' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredRecords.length === 0 ? (
              <div className="col-span-2 p-12 text-center bg-slate-900/40 border border-slate-800 rounded-2xl">
                <ShieldCheck className="w-12 h-12 text-slate-600 mx-auto mb-3" />
                <h3 className="text-sm font-semibold text-slate-300">No matching credentials found</h3>
                <p className="text-xs text-slate-500 mt-1 max-w-md mx-auto">
                  Try adjusting your search filter or trigger a simulated test scenario using the controls above.
                </p>
              </div>
            ) : (
              filteredRecords.map((record) => (
                <VerificationStatusCard
                  key={record.verificationId}
                  record={record}
                  onViewDetails={(rec) => setSelectedRecordForModal(rec)}
                  onViewHistory={(rec) => handleSubsectionChange('verification-history')}
                  onRecordUpdated={() => refreshRecords()}
                  portalTheme={portalTheme}
                />
              ))
            )}
          </div>
        )}

      {/* 12. Government Sources Registry Table (Section 33) */}
      {activeSubsection === 'government-sources' && (
        <div className="space-y-4">
          <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-white">Future Government Source Registry</h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Official regulatory authorities cataloged for electronic or manual verification pipelines.
              </p>
            </div>
            <span className="text-xs font-mono text-amber-400 bg-amber-500/10 px-2.5 py-1 rounded border border-amber-500/20">
              6 Cataloged Sources
            </span>
          </div>

          <div className="border border-slate-800 rounded-xl overflow-hidden bg-slate-900/50">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-950 border-b border-slate-800 text-slate-300 font-semibold">
                <tr>
                  <th className="p-3.5">Agency / Registry</th>
                  <th className="p-3.5">Category</th>
                  <th className="p-3.5">Statutory Basis</th>
                  <th className="p-3.5">Integration Status</th>
                  <th className="p-3.5">Default Connector</th>
                  <th className="p-3.5">Official Portal</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {GOVERNMENT_SOURCES_REGISTRY.map((src) => (
                  <tr key={src.id} className="hover:bg-slate-800/30">
                    <td className="p-3.5">
                      <div className="font-bold text-white">{src.code}</div>
                      <div className="text-slate-400 text-[11px]">{src.name}</div>
                    </td>
                    <td className="p-3.5 font-mono text-slate-300">{src.category}</td>
                    <td className="p-3.5 text-slate-400 max-w-xs">{src.statutoryBasis}</td>
                    <td className="p-3.5">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-bold font-mono ${
                          src.integrationStatus === 'API AVAILABLE'
                            ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                            : src.integrationStatus === 'API REQUIRES AUTHORIZATION'
                            ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                            : src.integrationStatus === 'MANUAL OFFICIAL-PORTAL VERIFICATION'
                            ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                            : 'bg-slate-800 text-slate-400 border border-slate-700'
                        }`}
                      >
                        {src.integrationStatus}
                      </span>
                    </td>
                    <td className="p-3.5 font-mono text-blue-400">{src.defaultConnector}</td>
                    <td className="p-3.5">
                      <a
                        href={src.portalUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-[#C6922D] hover:underline flex items-center gap-1 font-mono text-[11px]"
                      >
                        <span>Official Portal</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 13. Government Integration Manager / API Connections (Section 42) */}
      {activeSubsection === 'api-connections' && (
        <div className="space-y-4">
          <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-white">Government Integration Manager</h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Connector architecture specifications, latency metrics, and isolation guardrails.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-slate-400">Sandbox Latency:</span>
              <span className="text-xs font-mono text-emerald-400 font-bold">&lt; 350ms</span>
            </div>
          </div>

          <div className="border border-slate-800 rounded-xl overflow-hidden bg-slate-900/50">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-950 border-b border-slate-800 text-slate-300 font-semibold">
                <tr>
                  <th className="p-3.5">Agency</th>
                  <th className="p-3.5">Connector Name</th>
                  <th className="p-3.5">Environment</th>
                  <th className="p-3.5">Status</th>
                  <th className="p-3.5">Auth Type</th>
                  <th className="p-3.5">Rate Limit</th>
                  <th className="p-3.5">Production Mode</th>
                  <th className="p-3.5">Real Data Transmit</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {GOVERNMENT_CONNECTORS_LIST.map((conn) => (
                  <tr key={conn.id} className="hover:bg-slate-800/30">
                    <td className="p-3.5 font-bold text-[#C6922D]">{conn.agency}</td>
                    <td className="p-3.5">
                      <div className="font-semibold text-white">{conn.fullName}</div>
                      <div className="text-[11px] text-slate-400">{conn.description}</div>
                    </td>
                    <td className="p-3.5">
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                        {conn.environment}
                      </span>
                    </td>
                    <td className="p-3.5">
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono text-blue-300 bg-blue-500/20 border border-blue-500/30">
                        {conn.status} ({conn.latencyMs}ms)
                      </span>
                    </td>
                    <td className="p-3.5 font-mono text-slate-300">{conn.authenticationType}</td>
                    <td className="p-3.5 font-mono text-slate-400">{conn.rateLimit}</td>
                    <td className="p-3.5">
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-rose-500/20 text-rose-300 border border-rose-500/30">
                        DISABLED
                      </span>
                    </td>
                    <td className="p-3.5">
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-rose-500/20 text-rose-300 border border-rose-500/30">
                        DISABLED
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 14. Verification History Table (Section 39) */}
      {activeSubsection === 'verification-history' && (
        <div className="space-y-4">
          <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-white">Government Verification History Log</h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Immutable chronological ledger of all automated and manual simulated credential audits.
              </p>
            </div>
            <span className="text-xs font-mono text-slate-400">
              Total Log Entries: <strong className="text-white">{history.length}</strong>
            </span>
          </div>

          <div className="border border-slate-800 rounded-xl overflow-hidden bg-slate-900/50">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-950 border-b border-slate-800 text-slate-300 font-semibold">
                <tr>
                  <th className="p-3.5">Verification No.</th>
                  <th className="p-3.5">Target Entity / Name</th>
                  <th className="p-3.5">Government Source</th>
                  <th className="p-3.5">Timestamp</th>
                  <th className="p-3.5">Previous Status</th>
                  <th className="p-3.5">Simulated Result</th>
                  <th className="p-3.5">Response Ref</th>
                  <th className="p-3.5">Reviewer</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-mono">
                {history.map((h) => (
                  <tr key={h.id} className="hover:bg-slate-800/30">
                    <td className="p-3.5 font-bold text-[#C6922D]">{h.verificationNumber}</td>
                    <td className="p-3.5 text-white font-sans font-medium">{h.personOrOrgName}</td>
                    <td className="p-3.5 text-blue-400">{h.governmentSource}</td>
                    <td className="p-3.5 text-slate-400 text-[11px]">{h.verificationTimestamp}</td>
                    <td className="p-3.5 text-slate-400">{h.previousResult}</td>
                    <td className="p-3.5">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          h.currentResult === 'Active'
                            ? 'bg-emerald-500/20 text-emerald-300'
                            : h.currentResult === 'Expiring Soon'
                            ? 'bg-amber-500/20 text-amber-300'
                            : 'bg-rose-500/20 text-rose-300'
                        }`}
                      >
                        {h.currentResult}
                      </span>
                    </td>
                    <td className="p-3.5 text-slate-400 text-[11px]">{h.responseReferenceId}</td>
                    <td className="p-3.5 text-slate-300 font-sans">{h.reviewer}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Credential Matching Field-Level Modal */}
      <CredentialMatchingModal
        isOpen={Boolean(selectedRecordForModal)}
        record={selectedRecordForModal}
        onClose={() => setSelectedRecordForModal(null)}
        onRecordUpdated={() => refreshRecords()}
      />
    </div>
  );
};
