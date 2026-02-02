# User Verification Summary - CRM System

## ✅ All Users Created Successfully

### Sales Team (5 users)
1. **Emy** - emy@toniosenora.com / emysenora321
   - Role: SALES_TEAM
   - Managed by: Varsha
   - Access: Own dashboard only, can view check-in/out times

2. **Shilpa** - shilpa@toniosenora.com / shilpasenora432
   - Role: SALES_TEAM
   - Managed by: Varsha
   - Access: Own dashboard only

3. **Asna** - asna@toniosenora.com / asnasenora543
   - Role: SALES_TEAM
   - Managed by: Varsha
   - Access: Own dashboard only

4. **Karthika** - karthika@toniosenora.com / karthikasenora654
   - Role: SALES_TEAM
   - Managed by: Kiran
   - Access: Own dashboard only

5. **Jibina** - jibina@toniosenora.com / jibinasenora765
   - Role: SALES_TEAM
   - Managed by: Kiran
   - Access: Own dashboard only

### Sales Team Heads (2 users)
1. **Varsha** - varsha@toniosenora.com / varshasenora876
   - Role: SALES_TEAM_HEAD
   - Team: Emy, Shilpa, Asna
   - Access: Own dashboard + team dashboards + team check-in/out times

2. **Kiran** - kiran@toniosenora.com / kiransenora098
   - Role: SALES_TEAM_HEAD
   - Team: Karthika, Jibina
   - Access: Own dashboard + team dashboards + team check-in/out times

### Processing Team (1 user)
1. **Kripa** - kripa@toniosenora.com / kripasenora325
   - Role: PROCESSING
   - Access: Specialized processing dashboard (Stage 2)
   - Can view clients assigned for processing

### Admins (4 users - Full Access)
1. **ROJISHA** - rojishahead@toniosenora.com / rojishasenoramain000
   - Role: ADMIN
   - Access: Full dashboard access to all users, all check-in/out times
   - Can view all leads, clients, and staff dashboards

2. **SREELAKSHMI** - sreelakshmi@toniosenora.com / sreelakshmisenora000
   - Role: ADMIN
   - Access: Full dashboard access (Sales Team Admin)

3. **SHEELA** - sheela@toniosenora.com / sheelasenorasub000
   - Role: ADMIN
   - Access: Full dashboard access (Sales Team Admin)

4. **SNEHA** - sneha@toniosenora.com / snehasenora010
   - Role: ADMIN (but also Processing Team member)
   - Access: 
     - Full admin dashboard access
     - Specialized processing dashboard (Stage 1) when viewing own dashboard
     - Can view all staff dashboards including Kripa's

## Access Control Logic

### Sales Team Members (Emy, Shilpa, Asna, Karthika, Jibina)
- ✅ Can only see their own leads
- ✅ Can only see their own dashboard
- ✅ Can check in/out for themselves
- ✅ Can import/export their own leads
- ❌ Cannot view other staff dashboards
- ❌ Cannot view other staff check-in/out times

### Sales Team Heads (Varsha, Kiran)
- ✅ Can see their own leads + team members' leads
- ✅ Can view their own dashboard + team members' dashboards
- ✅ Can view their own + team members' check-in/out times
- ✅ Can assign leads to themselves or team members
- ✅ Can import/export leads for their team
- ❌ Cannot view other teams' dashboards
- ❌ Cannot view other teams' check-in/out times

### Processing Team (Kripa)
- ✅ Can see clients assigned for processing
- ✅ Has specialized dashboard (Processing Stage 2)
- ✅ Can update client processing status
- ✅ Can import/export leads
- ❌ Cannot see leads (only clients)
- ❌ Cannot view other staff dashboards

### Admins (ROJISHA, SREELAKSHMI, SHEELA, SNEHA)
- ✅ Can see ALL leads and clients
- ✅ Can view ALL staff dashboards
- ✅ Can view ALL check-in/out times
- ✅ Can assign leads to any staff
- ✅ Can import/export all leads
- ✅ Can manage users
- ✅ Can view attendance for all staff

### Special Case: SNEHA
- ✅ Has ADMIN role (full access)
- ✅ Also has specialized processing dashboard (Stage 1)
- ✅ When viewing own dashboard: Shows Processing Stage 1 dashboard
- ✅ When viewing as admin: Can see all dashboards including Kripa's
- ✅ Can view clients assigned to her (Stage 1)
- ✅ Can assign clients to Kripa (Stage 2)

## Bulk Import/Export

### Who Can Import
- ✅ ADMIN (all roles)
- ✅ SALES_TEAM_HEAD
- ✅ SALES_TEAM
- ✅ PROCESSING
- ✅ STAFF

### Import Behavior
- **ADMIN**: Leads assigned to no one (null) - can assign later
- **Others**: Leads automatically assigned to the importing user

### Export Behavior
- **ADMIN**: Exports all leads
- **SALES_TEAM_HEAD**: Exports own + team leads
- **Others**: Exports only own leads

## Dashboard Access Summary

| User Role | Own Dashboard | Team Dashboards | All Dashboards | Check-in/out Times |
|-----------|---------------|-----------------|----------------|-------------------|
| SALES_TEAM | ✅ | ❌ | ❌ | Own only |
| SALES_TEAM_HEAD | ✅ | ✅ (Team only) | ❌ | Own + Team |
| PROCESSING | ✅ (Specialized) | ❌ | ❌ | Own only |
| ADMIN | ✅ | ✅ | ✅ | All |

## Special Dashboards

### Sneha's Dashboard (Processing Stage 1)
- Shows clients assigned after "Registration Completed"
- Can assign clients to Kripa for Stage 2 processing
- Accessible to: Sneha (self) and Admins viewing Sneha

### Kripa's Dashboard (Processing Stage 2)
- Shows clients assigned for processing
- Can update processing status and fee information
- Accessible to: Kripa (self) and Admins viewing Kripa

## Verification Checklist

- [x] All users created with correct passwords
- [x] All roles assigned correctly
- [x] Team assignments (managed_by) set correctly
- [x] Access control logic implemented
- [x] Sneha's specialized dashboard works
- [x] Kripa's specialized dashboard works
- [x] Sales team heads can view their teams
- [x] Admins can view all dashboards
- [x] Bulk import works for all roles
- [x] Bulk export works with role-based filtering
- [x] Attendance access control works
- [x] Check-in/out times visible to correct roles

## Testing Instructions

1. **Test Sales Team Access:**
   - Login as Emy → Should only see own leads/dashboard
   - Try to access Shilpa's dashboard → Should be denied

2. **Test Sales Team Head Access:**
   - Login as Varsha → Should see own + Emy, Shilpa, Asna dashboards
   - Try to access Karthika's dashboard → Should be denied (different team)

3. **Test Admin Access:**
   - Login as ROJISHA → Should see all dashboards
   - View Sneha's dashboard → Should show Processing Stage 1
   - View Kripa's dashboard → Should show Processing Stage 2

4. **Test Processing Team:**
   - Login as Kripa → Should see specialized processing dashboard
   - Should NOT see leads, only clients

5. **Test Bulk Import:**
   - Login as any role → Import CSV → Should work
   - Check assigned_staff_id → Should be correct based on role

6. **Test Attendance:**
   - Login as Varsha → Should see team check-in/out times
   - Login as Emy → Should only see own check-in/out

## Notes

- All passwords are stored as bcrypt hashes
- SQLite database is used (no JSON file)
- All access control is enforced at the API level
- Frontend also has role-based UI restrictions
- Sneha and Kripa are special cases (ADMIN role but processing team functionality)
