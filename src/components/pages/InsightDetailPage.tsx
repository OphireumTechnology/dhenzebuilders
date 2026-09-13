import React from 'react';
import { ArrowLeft, Clock, Calendar, User, Share2, BookOpen } from 'lucide-react';

interface InsightDetailPageProps {
  articleSlug: string;
  onNavigate: (view: string) => void;
}

export const InsightDetailPage: React.FC<InsightDetailPageProps> = ({ articleSlug, onNavigate }) => {
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
      paragraphs: [
        'The Philippine construction landscape operates under strict professional practice statutes designed to safeguard life, property, and public welfare. Under Republic Act No. 9266 (The Architecture Act of 2004), only registered and licensed architects are authorized to practice architecture, prepare, sign, and seal architectural documents. In parallel, the Civil Engineering Law (Republic Act No. 544, as amended) delineates the design of structural frames, foundations, and civil infrastructure.',
        'At LDL Dhenze Residential Building Construction, our operational philosophy adheres strictly to statutory mandates. Every architectural design, conceptual floor layout, and construction submittal is developed under the direct supervision and seal of a duly licensed Philippine Architect. Structural calculations, foundation design, and civil drainage works are executed exclusively by licensed Civil and Structural Engineers.',
        'Integrated project delivery brings these disciplines together from Day 1 to eliminate costly design revisions and ensure seamless Local Government Unit (LGU) building permit issuance. By bridging geodetic boundary verifications with structural response spectrum calculations before site mobilization, property owners avoid the multi-month delay traps that plague fragmented procurement approaches.',
      ],
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
      paragraphs: [
        'Rising utility tariffs and peak demand charges make on-site solar generation and battery energy storage essential for commercial competitiveness. Under the Renewable Energy Act of 2008 (Republic Act No. 9513), commercial and agro-industrial facilities can implement grid-tied solar photovoltaic systems to offset daytime operating loads.',
        'Key engineering parameters evaluated by LDL Dhenze include the structural load capacity of roof framing to support PV module arrays and racking; integration of Tier-1 TopCon solar modules with high temperature coefficients suitable for Philippine tropical climates; Lithium Iron Phosphate (LFP) Battery Energy Storage Systems (BESS) designed for peak shaving and seamless critical-circuit islanding during grid interruptions; and full compliance with Department of Energy (DOE) guidelines and Distribution Code interconnection standards.',
      ],
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
      paragraphs: [
        'Jobsite health and safety in the Philippines is governed by DOLE Department Order No. 13 series of 1998 and the Occupational Safety and Health Standards (OSHS). LDL Dhenze enforces daily pre-shift toolbox meetings, 100% harness hook-off rules for work at heights exceeding 2.0 meters, and accredited Safety Officers on every active site.',
        'Far from impeding progress, systematic hazard identification decreases unexpected work stoppages, lowers insurance liability, and ensures that trades execute with precision and focus.',
      ],
    },
  ];

  const article = articles.find(
    (a) => a.id === articleSlug || a.title.toLowerCase().replace(/\s+/g, '-').includes(articleSlug.toLowerCase())
  ) || articles[0];

  return (
    <div className="min-h-screen bg-[#071A2F] text-slate-100 pt-28 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <button
          onClick={() => onNavigate('/insights')}
          className="inline-flex items-center text-xs tracking-wider uppercase text-[#C6922D] hover:text-[#dfad4b] mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to Executive Insights
        </button>

        <div className="border-b border-slate-800 pb-8 mb-8">
          <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400 mb-4">
            <span className="px-2.5 py-1 rounded bg-[#C6922D]/10 text-[#C6922D] border border-[#C6922D]/30 font-medium">
              {article.category}
            </span>
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-slate-400" /> {article.date}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-slate-400" /> {article.readTime}
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-serif text-white tracking-tight leading-tight mb-4">
            {article.title}
          </h1>

          <p className="text-sm sm:text-base text-slate-300 font-medium border-l-2 border-[#C6922D] pl-4 py-1">
            {article.summary}
          </p>

          <div className="flex items-center gap-2 mt-6 text-xs text-slate-400">
            <User className="w-4 h-4 text-[#C6922D]" />
            <span>Published by: <strong className="text-slate-200">{article.author}</strong></span>
          </div>
        </div>

        {/* Article Body */}
        <div className="space-y-6 text-base text-slate-300 leading-relaxed font-sans">
          {article.paragraphs.map((p, idx) => (
            <p key={idx}>{p}</p>
          ))}
        </div>

        {/* Back and Consultation CTA */}
        <div className="mt-12 pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <button
            onClick={() => onNavigate('/insights')}
            className="text-xs tracking-wider uppercase text-slate-400 hover:text-white"
          >
            ← Back to All Insights
          </button>
          <button
            onClick={() => onNavigate('/portal/client/consultation')}
            className="px-5 py-2.5 rounded-lg bg-[#C6922D] hover:bg-[#dfad4b] text-slate-950 font-semibold text-xs tracking-wider uppercase transition-colors"
          >
            Schedule Consultation with Advisory Team
          </button>
        </div>
      </div>
    </div>
  );
};
