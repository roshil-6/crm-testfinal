const { Pool } = require('pg');
const dns = require('dns');
const fs = require('fs');
const path = require('path');

dns.setDefaultResultOrder('ipv4first');

const password = 'wmEhA2J91dufKGXt';
const projectId = 'ecfjjffprxyelzxvuday';
const envPath = path.join(__dirname, '..', '.env');

// Common regions to try
const regions = [
  'ap-southeast-1',  // Singapore (most common for Asia)
  'us-east-1',       // US East
  'us-west-1',       // US West
  'eu-west-1',       // EU West
  'eu-central-1',    // EU Central
  'ap-northeast-1',  // Tokyo
  'ap-south-1',      // Mumbai
];

console.log('🚀 Quick Fix: Trying Connection Pooler with Common Regions...\n');

async function testPooler(region) {
  const url = `postgresql://postgres.${projectId}:${password}@aws-0-${region}.pooler.supabase.com:6543/postgres?pgbouncer=true`;
  
  const pool = new Pool({
    connectionString: url,
    connectionTimeoutMillis: 10000,
    ssl: { rejectUnauthorized: false }
  });
  
  try {
    await pool.query('SELECT NOW()');
    await pool.end();
    return { success: true, url, region };
  } catch (error) {
    await pool.end();
    return { success: false, error: error.message, code: error.code };
  }
}

async function quickFix() {
  console.log('Testing common regions...\n');
  
  for (const region of regions) {
    process.stdout.write(`Testing ${region}... `);
    const result = await testPooler(region);
    
    if (result.success) {
      console.log('✅ SUCCESS!\n');
      
      // Update .env
      let envContent = '';
      if (fs.existsSync(envPath)) {
        envContent = fs.readFileSync(envPath, 'utf8');
      }
      
      if (envContent.match(/DATABASE_URL=/)) {
        envContent = envContent.replace(/DATABASE_URL=.*/g, `DATABASE_URL=${result.url}`);
      } else {
        envContent += `\nDATABASE_URL=${result.url}\n`;
      }
      
      fs.writeFileSync(envPath, envContent);
      
      console.log('✅ Updated server/.env with working connection!');
      console.log(`✅ Region: ${result.region}`);
      console.log(`\n📋 Next steps:`);
      console.log(`   npm run init-db`);
      console.log(`   npm run migrate-columns`);
      console.log(`   npm start`);
      
      return true;
    } else {
      console.log(`❌ (${result.code || 'failed'})`);
    }
  }
  
  console.log('\n❌ None of the common regions worked.');
  console.log('\n💡 Quick alternatives:');
  console.log('   1. Enable IPv6 (30 seconds):');
  console.log('      Settings → Network → Change adapter options → Enable IPv6');
  console.log('   2. Use local PostgreSQL temporarily');
  console.log('   3. Try from a different network (mobile hotspot)');
  
  return false;
}

quickFix().catch(console.error);
