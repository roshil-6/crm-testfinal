const bcrypt = require('bcryptjs');
const { Pool } = require('pg');
require('dotenv').config({ path: require('path').join(__dirname, '..', '.env') });

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

async function testLogin() {
  try {
    console.log('🔍 Testing Login System...\n');
    
    // Check JWT_SECRET
    if (!process.env.JWT_SECRET || process.env.JWT_SECRET.includes('your-secret') || process.env.JWT_SECRET.includes('change-this')) {
      console.log('❌ JWT_SECRET is not set or is using default value!');
      console.log('   This will cause login to fail.');
      console.log('   Update server/.env with a strong JWT_SECRET');
    } else {
      console.log('✅ JWT_SECRET is set');
    }
    
    // Get all users
    const result = await pool.query('SELECT id, name, email, role, password FROM users ORDER BY role, name');
    const users = result.rows;
    
    if (users.length === 0) {
      console.log('❌ No users found in database!');
      console.log('   Run: npm run create-all-users');
      await pool.end();
      return;
    }
    
    console.log(`\n📊 Found ${users.length} users in database:\n`);
    
    // Test login for each user
    const testCredentials = [
      { email: 'rojishahead@toniosenora.com', password: 'rojishasenoramain000' },
      { email: 'sneha@toniosenora.com', password: 'snehasenora010' },
      { email: 'varsha@toniosenora.com', password: 'varshasenora876' },
    ];
    
    for (const cred of testCredentials) {
      const user = users.find(u => u.email.toLowerCase() === cred.email.toLowerCase());
      
      if (!user) {
        console.log(`❌ User not found: ${cred.email}`);
        continue;
      }
      
      console.log(`\n🔍 Testing: ${user.name} (${user.email})`);
      console.log(`   Role: ${user.role}`);
      console.log(`   Password hash exists: ${user.password ? 'Yes' : 'No'}`);
      console.log(`   Password hash length: ${user.password ? user.password.length : 0}`);
      
      if (!user.password) {
        console.log(`   ❌ No password hash! User cannot login.`);
        continue;
      }
      
      // Test password
      try {
        const isValid = await bcrypt.compare(cred.password, user.password);
        if (isValid) {
          console.log(`   ✅ Password is correct! Login should work.`);
        } else {
          console.log(`   ❌ Password is INCORRECT!`);
          console.log(`   💡 Password might need to be reset.`);
        }
      } catch (error) {
        console.log(`   ❌ Error checking password: ${error.message}`);
      }
    }
    
    // Show all users
    console.log(`\n\n📋 All Users in Database:`);
    users.forEach(u => {
      console.log(`   ${u.name} (${u.email}) - ${u.role} - Password: ${u.password ? 'Set' : 'Missing'}`);
    });
    
    await pool.end();
  } catch (error) {
    console.error('❌ Error:', error.message);
    await pool.end();
    throw error;
  }
}

testLogin()
  .then(() => process.exit(0))
  .catch(() => process.exit(1));
