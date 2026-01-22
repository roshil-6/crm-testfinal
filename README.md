# Tonio & Senora CRM System

A production-ready internal CRM system for Tonio & Senora company.

## Features

### Role-Based Access Control
- **ADMIN**: Full access to all data and features
- **STAFF**: Restricted access to only their own data

### Modules

1. **Dashboard**
   - STAFF: Personal metrics, lead status breakdown, today's follow-ups, recent activity
   - ADMIN: Company-wide metrics, staff performance, attendance overview

2. **Clients (Leads)**
   - Lead management with full CRUD operations
   - Status tracking (New, Follow-up, Under Processing, Converted, Closed/Rejected)
   - Comment system for lead communication
   - Search and filter capabilities
   - STAFF can only view/edit leads assigned to them
   - ADMIN can view all leads and assign to any staff

3. **Attendance**
   - Check-in/Check-out functionality
   - Attendance history
   - STAFF can only view their own attendance
   - ADMIN can view all staff attendance with filtering

## Technology Stack

### Backend
- Node.js with Express
- PostgreSQL database
- JWT authentication
- bcryptjs for password hashing

### Frontend
- React 18
- React Router for navigation
- Axios for API calls
- React Icons for UI icons

## Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- PostgreSQL (v12 or higher)
- npm or yarn

### Database Setup

1. Create a PostgreSQL database:
```sql
CREATE DATABASE tonio_senora_crm;
```

2. Update the database credentials in `server/.env`:
```
DB_HOST=localhost
DB_PORT=5432
DB_NAME=tonio_senora_crm
DB_USER=postgres
DB_PASSWORD=your_password
```

### Installation

1. Install root dependencies:
```bash
npm install
```

2. Install backend dependencies:
```bash
cd server
npm install
```

3. Install frontend dependencies:
```bash
cd ../client
npm install
```

4. Initialize the database (creates tables and seed data):
```bash
cd ../server
npm run init-db
```

This will create:
- All necessary database tables
- Admin user: `admin@toniosenora.com` / `admin123`
- Staff user (Emy P Thomas): `emy@toniosenora.com` / `staff123`

### Running the Application

From the root directory:
```bash
npm run dev
```

This will start both the backend server (port 5000) and frontend development server (port 3000).

Or run separately:

**Backend:**
```bash
cd server
npm run dev
```

**Frontend:**
```bash
cd client
npm start
```

## Default Login Credentials

- **Admin**: 
  - Email: `admin@toniosenora.com`
  - Password: `admin123`

- **Staff (Emy P Thomas)**: 
  - Email: `emy@toniosenora.com`
  - Password: `staff123`

## Security Features

### Backend Security
- All API endpoints require authentication
- Role-based authorization middleware
- Database-level filtering for STAFF users
- Password hashing with bcryptjs
- JWT token-based authentication

### Data Visibility Rules
- **STAFF users** can ONLY see:
  - Their own dashboard metrics
  - Leads assigned to them
  - Their own attendance records
  
- **ADMIN users** can see:
  - All staff dashboards
  - All leads
  - All attendance records

These restrictions are enforced at:
1. Database query level
2. API middleware level
3. Frontend UI level

## API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user

### Dashboard
- `GET /api/dashboard` - Get dashboard data (role-based)

### Leads
- `GET /api/leads` - Get all leads (filtered by role)
- `GET /api/leads/:id` - Get single lead
- `POST /api/leads` - Create new lead
- `PUT /api/leads/:id` - Update lead
- `GET /api/leads/:id/comments` - Get lead comments
- `POST /api/leads/:id/comments` - Add comment to lead
- `GET /api/leads/staff/list` - Get staff list (ADMIN only)

### Attendance
- `POST /api/attendance/checkin` - Check in
- `POST /api/attendance/checkout` - Check out
- `GET /api/attendance/today` - Get today's attendance status
- `GET /api/attendance/history` - Get attendance history (filtered by role)
- `GET /api/attendance/staff` - Get staff list (ADMIN only)

## Project Structure

```
CRM/
├── server/
│   ├── config/
│   │   └── database.js
│   ├── middleware/
│   │   └── auth.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── dashboard.js
│   │   ├── leads.js
│   │   └── attendance.js
│   ├── scripts/
│   │   └── initDatabase.js
│   ├── index.js
│   └── package.json
├── client/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   ├── App.js
│   │   └── index.js
│   └── package.json
└── package.json
```

## Important Notes

1. **Emy P Thomas is a STAFF user**, not an admin. This is enforced in the database and application logic.

2. **Data isolation**: STAFF users cannot access other staff members' data under any circumstance. This is enforced at multiple levels.

3. **Comments**: Comments cannot be edited or deleted after creation. Only authorized users can comment on leads they have access to.

4. **Lead Assignment**: 
   - STAFF can only create leads assigned to themselves
   - ADMIN can assign leads to any staff member

## Development

The application uses:
- Hot reloading for both frontend and backend
- CORS enabled for development
- Environment variables for configuration

## Production Deployment

Before deploying to production:

1. Change `JWT_SECRET` in `server/.env` to a strong, random secret
2. Update database credentials
3. Set `NODE_ENV=production`
4. Build the frontend: `cd client && npm run build`
5. Configure your web server to serve the built frontend and proxy API requests to the backend

## License

Internal use only - Tonio & Senora
