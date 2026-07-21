import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { CircleMarker, MapContainer, Polyline, Popup, TileLayer, Tooltip, useMap } from 'react-leaflet';
import {
  AlertTriangle, ArrowRight, BusFront, Check, ChevronRight, CloudRain,
  Crosshair, Layers3, Map as MapIcon, MapPinned, Navigation, Route,
  Search, TrafficCone, Waves, X
} from 'lucide-react';
import { demoIncidents, demoLiveTraffic } from '../data/trafficDemoData';

const corridors = [
  { ...demoLiveTraffic.corridors[0], center: [23.7777, 90.3806], points: [[23.8069,90.3687],[23.7925,90.3772],[23.7777,90.3806],[23.7582,90.3897]] },
  { ...demoLiveTraffic.corridors[1], center: [23.7926, 90.4043], points: [[23.7807,90.4162],[23.7898,90.4045],[23.7937,90.4003],[23.8017,90.4001]] },
  { ...demoLiveTraffic.corridors[2], center: [23.7324, 90.4092], points: [[23.7382,90.3951],[23.7335,90.4074],[23.7352,90.4141],[23.7288,90.4177]] },
  { ...demoLiveTraffic.corridors[3], center: [23.8423, 90.4076], points: [[23.8759,90.3795],[23.8514,90.3998],[23.8423,90.4076],[23.8196,90.4143]] },
  { ...demoLiveTraffic.corridors[4], center: [23.7121, 90.4254], points: [[23.7019,90.4352],[23.7111,90.4246],[23.7234,90.4121]] }
];

const tone = (load) => load >= 80 ? '#ef6873' : load >= 60 ? '#efb851' : '#62d4a6';
const toneForMap = (load) => load >= 80 ? 'critical' : load >= 60 ? 'warning' : 'good';

const MapFocus = ({ center }) => {
  const map = useMap();
  React.useEffect(() => { if (center) map.flyTo(center, 14, { duration: .7 }); }, [center, map]);
  return null;
};

const LiveMap = () => {
  const [layers, setLayers] = useState({ traffic: true, incidents: true, transit: false, flood: false });
  const [selected, setSelected] = useState(corridors[0]);
  const [focusCenter, setFocusCenter] = useState(null);
  const [query, setQuery] = useState('');
  const [panel, setPanel] = useState('conditions');

  const filteredCorridors = useMemo(() => corridors.filter((corridor) => `${corridor.name} ${corridor.area}`.toLowerCase().includes(query.toLowerCase())), [query]);
  const toggleLayer = (name) => setLayers((current) => ({ ...current, [name]: !current[name] }));
  const selectCorridor = (corridor, focus = false) => {
    setSelected(corridor);
    if (focus) setFocusCenter([...corridor.center]);
  };

  return (
    <div className="service-page map-service-page">
      <header className="service-masthead">
        <div><div className="service-breadcrumb"><span>Live services</span><ChevronRight size={13} /><b>Map</b></div><div className="service-title-row"><div className="service-title-icon map"><MapIcon /></div><div><h1>National live map</h1><p>Explore road conditions, incidents and essential infrastructure without dashboard clutter.</p></div></div></div>
        <div className="masthead-actions"><span className="sync-label"><span className="live-dot" />Map layers are live</span><Link className="surface-button" to="/traffic"><TrafficCone size={17} />Traffic</Link><Link className="primary-action" to="/routing"><Route size={17} />Plan route</Link></div>
      </header>

      <section className="modern-map-shell">
        <div className="modern-map-main">
          <div className="map-floating-search"><Search size={18} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search a corridor or area" aria-label="Search map" />{query && <button onClick={() => setQuery('')} aria-label="Clear search"><X size={16} /></button>}</div>
          <div className="map-layer-control"><span><Layers3 size={16} />Map overlays</span>{[
            ['traffic', 'Congestion', TrafficCone], ['incidents', 'Incidents', AlertTriangle], ['transit', 'Transit', BusFront], ['flood', 'Flood risk', Waves]
          ].map(([id, label, Icon]) => <button className={layers[id] ? 'active' : ''} key={id} onClick={() => toggleLayer(id)}><Icon size={15} />{label}{layers[id] && <Check size={13} />}</button>)}</div>
          <div className={`traffic-overlay-status ${layers.traffic ? 'active' : 'off'}`}><span><TrafficCone size={15} />Traffic jam overlay</span><strong>{layers.traffic ? 'ON' : 'OFF'}</strong><small>{layers.traffic ? `${filteredCorridors.length} monitored corridors` : 'Enable Congestion in map overlays'}</small></div>
          <MapContainer center={[23.7808, 90.4071]} zoom={12} scrollWheelZoom className="modern-leaflet-map">
            <TileLayer attribution='&copy; OpenStreetMap contributors' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <MapFocus center={focusCenter} />
            {layers.traffic && filteredCorridors.map((corridor) => <React.Fragment key={corridor.id}>
              <CircleMarker center={corridor.center} radius={corridor.congestion >= 80 ? 42 : 32} pathOptions={{ stroke: false, fillColor: tone(corridor.congestion), fillOpacity: corridor.congestion >= 80 ? .18 : .12 }} />
              <Polyline positions={corridor.points} pathOptions={{ color: '#07110f', weight: selected.id === corridor.id ? 18 : 15, opacity: .88, lineCap: 'round', lineJoin: 'round' }} eventHandlers={{ click: () => selectCorridor(corridor) }} />
              <Polyline positions={corridor.points} pathOptions={{ color: tone(corridor.congestion), weight: selected.id === corridor.id ? 11 : 9, opacity: 1, lineCap: 'round', lineJoin: 'round', className: `traffic-jam-line ${toneForMap(corridor.congestion)}` }} eventHandlers={{ click: () => selectCorridor(corridor) }} />
              <Polyline positions={corridor.points} pathOptions={{ color: 'rgba(255,255,255,.88)', weight: 2, opacity: .9, dashArray: '2 13', className: 'traffic-flow-line' }} eventHandlers={{ click: () => selectCorridor(corridor) }} />
              <CircleMarker center={corridor.center} radius={10} pathOptions={{ color: '#fff', weight: 2, fillColor: tone(corridor.congestion), fillOpacity: 1 }} eventHandlers={{ click: () => selectCorridor(corridor) }}><Tooltip permanent direction="top" offset={[0, -10]} opacity={1} className="traffic-map-label"><strong>{corridor.congestion}%</strong><span>{corridor.congestion >= 80 ? 'Heavy jam' : corridor.congestion >= 60 ? 'Slow' : 'Moving'}</span></Tooltip><Popup><strong>{corridor.name}</strong><br />{corridor.speedKph} km/h · {corridor.congestion}% road load<br />+{corridor.delayMin} min delay</Popup></CircleMarker>
            </React.Fragment>)}
            {layers.incidents && demoIncidents.map((incident) => <CircleMarker key={incident._id} center={[incident.coordinates[1], incident.coordinates[0]]} radius={8} pathOptions={{ color: '#fff', weight: 2, fillColor: incident.severity === 'High' ? '#ef5661' : '#efb851', fillOpacity: .95 }}><Popup><strong>{incident.title}</strong><br />{incident.locationName} · {incident.status}</Popup></CircleMarker>)}
            {layers.transit && [[23.8070,90.3686],[23.7778,90.3803],[23.7381,90.3952],[23.7287,90.4176]].map((point, index) => <CircleMarker key={index} center={point} radius={6} pathOptions={{ color: '#fff', weight: 2, fillColor: '#a697ef', fillOpacity: 1 }}><Popup>MRT Line 6 · Station operating normally</Popup></CircleMarker>)}
            {layers.flood && <CircleMarker center={[23.7106,90.4255]} radius={52} pathOptions={{ color: '#64b3e7', weight: 2, fillColor: '#64b3e7', fillOpacity: .16 }}><Popup>Localized waterlogging risk · Moderate</Popup></CircleMarker>}
          </MapContainer>
          <button className="map-locate-button tooltip" data-tooltip="Center on selected corridor" aria-label="Center on selected corridor" onClick={() => setFocusCenter([...selected.center])}><Crosshair size={19} /></button>
          <div className="map-legend"><strong>Traffic speed</strong><span><i className="good" />Moving</span><span><i className="warning" />Slow</span><span><i className="critical" />Heavy jam</span><span><b />Incident</span></div>
        </div>

        <aside className="modern-map-sidebar">
          <div className="map-side-tabs"><button className={panel === 'conditions' ? 'active' : ''} onClick={() => setPanel('conditions')}>Conditions</button><button className={panel === 'incidents' ? 'active' : ''} onClick={() => setPanel('incidents')}>Incidents <span>{demoIncidents.length}</span></button></div>
          {panel === 'conditions' ? <>
            <div className="map-selected-summary"><div className="detail-live-line"><Navigation size={14} />Selected corridor</div><h2>{selected.name}</h2><p>{selected.area}</p><div className="map-load-summary"><strong style={{ color: tone(selected.congestion) }}>{selected.congestion}%</strong><span>road load<small>{selected.trend} trend</small></span></div><div className="detail-stat-grid"><div><span>Live speed</span><strong>{selected.speedKph} km/h</strong></div><div><span>Delay</span><strong>+{selected.delayMin} min</strong></div><div><span>Queue</span><strong>{selected.queueMeters} m</strong></div><div><span>Signal</span><strong>{selected.signal}</strong></div></div><div className="recommendation-box"><Navigation size={18} /><div><span>Travel note</span><p>{selected.recommendation}</p></div></div><Link className="full-width-action" to="/routing">Route around this area <ArrowRight size={15} /></Link></div>
            <div className="map-corridor-list"><div className="map-sidebar-label">Nearby corridors · select to zoom</div>{filteredCorridors.map((corridor) => <button key={corridor.id} className={selected.id === corridor.id ? 'active' : ''} onClick={() => selectCorridor(corridor, true)}><span style={{ background: tone(corridor.congestion) }} /><div><strong>{corridor.name}</strong><small>{corridor.speedKph} km/h · +{corridor.delayMin} min</small></div><b>{corridor.congestion}%</b><ChevronRight size={15} /></button>)}</div>
          </> : <div className="map-incident-list"><div className="map-sidebar-label">Active reports</div>{demoIncidents.map((incident) => <article key={incident._id}><div className={`map-incident-icon ${incident.severity.toLowerCase()}`}><AlertTriangle size={17} /></div><div><strong>{incident.title}</strong><p>{incident.locationName}</p><span>{incident.type} · {incident.status}</span></div><button><MapPinned size={16} /></button></article>)}<Link className="panel-footer-link" to="/report-incident">Report a new incident <ArrowRight size={15} /></Link></div>}
        </aside>
      </section>

      <section className="service-crosslink"><div className="service-crosslink-icon"><CloudRain /></div><div><span>Weather-aware maps</span><h2>Turn on flood risk before traveling during heavy rain.</h2></div><button onClick={() => setLayers((current) => ({ ...current, flood: true }))}>Enable flood layer <ArrowRight size={16} /></button></section>
    </div>
  );
};

export default LiveMap;
