import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowDownUp, ArrowRight, Bike, BusFront, CarFront, Check, ChevronRight,
  Clock3, CloudRain, Footprints, Fuel, LocateFixed, Map, Navigation,
  Route as RouteIcon, ShieldCheck, SlidersHorizontal, Sparkles, TrafficCone
} from 'lucide-react';
import { routePlaces } from '../data/serviceData';

const modes = [
  { id: 'car', label: 'Drive', icon: CarFront },
  { id: 'transit', label: 'Transit', icon: BusFront },
  { id: 'cycle', label: 'Cycle', icon: Bike },
  { id: 'walk', label: 'Walk', icon: Footprints }
];

const routeTemplates = {
  car: [
    { id: 'smart', name: 'Smart route', eta: 34, distance: 11.8, delay: 7, reliability: 88, path: 'Rokeya Sarani · Bijoy Sarani · Tejgaon', tag: 'Recommended', tone: 'good' },
    { id: 'fast', name: 'Fastest now', eta: 31, distance: 13.2, delay: 12, reliability: 74, path: 'Mirpur Road · Manik Mia Avenue · Farmgate', tag: '3 min faster', tone: 'warning' },
    { id: 'calm', name: 'Lowest congestion', eta: 39, distance: 14.1, delay: 3, reliability: 93, path: 'Agargaon · Old Airport Road · Tejgaon', tag: 'Most reliable', tone: 'info' }
  ],
  transit: [
    { id: 'metro', name: 'Metro + walk', eta: 28, distance: 9.6, delay: 2, reliability: 95, path: 'Walk to MRT · Line 6 · 7 min walk', tag: 'Recommended', tone: 'good' },
    { id: 'bus', name: 'Direct bus', eta: 46, distance: 11.2, delay: 11, reliability: 68, path: 'Mirpur Link · Farmgate stop', tag: 'Lowest fare', tone: 'warning' },
    { id: 'mixed', name: 'Bus + metro', eta: 37, distance: 10.4, delay: 5, reliability: 84, path: 'Feeder bus · MRT Line 6', tag: 'Less walking', tone: 'info' }
  ],
  cycle: [
    { id: 'safe', name: 'Safer streets', eta: 52, distance: 10.1, delay: 0, reliability: 91, path: 'Local streets · Agargaon · Tejgaon', tag: 'Recommended', tone: 'good' },
    { id: 'direct', name: 'Most direct', eta: 43, distance: 8.9, delay: 4, reliability: 70, path: 'Mirpur Road · Farmgate', tag: '9 min faster', tone: 'warning' }
  ],
  walk: [
    { id: 'walkable', name: 'Most walkable', eta: 138, distance: 8.7, delay: 0, reliability: 96, path: 'Local roads · signed crossings · Farmgate', tag: 'Recommended', tone: 'good' },
    { id: 'short', name: 'Shortest', eta: 126, distance: 8.1, delay: 0, reliability: 79, path: 'Mirpur Road pedestrian route', tag: '12 min faster', tone: 'info' }
  ]
};

const Routing = () => {
  const [origin, setOrigin] = useState('Mirpur 10');
  const [destination, setDestination] = useState('Farmgate');
  const [mode, setMode] = useState('car');
  const [selectedRoute, setSelectedRoute] = useState('smart');
  const [avoidFlooding, setAvoidFlooding] = useState(true);
  const [avoidTolls, setAvoidTolls] = useState(false);

  const routes = useMemo(() => routeTemplates[mode].map((route, index) => ({ ...route, eta: route.eta + (origin === destination ? 0 : Math.abs(routePlaces.indexOf(origin) - routePlaces.indexOf(destination)) * 2 + index) })), [mode, origin, destination]);
  const selected = routes.find((route) => route.id === selectedRoute) || routes[0];

  const chooseMode = (nextMode) => { setMode(nextMode); setSelectedRoute(routeTemplates[nextMode][0].id); };
  const swap = () => { setOrigin(destination); setDestination(origin); };

  return (
    <div className="service-page routing-page">
      <header className="service-masthead">
        <div><div className="service-breadcrumb"><span>Live services</span><ChevronRight size={13} /><b>Routing</b></div><div className="service-title-row"><div className="service-title-icon routing"><RouteIcon /></div><div><h1>Smart routing</h1><p>Compare reliable routes using live traffic, weather, safety and transit conditions.</p></div></div></div>
        <div className="masthead-actions"><span className="sync-label"><span className="live-dot" />Conditions are live</span><Link className="surface-button" to="/traffic"><TrafficCone size={17} />Traffic</Link><Link className="primary-action" to="/live-map"><Map size={17} />Full map</Link></div>
      </header>

      <section className="route-planner-grid">
        <aside className="route-form-card">
          <div className="route-form-heading"><div><span>Journey planner</span><h2>Where are you going?</h2></div><Navigation size={20} /></div>
          <div className="route-mode-tabs">{modes.map(({ id, label, icon: Icon }) => <button className={mode === id ? 'active' : ''} key={id} onClick={() => chooseMode(id)}><Icon size={18} /><span>{label}</span></button>)}</div>
          <div className="route-input-stack">
            <label><i className="route-point start" /><span>From</span><select value={origin} onChange={(event) => setOrigin(event.target.value)}>{routePlaces.map((place) => <option key={place}>{place}</option>)}</select><LocateFixed size={17} /></label>
            <button className="swap-route-button" onClick={swap} aria-label="Swap origin and destination"><ArrowDownUp size={17} /></button>
            <label><i className="route-point end" /><span>To</span><select value={destination} onChange={(event) => setDestination(event.target.value)}>{routePlaces.map((place) => <option key={place}>{place}</option>)}</select><Map size={17} /></label>
          </div>
          <div className="route-options-title"><span>Route preferences</span><SlidersHorizontal size={15} /></div>
          <div className="route-toggles">
            <label><span><CloudRain size={17} /><b>Avoid flood-prone roads</b></span><input type="checkbox" checked={avoidFlooding} onChange={(event) => setAvoidFlooding(event.target.checked)} /><i /></label>
            <label><span><Fuel size={17} /><b>Avoid tolls</b></span><input type="checkbox" checked={avoidTolls} onChange={(event) => setAvoidTolls(event.target.checked)} /><i /></label>
            <label><span><ShieldCheck size={17} /><b>Prioritize safer roads</b></span><input type="checkbox" defaultChecked /><i /></label>
          </div>
          <button className="route-search-button"><Sparkles size={18} />Find best routes</button>
          <p className="route-data-note"><Check size={14} />Uses current traffic, rain and incident data</p>
        </aside>

        <div className="route-results-area">
          <div className="route-results-header"><div><span>{origin} → {destination}</span><h2>{routes.length} recommended routes</h2></div><span className="status-chip good">Live comparison</span></div>
          <div className="route-option-list">
            {routes.map((route) => <button key={route.id} className={selected.id === route.id ? 'selected' : ''} onClick={() => setSelectedRoute(route.id)}><div className={`route-choice-indicator ${route.tone}`}>{selected.id === route.id && <Check size={15} />}</div><div className="route-option-main"><div><h3>{route.name}</h3><span className={`status-chip ${route.tone}`}>{route.tag}</span></div><p>{route.path}</p><div className="route-factors"><span><TrafficCone size={14} />+{route.delay} min traffic</span><span><ShieldCheck size={14} />{route.reliability}% reliable</span>{avoidFlooding && <span><CloudRain size={14} />Flood-aware</span>}</div></div><div className="route-option-time"><strong>{route.eta}</strong><span>min</span><small>{route.distance} km</small></div><ChevronRight size={18} /></button>)}
          </div>
        </div>
      </section>

      <section className="route-detail-grid">
        <article className="workspace-panel turn-panel">
          <div className="workspace-panel-header"><div><span>Selected journey</span><h2>{selected.name} guidance</h2></div><span className="route-arrival">Arrive {new Date(Date.now() + selected.eta * 60000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span></div>
          <div className="turn-list"><div><span>1</span><div><strong>Start toward Rokeya Sarani</strong><small>Continue for 2.4 km · normal flow</small></div></div><div><span>2</span><div><strong>Keep right at Bijoy Sarani</strong><small>Moderate traffic for 1.8 km</small></div></div><div><span>3</span><div><strong>Continue through Tejgaon</strong><small>Signal delay approximately 3 minutes</small></div></div><div><span>4</span><div><strong>Arrive at {destination}</strong><small>Destination will be on your left</small></div></div></div>
        </article>

        <aside className="workspace-panel journey-summary-card">
          <div className="workspace-panel-header"><div><span>Journey impact</span><h2>Trip summary</h2></div><Clock3 size={19} /></div>
          <div className="journey-big-number"><strong>{selected.eta}</strong><span>minutes</span><small>{selected.distance} km total</small></div>
          <div className="journey-comparison"><div><span>Time saved</span><strong>{selected.id === routes[0].id ? '8 min' : '3 min'}</strong></div><div><span>Est. fuel</span><strong>{mode === 'car' ? '৳ 184' : '—'}</strong></div><div><span>Reliability</span><strong>{selected.reliability}%</strong></div></div>
          <button className="full-width-action"><Navigation size={16} />Start navigation</button>
        </aside>
      </section>

      <section className="service-crosslink"><div className="service-crosslink-icon"><BusFront /></div><div><span>Prefer public transport?</span><h2>Explore metro, rail, ferry and bus services in Smart Hub.</h2></div><Link to="/smart-hub">Open smart hub <ArrowRight size={16} /></Link></section>
    </div>
  );
};

export default Routing;
