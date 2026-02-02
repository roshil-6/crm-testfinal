# 🔗 Get Your Supabase Connection String

Since everything seems fine in Supabase, let's get the **exact** connection string from your dashboard.

## 📋 Step-by-Step Instructions

### Step 1: Open Supabase Dashboard

1. Go to **https://app.supabase.com**
2. Log in to your account
3. Select your project (ID: `ecfjjffprxyelzxvuday`)

### Step 2: Get Connection Pooler String (Recommended)

1. Click **Settings** (gear icon in left sidebar)
2. Click **Database** in the settings menu
3. Scroll down to **"Connection pooling"** section
4. You'll see connection strings for different modes:
   - **Transaction mode** (port 6543) - Recommended
   - **Session mode** (port 5432)
5. **Copy the connection string** from **Transaction mode**
6. It should look like:
   ```
   postgresql://postgres.ecfjjffprxyelzxvuday:[YOUR-PASSWORD]@aws-0-[REGION].pooler.supabase.com:6543/postgres?pgbouncer=true
   ```
7. **Replace `[YOUR-PASSWORD]`** with: `wmEhA2J91dufKGXt`

### Step 3: Update server/.env

**Option A: Manual Update**
1. Open `server/.env` in a text editor
2. Find the line: `DATABASE_URL=...`
3. Replace it with your connection string (with password):
   ```env
   DATABASE_URL=postgresql://postgres.ecfjjffprxyelzxvuday:wmEhA2J91dufKGXt@aws-0-[REGION].pooler.supabase.com:6543/postgres?pgbouncer=true
   ```
4. Replace `[REGION]` with the actual region from Supabase (e.g., `ap-southeast-1`, `us-east-1`)
5. Save the file

**Option B: Automated Update**
```bash
cd server
node scripts/updateConnectionString.js "YOUR_FULL_CONNECTION_STRING_HERE"
```

### Step 4: Test Connection

```bash
cd server
node scripts/testWithProjectId.js
```

### Step 5: Initialize Database

If connection test succeeds:
```bash
npm run init-db
npm run migrate-columns
npm start
```

---

## 🔍 What to Look For

### Connection Pooler Format:
```
postgresql://postgres.PROJECT_ID:PASSWORD@aws-0-REGION.pooler.supabase.com:6543/postgres?pgbouncer=true
```

### Direct Connection Format (if pooler doesn't work):
```
postgresql://postgres:PASSWORD@db.PROJECT_ID.supabase.co:5432/postgres
```

---

## 📝 Important Notes

1. **Region**: The region in the connection string must match your project's region
   - Check in Supabase Dashboard → Settings → General → Region
   - Common regions: `ap-southeast-1`, `us-east-1`, `eu-west-1`, `eu-central-1`

2. **Password**: Make sure you're using the database password you set when creating the project
   - If you forgot it, you can reset it in Settings → Database → Database password

3. **Project Status**: Make sure your project shows **"Active"** status
   - If it's paused, click "Resume" and wait 1-2 minutes

---

## 🚨 Still Having Issues?

If you've copied the exact connection string and it still doesn't work:

1. **Verify Project Status**: Should be "Active"
2. **Check Region**: Make sure the region in the connection string matches your project
3. **Test Password**: Try resetting the database password in Supabase
4. **Check Network**: Some networks block certain ports or IPv6
5. **Contact Support**: Supabase support can help verify your connection string

---

## ✅ Quick Checklist

- [ ] Opened Supabase Dashboard
- [ ] Went to Settings → Database
- [ ] Found "Connection pooling" section
- [ ] Copied connection string from Transaction mode
- [ ] Replaced `[YOUR-PASSWORD]` with actual password
- [ ] Updated `server/.env` with the connection string
- [ ] Tested connection: `node scripts/testWithProjectId.js`
- [ ] Connection test shows "✅ SUCCESS!"
- [ ] Initialized database: `npm run init-db`
- [ ] Started server: `npm start`

---

**Once you have the connection string from Supabase Dashboard, paste it here and I'll help you update the .env file!**
