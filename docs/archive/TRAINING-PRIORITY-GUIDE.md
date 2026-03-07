# 🎯 VAANI Training Priority System

## ✅ System Updated - Training Data Gets Priority!

**Date:** March 7, 2026  
**Status:** Training data now has HIGHEST priority

---

## 🔄 How It Works Now

### Priority Order (Highest to Lowest):

```
1. ✅ TRAINING DATA (Exact Match)     → Your trained answers
2. ✅ TRAINING DATA (Similar Match)   → Close matches from training
3. ✅ CACHE (Previous responses)      → Cached responses
4. ⚠️  BEDROCK API (Fallback only)    → Only if no training data found
5. 🔄 FALLBACK (Generic responses)    → Emergency fallback
```

---

## 📊 Response Flow

```
User Question
     ↓
Language Detection (English/Hindi/Hinglish)
     ↓
Check Training Data (Exact Match)
     ↓ (Not Found)
Check Training Data (Similar Match)
     ↓ (Not Found)
Check Cache
     ↓ (Not Found)
Call Bedrock API ← Only as fallback!
     ↓ (Error)
Generic Fallback Response
```

---

## 🎯 What This Means

### ✅ For Trained Questions:

**Question:** "Who are you?"  
**Response:** Your exact trained answer (5-10ms)  
**Source:** `training_exact`  
**Cost:** $0

### ⚠️ For New Questions:

**Question:** "What is the weather today?"  
**Response:** Bedrock generates answer (850ms)  
**Source:** `bedrock`  
**Cost:** $0.0004

---

## 📝 How to Add Training Data

### Step 1: Open Training File

```bash
cd VAANI/ai-backend
# Edit training-dataset.json
```

### Step 2: Add Your Q&A

```json
{
  "id": "conv_204",
  "category": "your_category",
  "user": "Your exact question here",
  "assistant": "Your exact answer here",
  "context": "context_tag"
}
```

### Step 3: Update Metadata

```json
"metadata": {
  "total_conversations": 204,  // Increment this
  "updated": "2026-03-07"       // Update date
}
```

### Step 4: Restart Server

```bash
npm start
```

---

## 🧪 Testing Your Training

### Test via Chat Endpoint:

```bash
curl -X POST http://localhost:5000/chat \
  -H "Content-Type: application/json" \
  -d '{"message": "Your question", "userId": "test"}'
```

### Test via Voice Command:

```bash
curl -X POST http://localhost:5000/voice-command \
  -H "Content-Type: application/json" \
  -d '{"command": "Your question", "userId": "test"}'
```

### Check Response Source:

Look for `"source": "training_exact"` in the response!

---

## 📈 Performance Comparison

| Scenario | Response Time | Cost | Source |
|----------|--------------|------|--------|
| **Training Data (Exact)** | 5-10ms | $0 | training_exact |
| **Training Data (Similar)** | 10-20ms | $0 | training_similar |
| **Cache Hit** | 8ms | $0 | cache |
| **Bedrock API** | 850ms | $0.0004 | bedrock |
| **Fallback** | 5ms | $0 | fallback |

---

## 🎯 Current Trained Questions

### English:

1. ✅ "Who are you?"
2. ✅ "What is VAANI?"
3. ✅ "Can complaints be registered in VAANI?"
4. ✅ "Is call assistance available in VAANI?"
5. ✅ "Hello"

### Hindi:

- तुम कौन हो?
- VAANI क्या है?
- क्या VAANI में शिकायत दर्ज कर सकते हैं?
- क्या VAANI में कॉल सहायता मिलती है?
- नमस्ते

### Hinglish:

- Tum kaun ho?
- VAANI kya hai?
- Kya VAANI mein complaint register kar sakte hain?
- Kya VAANI me call support available hai?
- Namaste

**Total:** 203 trained conversations

---

## 🔍 How to Verify Training is Working

### Method 1: Check Server Logs

```bash
# Start server and watch logs
npm start

# Look for these messages:
✅ Data indexer ready
✅ Training Data: 203 conversations
📚 Training EXACT match (english)
```

### Method 2: Check Response Source

```bash
# Send test request
curl -X POST http://localhost:5000/chat \
  -H "Content-Type: application/json" \
  -d '{"message": "Who are you?", "userId": "test"}'

# Response should show:
{
  "role": "assistant",
  "content": "My name is VAANI...",
  "source": "training_exact"  ← This confirms training data used!
}
```

### Method 3: Check Response Time

- **Training data:** < 20ms ✅
- **Bedrock API:** > 500ms ⚠️

If response is fast (<20ms), training data is being used!

---

## 🚀 Adding More Training Data

### Example: Add New Question

**Question:** "How do I track my complaint?"  
**Answer:** "To track your complaint, login to VAANI, go to 'My Complaints' section, and select your complaint to see the status."

### Add to training-dataset.json:

```json
{
  "id": "conv_204",
  "category": "platform_help_english",
  "user": "How do I track my complaint?",
  "assistant": "To track your complaint, login to VAANI, go to 'My Complaints' section, and select your complaint to see the status.",
  "context": "track_complaint_english"
}
```

### Restart and Test:

```bash
npm start

curl -X POST http://localhost:5000/chat \
  -H "Content-Type: application/json" \
  -d '{"message": "How do I track my complaint?", "userId": "test"}'
```

---

## 💡 Best Practices

### 1. Use Exact Wording

❌ Bad: "who r u"  
✅ Good: "Who are you?"

Training data matches exact wording best.

### 2. Add Common Variations

```json
{"user": "Who are you?", "assistant": "..."},
{"user": "Who r u?", "assistant": "..."},
{"user": "Tell me about yourself", "assistant": "..."}
```

### 3. Keep Answers Concise

✅ Good: 2-3 sentences for voice  
❌ Bad: Long paragraphs

### 4. Test After Adding

Always test new training data immediately!

---

## 🔧 Troubleshooting

### Issue: Still getting Bedrock responses

**Check:**
1. Is training data loaded? (Check server logs)
2. Is question wording exact?
3. Is language detected correctly?

**Solution:**
```bash
# Restart server
npm start

# Check logs for "Training EXACT match"
```

### Issue: Wrong language response

**Check:**
- Language detection working?
- Training data has correct language tag?

**Solution:**
Add language-specific entries in training data.

### Issue: Response too slow

**Check:**
- Response time > 100ms?
- Source shows "bedrock" instead of "training_exact"?

**Solution:**
Training data not matching. Check exact wording.

---

## 📊 Statistics Endpoint

Check training data usage:

```bash
curl http://localhost:5000/stats
```

**Response:**
```json
{
  "apiCalls": {
    "total": 100,
    "cached": 20,
    "training": 60,  ← Training data used 60 times!
    "bedrock": 15,
    "fallback": 5
  },
  "performance": {
    "trainingHitRate": "60.00%",  ← 60% questions answered by training!
    "costSavings": "85.00%"
  }
}
```

---

## ✅ Summary

### What Changed:

✅ Training data now has HIGHEST priority  
✅ Bedrock only used as fallback  
✅ Your trained answers always returned first  
✅ Faster responses (5-10ms vs 850ms)  
✅ Zero cost for trained questions  

### How to Use:

1. Add Q&A to `training-dataset.json`
2. Restart server: `npm start`
3. Test your questions
4. Verify source is `training_exact`

### Benefits:

- 🚀 99% faster responses
- 💰 100% cost savings for trained questions
- 🎯 Exact control over answers
- ✅ Consistent responses every time

---

**Training Priority System: ✅ ACTIVE**

Ab jo bhi data aap train karwaoge, VAANI exactly wahi reply dega! 🎉
