# 🚀 Quick Start - Supabase Setup

## Your Connection String

```
postgresql://postgres:[YOUR-PASSWORD]@db.ecfjjffprxyelzxvuday.supabase.co:5432/postgres
```

## ⚠️ IMPORTANT: Replace [YOUR-PASSWORD]

1. Open `server/.env` file
2. Find the line with `DATABASE_URL`
3. Replace `[YOUR-PASSWORD]` with your actual Supabase database password
4. Save the file

**Example:**
```env
DATABASE_URL=postgresql://postgres:MySecurePassword123@db.ecfjjffprxyelzxvuday.supabase.co:5432/postgres
```

## Setup Commands

Run these in order:

```bash
cd server

# 1. Initialize database schema
npm run init-db

# 2. Add missing columns (if needed)
npm run migrate-columns

# 3. Start the server
npm start
```

## ✅ Verify It Works

1. Server should show: `✅ PostgreSQL database connected successfully`
2. Visit: http://localhost:5001/api/health
3. Should return: `{"status":"ok","database":"connected","type":"PostgreSQL"}`

## 🎯 That's It!

Your CRM is now connected to Supabase PostgreSQL! 🎉
