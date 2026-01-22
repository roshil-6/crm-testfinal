# How to Start the CRM Application

## Quick Start (Easiest Method)

### Option 1: Use the Batch File
Double-click `start-app.bat` in the root folder. This will open two command windows:
- One for the backend server (port 5001)
- One for the frontend client (port 3000)

### Option 2: Manual Start (Recommended for Troubleshooting)

**Step 1: Start Backend Server**
1. Open a Command Prompt or PowerShell
2. Navigate to the server folder:
   ```
   cd "C:\Users\Abhinand Antony\Desktop\CRM\server"
   ```
3. Start the server:
   ```
   npm start
   ```
4. You should see: `🚀 Server running on port 5001`

**Step 2: Start Frontend Client** (in a NEW terminal window)
1. Open another Command Prompt or PowerShell
2. Navigate to the client folder:
   ```
   cd "C:\Users\Abhinand Antony\Desktop\CRM\client"
   ```
3. Start the client:
   ```
   npm start
   ```
4. Your browser should automatically open to `http://localhost:3000`

## Access Points

- **Frontend Application**: http://localhost:3000
- **Backend API**: http://localhost:5001/api
- **Health Check**: http://localhost:5001/api/health

## Troubleshooting

### If ports are already in use:
- Backend (5001): Check if another process is using it, or change the port in `server/index.js`
- Frontend (3000): React will automatically try the next available port (3001, 3002, etc.)

### If dependencies are missing:
Run these commands in the respective folders:
```
cd server
npm install

cd ../client
npm install
```

### If the browser doesn't open automatically:
Manually navigate to: http://localhost:3000

### Check if servers are running:
- Backend: Visit http://localhost:5001/api/health
- Frontend: Visit http://localhost:3000

## Current Status

The application should now be starting. Check the command windows for any error messages.
