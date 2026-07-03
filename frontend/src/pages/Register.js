import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';

const Register = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    role: 'Commuter'
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const updateField = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setLoading(true);
    try {
      const { data } = await api.post('/auth/register', form);
      const { token, ...userData } = data;
      login(userData, token);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Unable to create the account.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-wrap">
      <section className="auth-card">
        <h1>Register</h1>
        <p>Create a commuter, driver, admin, or authority account.</p>
        {error && <div className="message error">{error}</div>}
        <form className="form-grid" onSubmit={handleSubmit}>
          <div className="form-row">
            <label htmlFor="name">Full name</label>
            <input id="name" name="name" value={form.name} onChange={updateField} required />
          </div>
          <div className="form-row">
            <label htmlFor="email">Email</label>
            <input id="email" name="email" type="email" value={form.email} onChange={updateField} required />
          </div>
          <div className="form-row">
            <label htmlFor="phone">Phone</label>
            <input id="phone" name="phone" value={form.phone} onChange={updateField} />
          </div>
          <div className="form-row">
            <label htmlFor="role">Role</label>
            <select id="role" name="role" value={form.role} onChange={updateField}>
              <option>Commuter</option>
              <option>Driver</option>
              <option>Admin</option>
              <option>Authority</option>
            </select>
          </div>
          <div className="form-row">
            <label htmlFor="password">Password</label>
            <input id="password" name="password" type="password" value={form.password} onChange={updateField} minLength="6" required />
          </div>
          <div className="form-footer">
            <Link to="/login">Already registered?</Link>
            <button className="button" type="submit" disabled={loading}>
              {loading ? 'Creating...' : 'Register'}
            </button>
          </div>
        </form>
      </section>
    </div>
  );
};

export default Register;
