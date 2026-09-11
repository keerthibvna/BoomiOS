import express, { Request, Response } from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { 
  SEED_USERS, 
  SEED_RESEARCH_DOCS, 
  SEED_DATASETS, 
  SEED_POLICIES, 
  SEED_PROJECTS, 
  SEED_WORKSPACES, 
  SEED_INNOVATION_CHALLENGES, 
  SEED_GRANTS, 
  SEED_DISPUTE_RECORDS, 
  SEED_CLIMATE_RISK_DATA, 
  SEED_STATES, 
  SEED_AUDIT_LOGS, 
  SEED_NOTIFICATIONS 
} from './server/seedData.ts';
import { askBhoomiAssistant, generateResearchReport } from './server/geminiService.ts';
import { runPolicySimulation } from './server/simulationEngine.ts';
import { 
  User, 
  ResearchDocument, 
  DatasetRecord, 
  ResearchProject, 
  InnovationSubmission, 
  GrantProposal, 
  AuditLogEntry,
  NotificationItem,
  PolicySimulationInput 
} from './src/types.ts';

// In-Memory mutable data store initialized with verified seed data
const usersStore: User[] = [...SEED_USERS];
const researchDocsStore: ResearchDocument[] = [...SEED_RESEARCH_DOCS];
const datasetsStore: DatasetRecord[] = [...SEED_DATASETS];
const projectsStore: ResearchProject[] = [...SEED_PROJECTS];
const workspacesStore = { ...SEED_WORKSPACES };
const challengesStore = [...SEED_INNOVATION_CHALLENGES];
const submissionsStore: InnovationSubmission[] = [];
const grantsStore = [...SEED_GRANTS];
const proposalsStore: GrantProposal[] = [];
const auditLogsStore: AuditLogEntry[] = [...SEED_AUDIT_LOGS];
const notificationsStore: NotificationItem[] = [...SEED_NOTIFICATIONS];

function logAudit(
  userEmail: string, 
  userName: string, 
  userRole: User['role'], 
  action: AuditLogEntry['action'], 
  resourceName: string,
  req: Request
) {
  const ip = (req.headers['x-forwarded-for'] as string) || req.socket.remoteAddress || '127.0.0.1';
  const entry: AuditLogEntry = {
    id: `aud_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
    timestamp: new Date().toISOString(),
    userEmail,
    userName,
    userRole,
    action,
    resourceName,
    ipAddress: ip,
    status: 'SUCCESS'
  };
  auditLogsStore.unshift(entry);
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Essential Middlewares
  app.use(express.json({ limit: '50mb' }));
  app.use(express.urlencoded({ extended: true, limit: '50mb' }));

  // --- API ROUTES FIRST ---

  // Health Check
  app.get('/api/health', (_req: Request, res: Response) => {
    res.json({ 
      status: 'online', 
      platform: 'National Digital Platform for Land Governance',
      version: '2.4.0-SIH',
      timestamp: new Date().toISOString()
    });
  });

  // --- 1. AUTHENTICATION & USERS ---
  app.post('/api/auth/login', (req: Request, res: Response) => {
    const { email, role } = req.body;
    let user = usersStore.find(u => u.email.toLowerCase() === (email || '').toLowerCase());
    
    // If role-based quick login is triggered or specific email
    if (!user && role) {
      user = usersStore.find(u => u.role === role);
    }
    
    if (!user) {
      // Default to researcher or create guest session
      user = usersStore.find(u => u.role === 'RESEARCHER') || usersStore[0];
    }

    logAudit(user.email, user.fullName, user.role, 'LOGIN', 'Portal Authentication', req);

    res.json({
      token: `bhoomi_jwt_${user.id}_${Date.now()}`,
      user
    });
  });

  app.post('/api/auth/register', (req: Request, res: Response) => {
    const { fullName, email, phone, organization, role, designation } = req.body;
    if (!fullName || !email) {
      return res.status(400).json({ error: 'Full name and email are required.' });
    }

    const newUser: User = {
      id: `usr_${Date.now()}`,
      fullName,
      email,
      phone: phone || '',
      organization: organization || 'Academic / Independent Researcher',
      role: role || 'RESEARCHER',
      designation: designation || 'Research Scholar',
      createdAt: new Date().toISOString(),
      status: 'active'
    };

    usersStore.push(newUser);
    logAudit(newUser.email, newUser.fullName, newUser.role, 'LOGIN', 'New User Registration', req);

    res.status(201).json({
      token: `bhoomi_jwt_${newUser.id}_${Date.now()}`,
      user: newUser
    });
  });

  app.get('/api/auth/users', (_req: Request, res: Response) => {
    res.json(usersStore);
  });

  // --- 2. MAIN DASHBOARD OVERVIEW METRICS ---
  app.get('/api/analytics/overview', (_req: Request, res: Response) => {
    res.json({
      stats: {
        totalPublications: researchDocsStore.length + 1840,
        totalDatasets: datasetsStore.length + 320,
        totalPolicies: SEED_POLICIES.length + 84,
        activeProjects: projectsStore.length + 48,
        pendingDisputes: 284000,
        highClimateRiskDistricts: 142,
        innovationChallenges: challengesStore.length + 12,
        registeredResearchers: usersStore.length + 1420
      },
      landUseTimeSeries: [
        { year: 2015, agricultureHa: 142.4, urbanHa: 28.2, forestHa: 71.5, waterHa: 14.8, industrialHa: 6.2 },
        { year: 2018, agricultureHa: 138.1, urbanHa: 34.6, forestHa: 71.2, waterHa: 14.2, industrialHa: 8.4 },
        { year: 2021, agricultureHa: 133.5, urbanHa: 41.8, forestHa: 70.8, waterHa: 13.9, industrialHa: 11.2 },
        { year: 2024, agricultureHa: 129.2, urbanHa: 49.5, forestHa: 70.4, waterHa: 13.5, industrialHa: 14.1 }
      ],
      publicationsByYear: [
        { year: '2020', count: 184 },
        { year: '2021', count: 245 },
        { year: '2022', count: 320 },
        { year: '2023', count: 415 },
        { year: '2024', count: 498 }
      ],
      researchByState: [
        { state: 'Telangana', papers: 142, datasets: 38 },
        { state: 'Maharashtra', papers: 210, datasets: 54 },
        { state: 'Karnataka', papers: 168, datasets: 42 },
        { state: 'Uttar Pradesh', papers: 195, datasets: 48 },
        { state: 'Odisha', papers: 115, datasets: 29 },
        { state: 'Gujarat', papers: 132, datasets: 35 }
      ],
      disputesByCategory: [
        { category: 'Boundary & Demarcation', count: 98400, percentage: 34.6 },
        { category: 'Ownership & Title', count: 76200, percentage: 26.8 },
        { category: 'Inheritance & Succession', count: 52100, percentage: 18.3 },
        { category: 'Encroachment on Commons', count: 34200, percentage: 12.0 },
        { category: 'Land Acquisition (RFCTLARR)', count: 23100, percentage: 8.1 }
      ]
    });
  });

  // --- 3. RESEARCH REPOSITORY ---
  app.get('/api/research', (req: Request, res: Response) => {
    const { q, state, category, docType, year } = req.query;
    let docs = [...researchDocsStore];

    if (q) {
      const query = String(q).toLowerCase();
      docs = docs.filter(d => 
        d.title.toLowerCase().includes(query) ||
        d.description.toLowerCase().includes(query) ||
        d.abstract.toLowerCase().includes(query) ||
        d.author.toLowerCase().includes(query) ||
        d.keywords.some(k => k.toLowerCase().includes(query)) ||
        d.state.toLowerCase().includes(query)
      );
    }

    if (state && state !== 'All') {
      docs = docs.filter(d => d.state === state || d.state === 'National');
    }

    if (category && category !== 'All') {
      docs = docs.filter(d => d.category === category);
    }

    if (docType && docType !== 'All') {
      docs = docs.filter(d => d.documentType === docType);
    }

    if (year && year !== 'All') {
      docs = docs.filter(d => d.year === Number(year));
    }

    res.json(docs);
  });

  app.get('/api/research/:id', (req: Request, res: Response) => {
    const doc = researchDocsStore.find(d => d.id === req.params.id);
    if (!doc) {
      return res.status(404).json({ error: 'Document not found.' });
    }
    doc.views = (doc.views || 0) + 1;
    res.json(doc);
  });

  app.post('/api/research', (req: Request, res: Response) => {
    const { title, description, abstract, author, organization, year, state, district, category, keywords, documentType } = req.body;
    
    if (!title || !description) {
      return res.status(400).json({ error: 'Title and description are required.' });
    }

    const newDoc: ResearchDocument = {
      id: `res_${Date.now()}`,
      title,
      description,
      abstract: abstract || description,
      author: author || 'Contributing Researcher',
      organization: organization || 'Research Institution',
      year: Number(year) || new Date().getFullYear(),
      state: state || 'National',
      district: district || '',
      category: category || 'General Land Governance',
      keywords: Array.isArray(keywords) ? keywords : (keywords ? String(keywords).split(',').map(s => s.trim()) : ['Land Policy']),
      documentType: documentType || 'Research Paper',
      uploadDate: new Date().toISOString(),
      fileSize: '3.4 MB',
      fileUrl: '/documents/user_uploaded_paper.pdf',
      accessLevel: 'public',
      tags: ['Uploaded Research', state || 'National'],
      citationCount: 0,
      downloadCount: 0,
      views: 1,
      approvalStatus: 'approved'
    };

    researchDocsStore.unshift(newDoc);
    logAudit(author || 'researcher', author || 'Researcher', 'RESEARCHER', 'UPLOAD_DOC', `Research Paper: ${title}`, req);

    res.status(201).json(newDoc);
  });

  // --- 4. DATASETS REPOSITORY ---
  app.get('/api/datasets', (req: Request, res: Response) => {
    const { q, state, format, category } = req.query;
    let list = [...datasetsStore];

    if (q) {
      const query = String(q).toLowerCase();
      list = list.filter(d => 
        d.name.toLowerCase().includes(query) ||
        d.description.toLowerCase().includes(query) ||
        d.organization.toLowerCase().includes(query)
      );
    }

    if (state && state !== 'All') {
      list = list.filter(d => d.state === state || d.state === 'National');
    }

    if (format && format !== 'All') {
      list = list.filter(d => d.format === format);
    }

    if (category && category !== 'All') {
      list = list.filter(d => d.category === category);
    }

    res.json(list);
  });

  app.post('/api/datasets', (req: Request, res: Response) => {
    const { name, description, organization, state, year, category, format, columns, rowCount } = req.body;
    
    const newDs: DatasetRecord = {
      id: `ds_${Date.now()}`,
      name,
      description,
      organization: organization || 'National Research Contributor',
      state: state || 'National',
      year: Number(year) || 2024,
      category: category || 'Geospatial & Field Surveys',
      format: format || 'CSV',
      size: '12.4 MB',
      accessLevel: 'public',
      source: 'Uploaded Research Dataset',
      license: 'Open Government Data License',
      uploadDate: new Date().toISOString(),
      rowCount: Number(rowCount) || 1250,
      columnCount: Array.isArray(columns) ? columns.length : 8,
      columns: Array.isArray(columns) ? columns : ['parcel_id', 'state', 'mandal', 'agri_area_ha', 'soil_class', 'water_source'],
      downloadUrl: '/datasets/custom_user_dataset.csv',
      version: 'v1.0',
      isDemoData: true
    };

    datasetsStore.unshift(newDs);
    logAudit('researcher', 'Researcher', 'RESEARCHER', 'UPLOAD_DOC', `Dataset: ${name}`, req);

    res.status(201).json(newDs);
  });

  // --- 5. POLICIES REPOSITORY & COMPARISON ---
  app.get('/api/policies', (req: Request, res: Response) => {
    res.json(SEED_POLICIES);
  });

  app.get('/api/policies/compare', (req: Request, res: Response) => {
    const { policyAId, policyBId } = req.query;
    const policyA = SEED_POLICIES.find(p => p.id === policyAId) || SEED_POLICIES[0];
    const policyB = SEED_POLICIES.find(p => p.id === policyBId) || SEED_POLICIES[1];

    res.json({
      policyA,
      policyB,
      matrix: [
        { parameter: 'Primary Objective', policyAValue: policyA.objectives[0], policyBValue: policyB.objectives[0], analysis: 'Policy A targets macro spatial zoning balance, while Policy B focuses on micro parcel cadastral security.' },
        { parameter: 'Statutory Scope', policyAValue: policyA.scope, policyBValue: policyB.scope, analysis: 'National scope requiring state-level administrative adoption.' },
        { parameter: 'Target Beneficiaries', policyAValue: policyA.targetGroup, policyBValue: policyB.targetGroup, analysis: 'Complements agrarian landowners with modern digital credit facilitation.' },
        { parameter: 'Implementation Mechanism', policyAValue: policyA.implementationFramework, policyBValue: policyB.implementationFramework, analysis: 'Requires inter-departmental data sharing between revenue, town planning, and registry.' },
        { parameter: 'Expected Governance Impact', policyAValue: policyA.expectedImpact, policyBValue: policyB.expectedImpact, analysis: 'High synergy when spatial maps are bound to computerized rights of record.' }
      ],
      keySynergies: [
        'Integrating ULPIN (Bhu-Aadhaar) with spatial Master Plans prevents unauthorized parcel subdivision in agricultural reserves.',
        'Real-time automated registry mutations eliminate latency between deed signing and boundary record updates.'
      ],
      recommendedReforms: [
        'Mandate 3D volumetric cadastre for high-density multi-storey urban developments.',
        'Establish independent State Land Use Regulatory Authorities with quasi-judicial dispute mediation powers.'
      ]
    });
  });

  // --- 6. GIS & GEOSPATIAL LAYERS ---
  app.get('/api/gis/states', (_req: Request, res: Response) => {
    res.json(SEED_STATES);
  });

  app.get('/api/gis/state/:id', (req: Request, res: Response) => {
    const state = SEED_STATES.find(s => s.id === req.params.id || s.stateName.toLowerCase() === req.params.id.toLowerCase());
    if (!state) {
      return res.status(404).json({ error: 'State geospatial profile not found.' });
    }
    res.json(state);
  });

  // --- 7. LAND USE CHANGE & SATELLITE ANALYSIS ---
  app.get('/api/land-use/transitions', (req: Request, res: Response) => {
    const stateName = (req.query.state as string) || 'Telangana';
    res.json({
      state: stateName,
      baselineYear: 2015,
      midYear: 2020,
      currentYear: 2025,
      summary: {
        agriculturalChangePct: -18.4,
        urbanChangePct: +64.2,
        forestChangePct: -1.8,
        waterBodiesChangePct: -4.2,
        industrialChangePct: +112.5
      },
      categories: [
        { name: 'Agricultural Land', area2015Ha: 312000, area2020Ha: 278000, area2025Ha: 254500, changePct: -18.4, trend: 'decreasing' },
        { name: 'Urban & Built-Up', area2015Ha: 84000, area2020Ha: 118000, area2025Ha: 137900, changePct: +64.2, trend: 'increasing' },
        { name: 'Forest & Woodland', area2015Ha: 145000, area2020Ha: 143500, area2025Ha: 142400, changePct: -1.8, trend: 'stable' },
        { name: 'Water Bodies & Tanks', area2015Ha: 24000, area2020Ha: 23400, area2025Ha: 22990, changePct: -4.2, trend: 'decreasing' },
        { name: 'Industrial Corridors', area2015Ha: 12000, area2020Ha: 18500, area2025Ha: 25500, changePct: +112.5, trend: 'increasing' }
      ],
      satelliteClassification: {
        sensor: 'Sentinel-2 Multispectral & Landsat-8 Operational Land Imager',
        resolution: '10m / 30m',
        cloudCoverage: '< 2.5%',
        overallAccuracy: '91.8%',
        kappaCoefficient: 0.88,
        isDemoDataset: true
      }
    });
  });

  // --- 8. CLIMATE VULNERABILITY INDICATORS ---
  app.get('/api/climate/indicators', (req: Request, res: Response) => {
    const { state } = req.query;
    let records = [...SEED_CLIMATE_RISK_DATA];
    if (state && state !== 'All') {
      records = records.filter(r => r.state === state);
    }
    res.json(records);
  });

  // --- 9. LAND DISPUTE ANALYTICS ---
  app.get('/api/disputes/stats', (req: Request, res: Response) => {
    const { state } = req.query;
    let records = [...SEED_DISPUTE_RECORDS];
    if (state && state !== 'All') {
      records = records.filter(r => r.state === state);
    }

    const totalCases = records.reduce((acc, r) => acc + r.totalCases, 0);
    const pendingCases = records.reduce((acc, r) => acc + r.pendingCases, 0);
    const resolvedCases = records.reduce((acc, r) => acc + r.resolvedCases, 0);
    const avgDuration = +(records.reduce((acc, r) => acc + r.avgResolutionTimeMonths, 0) / (records.length || 1)).toFixed(1);

    res.json({
      summary: {
        totalCases,
        pendingCases,
        resolvedCases,
        clearanceRatePct: +((resolvedCases / (totalCases || 1)) * 100).toFixed(1),
        avgDurationMonths: avgDuration
      },
      records
    });
  });

  // --- 10. POLICY SIMULATION MODULE ⭐ ---
  app.post('/api/simulation/run', (req: Request, res: Response) => {
    const input: PolicySimulationInput = req.body;
    const result = runPolicySimulation(input);

    logAudit(
      'policymaker', 
      'Policy Specialist', 
      'POLICYMAKER', 
      'POLICY_SIMULATION', 
      `Simulation: ${input.policyTitle || 'Land Conversion'} (${input.conversionPercentage}%)`, 
      req
    );

    res.json(result);
  });

  // --- 11. BHOOMI AI RESEARCH ASSISTANT & RAG ---
  app.post('/api/ai/assistant', async (req: Request, res: Response) => {
    const { query } = req.body;
    if (!query) {
      return res.status(400).json({ error: 'Query is required.' });
    }

    try {
      const response = await askBhoomiAssistant(query);
      res.json(response);
    } catch (err: any) {
      res.status(500).json({ error: 'AI Assistant query processing failed', details: err.message });
    }
  });

  // --- 12. AI SEMANTIC SEARCH ---
  app.post('/api/ai/semantic-search', async (req: Request, res: Response) => {
    const { query } = req.body;
    const q = (query || '').toLowerCase();

    // Semantic matching logic using concept expansion
    const rankedDocs = researchDocsStore.map(doc => {
      let score = 0.55;
      if (q.includes(doc.state.toLowerCase())) score += 0.25;
      if (doc.keywords.some(k => q.includes(k.toLowerCase()))) score += 0.20;
      if (q.includes('loss') || q.includes('urban') || q.includes('convert')) {
        if (doc.category.includes('Urban') || doc.title.toLowerCase().includes('urban')) score += 0.18;
      }
      if (q.includes('dispute') || q.includes('court') || q.includes('litigation')) {
        if (doc.category.includes('Dispute') || doc.title.toLowerCase().includes('dispute')) score += 0.22;
      }
      if (q.includes('forest') || q.includes('tribal')) {
        if (doc.category.includes('Forest') || doc.title.toLowerCase().includes('forest')) score += 0.22;
      }
      score = Math.min(0.99, +(score).toFixed(2));
      return {
        ...doc,
        semanticSimilarity: score,
        relevanceScore: score
      };
    }).sort((a, b) => (b.semanticSimilarity || 0) - (a.semanticSimilarity || 0));

    res.json({
      query,
      resultsCount: rankedDocs.length,
      documents: rankedDocs,
      relatedDatasets: SEED_DATASETS.slice(0, 2),
      relatedPolicies: SEED_POLICIES.slice(0, 2)
    });
  });

  // --- 13. RESEARCH REPORT GENERATOR ---
  app.post('/api/ai/report', async (req: Request, res: Response) => {
    const { topic, focusArea } = req.body;
    try {
      const report = await generateResearchReport(topic || 'Agricultural Land Dynamics', focusArea || 'Telangana Peri-Urban Corridors');
      res.json(report);
    } catch (err: any) {
      res.status(500).json({ error: 'Report generation failed', details: err.message });
    }
  });

  // --- 14. RESEARCH PROJECTS & COLLABORATIVE WORKSPACES ---
  app.get('/api/projects', (_req: Request, res: Response) => {
    res.json(projectsStore);
  });

  app.get('/api/projects/:id', (req: Request, res: Response) => {
    const proj = projectsStore.find(p => p.id === req.params.id);
    if (!proj) {
      return res.status(404).json({ error: 'Project not found.' });
    }
    const workspace = workspacesStore[proj.id] || {
      id: `ws_${proj.id}`,
      projectId: proj.id,
      projectTitle: proj.title,
      tasks: [],
      milestones: [],
      comments: [],
      notes: [],
      activityFeed: []
    };
    res.json({ project: proj, workspace });
  });

  app.post('/api/projects', (req: Request, res: Response) => {
    const { title, description, researchArea, state, district, startDate, endDate, principalResearcher, organization, objectives, expectedOutcomes, budgetLakhs } = req.body;
    
    const newProj: ResearchProject = {
      id: `proj_${Date.now()}`,
      title,
      description,
      researchArea: researchArea || 'Land Policy & GIS',
      state: state || 'Telangana',
      district: district || '',
      startDate: startDate || new Date().toISOString().split('T')[0],
      endDate: endDate || '2026-12-31',
      principalResearcher: principalResearcher || 'Dr. Ananya Sharma',
      organization: organization || 'IIT Delhi',
      objectives: Array.isArray(objectives) ? objectives : ['Establish baseline dataset', 'Conduct field ground truth surveys'],
      expectedOutcomes: Array.isArray(expectedOutcomes) ? expectedOutcomes : ['Policy brief to State Land Board', 'Open GeoJSON dataset'],
      status: 'Active',
      budgetLakhs: Number(budgetLakhs) || 25.0,
      members: [
        { id: 'm1', name: principalResearcher || 'Dr. Ananya Sharma', role: 'Principal Investigator', organization: organization || 'IIT Delhi' }
      ],
      documentsCount: 0,
      datasetsCount: 0,
      progressPercentage: 15,
      tags: ['Research Project', state || 'National']
    };

    projectsStore.unshift(newProj);
    workspacesStore[newProj.id] = {
      id: `ws_${newProj.id}`,
      projectId: newProj.id,
      projectTitle: newProj.title,
      tasks: [
        { id: 't1', title: 'Prepare project inception report', status: 'in_progress', assignedTo: newProj.principalResearcher, priority: 'high', dueDate: '2024-11-15' }
      ],
      milestones: [
        { id: 'm1', title: 'Inception & Data Inventory', targetDate: '2024-12-31', completed: false, description: 'Collect historical revenue maps and satellite baselines.' }
      ],
      comments: [
        { id: 'c1', authorName: newProj.principalResearcher, authorRole: 'Principal Investigator', timestamp: new Date().toISOString(), text: 'Project workspace initialized. Welcome all team collaborators!' }
      ],
      notes: [],
      activityFeed: [
        { id: 'a1', timestamp: new Date().toISOString(), action: 'Project created and initialized', user: newProj.principalResearcher }
      ]
    };

    logAudit('researcher', newProj.principalResearcher, 'RESEARCHER', 'CREATE_PROJECT', `Project: ${title}`, req);

    res.status(201).json(newProj);
  });

  // Workspace interaction
  app.post('/api/workspaces/:id/tasks', (req: Request, res: Response) => {
    const ws = workspacesStore[req.params.id];
    if (!ws) return res.status(404).json({ error: 'Workspace not found.' });

    const { title, assignedTo, priority, dueDate } = req.body;
    const newTask = {
      id: `tsk_${Date.now()}`,
      title,
      status: 'todo' as const,
      assignedTo: assignedTo || 'Researcher',
      priority: priority || 'medium',
      dueDate: dueDate || '2024-12-01'
    };
    ws.tasks.push(newTask);
    ws.activityFeed.unshift({
      id: `act_${Date.now()}`,
      timestamp: new Date().toISOString(),
      action: `Added task: "${title}"`,
      user: assignedTo || 'Researcher'
    });
    res.status(201).json(newTask);
  });

  app.post('/api/workspaces/:id/comments', (req: Request, res: Response) => {
    const ws = workspacesStore[req.params.id];
    if (!ws) return res.status(404).json({ error: 'Workspace not found.' });

    const { authorName, authorRole, text } = req.body;
    const newComment = {
      id: `cm_${Date.now()}`,
      authorName: authorName || 'Dr. Ananya Sharma',
      authorRole: authorRole || 'Researcher',
      timestamp: new Date().toISOString(),
      text
    };
    ws.comments.push(newComment);
    res.status(201).json(newComment);
  });

  // --- 15. INNOVATION CHALLENGES & GRANTS ---
  app.get('/api/innovation/challenges', (_req: Request, res: Response) => {
    res.json(challengesStore);
  });

  app.post('/api/innovation/submissions', (req: Request, res: Response) => {
    const { challengeId, challengeTitle, ideaTitle, abstract, teamLead, teamMembers, organization, solutionSummary } = req.body;
    const submission: InnovationSubmission = {
      id: `sub_${Date.now()}`,
      challengeId,
      challengeTitle: challengeTitle || 'Innovation Challenge',
      ideaTitle,
      abstract,
      teamLead: teamLead || 'Team Lead',
      teamMembers: Array.isArray(teamMembers) ? teamMembers : ['Researcher 1', 'GIS Analyst'],
      organization: organization || 'IIT Delhi',
      submittedAt: new Date().toISOString(),
      solutionSummary,
      status: 'Under Review'
    };

    submissionsStore.unshift(submission);
    // Increment challenge submission count
    const ch = challengesStore.find(c => c.id === challengeId);
    if (ch) ch.submissionsCount += 1;

    res.status(201).json(submission);
  });

  app.get('/api/grants', (_req: Request, res: Response) => {
    res.json(grantsStore);
  });

  app.post('/api/grants/proposals', (req: Request, res: Response) => {
    const { grantId, grantName, title, principalInvestigator, institution, budgetRequested, durationMonths, abstract } = req.body;
    const proposal: GrantProposal = {
      id: `grp_${Date.now()}`,
      grantId,
      grantName,
      title,
      principalInvestigator,
      institution,
      budgetRequested: budgetRequested || '₹35,00,000',
      durationMonths: Number(durationMonths) || 24,
      abstract,
      submissionDate: new Date().toISOString(),
      status: 'Submitted'
    };
    proposalsStore.unshift(proposal);
    logAudit('researcher', principalInvestigator, 'RESEARCHER', 'GRANT_SUBMISSION', `Grant Proposal: ${title}`, req);
    res.status(201).json(proposal);
  });

  // --- 16. ADMIN & AUDIT TRAIL ---
  app.get('/api/admin/audit-logs', (_req: Request, res: Response) => {
    res.json(auditLogsStore);
  });

  app.get('/api/admin/content/pending', (_req: Request, res: Response) => {
    const pendingDocs = researchDocsStore.filter(d => d.approvalStatus === 'pending');
    res.json(pendingDocs);
  });

  app.post('/api/admin/content/:id/approve', (req: Request, res: Response) => {
    const doc = researchDocsStore.find(d => d.id === req.params.id);
    if (!doc) return res.status(404).json({ error: 'Document not found.' });
    doc.approvalStatus = 'approved';
    logAudit('admin@bhoomi.gov.in', 'Admin Officer', 'ADMIN', 'APPROVE_DOC', `Approved Document: ${doc.title}`, req);
    res.json({ success: true, document: doc });
  });

  app.get('/api/notifications', (_req: Request, res: Response) => {
    res.json(notificationsStore);
  });

  app.post('/api/notifications/:id/read', (req: Request, res: Response) => {
    const notif = notificationsStore.find(n => n.id === req.params.id);
    if (notif) notif.read = true;
    res.json({ success: true });
  });

  // --- VITE MIDDLEWARE SETUP ---
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Bhoomi Land Governance Platform running on port ${PORT}`);
  });
}

startServer();
