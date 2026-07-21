import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight, Bell, Boxes, CheckCircle2, ChevronRight, Clock3, ExternalLink,
  Heart, LayoutGrid, Navigation, Search, ShieldCheck, Sparkles, Star, X
} from 'lucide-react';
import { serviceCategories, smartServices } from '../data/serviceData';

const SmartHub = () => {
  const [category, setCategory] = useState('All');
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState(null);
  const [favorites, setFavorites] = useState(['weather', 'metro', 'emergency']);
  const SelectedIcon = selected?.icon;

  const visibleServices = useMemo(() => smartServices.filter((service) => {
    const inCategory = category === 'All' || service.category === category || (category === 'Favorites' && favorites.includes(service.id));
    const matchesQuery = !query.trim() || `${service.name} ${service.description} ${service.category}`.toLowerCase().includes(query.toLowerCase());
    return inCategory && matchesQuery;
  }), [category, query, favorites]);

  const toggleFavorite = (event, id) => {
    event.preventDefault();
    event.stopPropagation();
    setFavorites((items) => items.includes(id) ? items.filter((item) => item !== id) : [...items, id]);
  };

  return (
    <div className="service-page smart-hub-page">
      <header className="service-masthead">
        <div><div className="service-breadcrumb"><span>Live services</span><ChevronRight size={13} /><b>Smart hub</b></div><div className="service-title-row"><div className="service-title-icon hub"><Boxes /></div><div><h1>Smart service hub</h1><p>Every public information tool, clearly grouped and easy to find.</p></div></div></div>
        <div className="masthead-actions"><span className="sync-label"><ShieldCheck size={15} />Verified directory</span><button className="surface-button"><Bell size={17} />My alerts</button><Link className="primary-action" to="/dashboard"><LayoutGrid size={17} />My area</Link></div>
      </header>

      <section className="hub-search-hero">
        <div><span><Sparkles size={15} />One place for everyday services</span><h2>What do you need right now?</h2><p>Search live updates, national helplines, transport tools and essential public services.</p></div>
        <label className="hub-search"><Search size={21} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search weather, metro, power, hospitals…" aria-label="Search services" />{query && <button onClick={() => setQuery('')} aria-label="Clear search"><X size={17} /></button>}</label>
        <div className="hub-quick-links"><span>Popular:</span>{['Weather', 'Metro status', 'Power notices', 'Emergency'].map((item) => <button key={item} onClick={() => setQuery(item)}>{item}</button>)}</div>
      </section>

      <section className="hub-layout">
        <aside className="hub-sidebar">
          <div className="hub-sidebar-title">Browse services</div>
          <button className={category === 'All' ? 'active' : ''} onClick={() => setCategory('All')}><LayoutGrid size={18} /><span>All services<small>{smartServices.length} available</small></span><b>{smartServices.length}</b></button>
          <button className={category === 'Favorites' ? 'active' : ''} onClick={() => setCategory('Favorites')}><Star size={18} /><span>My favorites<small>Saved on this device</small></span><b>{favorites.length}</b></button>
          <div className="hub-sidebar-divider" />
          {serviceCategories.map(({ id, icon: Icon, description }) => <button className={category === id ? 'active' : ''} key={id} onClick={() => setCategory(id)}><Icon size={18} /><span>{id}<small>{description}</small></span><b>{smartServices.filter((service) => service.category === id).length}</b></button>)}
          <div className="hub-help-card"><div><ShieldCheck size={20} /></div><strong>Can’t find a service?</strong><p>Use the verified national directory or request assistance.</p><button>Get help <ArrowRight size={14} /></button></div>
        </aside>

        <div className="hub-results">
          <div className="hub-results-heading"><div><span>{query ? 'Search results' : 'Service collection'}</span><h2>{query ? `Results for “${query}”` : category === 'All' ? 'All smart services' : category}</h2></div><span>{visibleServices.length} services</span></div>

          {category === 'All' && !query && <div className="hub-featured-row">
            <Link to="/routing" className="hub-featured-card mobility"><div className="hub-featured-icon"><Navigation /></div><span>Featured tool</span><h3>Plan a smarter journey</h3><p>Compare road and public transport routes with live conditions.</p><b>Open routing <ArrowRight size={15} /></b></Link>
            <Link to="/telemetry" className="hub-featured-card system"><span>Network health</span><h3>98.7%</h3><p>National data sources are operating normally.</p><div className="featured-health-bar"><i /></div><b>View telemetry <ArrowRight size={15} /></b></Link>
          </div>}

          <div className="hub-service-grid">
            {visibleServices.map((service) => {
              const Icon = service.icon;
              return <article className="hub-service-card" key={service.id} onClick={() => setSelected(service)}><button className={`favorite-button ${favorites.includes(service.id) ? 'saved' : ''}`} onClick={(event) => toggleFavorite(event, service.id)} aria-label={`${favorites.includes(service.id) ? 'Remove' : 'Add'} ${service.name} favorite`}><Heart size={16} fill={favorites.includes(service.id) ? 'currentColor' : 'none'} /></button><div className={`hub-card-icon category-${service.category.toLowerCase().replace(' ', '-')}`}><Icon size={21} /></div><div className="hub-card-status"><i />{service.status}</div><h3>{service.name}</h3><p>{service.description}</p><div className="hub-card-footer"><div><strong>{service.value}</strong><span>{service.category}</span></div><button aria-label={`Preview ${service.name}`}><ChevronRight size={17} /></button></div></article>;
            })}
          </div>
          {!visibleServices.length && <div className="hub-empty-state"><Search size={28} /><h3>No services match your search</h3><p>Try a broader term or browse a service category.</p><button onClick={() => { setQuery(''); setCategory('All'); }}>Show all services</button></div>}
        </div>
      </section>

      <section className="hub-trust-strip"><div><CheckCircle2 /><span><strong>Verified sources</strong><small>Clear provenance for every live feed</small></span></div><div><Clock3 /><span><strong>Freshness indicators</strong><small>Know exactly when information changed</small></span></div><div><ShieldCheck /><span><strong>Privacy first</strong><small>Your saved services stay on your device</small></span></div></section>

      {selected && <div className="service-preview-overlay" onClick={() => setSelected(null)}><aside className="service-preview-drawer" onClick={(event) => event.stopPropagation()}><button className="preview-close" onClick={() => setSelected(null)} aria-label="Close service preview"><X /></button><div className="preview-service-icon">{SelectedIcon && <SelectedIcon />}</div><span className="section-kicker">{selected.category} · {selected.status}</span><h2>{selected.name}</h2><p>{selected.description}</p><div className="preview-live-value"><span>Current status</span><strong>{selected.value}</strong><small><span className="live-dot" />Updated moments ago</small></div><div className="preview-source-note"><ShieldCheck size={18} /><div><strong>Verified public information</strong><p>This service combines authorized feeds and clearly labeled fallback data.</p></div></div><Link className="full-width-action" to={selected.route}>Open full service <ExternalLink size={16} /></Link></aside></div>}
    </div>
  );
};

export default SmartHub;
