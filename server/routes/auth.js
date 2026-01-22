const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../config/database');
const { authenticate } = require('../middleware/auth');

const router = express.Router();

// Helper function to log login attempts
function logLoginAttempt(email, success, reason, userId = null) {
  try {
    const dbData = db.db;
    if (!dbData.loginLogs) {
      dbData.loginLogs = [];
    }
    dbData.loginLogs.push({
      email,
      success,
      reason,
      user_id: userId,
      timestamp: new Date().toISOString(),
      ip_address: null, // Can be added if needed
    });
    
    // Keep only last 1000 login logs
    if (dbData.loginLogs.length > 1000) {
      dbData.loginLogs = dbData.loginLogs.slice(-1000);
    }
    
    db.save();
  } catch (error) {
    console.error('Error logging login attempt:', error);
  }
}

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      logLoginAttempt(email || 'unknown', false, 'Missing email or password');
      return res.status(400).json({ error: 'Email and password are required' });
    }

    const users = db.getUsers({ email });
    const user = users[0];

    if (!user) {
      logLoginAttempt(email, false, 'User not found');
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      logLoginAttempt(email, false, 'Invalid password', user.id);
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Successful login
    logLoginAttempt(email, true, 'Login successful', user.id);

    const token = jwt.sign(
      { userId: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error('Login error:', error);
    logLoginAttempt(req.body.email || 'unknown', false, 'Server error');
    res.status(500).json({ error: 'Server error' });
  }
});

// Get current user
router.get('/me', authenticate, async (req, res) => {
  res.json({
    id: req.user.id,
    name: req.user.name,
    email: req.user.email,
    role: req.user.role,
  });
});

module.exports = router;
