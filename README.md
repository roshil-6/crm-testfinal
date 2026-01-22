# Tonio & Senora CRM System

A comprehensive Customer Relationship Management (CRM) system built with React and Node.js.

## Features

- ✅ **User Role Management**: Admin, Sales Team Head, Sales Team, Processing
- ✅ **Lead Management**: Create, assign, and track leads
- ✅ **Notification System**: Real-time notifications when leads are assigned
- ✅ **Attendance Tracking**: Check-in/check-out functionality
- ✅ **Team Management**: Sales team heads can manage their teams
- ✅ **Interactive UI**: Golden animated background lines
- ✅ **Search Functionality**: Search leads by name, phone, email, or staff member

## Tech Stack

- **Frontend**: React 18, React Router, Axios
- **Backend**: Node.js, Express.js
- **Database**: JSON file-based (server/data/crm.json)
- **Authentication**: JWT tokens

## Quick Start

### Prerequisites
- Node.js 18+ installed
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/roshil-6/CRM-.git
cd CRM
```

2. Install dependencies:
```bash
# Backend
cd server
npm install

# Frontend
cd ../client
npm install
```

3. Create users:
```bash
cd server
node scripts/createAllUsers.js
```

4. Start the application:

**Terminal 1 - Backend:**
```bash
cd server
npm start
```

**Terminal 2 - Frontend:**
```bash
cd client
npm start
```

5. Access the application:
- Frontend: http://localhost:3000
- Backend API: http://localhost:5001

## User Credentials

See [USER_CREDENTIALS_SUMMARY.md](./USER_CREDENTIALS_SUMMARY.md) for all user credentials.

## Deployment

See [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) for detailed deployment instructions for Vercel and Netlify.

### Quick Deployment Notes:

**For Vercel/Netlify:**
- Set **Root Directory** to `client`
- Set **Build Command** to `npm install && npm run build`
- Set **Output Directory** to `build`
- Add environment variable: `REACT_APP_API_URL` (your backend URL)

**Backend Deployment:**
- Deploy to Heroku, Railway, Render, or DigitalOcean
- Backend requires file system access for JSON database

## Project Structure

```
CRM/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   ├── pages/          # Page components
│   │   ├── context/        # React context
│   │   └── config/        # Configuration
│   └── public/            # Static files
├── server/                 # Node.js backend
│   ├── routes/            # API routes
│   ├── config/            # Database config
│   ├── middleware/        # Auth middleware
│   ├── scripts/           # Utility scripts
│   └── data/              # JSON database
└── Documentation files
```

## Key Features

### Role-Based Access Control
- **Admin**: Full access to all data
- **Sales Team Head**: Access to own team's data only
- **Sales Team**: Access to own data only
- **Processing**: Access to own data only

### Notification System
- Bell icon in navigation bar
- Notifications when leads are assigned
- Unread count badge
- Mark as read functionality

### Team Management
- Sales team members assigned to team heads
- Team heads can view their team's dashboards
- Isolated data access per team

## Documentation

- [User Credentials Summary](./USER_CREDENTIALS_SUMMARY.md)
- [Deployment Guide](./DEPLOYMENT_GUIDE.md)
- [User Roles Implementation](./USER_ROLES_IMPLEMENTATION.md)
- [How to Start](./HOW_TO_START.md)

## License

Private project for Tonio & Senora
