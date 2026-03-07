# Quick Training Commands

## 🚀 Fast Training & Testing

### Option 1: Complete Training (Recommended)
```bash
npm run train-complete
```
**Kya hoga:**
- Poore 124 conversations train honge
- 100% accuracy test hoga
- Report generate hoga
- Time: ~2-3 seconds

---

### Option 2: Advanced Testing
```bash
npm run test-advanced
```
**Kya hoga:**
- Variations test honge (speech errors, case, spaces)
- Fuzzy matching test hoga
- Detailed report generate hoga
- Time: ~3-4 seconds

---

### Option 3: Complete Training + Advanced Testing
```bash
npm run train-100
```
**Kya hoga:**
- Complete training
- Advanced testing with variations
- Dono reports generate honge
- Time: ~5-7 seconds

---

## 📊 Individual Scripts

### Basic Training
```bash
node train-and-test-complete.js
```

### Advanced Testing
```bash
node test-with-variations-complete.js
```

---

## 📄 Reports Generated

After training, check these files:

1. **COMPLETE-TRAINING-REPORT.json**
   - Basic training results
   - 100% accuracy report

2. **ADVANCED-TEST-REPORT.json**
   - Variation testing results
   - Fuzzy matching analysis

3. **TRAINING-SUCCESS-100-PERCENT.md**
   - Complete success summary
   - All statistics

---

## ✅ Expected Results

### Basic Training
```
Total Conversations: 124
Passed: 124 ✅
Failed: 0 ❌
Accuracy: 100.00%
```

### Advanced Testing
```
EXACT MATCHES: 100.00%
VARIATIONS: 90.53%
FUZZY MATCHES: 85.89%
OVERALL: 90.56%
```

---

## 🔧 Troubleshooting

### If accuracy < 100%

1. **Clear cache and retrain:**
```bash
rm -rf cache/responses.json
npm run train-complete
```

2. **Check failed tests:**
```bash
cat COMPLETE-TRAINING-REPORT.json
```

3. **Review dataset:**
```bash
cat training-dataset.json
```

---

## 📚 Documentation

- **Complete Guide:** `COMPLETE-TRAINING-GUIDE.md`
- **Success Report:** `TRAINING-SUCCESS-100-PERCENT.md`
- **Training Dataset:** `training-dataset.json`

---

## 🎯 Quick Start

**For first time training:**
```bash
npm run train-100
```

**For retraining:**
```bash
npm run train-complete
```

**For testing only:**
```bash
npm run test-advanced
```

---

**Happy Training! 🎉**
