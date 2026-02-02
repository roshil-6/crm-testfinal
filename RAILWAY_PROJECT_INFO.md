# 🚂 Railway Project Information

## Your Railway Project ID
**Project ID:** `0449d938-135c-4e0a-a451-885dd0730437`

## 🔗 How to Get Your Connection String

### Step 1: Access Railway Dashboard
1. Go to [railway.app](https://railway.app)
2. Log in to your account
3. Find your project (ID: `0449d938-135c-4e0a-a451-885dd0730437`)

### Step 2: Get PostgreSQL Connection String
1. Click on your **PostgreSQL** service in the project
2. Go to the **Variables** tab
3. Look for `DATABASE_URL` or `POSTGRES_URL`
4. Copy the connection string

**OR**

1. Go to the **Connect** tab
2. Copy the **Connection URL** (it will look like):
   ```
   postgresql://postgres:password@hostname:port/railway
   ```

### Step 3: Update Your .env File
1. Open `server/.env`
2. Set `DATABASE_URL` to your Railway connection string:
   ```env
   DATABASE_URL=postgresql://postgres:your-password@hostname:port/railway
   JWT_SECRET=your-jwt-secret-here
   PORT=5002
   ```

## ✅ Verify Connection

Test your Railway connection:
```bash
cd server
node -e "require('dotenv').config(); const db = require('./config/database'); db.getUsers().then(users => { console.log('✅ Railway connection works!'); console.log('Users:', users.length); process.exit(0); });"
```

## 🔒 Security Notes

- ✅ Your Railway project ID is safe to share (it's just an identifier)
- ⚠️ Never share your `DATABASE_URL` (contains password)
- ⚠️ Never commit `.env` file to git (already excluded)

## 📋 Quick Setup Commands

Once you have your `DATABASE_URL` in `.env`:

```bash
cd server

# Initialize database structure
npm run init-db

# Create all users
npm run create-all-users

# Start server
npm start
```

## 🆘 Troubleshooting

### Connection Failed?
1. Check `DATABASE_URL` in `.env` is correct
2. Verify Railway PostgreSQL service is running
3. Check if your IP is allowed (Railway usually allows all)
4. Verify the password in connection string

### Can't Find Connection String?
1. Make sure PostgreSQL service is created in Railway
2. Check the **Variables** tab for `DATABASE_URL`
3. Or use the **Connect** tab for connection details

---

**Your Railway Project:** `0449d938-135c-4e0a-a451-885dd0730437`
