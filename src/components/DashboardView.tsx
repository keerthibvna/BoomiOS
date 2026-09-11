import React, { useState } from 'react';
import { 
  BookOpen, 
  Database, 
  FileText, 
  FolderKanban, 
  Scale, 
  CloudRain, 
  TrendingUp, 
  ArrowUpRight, 
  Sliders, 
  Sparkles, 
  MapPin, 
  ChevronRight,
  Filter,
  Download
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  Tooltip, 
  CartesianGrid, 
  BarChart, 
  Bar, 
  PieChart, 
  Pie, 
  Cell, 
  Legend 
} from 'recharts';
import { DemoDataBadge } from './DemoDataBadge.tsx';
import { ResearchDocument, DatasetRecord } from '../types.ts';

interface DashboardViewProps {
  onNavigate: (viewId: string) => void;
  recentDocs: ResearchDocument[];
  recentDatasets: DatasetRecord[];
  onSelectDoc: (doc: ResearchDocument) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  onNavigate,
  recentDocs,
  recentDatasets,
  onSelectDoc
}) => {
  const [selectedState, setSelectedState] = useState('National');

  // National Land Use Transition Time Series (Million Hectares)
  const landUseData = [
    { year: '2015', Agriculture: 142.4, Urban: 28.2, Forest: 71.5, Industrial: 6.2 },
    { year: '2017', Agriculture: 140.2, Urban: 31.5, Forest: 71.4, Industrial: 7.3 },
    { year: '2019', Agriculture: 137.6, Urban: 35.8, Forest: 71.1, Industrial: 9.1 },
    { year: '2021', Agriculture: 133.5, Urban: 41.8, Forest: 70.8, Industrial: 11.2 },
    { year: '2023', Agriculture: 130.8, Urban: 46.2, Forest: 70.5, Industrial: 13.0 },
    { year: '2025', Agriculture: 128.4, Urban: 51.1, Forest: 70.2, Industrial: 15.4 },
  ];

  const stateActivity = [
    { state: 'Maharashtra', publications: 210, datasets: 54 },
    { state: 'Uttar Pradesh', publications: 195, datasets: 48 },
    { state: 'Karnataka', publications: 168, datasets: 42 },
    { state: 'Telangana', publications: 142, datasets: 38 },
    { state: 'Gujarat', publications: 132, datasets: 35 },
    { state: 'Odisha', publications: 115, datasets: 29 },
  ];

  const disputeDistribution = [
    { name: 'Boundary & Demarcation', value: 34.6, color: '#2563eb' },
    { name: 'Title & RoR Discrepancy', value: 26.8, color: '#0284c7' },
    { name: 'Succession & Mutation', value: 18.3, color: '#0d9488' },
    { name: 'Commons Encroachment', value: 12.0, color: '#e11d48' },
    { name: 'Acquisition & Compensation', value: 8.3, color: '#f59e0b' },
  ];

  const publicationTrends = [
    { year: '2020', count: 184 },
    { year: '2021', count: 245 },
    { year: '2022', count: 320 },
    { year: '2023', count: 415 },
    { year: '2024', count: 498 },
  ];

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-200">
      
      {/* Top Banner with Platform Title & State Filter */}
      <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 rounded-2xl p-6 text-white shadow-md relative overflow-hidden">
        <div className="absolute right-0 top-0 bottom-0 w-96 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-500/20 via-transparent to-transparent pointer-events-none" />
        
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-amber-400 text-slate-900">
                Department of Land Resources (DoLR)
              </span>
              <DemoDataBadge className="bg-white/10 text-amber-300 border-white/20" />
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
              National Land Governance & Research Decision Platform
            </h1>
            <p className="text-sm text-blue-100/80 mt-1.5 max-w-3xl leading-relaxed">
              Unified digital repository integrating multi-temporal satellite observations, cadastral records (DILRMP/SVAMITVA), empirical policy research, and ML-based policy simulation for evidence-based Indian land administration.
            </p>
          </div>

          {/* Quick Filters */}
          <div className="flex flex-wrap items-center gap-2.5 bg-white/10 p-2 rounded-xl backdrop-blur-xs border border-white/10 self-start lg:self-center">
            <Filter className="w-4 h-4 text-blue-200 ml-1" />
            <span className="text-xs text-blue-100 font-medium">State Scope:</span>
            <select
              id="dashboard-state-selector"
              value={selectedState}
              onChange={(e) => setSelectedState(e.target.value)}
              className="bg-slate-800 text-white text-xs font-semibold rounded-lg px-3 py-1.5 border border-white/20 focus:outline-hidden cursor-pointer"
            >
              <option value="National">National (All India)</option>
              <option value="Telangana">Telangana (Peri-Urban Pilot)</option>
              <option value="Maharashtra">Maharashtra (Industrial Corridor)</option>
              <option value="Odisha">Odisha (FRA & Mineral Belt)</option>
              <option value="Uttar Pradesh">Uttar Pradesh (Gangetic Plains)</option>
              <option value="Karnataka">Karnataka (Bhoomi Cadastre)</option>
            </select>
          </div>
        </div>
      </div>

      {/* 6 Key National Metric Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3.5">
        
        <div 
          onClick={() => onNavigate('research')} 
          className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-xs hover:border-blue-400 transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between text-slate-500 text-xs">
            <span>Research Papers</span>
            <BookOpen className="w-4 h-4 text-blue-600 group-hover:scale-110 transition-transform" />
          </div>
          <div className="text-2xl font-bold text-slate-900 mt-2">2,184</div>
          <div className="text-[11px] text-emerald-600 flex items-center gap-1 mt-1">
            <TrendingUp className="w-3 h-3" />
            <span>+18% peer-reviewed</span>
          </div>
        </div>

        <div 
          onClick={() => onNavigate('datasets')} 
          className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-xs hover:border-blue-400 transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between text-slate-500 text-xs">
            <span>Land Datasets</span>
            <Database className="w-4 h-4 text-indigo-600 group-hover:scale-110 transition-transform" />
          </div>
          <div className="text-2xl font-bold text-slate-900 mt-2">328</div>
          <div className="text-[11px] text-slate-500 mt-1">
            GeoJSON, CSV, Shapefile
          </div>
        </div>

        <div 
          onClick={() => onNavigate('policies')} 
          className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-xs hover:border-blue-400 transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between text-slate-500 text-xs">
            <span>Policies & Acts</span>
            <FileText className="w-4 h-4 text-teal-600 group-hover:scale-110 transition-transform" />
          </div>
          <div className="text-2xl font-bold text-slate-900 mt-2">92</div>
          <div className="text-[11px] text-slate-500 mt-1">
            Central & State Statutes
          </div>
        </div>

        <div 
          onClick={() => onNavigate('projects')} 
          className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-xs hover:border-blue-400 transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between text-slate-500 text-xs">
            <span>Active Projects</span>
            <FolderKanban className="w-4 h-4 text-amber-600 group-hover:scale-110 transition-transform" />
          </div>
          <div className="text-2xl font-bold text-slate-900 mt-2">56</div>
          <div className="text-[11px] text-slate-500 mt-1">
            Multi-Institutional Hubs
          </div>
        </div>

        <div 
          onClick={() => onNavigate('disputes')} 
          className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-xs hover:border-blue-400 transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between text-slate-500 text-xs">
            <span>Land Disputes</span>
            <Scale className="w-4 h-4 text-rose-600 group-hover:scale-110 transition-transform" />
          </div>
          <div className="text-2xl font-bold text-slate-900 mt-2">2.84 L</div>
          <div className="text-[11px] text-rose-600 font-medium mt-1">
            64.2% Civil Pendency
          </div>
        </div>

        <div 
          onClick={() => onNavigate('climate')} 
          className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-xs hover:border-blue-400 transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between text-slate-500 text-xs">
            <span>Climate Risk Hotspots</span>
            <CloudRain className="w-4 h-4 text-purple-600 group-hover:scale-110 transition-transform" />
          </div>
          <div className="text-2xl font-bold text-slate-900 mt-2">142</div>
          <div className="text-[11px] text-amber-600 font-medium mt-1">
            High Vulnerability Dist.
          </div>
        </div>

      </div>

      {/* Flagship Callouts: Simulator & Bhoomi AI Assistant */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        
        <div className="bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200/80 rounded-2xl p-5 flex items-center justify-between shadow-xs">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-200 text-amber-900">
                FLAGSHIP DECISION TOOL
              </span>
              <span className="text-xs text-amber-800 font-semibold">Scenario Engine</span>
            </div>
            <h3 className="text-lg font-bold text-slate-900">Policy Simulation Module ⭐</h3>
            <p className="text-xs text-slate-600 max-w-md">
              Model the socio-economic, water, food security, and displacement impacts of proposed zoning changes before statutory gazetting.
            </p>
          </div>
          <button
            onClick={() => onNavigate('simulator')}
            className="shrink-0 ml-4 px-4 py-2 rounded-xl text-xs font-bold bg-amber-600 hover:bg-amber-700 text-white shadow-xs flex items-center gap-1.5 cursor-pointer"
          >
            <Sliders className="w-3.5 h-3.5" />
            <span>Launch Simulator</span>
          </button>
        </div>

        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200/80 rounded-2xl p-5 flex items-center justify-between shadow-xs">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-200 text-blue-900">
                RAG INTELLIGENCE
              </span>
              <span className="text-xs text-blue-800 font-semibold">Gemini 3.8 Flash</span>
            </div>
            <h3 className="text-lg font-bold text-slate-900">Bhoomi AI Research Assistant</h3>
            <p className="text-xs text-slate-600 max-w-md">
              Ask natural language land governance queries grounded in verified Indian research papers, statutory acts, and satellite datasets.
            </p>
          </div>
          <button
            onClick={() => onNavigate('bhoomi-ai')}
            className="shrink-0 ml-4 px-4 py-2 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white shadow-xs flex items-center gap-1.5 cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Ask Bhoomi AI</span>
          </button>
        </div>

      </div>

      {/* Visual Charts Grid: 4 Core Empirical Visualizers */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        
        {/* Main Chart: Decadal Land-Use Transitions (8 cols) */}
        <div className="lg:col-span-8 bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-bold text-slate-900">
                  Decadal Land-Use Shift & Transition Dynamics (2015 – 2025)
                </h3>
                <DemoDataBadge />
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Multi-temporal satellite synthesis: Cultivated agricultural vs Built-up urban & industrial area (Million Ha)
              </p>
            </div>
            <button
              onClick={() => onNavigate('land-use')}
              className="text-xs text-blue-600 font-semibold hover:underline flex items-center gap-1 cursor-pointer"
            >
              <span>Detailed Breakdown</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={landUseData} margin={{ top: 10, right: 10, left: -15, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorAgri" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#16a34a" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#16a34a" stopOpacity={0.0}/>
                  </linearGradient>
                  <linearGradient id="colorUrban" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2563eb" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#2563eb" stopOpacity={0.0}/>
                  </linearGradient>
                  <linearGradient id="colorInd" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#f59e0b" stopOpacity={0.0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="year" tick={{ fontSize: 12, fill: '#64748b' }} stroke="#cbd5e1" />
                <YAxis tick={{ fontSize: 12, fill: '#64748b' }} stroke="#cbd5e1" />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#ffffff', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '12px' }}
                />
                <Area type="monotone" dataKey="Agriculture" stroke="#16a34a" strokeWidth={2} fillOpacity={1} fill="url(#colorAgri)" />
                <Area type="monotone" dataKey="Urban" stroke="#2563eb" strokeWidth={2} fillOpacity={1} fill="url(#colorUrban)" />
                <Area type="monotone" dataKey="Industrial" stroke="#f59e0b" strokeWidth={2} fillOpacity={1} fill="url(#colorInd)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="flex flex-wrap items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-100">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-600" />
                <span>Agriculture (-9.8% contraction)</span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-600" />
                <span>Urban (+81.2% expansion)</span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                <span>Industrial Corridors (+148%)</span>
              </span>
            </div>
            <span className="text-[11px] text-slate-400">Source: NRSC & State Land Revenue Records</span>
          </div>
        </div>

        {/* Dispute Pendency Breakdown (4 cols) */}
        <div className="lg:col-span-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-900">Land Dispute Classifications</h3>
              <DemoDataBadge />
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Root causes of litigation across Revenue & Civil Courts
            </p>
          </div>

          <div className="h-48 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={disputeDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={75}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {disputeDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(val) => [`${val}%`, 'Cases Share']}
                  contentStyle={{ backgroundColor: '#ffffff', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '11px' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="space-y-1.5 text-xs">
            {disputeDistribution.map((item) => (
              <div key={item.name} className="flex items-center justify-between text-slate-600">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="truncate max-w-[170px]">{item.name}</span>
                </div>
                <span className="font-semibold text-slate-900">{item.value}%</span>
              </div>
            ))}
          </div>

          <button
            onClick={() => onNavigate('disputes')}
            className="w-full py-1.5 rounded-lg text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 text-center transition-colors cursor-pointer"
          >
            Explore Judicial Pendency Matrix
          </button>
        </div>

      </div>

      {/* Secondary Visualizers: State Research Distribution & Publication Growth */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        
        {/* Research by State */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2">
            <div>
              <h3 className="text-sm font-bold text-slate-900">Research & Datasets by State Hub</h3>
              <p className="text-xs text-slate-500">Distribution of indexed empirical studies and open cadastral layers</p>
            </div>
            <DemoDataBadge />
          </div>

          <div className="h-60 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={stateActivity} layout="vertical" margin={{ top: 5, right: 20, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f5f9" />
                <XAxis type="number" tick={{ fontSize: 11 }} stroke="#cbd5e1" />
                <YAxis dataKey="state" type="category" tick={{ fontSize: 11 }} stroke="#cbd5e1" width={90} />
                <Tooltip contentStyle={{ fontSize: '11px', borderRadius: '8px' }} />
                <Bar dataKey="publications" fill="#2563eb" radius={[0, 4, 4, 0]} name="Publications" />
                <Bar dataKey="datasets" fill="#0d9488" radius={[0, 4, 4, 0]} name="Datasets" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Publication Growth Trends */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2">
            <div>
              <h3 className="text-sm font-bold text-slate-900">National Research Publication Growth</h3>
              <p className="text-xs text-slate-500">Indexed academic papers, policy briefs, and legal dissertations</p>
            </div>
            <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
              +38% CAGR
            </span>
          </div>

          <div className="h-60 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={publicationTrends} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="year" tick={{ fontSize: 11 }} stroke="#cbd5e1" />
                <YAxis tick={{ fontSize: 11 }} stroke="#cbd5e1" />
                <Tooltip contentStyle={{ fontSize: '11px', borderRadius: '8px' }} />
                <Bar dataKey="count" fill="#4f46e5" radius={[4, 4, 0, 0]} name="Annual Papers" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

      {/* Recent High-Impact Publications & Datasets Feed */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        
        {/* Research Papers Feed */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2">
            <h3 className="text-sm font-bold text-slate-900">Recent Peer-Reviewed Publications</h3>
            <button 
              onClick={() => onNavigate('research')} 
              className="text-xs text-blue-600 font-semibold hover:underline cursor-pointer"
            >
              View all
            </button>
          </div>

          <div className="divide-y divide-slate-100">
            {(recentDocs || []).slice(0, 3).map((doc) => (
              <div 
                key={doc.id}
                onClick={() => {
                  onSelectDoc(doc);
                  onNavigate('research');
                }}
                className="py-3 hover:bg-slate-50/80 rounded-lg px-2 -mx-2 transition-colors cursor-pointer group"
              >
                <div className="flex items-center gap-2 text-[11px] text-slate-500">
                  <span className="font-semibold text-blue-700 bg-blue-50 px-2 py-0.5 rounded">{doc.category}</span>
                  <span>•</span>
                  <span>{doc.state}</span>
                  <span>•</span>
                  <span>{doc.year}</span>
                </div>
                <h4 className="text-xs font-bold text-slate-900 group-hover:text-blue-600 transition-colors mt-1 line-clamp-1">
                  {doc.title}
                </h4>
                <p className="text-[11px] text-slate-500 line-clamp-2 mt-0.5">
                  {doc.abstract}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Datasets Feed */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2">
            <h3 className="text-sm font-bold text-slate-900">Verified Geospatial & Field Datasets</h3>
            <button 
              onClick={() => onNavigate('datasets')} 
              className="text-xs text-blue-600 font-semibold hover:underline cursor-pointer"
            >
              View catalog
            </button>
          </div>

          <div className="divide-y divide-slate-100">
            {(recentDatasets || []).slice(0, 3).map((ds) => (
              <div 
                key={ds.id}
                onClick={() => onNavigate('datasets')}
                className="py-3 hover:bg-slate-50/80 rounded-lg px-2 -mx-2 transition-colors cursor-pointer group"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-semibold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded">
                    {ds.format} • {ds.size}
                  </span>
                  <span className="text-[11px] text-slate-400">{ds.organization}</span>
                </div>
                <h4 className="text-xs font-bold text-slate-900 group-hover:text-indigo-600 transition-colors mt-1 line-clamp-1">
                  {ds.name}
                </h4>
                <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">
                  {ds.description}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};
