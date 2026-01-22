# User Management System - Complete Guide

## ✅ System Overview

The CRM now has a complete **User Management System** that allows administrators to:
- Create new admin and staff accounts
- Edit existing users (name, email, password, role)
- Delete users (except their own account)
- View all users in the system

## 🎯 Access Control

### Admin Users
- ✅ Can view **everyone's** leads and dashboard
- ✅ Can view all staff members' data
- ✅ Can create/edit/delete users
- ✅ Can assign leads to any staff member
- ✅ Full system access

### Staff Users
- ✅ Can view **only their own** leads and dashboard
- ✅ Cannot see other staff members' data
- ✅ Cannot access user management
- ✅ Can only edit their own assigned leads

## 📋 How to Use User Management

### Step 1: Login as Admin
1. Login with admin credentials:
   - Email: `admin@toniosenora.com`
   - Password: `admin123`

### Step 2: Access User Management
1. Click **"User Management"** in the sidebar (only visible to admins)
2. You'll see a list of all users in the system

### Step 3: Create New User

**To create an Admin:**
1. Click **"Add New User"** button
2. Fill in the form:
   - **Name**: Full name (e.g., "Manager Name")
   - **Email**: Email address (e.g., "manager@toniosenora.com")
   - **Password**: Minimum 6 characters
   - **Role**: Select **"Admin"**
3. Click **"Create User"**

**To create a Staff:**
1. Click **"Add New User"** button
2. Fill in the form:
   - **Name**: Full name (e.g., "John Doe")
   - **Email**: Email address (e.g., "john@toniosenora.com")
   - **Password**: Minimum 6 characters
   - **Role**: Select **"Staff"**
3. Click **"Create User"**

### Step 4: Edit User
1. Find the user in the table
2. Click the **Edit** button (pencil icon)
3. Update the fields:
   - Name, Email, Role can be changed
   - Password: Leave blank to keep current, or enter new password
4. Click **"Update User"**

### Step 5: Delete User
1. Find the user in the table
2. Click the **Delete** button (trash icon)
3. Confirm deletion
4. **Note**: You cannot delete your own account

## 🔐 User Roles Explained

### Admin Role
- **Dashboard**: Sees all leads, all staff activity
- **Leads**: Can view and edit all leads
- **User Management**: Full access
- **Attendance**: Can view all staff attendance

### Staff Role
- **Dashboard**: Sees only their own leads
- **Leads**: Can view and edit only their assigned leads
- **User Management**: No access (page shows "Access Denied")
- **Attendance**: Can view only their own attendance

## 📊 Data Visibility Rules

### Leads Visibility
- **Admin**: Sees ALL leads (all staff members' leads)
- **Staff**: Sees ONLY their assigned leads

### Dashboard Visibility
- **Admin**: Sees aggregate data for ALL leads
- **Staff**: Sees data for ONLY their leads

### User Management
- **Admin**: Full access to create/edit/delete users
- **Staff**: Cannot access (hidden from menu)

## 🚀 Quick Start Guide

### Initial Setup
1. Login as admin: `admin@toniosenora.com` / `admin123`
2. Go to **User Management**
3. Create your staff accounts:
   - Add each staff member with their email and password
   - Set role to **"Staff"**
4. Share credentials with staff members
5. Staff can now login and see only their data

### Creating Multiple Admins
1. In User Management, click **"Add New User"**
2. Set role to **"Admin"**
3. Admin will have same access as you

## 🔒 Security Features

- ✅ Passwords are hashed (never stored in plain text)
- ✅ Only admins can create/edit/delete users
- ✅ Admins cannot delete their own account
- ✅ Email addresses must be unique
- ✅ Role-based access control enforced at API level
- ✅ All login attempts are logged

## 📝 Example Workflow

1. **Admin creates staff account:**
   - Name: "Sarah Johnson"
   - Email: "sarah@toniosenora.com"
   - Password: "sarah123"
   - Role: Staff

2. **Admin assigns lead to Sarah:**
   - Create/edit lead
   - Select "Sarah Johnson" in "Assign To" dropdown

3. **Sarah logs in:**
   - Email: "sarah@toniosenora.com"
   - Password: "sarah123"
   - Sees only leads assigned to her
   - Cannot see other staff's leads

4. **Admin views dashboard:**
   - Sees all leads from all staff
   - Can view everyone's activity

## 🎨 UI Features

- **User Table**: Shows all users with role badges
- **Color Coding**: 
  - Admin: Orange badge
  - Staff: Blue badge
- **Current User**: Shows "(You)" next to your name
- **Form Validation**: Prevents duplicate emails, weak passwords
- **Error Messages**: Clear feedback on actions

## 📍 Navigation

- **User Management** appears in sidebar **only for admins**
- Staff users will not see this menu item
- Direct URL access is blocked for non-admins

## ✅ System Ready!

The user management system is fully functional. Admins can now:
- ✅ Add admin emails and passwords
- ✅ Add staff emails and passwords
- ✅ View everyone's leads and dashboard
- ✅ Control who can see what data

Staff members will automatically see only their assigned leads and data!
