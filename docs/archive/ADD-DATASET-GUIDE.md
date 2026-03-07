# 📚 Dataset Add Karne Ka Simple Guide

## Step 1: Training Dataset File Open Karo
File location: `VAANI/ai-backend/training-dataset.json`

## Step 2: Naya Conversation Add Karo

File ke end mein, last conversation ke baad comma lagao aur naya conversation add karo:

```json
{
  "id": "conv_204",
  "category": "your_category_name",
  "user": "User ka question ya statement",
  "assistant": "VAANI ka response",
  "context": "short_description"
}
```

## Step 3: Format Example

### English Example:
```json
{
  "id": "conv_204",
  "category": "parking_issue_english",
  "user": "There is no parking space in my area",
  "assistant": "I understand parking is a problem. You can report this via VAANI by selecting 'Parking Issue', adding your location and details, then submitting. Would you like me to guide you through the process?",
  "context": "parking_complaint_english"
}
```

### Hindi Example:
```json
{
  "id": "conv_205",
  "category": "parking_issue_hindi",
  "user": "मेरे क्षेत्र में पार्किंग की जगह नहीं है",
  "assistant": "मैं समझती हूँ कि पार्किंग एक समस्या है। आप VAANI में 'Parking Issue' चुनकर, अपना स्थान और विवरण जोड़कर शिकायत दर्ज कर सकते हैं। क्या मैं आपको प्रक्रिया में मार्गदर्शन दूं?",
  "context": "parking_complaint_hindi"
}
```

### Hinglish Example:
```json
{
  "id": "conv_206",
  "category": "parking_issue",
  "user": "Mere area mein parking ki jagah nahi hai",
  "assistant": "Main samajhti hoon ki parking ek problem hai. Aap VAANI mein 'Parking Issue' select karke, location aur details add karke complaint file kar sakte hain. Kya main aapko process guide karun?",
  "context": "parking_complaint"
}
```

## Step 4: Important Rules

1. **ID**: Har conversation ka unique ID hona chahiye (conv_204, conv_205, etc.)
2. **Category**: Descriptive category name do (road_issue, water_supply, etc.)
3. **User**: Exact question/statement jo user puchega
4. **Assistant**: VAANI ka helpful, clear response
5. **Context**: Short description for reference
6. **Comma**: Har conversation ke baad comma lagao (except last one)

## Step 5: Metadata Update Karo

File ke top mein metadata section mein update karo:

```json
"metadata": {
  "total_conversations": 206,  // Update count
  "english_conversations": 76,  // Update if English added
  "hindi_conversations": 49,    // Update if Hindi added
  "hinglish_conversations": 81, // Update if Hinglish added
  "updated": "2026-03-07"       // Update date
}
```

## Step 6: Server Restart Karo

```bash
# Terminal mein:
cd VAANI/ai-backend
node server-production.js
```

Ya Kiro mein running server ko stop karke restart karo.

## Step 7: Test Karo

```bash
node test-indexer.js
```

## Quick Add Template

Tumhare liye ready template:

```json
,
{
  "id": "conv_XXX",
  "category": "CATEGORY_NAME",
  "user": "USER_QUESTION",
  "assistant": "VAANI_RESPONSE",
  "context": "SHORT_CONTEXT"
}
```

## Common Categories

- `road_pothole` - Sadak ke gadde
- `water_supply` - Paani ki problem
- `electricity` - Bijli ka issue
- `garbage` - Kachra collection
- `streetlight` - Street light problem
- `drainage` - Naali block
- `hospital_staff` - Hospital staff issue
- `police` - Police complaint
- `traffic` - Traffic problem
- `park_issue` - Park maintenance
- `school` - School infrastructure
- `schemes` - Government schemes
- `documents` - Document related
- `ration` - Ration card issue

## Tips for Good Responses

1. **Be Helpful**: Clear, actionable guidance do
2. **Be Specific**: Generic responses avoid karo
3. **Be Conversational**: Natural language use karo
4. **Be Brief**: 2-3 sentences mein answer do
5. **Offer Help**: "Kya main aapko guide karun?" type questions add karo

## Example: Adding 5 New Conversations

```json
,
{
  "id": "conv_204",
  "category": "noise_pollution",
  "user": "Raat ko bahut shor hota hai",
  "assistant": "Noise pollution ki complaint aap police ya municipal corporation ko kar sakte hain. VAANI mein 'Noise Complaint' select karke time, location aur details add karein. Main aapko step-by-step guide kar sakti hoon.",
  "context": "noise_complaint"
},
{
  "id": "conv_205",
  "category": "stray_animals",
  "user": "Sadak pe bahut kutte ghoom rahe hain",
  "assistant": "Stray animals ki problem ke liye aap municipal corporation ko complaint karein. VAANI mein 'Stray Animals' category select karke location aur photo add karein. Kya aapko help chahiye?",
  "context": "stray_dogs"
},
{
  "id": "conv_206",
  "category": "building_collapse",
  "user": "Building gir sakti hai, bahut purani hai",
  "assistant": "Yeh serious safety issue hai! Turant municipal building department ko report karein. VAANI mein 'Unsafe Building' select karke urgent complaint file karein. Emergency mein 100 dial karein.",
  "context": "building_safety"
},
{
  "id": "conv_207",
  "category": "air_pollution",
  "user": "Pollution bahut zyada hai yahan",
  "assistant": "Air pollution ki complaint Pollution Control Board ko karein. VAANI mein 'Air Pollution' select karke source aur location details add karein. Main aapko process bataungi.",
  "context": "air_quality"
},
{
  "id": "conv_208",
  "category": "child_labor",
  "user": "Bacche kaam kar rahe hain yahan",
  "assistant": "Child labor serious crime hai. Turant Child Helpline 1098 pe call karein ya police ko inform karein. VAANI mein bhi 'Child Labor' report kar sakte hain with location details.",
  "context": "child_protection"
}
```

## ✅ Done!

Bas itna hi! Naye conversations add karo, server restart karo, aur test karo.

**Agar koi doubt ho toh batao, main help karunga!** 🚀
