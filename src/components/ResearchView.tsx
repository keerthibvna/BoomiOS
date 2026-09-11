import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Filter, 
  Upload, 
  BookOpen, 
  Download, 
  Bookmark, 
  Eye, 
  Sparkles, 
  Share2, 
  FileText, 
  X, 
  Check, 
  MapPin, 
  Calendar, 
  User as UserIcon, 
  Building 
} from 'lucide-react';
import { ResearchDocument } from '../types.ts';
import { DemoDataBadge } from './DemoDataBadge.tsx';

interface ResearchViewProps {
  documents: ResearchDocument[];
  onUploadDocument: (newDoc: Partial<ResearchDocument>) => void;
  onAskBhoomi: (query: string) => void;
  initialSearchQuery?: string;
  selectedDocId?: string | null;
}

export const ResearchView: React.FC<ResearchViewProps> = ({
  documents,
  onUploadDocument,
  onAskBhoomi,
  initialSearchQuery = '',
  selectedDocId = null
}) => {
  const [searchQuery, setSearchQuery] = useState(initialSearchQuery);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedState, setSelectedState] = useState('All');
  const [selectedDocType, setSelectedDocType] = useState('All');
  const [selectedYear, setSelectedYear] = useState('All');
  const [previewDoc, setPreviewDoc] = useState<ResearchDocument | null>(() => {
    if (selectedDocId) {
      return documents.find(d => d.id === selectedDocId) || null;
    }
    return null;
  });
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [bookmarkedIds, setBookmarkedIds] = useState<Set<string>>(new Set());

  // Form states for upload
  const [newTitle, setNewTitle] = useState('');
  const [newAuthor, setNewAuthor] = useState('');
  const [newOrg, setNewOrg] = useState('');
  const [newState, setNewState] = useState('Telangana');
  const [newCategory, setNewCategory] = useState('Land Use & Urbanization');
  const [newAbstract, setNewAbstract] = useState('');
  const [newKeywords, setNewKeywords] = useState('');

  const filteredDocs = useMemo(() => {
    return documents.filter(doc => {
      const matchesSearch = searchQuery === '' || 
        doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doc.abstract.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doc.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doc.keywords.some(k => k.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesCat = selectedCategory === 'All' || doc.category === selectedCategory;
      const matchesState = selectedState === 'All' || doc.state === selectedState || (selectedState !== 'All' && doc.state === 'National');
      const matchesType = selectedDocType === 'All' || doc.documentType === selectedDocType;
      const matchesYear = selectedYear === 'All' || doc.year === Number(selectedYear);

      return matchesSearch && matchesCat && matchesState && matchesType && matchesYear;
    });
  }, [documents, searchQuery, selectedCategory, selectedState, selectedDocType, selectedYear]);

  const toggleBookmark = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setBookmarkedIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const handleUploadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    onUploadDocument({
      title: newTitle,
      author: newAuthor || 'Contributing Researcher',
      organization: newOrg || 'Academic Research Centre',
      state: newState,
      category: newCategory,
      abstract: newAbstract || 'Empirical investigation of land governance dynamics.',
      keywords: newKeywords.split(',').map(s => s.trim()).filter(Boolean),
      documentType: 'Research Paper',
      year: new Date().getFullYear(),
      keyFindings: [
        'Accelerating conversion of agricultural acreage along ring road transport corridors.',
        'Institutional fragmentation across Revenue and Urban Development Authorities.'
      ]
    });

    setIsUploadModalOpen(false);
    setNewTitle('');
    setNewAbstract('');
  };

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-200">
      
      {/* Header with Title & Upload CTA */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-slate-900 sm:text-2xl">
              National Land Governance Research Repository
            </h1>
            <DemoDataBadge />
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Access over 2,180 peer-reviewed journal articles, policy briefs, doctoral dissertations, and government whitepapers.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setIsUploadModalOpen(true)}
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold bg-blue-600 hover:bg-blue-700 text-white shadow-xs transition-all cursor-pointer"
          >
            <Upload className="w-4 h-4" />
            <span>Upload Research Paper</span>
          </button>
        </div>
      </div>

      {/* Filter Bar & Search Controls */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs space-y-3">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            id="research-search-input"
            type="text"
            placeholder="Search by keywords, title, author, state, or topic (e.g., 'Urbanization and agricultural land loss')..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-xs bg-slate-50 focus:bg-white border border-slate-200 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-blue-500 transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* 4 Multi-Select Dropdowns */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
          <div>
            <label className="block text-[11px] font-semibold text-slate-500 mb-1">State / Jurisdiction</label>
            <select
              value={selectedState}
              onChange={(e) => setSelectedState(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 font-medium text-slate-800"
            >
              <option value="All">All Jurisdictions</option>
              <option value="Telangana">Telangana</option>
              <option value="Maharashtra">Maharashtra</option>
              <option value="Karnataka">Karnataka</option>
              <option value="Odisha">Odisha</option>
              <option value="Uttar Pradesh">Uttar Pradesh</option>
              <option value="National">National Level</option>
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-500 mb-1">Thematic Category</label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 font-medium text-slate-800"
            >
              <option value="All">All Categories</option>
              <option value="Land Use & Urbanization">Land Use & Urbanization</option>
              <option value="Digital Cadastre & Titling">Digital Cadastre & Titling</option>
              <option value="Land Disputes & Revenue Courts">Land Disputes & Revenue Courts</option>
              <option value="Tribal Land Rights & Forest Governance">Tribal Rights & FRA</option>
              <option value="Climate Resilience & Land Degradation">Climate Resilience</option>
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-500 mb-1">Document Classification</label>
            <select
              value={selectedDocType}
              onChange={(e) => setSelectedDocType(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 font-medium text-slate-800"
            >
              <option value="All">All Document Types</option>
              <option value="Research Paper">Peer-Reviewed Paper</option>
              <option value="Government Evaluation Report">Government Report</option>
              <option value="Case Study">Empirical Case Study</option>
              <option value="Policy Brief">Policy Brief</option>
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-500 mb-1">Publication Year</label>
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 font-medium text-slate-800"
            >
              <option value="All">All Years</option>
              <option value="2024">2024</option>
              <option value="2023">2023</option>
              <option value="2022">2022</option>
              <option value="2021">2021</option>
              <option value="2020">2020</option>
            </select>
          </div>
        </div>

        <div className="flex items-center justify-between pt-2 text-xs text-slate-500 border-t border-slate-100">
          <span>Showing <strong>{filteredDocs.length}</strong> indexed research publications</span>
          {(selectedCategory !== 'All' || selectedState !== 'All' || selectedDocType !== 'All' || searchQuery !== '') && (
            <button
              onClick={() => {
                setSelectedCategory('All');
                setSelectedState('All');
                setSelectedDocType('All');
                setSelectedYear('All');
                setSearchQuery('');
              }}
              className="text-blue-600 hover:underline cursor-pointer"
            >
              Reset all filters
            </button>
          )}
        </div>
      </div>

      {/* Publications Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredDocs.map((doc) => {
          const isBookmarked = bookmarkedIds.has(doc.id);
          return (
            <div
              key={doc.id}
              onClick={() => setPreviewDoc(doc)}
              className="bg-white rounded-xl border border-slate-200/80 p-4 shadow-xs hover:shadow-md hover:border-blue-400 transition-all flex flex-col justify-between cursor-pointer group"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="font-semibold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-100 truncate max-w-[180px]">
                    {doc.category}
                  </span>
                  <div className="flex items-center gap-1.5">
                    <span className="text-slate-400">{doc.year}</span>
                    <button
                      onClick={(e) => toggleBookmark(doc.id, e)}
                      className={`p-1 rounded hover:bg-slate-100 transition-colors ${
                        isBookmarked ? 'text-amber-500 fill-amber-500' : 'text-slate-400'
                      }`}
                      title="Bookmark"
                    >
                      <Bookmark className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <h3 className="text-xs font-bold text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-2 leading-snug">
                  {doc.title}
                </h3>

                <p className="text-[11px] text-slate-500 line-clamp-3 leading-relaxed">
                  {doc.abstract}
                </p>

                {/* Keywords Chips */}
                <div className="flex flex-wrap gap-1 pt-1">
                  {(doc.keywords || []).slice(0, 3).map((k, i) => (
                    <span key={i} className="text-[10px] bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded">
                      {k}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                <div className="flex items-center gap-1 truncate max-w-[140px]">
                  <UserIcon className="w-3 h-3 text-slate-400 shrink-0" />
                  <span className="truncate">{doc.author?.split(',')[0] || doc.author}</span>
                </div>

                <div className="flex items-center gap-2.5">
                  <span className="flex items-center gap-1">
                    <Eye className="w-3 h-3 text-slate-400" />
                    <span>{doc.views || 42}</span>
                  </span>
                  <span className="flex items-center gap-1">
                    <Download className="w-3 h-3 text-slate-400" />
                    <span>{doc.downloadCount || 12}</span>
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filteredDocs.length === 0 && (
        <div className="text-center py-12 bg-white rounded-xl border border-slate-200">
          <BookOpen className="w-8 h-8 text-slate-300 mx-auto mb-2" />
          <p className="text-sm font-semibold text-slate-700">No matching research publications found</p>
          <p className="text-xs text-slate-500 mt-1">Try broadening your search keywords or adjusting state and category filters.</p>
        </div>
      )}

      {/* Research Paper Detailed Preview Modal */}
      {previewDoc && (
        <div 
          id="research-paper-modal"
          className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-150"
        >
          <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
            
            {/* Modal Header */}
            <div className="p-4 px-6 border-b border-slate-100 flex items-start justify-between bg-slate-50/50">
              <div className="space-y-1 pr-6">
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-semibold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-100">
                    {previewDoc.category}
                  </span>
                  <span className="text-[11px] text-slate-500">
                    {previewDoc.documentType} • {previewDoc.year}
                  </span>
                  <DemoDataBadge />
                </div>
                <h2 className="text-base font-bold text-slate-900 leading-snug">
                  {previewDoc.title}
                </h2>
              </div>
              <button
                onClick={() => setPreviewDoc(null)}
                className="p-1.5 rounded-lg hover:bg-slate-200 text-slate-500 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto space-y-5 text-xs">
              
              {/* Authors & Organization */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200/80">
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-semibold">Author(s)</span>
                  <span className="font-semibold text-slate-900 mt-0.5 block">{previewDoc.author}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-semibold">Affiliated Institution</span>
                  <span className="font-semibold text-slate-900 mt-0.5 block">{previewDoc.organization}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-semibold">Geographic State</span>
                  <span className="font-semibold text-slate-900 mt-0.5 block">{previewDoc.state}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-semibold">Citations</span>
                  <span className="font-semibold text-emerald-600 mt-0.5 block">{previewDoc.citationCount || 18} peer citations</span>
                </div>
              </div>

              {/* Abstract */}
              <div>
                <h4 className="font-bold text-slate-900 uppercase text-[11px] tracking-wider mb-1.5">
                  Executive Abstract
                </h4>
                <p className="text-slate-700 leading-relaxed bg-white border border-slate-100 p-3.5 rounded-xl shadow-xs">
                  {previewDoc.abstract}
                </p>
              </div>

              {/* Key Empirical Findings */}
              {previewDoc.keyFindings && previewDoc.keyFindings.length > 0 && (
                <div>
                  <h4 className="font-bold text-slate-900 uppercase text-[11px] tracking-wider mb-2">
                    Key Policy Findings & Empirical Conclusions
                  </h4>
                  <ul className="space-y-1.5">
                    {previewDoc.keyFindings.map((finding, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-slate-700 bg-amber-50/50 p-2.5 rounded-lg border border-amber-200/50">
                        <Check className="w-3.5 h-3.5 text-amber-700 mt-0.5 shrink-0" />
                        <span className="leading-normal">{finding}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Keywords */}
              <div>
                <span className="font-semibold text-slate-500 block text-[11px] mb-1.5">Indexed Thematic Keywords:</span>
                <div className="flex flex-wrap gap-1.5">
                  {(previewDoc.keywords || []).map((k, i) => (
                    <span key={i} className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 font-medium">
                      #{k}
                    </span>
                  ))}
                </div>
              </div>

            </div>

            {/* Modal Footer Actions */}
            <div className="p-4 px-6 border-t border-slate-100 bg-slate-50/50 flex flex-wrap items-center justify-between gap-3">
              <button
                onClick={() => {
                  onAskBhoomi(`Provide an AI summary and policy implications of: ${previewDoc.title}`);
                  setPreviewDoc(null);
                }}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-xs hover:from-blue-700 hover:to-indigo-700 cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Summarize with Bhoomi AI</span>
              </button>

              <div className="flex items-center gap-2">
                <a
                  href="/documents/sample_research_paper.pdf"
                  download="Research_Paper.pdf"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download PDF ({previewDoc.fileSize || '3.2 MB'})</span>
                </a>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* Upload Paper Modal */}
      {isUploadModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl max-w-xl w-full shadow-2xl overflow-hidden p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="text-base font-bold text-slate-900">Upload Research Publication</h3>
                <p className="text-xs text-slate-500">Contribute empirical studies to the national repository</p>
              </div>
              <button
                onClick={() => setIsUploadModalOpen(false)}
                className="p-1 rounded-lg hover:bg-slate-100 text-slate-400"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleUploadSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Paper Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g., Evaluation of Cadastral Accuracy Under DILRMP"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full px-3 py-1.5 rounded-lg border border-slate-200 text-xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Author Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g., Dr. Ananya Sharma"
                    value={newAuthor}
                    onChange={(e) => setNewAuthor(e.target.value)}
                    className="w-full px-3 py-1.5 rounded-lg border border-slate-200 text-xs"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Institution</label>
                  <input
                    type="text"
                    placeholder="e.g., IIT Delhi / TISS"
                    value={newOrg}
                    onChange={(e) => setNewOrg(e.target.value)}
                    className="w-full px-3 py-1.5 rounded-lg border border-slate-200 text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Target State</label>
                  <select
                    value={newState}
                    onChange={(e) => setNewState(e.target.value)}
                    className="w-full px-3 py-1.5 rounded-lg border border-slate-200 text-xs"
                  >
                    <option value="Telangana">Telangana</option>
                    <option value="Maharashtra">Maharashtra</option>
                    <option value="Odisha">Odisha</option>
                    <option value="Karnataka">Karnataka</option>
                    <option value="Uttar Pradesh">Uttar Pradesh</option>
                    <option value="National">National (All India)</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Category</label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    className="w-full px-3 py-1.5 rounded-lg border border-slate-200 text-xs"
                  >
                    <option value="Land Use & Urbanization">Land Use & Urbanization</option>
                    <option value="Digital Cadastre & Titling">Digital Cadastre & Titling</option>
                    <option value="Land Disputes & Revenue Courts">Land Disputes & Revenue Courts</option>
                    <option value="Tribal Land Rights & Forest Governance">Tribal Land Rights</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Abstract *</label>
                <textarea
                  rows={3}
                  required
                  placeholder="Summary of empirical objectives, field methods, and findings..."
                  value={newAbstract}
                  onChange={(e) => setNewAbstract(e.target.value)}
                  className="w-full px-3 py-1.5 rounded-lg border border-slate-200 text-xs"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Keywords (Comma separated)</label>
                <input
                  type="text"
                  placeholder="e.g., peri-urban, land conversion, ULPIN"
                  value={newKeywords}
                  onChange={(e) => setNewKeywords(e.target.value)}
                  className="w-full px-3 py-1.5 rounded-lg border border-slate-200 text-xs"
                />
              </div>

              <div className="p-3 bg-slate-50 border border-dashed border-slate-300 rounded-xl text-center">
                <Upload className="w-5 h-5 text-slate-400 mx-auto mb-1" />
                <span className="text-xs text-slate-600 block">PDF manuscript attachment verified</span>
                <span className="text-[10px] text-slate-400">Max size 25MB • DOI indexing supported</span>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsUploadModalOpen(false)}
                  className="px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-600 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-xs cursor-pointer"
                >
                  Submit for Indexing
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
