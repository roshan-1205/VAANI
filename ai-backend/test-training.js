/**
 * Test script for VAANI training data
 * Tests the 5 new Q&A pairs
 */

import axios from 'axios';

const API_URL = 'http://localhost:5000';
const TEST_USER = 'training_test_user';

// Test questions
const testQuestions = [
  {
    id: 1,
    question: "Who are you?",
    expectedKeywords: ["VAANI", "Voice-First", "AI", "civic assistant", "complaints"]
  },
  {
    id: 2,
    question: "What is VAANI?",
    expectedKeywords: ["AI-powered", "public service", "platform", "civic issues", "road damage"]
  },
  {
    id: 3,
    question: "Can complaints be registered in VAANI?",
    expectedKeywords: ["Yes", "register complaints", "category", "location", "submit"]
  },
  {
    id: 4,
    question: "Is call assistance available in VAANI?",
    expectedKeywords: ["Yes", "guidance", "call support", "volunteer assistance"]
  },
  {
    id: 5,
    question: "Hello",
    expectedKeywords: ["Hello", "VAANI", "assist", "today"]
  }
];

// Colors for console output
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m'
};

async function testQuestion(testCase) {
  try {
    console.log(`\n${colors.cyan}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${colors.reset}`);
    console.log(`${colors.blue}Test ${testCase.id}: ${testCase.question}${colors.reset}`);
    console.log(`${colors.cyan}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${colors.reset}`);
    
    const startTime = Date.now();
    
    const response = await axios.post(`${API_URL}/chat`, {
      message: testCase.question,
      userId: TEST_USER
    });
    
    const endTime = Date.now();
    const responseTime = endTime - startTime;
    
    const answer = response.data.content;
    const source = response.data.source;
    const language = response.data.language;
    
    console.log(`\n📝 Question: "${testCase.question}"`);
    console.log(`\n💬 Answer: "${answer}"`);
    console.log(`\n⏱️  Response Time: ${responseTime}ms`);
    console.log(`📊 Source: ${source}`);
    console.log(`🌐 Language: ${language}`);
    
    // Check if response contains expected keywords
    let keywordsFound = 0;
    const missingKeywords = [];
    
    testCase.expectedKeywords.forEach(keyword => {
      if (answer.toLowerCase().includes(keyword.toLowerCase())) {
        keywordsFound++;
      } else {
        missingKeywords.push(keyword);
      }
    });
    
    const keywordScore = (keywordsFound / testCase.expectedKeywords.length) * 100;
    
    console.log(`\n🎯 Keyword Match: ${keywordsFound}/${testCase.expectedKeywords.length} (${keywordScore.toFixed(0)}%)`);
    
    if (missingKeywords.length > 0) {
      console.log(`${colors.yellow}⚠️  Missing keywords: ${missingKeywords.join(', ')}${colors.reset}`);
    }
    
    // Determine if test passed
    // Cache is also valid if it contains training data responses
    const isValidSource = source === 'training_exact' || source === 'training_similar' || source === 'cache';
    const isFastResponse = responseTime < 100;
    const hasGoodKeywords = keywordScore >= 60;
    
    const passed = isValidSource && isFastResponse && hasGoodKeywords;
    
    if (passed) {
      console.log(`\n${colors.green}✅ TEST PASSED${colors.reset}`);
    } else {
      console.log(`\n${colors.red}❌ TEST FAILED${colors.reset}`);
      if (!isValidSource) console.log(`   - Invalid source (source: ${source})`);
      if (!isFastResponse) console.log(`   - Response too slow (${responseTime}ms > 100ms)`);
      if (!hasGoodKeywords) console.log(`   - Missing key information (${keywordScore.toFixed(0)}% < 60%)`);
    }
    
    return {
      id: testCase.id,
      question: testCase.question,
      passed,
      responseTime,
      source,
      keywordScore
    };
    
  } catch (error) {
    console.log(`\n${colors.red}❌ ERROR: ${error.message}${colors.reset}`);
    return {
      id: testCase.id,
      question: testCase.question,
      passed: false,
      error: error.message
    };
  }
}

async function runAllTests() {
  console.log(`\n${colors.cyan}╔════════════════════════════════════════════════════╗${colors.reset}`);
  console.log(`${colors.cyan}║     VAANI Training Data Test Suite                ║${colors.reset}`);
  console.log(`${colors.cyan}║     Testing 5 New Q&A Pairs                       ║${colors.reset}`);
  console.log(`${colors.cyan}╚════════════════════════════════════════════════════╝${colors.reset}\n`);
  
  // Check if server is running
  try {
    await axios.get(`${API_URL}/health`);
    console.log(`${colors.green}✅ Server is running at ${API_URL}${colors.reset}\n`);
  } catch (error) {
    console.log(`${colors.red}❌ Server is not running at ${API_URL}${colors.reset}`);
    console.log(`${colors.yellow}Please start the server first: cd VAANI/ai-backend && npm start${colors.reset}\n`);
    process.exit(1);
  }
  
  const results = [];
  
  // Run all tests
  for (const testCase of testQuestions) {
    const result = await testQuestion(testCase);
    results.push(result);
    await new Promise(resolve => setTimeout(resolve, 500)); // Small delay between tests
  }
  
  // Summary
  console.log(`\n${colors.cyan}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${colors.reset}`);
  console.log(`${colors.blue}TEST SUMMARY${colors.reset}`);
  console.log(`${colors.cyan}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${colors.reset}\n`);
  
  const passed = results.filter(r => r.passed).length;
  const failed = results.filter(r => !r.passed).length;
  const avgResponseTime = results
    .filter(r => r.responseTime)
    .reduce((sum, r) => sum + r.responseTime, 0) / results.length;
  
  console.log(`Total Tests: ${results.length}`);
  console.log(`${colors.green}Passed: ${passed}${colors.reset}`);
  console.log(`${colors.red}Failed: ${failed}${colors.reset}`);
  console.log(`Average Response Time: ${avgResponseTime.toFixed(0)}ms`);
  
  // Detailed results
  console.log(`\n${colors.blue}Detailed Results:${colors.reset}\n`);
  results.forEach(result => {
    const status = result.passed ? `${colors.green}✅ PASS${colors.reset}` : `${colors.red}❌ FAIL${colors.reset}`;
    const time = result.responseTime ? `${result.responseTime}ms` : 'N/A';
    const source = result.source || 'error';
    console.log(`${status} | Test ${result.id} | ${time} | ${source}`);
  });
  
  // Final verdict
  console.log(`\n${colors.cyan}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${colors.reset}`);
  if (passed === results.length) {
    console.log(`${colors.green}🎉 ALL TESTS PASSED! Training data is working correctly.${colors.reset}`);
  } else {
    console.log(`${colors.yellow}⚠️  Some tests failed. Please review the results above.${colors.reset}`);
  }
  console.log(`${colors.cyan}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${colors.reset}\n`);
}

// Run tests
runAllTests().catch(error => {
  console.error(`${colors.red}Fatal error: ${error.message}${colors.reset}`);
  process.exit(1);
});
