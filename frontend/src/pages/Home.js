import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Activity, AlertTriangle, ArrowRight, BusFront, CalendarClock, CheckCircle2,
  ChevronRight, CloudRain, CloudSun, Droplets, ExternalLink, Gauge, HeartPulse,
  Info, Landmark, LocateFixed, Map, Navigation, Phone, Plane, Radio, RefreshCw,
  Search, ShieldCheck, Siren, Sun, TrainFront, UtilityPole, Waves, Wind, X,
  Zap
} from 'lucide-react';
import { divisionPulse, liveAlerts, locations, nationalMetrics, transportStatus } from '../data/nationalLiveData';

const metricIcons = { road: Navigation, alert: AlertTriangle, train: TrainFront, air: Wind };
const alertIcons = { Weather: CloudRain, Traffic: Navigation, Transport: BusFront, Utilities: UtilityPole };

const Home = () => {
  const [location, setLocation] = useState('Dhaka');
  const [alertFilter, setAlertFilter] = useState('All');
  const [bannerVisible, setBannerVisible] = useState(true);
  const [clock, setClock] = useState(new Date());
  const current = locations[location];

  useEffect(() => {
    const timer = window.setInterval(() => setClock(new Date()), 30000);
    return () => window.clearInterval(timer);
  }, []);

  const filteredAlerts = useMemo(
    () => alertFilter === 'All' ? liveAlerts : liveAlerts.filter((alert) => alert.type === alertFilter),
    [alertFilter]
  );

  return (
    <div className="national-home">
      {bannerVisible && (
        <section className="priority-banner" aria-label="Priority alert">
          <div className="priority-banner-icon"><CloudRain size={20} /></div>
          <div>
            <strong>Weather advisory</strong>
            <span>Heavy rain may cause localized waterlogging in parts of Barishal division through tonight.</span>
          </div>
          <a href="#alerts">View advisory <ArrowRight size={15} /></a>
          <button aria-label="Dismiss advisory" onClick={() => setBannerVisible(false)}><X size={18} /></button>
        </section>
      )}

      <section className="national-hero">
        <div className="hero-copy">
          <div className="national-eyebrow"><Radio size={14} /> National public information network</div>
          <h1>Bangladesh, <span>live at a glance.</span></h1>
          <p>One trusted place for weather, traffic, public transport, air quality, river levels, utilities and emergency updates across the country.</p>
          <label className="location-search">
            <Search size={21} />
            <span className="sr-only">Choose your area</span>
            <select value={location} onChange={(event) => setLocation(event.target.value)}>
              {Object.keys(locations).map((name) => <option key={name}>{name}</option>)}
            </select>
            <LocateFixed size={19} />
          </label>
          <div className="hero-trust-row">
            <span><ShieldCheck size={16} /> Verified sources</span>
            <span><RefreshCw size={16} /> Updated continuously</span>
            <span><Map size={16} /> All 8 divisions</span>
          </div>
        </div>

        <article className={`weather-spotlight weather-${current.accent}`} id="weather">
          <div className="weather-topline">
            <div><span>Right now in</span><button>{location} <ChevronRight size={15} /></button></div>
            <div className="live-time"><span className="live-dot" />LIVE · {clock.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
          </div>
          <div className="weather-primary">
            <CloudSun size={64} strokeWidth={1.4} />
            <div><strong>{current.temp}°</strong><span>Feels like {current.feels}°</span></div>
            <div className="condition"><b>{current.condition}</b><span>High 33° · Low 27°</span></div>
          </div>
          <div className="weather-measures">
            <div><Droplets size={17} /><span>Humidity</span><strong>{current.humidity}%</strong></div>
            <div><Wind size={17} /><span>Wind</span><strong>{current.wind} km/h</strong></div>
            <div><CloudRain size={17} /><span>Rain</span><strong>{current.rain}%</strong></div>
            <div><Gauge size={17} /><span>Air</span><strong>AQI {current.aqi}</strong></div>
          </div>
          <div className="weather-forecast">
            {['Now', '3 PM', '6 PM', '9 PM', 'Tomorrow'].map((time, index) => (
              <div key={time}><span>{time}</span>{index > 1 ? <CloudRain size={18} /> : <Sun size={18} />}<strong>{current.temp - index}°</strong></div>
            ))}
          </div>
        </article>
      </section>

      <section className="national-metrics" aria-label="National live metrics">
        {nationalMetrics.map((metric) => {
          const Icon = metricIcons[metric.icon];
          return <article key={metric.label}><div className="metric-icon"><Icon size={20} /></div><div><span>{metric.label}</span><strong>{metric.value}</strong><small>{metric.helper}</small></div></article>;
        })}
      </section>

      <section className="national-content-grid" id="alerts">
        <div className="content-panel alert-feed-panel">
          <div className="content-panel-header">
            <div><span className="section-kicker">Situation room</span><h2>Priority updates</h2></div>
            <span className="panel-update"><RefreshCw size={13} /> updated 1 min ago</span>
          </div>
          <div className="filter-tabs" role="tablist" aria-label="Filter alerts">
            {['All', 'Weather', 'Traffic', 'Transport', 'Utilities'].map((filter) => (
              <button className={filter === alertFilter ? 'active' : ''} key={filter} onClick={() => setAlertFilter(filter)}>{filter}</button>
            ))}
          </div>
          <div className="alert-feed">
            {filteredAlerts.map((alert) => {
              const Icon = alertIcons[alert.type] || Info;
              return (
                <article className={`alert-row alert-${alert.level}`} key={alert.id}>
                  <div className="alert-type-icon"><Icon size={19} /></div>
                  <div className="alert-body"><div><span>{alert.type}</span><small>{alert.time}</small></div><h3>{alert.title}</h3><p>{alert.detail}</p><b>{alert.area}</b></div>
                  <button className="row-arrow tooltip" data-tooltip="Open update" aria-label={`Open ${alert.title}`}><ChevronRight size={19} /></button>
                </article>
              );
            })}
          </div>
          <button className="panel-link">View all national updates <ArrowRight size={16} /></button>
        </div>

        <aside className="content-panel division-panel">
          <div className="content-panel-header">
            <div><span className="section-kicker">Across the country</span><h2>Division pulse</h2></div>
            <Map size={20} />
          </div>
          <div className="division-list">
            {divisionPulse.map((division) => (
              <button key={division.name} onClick={() => { setLocation(division.name); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
                <span className={`division-condition condition-${division.status}`} />
                <strong>{division.name}</strong><span>{division.weather}</span><small>{division.traffic} traffic</small><b>{division.note}</b><ChevronRight size={16} />
              </button>
            ))}
          </div>
          <Link className="panel-link" to="/live-map">Explore the national map <ArrowRight size={16} /></Link>
        </aside>
      </section>

      <section className="section-block" id="services">
        <div className="national-section-heading">
          <div><span className="section-kicker">Everything that affects your day</span><h2>Live services, one clear view</h2><p>Check conditions before you travel, plan or respond.</p></div>
          <Link to="/smart-hub">Explore all services <ArrowRight size={16} /></Link>
        </div>
        <div className="service-card-grid">
          <Link className="service-card service-traffic" to="/live-traffic"><div className="service-icon"><Navigation /></div><span className="service-live"><i /> Live</span><h3>Road & traffic</h3><p>Congestion, incidents, closures and smarter routes.</p><div><strong>{current.traffic}</strong><span>{location} traffic now</span></div><ArrowRight className="service-arrow" /></Link>
          <article className="service-card service-air"><div className="service-icon"><Wind /></div><span className="service-live"><i /> Live</span><h3>Air quality & health</h3><p>Local AQI, health guidance and heat exposure.</p><div><strong>{current.aqi}</strong><span>AQI · {current.aqi > 100 ? 'Sensitive groups take care' : 'Acceptable'}</span></div><ArrowRight className="service-arrow" /></article>
          <article className="service-card service-river"><div className="service-icon"><Waves /></div><span className="service-live"><i /> Live</span><h3>Rivers & flood risk</h3><p>Water levels, forecasts and flood-prone areas.</p><div><strong>3 stations</strong><span>above warning level</span></div><ArrowRight className="service-arrow" /></article>
          <article className="service-card service-transport"><div className="service-icon"><TrainFront /></div><span className="service-live"><i /> Live</span><h3>Public transport</h3><p>Rail, metro, ferry and airport operations.</p><div><strong>92%</strong><span>services on time</span></div><ArrowRight className="service-arrow" /></article>
          <article className="service-card service-utility"><div className="service-icon"><Zap /></div><span className="service-live"><i /> Live</span><h3>Utilities</h3><p>Power, water and planned maintenance notices.</p><div><strong>8 notices</strong><span>scheduled today</span></div><ArrowRight className="service-arrow" /></article>
          <article className="service-card service-civic"><div className="service-icon"><Landmark /></div><span className="service-badge">Directory</span><h3>Public services</h3><p>National helplines, offices and essential services.</p><div><strong>64 services</strong><span>in one directory</span></div><ArrowRight className="service-arrow" /></article>
        </div>
      </section>

      <section className="section-block transport-section">
        <div className="national-section-heading compact"><div><span className="section-kicker">Moving Bangladesh</span><h2>Transport network status</h2></div><button>Full transport board <ExternalLink size={15} /></button></div>
        <div className="transport-board">
          {transportStatus.map((item, index) => {
            const Icon = [TrainFront, TrainFront, Waves, Plane][index];
            return <article key={item.mode}><div className="transport-icon"><Icon size={21} /></div><div><span>{item.mode}</span><strong>{item.route}</strong></div><div className={`transport-state state-${item.tone}`}><i />{item.state}</div><small>{item.meta}</small><ChevronRight size={17} /></article>;
          })}
        </div>
      </section>

      <section className="emergency-band">
        <div className="emergency-intro"><div><Siren size={25} /></div><span>Need urgent help?</span><h2>Emergency services</h2><p>Tap a number to call. Available nationwide.</p></div>
        <a href="tel:999"><Phone size={20} /><span>National emergency<small>Police · Fire · Ambulance</small></span><strong>999</strong></a>
        <a href="tel:102"><Activity size={20} /><span>Fire service<small>Direct response line</small></span><strong>102</strong></a>
        <a href="tel:16263"><HeartPulse size={20} /><span>Health hotline<small>Government health service</small></span><strong>16263</strong></a>
        <a href="tel:1090"><CloudRain size={20} /><span>Disaster warning<small>Early warning service</small></span><strong>1090</strong></a>
      </section>

      <footer className="national-footer">
        <div><div className="footer-brand"><Map size={20} /><strong>Bangladesh Live</strong></div><p>A unified public information concept for safer, better-informed decisions across Bangladesh.</p></div>
        <div><span><CheckCircle2 size={15} /> Source transparency</span><span><CalendarClock size={15} /> 24/7 monitoring</span><span><ShieldCheck size={15} /> Privacy-first</span></div>
      </footer>
    </div>
  );
};

export default Home;
