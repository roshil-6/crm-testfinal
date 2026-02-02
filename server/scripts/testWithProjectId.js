const { Pool } = require('pg');
const dns = require('dns');
require('dotenv').config();

// Force IPv4 resolution first
dns.setDefaultResultOrder('ipv4first');

const password = 'wmEhA2J91dufKGXt';
const projectId = 'ecfjjffprxyelzxvuday';

// Try all possible connection formats
const connections = [
  {
    name: 'Direct Connection (Port 5432)',
    url: `postgresql://postgres:${password}@db.${projectId}.supabase.co:5432/postgres`
  },
  {
    name: 'Connection Pooler - Transaction Mode (Port 6543)',
    url: `postgresql://postgres.${projectId}:${password}@aws-0-ap-southeast-1.pooler.supabase.com:6543/postgres?pgbouncer=true`
  },
  {
    name: 'Connection Pooler - Session Mode (Port 5432)',
    url: `postgresql://postgres.${projectId}:${password}@aws-0-ap-southeast-1.pooler.supabase.com:5432/postgres?pgbouncer=true`
  },
  {
    name: 'Connection Pooler - US East (Port 6543)',
    url: `postgresql://postgres.${projectId}:${password}@aws-0-us-east-1.pooler.supabase.com:6543/postgres?pgbouncer=true`
  },
  {
    name: 'Connection Pooler - EU West (Port 6543)',
    url: `postgresql://postgres.${projectId}:${password}@aws-0-eu-west-1.pooler.supabase.com:6543/postgres?pgbouncer=true`
  },
  {
    name: 'Connection Pooler - EU Central (Port 6543)',
    url: `postgresql://postgres.${projectId}:${password}@aws-0-eu-central-1.pooler.supabase.com:6543/postgres?pgbouncer=true`
  },
  {
    name: 'Connection Pooler - US West (Port 6543)',
    url: `postgresql://postgres.${projectId}:${password}@aws-0-us-west-1.pooler.supabase.com:6543/postgres?pgbouncer=true`
  }
];

async function testConnection(name, url) {
  console.log(`\n🔍 Testing: ${name}`);
  
  const pool = new Pool({
    connectionString: url,
    connectionTimeoutMillis: 15000,
    ssl: { rejectUnauthorized: false }
  });
  
  try {
    const result = await pool.query('SELECT NOW() as current_time, version() as pg_version');
    console.log(`   ✅ SUCCESS! Connected to database`);
    console.log(`   Server time: ${result.rows[0].current_time}`);
    console.log(`   PostgreSQL: ${result.rows[0].pg_version.split(' ')[0]} ${result.rows[0].pg_version.split(' ')[1]}`);
    await pool.end();
    return { success: true, url, name };
  } catch (error) {
    console.log(`   ❌ FAILED: ${error.message}`);
    if (error.code) console.log(`   Error code: ${error.code}`);
    await pool.end();
    return { success: false, error: error.message, code: error.code };
  }
}

async function testAll() {
  console.log('🚀 Testing All Connection Formats for Project:', projectId);
  console.log('📝 Testing with IPv4 preference enabled...\n');
  
  const results = [];
  
  for (const conn of connections) {
    const result = await testConnection(conn.name, conn.url);
    results.push({ ...result, name: conn.name });
    
    if (result.success) {
      console.log(`\n✅ WORKING CONNECTION FOUND!`);
      console.log(`\n📝 Update server/.env with:`);
      console.log(`DATABASE_URL=${conn.url}`);
      console.log(`\nThen run:`);
      console.log(`  npm run init-db`);
      console.log(`  npm run migrate-columns`);
      console.log(`  npm start`);
      return result;
    }
    
    // Small delay between attempts
    await new Promise(resolve => setTimeout(resolve, 500));
  }
  
  console.log(`\n❌ All connection attempts failed.`);
  console.log(`\n📊 Summary:`);
  results.forEach(r => {
    const status = r.success ? '✅' : '❌';
    const code = r.code ? ` (${r.code})` : '';
    console.log(`  ${status} ${r.name}${code}`);
  });
  
  console.log(`\n💡 Next Steps:`);
  console.log(`   1. Go to Supabase Dashboard → Settings → Database`);
  console.log(`   2. Check "Connection pooling" section`);
  console.log(`   3. Copy the EXACT connection string shown there`);
  console.log(`   4. Verify your project region in Supabase dashboard`);
  console.log(`   5. Make sure project status is "Active"`);
  
  return null;
}

testAll().catch(console.error);
