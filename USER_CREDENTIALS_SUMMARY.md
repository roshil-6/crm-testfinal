# User Credentials & Role Summary

## ✅ All Users Configured

### Sales Team (5 users)
**Team Head: Varsha**
- **Emy** - emy@toniosenora.com / emysenora321
- **Shilpa** - shilpa@toniosenora.com / shilpasenora432
- **Asna** - asna@toniosenora.com / asnasenora543

**Team Head: Kiran**
- **Karthika** - karthika@toniosenora.com / karthikasenora654
- **Jibina** - jibina@toniosenora.com / jibinasenora765

**Permissions:**
- Can only see their own dashboard, leads, and attendance
- Can check in/out
- Receive notifications when leads are assigned to them

---

### Sales Team Heads (2 users)
- **Varsha** - varsha@toniosenora.com / varshasenora876
  - Manages: Emy, Shilpa, Asna
- **Kiran** - kiran@toniosenora.com / kiransenora098
  - Manages: Karthika, Jibina

**Permissions:**
- Can see their own dashboard + their team members' dashboards
- Can view leads assigned to themselves and their team
- Can view attendance for themselves and their team
- Can assign leads to themselves or their team members
- **Cannot** see other teams' data

---

### Processing (1 user)
- **Kripa** - kripa@toniosenora.com / kripasenora325

**Permissions:**
- Can only see their own dashboard, leads, and attendance
- Can check in/out

---

### Admins - Full Access (4 users)
- **ROJISHA** (Head Admin) - rojishahead@toniosenora.com / rojishasenoramain000
- **SREELAKSHMI** - sreelakshmi@toniosenora.com / sreelakshmisenora000
- **SHEELA** - sheela@toniosenora.com / sheelasenorasub000
- **SNEHA** - sneha@toniosenora.com / snehasenora010

**Permissions:**
- Full access to all dashboards
- Can view all leads
- Can view all attendance records
- Can assign leads to any staff member
- Can see check-in/check-out times for everyone
- Can manage all users
- **When assigning leads, staff receive notifications**

---

## Team Structure

```
ROJISHA (Head Admin)
├── SREELAKSHMI (Admin)
├── SHEELA (Admin)
├── SNEHA (Admin)
│
Sales Teams:
├── Varsha (Sales Team Head)
│   ├── Emy (Sales Team)
│   ├── Shilpa (Sales Team)
│   └── Asna (Sales Team)
│
└── Kiran (Sales Team Head)
    ├── Karthika (Sales Team)
    └── Jibina (Sales Team)

Processing:
└── Kripa (Processing)
```

---

## Notification System

- When **Admin** assigns a lead to any staff member, that staff receives a notification
- Notifications appear in the bell icon (🔔) in the top navigation
- Notifications remain until the staff member reads them
- Each notification shows: "Lead '[Lead Name]' has been assigned to you"

---

## Access Control Summary

| Role | Own Data | Team Data | All Data | Assign Leads |
|------|----------|-----------|----------|--------------|
| **SALES_TEAM** | ✅ | ❌ | ❌ | Only to self |
| **SALES_TEAM_HEAD** | ✅ | ✅ (their team only) | ❌ | To self + team |
| **PROCESSING** | ✅ | ❌ | ❌ | Only to self |
| **ADMIN** | ✅ | ✅ | ✅ | To anyone |

---

## Login Instructions

1. Open the application: http://localhost:3000
2. Use any of the credentials above
3. The system will show data based on your role and team assignments

---

**Last Updated:** Team assignments have been configured and verified ✅
