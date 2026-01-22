const express = require('express');
const bcrypt = require('bcryptjs');
const { body, validationResult } = require('express-validator');
const db = require('../config/database');
const { authenticate, requireAdmin } = require('../middleware/auth');

const router = express.Router();

// Get all users (ADMIN only)
router.get('/', authenticate, requireAdmin, async (req, res) => {
  try {
    const users = db.getUsers();
    const userList = users.map(u => ({
      id: u.id,
      name: u.name,
      email: u.email,
      role: u.role,
      created_at: u.created_at,
    }));
    res.json(userList);
  } catch (error) {
    console.error('Get users error:', error);
    res.status(500).json({ error: 'Server error', details: error.message });
  }
});

// Create new user (ADMIN only)
router.post(
  '/',
  authenticate,
  requireAdmin,
  [
    body('name').notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Valid email is required'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
    body('role').isIn(['ADMIN', 'STAFF', 'SALES_TEAM', 'SALES_TEAM_HEAD', 'PROCESSING']).withMessage('Role must be ADMIN, STAFF, SALES_TEAM, SALES_TEAM_HEAD, or PROCESSING'),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { name, email, password, role } = req.body;
      const createdBy = req.user.id;

      // Check if email already exists
      const existingUsers = db.getUsers({ email });
      if (existingUsers.length > 0) {
        return res.status(400).json({ error: 'Email already exists' });
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create user
      const newUser = db.createUser({
        name,
        email,
        password: hashedPassword,
        role,
        created_by: createdBy,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      });

      // Log user creation activity
      logActivity({
        type: 'user_created',
        user_id: createdBy,
        target_user_id: newUser.id,
        details: `Created ${role} user: ${name} (${email})`,
      });

      // Return user without password
      const { password: _, ...userWithoutPassword } = newUser;
      res.status(201).json(userWithoutPassword);
    } catch (error) {
      console.error('Create user error:', error);
      res.status(500).json({ error: 'Server error', details: error.message });
    }
  }
);

// Update user (ADMIN only)
router.put('/:id', authenticate, requireAdmin, async (req, res) => {
  try {
    const userId = parseInt(req.params.id);
    const { name, email, password, role } = req.body;

    const users = db.getUsers({ id: userId });
    if (users.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    const existingUser = users[0];
    const updates = {};

    if (name !== undefined) updates.name = name;
    if (email !== undefined) {
      // Check if email is already taken by another user
      const emailUsers = db.getUsers({ email });
      if (emailUsers.length > 0 && emailUsers[0].id !== userId) {
        return res.status(400).json({ error: 'Email already exists' });
      }
      updates.email = email;
    }
    if (password !== undefined) {
      updates.password = await bcrypt.hash(password, 10);
    }
    if (role !== undefined) {
      updates.role = role;
    }

    const updatedUser = db.updateUser(userId, updates);
    if (!updatedUser) {
      return res.status(404).json({ error: 'User not found' });
    }
    const { password: _, ...userWithoutPassword } = updatedUser;

    // Log activity
    logActivity({
      type: 'user_updated',
      user_id: req.user.id,
      target_user_id: userId,
      details: `Updated user: ${updatedUser.name}`,
    });

    res.json(userWithoutPassword);
  } catch (error) {
    console.error('Update user error:', error);
    res.status(500).json({ error: 'Server error', details: error.message });
  }
});

// Delete user (ADMIN only)
router.delete('/:id', authenticate, requireAdmin, async (req, res) => {
  try {
    const userId = parseInt(req.params.id);

    // Prevent deleting yourself
    if (userId === req.user.id) {
      return res.status(400).json({ error: 'Cannot delete your own account' });
    }

    const users = db.getUsers({ id: userId });
    if (users.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    const userToDelete = users[0];

    // Remove user from database
    const dbData = db.db;
    const filteredUsers = dbData.users.filter(u => u.id !== userId);
    dbData.users = filteredUsers;
    db.save();

    // Log activity
    logActivity({
      type: 'user_deleted',
      user_id: req.user.id,
      target_user_id: userId,
      details: `Deleted user: ${userToDelete.name} (${userToDelete.email})`,
    });

    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Delete user error:', error);
    res.status(500).json({ error: 'Server error', details: error.message });
  }
});

// Get activity logs (ADMIN only)
router.get('/activity/logs', authenticate, requireAdmin, async (req, res) => {
  try {
    const logs = db.getActivityLogs();
    res.json(logs);
  } catch (error) {
    console.error('Get activity logs error:', error);
    res.status(500).json({ error: 'Server error', details: error.message });
  }
});

// Get login logs (ADMIN only)
router.get('/login/logs', authenticate, requireAdmin, async (req, res) => {
  try {
    const { email, success, limit = 100 } = req.query;
    const filter = {};
    if (email) filter.email = email;
    if (success !== undefined) filter.success = success === 'true';
    
    const logs = db.getLoginLogs(filter);
    const limitedLogs = logs.slice(0, parseInt(limit));
    res.json(limitedLogs);
  } catch (error) {
    console.error('Get login logs error:', error);
    res.status(500).json({ error: 'Server error', details: error.message });
  }
});

// Helper function to log activities
function logActivity(activity) {
  const dbData = db.db;
  if (!dbData.activityLogs) {
    dbData.activityLogs = [];
  }
  dbData.activityLogs.push({
    ...activity,
    timestamp: new Date().toISOString(),
  });
  db.save();
}

module.exports = router;
