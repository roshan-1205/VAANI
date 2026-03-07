import axios from 'axios';

const newQuestions = [
  'Water supply issue report karna hai',
  'Main apna complaint edit karna chahta hoon',
  'Complaint delete kaise kare?',
  'Main feedback dena chahta hoon',
  'App crash ho gaya, kya kare?',
  'Notification nahi aa rahi',
  'Kya VAANI free hai?',
  'Main multiple complaints file kar sakta hoon?',
  'Kya VAANI offline work karta hai?',
  'Kya VAANI me photo attach kar sakte hain?',
  'Complaint ka category change kaise kare?',
  'Kya VAANI me report download kar sakte hain?',
  'Kya VAANI me voice commands use kar sakte hain?',
  'Main apni language change karna chahta hoon',
  'Kya VAANI me emergency alert hai?',
  'Main apna profile update kaise karu?',
  'Kya VAANI me map view hai?',
  'Main apna password change kaise karu?',
  'Kya VAANI me chat support hai?',
  'Main complaint escalate kaise karu?'
];

console.log('🧪 Testing 20 New Conversations\n');
console.log('='.repeat(70));

let passed = 0;
let failed = 0;

for (let i = 0; i < newQuestions.length; i++) {
  try {
    const res = await axios.post('http://localhost:5000/chat', {
      message: newQuestions[i],
      userId: `test-new-${i}` // Unique user ID for each test
    });
    
    const isValid = res.data.source === 'training_exact' || 
                    res.data.source === 'training_similar' || 
                    res.data.source === 'cache';
    
    if (isValid) {
      passed++;
      console.log(`✅ ${i+1}. ${newQuestions[i]}`);
      console.log(`   Response: ${res.data.content.substring(0, 60)}...`);
      console.log(`   Source: ${res.data.source}\n`);
    } else {
      failed++;
      console.log(`❌ ${i+1}. ${newQuestions[i]}`);
      console.log(`   Source: ${res.data.source} (unexpected)\n`);
    }
  } catch (e) {
    failed++;
    console.log(`❌ ${i+1}. ${newQuestions[i]}`);
    console.log(`   Error: ${e.message}\n`);
  }
}

console.log('='.repeat(70));
console.log(`\n📊 Final Results:`);
console.log(`   ✅ Passed: ${passed}/${newQuestions.length}`);
console.log(`   ❌ Failed: ${failed}/${newQuestions.length}`);
console.log(`   Success Rate: ${((passed / newQuestions.length) * 100).toFixed(1)}%`);

if (passed === newQuestions.length) {
  console.log('\n🎉 All 20 new conversations working perfectly!');
} else {
  console.log(`\n⚠️ ${failed} conversations need attention.`);
}
