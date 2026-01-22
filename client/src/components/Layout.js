import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import GoldenLinesBackground from './GoldenLinesBackground';
import Notifications from './Notifications';
import './Layout.css';
import { FiHome, FiUsers, FiClock, FiPlus, FiLogOut, FiSettings } from 'react-icons/fi';

const Layout = ({ children }) => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleCreateLead = () => {
    navigate('/leads/new');
  };

  const isActive = (path) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <div className="layout">
      <GoldenLinesBackground />
      <aside className="sidebar">
        <div className="sidebar-header">
          <h2>Tonio & Senora</h2>
          <p className="sidebar-subtitle">CRM System</p>
        </div>
        <nav className="sidebar-nav">
          <Link to="/" className={`nav-item ${isActive('/') && location.pathname === '/' ? 'active' : ''}`}>
            <FiHome className="nav-icon" />
            <span>Dashboard</span>
          </Link>
          <Link to="/leads" className={`nav-item ${isActive('/leads') ? 'active' : ''}`}>
            <FiUsers className="nav-icon" />
            <span>Clients (Leads)</span>
          </Link>
          <Link to="/attendance" className={`nav-item ${isActive('/attendance') ? 'active' : ''}`}>
            <FiClock className="nav-icon" />
            <span>Attendance</span>
          </Link>
          {user?.role === 'ADMIN' && (
            <Link to="/users" className={`nav-item ${isActive('/users') ? 'active' : ''}`}>
              <FiSettings className="nav-icon" />
              <span>User Management</span>
            </Link>
          )}
        </nav>
      </aside>
      <div className="main-content">
        <header className="top-bar">
          <div className="top-bar-actions">
            <button onClick={handleCreateLead} className="btn-create-lead">
              <FiPlus /> Create New Lead
            </button>
            <Notifications />
            <div className="user-info">
              <span className="user-name">{user?.name}</span>
              <span className="user-role">{user?.role}</span>
            </div>
            <button onClick={handleLogout} className="btn-logout" title="Logout">
              <FiLogOut />
            </button>
          </div>
        </header>
        <main className="content-area">{children}</main>
      </div>
    </div>
  );
};

export default Layout;
