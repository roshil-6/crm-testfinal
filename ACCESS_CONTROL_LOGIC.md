# Complete Access Control Logic - CRM System

## Overview
This document explains **exactly** what each staff member can access based on their role in the CRM system.

---

## 🎭 User Roles

### 1. **ADMIN** (Full System Access)
**Users:** ROJISHA, SREELAKSHMI, SHEELA, SNEHA

**Special Cases:**
- **SNEHA** and **KRIPA** are ADMIN but also part of the **Processing Team**
- They have specialized dashboards for client processing

---

### 2. **SALES_TEAM_HEAD** (Team Manager)
**Users:** Varsha, Kiran

**Team Structure:**
- **Varsha's Team:** Emy, Shilpa, Asna
- **Kiran's Team:** Karthika, Jibina

---

### 3. **SALES_TEAM** (Sales Team Member)
**Users:** Emy, Shilpa, Asna, Karthika, Jibina

**Special Case:**
- **Emy** has **read-only monitoring access** to specific staff: Karthika, Jibina, Asna, Shilpa

---

### 4. **PROCESSING** (Client Processing)
**Users:** Kripa

**Special Case:**
- **Sneha** (ADMIN) also works in Processing Team (Stage 1)
- **Kripa** works in Processing Team (Stage 2)

---

## 📊 Access Control by Feature

### 1. **DASHBOARD ACCESS**

#### **ADMIN (ROJISHA, SREELAKSHMI, SHEELA)**
✅ **Can Access:**
- Main dashboard with **ALL** company data
- View **ALL** staff members' dashboards
- See **ALL** leads (company-wide)
- See **ALL** clients (company-wide)
- See **ALL** staff performance metrics
- View Sneha's and Kripa's specialized processing dashboards

❌ **Cannot:**
- Nothing - full access

**Dashboard Shows:**
- Total leads across all staff
- Total clients across all staff
- Leads by status (company-wide)
- Clients by status (company-wide)
- Staff performance table (all non-admin staff + Sneha/Kripa)
- Recent leads (all staff)
- Recent clients (all staff)
- Attendance overview (all staff)

---

#### **ADMIN - SNEHA (Processing Team Member)**
✅ **Can Access:**
- **Her own specialized dashboard** (Processing Stage 1)
- Main admin dashboard (when viewing as admin)
- All other admin features

**Her Dashboard Shows:**
- Clients assigned to her (`assigned_staff_id = Sneha's ID`)
- Processing Stage 1 metrics
- Client management interface
- Payment status tracking

---

#### **SALES_TEAM_HEAD (Varsha, Kiran)**
✅ **Can Access:**
- Their own dashboard
- Their team members' dashboards (only those they manage)
- Cannot see other teams' data

**Dashboard Shows:**
- Leads assigned to themselves + their team members
- Clients assigned to themselves + their team members
- Team performance metrics (only their team)
- Staff performance table (only their team members)
- Recent leads (only their team)
- Recent clients (only their team)

**Example:**
- **Varsha** can see: Varsha, Emy, Shilpa, Asna
- **Varsha** CANNOT see: Kiran, Karthika, Jibina

---

#### **SALES_TEAM (Emy, Shilpa, Asna, Karthika, Jibina)**
✅ **Can Access:**
- **Only their own dashboard**
- Cannot see other staff members' dashboards

**Dashboard Shows:**
- Only leads assigned to them
- Only clients assigned to them
- Their own performance metrics
- Their own recent leads
- Their own recent clients

**Special Case - Emy:**
- **Read-only monitoring** access to: Karthika, Jibina, Asna, Shilpa
- Can view their dashboards but **cannot edit** anything
- Cannot see other staff (Varsha, Kiran, etc.)

---

#### **PROCESSING (Kripa)**
✅ **Can Access:**
- **Her own specialized dashboard** (Processing Stage 2)
- Cannot see other staff dashboards

**Her Dashboard Shows:**
- Clients assigned for processing (`processing_staff_id = Kripa's ID`)
- Processing Stage 2 metrics
- Client processing interface
- Payment tracking

---

### 2. **LEADS ACCESS**

#### **ADMIN**
✅ **Can:**
- View **ALL** leads (no filtering)
- Create leads
- Edit **ANY** lead
- Delete **ANY** lead
- Assign leads to **ANY** staff member
- Change lead status
- Add comments to **ANY** lead
- Bulk assign leads

**Filter Applied:** None (sees everything)

---

#### **SALES_TEAM_HEAD**
✅ **Can:**
- View leads assigned to **themselves + their team members**
- Create leads (assigned to themselves or team members)
- Edit leads assigned to **themselves + their team members**
- Assign leads to **themselves or their team members**
- Add comments to **their team's leads**

❌ **Cannot:**
- See leads from other teams
- Assign leads to other teams
- Edit leads from other teams

**Filter Applied:** `assigned_staff_id IN [self_id, team_member_ids]`

**Example:**
- **Varsha** sees: Leads assigned to Varsha, Emy, Shilpa, Asna
- **Varsha** CANNOT see: Leads assigned to Kiran, Karthika, Jibina

---

#### **SALES_TEAM**
✅ **Can:**
- View **ONLY** leads assigned to them
- Create leads (automatically assigned to themselves)
- Edit **ONLY** their own leads
- Add comments to **ONLY** their own leads

❌ **Cannot:**
- See other staff members' leads
- Assign leads to others
- Change lead assignment
- Edit other staff's leads

**Filter Applied:** `assigned_staff_id = their_user_id`

**Special Case - Emy:**
- Can **view** (read-only) leads of: Karthika, Jibina, Asna, Shilpa
- Cannot edit those leads

---

#### **PROCESSING (Kripa)**
✅ **Can:**
- View **ONLY** leads assigned to her
- Create leads (assigned to herself)
- Edit **ONLY** her own leads

❌ **Cannot:**
- See other staff members' leads
- Assign leads to others

**Filter Applied:** `assigned_staff_id = Kripa's user_id`

---

### 3. **CLIENTS ACCESS**

#### **ADMIN**
✅ **Can:**
- View **ALL** clients
- Create clients
- Edit **ANY** client
- Delete **ANY** client
- Assign clients to **ANY** staff member
- Assign processing staff (`processing_staff_id`)
- See all payment information

**Filter Applied:** None (sees everything)

---

#### **SALES_TEAM_HEAD**
✅ **Can:**
- View clients assigned to **themselves + their team members**
- Create clients (assigned to themselves or team members)
- Edit clients assigned to **themselves + their team members**

❌ **Cannot:**
- See clients from other teams
- Assign clients to other teams

**Filter Applied:** `assigned_staff_id IN [self_id, team_member_ids]`

---

#### **SALES_TEAM**
✅ **Can:**
- View **ALL** clients (but payment data may be restricted)
- Create clients (assigned to themselves)
- Edit clients assigned to them

**Note:** All staff can see all clients, but editing is restricted to assigned clients.

**Filter Applied:** 
- **View:** No filter (sees all)
- **Edit:** `assigned_staff_id = their_user_id`

---

#### **PROCESSING (Kripa)**
✅ **Can:**
- View clients assigned for processing (`processing_staff_id = Kripa's ID`)
- Update processing status
- Update payment information
- Update fee status

**Filter Applied:** `processing_staff_id = Kripa's user_id`

---

### 4. **ATTENDANCE ACCESS**

#### **ADMIN**
✅ **Can:**
- View **ALL** staff attendance records
- See check-in/check-out times for **everyone**
- Filter by user, date range
- Export attendance data

**Filter Applied:** None (sees everything)

---

#### **SALES_TEAM_HEAD**
✅ **Can:**
- View attendance for **themselves + their team members**
- See check-in/check-out times for their team
- Filter by team member, date range

❌ **Cannot:**
- See other teams' attendance

**Filter Applied:** `user_id IN [self_id, team_member_ids]`

---

#### **SALES_TEAM**
✅ **Can:**
- View **ONLY** their own attendance
- Check in/out for themselves
- See their own check-in/check-out times

❌ **Cannot:**
- See other staff attendance

**Filter Applied:** `user_id = their_user_id`

**Special Case - Emy:**
- Can **view** (read-only) attendance of: Karthika, Jibina, Asna, Shilpa

---

#### **PROCESSING (Kripa)**
✅ **Can:**
- View **ONLY** her own attendance
- Check in/out for herself

**Filter Applied:** `user_id = Kripa's user_id`

---

### 5. **USER MANAGEMENT ACCESS**

#### **ADMIN**
✅ **Can:**
- View **ALL** users
- Create new users (any role)
- Edit **ANY** user (name, email, password, role)
- Delete users (except their own account)
- Assign team relationships (`managed_by`)

**Access:** Full access to `/api/users` endpoints

---

#### **SALES_TEAM_HEAD**
❌ **Cannot:**
- Access user management
- Create/edit/delete users
- View user list

**Access:** Blocked (403 Forbidden)

---

#### **SALES_TEAM**
❌ **Cannot:**
- Access user management
- Create/edit/delete users
- View user list

**Access:** Blocked (403 Forbidden)

---

#### **PROCESSING (Kripa)**
❌ **Cannot:**
- Access user management
- Create/edit/delete users
- View user list

**Access:** Blocked (403 Forbidden)

---

## 🔐 Special Access Rules

### **Emy's Monitoring Access**
**User:** Emy (SALES_TEAM role)

**Special Permissions:**
- **Read-only** access to monitor:
  - Karthika
  - Jibina
  - Asna
  - Shilpa

**What Emy Can Do:**
- ✅ View their dashboards (read-only)
- ✅ View their leads (read-only)
- ✅ View their attendance (read-only)
- ❌ Cannot edit anything
- ❌ Cannot see other staff (Varsha, Kiran, etc.)

**Implementation:**
- Checked in dashboard route: `isEmy` flag
- Restricted to specific staff names only

---

### **Processing Team Special Dashboards**

#### **Sneha (Processing Stage 1)**
- **Role:** ADMIN (but also Processing Team)
- **Dashboard Type:** Client Management Dashboard
- **Shows:**
  - Clients assigned to her (`assigned_staff_id = Sneha's ID`)
  - Processing Stage 1 metrics
  - "Registration Completed" clients
  - Payment tracking

**Access:**
- Sneha can view her own processing dashboard
- Admins can view Sneha's processing dashboard

---

#### **Kripa (Processing Stage 2)**
- **Role:** PROCESSING
- **Dashboard Type:** Client Processing Dashboard
- **Shows:**
  - Clients assigned for processing (`processing_staff_id = Kripa's ID`)
  - Processing Stage 2 metrics
  - Payment status tracking
  - Fee status management

**Access:**
- Kripa can view her own processing dashboard
- Admins can view Kripa's processing dashboard

---

## 📋 Data Filtering Logic

### **How `getAccessibleUserIds()` Works**

```javascript
function getAccessibleUserIds(user) {
  if (role === 'ADMIN') {
    return null; // null = all users
  } else if (role === 'SALES_TEAM_HEAD') {
    const teamMembers = db.getUsers({ managed_by: userId });
    return [userId, ...teamMembers.map(u => u.id)];
  } else if (role === 'SALES_TEAM' || role === 'PROCESSING') {
    return [userId]; // Only themselves
  }
  return [userId]; // Default: only self
}
```

**Usage:**
- Used in dashboard, leads, and attendance routes
- Filters data based on `assigned_staff_id` or `user_id`
- Enforced at **backend API level** (cannot be bypassed)

---

## 🛡️ Security Enforcement

### **Multi-Layer Protection**

1. **Backend Database Level** ✅
   - All queries filter by user ID or role
   - Data filtered before sending to frontend
   - Cannot be bypassed by frontend manipulation

2. **API Middleware Level** ✅
   - JWT token contains user ID and role
   - Every request authenticated
   - Role-based access control on every route

3. **Frontend Level** ✅
   - UI elements hidden based on role
   - Routes protected with authentication
   - But frontend is **NOT** the security layer

---

## 📊 Summary Table

| Role | Dashboard | Leads | Clients | Attendance | User Mgmt | Staff Dashboards |
|------|-----------|-------|---------|------------|-----------|------------------|
| **ADMIN** | All | All | All | All | ✅ Full | All staff |
| **SALES_TEAM_HEAD** | Self + Team | Self + Team | Self + Team | Self + Team | ❌ No | Team members only |
| **SALES_TEAM** | Self only | Self only | All (view), Self (edit) | Self only | ❌ No | ❌ No |
| **PROCESSING** | Self only | Self only | Processing clients | Self only | ❌ No | ❌ No |
| **Emy (Special)** | Self + Monitor 4 | Self + Monitor 4 | All (view) | Self + Monitor 4 | ❌ No | 4 staff (read-only) |

---

## 🔍 Code Locations

### **Access Control Logic:**
- `server/routes/dashboard.js` - Dashboard access rules
- `server/routes/leads.js` - Leads filtering
- `server/routes/clients.js` - Clients filtering
- `server/routes/attendance.js` - Attendance filtering
- `server/routes/users.js` - User management (ADMIN only)

### **Helper Functions:**
- `getAccessibleUserIds()` - Determines which user IDs a role can access
- `authenticate` middleware - Verifies JWT token
- `requireAdmin` middleware - Restricts to ADMIN only

---

## ✅ Key Points

1. **Data Isolation:** Each role sees only what they're allowed to see
2. **Backend Enforcement:** All filtering happens at API level
3. **Team Structure:** Sales team heads manage their teams via `managed_by` field
4. **Special Cases:** Emy has read-only monitoring, Sneha/Kripa have processing dashboards
5. **Security:** Frontend cannot bypass backend restrictions

---

## 🎯 Example Scenarios

### **Scenario 1: Varsha (Sales Team Head)**
- Logs in → Sees dashboard
- Dashboard shows: Leads/clients for Varsha, Emy, Shilpa, Asna
- Can click on Emy's name → Views Emy's dashboard
- Cannot see Kiran's team data

### **Scenario 2: Emy (Sales Team Member)**
- Logs in → Sees dashboard
- Dashboard shows: Only Emy's leads/clients
- Can click on Karthika's name → Views Karthika's dashboard (read-only)
- Cannot see Varsha's or Kiran's data

### **Scenario 3: ROJISHA (Admin)**
- Logs in → Sees main dashboard
- Dashboard shows: All company data
- Can click on any staff name → Views their dashboard
- Can view Sneha's processing dashboard
- Can view Kripa's processing dashboard
- Full access to everything

---

**Last Updated:** Based on current codebase implementation
