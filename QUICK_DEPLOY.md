# Quick Vercel Deployment - Get Demo Link in 2 Minutes

## Method 1: Using Vercel CLI (Fastest)

### Step 1: Install Vercel CLI
```bash
npm install -g vercel
```

### Step 2: Navigate to client folder
```bash
cd client
```

### Step 3: Deploy
```bash
vercel --prod
```

**Follow the prompts:**
1. Login to Vercel (opens browser)
2. Link to existing project or create new
3. Confirm settings (press Enter for defaults)
4. **Get your demo URL!** ✨

### Or use the batch file:
Double-click `deploy-vercel.bat` in the root folder.

---

## Method 2: Using Vercel Website (Easiest)

### Step 1: Go to Vercel
Visit: https://vercel.com/new

### Step 2: Import Repository
1. Click "Import Git Repository"
2. Select: `roshil-6/CRM-`
3. Click "Import"

### Step 3: Configure (IMPORTANT!)
**Before clicking Deploy, click "Configure Project":**

- **Root Directory**: Click "Edit" → Type: `client`
- **Framework Preset**: React (auto-detected)
- **Build Command**: `npm run build` (default)
- **Output Directory**: `build` (default)

### Step 4: Add Environment Variable
Click "Environment Variables" → Add:
- **Name**: `REACT_APP_API_URL`
- **Value**: `http://localhost:5001` (or your backend URL)

**Note**: For demo, you can use localhost if backend runs locally, or deploy backend separately.

### Step 5: Deploy
Click "Deploy" → Wait 2-3 minutes → **Get your demo link!** 🎉

---

## Method 3: One-Click Deploy Button

Add this to your README.md (already added):

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/roshil-6/CRM-)

---

## After Deployment

### Your Demo URL will be:
- Format: `https://crm-xxxxx.vercel.app`
- Or custom domain if configured

### Share with Client:
Just send them the Vercel URL! They can access it immediately.

---

## Important Notes

1. **Backend URL**: For demo, you can:
   - Run backend locally and use `http://localhost:5001`
   - Or deploy backend to Heroku/Railway and use that URL
   - Or use a temporary backend URL

2. **Environment Variable**: 
   - Set `REACT_APP_API_URL` in Vercel dashboard
   - Go to: Project → Settings → Environment Variables

3. **Root Directory**: 
   - **MUST** be set to `client` (not root!)
   - This fixes 404 errors

---

## Quick Test

After deployment:
1. Visit your Vercel URL
2. Should see login page
3. Login with any user credentials
4. Test the application

---

## Troubleshooting

**404 Error?**
- Check Root Directory is set to `client`
- Check Output Directory is `build`

**API Errors?**
- Check `REACT_APP_API_URL` environment variable
- Make sure backend is running/accessible

**Build Fails?**
- Check build logs in Vercel dashboard
- Ensure all dependencies are in package.json

---

**Ready to deploy? Use Method 2 (Website) - it's the easiest!** 🚀
