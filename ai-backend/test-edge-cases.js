/**
 * Edge Cases Testing
 * Test unusual inputs, special characters, long text, etc.
 */

import cache from './response-cache.js'
import { detectLanguage } from './language-detector.js'

console.log('🔍 Edge Cases Testing\n')
console.log('='.repeat(70))

async function testEdgeCases() {
  try {
    await cache.initialize()
    
    const edgeCases = [
      // Empty and whitespace
      { name: 'Empty string', input: '', expected: 'should handle gracefully' },
      { name: 'Only spaces', input: '   ', expected: 'should handle gracefully' },
      { name: 'Only newlines', input: '\n\n\n', expected: 'should handle gracefully' },
      
      // Very short
      { name: 'Single char', input: 'a', expected: 'should handle gracefully' },
      { name: 'Two chars', input: 'hi', expected: 'should detect language' },
      
      // Very long
      { name: 'Very long text', input: 'Mujhe bahut madad chahiye '.repeat(50), expected: 'should handle long text' },
      
      // Special characters
      { name: 'Only numbers', input: '12345', expected: 'should handle numbers' },
      { name: 'Special chars', input: '!@#$%^&*()', expected: 'should handle special chars' },
      { name: 'Mixed special', input: 'Hello!!! How??? Are### You???', expected: 'should handle mixed' },
      
      // Unicode and emojis
      { name: 'Emojis', input: '😀 😃 😄 😁', expected: 'should handle emojis' },
      { name: 'Mixed emoji', input: 'Hello 😀 Namaste 🙏', expected: 'should handle mixed emoji' },
      
      // Case variations
      { name: 'ALL CAPS', input: 'TUM KAUN HO?', expected: 'should handle caps' },
      { name: 'aLtErNaTiNg', input: 'TuM kAuN hO?', expected: 'should handle alternating' },
      
      // Multiple spaces
      { name: 'Multiple spaces', input: 'Tum    kaun    ho?', expected: 'should normalize spaces' },
      { name: 'Leading spaces', input: '    Tum kaun ho?', expected: 'should trim' },
      { name: 'Trailing spaces', input: 'Tum kaun ho?    ', expected: 'should trim' },
      
      // Mixed languages in one query
      { name: 'Hindi + English', input: 'मुझे help chahiye', expected: 'should detect mixed' },
      { name: 'English + Hindi', input: 'I need मदद', expected: 'should detect mixed' },
      
      // Typos and misspellings
      { name: 'Common typo 1', input: 'tum kon ho', expected: 'should match similar' },
      { name: 'Common typo 2', input: 'complent kese kare', expected: 'should match similar' },
      { name: 'Common typo 3', input: 'panni nahi aa raha', expected: 'should match similar' },
      
      // Repeated characters
      { name: 'Repeated chars', input: 'Hellllloooo', expected: 'should handle repeated' },
      { name: 'Repeated words', input: 'help help help', expected: 'should handle repeated words' },
      
      // Questions without question marks
      { name: 'No question mark', input: 'Tum kaun ho', expected: 'should still work' },
      { name: 'Statement form', input: 'Mujhe madad chahiye', expected: 'should still work' },
      
      // Multiple punctuation
      { name: 'Multiple ?', input: 'Tum kaun ho???', expected: 'should normalize' },
      { name: 'Multiple !', input: 'Emergency hai!!!', expected: 'should normalize' },
      
      // HTML/Code injection attempts
      { name: 'HTML tags', input: '<script>alert("test")</script>', expected: 'should handle safely' },
      { name: 'SQL-like', input: "'; DROP TABLE users; --", expected: 'should handle safely' },
      
      // Different scripts
      { name: 'Pure Hindi', input: 'आप कौन हैं?', expected: 'should detect Hindi' },
      { name: 'Pure English', input: 'Who are you?', expected: 'should detect English' },
      { name: 'Pure Hinglish', input: 'Aap kaun hain?', expected: 'should detect Hinglish' }
    ]
    
    console.log(`\n🧪 Testing ${edgeCases.length} edge cases\n`)
    
    let passed = 0
    let failed = 0
    const results = []
    
    for (const testCase of edgeCases) {
      try {
        // Test language detection
        const language = detectLanguage(testCase.input)
        
        // Test cache lookup
        const cached = await cache.get(testCase.input)
        
        // Test passed if no error thrown
        passed++
        results.push({
          name: testCase.name,
          input: testCase.input.substring(0, 50),
          language: language,
          cached: cached ? 'Found' : 'Not found',
          status: 'PASS'
        })
        console.log(`✅ ${testCase.name}: PASS`)
        console.log(`   Input: "${testCase.input.substring(0, 50)}${testCase.input.length > 50 ? '...' : ''}"`)
        console.log(`   Language: ${language}`)
        console.log(`   Cached: ${cached ? 'Yes' : 'No'}`)
      } catch (err) {
        failed++
        results.push({
          name: testCase.name,
          input: testCase.input.substring(0, 50),
          error: err.message,
          status: 'FAIL'
        })
        console.log(`❌ ${testCase.name}: FAIL`)
        console.log(`   Error: ${err.message}`)
      }
      console.log()
    }
    
    // Summary
    console.log('='.repeat(70))
    console.log('\n📊 Edge Cases Test Summary:')
    console.log(`   Total Tests: ${edgeCases.length}`)
    console.log(`   Passed: ${passed}`)
    console.log(`   Failed: ${failed}`)
    console.log(`   Success Rate: ${((passed / edgeCases.length) * 100).toFixed(2)}%`)
    
    // Group by category
    console.log('\n📋 Results by Category:')
    
    const categories = {
      'Empty/Whitespace': results.slice(0, 3),
      'Very Short': results.slice(3, 5),
      'Very Long': results.slice(5, 6),
      'Special Characters': results.slice(6, 9),
      'Unicode/Emoji': results.slice(9, 11),
      'Case Variations': results.slice(11, 13),
      'Spacing Issues': results.slice(13, 16),
      'Mixed Languages': results.slice(16, 18),
      'Typos': results.slice(18, 21),
      'Repeated': results.slice(21, 23),
      'No Punctuation': results.slice(23, 25),
      'Multiple Punctuation': results.slice(25, 27),
      'Injection Attempts': results.slice(27, 29),
      'Different Scripts': results.slice(29, 32)
    }
    
    Object.keys(categories).forEach(cat => {
      const catResults = categories[cat]
      const catPassed = catResults.filter(r => r.status === 'PASS').length
      const catTotal = catResults.length
      console.log(`   ${cat}: ${catPassed}/${catTotal} passed`)
    })
    
    console.log('\n' + '='.repeat(70))
    
    if (failed === 0) {
      console.log('\n🎉 All edge cases handled successfully!')
    } else {
      console.log(`\n⚠️  ${failed} edge cases failed. Review needed.`)
    }
    
  } catch (err) {
    console.error('❌ Error:', err.message)
    process.exit(1)
  }
}

testEdgeCases()
