# 🔧 Troubleshoot "Site Can't Be Reached"

## Quick Fixes

### 1. Check Server is Running
```bash
# Check if Node.js is running
Get-Process node

# Check if port 5001 is listening
netstat -ano | findstr :5001
```

### 2. Restart Server
```bash
# Stop all Node processes
Get-Process node | Stop-Process -Force

# Start server
cd server
npm start
```

### 3. Check Environment Variables
Verify `server/.env` has:
```env
DATABASE_URL=postgresql://postgres:password@host:port/database
JWT_SECRET=your-secret-key
NODE_ENV=production
PORT=5001
```

### 4. Check Database Connection
```bash
cd server
npm run production-setup
```

### 5. Check Server Logs
Look for errors in the server window:
- Database connection errors
- Port already in use
- Missing dependencies

## Common Errors

### Error: "Cannot find module"
```bash
cd server
npm install
```

### Error: "Port 5001 already in use"
```bash
# Find process using port 5001
netstat -ano | findstr :5001

# Kill the process (replace PID with actual process ID)
taskkill /PID <PID> /F
```

### Error: "Database connection failed"
- Check `DATABASE_URL` in `server/.env`
- Verify Railway database is accessible
- Test connection: `npm run production-setup`

### Error: "ECONNREFUSED"
- Database server is not accessible
- Check Railway dashboard
- Verify connection string

## Manual Start

1. Open PowerShell
2. Navigate to server directory:
   ```bash
   cd "C:\Users\Abhinand Antony\Desktop\CRM\server"
   ```
3. Start server:
   ```bash
   npm start
   ```
4. Check for errors in the console
5. Test: http://localhost:5001/api/health

## Verify Server is Running

Visit: http://localhost:5001/api/health

Should return:
```json
{
  "status": "ok",
  "database": "connected",
  "type": "PostgreSQL"
}
```

## Still Not Working?

1. Check Windows Firewall
2. Try different port (change PORT in .env)
3. Check Railway database status
4. Review server logs for specific errors
