# 🔧 Troubleshooting Supabase Connection

## Error: `ENOTFOUND db.ecfjjffprxyelzxvuday.supabase.co`

This means the hostname cannot be resolved. Possible causes:

### 1. Supabase Project Still Provisioning

**Solution:** Wait 2-5 minutes after creating the project, then try again.

### 2. Wrong Connection String

**Check in Supabase Dashboard:**
1. Go to https://app.supabase.com
2. Select your project
3. Go to **Settings** → **Database**
4. Scroll to **"Connection string"**
5. Make sure you're using the **"URI"** tab (not JDBC or Node.js)
6. Copy the connection string again
7. It should look like:
   ```
   postgresql://postgres.[PROJECT-REF]:[PASSWORD]@aws-0-[REGION].pooler.supabase.com:6543/postgres
   ```
   OR
   ```
   postgresql://postgres:[PASSWORD]@db.[PROJECT-REF].supabase.co:5432/postgres
   ```

### 3. Use Connection Pooler (Recommended)

Supabase provides a connection pooler which is more reliable:

**Format:**
```
postgresql://postgres.[PROJECT-REF]:[PASSWORD]@aws-0-[REGION].pooler.supabase.com:6543/postgres?pgbouncer=true
```

**To get it:**
1. Go to Settings → Database
2. Scroll to **"Connection pooling"**
3. Copy the **"Connection string"** from there
4. Use port **6543** (pooler) instead of **5432** (direct)

### 4. Verify Project Status

1. Go to https://app.supabase.com
2. Check if your project shows **"Active"** status
3. If it shows "Setting up" or "Paused", wait for it to complete

### 5. Test Connection Manually

Try connecting with a PostgreSQL client:
- **pgAdmin**
- **DBeaver**
- **psql** command line

If connection works there but not in Node.js, it's a code issue.
If connection doesn't work anywhere, it's a Supabase/network issue.

### 6. Check Network/Firewall

- Make sure you're not behind a corporate firewall blocking Supabase
- Try from a different network
- Check if your IP is allowed (Supabase allows all by default on free tier)

---

## ✅ Correct Connection String Format

**Direct Connection:**
```
postgresql://postgres:YOUR_PASSWORD@db.PROJECT_REF.supabase.co:5432/postgres
```

**Pooled Connection (Recommended):**
```
postgresql://postgres.PROJECT_REF:YOUR_PASSWORD@aws-0-REGION.pooler.supabase.com:6543/postgres?pgbouncer=true
```

---

## 🔍 How to Get Correct Connection String

1. **Supabase Dashboard** → Your Project
2. **Settings** (gear icon) → **Database**
3. **Connection string** section
4. Select **"URI"** tab
5. Copy the string
6. Replace `[YOUR-PASSWORD]` with your actual password

---

## 🚀 Quick Fix

1. **Double-check your Supabase dashboard** for the exact connection string
2. **Use the pooled connection** (port 6543) if available
3. **Wait a few minutes** if project was just created
4. **Verify project is active** in Supabase dashboard

---

## Need Help?

- Supabase Status: https://status.supabase.com
- Supabase Docs: https://supabase.com/docs/guides/database/connecting-to-postgres
- Supabase Discord: https://discord.supabase.com
