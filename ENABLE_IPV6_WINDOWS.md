# 🔧 Enable IPv6 on Windows (Alternative Solution)

If the Connection Pooler is not available, you can enable IPv6 on Windows to use the direct connection.

## Method 1: Via Settings (Recommended)

1. **Open Settings**:
   - Press `Win + I`
   - Go to **Network & Internet** → **Status**

2. **Open Network Adapter Settings**:
   - Click **"Change adapter options"**

3. **Enable IPv6**:
   - Right-click your active network adapter (Wi-Fi or Ethernet)
   - Click **Properties**
   - Check the box: **"Internet Protocol Version 6 (TCP/IPv6)"**
   - Click **OK**

4. **Restart if needed**:
   - Sometimes a restart helps, but usually not required

5. **Test connection again**:
   ```bash
   cd server
   node scripts/setupConnection.js "postgresql://postgres:wmEhA2J91dufKGXt@db.ecfjjffprxyelzxvuday.supabase.co:5432/postgres"
   ```

## Method 2: Via PowerShell (Administrator)

1. **Open PowerShell as Administrator**:
   - Press `Win + X`
   - Select **"Windows PowerShell (Admin)"** or **"Terminal (Admin)"**

2. **Enable IPv6**:
   ```powershell
   netsh interface ipv6 set global randomizeidentifiers=disabled
   netsh interface ipv6 set global randomizeidentifiers=enabled
   ```

3. **Verify IPv6 is enabled**:
   ```powershell
   netsh interface ipv6 show global
   ```

4. **Test connection**:
   ```bash
   cd server
   node scripts/setupConnection.js "postgresql://postgres:wmEhA2J91dufKGXt@db.ecfjjffprxyelzxvuday.supabase.co:5432/postgres"
   ```

## Method 3: Use Connection Pooler (Best Solution)

**This is the recommended approach** - Connection Pooler usually has IPv4 support:

1. Go to **Supabase Dashboard** → **Settings** → **Database**
2. Scroll to **"Connection pooling"** section
3. Copy connection string from **"Transaction mode"** (port 6543)
4. It should look like:
   ```
   postgresql://postgres.ecfjjffprxyelzxvuday:wmEhA2J91dufKGXt@aws-0-[REGION].pooler.supabase.com:6543/postgres?pgbouncer=true
   ```
5. Update and test:
   ```bash
   cd server
   node scripts/setupConnection.js "YOUR_POOLER_CONNECTION_STRING"
   ```

## Why Connection Pooler is Better

- ✅ Usually has IPv4 support (solves IPv6 issue)
- ✅ More reliable for serverless (Vercel)
- ✅ Better connection management
- ✅ Recommended by Supabase for production
- ✅ Handles connection limits better

## Troubleshooting

### If IPv6 is already enabled but still not working:

1. **Check DNS**:
   ```powershell
   nslookup db.ecfjjffprxyelzxvuday.supabase.co
   ```
   - Should show IPv6 address: `2406:da1c:f42:ae01:44ff:bde4:fad9:c40e`

2. **Test IPv6 connectivity**:
   ```powershell
   ping -6 db.ecfjjffprxyelzxvuday.supabase.co
   ```

3. **Check firewall**:
   - Windows Firewall might be blocking IPv6 connections
   - Try temporarily disabling firewall to test

4. **Network restrictions**:
   - Some networks (corporate, public WiFi) block IPv6
   - Try from a different network (mobile hotspot)

## Recommendation

**Use Connection Pooler** - it's the most reliable solution and doesn't require changing Windows network settings.
