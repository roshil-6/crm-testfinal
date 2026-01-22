const express = require('express');
const { body, validationResult } = require('express-validator');
const db = require('../config/database');
const { authenticate } = require('../middleware/auth');

const router = express.Router();

// Get all leads (with role-based filtering)
router.get('/', authenticate, async (req, res) => {
  try {
    const userId = req.user.id;
    const role = req.user.role;
    const { status, search } = req.query;

    const filter = {};
    
    // Determine accessible user IDs based on role
    let accessibleUserIds = null;
    if (role === 'ADMIN') {
      // Admin sees all
      accessibleUserIds = null;
    } else if (role === 'SALES_TEAM_HEAD') {
      // Sales team head sees themselves + only their team members (those managed by them)
      const teamMembers = db.getUsers({ managed_by: userId });
      accessibleUserIds = [userId, ...teamMembers.map(u => u.id)];
    } else if (role === 'SALES_TEAM' || role === 'PROCESSING') {
      // Sales team and processing see only their own
      accessibleUserIds = [userId];
    } else if (role === 'STAFF') {
      // Legacy STAFF role
      accessibleUserIds = [userId];
    } else {
      accessibleUserIds = [userId];
    }
    
    // Apply role-based filtering
    if (accessibleUserIds && accessibleUserIds.length === 1) {
      filter.assigned_staff_id = accessibleUserIds[0];
    }

    if (status) {
      filter.status = status;
    }

    if (search) {
      filter.search = search;
    }

    let leads = db.getLeads(filter);
    
    // If multiple accessible users, filter leads
    if (accessibleUserIds && accessibleUserIds.length > 1) {
      leads = leads.filter(lead => 
        !lead.assigned_staff_id || accessibleUserIds.includes(lead.assigned_staff_id)
      );
    }

    // Add assigned staff name
    leads = leads.map(lead => ({
      ...lead,
      assigned_staff_name: lead.assigned_staff_id ? db.getUserName(lead.assigned_staff_id) : null,
    }));

    res.json(leads);
  } catch (error) {
    console.error('Get leads error:', error);
    res.status(500).json({ error: 'Server error', details: error.message });
  }
});

// Get single lead
router.get('/:id', authenticate, async (req, res) => {
  try {
    const userId = req.user.id;
    const role = req.user.role;
    const leadId = parseInt(req.params.id);

    const filter = { id: leadId };
    
    // CRITICAL: Non-admin roles can only see their own leads (or team leads for heads)
    if (role === 'STAFF' || role === 'SALES_TEAM' || role === 'PROCESSING') {
      filter.assigned_staff_id = userId;
    } else if (role === 'SALES_TEAM_HEAD') {
      // Sales team head can see their own and their team's leads
      const teamMembers = db.getUsers({ managed_by: userId });
      const accessibleIds = [userId, ...teamMembers.map(u => u.id)];
      // We'll filter after fetching
    }

    let leads = db.getLeads(filter);
    
    // Apply team head filtering if needed
    if (role === 'SALES_TEAM_HEAD') {
      const teamMembers = db.getUsers({ managed_by: userId });
      const accessibleIds = [userId, ...teamMembers.map(u => u.id)];
      leads = leads.filter(l => !l.assigned_staff_id || accessibleIds.includes(l.assigned_staff_id));
    }
    
    const lead = leads[0];

    if (!lead) {
      return res.status(404).json({ error: 'Lead not found' });
    }

    // Add assigned staff name
    const leadWithStaff = {
      ...lead,
      assigned_staff_name: lead.assigned_staff_id ? db.getUserName(lead.assigned_staff_id) : null,
    };

    res.json(leadWithStaff);
  } catch (error) {
    console.error('Get lead error:', error);
    res.status(500).json({ error: 'Server error', details: error.message });
  }
});

// Create new lead
router.post(
  '/',
  authenticate,
  [
    body('name').notEmpty().withMessage('Name is required'),
    body('phone_number').notEmpty().withMessage('Phone number is required'),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const userId = req.user.id;
      const role = req.user.role;
      const {
        name,
        phone_number,
        whatsapp_number,
        email,
        age,
        occupation,
        status = 'New',
        assigned_staff_id,
        priority,
        comment,
        follow_up_date,
      } = req.body;

      // CRITICAL: Non-admin roles can only assign leads to themselves (or their team for heads)
      let finalAssignedStaffId = assigned_staff_id;
      if (role === 'STAFF' || role === 'SALES_TEAM' || role === 'PROCESSING') {
        finalAssignedStaffId = userId;
      } else if (role === 'SALES_TEAM_HEAD') {
        // Sales team head can assign to themselves or their team members
        if (assigned_staff_id && assigned_staff_id !== userId) {
          const teamMembers = db.getUsers({ managed_by: userId, id: assigned_staff_id });
          if (teamMembers.length === 0) {
            return res.status(400).json({ error: 'Can only assign to yourself or your team members' });
          }
        } else {
          finalAssignedStaffId = userId;
        }
      } else if (role === 'ADMIN') {
        // ADMIN can assign to any staff or leave null
        if (assigned_staff_id) {
          const staffUsers = db.getUsers({ id: assigned_staff_id });
          if (staffUsers.length === 0) {
            return res.status(400).json({ error: 'Invalid staff member' });
          }
        }
      }

      // Check for duplicate phone/email
      const allLeads = db.getLeads();
      const duplicate = allLeads.find(l => 
        l.phone_number === phone_number || 
        (email && l.email === email)
      );

      if (duplicate) {
        return res.status(400).json({ error: 'Lead with this phone number or email already exists' });
      }

      const newLead = db.createLead({
        name,
        phone_number,
        whatsapp_number: whatsapp_number || null,
        email: email || null,
        age: age || null,
        occupation: occupation || null,
        status,
        assigned_staff_id: finalAssignedStaffId || null,
        priority: priority || null,
        comment: comment || null,
        follow_up_date: follow_up_date || null,
        created_by: userId,
      });

      // Create notification if admin assigns lead to staff
      if (role === 'ADMIN' && finalAssignedStaffId) {
        db.createNotification({
          user_id: finalAssignedStaffId,
          lead_id: newLead.id,
          type: 'lead_assigned',
          message: `Lead "${name}" has been assigned to you`,
          created_by: userId,
        });
      }

      res.status(201).json(newLead);
    } catch (error) {
      console.error('Create lead error:', error);
      res.status(500).json({ error: 'Server error', details: error.message });
    }
  }
);

// Update lead
router.put('/:id', authenticate, async (req, res) => {
  try {
    const userId = req.user.id;
    const role = req.user.role;
    const leadId = parseInt(req.params.id);

    // Check if lead exists and user has access
    let filter = { id: leadId };
    if (role === 'STAFF' || role === 'SALES_TEAM' || role === 'PROCESSING') {
      filter.assigned_staff_id = userId;
    } else if (role === 'SALES_TEAM_HEAD') {
      // Sales team head can update their own and their team's leads
      const teamMembers = db.getUsers({ managed_by: userId });
      const accessibleIds = [userId, ...teamMembers.map(u => u.id)];
      // We'll filter after fetching
    }

    let existingLeads = db.getLeads(filter);
    
    // Apply team head filtering if needed
    if (role === 'SALES_TEAM_HEAD') {
      const teamMembers = db.getUsers({ managed_by: userId });
      const accessibleIds = [userId, ...teamMembers.map(u => u.id)];
      existingLeads = existingLeads.filter(l => !l.assigned_staff_id || accessibleIds.includes(l.assigned_staff_id));
    }
    
    const existingLead = existingLeads[0];

    if (!existingLead) {
      return res.status(404).json({ error: 'Lead not found' });
    }

    const {
      name,
      phone_number,
      whatsapp_number,
      email,
      age,
      occupation,
      status,
      assigned_staff_id,
      priority,
      comment,
      follow_up_date,
    } = req.body;

    const updates = {};

    if (name !== undefined) updates.name = name;
    if (phone_number !== undefined) updates.phone_number = phone_number;
    if (whatsapp_number !== undefined) updates.whatsapp_number = whatsapp_number;
    if (email !== undefined) updates.email = email;
    if (age !== undefined) updates.age = age;
    if (occupation !== undefined) updates.occupation = occupation;
    if (status !== undefined) updates.status = status;
    if (priority !== undefined) updates.priority = priority;
    if (comment !== undefined) updates.comment = comment;
    if (follow_up_date !== undefined) updates.follow_up_date = follow_up_date;

    // Only ADMIN and SALES_TEAM_HEAD can change assigned_staff_id
    if (assigned_staff_id !== undefined && (role === 'ADMIN' || role === 'SALES_TEAM_HEAD')) {
      if (assigned_staff_id) {
        if (role === 'SALES_TEAM_HEAD') {
          // Sales team head can only assign to themselves or their team
          const teamMembers = db.getUsers({ managed_by: userId, id: assigned_staff_id });
          if (assigned_staff_id !== userId && teamMembers.length === 0) {
            return res.status(400).json({ error: 'Can only assign to yourself or your team members' });
          }
        } else if (role === 'ADMIN') {
          const staffUsers = db.getUsers({ id: assigned_staff_id });
          if (staffUsers.length === 0) {
            return res.status(400).json({ error: 'Invalid staff member' });
          }
        }
      }
      
      // Create notification if admin assigns lead to staff (and assignment changed)
      if (role === 'ADMIN' && assigned_staff_id && existingLead.assigned_staff_id !== assigned_staff_id) {
        const assignedStaff = db.getUsers({ id: assigned_staff_id })[0];
        if (assignedStaff) {
          db.createNotification({
            user_id: assigned_staff_id,
            lead_id: leadId,
            type: 'lead_assigned',
            message: `Lead "${existingLead.name}" has been assigned to you`,
            created_by: userId,
          });
        }
      }
      
      updates.assigned_staff_id = assigned_staff_id;
    }

    const updatedLead = db.updateLead(leadId, updates);
    
    if (!updatedLead) {
      return res.status(404).json({ error: 'Lead not found' });
    }

    res.json(updatedLead);
  } catch (error) {
    console.error('Update lead error:', error);
    res.status(500).json({ error: 'Server error', details: error.message });
  }
});

// Get comments for a lead
router.get('/:id/comments', authenticate, async (req, res) => {
  try {
    const userId = req.user.id;
    const role = req.user.role;
    const leadId = parseInt(req.params.id);

    // Check if user has access to this lead
    let filter = { id: leadId };
    if (role === 'STAFF' || role === 'SALES_TEAM' || role === 'PROCESSING') {
      filter.assigned_staff_id = userId;
    } else if (role === 'SALES_TEAM_HEAD') {
      // Sales team head can see their own and their team's leads
      const teamMembers = db.getUsers({ managed_by: userId });
      const accessibleIds = [userId, ...teamMembers.map(u => u.id)];
      // We'll filter after fetching
    }

    let leads = db.getLeads(filter);
    
    // Apply team head filtering if needed
    if (role === 'SALES_TEAM_HEAD') {
      const teamMembers = db.getUsers({ managed_by: userId });
      const accessibleIds = [userId, ...teamMembers.map(u => u.id)];
      leads = leads.filter(l => !l.assigned_staff_id || accessibleIds.includes(l.assigned_staff_id));
    }
    
    if (leads.length === 0) {
      return res.status(404).json({ error: 'Lead not found' });
    }

    const comments = db.getComments(leadId);
    
    // Add author names
    const commentsWithAuthors = comments.map(comment => ({
      ...comment,
      author_name: db.getUserName(comment.author_id) || 'Unknown',
    }));

    res.json(commentsWithAuthors);
  } catch (error) {
    console.error('Get comments error:', error);
    res.status(500).json({ error: 'Server error', details: error.message });
  }
});

// Add comment to a lead
router.post('/:id/comments', authenticate, async (req, res) => {
  try {
    const userId = req.user.id;
    const role = req.user.role;
    const leadId = parseInt(req.params.id);
    const { text } = req.body;

    if (!text || text.trim().length === 0) {
      return res.status(400).json({ error: 'Comment text is required' });
    }

    // Check if user has access to this lead
    let filter = { id: leadId };
    if (role === 'STAFF' || role === 'SALES_TEAM' || role === 'PROCESSING') {
      filter.assigned_staff_id = userId;
    } else if (role === 'SALES_TEAM_HEAD') {
      // Sales team head can see their own and their team's leads
      const teamMembers = db.getUsers({ managed_by: userId });
      const accessibleIds = [userId, ...teamMembers.map(u => u.id)];
      // We'll filter after fetching
    }

    let leads = db.getLeads(filter);
    
    // Apply team head filtering if needed
    if (role === 'SALES_TEAM_HEAD') {
      const teamMembers = db.getUsers({ managed_by: userId });
      const accessibleIds = [userId, ...teamMembers.map(u => u.id)];
      leads = leads.filter(l => !l.assigned_staff_id || accessibleIds.includes(l.assigned_staff_id));
    }
    
    if (leads.length === 0) {
      return res.status(404).json({ error: 'Lead not found or access denied' });
    }

    const comment = db.createComment({
      lead_id: leadId,
      author_id: userId,
      text: text.trim(),
    });

    // Add author name
    const commentWithAuthor = {
      ...comment,
      author_name: db.getUserName(userId) || 'Unknown',
    };

    res.status(201).json(commentWithAuthor);
  } catch (error) {
    console.error('Add comment error:', error);
    res.status(500).json({ error: 'Server error', details: error.message });
  }
});

// Get all staff members (for admin to assign leads)
router.get('/staff/list', authenticate, async (req, res) => {
  try {
    const role = req.user.role;

    if (role !== 'ADMIN') {
      return res.status(403).json({ error: 'Admin access required' });
    }

    // Get all non-admin users for lead assignment
    const allUsers = db.getUsers();
    const staff = allUsers.filter(u => u.role !== 'ADMIN');
    const staffList = staff.map(s => ({
      id: s.id,
      name: s.name,
      email: s.email,
    }));

    res.json(staffList);
  } catch (error) {
    console.error('Get staff list error:', error);
    res.status(500).json({ error: 'Server error', details: error.message });
  }
});

module.exports = router;
