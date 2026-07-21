export const locations = {
  Dhaka: { temp: 31, feels: 36, condition: 'Partly cloudy', humidity: 72, wind: 11, rain: 38, aqi: 118, traffic: 'Heavy', accent: 'warning' },
  Chattogram: { temp: 29, feels: 34, condition: 'Light rain', humidity: 81, wind: 18, rain: 68, aqi: 72, traffic: 'Moderate', accent: 'rain' },
  Sylhet: { temp: 28, feels: 33, condition: 'Rain showers', humidity: 86, wind: 9, rain: 76, aqi: 54, traffic: 'Light', accent: 'rain' },
  Rajshahi: { temp: 33, feels: 38, condition: 'Mostly sunny', humidity: 61, wind: 8, rain: 12, aqi: 91, traffic: 'Moderate', accent: 'sun' },
  Khulna: { temp: 30, feels: 35, condition: 'Cloudy', humidity: 79, wind: 15, rain: 46, aqi: 64, traffic: 'Light', accent: 'cloud' },
  Barishal: { temp: 29, feels: 34, condition: 'Thunderstorms', humidity: 84, wind: 19, rain: 82, aqi: 48, traffic: 'Light', accent: 'storm' },
  Rangpur: { temp: 28, feels: 31, condition: 'Overcast', humidity: 75, wind: 7, rain: 51, aqi: 59, traffic: 'Moderate', accent: 'cloud' },
  Mymensingh: { temp: 30, feels: 35, condition: 'Partly cloudy', humidity: 74, wind: 10, rain: 34, aqi: 78, traffic: 'Moderate', accent: 'cloud' }
};

export const liveAlerts = [
  { id: 1, type: 'Weather', level: 'warning', title: 'Heavy rainfall watch in southern districts', detail: 'Localized waterlogging is possible in Barishal, Patuakhali and Bhola through tonight.', time: '8 min ago', area: '3 districts' },
  { id: 2, type: 'Traffic', level: 'critical', title: 'Very slow traffic on Dhaka–Mymensingh corridor', detail: 'Average speed near Tongi is 12 km/h. Allow 35–45 minutes of additional travel time.', time: '12 min ago', area: 'Tongi' },
  { id: 3, type: 'Transport', level: 'info', title: 'Ferry services operating with minor delays', detail: 'Visibility is reduced at Paturia–Daulatdia; crossings are taking approximately 20 minutes longer.', time: '24 min ago', area: 'Padma' },
  { id: 4, type: 'Utilities', level: 'notice', title: 'Scheduled maintenance in parts of Sylhet', detail: 'Electricity service may be interrupted from 2:00–4:00 PM in two service zones.', time: '41 min ago', area: 'Sylhet' }
];

export const divisionPulse = [
  { name: 'Dhaka', weather: '31°', traffic: 'Heavy', status: 'warning', note: '2 active alerts' },
  { name: 'Chattogram', weather: '29°', traffic: 'Moderate', status: 'rain', note: 'Light rain' },
  { name: 'Sylhet', weather: '28°', traffic: 'Light', status: 'rain', note: 'River watch' },
  { name: 'Rajshahi', weather: '33°', traffic: 'Moderate', status: 'sun', note: 'Heat advisory' },
  { name: 'Khulna', weather: '30°', traffic: 'Light', status: 'cloud', note: 'Normal' },
  { name: 'Barishal', weather: '29°', traffic: 'Light', status: 'storm', note: 'Rain alert' },
  { name: 'Rangpur', weather: '28°', traffic: 'Moderate', status: 'cloud', note: 'Normal' },
  { name: 'Mymensingh', weather: '30°', traffic: 'Moderate', status: 'cloud', note: 'Normal' }
];

export const transportStatus = [
  { mode: 'Metro Rail', route: 'MRT Line 6', state: 'Operating normally', meta: 'Next train 4 min', tone: 'good' },
  { mode: 'Bangladesh Railway', route: 'National network', state: '7 minor delays', meta: '92% on time', tone: 'warning' },
  { mode: 'Ferry Service', route: 'Major crossings', state: 'Minor delays', meta: 'Paturia +20 min', tone: 'warning' },
  { mode: 'Airports', route: '3 international hubs', state: 'Operating normally', meta: '4 delayed flights', tone: 'good' }
];

export const nationalMetrics = [
  { label: 'Road corridors', value: '286', helper: 'actively monitored', icon: 'road' },
  { label: 'Active public alerts', value: '12', helper: '3 require attention', icon: 'alert' },
  { label: 'Transport on time', value: '92%', helper: 'across major services', icon: 'train' },
  { label: 'National air quality', value: 'Moderate', helper: 'AQI average 84', icon: 'air' }
];
