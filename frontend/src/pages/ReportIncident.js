import React, { useState } from 'react';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';

const defaultForm = {
  title: '',
  type: 'Congestion',
  severity: 'Medium',
  locationName: '',
  latitude: '23.8103',
  longitude: '90.4125',
  description: ''
};

const ReportIncident = () => {
  const { isAuthenticated } = useAuth();
  const [form, setForm] = useState(defaultForm);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const updateField = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage('');
    setError('');
    setLoading(true);

    try {
      await api.post('/incidents', {
        title: form.title,
        type: form.type,
        severity: form.severity,
        locationName: form.locationName,
        description: form.description,
        coordinates: [Number(form.longitude), Number(form.latitude)]
      });
      setForm(defaultForm);
      setMessage('Incident report submitted successfully.');
    } catch (err) {
      setError(err.response?.data?.message || 'Unable to submit this incident.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-panel">
      <h1>Report Incident</h1>
      <p>{isAuthenticated ? 'Your report will be attached to your account.' : 'You can report now, then login later to track updates.'}</p>
      {message && <div className="message success">{message}</div>}
      {error && <div className="message error">{error}</div>}

      <form className="form-grid" onSubmit={handleSubmit}>
        <div className="grid grid-2">
          <div className="form-row">
            <label htmlFor="title">Incident title</label>
            <input id="title" name="title" value={form.title} onChange={updateField} required />
          </div>
          <div className="form-row">
            <label htmlFor="locationName">Location</label>
            <input id="locationName" name="locationName" value={form.locationName} onChange={updateField} required />
          </div>
        </div>

        <div className="grid grid-2">
          <div className="form-row">
            <label htmlFor="type">Type</label>
            <select id="type" name="type" value={form.type} onChange={updateField}>
              <option>Congestion</option>
              <option>Accident</option>
              <option>Roadwork</option>
              <option>Flooding</option>
              <option>Signal Failure</option>
              <option>Other</option>
            </select>
          </div>
          <div className="form-row">
            <label htmlFor="severity">Severity</label>
            <select id="severity" name="severity" value={form.severity} onChange={updateField}>
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
              <option>Critical</option>
            </select>
          </div>
        </div>

        <div className="grid grid-2">
          <div className="form-row">
            <label htmlFor="latitude">Latitude</label>
            <input id="latitude" name="latitude" type="number" step="any" value={form.latitude} onChange={updateField} required />
          </div>
          <div className="form-row">
            <label htmlFor="longitude">Longitude</label>
            <input id="longitude" name="longitude" type="number" step="any" value={form.longitude} onChange={updateField} required />
          </div>
        </div>

        <div className="form-row">
          <label htmlFor="description">Description</label>
          <textarea id="description" name="description" value={form.description} onChange={updateField} />
        </div>

        <div className="form-footer">
          <span className="panel-subtitle">Default coordinates point to central Dhaka.</span>
          <button className="button" type="submit" disabled={loading}>
            {loading ? 'Submitting...' : 'Submit Report'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ReportIncident;
