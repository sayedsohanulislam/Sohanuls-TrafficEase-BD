import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
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
      const { data } = await api.post('/auth/login', form);
      const { token, ...userData } = data;
      login(userData, token);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Unable to login right now.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-wrap">
      <section className="auth-card">
        <h1>Login</h1>
        <p>Access the TrafficEase BD operations dashboard.</p>
        {error && <div className="message error">{error}</div>}
        <form className="form-grid" onSubmit={handleSubmit}>
          <div className="form-row">
            <label htmlFor="email">Email</label>
            <input id="email" name="email" type="email" value={form.email} onChange={updateField} required />
          </div>
          <div className="form-row">
            <label htmlFor="password">Password</label>
            <input id="password" name="password" type="password" value={form.password} onChange={updateField} required />
          </div>
          <div className="form-footer">
            <Link to="/register">Create account</Link>
            <button className="button" type="submit" disabled={loading}>
              {loading ? 'Signing in...' : 'Login'}
            </button>
          </div>
        </form>
      </section>
    </div>
  );
};

export default Login;
