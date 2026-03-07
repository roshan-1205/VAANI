# Voice Assistant Testing Guide

## ✅ Backend is Working (Verified)

All 106 conversations tested and working:
- `/chat` endpoint: ✅ Working
- `/voice-command` endpoint: ✅ Working
- Training data matching: ✅ 100%

## 🎤 How to Test Voice Assistant

### Step 1: Check Server is Running

```bash
cd VAANI/ai-backend
node server-production.js
```

Should see:
```
✅ Indexed 106 conversations
Port: 5000
```

### Step 2: Test Backend Directly

```bash
node test-voice-command.js
```

All should pass ✅

### Step 3: Test from Frontend

1. **Start Frontend**:
```bash
cd VAANI/frontend
npm run dev
```

2. **Open Browser**: Go to `http://localhost:5173`

3. **Open Console**: Press F12, go to Console tab

4. **Test Voice Assistant**:
   - Click microphone button
   - Say one of these:
     - "Hello, mere area mein pothole hai"
     - "Tum kaun ho?"
     - "VAANI kya hai?"
     - "Kya VAANI me map view hai?"

5. **Check Console Logs**:
   - Should see: `🎤 Voice Command: [your question]`
   - Should see: `📥 Response: {content: "...", source: "training_exact"}`

## 🔍 Troubleshooting

### If Getting Default Response:

**Check 1: Server Running?**
```bash
# In ai-backend folder
node server-production.js
```

**Check 2: Frontend URL Correct?**
- Should be: `http://localhost:5000/voice-command`
- Check browser console for errors

**Check 3: CORS Issue?**
- Server should show: `✅ CORS enabled`
- Check browser console for CORS errors

**Check 4: Question Format**
- Backend tests pass but frontend fails?
- Check browser console logs
- See what question is being sent

### Common Issues:

**Issue 1: "I'm here to help with civic issues..."**
- This is fallback response
- Means question not matching training data
- Check language detection
- Check exact question format

**Issue 2: Network Error**
- Server not running
- Wrong URL
- CORS issue

**Issue 3: Empty Response**
- Check server logs
- Check browser console
- Verify request format

## 📝 Test Questions That Work

### Civic Issues:
```
✅ "Hello, mere area mein bahut bada pothole hai"
✅ "Paani nahi aa raha 3 din se"
✅ "Bijli bahut kam voltage mein aa rahi hai"
✅ "Kachra 5 din se nahi uthaya gaya"
```

### Platform Help:
```
✅ "Tum kaun ho?"
✅ "VAANI kya hai?"
✅ "Complaint kaise file karte hain?"
✅ "Status kaise check karte hain?"
```

### New Features:
```
✅ "Kya VAANI me map view hai?"
✅ "Kya VAANI me chat support hai?"
✅ "Main apna profile update kaise karu?"
✅ "Kya VAANI me emergency alert hai?"
```

## 🎯 Expected Responses

### Question: "Tum kaun ho?"
**Expected Response**:
```
"Mera naam VAANI hai. Main ek Voice-First AI based civic 
assistant hoon. Main aapki madad karti hoon..."
```
**Source**: `training_exact`

### Question: "Kya VAANI me map view hai?"
**Expected Response**:
```
"Haan. Complaint location aur nearby volunteers check karne 
ke liye map view available hai."
```
**Source**: `training_exact`

## 🔧 Debug Steps

1. **Open Browser Console** (F12)
2. **Click Microphone**
3. **Say Question**
4. **Check Logs**:
   ```
   🎤 Voice Command: [your question]
   📥 Response: {type: "response", content: "...", source: "..."}
   ```

5. **If source is "fallback"**:
   - Question not in training data
   - Or language detection issue
   - Check server logs

6. **If source is "training_exact"**:
   - ✅ Working perfectly!

## 📊 Current Status

- **Dataset**: 106 conversations
- **Backend Tests**: 100% passing
- **Voice Commands**: All working
- **Language Detection**: Fixed (Kya, Kaise, etc.)

## 🎉 If Everything Works

You should see:
- Microphone button working
- Question transcribed correctly
- Response from training data
- Source: `training_exact` or `training_similar`
- Natural Hinglish/Hindi/English response

---

**Need Help?**
1. Check server logs
2. Check browser console
3. Run `node test-voice-command.js`
4. Share exact question and response
