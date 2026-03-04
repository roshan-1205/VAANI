# VAANI Troubleshooting Guide

## Problem: "Localhost refused to connect"

### Cause
The dashboard you're trying to access isn't running.

### Solution
```powershell
cd VAANI
.\START-ALL-VAANI.ps1
```

Wait 30 seconds, then try login again.

## Problem: "Port already in use"

### Solution
Kill all Node processes and restart:

```powershell
# Kill all node processes
taskkill /F /IM node.exe

# Wait 5 seconds
Start-Sleep -Seconds 5

# Restart VAANI
.\START-ALL-VAANI.ps1
```

## Problem: Login redirects but shows blank page

### Cause
Dashboard is starting but not ready yet.

### Solution
Wait 30-60 seconds after running START-ALL-VAANI.ps1 before logging in.

## Problem: "Cannot find module" errors

### Solution
Install dependencies:

```powershell
# Main frontend
cd VAANI/frontend
npm install

# User dashboard
cd ../user-dashboard
npm install

# Volunteer dashboard
cd ../volunteer-dashboard
npm install

# Admin dashboard
cd ../admin-dashboard
npm install

# Go back to root
cd ../../..

# Start VAANI
.\START-ALL-VAANI.ps1
```

## Problem: Login successful but wrong dashboard opens

### Cause
User role not set correctly in Firestore.

### Solution
1. Go to Firebase Console → Firestore Database
2. Find the user document (users collection)
3. Check the `role` field
4. Should be: "user", "volunteer", or "admin"
5. Update if incorrect

## Quick Reset

If nothing works:

```powershell
# 1. Kill all processes
taskkill /F /IM node.exe

# 2. Clear browser cache and cookies for localhost

# 3. Restart VAANI
cd VAANI
.\START-ALL-VAANI.ps1

# 4. Wait 60 seconds

# 5. Try login at http://localhost:5173/login
```

## Check if Services are Running

Open these URLs in browser:
- http://localhost:5173 - Should show main website
- http://localhost:3000 - Should show user dashboard
- http://localhost:3001 - Should show volunteer dashboard
- http://localhost:3002 - Should show admin dashboard

If any shows "refused to connect", that service isn't running.
