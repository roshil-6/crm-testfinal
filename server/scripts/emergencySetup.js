const fs = require('fs');
const path = require('path');
const { Pool } = require('pg');

const envPath = path.join(__dirname, '..', '.env');
const connectionString = process.argv[2];

if (!connectionString) {
  console.log('❌ No connection string provided!');
  console.log('\nUsage: node scripts/emergencySetup.js "YOUR_CONNECTION_STRING"');
  process.exit(1);
}

console.log('🚨 EMERGENCY SETUP - Getting you running FAST!\n');

// Update .env
let envContent = '';
if (fs.existsSync(envPath)) {
  envContent = fs.readFileSync(envPath, 'utf8');
}

if (envContent.match(/DATABASE_URL=/)) {
  envContent = envContent.replace(/DATABASE_URL=.*/g, `DATABASE_URL=${connectionString}`);
} else {
  envContent += `\nDATABASE_URL=${connectionString}\n`;
}

// Ensure other vars
if (!envContent.includes('JWT_SECRET=')) {
  envContent += `JWT_SECRET=your-secret-key-change-this\n`;
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
console.log('🔍 Testing connection...');
const pool = new Pool({
  connectionString: connectionString,
  connectionTimeoutMillis: 10000,
  ssl: { rejectUnauthorized: false }
});

pool.query('SELECT NOW()')
  .then(() => {
    console.log('✅ Connection successful!\n');
    console.log('📋 Next steps:');
    console.log('   1. npm run init-db');
    console.log('   2. npm run migrate-columns');
    console.log('   3. npm start');
    pool.end();
    process.exit(0);
  })
  .catch(error => {
    console.error('❌ Connection failed:', error.message);
    console.error('\n💡 Check your connection string and try again');
    pool.end();
    process.exit(1);
  });
