import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import { 
  Map as MapIcon, 
  Layers, 
  Filter, 
  Eye, 
  EyeOff, 
  BookOpen, 
  FileText, 
  TrendingUp, 
  Sparkles, 
  Maximize2,
  Info
} from 'lucide-react';
import { StateGeospatialData } from '../types.ts';
import { DemoDataBadge } from './DemoDataBadge.tsx';

interface GisExplorerViewProps {
  onAskBhoomi: (query: string) => void;
  onOpenResearchForState: (stateName: string) => void;
  selectedStateFromGuide?: string;
}

export const GisExplorerView: React.FC<GisExplorerViewProps> = ({
  onAskBhoomi,
  onOpenResearchForState,
  selectedStateFromGuide
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const layerGroupRef = useRef<L.LayerGroup | null>(null);

  const [selectedStateName, setSelectedStateName] = useState<string>(selectedStateFromGuide || 'Telangana');
  const [activeLayers, setActiveLayers] = useState({
    agricultural: true,
    urban: true,
    forest: true,
    water: true,
    climateRisk: true,
    disputeDensity: true,
  });

  const stateProfiles: Record<string, {
    coords: [number, number];
    zoom: number;
    agriHa: string;
    urbanHa: string;
    forestHa: string;
    decadalAgriChange: string;
    decadalUrbanChange: string;
    linkedPapersCount: number;
    disputePendency: string;
    dominantPolicy: string;
    parcels: { name: string; lat: number; lng: number; type: string; info: string }[];
  }> = {
    'Telangana': {
      coords: [17.4500, 78.4500],
      zoom: 9,
      agriHa: '4.82 Million Ha',
      urbanHa: '0.84 Million Ha',
      forestHa: '2.69 Million Ha',
      decadalAgriChange: '-18.4% (Peri-Urban Contraction)',
      decadalUrbanChange: '+64.2% (Outer Ring Road Corridor)',
      linkedPapersCount: 142,
      disputePendency: '38,400 active revenue cases',
      dominantPolicy: 'Telangana Rights in Land and Pattadar Pass Books Act 2020 (Dharani)',
      parcels: [
        { name: 'Hyderabad Peri-Urban ORR Corridor', lat: 17.3850, lng: 78.4867, type: 'Urban Expansion', info: 'Rapid agricultural conversion to warehousing & layouts' },
        { name: 'Medchal Agro-Industrial Hub', lat: 17.6297, lng: 78.4814, type: 'Industrial Zone', info: 'High groundwater stress with mixed zoning conversion' },
        { name: 'Ibrahimpatnam Agrarian Belt', lat: 17.1932, lng: 78.6483, type: 'Agricultural Land', info: 'Intensive borewell irrigated vegetable & paddy zone' },
        { name: 'Sangareddy Industrial Cluster', lat: 17.6190, lng: 78.0818, type: 'Dispute Hotspot', info: 'Boundary litigation between RoR and Tippan records' }
      ]
    },
    'Maharashtra': {
      coords: [19.7515, 75.7139],
      zoom: 7,
      agriHa: '17.4 Million Ha',
      urbanHa: '2.1 Million Ha',
      forestHa: '6.19 Million Ha',
      decadalAgriChange: '-11.2%',
      decadalUrbanChange: '+48.5%',
      linkedPapersCount: 210,
      disputePendency: '54,200 cases (7/12 RoR mutations)',
      dominantPolicy: 'Maharashtra Land Revenue Code 1966 & e-Chavdi',
      parcels: [
        { name: 'Pune-Chakan Industrial Belt', lat: 18.7500, lng: 73.8500, type: 'Industrial Zone', info: 'Automotive industrial land acquisition corridor' },
        { name: 'Nashik Agro-Processing Zone', lat: 19.9975, lng: 73.7898, type: 'Agricultural Land', info: 'High-value horticulture and vineyard cadastre' }
      ]
    },
    'Karnataka': {
      coords: [15.3173, 75.7139],
      zoom: 7,
      agriHa: '9.8 Million Ha',
      urbanHa: '1.4 Million Ha',
      forestHa: '4.33 Million Ha',
      decadalAgriChange: '-9.4%',
      decadalUrbanChange: '+52.1%',
      linkedPapersCount: 168,
      disputePendency: '41,000 cases in AC/DC courts',
      dominantPolicy: 'Karnataka Land Reforms Act & Bhoomi RTC Portal',
      parcels: [
        { name: 'Bengaluru Peripheral Ring Road', lat: 13.0827, lng: 77.5877, type: 'Urban Expansion', info: 'High conversion velocity around Devanahalli' }
      ]
    },
    'Odisha': {
      coords: [20.9517, 85.0985],
      zoom: 7,
      agriHa: '6.2 Million Ha',
      urbanHa: '0.6 Million Ha',
      forestHa: '5.16 Million Ha',
      decadalAgriChange: '-4.8%',
      decadalUrbanChange: '+32.4%',
      linkedPapersCount: 115,
      disputePendency: '22,400 cases',
      dominantPolicy: 'Forest Rights Act (FRA 2006) & Odisha Land Reforms Act',
      parcels: [
        { name: 'Mayurbhanj Community Forest Area', lat: 21.9333, lng: 86.7333, type: 'Forest Cover', info: 'CFR titling and customary agro-forestry management' }
      ]
    },
    'Uttar Pradesh': {
      coords: [26.8467, 80.9462],
      zoom: 7,
      agriHa: '16.5 Million Ha',
      urbanHa: '1.8 Million Ha',
      forestHa: '1.65 Million Ha',
      decadalAgriChange: '-7.5%',
      decadalUrbanChange: '+41.2%',
      linkedPapersCount: 195,
      disputePendency: '68,100 cases',
      dominantPolicy: 'UP Revenue Code 2006 & Borlaug Agrarian Guidelines',
      parcels: [
        { name: 'Noida-Yamuna Expressway Corridor', lat: 28.5355, lng: 77.3910, type: 'Urban Expansion', info: 'Agrarian land acquisition disputes under Section 24' }
      ]
    }
  };

  const currentProfile = stateProfiles[selectedStateName] || stateProfiles['Telangana'];

  // Initialize and update map
  useEffect(() => {
    if (!mapContainerRef.current) return;

    if (!mapInstanceRef.current) {
      const map = L.map(mapContainerRef.current, {
        zoomControl: true,
        attributionControl: false
      }).setView(currentProfile.coords, currentProfile.zoom);

      // OpenStreetMap Tile Layer
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 18,
      }).addTo(map);

      mapInstanceRef.current = map;
      layerGroupRef.current = L.layerGroup().addTo(map);
    } else {
      mapInstanceRef.current.setView(currentProfile.coords, currentProfile.zoom);
    }

    // Refresh markers & layers
    if (layerGroupRef.current) {
      layerGroupRef.current.clearLayers();

      currentProfile.parcels.forEach(p => {
        let markerColor = '#2563eb';
        if (p.type === 'Agricultural Land') markerColor = '#16a34a';
        if (p.type === 'Urban Expansion') markerColor = '#ea580c';
        if (p.type === 'Industrial Zone') markerColor = '#f59e0b';
        if (p.type === 'Dispute Hotspot') markerColor = '#e11d48';

        const customIcon = L.divIcon({
          className: 'custom-gis-pin',
          html: `<div style="background-color: ${markerColor}; width: 18px; height: 18px; border-radius: 50%; border: 3px solid white; box-shadow: 0 2px 5px rgba(0,0,0,0.3);"></div>`,
          iconSize: [18, 18],
          iconAnchor: [9, 9]
        });

        const marker = L.marker([p.lat, p.lng], { icon: customIcon });
        marker.bindPopup(`
          <div style="font-family: inherit; font-size: 11px; min-width: 180px;">
            <div style="font-weight: bold; color: #0f172a; margin-bottom: 2px;">${p.name}</div>
            <div style="color: #64748b; margin-bottom: 4px;"><strong>Layer:</strong> ${p.type}</div>
            <div style="color: #334155; font-size: 10px; line-height: 1.4;">${p.info}</div>
          </div>
        `);
        layerGroupRef.current?.addLayer(marker);

        // Add illustrative circle buffer for spatial radius
        const circle = L.circle([p.lat, p.lng], {
          radius: 3500,
          color: markerColor,
          fillColor: markerColor,
          fillOpacity: 0.12,
          weight: 1
        });
        layerGroupRef.current?.addLayer(circle);
      });
    }
  }, [selectedStateName, currentProfile]);

  const toggleLayer = (layerKey: keyof typeof activeLayers) => {
    setActiveLayers(prev => ({ ...prev, [layerKey]: !prev[layerKey] }));
  };

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-200">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-slate-900 sm:text-2xl">
              National GIS & Geospatial Explorer (PostGIS)
            </h1>
            <DemoDataBadge />
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Interactive multi-layered spatial cadastre: Agricultural land cover, urban expansion corridors, climate vulnerabilities, and judicial disputes.
          </p>
        </div>

        {/* State Selection Dropdown */}
        <div className="flex items-center gap-2 bg-white p-2 rounded-xl border border-slate-200 shadow-xs self-start">
          <Filter className="w-3.5 h-3.5 text-slate-400 ml-1" />
          <span className="text-xs font-semibold text-slate-600">Select Focus State:</span>
          <select
            id="gis-state-focus-selector"
            value={selectedStateName}
            onChange={(e) => setSelectedStateName(e.target.value)}
            className="bg-slate-50 text-slate-900 text-xs font-bold rounded-lg px-3 py-1.5 border border-slate-200 focus:outline-hidden cursor-pointer"
          >
            <option value="Telangana">Telangana (Peri-Urban Pilot)</option>
            <option value="Maharashtra">Maharashtra (Industrial Corridor)</option>
            <option value="Karnataka">Karnataka (Bhoomi Digital Cadastre)</option>
            <option value="Odisha">Odisha (FRA & Forest Titling)</option>
            <option value="Uttar Pradesh">Uttar Pradesh (Gangetic Plains)</option>
          </select>
        </div>
      </div>

      {/* Main Map & Spatial Analytics Dashboard */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        
        {/* Map Container (8 cols) */}
        <div className="lg:col-span-8 bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden flex flex-col h-[520px]">
          
          {/* Map Header & Layer Toggles Bar */}
          <div className="p-3 px-4 bg-slate-50 border-b border-slate-200 flex flex-wrap items-center justify-between gap-2 text-xs">
            <div className="flex items-center gap-2">
              <MapIcon className="w-4 h-4 text-blue-600" />
              <span className="font-bold text-slate-800">Spatial Canvas: {selectedStateName}</span>
            </div>

            {/* Quick Layer Filter Buttons */}
            <div className="flex flex-wrap items-center gap-1.5">
              <button
                onClick={() => toggleLayer('agricultural')}
                className={`px-2 py-0.5 rounded text-[11px] font-semibold border transition-colors cursor-pointer ${
                  activeLayers.agricultural ? 'bg-emerald-50 text-emerald-700 border-emerald-300' : 'bg-white text-slate-400 border-slate-200'
                }`}
              >
                Agriculture
              </button>
              <button
                onClick={() => toggleLayer('urban')}
                className={`px-2 py-0.5 rounded text-[11px] font-semibold border transition-colors cursor-pointer ${
                  activeLayers.urban ? 'bg-orange-50 text-orange-700 border-orange-300' : 'bg-white text-slate-400 border-slate-200'
                }`}
              >
                Urban Growth
              </button>
              <button
                onClick={() => toggleLayer('climateRisk')}
                className={`px-2 py-0.5 rounded text-[11px] font-semibold border transition-colors cursor-pointer ${
                  activeLayers.climateRisk ? 'bg-purple-50 text-purple-700 border-purple-300' : 'bg-white text-slate-400 border-slate-200'
                }`}
              >
                Climate Risk
              </button>
              <button
                onClick={() => toggleLayer('disputeDensity')}
                className={`px-2 py-0.5 rounded text-[11px] font-semibold border transition-colors cursor-pointer ${
                  activeLayers.disputeDensity ? 'bg-rose-50 text-rose-700 border-rose-300' : 'bg-white text-slate-400 border-slate-200'
                }`}
              >
                Disputes
              </button>
            </div>
          </div>

          {/* Leaflet Map Stage */}
          <div className="flex-1 w-full relative">
            <div ref={mapContainerRef} className="w-full h-full" />
            
            {/* Overlay Map Legend */}
            <div className="absolute bottom-3 left-3 z-30 bg-white/95 backdrop-blur-xs p-2.5 rounded-xl border border-slate-200 shadow-md text-[10px] space-y-1">
              <div className="font-bold text-slate-700 mb-1">GIS Layer Classification</div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-600" />
                <span className="text-slate-600">Agricultural Multi-Cropped</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-orange-600" />
                <span className="text-slate-600">Urban Expansion Zone</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                <span className="text-slate-600">Industrial Corridor Buffer</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-600" />
                <span className="text-slate-600">Dispute Density Hotspot</span>
              </div>
            </div>
          </div>
        </div>

        {/* State Spatial Profile & Linked Intelligence (4 cols) */}
        <div className="lg:col-span-4 space-y-4">
          
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wide">
                {selectedStateName} Cadastral Profile
              </h3>
              <DemoDataBadge />
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex justify-between p-2 rounded-lg bg-slate-50">
                <span className="text-slate-500">Cultivated Agriculture:</span>
                <strong className="text-slate-800">{currentProfile.agriHa}</strong>
              </div>
              <div className="flex justify-between p-2 rounded-lg bg-slate-50">
                <span className="text-slate-500">Built-Up Urban Area:</span>
                <strong className="text-slate-800">{currentProfile.urbanHa}</strong>
              </div>
              <div className="flex justify-between p-2 rounded-lg bg-slate-50">
                <span className="text-slate-500">Recorded Forest Cover:</span>
                <strong className="text-slate-800">{currentProfile.forestHa}</strong>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-100 space-y-2 text-xs">
              <div className="font-bold text-slate-900 text-[11px] uppercase tracking-wider">
                Decadal Transition Dynamics (2015 – 2025)
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-600">Agri Land Velocity:</span>
                <span className="font-bold text-rose-600">{currentProfile.decadalAgriChange}</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-600">Urban Growth Velocity:</span>
                <span className="font-bold text-emerald-600">{currentProfile.decadalUrbanChange}</span>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-100 space-y-1 text-xs">
              <div className="text-slate-500">Statutory Land Act:</div>
              <div className="font-semibold text-slate-800 text-[11px] leading-snug">
                {currentProfile.dominantPolicy}
              </div>
            </div>

            <div className="pt-2 border-t border-slate-100 flex justify-between text-xs">
              <span className="text-slate-500">Revenue Court Pendency:</span>
              <span className="font-bold text-amber-700">{currentProfile.disputePendency}</span>
            </div>
          </div>

          {/* Quick Deep Dive CTA */}
          <div className="bg-gradient-to-br from-blue-900 to-indigo-950 p-4 rounded-xl text-white space-y-2 text-xs">
            <div className="font-bold flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Query AI for {selectedStateName}</span>
            </div>
            <p className="text-blue-200 text-[11px] leading-relaxed">
              Bhoomi AI can summarize all <strong>{currentProfile.linkedPapersCount}</strong> indexed research publications and cadastral datasets for {selectedStateName}.
            </p>
            <div className="flex gap-2 pt-1">
              <button
                onClick={() => onAskBhoomi(`Explain agricultural land loss dynamics and policy reforms in ${selectedStateName}`)}
                className="w-full py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold text-center cursor-pointer shadow-xs"
              >
                Ask Bhoomi AI
              </button>
              <button
                onClick={() => onOpenResearchForState(selectedStateName)}
                className="w-full py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white font-semibold text-center cursor-pointer border border-white/20"
              >
                View Papers
              </button>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
