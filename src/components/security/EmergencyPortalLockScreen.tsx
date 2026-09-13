import React, { useState } from 'react';
import {
  ShieldAlert,
  Lock,
  ArrowLeft,
  Key,
  CheckCircle2,
  AlertCircle,
  FileCheck2,
  RefreshCw,
  EyeOff,
  UserCheck,
  Server,
  Terminal,
} from 'lucide-react';
import { BrandLogo } from '../common/BrandLogo';

interface EmergencyPortalLockScreenProps {
  onNavigate: (view: string) => void;
  onEmergencyUnlockSuccess?: (adminUser: any) => void;
}

export const EmergencyPortalLockScreen: React.FC<EmergencyPortalLockScreenProps> = ({
  onNavigate,
  onEmergencyUnlockSuccess,
}) => {
  const [adminModalOpen, setAdminModalOpen] = useState(false);
  const [adminEmail, setAdminEmail] = useState('dhenzebuilders@gmail.com');
  const [emergencyKey, setEmergencyKey] = useState('EmergencyAdminPass#2026');
  const [adminLoading, setAdminLoading] = useState(false);
  const [adminError, setAdminError] = useState<string | null>(null);
  const [adminSuccess, setAdminSuccess] = useState<string | null>(null);

  const handleEmergencyVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setAdminError(null);
    setAdminSuccess(null);
    setAdminLoading(true);

    try {
      const res = await fetch('/api/security/emergency-unlock-toggle', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: adminEmail,
          emergencyKey,
          enabled: true, // unlock for emergency administrative session
          reason: 'Authorized Emergency Administrator diagnostic sign-in',
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        setAdminError(data.error || 'Emergency verification failed.');
        setAdminLoading(false);
        return;
      }

      setAdminSuccess('Emergency identity verified. Portal lock temporarily lifted for authorized administrator session.');
      setTimeout(() => {
        setAdminLoading(false);
        setAdminModalOpen(false);
        if (onEmergencyUnlockSuccess) {
          onEmergencyUnlockSuccess({
            uid: 'usr-admin-dhenze-01',
            email: adminEmail,
            role: 'System Administrator',
            fullName: 'Executive Emergency Administrator',
            organizationId: 'org-dhenze-internal',
            organizationName: 'LDL Dhenze Residential Building Construction',
            portalType: 'admin',
          });
        }
        onNavigate('operations/overview');
      }, 1000);
    } catch (err: any) {
      setAdminError(err.message || 'Connection to security server failed.');
      setAdminLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050E1A] text-slate-100 flex flex-col justify-between blueprint-grid relative overflow-hidden">
      {/* Background Accent Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(#C6922D_1px,transparent_1px)] [background-size:32px_32px] opacity-10 pointer-events-none" />

      {/* Top Warning Banner */}
      <div className="bg-rose-950/80 border-b border-rose-800/60 px-4 py-2.5 flex items-center justify-between text-xs text-rose-200">
        <div className="max-w-7xl mx-auto w-full flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 font-mono font-bold tracking-wider">
            <ShieldAlert className="w-4 h-4 text-rose-400 shrink-0" />
            <span>SECURITY DIRECTIVE: PORTALS_ENABLED=false (ZERO-TRUST ACTIVE)</span>
          </div>
          <span className="hidden sm:inline font-mono text-[11px] text-rose-300">
            Directive Ref: SEC-LOCK-2026-PH • High-Security Isolation
          </span>
        </div>
      </div>

      {/* Main Lock Card */}
      <div className="flex-1 flex items-center justify-center p-4 sm:p-6 lg:p-8 z-10">
        <div className="max-w-2xl w-full bg-[#08182B]/95 border border-rose-500/30 rounded-2xl p-6 sm:p-10 shadow-2xl backdrop-blur-xl relative">
          <div className="absolute top-0 right-0 transform translate-x-3 -translate-y-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-mono font-bold bg-rose-950 text-rose-300 border border-rose-800 shadow-md">
              <EyeOff className="w-3 h-3" /> PRIVATE APIS OFFLINE
            </span>
          </div>

          <div className="text-center mb-8">
            <div className="flex justify-center mb-6">
              <BrandLogo variant="dark" size="md" showTagline />
            </div>

            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-400 mb-4 shadow-inner">
              <Lock className="w-8 h-8" />
            </div>

            <h1 className="text-2xl sm:text-3xl font-serif text-white tracking-tight">
              Access Restricted: Portal Lockdown Active
            </h1>
            <p className="mt-2 text-sm text-slate-300 max-w-lg mx-auto font-sans leading-relaxed">
              All multi-tenant development portals, supplier tender rooms, partner workspaces, and operational dashboards are locked under strict server-side zero-trust governance.
            </p>
          </div>

          {/* Security Rules Checklist Summary */}
          <div className="bg-[#051322] border border-white/5 rounded-xl p-4 sm:p-5 mb-8 space-y-3">
            <div className="text-xs font-mono uppercase tracking-wider text-[#C6922D] font-bold flex items-center gap-2">
              <Terminal className="w-3.5 h-3.5" />
              Active System Guardrails
            </div>
            <ul className="text-xs text-slate-300 space-y-2.5 font-sans">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>No Public Exposure:</strong> Private project names, pricing packages, supplier evaluations, and documents are blocked from anonymous clients.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>Server-Authoritative Lock:</strong> Feature flag <code className="text-[#C6922D] font-mono">PORTALS_ENABLED=false</code> is enforced directly in server middleware.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>Restricted Administration:</strong> Only explicitly allowlisted Emergency Administrators (<code className="text-slate-200 font-mono">dhenzebuilders@gmail.com</code>) may request step-up access.</span>
              </li>
            </ul>
          </div>

          {/* Navigation Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-white/10">
            <button
              onClick={() => onNavigate('home')}
              className="w-full sm:w-auto px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-slate-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg transition-all flex items-center justify-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Return to Public Website</span>
            </button>

            <button
              onClick={() => setAdminModalOpen(true)}
              className="w-full sm:w-auto px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-[#071A2F] bg-[#C6922D] hover:bg-[#d8a339] rounded-lg transition-all shadow-lg flex items-center justify-center gap-2"
            >
              <Key className="w-4 h-4" />
              <span>Emergency Admin Access</span>
            </button>
          </div>
        </div>
      </div>

      {/* Emergency Admin Modal */}
      {adminModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-in fade-in duration-200">
          <div className="max-w-md w-full bg-[#081B2F] border border-[#C6922D]/40 rounded-2xl p-6 sm:p-8 shadow-2xl relative">
            <div className="flex items-center justify-between mb-6 pb-3 border-b border-white/10">
              <div className="flex items-center gap-2">
                <UserCheck className="w-5 h-5 text-[#C6922D]" />
                <h3 className="text-base font-serif font-bold text-white">Emergency Administrator Verification</h3>
              </div>
              <button
                onClick={() => setAdminModalOpen(false)}
                className="text-slate-400 hover:text-white text-sm"
              >
                ✕
              </button>
            </div>

            {adminError && (
              <div className="mb-4 p-3 bg-rose-950/70 border border-rose-800 rounded-lg text-xs text-rose-200 flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                <span>{adminError}</span>
              </div>
            )}

            {adminSuccess && (
              <div className="mb-4 p-3 bg-emerald-950/70 border border-emerald-800 rounded-lg text-xs text-emerald-200 flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>{adminSuccess}</span>
              </div>
            )}

            <form onSubmit={handleEmergencyVerify} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Allowlisted Administrator Email
                </label>
                <input
                  type="email"
                  value={adminEmail}
                  onChange={(e) => setAdminEmail(e.target.value)}
                  className="w-full px-3 py-2 bg-[#051322] border border-white/10 rounded-lg text-sm text-white font-mono focus:border-[#C6922D] focus:outline-none"
                  placeholder="dhenzebuilders@gmail.com"
                  required
                />
                <p className="text-[11px] text-slate-400 mt-1">Must match registered emergency allowlist.</p>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Emergency Security Passkey
                </label>
                <input
                  type="password"
                  value={emergencyKey}
                  onChange={(e) => setEmergencyKey(e.target.value)}
                  className="w-full px-3 py-2 bg-[#051322] border border-white/10 rounded-lg text-sm text-white font-mono focus:border-[#C6922D] focus:outline-none"
                  placeholder="••••••••••••"
                  required
                />
                <p className="text-[11px] text-slate-400 mt-1">Default test passkey: <code className="text-[#C6922D]">EmergencyAdminPass#2026</code></p>
              </div>

              <div className="pt-3">
                <button
                  type="submit"
                  disabled={adminLoading}
                  className="w-full py-2.5 bg-[#C6922D] hover:bg-[#d8a339] text-[#071A2F] text-xs font-bold uppercase tracking-wider rounded-lg transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {adminLoading ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>Verifying Cryptographic Credentials...</span>
                    </>
                  ) : (
                    <>
                      <Key className="w-4 h-4" />
                      <span>Authenticate & Enter Workspace</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="py-4 px-6 text-center text-xs text-slate-500 border-t border-white/5">
        LDL Dhenze Residential Building Construction • Institutional Security Architecture • Republic of the Philippines
      </footer>
    </div>
  );
};
