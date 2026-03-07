import axios from 'axios';

const testQuestions = [
  // Identity questions
  'Tum kaun ho?',
  'Who are you?',
  'तुम कौन हो?',
  
  // About Vaani
  'Vaani kya hai?',
  'What is Vaani?',
  'Vaani क्या है?',
  
  // Help capabilities
  'Tum kya madad kar sakte ho?',
  'What help can you provide?',
  
  // Greetings
  'Namaste',
  'Hello',
  'नमस्ते',
  
  // Help requests
  'Mujhe madad chahiye',
  'I need help',
  
  // Emotional support
  'Main bahut pareshan hoon',
  'I am very worried',
  
  // Complaint filing
  'Complaint kaise kare?',
  'How to file a complaint?',
  
  // Complaint tracking
  'Complaint status kaise check kare?',
  'How to check complaint status?',
  
  // Road issues
  'Sadak toot gayi hai kya kare?',
  'Road is damaged, what to do?',
  
  // Streetlight
  'Street light kharab hai kya kare?',
  'Street light is broken, what to do?',
  
  // Water supply
  'Pani nahi aa raha kya kare?',
  'Water not coming, what to do?',
  
  // Garbage
  'Kooda nahi uth raha kya kare?',
  'Garbage not collected, what to do?',
  
  // Drainage
  'Sewer overflow ho raha hai kya kare?',
  'Sewer is overflowing, what to do?',
  
  // Government schemes
  'Government schemes ki information kaise milegi?',
  'How to get government schemes information?',
  
  // Ayushman Yojana
  'Ayushman Bharat Yojana kya hai?',
  'What is Ayushman Bharat Yojana?',
  'Ayushman card kaise banwaye?',
  'How to make Ayushman card?',
  
  // PM Awas Yojana
  'PM Awas Yojana me apply kaise kare?',
  'How to apply in PM Awas Yojana?',
  
  // Ration card
  'Ration card kaise banwaye?',
  'How to make ration card?',
  
  // Volunteer
  'Volunteer help mil sakti hai kya?',
  'Can I get volunteer help?',
  
  // Free service
  'Complaint karna free hai kya?',
  'Is filing complaint free?',
  
  // Account creation
  'Account kaise banaye?',
  'How to create account?',
  
  // Gratitude
  'Dhanyavaad',
  'Thank you',
  
  // Farewell
  'Alvida'
];

console.log('🧪 Testing Complete Trilingual Dataset');
console.log(`📊 Total Questions: ${testQuestions.length}\n`);
console.log('======================================================================');

let passed = 0;
let failed = 0;
const failedTests = [];

for (const question of testQuestions) {
  try {
    const res = await axios.post('http://localhost:5000/voice-command', {
      command: question,
      userId: 'test-complete'
    });
    
    const isTrainingMatch = res.data.source === 'training_exact' || 
                            res.data.source === 'training_similar' ||
                            res.data.source === 'cache';  // Cache is also valid!
    
    if (isTrainingMatch) {
      console.log(`✅ "${question}"`);
      console.log(`   Lang: ${res.data.detectedLanguage} | Source: ${res.data.source}`);
      console.log(`   Response: ${res.data.content.substring(0, 80)}...`);
      passed++;
    } else {
      console.log(`❌ "${question}"`);
      console.log(`   Lang: ${res.data.detectedLanguage} | Source: ${res.data.source} (expected training)`);
      console.log(`   Response: ${res.data.content.substring(0, 80)}...`);
      failed++;
      failedTests.push(question);
    }
    console.log('');
  } catch (e) {
    console.log(`❌ "${question}"`);
    console.log(`   Error: ${e.message}\n`);
    failed++;
    failedTests.push(question);
  }
}

console.log('======================================================================');
console.log(`\n📊 Final Results:`);
console.log(`   ✅ Passed: ${passed}/${testQuestions.length}`);
console.log(`   ❌ Failed: ${failed}/${testQuestions.length}`);
console.log(`   Success Rate: ${((passed / testQuestions.length) * 100).toFixed(1)}%`);

if (failedTests.length > 0) {
  console.log(`\n⚠️ Failed Questions:`);
  failedTests.forEach(q => console.log(`   - ${q}`));
} else {
  console.log(`\n🎉 All questions working perfectly with 100% accuracy!`);
}
