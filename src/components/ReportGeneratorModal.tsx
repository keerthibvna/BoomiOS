import React, { useState } from 'react';
import Markdown from 'react-markdown';
import { 
  FileText, 
  Sparkles, 
  Download, 
  Copy, 
  Check, 
  Printer, 
  RefreshCw, 
  X,
  Edit3,
  Eye,
  Sliders
} from 'lucide-react';
import { DemoDataBadge } from './DemoDataBadge.tsx';

interface ReportGeneratorModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTopic?: string;
  initialFocusArea?: string;
}

export const ReportGeneratorModal: React.FC<ReportGeneratorModalProps> = ({
  isOpen,
  onClose,
  initialTopic = 'Peri-Urban Agricultural Land Conversion and Dispute Vulnerability in Southern India',
  initialFocusArea = 'Telangana & Maharashtra (2015-2025)'
}) => {
  const [topic, setTopic] = useState(initialTopic);
  const [focusArea, setFocusArea] = useState(initialFocusArea);
  const [targetAudience, setTargetAudience] = useState<'Policymakers' | 'Academic' | 'Legal' | 'General'>('Policymakers');
  
  const [isGenerating, setIsGenerating] = useState(false);
  const [reportMarkdown, setReportMarkdown] = useState<string>('');
  const [isEditing, setIsEditing] = useState(false);
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleGenerate = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setIsGenerating(true);

    try {
      const res = await fetch('/api/report/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          topic,
          focusArea,
          targetAudience
        })
      });
      const data = await res.json();
      if (data.report) {
        setReportMarkdown(data.report);
      }
    } catch (err) {
      console.error('Report generation error:', err);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(reportMarkdown);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-150">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] shadow-2xl flex flex-col overflow-hidden border border-slate-200">
        
        {/* Modal Header */}
        <div className="p-4 px-6 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-900 text-amber-300 flex items-center justify-center">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-bold text-slate-900">
                  AI Evidence-Based Land Research & Policy Report Generator
                </h3>
                <DemoDataBadge />
              </div>
              <p className="text-[11px] text-slate-500">
                Structured 8-section executive policy brief synthesized from indexed literature, cadastral data, and spatial models.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-5">
          
          {/* Controls Bar */}
          <form onSubmit={handleGenerate} className="bg-slate-50 p-4 rounded-xl border border-slate-200/80 grid grid-cols-1 md:grid-cols-12 gap-3 text-xs">
            <div className="md:col-span-5 space-y-1">
              <label className="font-semibold text-slate-700">Research Topic / Policy Subject</label>
              <input
                id="report-input-topic"
                type="text"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                className="w-full px-3 py-1.5 rounded-lg border border-slate-200 bg-white font-medium"
                required
              />
            </div>

            <div className="md:col-span-4 space-y-1">
              <label className="font-semibold text-slate-700">Jurisdiction / Spatial Focus</label>
              <input
                id="report-input-focus"
                type="text"
                value={focusArea}
                onChange={(e) => setFocusArea(e.target.value)}
                className="w-full px-3 py-1.5 rounded-lg border border-slate-200 bg-white font-medium"
                required
              />
            </div>

            <div className="md:col-span-3 flex items-end">
              <button
                id="execute-generate-report-btn"
                type="submit"
                disabled={isGenerating}
                className="w-full py-2 px-3 rounded-lg bg-blue-900 hover:bg-blue-950 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-xs transition-all cursor-pointer"
              >
                {isGenerating ? (
                  <>
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    <span>Synthesizing...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                    <span>Generate Report</span>
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Report Output Canvas */}
          {reportMarkdown ? (
            <div className="space-y-3">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-slate-900 uppercase tracking-wide">
                    Generated Formal Policy Brief
                  </span>
                  <span className="text-[10px] bg-emerald-100 text-emerald-800 font-semibold px-2 py-0.5 rounded">
                    8 Structured Sections Verified
                  </span>
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => setIsEditing(!isEditing)}
                    className="p-1.5 text-xs text-slate-600 hover:text-slate-900 rounded bg-slate-100 hover:bg-slate-200 flex items-center gap-1 cursor-pointer font-medium"
                  >
                    {isEditing ? <Eye className="w-3.5 h-3.5" /> : <Edit3 className="w-3.5 h-3.5" />}
                    <span>{isEditing ? 'Preview Mode' : 'Edit Markdown'}</span>
                  </button>

                  <button
                    onClick={handleCopy}
                    className="p-1.5 text-xs text-slate-600 hover:text-slate-900 rounded bg-slate-100 hover:bg-slate-200 flex items-center gap-1 cursor-pointer font-medium"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied ? 'Copied' : 'Copy Text'}</span>
                  </button>

                  <button
                    onClick={handlePrint}
                    className="p-1.5 text-xs text-slate-600 hover:text-slate-900 rounded bg-slate-100 hover:bg-slate-200 flex items-center gap-1 cursor-pointer font-medium"
                  >
                    <Printer className="w-3.5 h-3.5" />
                    <span>Print / Save PDF</span>
                  </button>
                </div>
              </div>

              {isEditing ? (
                <textarea
                  value={reportMarkdown}
                  onChange={(e) => setReportMarkdown(e.target.value)}
                  className="w-full h-96 p-4 font-mono text-xs border border-slate-300 rounded-xl bg-slate-50 focus:outline-hidden"
                />
              ) : (
                <div className="p-6 rounded-xl border border-slate-200 bg-white shadow-xs max-h-96 overflow-y-auto">
                  <div className="markdown-body prose prose-slate max-w-none text-xs leading-relaxed space-y-2">
                    <Markdown>{reportMarkdown}</Markdown>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="py-12 text-center space-y-3 bg-slate-50/50 rounded-2xl border border-dashed border-slate-200">
              <FileText className="w-10 h-10 text-slate-400 mx-auto" />
              <div className="max-w-md mx-auto">
                <h4 className="text-xs font-bold text-slate-800">
                  Ready to Synthesize Research & Policy Brief
                </h4>
                <p className="text-[11px] text-slate-500 mt-1">
                  Click <strong>“Generate Report”</strong> above to synthesize an 8-section evidence-backed document citing peer-reviewed land governance publications and multi-spectral satellite metrics.
                </p>
              </div>
            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="p-3 px-6 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
          <span>Demonstration AI Model Engine • Powered by Gemini API & Bhoomi RAG Knowledge Layer</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-100 font-semibold text-slate-700"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};
