const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

// Update .env with Supabase connection
const password = 'wmEhA2J91dufKGXt';
const dbUrl = `postgresql://postgres:${password}@db.ecfjjffprxyelzxvuday.supabase.co:5432/postgres`;

const envPath = path.join(__dirname, '..', '.env');
let content = fs.readFileSync(envPath, 'utf8');

// Update or add DATABASE_URL
if (content.match(/DATABASE_URL=/)) {
  content = content.replace(/DATABASE_URL=.*/g, `DATABASE_URL=${dbUrl}`);
} else {
  content += `\nDATABASE_URL=${dbUrl}\n`;
}

fs.writeFileSync(envPath, content);
console.log('✅ Updated DATABASE_URL in .env file');

// Test connection
const { Pool } = require('pg');
const pool = new Pool({
  connectionString: dbUrl,
  connectionTimeoutMillis: 10000,
  ssl: { rejectUnauthorized: false }
});

console.log('\n🔍 Testing connection to Supabase...');

pool.query('SELECT NOW()')
  .then(() => {
    console.log('✅ Connection successful!');
    console.log('✅ Database is reachable');
    pool.end();
    process.exit(0);
  })
  .catch(err => {
    console.error('❌ Connection failed:', err.message);
    console.error('   Error code:', err.code);
    
    if (err.code === 'ENOTFOUND') {
      console.error('\n💡 Hostname not found. Possible solutions:');
      console.error('   1. Wait 2-5 minutes if project was just created');
      console.error('   2. Check Supabase dashboard - project should be "Active"');
      console.error('   3. Try using Connection Pooler from Supabase dashboard');
      console.error('   4. Verify connection string in Settings → Database');
    } else if (err.code === '28P01') {
      console.error('\n💡 Authentication failed. Check:');
      console.error('   1. Password is correct');
      console.error('   2. Connection string format is correct');
    }
    
    pool.end();
    process.exit(1);
  });
