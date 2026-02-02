# ⚡ Quick Guide: Get Connection String

## ✅ Data Privacy Enabled
Good! You've enabled the data privacy setting. Now we need the **exact connection string** from Supabase.

## 📋 Steps (2 minutes)

### 1. Open Supabase Dashboard
- Go to: **https://app.supabase.com**
- Select your project: `ecfjjffprxyelzxvuday`

### 2. Get Connection String
1. Click **Settings** (⚙️ gear icon, left sidebar)
2. Click **Database**
3. Scroll down to **"Connection pooling"** section
4. You'll see two tabs:
   - **Transaction mode** (port 6543) ← **Use this one!**
   - Session mode (port 5432)
5. **Copy the connection string** from Transaction mode
6. It looks like:
   ```
   postgresql://postgres.ecfjjffprxyelzxvuday:[YOUR-PASSWORD]@aws-0-ap-southeast-1.pooler.supabase.com:6543/postgres?pgbouncer=true
   ```

### 3. Replace Password
- Find `[YOUR-PASSWORD]` in the string
- Replace it with: `wmEhA2J91dufKGXt`
- Your final string should look like:
   ```
   postgresql://postgres.ecfjjffprxyelzxvuday:wmEhA2J91dufKGXt@aws-0-ap-southeast-1.pooler.supabase.com:6543/postgres?pgbouncer=true
   ```
   (Note: The region might be different - use what Supabase shows!)

### 4. Update server/.env
1. Open `server/.env` file
2. Find: `DATABASE_URL=...`
3. Replace the entire line with:
   ```env
   DATABASE_URL=postgresql://postgres.ecfjjffprxyelzxvuday:wmEhA2J91dufKGXt@aws-0-[YOUR-REGION].pooler.supabase.com:6543/postgres?pgbouncer=true
   ```
4. Replace `[YOUR-REGION]` with the actual region from Supabase
5. Save the file

### 5. Test & Initialize
```bash
cd server
node scripts/updateConnectionString.js "YOUR_FULL_CONNECTION_STRING"
```

Or test manually:
```bash
cd server
node scripts/testWithProjectId.js
```

If successful:
```bash
npm run init-db
npm run migrate-columns
npm start
```

---

## 🎯 What to Look For

**In Supabase Dashboard → Settings → Database:**

Look for this section:
```
Connection pooling
─────────────────
Transaction mode (recommended)
postgresql://postgres.ecfjjffprxyelzxvuday:[YOUR-PASSWORD]@aws-0-[REGION].pooler.supabase.com:6543/postgres?pgbouncer=true
```

**Copy that entire line!**

---

## ❓ Can't Find It?

If you don't see "Connection pooling":
1. Make sure your project is **Active** (not Paused)
2. Check if you're on the **Free tier** (pooler is available)
3. Try refreshing the page
4. Look for "Connection string" section instead

---

## 🚀 After You Get It

Once you have the connection string:
1. **Paste it here** and I'll help update the .env file
2. Or update `server/.env` manually
3. Run the test script
4. Initialize the database

**The connection string format is critical - it must match exactly what Supabase shows!**
