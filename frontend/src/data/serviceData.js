import {
  Activity, BellRing, Bike, BusFront, CloudRain, Construction, Droplets,
  Fuel, HeartPulse, Hospital, Landmark, MapPinned, ParkingCircle,
  ShieldAlert, TrainFront, UtilityPole, Waves, Wind, Zap
} from 'lucide-react';

export const telemetryNodes = [
  { id: 'CAM-1042', name: 'Shahbagh vision sensor', type: 'Camera', area: 'Dhaka', status: 'Online', latency: 42, reading: '91% load', updated: '4 sec ago' },
  { id: 'SIG-0318', name: 'Farmgate signal controller', type: 'Signal', area: 'Dhaka', status: 'Online', latency: 31, reading: 'Adaptive · 24s', updated: '8 sec ago' },
  { id: 'WTR-0084', name: 'Surma river gauge', type: 'Water', area: 'Sylhet', status: 'Warning', latency: 128, reading: '10.8 m', updated: '1 min ago' },
  { id: 'AQI-0201', name: 'Agrabad air station', type: 'Air quality', area: 'Chattogram', status: 'Online', latency: 77, reading: 'AQI 72', updated: '2 min ago' },
  { id: 'PWR-0119', name: 'Khulna grid monitor', type: 'Utility', area: 'Khulna', status: 'Maintenance', latency: 0, reading: 'Scheduled', updated: '14 min ago' },
  { id: 'CAM-0544', name: 'Tongi corridor camera', type: 'Camera', area: 'Gazipur', status: 'Degraded', latency: 312, reading: 'Low visibility', updated: '38 sec ago' }
];

export const telemetryEvents = [
  { level: 'critical', title: 'Queue threshold exceeded', source: 'CAM-1042 · Shahbagh', time: '1 min ago' },
  { level: 'warning', title: 'River level rising 6 cm/hour', source: 'WTR-0084 · Surma', time: '6 min ago' },
  { level: 'info', title: 'Signal plan synchronized', source: 'SIG-0318 · Farmgate', time: '11 min ago' },
  { level: 'notice', title: 'Planned maintenance started', source: 'PWR-0119 · Khulna', time: '14 min ago' }
];

export const serviceCategories = [
  { id: 'Mobility', icon: BusFront, description: 'Move confidently across roads and public transport.' },
  { id: 'Environment', icon: CloudRain, description: 'Weather, water, air and environmental risk.' },
  { id: 'Utilities', icon: Zap, description: 'Power, water and essential utility status.' },
  { id: 'Safety', icon: ShieldAlert, description: 'Emergency, health and incident response.' },
  { id: 'Public services', icon: Landmark, description: 'Verified government and civic information.' }
];

export const smartServices = [
  { id: 'metro', name: 'Metro & rail status', category: 'Mobility', icon: TrainFront, status: 'Live', value: '92% on time', description: 'Service condition, station notices and national rail delays.', route: '/routing' },
  { id: 'bus', name: 'Bus network', category: 'Mobility', icon: BusFront, status: 'Live', value: '14 route notices', description: 'Headways, crowding and route interruption notices.', route: '/routing' },
  { id: 'parking', name: 'Parking finder', category: 'Mobility', icon: ParkingCircle, status: 'Beta', value: '1,240 spaces', description: 'Availability near major commercial and transit areas.', route: '/live-map' },
  { id: 'bike', name: 'Walking & cycling', category: 'Mobility', icon: Bike, status: 'Guide', value: 'Safe route mode', description: 'Lower-traffic paths and pedestrian crossing guidance.', route: '/routing' },
  { id: 'weather', name: 'Weather intelligence', category: 'Environment', icon: CloudRain, status: 'Live', value: '8 divisions', description: 'Current conditions, rainfall probability and warnings.', route: '/' },
  { id: 'air', name: 'Air quality', category: 'Environment', icon: Wind, status: 'Live', value: 'National AQI 84', description: 'Local health guidance and exposure conditions.', route: '/' },
  { id: 'rivers', name: 'Rivers & flood watch', category: 'Environment', icon: Waves, status: 'Live', value: '3 warnings', description: 'Water levels and flood risk from monitored stations.', route: '/telemetry' },
  { id: 'water', name: 'Water services', category: 'Utilities', icon: Droplets, status: 'Notices', value: '4 updates', description: 'Supply interruptions and maintenance schedules.', route: '/dashboard' },
  { id: 'power', name: 'Power status', category: 'Utilities', icon: UtilityPole, status: 'Live', value: '8 notices', description: 'Regional grid health and scheduled interruptions.', route: '/telemetry' },
  { id: 'fuel', name: 'Fuel & charging', category: 'Utilities', icon: Fuel, status: 'Directory', value: '320 stations', description: 'Fuel stations, EV charging and service availability.', route: '/live-map' },
  { id: 'emergency', name: 'Emergency response', category: 'Safety', icon: BellRing, status: '24/7', value: 'Call 999', description: 'Fast access to police, fire and ambulance support.', route: '/report-incident' },
  { id: 'health', name: 'Health services', category: 'Safety', icon: HeartPulse, status: 'Directory', value: 'Call 16263', description: 'Government health advice and local care services.', route: '/smart-hub' },
  { id: 'hospital', name: 'Nearby hospitals', category: 'Safety', icon: Hospital, status: 'Directory', value: 'Verified locations', description: 'Find emergency departments and public hospitals.', route: '/live-map' },
  { id: 'roadwork', name: 'Road works', category: 'Public services', icon: Construction, status: 'Live', value: '23 active', description: 'Planned works, closures and expected completion.', route: '/traffic' },
  { id: 'offices', name: 'Public office finder', category: 'Public services', icon: MapPinned, status: 'Directory', value: '64 services', description: 'Find verified offices, contacts and operating hours.', route: '/live-map' },
  { id: 'data', name: 'Open data status', category: 'Public services', icon: Activity, status: 'System', value: '98.7% healthy', description: 'Source coverage, update frequency and transparency.', route: '/telemetry' }
];

export const routePlaces = ['Mirpur 10', 'Farmgate', 'Shahbagh', 'Motijheel', 'Gulshan 1', 'Banani', 'Uttara', 'Airport', 'Jatrabari', 'Chattogram Station'];
