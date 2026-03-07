/**
 * Comprehensive Language Testing
 * Test all 130 conversations across all 3 languages
 */

import fs from 'fs/promises'
import cache from './response-cache.js'
import { detectLanguage } from './language-detector.js'

console.log('🧪 Comprehensive Language Testing\n')
console.log('='.repeat(70))

async function testAllLanguages() {
  try {
    // Initialize cache
    await cache.initialize()
    
    // Load dataset
    const data = await fs.readFile('./training-dataset.json', 'utf-8')
    const dataset = JSON.parse(data)
    const conversations = dataset.training_conversations
    
    console.log(`\n📚 Testing ${conversations.length} conversations\n`)
    
    // Group by language
    const byLanguage = {
      hinglish: [],
      english: [],
      hindi: []
    }
    
    let totalTests = 0
    let passed = 0
    let failed = 0
    const results = []
    
    for (const conv of conversations) {
      totalTests++
      const language = detectLanguage(conv.user)
      const cached = await cache.get(conv.user)
      
      const result = {
        id: conv.id,
        category: conv.category,
        language: language,
        question: conv.user,
        expected: conv.assistant,
        got: cached,
        status: cached === conv.assistant ? 'PASS' : 'FAIL'
      }
      
      if (result.status === 'PASS') {
        passed++
        console.log(`✅ ${conv.id} [${language}]: PASS`)
      } else {
        failed++
        console.log(`❌ ${conv.id} [${language}]: FAIL`)
      }
      
      results.push(result)
      byLanguage[language].push(result)
    }
    
    // Summary
    console.log('\n' + '='.repeat(70))
    console.log('\n📊 Overall Results:')
    console.log(`   Total Tests: ${totalTests}`)
    console.log(`   Passed: ${passed}`)
    console.log(`   Failed: ${failed}`)
    console.log(`   Accuracy: ${((passed / totalTests) * 100).toFixed(2)}%`)
    
    // Language-wise results
    console.log('\n🌐 Language-wise Results:')
    Object.keys(byLanguage).forEach(lang => {
      const langResults = byLanguage[lang]
      const langPassed = langResults.filter(r => r.status === 'PASS').length
      const langTotal = langResults.length
      const langAccuracy = ((langPassed / langTotal) * 100).toFixed(2)
      
      console.log(`\n   ${lang.toUpperCase()}:`)
      console.log(`      Total: ${langTotal}`)
      console.log(`      Passed: ${langPassed}`)
      console.log(`      Failed: ${langTotal - langPassed}`)
      console.log(`      Accuracy: ${langAccuracy}%`)
    })
    
    // Category-wise results
    console.log('\n📋 Category-wise Results:')
    const categories = {}
    results.forEach(r => {
      if (!categories[r.category]) {
        categories[r.category] = { passed: 0, total: 0 }
      }
      categories[r.category].total++
      if (r.status === 'PASS') {
        categories[r.category].passed++
      }
    })
    
    Object.keys(categories).sort().forEach(cat => {
      const acc = ((categories[cat].passed / categories[cat].total) * 100).toFixed(2)
      const status = acc === '100.00' ? '✅' : '⚠️'
      console.log(`   ${status} ${cat}: ${acc}% (${categories[cat].passed}/${categories[cat].total})`)
    })
    
    // Failed tests
    const failedTests = results.filter(r => r.status === 'FAIL')
    if (failedTests.length > 0) {
      console.log('\n❌ Failed Tests:')
      failedTests.forEach(test => {
        console.log(`\n   ID: ${test.id}`)
        console.log(`   Language: ${test.language}`)
        console.log(`   Category: ${test.category}`)
        console.log(`   Q: ${test.question.substring(0, 50)}...`)
        console.log(`   Expected: ${test.expected.substring(0, 50)}...`)
        console.log(`   Got: ${test.got ? test.got.substring(0, 50) : 'NOT FOUND'}...`)
      })
    }
    
    console.log('\n' + '='.repeat(70))
    
    // Save detailed report
    const report = {
      timestamp: new Date().toISOString(),
      summary: {
        totalTests,
        passed,
        failed,
        accuracy: ((passed / totalTests) * 100).toFixed(2)
      },
      languageResults: {
        hinglish: {
          total: byLanguage.hinglish.length,
          passed: byLanguage.hinglish.filter(r => r.status === 'PASS').length,
          accuracy: ((byLanguage.hinglish.filter(r => r.status === 'PASS').length / byLanguage.hinglish.length) * 100).toFixed(2)
        },
        english: {
          total: byLanguage.english.length,
          passed: byLanguage.english.filter(r => r.status === 'PASS').length,
          accuracy: ((byLanguage.english.filter(r => r.status === 'PASS').length / byLanguage.english.length) * 100).toFixed(2)
        },
        hindi: {
          total: byLanguage.hindi.length,
          passed: byLanguage.hindi.filter(r => r.status === 'PASS').length,
          accuracy: ((byLanguage.hindi.filter(r => r.status === 'PASS').length / byLanguage.hindi.length) * 100).toFixed(2)
        }
      },
      categoryResults: categories,
      detailedResults: results,
      failedTests: failedTests
    }
    
    await fs.writeFile(
      './test-all-languages-report.json',
      JSON.stringify(report, null, 2)
    )
    
    console.log('\n💾 Detailed report saved to: test-all-languages-report.json')
    
    // Cache stats
    const stats = cache.getStats()
    console.log('\n📈 Cache Stats:')
    console.log(`   Total Entries: ${stats.totalEntries}`)
    console.log(`   Hit Rate: ${stats.hitRate}`)
    console.log(`   Estimated Savings: ${stats.estimatedSavings}`)
    
    console.log('\n' + '='.repeat(70))
    
    if (failed === 0) {
      console.log('\n🎉 All tests passed! System is working perfectly!')
    } else {
      console.log(`\n⚠️  ${failed} tests failed. Please review the report.`)
    }
    
  } catch (err) {
    console.error('❌ Error:', err.message)
    process.exit(1)
  }
}

testAllLanguages()
