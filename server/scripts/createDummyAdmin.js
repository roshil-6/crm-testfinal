const db = require('../config/database');
const bcrypt = require('bcryptjs');

async function createDummyAdmin() {
  try {
    console.log('Creating dummy admin user...\n');

    const email = 'admin@toniosenora.com';
    const password = 'admin123';
    const name = 'Dummy Admin';

    // Check if user already exists
    const existingUsers = db.getUsers({ email });
    if (existingUsers.length > 0) {
      console.log(`⚠️  User with email ${email} already exists!`);
      console.log(`   Name: ${existingUsers[0].name}`);
      console.log(`   Role: ${existingUsers[0].role}`);
      console.log(`   ID: ${existingUsers[0].id}`);
      
      // Update password if needed
      const hashedPassword = await bcrypt.hash(password, 10);
      db.updateUser(existingUsers[0].id, {
        password: hashedPassword,
        name: name,
        role: 'ADMIN',
        team: 'admin',
        updated_at: new Date().toISOString(),
      });
      console.log(`\n✅ Updated password for existing user!`);
      db.save();
      await new Promise(resolve => setTimeout(resolve, 500));
      console.log(`\n✅ Dummy admin user ready!`);
      console.log(`\n📧 Login Credentials:`);
      console.log(`   Email: ${email}`);
      console.log(`   Password: ${password}`);
      process.exit(0);
      return;
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const newUser = db.createUser({
      name: name,
      email: email,
      password: hashedPassword,
      role: 'ADMIN',
      team: 'admin',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    });

    console.log(`✅ Created: ${newUser.name} (${newUser.email}) - Role: ${newUser.role}`);
    console.log(`   ID: ${newUser.id}`);
    
    // Force save
    db.save();
    // Wait a moment to ensure file is written
    await new Promise(resolve => setTimeout(resolve, 500));
    
    console.log(`\n✅ Dummy admin user created and saved to database!`);
    console.log(`\n📧 Login Credentials:`);
    console.log(`   Email: ${email}`);
    console.log(`   Password: ${password}`);
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error creating dummy admin:', error);
    process.exit(1);
  }
}

createDummyAdmin();
