# VAANI Complete Setup Guide - PERMANENT SOLUTION

## Problem
Login redirects to localhost:3000, 3001, 3002 but those ports refuse connection because dashboards aren't running.

## PERMANENT SOLUTION

### Step 1: Start All Services (ONE COMMAND)
```powershell
cd VAANI
.\START-ALL-VAANI.ps1
```

This will start:
- Main Website: http://localhost:5173
- User Dashboard: http://localhost:3000
- Volunteer Dashboard: http://localhost:3001
- Admin Dashboard: http://localhost:3002

### Step 2: Test Login with These Credentials

#### Test User Account
- Email: `user@test.com`
- Password: `Test@123`
- Redirects to: http://localhost:3000 (Dashboard.js)

#### Test Volunteer Account
- Email: `volunteer@test.com`
- Password: `Test@123`
- Redirects to: http://localhost:3001 (Overview.js)

#### Test Admin Account
- Email: `admin@test.com`
- Password: `Test@123`
- Redirects to: http://localhost:3002 (Dashboard.js)

### Step 3: Login Flow
1. Open http://localhost:5173/login
2. Enter email and password
3. Click "Sign in"
4. Automatically redirects to correct dashboard based on role

## If Localhost Refuses Connection

This means the dashboard isn't running. Solution:

1. Close all terminal windows
2. Run `.\START-ALL-VAANI.ps1` again
3. Wait 30 seconds for all services to start
4. Try login again

## Port Configuration
- Port 5173: Main website (login/signup)
- Port 3000: User Dashboard
- Port 3001: Volunteer Dashboard  
- Port 3002: Admin Dashboard

All ports are configured in .env files and will start automatically.
