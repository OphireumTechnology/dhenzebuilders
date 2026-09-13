import React, { useState, useRef, useEffect } from 'react';
import { UserRole, AssistantMessage, Citation, AnswerClassification, RecommendedNextAction } from '../../types';
import {
  X,
  Send,
  Sparkles,
  ShieldCheck,
  AlertCircle,
  ExternalLink,
  RefreshCw,
  User,
  CheckCircle2,
  FileText,
  Clock,
  ArrowRight,
  Compass,
  Layers,
  Check,
} from 'lucide-react';

interface BuilderAssistantModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUserRole: UserRole;
  onChangeUserRole: (role: UserRole) => void;
  onNavigate: (view: string) => void;
}

export const BuilderAssistantModal: React.FC<BuilderAssistantModalProps> = ({
  isOpen,
  onClose,
  currentUserRole,
  onChangeUserRole,
  onNavigate,
}) => {
  const [inputQuery, setInputQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<AssistantMessage[]>([
    {
      id: 'msg-welcome',
      sender: 'assistant',
      content:
        "Welcome to LDL Dhenze Builder AI, your specialized construction and development intelligence platform.\n\nI operate under a three-layer controlled knowledge architecture: Verified Corporate Records, General Professional Construction & Engineering Guidance, and Authorized Current Technical Research.\n\nHow can I support your project feasibility, spatial planning, or development inquiries today?",
      confidence: 'Verified Answer',
      classification: AnswerClassification.VERIFIED_COMPANY_INFO,
      recommendedNextAction: RecommendedNextAction.BOOK_DISCOVERY,
      timestamp: new Date().toISOString(),
      citations: [
        {
          documentTitle: 'LDRBC Corporate Profile & Capabilities.pdf',
          section: 'Corporate Vision & Engineering Standards',
          publicationDate: 'May 14, 2025',
          lastUpdatedDate: 'May 17, 2025',
          sourceClassification: 'Public',
          url: '/about',
        },
      ],
    },
  ]);
  const [escalated, setEscalated] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  if (!isOpen) return null;

  const handleSend = async (queryToSend?: string) => {
    const query = queryToSend || inputQuery;
    if (!query.trim() || loading) return;

    const userMessage: AssistantMessage = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      content: query,
      timestamp: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, userMessage]);
    if (!queryToSend) setInputQuery('');
    setLoading(true);

    try {
      const response = await fetch('/api/assistant/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: query,
          role: currentUserRole,
        }),
      });

      const data = await response.json();

      const assistantMsg: AssistantMessage = {
        id: `msg-resp-${Date.now()}`,
        sender: 'assistant',
        content: data.content || 'No response generated.',
        confidence: data.confidence || 'Verified Answer',
        classification: data.classification,
        recommendedNextAction: data.recommendedNextAction,
        citations: data.citations || [],
        disclaimer: data.disclaimer,
        timestamp: new Date().toISOString(),
      };

      setMessages((prev) => [...prev, assistantMsg]);
    } catch (err) {
      console.error('Failed to query assistant API:', err);
      setMessages((prev) => [
        ...prev,
        {
          id: `msg-err-${Date.now()}`,
          sender: 'assistant',
          content:
            'A network communication error occurred with the Builder Assistant service. Please try again or book a consultation directly.',
          confidence: 'Information Not Found',
          timestamp: new Date().toISOString(),
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleActionClick = (action?: RecommendedNextAction) => {
    if (!action) return;
    if (action === RecommendedNextAction.EXPLORE_DESIGN_STUDIO) {
      onNavigate('design-studio');
      onClose();
    } else if (
      action === RecommendedNextAction.BOOK_DISCOVERY ||
      action === RecommendedNextAction.CONSULT_PROFESSIONAL ||
      action === RecommendedNextAction.REACH_OUT_OFFICIAL
    ) {
      onNavigate('book-consultation');
      onClose();
    } else if (action === RecommendedNextAction.PURCHASE_SUBSCRIPTION) {
      onNavigate('billing');
      onClose();
    } else {
      onNavigate('book-consultation');
      onClose();
    }
  };

  const handleEscalate = () => {
    setEscalated(true);
    setTimeout(() => {
      onNavigate('book-consultation');
      onClose();
    }, 1000);
  };

  const clearChat = () => {
    setMessages([
      {
        id: 'msg-welcome-new',
        sender: 'assistant',
        content:
          'Session refreshed. Ask any question regarding construction methods, building systems, LDL Dhenze registrations, project delivery, or concept designs.',
        confidence: 'Verified Answer',
        classification: AnswerClassification.GENERAL_GUIDANCE,
        recommendedNextAction: RecommendedNextAction.EXPLORE_DESIGN_STUDIO,
        timestamp: new Date().toISOString(),
      },
    ]);
  };

  const getClassificationBadge = (classification?: AnswerClassification) => {
    if (!classification) return null;

    let badgeStyle = 'bg-slate-800 text-slate-300 border-slate-700';
    if (classification === AnswerClassification.VERIFIED_COMPANY_INFO) {
      badgeStyle = 'bg-emerald-950/60 text-emerald-300 border-emerald-500/40';
    } else if (classification === AnswerClassification.GENERAL_GUIDANCE) {
      badgeStyle = 'bg-sky-950/60 text-sky-300 border-sky-500/40';
    } else if (classification === AnswerClassification.CURRENT_RESEARCH) {
      badgeStyle = 'bg-cyan-950/60 text-cyan-300 border-cyan-500/40';
    } else if (classification === AnswerClassification.PRELIMINARY_ANALYSIS) {
      badgeStyle = 'bg-indigo-950/60 text-indigo-300 border-indigo-500/40';
    } else if (classification === AnswerClassification.PROFESSIONAL_REVIEW_REQUIRED) {
      badgeStyle = 'bg-amber-950/60 text-amber-300 border-amber-500/40';
    } else if (classification === AnswerClassification.OUTSIDE_SCOPE) {
      badgeStyle = 'bg-rose-950/60 text-rose-300 border-rose-500/40';
    }

    return (
      <span className={`px-2 py-0.5 rounded text-[9.5px] font-mono font-bold uppercase tracking-wider border ${badgeStyle}`}>
        {classification}
      </span>
    );
  };

  const samplePrompts = [
    'What are LDL Dhenze’s verified DTI & BIR credentials?',
    'What is BIM and how does it reduce clash conflicts?',
    'What factors affect warehouse construction costs in Central Luzon?',
    'What permits are currently required for a solar farm?',
    'How does a smart-building management system work?',
    'Can you give me dating advice?',
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-[#071A2F] border border-[#C6922D]/40 rounded-2xl w-full max-w-4xl h-[90vh] max-h-[850px] shadow-2xl flex flex-col overflow-hidden relative">
        {/* Assistant Header */}
        <div className="bg-[#0a233f] border-b border-[#C6922D]/20 px-4 sm:px-6 py-3.5 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#C6922D]/20 border border-[#C6922D]/40 flex items-center justify-center text-[#C6922D]">
              <Sparkles className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-bold text-white font-['Montserrat'] tracking-wide">
                  LDL Dhenze Builder AI
                </h3>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-[#237A3B]/30 text-emerald-300 border border-[#237A3B]/50">
                  3-Layer Intelligence
                </span>
              </div>
              <p className="text-[11px] text-slate-400">
                Verified Records • Professional Guidance • Controlled Research
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Active Security Persona Selector */}
            <div className="hidden sm:flex items-center gap-1.5 bg-white/5 px-2.5 py-1 rounded-md border border-white/10 text-xs text-slate-300">
              <User className="w-3.5 h-3.5 text-[#C6922D]" />
              <span className="text-[11px] font-mono text-[#C6922D]">{currentUserRole}</span>
            </div>

            <button
              onClick={clearChat}
              title="Reset Conversation"
              className="p-2 text-slate-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
            >
              <RefreshCw className="w-4 h-4" />
            </button>

            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Knowledge Architecture Layers Banner */}
        <div className="bg-[#051322] px-4 sm:px-6 py-2 border-b border-white/5 flex items-center justify-between text-[11px] text-slate-400">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-3.5 h-3.5 text-[#C6922D]" />
            <span>Layer 1: Verified Records | Layer 2: Construction Guidance | Layer 3: Current Research</span>
          </div>
          <button
            onClick={() => {
              onNavigate('design-studio');
              onClose();
            }}
            className="font-mono text-[10px] text-[#C6922D] hover:underline flex items-center gap-1"
          >
            <Compass className="w-3 h-3" />
            <span>Open AI Design Studio</span>
          </button>
        </div>

        {/* Message Thread Container */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 blueprint-grid-dense">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
            >
              <div
                className={`max-w-[88%] sm:max-w-[80%] rounded-2xl p-4 sm:p-5 text-xs sm:text-sm leading-relaxed shadow-md ${
                  msg.sender === 'user'
                    ? 'bg-[#C6922D] text-[#071A2F] font-medium rounded-br-none'
                    : 'bg-[#0d2a4a] text-slate-100 border border-[#C6922D]/20 rounded-bl-none'
                }`}
              >
                {/* Confidence & Classification Header on assistant messages */}
                {msg.sender === 'assistant' && (
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2.5 pb-2 border-b border-white/10 text-[11px]">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      {getClassificationBadge(msg.classification)}
                    </div>
                    <span className="text-slate-400 text-[10px]">
                      {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                )}

                {/* Body Content with formatted paragraphs */}
                <div className="whitespace-pre-wrap">{msg.content}</div>

                {/* Recommended Next Action Button */}
                {msg.recommendedNextAction && (
                  <div className="mt-3 pt-2.5 border-t border-white/10 flex items-center justify-between gap-2 bg-black/20 p-2.5 rounded-lg">
                    <span className="text-[11px] text-slate-300">
                      Recommended Next Step:
                    </span>
                    <button
                      onClick={() => handleActionClick(msg.recommendedNextAction)}
                      className="px-3 py-1 rounded bg-[#C6922D] hover:bg-[#d8a339] text-[#071A2F] font-bold text-[11px] transition-colors flex items-center gap-1 shrink-0"
                    >
                      <span>{msg.recommendedNextAction}</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                )}

                {/* Mandatory Regulated Advice Disclaimer */}
                {msg.disclaimer && (
                  <div className="mt-3 pt-2.5 border-t border-white/10 text-[11px] text-amber-300/80 italic flex items-start gap-1.5">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                    <span>{msg.disclaimer}</span>
                  </div>
                )}

                {/* Grounded Document Citations */}
                {msg.citations && msg.citations.length > 0 && (
                  <div className="mt-3 pt-3 border-t border-white/10 space-y-1.5">
                    <div className="text-[10px] font-bold uppercase tracking-wider text-[#C6922D] flex items-center gap-1">
                      <FileText className="w-3 h-3" />
                      Approved Source Citations:
                    </div>
                    {msg.citations.map((cite, cIdx) => (
                      <div
                        key={cIdx}
                        className="bg-black/25 p-2 rounded text-[11px] text-slate-300 border border-white/5 flex items-start justify-between gap-2"
                      >
                        <div>
                          <div className="font-semibold text-white">{cite.documentTitle}</div>
                          <div className="text-slate-400 text-[10px]">{cite.section}</div>
                          <div className="text-slate-500 text-[9px] mt-0.5">
                            Published: {cite.publicationDate} • Access: {cite.sourceClassification}
                          </div>
                        </div>
                        {cite.url && (
                          <button
                            onClick={() => {
                              onNavigate(cite.url.replace('/', ''));
                              onClose();
                            }}
                            className="text-[#C6922D] hover:underline shrink-0 text-[10px] inline-flex items-center gap-0.5 mt-1"
                          >
                            <span>Inspect</span>
                            <ExternalLink className="w-2.5 h-2.5" />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex items-center gap-2 text-xs text-slate-400 italic bg-[#0d2a4a] border border-[#C6922D]/20 p-3 rounded-xl w-max animate-pulse">
              <Sparkles className="w-4 h-4 text-[#C6922D] animate-spin" />
              <span>Routing across knowledge layers and synthesizing grounded guidance...</span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Suggested Queries Tray */}
        <div className="bg-[#06182c] px-4 py-2 border-t border-white/5 overflow-x-auto whitespace-nowrap scrollbar-none flex items-center gap-2">
          <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider shrink-0">
            Suggested:
          </span>
          {samplePrompts.map((p, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(p)}
              disabled={loading}
              className="text-[11px] px-2.5 py-1 rounded-full bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10 hover:border-[#C6922D]/40 transition-colors shrink-0"
            >
              {p}
            </button>
          ))}
        </div>

        {/* Escalation & Input Form */}
        <div className="bg-[#0a233f] border-t border-[#C6922D]/20 p-3 sm:p-4 shrink-0">
          <div className="flex items-center justify-between pb-2 text-[11px] text-slate-400">
            <span>Need licensed engineer verification or official proposal?</span>
            <button
              onClick={handleEscalate}
              className="text-[#C6922D] hover:underline font-bold inline-flex items-center gap-1"
            >
              {escalated ? 'Redirecting to Booking...' : 'Connect With Project Manager'}
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              value={inputQuery}
              onChange={(e) => setInputQuery(e.target.value)}
              placeholder="Ask about construction methods, building codes, renewable energy, or project scope..."
              disabled={loading}
              className="flex-1 bg-[#051322] border border-white/15 focus:border-[#C6922D] rounded-xl px-4 py-2.5 text-xs sm:text-sm text-white placeholder:text-slate-500 focus:outline-none transition-colors"
            />
            <button
              type="submit"
              disabled={!inputQuery.trim() || loading}
              className="px-4 sm:px-5 py-2.5 bg-[#C6922D] hover:bg-[#d8a339] disabled:opacity-50 text-[#071A2F] font-bold rounded-xl transition-all flex items-center justify-center shrink-0"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
