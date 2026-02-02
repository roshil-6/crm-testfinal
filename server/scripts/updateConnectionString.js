const fs = require('fs');
const path = require('path');
const { Pool } = require('pg');
const dns = require('dns');

// Force IPv4 resolution first
dns.setDefaultResultOrder('ipv4first');

const envPath = path.join(__dirname, '..', '.env');

console.log('🔧 Connection String Updater\n');
console.log('📋 Instructions:');
console.log('1. Go to Supabase Dashboard → Settings → Database');
console.log('2. Scroll to "Connection pooling" section');
console.log('3. Copy the connection string from there');
console.log('4. Paste it below (or press Enter to skip)\n');

// For automated testing, you can pass the connection string as argument
const connectionString = process.argv[2];

if (connectionString) {
  console.log('✅ Connection string provided via argument');
  updateAndTest(connectionString);
} else {
  // In interactive mode, we'd use readline, but for now, provide instructions
  console.log('💡 To update automatically, run:');
  console.log('   node scripts/updateConnectionString.js "YOUR_CONNECTION_STRING_HERE"');
  console.log('\n📝 Or manually update server/.env with:');
  console.log('   DATABASE_URL=your_connection_string_here');
  console.log('\nThen test with: node scripts/testWithProjectId.js');
}

async function updateAndTest(connString) {
  // Read current .env
  let content = '';
  if (fs.existsSync(envPath)) {
    content = fs.readFileSync(envPath, 'utf8');
  }
  
  // Update DATABASE_URL
  if (content.match(/DATABASE_URL=/)) {
    content = content.replace(/DATABASE_URL=.*/g, `DATABASE_URL=${connString}`);
  } else {
    content += `\nDATABASE_URL=${connString}\n`;
  }
  
  fs.writeFileSync(envPath, content);
  console.log('✅ Updated server/.env with connection string');
  
  // Test connection
  console.log('\n🔍 Testing connection...');
  const pool = new Pool({
    connectionString: connString,
    connectionTimeoutMillis: 15000,
    ssl: { rejectUnauthorized: false }
  });
  
  try {
    const result = await pool.query('SELECT NOW() as current_time, version() as pg_version');
    console.log('✅ Connection successful!');
    console.log(`   Server time: ${result.rows[0].current_time}`);
    console.log(`   PostgreSQL: ${result.rows[0].pg_version.split(' ')[0]} ${result.rows[0].pg_version.split(' ')[1]}`);
    await pool.end();
    
    console.log('\n✅ Ready to initialize database!');
    console.log('Run: npm run init-db');
    return true;
  } catch (error) {
    console.error('❌ Connection failed:', error.message);
    if (error.code) console.error('   Error code:', error.code);
    await pool.end();
    return false;
  }
}

// Export for use in other scripts
if (require.main === module && connectionString) {
  updateAndTest(connectionString).then(success => {
    process.exit(success ? 0 : 1);
  });
}

module.exports = { updateAndTest };
