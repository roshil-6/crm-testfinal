# Backend API URLs

## Local Development

When running locally, use these URLs:

- **Root**: http://localhost:5001
- **Health Check**: http://localhost:5001/api/health
- **API Base**: http://localhost:5001/api

## API Endpoints

### Authentication
- `POST /api/auth/login` - Login
- `GET /api/auth/me` - Get current user

### Dashboard
- `GET /api/dashboard` - Get dashboard data

### Leads
- `GET /api/leads` - Get all leads
- `POST /api/leads` - Create lead
- `GET /api/leads/:id` - Get single lead
- `PUT /api/leads/:id` - Update lead

### Attendance
- `POST /api/attendance/checkin` - Check in
- `POST /api/attendance/checkout` - Check out
- `GET /api/attendance/today` - Get today's status
- `GET /api/attendance/history` - Get attendance history

### Users
- `GET /api/users` - Get all users (Admin only)
- `POST /api/users` - Create user (Admin only)

### Notifications
- `GET /api/notifications` - Get notifications
- `GET /api/notifications/unread/count` - Get unread count
- `PUT /api/notifications/:id/read` - Mark as read

## Testing the Backend

1. **Check if server is running:**
   ```
   http://localhost:5001
   ```
   Should show API information

2. **Check health:**
   ```
   http://localhost:5001/api/health
   ```
   Should return: `{"status":"ok","database":"connected","type":"JSON"}`

3. **Test login:**
   ```bash
   POST http://localhost:5001/api/auth/login
   Body: {"email":"admin@toniosenora.com","password":"admin123"}
   ```

## For Vercel/Netlify Deployment

When deploying frontend, set environment variable:
```
REACT_APP_API_URL=http://localhost:5001
```

Or if backend is deployed separately:
```
REACT_APP_API_URL=https://your-backend-url.herokuapp.com
```
