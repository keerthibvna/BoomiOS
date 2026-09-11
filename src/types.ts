export type UserRole = 
  | 'PUBLIC_USER' 
  | 'RESEARCHER' 
  | 'ACADEMIC' 
  | 'POLICYMAKER' 
  | 'ADMIN';

export interface User {
  id: string;
  fullName: string;
  email: string;
  phone?: string;
  organization: string;
  role: UserRole;
  designation?: string;
  avatarUrl?: string;
  createdAt: string;
  status: 'active' | 'pending' | 'suspended';
}

export type AccessLevel = 'public' | 'researcher' | 'authorized_gov' | 'restricted';

export type DocumentType = 
  | 'Research Paper' 
  | 'Government Report' 
  | 'Policy Document' 
  | 'Legal Document' 
  | 'Case Study' 
  | 'Working Paper' 
  | 'Whitepaper';

export interface ResearchDocument {
  id: string;
  title: string;
  description?: string;
  abstract: string;
  author: string;
  organization: string;
  year: number;
  state: string;
  district?: string;
  category: string;
  keywords: string[];
  documentType: DocumentType;
  uploadDate: string;
  fileSize: string;
  fileUrl?: string;
  downloadUrl?: string;
  accessLevel?: AccessLevel;
  tags?: string[];
  citationCount: number;
  downloadCount?: number;
  views?: number;
  viewsCount?: number;
  approvalStatus?: 'approved' | 'pending' | 'rejected';
  isPeerReviewed?: boolean;
  relevanceScore?: number;
  semanticSimilarity?: number;
  keyFindings?: string[];
  relatedDocumentIds?: string[];
}

export interface DatasetRecord {
  id: string;
  name: string;
  description: string;
  organization: string;
  state: string;
  district?: string;
  year: number;
  category?: string;
  format: 'CSV' | 'GeoJSON' | 'JSON' | 'Excel' | 'GeoTIFF' | 'PDF';
  size: string;
  accessLevel?: AccessLevel;
  source?: string;
  license: string;
  uploadDate?: string;
  rowCount?: number;
  columnCount?: number;
  columns?: string[];
  downloadUrl?: string;
  version?: string;
  isDemoData?: boolean;
  sampleRows?: Record<string, string | number>[];
}

export interface PolicyDocument {
  id: string;
  policyName: string;
  department: string;
  ministry: string;
  year: number;
  state: string;
  category: string;
  description: string;
  objectives: string[];
  scope: string;
  targetGroup: string;
  implementationFramework: string;
  expectedImpact: string;
  documentUrl: string;
  status: 'Enacted' | 'Proposed' | 'Under Review' | 'Active' | 'Amended';
  isNational: boolean;
}

export interface PolicyComparisonMatrix {
  parameters: {
    parameter: string;
    policyAValue: string;
    policyBValue: string;
    analysis: string;
  }[];
  keyDifferences: string[];
  synergies: string[];
  recommendedReforms: string[];
}

export interface PolicySimulationInput {
  policyTitle: string;
  state: string;
  district?: string;
  sourceCategory: string; // e.g., 'Agricultural Land'
  targetCategory: string; // e.g., 'Industrial Zone' | 'Urban Residential' | 'Solar Infrastructure'
  conversionPercentage: number; // e.g., 8.5
  timeHorizonYears: number; // e.g., 5
  developmentType: 'High-Density Industrial' | 'Mixed Urban Expansion' | 'Agri-Tech Corridor' | 'Renewable Energy Zone' | 'Smart Township';
  mitigationFactor: 'Standard Buffer' | 'High Afforestation Offset' | 'Strict Water Recycling';
}

export interface SimulationScenarioOutput {
  scenarioName: string;
  description: string;
  agriculturalAreaLostHa: number;
  urbanAreaGainedHa: number;
  estimatedJobsCreated: number;
  farmerDisplacementEst: number;
  infrastructureInvestmentCrores: number;
  dailyWaterDemandMld: number;
  environmentalRiskScore: number; // 0 - 100
  climateVulnerabilityShift: number; // percentage change
  foodSecurityImpactIndex: number; // -10 to +10
  economicMultiplier: number;
}

export interface PolicySimulationResult {
  id: string;
  timestamp: string;
  input: PolicySimulationInput;
  scenarios: {
    scenarioA: SimulationScenarioOutput; // No Change / Baseline
    scenarioB: SimulationScenarioOutput; // Moderate Implementation
    scenarioC: SimulationScenarioOutput; // High/Accelerated Implementation
  };
  policyRecommendation: string;
  riskHighlights: string[];
  disclaimer: string;
}

export interface ResearchProject {
  id: string;
  title: string;
  description: string;
  researchArea: string;
  state: string;
  district?: string;
  startDate: string;
  endDate: string;
  principalResearcher: string;
  organization: string;
  objectives: string[];
  expectedOutcomes: string[];
  status: 'Proposed' | 'Active' | 'Completed' | 'Archived';
  budgetLakhs: number;
  members: ProjectMember[];
  documentsCount: number;
  datasetsCount: number;
  progressPercentage: number;
  tags: string[];
}

export interface ProjectMember {
  id: string;
  name: string;
  role: 'Principal Investigator' | 'Co-Investigator' | 'Data Analyst' | 'GIS Specialist' | 'Reviewer' | 'Government Observer';
  organization: string;
  avatar?: string;
}

export interface WorkspaceTask {
  id: string;
  title: string;
  status: 'todo' | 'in_progress' | 'review' | 'done';
  assignedTo: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
  dueDate: string;
}

export interface WorkspaceMilestone {
  id: string;
  title: string;
  targetDate: string;
  completed: boolean;
  description: string;
}

export interface WorkspaceComment {
  id: string;
  authorName: string;
  authorRole: string;
  timestamp: string;
  text: string;
}

export interface WorkspaceNote {
  id: string;
  title: string;
  content: string;
  updatedAt: string;
  author: string;
}

export interface CollaborativeWorkspace {
  id: string;
  projectId: string;
  projectTitle: string;
  tasks: WorkspaceTask[];
  milestones: WorkspaceMilestone[];
  comments: WorkspaceComment[];
  notes: WorkspaceNote[];
  activityFeed: {
    id: string;
    timestamp: string;
    action: string;
    user: string;
  }[];
}

export interface InnovationChallenge {
  id: string;
  title: string;
  description: string;
  problemStatement: string;
  organization: string;
  deadline: string;
  eligibility: string;
  prizeAmount: string;
  requiredTechnology: string[];
  status: 'Open' | 'Evaluating' | 'Closed';
  submissionsCount: number;
  category: 'GIS & AI' | 'Land Records & Blockchain' | 'Dispute Resolution' | 'Climate Adaptation';
}

export interface InnovationSubmission {
  id: string;
  challengeId: string;
  challengeTitle: string;
  ideaTitle: string;
  abstract: string;
  teamLead: string;
  teamMembers: string[];
  organization: string;
  submittedAt: string;
  solutionSummary: string;
  status: 'Under Review' | 'Shortlisted' | 'Awarded' | 'Archived';
}

export interface GrantOpportunity {
  id: string;
  grantName: string;
  organization: string;
  fundingAmount: string;
  eligibility: string;
  researchArea: string;
  deadline: string;
  status: 'Accepting Proposals' | 'Under Review' | 'Closed';
  focusSummary: string;
}

export interface GrantProposal {
  id: string;
  grantId: string;
  grantName: string;
  title: string;
  principalInvestigator: string;
  institution: string;
  budgetRequested: string;
  durationMonths: number;
  abstract: string;
  submissionDate: string;
  status: 'Submitted' | 'In Review' | 'Approved' | 'Revision Requested' | 'Rejected';
}

export interface LandDisputeRecord {
  id: string;
  state: string;
  district: string;
  category: 'Ownership' | 'Boundary' | 'Land Acquisition' | 'Inheritance' | 'Encroachment' | 'Registration' | 'Tribal Land Rights';
  totalCases: number;
  pendingCases: number;
  resolvedCases: number;
  avgResolutionTimeMonths: number;
  year: number;
  trend: 'increasing' | 'stable' | 'decreasing';
}

export interface ClimateRiskData {
  state: string;
  district: string;
  floodRiskScore: number; // 0 - 100
  droughtRiskScore: number; // 0 - 100
  heatRiskScore: number; // 0 - 100
  waterStressScore: number; // 0 - 100
  landDegradationScore: number; // 0 - 100
  compositeRiskScore: number; // 0 - 100
  riskCategory: 'Low' | 'Moderate' | 'High' | 'Very High';
  keyVulnerabilityFactors: string[];
}

export interface LandUseYearData {
  year: number;
  agriculturalHa: number;
  urbanHa: number;
  forestHa: number;
  waterHa: number;
  industrialHa: number;
  barrenHa: number;
}

export interface StateGeoProfile {
  id: string;
  stateName: string;
  centerCoords: [number, number]; // [lat, lng]
  zoomLevel: number;
  totalAreaSqKm: number;
  districtsCount: number;
  agriculturalPct: number;
  urbanPct: number;
  forestPct: number;
  waterPct: number;
  industrialPct: number;
  activeResearchCount: number;
  disputeCaseLoad: number;
  climateVulnerabilityLevel: 'Low' | 'Moderate' | 'High' | 'Very High';
  recentHighlights: string[];
}

export interface KnowledgeGraphNode {
  id: string;
  label: string;
  category: 'Issue' | 'Region' | 'Research' | 'Dataset' | 'Policy' | 'Project';
  description: string;
}

export interface KnowledgeGraphEdge {
  source: string;
  target: string;
  label: string;
}

export interface AuditLogEntry {
  id: string;
  timestamp: string;
  userEmail: string;
  userName: string;
  userRole: UserRole;
  action: 'LOGIN' | 'UPLOAD_DOC' | 'DOWNLOAD_DATA' | 'POLICY_SIMULATION' | 'APPROVE_DOC' | 'CREATE_PROJECT' | 'GRANT_SUBMISSION';
  resourceName: string;
  ipAddress: string;
  status: 'SUCCESS' | 'FAILED' | 'FLAGGED';
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  type: 'research' | 'dataset' | 'policy' | 'project' | 'challenge' | 'grant' | 'system';
  read: boolean;
  linkUrl?: string;
}

// Aliases & Comprehensive View Interfaces
export interface PolicyRecord extends PolicyDocument {
  challenges?: string[];
}

export interface ClimateRiskRecord {
  id?: string;
  state: string;
  district: string;
  compositeVulnerabilityScore: number;
  droughtScore: number;
  floodRiskScore: number;
  waterStressScore: number;
  soilDegradationIndex: number;
  riskCategory: 'Low' | 'Moderate' | 'High' | 'Very High';
  adaptationRecommendations: string[];
}

export interface LandDisputeStats {
  totalPendingDisputes: number;
  averageDurationYears: number;
  revenueCourtVsCivilCourt: {
    revenueCourtPercentage: number;
    civilCourtPercentage: number;
  };
  disputeCategories: Record<string, number>;
  stateRankings: { state: string; disputeCount: number }[];
}

export interface StateGeospatialData extends StateGeoProfile {}
