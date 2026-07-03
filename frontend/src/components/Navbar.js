import React from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="navbar">
      <div className="nav-inner">
        <Link className="brand" to="/">
          <span className="brand-mark">TE</span>
          <span>TrafficEase BD</span>
        </Link>

        <nav className="nav-links" aria-label="Main navigation">
          <NavLink className="nav-link" to="/">Home</NavLink>
          <NavLink className="nav-link" to="/dashboard">Dashboard</NavLink>
          <NavLink className="nav-link" to="/live-traffic">Live Traffic</NavLink>
          <NavLink className="nav-link" to="/live-map">Map</NavLink>
          <NavLink className="nav-link" to="/report-incident">Report</NavLink>
          {isAuthenticated ? (
            <>
              <span className="badge">{user?.role || 'User'}</span>
              <button className="nav-action" type="button" onClick={handleLogout}>Logout</button>
            </>
          ) : (
            <>
              <NavLink className="nav-link" to="/login">Login</NavLink>
              <NavLink className="nav-link" to="/register">Register</NavLink>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
