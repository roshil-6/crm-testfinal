const fs = require('fs');
const path = require('path');
const { Pool } = require('pg');
require('dotenv').config();

const envPath = path.join(__dirname, '..', '.env');

console.log('🚂 Railway Database Setup\n');

// Get password from command line or construct connection string
const password = process.argv[2];
const host = 'trolley.proxy.rlwy.net';
const port = '27359';
const database = 'railway';
const user = 'postgres';

if (!password) {
  console.log('❌ Password required!');
  console.log('\nUsage:');
  console.log('  node scripts/setupRailway.js YOUR_PASSWORD');
  console.log('\nOr provide full connection string:');
  console.log('  node scripts/setupRailway.js "postgresql://postgres:PASSWORD@trolley.proxy.rlwy.net:27359/railway"');
  console.log('\n💡 To get password:');
  console.log('  Railway Dashboard → PostgreSQL → Variables tab → PGPASSWORD');
  process.exit(1);
}

// Check if it's a full connection string or just password
let connectionString;
if (password.startsWith('postgresql://')) {
  connectionString = password;
} else {
  connectionString = `postgresql://${user}:${password}@${host}:${port}/${database}`;
}

console.log('📝 Updating server/.env...');

// Read current .env
let envContent = '';
if (fs.existsSync(envPath)) {
  envContent = fs.readFileSync(envPath, 'utf8');
}

// Update DATABASE_URL
if (envContent.match(/DATABASE_URL=/)) {
  envContent = envContent.replace(/DATABASE_URL=.*/g, `DATABASE_URL=${connectionString}`);
} else {
  envContent += `\nDATABASE_URL=${connectionString}\n`;
}

// Ensure other vars
if (!envContent.includes('JWT_SECRET=')) {
  envContent += `JWT_SECRET=your-secret-key-change-this-in-production\n`;
}
if (!envContent.includes('NODE_ENV=')) {
  envContent += `NODE_ENV=production\n`;
}
if (!envContent.includes('PORT=')) {
  envContent += `PORT=5001\n`;
}

fs.writeFileSync(envPath, envContent);
console.log('✅ Updated server/.env');

// Test connection
console.log('\n🔍 Testing connection...');
const pool = new Pool({
  connectionString: connectionString,
  connectionTimeoutMillis: 15000,
  ssl: { rejectUnauthorized: false }
});

pool.query('SELECT NOW() as current_time, version() as pg_version')
  .then(result => {
    console.log('✅ Connection successful!');
    console.log(`   Server time: ${result.rows[0].current_time}`);
    console.log(`   PostgreSQL: ${result.rows[0].pg_version.split(' ')[0]} ${result.rows[0].pg_version.split(' ')[1]}`);
    pool.end();
    
    console.log('\n✅ Setup complete!');
    console.log('\n📋 Next steps:');
    console.log('   1. npm run init-db');
    console.log('   2. npm run migrate-columns');
    console.log('   3. npm start');
    process.exit(0);
  })
  .catch(error => {
    console.error('❌ Connection failed:', error.message);
    if (error.code === '28P01') {
      console.error('\n💡 Authentication failed. Check:');
      console.error('   - Password is correct');
      console.error('   - Get password from Railway Dashboard → Variables → PGPASSWORD');
    }
    pool.end();
    process.exit(1);
  });
