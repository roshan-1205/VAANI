// Test Hindi AI responses
import fetch from 'node-fetch';

const tests = [
  { message: "पानी नहीं आ रहा", userId: "test1", expected: "water" },
  { message: "स्ट्रीट लाइट नहीं जल रही", userId: "test2", expected: "streetlight" },
  { message: "सड़क में गड्ढा है", userId: "test3", expected: "road" },
  { message: "बिजली नहीं आ रही", userId: "test4", expected: "electricity" },
  { message: "कचरा नहीं उठाया", userId: "test5", expected: "garbage" },
  { message: "नाली बंद है", userId: "test6", expected: "drainage" },
  { message: "हेलो", userId: "test7", expected: "greeting" },
  { message: "मदद चाहिए", userId: "test8", expected: "help" }
];

async function testAI() {
  console.log("🧪 Testing VAANI Enhanced AI with Hindi...\n");
  
  for (const test of tests) {
    try {
      const response = await fetch('http://localhost:5000/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(test)
      });
      
      const data = await response.json();
      console.log(`✅ Test: "${test.message}"`);
      console.log(`   Response: ${data.content.substring(0, 100)}...`);
      console.log("");
    } catch (error) {
      console.log(`❌ Test failed: ${test.message}`);
      console.log(`   Error: ${error.message}\n`);
    }
  }
  
  console.log("✅ All tests completed!");
}

testAI();
