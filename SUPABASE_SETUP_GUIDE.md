# 🚀 Supabase Setup Guide for CRM

## Step-by-Step Instructions

### Step 1: Create Supabase Account

1. Go to **https://supabase.com**
2. Click **"Start your project"** or **"Sign up"**
3. Sign up with:
   - GitHub (recommended)
   - Email
   - Or Google

---

### Step 2: Create a New Project

1. Once logged in, click **"New Project"**
2. Fill in the details:
   - **Name**: `CRM` (or any name you prefer)
   - **Database Password**: Create a strong password (save this!)
   - **Region**: Choose closest to you (e.g., `Southeast Asia (Singapore)`)
   - **Pricing Plan**: Select **Free** tier
3. Click **"Create new project"**
4. Wait 2-3 minutes for the project to be created

---

### Step 3: Get Your Connection String

1. Once your project is ready, go to **Settings** (gear icon in left sidebar)
2. Click **"Database"** in the settings menu
3. Scroll down to **"Connection string"** section
4. Select **"URI"** tab (not "JDBC" or "Node.js")
5. You'll see something like:
   ```
   postgresql://postgres:[YOUR-PASSWORD]@db.xxxxx.supabase.co:5432/postgres
   ```
6. **Copy this connection string**
7. **Replace `[YOUR-PASSWORD]`** with the password you created in Step 2

**Example:**
```
postgresql://postgres:MySecurePassword123@db.abcdefghijk.supabase.co:5432/postgres
```

---

### Step 4: Update Your .env File

1. Open `server/.env` file
2. Replace the `DATABASE_URL` line with your Supabase connection string:

```env
DATABASE_URL=postgresql://postgres:YOUR_PASSWORD@db.xxxxx.supabase.co:5432/postgres
JWT_SECRET=your-secret-key-change-this-in-production
NODE_ENV=development
PORT=5001
```

**Important:**
- Replace `YOUR_PASSWORD` with your actual database password
- Replace `db.xxxxx.supabase.co` with your actual Supabase host
- Keep the rest of the connection string as is

---

### Step 5: Initialize Database Schema

1. Open terminal/command prompt
2. Navigate to server directory:
   ```bash
   cd server
   ```
3. Run the initialization script:
   ```bash
   npm run init-db
   ```
4. You should see:
   ```
   ✅ PostgreSQL database schema initialized successfully!
   ```

---

### Step 6: Add Missing Columns (if needed)

Run the migration script to ensure all columns exist:

```bash
npm run migrate-columns
```

---

### Step 7: Start Your Server

```bash
npm start
```

You should see:
```
✅ PostgreSQL database connected successfully
🚀 Server running on port 5001
```

---

## 🔒 Security Notes

### Connection Pooling (Recommended for Production)

Supabase provides a connection pooler. For better performance, use:

**Pooled Connection (Port 6543):**
```
postgresql://postgres:YOUR_PASSWORD@db.xxxxx.supabase.co:6543/postgres?pgbouncer=true
```

**Direct Connection (Port 5432):**
```
postgresql://postgres:YOUR_PASSWORD@db.xxxxx.supabase.co:5432/postgres
```

For development, either works. For production/Vercel, use the pooled connection.

---

## ✅ Verify Setup

### Test 1: Check Connection String

```bash
cd server
node -e "require('dotenv').config(); console.log(process.env.DATABASE_URL ? '✅ DATABASE_URL is set' : '❌ DATABASE_URL not set')"
```

### Test 2: Test Database Connection

```bash
cd server
node -e "require('dotenv').config(); const { Pool } = require('pg'); const pool = new Pool({ connectionString: process.env.DATABASE_URL }); pool.query('SELECT NOW()').then(() => { console.log('✅ Database connection successful!'); pool.end(); }).catch(err => { console.error('❌ Connection failed:', err.message); pool.end(); });"
```

### Test 3: Check Tables

In Supabase Dashboard:
1. Go to **Table Editor** (left sidebar)
2. You should see tables: `users`, `leads`, `clients`, etc.

---

## 🐛 Troubleshooting

### Error: "password authentication failed"
- **Fix**: Double-check your password in the connection string
- Make sure you replaced `[YOUR-PASSWORD]` with your actual password

### Error: "connection refused"
- **Fix**: Check if your IP is allowed in Supabase
- Go to Settings → Database → Connection Pooling
- Check "Allowed IPs" - should allow all or your IP

### Error: "relation does not exist"
- **Fix**: Run `npm run init-db` to create tables

### Error: "column does not exist"
- **Fix**: Run `npm run migrate-columns` to add missing columns

---

## 📊 Supabase Dashboard Features

Once set up, you can use Supabase dashboard to:

1. **View Data**: Table Editor shows all your data
2. **Run Queries**: SQL Editor for custom queries
3. **Monitor**: Database logs and performance
4. **Backup**: Automatic backups (on paid plans)

---

## 🎯 Quick Reference

**Supabase Dashboard**: https://app.supabase.com

**Your Project URL**: `https://app.supabase.com/project/YOUR_PROJECT_ID`

**Connection String Location**: Settings → Database → Connection string → URI

---

## ✅ Success Checklist

- [ ] Created Supabase account
- [ ] Created new project
- [ ] Copied connection string
- [ ] Updated `server/.env` with connection string
- [ ] Ran `npm run init-db`
- [ ] Ran `npm run migrate-columns`
- [ ] Server starts without errors
- [ ] Can access http://localhost:5001

---

## 🚀 Next Steps

Once everything is set up:

1. **Test the API**: Visit http://localhost:5001/api/health
2. **Test Login**: Try logging in through the frontend
3. **Test Import**: Try bulk importing leads
4. **Deploy**: When ready, deploy to Vercel with the same `DATABASE_URL`

---

## 💡 Pro Tips

1. **Save your password**: Keep it in a password manager
2. **Use environment variables**: Never commit `.env` to git
3. **Connection pooling**: Use port 6543 for production
4. **Monitor usage**: Free tier has limits, check your usage in dashboard

---

Need help? Check Supabase docs: https://supabase.com/docs
