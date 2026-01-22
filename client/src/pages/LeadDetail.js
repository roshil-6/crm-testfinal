import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import API_BASE_URL from '../config/api';
import './LeadDetail.css';
import { FiSave, FiMessageSquare, FiUser, FiPhone, FiMail, FiCalendar, FiArrowLeft } from 'react-icons/fi';

const LeadDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [lead, setLead] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({});
  const [newComment, setNewComment] = useState('');
  const [staffList, setStaffList] = useState([]);

  useEffect(() => {
    if (id === 'new') {
      setEditing(true);
      setLead({});
      setFormData({
        name: '',
        phone_number: '',
        whatsapp_number: '',
        email: '',
        age: '',
        occupation: '',
        status: 'New',
        assigned_staff_id: user?.role === 'STAFF' ? user.id : null,
        priority: '',
        comment: '',
        follow_up_date: '',
      });
      if (user?.role === 'ADMIN') {
        fetchStaffList();
      }
      setLoading(false);
    } else {
      fetchLead();
      fetchComments();
      if (user?.role === 'ADMIN') {
        fetchStaffList();
      }
    }
  }, [id, user]);

  const fetchLead = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/leads/${id}`);
      setLead(response.data);
      setFormData(response.data);
    } catch (error) {
      if (error.response?.status === 404) {
        navigate('/leads');
      }
    } finally {
      setLoading(false);
    }
  };

  const fetchComments = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/leads/${id}/comments`);
      setComments(response.data);
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  };

  const fetchStaffList = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/leads/staff/list`);
      setStaffList(response.data);
    } catch (error) {
      console.error('Error fetching staff list:', error);
    }
  };

  const handleSave = async () => {
    try {
      if (id === 'new') {
        await axios.post(`${API_BASE_URL}/api/leads`, formData);
        navigate('/leads');
      } else {
        await axios.put(`${API_BASE_URL}/api/leads/${id}`, formData);
        await fetchLead();
        setEditing(false);
      }
    } catch (error) {
      alert(error.response?.data?.error || 'Error saving lead');
    }
  };

  const handleAddComment = async () => {
    if (!newComment.trim()) return;

    try {
      await axios.post(`${API_BASE_URL}/api/leads/${id}/comments`, {
        text: newComment,
      });
      setNewComment('');
      fetchComments();
    } catch (error) {
      alert(error.response?.data?.error || 'Error adding comment');
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleHeaderFieldChange = async (e) => {
    const { name, value } = e.target;
    const updatedData = {
      ...formData,
      [name]: value,
    };
    
    setFormData(updatedData);
    
    // Auto-save header fields if not a new lead
    if (id !== 'new' && lead) {
      try {
        await axios.put(`${API_BASE_URL}/api/leads/${id}`, {
          [name]: value,
        });
        // Update lead state to reflect changes
        setLead({ ...lead, [name]: value });
      } catch (error) {
        console.error('Error auto-saving field:', error);
        alert('Error saving field. Please try again.');
        // Revert on error
        setFormData(formData);
      }
    }
  };

  if (loading) {
    return <div className="lead-detail-loading">Loading...</div>;
  }

  const canEdit = editing || id === 'new';
  const isNew = id === 'new';
  const canEditHeaderFields = !isNew && (user?.role === 'ADMIN' || (user?.role === 'STAFF' && lead?.assigned_staff_id === user.id));

  return (
    <div className="lead-detail">
      <div className="lead-detail-header">
        <div className="header-left">
          <button className="btn-back" onClick={() => navigate('/leads')}>
            <FiArrowLeft /> Back
          </button>
          <h1>{isNew ? 'Create New Lead' : lead?.name || 'Lead Details'}</h1>
        </div>
        {!isNew && (
          <button
            className="btn-edit"
            onClick={() => setEditing(!editing)}
            disabled={user?.role === 'STAFF' && lead?.assigned_staff_id !== user.id}
          >
            {editing ? 'Cancel' : 'Edit'}
          </button>
        )}
      </div>
      <div className="lead-header-fields">
        <div className="header-field-group">
          <label>Priority</label>
          {isNew ? (
            <select
              name="priority"
              value={formData.priority || ''}
              onChange={handleChange}
              className="header-field-select"
            >
              <option value="">Select Priority</option>
              <option value="cold">Cold</option>
              <option value="hot">Hot</option>
              <option value="warm">Warm</option>
              <option value="not interested">Not Interested</option>
              <option value="not eligible">Not Eligible</option>
            </select>
          ) : (
            <select
              name="priority"
              value={formData.priority || ''}
              onChange={handleHeaderFieldChange}
              disabled={!canEditHeaderFields}
              className="header-field-select"
            >
              <option value="">Select Priority</option>
              <option value="cold">Cold</option>
              <option value="hot">Hot</option>
              <option value="warm">Warm</option>
              <option value="not interested">Not Interested</option>
              <option value="not eligible">Not Eligible</option>
            </select>
          )}
        </div>
        <div className="header-field-group header-comment">
          <label>Comment</label>
          {isNew ? (
            <input
              type="text"
              name="comment"
              value={formData.comment || ''}
              onChange={handleChange}
              placeholder="Add a comment..."
              className="header-field-input"
            />
          ) : (
            <input
              type="text"
              name="comment"
              value={formData.comment || ''}
              onChange={handleHeaderFieldChange}
              disabled={!canEditHeaderFields}
              placeholder="Add a comment..."
              className="header-field-input"
            />
          )}
        </div>
        <div className="header-field-group">
          <label>Follow-up Date</label>
          {isNew ? (
            <input
              type="date"
              name="follow_up_date"
              value={formData.follow_up_date ? formData.follow_up_date.split('T')[0] : ''}
              onChange={handleChange}
              className="header-field-input"
            />
          ) : (
            <input
              type="date"
              name="follow_up_date"
              value={formData.follow_up_date ? formData.follow_up_date.split('T')[0] : ''}
              onChange={handleHeaderFieldChange}
              disabled={!canEditHeaderFields}
              className="header-field-input"
            />
          )}
        </div>
      </div>
      <div className="lead-detail-content">
        <div className="lead-detail-left">
          <div className="detail-section">
            <h2>Lead Information</h2>
            <div className="form-grid">
              <div className="form-group">
                <label>
                  <FiUser /> Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name || ''}
                  onChange={handleChange}
                  disabled={!canEdit}
                  required
                />
              </div>
              <div className="form-group">
                <label>
                  <FiPhone /> Phone Number *
                </label>
                <input
                  type="text"
                  name="phone_number"
                  value={formData.phone_number || ''}
                  onChange={handleChange}
                  disabled={!canEdit}
                  required
                />
              </div>
              <div className="form-group">
                <label>
                  <FiPhone /> WhatsApp Number
                </label>
                <input
                  type="text"
                  name="whatsapp_number"
                  value={formData.whatsapp_number || ''}
                  onChange={handleChange}
                  disabled={!canEdit}
                />
              </div>
              <div className="form-group">
                <label>
                  <FiMail /> Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email || ''}
                  onChange={handleChange}
                  disabled={!canEdit}
                />
              </div>
              <div className="form-group">
                <label>Age</label>
                <input
                  type="number"
                  name="age"
                  value={formData.age || ''}
                  onChange={handleChange}
                  disabled={!canEdit}
                />
              </div>
              <div className="form-group">
                <label>Occupation</label>
                <input
                  type="text"
                  name="occupation"
                  value={formData.occupation || ''}
                  onChange={handleChange}
                  disabled={!canEdit}
                />
              </div>
              <div className="form-group">
                <label>Status</label>
                <select
                  name="status"
                  value={formData.status || 'New'}
                  onChange={handleChange}
                  disabled={!canEdit}
                >
                  <option value="New">New</option>
                  <option value="Follow-up">Follow-up</option>
                  <option value="Under Processing">Under Processing</option>
                  <option value="Converted">Converted</option>
                  <option value="Closed / Rejected">Closed / Rejected</option>
                </select>
              </div>
              {user?.role === 'ADMIN' && (
                <div className="form-group">
                  <label>Assign To</label>
                  <select
                    name="assigned_staff_id"
                    value={formData.assigned_staff_id || ''}
                    onChange={handleChange}
                    disabled={!canEdit}
                  >
                    <option value="">Unassigned</option>
                    {staffList.map((staff) => (
                      <option key={staff.id} value={staff.id}>
                        {staff.name}
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </div>
            {canEdit && (
              <button className="btn-save" onClick={handleSave}>
                <FiSave /> {isNew ? 'Create Lead' : 'Save Changes'}
              </button>
            )}
          </div>
        </div>
        {!isNew && (
          <div className="lead-detail-right">
            <div className="comments-section">
              <h2>
                <FiMessageSquare /> Comments
              </h2>
              <div className="comment-input">
                <textarea
                  placeholder="Add a comment..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  rows="3"
                />
                <button onClick={handleAddComment} className="btn-add-comment">
                  Add Comment
                </button>
              </div>
              <div className="comments-list">
                {comments.length === 0 ? (
                  <p className="no-comments">No comments yet</p>
                ) : (
                  comments.map((comment) => (
                    <div key={comment.id} className="comment-item">
                      <div className="comment-header">
                        <span className="comment-author">{comment.author_name}</span>
                        <span className="comment-time">
                          {new Date(comment.created_at).toLocaleString()}
                        </span>
                      </div>
                      <div className="comment-text">{comment.text}</div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LeadDetail;
