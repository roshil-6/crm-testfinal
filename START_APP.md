# Starting the CRM Application

## Port Configuration

The application is configured to use:
- **Backend Server**: Port **5001** (changed from 5000 to avoid conflicts)
- **Frontend React App**: Port **3001** (changed from 3000 to avoid conflicts)

## Prerequisites

1. **PostgreSQL Database** must be running
2. Database should be created: `tonio_senora_crm`
3. Update `server/.env` with your database credentials

## Quick Start

### Option 1: Start Both Servers (Recommended)

From the root directory:
```bash
npm run dev
```

### Option 2: Start Servers Separately

**Terminal 1 - Backend:**
```bash
cd server
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd client
$env:PORT="3001"
npm start
```

## Database Setup (First Time Only)

Before starting the app for the first time, initialize the database:

```bash
cd server
npm run init-db
```

This will:
- Create all necessary tables
- Create admin user: `admin@toniosenora.com` / `admin123`
- Create staff user: `emy@toniosenora.com` / `staff123`

## Access the Application

Once both servers are running:
- **Frontend**: http://localhost:3001
- **Backend API**: http://localhost:5001

## Troubleshooting

### Port Already in Use

If port 5001 or 3001 are in use, you can change them:

**Backend Port:**
- Update `server/index.js` line 11: `const PORT = process.env.PORT || 5001;`
- Or set environment variable: `$env:PORT="5002"`

**Frontend Port:**
- Create `client/.env` file with: `PORT=3002`
- Update `client/src/config/api.js` to point to new backend port

### Database Connection Error

Make sure:
1. PostgreSQL is installed and running
2. Database `tonio_senora_crm` exists
3. Credentials in `server/.env` are correct
4. PostgreSQL service is started (check Windows Services)

### Cannot Find Module Errors

Run:
```bash
cd server && npm install
cd ../client && npm install
```

## Current Configuration

- Backend: http://localhost:5001
- Frontend: http://localhost:3001
- API Base URL: http://localhost:5001 (configured in `client/src/config/api.js`)
