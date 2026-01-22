import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import API_BASE_URL from '../config/api';
import './Leads.css';
import { FiSearch, FiFilter, FiEdit2, FiCalendar, FiMessageSquare } from 'react-icons/fi';

const Leads = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchInput, setSearchInput] = useState(searchParams.get('search') || '');
  const [search, setSearch] = useState(searchParams.get('search') || '');
  const [statusFilter, setStatusFilter] = useState(searchParams.get('status') || '');

  useEffect(() => {
    const urlSearch = searchParams.get('search') || '';
    const urlStatus = searchParams.get('status') || '';
    setSearch(urlSearch);
    setSearchInput(urlSearch);
    setStatusFilter(urlStatus);
  }, [searchParams]);

  useEffect(() => {
    fetchLeads();
  }, [statusFilter, search]);

  const fetchLeads = async () => {
    try {
      setLoading(true);
      const params = {};
      if (statusFilter) params.status = statusFilter;
      if (search) params.search = search;

      const response = await axios.get(`${API_BASE_URL}/api/leads`, { params });
      // Sort leads alphabetically by name
      const sortedLeads = response.data.sort((a, b) => {
        const nameA = (a.name || '').toLowerCase();
        const nameB = (b.name || '').toLowerCase();
        return nameA.localeCompare(nameB);
      });
      setLeads(sortedLeads);
    } catch (error) {
      console.error('Error fetching leads:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (searchInput.trim()) params.set('search', searchInput.trim());
    if (statusFilter) params.set('status', statusFilter);
    setSearch(searchInput.trim());
    navigate(`/leads?${params.toString()}`);
  };

  const handleSearchInputChange = (e) => {
    setSearchInput(e.target.value);
  };

  const handleStatusFilter = (status) => {
    const params = new URLSearchParams();
    if (search) params.set('search', search);
    if (status) params.set('status', status);
    navigate(`/leads?${params.toString()}`);
  };

  const statusOptions = ['New', 'Follow-up', 'Under Processing', 'Converted', 'Closed / Rejected'];

  const getStatusColor = (status) => {
    const colors = {
      'New': '#D4AF37',
      'Follow-up': '#C9A961',
      'Under Processing': '#B8860B',
      'Converted': '#8B6914',
      'Closed / Rejected': '#A0826D',
    };
    return colors[status] || '#8B6914';
  };

  const getPriorityColor = (priority) => {
    const colors = {
      'hot': '#ef4444',
      'warm': '#f59e0b',
      'cold': '#3b82f6',
      'not interested': '#6b7280',
      'not eligible': '#dc2626',
    };
    return colors[priority] || '#6b7280';
  };

  const formatPriority = (priority) => {
    if (!priority) return '-';
    return priority.split(' ').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  };

  if (loading) {
    return <div className="leads-loading">Loading leads...</div>;
  }

  return (
    <div className="leads-page">
      <div className="leads-header">
        <h1>Clients (Leads)</h1>
        <div className="leads-controls">
          <form onSubmit={handleSearch} className="leads-search">
            <FiSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search lead by name to see assigned staff..."
              value={searchInput}
              onChange={handleSearchInputChange}
            />
          </form>
          <div className="status-filters">
            <button
              className={`filter-btn ${statusFilter === '' ? 'active' : ''}`}
              onClick={() => handleStatusFilter('')}
            >
              All
            </button>
            {statusOptions.map((status) => (
              <button
                key={status}
                className={`filter-btn ${statusFilter === status ? 'active' : ''}`}
                onClick={() => handleStatusFilter(status)}
                style={{
                  borderColor: statusFilter === status ? getStatusColor(status) : '#e5e7eb',
                  color: statusFilter === status ? getStatusColor(status) : '#6b7280',
                }}
              >
                {status}
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className="leads-table-container">
        {leads.length === 0 ? (
          <div className="no-leads">No leads found</div>
        ) : (
          <table className="leads-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Phone</th>
                <th>Email</th>
                <th>Priority</th>
                <th>Comment</th>
                <th>Follow-up Date</th>
                <th>Status</th>
                <th style={{ fontWeight: 600, color: '#8B6914' }}>Assigned To</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {leads.map((lead) => (
                <tr key={lead.id}>
                  <td>{lead.name}</td>
                  <td>{lead.phone_number}</td>
                  <td>{lead.email || '-'}</td>
                  <td>
                    {lead.priority ? (
                      <span
                        className="priority-badge"
                        style={{
                          backgroundColor: `${getPriorityColor(lead.priority)}20`,
                          color: getPriorityColor(lead.priority),
                        }}
                      >
                        {formatPriority(lead.priority)}
                      </span>
                    ) : (
                      '-'
                    )}
                  </td>
                  <td>
                    <div className="comment-cell" title={lead.comment || ''}>
                      {lead.comment ? (
                        <>
                          <FiMessageSquare style={{ marginRight: '4px', opacity: 0.6 }} />
                          {lead.comment.length > 30 ? `${lead.comment.substring(0, 30)}...` : lead.comment}
                        </>
                      ) : (
                        '-'
                      )}
                    </div>
                  </td>
                  <td>
                    {lead.follow_up_date ? (
                      <div className="date-cell">
                        <FiCalendar style={{ marginRight: '4px', opacity: 0.6 }} />
                        {new Date(lead.follow_up_date).toLocaleDateString()}
                      </div>
                    ) : (
                      '-'
                    )}
                  </td>
                  <td>
                    <span
                      className="status-badge"
                      style={{
                        backgroundColor: `${getStatusColor(lead.status)}20`,
                        color: getStatusColor(lead.status),
                      }}
                    >
                      {lead.status}
                    </span>
                  </td>
                  <td>
                    <span className="assigned-staff-cell" style={{
                      fontWeight: lead.assigned_staff_name ? 600 : 400,
                      color: lead.assigned_staff_name ? '#8B6914' : '#9ca3af',
                      fontSize: '14px',
                      padding: '4px 8px',
                      backgroundColor: lead.assigned_staff_name ? '#FFF4D6' : 'transparent',
                      borderRadius: '4px',
                      display: 'inline-block',
                    }}>
                      {lead.assigned_staff_name || 'Unassigned'}
                    </span>
                  </td>
                  <td>
                    <button
                      className="btn-view"
                      onClick={() => navigate(`/leads/${lead.id}`)}
                    >
                      <FiEdit2 /> View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Leads;
