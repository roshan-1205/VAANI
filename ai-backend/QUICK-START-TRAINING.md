# 🚀 Quick Start - Training Guide

## Ek Command Me Poora Training

```bash
cd VAANI/ai-backend
npm run train-loop
```

**Bas itna hi!** System automatically:
1. Poore dataset ko train karega
2. Har question ko test karega
3. Accuracy check karega
4. Jab tak 95%+ accuracy nahi milti tab tak repeat karega

---

## 📊 Expected Output

```
🎯 VAANI Complete Training & Testing Loop
======================================================================

🔄 ITERATION 1/10
======================================================================

📚 Training Phase Started...
✅ Training Complete
   Added: 0 | Updated: 65
   Total in Cache: 152

🧪 Testing Phase Started...
✅ conv_001: PASS
✅ conv_002: PASS
...
✅ conv_065: PASS

======================================================================

📊 Test Results:
   Total Tests: 65
   Passed: 65
   Failed: 0
   Accuracy: 100.00%

======================================================================

🎉 SUCCESS! Target Accuracy Reached!
✅ Final Accuracy: 100%
✅ Passed: 65/65
✅ Iterations: 1

✅ Training and Testing Complete - System Ready!
```

---

## ⚡ Other Useful Commands

### Test with Variations
```bash
npm run test-variations
```
Different spelling variations ke saath test karta hai.

### Quick Train (No Loop)
```bash
npm run full-train
```
Ek baar train aur test karta hai, no retry.

### Start Server
```bash
npm start
```
Production server start karta hai.

---

## 📈 Success Criteria

Training successful hai jab:
- ✅ Accuracy >= 95%
- ✅ All 65 conversations passing
- ✅ Cache persisting correctly
- ✅ All 3 languages working

---

## 🎯 Current Status

**Last Training:** 2026-03-07  
**Accuracy:** 100%  
**Status:** ✅ READY

---

## 💡 Tips

1. **Naye questions add karne ke baad:** `npm run train-loop`
2. **Quick check ke liye:** `npm run full-train`
3. **Variations test ke liye:** `npm run test-variations`
4. **Server start karne ke liye:** `npm start`

---

**Happy Training! 🎉**
