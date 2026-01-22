const jwt = require('jsonwebtoken');
const db = require('../config/database');

// Verify JWT token
const authenticate = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      return res.status(401).json({ error: 'Authentication required' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Verify user still exists
    const users = db.getUsers({ id: decoded.userId });
    const user = users[0];
    
    if (!user) {
      return res.status(401).json({ error: 'User not found' });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
};

// Check if user is ADMIN
const requireAdmin = (req, res, next) => {
  if (req.user.role !== 'ADMIN') {
    return res.status(403).json({ error: 'Admin access required' });
  }
  next();
};

// Check if user is STAFF
const requireStaff = (req, res, next) => {
  if (req.user.role !== 'STAFF') {
    return res.status(403).json({ error: 'Staff access required' });
  }
  next();
};

// Check if user is ADMIN or SALES_TEAM_ADMIN
const requireAdminOrSalesTeamAdmin = (req, res, next) => {
  if (req.user.role !== 'ADMIN' && req.user.role !== 'SALES_TEAM_ADMIN') {
    return res.status(403).json({ error: 'Admin or Sales Team Admin access required' });
  }
  next();
};

module.exports = {
  authenticate,
  requireAdmin,
  requireStaff,
  requireAdminOrSalesTeamAdmin,
};
