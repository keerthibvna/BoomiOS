import { 
  User, 
  ResearchDocument, 
  DatasetRecord, 
  PolicyDocument, 
  ResearchProject, 
  CollaborativeWorkspace, 
  InnovationChallenge, 
  GrantOpportunity, 
  LandDisputeRecord, 
  ClimateRiskData, 
  StateGeoProfile,
  AuditLogEntry,
  NotificationItem
} from '../src/types.ts';

export const SEED_USERS: User[] = [
  {
    id: 'usr_admin_01',
    fullName: 'Shri Amitabh Kant',
    email: 'admin@bhoomi.gov.in',
    organization: 'Department of Land Resources, Ministry of Rural Development',
    role: 'ADMIN',
    designation: 'Director General & Chief Administrator',
    createdAt: '2024-01-10T00:00:00Z',
    status: 'active'
  },
  {
    id: 'usr_researcher_01',
    fullName: 'Dr. Ananya Sharma',
    email: 'ananya.sharma@iitd.ac.in',
    organization: 'Indian Institute of Technology Delhi - Dept of Civil & Geospatial Engineering',
    role: 'RESEARCHER',
    designation: 'Associate Professor & Principal Investigator',
    createdAt: '2024-02-15T00:00:00Z',
    status: 'active'
  },
  {
    id: 'usr_gov_01',
    fullName: 'Rajesh Verma, IAS',
    email: 'rajesh.verma@gov.in',
    organization: 'NITI Aayog - Land Policy & Spatial Planning Cell',
    role: 'POLICYMAKER',
    designation: 'Principal Secretary (Land Governance)',
    createdAt: '2024-02-01T00:00:00Z',
    status: 'active'
  },
  {
    id: 'usr_academic_01',
    fullName: 'Prof. S. Ranganathan',
    email: 's.ranganathan@tiss.edu',
    organization: 'Tata Institute of Social Sciences (TISS) - School of Habitat Studies',
    role: 'ACADEMIC',
    designation: 'Chairperson & Senior Fellow',
    createdAt: '2024-03-05T00:00:00Z',
    status: 'active'
  },
  {
    id: 'usr_public_01',
    fullName: 'Kavita Patel',
    email: 'kavita.patel@public.in',
    organization: 'Independent Citizen Researcher & Farmer Producer Org (FPO) Representative',
    role: 'PUBLIC_USER',
    designation: 'Community Representative',
    createdAt: '2024-04-12T00:00:00Z',
    status: 'active'
  }
];

export const SEED_RESEARCH_DOCS: ResearchDocument[] = [
  {
    id: 'res_01',
    title: 'Urbanization Pressures and Agricultural Land Dynamics in Peri-Urban Telangana (2015-2024)',
    description: 'Empirical remote sensing and cadastral records study analyzing rapid conversion of prime agricultural irrigated land into urban peripheral layouts in Hyderabad and Rangareddy districts.',
    abstract: 'This decadal investigation evaluates the spatial velocity of agricultural land conversion across 14 mandals in peri-urban Telangana. Utilizing multi-temporal Landsat-8 and Sentinel-2 imagery coupled with Dharani land parcel records, the study demonstrates an 18.4% contraction in gross cultivated area between 2015 and 2024. Speculative land banking and highway corridor infrastructure were isolated as primary drivers, resulting in groundwater stress and displacement of tenant sharecroppers.',
    author: 'Dr. Ananya Sharma, Dr. K. V. Rao',
    organization: 'Centre for Spatial Sciences & TISS Hyderabad',
    year: 2024,
    state: 'Telangana',
    district: 'Rangareddy',
    category: 'Land Use & Urbanization',
    keywords: ['Telangana', 'Agricultural Land Loss', 'Urbanization', 'Hyderabad Peri-Urban', 'Sentinel-2', 'Land Conversion'],
    documentType: 'Research Paper',
    uploadDate: '2024-08-14T10:30:00Z',
    fileSize: '4.8 MB',
    fileUrl: '/documents/telangana_agri_land_urbanization_2024.pdf',
    accessLevel: 'public',
    tags: ['Urban Expansion', 'Agriculture Loss', 'Dharani Portal', 'Food Security'],
    citationCount: 42,
    downloadCount: 1240,
    views: 3820,
    approvalStatus: 'approved',
    relevanceScore: 0.98,
    keyFindings: [
      '18.4% net decrease in prime fertile crop lands within 40km radius of Hyderabad Outer Ring Road.',
      'Smallholder farmers shifted to speculative layouts due to real-estate premiums exceeding 400% of farm revenue.',
      'Groundwater table dropped an average of 4.2 meters in converted zones.'
    ],
    relatedDocumentIds: ['res_02', 'pol_05', 'ds_01']
  },
  {
    id: 'res_02',
    title: 'Digital Cadastre and Land Records Modernization under DILRMP: State-level Comparative Evaluation',
    description: 'A comprehensive empirical assessment of Digital India Land Records Modernization Programme across 8 major Indian states, assessing computerization of RoR, spatial map digitization, and dispute reduction.',
    abstract: 'The Digital India Land Records Modernization Programme (DILRMP) seeks to establish transparent, conclusive land titling (Torrens system). This evaluation compares digital record integration across Karnataka (Bhoomi), Telangana (Dharani), Maharashtra (MahaBhulekh), and Uttar Pradesh (Bhulekh). While record computerization exceeds 92%, spatial-textual record synchronization remains below 68% in 5 states, creating titling discrepancies.',
    author: 'Prof. Ramesh Chandra, Dr. M. Jayashree',
    organization: 'National Institute of Rural Development & Panchayati Raj (NIRDPR)',
    year: 2023,
    state: 'National',
    category: 'Digital Cadastre & Titling',
    keywords: ['DILRMP', 'Digital Cadastre', 'Land Titling', 'Bhoomi', 'Dharani', 'Revenue Courts', 'Torrens System'],
    documentType: 'Government Report',
    uploadDate: '2023-11-20T08:00:00Z',
    fileSize: '8.2 MB',
    fileUrl: '/documents/dilrmp_comparative_state_evaluation_2023.pdf',
    accessLevel: 'public',
    tags: ['DILRMP', 'Cadastral Survey', 'Bhoomi', 'Conclusive Titling'],
    citationCount: 78,
    downloadCount: 3120,
    views: 8940,
    approvalStatus: 'approved',
    relevanceScore: 0.91,
    keyFindings: [
      'Digital Record of Rights (RoR) achieved 94.2% coverage nationwide.',
      'Integration of sub-registrar deed offices with revenue records decreased registration fraud by 41%.',
      'Cadastral ground-truth resurvey using CORS/DGPS networks is urgent to resolve legacy boundary errors.'
    ],
    relatedDocumentIds: ['res_01', 'pol_02', 'ds_04']
  },
  {
    id: 'res_03',
    title: 'Climate Vulnerability, Coastal Salinization, and Land Degradation along the Odisha Shoreline',
    description: 'Investigation into sea-level rise induced saline ingress, cyclonic inundation, and fertile agricultural land abandonment in Kendrapara and Puri districts of Odisha.',
    abstract: 'Coastal land governance in the Bay of Bengal encounters escalating hydro-climatic shocks. Over 28,000 hectares of multi-cropped deltaic farm lands in Kendrapara and Jagatsinghpur have suffered progressive salinization post-cyclones Fani and Yaas. This research proposes spatial zoning overlays to prevent non-viable monoculture and support resilient brackish agro-forestry buffers.',
    author: 'Dr. Debasis Mohapatra, Priyadarshini Jena',
    organization: 'Odisha State Geospatial Data Centre & Utkal University',
    year: 2024,
    state: 'Odisha',
    district: 'Kendrapara',
    category: 'Climate Risk & Land Degradation',
    keywords: ['Odisha', 'Coastal Salinization', 'Climate Risk', 'Land Degradation', 'Cyclonic Vulnerability'],
    documentType: 'Research Paper',
    uploadDate: '2024-05-18T14:20:00Z',
    fileSize: '6.1 MB',
    fileUrl: '/documents/odisha_coastal_land_degradation_2024.pdf',
    accessLevel: 'public',
    tags: ['Coastal Zone', 'Salinity', 'Disaster Resilience', 'Agro-forestry'],
    citationCount: 29,
    downloadCount: 890,
    views: 2450,
    approvalStatus: 'approved',
    relevanceScore: 0.88,
    keyFindings: [
      'Soil electrical conductivity exceeded 8.2 dS/m in 64 coastal gram panchayats, rendering paddy cultivation sub-economic.',
      'Community bunds equipped with mangrove bioshields reduced storm surge erosion by 65%.'
    ],
    relatedDocumentIds: ['pol_04', 'ds_03']
  },
  {
    id: 'res_04',
    title: 'Forest Rights Act (FRA 2006) Implementation and Community Forest Resource Titles in Madhya Pradesh',
    description: 'Empirical study on recognition of Individual Forest Rights (IFR) and Community Forest Resource (CFR) titles across tribal-dominated districts of Dindori and Mandla.',
    abstract: 'Analyzing over 45,000 CFR claims across Central India, this study examines institutional bottlenecks in Gram Sabha recognition under the Scheduled Tribes and Other Traditional Forest Dwellers Act 2006. Geospatial boundary mapping using open-source mobile tools reduced claim rejection rates from 54% to under 12%.',
    author: 'Dr. Sunita Narain, B. K. Gond',
    organization: 'Centre for Forest Policy Studies & Tribal Research Institute Bhopal',
    year: 2023,
    state: 'Madhya Pradesh',
    district: 'Dindori',
    category: 'Forest Governance & Tribal Land Rights',
    keywords: ['FRA 2006', 'Community Forest Rights', 'Madhya Pradesh', 'Tribal Land', 'Gram Sabha'],
    documentType: 'Working Paper',
    uploadDate: '2023-09-02T11:00:00Z',
    fileSize: '3.7 MB',
    fileUrl: '/documents/mp_forest_rights_act_governance_2023.pdf',
    accessLevel: 'public',
    tags: ['FRA', 'CFR', 'Indigenous Governance', 'Biodiversity'],
    citationCount: 35,
    downloadCount: 1450,
    views: 3120,
    approvalStatus: 'approved',
    relevanceScore: 0.85,
    keyFindings: [
      'Participatory GIS (pGIS) increased boundary acceptance between adjacent villages by 88%.',
      'CFR title issuance led to a 22% increase in sustainable non-timber forest produce (NTFP) earnings for Women Self-Help Groups.'
    ],
    relatedDocumentIds: ['pol_04', 'ds_02']
  },
  {
    id: 'res_05',
    title: 'Land Dispute Resolution Economics in Revenue Courts: An Analysis of Pendency in Maharashtra',
    description: 'Econometric analysis of 120,000 disputed land cases before Sub-Divisional Magistrates and Tehsildars, analyzing revenue court delays and socio-economic costs.',
    abstract: 'Land dispute litigation constitutes over 66% of civil court case-loads in India. Focusing on Pune, Nashik, and Aurangabad divisions of Maharashtra, this inquiry traces dispute trajectories in partition suits, boundary demarcations, and unauthorized land alienations. The average dispute lifecycle stands at 7.4 years, imposing heavy capital freeze on rural credit accessibility.',
    author: 'Adv. Hemant Gokhale, Dr. Neeta Deshmukh',
    organization: 'Gokhale Institute of Politics and Economics',
    year: 2024,
    state: 'Maharashtra',
    district: 'Pune',
    category: 'Land Disputes & Judicial Reform',
    keywords: ['Land Disputes', 'Revenue Courts', 'Maharashtra', 'Pendency', 'Cadastral Litigation', 'Partition Suits'],
    documentType: 'Case Study',
    uploadDate: '2024-03-22T09:15:00Z',
    fileSize: '5.2 MB',
    fileUrl: '/documents/maharashtra_land_dispute_litigation_2024.pdf',
    accessLevel: 'public',
    tags: ['Revenue Courts', 'Litigation Cost', 'Boundary Disputes', 'ADR Mediation'],
    citationCount: 51,
    downloadCount: 1890,
    views: 4520,
    approvalStatus: 'approved',
    relevanceScore: 0.94,
    keyFindings: [
      'Disputed agricultural parcels experience a 38% reduction in annual crop yield due to under-investment in irrigation.',
      'Institutional Lok Adalats and automated electronic survey demarcation resolved 28% of legacy disputes in pilot tehsils.'
    ],
    relatedDocumentIds: ['pol_03', 'ds_02']
  },
  {
    id: 'res_06',
    title: 'Groundwater Depletion and Cropping Pattern Shifts in Punjab: Agri-Land Zoning Imperatives',
    description: 'Spatial hydrology and remote-sensing analysis of critical aquifer depletion in the Malwa region of Punjab under intensive paddy-wheat mono-cropping.',
    abstract: 'Over 78% of assessment units in Punjab are categorized as over-exploited by the Central Ground Water Board. This investigation models groundwater drawdowns against satellite-derived NDVI and tubewell density. It presents an evidence-backed agro-ecological zoning framework to incentivize crop diversification while protecting land fertility.',
    author: 'Dr. Harpreet Singh, Dr. Balwinder Kaur',
    organization: 'Punjab Agricultural University (PAU) Ludhiana',
    year: 2023,
    state: 'Punjab',
    district: 'Ludhiana',
    category: 'Water Stress & Agro-Zoning',
    keywords: ['Punjab', 'Groundwater Depletion', 'Paddy-Wheat', 'Agro-Ecological Zoning', 'Water Stress'],
    documentType: 'Research Paper',
    uploadDate: '2023-08-11T16:45:00Z',
    fileSize: '5.9 MB',
    fileUrl: '/documents/punjab_groundwater_agri_zoning_2023.pdf',
    accessLevel: 'public',
    tags: ['Water Stress', 'Aquifer Depletion', 'Land Zoning', 'Crop Diversification'],
    citationCount: 64,
    downloadCount: 2210,
    views: 5780,
    approvalStatus: 'approved',
    relevanceScore: 0.89,
    keyFindings: [
      'Annual groundwater table depletion in central Punjab averaged 0.72 meters per annum.',
      'Shifting 15% of paddy acreage to maize/pulses can arrest aquifer collapse and preserve land productive capacity.'
    ],
    relatedDocumentIds: ['pol_01', 'ds_03']
  }
];

export const SEED_DATASETS: DatasetRecord[] = [
  {
    id: 'ds_01',
    name: 'Telangana Land Use Land Cover (LULC) Decadal Dataset (2015-2025)',
    description: 'Decadal raster classification and vector parcel boundaries covering Agricultural, Urban, Forest, Water bodies, and Industrial classes across 33 districts of Telangana.',
    organization: 'Telangana State Remote Sensing Applications Centre (TRAC)',
    state: 'Telangana',
    year: 2024,
    category: 'Geospatial & Remote Sensing',
    format: 'GeoJSON',
    size: '142 MB',
    accessLevel: 'public',
    source: 'TRAC & Bhuvan ISRO Geo-Platform',
    license: 'Open Government Data License (OGDL India)',
    uploadDate: '2024-07-10T12:00:00Z',
    rowCount: 33,
    columnCount: 14,
    columns: ['district_name', 'total_area_ha', 'agri_land_2015', 'agri_land_2020', 'agri_land_2025', 'urban_land_2015', 'urban_land_2020', 'urban_land_2025', 'forest_land_2025', 'water_bodies_2025', 'industrial_2025', 'pct_agri_loss', 'pct_urban_gain'],
    downloadUrl: '/datasets/telangana_lulc_decadal_2025.geojson',
    version: 'v2.4',
    isDemoData: true,
    sampleRows: [
      { district_name: 'Rangareddy', total_area_ha: 503100, agri_land_2015: 312000, agri_land_2020: 278000, agri_land_2025: 245000, urban_land_2015: 84000, urban_land_2020: 118000, urban_land_2025: 154000, pct_agri_loss: -21.4, pct_urban_gain: 83.3 },
      { district_name: 'Medchal-Malkajgiri', total_area_ha: 108400, agri_land_2015: 54000, agri_land_2020: 41000, agri_land_2025: 31000, urban_land_2015: 39000, urban_land_2020: 52000, urban_land_2025: 63000, pct_agri_loss: -42.6, pct_urban_gain: 61.5 },
      { district_name: 'Sangareddy', total_area_ha: 446400, agri_land_2015: 298000, agri_land_2020: 281000, agri_land_2025: 262000, urban_land_2015: 42000, urban_land_2020: 59000, urban_land_2025: 79000, pct_agri_loss: -12.1, pct_urban_gain: 88.1 },
      { district_name: 'Nalgonda', total_area_ha: 712200, agri_land_2015: 520000, agri_land_2020: 512000, agri_land_2025: 504000, urban_land_2015: 32000, urban_land_2020: 38000, urban_land_2025: 44000, pct_agri_loss: -3.1, pct_urban_gain: 37.5 }
    ]
  },
  {
    id: 'ds_02',
    name: 'National Land Dispute Pendency and Revenue Court Statistics (2018-2024)',
    description: 'Disaggregated court case statistics covering dispute types, revenue court pendency, average resolution timelines, and settlement rates across 28 Indian States.',
    organization: 'Department of Justice & DoLR, Ministry of Rural Development',
    state: 'National',
    year: 2024,
    category: 'Judicial & Dispute Records',
    format: 'CSV',
    size: '38 MB',
    accessLevel: 'public',
    source: 'National Judicial Data Grid (NJDG) & State Revenue Portals',
    license: 'Creative Commons Attribution 4.0',
    uploadDate: '2024-06-15T09:30:00Z',
    rowCount: 742,
    columnCount: 11,
    columns: ['state_code', 'state_name', 'district', 'category', 'total_filed', 'pending_cases', 'resolved_cases', 'avg_duration_months', 'encroachment_cases', 'boundary_cases', 'inheritance_cases'],
    downloadUrl: '/datasets/national_land_disputes_2024.csv',
    version: 'v3.1',
    isDemoData: true,
    sampleRows: [
      { state_name: 'Maharashtra', district: 'Pune', category: 'Ownership', total_filed: 14200, pending_cases: 8900, resolved_cases: 5300, avg_duration_months: 52 },
      { state_name: 'Telangana', district: 'Rangareddy', category: 'Boundary', total_filed: 9800, pending_cases: 6100, resolved_cases: 3700, avg_duration_months: 46 },
      { state_name: 'Uttar Pradesh', district: 'Varanasi', category: 'Inheritance', total_filed: 18400, pending_cases: 12200, resolved_cases: 6200, avg_duration_months: 64 },
      { state_name: 'Karnataka', district: 'Bengaluru Rural', category: 'Encroachment', total_filed: 8900, pending_cases: 5400, resolved_cases: 3500, avg_duration_months: 49 }
    ]
  },
  {
    id: 'ds_03',
    name: 'District Climate Vulnerability & Agro-Ecological Risk Atlas of India',
    description: 'Composite indicators for flood risk, drought severity, heat stress, water stress, and agricultural soil degradation synthesized by ICAR and CRIDA.',
    organization: 'Central Research Institute for Dryland Agriculture (CRIDA-ICAR)',
    state: 'National',
    year: 2024,
    category: 'Climate & Environmental Risk',
    format: 'CSV',
    size: '18.4 MB',
    accessLevel: 'public',
    source: 'National Innovations in Climate Resilient Agriculture (NICRA)',
    license: 'Open Government Data License (OGDL)',
    uploadDate: '2024-04-05T14:15:00Z',
    rowCount: 680,
    columnCount: 9,
    columns: ['state', 'district', 'flood_score', 'drought_score', 'heat_score', 'water_stress_score', 'soil_degradation_score', 'composite_risk', 'risk_category'],
    downloadUrl: '/datasets/climate_vulnerability_atlas_india.csv',
    version: 'v1.8',
    isDemoData: true,
    sampleRows: [
      { state: 'Odisha', district: 'Kendrapara', flood_score: 91, drought_score: 34, heat_score: 72, water_stress_score: 68, soil_degradation_score: 84, composite_risk: 83, risk_category: 'Very High' },
      { state: 'Telangana', district: 'Mahabubnagar', flood_score: 28, drought_score: 84, heat_score: 86, water_stress_score: 92, soil_degradation_score: 74, composite_risk: 78, risk_category: 'High' },
      { state: 'Maharashtra', district: 'Osmanabad', flood_score: 22, drought_score: 89, heat_score: 81, water_stress_score: 94, soil_degradation_score: 69, composite_risk: 76, risk_category: 'High' },
      { state: 'Punjab', district: 'Sangrur', flood_score: 38, drought_score: 62, heat_score: 79, water_stress_score: 98, soil_degradation_score: 62, composite_risk: 71, risk_category: 'High' }
    ]
  },
  {
    id: 'ds_04',
    name: 'SVAMITVA Drone Survey & Rural Inhabited Property Records (Abadi Area)',
    description: 'High-resolution drone ortho-mosaic survey coverage, property card (Sampatti Patrak) generation statistics, and boundary dispute resolutions in rural Abadi lands.',
    organization: 'Ministry of Panchayati Raj & Survey of India',
    state: 'National',
    year: 2024,
    category: 'Rural Titling & Drone Survey',
    format: 'Excel',
    size: '52 MB',
    accessLevel: 'researcher',
    source: 'SVAMITVA Dashboard, MoPR',
    license: 'Government Research Access Agreement',
    uploadDate: '2024-08-01T11:20:00Z',
    rowCount: 24000,
    columnCount: 12,
    columns: ['state', 'district', 'villages_surveyed', 'drone_flights_completed', 'maps_notified', 'property_cards_issued', 'disputes_resolved_on_ground', 'inquiry_records_completed'],
    downloadUrl: '/datasets/svamitva_national_progress_2024.xlsx',
    version: 'v4.0',
    isDemoData: true
  }
];

export const SEED_POLICIES: PolicyDocument[] = [
  {
    id: 'pol_01',
    policyName: 'Draft National Land Use Policy (NLUP)',
    department: 'Department of Land Resources',
    ministry: 'Ministry of Rural Development, Government of India',
    year: 2013,
    state: 'National',
    category: 'National Land Use & Planning',
    description: 'Framework guidelines for optimal land allocation across competing demands: agriculture, food security, urban infrastructure, industrial corridors, and ecological preservation.',
    objectives: [
      'Preserve prime multi-cropped agricultural land for long-term national food security.',
      'Delineate ecologically sensitive zones, catchment basins, and forest corridors.',
      'Guide industrial and urban infrastructure towards wasteland, degraded lands, and brownfield sites.',
      'Establish state land use councils and spatial planning authorities.'
    ],
    scope: 'Pan-India advisory framework for state land management boards and urban development authorities.',
    targetGroup: 'State Revenue Departments, Urban Local Bodies, Town Planning Directorates, Agricultural Departments.',
    implementationFramework: 'Tiered governance structure: National Land Use Council (NLUC), State Land Use Boards (SLUB), and District Planning Committees (DPC).',
    expectedImpact: 'Mitigate uncontrolled peri-urban sprawl, halt prime agricultural depletion by 40%, and harmonize state spatial master plans.',
    documentUrl: '/policies/draft_national_land_use_policy_guidelines.pdf',
    status: 'Active',
    isNational: true
  },
  {
    id: 'pol_02',
    policyName: 'Digital India Land Records Modernization Programme (DILRMP) Operational Guidelines',
    department: 'Department of Land Resources',
    ministry: 'Ministry of Rural Development, Government of India',
    year: 2021,
    state: 'National',
    category: 'Digital Cadastre & Land Records',
    description: 'Comprehensive guidelines for transitioning from presumptive titling to conclusive titling, utilizing CORS networks, drone surveys, unique land parcel numbers (ULPIN / Bhu-Aadhaar), and unified web portals.',
    objectives: [
      'Assign 14-digit geo-referenced Bhu-Aadhaar (ULPIN) to every distinct land parcel.',
      'Integrate computerized revenue cadastre with deed registration sub-offices.',
      'Enable paperless, transparent mutation through automatic trigger upon deed registration.',
      'Establish modern revenue record rooms (MRRR) in all tehsils.'
    ],
    scope: 'All 28 States and 8 Union Territories.',
    targetGroup: 'Revenue Officials, Tehsildars, Sub-Registrars, Land Surveyors, Landowners, Banks & Financial Creditors.',
    implementationFramework: 'Centrally Sponsored Scheme (CSS) with 100% central funding for core technological components, survey equipment, and spatial database integration.',
    expectedImpact: 'Zero-dispute land title security, single-window property transaction verification, and reduction of revenue court litigation by 60%.',
    documentUrl: '/policies/dilrmp_operational_guidelines_2021.pdf',
    status: 'Active',
    isNational: true
  },
  {
    id: 'pol_03',
    policyName: 'Right to Fair Compensation and Transparency in Land Acquisition, Rehabilitation and Resettlement Act (RFCTLARR) 2013',
    department: 'Legislative Department',
    ministry: 'Ministry of Rural Development / Ministry of Law and Justice',
    year: 2013,
    state: 'National',
    category: 'Land Acquisition & Resettlement',
    description: 'Parliamentary statute governing mandatory social impact assessment (SIA), humane rehabilitation, informed consent (70-80% for private/PPP), and compensation up to 4x rural market value.',
    objectives: [
      'Ensure a transparent and humane process for land acquisition for industrialization and essential public infrastructure.',
      'Mandate Social Impact Assessment (SIA) with public hearings prior to acquisition.',
      'Provide compensation up to 4 times the market value in rural areas and 2 times in urban zones.',
      'Ensure mandatory rehabilitation and resettlement (R&R) entitlements for affected families and livelihood dependents.'
    ],
    scope: 'All public purpose and public-private partnership infrastructure and industrial projects across India.',
    targetGroup: 'Landowners, Agricultural Laborers, Tenants, Scheduled Tribes, Project Affected Families (PAFs).',
    implementationFramework: 'Collector as Land Acquisition Officer; Independent Social Impact Assessment Unit; State Land Acquisition, Rehabilitation and Resettlement Authority.',
    expectedImpact: 'Eliminate forced displacement, prevent impoverishment of rural agrarian households, and ensure fair rehabilitation.',
    documentUrl: '/policies/rfctlarr_act_2013_full.pdf',
    status: 'Enacted',
    isNational: true
  },
  {
    id: 'pol_04',
    policyName: 'Forest Rights Act (FRA) 2006 & Forest Conservation Rules 2022',
    department: 'Ministry of Tribal Affairs & MoEFCC',
    ministry: 'Ministry of Tribal Affairs, Government of India',
    year: 2022,
    state: 'National',
    category: 'Forest Governance & Ecology',
    description: 'Statutory framework recognizing customary tenurial rights of forest dwelling scheduled tribes (FDST) and traditional forest dwellers (OTFD), and procedural rules for diversion of forest land.',
    objectives: [
      'Vesting pre-existing customary land and forest rights with Gram Sabhas.',
      'Recognizing Community Forest Resource (CFR) rights for conservation and sustainable management.',
      'Regulating procedure for compensatory afforestation and prior Gram Sabha consultation.'
    ],
    scope: 'Forest zones, wildlife sanctuaries, national parks, and tribal sub-plan areas across all states.',
    targetGroup: 'Scheduled Tribes, Other Traditional Forest Dwellers, Forest Department Officials.',
    implementationFramework: 'Three-tier structure: Gram Sabha (originating authority), Sub-Divisional Level Committee (SDLC), District Level Committee (DLC).',
    expectedImpact: 'Legal tenure over 40 million hectares of customary forest commons, empowering 150,000 forest hamlets.',
    documentUrl: '/policies/fra_2006_and_fcr_2022_compendium.pdf',
    status: 'Active',
    isNational: true
  },
  {
    id: 'pol_05',
    policyName: 'Telangana Rights in Land and Pattadar Pass Books Act 2020 (Dharani Act)',
    department: 'Revenue (Commercial Taxes & Land Administration) Department',
    ministry: 'Government of Telangana',
    year: 2020,
    state: 'Telangana',
    category: 'State Land Administration',
    description: 'State legislation replacing legacy manual village revenue records (Pahani/Adangal) with instantaneous slot-booking, biometric registration, and instant electronic mutation via Dharani Integrated Land Records Management System.',
    objectives: [
      'Eliminate discretionary powers of revenue inspectors and tehsildars in agricultural land mutations.',
      'Single-window simultaneous registration and instantaneous mutation.',
      'Mandatory geo-tagging and biometric authentication of buyer and seller.',
      'Digital auto-lock on prohibited government, endowment, and dispute-litigated survey parcels.'
    ],
    scope: 'All agricultural lands across Telangana.',
    targetGroup: 'Pattadar farmers, land buyers, rural credit banks.',
    implementationFramework: 'Tehsildars designated as Joint Sub-Registrars; Dharani centralized cloud portal.',
    expectedImpact: 'Zero-touch mutation, elimination of bribery, and instantaneous issuance of digital e-passbooks.',
    documentUrl: '/policies/telangana_ror_pattadar_act_2020.pdf',
    status: 'Enacted',
    isNational: false
  },
  {
    id: 'pol_06',
    policyName: 'SVAMITVA Scheme (Survey of Villages and Mapping with Improvised Technology in Village Areas)',
    department: 'Ministry of Panchayati Raj',
    ministry: 'Ministry of Panchayati Raj, Government of India',
    year: 2021,
    state: 'National',
    category: 'Rural Property Titling',
    description: 'Central sector scheme for spatial delimitation of rural inhabited (Abadi) parcels using CORS network and survey-grade drone cameras to confer definitive property cards.',
    objectives: [
      'Provide clear, undisputed property cards to rural household owners in village Abadi zones.',
      'Facilitate monetisation of rural residential properties for bank credit and loan collateral.',
      'Create high-resolution accurate spatial GIS maps for Gram Panchayat local planning and tax collection.'
    ],
    scope: '662,000 inhabited villages across India.',
    targetGroup: 'Rural householders, Gram Panchayats, Commercial and Rural Banks.',
    implementationFramework: 'Tripartite collaboration: Ministry of Panchayati Raj, Survey of India, and State Revenue/Panchayati Raj Departments.',
    expectedImpact: 'Financial empowerment of 180 million rural citizens and accurate village infrastructure planning.',
    documentUrl: '/policies/svamitva_framework_guidelines.pdf',
    status: 'Active',
    isNational: true
  }
];

export const SEED_PROJECTS: ResearchProject[] = [
  {
    id: 'proj_01',
    title: 'AI-Driven Geospatial Modelling of Agricultural Land Loss in Southern Urban Corridors',
    description: 'Multi-institutional study tracking the spatial contagion of peri-urban conversion around Hyderabad, Bengaluru, and Chennai, developing predictive early-warning zoning algorithms.',
    researchArea: 'Geospatial AI & Urban Sprawl',
    state: 'Telangana',
    district: 'Rangareddy',
    startDate: '2024-01-15',
    endDate: '2026-12-31',
    principalResearcher: 'Dr. Ananya Sharma',
    organization: 'IIT Delhi & TRAC Hyderabad',
    objectives: [
      'Train Convolutional Neural Networks on 10-meter Sentinel imagery to detect unauthorized land-clearing.',
      'Model 10-year land-use transitions across 42 peri-urban mandals.',
      'Publish Open Data Decision Support Matrix for State Town & Country Planning departments.'
    ],
    expectedOutcomes: [
      'Automated peri-urban encroachment alert system.',
      'High-resolution open dataset of 40,000 verified parcels.',
      'Policy recommendations for agricultural protection corridors.'
    ],
    status: 'Active',
    budgetLakhs: 48.5,
    members: [
      { id: 'm1', name: 'Dr. Ananya Sharma', role: 'Principal Investigator', organization: 'IIT Delhi' },
      { id: 'm2', name: 'Dr. K. V. Rao', role: 'Co-Investigator', organization: 'TRAC' },
      { id: 'm3', name: 'Siddharth Nair', role: 'GIS Specialist', organization: 'IIT Delhi' },
      { id: 'm4', name: 'Rajesh Verma, IAS', role: 'Government Observer', organization: 'NITI Aayog' }
    ],
    documentsCount: 6,
    datasetsCount: 3,
    progressPercentage: 62,
    tags: ['AI/ML', 'Remote Sensing', 'Telangana', 'Land Loss', 'Zoning']
  },
  {
    id: 'proj_02',
    title: 'Digital Cadastre and Torrens Conclusive Titling Pilot: Evaluation of Bhu-Aadhaar in Maharashtra',
    description: 'Action research examining the socio-legal efficacy of 14-digit ULPIN (Bhu-Aadhaar) integration in resolving multi-generational boundary conflicts in Pune and Ahmednagar.',
    researchArea: 'Land Records & Cadastral Reform',
    state: 'Maharashtra',
    district: 'Pune',
    startDate: '2023-09-01',
    endDate: '2025-08-31',
    principalResearcher: 'Adv. Hemant Gokhale',
    organization: 'Gokhale Institute & Yashada Pune',
    objectives: [
      'Assess title disputes before and after Bhu-Aadhaar issuance across 120 pilot villages.',
      'Formulate standard operating procedures for dispute mediation at Gram Panchayat level.',
      'Analyze institutional revenue court data for resolution acceleration.'
    ],
    expectedOutcomes: [
      'Conclusive titling roadmap whitepaper for Ministry of Rural Development.',
      'Revenue court case clearance metric simulator.'
    ],
    status: 'Active',
    budgetLakhs: 34.0,
    members: [
      { id: 'm10', name: 'Adv. Hemant Gokhale', role: 'Principal Investigator', organization: 'Gokhale Institute' },
      { id: 'm11', name: 'Sunita Deshmukh', role: 'Data Analyst', organization: 'Yashada Pune' },
      { id: 'm12', name: 'Prof. S. Ranganathan', role: 'Reviewer', organization: 'TISS' }
    ],
    documentsCount: 4,
    datasetsCount: 2,
    progressPercentage: 74,
    tags: ['DILRMP', 'ULPIN', 'Bhu-Aadhaar', 'Conclusive Titling']
  },
  {
    id: 'proj_03',
    title: 'Climate Risk Buffers and Sustainable Coastal Land Governance in Eastern Deltaic Ecosystems',
    description: 'Designing community-led coastal agro-forestry zoning to counteract saline ingress, tidal surge erosion, and agrarian distress in Odisha and West Bengal.',
    researchArea: 'Climate Adaptation & Coastal Lands',
    state: 'Odisha',
    district: 'Kendrapara',
    startDate: '2024-04-01',
    endDate: '2027-03-31',
    principalResearcher: 'Dr. Debasis Mohapatra',
    organization: 'Utkal University & State Geospatial Centre',
    objectives: [
      'Map multi-hazard vulnerability indices at 1:5000 scale for 180 coastal villages.',
      'Design mangrove bio-shield zoning guidelines in CRZ-I and CRZ-II buffers.',
      'Evaluate land tenure security under climate displacement risks.'
    ],
    expectedOutcomes: [
      'Coastal Resilience Land Governance Atlas.',
      'Draft amendments for State Coastal Zone Management Authority.'
    ],
    status: 'Active',
    budgetLakhs: 52.0,
    members: [
      { id: 'm20', name: 'Dr. Debasis Mohapatra', role: 'Principal Investigator', organization: 'Utkal University' },
      { id: 'm21', name: 'Priyadarshini Jena', role: 'GIS Specialist', organization: 'Odisha Geospatial' }
    ],
    documentsCount: 3,
    datasetsCount: 2,
    progressPercentage: 35,
    tags: ['Climate Risk', 'Coastal Salinization', 'Odisha', 'Mangrove Bioshield']
  }
];

export const SEED_WORKSPACES: Record<string, CollaborativeWorkspace> = {
  proj_01: {
    id: 'ws_01',
    projectId: 'proj_01',
    projectTitle: 'AI-Driven Geospatial Modelling of Agricultural Land Loss in Southern Urban Corridors',
    tasks: [
      { id: 'tsk_1', title: 'Complete Sentinel-2 atmospheric correction for Rangareddy 2024 tiles', status: 'done', assignedTo: 'Siddharth Nair', priority: 'high', dueDate: '2024-08-20' },
      { id: 'tsk_2', title: 'Harmonize Dharani cadastral shapefiles with Survey of India benchmark points', status: 'in_progress', assignedTo: 'Dr. K. V. Rao', priority: 'critical', dueDate: '2024-09-25' },
      { id: 'tsk_3', title: 'Draft policy brief on peri-urban greenbelt zoning for State Town Planning', status: 'review', assignedTo: 'Dr. Ananya Sharma', priority: 'medium', dueDate: '2024-10-10' },
      { id: 'tsk_4', title: 'Verify groundwater sample measurements against satellite thermal reflectance', status: 'todo', assignedTo: 'Siddharth Nair', priority: 'medium', dueDate: '2024-11-05' }
    ],
    milestones: [
      { id: 'ms_1', title: 'Phase 1: Baseline Satellite Data Acquisition (2015-2024)', targetDate: '2024-03-31', completed: true, description: '10-meter multi-spectral imagery calibrated and cloud-masked.' },
      { id: 'ms_2', title: 'Phase 2: Land-Use Transition Matrix & Machine Learning Training', targetDate: '2024-09-30', completed: true, description: 'Random Forest model achieves 91.4% validation accuracy on land parcel classification.' },
      { id: 'ms_3', title: 'Phase 3: Policy Simulator Integration with State Master Plan', targetDate: '2025-03-31', completed: false, description: 'Interactive policy scenario tool delivered to district collectors.' }
    ],
    comments: [
      { id: 'cm_1', authorName: 'Dr. Ananya Sharma', authorRole: 'Principal Investigator', timestamp: '2024-08-16T11:20:00Z', text: 'The latest batch of Sentinel-2 classifications shows an unexpected acceleration of conversion along the Vijayawada highway corridor. Let us verify against Dharani transaction logs.' },
      { id: 'cm_2', authorName: 'Rajesh Verma, IAS', authorRole: 'Government Observer', timestamp: '2024-08-17T09:45:00Z', text: 'Noted with keen interest. Please ensure the findings are presented at the upcoming State Land Use Committee review meeting in October.' }
    ],
    notes: [
      { id: 'nt_1', title: 'Methodology Note: Ground Truthing Protocol', content: 'Random stratified sampling of 250 parcels in Shamshabad and Maheshwaram mandals. DGPS coordinates verified against village cadastral maps.', updatedAt: '2024-08-10T15:30:00Z', author: 'Siddharth Nair' },
      { id: 'nt_2', title: 'Hypothesis on Speculative Holding', content: 'Over 62% of converted plots remain unconstructed for 4+ years after conversion, confirming speculative capital parking rather than genuine infrastructure demand.', updatedAt: '2024-08-12T14:10:00Z', author: 'Dr. Ananya Sharma' }
    ],
    activityFeed: [
      { id: 'act_1', timestamp: '2024-08-18T16:00:00Z', action: 'Uploaded new dataset: "rangareddy_mandals_parcels_v3.geojson"', user: 'Dr. K. V. Rao' },
      { id: 'act_2', timestamp: '2024-08-17T10:00:00Z', action: 'Marked milestone "Phase 2: Transition Matrix" as completed', user: 'Dr. Ananya Sharma' },
      { id: 'act_3', timestamp: '2024-08-15T14:30:00Z', action: 'Added review comments on Policy Brief draft', user: 'Rajesh Verma, IAS' }
    ]
  }
};

export const SEED_INNOVATION_CHALLENGES: InnovationChallenge[] = [
  {
    id: 'chal_01',
    title: 'AI for Automated Encroachment Detection from High-Resolution Satellite Imagery',
    description: 'Develop an end-to-end computer vision pipeline capable of detecting illegal construction and boundary encroachment on water bodies, public lands, and forest edges with sub-meter precision.',
    problemStatement: 'Manual ground inspection of millions of public land parcels is labor-intensive and delayed. Encroachments on lakes (Cheruvus), tank beds, and reserved forests often go undetected until permanent structures are built. We need an automated alerting system that flags anomalies between cadastral master boundaries and latest satellite feeds.',
    organization: 'Department of Land Resources & ISRO-NRSC',
    deadline: '2024-11-30',
    eligibility: 'Researchers, Academic Teams, Geo-AI Startups, Student Innovators',
    prizeAmount: '₹25,00,000 + Pilot Deployment Grant',
    requiredTechnology: ['Computer Vision', 'PyTorch / TensorFlow', 'Sentinel / Cartosat Imagery', 'GIS GeoJSON'],
    status: 'Open',
    submissionsCount: 28,
    category: 'GIS & AI'
  },
  {
    id: 'chal_02',
    title: 'Blockchain-Enabled Land Title Provenance & Fraud Prevention Challenge',
    description: 'Design a tamper-evident distributed ledger prototype to track transaction history, encumbrances, and court stay orders for agricultural and urban land parcels.',
    problemStatement: 'Double-selling of properties and fraudulent impersonation during registry transactions remain significant problems in revenue courts. The platform must demonstrate cryptographic provenance tracking interoperable with state registry systems.',
    organization: 'Ministry of Electronics & IT (MeitY) & NITI Aayog',
    deadline: '2024-12-15',
    eligibility: 'Institutions, Tech Consortiums, Blockchain Developers',
    prizeAmount: '₹20,00,000',
    requiredTechnology: ['Hyperledger Fabric / Ethereum L2', 'Smart Contracts', 'Bhu-Aadhaar API', 'Zero-Knowledge Proofs'],
    status: 'Open',
    submissionsCount: 19,
    category: 'Land Records & Blockchain'
  },
  {
    id: 'chal_03',
    title: 'Predictive Dispute Analytics & Automated Mediation Decision Support',
    description: 'Build an NLP and predictive analytics tool to analyze revenue court records, predict boundary conflict escalations, and recommend amicable mediation precedents based on local customary laws.',
    problemStatement: 'Over 60% of rural civil litigation stems from minor boundary offsets and inheritance partitions. We seek an intelligent triage engine to help Tehsildars and Lok Adalats resolve cases within 90 days.',
    organization: 'Department of Justice & National Law School of India (NLSIU)',
    deadline: '2025-01-20',
    eligibility: 'Legal-Tech Innovators, Data Scientists, Academic Legal Clinics',
    prizeAmount: '₹15,00,000',
    requiredTechnology: ['NLP / LLM RAG', 'Scikit-learn', 'Predictive Classification', 'Indic Languages (Telugu, Marathi, Hindi)'],
    status: 'Open',
    submissionsCount: 14,
    category: 'Dispute Resolution'
  }
];

export const SEED_GRANTS: GrantOpportunity[] = [
  {
    id: 'grt_01',
    grantName: 'National Land Policy Innovation Research Grant 2026',
    organization: 'Indian Council of Social Science Research (ICSSR) & DoLR',
    fundingAmount: '₹45,00,000 per project',
    eligibility: 'Faculty and researchers at recognized Indian Universities, IITs, IIMs, and accredited research think-tanks.',
    researchArea: 'Evidence-Based Land Governance & Agrarian Transition',
    deadline: '2024-12-31',
    status: 'Accepting Proposals',
    focusSummary: 'Rigorous empirical and geospatial investigations on land tenancy reforms, climate-resilient zoning, and gender equitable land titling across semi-arid and coastal ecosystems.'
  },
  {
    id: 'grt_02',
    grantName: 'Geospatial AI for Cadastral Boundary Delineation Grant',
    organization: 'Department of Science & Technology (DST) - National Geospatial Programme',
    fundingAmount: '₹60,00,000 per project',
    eligibility: 'Interdisciplinary teams combining computer science, remote sensing, and public policy.',
    researchArea: 'Deep Learning for Auto-Cadastre & Drone Orthomosaics',
    deadline: '2025-02-28',
    status: 'Accepting Proposals',
    focusSummary: 'Developing foundation models for automated field bund extraction, edge detection under varied canopy cover, and seamless integration with SVAMITVA village datasets.'
  }
];

export const SEED_DISPUTE_RECORDS: LandDisputeRecord[] = [
  { id: 'disp_1', state: 'Maharashtra', district: 'Pune', category: 'Ownership', totalCases: 14200, pendingCases: 8900, resolvedCases: 5300, avgResolutionTimeMonths: 52, year: 2024, trend: 'increasing' },
  { id: 'disp_2', state: 'Maharashtra', district: 'Nashik', category: 'Boundary', totalCases: 11400, pendingCases: 6800, resolvedCases: 4600, avgResolutionTimeMonths: 44, year: 2024, trend: 'stable' },
  { id: 'disp_3', state: 'Telangana', district: 'Rangareddy', category: 'Encroachment', totalCases: 9800, pendingCases: 6100, resolvedCases: 3700, avgResolutionTimeMonths: 46, year: 2024, trend: 'increasing' },
  { id: 'disp_4', state: 'Telangana', district: 'Medchal-Malkajgiri', category: 'Ownership', totalCases: 8200, pendingCases: 5100, resolvedCases: 3100, avgResolutionTimeMonths: 48, year: 2024, trend: 'increasing' },
  { id: 'disp_5', state: 'Uttar Pradesh', district: 'Varanasi', category: 'Inheritance', totalCases: 18400, pendingCases: 12200, resolvedCases: 6200, avgResolutionTimeMonths: 64, year: 2024, trend: 'increasing' },
  { id: 'disp_6', state: 'Uttar Pradesh', district: 'Lucknow', category: 'Land Acquisition', totalCases: 15100, pendingCases: 9400, resolvedCases: 5700, avgResolutionTimeMonths: 58, year: 2024, trend: 'stable' },
  { id: 'disp_7', state: 'Karnataka', district: 'Bengaluru Rural', category: 'Boundary', totalCases: 8900, pendingCases: 5400, resolvedCases: 3500, avgResolutionTimeMonths: 49, year: 2024, trend: 'increasing' },
  { id: 'disp_8', state: 'Odisha', district: 'Kendrapara', category: 'Tribal Land Rights', totalCases: 4200, pendingCases: 2100, resolvedCases: 2100, avgResolutionTimeMonths: 36, year: 2024, trend: 'decreasing' },
  { id: 'disp_9', state: 'Madhya Pradesh', district: 'Dindori', category: 'Tribal Land Rights', totalCases: 5600, pendingCases: 2400, resolvedCases: 3200, avgResolutionTimeMonths: 28, year: 2024, trend: 'decreasing' },
  { id: 'disp_10', state: 'Gujarat', district: 'Ahmedabad', category: 'Registration', totalCases: 7800, pendingCases: 3900, resolvedCases: 3900, avgResolutionTimeMonths: 32, year: 2024, trend: 'decreasing' }
];

export const SEED_CLIMATE_RISK_DATA: ClimateRiskData[] = [
  { state: 'Telangana', district: 'Rangareddy', floodRiskScore: 42, droughtRiskScore: 78, heatRiskScore: 84, waterStressScore: 88, landDegradationScore: 65, compositeRiskScore: 71, riskCategory: 'High', keyVulnerabilityFactors: ['Rapid urban impervious cover', 'Severe groundwater decline', 'Summer thermal islanding'] },
  { state: 'Telangana', district: 'Mahabubnagar', floodRiskScore: 28, droughtRiskScore: 86, heatRiskScore: 88, waterStressScore: 92, landDegradationScore: 74, compositeRiskScore: 78, riskCategory: 'High', keyVulnerabilityFactors: ['Rainshadow semi-arid zone', 'Borewell exhaustion', 'Soil erosion on red chalka lands'] },
  { state: 'Odisha', district: 'Kendrapara', floodRiskScore: 94, droughtRiskScore: 32, heatRiskScore: 74, waterStressScore: 68, landDegradationScore: 86, compositeRiskScore: 84, riskCategory: 'Very High', keyVulnerabilityFactors: ['Cyclonic storm surge', 'Coastal seawater intrusion', 'Saline delta soil degradation'] },
  { state: 'Maharashtra', district: 'Osmanabad', floodRiskScore: 24, droughtRiskScore: 92, heatRiskScore: 85, waterStressScore: 95, landDegradationScore: 76, compositeRiskScore: 80, riskCategory: 'Very High', keyVulnerabilityFactors: ['Chronic Marathwada drought', 'Sugarcane water diversion', 'Black soil topsoil loss'] },
  { state: 'Punjab', district: 'Sangrur', floodRiskScore: 35, droughtRiskScore: 64, heatRiskScore: 82, waterStressScore: 98, landDegradationScore: 66, compositeRiskScore: 73, riskCategory: 'High', keyVulnerabilityFactors: ['Critical aquifer depletion', 'Paddy straw burning soil damage', 'Chemical fertilizer over-saturation'] },
  { state: 'Karnataka', district: 'Vijayapura', floodRiskScore: 20, droughtRiskScore: 88, heatRiskScore: 86, waterStressScore: 90, landDegradationScore: 72, compositeRiskScore: 76, riskCategory: 'High', keyVulnerabilityFactors: ['Northern dry zone drought', 'Sparse forest cover (<2%)', 'Alkaline soil salinization'] },
  { state: 'Kerala', district: 'Wayanad', floodRiskScore: 88, droughtRiskScore: 25, heatRiskScore: 40, waterStressScore: 32, landDegradationScore: 82, compositeRiskScore: 68, riskCategory: 'Moderate', keyVulnerabilityFactors: ['High slope landslide susceptibility', 'Monsoon flash flooding', 'Plantation soil wash'] },
  { state: 'Rajasthan', district: 'Jodhpur', floodRiskScore: 18, droughtRiskScore: 96, heatRiskScore: 94, waterStressScore: 96, landDegradationScore: 88, compositeRiskScore: 86, riskCategory: 'Very High', keyVulnerabilityFactors: ['Thar desertification front', 'Extreme heatwaves (>48°C)', 'Deep saline water table'] }
];

export const SEED_STATES: StateGeoProfile[] = [
  {
    id: 'st_telangana',
    stateName: 'Telangana',
    centerCoords: [17.8749, 78.1008],
    zoomLevel: 7,
    totalAreaSqKm: 112077,
    districtsCount: 33,
    agriculturalPct: 54.2,
    urbanPct: 18.5,
    forestPct: 24.0,
    waterPct: 2.1,
    industrialPct: 1.2,
    activeResearchCount: 14,
    disputeCaseLoad: 48200,
    climateVulnerabilityLevel: 'High',
    recentHighlights: [
      'Dharani portal computerization covers 6.8 million agricultural parcels.',
      'Peri-urban conversion accelerated along Outer Ring Road & Hyderabad-Warangal corridor.',
      'Groundwater recharge schemes improved water levels in 12 districts.'
    ]
  },
  {
    id: 'st_maharashtra',
    stateName: 'Maharashtra',
    centerCoords: [19.7515, 75.7139],
    zoomLevel: 6,
    totalAreaSqKm: 307713,
    districtsCount: 36,
    agriculturalPct: 56.8,
    urbanPct: 15.2,
    forestPct: 20.1,
    waterPct: 4.8,
    industrialPct: 3.1,
    activeResearchCount: 22,
    disputeCaseLoad: 124000,
    climateVulnerabilityLevel: 'High',
    recentHighlights: [
      'MahaBhulekh digitized 25 million 7/12 land extract records with e-signature.',
      'High pendency of partition disputes before Sub-Divisional Revenue Courts.',
      'Marathwada dryland belts face severe agricultural water stress.'
    ]
  },
  {
    id: 'st_odisha',
    stateName: 'Odisha',
    centerCoords: [20.9517, 85.0985],
    zoomLevel: 7,
    totalAreaSqKm: 155707,
    districtsCount: 30,
    agriculturalPct: 42.1,
    urbanPct: 6.8,
    forestPct: 39.3,
    waterPct: 8.2,
    industrialPct: 3.6,
    activeResearchCount: 11,
    disputeCaseLoad: 31000,
    climateVulnerabilityLevel: 'Very High',
    recentHighlights: [
      'Coastal deltaic farming impacted by cyclone-induced saline inundation.',
      'Over 400,000 Individual Forest Rights (IFR) titles distributed under FRA 2006.',
      'Industrial mining corridor land acquisition monitored via satellite GIS.'
    ]
  },
  {
    id: 'st_uttar_pradesh',
    stateName: 'Uttar Pradesh',
    centerCoords: [26.8467, 80.9462],
    zoomLevel: 6,
    totalAreaSqKm: 240928,
    districtsCount: 75,
    agriculturalPct: 68.4,
    urbanPct: 12.8,
    forestPct: 7.2,
    waterPct: 9.1,
    industrialPct: 2.5,
    activeResearchCount: 18,
    disputeCaseLoad: 210000,
    climateVulnerabilityLevel: 'Moderate',
    recentHighlights: [
      'Bhulekh UP portal integration with computerized Revenue Court Management (RCCMS).',
      'High volume of inheritance and boundary mutation appeals.',
      'Yamuna expressway corridor drives agricultural-to-industrial transition.'
    ]
  },
  {
    id: 'st_karnataka',
    stateName: 'Karnataka',
    centerCoords: [15.3173, 75.7139],
    zoomLevel: 7,
    totalAreaSqKm: 191791,
    districtsCount: 31,
    agriculturalPct: 55.4,
    urbanPct: 14.1,
    forestPct: 21.6,
    waterPct: 5.8,
    industrialPct: 3.1,
    activeResearchCount: 16,
    disputeCaseLoad: 68000,
    climateVulnerabilityLevel: 'High',
    recentHighlights: [
      'Bhoomi 3.0 cloud architecture with biometric Aadhaar e-KYC integration.',
      'SVAMITVA drone survey completed in over 9,000 rural villages.',
      'Northern dry zone faces persistent drought and water stress.'
    ]
  }
];

export const SEED_AUDIT_LOGS: AuditLogEntry[] = [
  { id: 'aud_1', timestamp: '2024-08-18T10:15:22Z', userEmail: 'ananya.sharma@iitd.ac.in', userName: 'Dr. Ananya Sharma', userRole: 'RESEARCHER', action: 'LOGIN', resourceName: 'Portal Auth', ipAddress: '14.139.45.2', status: 'SUCCESS' },
  { id: 'aud_2', timestamp: '2024-08-18T10:32:05Z', userEmail: 'ananya.sharma@iitd.ac.in', userName: 'Dr. Ananya Sharma', userRole: 'RESEARCHER', action: 'POLICY_SIMULATION', resourceName: 'Simulation: Telangana Agri-Industrial Conversion 10%', ipAddress: '14.139.45.2', status: 'SUCCESS' },
  { id: 'aud_3', timestamp: '2024-08-18T11:05:40Z', userEmail: 'rajesh.verma@gov.in', userName: 'Rajesh Verma, IAS', userRole: 'POLICYMAKER', action: 'DOWNLOAD_DATA', resourceName: 'Dataset: Telangana Land Use Land Cover (LULC) Decadal', ipAddress: '164.100.24.11', status: 'SUCCESS' },
  { id: 'aud_4', timestamp: '2024-08-18T11:42:19Z', userEmail: 'admin@bhoomi.gov.in', userName: 'Shri Amitabh Kant', userRole: 'ADMIN', action: 'APPROVE_DOC', resourceName: 'Research Paper: Urbanization Pressures in Peri-Urban Telangana', ipAddress: '164.100.5.88', status: 'SUCCESS' },
  { id: 'aud_5', timestamp: '2024-08-18T12:10:00Z', userEmail: 'kavita.patel@public.in', userName: 'Kavita Patel', userRole: 'PUBLIC_USER', action: 'LOGIN', resourceName: 'Public Portal', ipAddress: '49.36.112.50', status: 'SUCCESS' }
];

export const SEED_NOTIFICATIONS: NotificationItem[] = [
  { id: 'notif_1', title: 'New Research Paper Published', message: 'Dr. Ananya Sharma published "Urbanization Pressures and Agricultural Land Dynamics in Peri-Urban Telangana".', timestamp: '2 hours ago', type: 'research', read: false },
  { id: 'notif_2', title: 'National Land Policy Innovation Grant 2026', message: 'ICSSR & DoLR announced a new research grant of ₹45 Lakhs. Deadline is Dec 31, 2024.', timestamp: '5 hours ago', type: 'grant', read: false },
  { id: 'notif_3', title: 'Innovation Challenge Launched', message: 'MeitY & NITI Aayog launched "Blockchain-Enabled Land Title Provenance Challenge".', timestamp: '1 day ago', type: 'challenge', read: true },
  { id: 'notif_4', title: 'Dataset Update: LULC Decadal Atlas', message: 'Telangana State Remote Sensing Centre released updated 2024 satellite land classifications.', timestamp: '2 days ago', type: 'dataset', read: true }
];
