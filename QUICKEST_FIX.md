# ⚡ QUICKEST FIX (30 seconds)

## Enable IPv6 on Windows

### Method 1: PowerShell (Fastest - 10 seconds)

1. **Right-click Start button** → **Windows PowerShell (Admin)** or **Terminal (Admin)**
2. **Copy and paste these 2 commands:**
   ```powershell
   netsh interface ipv6 set global randomizeidentifiers=disabled
   netsh interface ipv6 set global randomizeidentifiers=enabled
   ```
3. **Press Enter** after each command
4. **Done!** Test connection:
   ```bash
   cd server
   node scripts/setupConnection.js "postgresql://postgres:wmEhA2J91dufKGXt@db.ecfjjffprxyelzxvuday.supabase.co:5432/postgres"
   ```

### Method 2: Settings (30 seconds)

1. Press **Win + I** (opens Settings)
2. Click **Network & Internet**
3. Click **Status**
4. Click **"Change adapter options"**
5. **Right-click** your active network (Wi-Fi or Ethernet)
6. Click **Properties**
7. **Check the box**: "Internet Protocol Version 6 (TCP/IPv6)"
8. Click **OK**
9. **Done!** Test connection (same command as above)

---

## After IPv6 is Enabled

```bash
cd server
node scripts/setupConnection.js "postgresql://postgres:wmEhA2J91dufKGXt@db.ecfjjffprxyelzxvuday.supabase.co:5432/postgres"
```

If successful:
```bash
npm run init-db
npm run migrate-columns
npm start
```

---

## ⏱️ Total Time: 30 seconds

This is the fastest solution. The connection string is already saved in `server/.env`, you just need IPv6 enabled.
