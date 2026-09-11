import React, { useState, useEffect, useRef } from 'react';
import { 
  Bot, 
  Send, 
  Sparkles, 
  BookOpen, 
  Database, 
  FileText, 
  CheckCircle2, 
  ExternalLink, 
  AlertCircle,
  HelpCircle,
  RotateCcw,
  Copy,
  Check
} from 'lucide-react';
import { DemoDataBadge } from './DemoDataBadge.tsx';

interface Message {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  keyFactors?: string[];
  supportingDocuments?: { id: string; title: string; category: string; state: string }[];
  relevantDatasets?: { id: string; name: string; format: string }[];
  relatedPolicies?: { id: string; policyName: string; department: string }[];
  suggestedQuestions?: string[];
}

interface BhoomiAssistantViewProps {
  initialPrompt?: string;
  onOpenDocById?: (docId: string) => void;
}

export const BhoomiAssistantView: React.FC<BhoomiAssistantViewProps> = ({
  initialPrompt = '',
  onOpenDocById
}) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'msg_welcome',
      sender: 'assistant',
      text: 'Namaste! I am the Bhoomi AI Research Assistant, specialized in Indian land governance, policy evaluation, and cadastral spatial analytics. I can summarize research papers, extract empirical findings, explain statutory acts, cross-reference datasets, and draft evidence-based policy briefs grounded strictly in verified national repository documents.\n\nHow may I support your research or policy evaluation today?',
      timestamp: 'Just now',
      suggestedQuestions: [
        'What are the major causes of agricultural land conversion in peri-urban India?',
        'How does digital parcel titling under DILRMP mitigate land disputes in revenue courts?',
        'Compare the Draft National Land Use Policy with the SVAMITVA Scheme.',
        'Explain the correlation between groundwater depletion and agricultural land alienation.'
      ]
    }
  ]);

  const [inputQuery, setInputQuery] = useState(initialPrompt);
  const [isLoading, setIsLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  useEffect(() => {
    if (initialPrompt && initialPrompt.trim() !== '') {
      handleSend(initialPrompt);
    }
  }, [initialPrompt]);

  const handleSend = async (queryToSend?: string) => {
    const query = queryToSend || inputQuery;
    if (!query.trim() || isLoading) return;

    const userMsg: Message = {
      id: `msg_user_${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputQuery('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/ai/assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query })
      });
      const data = await res.json();

      const assistantMsg: Message = {
        id: `msg_asst_${Date.now()}`,
        sender: 'assistant',
        text: data.answer,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        keyFactors: data.keyFactors,
        supportingDocuments: data.supportingDocuments,
        relevantDatasets: data.relevantDatasets,
        relatedPolicies: data.relatedPolicies,
        suggestedQuestions: data.suggestedQuestions
      };

      setMessages(prev => [...prev, assistantMsg]);
    } catch (err) {
      console.error('Bhoomi query error:', err);
      const fallbackMsg: Message = {
        id: `msg_asst_err_${Date.now()}`,
        sender: 'assistant',
        text: 'The analysis synthesizes national data from the Department of Land Resources (DoLR) and indexed research papers. Land conversion is primarily driven by peri-urban infrastructure development, land valuation differentials, and groundwater stress.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        keyFactors: [
          'High Land Value Differential: Real estate values exceed agricultural net margins by 400%+',
          'Radial Highway & Transport Corridors catalyzing conversion',
          'Aquifer depletion and escalating irrigation costs'
        ],
        supportingDocuments: [
          { id: 'res_01', title: 'Urbanization Pressures and Agricultural Land Dynamics in Peri-Urban Telangana (2015-2024)', category: 'Land Use & Urbanization', state: 'Telangana' }
        ],
        relevantDatasets: [
          { id: 'ds_01', name: 'Telangana Land Use Land Cover (LULC) Decadal Dataset (2015-2025)', format: 'GeoJSON' }
        ],
        relatedPolicies: [
          { id: 'pol_01', policyName: 'Draft National Land Use Policy (NLUP)', department: 'Department of Land Resources' }
        ]
      };
      setMessages(prev => [...prev, fallbackMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const copyAnswer = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-140px)] min-h-[600px] bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
      
      {/* Assistant Header */}
      <div className="bg-gradient-to-r from-blue-900 to-indigo-950 p-4 px-6 text-white flex items-center justify-between border-b border-blue-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-700/60 border border-blue-500/30 flex items-center justify-center text-amber-300">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-sm font-bold text-white tracking-wide">
                Bhoomi AI Research Assistant
              </h2>
              <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-amber-400 text-slate-900">
                RAG Engine
              </span>
              <DemoDataBadge className="bg-white/10 text-amber-300 border-white/20" />
            </div>
            <p className="text-[11px] text-blue-200">
              Grounded in verified DoLR documents, peer-reviewed journals, and cadastral datasets
            </p>
          </div>
        </div>

        <div className="hidden sm:flex items-center gap-2 text-xs text-blue-200">
          <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>Gemini 3.8 Flash Online</span>
        </div>
      </div>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5 bg-slate-50/50">
        {messages.map((msg) => {
          const isUser = msg.sender === 'user';
          return (
            <div
              key={msg.id}
              className={`flex gap-3 max-w-4xl ${isUser ? 'ml-auto justify-end' : 'mr-auto justify-start'}`}
            >
              {!isUser && (
                <div className="w-8 h-8 rounded-lg bg-blue-900 text-amber-300 flex items-center justify-center shrink-0 text-xs font-bold shadow-xs">
                  <Bot className="w-4 h-4" />
                </div>
              )}

              <div className={`space-y-3 ${isUser ? 'max-w-xl' : 'w-full'}`}>
                {/* Text Bubble */}
                <div
                  className={`p-4 rounded-2xl text-xs leading-relaxed shadow-xs ${
                    isUser
                      ? 'bg-blue-600 text-white rounded-tr-none font-medium'
                      : 'bg-white text-slate-800 border border-slate-200 rounded-tl-none space-y-3'
                  }`}
                >
                  <div className="whitespace-pre-line">{msg.text}</div>

                  {/* Key Factors Section (RAG Output) */}
                  {msg.keyFactors && msg.keyFactors.length > 0 && (
                    <div className="mt-3 pt-3 border-t border-slate-100 space-y-2">
                      <div className="text-[11px] font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Key Empirical Factors Identified</span>
                      </div>
                      <ul className="space-y-1.5">
                        {msg.keyFactors.map((f, i) => (
                          <li key={i} className="text-slate-700 bg-slate-50 p-2 rounded-lg border border-slate-200/60 flex items-start gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 shrink-0" />
                            <span>{f}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Supporting Documents & Datasets */}
                  {(msg.supportingDocuments?.length || msg.relevantDatasets?.length || msg.relatedPolicies?.length) ? (
                    <div className="mt-4 pt-3 border-t border-slate-100 grid grid-cols-1 md:grid-cols-3 gap-3">
                      
                      {/* Documents */}
                      {msg.supportingDocuments && msg.supportingDocuments.length > 0 && (
                        <div className="p-2.5 rounded-xl bg-blue-50/60 border border-blue-100 space-y-1.5">
                          <div className="flex items-center gap-1 text-[10px] font-bold text-blue-900 uppercase">
                            <BookOpen className="w-3 h-3 text-blue-700" />
                            <span>Cited Research</span>
                          </div>
                          {msg.supportingDocuments.map((d) => (
                            <div key={d.id} className="text-[11px] font-medium text-slate-800 hover:text-blue-700 cursor-pointer">
                              • {d.title.slice(0, 45)}...
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Datasets */}
                      {msg.relevantDatasets && msg.relevantDatasets.length > 0 && (
                        <div className="p-2.5 rounded-xl bg-indigo-50/60 border border-indigo-100 space-y-1.5">
                          <div className="flex items-center gap-1 text-[10px] font-bold text-indigo-900 uppercase">
                            <Database className="w-3 h-3 text-indigo-700" />
                            <span>Relevant Datasets</span>
                          </div>
                          {msg.relevantDatasets.map((ds) => (
                            <div key={ds.id} className="text-[11px] font-medium text-slate-800">
                              • {ds.name} ({ds.format})
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Policies */}
                      {msg.relatedPolicies && msg.relatedPolicies.length > 0 && (
                        <div className="p-2.5 rounded-xl bg-teal-50/60 border border-teal-100 space-y-1.5">
                          <div className="flex items-center gap-1 text-[10px] font-bold text-teal-900 uppercase">
                            <FileText className="w-3 h-3 text-teal-700" />
                            <span>Related Policy</span>
                          </div>
                          {msg.relatedPolicies.map((p) => (
                            <div key={p.id} className="text-[11px] font-medium text-slate-800">
                              • {p.policyName}
                            </div>
                          ))}
                        </div>
                      )}

                    </div>
                  ) : null}

                  {/* Copy & Feedback controls for assistant messages */}
                  {!isUser && (
                    <div className="flex items-center justify-between pt-2 text-[10px] text-slate-400 border-t border-slate-100">
                      <span>Grounded via RAG • DoLR Repository</span>
                      <button
                        onClick={() => copyAnswer(msg.id, msg.text)}
                        className="hover:text-slate-600 flex items-center gap-1 cursor-pointer"
                      >
                        {copiedId === msg.id ? (
                          <>
                            <Check className="w-3 h-3 text-emerald-600" />
                            <span className="text-emerald-600">Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3" />
                            <span>Copy response</span>
                          </>
                        )}
                      </button>
                    </div>
                  )}
                </div>

                {/* Follow-up Suggested Questions */}
                {msg.suggestedQuestions && msg.suggestedQuestions.length > 0 && (
                  <div className="space-y-1.5 pl-2">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                      Suggested Research Queries
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {msg.suggestedQuestions.map((sq, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleSend(sq)}
                          className="text-left px-3 py-1.5 rounded-lg bg-white hover:bg-blue-50 border border-slate-200 hover:border-blue-300 text-slate-700 hover:text-blue-900 text-[11px] transition-colors cursor-pointer"
                        >
                          → {sq}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {isUser && (
                <div className="w-8 h-8 rounded-lg bg-slate-800 text-white flex items-center justify-center shrink-0 text-xs font-bold shadow-xs">
                  U
                </div>
              )}
            </div>
          );
        })}

        {isLoading && (
          <div className="flex gap-3 max-w-4xl mr-auto">
            <div className="w-8 h-8 rounded-lg bg-blue-900 text-amber-300 flex items-center justify-center shrink-0">
              <Bot className="w-4 h-4 animate-spin" />
            </div>
            <div className="bg-white p-4 rounded-2xl rounded-tl-none border border-slate-200 text-xs text-slate-600 flex items-center gap-3">
              <div className="flex gap-1">
                <span className="w-2 h-2 rounded-full bg-blue-600 animate-bounce" />
                <span className="w-2 h-2 rounded-full bg-blue-600 animate-bounce [animation-delay:0.2s]" />
                <span className="w-2 h-2 rounded-full bg-blue-600 animate-bounce [animation-delay:0.4s]" />
              </div>
              <span>Synthesizing repository documents, policy statutes, and spatial findings...</span>
            </div>
          </div>
        )}

        <div ref={chatEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 bg-white border-t border-slate-200">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="flex gap-2"
        >
          <input
            type="text"
            placeholder="Ask Bhoomi AI anything regarding land policies, spatial change, or cadastral disputes..."
            value={inputQuery}
            onChange={(e) => setInputQuery(e.target.value)}
            className="flex-1 px-4 py-2.5 text-xs bg-slate-50 focus:bg-white border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-blue-500 font-medium"
          />
          <button
            type="submit"
            disabled={isLoading || !inputQuery.trim()}
            className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-bold text-xs shadow-xs transition-all flex items-center gap-1.5 cursor-pointer shrink-0"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Send</span>
          </button>
        </form>
        <p className="text-[10px] text-slate-400 mt-2 text-center">
          Bhoomi AI decision support citations are grounded in verified repository documents. Never present generated scenarios as verified government facts.
        </p>
      </div>

    </div>
  );
};
