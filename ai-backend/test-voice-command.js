import axios from 'axios';

const tests = [
  'Hello, mere area mein bahut bada pothole hai',
  'Paani nahi aa raha 3 din se',
  'Tum kaun ho?',
  'VAANI kya hai?',
  'Complaint kaise file karte hain?'
];

console.log('🎤 Testing Voice Command Endpoint\n');

for (const test of tests) {
  try {
    const res = await axios.post('http://localhost:5000/voice-command', {
      command: test,
      userId: 'test-voice'
    });
    
    console.log(`\n✅ "${test}"`);
    console.log(`   Response: ${res.data.content.substring(0, 80)}...`);
    console.log(`   Type: ${res.data.type} | Source: ${res.data.source || 'N/A'}`);
  } catch (e) {
    console.log(`\n❌ "${test}"`);
    console.log(`   Error: ${e.message}`);
  }
}
