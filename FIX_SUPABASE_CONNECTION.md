# 🔧 Fix Supabase Connection Issue

## Current Error
```
ENOTFOUND db.ecfjjffprxyelzxvuday.supabase.co
```

This means the hostname cannot be resolved.

---

## ✅ Solution Steps

### Step 1: Verify Project Status in Supabase

1. Go to **https://app.supabase.com**
2. Check if your project shows **"Active"** status
3. If it shows **"Setting up"** or **"Paused"**, wait for it to complete

### Step 2: Get the Correct Connection String

**Option A: Use Connection Pooler (Recommended - More Reliable)**

1. In Supabase Dashboard → Your Project
2. Go to **Settings** → **Database**
3. Scroll to **"Connection pooling"** section
4. Copy the connection string from there
5. It will look like:
   ```
   postgresql://postgres.ecfjjffprxyelzxvuday:[PASSWORD]@aws-0-[REGION].pooler.supabase.com:6543/postgres?pgbouncer=true
   ```
6. Replace `[PASSWORD]` with: `wmEhA2J91dufKGXt`

**Option B: Use Direct Connection**

1. In Supabase Dashboard → Your Project
2. Go to **Settings** → **Database**
3. Scroll to **"Connection string"** section
4. Select **"URI"** tab
5. Copy the connection string
6. Replace `[YOUR-PASSWORD]` with: `wmEhA2J91dufKGXt`

### Step 3: Update server/.env

Open `server/.env` and update the `DATABASE_URL` line with the connection string you copied.

**Example (Pooler - Recommended):**
```env
DATABASE_URL=postgresql://postgres.ecfjjffprxyelzxvuday:wmEhA2J91dufKGXt@aws-0-ap-southeast-1.pooler.supabase.com:6543/postgres?pgbouncer=true
```

**Example (Direct):**
```env
DATABASE_URL=postgresql://postgres:wmEhA2J91dufKGXt@db.ecfjjffprxyelzxvuday.supabase.co:5432/postgres
```

### Step 4: Test Connection

```bash
cd server
node scripts/updateEnvAndTest.js
```

### Step 5: Initialize Database

Once connection works:

```bash
npm run init-db
npm run migrate-columns
npm start
```

---

## 🔍 Common Issues

### Issue 1: Project Still Provisioning
- **Wait 2-5 minutes** after creating the project
- Check project status in Supabase dashboard

### Issue 2: Wrong Connection String Format
- Make sure you're copying from **Settings → Database**
- Use **"URI"** format, not JDBC or Node.js
- For production, prefer **Connection Pooler** (port 6543)

### Issue 3: Project Paused
- Free tier projects pause after inactivity
- Go to Supabase dashboard and **resume** the project

### Issue 4: Network/Firewall
- Check if your network blocks Supabase
- Try from a different network
- Check if VPN is interfering

---

## 🎯 Quick Checklist

- [ ] Supabase project is **Active** (not "Setting up" or "Paused")
- [ ] Copied connection string from **Settings → Database**
- [ ] Using **Connection Pooler** format (port 6543) if available
- [ ] Replaced password placeholder with actual password
- [ ] Updated `server/.env` file
- [ ] Tested connection with `node scripts/updateEnvAndTest.js`
- [ ] Connection test shows "✅ Connection successful!"

---

## 💡 Pro Tip

**Use Connection Pooler** (port 6543) instead of direct connection (port 5432):
- More reliable
- Better for serverless (Vercel)
- Handles connection limits better
- Recommended by Supabase for production

---

## 🚀 After Connection Works

1. Run: `npm run init-db` (creates all tables)
2. Run: `npm run migrate-columns` (adds missing columns)
3. Start: `npm start` (starts the server)
4. Test: Visit http://localhost:5001/api/health

---

Need help? Check Supabase status: https://status.supabase.com
