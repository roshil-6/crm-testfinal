# 🚨 QUICK DEMO SETUP - 30 MINUTES

## STEP 1: Start Backend (2 minutes)

**Open a NEW terminal/PowerShell window and run:**
```bash
cd "C:\Users\Abhinand Antony\Desktop\CRM\server"
npm start
```

**Keep this window open!** You should see:
```
🚀 Server running on port 5001
📡 API available at http://localhost:5001/api
```

**Test it:** Open browser → http://localhost:5001
Should show API info (not error)

---

## STEP 2: Deploy Frontend to Vercel (5 minutes)

### Go to Vercel NOW:
1. **Visit:** https://vercel.com/new
2. Click **"Import Git Repository"**
3. Select: **`roshil-6/CRM-`**
4. **BEFORE CLICKING DEPLOY:**
   - Click **"Configure Project"**
   - **Root Directory**: Type `client`
   - **Build Command**: `npm run build` (default)
   - **Output Directory**: `build` (default)
5. **Environment Variables:**
   - Click "Environment Variables"
   - Add: `REACT_APP_API_URL` = `http://localhost:5001`
   - **NOTE:** For demo, we'll use a workaround (see below)
6. Click **"Deploy"**
7. Wait 2-3 minutes
8. **COPY YOUR URL!** (e.g., https://crm-xxxxx.vercel.app)

---

## STEP 3: Backend for Production (10 minutes)

### Option A: Railway (FASTEST - 5 minutes)
1. Go to: https://railway.app
2. Sign up with GitHub
3. "New Project" → "Deploy from GitHub repo"
4. Select: `roshil-6/CRM-`
5. Click the service → Settings:
   - **Root Directory**: `server`
   - **Start Command**: `node index.js`
6. Variables tab → Add:
   - `JWT_SECRET` = `demo-secret-key-12345`
7. Deploy (takes 2-3 minutes)
8. **COPY BACKEND URL** (e.g., https://crm-backend.railway.app)

### Option B: Render (10 minutes)
1. Go to: https://render.com
2. Sign up/login
3. "New +" → "Web Service"
4. Connect GitHub → `roshil-6/CRM-`
5. Settings:
   - Name: `crm-backend`
   - Root Directory: `server`
   - Build: `npm install`
   - Start: `node index.js`
6. Environment:
   - `JWT_SECRET` = `demo-secret-123`
7. Deploy

---

## STEP 4: Connect Frontend to Backend (2 minutes)

1. Go to Vercel Dashboard
2. Your Project → Settings → Environment Variables
3. **Update** `REACT_APP_API_URL`:
   - Change from `http://localhost:5001`
   - To: `https://your-backend-url.railway.app` (or Render URL)
4. Go to Deployments
5. Click "..." → "Redeploy"

---

## STEP 5: Test Demo (1 minute)

1. Visit your Vercel URL
2. Login with:
   - Email: `rojishahead@toniosenora.com`
   - Password: `rojishasenoramain000`
3. Test the features!

---

## ⚡ FASTEST PATH (If backend deployment fails):

**For demo only - Use local backend with ngrok:**

1. Install ngrok: https://ngrok.com/download
2. Run: `ngrok http 5001`
3. Copy the ngrok URL (e.g., https://abc123.ngrok.io)
4. In Vercel, set `REACT_APP_API_URL` = ngrok URL
5. Redeploy frontend

---

## 🎯 DEMO CHECKLIST:

- [ ] Backend running on localhost:5001
- [ ] Frontend deployed to Vercel
- [ ] Backend deployed to Railway/Render
- [ ] Environment variable set in Vercel
- [ ] Frontend redeployed
- [ ] Test login works
- [ ] Demo URL ready to share!

---

**YOU CAN DO THIS! Let's get that demo live!** 🚀
