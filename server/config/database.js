const fs = require('fs');
const path = require('path');

// Ensure data directory exists
const dataDir = path.join(__dirname, '..', 'data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

const dbFile = path.join(dataDir, 'crm.json');

// Initialize database structure
let db = {
  users: [],
  leads: [],
  comments: [],
  attendance: [],
  loginLogs: [],
  activityLogs: [],
  notifications: [],
  nextId: {
    users: 1,
    leads: 1,
    comments: 1,
    attendance: 1,
    notifications: 1,
  }
};

// Load database from file
function loadDatabase() {
  if (fs.existsSync(dbFile)) {
    try {
      const data = fs.readFileSync(dbFile, 'utf8');
      db = JSON.parse(data);
    } catch (err) {
      console.error('Error loading database:', err);
    }
  }
}

// Save database to file
function saveDatabase() {
  try {
    fs.writeFileSync(dbFile, JSON.stringify(db, null, 2));
  } catch (err) {
    console.error('Error saving database:', err);
  }
}

// Initialize on load
loadDatabase();

// Auto-save every 2 seconds
setInterval(saveDatabase, 2000);

// Save on process exit
process.on('exit', saveDatabase);
process.on('SIGINT', () => {
  saveDatabase();
  process.exit();
});

// Database API
const database = {
  // Users
  getUsers: (filter = {}) => {
    let users = [...db.users];
    if (filter.id) users = users.filter(u => u.id === filter.id);
    if (filter.email) users = users.filter(u => u.email === filter.email);
    if (filter.role) users = users.filter(u => u.role === filter.role);
    if (filter.team) users = users.filter(u => u.team === filter.team);
    if (filter.managed_by) users = users.filter(u => u.managed_by === filter.managed_by);
    return users;
  },
  
  getTeamMembers: (team) => {
    return db.users.filter(u => u.team === team);
  },
  
  createUser: (userData) => {
    const user = { ...userData, id: db.nextId.users++ };
    db.users.push(user);
    saveDatabase();
    return user;
  },
  
  updateUser: (id, updates) => {
    const index = db.users.findIndex(u => u.id === id);
    if (index === -1) return null;
    db.users[index] = { ...db.users[index], ...updates, updated_at: new Date().toISOString() };
    saveDatabase();
    return db.users[index];
  },
  
  // Leads
  getLeads: (filter = {}) => {
    let leads = [...db.leads];
    if (filter.id) leads = leads.filter(l => l.id === filter.id);
    if (filter.assigned_staff_id) leads = leads.filter(l => l.assigned_staff_id === filter.assigned_staff_id);
    if (filter.status) leads = leads.filter(l => l.status === filter.status);
    if (filter.search) {
      const search = filter.search.toLowerCase();
      leads = leads.filter(l => 
        l.name?.toLowerCase().includes(search) ||
        l.phone_number?.toLowerCase().includes(search) ||
        l.email?.toLowerCase().includes(search)
      );
    }
    return leads.sort((a, b) => new Date(b.updated_at || b.created_at) - new Date(a.updated_at || a.created_at));
  },
  
  createLead: (leadData) => {
    const lead = {
      ...leadData,
      id: db.nextId.leads++,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    db.leads.push(lead);
    saveDatabase();
    return lead;
  },
  
  updateLead: (id, updates) => {
    const index = db.leads.findIndex(l => l.id === id);
    if (index === -1) return null;
    db.leads[index] = { ...db.leads[index], ...updates, updated_at: new Date().toISOString() };
    saveDatabase();
    return db.leads[index];
  },
  
  // Comments
  getComments: (leadId) => {
    if (leadId === null || leadId === undefined) {
      return db.comments.sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
    }
    return db.comments
      .filter(c => c.lead_id === leadId)
      .sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
  },
  
  createComment: (commentData) => {
    const comment = {
      ...commentData,
      id: db.nextId.comments++,
      created_at: new Date().toISOString(),
    };
    db.comments.push(comment);
    saveDatabase();
    return comment;
  },
  
  // Attendance
  getAttendance: (filter = {}) => {
    let attendance = [...db.attendance];
    if (filter.user_id) attendance = attendance.filter(a => a.user_id === filter.user_id);
    if (filter.date) attendance = attendance.filter(a => a.date === filter.date);
    if (filter.startDate) attendance = attendance.filter(a => a.date >= filter.startDate);
    if (filter.endDate) attendance = attendance.filter(a => a.date <= filter.endDate);
    return attendance.sort((a, b) => new Date(b.date) - new Date(a.date));
  },
  
  createAttendance: (attendanceData) => {
    const attendance = {
      ...attendanceData,
      id: db.nextId.attendance++,
      created_at: new Date().toISOString(),
    };
    db.attendance.push(attendance);
    saveDatabase();
    return attendance;
  },
  
  updateAttendance: (id, updates) => {
    const index = db.attendance.findIndex(a => a.id === id);
    if (index === -1) return null;
    db.attendance[index] = { ...db.attendance[index], ...updates };
    saveDatabase();
    return db.attendance[index];
  },
  
  // Helper to get user name
  getUserName: (userId) => {
    const user = db.users.find(u => u.id === userId);
    return user?.name || null;
  },
  
  // Activity Logs
  getActivityLogs: (filter = {}) => {
    if (!db.activityLogs) db.activityLogs = [];
    let logs = [...db.activityLogs];
    if (filter.user_id) logs = logs.filter(l => l.user_id === filter.user_id);
    if (filter.type) logs = logs.filter(l => l.type === filter.type);
    return logs.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
  },
  
  getLoginLogs: (filter = {}) => {
    if (!db.loginLogs) db.loginLogs = [];
    let logs = [...db.loginLogs];
    if (filter.email) logs = logs.filter(l => l.email === filter.email);
    if (filter.success !== undefined) logs = logs.filter(l => l.success === filter.success);
    if (filter.user_id) logs = logs.filter(l => l.user_id === filter.user_id);
    return logs.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
  },
  
  // Notifications
  getNotifications: (filter = {}) => {
    if (!db.notifications) db.notifications = [];
    let notifications = [...db.notifications];
    if (filter.id) notifications = notifications.filter(n => n.id === filter.id);
    if (filter.user_id) notifications = notifications.filter(n => n.user_id === filter.user_id);
    if (filter.read !== undefined) notifications = notifications.filter(n => n.read === filter.read);
    return notifications.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
  },
  
  createNotification: (notificationData) => {
    if (!db.notifications) db.notifications = [];
    const notification = {
      ...notificationData,
      id: db.nextId.notifications++,
      read: false,
      created_at: new Date().toISOString(),
    };
    db.notifications.push(notification);
    saveDatabase();
    return notification;
  },
  
  markNotificationAsRead: (id) => {
    if (!db.notifications) db.notifications = [];
    const index = db.notifications.findIndex(n => n.id === id);
    if (index === -1) return null;
    db.notifications[index].read = true;
    db.notifications[index].read_at = new Date().toISOString();
    saveDatabase();
    return db.notifications[index];
  },
  
  markAllNotificationsAsRead: (userId) => {
    if (!db.notifications) db.notifications = [];
    const now = new Date().toISOString();
    db.notifications.forEach(n => {
      if (n.user_id === userId && !n.read) {
        n.read = true;
        n.read_at = now;
      }
    });
    saveDatabase();
    return db.notifications.filter(n => n.user_id === userId);
  },
  
  // Expose db object for direct access to logs
  get db() {
    return db;
  },
  
  // Save function
  save: saveDatabase,
};

module.exports = database;
