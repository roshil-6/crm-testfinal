# 🔧 Fix IPv6 Connection Issue

## Problem
Supabase hostname resolves to IPv6-only address, and Node.js `pg` library has trouble connecting.

## Solutions

### Solution 1: Use Connection Pooler (Recommended - Usually Has IPv4)

The **Connection Pooler** from Supabase typically has IPv4 support and is more reliable.

**Steps:**
1. Go to **Supabase Dashboard** → Your Project
2. **Settings** → **Database**
3. Scroll to **"Connection pooling"** section
4. Copy the connection string (it uses port **6543**)
5. Update `server/.env`:
   ```env
   DATABASE_URL=postgresql://postgres.ecfjjffprxyelzxvuday:wmEhA2J91dufKGXt@aws-0-[REGION].pooler.supabase.com:6543/postgres?pgbouncer=true
   ```
6. Replace `[REGION]` with your actual region (e.g., `ap-southeast-1`, `us-east-1`)

---

### Solution 2: Enable IPv6 on Windows

If your network supports IPv6, enable it:

**Windows 10/11:**
1. Open **Settings** → **Network & Internet** → **Status**
2. Click **"Change adapter options"**
3. Right-click your network adapter → **Properties**
4. Check **"Internet Protocol Version 6 (TCP/IPv6)"**
5. Click **OK** and restart if needed

**Or via PowerShell (Run as Administrator):**
```powershell
netsh interface ipv6 set global randomizeidentifiers=disabled
netsh interface ipv6 set global randomizeidentifiers=enabled
```

---

### Solution 3: Use IPv4 Tunnel/Proxy

If IPv6 is not available, you can use a tunnel service, but this is complex and not recommended for production.

---

### Solution 4: Contact Supabase Support

If the project is active but still can't connect:
1. Check project status in Supabase dashboard
2. Verify the connection string is correct
3. Contact Supabase support with:
   - Project reference: `ecfjjffprxyelzxvuday`
   - Error: `ENOTFOUND` with IPv6-only resolution
   - Request IPv4 endpoint or connection pooler details

---

### Solution 5: Use Different Network

Some networks block IPv6. Try:
- Different WiFi network
- Mobile hotspot
- VPN (if allowed)

---

## ✅ Best Solution: Connection Pooler

**Why Connection Pooler is better:**
- ✅ Usually has IPv4 support
- ✅ More reliable for serverless (Vercel)
- ✅ Better connection management
- ✅ Recommended by Supabase for production
- ✅ Handles connection limits better

**How to get it:**
1. Supabase Dashboard → Settings → Database
2. Scroll to **"Connection pooling"**
3. Copy the **"Connection string"** from there
4. It will look like:
   ```
   postgresql://postgres.ecfjjffprxyelzxvuday:[PASSWORD]@aws-0-ap-southeast-1.pooler.supabase.com:6543/postgres?pgbouncer=true
   ```

---

## 🔍 Verify Connection

After updating `.env`, test:
```bash
cd server
node scripts/testIPv4Connection.js
```

If successful, you'll see:
```
✅ SUCCESS! Connected to database
```

Then initialize:
```bash
npm run init-db
npm run migrate-columns
npm start
```

---

## 📝 Current Configuration

The database config (`server/config/database.js`) has been updated to:
- ✅ Force IPv4 resolution first
- ✅ Allow IPv6 as fallback
- ✅ Increased connection timeout
- ✅ Better error handling

---

## 🚀 Next Steps

1. **Get Connection Pooler string** from Supabase dashboard
2. **Update `server/.env`** with the pooler connection string
3. **Test connection**: `node scripts/testIPv4Connection.js`
4. **Initialize database**: `npm run init-db`
5. **Start server**: `npm start`

---

## 💡 Why This Happens

- Supabase uses IPv6 for some regions/projects
- Node.js `pg` library can have issues with IPv6-only addresses on Windows
- Connection Pooler typically has both IPv4 and IPv6 support
- Some networks/firewalls block IPv6

---

**Most reliable fix: Use Connection Pooler from Supabase Dashboard!**
