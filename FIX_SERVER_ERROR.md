# Fixing Server Error

## Current Issue

The server is running but returning **503 Service Unavailable**, which indicates a **database connection problem**.

## Quick Fix Steps

### Step 1: Check PostgreSQL Status

**Windows:**
1. Open **Services** (Press `Win + R`, type `services.msc`)
2. Look for **PostgreSQL** service
3. If it's stopped, right-click and select **Start**

**Or check via PowerShell:**
```powershell
Get-Service | Where-Object {$_.Name -like "*postgres*"}
```

### Step 2: Create Database (If Not Exists)

1. Open **pgAdmin** or **psql** command line
2. Connect to PostgreSQL
3. Run:
```sql
CREATE DATABASE tonio_senora_crm;
```

**Or via command line:**
```powershell
psql -U postgres -c "CREATE DATABASE tonio_senora_crm;"
```

### Step 3: Update Database Credentials

Edit `server/.env` file:
```
DB_HOST=localhost
DB_PORT=5432
DB_NAME=tonio_senora_crm
DB_USER=postgres
DB_PASSWORD=your_actual_password
```

### Step 4: Initialize Database Tables

```powershell
cd server
npm run init-db
```

### Step 5: Restart Server

```powershell
cd server
npm run dev
```

## Verify Database Connection

Run the diagnostic script:
```powershell
cd server
node check-db.js
```

This will tell you:
- ✅ If database connection is working
- ❌ What the specific error is
- 📋 What tables exist

## Common Solutions

### If PostgreSQL is Not Installed

1. Download from: https://www.postgresql.org/download/windows/
2. Install PostgreSQL
3. Remember the password you set during installation
4. Update `server/.env` with that password

### If Database Doesn't Exist

```sql
-- Connect to PostgreSQL
psql -U postgres

-- Create database
CREATE DATABASE tonio_senora_crm;

-- Exit
\q
```

### If Wrong Credentials

1. Check your PostgreSQL password
2. Update `server/.env`:
   ```
   DB_PASSWORD=your_correct_password
   ```

### If Port is Different

If PostgreSQL is on a different port (not 5432):
1. Check PostgreSQL config or pgAdmin
2. Update `server/.env`:
   ```
   DB_PORT=5433  # or whatever port you're using
   ```

## Test Server After Fix

1. **Check health endpoint:**
   ```powershell
   curl http://localhost:5001/api/health
   ```
   Should return: `{"status":"ok","database":"connected"}`

2. **Start server:**
   ```powershell
   cd server
   npm run dev
   ```

3. **Check console output:**
   - Should see: `✅ Database connected successfully`
   - Should see: `🚀 Server running on port 5001`

## Still Having Issues?

1. Check `server/TROUBLESHOOTING.md` for detailed solutions
2. Verify PostgreSQL is actually running:
   ```powershell
   Get-Process | Where-Object {$_.ProcessName -like "*postgres*"}
   ```
3. Check PostgreSQL logs for errors
4. Try connecting manually:
   ```powershell
   psql -U postgres -d tonio_senora_crm
   ```
