const featureModules = [
  { id: 1, name: 'Live congestion index', group: 'Traffic', status: 'Active' },
  { id: 2, name: 'Corridor speed monitor', group: 'Traffic', status: 'Active' },
  { id: 3, name: 'Queue length estimator', group: 'Traffic', status: 'Active' },
  { id: 4, name: 'Signal phase tracking', group: 'Signals', status: 'Active' },
  { id: 5, name: 'Adaptive signal timing', group: 'Signals', status: 'Ready' },
  { id: 6, name: 'Signal failure alerts', group: 'Signals', status: 'Active' },
  { id: 7, name: 'Incident reporting', group: 'Safety', status: 'Active' },
  { id: 8, name: 'Incident verification queue', group: 'Safety', status: 'Ready' },
  { id: 9, name: 'Emergency vehicle priority', group: 'Safety', status: 'Active' },
  { id: 10, name: 'School-zone safety mode', group: 'Safety', status: 'Ready' },
  { id: 11, name: 'Weather impact scoring', group: 'Environment', status: 'Active' },
  { id: 12, name: 'Flood-prone road alerts', group: 'Environment', status: 'Ready' },
  { id: 13, name: 'Air quality mobility note', group: 'Environment', status: 'Ready' },
  { id: 14, name: 'Bus route status', group: 'Transit', status: 'Active' },
  { id: 15, name: 'Metro connection status', group: 'Transit', status: 'Ready' },
  { id: 16, name: 'Transit delay prediction', group: 'Transit', status: 'Active' },
  { id: 17, name: 'Crowding level monitor', group: 'Transit', status: 'Active' },
  { id: 18, name: 'Parking availability', group: 'Parking', status: 'Active' },
  { id: 19, name: 'Parking demand forecast', group: 'Parking', status: 'Ready' },
  { id: 20, name: 'Ride-share pickup zones', group: 'Mobility', status: 'Ready' },
  { id: 21, name: 'CNG stand availability', group: 'Mobility', status: 'Ready' },
  { id: 22, name: 'Pedestrian crossing load', group: 'Mobility', status: 'Active' },
  { id: 23, name: 'Road work scheduling', group: 'Planning', status: 'Ready' },
  { id: 24, name: 'Event traffic plan', group: 'Planning', status: 'Ready' },
  { id: 25, name: 'Route recommendation', group: 'Navigation', status: 'Active' },
  { id: 26, name: 'ETA comparison', group: 'Navigation', status: 'Active' },
  { id: 27, name: 'Hotspot heat ranking', group: 'Analytics', status: 'Active' },
  { id: 28, name: 'Authority dispatch board', group: 'Operations', status: 'Active' },
  { id: 29, name: 'Public alert broadcast', group: 'Operations', status: 'Active' },
  { id: 30, name: 'Audit-ready activity log', group: 'Operations', status: 'Ready' }
];

const corridors = [
  {
    id: 'mirpur-farmgate',
    name: 'Mirpur 10 to Farmgate',
    area: 'Mirpur Road',
    speedKph: 17,
    normalSpeedKph: 34,
    congestion: 82,
    travelTimeMin: 42,
    delayMin: 21,
    queueMeters: 950,
    signal: 'Adaptive hold',
    cause: 'Bus stoppage and office peak',
    recommendation: 'Use Rokeya Sarani for partial bypass',
    trend: 'Rising'
  },
  {
    id: 'gulshan-banani',
    name: 'Gulshan 1 to Banani',
    area: 'Kemal Ataturk Avenue',
    speedKph: 24,
    normalSpeedKph: 38,
    congestion: 64,
    travelTimeMin: 26,
    delayMin: 10,
    queueMeters: 520,
    signal: 'Balanced',
    cause: 'High ride-share pickup demand',
    recommendation: 'Keep through traffic on main lane',
    trend: 'Stable'
  },
  {
    id: 'shahbagh-motijheel',
    name: 'Shahbagh to Motijheel',
    area: 'Kazi Nazrul Islam Avenue',
    speedKph: 13,
    normalSpeedKph: 31,
    congestion: 91,
    travelTimeMin: 51,
    delayMin: 29,
    queueMeters: 1250,
    signal: 'Manual support',
    cause: 'Intersection spillback near Paltan',
    recommendation: 'Dispatch traffic police at Kakrail',
    trend: 'Rising'
  },
  {
    id: 'uttara-airport',
    name: 'Uttara to Airport',
    area: 'Airport Road',
    speedKph: 32,
    normalSpeedKph: 44,
    congestion: 45,
    travelTimeMin: 22,
    delayMin: 5,
    queueMeters: 260,
    signal: 'Normal',
    cause: 'Moderate airport approach load',
    recommendation: 'No diversion needed',
    trend: 'Falling'
  },
  {
    id: 'jatrabari-gulistan',
    name: 'Jatrabari to Gulistan',
    area: 'Mayor Hanif Flyover approach',
    speedKph: 19,
    normalSpeedKph: 40,
    congestion: 74,
    travelTimeMin: 37,
    delayMin: 16,
    queueMeters: 780,
    signal: 'Adaptive split',
    cause: 'Mixed bus and goods vehicle flow',
    recommendation: 'Prioritize flyover merge control',
    trend: 'Stable'
  }
];

const signalPhases = [
  { intersection: 'Shahbagh', phase: 'North-South green', secondsLeft: 38, load: 88, mode: 'Manual support' },
  { intersection: 'Farmgate', phase: 'East-West green', secondsLeft: 24, load: 81, mode: 'Adaptive' },
  { intersection: 'Banani 11', phase: 'Pedestrian crossing', secondsLeft: 16, load: 57, mode: 'Balanced' },
  { intersection: 'Jatrabari', phase: 'Flyover merge', secondsLeft: 31, load: 76, mode: 'Adaptive' },
  { intersection: 'Airport', phase: 'Through traffic', secondsLeft: 44, load: 49, mode: 'Normal' },
  { intersection: 'Paltan', phase: 'North-South green', secondsLeft: 19, load: 92, mode: 'Manual support' }
];

const cameras = [
  { id: 'cam-01', location: 'Farmgate footbridge', status: 'Online', confidence: 94, finding: 'Heavy bus dwell time' },
  { id: 'cam-02', location: 'Shahbagh intersection', status: 'Online', confidence: 91, finding: 'Queue spillback detected' },
  { id: 'cam-03', location: 'Banani 11', status: 'Online', confidence: 87, finding: 'Ride-share pickup crowding' },
  { id: 'cam-04', location: 'Jatrabari approach', status: 'Degraded', confidence: 68, finding: 'Rain blur, manual review suggested' }
];

const transitStatus = [
  { route: 'Mirpur Link Bus', mode: 'Bus', headwayMin: 9, crowding: 82, delayMin: 11 },
  { route: 'Airport Express', mode: 'Bus', headwayMin: 13, crowding: 61, delayMin: 4 },
  { route: 'MRT Connector', mode: 'Metro feeder', headwayMin: 7, crowding: 74, delayMin: 6 },
  { route: 'Gulistan Circular', mode: 'Bus', headwayMin: 12, crowding: 89, delayMin: 14 }
];

const dispatchQueue = [
  { priority: 'Critical', task: 'Clear spillback at Paltan', owner: 'Authority Unit A', etaMin: 8 },
  { priority: 'High', task: 'Adjust Farmgate signal cycle', owner: 'Signal Desk', etaMin: 3 },
  { priority: 'High', task: 'Move bus stop enforcement to Shahbagh', owner: 'Field Unit C', etaMin: 12 },
  { priority: 'Medium', task: 'Review Banani pickup zone', owner: 'Mobility Desk', etaMin: 20 }
];

const routeOptions = [
  { name: 'Fastest', path: 'Rokeya Sarani > Bijoy Sarani > Tejgaon', etaMin: 34, savedMin: 13, reliability: 78 },
  { name: 'Least congested', path: 'Begum Rokeya Ave > Agargaon > Farmgate', etaMin: 39, savedMin: 8, reliability: 84 },
  { name: 'Transit mix', path: 'Bus to MRT feeder > Metro connector', etaMin: 43, savedMin: 6, reliability: 88 }
];

const weatherImpact = {
  condition: 'Humid with light rain risk',
  visibility: 'Good',
  roadRisk: 'Moderate',
  floodRisk: 'Low',
  impactScore: 36
};

const buildLiveTrafficState = () => {
  const now = new Date();
  const pulse = now.getMinutes() % 6;
  const adjustedCorridors = corridors.map((corridor, index) => {
    const offset = ((pulse + index) % 3) - 1;
    const congestion = Math.max(18, Math.min(98, corridor.congestion + offset * 3));
    const speedKph = Math.max(8, corridor.speedKph - offset);
    return {
      ...corridor,
      congestion,
      speedKph,
      delayMin: Math.max(0, corridor.delayMin + offset),
      travelTimeMin: Math.max(5, corridor.travelTimeMin + offset)
    };
  });

  const averageCongestion = Math.round(
    adjustedCorridors.reduce((sum, item) => sum + item.congestion, 0) / adjustedCorridors.length
  );
  const averageSpeed = Math.round(
    adjustedCorridors.reduce((sum, item) => sum + item.speedKph, 0) / adjustedCorridors.length
  );
  const totalQueueMeters = adjustedCorridors.reduce((sum, item) => sum + item.queueMeters, 0);

  return {
    generatedAt: now.toISOString(),
    city: 'Dhaka',
    networkStatus: averageCongestion > 75 ? 'Severe congestion' : 'Moderate congestion',
    averageCongestion,
    averageSpeed,
    totalQueueMeters,
    corridors: adjustedCorridors,
    signalPhases,
    cameras,
    transitStatus,
    dispatchQueue,
    routeOptions,
    weatherImpact,
    featureModules
  };
};

module.exports = {
  featureModules,
  buildLiveTrafficState
};
