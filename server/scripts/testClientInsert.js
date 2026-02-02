const { Pool } = require('pg');
require('dotenv').config({ path: require('path').join(__dirname, '..', '.env') });

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: process.env.DATABASE_URL?.includes('localhost') || process.env.DATABASE_URL?.includes('127.0.0.1')
        ? false
        : { rejectUnauthorized: false },
});

async function testInsert() {
    const client = await pool.connect();

    try {
        console.log('🧪 Testing client insertion...\n');

        // Sample data matching what the registration endpoint sends
        const testData = {
            name: 'Test Client',
            phone_number: '+919999999999',
            phone_country_code: '+91',
            email: 'test@example.com',
            assessment_authority: 'VETASSESS',
            occupation_mapped: 'Software Engineer',
            registration_fee_paid: true,
            processing_status: 'New Registration',
            fee_status: 'Payment Pending',
        };

        console.log('📝 Test data:', JSON.stringify(testData, null, 2));
        console.log('\n🔄 Attempting INSERT...\n');

        const result = await client.query(`
      INSERT INTO clients (
        name, phone_number, phone_country_code, email,
        assessment_authority, occupation_mapped, registration_fee_paid,
        processing_status, fee_status,
        created_at, updated_at
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
      RETURNING id, name
    `, [
            testData.name,
            testData.phone_number,
            testData.phone_country_code,
            testData.email,
            testData.assessment_authority,
            testData.occupation_mapped,
            testData.registration_fee_paid,
            testData.processing_status,
            testData.fee_status,
            new Date().toISOString(),
            new Date().toISOString()
        ]);

        console.log('✅ SUCCESS! Client created with ID:', result.rows[0].id);
        console.log('   Name:', result.rows[0].name);

        // Clean up - delete the test record
        await client.query('DELETE FROM clients WHERE id = $1', [result.rows[0].id]);
        console.log('\n🧹 Test record cleaned up');

    } catch (error) {
        console.error('❌ INSERT FAILED!');
        console.error('   Error message:', error.message);
        console.error('   Error code:', error.code);
        console.error('   Detail:', error.detail);
        console.error('   Hint:', error.hint);
        console.error('\n   Full error:', error);
    } finally {
        client.release();
        await pool.end();
    }
}

testInsert()
    .then(() => {
        console.log('\n✅ Test completed!');
        process.exit(0);
    })
    .catch((error) => {
        console.error('Test failed:', error);
        process.exit(1);
    });
