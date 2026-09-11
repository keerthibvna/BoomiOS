import React, { useState } from 'react';
import { 
  Scale, 
  AlertCircle, 
  Clock, 
  FileWarning, 
  ShieldCheck, 
  TrendingUp, 
  Gavel, 
  Building, 
  ChevronRight,
  HelpCircle,
  Sparkles
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  Legend, 
  CartesianGrid 
} from 'recharts';
import { LandDisputeStats } from '../types.ts';
import { DemoDataBadge } from './DemoDataBadge.tsx';

interface DisputeAnalyticsViewProps {
  stats: LandDisputeStats;
  onAskBhoomi: (query: string) => void;
}

export const DisputeAnalyticsView: React.FC<DisputeAnalyticsViewProps> = ({
  stats,
  onAskBhoomi
}) => {
  const [selectedDisputeCategory, setSelectedDisputeCategory] = useState<string>('Title & Ownership Conflicts');

  const COLORS = ['#2563eb', '#ea580c', '#0d9488', '#e11d48', '#8b5cf6'];

  const categoryBreakdown = Object.entries(stats?.disputeCategories || {}).map(([key, val]) => ({
    name: key,
    value: val
  }));

  const rootCausesData = [
    { cause: 'Inaccurate Cadastral & Tippan Survey Maps', percentage: 38, impact: 'Boundary overlaps, missing survey stones' },
    { cause: 'Delayed / Contested Revenue Record Mutations', percentage: 27, impact: 'Inheritance unrecorded, double-registry fraud' },
    { cause: 'Common Property Resource Encroachments (Gairan / Poramboke)', percentage: 18, impact: 'Gram Panchayat pastureland privatization' },
    { cause: 'Under-Compensated Statutory Land Acquisition', percentage: 17, impact: 'Section 24 RFCTLARR litigation in High Courts' }
  ];

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-200">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-slate-900 sm:text-2xl">
              National Land Dispute & Judicial Analytics Center
            </h1>
            <DemoDataBadge />
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Judicial metrics across Revenue Courts (Tehsildar, RDO, Collector) and Civil District Courts on land litigation bottlenecks and root causes.
          </p>
        </div>

        {/* Query Bhoomi CTA */}
        <button
          onClick={() => onAskBhoomi('What statutory reforms and ADR Lok Adalat mechanisms can reduce land dispute pendency in Revenue Courts?')}
          className="px-3.5 py-2 rounded-xl bg-blue-900 hover:bg-blue-950 text-white font-bold text-xs flex items-center gap-1.5 shadow-xs cursor-pointer self-start"
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>AI Dispute Reduction Analysis</span>
        </button>
      </div>

      {/* 4 Macro Key Metrics Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5">
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span>Total Pending Land Cases</span>
            <Gavel className="w-4 h-4 text-rose-600" />
          </div>
          <div className="text-2xl font-bold text-rose-600">
            {stats.totalPendingDisputes.toLocaleString()}
          </div>
          <div className="text-[11px] text-slate-500">Estimated ~66% of all civil litigation</div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span>Average Case Duration</span>
            <Clock className="w-4 h-4 text-amber-600" />
          </div>
          <div className="text-2xl font-bold text-amber-600">
            {stats.averageDurationYears} Years
          </div>
          <div className="text-[11px] text-slate-500">Tehsildar to High Court appeal cycle</div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span>Revenue Court Pendency</span>
            <Building className="w-4 h-4 text-blue-600" />
          </div>
          <div className="text-2xl font-bold text-blue-900">
            {stats.revenueCourtVsCivilCourt.revenueCourtPercentage}%
          </div>
          <div className="text-[11px] text-slate-500">Quasi-judicial executive adjudication</div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span>Civil Judiciary Pendency</span>
            <Scale className="w-4 h-4 text-indigo-600" />
          </div>
          <div className="text-2xl font-bold text-indigo-900">
            {stats.revenueCourtVsCivilCourt.civilCourtPercentage}%
          </div>
          <div className="text-[11px] text-slate-500">Title suits, injunctions & partitions</div>
        </div>
      </div>

      {/* Grid: Dispute Categorization (Donut chart) & State-Wise Pendency (Bar chart) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        
        {/* Category Breakdown (5 cols) */}
        <div className="lg:col-span-5 bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wide">
              Dispute Typology Breakdown
            </h3>
            <DemoDataBadge />
          </div>

          <div className="h-56 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryBreakdown}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={75}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {categoryBreakdown.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value: any) => `${value}%`} contentStyle={{ fontSize: '11px', borderRadius: '8px' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="space-y-1.5 text-xs">
            {categoryBreakdown.map((item, idx) => (
              <div key={item.name} className="flex items-center justify-between p-1.5 rounded hover:bg-slate-50">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: COLORS[idx % COLORS.length] }} />
                  <span className="text-slate-700 font-medium truncate">{item.name}</span>
                </div>
                <span className="font-bold text-slate-900">{item.value}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* State-Wise Ranking (7 cols) */}
        <div className="lg:col-span-7 bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2">
            <div>
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wide">
                State-Wise Land Dispute Volume (Revenue & Civil)
              </h3>
              <p className="text-[11px] text-slate-500">Highest case load concentrated in peri-urbanizing states</p>
            </div>
            <DemoDataBadge />
          </div>

          <div className="h-68 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={stats.stateRankings} layout="vertical" margin={{ top: 10, right: 20, left: 30, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f5f9" />
                <XAxis type="number" tick={{ fontSize: 11 }} stroke="#cbd5e1" />
                <YAxis dataKey="state" type="category" tick={{ fontSize: 11 }} stroke="#cbd5e1" />
                <Tooltip formatter={(val: any) => val.toLocaleString()} contentStyle={{ fontSize: '11px', borderRadius: '8px' }} />
                <Bar dataKey="disputeCount" fill="#2563eb" radius={[0, 4, 4, 0]} name="Pending Disputes" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

      {/* Root Causes Analysis & Evidence-Based Reform Recommendations */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-5 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div>
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wide">
              Empirical Root Cause Analysis & Technological Interventions
            </h3>
            <p className="text-[11px] text-slate-500">Why do land disputes erupt and endure for decades across Indian courts?</p>
          </div>
          <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200">
            DILRMP & SVAMITVA Solution Mapping
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          {rootCausesData.map((rc, idx) => (
            <div key={idx} className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-900 text-xs">{rc.cause}</span>
                <span className="font-mono font-bold text-rose-600 bg-rose-50 px-2 py-0.5 rounded border border-rose-200">
                  {rc.percentage}%
                </span>
              </div>
              <p className="text-slate-600 text-[11px] leading-relaxed">
                <strong>Governance Bottleneck:</strong> {rc.impact}
              </p>
              <div className="text-[11px] text-emerald-700 font-semibold pt-1 border-t border-slate-200/60 flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 shrink-0" />
                <span>Modernization Fix: Drone cadastral survey + Bhu-Aadhaar (ULPIN) indexing</span>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
