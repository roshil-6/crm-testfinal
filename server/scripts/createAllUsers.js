const db = require('../config/database');
const bcrypt = require('bcryptjs');

async function createAllUsers() {
  try {
    console.log('Creating all users for Tonio & Senora CRM...\n');

    // First, create sales team heads (we need their IDs for team assignment)
    const salesTeamHeads = [
      { name: 'Varsha', email: 'varsha@toniosenora.com', password: 'varshasenora876', role: 'SALES_TEAM_HEAD', team: 'sales' },
      { name: 'Kiran', email: 'kiran@toniosenora.com', password: 'kiransenora098', role: 'SALES_TEAM_HEAD', team: 'sales' },
    ];

    const users = [
      // Sales Team - assigned to Varsha (first 3) and Kiran (last 2)
      // Note: managed_by will be set after heads are created
      { name: 'Emy', email: 'emy@toniosenora.com', password: 'emysenora321', role: 'SALES_TEAM', team: 'sales', managed_by_email: 'varsha@toniosenora.com' },
      { name: 'Shilpa', email: 'shilpa@toniosenora.com', password: 'shilpasenora432', role: 'SALES_TEAM', team: 'sales', managed_by_email: 'varsha@toniosenora.com' },
      { name: 'Asna', email: 'asna@toniosenora.com', password: 'asnasenora543', role: 'SALES_TEAM', team: 'sales', managed_by_email: 'varsha@toniosenora.com' },
      { name: 'Karthika', email: 'karthika@toniosenora.com', password: 'karthikasenora654', role: 'SALES_TEAM', team: 'sales', managed_by_email: 'kiran@toniosenora.com' },
      { name: 'Jibina', email: 'jibina@toniosenora.com', password: 'jibinasenora765', role: 'SALES_TEAM', team: 'sales', managed_by_email: 'kiran@toniosenora.com' },
      
      // Processing
      { name: 'Kripa', email: 'kripa@toniosenora.com', password: 'kripasenora325', role: 'PROCESSING', team: 'processing' },
      
      // Admins (Full Access) - These also act as Sales Team Admin
      { name: 'ROJISHA', email: 'rojishahead@toniosenora.com', password: 'rojishasenoramain000', role: 'ADMIN', team: 'admin' },
      { name: 'SREELAKSHMI', email: 'sreelakshmi@toniosenora.com', password: 'sreelakshmisenora000', role: 'ADMIN', team: 'admin' },
      { name: 'SHEELA', email: 'sheela@toniosenora.com', password: 'sheelasenorasub000', role: 'ADMIN', team: 'admin' },
      { name: 'SNEHA', email: 'sneha@toniosenora.com', password: 'snehasenora010', role: 'ADMIN', team: 'admin' },
    ];

    // Create sales team heads first
    const headIdMap = {}; // email -> id mapping
    for (const headData of salesTeamHeads) {
      const existingUsers = db.getUsers({ email: headData.email });
      if (existingUsers.length > 0) {
        console.log(`⏭️  Skipped: ${headData.name} (${headData.email}) - already exists`);
        headIdMap[headData.email] = existingUsers[0].id;
        continue;
      }

      const hashedPassword = await bcrypt.hash(headData.password, 10);
      const newUser = db.createUser({
        name: headData.name,
        email: headData.email,
        password: hashedPassword,
        role: headData.role,
        team: headData.team,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      });

      headIdMap[headData.email] = newUser.id;
      console.log(`✅ Created: ${newUser.name} (${newUser.email}) - Role: ${newUser.role}`);
    }

    let created = 0;
    let skipped = 0;

    // Now create all other users
    for (const userData of users) {
      // Check if user already exists
      const existingUsers = db.getUsers({ email: userData.email });
      if (existingUsers.length > 0) {
        console.log(`⏭️  Skipped: ${userData.name} (${userData.email}) - already exists`);
        skipped++;
        continue;
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(userData.password, 10);

      // Prepare user object
      const userObj = {
        name: userData.name,
        email: userData.email,
        password: hashedPassword,
        role: userData.role,
        team: userData.team,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };

      // Add managed_by if specified
      if (userData.managed_by_email && headIdMap[userData.managed_by_email]) {
        userObj.managed_by = headIdMap[userData.managed_by_email];
      }

      // Create user
      const newUser = db.createUser(userObj);

      console.log(`✅ Created: ${newUser.name} (${newUser.email}) - Role: ${newUser.role}${newUser.managed_by ? ` (Managed by: ${userData.managed_by_email})` : ''}`);
      created++;
    }

    console.log(`\n📊 Summary:`);
    console.log(`   Created: ${created} users`);
    console.log(`   Skipped: ${skipped} users (already exist)`);
    console.log(`\n✅ User creation completed!`);
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error creating users:', error);
    process.exit(1);
  }
}

createAllUsers();
