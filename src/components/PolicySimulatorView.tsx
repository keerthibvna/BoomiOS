import React, { useState } from 'react';
import { 
  Sliders, 
  Sparkles, 
  AlertTriangle, 
  TrendingUp, 
  TrendingDown, 
  Droplets, 
  Building2, 
  Users, 
  Trees, 
  ShieldAlert, 
  Printer, 
  FileText, 
  RefreshCw, 
  CheckCircle2,
  ChevronRight,
  Info
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  CartesianGrid, 
  Legend 
} from 'recharts';
import { PolicySimulationInput, PolicySimulationResult } from '../types.ts';
import { DemoDataBadge } from './DemoDataBadge.tsx';

interface PolicySimulatorViewProps {
  onGenerateReportModal: (topic: string, focusArea: string) => void;
}

export const PolicySimulatorView: React.FC<PolicySimulatorViewProps> = ({
  onGenerateReportModal
}) => {
  // Input parameters
  const [policyTitle, setPolicyTitle] = useState('Convert Agricultural Land for Industrial Corridor');
  const [state, setState] = useState('Telangana');
  const [district, setDistrict] = useState('Rangareddy & Sangareddy');
  const [landCategory, setLandCategory] = useState<'Agricultural' | 'Fallow' | 'Forest Border' | 'Wetlands'>('Agricultural');
  const [conversionPercentage, setConversionPercentage] = useState<number>(10);
  const [timeHorizonYears, setTimeHorizonYears] = useState<number>(5);
  const [developmentType, setDevelopmentType] = useState<PolicySimulationInput['developmentType']>('High-Density Industrial');
  const [mitigationFactor, setMitigationFactor] = useState<PolicySimulationInput['mitigationFactor']>('Strict Water Recycling');
  
  const [isSimulating, setIsSimulating] = useState(false);
  const [simulationResult, setSimulationResult] = useState<PolicySimulationResult | null>(null);

  // Run simulation handler
  const handleRunSimulation = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setIsSimulating(true);

    try {
      const res = await fetch('/api/simulation/run', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          policyTitle,
          state,
          district,
          landCategory,
          conversionPercentage,
          timeHorizonYears,
          developmentType,
          mitigationFactor
        })
      });
      const data = await res.json();
      setSimulationResult(data);
    } catch (err) {
      console.error('Simulation calculation error:', err);
    } finally {
      setIsSimulating(false);
    }
  };

  // Run initial simulation on load for seamless presentation
  React.useEffect(() => {
    handleRunSimulation();
  }, []);

  // Comparison Chart Data
  const comparisonData = simulationResult ? [
    {
      metric: 'Jobs Created',
      'Scenario A (Baseline)': simulationResult.scenarios.scenarioA.estimatedJobsCreated,
      'Scenario B (Moderate)': simulationResult.scenarios.scenarioB.estimatedJobsCreated,
      'Scenario C (High)': simulationResult.scenarios.scenarioC.estimatedJobsCreated,
    },
    {
      metric: 'Displaced Agrarian (People)',
      'Scenario A (Baseline)': simulationResult.scenarios.scenarioA.farmerDisplacementEst,
      'Scenario B (Moderate)': simulationResult.scenarios.scenarioB.farmerDisplacementEst,
      'Scenario C (High)': simulationResult.scenarios.scenarioC.farmerDisplacementEst,
    },
    {
      metric: 'Infra Capex (₹ Cr)',
      'Scenario A (Baseline)': simulationResult.scenarios.scenarioA.infrastructureInvestmentCrores,
      'Scenario B (Moderate)': simulationResult.scenarios.scenarioB.infrastructureInvestmentCrores,
      'Scenario C (High)': simulationResult.scenarios.scenarioC.infrastructureInvestmentCrores,
    }
  ] : [];

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-200">
      
      {/* Title & Mandatory Disclaimer Banner */}
      <div className="bg-gradient-to-r from-amber-600 via-orange-600 to-amber-700 p-6 rounded-2xl text-white shadow-md relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-white text-slate-900 uppercase">
                National Decision-Support Engine
              </span>
              <DemoDataBadge className="bg-white/20 text-white border-white/30" />
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
              Land Policy Simulation & Scenario Evaluation Module ⭐
            </h1>
            <p className="text-xs text-orange-100 mt-1 max-w-2xl leading-relaxed">
              Transparent multi-variable spatial decision model evaluating land conversion tradeoffs across agrarian livelihoods, water stress, infrastructure capex, and climate vulnerability.
            </p>
          </div>

          <div className="bg-black/20 p-3 rounded-xl border border-white/20 text-xs max-w-sm self-start md:self-center">
            <div className="flex items-start gap-2 text-amber-200 font-semibold text-[11px]">
              <AlertTriangle className="w-4 h-4 shrink-0 text-amber-300" />
              <span>STATUTORY NOTICE / MANDATORY DISCLAIMER:</span>
            </div>
            <p className="text-[11px] text-white/90 mt-1 leading-snug">
              “Model-based scenario estimates for decision support. Not an official government prediction.”
            </p>
          </div>
        </div>
      </div>

      {/* Simulator Grid: Inputs (4 cols) & Scenario Outputs (8 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* INPUT CONTROLS PANEL (4 cols) */}
        <div className="lg:col-span-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2">
              <Sliders className="w-4 h-4 text-amber-600" />
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wide">
                Simulation Parameters
              </h3>
            </div>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-600">
              Interactive
            </span>
          </div>

          <form onSubmit={handleRunSimulation} className="space-y-3.5 text-xs">
            {/* Policy Title */}
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Proposed Policy Title</label>
              <input
                id="policy-input-title"
                type="text"
                value={policyTitle}
                onChange={(e) => setPolicyTitle(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs font-medium"
              />
            </div>

            {/* Geographic Area */}
            <div className="grid grid-cols-2 gap-2.5">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">State Scope</label>
                <select
                  id="policy-input-state"
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  className="w-full px-2.5 py-1.5 rounded-lg border border-slate-200 text-xs font-medium text-slate-800"
                >
                  <option value="Telangana">Telangana</option>
                  <option value="Maharashtra">Maharashtra</option>
                  <option value="Karnataka">Karnataka</option>
                  <option value="Odisha">Odisha</option>
                  <option value="Uttar Pradesh">Uttar Pradesh</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">District / Corridor</label>
                <input
                  type="text"
                  value={district}
                  onChange={(e) => setDistrict(e.target.value)}
                  className="w-full px-2.5 py-1.5 rounded-lg border border-slate-200 text-xs font-medium text-slate-800"
                />
              </div>
            </div>

            {/* Land Category */}
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Target Land Category</label>
              <select
                id="policy-input-category"
                value={landCategory}
                onChange={(e) => setLandCategory(e.target.value as any)}
                className="w-full px-2.5 py-1.5 rounded-lg border border-slate-200 text-xs font-medium text-slate-800"
              >
                <option value="Agricultural">Agricultural (Multi-Cropped & Irrigated)</option>
                <option value="Fallow">Dryland & Culturable Fallow</option>
                <option value="Forest Border">Eco-Sensitive Forest Buffer</option>
                <option value="Wetlands">Wetlands & Tank Command Area</option>
              </select>
            </div>

            {/* Percentage Change Slider */}
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 space-y-2">
              <div className="flex items-center justify-between">
                <label className="font-bold text-slate-800">Conversion Percentage</label>
                <span className="font-mono text-sm font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                  {conversionPercentage}%
                </span>
              </div>
              <input
                id="policy-input-percentage-slider"
                type="range"
                min={1}
                max={40}
                step={1}
                value={conversionPercentage}
                onChange={(e) => setConversionPercentage(Number(e.target.value))}
                className="w-full accent-amber-600 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400">
                <span>1% (Pilot)</span>
                <span>10% (Regional)</span>
                <span>40% (Macro)</span>
              </div>
            </div>

            {/* Time Period Horizon */}
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Time Horizon (Years)</label>
              <select
                value={timeHorizonYears}
                onChange={(e) => setTimeHorizonYears(Number(e.target.value))}
                className="w-full px-2.5 py-1.5 rounded-lg border border-slate-200 text-xs font-medium"
              >
                <option value={3}>3 Years (Immediate Phasing)</option>
                <option value={5}>5 Years (Standard Master Plan)</option>
                <option value={10}>10 Years (Decadal Transformation)</option>
              </select>
            </div>

            {/* Development Type */}
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Planned Development Type</label>
              <select
                value={developmentType}
                onChange={(e) => setDevelopmentType(e.target.value as any)}
                className="w-full px-2.5 py-1.5 rounded-lg border border-slate-200 text-xs font-medium"
              >
                <option value="High-Density Industrial">High-Density Industrial (Manufacturing/Pharma)</option>
                <option value="Agri-Tech Corridor">Agri-Tech & Food Processing Corridor</option>
                <option value="Smart Township">Smart Township & High-Rise Residential</option>
                <option value="Renewable Energy Zone">Solar / Wind Renewable Energy Zone</option>
                <option value="Mixed Urban Expansion">Mixed Urban Peripheral Expansion</option>
              </select>
            </div>

            {/* Mitigation Factor */}
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Mitigation Framework</label>
              <select
                value={mitigationFactor}
                onChange={(e) => setMitigationFactor(e.target.value as any)}
                className="w-full px-2.5 py-1.5 rounded-lg border border-slate-200 text-xs font-medium"
              >
                <option value="Strict Water Recycling">Mandatory 100% Tertiary Water Recycling</option>
                <option value="High Afforestation Offset">Compensatory Agro-Forestry Buffer (20%)</option>
                <option value="Standard Compensation Only">Statutory Cash Compensation (RFCTLARR only)</option>
              </select>
            </div>

            {/* Run Button */}
            <button
              id="execute-policy-simulation-btn"
              type="submit"
              disabled={isSimulating}
              className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98"
            >
              {isSimulating ? (
                <>
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  <span>Calculating Model Indicators...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Run Model Simulation</span>
                </>
              )}
            </button>
          </form>
        </div>

        {/* SIMULATION RESULTS & SCENARIO COMPARISON (8 cols) */}
        <div className="lg:col-span-8 space-y-5">
          
          {simulationResult && (
            <>
              {/* Scenario Comparison Cards (Scenarios A, B, C) */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
                
                {/* Scenario A: Baseline */}
                <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs space-y-2 relative overflow-hidden">
                  <div className="h-1 w-full bg-slate-400 absolute top-0 left-0" />
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                      SCENARIO A
                    </span>
                    <span className="text-[11px] text-slate-400">Baseline</span>
                  </div>
                  <h4 className="text-xs font-bold text-slate-900">No Policy Change</h4>
                  <p className="text-[11px] text-slate-500 line-clamp-2">
                    {simulationResult.scenarios.scenarioA.description}
                  </p>

                  <div className="pt-2 border-t border-slate-100 space-y-1.5 text-xs">
                    <div className="flex justify-between">
                      <span className="text-slate-500">Agri Area Lost:</span>
                      <strong className="text-slate-800">{simulationResult.scenarios.scenarioA.agriculturalAreaLostHa.toLocaleString()} Ha</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Est. Employment:</span>
                      <strong className="text-slate-800">+{simulationResult.scenarios.scenarioA.estimatedJobsCreated.toLocaleString()} jobs</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Capex Required:</span>
                      <strong className="text-slate-800">₹{simulationResult.scenarios.scenarioA.infrastructureInvestmentCrores} Cr</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Water Demand:</span>
                      <strong className="text-slate-800">+{simulationResult.scenarios.scenarioA.dailyWaterDemandMld} MLD</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Env Risk Score:</span>
                      <strong className="text-emerald-600">{simulationResult.scenarios.scenarioA.environmentalRiskScore} / 100 (Low)</strong>
                    </div>
                  </div>
                </div>

                {/* Scenario B: Moderate */}
                <div className="bg-white p-4 rounded-xl border-2 border-blue-400 shadow-xs space-y-2 relative overflow-hidden">
                  <div className="h-1 w-full bg-blue-600 absolute top-0 left-0" />
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-100 text-blue-800">
                      SCENARIO B
                    </span>
                    <span className="text-[10px] font-bold text-blue-700 bg-blue-50 px-1.5 py-0.2 rounded">Recommended</span>
                  </div>
                  <h4 className="text-xs font-bold text-slate-900">Moderate Implementation</h4>
                  <p className="text-[11px] text-slate-500 line-clamp-2">
                    {simulationResult.scenarios.scenarioB.description}
                  </p>

                  <div className="pt-2 border-t border-slate-100 space-y-1.5 text-xs">
                    <div className="flex justify-between">
                      <span className="text-slate-500">Agri Area Lost:</span>
                      <strong className="text-slate-800">{simulationResult.scenarios.scenarioB.agriculturalAreaLostHa.toLocaleString()} Ha</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Est. Employment:</span>
                      <strong className="text-blue-700">+{simulationResult.scenarios.scenarioB.estimatedJobsCreated.toLocaleString()} jobs</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Capex Required:</span>
                      <strong className="text-slate-800">₹{simulationResult.scenarios.scenarioB.infrastructureInvestmentCrores.toLocaleString()} Cr</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Water Demand:</span>
                      <strong className="text-slate-800">+{simulationResult.scenarios.scenarioB.dailyWaterDemandMld} MLD</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Env Risk Score:</span>
                      <strong className="text-amber-600">{simulationResult.scenarios.scenarioB.environmentalRiskScore} / 100 (Moderate)</strong>
                    </div>
                  </div>
                </div>

                {/* Scenario C: High */}
                <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs space-y-2 relative overflow-hidden">
                  <div className="h-1 w-full bg-orange-600 absolute top-0 left-0" />
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-orange-100 text-orange-800">
                      SCENARIO C
                    </span>
                    <span className="text-[11px] text-orange-600 font-semibold">Accelerated</span>
                  </div>
                  <h4 className="text-xs font-bold text-slate-900">High Implementation</h4>
                  <p className="text-[11px] text-slate-500 line-clamp-2">
                    {simulationResult.scenarios.scenarioC.description}
                  </p>

                  <div className="pt-2 border-t border-slate-100 space-y-1.5 text-xs">
                    <div className="flex justify-between">
                      <span className="text-slate-500">Agri Area Lost:</span>
                      <strong className="text-rose-700">{simulationResult.scenarios.scenarioC.agriculturalAreaLostHa.toLocaleString()} Ha</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Est. Employment:</span>
                      <strong className="text-emerald-700">+{simulationResult.scenarios.scenarioC.estimatedJobsCreated.toLocaleString()} jobs</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Capex Required:</span>
                      <strong className="text-slate-800">₹{simulationResult.scenarios.scenarioC.infrastructureInvestmentCrores.toLocaleString()} Cr</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Water Demand:</span>
                      <strong className="text-rose-600">+{simulationResult.scenarios.scenarioC.dailyWaterDemandMld} MLD</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Env Risk Score:</span>
                      <strong className="text-rose-600">{simulationResult.scenarios.scenarioC.environmentalRiskScore} / 100 (High)</strong>
                    </div>
                  </div>
                </div>

              </div>

              {/* Comparative Scenario Bar Chart */}
              <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-3">
                <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                  <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wide">
                    Scenario Indicators Comparison Matrix
                  </h4>
                  <DemoDataBadge />
                </div>

                <div className="h-64 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={comparisonData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                      <XAxis dataKey="metric" tick={{ fontSize: 11 }} stroke="#cbd5e1" />
                      <YAxis tick={{ fontSize: 11 }} stroke="#cbd5e1" />
                      <Tooltip contentStyle={{ fontSize: '11px', borderRadius: '8px' }} />
                      <Legend wrapperStyle={{ fontSize: '11px' }} />
                      <Bar dataKey="Scenario A (Baseline)" fill="#94a3b8" radius={[4, 4, 0, 0]} />
                      <Bar dataKey="Scenario B (Moderate)" fill="#2563eb" radius={[4, 4, 0, 0]} />
                      <Bar dataKey="Scenario C (High)" fill="#ea580c" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Key Risk Highlights & Policy Recommendations */}
              <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-3">
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wide flex items-center gap-1.5">
                  <ShieldAlert className="w-4 h-4 text-amber-600" />
                  <span>Synthesized Impact Indicators & Risk Evaluation</span>
                </h4>

                <div className="space-y-2">
                  {simulationResult.riskHighlights.map((r, i) => (
                    <div key={i} className="text-xs text-slate-700 bg-amber-50/60 p-2.5 rounded-lg border border-amber-200/50 flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-600 mt-1.5 shrink-0" />
                      <span className="leading-relaxed">{r}</span>
                    </div>
                  ))}
                </div>

                <div className="p-3.5 bg-blue-50 rounded-xl border border-blue-200/80 text-xs space-y-1">
                  <div className="font-bold text-blue-900">Decision-Support Recommendation:</div>
                  <p className="text-blue-950 leading-relaxed">
                    {simulationResult.policyRecommendation}
                  </p>
                </div>
              </div>

              {/* Decision-Support Report Export CTA */}
              <div className="p-4 bg-gradient-to-r from-slate-900 to-indigo-950 rounded-xl text-white flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-md">
                <div className="space-y-0.5">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-amber-400">
                    <FileText className="w-4 h-4" />
                    <span>Generate Evidence-Based Policy Brief</span>
                  </div>
                  <p className="text-[11px] text-slate-300">
                    AI synthesizes this simulation with indexed research into an 8-section decision-support report.
                  </p>
                </div>

                <button
                  id="generate-decision-support-report-btn"
                  onClick={() => onGenerateReportModal(policyTitle, `${state} (${district})`)}
                  className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs shadow-xs transition-all flex items-center gap-1.5 cursor-pointer shrink-0"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Generate Full Policy Report</span>
                </button>
              </div>
            </>
          )}

        </div>

      </div>

    </div>
  );
};
