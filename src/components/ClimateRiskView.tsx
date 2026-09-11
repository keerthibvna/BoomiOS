import React, { useState } from 'react';
import { 
  CloudRain, 
  AlertTriangle, 
  Thermometer, 
  Droplets, 
  ShieldAlert, 
  TrendingUp, 
  CheckCircle2, 
  ExternalLink,
  Filter
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  CartesianGrid 
} from 'recharts';
import { ClimateRiskRecord } from '../types.ts';
import { DemoDataBadge } from './DemoDataBadge.tsx';

interface ClimateRiskViewProps {
  records: ClimateRiskRecord[];
  onAskBhoomi: (query: string) => void;
}

export const ClimateRiskView: React.FC<ClimateRiskViewProps> = ({
  records,
  onAskBhoomi
}) => {
  const [selectedState, setSelectedState] = useState('All');
  const [riskFilter, setRiskFilter] = useState('All');

  const filtered = records.filter(r => {
    const matchesState = selectedState === 'All' || r.state === selectedState;
    const matchesRisk = riskFilter === 'All' || r.riskCategory === riskFilter;
    return matchesState && matchesRisk;
  });

  const chartData = filtered.map(r => ({
    name: `${r.district} (${r.state})`,
    CompositeScore: r.compositeVulnerabilityScore,
    Drought: r.droughtScore,
    Flood: r.floodRiskScore,
    WaterStress: r.waterStressScore
  }));

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-200">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-slate-900 sm:text-2xl">
              National Climate Risk & Land Vulnerability Atlas
            </h1>
            <DemoDataBadge />
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Integrating CRIDA-ICAR agro-ecological indicators: Flood exposure, drought susceptibility, aquifer drawdown, and soil degradation indices.
          </p>
        </div>

        {/* Filter Controls */}
        <div className="flex items-center gap-2 bg-white p-2 rounded-xl border border-slate-200 shadow-xs self-start">
          <Filter className="w-3.5 h-3.5 text-slate-400 ml-1" />
          <select
            value={selectedState}
            onChange={(e) => setSelectedState(e.target.value)}
            className="text-xs font-bold text-slate-900 bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 focus:outline-hidden"
          >
            <option value="All">All States</option>
            <option value="Telangana">Telangana</option>
            <option value="Maharashtra">Maharashtra</option>
            <option value="Odisha">Odisha</option>
            <option value="Uttar Pradesh">Uttar Pradesh</option>
            <option value="Karnataka">Karnataka</option>
          </select>

          <select
            value={riskFilter}
            onChange={(e) => setRiskFilter(e.target.value)}
            className="text-xs font-bold text-slate-900 bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 focus:outline-hidden"
          >
            <option value="All">All Vulnerability Classes</option>
            <option value="Very High">Very High Risk</option>
            <option value="High">High Risk</option>
            <option value="Moderate">Moderate Risk</option>
          </select>
        </div>
      </div>

      {/* High-Risk Alerts Banner */}
      <div className="bg-gradient-to-r from-purple-900 via-indigo-900 to-slate-900 rounded-2xl p-5 text-white shadow-md space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldAlert className="w-5 h-5 text-amber-400" />
            <h3 className="text-sm font-bold tracking-wide uppercase text-amber-300">
              National High Vulnerability Alerts (142 Districts Identified)
            </h3>
          </div>
          <button
            onClick={() => onAskBhoomi('What are the statutory mitigation mandates for districts with Very High climate vulnerability?')}
            className="text-xs font-semibold text-amber-300 hover:text-white underline cursor-pointer"
          >
            Evaluate Adaptation Mandates →
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
          <div className="p-3 bg-white/10 rounded-xl border border-white/10 space-y-1">
            <div className="font-bold text-amber-200">Critical Water Table Drawdown:</div>
            <p className="text-slate-200 text-[11px]">
              Telangana & Karnataka peri-urban belts exhibit stage of groundwater extraction exceeding 135% of annual replenishable recharge.
            </p>
          </div>

          <div className="p-3 bg-white/10 rounded-xl border border-white/10 space-y-1">
            <div className="font-bold text-rose-200">Soil Organic Carbon Depletion:</div>
            <p className="text-slate-200 text-[11px]">
              Maharashtra Marathwada & Vidarbha drylands show SOC below 0.35%, escalating land degradation and farmer distress.
            </p>
          </div>

          <div className="p-3 bg-white/10 rounded-xl border border-white/10 space-y-1">
            <div className="font-bold text-blue-200">Coastal Cyclone Inundation:</div>
            <p className="text-slate-200 text-[11px]">
              Odisha coastal agricultural zones face recurrent storm surge salinity, necessitating saline-resistant agro-forestry buffers.
            </p>
          </div>
        </div>
      </div>

      {/* Composite Vulnerability Comparison Chart */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3">
        <div className="flex items-center justify-between border-b border-slate-100 pb-2">
          <div>
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wide">
              District Composite Climate Vulnerability Index (0 – 100)
            </h3>
            <p className="text-[11px] text-slate-500">Multidimensional synthesis: Drought + Flood + Aquifer Drawdown + Thermal Stress</p>
          </div>
          <DemoDataBadge />
        </div>

        <div className="h-68 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="name" tick={{ fontSize: 10 }} stroke="#cbd5e1" />
              <YAxis domain={[0, 100]} tick={{ fontSize: 11 }} stroke="#cbd5e1" />
              <Tooltip contentStyle={{ fontSize: '11px', borderRadius: '8px' }} />
              <Bar dataKey="CompositeScore" fill="#7c3aed" radius={[4, 4, 0, 0]} name="Composite Risk Index" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Detailed District Risk Registry Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-slate-50/50">
          <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wide">
            District Climate Risk Registry & Evidence-Based Adaptation Matrix
          </h3>
          <span className="text-xs text-slate-500">{filtered.length} districts monitored</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead className="bg-slate-100/70 text-slate-700 border-b border-slate-200">
              <tr>
                <th className="p-3 font-bold text-[11px]">District / State</th>
                <th className="p-3 font-bold text-[11px]">Vulnerability Class</th>
                <th className="p-3 font-bold text-[11px]">Drought Susceptibility</th>
                <th className="p-3 font-bold text-[11px]">Flood Risk</th>
                <th className="p-3 font-bold text-[11px]">Water Stress</th>
                <th className="p-3 font-bold text-[11px]">Soil Degradation</th>
                <th className="p-3 font-bold text-[11px]">Recommended Adaptation Measures</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                  <td className="p-3 font-bold text-slate-900">
                    <div>{item.district}</div>
                    <div className="text-[10px] text-slate-500 font-normal">{item.state}</div>
                  </td>
                  <td className="p-3">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      item.riskCategory === 'Very High' ? 'bg-purple-100 text-purple-800 border border-purple-200' :
                      item.riskCategory === 'High' ? 'bg-rose-100 text-rose-800 border border-rose-200' :
                      'bg-amber-100 text-amber-800 border border-amber-200'
                    }`}>
                      {item.riskCategory} ({item.compositeVulnerabilityScore}/100)
                    </span>
                  </td>
                  <td className="p-3 font-mono text-slate-700">{item.droughtScore}/100</td>
                  <td className="p-3 font-mono text-slate-700">{item.floodRiskScore}/100</td>
                  <td className="p-3 font-mono text-slate-700">{item.waterStressScore}/100</td>
                  <td className="p-3 font-mono text-slate-700">{item.soilDegradationIndex}/100</td>
                  <td className="p-3 text-slate-700 max-w-xs leading-relaxed">
                    <ul className="list-disc list-inside space-y-0.5 text-[11px]">
                      {(item.adaptationRecommendations || []).map((rec, i) => (
                        <li key={i}>{rec}</li>
                      ))}
                    </ul>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
