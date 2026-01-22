# How to Create New Users in the CRM

## Current Situation

Only the demo users exist:
- Admin: `admin@toniosenora.com` / `admin123`
- Staff: `emy@toniosenora.com` / `staff123`

## Method 1: Using Command Line Script (Easiest)

### Create a New Staff Member

```bash
cd server
npm run create-user "John Doe" "john@toniosenora.com" "password123" "STAFF"
```

### Create a New Admin

```bash
cd server
npm run create-user "New Admin" "newadmin@toniosenora.com" "adminpass123" "ADMIN"
```

### Examples

**Create Staff:**
```bash
npm run create-user "Sarah Johnson" "sarah@toniosenora.com" "sarah123" "STAFF"
```

**Create Admin:**
```bash
npm run create-user "Manager Name" "manager@toniosenora.com" "manager123" "ADMIN"
```

## Method 2: Using API (After Login as Admin)

Once logged in as admin, you can use the API:

```bash
# Get your JWT token from browser (after login)
# Then create user via API:

curl -X POST http://localhost:5001/api/users \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@toniosenora.com",
    "password": "password123",
    "role": "STAFF"
  }'
```

## Method 3: Direct Database Edit (Not Recommended)

You can manually edit `server/data/crm.json` but this is error-prone and passwords must be hashed.

## Quick Start - Create a New Staff

1. Open terminal in the `server` directory
2. Run:
   ```bash
   npm run create-user "Staff Name" "staff@toniosenora.com" "password123" "STAFF"
   ```
3. The user will be created immediately
4. Share credentials with the staff member
5. They can login right away

## What Happens When User is Created

- ✅ User is added to database
- ✅ Password is securely hashed
- ✅ User can immediately login
- ✅ Login attempts will be recorded
- ✅ User will see only their own data (if STAFF)

## Verify User Creation

Check `server/data/crm.json` - you should see the new user in the `users` array.

## Troubleshooting

**"User already exists" error:**
- Email is already in use
- Use a different email

**"Cannot find module" error:**
- Make sure you're in the `server` directory
- Run `npm install` first

## Next Steps

After creating users via command line, they can:
1. Go to login page
2. Enter their email and password
3. Login successfully
4. See their dashboard

All login attempts will be automatically recorded!
