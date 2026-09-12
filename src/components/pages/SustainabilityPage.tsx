import React from 'react';
import {
  Sun,
  BatteryCharging,
  Leaf,
  Droplets,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
} from 'lucide-react';

interface SustainabilityPageProps {
  onNavigate: (view: string) => void;
}

export const SustainabilityPage: React.FC<SustainabilityPageProps> = ({ onNavigate }) => {
  return (
    <div className="min-h-screen bg-[#071A2F] text-slate-100 pt-32 pb-24 px-4 blueprint-grid">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#237A3B] mb-3 font-['Montserrat']">
            <Leaf className="w-4 h-4 text-emerald-400" />
            <span>Ecological & Energy Engineering</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-white font-['Montserrat'] tracking-tight">
            Sustainability & Renewable Infrastructure
          </h1>
          <p className="text-sm sm:text-base text-slate-300 mt-4 leading-relaxed">
            Integrating clean energy generation, intelligent microgrids, high-performance building envelopes, and water stewardship under the Renewable Energy Act of 2008 (Republic Act No. 9513).
          </p>
        </div>

        {/* Corporate Verification Gate Notice */}
        <div className="bg-[#0b2545] border-2 border-[#237A3B]/40 rounded-2xl p-5 mb-12 flex items-start gap-4">
          <div className="w-9 h-9 rounded-xl bg-[#237A3B]/20 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-300">
              Mandatory Engineering Verification Gate
            </h3>
            <p className="text-xs text-slate-300 mt-1 leading-relaxed">
              LDL Dhenze strictly prohibits speculative or unverified environmental claims. All solar photovoltaic yields, carbon offset calculations, and energy savings percentages are published only following formal commissioning tests and administrator sign-off.
            </p>
          </div>
        </div>

        {/* 4 Pillars of Clean Infrastructure */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div className="bg-[#09223d] border border-white/10 rounded-2xl p-6 sm:p-8">
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 mb-6">
              <Sun className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">
              Solar Photovoltaic Systems (RA 9513)
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed mb-4">
              Engineered rooftop arrays, ground-mounted fields, and Building-Integrated Photovoltaics (BIPV) compliant with Philippine Distribution Code and net-metering rules.
            </p>
            <div className="space-y-2 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#C6922D]" />
                <span>Tier-1 Monocrystalline PERC & TopCon Modules</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#C6922D]" />
                <span>Grid-Tied & Islanded Hybrid Inverters</span>
              </div>
            </div>
          </div>

          <div className="bg-[#09223d] border border-white/10 rounded-2xl p-6 sm:p-8">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-6">
              <BatteryCharging className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">
              Battery Energy Storage Systems (BESS)
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed mb-4">
              Lithium Iron Phosphate (LFP) energy storage for peak shaving, emergency backup, and microgrid autonomy in industrial and remote agro-developments.
            </p>
            <div className="space-y-2 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Modular C&I Battery Enclosures with Aerosol Fire Suppression</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Sub-cycle Automatic Transfer Switching (ATS)</span>
              </div>
            </div>
          </div>

          <div className="bg-[#09223d] border border-white/10 rounded-2xl p-6 sm:p-8">
            <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400 mb-6">
              <Droplets className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">
              Water Stewardship & MBBR STPs
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed mb-4">
              Decentralized sewage treatment plants (STP) using Moving Bed Biofilm Reactor (MBBR) technology meeting DENR Administrative Order DAO 2016-08 effluent standards.
            </p>
            <div className="space-y-2 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-400" />
                <span>Non-potable Flush & Landscape Irrigation Recycling</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-400" />
                <span>Integrated Rainwater Cisterns & Storm Detention Basins</span>
              </div>
            </div>
          </div>

          <div className="bg-[#09223d] border border-white/10 rounded-2xl p-6 sm:p-8">
            <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400 mb-6">
              <Leaf className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">
              Passive Envelope & Low-Embodied Carbon
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed mb-4">
              Building orientation tailored to Philippine sun paths and prevailing monsoon winds (Amihan and Habagat) to drastically cut active HVAC cooling loads.
            </p>
            <div className="space-y-2 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-purple-400" />
                <span>Low-E Insulated Glazing and Thermal Break Framing</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-purple-400" />
                <span>PNS Compliant Pozzolan Fly-Ash Blended Cement</span>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="bg-[#0b284c] border border-[#C6922D]/30 rounded-3xl p-8 text-center max-w-3xl mx-auto">
          <h3 className="text-xl font-bold text-white mb-2">
            Inquire About Green Infrastructure Integration
          </h3>
          <p className="text-xs text-slate-300 max-w-xl mx-auto mb-6">
            Our project engineering team can model solar yields, energy storage requirements, and wastewater recycling schemes for your upcoming commercial or residential development.
          </p>
          <button
            onClick={() => onNavigate('start-project')}
            className="px-6 py-3 bg-[#C6922D] hover:bg-[#d8a339] text-[#071A2F] font-bold text-xs uppercase tracking-wider rounded-lg shadow inline-flex items-center gap-2"
          >
            <span>Initiate Sustainability Assessment</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
