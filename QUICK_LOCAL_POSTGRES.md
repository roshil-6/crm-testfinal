# 🏠 Quick Local PostgreSQL Setup (5 minutes)

Local PostgreSQL is the fastest option - no network issues at all!

## Step 1: Download PostgreSQL (2 minutes)

1. Go to: **https://www.postgresql.org/download/windows/**
2. Click **"Download the installer"**
3. Download **PostgreSQL 15 or 16** (latest)
4. Run the installer

## Step 2: Install (2 minutes)

1. **Installation Directory**: Keep default (`C:\Program Files\PostgreSQL\15`)
2. **Data Directory**: Keep default
3. **Password**: Set a password (remember it! e.g., `postgres123`)
4. **Port**: Keep default (`5432`)
5. **Locale**: Keep default
6. Click **Next** through the rest
7. **Uncheck** "Stack Builder" at the end (not needed)

## Step 3: Create Database (30 seconds)

1. Open **pgAdmin** (installed with PostgreSQL)
   - Or use **psql** from command line
2. Connect to server (password is what you set)
3. Right-click **"Databases"** → **"Create"** → **"Database"**
4. Name: `crm`
5. Click **"Save"**

**Or via command line:**
```bash
# Open psql (search "SQL Shell" in Start menu)
# Enter password when prompted
CREATE DATABASE crm;
\q
```

## Step 4: Update .env (30 seconds)

1. Open `server/.env`
2. Replace `DATABASE_URL` with:
   ```env
   DATABASE_URL=postgresql://postgres:YOUR_PASSWORD@localhost:5432/crm
   ```
   Replace `YOUR_PASSWORD` with the password you set during installation.

## Step 5: Initialize (30 seconds)

```bash
cd server
npm run init-db
npm run migrate-columns
npm start
```

## ✅ Done!

Your app is now using local PostgreSQL. Super fast, no network issues!

---

## 🎯 Why Local PostgreSQL?

- ✅ No network/IPv6 issues
- ✅ Fastest connection (localhost)
- ✅ Free forever
- ✅ Full control
- ✅ Works offline
- ✅ Perfect for development

---

## 💡 Tips

- **Password**: Use something simple like `postgres123` for development
- **pgAdmin**: GUI tool to manage your database
- **psql**: Command-line tool (faster for quick queries)

---

## 🚀 For Production Later

When ready for production, you can:
1. Export data from local PostgreSQL
2. Import to Railway/Neon/Supabase
3. Update connection string

Local PostgreSQL is perfect for development!
