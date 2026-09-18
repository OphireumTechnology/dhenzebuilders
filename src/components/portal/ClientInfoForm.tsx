import React, { useState } from 'react';
import {
  Building2,
  ShieldCheck,
  FileText,
  Mail,
  Phone,
  MapPin,
  Save,
  CheckCircle2,
  Upload,
  User,
  AlertCircle,
  Briefcase,
  Hash,
} from 'lucide-react';
import { ClientProfile } from '../../types/clientPortal';

interface ClientInfoFormProps {
  initialProfile?: ClientProfile;
  onSave?: (profile: ClientProfile) => void;
  portalTheme?: 'dark' | 'light';
}

const DEFAULT_PROFILE: ClientProfile = {
  id: 'ORG-CL-001',
  organizationName: 'Angeles Villa Holdings Group',
  tradeName: 'Angeles Villas',
  clientType: 'PRIVATE_DEVELOPER',
  authorizedRepresentative: {
    fullName: 'Don Eduardo Miranda',
    designation: 'Managing Director & Principal Trustee',
    email: 'e.miranda@angelesholdings.ph',
    phone: '+63 917 888 7766',
    idType: 'PASSPORT',
    idNumber: 'P8921045B',
  },
  taxIdentificationNumber: '402-881-992-000',
  secOrDtiRegistrationNumber: 'CS202100892',
  officialAddress: {
    street: 'Executive Tower 2, Penthouse Level, Clark Global City',
    barangay: 'Mabalacat',
    city: 'Angeles / Clark',
    province: 'Pampanga',
    postalCode: '2009',
  },
  preferredProcurementMethod: 'EPC_DESIGN_BUILD',
  authorizationDocumentType: 'BOARD_RESOLUTION',
  verificationStatus: 'VERIFIED',
  updatedAt: '2026-09-18T10:00:00Z',
};

export const ClientInfoForm: React.FC<ClientInfoFormProps> = ({
  initialProfile = DEFAULT_PROFILE,
  onSave,
  portalTheme = 'dark',
}) => {
  const [profile, setProfile] = useState<ClientProfile>(initialProfile);
  const [saveSuccess, setSaveSuccess] = useState<boolean>(false);

  const isLight = portalTheme === 'light';
  const cardBg = isLight ? 'bg-white border-slate-200 text-slate-900 shadow-sm' : 'bg-[#09223d] border-white/10 text-slate-100';
  const inputBg = isLight ? 'bg-slate-50 border-slate-300 text-slate-900' : 'bg-[#051322] border-white/10 text-white';

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const updated = { ...profile, updatedAt: new Date().toISOString() };
    setProfile(updated);
    if (onSave) onSave(updated);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3500);
  };

  return (
    <form onSubmit={handleSave} className="space-y-6">
      {/* Top Banner */}
      <div className={`p-6 sm:p-8 rounded-3xl border ${cardBg}`}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-950 text-emerald-300 border border-emerald-800">
                {profile.verificationStatus}
              </span>
              <span className="text-xs text-slate-400 font-mono">CLIENT ENTITY RECORD</span>
            </div>
            <h2 className="text-2xl font-bold text-white mt-1">Client Profile & Organization Information</h2>
            <p className="text-xs text-slate-300 mt-1 max-w-2xl">
              This official client record provides the legal and commercial identity attached to your project tender
              packages, billing certificates, and contractor procurement agreements.
            </p>
          </div>

          <button
            type="submit"
            className="px-5 py-2.5 rounded-xl bg-[#C6922D] hover:bg-[#d8a339] text-[#071A2F] font-bold text-xs uppercase tracking-wider flex items-center gap-2 transition-all shadow-md shrink-0"
          >
            <Save className="w-4 h-4" />
            <span>Save Profile</span>
          </button>
        </div>

        {saveSuccess && (
          <div className="mt-4 p-3 rounded-xl bg-emerald-950/80 border border-emerald-500 text-emerald-200 text-xs flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Client organization details updated successfully!</span>
          </div>
        )}
      </div>

      {/* Grid: 2 Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Organization Identity */}
        <div className={`p-6 rounded-3xl border ${cardBg} space-y-4`}>
          <div className="flex items-center gap-2 text-[#C6922D] pb-2 border-b border-white/10">
            <Building2 className="w-4 h-4" />
            <h3 className="text-sm font-bold uppercase tracking-wider text-white">Entity Legal Details</h3>
          </div>

          <div className="space-y-3 text-xs">
            <div>
              <label className="block font-semibold uppercase text-slate-300 mb-1">
                Client Organization / Legal Name
              </label>
              <input
                type="text"
                required
                value={profile.organizationName}
                onChange={(e) => setProfile({ ...profile, organizationName: e.target.value })}
                className={`w-full p-2.5 rounded-xl border ${inputBg}`}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block font-semibold uppercase text-slate-300 mb-1">Trade Name / DBA</label>
                <input
                  type="text"
                  value={profile.tradeName || ''}
                  onChange={(e) => setProfile({ ...profile, tradeName: e.target.value })}
                  className={`w-full p-2.5 rounded-xl border ${inputBg}`}
                />
              </div>

              <div>
                <label className="block font-semibold uppercase text-slate-300 mb-1">Client Entity Type</label>
                <select
                  value={profile.clientType}
                  onChange={(e) => setProfile({ ...profile, clientType: e.target.value as any })}
                  className={`w-full p-2.5 rounded-xl border ${inputBg}`}
                >
                  <option value="INDIVIDUAL_LANDOWNER">Individual Landowner / Estate Owner</option>
                  <option value="PRIVATE_DEVELOPER">Private Property Developer</option>
                  <option value="CORPORATE_ENTERPRISE">Corporate Enterprise / Holding Co.</option>
                  <option value="INSTITUTIONAL">Institutional / Foundation</option>
                  <option value="GOVERNMENT_LGU">Local Government / Public Entity</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block font-semibold uppercase text-slate-300 mb-1">
                  SEC / DTI Registration No.
                </label>
                <div className="relative">
                  <Hash className="w-3.5 h-3.5 absolute left-3 top-3 text-slate-500" />
                  <input
                    type="text"
                    value={profile.secOrDtiRegistrationNumber}
                    onChange={(e) => setProfile({ ...profile, secOrDtiRegistrationNumber: e.target.value })}
                    className={`w-full p-2.5 pl-8 rounded-xl border font-mono ${inputBg}`}
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold uppercase text-slate-300 mb-1">BIR Tax ID (TIN)</label>
                <div className="relative">
                  <Hash className="w-3.5 h-3.5 absolute left-3 top-3 text-slate-500" />
                  <input
                    type="text"
                    value={profile.taxIdentificationNumber}
                    onChange={(e) => setProfile({ ...profile, taxIdentificationNumber: e.target.value })}
                    className={`w-full p-2.5 pl-8 rounded-xl border font-mono ${inputBg}`}
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block font-semibold uppercase text-slate-300 mb-1">Registered Official Address</label>
              <input
                type="text"
                value={profile.officialAddress.street}
                placeholder="Street / Building"
                onChange={(e) =>
                  setProfile({
                    ...profile,
                    officialAddress: { ...profile.officialAddress, street: e.target.value },
                  })
                }
                className={`w-full p-2.5 rounded-xl border mb-2 ${inputBg}`}
              />
              <div className="grid grid-cols-3 gap-2">
                <input
                  type="text"
                  placeholder="City"
                  value={profile.officialAddress.city}
                  onChange={(e) =>
                    setProfile({
                      ...profile,
                      officialAddress: { ...profile.officialAddress, city: e.target.value },
                    })
                  }
                  className={`w-full p-2 rounded-xl border text-xs ${inputBg}`}
                />
                <input
                  type="text"
                  placeholder="Province"
                  value={profile.officialAddress.province}
                  onChange={(e) =>
                    setProfile({
                      ...profile,
                      officialAddress: { ...profile.officialAddress, province: e.target.value },
                    })
                  }
                  className={`w-full p-2 rounded-xl border text-xs ${inputBg}`}
                />
                <input
                  type="text"
                  placeholder="Postal Code"
                  value={profile.officialAddress.postalCode}
                  onChange={(e) =>
                    setProfile({
                      ...profile,
                      officialAddress: { ...profile.officialAddress, postalCode: e.target.value },
                    })
                  }
                  className={`w-full p-2 rounded-xl border text-xs ${inputBg}`}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Authorized Representative & Legal Signatory */}
        <div className={`p-6 rounded-3xl border ${cardBg} space-y-4`}>
          <div className="flex items-center gap-2 text-[#C6922D] pb-2 border-b border-white/10">
            <User className="w-4 h-4" />
            <h3 className="text-sm font-bold uppercase tracking-wider text-white">Authorized Signatory & Representative</h3>
          </div>

          <div className="space-y-3 text-xs">
            <div>
              <label className="block font-semibold uppercase text-slate-300 mb-1">
                Authorized Signatory Full Name
              </label>
              <input
                type="text"
                required
                value={profile.authorizedRepresentative.fullName}
                onChange={(e) =>
                  setProfile({
                    ...profile,
                    authorizedRepresentative: { ...profile.authorizedRepresentative, fullName: e.target.value },
                  })
                }
                className={`w-full p-2.5 rounded-xl border ${inputBg}`}
              />
            </div>

            <div>
              <label className="block font-semibold uppercase text-slate-300 mb-1">Official Designation / Title</label>
              <input
                type="text"
                value={profile.authorizedRepresentative.designation}
                onChange={(e) =>
                  setProfile({
                    ...profile,
                    authorizedRepresentative: { ...profile.authorizedRepresentative, designation: e.target.value },
                  })
                }
                className={`w-full p-2.5 rounded-xl border ${inputBg}`}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block font-semibold uppercase text-slate-300 mb-1">Official Email</label>
                <div className="relative">
                  <Mail className="w-3.5 h-3.5 absolute left-3 top-3 text-slate-500" />
                  <input
                    type="email"
                    required
                    value={profile.authorizedRepresentative.email}
                    onChange={(e) =>
                      setProfile({
                        ...profile,
                        authorizedRepresentative: { ...profile.authorizedRepresentative, email: e.target.value },
                      })
                    }
                    className={`w-full p-2.5 pl-8 rounded-xl border ${inputBg}`}
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold uppercase text-slate-300 mb-1">Contact Phone</label>
                <div className="relative">
                  <Phone className="w-3.5 h-3.5 absolute left-3 top-3 text-slate-500" />
                  <input
                    type="tel"
                    required
                    value={profile.authorizedRepresentative.phone}
                    onChange={(e) =>
                      setProfile({
                        ...profile,
                        authorizedRepresentative: { ...profile.authorizedRepresentative, phone: e.target.value },
                      })
                    }
                    className={`w-full p-2.5 pl-8 rounded-xl border font-mono ${inputBg}`}
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block font-semibold uppercase text-slate-300 mb-1">Government ID Type</label>
                <select
                  value={profile.authorizedRepresentative.idType}
                  onChange={(e) =>
                    setProfile({
                      ...profile,
                      authorizedRepresentative: { ...profile.authorizedRepresentative, idType: e.target.value as any },
                    })
                  }
                  className={`w-full p-2.5 rounded-xl border ${inputBg}`}
                >
                  <option value="PASSPORT">Philippine / Foreign Passport</option>
                  <option value="PRC_LICENSE">PRC Professional ID</option>
                  <option value="UMID">Unified Multi-Purpose ID (UMID)</option>
                  <option value="DRIVERS_LICENSE">LTO Driver's License</option>
                  <option value="NATIONAL_ID">PhilSys National ID</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold uppercase text-slate-300 mb-1">ID Number</label>
                <input
                  type="text"
                  value={profile.authorizedRepresentative.idNumber}
                  onChange={(e) =>
                    setProfile({
                      ...profile,
                      authorizedRepresentative: { ...profile.authorizedRepresentative, idNumber: e.target.value },
                    })
                  }
                  className={`w-full p-2.5 rounded-xl border font-mono ${inputBg}`}
                />
              </div>
            </div>

            <div>
              <label className="block font-semibold uppercase text-slate-300 mb-1">
                Legal Authorization Document
              </label>
              <select
                value={profile.authorizationDocumentType}
                onChange={(e) => setProfile({ ...profile, authorizationDocumentType: e.target.value as any })}
                className={`w-full p-2.5 rounded-xl border ${inputBg}`}
              >
                <option value="BOARD_RESOLUTION">Board Resolution with Corporate Secretary Certificate</option>
                <option value="SPECIAL_POWER_OF_ATTORNEY">Notarized Special Power of Attorney (SPA)</option>
                <option value="DIRECT_OWNER">Direct Titled Landowner Sole Signatory</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};
