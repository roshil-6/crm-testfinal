# 🚨 EMERGENCY DEPLOY - 30 MINUTE DEMO

## Quick Vercel Deploy (5 minutes)

### Step 1: Deploy Frontend NOW
1. Go to: https://vercel.com/new
2. Click "Import Git Repository"
3. Select: `roshil-6/CRM-`
4. **IMPORTANT**: Click "Configure Project"
5. Set **Root Directory**: `client`
6. **Skip environment variable for now** (we'll add it after)
7. Click **Deploy**
8. Wait 2-3 minutes
9. **COPY YOUR URL** (e.g., https://crm-xxxxx.vercel.app)

### Step 2: Quick Backend Solution

**Option A: Use Local Backend (Fastest for Demo)**
1. Keep your backend running locally on port 5001
2. In Vercel Dashboard → Your Project → Settings → Environment Variables
3. Add: `REACT_APP_API_URL` = `http://localhost:5001`
4. **BUT WAIT** - This won't work because Vercel can't access localhost!

**Option B: Deploy Backend to Render (10 minutes)**
1. Go to: https://render.com
2. Sign up/login
3. Click "New +" → "Web Service"
4. Connect GitHub → Select `roshil-6/CRM-`
5. Settings:
   - **Name**: crm-backend
   - **Root Directory**: `server`
   - **Build Command**: `npm install`
   - **Start Command**: `node index.js`
   - **Environment**: Node
6. Add Environment Variable:
   - `JWT_SECRET` = `your-secret-key-12345`
7. Click "Create Web Service"
8. Wait 5-10 minutes
9. **COPY BACKEND URL** (e.g., https://crm-backend.onrender.com)

### Step 3: Connect Frontend to Backend
1. Go back to Vercel Dashboard
2. Settings → Environment Variables
3. Add: `REACT_APP_API_URL` = `https://your-backend-url.onrender.com`
4. Go to Deployments → Click "..." → "Redeploy"

### Step 4: Test Demo
1. Visit your Vercel URL
2. Login with: `rojishahead@toniosenora.com` / `rojishasenoramain000`
3. Test the application

---

## Alternative: Railway (Faster - 5 minutes)

### Deploy Backend to Railway:
1. Go to: https://railway.app
2. Sign up with GitHub
3. "New Project" → "Deploy from GitHub repo"
4. Select: `roshil-6/CRM-`
5. Add Service → Select the repo
6. Settings:
   - **Root Directory**: `server`
   - **Start Command**: `node index.js`
7. Add Variable: `JWT_SECRET` = `demo-secret-123`
8. Deploy (takes 2-3 minutes)
9. Get URL and update Vercel environment variable

---

## FASTEST OPTION: Use Mock Data (If backend fails)

If backend deployment takes too long, I can create a version that works without backend for demo purposes.

---

## Current Status Check

**Backend running?**
- Check: http://localhost:5001
- Should show API info (not error)

**If still error:**
1. Stop all node processes
2. `cd server`
3. `npm start`
4. Check http://localhost:5001/api/health

---

**YOU HAVE 30 MINUTES - LET'S GO!** 🚀
