# Quick Guide: Create New Users

## Problem
You can only login with demo credentials because **only 2 demo users exist** in the database.

## Solution: Create New Users

### Method 1: Command Line (Easiest)

**Open terminal in the `server` folder and run:**

```bash
npm run create-user "Your Name" "your@email.com" "yourpassword" "STAFF"
```

**Examples:**

Create a STAFF user:
```bash
npm run create-user "John Doe" "john@toniosenora.com" "john123" "STAFF"
```

Create an ADMIN user:
```bash
npm run create-user "Manager Name" "manager@toniosenora.com" "manager123" "ADMIN"
```

### Method 2: Using API (After Admin Login)

1. Login as admin: `admin@toniosenora.com` / `admin123`
2. Use API endpoint: `POST /api/users`
3. Send JSON with user details

## Current Users in Database

1. **Admin User**
   - Email: `admin@toniosenora.com`
   - Password: `admin123`
   - Role: ADMIN

2. **Emy P Thomas**
   - Email: `emy@toniosenora.com`
   - Password: `staff123`
   - Role: STAFF

3. **Test User**
   - Email: `test@toniosenora.com`
   - Password: `test123`
   - Role: STAFF

## Why Can't I Login?

If you try to login with an email that doesn't exist, you'll get "Invalid credentials" error.

**The system only has the users listed above!**

To login with a different email, you must **create that user first** using the command above.

## Step-by-Step: Create Your User

1. Open PowerShell or Command Prompt
2. Navigate to server folder:
   ```bash
   cd "C:\Users\Abhinand Antony\Desktop\CRM\server"
   ```
3. Create your user:
   ```bash
   npm run create-user "Your Full Name" "your@email.com" "yourpassword" "STAFF"
   ```
4. Wait for "✅ User created successfully!" message
5. Now you can login with the email and password you just created!

## Need Help?

If you see errors:
- Make sure you're in the `server` directory
- Make sure email is unique (not already used)
- Password must be at least 6 characters (for API, command line doesn't enforce this)
