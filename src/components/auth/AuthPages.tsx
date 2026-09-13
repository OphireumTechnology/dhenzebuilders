import React, { useState } from 'react';
import { ShieldCheck, Lock, Mail, Key, ArrowRight, CheckCircle2, AlertCircle, RefreshCw } from 'lucide-react';
import { UserRole } from '../../types';

interface AuthPagesProps {
  mode: 'login' | 'forgot-password' | 'verify-email';
  onNavigate: (view: string) => void;
  currentUserRole: UserRole;
  onChangeUserRole: (role: UserRole) => void;
}

export const AuthPages: React.FC<AuthPagesProps> = ({
  mode,
  onNavigate,
  currentUserRole,
  onChangeUserRole,
}) => {
  const [email, setEmail] = useState('client@angelesholding.ph');
  const [password, setPassword] = useState('••••••••••••');
  const [invitationCode, setInvitationCode] = useState('');
  const [referralCode, setReferralCode] = useState('DHENZE-CLARK-2026');
  const [mfaCode, setMfaCode] = useState('');
  const [mfaRequired, setMfaRequired] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      // If client or admin, simulate MFA step-up
      if (['SYSTEM_ADMIN', 'EXECUTIVE_APPROVER', 'ACTIVE_CLIENT', 'VERIFIED_CLIENT'].includes(currentUserRole) && !mfaRequired) {
        setMfaRequired(true);
        setStatusMessage('Two-Factor Authentication required for high-tier organization profile. Enter your 6-digit security key.');
        return;
      }

      // Successful login redirect based on role
      if (['SUPPLIER_ADMIN', 'SUPPLIER_CATALOG_MANAGER', 'SUPPLIER_BIDDER', 'SUPPLIER_FINANCE_USER'].includes(currentUserRole)) {
        onNavigate('/portal/supplier/overview');
      } else if (['PARTNER_ADMIN', 'PARTNER_BID_MANAGER', 'PARTNER_PROJECT_USER'].includes(currentUserRole)) {
        onNavigate('/portal/partner/overview');
      } else if (['PROJECT_MANAGER', 'CONSTRUCTION_MANAGER', 'PROCUREMENT_OFFICER', 'QUANTITY_SURVEYOR', 'FINANCE_OFFICER', 'DOCUMENT_CONTROLLER', 'COMPLIANCE_REVIEWER', 'EXECUTIVE_APPROVER', 'SYSTEM_ADMIN', 'SECURITY_ADMIN', 'AUDITOR'].includes(currentUserRole)) {
        onNavigate('/operations/overview');
      } else {
        onNavigate('/portal/client/overview');
      }
    }, 400);
  };

  const handleMfaSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!mfaCode || mfaCode.length < 4) {
      setErrorMessage('Please enter a valid 6-digit verification code.');
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      if (['PROJECT_MANAGER', 'COMPLIANCE_REVIEWER', 'SYSTEM_ADMIN', 'EXECUTIVE_APPROVER'].includes(currentUserRole)) {
        onNavigate('/operations/overview');
      } else {
        onNavigate('/portal/client/overview');
      }
    }, 400);
  };

  const handleForgotPassword = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStatusMessage(`Password recovery link securely dispatched to ${email}. If the address is verified, follow the instructions in the email.`);
    }, 500);
  };

  const handleVerifyEmail = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStatusMessage('Email address verified successfully. Your tenant credentials are now fully active.');
      setTimeout(() => onNavigate('/portal/client/overview'), 1200);
    }, 500);
  };

  return (
    <div className="min-h-screen bg-[#071A2F] text-slate-100 flex items-center justify-center py-20 px-4 sm:px-6 lg:px-8 blueprint-grid">
      <div className="max-w-md w-full bg-[#0c223c]/90 border border-slate-800 rounded-2xl p-8 shadow-2xl backdrop-blur-md">
        {/* Brand Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-[#C6922D]/10 border border-[#C6922D]/30 text-[#C6922D] mb-4">
            <Lock className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-serif text-white tracking-tight">
            LDL DHENZE PRIVATE WORKSPACE
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Authenticated Access Gateway & Enterprise Tenant Security
          </p>
        </div>

        {/* Status or Error Notifications */}
        {errorMessage && (
          <div className="mb-6 p-3 rounded-lg bg-red-950/50 border border-red-800 text-red-300 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
            <span>{errorMessage}</span>
          </div>
        )}

        {statusMessage && (
          <div className="mb-6 p-3 rounded-lg bg-emerald-950/50 border border-emerald-800 text-emerald-300 text-xs flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
            <span>{statusMessage}</span>
          </div>
        )}

        {/* View Mode Switcher */}
        {mode === 'login' && !mfaRequired && (
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs uppercase tracking-wider text-slate-400 font-semibold mb-1">
                Corporate or Personal Email
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full bg-[#071A2F] border border-slate-700 rounded-lg pl-9 pr-3 py-2 text-sm text-white focus:outline-none focus:border-[#C6922D]"
                  placeholder="name@organization.ph"
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="block text-xs uppercase tracking-wider text-slate-400 font-semibold">
                  Encrypted Password
                </label>
                <button
                  type="button"
                  onClick={() => onNavigate('/forgot-password')}
                  className="text-xs text-[#C6922D] hover:underline"
                >
                  Forgot?
                </button>
              </div>
              <div className="relative">
                <Key className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full bg-[#071A2F] border border-slate-700 rounded-lg pl-9 pr-3 py-2 text-sm text-white focus:outline-none focus:border-[#C6922D]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider text-slate-400 font-semibold mb-1">
                Invitation / Referral Code (If New Registration)
              </label>
              <input
                type="text"
                value={referralCode}
                onChange={(e) => setReferralCode(e.target.value)}
                className="w-full bg-[#071A2F] border border-slate-700 rounded-lg px-3 py-2 text-xs text-amber-300 font-mono focus:outline-none focus:border-[#C6922D]"
                placeholder="Optional referral key"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 py-2.5 px-4 rounded-lg bg-[#C6922D] hover:bg-[#dfad4b] text-slate-950 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-colors disabled:opacity-50"
            >
              {loading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Lock className="w-4 h-4" />}
              <span>Authenticate & Enter Portal</span>
            </button>
          </form>
        )}

        {/* MFA Step */}
        {mode === 'login' && mfaRequired && (
          <form onSubmit={handleMfaSubmit} className="space-y-4">
            <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-lg text-xs text-amber-300">
              High-privilege account detected. Please enter the 6-digit TOTP code generated by your authenticator app.
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider text-slate-400 font-semibold mb-1">
                Security Passcode
              </label>
              <input
                type="text"
                maxLength={6}
                value={mfaCode}
                onChange={(e) => setMfaCode(e.target.value.replace(/\D/g, ''))}
                required
                className="w-full bg-[#071A2F] border border-slate-700 rounded-lg px-4 py-3 text-center text-lg tracking-widest text-white font-mono focus:outline-none focus:border-[#C6922D]"
                placeholder="000000"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 px-4 rounded-lg bg-[#C6922D] hover:bg-[#dfad4b] text-slate-950 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-colors disabled:opacity-50"
            >
              {loading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <ShieldCheck className="w-4 h-4" />}
              <span>Verify & Complete Login</span>
            </button>
          </form>
        )}

        {/* Forgot Password Mode */}
        {mode === 'forgot-password' && (
          <form onSubmit={handleForgotPassword} className="space-y-4">
            <p className="text-xs text-slate-300 leading-relaxed">
              Enter your registered corporate email address. We will verify your tenant association and issue a cryptographic single-use reset token.
            </p>

            <div>
              <label className="block text-xs uppercase tracking-wider text-slate-400 font-semibold mb-1">
                Registered Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-[#071A2F] border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-[#C6922D]"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 px-4 rounded-lg bg-[#C6922D] hover:bg-[#dfad4b] text-slate-950 font-bold text-xs uppercase tracking-wider transition-colors disabled:opacity-50"
            >
              Send Secure Reset Link
            </button>

            <div className="text-center pt-2">
              <button
                type="button"
                onClick={() => onNavigate('/login')}
                className="text-xs text-slate-400 hover:text-white"
              >
                ← Return to Login
              </button>
            </div>
          </form>
        )}

        {/* Verify Email Mode */}
        {mode === 'verify-email' && (
          <form onSubmit={handleVerifyEmail} className="space-y-4">
            <p className="text-xs text-slate-300 leading-relaxed">
              A verification dispatch was routed to your inbox. Click below to simulate instant confirmation of token authenticity.
            </p>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 px-4 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
            >
              <CheckCircle2 className="w-4 h-4" /> Confirm Email Verification
            </button>
          </form>
        )}

        {/* Role Persona Switcher for Quick Validation */}
        <div className="mt-8 pt-6 border-t border-slate-800">
          <label className="block text-[11px] uppercase tracking-wider text-slate-500 font-bold mb-2">
            Switch Verified Persona for Testing
          </label>
          <div className="grid grid-cols-2 gap-1.5 text-xs">
            <button
              type="button"
              onClick={() => {
                onChangeUserRole('ACTIVE_CLIENT');
                setEmail('client@angelesholding.ph');
              }}
              className={`p-1.5 rounded border text-left truncate transition-colors ${
                currentUserRole === 'ACTIVE_CLIENT' || currentUserRole === 'VERIFIED_CLIENT'
                  ? 'border-[#C6922D] bg-[#C6922D]/10 text-[#C6922D]'
                  : 'border-slate-800 text-slate-400 hover:bg-slate-800'
              }`}
            >
              Active Client
            </button>
            <button
              type="button"
              onClick={() => {
                onChangeUserRole('SUPPLIER_ADMIN');
                setEmail('sales@luzonsteelmills.ph');
              }}
              className={`p-1.5 rounded border text-left truncate transition-colors ${
                currentUserRole === 'SUPPLIER_ADMIN'
                  ? 'border-[#C6922D] bg-[#C6922D]/10 text-[#C6922D]'
                  : 'border-slate-800 text-slate-400 hover:bg-slate-800'
              }`}
            >
              Supplier Admin
            </button>
            <button
              type="button"
              onClick={() => {
                onChangeUserRole('PARTNER_ADMIN');
                setEmail('bidding@clearthmovers.com.ph');
              }}
              className={`p-1.5 rounded border text-left truncate transition-colors ${
                currentUserRole === 'PARTNER_ADMIN'
                  ? 'border-[#C6922D] bg-[#C6922D]/10 text-[#C6922D]'
                  : 'border-slate-800 text-slate-400 hover:bg-slate-800'
              }`}
            >
              Partner / Bidder
            </button>
            <button
              type="button"
              onClick={() => {
                onChangeUserRole('PROJECT_MANAGER');
                setEmail('pm@dhenzebuilder.com');
              }}
              className={`p-1.5 rounded border text-left truncate transition-colors ${
                currentUserRole === 'PROJECT_MANAGER'
                  ? 'border-[#C6922D] bg-[#C6922D]/10 text-[#C6922D]'
                  : 'border-slate-800 text-slate-400 hover:bg-slate-800'
              }`}
            >
              Project Manager
            </button>
            <button
              type="button"
              onClick={() => {
                onChangeUserRole('COMPLIANCE_REVIEWER');
                setEmail('compliance@dhenzebuilder.com');
              }}
              className={`p-1.5 rounded border text-left truncate transition-colors ${
                currentUserRole === 'COMPLIANCE_REVIEWER'
                  ? 'border-[#C6922D] bg-[#C6922D]/10 text-[#C6922D]'
                  : 'border-slate-800 text-slate-400 hover:bg-slate-800'
              }`}
            >
              Compliance Reviewer
            </button>
            <button
              type="button"
              onClick={() => {
                onChangeUserRole('SYSTEM_ADMIN');
                setEmail('admin@dhenzebuilder.com');
              }}
              className={`p-1.5 rounded border text-left truncate transition-colors ${
                currentUserRole === 'SYSTEM_ADMIN'
                  ? 'border-[#C6922D] bg-[#C6922D]/10 text-[#C6922D]'
                  : 'border-slate-800 text-slate-400 hover:bg-slate-800'
              }`}
            >
              System Admin
            </button>
          </div>
        </div>

        {/* Back to Public Site */}
        <div className="text-center mt-6">
          <button
            type="button"
            onClick={() => onNavigate('/')}
            className="text-xs text-slate-400 hover:text-white"
          >
            ← Back to Public Website
          </button>
        </div>
      </div>
    </div>
  );
};
