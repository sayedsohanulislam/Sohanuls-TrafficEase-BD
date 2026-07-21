import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Activity, AlertTriangle, ArrowRight, Camera, CheckCircle2, ChevronRight,
  CircleDot, Cloud, Database, Gauge, Radio, RefreshCw, Server, Signal,
  SlidersHorizontal, Waves, Wifi, WifiOff, Zap
} from 'lucide-react';
import { telemetryEvents, telemetryNodes } from '../data/serviceData';

const statusTone = (status) => status === 'Online' ? 'good' : status === 'Warning' || status === 'Degraded' ? 'warning' : 'notice';
const nodeIcon = (type) => type === 'Camera' ? Camera : type === 'Signal' ? Signal : type === 'Water' ? Waves : type === 'Utility' ? Zap : Cloud;

const Telemetry = () => {
  const [filter, setFilter] = useState('All');
  const [selectedId, setSelectedId] = useState(telemetryNodes[0].id);
  const [heartbeat, setHeartbeat] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => setHeartbeat((value) => value + 1), 4000);
    return () => window.clearInterval(timer);
  }, []);

  const types = ['All', ...new Set(telemetryNodes.map((node) => node.type))];
  const visibleNodes = filter === 'All' ? telemetryNodes : telemetryNodes.filter((node) => node.type === filter);
  const selected = useMemo(() => telemetryNodes.find((node) => node.id === selectedId) || telemetryNodes[0], [selectedId]);
  const selectedIndex = telemetryNodes.findIndex((node) => node.id === selected.id);
  const readings = [42, 46, 43, 51, 49, 57, 61, 58, 66, 63, 71, 68].map((value, index) => Math.max(12, Math.min(96, value + selectedIndex * 4 + ((heartbeat + index) % 3))));

  return (
    <div className="service-page telemetry-page">
      <header className="service-masthead">
        <div>
          <div className="service-breadcrumb"><span>Live services</span><ChevronRight size={13} /><b>Telemetry</b></div>
          <div className="service-title-row"><div className="service-title-icon telemetry"><Activity /></div><div><h1>Network telemetry</h1><p>Source health, sensor readings and infrastructure events in one operational view.</p></div></div>
        </div>
        <div className="masthead-actions"><span className="sync-label"><span className="live-dot" />Streaming now</span><button className="surface-button"><RefreshCw size={17} />Refresh sources</button><button className="primary-action"><SlidersHorizontal size={17} />Configure view</button></div>
      </header>

      <section className="service-metric-grid telemetry-metrics">
        <article><div className="service-metric-icon good"><Wifi /></div><div><span>Sources online</span><strong>284 / 291</strong><small>97.6% availability</small></div></article>
        <article><div className="service-metric-icon info"><Database /></div><div><span>Events today</span><strong>18.4M</strong><small>1,420 per second</small></div></article>
        <article><div className="service-metric-icon good"><Gauge /></div><div><span>Median latency</span><strong>64 ms</strong><small>within target range</small></div></article>
        <article><div className="service-metric-icon warning"><AlertTriangle /></div><div><span>Needs attention</span><strong>7</strong><small>2 priority sources</small></div></article>
      </section>

      <section className="telemetry-overview-grid">
        <article className="workspace-panel health-chart-panel">
          <div className="workspace-panel-header"><div><span>National source network</span><h2>Data throughput</h2></div><div className="chart-legend"><span><i className="good" />Healthy</span><span><i className="warning" />Delayed</span></div></div>
          <div className="telemetry-chart">
            <div className="chart-y-labels"><span>2k</span><span>1.5k</span><span>1k</span><span>500</span><span>0</span></div>
            <div className="chart-bars">{[62, 68, 71, 67, 78, 81, 76, 88, 84, 91, 87, 93, 89, 95, 92, 97, 94, 96].map((value, index) => <div key={index}><i className={index === 12 ? 'warning' : 'good'} style={{ height: `${value}%` }} /><span>{index % 3 === 0 ? `${index + 6}:00` : ''}</span></div>)}</div>
          </div>
          <div className="chart-summary"><div><span>Current rate</span><strong>1,420 evt/s</strong></div><div><span>Peak today</span><strong>1,884 evt/s</strong></div><div><span>Delivery success</span><strong>99.82%</strong></div></div>
        </article>

        <aside className="workspace-panel source-health-panel">
          <div className="workspace-panel-header"><div><span>By channel</span><h2>Source health</h2></div><Server size={19} /></div>
          <div className="source-health-list">
            {[['Road cameras', 128, 96, Camera], ['Signal controllers', 84, 99, Signal], ['Weather stations', 31, 100, Cloud], ['River gauges', 24, 92, Waves], ['Utility monitors', 24, 96, Zap]].map(([name, count, health, Icon]) => <div key={name}><div className="source-channel-icon"><Icon size={17} /></div><div><strong>{name}</strong><small>{count} registered sources</small></div><div className="health-meter"><i style={{ width: `${health}%` }} className={health < 95 ? 'warning' : ''} /></div><b>{health}%</b></div>)}
          </div>
        </aside>
      </section>

      <section className="telemetry-workspace">
        <article className="workspace-panel node-directory-panel">
          <div className="workspace-panel-header"><div><span>Device directory</span><h2>Live sources</h2></div><span className="result-count">{visibleNodes.length} sources</span></div>
          <div className="filter-tabs compact-tabs">{types.map((type) => <button key={type} className={filter === type ? 'active' : ''} onClick={() => setFilter(type)}>{type}</button>)}</div>
          <div className="node-table-head"><span>Source</span><span>Reading</span><span>Latency</span><span>Status</span></div>
          <div className="telemetry-node-list">
            {visibleNodes.map((node) => {
              const Icon = nodeIcon(node.type);
              return <button key={node.id} className={selected.id === node.id ? 'selected' : ''} onClick={() => setSelectedId(node.id)}><div className="node-type-icon"><Icon size={18} /></div><div><strong>{node.name}</strong><small>{node.id} · {node.area}</small></div><span>{node.reading}</span><span>{node.latency ? `${node.latency} ms` : '—'}</span><b className={`status-chip ${statusTone(node.status)}`}><i />{node.status}</b><ChevronRight size={16} /></button>;
            })}
          </div>
        </article>

        <aside className="workspace-panel node-detail-panel">
          <div className="detail-live-line"><Radio size={14} />Live source detail</div>
          <div className="node-detail-title"><div className="node-type-icon"><CircleDot /></div><div><h2>{selected.name}</h2><p>{selected.id} · {selected.area}</p></div></div>
          <div className="node-reading"><span>Current reading</span><strong>{selected.reading}</strong><small>Updated {selected.updated}</small></div>
          <div className="mini-sparkline">{readings.map((value, index) => <i key={index} style={{ height: `${value}%` }} />)}</div>
          <div className="detail-stat-grid"><div><span>Status</span><strong>{selected.status}</strong></div><div><span>Latency</span><strong>{selected.latency || 0} ms</strong></div><div><span>Packets</span><strong>99.8%</strong></div><div><span>Uptime</span><strong>28d 4h</strong></div></div>
          <div className="source-verification"><CheckCircle2 size={18} /><div><strong>Source verified</strong><p>Identity and data signature passed the latest integrity check.</p></div></div>
          <button className="full-width-action">Open diagnostics <ArrowRight size={16} /></button>
        </aside>
      </section>

      <section className="workspace-panel event-log-panel">
        <div className="workspace-panel-header"><div><span>Automated monitoring</span><h2>Recent system events</h2></div><Link to="/dashboard">Operations queue <ArrowRight size={15} /></Link></div>
        <div className="system-event-list">{telemetryEvents.map((event) => <div key={event.title}><span className={`event-dot ${event.level}`} /><div><strong>{event.title}</strong><small>{event.source}</small></div><b>{event.time}</b><ChevronRight size={16} /></div>)}</div>
      </section>

      <section className="service-crosslink"><div className="service-crosslink-icon"><WifiOff /></div><div><span>Found a faulty source?</span><h2>Send a verified infrastructure issue to the response team.</h2></div><Link to="/report-incident">Report an issue <ArrowRight size={16} /></Link></section>
    </div>
  );
};

export default Telemetry;
