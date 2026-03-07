import axios from 'axios';

// Simulating speech recognition errors
const testCases = [
  { input: 'Tum kaun ho?', expected: 'identity' },
  { input: 'tum kon ho', expected: 'identity' }, // Speech error: kaun → kon
  { input: 'tum koun ho', expected: 'identity' }, // Speech error: kaun → koun
  { input: 'Vaani kya hai?', expected: 'about_vaani' },
  { input: 'wani kya hai', expected: 'about_vaani' }, // Speech error: Vaani → wani
  { input: 'vani kya he', expected: 'about_vaani' }, // Speech error: hai → he
  { input: 'complaint kese kare', expected: 'complaint' }, // Speech error: kaise → kese
  { input: 'complain kaise kare', expected: 'complaint' }, // Speech error: complaint → complain
  { input: 'sadak tut gayi hai', expected: 'road' }, // Speech error: toot → tut
  { input: 'sadak toot gai hai', expected: 'road' }, // Speech error: gayi → gai
  { input: 'pani nahi aa raha', expected: 'water' },
  { input: 'pani nhi aa rha', expected: 'water' }, // Speech error: nahi → nhi, raha → rha
];

console.log('🧪 Testing Fuzzy Matching for Speech Recognition Errors\n');
console.log('======================================================================');

let passed = 0;
let failed = 0;

for (const test of testCases) {
  try {
    const res = await axios.post('http://localhost:5000/voice-command', {
      command: test.input,
      userId: 'test-fuzzy'
    });
    
    const gotResponse = res.data.source === 'training_exact' || 
                       res.data.source === 'training_similar' ||
                       res.data.source === 'cache';
    
    if (gotResponse) {
      console.log(`✅ "${test.input}"`);
      console.log(`   Source: ${res.data.source} | Response: ${res.data.content.substring(0, 60)}...`);
      passed++;
    } else {
      console.log(`❌ "${test.input}"`);
      console.log(`   Source: ${res.data.source} (fallback - fuzzy matching failed)`);
      failed++;
    }
    console.log('');
  } catch (e) {
    console.log(`❌ "${test.input}" - Error: ${e.message}\n`);
    failed++;
  }
}

console.log('======================================================================');
console.log(`\n📊 Fuzzy Matching Results:`);
console.log(`   ✅ Passed: ${passed}/${testCases.length}`);
console.log(`   ❌ Failed: ${failed}/${testCases.length}`);
console.log(`   Success Rate: ${((passed / testCases.length) * 100).toFixed(1)}%`);

if (passed === testCases.length) {
  console.log(`\n🎉 Perfect! Fuzzy matching working excellently for speech errors!`);
} else if (passed / testCases.length > 0.8) {
  console.log(`\n✅ Good! Fuzzy matching handling most speech recognition errors.`);
} else {
  console.log(`\n⚠️ Needs improvement. Some speech errors not being handled.`);
}
