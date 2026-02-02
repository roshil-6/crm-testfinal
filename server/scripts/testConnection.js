const { Pool } = require('pg');
require('dotenv').config();

// Test both direct and pooler connections
const password = process.env.DATABASE_PASSWORD || 'wmEhA2J91dufKGXt';
const projectRef = 'ecfjjffprxyelzxvuday';

const connections = [
  {
    name: 'Direct Connection (Port 5432)',
    url: `postgresql://postgres:${password}@db.${projectRef}.supabase.co:5432/postgres`
  },
  {
    name: 'Connection Pooler (Port 6543) - Recommended',
    url: `postgresql://postgres.${projectRef}:${password}@aws-0-ap-southeast-1.pooler.supabase.com:6543/postgres?pgbouncer=true`
  },
  {
    name: 'Connection Pooler - US Region',
    url: `postgresql://postgres.${projectRef}:${password}@aws-0-us-east-1.pooler.supabase.com:6543/postgres?pgbouncer=true`
  },
  {
    name: 'Connection Pooler - EU Region',
    url: `postgresql://postgres.${projectRef}:${password}@aws-0-eu-west-1.pooler.supabase.com:6543/postgres?pgbouncer=true`
  }
];

async function testConnection(name, url) {
  console.log(`\n🔍 Testing: ${name}`);
  console.log(`   URL: ${url.replace(/:[^:@]+@/, ':****@')}`);
  
  const pool = new Pool({
    connectionString: url,
    connectionTimeoutMillis: 10000,
    ssl: { rejectUnauthorized: false }
  });
  
  try {
    const result = await pool.query('SELECT NOW()');
    console.log(`   ✅ SUCCESS! Connected to database`);
    console.log(`   Server time: ${result.rows[0].now}`);
    await pool.end();
    return { success: true, url };
  } catch (error) {
    console.log(`   ❌ FAILED: ${error.message}`);
    console.log(`   Error code: ${error.code}`);
    await pool.end();
    return { success: false, error: error.message, code: error.code };
  }
}

async function testAll() {
  console.log('🚀 Testing Supabase Connection Options...\n');
  
  for (const conn of connections) {
    const result = await testConnection(conn.name, conn.url);
    if (result.success) {
      console.log(`\n✅ WORKING CONNECTION FOUND!`);
      console.log(`\n📝 Update server/.env with:`);
      console.log(`DATABASE_URL=${conn.url}`);
      console.log(`\nThen run: npm run init-db`);
      return;
    }
  }
  
  console.log(`\n❌ All connection attempts failed.`);
  console.log(`\n💡 Next steps:`);
  console.log(`   1. Check Supabase dashboard - project should be "Active"`);
  console.log(`   2. Wait 2-5 minutes if project was just created`);
  console.log(`   3. Get exact connection string from Supabase Dashboard:`);
  console.log(`      Settings → Database → Connection pooling`);
  console.log(`   4. Verify your project region in Supabase dashboard`);
}

testAll().catch(console.error);
