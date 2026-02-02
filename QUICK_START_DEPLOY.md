# ⚡ QUICK START - Deploy in 10 Minutes

## Your Project Info
- **Railway Project ID:** `prj_GQc4tWas2Lu4FHN56EUceFKFRR4a`
- **GitHub Repo:** `roshil-6/crm-testfinal`

---

## 🎯 3 Simple Steps

### 1️⃣ Railway Backend (5 min)

**Go to:** https://railway.app/project/prj_GQc4tWas2Lu4FHN56EUceFKFRR4a

1. Click **"New"** → **"GitHub Repo"** → Select `crm-testfinal`
2. Click service → **Settings:**
   - Root: `server`
   - Start: `node index.js`
3. Click **"New"** → **"Database"** → **"PostgreSQL"**
4. Copy `DATABASE_URL` from PostgreSQL Variables
5. Backend service → **Variables:**
   - `DATABASE_URL` = (paste)
   - `JWT_SECRET` = `crm-secret-2024-12345`
   - `PORT` = `5002`
   - `NODE_ENV` = `production`
6. **Deployments** → **View Logs:**
   ```bash
   npm run init-db
   npm run create-all-users
   ```
7. **Settings** → **Networking** → Copy backend URL

---

### 2️⃣ Vercel Frontend (3 min)

**Go to:** https://vercel.com/new

1. Import: `roshil-6/crm-testfinal`
2. **Configure:**
   - Root: `client`
   - Build: `npm run build`
3. **Environment Variables:**
   - `REACT_APP_API_URL` = (Railway backend URL from step 1.7)
4. Deploy

---

### 3️⃣ Test (2 min)

1. Backend: `https://your-backend.railway.app/api/health`
2. Frontend: `https://your-app.vercel.app`
3. Login:
   - Email: `rojishahead@toniosenora.com`
   - Password: `rojishasenoramain000`

---

## ✅ Done!

Your CRM is live! 🎉

---

**Need help? Tell me which step you're on!**
