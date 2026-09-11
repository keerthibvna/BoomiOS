import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  Search, 
  ArrowRight, 
  BookOpen, 
  Database, 
  FileText, 
  CheckCircle2, 
  SlidersHorizontal,
  ChevronRight,
  ExternalLink
} from 'lucide-react';
import { ResearchDocument, DatasetRecord, PolicyRecord } from '../types.ts';
import { DemoDataBadge } from './DemoDataBadge.tsx';

interface SemanticSearchViewProps {
  onOpenDoc: (doc: ResearchDocument) => void;
  onAskBhoomi: (query: string) => void;
}

export const SemanticSearchView: React.FC<SemanticSearchViewProps> = ({
  onOpenDoc,
  onAskBhoomi
}) => {
  const [query, setQuery] = useState('Show studies about agricultural land loss due to urbanization in Telangana.');
  const [isSearching, setIsSearching] = useState(false);
  const [hasSearched, setHasSearched] = useState(true);
  const [searchResults, setSearchResults] = useState<{
    documents: (ResearchDocument & { semanticSimilarity: number; relevanceScore: number })[];
    relatedDatasets: DatasetRecord[];
    relatedPolicies: PolicyRecord[];
  } | null>(null);

  const sampleQueries = [
    'Show studies about agricultural land loss due to urbanization in Telangana.',
    'What are the root causes of boundary disputes in revenue courts under DILRMP?',
    'Impact of Forest Rights Act (FRA) CFR titles on tribal livelihoods in Odisha.',
    'Groundwater depletion and climate vulnerability risk on peri-urban smallholders.'
  ];

  const executeSemanticSearch = async (targetQuery: string) => {
    setIsSearching(true);
    setHasSearched(true);
    try {
      const res = await fetch('/api/ai/semantic-search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: targetQuery })
      });
      const data = await res.json();
      setSearchResults(data);
    } catch (e) {
      console.error('Semantic search error:', e);
    } finally {
      setIsSearching(false);
    }
  };

  useEffect(() => {
    executeSemanticSearch(query);
  }, []);

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-200">
      
      {/* Title Header */}
      <div className="bg-gradient-to-r from-blue-950 via-indigo-950 to-slate-900 rounded-2xl p-6 text-white shadow-md">
        <div className="flex items-center gap-2 mb-1.5">
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
            Vector Embeddings & Semantic Similarity Search
          </span>
          <DemoDataBadge className="bg-white/10 text-amber-300 border-white/20" />
        </div>
        <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
          AI Semantic Knowledge Search Engine
        </h1>
        <p className="text-xs text-blue-200/80 mt-1 max-w-2xl leading-relaxed">
          Powered by Sentence Transformers & high-dimensional vector search. Search across all national research, cadastre records, satellite surveys, and policy statutes using natural questions.
        </p>

        {/* Search Bar Input */}
        <div className="mt-5 relative max-w-3xl">
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && executeSemanticSearch(query)}
                placeholder="Ask any natural question about land use, disputes, policies, or satellite data..."
                className="w-full pl-10 pr-4 py-3 bg-white text-slate-900 text-xs font-medium rounded-xl border-2 border-transparent focus:border-amber-400 shadow-lg focus:outline-hidden"
              />
            </div>
            <button
              onClick={() => executeSemanticSearch(query)}
              disabled={isSearching}
              className="px-5 py-3 rounded-xl bg-amber-500 hover:bg-amber-600 disabled:opacity-50 text-slate-950 font-bold text-xs shadow-md transition-all flex items-center gap-1.5 cursor-pointer shrink-0"
            >
              {isSearching ? (
                <span>Vectorizing...</span>
              ) : (
                <>
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Semantic Search</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Quick Sample Queries */}
        <div className="mt-3 flex flex-wrap items-center gap-1.5 text-xs">
          <span className="text-slate-400 text-[11px]">Try sample:</span>
          {sampleQueries.map((q, idx) => (
            <button
              key={idx}
              onClick={() => {
                setQuery(q);
                executeSemanticSearch(q);
              }}
              className="px-2.5 py-1 rounded-full bg-white/10 hover:bg-white/20 text-slate-200 text-[11px] transition-colors cursor-pointer truncate max-w-xs"
            >
              "{q.slice(0, 45)}..."
            </button>
          ))}
        </div>
      </div>

      {/* Vector Match Breakdown Banner */}
      {searchResults && (
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="font-semibold text-slate-800">Vector Embeddings Synthesized:</span>
            <span className="text-slate-500">
              Matched <strong>{searchResults.documents.length}</strong> research papers, <strong>{searchResults.relatedDatasets.length}</strong> datasets, and <strong>{searchResults.relatedPolicies.length}</strong> statutes.
            </span>
          </div>

          <div className="flex items-center gap-2 text-slate-400 text-[11px]">
            <span>Cosine Threshold: &gt; 0.70</span>
            <span>•</span>
            <span>Index: PostGIS + FAISS</span>
          </div>
        </div>
      )}

      {/* Results Section */}
      {searchResults && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Main Column: Semantic Ranked Documents (8 cols) */}
          <div className="lg:col-span-8 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wide">
                Ranked Research Publications by Semantic Similarity
              </h2>
              <span className="text-xs text-slate-500 font-medium">Relevance Score</span>
            </div>

            <div className="space-y-3.5">
              {searchResults.documents.map((doc, idx) => (
                <div
                  key={doc.id}
                  onClick={() => onOpenDoc(doc)}
                  className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs hover:border-blue-400 transition-all cursor-pointer group"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="space-y-1.5 flex-1">
                      <div className="flex items-center gap-2 text-[11px]">
                        <span className="font-semibold text-blue-700 bg-blue-50 px-2 py-0.5 rounded">
                          {doc.category}
                        </span>
                        <span className="text-slate-400">•</span>
                        <span className="font-medium text-slate-600">{doc.state}</span>
                        <span className="text-slate-400">•</span>
                        <span className="text-slate-500">{doc.year}</span>
                      </div>

                      <h3 className="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors leading-snug">
                        {doc.title}
                      </h3>

                      <p className="text-xs text-slate-600 leading-relaxed line-clamp-2">
                        {doc.abstract}
                      </p>

                      {/* Extracted Concepts */}
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {(doc.keywords || []).map((k, i) => (
                          <span key={i} className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-medium">
                            {k}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Relevance Score Pill */}
                    <div className="shrink-0 flex flex-col items-end">
                      <div className="px-2.5 py-1 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        <span>{Math.round((doc.semanticSimilarity || 0.88) * 100)}%</span>
                      </div>
                      <span className="text-[10px] text-slate-400 mt-1">match score</span>
                    </div>
                  </div>

                  <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                    <span>Author: {doc.author} ({doc.organization})</span>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        onAskBhoomi(`Summarize and highlight key insights from paper: "${doc.title}"`);
                      }}
                      className="text-blue-600 hover:underline font-semibold flex items-center gap-1 cursor-pointer"
                    >
                      <Sparkles className="w-3 h-3" />
                      <span>Summarize with AI</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Matched Datasets & Policies (4 cols) */}
          <div className="lg:col-span-4 space-y-5">
            
            {/* Related Datasets */}
            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-3">
              <div className="flex items-center gap-2 border-b border-slate-100 pb-2">
                <Database className="w-4 h-4 text-indigo-600" />
                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wide">
                  Related Datasets & Cadastre
                </h3>
              </div>

              <div className="space-y-2.5">
                {searchResults.relatedDatasets.map((ds) => (
                  <div key={ds.id} className="p-3 rounded-lg bg-slate-50 border border-slate-200/70 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold text-indigo-700 bg-indigo-50 px-1.5 py-0.5 rounded">
                        {ds.format}
                      </span>
                      <span className="text-[10px] text-slate-400">{ds.state}</span>
                    </div>
                    <h4 className="text-xs font-bold text-slate-900">{ds.name}</h4>
                    <p className="text-[11px] text-slate-500 line-clamp-2">{ds.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Related Policies */}
            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-3">
              <div className="flex items-center gap-2 border-b border-slate-100 pb-2">
                <FileText className="w-4 h-4 text-teal-600" />
                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wide">
                  Related Policy Frameworks
                </h3>
              </div>

              <div className="space-y-2.5">
                {searchResults.relatedPolicies.map((pol) => (
                  <div key={pol.id} className="p-3 rounded-lg bg-slate-50 border border-slate-200/70 space-y-1">
                    <div className="text-[10px] font-semibold text-teal-700 bg-teal-50 px-1.5 py-0.5 rounded inline-block">
                      {pol.department}
                    </div>
                    <h4 className="text-xs font-bold text-slate-900">{pol.policyName} ({pol.year})</h4>
                    <p className="text-[11px] text-slate-500 line-clamp-2">{pol.objectives[0]}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* AI Assistant Quick Prompt */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-4 rounded-xl border border-blue-200 space-y-2 text-xs">
              <div className="flex items-center gap-1.5 text-blue-900 font-bold">
                <Sparkles className="w-3.5 h-3.5 text-blue-700" />
                <span>Need Deep Policy Synthesis?</span>
              </div>
              <p className="text-slate-600 text-[11px] leading-relaxed">
                Bhoomi AI can synthesize these research papers and draft a complete comparative policy brief with citations.
              </p>
              <button
                onClick={() => onAskBhoomi(query)}
                className="w-full py-1.5 px-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold text-center cursor-pointer shadow-xs"
              >
                Synthesize in Bhoomi Assistant
              </button>
            </div>

          </div>

        </div>
      )}

    </div>
  );
};
