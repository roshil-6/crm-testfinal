# User Roles and Permissions Implementation

## Overview
This document describes the implementation of the role-based access control system with team management for the CRM.

## User Roles

### 1. ADMIN (Full Access)
- **Users**: ROJISHA, SREELAKSHMI, SHEELA, SNEHA
- **Permissions**:
  - Can view all dashboards (company-wide)
  - Can view all leads
  - Can view all attendance records
  - Can manage all users
  - Can assign leads to any staff member
  - Can see check-in/check-out times for all users

### 2. SALES_TEAM_HEAD (Team Manager)
- **Users**: Varsha, Kiran
- **Permissions**:
  - Can view their own dashboard
  - Can view their team members' dashboards (only those assigned to them)
  - Can view leads assigned to themselves and their team members
  - Can view attendance for themselves and their team members
  - Can assign leads to themselves or their team members
  - **Cannot** see other teams' data

### 3. SALES_TEAM (Sales Team Member)
- **Users**: Emy, Shilpa, Asna, Karthika, Jibina
- **Team Assignments**:
  - Varsha's Team: Emy, Shilpa, Asna
  - Kiran's Team: Karthika, Jibina
- **Permissions**:
  - Can view only their own dashboard
  - Can view only their own leads
  - Can view only their own attendance
  - Can create leads (assigned to themselves)
  - Can check in/out

### 4. PROCESSING
- **Users**: Kripa
- **Permissions**:
  - Can view only their own dashboard
  - Can view only their own leads
  - Can view only their own attendance
  - Can check in/out

## Database Structure

### User Fields
- `id`: Unique user ID
- `name`: User's full name
- `email`: User's email address
- `password`: Hashed password
- `role`: User role (ADMIN, SALES_TEAM_HEAD, SALES_TEAM, PROCESSING, STAFF)
- `team`: Team identifier (sales, processing, admin)
- `managed_by`: ID of the team head who manages this user (for SALES_TEAM members)
- `created_at`: Creation timestamp
- `updated_at`: Last update timestamp

## Access Control Implementation

### Dashboard Access
- **ADMIN**: Sees all leads, all staff performance, company-wide metrics
- **SALES_TEAM_HEAD**: Sees their own + their team members' leads and metrics
- **SALES_TEAM/PROCESSING**: Sees only their own leads and metrics

### Leads Access
- **ADMIN**: Can view, create, update, and assign all leads
- **SALES_TEAM_HEAD**: Can view and manage leads assigned to themselves or their team
- **SALES_TEAM/PROCESSING**: Can only view and manage their own leads

### Attendance Access
- **ADMIN**: Can view all attendance records with filtering
- **SALES_TEAM_HEAD**: Can view attendance for themselves and their team members
- **SALES_TEAM/PROCESSING**: Can only view their own attendance and check in/out

## User Creation

### Running the User Creation Script
```bash
cd server
node scripts/createAllUsers.js
```

This script will:
1. Create all sales team heads first (Varsha, Kiran)
2. Create all sales team members with team assignments
3. Create processing user (Kripa)
4. Create all admin users
5. Skip users that already exist

### User Credentials

#### Sales Team
- Emy: emy@toniosenora.com / emysenora321
- Shilpa: shilpa@toniosenora.com / shilpasenora432
- Asna: asna@toniosenora.com / asnasenora543
- Karthika: karthika@toniosenora.com / karthikasenora654
- Jibina: jibina@toniosenora.com / jibinasenora765

#### Sales Team Heads
- Varsha: varsha@toniosenora.com / varshasenora876
- Kiran: kiran@toniosenora.com / kiransenora098

#### Processing
- Kripa: kripa@toniosenora.com / kripasenora325

#### Admins
- ROJISHA: rojishahead@toniosenora.com / rojishasenoramain000
- SREELAKSHMI: sreelakshmi@toniosenora.com / sreelakshmisenora000
- SHEELA: sheela@toniosenora.com / sheelasenorasub000
- SNEHA: sneha@toniosenora.com / snehasenora010

## Key Features

1. **Team Isolation**: Sales team heads can only see their assigned team members
2. **Data Isolation**: Sales team members can only see their own data
3. **Admin Override**: Admins can see everything
4. **Flexible Assignment**: Team members are assigned to heads via `managed_by` field

## Files Modified

### Backend
- `server/scripts/createAllUsers.js`: User creation script with all users
- `server/config/database.js`: Added `managed_by` filter support
- `server/middleware/auth.js`: Added role support
- `server/routes/dashboard.js`: Updated access control logic
- `server/routes/attendance.js`: Updated team head access
- `server/routes/leads.js`: Updated team head access
- `server/routes/users.js`: Updated role validation

### Frontend
- `client/src/pages/Dashboard.js`: Updated role checks
- `client/src/pages/Attendance.js`: Updated for team head access
- `client/src/pages/UserManagement.js`: Added new role options

## Security Notes

- All access control is enforced at the backend API level
- Frontend role checks are for UI display only
- JWT tokens include user role for authorization
- Team assignments are verified on every request
