const { Pool } = require('pg');
require('dotenv').config({ path: require('path').join(__dirname, '..', '.env') });

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: process.env.DATABASE_URL?.includes('localhost') || process.env.DATABASE_URL?.includes('127.0.0.1')
        ? false
        : { rejectUnauthorized: false },
});

async function checkSchema() {
    const client = await pool.connect();

    try {
        console.log('🔍 Checking clients table schema...\n');

        const result = await client.query(`
      SELECT column_name, data_type, is_nullable, column_default
      FROM information_schema.columns
      WHERE table_name = 'clients'
      ORDER BY ordinal_position;
    `);

        console.log('📋 Clients table columns:');
        console.log('─'.repeat(80));
        result.rows.forEach(row => {
            console.log(`${row.column_name.padEnd(30)} ${row.data_type.padEnd(20)} ${row.is_nullable === 'YES' ? 'NULL' : 'NOT NULL'}`);
        });
        console.log('─'.repeat(80));
        console.log(`\nTotal columns: ${result.rows.length}`);

    } catch (error) {
        console.error('❌ Error checking schema:', error);
        throw error;
    } finally {
        client.release();
        await pool.end();
    }
}

checkSchema()
    .then(() => {
        console.log('\n✅ Schema check completed!');
        process.exit(0);
    })
    .catch((error) => {
        console.error('Schema check failed:', error);
        process.exit(1);
    });
