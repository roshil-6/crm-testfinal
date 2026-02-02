# 🚨 EMERGENCY SETUP - Get Running in 5 Minutes

## Step 1: Railway Setup (2 minutes)

1. Go to: **https://railway.app**
2. Click **"Start a New Project"**
3. Sign up with **GitHub** (fastest)
4. Click **"New"** → **"Database"** → **"Add PostgreSQL"**
5. Wait 30 seconds
6. Click on **PostgreSQL** service
7. Go to **"Connect"** tab
8. Copy the **"Postgres Connection URL"**

## Step 2: Update .env (30 seconds)

1. Open `server/.env`
2. Replace `DATABASE_URL` with Railway connection string

## Step 3: Initialize (2 minutes)

```bash
cd server
npm run init-db
npm run migrate-columns
npm start
```

## ✅ Done!

---

## Alternative: Local PostgreSQL (If Railway is slow)

1. Download: https://www.postgresql.org/download/windows/
2. Install (set password)
3. Create database: `CREATE DATABASE crm;`
4. Update `.env`: `DATABASE_URL=postgresql://postgres:YOUR_PASSWORD@localhost:5432/crm`
5. Run init-db

---

## For Hosting on Vercel

1. Push code to GitHub
2. Connect to Vercel
3. Add `DATABASE_URL` environment variable
4. Deploy
