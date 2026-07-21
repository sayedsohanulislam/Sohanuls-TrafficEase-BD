import React, { useState } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { Bell, ChevronDown, MapPinned, Menu, Search, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const handleLogout = () => {
    logout();
    setMenuOpen(false);
    navigate('/');
  };

  return (
    <header className="navbar national-navbar">
      <div className="public-service-bar">
        <div className="nav-inner service-bar-inner">
          <span><span className="live-dot" />BANGLADESH LIVE INFORMATION NETWORK</span>
          <div><span>Last synced: just now</span><span>বাংলা</span><span>English</span></div>
        </div>
      </div>
      <div className="nav-inner">
        <Link className="brand" to="/" onClick={() => setMenuOpen(false)}>
          <span className="national-brand-mark" aria-hidden="true">
            <MapPinned size={23} strokeWidth={2.2} />
          </span>
          <span className="brand-copy"><strong>Bangladesh Live</strong><small>জাতীয় তথ্য সেবা</small></span>
        </Link>

        {/* Mobile Hamburger Toggle Button */}
        <button
          className={`nav-toggle ${menuOpen ? 'active' : ''}`}
          type="button"
          aria-label="Toggle navigation menu"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X /> : <Menu />}
        </button>

        <nav className={`nav-links ${menuOpen ? 'open' : ''}`} aria-label="Main navigation">
          <NavLink className="nav-link" to="/" onClick={() => setMenuOpen(false)}>Overview</NavLink>
          <NavLink className="nav-link" to="/live-traffic" onClick={() => setMenuOpen(false)}>Traffic</NavLink>
          <NavLink className="nav-link" to="/live-map" onClick={() => setMenuOpen(false)}>Live map</NavLink>
          <NavLink className="nav-link nav-services-link" to="/smart-hub" onClick={() => setMenuOpen(false)}>Services <ChevronDown size={14} /></NavLink>
          <NavLink className="nav-link" to="/dashboard" onClick={() => setMenuOpen(false)}>My area</NavLink>
        </nav>

        <div className="nav-tools">
          <button className="icon-button tooltip" data-tooltip="Search national updates" aria-label="Search national updates" onClick={() => setSearchOpen(!searchOpen)}><Search size={19} /></button>
          <button className="icon-button notification-button tooltip" data-tooltip="View alerts" aria-label="View alerts"><Bell size={19} /><span>3</span></button>
          <Link className="nav-action" to="/report-incident">Report an issue</Link>
          {isAuthenticated && <button className="text-button" type="button" onClick={handleLogout}>Sign out {user?.name || ''}</button>}
        </div>
      </div>
      {searchOpen && (
        <div className="nav-search-panel">
          <div className="nav-inner">
            <Search size={20} />
            <input autoFocus aria-label="Search" placeholder="Search a district, road, weather alert or service…" />
            <button onClick={() => setSearchOpen(false)} aria-label="Close search"><X size={20} /></button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
