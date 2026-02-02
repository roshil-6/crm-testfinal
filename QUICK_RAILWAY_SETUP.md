# 🚂 Quick Railway Setup (3 minutes)

Railway is the easiest cloud PostgreSQL option - no IPv6 issues!

## Step 1: Sign Up (1 minute)

1. Go to: **https://railway.app**
2. Click **"Start a New Project"**
3. Sign up with **GitHub** (easiest)

## Step 2: Create PostgreSQL (1 minute)

1. Click **"New"** → **"Database"** → **"Add PostgreSQL"**
2. Wait 30 seconds for it to provision
3. Click on the **PostgreSQL** service
4. Go to **"Connect"** tab
5. Copy the **"Postgres Connection URL"**
   - It looks like: `postgresql://postgres:password@containers-us-west-xxx.railway.app:5432/railway`

## Step 3: Update .env (30 seconds)

1. Open `server/.env`
2. Replace `DATABASE_URL` with:
   ```env
   DATABASE_URL=YOUR_RAILWAY_CONNECTION_URL_HERE
   ```

## Step 4: Initialize (30 seconds)

```bash
cd server
npm run init-db
npm run migrate-columns
npm start
```

## ✅ Done!

Your app is now connected to Railway PostgreSQL. No IPv6 issues!

---

## 💰 Pricing

- **Free tier**: $5 credit/month (enough for development)
- **Paid**: Pay as you go after free tier

---

## 🎯 Why Railway?

- ✅ Easiest setup (3 minutes)
- ✅ No IPv6 issues (IPv4 support)
- ✅ Free tier available
- ✅ One-click PostgreSQL
- ✅ Works perfectly on Windows
