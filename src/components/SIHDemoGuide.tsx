import React from 'react';
import { 
  CheckCircle2, 
  ChevronRight, 
  ChevronLeft, 
  X, 
  Sparkles, 
  Play, 
  ExternalLink 
} from 'lucide-react';
import { UserRole } from '../types.ts';

export interface SIHDemoStep {
  stepNumber: number;
  title: string;
  description: string;
  targetView: string;
  requiredRole?: UserRole;
  actionHint: string;
}

export const SIH_DEMO_STEPS: SIHDemoStep[] = [
  { stepNumber: 1, title: 'Step 1: Log in as Researcher', description: 'Log in with Researcher persona (Dr. Ananya Sharma, IIT Delhi) with full research & project authoring privileges.', targetView: 'dashboard', requiredRole: 'RESEARCHER', actionHint: 'Switched role to RESEARCHER' },
  { stepNumber: 2, title: 'Step 2: Search Research Repository', description: 'Search the central repository for "Urbanization and agricultural land loss".', targetView: 'research', actionHint: 'Opened Research with search query preloaded' },
  { stepNumber: 3, title: 'Step 3: AI Semantic Search', description: 'Experience vector semantic search converting natural language question to conceptual embeddings.', targetView: 'semantic-search', actionHint: 'Viewing ranked semantic search results with relevance scores' },
  { stepNumber: 4, title: 'Step 4: Open Research Paper', description: 'Open "Urbanization Pressures and Agricultural Land Dynamics in Peri-Urban Telangana (2015-2024)".', targetView: 'research', actionHint: 'Viewing comprehensive abstract, metadata, and key findings' },
  { stepNumber: 5, title: 'Step 5: AI Summarize Paper with Bhoomi Assistant', description: 'Bhoomi AI Research Assistant provides grounded RAG summary and policy implications.', targetView: 'bhoomi-ai', actionHint: 'Asking Bhoomi Assistant for paper summary & citations' },
  { stepNumber: 6, title: 'Step 6: Open GIS Explorer', description: 'Access interactive PostGIS & OpenStreetMap Leaflet GIS dashboard.', targetView: 'gis', actionHint: 'Loaded interactive GIS Map with layer controls' },
  { stepNumber: 7, title: 'Step 7: Select Telangana in GIS', description: 'Focus map on Telangana state to analyze multi-spectral land parcel boundaries.', targetView: 'gis', actionHint: 'Zoomed into Telangana with district cadastral layers' },
  { stepNumber: 8, title: 'Step 8: Inspect Land-Use GIS Information', description: 'Toggle Agricultural, Urban, and Forest layers to view spatial distribution.', targetView: 'gis', actionHint: 'Active layer inspection with interactive popups' },
  { stepNumber: 9, title: 'Step 9: Open Land-Use Analytics', description: 'Navigate to decadal land use transition matrices (2015 → 2020 → 2025).', targetView: 'land-use', actionHint: 'Viewing percentage change and area changes' },
  { stepNumber: 10, title: 'Step 10: View Trends & Climate Indicators', description: 'Examine composite climate vulnerability (flood, drought, water stress) across districts.', targetView: 'climate', actionHint: 'Examining multi-hazard climate vulnerability scores' },
  { stepNumber: 11, title: 'Step 11: Open Policy Simulator ⭐', description: 'Launch the flagship Policy Simulation & Decision Support module.', targetView: 'simulator', actionHint: 'Loaded policy simulator parameters & slider controls' },
  { stepNumber: 12, title: 'Step 12: Create Hypothetical Policy', description: 'Set policy: "Convert 10% agricultural land to industrial use in Telangana over 5 years".', targetView: 'simulator', actionHint: 'Populated hypothetical policy parameters' },
  { stepNumber: 13, title: 'Step 13: Generate Model-Based Scenarios', description: 'System computes transparent impact indicators across economy, employment, and environment.', targetView: 'simulator', actionHint: 'Generated Scenario A, B, and C outputs' },
  { stepNumber: 14, title: 'Step 14: Compare Scenarios A, B, and C', description: 'Side-by-side comparison between Baseline (A), Moderate (B), and High (C) implementation.', targetView: 'simulator', actionHint: 'Comparing scenario indicators and displacement matrices' },
  { stepNumber: 15, title: 'Step 15: Generate Decision-Support Report', description: 'AI-assisted generation of formal policy report with problem statement, findings, and references.', targetView: 'simulator', actionHint: 'Generated printable Decision Support Report' },
  { stepNumber: 16, title: 'Step 16: Create Research Project', description: 'Researcher establishes new multi-institutional project and collaborative workspace.', targetView: 'projects', actionHint: 'Viewing project details, Kanban tasks, and milestones' },
  { stepNumber: 17, title: 'Step 17: Upload Dataset', description: 'Upload cadastral survey or field data file with automatic metadata tagging.', targetView: 'datasets', actionHint: 'Opened dataset upload modal' },
  { stepNumber: 18, title: 'Step 18: Analyze Dataset & Generate Charts', description: 'CSV Data Analysis Tool automatically detects columns, missing values, and calculates statistics.', targetView: 'datasets', actionHint: 'Automated CSV analytics and distribution charts rendered' },
  { stepNumber: 19, title: 'Step 19: Enter Innovation Hub', description: 'Explore national land governance hackathons, challenges, and pilot opportunities.', targetView: 'innovation', actionHint: 'Viewing active innovation challenges' },
  { stepNumber: 20, title: 'Step 20: Join Land Governance Challenge', description: 'Submit idea and solution to "AI for Automated Encroachment Detection" challenge.', targetView: 'innovation', actionHint: 'Challenge submission complete! Full SIH flow verified.' }
];

interface SIHDemoGuideProps {
  currentStepIndex: number;
  onSelectStep: (stepIndex: number) => void;
  onExecuteStep: (step: SIHDemoStep) => void;
  onClose: () => void;
}

export const SIHDemoGuide: React.FC<SIHDemoGuideProps> = ({
  currentStepIndex,
  onSelectStep,
  onExecuteStep,
  onClose
}) => {
  const currentStep = SIH_DEMO_STEPS[currentStepIndex];

  return (
    <div 
      id="sih-guided-demo-floating-panel"
      className="fixed bottom-4 right-4 z-50 w-96 max-w-[94vw] bg-white rounded-2xl shadow-2xl border border-blue-200 overflow-hidden ring-1 ring-black/5 animate-in slide-in-from-bottom-4 duration-200"
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-900 to-indigo-950 text-white p-3 px-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span className="text-xs font-bold tracking-wide uppercase">SIH 20-Step Live Demo Guide</span>
        </div>
        <button 
          onClick={onClose}
          className="p-1 rounded-lg hover:bg-white/10 text-white/80 hover:text-white transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Content */}
      <div className="p-4 space-y-3">
        <div className="flex items-center justify-between text-xs text-slate-500 font-medium">
          <span>Step {currentStep.stepNumber} of {SIH_DEMO_STEPS.length}</span>
          <span className="text-blue-700 font-semibold">{Math.round((currentStep.stepNumber / SIH_DEMO_STEPS.length) * 100)}% Completed</span>
        </div>

        {/* Progress Bar */}
        <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-blue-600 to-amber-500 rounded-full transition-all duration-300"
            style={{ width: `${(currentStep.stepNumber / SIH_DEMO_STEPS.length) * 100}%` }}
          />
        </div>

        {/* Step Card */}
        <div className="bg-slate-50 rounded-xl p-3 border border-slate-200/80">
          <h4 className="text-sm font-bold text-slate-900">{currentStep.title}</h4>
          <p className="text-xs text-slate-600 mt-1 leading-relaxed">{currentStep.description}</p>
          <div className="mt-2 text-[11px] text-blue-700 font-medium flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />
            <span>Target: {currentStep.actionHint}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 pt-1">
          <button
            onClick={() => onExecuteStep(currentStep)}
            className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white shadow-xs transition-colors cursor-pointer"
          >
            <Play className="w-3.5 h-3.5 fill-white" />
            <span>Execute This Step</span>
          </button>

          <button
            disabled={currentStepIndex === 0}
            onClick={() => onSelectStep(currentStepIndex - 1)}
            className="p-2 rounded-lg border border-slate-200 hover:bg-slate-50 disabled:opacity-40 disabled:pointer-events-none text-slate-700 transition-colors cursor-pointer"
            title="Previous Step"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <button
            disabled={currentStepIndex === SIH_DEMO_STEPS.length - 1}
            onClick={() => onSelectStep(currentStepIndex + 1)}
            className="p-2 rounded-lg border border-slate-200 hover:bg-slate-50 disabled:opacity-40 disabled:pointer-events-none text-slate-700 transition-colors cursor-pointer"
            title="Next Step"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Step Quick Selector Dropdown */}
        <div className="pt-1 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
          <label htmlFor="step-selector">Jump to step:</label>
          <select 
            id="step-selector"
            value={currentStepIndex}
            onChange={(e) => onSelectStep(Number(e.target.value))}
            className="text-xs font-medium text-slate-800 bg-white border border-slate-200 rounded px-2 py-0.5"
          >
            {SIH_DEMO_STEPS.map((s, i) => (
              <option key={s.stepNumber} value={i}>
                Step {s.stepNumber}: {s.title.split(':')[1]?.trim() || s.title}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};
