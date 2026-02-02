# 🤖 Automated Setup Guide

## Your Railway Project ID
**Project ID:** `prj_GQc4tWas2Lu4FHN56EUceFKFRR4a`

## What I Can Do For You

✅ Created all configuration files  
✅ Created deployment guides  
✅ Updated documentation with your project ID  
✅ Created scripts and templates  

## What You Need to Do (5 Steps)

### Step 1: Railway - Add Backend Service (3 min)
1. Go to: https://railway.app/project/prj_GQc4tWas2Lu4FHN56EUceFKFRR4a
2. Click **"New"** → **"GitHub Repo"**
3. Select: `roshil-6/crm-testfinal`
4. Click on the service
5. **Settings:**
   - Root Directory: `server`
   - Start Command: `node index.js`

### Step 2: Railway - Add PostgreSQL (1 min)
1. Click **"New"** → **"Database"** → **"PostgreSQL"**
2. Wait 30 seconds
3. Click on PostgreSQL service
4. **Variables** tab → Copy `DATABASE_URL`

### Step 3: Railway - Set Environment Variables (2 min)
1. Go to your backend service
2. **Variables** tab → Add:
   - `DATABASE_URL` = (paste from Step 2)
   - `JWT_SECRET` = `crm-secret-key-2024-production-12345`
   - `PORT` = `5002`
   - `NODE_ENV` = `production`

### Step 4: Railway - Initialize Database (2 min)
1. Go to **Deployments** tab
2. Click latest deployment → **"View Logs"**
3. Run: `npm run init-db`
4. Run: `npm run create-all-users`

### Step 5: Vercel - Deploy Frontend (5 min)
1. Go to: https://vercel.com/new
2. Import: `roshil-6/crm-testfinal`
3. **Configure:**
   - Root Directory: `client`
   - Build: `npm run build`
   - Output: `build`
4. **Environment Variables:**
   - `REACT_APP_API_URL` = (your Railway backend URL)
5. Deploy

---

## Quick Links

**Railway Project:** https://railway.app/project/prj_GQc4tWas2Lu4FHN56EUceFKFRR4a  
**Vercel Deploy:** https://vercel.com/new  
**GitHub Repo:** https://github.com/roshil-6/crm-testfinal

---

## After Setup

**Test Backend:**
```
https://your-backend.railway.app/api/health
```

**Test Frontend:**
```
https://your-app.vercel.app
```

**Login:**
- Email: `rojishahead@toniosenora.com`
- Password: `rojishasenoramain000`

---

**Everything is ready! Just follow the 5 steps above! 🚀**
