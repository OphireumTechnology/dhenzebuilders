import React, { useState } from 'react';
import {
  Building2,
  Users,
  Briefcase,
  ShieldCheck,
  ShieldAlert,
  AlertTriangle,
  CheckCircle2,
  Clock,
  ExternalLink,
  ChevronRight,
  Filter,
  Search,
  FileCheck,
} from 'lucide-react';
import { ProjectParticipantRecord } from '../../types/onboardingTypes';
import { INITIAL_PROJECT_PARTICIPANTS } from '../../data/onboardingMockData';

interface ProjectParticipantDirectoryProps {
  participants?: ProjectParticipantRecord[];
  onSelectParticipant?: (part: ProjectParticipantRecord) => void;
  portalTheme?: 'dark' | 'light';
}

export const ProjectParticipantDirectory: React.FC<ProjectParticipantDirectoryProps> = ({
  participants = INITIAL_PROJECT_PARTICIPANTS,
  onSelectParticipant,
  portalTheme = 'dark',
}) => {
  const [list, setList] = useState<ProjectParticipantRecord[]>(participants);
  const [selectedProject, setSelectedProject] = useState<string>('PRJ-2026-000125');
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = list.filter((item) => {
    if (selectedProject !== 'ALL' && item.projectId !== selectedProject) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        item.entityName.toLowerCase().includes(q) ||
        item.entityId.toLowerCase().includes(q) ||
        item.role.toLowerCase().includes(q) ||
        item.scope.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Directory Header */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-bold text-white tracking-tight flex items-center gap-2">
              <Users className="w-5 h-5 text-[#C6922D]" />
              Project Compliance & Participant Directory
            </h2>
            <span className="px-2 py-0.5 rounded text-[11px] font-mono bg-[#C6922D]/20 text-[#C6922D] border border-[#C6922D]/30">
              Section 40 Compliance Linkage
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Links approved master records (CTR, SUP, PRO, CLI) to project assignments with continuous license validity gates.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <select
            value={selectedProject}
            onChange={(e) => setSelectedProject(e.target.value)}
            className="bg-slate-950 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-slate-200 font-mono focus:outline-none focus:border-[#C6922D]"
          >
            <option value="ALL">All Projects</option>
            <option value="PRJ-2026-000125">PRJ-2026-000125 (The Reserve at Angeles Hills)</option>
          </select>
        </div>
      </div>

      {/* Directory Table */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
        <div className="p-4 bg-slate-950 border-b border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search participants by name, role, scope, or ID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-9 pr-4 py-1.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-[#C6922D]"
            />
          </div>

          <div className="text-xs text-slate-400 font-mono">
            Active Mobilized Entities: <strong className="text-white">{filtered.length}</strong>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950/80 border-b border-slate-800 text-slate-300 font-semibold">
              <tr>
                <th className="p-3.5">Entity ID & Type</th>
                <th className="p-3.5">Participant / Company Name</th>
                <th className="p-3.5">Project Role & Scope</th>
                <th className="p-3.5">Assigned Work Packages</th>
                <th className="p-3.5">Approval Status</th>
                <th className="p-3.5">Credential Compliance</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-mono">
              {filtered.map((item) => (
                <tr
                  key={item.id}
                  onClick={() => onSelectParticipant?.(item)}
                  className="hover:bg-slate-800/30 cursor-pointer"
                >
                  <td className="p-3.5">
                    <div className="font-bold text-[#C6922D]">{item.entityId}</div>
                    <div className="text-[10px] text-slate-400 font-sans">{item.entityType}</div>
                  </td>

                  <td className="p-3.5 font-sans">
                    <div className="font-semibold text-white">{item.entityName}</div>
                    <div className="text-[11px] text-slate-400 font-mono">{item.contractReference}</div>
                  </td>

                  <td className="p-3.5 font-sans">
                    <div className="text-slate-200 font-medium">{item.role}</div>
                    <div className="text-[11px] text-slate-400 line-clamp-1">{item.scope}</div>
                  </td>

                  <td className="p-3.5">
                    <div className="flex flex-wrap gap-1">
                      {item.assignedWorkPackages.map((wp, i) => (
                        <span key={i} className="px-1.5 py-0.5 rounded text-[10px] bg-slate-800 text-slate-300">
                          {wp}
                        </span>
                      ))}
                    </div>
                  </td>

                  <td className="p-3.5 font-sans">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        item.approvalStatus === 'APPROVED'
                          ? 'bg-emerald-500/20 text-emerald-300'
                          : 'bg-amber-500/20 text-amber-300'
                      }`}
                    >
                      {item.approvalStatus}
                    </span>
                  </td>

                  <td className="p-3.5 font-sans">
                    {item.credentialStatus === 'COMPLIANT' && (
                      <span className="px-2.5 py-1 rounded text-xs font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 inline-flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        Compliant
                      </span>
                    )}

                    {item.credentialStatus === 'WARNING_EXPIRING' && (
                      <div className="space-y-1">
                        <span className="px-2.5 py-1 rounded text-xs font-bold bg-amber-500/10 text-amber-400 border border-amber-500/20 inline-flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5" />
                          Warning: Expiring
                        </span>
                        {item.complianceAlert && (
                          <div className="text-[10px] text-amber-300/80 font-mono max-w-xs leading-tight">
                            {item.complianceAlert}
                          </div>
                        )}
                      </div>
                    )}

                    {item.credentialStatus === 'NON_COMPLIANT_EXPIRED' && (
                      <div className="space-y-1">
                        <span className="px-2.5 py-1 rounded text-xs font-bold bg-rose-500/10 text-rose-400 border border-rose-500/20 inline-flex items-center gap-1">
                          <AlertTriangle className="w-3.5 h-3.5" />
                          Non-Compliant: Expired
                        </span>
                        {item.complianceAlert && (
                          <div className="text-[10px] text-rose-300/90 font-mono max-w-xs leading-tight bg-rose-500/10 p-1.5 rounded border border-rose-500/20">
                            {item.complianceAlert}
                          </div>
                        )}
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
