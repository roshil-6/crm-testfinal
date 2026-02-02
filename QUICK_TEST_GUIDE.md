# 🧪 Quick Test Guide

## ✅ Step 1: Verify Servers Are Running

### Backend (Port 5001)
Visit: http://localhost:5001/api/health
- Should show: `{"status":"ok","database":"connected","type":"PostgreSQL"}`

### Frontend (Port 3000)
Visit: http://localhost:3000
- Should show login page

---

## ✅ Step 2: Test Login

### Use These Credentials:

**Head Admin:**
- Email: `rojishahead@toniosenora.com`
- Password: `rojishasenoramain000`

**Or Admin:**
- Email: `sneha@toniosenora.com`
- Password: `snehasenora010`

**Or Sales Team Head:**
- Email: `varsha@toniosenora.com`
- Password: `varshasenora876`

---

## ✅ Step 3: Test Bulk Import

1. **Login** to the app
2. **Navigate** to "Bulk Import" page
3. **Upload** the test file: `test_leads.csv` (created in project root)
4. **Verify**:
   - Success message appears
   - Leads appear in the Leads list
   - No errors in browser console

### Test CSV File
A test file `test_leads.csv` has been created with 5 sample leads.

---

## ✅ Step 4: Test Manual Lead Creation

1. Go to **Leads** page
2. Click **"Create New Lead"** or **"Add Lead"**
3. Fill in:
   - Name: Test User
   - Phone: 9876543215
   - Email: test@example.com
   - Status: New
4. Click **Save**
5. Verify lead appears in the list

---

## ✅ Step 5: Test Dashboard

1. After login, check **Dashboard**
2. Verify:
   - Lead statistics show
   - Client overview displays
   - Charts/graphs load (if applicable)
   - No errors in console

---

## ✅ Step 6: Test Lead Management

1. **View Leads**: Go to Leads page, verify list loads
2. **Search Leads**: Use search bar to find leads
3. **Filter by Status**: Filter leads by status (New, Follow-up, etc.)
4. **Edit Lead**: Click on a lead, edit details, save
5. **View Lead Details**: Click on lead to see full details

---

## ✅ Step 7: Test Attendance (If Available)

1. Go to **Attendance** page
2. **Check In**: Record check-in time
3. **Check Out**: Record check-out time
4. Verify times are saved

---

## 🐛 Common Issues

### Login Fails
- ✅ All users are created - use credentials from `USER_CREDENTIALS.md`
- Check browser console for errors
- Verify backend is running

### Bulk Import Fails
- Check CSV has required columns: `name` (or `first_name` + `last_name`) and `phone` (or `phone_number`)
- Check file format (CSV or Excel)
- Check browser console for errors
- Check server logs

### Dashboard Not Loading
- Check browser console for errors
- Verify database connection
- Check network tab for failed API calls

### "Site Can't Be Reached"
- Verify backend is running: http://localhost:5001/api/health
- Check server window for errors
- Verify DATABASE_URL in `server/.env`

---

## 📋 Test Checklist

- [ ] Backend server running (http://localhost:5001/api/health)
- [ ] Frontend running (http://localhost:3000)
- [ ] Can login with admin credentials
- [ ] Dashboard loads and shows data
- [ ] Can create lead manually
- [ ] Can bulk import CSV file
- [ ] Leads appear in list after import
- [ ] Can edit lead details
- [ ] Can search/filter leads
- [ ] No console errors

---

## 🎯 Quick Test Commands

### Check Backend
```bash
curl http://localhost:5001/api/health
```

### Check Frontend
Open: http://localhost:3000

### Test Login API
```bash
curl -X POST http://localhost:5001/api/auth/login \
  -H "Content-Type: application/json" \
  -d "{\"email\":\"sneha@toniosenora.com\",\"password\":\"snehasenora010\"}"
```

---

**Your app is ready to test! 🚀**
