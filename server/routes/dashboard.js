const express = require('express');
const db = require('../config/database');
const { authenticate } = require('../middleware/auth');

const router = express.Router();

// Helper function to get accessible user IDs based on role
function getAccessibleUserIds(user) {
  const role = user.role;
  const userId = user.id;
  
  if (role === 'ADMIN') {
    // Admin sees everyone
    return null; // null means all users
  } else if (role === 'SALES_TEAM_HEAD') {
    // Sales team head sees themselves + only their team members (those managed by them)
    const teamMembers = db.getUsers({ managed_by: userId });
    return [userId, ...teamMembers.map(u => u.id)];
  } else if (role === 'SALES_TEAM' || role === 'PROCESSING') {
    // Sales team and processing see only themselves
    return [userId];
  } else if (role === 'STAFF') {
    // Legacy STAFF role - see only themselves
    return [userId];
  }
  
  return [userId]; // Default: only self
}

// Get dashboard data
router.get('/', authenticate, async (req, res) => {
  try {
    const userId = req.user.id;
    const role = req.user.role;
    const accessibleUserIds = getAccessibleUserIds(req.user);

    // Determine if this is a restricted view (not admin)
    const isRestrictedView = role !== 'ADMIN';

    if (isRestrictedView) {
      // Restricted view - only accessible leads
      let allLeads = [];
      if (accessibleUserIds) {
        accessibleUserIds.forEach(staffId => {
          const staffLeads = db.getLeads({ assigned_staff_id: staffId });
          allLeads = [...allLeads, ...staffLeads];
        });
      }
      
      const metrics = {
        totalLeads: allLeads.length,
        newLeads: allLeads.filter(l => l.status === 'New').length,
        followupLeads: allLeads.filter(l => l.status === 'Follow-up').length,
        processingLeads: allLeads.filter(l => l.status === 'Under Processing').length,
        convertedLeads: allLeads.filter(l => l.status === 'Converted').length,
        closedLeads: allLeads.filter(l => l.status === 'Closed / Rejected').length,
      };

      // Today's follow-ups
      const today = new Date().toISOString().split('T')[0];
      const todayFollowups = allLeads.filter(l => 
        l.status === 'Follow-up' && 
        (l.updated_at || l.created_at)?.split('T')[0] === today
      ).length;

      // Recent activity
      const recentLeads = allLeads
        .slice(0, 5)
        .map(l => ({
          type: 'status_change',
          lead_id: l.id,
          lead_name: l.name,
          status: l.status,
          timestamp: l.updated_at || l.created_at,
          user_name: db.getUserName(l.assigned_staff_id) || 'Unknown',
        }));

      const allComments = db.getComments(null);
      const userComments = allComments
        .filter(c => {
          const lead = db.getLeads({ id: c.lead_id })[0];
          return lead && lead.assigned_staff_id === userId;
        })
        .slice(0, 5)
        .map(c => {
          const lead = db.getLeads({ id: c.lead_id })[0];
          return {
            type: 'comment',
            lead_id: c.lead_id,
            lead_name: lead?.name || 'Unknown',
            status: null,
            timestamp: c.created_at,
            user_name: db.getUserName(c.author_id) || 'Unknown',
          };
        });

      const allActivity = [...recentLeads, ...userComments]
        .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
        .slice(0, 10);

      res.json({
        role: role,
        metrics: {
          ...metrics,
          todayFollowups,
        },
        recentActivity: allActivity,
      });
    } else {
      // ADMIN dashboard - company-wide data
      const allLeads = db.getLeads();
      const allUsers = db.getUsers();
      const allAttendance = db.getAttendance();

      const metrics = {
        totalLeads: allLeads.length,
        leadsByStatus: {
          'New': allLeads.filter(l => l.status === 'New').length,
          'Follow-up': allLeads.filter(l => l.status === 'Follow-up').length,
          'Under Processing': allLeads.filter(l => l.status === 'Under Processing').length,
          'Converted': allLeads.filter(l => l.status === 'Converted').length,
          'Closed / Rejected': allLeads.filter(l => l.status === 'Closed / Rejected').length,
        },
      };

      // Staff performance - show all non-admin users
      const staffUsers = allUsers.filter(u => u.role !== 'ADMIN');
      const staffPerformance = staffUsers.map(staff => {
        const staffLeads = allLeads.filter(l => l.assigned_staff_id === staff.id);
        return {
          id: staff.id,
          name: staff.name,
          total_leads: staffLeads.length,
          converted_leads: staffLeads.filter(l => l.status === 'Converted').length,
        };
      }).sort((a, b) => b.total_leads - a.total_leads);

      // Attendance overview (last 7 days)
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
      const recentAttendance = allAttendance.filter(a => 
        new Date(a.check_in) >= sevenDaysAgo
      );

      const attendanceByDate = {};
      recentAttendance.forEach(a => {
        const date = a.check_in.split('T')[0];
        if (!attendanceByDate[date]) {
          attendanceByDate[date] = new Set();
        }
        attendanceByDate[date].add(a.user_id);
      });

      const attendanceOverview = Object.entries(attendanceByDate)
        .map(([date, userIds]) => ({
          date,
          staff_count: userIds.size,
        }))
        .sort((a, b) => b.date.localeCompare(a.date));

      res.json({
        role: 'ADMIN',
        metrics,
        staffPerformance,
        attendanceOverview,
      });
    }
  } catch (error) {
    console.error('Dashboard error:', error);
    res.status(500).json({ error: 'Server error', details: error.message });
  }
});

module.exports = router;
