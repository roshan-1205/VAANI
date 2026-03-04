# Create Test Users in Firebase

## Option 1: Manual Creation (Recommended)

### Step 1: Go to Firebase Console
1. Open https://console.firebase.google.com
2. Select your VAANI project
3. Go to "Authentication" → "Users" tab

### Step 2: Add Test Users

Click "Add user" and create these three accounts:

#### User Account
- Email: `user@test.com`
- Password: `Test@123`
- After creation, go to Firestore Database
- Create document in `users` collection:
  ```
  Document ID: [the UID from Authentication]
  Fields:
    email: "user@test.com"
    role: "user"
    createdAt: [current timestamp]
  ```

#### Volunteer Account
- Email: `volunteer@test.com`
- Password: `Test@123`
- Create document in `users` collection:
  ```
  Document ID: [the UID from Authentication]
  Fields:
    email: "volunteer@test.com"
    role: "volunteer"
    createdAt: [current timestamp]
  ```

#### Admin Account
- Email: `admin@test.com`
- Password: `Test@123`
- Create document in `users` collection:
  ```
  Document ID: [the UID from Authentication]
  Fields:
    email: "admin@test.com"
    role: "admin"
    createdAt: [current timestamp]
  ```

## Option 2: Use Signup Page

1. Start VAANI: `.\START-ALL-VAANI.ps1`
2. Go to http://localhost:5173/signup
3. Create accounts with above emails
4. Select role (User/Volunteer) during signup
5. For admin, you'll need to manually change role in Firestore

## Testing

After creating users:
1. Go to http://localhost:5173/login
2. Login with any test account
3. Should redirect to correct dashboard:
   - user@test.com → http://localhost:3000
   - volunteer@test.com → http://localhost:3001
   - admin@test.com → http://localhost:3002
