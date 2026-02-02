# 🧪 Test Your CRM App

## ✅ Quick Test Checklist

### 1. Backend Server (Port 5001)
- [ ] Server is running
- [ ] Health check works: http://localhost:5001/api/health
- [ ] Should return: `{"status":"ok","database":"connected","type":"PostgreSQL"}`

### 2. Frontend (Port 3000)
- [ ] Frontend is running
- [ ] Access: http://localhost:3000
- [ ] Login page loads

### 3. Login Test
- [ ] Can login with admin credentials
- [ ] Dashboard loads after login
- [ ] No errors in browser console

### 4. Bulk Import Test
- [ ] Go to Bulk Import page
- [ ] Upload a CSV file with:
  - `name` OR `first_name` + `last_name`
  - `phone` OR `phone_number`
  - Other fields optional
- [ ] Verify leads are created
- [ ] Check for success message

### 5. Leads Management
- [ ] View leads list
- [ ] Create new lead manually
- [ ] Edit lead details
- [ ] Filter by status
- [ ] Search leads

### 6. Dashboard
- [ ] Dashboard loads
- [ ] Shows lead statistics
- [ ] Shows client overview
- [ ] Shows staff performance (if applicable)

## 🧪 Test CSV File

Create a test CSV file (`test_leads.csv`):

```csv
name,phone_number,email,status,source
John Doe,9876543210,john@example.com,New,Website
Jane Smith,9876543211,jane@example.com,Follow-up,Facebook
Bob Johnson,9876543212,bob@example.com,Prospect,Referral
```

OR with first_name/last_name:

```csv
first_name,last_name,phone,email,status
John,Doe,9876543210,john@example.com,New
Jane,Smith,9876543211,jane@example.com,Follow-up
Bob,Johnson,9876543212,bob@example.com,Prospect
```

## 🔍 Test Endpoints

### Health Check
```bash
curl http://localhost:5001/api/health
```

### Login
```bash
curl -X POST http://localhost:5001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@example.com","password":"yourpassword"}'
```

### Get Leads
```bash
curl http://localhost:5001/api/leads \
  -H "Authorization: Bearer YOUR_TOKEN"
```

## 🐛 Troubleshooting

### Backend Not Running
```bash
cd server
npm start
```

### Frontend Not Running
```bash
cd client
npm start
```

### Database Connection Error
- Check `server/.env` has `DATABASE_URL`
- Verify Railway database is accessible
- Run: `npm run production-setup`

### Bulk Import Fails
- Check CSV has required columns: `name` (or `first_name` + `last_name`) and `phone` (or `phone_number`)
- Check file format (CSV or Excel)
- Check browser console for errors
- Check server logs

### CORS Errors
- Verify backend CORS is enabled
- Check frontend API URL in `client/src/config/api.js`

## ✅ Success Indicators

- ✅ Can login
- ✅ Dashboard shows data
- ✅ Can create leads manually
- ✅ Can bulk import CSV/Excel
- ✅ Leads appear in list
- ✅ Can edit leads
- ✅ No console errors

---

**Your app is ready to test! 🚀**
