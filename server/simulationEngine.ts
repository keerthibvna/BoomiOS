import { PolicySimulationInput, PolicySimulationResult, SimulationScenarioOutput } from '../src/types.ts';

export function runPolicySimulation(input: PolicySimulationInput): PolicySimulationResult {
  const baseAreaHa = 100000; // Reference 100,000 Ha baseline for state/district parcel
  const convPct = Math.max(0.5, Math.min(50, input.conversionPercentage));
  const horizon = input.timeHorizonYears || 5;

  // Multipliers based on development type
  let jobDensityMultiplier = 45; // jobs per converted Ha
  let waterDemandMultiplier = 0.08; // MLD per 100 Ha
  let capexCroresPerHa = 0.45; // Crores per Ha
  let envRiskBase = 35; // base risk score

  switch (input.developmentType) {
    case 'High-Density Industrial':
      jobDensityMultiplier = 75;
      waterDemandMultiplier = 0.16;
      capexCroresPerHa = 0.85;
      envRiskBase = 58;
      break;
    case 'Agri-Tech Corridor':
      jobDensityMultiplier = 35;
      waterDemandMultiplier = 0.05;
      capexCroresPerHa = 0.35;
      envRiskBase = 22;
      break;
    case 'Renewable Energy Zone':
      jobDensityMultiplier = 12;
      waterDemandMultiplier = 0.01;
      capexCroresPerHa = 0.60;
      envRiskBase = 18;
      break;
    case 'Smart Township':
      jobDensityMultiplier = 50;
      waterDemandMultiplier = 0.12;
      capexCroresPerHa = 0.70;
      envRiskBase = 45;
      break;
    default:
      // Mixed Urban Expansion
      jobDensityMultiplier = 40;
      waterDemandMultiplier = 0.09;
      capexCroresPerHa = 0.50;
      envRiskBase = 38;
      break;
  }

  // Mitigation offsets
  let mitigationDiscount = 1.0;
  if (input.mitigationFactor === 'High Afforestation Offset') {
    mitigationDiscount = 0.72;
  } else if (input.mitigationFactor === 'Strict Water Recycling') {
    mitigationDiscount = 0.80;
  }

  // Scenario A: No policy change (Baseline)
  const scenarioA: SimulationScenarioOutput = {
    scenarioName: 'Scenario A: Baseline (No Policy Change)',
    description: 'Current status quo maintained. Natural creeping conversion of 0.8% annually without master planned infrastructure.',
    agriculturalAreaLostHa: Math.round(baseAreaHa * 0.008 * horizon),
    urbanAreaGainedHa: Math.round(baseAreaHa * 0.007 * horizon),
    estimatedJobsCreated: Math.round(baseAreaHa * 0.008 * horizon * 12),
    farmerDisplacementEst: Math.round(baseAreaHa * 0.008 * horizon * 0.4),
    infrastructureInvestmentCrores: Math.round(baseAreaHa * 0.008 * horizon * 0.08),
    dailyWaterDemandMld: +(baseAreaHa * 0.008 * horizon * 0.02).toFixed(1),
    environmentalRiskScore: 32,
    climateVulnerabilityShift: 2.5,
    foodSecurityImpactIndex: -0.8,
    economicMultiplier: 1.05
  };

  // Scenario B: Moderate Implementation (60% target rate)
  const moderateHa = Math.round(baseAreaHa * (convPct / 100) * 0.60);
  const scenarioB: SimulationScenarioOutput = {
    scenarioName: 'Scenario B: Moderate Phased Implementation',
    description: 'Controlled zoning with 60% execution quota, phased land acquisition, and partial mitigation buffers.',
    agriculturalAreaLostHa: moderateHa,
    urbanAreaGainedHa: Math.round(moderateHa * 0.92),
    estimatedJobsCreated: Math.round(moderateHa * jobDensityMultiplier * 0.85),
    farmerDisplacementEst: Math.round(moderateHa * 1.4),
    infrastructureInvestmentCrores: Math.round(moderateHa * capexCroresPerHa * 0.85),
    dailyWaterDemandMld: +((moderateHa / 100) * waterDemandMultiplier * 0.85).toFixed(1),
    environmentalRiskScore: Math.round(envRiskBase * mitigationDiscount * 1.1),
    climateVulnerabilityShift: +(7.5 * mitigationDiscount).toFixed(1),
    foodSecurityImpactIndex: -((moderateHa / baseAreaHa) * 25).toFixed(1) as unknown as number,
    economicMultiplier: 2.15
  };

  // Scenario C: High / Accelerated Implementation (100% target rate)
  const highHa = Math.round(baseAreaHa * (convPct / 100));
  const scenarioC: SimulationScenarioOutput = {
    scenarioName: 'Scenario C: Accelerated Full Implementation',
    description: 'Full statutory realization of proposed policy targets within target horizon with maximum capital outlay.',
    agriculturalAreaLostHa: highHa,
    urbanAreaGainedHa: Math.round(highHa * 0.98),
    estimatedJobsCreated: Math.round(highHa * jobDensityMultiplier),
    farmerDisplacementEst: Math.round(highHa * 2.2),
    infrastructureInvestmentCrores: Math.round(highHa * capexCroresPerHa),
    dailyWaterDemandMld: +((highHa / 100) * waterDemandMultiplier).toFixed(1),
    environmentalRiskScore: Math.min(95, Math.round(envRiskBase * mitigationDiscount * 1.45)),
    climateVulnerabilityShift: +(16.8 * mitigationDiscount).toFixed(1),
    foodSecurityImpactIndex: -((highHa / baseAreaHa) * 45).toFixed(1) as unknown as number,
    economicMultiplier: 3.40
  };

  const riskHighlights: string[] = [
    `Conversion of ${convPct}% (${highHa.toLocaleString()} Ha) in ${input.state} will displace an estimated ${scenarioC.farmerDisplacementEst.toLocaleString()} agrarian dependents and tenant farmers.`,
    `Water requirement will surge by ${scenarioC.dailyWaterDemandMld} MLD, potentially depleting regional groundwater unless treated tertiary industrial recycling is mandated.`,
    `Economic upside: Up to ${scenarioC.estimatedJobsCreated.toLocaleString()} manufacturing/service jobs and ₹${scenarioC.infrastructureInvestmentCrores.toLocaleString()} Crores of capital formation.`,
    `Food security offset: Estimated reduction in staple grain production of approx. ${Math.round(highHa * 3.4).toLocaleString()} metric tonnes per crop cycle.`
  ];

  const policyRecommendation = `Recommendation: Adopt a calibrated hybrid approach between Scenario B and C. Pre-reserve 20% of converted area for ecological buffer corridors, mandate ${input.mitigationFactor}, and mandate annuity rehabilitation bonds for displaced landowners in accordance with RFCTLARR 2013.`;

  return {
    id: `sim_${Date.now()}`,
    timestamp: new Date().toISOString(),
    input,
    scenarios: {
      scenarioA,
      scenarioB,
      scenarioC
    },
    policyRecommendation,
    riskHighlights,
    disclaimer: 'Model-based scenario estimates for decision support. Not an official government prediction.'
  };
}
