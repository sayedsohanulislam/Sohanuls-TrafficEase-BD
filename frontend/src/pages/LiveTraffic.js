import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Activity, AlertTriangle, ArrowRight, Camera, ChevronRight, Clock3,
  Gauge, Map, Navigation, Radio, RefreshCw, Route, Siren, TrafficCone
} from 'lucide-react';
import api from '../services/api';
import { demoLiveTraffic } from '../data/trafficDemoData';

const toneFor = (value) => value >= 80 ? 'critical' : value >= 60 ? 'warning' : 'good';

const LiveTraffic = () => {
  const [traffic, setTraffic] = useState(demoLiveTraffic);
  const [selectedId, setSelectedId] = useState(demoLiveTraffic.corridors[0].id);
  const [updatedAt, setUpdatedAt] = useState(new Date());
  const [history, setHistory] = useState([58, 64, 61, 69, 73, 71, demoLiveTraffic.averageCongestion]);

  useEffect(() => {
    let active = true;
    const refresh = async () => {
      try {
        const { data } = await api.get('/live-traffic');
        if (!active) return;
        setTraffic(data);
        setHistory((values) => [...values.slice(-6), data.averageCongestion]);
        setUpdatedAt(new Date());
      } catch {
        if (active) setUpdatedAt(new Date());
      }
    };
    refresh();
    const timer = window.setInterval(refresh, 12000);
    return () => { active = false; window.clearInterval(timer); };
  }, []);

  const selected = useMemo(
    () => traffic.corridors.find((corridor) => corridor.id === selectedId) || traffic.corridors[0],
    [traffic.corridors, selectedId]
  );

  return (
    <div className="service-page traffic-page">
      <header className="service-masthead">
        <div>
          <div className="service-breadcrumb"><span>Live services</span><ChevronRight size={13} /><b>Traffic</b></div>
          <div className="service-title-row"><div className="service-title-icon traffic"><TrafficCone /></div><div><h1>Traffic operations</h1><p>Live road pressure, corridor speeds, incidents and signal conditions.</p></div></div>
        </div>
        <div className="masthead-actions">
          <span className="sync-label"><span className="live-dot" />Updated {updatedAt.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
          <Link className="surface-button" to="/live-map"><Map size={17} />Open map</Link>
          <Link className="primary-action" to="/report-incident"><Siren size={17} />Report incident</Link>
        </div>
      </header>

      <section className="service-metric-grid">
        <article><div className={`service-metric-icon ${toneFor(traffic.averageCongestion)}`}><Gauge /></div><div><span>Network congestion</span><strong>{traffic.averageCongestion}%</strong><small>{traffic.networkStatus}</small></div></article>
        <article><div className="service-metric-icon info"><Navigation /></div><div><span>Average speed</span><strong>{traffic.averageSpeed} km/h</strong><small>across watched corridors</small></div></article>
        <article><div className="service-metric-icon warning"><Clock3 /></div><div><span>Total queue</span><strong>{(traffic.totalQueueMeters / 1000).toFixed(1)} km</strong><small>estimated road backlog</small></div></article>
        <article><div className="service-metric-icon good"><Camera /></div><div><span>Active cameras</span><strong>{traffic.cameras.filter((item) => item.status === 'Online').length}/{traffic.cameras.length}</strong><small>vision sources online</small></div></article>
      </section>

      <section className="traffic-workspace">
        <div className="workspace-panel corridor-panel">
          <div className="workspace-panel-header"><div><span>Road network</span><h2>Corridor pressure</h2></div><Link to="/routing">Plan a route <ArrowRight size={15} /></Link></div>
          <div className="corridor-table-head"><span>Corridor</span><span>Speed</span><span>Delay</span><span>Load</span></div>
          <div className="modern-corridor-list">
            {traffic.corridors.map((corridor) => (
              <button className={selected.id === corridor.id ? 'selected' : ''} key={corridor.id} onClick={() => setSelectedId(corridor.id)}>
                <div><strong>{corridor.name}</strong><small>{corridor.area} · {corridor.trend}</small></div>
                <span>{corridor.speedKph}<small>km/h</small></span>
                <span>+{corridor.delayMin}<small>min</small></span>
                <div className={`load-pill ${toneFor(corridor.congestion)}`}><i style={{ width: `${corridor.congestion}%` }} /><b>{corridor.congestion}%</b></div>
                <ChevronRight size={17} />
              </button>
            ))}
          </div>
        </div>

        <aside className="workspace-panel corridor-detail-card">
          <div className="detail-live-line"><Radio size={14} />Selected corridor</div>
          <h2>{selected.name}</h2><p>{selected.cause}</p>
          <div className="corridor-score"><div className={`score-disc ${toneFor(selected.congestion)}`}><strong>{selected.congestion}%</strong><span>road load</span></div><div><span>Current journey</span><strong>{selected.travelTimeMin} min</strong><small>{selected.delayMin} minutes slower than normal</small></div></div>
          <div className="detail-stat-grid"><div><span>Live speed</span><strong>{selected.speedKph} km/h</strong></div><div><span>Normal</span><strong>{selected.normalSpeedKph} km/h</strong></div><div><span>Queue</span><strong>{selected.queueMeters} m</strong></div><div><span>Signal</span><strong>{selected.signal}</strong></div></div>
          <div className="recommendation-box"><Route size={18} /><div><span>Recommended action</span><p>{selected.recommendation}</p></div></div>
          <Link className="full-width-action" to="/routing">Find an alternative route <ArrowRight size={16} /></Link>
        </aside>
      </section>

      <section className="traffic-secondary-grid">
        <article className="workspace-panel trend-panel">
          <div className="workspace-panel-header"><div><span>Last 90 minutes</span><h2>Network trend</h2></div><span className={`status-chip ${toneFor(traffic.averageCongestion)}`}>{traffic.networkStatus}</span></div>
          <div className="trend-chart" aria-label="Congestion trend chart">
            {history.map((value, index) => <div key={`${value}-${index}`}><i style={{ height: `${value}%` }} className={toneFor(value)} /><span>{index === history.length - 1 ? 'Now' : `${(history.length - index - 1) * 15}m`}</span></div>)}
          </div>
        </article>

        <article className="workspace-panel signal-panel">
          <div className="workspace-panel-header"><div><span>Intersections</span><h2>Signal health</h2></div><Link to="/telemetry">Telemetry <ArrowRight size={15} /></Link></div>
          <div className="compact-data-list">
            {traffic.signalPhases.slice(0, 5).map((signal) => <div key={signal.intersection}><div><strong>{signal.intersection}</strong><small>{signal.phase}</small></div><span>{signal.secondsLeft}s</span><b className={`status-chip ${toneFor(signal.load)}`}>{signal.mode}</b></div>)}
          </div>
        </article>

        <article className="workspace-panel incident-panel">
          <div className="workspace-panel-header"><div><span>Attention needed</span><h2>Live incidents</h2></div><AlertTriangle size={19} /></div>
          <div className="incident-mini-list">
            {traffic.dispatchQueue.slice(0, 4).map((task) => <div key={task.task}><span className={`event-dot ${task.priority === 'Critical' ? 'critical' : 'warning'}`} /><div><strong>{task.task}</strong><small>{task.owner}</small></div><b>{task.etaMin} min</b></div>)}
          </div>
          <Link className="panel-footer-link" to="/dashboard">Open operations queue <ArrowRight size={15} /></Link>
        </article>
      </section>

      <section className="service-crosslink"><div className="service-crosslink-icon"><Activity /></div><div><span>Need the raw network signals?</span><h2>Inspect sensors, cameras and source health in Telemetry.</h2></div><Link to="/telemetry">Open telemetry <ArrowRight size={16} /></Link></section>
    </div>
  );
};

export default LiveTraffic;
