import React, { useState } from 'react';
import { 
  BarChart3, 
  TrendingDown, 
  TrendingUp, 
  Satellite, 
  Layers, 
  Calendar, 
  Download, 
  ArrowRight,
  Info,
  CheckCircle2,
  Sliders
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  CartesianGrid, 
  Legend 
} from 'recharts';
import { DemoDataBadge } from './DemoDataBadge.tsx';

interface LandUseAnalyticsViewProps {
  onNavigateToSimulator?: () => void;
}

export const LandUseAnalyticsView: React.FC<LandUseAnalyticsViewProps> = ({
  onNavigateToSimulator
}) => {
  const [selectedState, setSelectedState] = useState('Telangana');

  const transitionMatrix = [
    { category: 'Agricultural Land (Gross)', area2015: 312000, area2020: 278000, area2025: 254500, changePct: -18.4, status: 'Severe Contraction', ndvi2015: '0.64', ndvi2025: '0.41' },
    { category: 'Urban & Built-Up Corridors', area2015: 84000, area2020: 118000, area2025: 137900, changePct: +64.2, status: 'Rapid Expansion', ndbi2015: '-0.12', ndbi2025: '+0.28' },
    { category: 'Forest & Protected Woodlands', area2015: 145000, area2020: 143500, area2025: 142400, changePct: -1.8, status: 'Moderately Stable', ndvi2015: '0.78', ndvi2025: '0.76' },
    { category: 'Water Bodies, Lakes & Tanks', area2015: 24000, area2020: 23400, area2025: 22990, changePct: -4.2, status: 'Encircling Encroachment', ndwi2015: '0.52', ndwi2025: '0.44' },
    { category: 'Industrial & Warehousing Estates', area2015: 12000, area2020: 18500, area2025: 25500, changePct: +112.5, status: 'High Capital Formation', ndbi2015: '+0.15', ndbi2025: '+0.45' }
  ];

  const timeSeriesChartData = [
    { year: '2015', Agriculture: 312, Urban: 84, Forest: 145, Industrial: 12 },
    { year: '2018', Agriculture: 295, Urban: 102, Forest: 144, Industrial: 15 },
    { year: '2020', Agriculture: 278, Urban: 118, Forest: 143, Industrial: 18 },
    { year: '2023', Agriculture: 264, Urban: 129, Forest: 143, Industrial: 22 },
    { year: '2025', Agriculture: 254, Urban: 138, Forest: 142, Industrial: 25 },
  ];

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-200">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-slate-900 sm:text-2xl">
              Decadal Land-Use Transition & Remote Sensing Analytics
            </h1>
            <DemoDataBadge />
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Empirical multi-temporal analysis tracking agro-ecological shifts, urban sprawl, and cadastral parcel conversions across India (2015 – 2025).
          </p>
        </div>

        {/* State Filter */}
        <div className="flex items-center gap-2 bg-white p-2 rounded-xl border border-slate-200 shadow-xs self-start">
          <span className="text-xs font-semibold text-slate-600">Focus State:</span>
          <select
            value={selectedState}
            onChange={(e) => setSelectedState(e.target.value)}
            className="text-xs font-bold text-slate-900 bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 focus:outline-hidden"
          >
            <option value="Telangana">Telangana (Peri-Urban Pilot)</option>
            <option value="Maharashtra">Maharashtra (Industrial Corridor)</option>
            <option value="Karnataka">Karnataka (Urban Peripheral)</option>
            <option value="Odisha">Odisha (Coastal & Forest)</option>
            <option value="Uttar Pradesh">Uttar Pradesh (Agricultural Plain)</option>
          </select>
        </div>
      </div>

      {/* Sensor & Satellite Grounding Banner */}
      <div className="bg-gradient-to-r from-blue-900 to-indigo-950 p-4 px-5 rounded-2xl text-white shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center text-amber-300">
            <Satellite className="w-5 h-5" />
          </div>
          <div>
            <div className="font-bold text-white flex items-center gap-2">
              <span>Sensor Pipeline: Sentinel-2 Multispectral & Landsat-8/9 OLI</span>
              <span className="text-[10px] px-1.5 py-0.2 rounded bg-emerald-500 text-slate-950 font-semibold">10m Ground Res</span>
            </div>
            <p className="text-[11px] text-blue-200 mt-0.5">
              Cloud cover &lt; 2.5% • Multi-temporal harmonic modeling • Post-classification sorting (Overall accuracy: 91.8%, Kappa: 0.88)
            </p>
          </div>
        </div>

        <div className="text-[11px] text-slate-300 shrink-0">
          Source: NRSC Bhuvan & State Remote Sensing Centers
        </div>
      </div>

      {/* 4 Summary Change Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5">
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span>Agricultural Land</span>
            <TrendingDown className="w-4 h-4 text-rose-600" />
          </div>
          <div className="text-2xl font-bold text-rose-600">-18.4%</div>
          <div className="text-[11px] text-slate-500">Net loss of 57,500 Hectares</div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span>Urban & Built-Up</span>
            <TrendingUp className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-bold text-emerald-600">+64.2%</div>
          <div className="text-[11px] text-slate-500">Expansion of 53,900 Hectares</div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span>Industrial Estates</span>
            <TrendingUp className="w-4 h-4 text-amber-600" />
          </div>
          <div className="text-2xl font-bold text-amber-600">+112.5%</div>
          <div className="text-[11px] text-slate-500">Manufacturing & logistics</div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span>Water Bodies Area</span>
            <TrendingDown className="w-4 h-4 text-rose-500" />
          </div>
          <div className="text-2xl font-bold text-slate-800">-4.2%</div>
          <div className="text-[11px] text-slate-500">1,010 Ha water spread lost</div>
        </div>
      </div>

      {/* Multi-Year Area Transition Chart */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-2">
          <div>
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wide">
              Multi-Year Transition Trajectory (Thousand Hectares)
            </h3>
            <p className="text-[11px] text-slate-500">Decadal trend tracking agricultural contraction against urban & industrial growth in {selectedState}</p>
          </div>
          <DemoDataBadge />
        </div>

        <div className="h-68 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={timeSeriesChartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="year" tick={{ fontSize: 11 }} stroke="#cbd5e1" />
              <YAxis tick={{ fontSize: 11 }} stroke="#cbd5e1" />
              <Tooltip contentStyle={{ fontSize: '11px', borderRadius: '8px' }} />
              <Legend wrapperStyle={{ fontSize: '11px' }} />
              <Area type="monotone" dataKey="Agriculture" stroke="#16a34a" fill="#16a34a" fillOpacity={0.2} strokeWidth={2} />
              <Area type="monotone" dataKey="Urban" stroke="#2563eb" fill="#2563eb" fillOpacity={0.2} strokeWidth={2} />
              <Area type="monotone" dataKey="Forest" stroke="#0d9488" fill="#0d9488" fillOpacity={0.2} strokeWidth={2} />
              <Area type="monotone" dataKey="Industrial" stroke="#f59e0b" fill="#f59e0b" fillOpacity={0.2} strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Decadal Transition Matrix Table with Spectral Indices */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-slate-50/50">
          <div>
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wide">
              Detailed Decadal Transition Matrix (2015 vs 2020 vs 2025)
            </h3>
            <p className="text-[11px] text-slate-500">Spectral Vegetation (NDVI) & Built-up (NDBI) signatures</p>
          </div>

          <button
            onClick={() => onNavigateToSimulator?.()}
            className="text-xs font-semibold text-blue-600 hover:underline flex items-center gap-1 cursor-pointer"
          >
            <span>Simulate Future 2030 Policies</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead className="bg-slate-100/70 text-slate-700 border-b border-slate-200">
              <tr>
                <th className="p-3 font-bold text-[11px]">Land Cover Category</th>
                <th className="p-3 font-bold text-[11px]">2015 Baseline (Ha)</th>
                <th className="p-3 font-bold text-[11px]">2020 Midpoint (Ha)</th>
                <th className="p-3 font-bold text-[11px]">2025 Current (Ha)</th>
                <th className="p-3 font-bold text-[11px]">Net Change (%)</th>
                <th className="p-3 font-bold text-[11px]">Spectral Indices</th>
                <th className="p-3 font-bold text-[11px]">Ecological Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {transitionMatrix.map((item, idx) => (
                <tr key={idx} className="hover:bg-slate-50 transition-colors">
                  <td className="p-3 font-bold text-slate-900">{item.category}</td>
                  <td className="p-3 text-slate-700 font-mono">{item.area2015.toLocaleString()}</td>
                  <td className="p-3 text-slate-700 font-mono">{item.area2020.toLocaleString()}</td>
                  <td className="p-3 text-slate-900 font-bold font-mono">{item.area2025.toLocaleString()}</td>
                  <td className={`p-3 font-bold ${item.changePct < 0 ? 'text-rose-600' : 'text-emerald-600'}`}>
                    {item.changePct > 0 ? `+${item.changePct}%` : `${item.changePct}%`}
                  </td>
                  <td className="p-3 text-slate-600 text-[11px]">
                    {item.ndvi2015 ? `NDVI: ${item.ndvi2015} → ${item.ndvi2025}` : `NDBI: ${item.ndbi2015} → ${item.ndbi2025}`}
                  </td>
                  <td className="p-3">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                      item.changePct < -10 ? 'bg-rose-50 text-rose-700 border border-rose-200' :
                      item.changePct > 50 ? 'bg-blue-50 text-blue-700 border border-blue-200' :
                      'bg-slate-100 text-slate-700'
                    }`}>
                      {item.status}
                    </span>
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
