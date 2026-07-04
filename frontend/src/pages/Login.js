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

  const handleGoogleSignIn = () => {
    setError('');
    setLoading(true);
    setTimeout(() => {
      const mockGoogleUser = {
        _id: 'google-user-112',
        name: 'Dhaka Guest Commuter',
        email: 'dhaka.commuter@gmail.com',
        role: 'Commuter'
      };
      login(mockGoogleUser, 'mock-google-token-secret-jwt');
      setLoading(false);
      navigate('/dashboard');
    }, 1200);
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

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '16px', borderTop: '1px solid var(--line)', paddingTop: '16px' }}>
          <button type="button" className="button secondary" onClick={handleGoogleSignIn} style={{ gap: '10px', height: '42px', fontSize: '0.9rem' }}>
            <svg style={{ width: '18px', height: '18px' }} viewBox="0 0 24 24">
              <path fill="currentColor" d="M12.24 10.285V13.4h6.887c-.648 2.41-2.519 4.113-5.111 4.113-3.454 0-6.259-2.806-6.259-6.26 0-3.454 2.805-6.258 6.26-6.258 1.572 0 2.97.592 4.037 1.562l2.386-2.386C18.775 2.72 16.142 1.75 13.016 1.75c-5.659 0-10.25 4.59-10.25 10.25s4.59 10.25 10.25 10.25c5.908 0 9.825-4.15 9.825-10.012 0-.648-.057-1.285-.173-1.953H12.24z"/>
            </svg>
            Sign in with Google
          </button>
        </div>
      </section>
    </div>
  );
};

export default Login;
