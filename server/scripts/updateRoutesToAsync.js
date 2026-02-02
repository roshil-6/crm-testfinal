/**
 * Helper script to identify remaining synchronous database calls
 * Run this to find all db.* calls that need await
 */

const fs = require('fs');
const path = require('path');

const routesDir = path.join(__dirname, '..', 'routes');
const files = fs.readdirSync(routesDir).filter(f => f.endsWith('.js'));

const patterns = [
  /db\.getUsers\(/g,
  /db\.getLeads\(/g,
  /db\.getClients\(/g,
  /db\.getComments\(/g,
  /db\.getAttendance\(/g,
  /db\.getNotifications\(/g,
  /db\.getEmailTemplates\(/g,
  /db\.getEmailLogs\(/g,
  /db\.getActivityLogs\(/g,
  /db\.getLoginLogs\(/g,
  /db\.createUser\(/g,
  /db\.createLead\(/g,
  /db\.createClient\(/g,
  /db\.createComment\(/g,
  /db\.createAttendance\(/g,
  /db\.createNotification\(/g,
  /db\.createEmailTemplate\(/g,
  /db\.createEmailLog\(/g,
  /db\.updateUser\(/g,
  /db\.updateLead\(/g,
  /db\.updateClient\(/g,
  /db\.updateAttendance\(/g,
  /db\.updateEmailTemplate\(/g,
  /db\.deleteUser\(/g,
  /db\.deleteLead\(/g,
  /db\.deleteClient\(/g,
  /db\.deleteEmailTemplate\(/g,
  /db\.getUserName\(/g,
  /db\.markNotificationAsRead\(/g,
  /db\.markAllNotificationsAsRead\(/g,
];

console.log('🔍 Scanning route files for synchronous database calls...\n');

files.forEach(file => {
  const filePath = path.join(routesDir, file);
  const content = fs.readFileSync(filePath, 'utf8');
  const lines = content.split('\n');
  
  let hasIssues = false;
  const issues = [];
  
  lines.forEach((line, index) => {
    patterns.forEach(pattern => {
      if (pattern.test(line) && !line.includes('await')) {
        hasIssues = true;
        issues.push({
          line: index + 1,
          content: line.trim(),
        });
      }
      pattern.lastIndex = 0; // Reset regex
    });
  });
  
  if (hasIssues) {
    console.log(`\n📄 ${file}:`);
    issues.forEach(issue => {
      console.log(`   Line ${issue.line}: ${issue.content.substring(0, 80)}...`);
    });
  }
});

console.log('\n✅ Scan complete!');
