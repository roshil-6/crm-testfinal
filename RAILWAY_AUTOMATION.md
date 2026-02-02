# 🚂 Railway Automation - Project ID: prj_GQc4tWas2Lu4FHN56EUceFKFRR4a

## Your Railway Project
**Project ID:** `prj_GQc4tWas2Lu4FHN56EUceFKFRR4a`

## Quick Setup Commands

### Option 1: Using Railway Web Dashboard (Easiest)

1. **Go to:** https://railway.app/project/prj_GQc4tWas2Lu4FHN56EUceFKFRR4a
2. **Add Service:**
   - Click "New" → "GitHub Repo"
   - Select: `roshil-6/crm-testfinal`
   - Click on the service
   - Settings → Root Directory: `server`
   - Settings → Start Command: `node index.js`

3. **Add PostgreSQL:**
   - Click "New" → "Database" → "PostgreSQL"
   - Wait for it to provision

4. **Get Database URL:**
   - Click on PostgreSQL service
   - Variables tab → Copy `DATABASE_URL`

5. **Set Environment Variables:**
   - Go to your backend service
   - Variables tab → Add:
     - `DATABASE_URL` = (from step 4)
     - `JWT_SECRET` = `crm-secret-key-2024-production-12345`
     - `PORT` = `5002`
     - `NODE_ENV` = `production`

6. **Initialize Database:**
   - Deployments → Latest → View Logs
   - Run: `npm run init-db`
   - Run: `npm run create-all-users`

### Option 2: Using Railway CLI (Advanced)

If you install Railway CLI:

```bash
# Install Railway CLI
npm i -g @railway/cli

# Login
railway login

# Link to your project
railway link prj_GQc4tWas2Lu4FHN56EUceFKFRR4a

# Deploy
cd server
railway up
```

---

## Environment Variables Template

Copy these to Railway Variables:

```
DATABASE_URL=postgresql://postgres:password@host:port/railway
JWT_SECRET=crm-secret-key-2024-production-12345
PORT=5002
NODE_ENV=production
```

---

## Quick Reference

**Project URL:** https://railway.app/project/prj_GQc4tWas2Lu4FHN56EUceFKFRR4a

**Direct Link:** https://railway.app/project/prj_GQc4tWas2Lu4FHN56EUceFKFRR4a
