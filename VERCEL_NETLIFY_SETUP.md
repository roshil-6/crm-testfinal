# Vercel & Netlify Setup Instructions

## ⚠️ Important: 404 Error Fix

The 404 errors occur because Vercel/Netlify need to know where your frontend code is located.

## Vercel Setup

### Step 1: Import Repository
1. Go to https://vercel.com
2. Click "New Project"
3. Import from GitHub: `roshil-6/CRM-`

### Step 2: Configure Project Settings
**CRITICAL SETTINGS:**

- **Root Directory**: Click "Edit" and set to: `client`
- **Framework Preset**: React
- **Build Command**: `npm run build` (or leave default)
- **Output Directory**: `build` (or leave default)
- **Install Command**: `npm install` (or leave default)

### Step 3: Environment Variables
Add in Vercel Dashboard → Settings → Environment Variables:

```
REACT_APP_API_URL=https://your-backend-url.herokuapp.com
```

Replace with your actual backend URL.

### Step 4: Deploy
Click "Deploy" and wait for build to complete.

---

## Netlify Setup

### Step 1: Import Repository
1. Go to https://netlify.com
2. Click "Add new site" → "Import an existing project"
3. Connect to GitHub and select `roshil-6/CRM-`

### Step 2: Configure Build Settings
**CRITICAL SETTINGS:**

- **Base directory**: `client`
- **Build command**: `npm run build`
- **Publish directory**: `client/build`

### Step 3: Environment Variables
Add in Netlify Dashboard → Site settings → Environment variables:

```
REACT_APP_API_URL=https://your-backend-url.herokuapp.com
```

### Step 4: Deploy
Click "Deploy site" and wait for build to complete.

---

## Why 404 Errors Happen

1. **Wrong Root Directory**: If root is set to repository root instead of `client/`
2. **Missing SPA Redirects**: React Router needs redirects (already in config files)
3. **Build Output Wrong**: Should be `build/` not `dist/` or root
4. **Missing Environment Variables**: API calls will fail without `REACT_APP_API_URL`

---

## Verification Checklist

After deployment, verify:

- [ ] Root directory is set to `client`
- [ ] Build command is `npm run build`
- [ ] Output directory is `build`
- [ ] Environment variable `REACT_APP_API_URL` is set
- [ ] Build completes successfully
- [ ] No 404 errors on routes

---

## Backend Deployment (Separate)

The backend **cannot** run on Vercel/Netlify serverless because it uses a JSON file database.

**Recommended Backend Platforms:**
- Heroku (easiest)
- Railway
- Render
- DigitalOcean App Platform

After deploying backend, update `REACT_APP_API_URL` in frontend environment variables.

---

## Quick Test

After deployment, visit:
- Your Vercel/Netlify URL
- Should see login page
- If 404, check root directory setting

---

## Current Repository Status

✅ All files committed
✅ Deployment configs added
✅ README updated
✅ Environment variable support added

**Repository**: https://github.com/roshil-6/CRM-.git
