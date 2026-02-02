# 🔧 Fix PowerShell npm Execution Policy Error

## ❌ Error
```
npm : File C:\Program Files\nodejs\npm.ps1 cannot be loaded because running scripts is disabled on this system.
```

## ✅ Solution Applied

I've updated the PowerShell execution policy to allow npm to run.

### What Was Done
```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser -Force
```

This allows:
- ✅ Local scripts to run
- ✅ Remote signed scripts to run
- ✅ Only affects your user account (safe)

## 🚀 Now You Can Run

```bash
cd server
npm start
```

Or use the full path:
```bash
cd "C:\Users\Abhinand Antony\Desktop\CRM\server"
npm start
```

## 🔄 Alternative: Use CMD Instead

If you prefer, you can use Command Prompt (CMD) instead of PowerShell:
1. Open CMD (not PowerShell)
2. Run: `cd "C:\Users\Abhinand Antony\Desktop\CRM\server"`
3. Run: `npm start`

CMD doesn't have execution policy restrictions.

## ✅ Server Should Now Start

The server is starting in the background. Check:
- Server window shows: `🚀 Server running on port 5001`
- Test: http://localhost:5001/api/health

---

**Execution policy fixed! npm should work now! ✅**
