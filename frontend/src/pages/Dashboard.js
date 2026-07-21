import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight, Bell, Bookmark, ChevronRight, CloudRain, CloudSun, Gauge,
  HeartPulse, MapPin, Navigation, Settings2, ShieldCheck, TrainFront,
  TrafficCone, Wind
} from 'lucide-react';
import { liveAlerts, locations } from '../data/nationalLiveData';

const Dashboard = () => {
  const [area, setArea] = useState('Dhaka');
  const [preferences, setPreferences] = useState({ traffic: true, weather: true, utilities: false, transport: true });
  const current = locations[area];

  const togglePreference = (key) => setPreferences((values) => ({ ...values, [key]: !values[key] }));

  return (
    <div className="service-page my-area-page">
      <header className="service-masthead">
        <div><div className="service-breadcrumb"><span>Personal</span><ChevronRight size={13} /><b>My area</b></div><div className="service-title-row"><div className="service-title-icon area"><MapPin /></div><div><h1>My area</h1><p>A simple daily briefing for the places and services you care about.</p></div></div></div>
        <div className="masthead-actions"><label className="area-selector"><MapPin size={16} /><select value={area} onChange={(event) => setArea(event.target.value)}>{Object.keys(locations).map((location) => <option key={location}>{location}</option>)}</select></label><button className="surface-button"><Settings2 size={17} />Preferences</button></div>
      </header>

      <section className="area-welcome-card">
        <div><span>Good {new Date().getHours() < 12 ? 'morning' : new Date().getHours() < 18 ? 'afternoon' : 'evening'}</span><h2>Here’s what’s happening in {area}.</h2><p>Your most important weather, mobility and public-service updates are summarized below.</p></div>
        <div className="area-weather"><CloudSun size={45} /><strong>{current.temp}°</strong><span>{current.condition}<small>Feels like {current.feels}°</small></span></div>
      </section>

      <section className="service-metric-grid">
        <article><div className="service-metric-icon warning"><TrafficCone /></div><div><span>Traffic</span><strong>{current.traffic}</strong><small>check before leaving</small></div></article>
        <article><div className="service-metric-icon info"><Wind /></div><div><span>Air quality</span><strong>AQI {current.aqi}</strong><small>{current.aqi > 100 ? 'sensitive groups take care' : 'acceptable conditions'}</small></div></article>
        <article><div className="service-metric-icon info"><CloudRain /></div><div><span>Rain chance</span><strong>{current.rain}%</strong><small>during the next few hours</small></div></article>
        <article><div className="service-metric-icon critical"><Bell /></div><div><span>Nearby alerts</span><strong>2</strong><small>one needs attention</small></div></article>
      </section>

      <section className="my-area-grid">
        <article className="workspace-panel area-briefing-panel">
          <div className="workspace-panel-header"><div><span>Daily brief</span><h2>What you should know</h2></div><span className="status-chip good">Updated now</span></div>
          <div className="area-brief-list">
            <div><div className="brief-icon traffic"><Navigation /></div><div><span>Travel</span><h3>Allow 20 extra minutes toward central {area}</h3><p>Peak traffic is building on two major corridors. The smart route avoids the slowest section.</p><Link to="/routing">Plan the journey <ArrowRight size={14} /></Link></div></div>
            <div><div className="brief-icon weather"><CloudRain /></div><div><span>Weather</span><h3>{current.rain > 60 ? 'Rain is likely later today' : 'No severe weather expected'}</h3><p>Humidity is {current.humidity}% with winds near {current.wind} km/h.</p><Link to="/">Full forecast <ArrowRight size={14} /></Link></div></div>
            <div><div className="brief-icon transport"><TrainFront /></div><div><span>Public transport</span><h3>Major services are operating normally</h3><p>Metro service is on time; seven national rail services have minor delays.</p><Link to="/smart-hub">Transport services <ArrowRight size={14} /></Link></div></div>
          </div>
        </article>

        <aside className="workspace-panel area-alert-panel">
          <div className="workspace-panel-header"><div><span>For your location</span><h2>Relevant alerts</h2></div><Bell size={18} /></div>
          <div className="area-alert-list">{liveAlerts.slice(0,3).map((alert) => <article key={alert.id}><span className={`event-dot ${alert.level}`} /><div><span>{alert.type} · {alert.time}</span><h3>{alert.title}</h3><p>{alert.detail}</p></div></article>)}</div>
          <button className="panel-footer-link">View all alerts <ArrowRight size={14} /></button>
        </aside>
      </section>

      <section className="my-area-bottom-grid">
        <article className="workspace-panel saved-services-panel">
          <div className="workspace-panel-header"><div><span>Quick access</span><h2>Saved services</h2></div><Bookmark size={18} /></div>
          <div className="saved-service-list"><Link to="/traffic"><TrafficCone /><span><strong>Live traffic</strong><small>Heavy in {area}</small></span><ChevronRight /></Link><Link to="/routing"><Navigation /><span><strong>Smart routing</strong><small>Plan with current conditions</small></span><ChevronRight /></Link><Link to="/smart-hub"><HeartPulse /><span><strong>Health services</strong><small>Verified national directory</small></span><ChevronRight /></Link></div>
        </article>

        <article className="workspace-panel alert-preferences-panel">
          <div className="workspace-panel-header"><div><span>Notifications</span><h2>Alert preferences</h2></div><Settings2 size={18} /></div>
          <div className="preference-list">{Object.entries(preferences).map(([key, enabled]) => <label key={key}><span><strong>{key[0].toUpperCase() + key.slice(1)}</strong><small>{enabled ? 'Important updates enabled' : 'Updates are paused'}</small></span><input type="checkbox" checked={enabled} onChange={() => togglePreference(key)} /><i /></label>)}</div>
        </article>
      </section>

      <section className="service-crosslink"><div className="service-crosslink-icon"><ShieldCheck /></div><div><span>Your information</span><h2>Preferences are stored on this device and can be changed anytime.</h2></div><Link to="/smart-hub">Explore services <ArrowRight size={16} /></Link></section>
    </div>
  );
};

export default Dashboard;
