const db = require('../config/database');
const bcrypt = require('bcryptjs');

async function createDummyStaff() {
  try {
    console.log('Creating dummy staff account...\n');

    const email = 'abhinand@123.com';
    const password = '32123456';
    const name = 'Abhinand (Dummy Staff)';
    const role = 'STAFF';

    // Check if user already exists
    const existingUsers = db.getUsers({ email });
    if (existingUsers.length > 0) {
      console.log(`⏭️  User ${email} already exists. Updating password...`);
      const hashedPassword = await bcrypt.hash(password, 10);
      db.updateUser(existingUsers[0].id, { password: hashedPassword });
      console.log(`✅ Password updated for: ${name} (${email})`);
      console.log(`\nLogin credentials:`);
      console.log(`Email: ${email}`);
      console.log(`Password: ${password}`);
      process.exit(0);
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const newUser = db.createUser({
      name,
      email,
      password: hashedPassword,
      role,
      team: 'staff',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    });

    console.log(`✅ Created: ${newUser.name} (${newUser.email}) - Role: ${newUser.role}`);
    console.log(`\nLogin credentials:`);
    console.log(`Email: ${email}`);
    console.log(`Password: ${password}`);
    
    // Force save
    db.save();
    // Wait a moment to ensure file is written
    await new Promise(resolve => setTimeout(resolve, 500));
    console.log(`\n✅ Dummy staff account created and saved to database!`);
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error creating dummy staff:', error);
    process.exit(1);
  }
}

createDummyStaff();
