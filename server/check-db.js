const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 5432,
  database: process.env.DB_NAME || 'tonio_senora_crm',
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
});

async function checkDatabase() {
  console.log('Checking database connection...');
  console.log(`Host: ${process.env.DB_HOST || 'localhost'}`);
  console.log(`Port: ${process.env.DB_PORT || 5432}`);
  console.log(`Database: ${process.env.DB_NAME || 'tonio_senora_crm'}`);
  console.log(`User: ${process.env.DB_USER || 'postgres'}`);
  console.log('');

  try {
    const result = await pool.query('SELECT NOW()');
    console.log('✅ Database connection successful!');
    console.log(`Current time: ${result.rows[0].now}`);
    
    // Check if tables exist
    const tables = await pool.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
    `);
    
    if (tables.rows.length === 0) {
      console.log('⚠️  No tables found. Run: npm run init-db');
    } else {
      console.log(`✅ Found ${tables.rows.length} tables`);
      tables.rows.forEach(row => {
        console.log(`   - ${row.table_name}`);
      });
    }
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Database connection failed!');
    console.error(`Error: ${error.message}`);
    console.error('');
    console.error('Possible solutions:');
    console.error('1. Ensure PostgreSQL is installed and running');
    console.error('2. Check if PostgreSQL service is started (Windows Services)');
    console.error('3. Verify database exists:');
    console.error('   psql -U postgres');
    console.error('   CREATE DATABASE tonio_senora_crm;');
    console.error('4. Update server/.env with correct credentials');
    console.error('5. Check firewall settings');
    process.exit(1);
  }
}

checkDatabase();
