import React, { useState } from 'react';
import {
  FileText,
  Clock,
  ArrowRight,
  ShieldCheck,
  ChevronRight,
  BookOpen,
} from 'lucide-react';

interface InsightsPageProps {
  onNavigate: (view: string) => void;
}

export const InsightsPage: React.FC<InsightsPageProps> = ({ onNavigate }) => {
  const articles = [
    {
      id: 'art-01',
      title: 'Navigating Republic Act 9266 & Civil Engineering Coordination in Philippine Construction',
      category: 'Regulatory Compliance',
      date: 'May 2025',
      readTime: '6 min read',
      author: 'LDL Dhenze Engineering & Compliance Advisory',
      summary:
        'A comprehensive review of the statutory requirements governing architectural plans, structural certifications, and DPWH building permit approvals in the Philippines.',
      content: `The Philippine construction landscape operates under strict professional practice statutes designed to safeguard life, property, and public welfare. 
Under Republic Act No. 9266 (The Architecture Act of 2004), only registered and licensed architects are authorized to practice architecture, prepare, sign, and seal architectural documents. In parallel, the Civil Engineering Law (Republic Act No. 544, as amended) delineates the design of structural frames, foundations, and civil infrastructure.

At LDL Dhenze Residential Building Construction, our operational philosophy adheres strictly to statutory mandates:
1. Every architectural design, conceptual floor layout, and construction submittal is developed under the direct supervision and seal of a duly licensed Philippine Architect.
2. Structural calculations, foundation design, and civil drainage works are executed exclusively by licensed Civil and Structural Engineers.
3. Integrated project delivery brings these disciplines together from Day 1 to eliminate costly design revisions and ensure seamless Local Government Unit (LGU) building permit issuance.`,
    },
    {
      id: 'art-02',
      title: 'Commercial Solar PV & Battery Energy Storage (BESS) Under Republic Act 9513',
      category: 'Renewable Energy',
      date: 'April 2025',
      readTime: '8 min read',
      author: 'LDL Dhenze Sustainable Solutions Desk',
      summary:
        'Technical considerations for sizing rooftop solar PV and lithium battery storage systems for commercial and agro-industrial facilities in Central Luzon.',
      content: `Rising utility tariffs and peak demand charges make on-site solar generation and battery energy storage essential for commercial competitiveness.
Under the Renewable Energy Act of 2008 (Republic Act No. 9513), commercial and agro-industrial facilities can implement grid-tied solar photovoltaic systems to offset daytime operating loads.

Key engineering parameters evaluated by LDL Dhenze:
- Structural load capacity of roof framing to support PV module arrays and racking.
- Integration of Tier-1 TopCon solar modules with high temperature coefficients suitable for Philippine tropical climates.
- Lithium Iron Phosphate (LFP) Battery Energy Storage Systems (BESS) designed for peak shaving and seamless critical-circuit islanding during grid interruptions.
- Full compliance with Department of Energy (DOE) guidelines and Distribution Code interconnection standards.`,
    },
    {
      id: 'art-03',
      title: 'Adhering to DOLE Department Order No. 13: Jobsite Safety as a Competitive Asset',
      category: 'Safety & EHS',
      date: 'March 2025',
      readTime: '5 min read',
      author: 'LDL Dhenze Safety & Operations Command',
      summary:
        'How disciplined safety protocols, certified PPE, and daily toolbox hazard assessments protect workforce lives while delivering projects on schedule.',
      content: `The Department of Labor and Employment (DOLE) Department Order No. 13 establishes the mandatory Guidelines Governing Occupational Safety and Health in the Construction Industry.
Safety is not an overhead expense; it is a foundational prerequisite for operational excellence.

LDL Dhenze enforces:
1. Daily Pre-Work Toolbox Briefings addressing specific hazards of the shift.
2. Mandatory certified Personal Protective Equipment (PPE) compliant with OSHS standards.
3. Dedicated DOLE-accredited Safety Officers on all active project jobsites.
4. Pre-operation safety checklists for heavy equipment including excavators, concrete pumps, and cranes.`,
    },
  ];

  const [activeArticle, setActiveArticle] = useState<typeof articles[0] | null>(null);

  return (
    <div className="min-h-screen bg-[#071A2F] text-slate-100 pt-32 pb-24 px-4 blueprint-grid">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#C6922D] mb-3 font-['Montserrat']">
            <BookOpen className="w-4 h-4" />
            <span>Technical Briefings & Knowledge</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-white font-['Montserrat'] tracking-tight">
            Corporate Insights & Regulatory Standards
          </h1>
          <p className="text-sm sm:text-base text-slate-300 mt-4 leading-relaxed">
            Authoritative perspectives on Philippine building regulations, civil engineering best practices, green energy deployment, and integrated project delivery.
          </p>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {articles.map((art) => (
            <div
              key={art.id}
              onClick={() => setActiveArticle(art)}
              className="bg-[#09223d] border border-white/10 hover:border-[#C6922D]/40 rounded-2xl p-6 sm:p-8 cursor-pointer shadow-xl hover:-translate-y-1 transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between text-[11px] text-slate-400 mb-3">
                  <span className="font-bold text-[#C6922D] uppercase tracking-wider">
                    {art.category}
                  </span>
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    <span>{art.readTime}</span>
                  </div>
                </div>

                <h3 className="text-base font-bold text-white group-hover:text-[#C6922D] transition-colors mb-3 leading-snug">
                  {art.title}
                </h3>

                <p className="text-xs text-slate-300 leading-relaxed mb-4">
                  {art.summary}
                </p>
              </div>

              <div className="pt-4 border-t border-white/5 flex items-center justify-between text-xs text-[#C6922D] font-semibold">
                <span>Read Full Briefing</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>

        {/* Modal for Article Reading */}
        {activeArticle && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
            <div className="bg-[#09223d] border border-[#C6922D]/40 rounded-3xl p-6 sm:p-10 max-w-3xl w-full max-h-[85vh] overflow-y-auto shadow-2xl space-y-6">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <span className="text-xs font-mono font-bold text-[#C6922D] uppercase tracking-wider">
                  {activeArticle.category} • {activeArticle.date}
                </span>
                <button
                  onClick={() => setActiveArticle(null)}
                  className="text-slate-400 hover:text-white p-2"
                >
                  ✕
                </button>
              </div>

              <div>
                <h2 className="text-xl sm:text-2xl font-black text-white font-['Montserrat']">
                  {activeArticle.title}
                </h2>
                <div className="text-xs text-slate-400 mt-2">
                  Published by {activeArticle.author}
                </div>
              </div>

              <div className="text-xs sm:text-sm text-slate-300 leading-relaxed whitespace-pre-line space-y-4 pt-2 border-t border-white/5">
                {activeArticle.content}
              </div>

              <div className="pt-6 border-t border-white/10 flex justify-between items-center text-xs">
                <span className="text-slate-400 font-mono">Authoritative LDL Dhenze Content</span>
                <button
                  onClick={() => setActiveArticle(null)}
                  className="px-5 py-2 rounded-lg bg-[#C6922D] text-[#071A2F] font-bold"
                >
                  Close Briefing
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
