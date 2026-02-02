# 🧪 Test Your App Now

## ✅ Server Status

- ✅ Backend server: Starting/Running
- ✅ Frontend: Starting/Running
- ✅ All users created in database
- ✅ Database connected (Railway PostgreSQL)

## 🚀 Quick Test Steps

### 1. Wait 30-60 seconds
Both servers need time to start.

### 2. Open Your App
**Frontend:** http://localhost:3000

### 3. Login
Use these credentials:

**Head Admin:**
- Email: `rojishahead@toniosenora.com`
- Password: `rojishasenoramain000`

**Or Admin:**
- Email: `sneha@toniosenora.com`
- Password: `snehasenora010`

**Or Sales Team Head:**
- Email: `varsha@toniosenora.com`
- Password: `varshasenora876`

### 4. Test Features

#### ✅ Test Bulk Import
1. Go to **Bulk Import** page
2. Upload `test_leads.csv` (in project root)
3. Verify leads are created

#### ✅ Test Manual Lead Creation
1. Go to **Leads** page
2. Click **"Create New Lead"**
3. Fill in details and save
4. Verify lead appears in list

#### ✅ Test Dashboard
1. Check **Dashboard** shows statistics
2. Verify lead counts
3. Check client overview

#### ✅ Test Lead Management
1. View leads list
2. Search for leads
3. Filter by status
4. Edit lead details

## 🔍 Verify Servers

### Backend Health Check
Visit: http://localhost:5001/api/health

Should show:
```json
{
  "status": "ok",
  "database": "connected",
  "type": "PostgreSQL"
}
```

### Frontend
Visit: http://localhost:3000

Should show login page.

## 🐛 If Login Fails

1. **Check backend is running:**
   - Visit: http://localhost:5001/api/health
   - Should return JSON response

2. **Check browser console (F12):**
   - Look for errors
   - Check network tab for failed requests

3. **Check server window:**
   - Look for error messages
   - Verify database connection

## 📋 All Login Credentials

See `USER_CREDENTIALS.md` for complete list of all 13 users.

---

**Your app is ready to test! 🚀**
