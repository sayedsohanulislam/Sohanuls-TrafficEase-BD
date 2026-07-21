import React, { useEffect, useState } from 'react';
import { CircleMarker, MapContainer, TileLayer, useMap, useMapEvents } from 'react-leaflet';
import { Link } from 'react-router-dom';
import { AlertTriangle, ArrowRight, CheckCircle2, ChevronRight, Info, LocateFixed, MapPin, Search, Send, ShieldCheck, Siren, X } from 'lucide-react';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';

const defaultForm = { title: '', type: 'Congestion', severity: 'Medium', locationName: '', latitude: '23.8103', longitude: '90.4125', description: '' };
const dhakaCenter = [23.8103, 90.4125];

const LocationPicker = ({ onLocationSelected, position }) => {
  useMapEvents({ click: (event) => onLocationSelected(event.latlng.lat, event.latlng.lng) });
  return <CircleMarker center={position} radius={9} pathOptions={{ color: '#fff', fillColor: '#ef5661', fillOpacity: 1, weight: 3 }} />;
};

const MapController = ({ center }) => {
  const map = useMap();
  useEffect(() => { map.setView(center, 14, { animate: true }); }, [center, map]);
  return null;
};

const ReportIncident = () => {
  const { isAuthenticated } = useAuth();
  const [form, setForm] = useState(defaultForm);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [addressLookup, setAddressLookup] = useState('');
  const [lookupLoading, setLookupLoading] = useState(false);
  const [mapCenter, setMapCenter] = useState(dhakaCenter);

  const updateField = (event) => setForm((values) => ({ ...values, [event.target.name]: event.target.value }));
  const pickLocation = (lat, lng) => { setForm((values) => ({ ...values, latitude: lat.toFixed(5), longitude: lng.toFixed(5) })); setMapCenter([lat, lng]); };

  const locateAddress = async (event) => {
    event?.preventDefault();
    if (!addressLookup.trim()) return;
    setLookupLoading(true);
    try {
      const query = encodeURIComponent(`${addressLookup}, Bangladesh`);
      const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${query}&limit=1`);
      const results = await response.json();
      if (!results.length) throw new Error('Location not found');
      pickLocation(Number(results[0].lat), Number(results[0].lon));
      setForm((values) => ({ ...values, locationName: values.locationName || results[0].display_name.split(',').slice(0, 2).join(',') }));
    } catch { setError('We could not find that location. Try a nearby landmark or place the pin manually.'); }
    finally { setLookupLoading(false); }
  };

  const submit = async (event) => {
    event.preventDefault(); setMessage(''); setError(''); setLoading(true);
    try {
      await api.post('/incidents', { ...form, coordinates: [Number(form.longitude), Number(form.latitude)] });
      setMessage('Thank you. Your report has been submitted for verification.'); setForm(defaultForm); setAddressLookup(''); setMapCenter(dhakaCenter);
    } catch (requestError) { setError(requestError.response?.data?.message || 'The report could not be submitted. Please try again.'); }
    finally { setLoading(false); }
  };

  return (
    <div className="service-page report-page">
      <header className="service-masthead">
        <div><div className="service-breadcrumb"><span>Public reporting</span><ChevronRight size={13} /><b>New incident</b></div><div className="service-title-row"><div className="service-title-icon report"><Siren /></div><div><h1>Report an incident</h1><p>Help other people and response teams by sharing a clear, accurate update.</p></div></div></div>
        <div className="masthead-actions"><span className="sync-label"><ShieldCheck size={15} />Reports are reviewed</span><Link className="surface-button" to="/live-map"><MapPin size={17} />View map</Link></div>
      </header>

      {message && <div className="report-message success"><CheckCircle2 />{message}<button onClick={() => setMessage('')}><X /></button></div>}
      {error && <div className="report-message error"><AlertTriangle />{error}<button onClick={() => setError('')}><X /></button></div>}

      <section className="report-layout">
        <form className="modern-report-form" onSubmit={submit}>
          <div className="report-form-intro"><span>Step 1 of 2</span><h2>Tell us what happened</h2><p>Only include information you directly observed.</p></div>
          <div className="modern-field"><label htmlFor="title">Short title</label><input id="title" name="title" value={form.title} onChange={updateField} placeholder="Example: Flooding blocking the left lane" required /><small>Keep it clear and specific.</small></div>
          <div className="report-field-grid"><div className="modern-field"><label htmlFor="type">Incident type</label><select id="type" name="type" value={form.type} onChange={updateField}><option>Congestion</option><option>Accident</option><option>Roadwork</option><option>Flooding</option><option>Signal Failure</option><option>Other</option></select></div><div className="modern-field"><label htmlFor="severity">How serious is it?</label><select id="severity" name="severity" value={form.severity} onChange={updateField}><option>Low</option><option>Medium</option><option>High</option><option>Critical</option></select></div></div>
          <div className="modern-field"><label htmlFor="locationName">Location or nearby landmark</label><input id="locationName" name="locationName" value={form.locationName} onChange={updateField} placeholder="Example: Shahbagh intersection" required /></div>
          <div className="modern-field"><label htmlFor="description">What can you see?</label><textarea id="description" name="description" value={form.description} onChange={updateField} placeholder="Describe blocked lanes, travel direction and whether emergency help is already present." /><small>{form.description.length}/500 characters</small></div>
          <div className="report-privacy-note"><Info size={17} /><p>{isAuthenticated ? 'This report will appear in your account history.' : 'You can report without an account. Do not include names, phone numbers or other personal information.'}</p></div>
          <button className="submit-report-button" type="submit" disabled={loading}><Send size={17} />{loading ? 'Submitting report…' : 'Submit for verification'}</button>
        </form>

        <div className="report-map-panel">
          <div className="report-form-intro"><span>Step 2 of 2</span><h2>Confirm the location</h2><p>Search a place or click directly on the map.</p></div>
          <form className="report-location-search" onSubmit={locateAddress}><Search size={18} /><input value={addressLookup} onChange={(event) => setAddressLookup(event.target.value)} placeholder="Search an address or landmark" /><button disabled={lookupLoading}>{lookupLoading ? 'Finding…' : 'Locate'}</button></form>
          <div className="report-map-wrap"><MapContainer center={mapCenter} zoom={13} scrollWheelZoom><MapController center={mapCenter} /><TileLayer attribution='&copy; OpenStreetMap contributors' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" /><LocationPicker onLocationSelected={pickLocation} position={[Number(form.latitude), Number(form.longitude)]} /></MapContainer><div className="report-map-tip"><LocateFixed size={15} />Click the exact incident location</div></div>
          <div className="report-coordinate-row"><div><span>Latitude</span><strong>{form.latitude}</strong></div><div><span>Longitude</span><strong>{form.longitude}</strong></div><CheckCircle2 size={18} /></div>
        </div>
      </section>

      <section className="report-emergency-note"><AlertTriangle /><div><strong>Is someone in immediate danger?</strong><p>Do not wait for an online report to be reviewed.</p></div><a href="tel:999">Call 999 now <ArrowRight size={15} /></a></section>
    </div>
  );
};

export default ReportIncident;
