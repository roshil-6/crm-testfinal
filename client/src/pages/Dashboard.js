import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import API_BASE_URL from '../config/api';
import './Dashboard.css';
import { FiUsers, FiTrendingUp, FiClock, FiCheckCircle, FiXCircle, FiActivity } from 'react-icons/fi';

const Dashboard = () => {
  const { user } = useAuth();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/dashboard`);
      setData(response.data);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="dashboard-loading">Loading dashboard...</div>;
  }

  if (!data) {
    return <div className="dashboard-error">Error loading dashboard data</div>;
  }

  // Show restricted view for non-admin roles
  if (data.role === 'STAFF' || data.role === 'SALES_TEAM' || data.role === 'SALES_TEAM_HEAD' || data.role === 'PROCESSING') {
    return (
      <div className="dashboard">
        <h1 className="dashboard-title">My Dashboard</h1>
        <div className="metrics-grid">
          <div className="metric-card">
            <div className="metric-icon" style={{ background: '#FFF4D6' }}>
              <FiUsers style={{ color: '#D4AF37' }} />
            </div>
            <div className="metric-content">
              <div className="metric-value">{data.metrics.totalLeads}</div>
              <div className="metric-label">Total Leads</div>
            </div>
          </div>
          <div className="metric-card">
            <div className="metric-icon" style={{ background: '#FFF4D6' }}>
              <FiClock style={{ color: '#D4AF37' }} />
            </div>
            <div className="metric-content">
              <div className="metric-value">{data.metrics.todayFollowups}</div>
              <div className="metric-label">Today's Follow-ups</div>
            </div>
          </div>
        </div>
        <div className="status-breakdown">
          <h2>Leads by Status</h2>
          <div className="status-grid">
            <div className="status-item">
              <span className="status-label">New</span>
              <span className="status-count">{data.metrics.newLeads}</span>
            </div>
            <div className="status-item">
              <span className="status-label">Follow-up</span>
              <span className="status-count">{data.metrics.followupLeads}</span>
            </div>
            <div className="status-item">
              <span className="status-label">Under Processing</span>
              <span className="status-count">{data.metrics.processingLeads}</span>
            </div>
            <div className="status-item">
              <span className="status-label">Converted</span>
              <span className="status-count">{data.metrics.convertedLeads}</span>
            </div>
            <div className="status-item">
              <span className="status-label">Closed / Rejected</span>
              <span className="status-count">{data.metrics.closedLeads}</span>
            </div>
          </div>
        </div>
        <div className="recent-activity">
          <h2>Recent Activity</h2>
          {data.recentActivity && data.recentActivity.length > 0 ? (
            <div className="activity-list">
              {data.recentActivity.map((activity, index) => (
                <div key={index} className="activity-item">
                  <div className="activity-icon">
                    {activity.type === 'comment' ? <FiActivity /> : <FiTrendingUp />}
                  </div>
                  <div className="activity-content">
                    <div className="activity-text">
                      {activity.type === 'comment' ? 'New comment' : 'Status updated'} on{' '}
                      <strong>{activity.lead_name}</strong>
                    </div>
                    <div className="activity-meta">
                      {new Date(activity.timestamp).toLocaleString()}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="no-activity">No recent activity</p>
          )}
        </div>
      </div>
    );
  }

  // ADMIN Dashboard
  return (
    <div className="dashboard">
      <h1 className="dashboard-title">Company Dashboard</h1>
        <div className="metrics-grid">
          <div className="metric-card">
            <div className="metric-icon" style={{ background: '#FFF4D6' }}>
              <FiUsers style={{ color: '#D4AF37' }} />
            </div>
          <div className="metric-content">
            <div className="metric-value">{data.metrics.totalLeads}</div>
            <div className="metric-label">Total Leads</div>
          </div>
        </div>
      </div>
      <div className="status-breakdown">
        <h2>Leads by Status</h2>
        <div className="status-grid">
          {Object.entries(data.metrics.leadsByStatus || {}).map(([status, count]) => (
            <div key={status} className="status-item">
              <span className="status-label">{status}</span>
              <span className="status-count">{count}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="staff-performance">
        <h2>Staff Performance</h2>
        {data.staffPerformance && data.staffPerformance.length > 0 ? (
          <div className="performance-table">
            <table>
              <thead>
                <tr>
                  <th>Staff Member</th>
                  <th>Total Leads</th>
                  <th>Converted</th>
                </tr>
              </thead>
              <tbody>
                {data.staffPerformance.map((staff) => (
                  <tr key={staff.id}>
                    <td>{staff.name}</td>
                    <td>{staff.total_leads}</td>
                    <td>{staff.converted_leads}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p>No staff performance data available</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
