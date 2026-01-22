# Staff Onboarding Plan

## Current Situation

### How Staff Currently Enter the CRM

**Current Process:**
1. Admin runs `npm run init-db` to create initial users
2. Staff credentials are hardcoded in the initialization script
3. Staff receive credentials from admin (email/password)
4. Staff login with provided credentials
5. **No automatic user creation** - must be done manually

### Current Limitations
- ❌ No admin interface to create new staff
- ❌ No user registration/signup page
- ❌ Login attempts are NOT recorded
- ❌ No password reset functionality
- ❌ Users must be created manually in code/database

## Recommended Solution

### Option 1: Admin Creates Staff (Recommended)
**Process:**
1. Admin logs in
2. Admin goes to "User Management" page
3. Admin creates new staff account with:
   - Name
   - Email
   - Temporary password
   - Role (STAFF)
4. Admin shares credentials with new staff
5. Staff logs in with provided credentials
6. **Login is recorded** (timestamp, user, success/failure)

### Option 2: Self-Registration (Alternative)
**Process:**
1. Staff visits signup page
2. Staff enters: Name, Email, Password
3. System creates account as STAFF
4. Staff can immediately login
5. **Registration is recorded**

## What Gets Recorded

### Login Activity (Recommended)
- ✅ Login timestamp
- ✅ User ID
- ✅ Email used
- ✅ Success/Failure status
- ✅ IP address (optional)
- ✅ User agent (optional)

### User Creation Activity
- ✅ Created by (admin user ID)
- ✅ Creation timestamp
- ✅ User details (name, email, role)

## Implementation Plan

I'll implement:
1. **Admin User Management Page** - Create/edit/delete staff
2. **Login Activity Logging** - Record all login attempts
3. **User Creation API** - Admin-only endpoint
4. **Activity Log View** - Admin can see login history

Would you like me to implement this now?
