const { Pool } = require('pg');
const dns = require('dns');
require('dotenv').config();

// Force IPv4 resolution
dns.setDefaultResultOrder('ipv4first');

const password = 'wmEhA2J91dufKGXt';
const projectRef = 'ecfjjffprxyelzxvuday';

// Try different connection formats
const connections = [
  {
    name: 'Direct with IPv4 preference',
    url: `postgresql://postgres:${password}@db.${projectRef}.supabase.co:5432/postgres`
  },
  {
    name: 'Connection Pooler (Southeast Asia)',
    url: `postgresql://postgres.${projectRef}:${password}@aws-0-ap-southeast-1.pooler.supabase.com:6543/postgres?pgbouncer=true`
  },
  {
    name: 'Connection Pooler (US East)',
    url: `postgresql://postgres.${projectRef}:${password}@aws-0-us-east-1.pooler.supabase.com:6543/postgres?pgbouncer=true`
  },
  {
    name: 'Connection Pooler (EU West)',
    url: `postgresql://postgres.${projectRef}:${password}@aws-0-eu-west-1.pooler.supabase.com:6543/postgres?pgbouncer=true`
  }
];

async function resolveIPv4(hostname) {
  return new Promise((resolve, reject) => {
    dns.resolve4(hostname, (err, addresses) => {
      if (err) {
        // Try IPv6 as fallback
        dns.resolve6(hostname, (err6, addresses6) => {
          if (err6) reject(err6);
          else resolve({ type: 'ipv6', addresses: addresses6 });
        });
      } else {
        resolve({ type: 'ipv4', addresses });
      }
    });
  });
}

async function testConnection(name, url) {
  console.log(`\n🔍 Testing: ${name}`);
  
  // Extract hostname
  const match = url.match(/@([^:]+):/);
  if (match) {
    const hostname = match[1];
    try {
      const resolution = await resolveIPv4(hostname);
      console.log(`   DNS: ${resolution.type.toUpperCase()} - ${resolution.addresses[0]}`);
    } catch (err) {
      console.log(`   DNS: Could not resolve`);
    }
  }
  
  const pool = new Pool({
    connectionString: url,
    connectionTimeoutMillis: 15000,
    ssl: { rejectUnauthorized: false },
    // Force IPv4 if possible
    host: undefined, // Let pg handle it
  });
  
  try {
    const result = await pool.query('SELECT NOW(), version()');
    console.log(`   ✅ SUCCESS! Connected to database`);
    console.log(`   Server time: ${result.rows[0].now}`);
    console.log(`   PostgreSQL: ${result.rows[0].version.split(' ')[0]} ${result.rows[0].version.split(' ')[1]}`);
    await pool.end();
    return { success: true, url };
  } catch (error) {
    console.log(`   ❌ FAILED: ${error.message}`);
    if (error.code) console.log(`   Error code: ${error.code}`);
    await pool.end();
    return { success: false, error: error.message, code: error.code };
  }
}

async function testAll() {
  console.log('🚀 Testing Supabase Connection with IPv4 Preference...\n');
  console.log('📝 Note: Forcing IPv4 resolution where possible\n');
  
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
  console.log(`\n💡 Solutions:`);
  console.log(`   1. Use Connection Pooler from Supabase Dashboard (most reliable)`);
  console.log(`   2. Check if project is Active (not Paused)`);
  console.log(`   3. Try from a different network (some networks block IPv6)`);
  console.log(`   4. Contact Supabase support if issue persists`);
}

testAll().catch(console.error);
