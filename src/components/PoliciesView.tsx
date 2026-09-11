import React, { useState } from 'react';
import { 
  FileText, 
  Columns, 
  Sparkles, 
  CheckCircle2, 
  Download, 
  ExternalLink, 
  ArrowRight,
  ShieldCheck,
  Building2,
  Calendar,
  Layers
} from 'lucide-react';
import { PolicyRecord } from '../types.ts';
import { DemoDataBadge } from './DemoDataBadge.tsx';

interface PoliciesViewProps {
  policies: PolicyRecord[];
  onAskBhoomi: (query: string) => void;
}

export const PoliciesView: React.FC<PoliciesViewProps> = ({
  policies,
  onAskBhoomi
}) => {
  const [activeTab, setActiveTab] = useState<'catalog' | 'comparison'>('catalog');
  const [policyAId, setPolicyAId] = useState<string>(policies[0]?.id || 'pol_01');
  const [policyBId, setPolicyBId] = useState<string>(policies[1]?.id || 'pol_02');
  const [selectedPolicyModal, setSelectedPolicyModal] = useState<PolicyRecord | null>(null);

  const fallbackPolicyA: PolicyRecord = policies[0] || {
    id: 'pol_01',
    policyName: 'Draft National Land Use Policy (NLUP)',
    department: 'Department of Land Resources',
    ministry: 'Ministry of Rural Development, Government of India',
    year: 2013,
    state: 'National',
    category: 'National Land Use & Planning',
    description: 'Framework guidelines for optimal land allocation across competing demands: agriculture, food security, urban infrastructure, industrial corridors, and ecological preservation.',
    objectives: [
      'Preserve prime multi-cropped agricultural land for long-term national food security.',
      'Delineate ecologically sensitive zones, catchment basins, and forest corridors.',
      'Guide industrial and urban infrastructure towards wasteland and degraded lands.'
    ],
    scope: 'Pan-India advisory framework',
    targetGroup: 'State Revenue Departments, Urban Local Bodies',
    implementationFramework: 'Tiered governance structure: NLUC, SLUB, and DPC',
    expectedImpact: 'Mitigate uncontrolled peri-urban sprawl and harmonize spatial plans',
    documentUrl: '#',
    status: 'Active',
    isNational: true,
    challenges: ['Inter-departmental coordination', 'Legacy paper land records', 'State-level adoption variance']
  };

  const fallbackPolicyB: PolicyRecord = policies[1] || {
    id: 'pol_02',
    policyName: 'Digital India Land Records Modernization Programme (DILRMP)',
    department: 'Department of Land Resources',
    ministry: 'Ministry of Rural Development, Government of India',
    year: 2021,
    state: 'National',
    category: 'Digital Cadastre & Land Records',
    description: 'Comprehensive guidelines for transitioning from presumptive titling to conclusive titling.',
    objectives: [
      'Assign 14-digit geo-referenced Bhu-Aadhaar (ULPIN) to every distinct parcel.',
      'Integrate computerized revenue cadastre with deed registration sub-offices.',
      'Enable paperless, transparent mutation through automatic triggers.'
    ],
    scope: 'Pan-India National Mission',
    targetGroup: 'Landowners, Farmers, Survey Departments',
    implementationFramework: 'Central financial assistance to States with CORS networks',
    expectedImpact: 'Conclusive land titling, 80% reduction in title disputes',
    documentUrl: '#',
    status: 'Active',
    isNational: true,
    challenges: ['Spatial resolution limits', 'Survey workforce capacity', 'Revenue court pendency']
  };

  const policyA = policies.find(p => p.id === policyAId) || fallbackPolicyA;
  const policyB = policies.find(p => p.id === policyBId) || fallbackPolicyB;

  const comparisonRows = [
    {
      parameter: 'Policy Title & Year',
      valA: policyA ? `${policyA.policyName} (${policyA.year})` : 'N/A',
      valB: policyB ? `${policyB.policyName} (${policyB.year})` : 'N/A',
    },
    {
      parameter: 'Nodal Ministry / Department',
      valA: policyA?.department || 'Department of Land Resources',
      valB: policyB?.department || 'Department of Land Resources',
    },
    {
      parameter: 'Jurisdictional Scope',
      valA: policyA?.scope || 'Pan-India',
      valB: policyB?.scope || 'Pan-India',
    },
    {
      parameter: 'Target Group / Beneficiaries',
      valA: policyA?.targetGroup || 'General Stakeholders',
      valB: policyB?.targetGroup || 'General Stakeholders',
    },
    {
      parameter: 'Core Objectives',
      valA: (policyA?.objectives || []).join('; ') || 'Statutory record modernization and rights security',
      valB: (policyB?.objectives || []).join('; ') || 'Statutory record modernization and rights security',
    },
    {
      parameter: 'Implementation Framework',
      valA: policyA?.implementationFramework || 'National and state steering committees',
      valB: policyB?.implementationFramework || 'National and state steering committees',
    },
    {
      parameter: 'Anticipated Governance Impact',
      valA: policyA?.expectedImpact || 'Enhanced transparency and reduced administrative litigation',
      valB: policyB?.expectedImpact || 'Enhanced transparency and reduced administrative litigation',
    },
    {
      parameter: 'Key Challenges & Enforcement Gaps',
      valA: (policyA?.challenges || ['Inter-departmental coordination', 'Legacy paper records discrepancy', 'State-level adoption variance']).join('; '),
      valB: (policyB?.challenges || ['Field survey validation delays', 'High pendency in revenue courts', 'Survey workforce bottlenecks']).join('; '),
    }
  ];

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-200">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-slate-900 sm:text-2xl">
              National Land Policy & Statutory Reforms Center
            </h1>
            <DemoDataBadge />
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Central & State land governance acts, DILRMP guidelines, RFCTLARR 2013, FRA 2006, and side-by-side policy reform matrices.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-xl border border-slate-200">
          <button
            onClick={() => setActiveTab('catalog')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              activeTab === 'catalog' ? 'bg-white text-blue-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <span className="flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5" />
              <span>Policies Catalog ({policies.length})</span>
            </span>
          </button>

          <button
            id="open-policy-comparison-tab"
            onClick={() => setActiveTab('comparison')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              activeTab === 'comparison' ? 'bg-white text-blue-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <span className="flex items-center gap-1.5">
              <Columns className="w-3.5 h-3.5 text-blue-600" />
              <span>Side-by-Side Comparison Matrix ⭐</span>
            </span>
          </button>
        </div>
      </div>

      {/* VIEW 1: POLICY CATALOG */}
      {activeTab === 'catalog' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {policies.map((p) => (
            <div
              key={p.id}
              onClick={() => setSelectedPolicyModal(p)}
              className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs hover:border-blue-400 hover:shadow-md transition-all flex flex-col justify-between cursor-pointer group"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-teal-700 bg-teal-50 border border-teal-200 px-2 py-0.5 rounded">
                    {p.scope}
                  </span>
                  <span className="text-xs text-slate-400 font-semibold">{p.year}</span>
                </div>

                <h3 className="text-xs font-bold text-slate-900 group-hover:text-blue-600 transition-colors leading-snug">
                  {p.policyName}
                </h3>

                <div className="text-[11px] text-slate-500 font-medium">
                  {p.department}
                </div>

                <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100 text-[11px] space-y-1.5 text-slate-600">
                  <div><strong>Target Group:</strong> {p.targetGroup}</div>
                  <div className="line-clamp-2"><strong>Core Mandate:</strong> {p.objectives?.[0] || p.description}</div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs font-semibold text-blue-600 group-hover:underline flex items-center gap-1">
                  <span>View Details</span>
                  <ArrowRight className="w-3 h-3" />
                </span>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setPolicyAId(p.id);
                    setActiveTab('comparison');
                  }}
                  className="text-[11px] font-medium text-slate-600 bg-slate-100 hover:bg-slate-200 px-2 py-1 rounded"
                >
                  Compare
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* VIEW 2: SIDE-BY-SIDE POLICY COMPARISON MATRIX ⭐ */}
      {activeTab === 'comparison' && (
        <div className="space-y-5">
          
          {/* Policy Selectors */}
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* Policy A Selector */}
            <div className="space-y-1">
              <label className="text-[11px] font-bold text-blue-800 uppercase tracking-wide flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-blue-600" />
                <span>Primary Policy (Policy A)</span>
              </label>
              <select
                id="policy-a-selector"
                value={policyAId}
                onChange={(e) => setPolicyAId(e.target.value)}
                className="w-full bg-blue-50/50 border border-blue-200 text-xs font-bold text-slate-900 rounded-lg p-2.5 focus:outline-hidden"
              >
                {policies.map(p => (
                  <option key={p.id} value={p.id}>
                    {p.policyName} ({p.year})
                  </option>
                ))}
              </select>
            </div>

            {/* Policy B Selector */}
            <div className="space-y-1">
              <label className="text-[11px] font-bold text-indigo-800 uppercase tracking-wide flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-indigo-600" />
                <span>Comparative Policy (Policy B)</span>
              </label>
              <select
                id="policy-b-selector"
                value={policyBId}
                onChange={(e) => setPolicyBId(e.target.value)}
                className="w-full bg-indigo-50/50 border border-indigo-200 text-xs font-bold text-slate-900 rounded-lg p-2.5 focus:outline-hidden"
              >
                {policies.map(p => (
                  <option key={p.id} value={p.id}>
                    {p.policyName} ({p.year})
                  </option>
                ))}
              </select>
            </div>

          </div>

          {/* AI-Assisted Comparative Synthesis & Synergies */}
          <div className="bg-gradient-to-r from-blue-900 to-indigo-950 p-5 rounded-2xl text-white shadow-md space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <h3 className="text-xs font-bold uppercase tracking-wider text-amber-300">
                  AI-Assisted Comparative Policy Synthesis & Synergies
                </h3>
              </div>
              <button
                onClick={() => onAskBhoomi(`Compare and analyze statutory interactions between ${policyA.policyName} and ${policyB.policyName}`)}
                className="text-xs font-bold text-amber-300 hover:text-white underline cursor-pointer"
              >
                Deep Synthesis in Bhoomi Assistant →
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="p-3 rounded-xl bg-white/10 border border-white/15 space-y-1">
                <div className="font-bold text-blue-200">Institutional Synergies:</div>
                <p className="text-slate-200 text-[11px] leading-relaxed">
                  Harmonizing <strong>{policyA.policyName}</strong> with <strong>{policyB.policyName}</strong> enables unified Bhu-Aadhaar cadastral indexing with computerized rights of record, preventing fraudulent non-agricultural conversion and securing customary community forest titles.
                </p>
              </div>

              <div className="p-3 rounded-xl bg-white/10 border border-white/15 space-y-1">
                <div className="font-bold text-amber-200">Recommended Governance Reforms:</div>
                <p className="text-slate-200 text-[11px] leading-relaxed">
                  1. Mandate automated cross-verification with State Land Use Master Plans before approving industrial conversions.<br />
                  2. Institutionalize fast-track Revenue Court Lok Adalats with drone ortho-mosaic evidence.
                </p>
              </div>
            </div>
          </div>

          {/* Comparison Table */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-100 text-slate-700 border-b border-slate-200">
                    <th className="p-3.5 font-bold uppercase text-[10px] text-slate-500 w-1/4">Evaluation Parameter</th>
                    <th className="p-3.5 font-bold text-blue-900 w-3/8 bg-blue-50/50">{policyA.policyName}</th>
                    <th className="p-3.5 font-bold text-indigo-900 w-3/8 bg-indigo-50/50">{policyB.policyName}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {comparisonRows.map((row, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/60 transition-colors">
                      <td className="p-3.5 font-bold text-slate-800 align-top bg-slate-50/30">
                        {row.parameter}
                      </td>
                      <td className="p-3.5 text-slate-700 align-top leading-relaxed bg-blue-50/10">
                        {row.valA}
                      </td>
                      <td className="p-3.5 text-slate-700 align-top leading-relaxed bg-indigo-50/10">
                        {row.valB}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      )}

      {/* Policy Detail Modal */}
      {selectedPolicyModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl max-w-2xl w-full shadow-2xl p-6 space-y-4">
            <div className="flex items-start justify-between border-b border-slate-100 pb-3">
              <div>
                <span className="text-[10px] font-bold text-teal-700 bg-teal-50 px-2 py-0.5 rounded">
                  {selectedPolicyModal.scope} • {selectedPolicyModal.year}
                </span>
                <h3 className="text-base font-bold text-slate-900 mt-1">
                  {selectedPolicyModal.policyName}
                </h3>
                <p className="text-xs text-slate-500">{selectedPolicyModal.department}</p>
              </div>
              <button
                onClick={() => setSelectedPolicyModal(null)}
                className="p-1 rounded-lg hover:bg-slate-100 text-slate-400"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3 bg-slate-50 rounded-xl space-y-1">
                <div className="font-bold text-slate-800">Target Beneficiaries & Scope:</div>
                <div className="text-slate-600">{selectedPolicyModal.targetGroup}</div>
              </div>

              <div>
                <div className="font-bold text-slate-800 mb-1">Key Statutory Objectives:</div>
                <ul className="list-disc list-inside space-y-1 text-slate-700 pl-1">
                  {(selectedPolicyModal.objectives || []).map((obj, i) => (
                    <li key={i}>{obj}</li>
                  ))}
                </ul>
              </div>

              <div>
                <div className="font-bold text-slate-800 mb-1">Implementation Framework:</div>
                <p className="text-slate-700 leading-relaxed">{selectedPolicyModal.implementationFramework}</p>
              </div>

              <div>
                <div className="font-bold text-slate-800 mb-1">Expected Impact on Land Governance:</div>
                <p className="text-slate-700 leading-relaxed">{selectedPolicyModal.expectedImpact}</p>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
              <button
                onClick={() => {
                  setPolicyAId(selectedPolicyModal.id);
                  setSelectedPolicyModal(null);
                  setActiveTab('comparison');
                }}
                className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs cursor-pointer"
              >
                Compare this Policy
              </button>

              <button
                onClick={() => setSelectedPolicyModal(null)}
                className="px-3 py-1.5 rounded-lg border border-slate-200 text-slate-600 text-xs"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
