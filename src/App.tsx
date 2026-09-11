import React, { useState, useEffect } from 'react';
import { Header } from './components/Header.tsx';
import { Sidebar } from './components/Sidebar.tsx';
import { DashboardView } from './components/DashboardView.tsx';
import { ResearchView } from './components/ResearchView.tsx';
import { SemanticSearchView } from './components/SemanticSearchView.tsx';
import { BhoomiAssistantView } from './components/BhoomiAssistantView.tsx';
import { GisExplorerView } from './components/GisExplorerView.tsx';
import { LandUseAnalyticsView } from './components/LandUseAnalyticsView.tsx';
import { SatelliteModuleView } from './components/SatelliteModuleView.tsx';
import { ClimateRiskView } from './components/ClimateRiskView.tsx';
import { DisputeAnalyticsView } from './components/DisputeAnalyticsView.tsx';
import { DatasetsView } from './components/DatasetsView.tsx';
import { PoliciesView } from './components/PoliciesView.tsx';
import { PolicySimulatorView } from './components/PolicySimulatorView.tsx';
import { InnovationChallengesView } from './components/InnovationChallengesView.tsx';
import { SIHDemoGuide, SIHDemoStep } from './components/SIHDemoGuide.tsx';
import { ReportGeneratorModal } from './components/ReportGeneratorModal.tsx';
import { LoginModal, PRESET_USERS } from './components/LoginModal.tsx';

import { 
  User,
  UserRole,
  ResearchDocument, 
  DatasetRecord, 
  PolicyRecord, 
  ClimateRiskRecord, 
  LandDisputeStats, 
  InnovationChallenge, 
  ResearchProject
} from './types.ts';

const SYSTEM_USERS: Record<UserRole, User> = {
  RESEARCHER: {
    id: 'usr_researcher_01',
    fullName: 'Dr. Ananya Sharma',
    email: 'ananya.sharma@iitd.ac.in',
    organization: 'Indian Institute of Technology Delhi - Dept of Civil & Geospatial Engineering',
    role: 'RESEARCHER',
    designation: 'Associate Professor & Principal Investigator',
    createdAt: '2024-02-15T00:00:00Z',
    status: 'active'
  },
  POLICYMAKER: {
    id: 'usr_gov_01',
    fullName: 'Rajesh Verma, IAS',
    email: 'rajesh.verma@gov.in',
    organization: 'NITI Aayog - Land Policy & Spatial Planning Cell',
    role: 'POLICYMAKER',
    designation: 'Principal Secretary (Land Governance)',
    createdAt: '2024-02-01T00:00:00Z',
    status: 'active'
  },
  ACADEMIC: {
    id: 'usr_academic_01',
    fullName: 'Prof. S. Ranganathan',
    email: 's.ranganathan@tiss.edu',
    organization: 'Tata Institute of Social Sciences (TISS) - School of Habitat Studies',
    role: 'ACADEMIC',
    designation: 'Chairperson & Senior Fellow',
    createdAt: '2024-03-05T00:00:00Z',
    status: 'active'
  },
  ADMIN: {
    id: 'usr_admin_01',
    fullName: 'Shri Amitabh Kant',
    email: 'admin@bhoomi.gov.in',
    organization: 'Department of Land Resources, Ministry of Rural Development',
    role: 'ADMIN',
    designation: 'Director General & Chief Administrator',
    createdAt: '2024-01-10T00:00:00Z',
    status: 'active'
  },
  PUBLIC_USER: {
    id: 'usr_public_01',
    fullName: 'Kavita Patel',
    email: 'kavita.patel@public.in',
    organization: 'Independent Citizen Researcher & Farmer Producer Org (FPO) Representative',
    role: 'PUBLIC_USER',
    designation: 'Community Representative',
    createdAt: '2024-04-12T00:00:00Z',
    status: 'active'
  }
};

export default function App() {
  // Navigation & User Persona
  const [currentView, setCurrentView] = useState<string>('dashboard');
  const [userRole, setUserRole] = useState<UserRole>('RESEARCHER');
  const [currentUser, setCurrentUser] = useState<User | null>(SYSTEM_USERS['RESEARCHER']);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [allUsers, setAllUsers] = useState<User[]>(PRESET_USERS);
  const [guestNoticeVisible, setGuestNoticeVisible] = useState(false);
  const [isGuideOpen, setIsGuideOpen] = useState(false);
  const [currentGuideStep, setCurrentGuideStep] = useState(0);

  // Selected item / Filter states across modules
  const [bhoomiInitialPrompt, setBhoomiInitialPrompt] = useState<string>('');
  const [researchSearchQuery, setResearchSearchQuery] = useState<string>('');
  const [selectedResearchDocId, setSelectedResearchDocId] = useState<string | null>(null);
  const [gisStateFocus, setGisStateFocus] = useState<string>('Telangana');

  // Report Generator Modal State
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [reportTopic, setReportTopic] = useState('Peri-Urban Agricultural Land Conversion and Dispute Vulnerability in Southern India');
  const [reportFocusArea, setReportFocusArea] = useState('Telangana & Maharashtra (2015-2025)');

  // Main Datasets
  const [researchDocs, setResearchDocs] = useState<ResearchDocument[]>([]);
  const [datasets, setDatasets] = useState<DatasetRecord[]>([]);
  const [policies, setPolicies] = useState<PolicyRecord[]>([]);
  const [climateRecords, setClimateRecords] = useState<ClimateRiskRecord[]>([]);
  const [disputeStats, setDisputeStats] = useState<LandDisputeStats | null>(null);
  const [challenges, setChallenges] = useState<InnovationChallenge[]>([]);
  const [projects, setProjects] = useState<ResearchProject[]>([]);
  const [unreadNotifications, setUnreadNotifications] = useState(3);

  // Load data from backend on mount
  useEffect(() => {
    async function loadData() {
      try {
        const [
          resDocs,
          resData,
          resPol,
          resClim,
          resDisp,
          resChal,
          resProj
        ] = await Promise.allSettled([
          fetch('/api/research').then(r => r.json()),
          fetch('/api/datasets').then(r => r.json()),
          fetch('/api/policies').then(r => r.json()),
          fetch('/api/climate/indicators').then(r => r.json()),
          fetch('/api/disputes/stats').then(r => r.json()),
          fetch('/api/innovation/challenges').then(r => r.json()),
          fetch('/api/projects').then(r => r.json())
        ]);

        if (resDocs.status === 'fulfilled' && Array.isArray(resDocs.value)) {
          setResearchDocs(resDocs.value);
        }
        if (resData.status === 'fulfilled' && Array.isArray(resData.value)) {
          setDatasets(resData.value);
        }
        if (resPol.status === 'fulfilled' && Array.isArray(resPol.value)) {
          setPolicies(resPol.value);
        }
        if (resClim.status === 'fulfilled' && Array.isArray(resClim.value)) {
          // Adapt if needed to match ClimateRiskRecord format
          const formattedClimate: ClimateRiskRecord[] = resClim.value.map((c: any) => ({
            id: `${c.state}_${c.district}`,
            state: c.state,
            district: c.district,
            compositeVulnerabilityScore: c.compositeRiskScore || c.compositeVulnerabilityScore || 70,
            droughtScore: c.droughtRiskScore || c.droughtScore || 60,
            floodRiskScore: c.floodRiskScore || 50,
            waterStressScore: c.waterStressScore || 70,
            soilDegradationIndex: c.landDegradationScore || c.soilDegradationIndex || 65,
            riskCategory: c.riskCategory || 'High',
            adaptationRecommendations: c.keyVulnerabilityFactors || ['Groundwater recharge', 'Soil conservation']
          }));
          setClimateRecords(formattedClimate);
        }
        if (resDisp.status === 'fulfilled' && resDisp.value) {
          if (resDisp.value.summary) {
            setDisputeStats({
              totalPendingDisputes: resDisp.value.summary.pendingCases || 1248000,
              averageDurationYears: +(resDisp.value.summary.avgDurationMonths / 12).toFixed(1) || 7.4,
              revenueCourtVsCivilCourt: { revenueCourtPercentage: 62, civilCourtPercentage: 38 },
              disputeCategories: {
                'Title & Ownership Conflicts': 485000,
                'Boundary & Cadastral Encroachment': 342000,
                'Land Acquisition & Compensation': 198000,
                'Inheritance & Partition Lawsuits': 142000,
                'Tenancy & Possession Disputes': 81000
              },
              stateRankings: [
                { state: 'Uttar Pradesh', disputeCount: 312000 },
                { state: 'Maharashtra', disputeCount: 184000 },
                { state: 'Bihar', disputeCount: 162000 },
                { state: 'Madhya Pradesh', disputeCount: 121000 },
                { state: 'Telangana', disputeCount: 98000 }
              ]
            });
          } else {
            setDisputeStats(resDisp.value);
          }
        }
        if (resChal.status === 'fulfilled' && Array.isArray(resChal.value)) {
          setChallenges(resChal.value);
        }
        if (resProj.status === 'fulfilled' && Array.isArray(resProj.value)) {
          setProjects(resProj.value);
        }

        // Load persisted or server-side users
        fetch('/api/auth/users')
          .then(r => r.json())
          .then(users => {
            if (Array.isArray(users) && users.length > 0) {
              setAllUsers(users);
            }
          })
          .catch(() => {});
      } catch (err) {
        console.warn('Backend load handled safely:', err);
      }
    }

    loadData();
  }, []);

  // Cross-Module Interaction Handlers
  const handleAskBhoomi = (query: string) => {
    setBhoomiInitialPrompt(query);
    setCurrentView('bhoomi-ai');
  };

  const handleOpenDocInResearch = (doc: ResearchDocument) => {
    setSelectedResearchDocId(doc.id);
    setCurrentView('research');
  };

  const handleOpenResearchForState = (stateName: string) => {
    setResearchSearchQuery(stateName);
    setCurrentView('research');
  };

  const handleOpenReportModal = (topic?: string, focusArea?: string) => {
    if (topic) setReportTopic(topic);
    if (focusArea) setReportFocusArea(focusArea);
    setIsReportModalOpen(true);
  };

  const handleUploadResearch = (newDoc: Partial<ResearchDocument>) => {
    const doc: ResearchDocument = {
      id: `res_custom_${Date.now()}`,
      title: newDoc.title || 'Untitled Study',
      abstract: newDoc.abstract || '',
      author: newDoc.author || 'Dr. Ananya Sharma',
      organization: newDoc.organization || 'IIT Delhi',
      year: newDoc.year || 2025,
      category: newDoc.category || 'Land Governance',
      keywords: newDoc.keywords || ['Land Use'],
      state: newDoc.state || 'National',
      documentType: 'Research Paper',
      fileSize: '2.4 MB',
      citationCount: 0,
      uploadDate: new Date().toISOString(),
      isPeerReviewed: true
    };
    setResearchDocs(prev => [doc, ...prev]);
  };

  const handleUploadDataset = (newDs: Partial<DatasetRecord>) => {
    const ds: DatasetRecord = {
      id: `ds_custom_${Date.now()}`,
      name: newDs.name || 'Custom Spatial Dataset',
      description: newDs.description || '',
      format: newDs.format || 'CSV',
      state: newDs.state || 'National',
      year: newDs.year || 2025,
      organization: newDs.organization || 'Registered Researcher',
      license: 'Open Government Data License (OGDL)',
      size: '8.4 MB',
      rowCount: newDs.rowCount || 500,
      columns: newDs.columns || ['id', 'state', 'area_hectares'],
      isDemoData: true
    };
    setDatasets(prev => [ds, ...prev]);
  };

  const handleExecuteSIHStep = (step: SIHDemoStep) => {
    if (step.requiredRole) {
      setUserRole(step.requiredRole);
      const matched = allUsers.find(u => u.role === step.requiredRole) || SYSTEM_USERS[step.requiredRole];
      if (matched) setCurrentUser(matched);
    }
    setCurrentView(step.targetView);
    if (step.targetView === 'gis') {
      setGisStateFocus('Telangana');
    }
    if (step.targetView === 'bhoomi-ai') {
      setBhoomiInitialPrompt('Summarize the key findings and policy implications of Urbanization Pressures and Agricultural Land Dynamics in Peri-Urban Telangana (2015-2024).');
    }
  };

  const handleSelectUser = (user: User) => {
    setCurrentUser(user);
    setUserRole(user.role);
    setGuestNoticeVisible(false);
    setAllUsers(prev => {
      if (!prev.some(u => u.id === user.id)) {
        return [user, ...prev];
      }
      return prev;
    });
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setUserRole('PUBLIC_USER');
    setGuestNoticeVisible(true);
  };

  const handleRoleSwitch = (newRole: UserRole) => {
    setUserRole(newRole);
    const matched = allUsers.find(u => u.role === newRole) || SYSTEM_USERS[newRole];
    if (matched) {
      setCurrentUser(matched);
    }
  };

  // Default dispute fallback to prevent null rendering
  const activeDisputeStats: LandDisputeStats = disputeStats || {
    totalPendingDisputes: 1248000,
    averageDurationYears: 7.4,
    revenueCourtVsCivilCourt: { revenueCourtPercentage: 62, civilCourtPercentage: 38 },
    disputeCategories: {
      'Title & Ownership Conflicts': 485000,
      'Boundary & Cadastral Encroachment': 342000,
      'Land Acquisition & Compensation': 198000,
      'Inheritance & Partition Lawsuits': 142000,
      'Tenancy & Possession Disputes': 81000
    },
    stateRankings: [
      { state: 'Uttar Pradesh', disputeCount: 312000 },
      { state: 'Maharashtra', disputeCount: 184000 },
      { state: 'Bihar', disputeCount: 162000 },
      { state: 'Madhya Pradesh', disputeCount: 121000 },
      { state: 'Telangana', disputeCount: 98000 }
    ]
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans antialiased">
      
      {/* Enterprise Government Header */}
      <Header
        currentUser={currentUser}
        onRoleSwitch={handleRoleSwitch}
        onOpenLoginModal={() => setIsLoginModalOpen(true)}
        onLogout={handleLogout}
        onNavigate={(viewId) => setCurrentView(viewId)}
        unreadNotificationsCount={unreadNotifications}
        onToggleNotifications={() => setUnreadNotifications(0)}
      />

      {/* Guest Mode Notification Strip if logged out */}
      {guestNoticeVisible && !currentUser && (
        <div id="guest-logout-banner" className="bg-amber-50 border-b border-amber-200 px-4 sm:px-6 py-2.5 flex items-center justify-between text-xs text-amber-900 animate-in fade-in duration-200">
          <div className="flex items-center gap-2">
            <span className="font-bold px-1.5 py-0.5 rounded bg-amber-200/80 text-amber-900 uppercase text-[10px]">Guest Mode</span>
            <span>You have logged out. You can browse public land records & research, or log in as a specific user to access all analytical and administrative tools.</span>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <button
              id="banner-login-btn"
              onClick={() => setIsLoginModalOpen(true)}
              className="px-3 py-1 bg-blue-900 hover:bg-blue-800 text-white font-semibold rounded-lg text-xs transition-colors cursor-pointer"
            >
              Log In / Select User
            </button>
            <button
              onClick={() => setGuestNoticeVisible(false)}
              className="text-amber-700 hover:text-amber-950 p-1 font-bold text-sm cursor-pointer"
              title="Dismiss"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {/* Main Body */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* Navigation Sidebar */}
        <Sidebar
          currentView={currentView}
          onSelectView={(viewId) => setCurrentView(viewId)}
          userRole={userRole}
        />

        {/* View Content Viewport */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 bg-slate-50">
          <div className="max-w-7xl mx-auto space-y-6">
            
            {/* View: Dashboard */}
            {currentView === 'dashboard' && (
              <DashboardView
                onNavigate={(v) => setCurrentView(v)}
                recentDocs={researchDocs.slice(0, 5)}
                recentDatasets={datasets.slice(0, 4)}
                onSelectDoc={handleOpenDocInResearch}
              />
            )}

            {/* View: Research Repository */}
            {currentView === 'research' && (
              <ResearchView
                documents={researchDocs}
                onUploadDocument={handleUploadResearch}
                onAskBhoomi={handleAskBhoomi}
                initialSearchQuery={researchSearchQuery}
                selectedDocId={selectedResearchDocId}
              />
            )}

            {/* View: AI Semantic Search */}
            {currentView === 'semantic-search' && (
              <SemanticSearchView
                onOpenDoc={handleOpenDocInResearch}
                onAskBhoomi={handleAskBhoomi}
              />
            )}

            {/* View: Bhoomi AI Assistant */}
            {currentView === 'bhoomi-ai' && (
              <BhoomiAssistantView
                initialPrompt={bhoomiInitialPrompt}
                onOpenDocById={(docId) => {
                  setSelectedResearchDocId(docId);
                  setCurrentView('research');
                }}
              />
            )}

            {/* View: GIS Explorer */}
            {currentView === 'gis' && (
              <GisExplorerView
                onAskBhoomi={handleAskBhoomi}
                onOpenResearchForState={handleOpenResearchForState}
                selectedStateFromGuide={gisStateFocus}
              />
            )}

            {/* View: Land-Use Analytics */}
            {currentView === 'land-use' && (
              <LandUseAnalyticsView
                onNavigateToSimulator={() => setCurrentView('simulator')}
              />
            )}

            {/* View: Satellite Module */}
            {currentView === 'satellite' && (
              <SatelliteModuleView />
            )}

            {/* View: Climate Risk */}
            {currentView === 'climate' && (
              <ClimateRiskView
                records={climateRecords}
                onAskBhoomi={handleAskBhoomi}
              />
            )}

            {/* View: Land Dispute Analytics */}
            {currentView === 'disputes' && (
              <DisputeAnalyticsView
                stats={activeDisputeStats}
                onAskBhoomi={handleAskBhoomi}
              />
            )}

            {/* View: Datasets & CSV Analytics Tool */}
            {currentView === 'datasets' && (
              <DatasetsView
                datasets={datasets}
                onUploadDataset={handleUploadDataset}
              />
            )}

            {/* View: Policies */}
            {currentView === 'policies' && (
              <PoliciesView
                policies={policies}
                onAskBhoomi={handleAskBhoomi}
              />
            )}

            {/* View: Policy Simulator ⭐ */}
            {currentView === 'simulator' && (
              <PolicySimulatorView
                onGenerateReportModal={handleOpenReportModal}
              />
            )}

            {/* View: Innovation Challenges & Research Projects */}
            {(currentView === 'projects' || currentView === 'innovation' || currentView === 'grants') && (
              <InnovationChallengesView
                challenges={challenges}
                projects={projects}
              />
            )}

          </div>
        </main>
      </div>

      {/* Interactive 20-Step SIH Demo Presentation Floating Panel */}
      {isGuideOpen && (
        <SIHDemoGuide
          currentStepIndex={currentGuideStep}
          onSelectStep={setCurrentGuideStep}
          onExecuteStep={handleExecuteSIHStep}
          onClose={() => setIsGuideOpen(false)}
        />
      )}

      {/* 8-Section AI Research & Decision-Support Report Generator Modal */}
      <ReportGeneratorModal
        isOpen={isReportModalOpen}
        onClose={() => setIsReportModalOpen(false)}
        initialTopic={reportTopic}
        initialFocusArea={reportFocusArea}
      />

      {/* User Login & Persona Switching Modal */}
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onSelectUser={handleSelectUser}
        currentUserId={currentUser?.id}
        allUsers={allUsers}
      />

    </div>
  );
}
