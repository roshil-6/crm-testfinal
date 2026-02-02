const http = require('http');

async function testLoginAPI() {
  console.log('🔍 Testing Login API...\n');
  
  const testCredentials = [
    { email: 'rojishahead@toniosenora.com', password: 'rojishasenoramain000', name: 'ROJISHA' },
    { email: 'sneha@toniosenora.com', password: 'snehasenora010', name: 'SNEHA' },
    { email: 'varsha@toniosenora.com', password: 'varshasenora876', name: 'Varsha' },
  ];
  
  for (const cred of testCredentials) {
    try {
      console.log(`Testing: ${cred.name} (${cred.email})`);
      
      const postData = JSON.stringify({
        email: cred.email,
        password: cred.password,
      });
      
      const options = {
        hostname: 'localhost',
        port: 5002,
        path: '/api/auth/login',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Content-Length': Buffer.byteLength(postData),
        },
      };
      
      const response = await new Promise((resolve, reject) => {
        const req = http.request(options, (res) => {
          let data = '';
          res.on('data', (chunk) => { data += chunk; });
          res.on('end', () => {
            resolve({ status: res.statusCode, data: JSON.parse(data) });
          });
        });
        req.on('error', reject);
        req.write(postData);
        req.end();
      });
      
      if (response.status === 200 && response.data.token && response.data.user) {
        console.log(`   ✅ SUCCESS!`);
        console.log(`   Token: ${response.data.token.substring(0, 30)}...`);
        console.log(`   User: ${response.data.user.name} (${response.data.user.role})`);
      } else {
        console.log(`   ❌ FAILED: Status ${response.status}`);
        console.log(`   Error: ${JSON.stringify(response.data)}`);
      }
    } catch (error) {
      console.log(`   ❌ FAILED: ${error.message}`);
      if (error.code === 'ECONNREFUSED') {
        console.log(`   ❌ Server not reachable!`);
        console.log(`   Make sure server is running on http://localhost:5001`);
      }
    }
    console.log('');
  }
}

testLoginAPI()
  .then(() => process.exit(0))
  .catch(() => process.exit(1));
