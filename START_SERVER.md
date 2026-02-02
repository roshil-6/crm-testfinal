# 🚀 How to Start the Server

## ✅ Execution Policy Fixed

Your PowerShell execution policy is set to "Bypass" - npm should work!

## 🚀 Start Server

### Option 1: PowerShell (Current Window)
```powershell
cd "C:\Users\Abhinand Antony\Desktop\CRM\server"
npm start
```

### Option 2: New PowerShell Window
1. Open new PowerShell window
2. Run:
   ```powershell
   cd "C:\Users\Abhinand Antony\Desktop\CRM\server"
   npm start
   ```

### Option 3: Command Prompt (CMD) - No Policy Issues
1. Open CMD (Win+R, type `cmd`)
2. Run:
   ```cmd
   cd "C:\Users\Abhinand Antony\Desktop\CRM\server"
   npm start
   ```

## ✅ Verify Server is Running

Visit: http://localhost:5001/api/health

Should show:
```json
{
  "status": "ok",
  "database": "connected",
  "type": "PostgreSQL"
}
```

## 🔍 If npm Still Doesn't Work

### Use node directly:
```powershell
cd "C:\Users\Abhinand Antony\Desktop\CRM\server"
node index.js
```

### Or use full path to npm:
```powershell
& "C:\Program Files\nodejs\npm.cmd" start
```

## 📋 After Server Starts

1. **Test Health**: http://localhost:5001/api/health
2. **Test Login**: http://localhost:3000
3. **Use Credentials**:
   - Email: `rojishahead@toniosenora.com`
   - Password: `rojishasenoramain000`

---

**Server should start now! ✅**
