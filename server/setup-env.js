const fs = require('fs');
const path = require('path');

const envPath = path.join(__dirname, '.env');
const envExamplePath = path.join(__dirname, '.env.example');

// Check if .env already exists
if (fs.existsSync(envPath)) {
  console.log('✅ .env file already exists');
  process.exit(0);
}

// Create .env from .env.example if it exists, otherwise create default
let envContent = `PORT=5001
JWT_SECRET=tonio-senora-crm-secret-key-2024-production
DB_HOST=localhost
DB_PORT=5432
DB_NAME=tonio_senora_crm
DB_USER=postgres
DB_PASSWORD=postgres
`;

if (fs.existsSync(envExamplePath)) {
  envContent = fs.readFileSync(envExamplePath, 'utf8');
  envContent = envContent.replace('PORT=5000', 'PORT=5001');
}

fs.writeFileSync(envPath, envContent);
console.log('✅ Created .env file');
console.log('⚠️  Please update server/.env with your PostgreSQL credentials');
