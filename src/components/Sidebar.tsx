import React from 'react';
import { 
  LayoutDashboard, 
  BookOpen, 
  Database, 
  FileText, 
  Map, 
  BarChart3, 
  Sliders, 
  Bot, 
  FolderKanban, 
  Lightbulb, 
  Award, 
  Network, 
  ShieldCheck, 
  Satellite, 
  CloudRain, 
  Scale,
  Sparkles
} from 'lucide-react';
import { UserRole } from '../types.ts';

interface SidebarProps {
  currentView: string;
  onSelectView: (viewId: string) => void;
  userRole: UserRole;
}

export const Sidebar: React.FC<SidebarProps> = ({ currentView, onSelectView, userRole }) => {
  const navSections = [
    {
      group: 'KNOWLEDGE & POLICY',
      items: [
        { id: 'dashboard', label: 'Main Dashboard', icon: LayoutDashboard, badge: null },
        { id: 'research', label: 'Research Repository', icon: BookOpen, badge: null },
        { id: 'datasets', label: 'Datasets & CSV Tool', icon: Database, badge: 'New' },
        { id: 'policies', label: 'Policy Repository', icon: FileText, badge: null },
      ]
    },
    {
      group: 'GEOSPATIAL & ANALYTICS',
      items: [
        { id: 'gis', label: 'GIS Explorer (PostGIS)', icon: Map, badge: null },
        { id: 'land-use', label: 'Land-Use Analytics', icon: BarChart3, badge: null },
        { id: 'satellite', label: 'Satellite Remote Sensing', icon: Satellite, badge: null },
        { id: 'climate', label: 'Climate Risk Atlas', icon: CloudRain, badge: null },
        { id: 'disputes', label: 'Land Dispute Analytics', icon: Scale, badge: null },
      ]
    },
    {
      group: 'DECISION SUPPORT & AI',
      items: [
        { id: 'simulator', label: 'Policy Simulator ⭐', icon: Sliders, badge: 'Key' },
        { id: 'bhoomi-ai', label: 'Bhoomi AI Assistant', icon: Bot, badge: 'RAG' },
        { id: 'semantic-search', label: 'AI Semantic Search', icon: Sparkles, badge: null },
        { id: 'knowledge-graph', label: 'Knowledge Graph', icon: Network, badge: null },
      ]
    },
    {
      group: 'COLLABORATION & INNOVATION',
      items: [
        { id: 'projects', label: 'Research Projects', icon: FolderKanban, badge: null },
        { id: 'innovation', label: 'Innovation Hub', icon: Lightbulb, badge: 'Challenges' },
        { id: 'grants', label: 'Research Grants', icon: Award, badge: null },
      ]
    },
    ...(userRole === 'ADMIN' ? [{
      group: 'ADMINISTRATION',
      items: [
        { id: 'admin', label: 'Admin Console & Logs', icon: ShieldCheck, badge: 'Admin' }
      ]
    }] : [])
  ];

  return (
    <aside id="platform-sidebar" className="w-64 bg-slate-900 text-slate-300 flex flex-col shrink-0 border-r border-slate-800 select-none">
      <div className="p-4 flex-1 overflow-y-auto space-y-6">
        {navSections.map((section, idx) => (
          <div key={idx} className="space-y-1">
            <h4 className="px-3 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
              {section.group}
            </h4>
            <nav className="space-y-0.5 mt-1.5">
              {section.items.map((item) => {
                const Icon = item.icon;
                const isActive = currentView === item.id;
                return (
                  <button
                    key={item.id}
                    id={`sidebar-nav-${item.id}`}
                    onClick={() => onSelectView(item.id)}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                      isActive
                        ? 'bg-blue-600 text-white shadow-xs font-semibold'
                        : 'hover:bg-slate-800/80 text-slate-300 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                      <span className="truncate">{item.label}</span>
                    </div>

                    {item.badge && (
                      <span className={`px-1.5 py-0.5 text-[10px] font-semibold rounded ${
                        isActive 
                          ? 'bg-blue-500 text-white' 
                          : item.badge === 'Key' 
                            ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' 
                            : 'bg-slate-800 text-slate-400'
                      }`}>
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </nav>
          </div>
        ))}
      </div>

      {/* Footer Info & Verification Stamp */}
      <div className="p-3.5 border-t border-slate-800 text-[11px] text-slate-400 bg-slate-950/50">
        <div className="flex items-center justify-between">
          <span className="font-semibold text-slate-300">Gov. of India</span>
          <span className="px-1.5 py-0.2 rounded bg-emerald-950 text-emerald-300 border border-emerald-800/50 text-[10px]">
            Active Production
          </span>
        </div>
        <p className="text-[10px] text-slate-500 mt-1">
          DILRMP • SVAMITVA • PostGIS GIS
        </p>
      </div>
    </aside>
  );
};
