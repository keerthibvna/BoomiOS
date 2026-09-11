import React, { useState } from 'react';
import { 
  Satellite, 
  Layers, 
  Sparkles, 
  Sliders, 
  Maximize2, 
  Download, 
  Eye, 
  TrendingDown, 
  TrendingUp,
  Info
} from 'lucide-react';
import { DemoDataBadge } from './DemoDataBadge.tsx';

export const SatelliteModuleView: React.FC = () => {
  const [comparisonMode, setComparisonMode] = useState<'slider' | 'side-by-side'>('slider');
  const [sliderPosition, setSliderPosition] = useState<number>(50);
  const [activeBandCombo, setActiveBandCombo] = useState<'true-color' | 'false-color-nir' | 'builtup-swir'>('false-color-nir');
  const [selectedRegion, setSelectedRegion] = useState('Hyderabad Outer Ring Road (Telangana)');

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-200">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-slate-900 sm:text-2xl">
              Satellite Remote Sensing & Multi-Temporal Change Detection
            </h1>
            <DemoDataBadge />
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Harmonized Sentinel-2 & Landsat optical imagery with automated spectral difference masking (NDVI / NDBI / NDWI).
          </p>
        </div>

        {/* Region Selector */}
        <div className="flex items-center gap-2 bg-white p-2 rounded-xl border border-slate-200 shadow-xs self-start">
          <span className="text-xs font-semibold text-slate-600">Scene:</span>
          <select
            value={selectedRegion}
            onChange={(e) => setSelectedRegion(e.target.value)}
            className="text-xs font-bold text-slate-900 bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 focus:outline-hidden"
          >
            <option value="Hyderabad Outer Ring Road (Telangana)">Hyderabad ORR Corridor (Telangana)</option>
            <option value="Pune-Chakan Industrial Belt (Maharashtra)">Pune Industrial Belt (Maharashtra)</option>
            <option value="Bengaluru Peripheral Ring Road (Karnataka)">Bengaluru Rural Hub (Karnataka)</option>
            <option value="Cuttack-Bhubaneswar Peri-Urban (Odisha)">Bhubaneswar Peri-Urban (Odisha)</option>
          </select>
        </div>
      </div>

      {/* Spectral Controls Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2">
          <span className="font-bold text-slate-700">Band Composite:</span>
          <div className="flex gap-1.5">
            <button
              onClick={() => setActiveBandCombo('false-color-nir')}
              className={`px-3 py-1 rounded-lg text-xs font-semibold border transition-all cursor-pointer ${
                activeBandCombo === 'false-color-nir'
                  ? 'bg-rose-50 text-rose-700 border-rose-300 shadow-xs'
                  : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
              }`}
            >
              NIR False Color (B8-B4-B3) — Crop Health
            </button>
            <button
              onClick={() => setActiveBandCombo('true-color')}
              className={`px-3 py-1 rounded-lg text-xs font-semibold border transition-all cursor-pointer ${
                activeBandCombo === 'true-color'
                  ? 'bg-blue-50 text-blue-700 border-blue-300 shadow-xs'
                  : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
              }`}
            >
              True Color (B4-B3-B2)
            </button>
            <button
              onClick={() => setActiveBandCombo('builtup-swir')}
              className={`px-3 py-1 rounded-lg text-xs font-semibold border transition-all cursor-pointer ${
                activeBandCombo === 'builtup-swir'
                  ? 'bg-amber-50 text-amber-800 border-amber-300 shadow-xs'
                  : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
              }`}
            >
              SWIR Built-Up (B11-B8-B2)
            </button>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-slate-500 text-xs">Comparison Mode:</span>
          <button
            onClick={() => setComparisonMode(comparisonMode === 'slider' ? 'side-by-side' : 'slider')}
            className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold cursor-pointer"
          >
            {comparisonMode === 'slider' ? 'Switch to Side-by-Side' : 'Switch to Interactive Slider'}
          </button>
        </div>
      </div>

      {/* Multi-Temporal Satellite Viewer Stage */}
      <div className="bg-slate-900 rounded-2xl border border-slate-800 shadow-xl overflow-hidden text-white relative">
        
        {/* Stage Header Info */}
        <div className="p-3 px-4 bg-slate-950/80 border-b border-slate-800 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-semibold text-slate-200">Temporal Difference: 2015 (Pre-Conversion) vs 2025 (Current)</span>
          </div>
          <span className="text-slate-400 text-[11px] font-mono">EPSG:4326 • 10m MSI GeoTIFF</span>
        </div>

        {/* Visual Stage */}
        {comparisonMode === 'slider' ? (
          <div className="relative h-[480px] w-full overflow-hidden select-none bg-slate-950">
            
            {/* Background Image (2025 Post-Conversion / Current Built-up) */}
            <div 
              className="absolute inset-0 bg-cover bg-center flex flex-col justify-end p-6"
              style={{
                backgroundImage: `radial-gradient(circle at 70% 50%, rgba(245, 158, 11, 0.25), transparent 60%), linear-gradient(135deg, #1e293b 0%, #0f172a 100%)`
              }}
            >
              {/* Illustrated Spatial Simulation representing dense urban/industrial expansion */}
              <div className="absolute inset-0 opacity-40 flex flex-wrap gap-4 p-8">
                {Array.from({ length: 18 }).map((_, i) => (
                  <div 
                    key={i} 
                    className="w-28 h-20 rounded-md border border-amber-400/40 bg-amber-500/10 p-2 text-[9px] text-amber-300 font-mono"
                  >
                    Parcel #{5000 + i}<br />
                    Zoning: Commercial/Layout<br />
                    NDBI: +0.38
                  </div>
                ))}
              </div>

              <div className="absolute top-4 right-4 bg-black/70 px-3 py-1.5 rounded-lg border border-amber-500/40 text-xs font-bold text-amber-300">
                2025: Current Urbanized Corridor (NDBI: +0.34)
              </div>
            </div>

            {/* Foreground Clipped Image (2015 Pre-Conversion / Agricultural Greenery) */}
            <div 
              className="absolute inset-0 bg-cover bg-center overflow-hidden flex flex-col justify-end p-6 border-r-2 border-white"
              style={{
                width: `${sliderPosition}%`,
                backgroundImage: `radial-gradient(circle at 30% 50%, rgba(22, 163, 74, 0.35), transparent 60%), linear-gradient(135deg, #064e3b 0%, #022c22 100%)`
              }}
            >
              {/* Illustrated Spatial Simulation representing fertile agricultural fields */}
              <div className="absolute inset-0 opacity-40 flex flex-wrap gap-4 p-8 w-[1000px]">
                {Array.from({ length: 18 }).map((_, i) => (
                  <div 
                    key={i} 
                    className="w-28 h-20 rounded-md border border-emerald-400/40 bg-emerald-500/10 p-2 text-[9px] text-emerald-300 font-mono"
                  >
                    Parcel #{5000 + i}<br />
                    Crop: Paddy / Irrigated<br />
                    NDVI: 0.68
                  </div>
                ))}
              </div>

              <div className="absolute top-4 left-4 bg-black/70 px-3 py-1.5 rounded-lg border border-emerald-500/40 text-xs font-bold text-emerald-400 whitespace-nowrap">
                2015: Baseline Multi-Cropped Agriculture (NDVI: 0.68)
              </div>
            </div>

            {/* Interactive Slider Bar */}
            <div 
              className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize z-20 flex items-center justify-center pointer-events-none"
              style={{ left: `${sliderPosition}%` }}
            >
              <div className="w-8 h-8 rounded-full bg-white text-slate-900 shadow-xl flex items-center justify-center text-xs font-bold border border-slate-300">
                ↔
              </div>
            </div>

            {/* Range input overlay */}
            <input
              type="range"
              min={5}
              max={95}
              value={sliderPosition}
              onChange={(e) => setSliderPosition(Number(e.target.value))}
              className="absolute inset-0 opacity-0 cursor-ew-resize w-full h-full z-30"
            />
          </div>
        ) : (
          /* Side-by-Side Comparison */
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-slate-800 h-[460px]">
            <div className="bg-emerald-950/40 p-6 flex flex-col justify-between border-r border-slate-800">
              <div className="flex items-center justify-between">
                <span className="font-bold text-emerald-400 text-xs uppercase tracking-wider">
                  2015 Multi-Spectral Baseline
                </span>
                <span className="text-[11px] font-mono text-slate-400">Sentinel-2 (L2A)</span>
              </div>
              <div className="space-y-2 p-4 bg-black/40 rounded-xl border border-emerald-500/20 text-xs">
                <div className="font-bold text-white">Baseline Land Cover:</div>
                <div className="text-emerald-300 font-semibold">• 78.2% Cultivated Agrarian Acreage (NDVI: 0.68)</div>
                <div className="text-slate-300">• Active canal and borewell irrigation command</div>
                <div className="text-slate-300">• Low impervious surface reflectance (NDBI: -0.15)</div>
              </div>
            </div>

            <div className="bg-amber-950/40 p-6 flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <span className="font-bold text-amber-400 text-xs uppercase tracking-wider">
                  2025 Multi-Temporal Transition
                </span>
                <span className="text-[11px] font-mono text-slate-400">Sentinel-2 (L2A)</span>
              </div>
              <div className="space-y-2 p-4 bg-black/40 rounded-xl border border-amber-500/20 text-xs">
                <div className="font-bold text-white">Transformed Land Cover:</div>
                <div className="text-amber-300 font-semibold">• 64.2% Growth in Built-up & Warehousing (NDBI: +0.38)</div>
                <div className="text-slate-300">• 18.4% Net contraction in cultivated paddy parcels</div>
                <div className="text-slate-300">• Surface temperature anomaly +2.4°C (Thermal Landsat TIRS)</div>
              </div>
            </div>
          </div>
        )}

        {/* Footer controls & prompt */}
        <div className="p-3 px-4 bg-slate-950 border-t border-slate-800 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-400">
          <span>Drag the central divider slider horizontally to reveal temporal change detection.</span>
          <div className="flex items-center gap-3">
            <span className="text-emerald-400">● Vegetated Crop Fields (2015)</span>
            <span className="text-amber-400">● Impervious Surface Conversion (2025)</span>
          </div>
        </div>

      </div>

      {/* Spectral Difference Audit Matrix */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs space-y-1">
          <span className="text-[11px] font-bold text-slate-400 uppercase">NDVI (Vegetation Index)</span>
          <div className="flex items-center justify-between">
            <span className="text-lg font-bold text-rose-600">0.68 → 0.41</span>
            <span className="text-xs font-semibold text-rose-700 bg-rose-50 px-2 py-0.5 rounded">-39.7%</span>
          </div>
          <p className="text-[11px] text-slate-500">Loss of photosynthetic biomass across converted farmland</p>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs space-y-1">
          <span className="text-[11px] font-bold text-slate-400 uppercase">NDBI (Built-up Index)</span>
          <div className="flex items-center justify-between">
            <span className="text-lg font-bold text-emerald-600">-0.12 → +0.34</span>
            <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">Surge</span>
          </div>
          <p className="text-[11px] text-slate-500">Concrete, bitumen, and industrial roofing spectral reflectance</p>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs space-y-1">
          <span className="text-[11px] font-bold text-slate-400 uppercase">NDWI (Water Index)</span>
          <div className="flex items-center justify-between">
            <span className="text-lg font-bold text-amber-600">0.52 → 0.44</span>
            <span className="text-xs font-semibold text-amber-700 bg-amber-50 px-2 py-0.5 rounded">-15.4%</span>
          </div>
          <p className="text-[11px] text-slate-500">Surface irrigation tanks and agricultural retention ponds shrink</p>
        </div>

      </div>

    </div>
  );
};
