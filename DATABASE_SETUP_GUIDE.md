# 🗄️ Database Setup Guide - Step by Step

## What These Commands Do

### 1. `npm run init-db`
**Purpose:** Creates all the database tables and structure

This command:
- Creates the PostgreSQL database schema
- Creates all tables (users, leads, clients, comments, attendance, etc.)
- Sets up foreign keys and relationships
- Creates sequences for auto-incrementing IDs
- **Does NOT create any users** - just the empty structure

**Think of it as:** Building an empty house with all the rooms, but no furniture yet.

### 2. `npm run create-all-users`
**Purpose:** Creates all the user accounts in the database

This command:
- Creates all 13 users (ROJISHA, SNEHA, Varsha, Kiran, Emy, Shilpa, Asna, Karthika, Jibina, Kripa, SREELAKSHMI, SHEELA)
- Hashes all passwords securely
- Sets up user roles (ADMIN, SALES_TEAM_HEAD, SALES_TEAM, PROCESSING)
- **Does NOT create the database structure** - assumes tables already exist

**Think of it as:** Moving furniture (users) into the house that was already built.

---

## 📋 Complete Setup Steps

### Step 1: Set Up Environment Variables

1. Go to the `server` folder
2. Copy `.env.example` to `.env`:
   ```bash
   cd server
   copy .env.example .env
   ```
   (On Windows, you can also just rename `.env.example` to `.env`)

3. Open `.env` in a text editor and fill in:
   ```env
   DATABASE_URL=postgresql://username:password@host:port/database
   JWT_SECRET=your-super-secret-key-here
   PORT=5002
   ```

   **Where to get DATABASE_URL:**
   - If using Railway: Copy from Railway dashboard
   - If using Supabase: Copy from Supabase dashboard
   - If using local PostgreSQL: `postgresql://postgres:password@localhost:5432/crm`

### Step 2: Install Dependencies

```bash
cd server
npm install
```

### Step 3: Initialize Database Structure

```bash
npm run init-db
```

**What you should see:**
```
✅ Creating database schema...
✅ Creating sequences...
✅ Creating users table...
✅ Creating leads table...
✅ Creating clients table...
... (more tables)
✅ Database initialized successfully!
```

**This creates:**
- Empty database tables
- All relationships and foreign keys
- Sequences for IDs

### Step 4: Create All Users

```bash
npm run create-all-users
```

**What you should see:**
```
👤 Creating all users...

✅ Created: ROJISHA (rojishahead@toniosenora.com) - ADMIN
✅ Created: SNEHA (sneha@toniosenora.com) - ADMIN
✅ Created: Varsha (varsha@toniosenora.com) - SALES_TEAM_HEAD
... (all 13 users)
✅ All users created successfully!
```

**This creates:**
- All 13 user accounts
- Hashed passwords
- User roles and permissions

---

## 🎯 Quick Summary

**After cloning the repository, you need to:**

1. ✅ Create `server/.env` file with your database connection
2. ✅ Run `npm install` in the server folder
3. ✅ Run `npm run init-db` (creates empty database structure)
4. ✅ Run `npm run create-all-users` (creates all user accounts)

**Then you can:**
- Start the server: `npm start` or `node index.js`
- Login with any of the created users

---

## ⚠️ Common Questions

### Q: Do I need to run these commands every time?
**A:** No! Only once when setting up:
- `init-db` - Only needed the first time (or if you delete the database)
- `create-all-users` - Only needed the first time (or if you want to reset users)

### Q: What if I already have a database?
**A:** If your database already has tables and users, you can skip these steps. They're only for fresh setups.

### Q: What if init-db fails?
**A:** Check:
- Is `DATABASE_URL` correct in `.env`?
- Can you connect to the database?
- Does the database exist?

### Q: What if create-all-users fails?
**A:** Check:
- Did `init-db` run successfully first?
- Are the tables created?
- Check the error message for details

### Q: Can I run these commands multiple times?
**A:** 
- `init-db` - Safe to run multiple times (uses `IF NOT EXISTS`)
- `create-all-users` - Safe to run multiple times (updates existing users)

---

## 🔍 Verification

After running both commands, verify everything works:

```bash
# Test database connection
node -e "require('dotenv').config(); const db = require('./config/database'); db.getUsers().then(users => { console.log('✅ Database connected!'); console.log('✅ Users found:', users.length); process.exit(0); });"
```

You should see:
```
✅ Database connected!
✅ Users found: 13
```

---

## 📝 Example Full Setup

```bash
# 1. Navigate to server folder
cd server

# 2. Install dependencies
npm install

# 3. Create .env file (copy from .env.example and edit)
copy .env.example .env
# Then edit .env with your DATABASE_URL and JWT_SECRET

# 4. Initialize database structure
npm run init-db

# 5. Create all users
npm run create-all-users

# 6. Start the server
npm start
```

That's it! Your database is now ready. 🎉
