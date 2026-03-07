import axios from 'axios';

const testQuestions = [
  'Tum kaun ho?',
  'Who are you?',
  'Vaani kya hai?',
  'Account kaise banaye?',
  'Thank you'
];

console.log('🧪 Testing Cache Performance\n');
console.log('======================================================================');
console.log('ROUND 1: First time (should use training data)\n');

// Round 1: First time - should use training data
for (const question of testQuestions) {
  try {
    const start = Date.now();
    const res = await axios.post('http://localhost:5000/voice-command', {
      command: question,
      userId: 'test-cache'
    });
    const time = Date.now() - start;
    
    console.log(`✅ "${question}"`);
    console.log(`   Source: ${res.data.source} | Time: ${time}ms`);
    console.log(`   Response: ${res.data.content.substring(0, 60)}...`);
    console.log('');
  } catch (e) {
    console.log(`❌ "${question}" - Error: ${e.message}\n`);
  }
}

console.log('======================================================================');
console.log('ROUND 2: Repeat (should use cache - MUCH FASTER)\n');

// Round 2: Repeat - should use cache
for (const question of testQuestions) {
  try {
    const start = Date.now();
    const res = await axios.post('http://localhost:5000/voice-command', {
      command: question,
      userId: 'test-cache'
    });
    const time = Date.now() - start;
    
    console.log(`✅ "${question}"`);
    console.log(`   Source: ${res.data.source} | Time: ${time}ms`);
    console.log(`   Response: ${res.data.content.substring(0, 60)}...`);
    console.log('');
  } catch (e) {
    console.log(`❌ "${question}" - Error: ${e.message}\n`);
  }
}

console.log('======================================================================');
console.log('\n🎉 Cache test complete! Check if Round 2 used "cache" source.');
