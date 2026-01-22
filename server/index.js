const express = require('express');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/auth');
const dashboardRoutes = require('./routes/dashboard');
const leadsRoutes = require('./routes/leads');
const attendanceRoutes = require('./routes/attendance');
const usersRoutes = require('./routes/users');
const notificationsRoutes = require('./routes/notifications');
const db = require('./config/database');

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors());
app.use(express.json());

// Test database connection
try {
  db.getUsers();
  console.log('✅ JSON database connected successfully');
  console.log(`📁 Database file: server/data/crm.json`);
} catch (err) {
  console.error('❌ Database connection error:', err.message);
}

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/leads', leadsRoutes);
app.use('/api/attendance', attendanceRoutes);
app.use('/api/users', usersRoutes);
app.use('/api/notifications', notificationsRoutes);

// Health check
app.get('/api/health', async (req, res) => {
  try {
    db.getUsers();
    res.json({ status: 'ok', database: 'connected', type: 'JSON' });
  } catch (error) {
    res.status(503).json({ status: 'error', database: 'disconnected', error: error.message });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).json({ error: 'Internal server error', message: err.message });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📡 API available at http://localhost:${PORT}/api`);
});
