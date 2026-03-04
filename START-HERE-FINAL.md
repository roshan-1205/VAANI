# 🚀 VAANI - START HERE (FINAL SOLUTION)

## ⚡ Quick Start (3 Steps)

### Step 1: Start All Services
```powershell
cd VAANI
.\START-ALL-VAANI.ps1
```

**Wait 30-60 seconds** for all services to start.

### Step 2: Create Test Users
Follow instructions in `CREATE-TEST-USERS.md` to create test accounts in Firebase.

Or use signup page: http://localhost:5173/signup

### Step 3: Test Login
Go to: http://localhost:5173/login

Use test credentials:
- **User**: user@test.com / Test@123
- **Volunteer**: volunteer@test.com / Test@123  
- **Admin**: admin@test.com / Test@123

## 🎯 How It Works

### Architecture
```
Main Website (5173)
    ↓ Login
    ├─→ User Role      → User Dashboard (3000) → Dashboard.js
    ├─→ Volunteer Role → Volunteer Dashboard (3001) → Overview.js
    └─→ Admin Role     → Admin Dashboard (3002) → Dashboard.js
```

### Ports
- **5173**: Main website (login/signup pages)
- **3000**: User Dashboard
- **3001**: Volunteer Dashboard
- **3002**: Admin Dashboard

### Files
- **LoginPage.jsx**: Handles login and redirects based on role
- **SignupPage.jsx**: Handles signup and redirects based on role
- **.env files**: Configure ports for each dashboard

## 🔧 If Something Goes Wrong

### "Localhost refused to connect"
The dashboard isn't running. Solution:
```powershell
.\START-ALL-VAANI.ps1
```
Wait 30 seconds, try again.

### "Port already in use"
```powershell
taskkill /F /IM node.exe
.\START-ALL-VAANI.ps1
```

### More help
See `TROUBLESHOOTING.md`

## 📁 Project Structure
```
VAANI/
├── frontend/                    # Main website (5173)
│   ├── src/pages/
│   │   ├── LoginPage.jsx       # Login with role-based redirect
│   │   └── SignupPage.jsx      # Signup with role-based redirect
│   └── package.json
│
├── frontend/user-dashboard/     # User Dashboard (3000)
│   ├── src/pages/Dashboard.js  # Main user dashboard
│   ├── .env                    # PORT=3000
│   └── package.json
│
├── frontend/volunteer-dashboard/ # Volunteer Dashboard (3001)
│   ├── src/pages/Overview.js   # Main volunteer dashboard
│   ├── .env                    # PORT=3001
│   └── package.json
│
└── frontend/admin-dashboard/    # Admin Dashboard (3002)
    ├── src/pages/Dashboard.js  # Main admin dashboard
    ├── .env                    # PORT=3002
    └── package.json
```

## ✅ Verification Checklist

After running `START-ALL-VAANI.ps1`, verify:

- [ ] http://localhost:5173 - Main website loads
- [ ] http://localhost:3000 - User dashboard loads
- [ ] http://localhost:3001 - Volunteer dashboard loads
- [ ] http://localhost:3002 - Admin dashboard loads
- [ ] Test users created in Firebase
- [ ] Login redirects work correctly

## 🎓 Test Credentials

| Role | Email | Password | Redirects To |
|------|-------|----------|--------------|
| User | user@test.com | Test@123 | localhost:3000 |
| Volunteer | volunteer@test.com | Test@123 | localhost:3001 |
| Admin | admin@test.com | Test@123 | localhost:3002 |

## 📞 Support Files

- `COMPLETE-SETUP-GUIDE.md` - Detailed setup instructions
- `CREATE-TEST-USERS.md` - How to create test users
- `TROUBLESHOOTING.md` - Common problems and solutions
- `START-ALL-VAANI.ps1` - Main startup script

---

**Remember**: Always run `START-ALL-VAANI.ps1` before testing login!
