/**
 * Test with Question Variations
 * Har question ko different ways me test karo
 */

import fs from 'fs/promises'
import cache from './response-cache.js'
import { detectLanguage } from './language-detector.js'

console.log('🧪 Testing with Question Variations\n')
console.log('='.repeat(70))

// Common variations for testing
const variations = {
  hinglish: [
    { from: 'kaise', to: 'kese' },
    { from: 'kare', to: 'kare' },
    { from: 'kya', to: 'kya' },
    { from: 'hai', to: 'he' },
    { from: 'ho', to: 'ho' },
    { from: 'kaun', to: 'kon' },
    { from: 'Vaani', to: 'vani' },
    { from: 'Vaani', to: 'wani' }
  ]
}

function generateVariations(question, language) {
  const results = [question] // Original question
  
  if (language === 'hinglish') {
    // Generate spelling variations
    variations.hinglish.forEach(v => {
      if (question.includes(v.from)) {
        results.push(question.replace(v.from, v.to))
      }
    })
    
    // Case variations
    results.push(question.toLowerCase())
    results.push(question.charAt(0).toUpperCase() + question.slice(1).toLowerCase())
  }
  
  return [...new Set(results)] // Remove duplicates
}

async function testWithVariations() {
  try {
    // Initialize cache
    await cache.initialize()
    
    // Load dataset
    const data = await fs.readFile('./training-dataset.json', 'utf-8')
    const dataset = JSON.parse(data)
    const conversations = dataset.training_conversations
    
    console.log(`\n📚 Testing ${conversations.length} conversations with variations\n`)
    
    let totalTests = 0
    let passed = 0
    let failed = 0
    const results = []
    
    for (const conv of conversations) {
      const language = detectLanguage(conv.user)
      const questionVariations = generateVariations(conv.user, language)
      
      console.log(`\n📝 ${conv.id} - ${conv.category}`)
      console.log(`   Original: "${conv.user}"`)
      console.log(`   Variations: ${questionVariations.length}`)
      
      let convPassed = 0
      let convFailed = 0
      
      for (const variant of questionVariations) {
        totalTests++
        const cached = await cache.get(variant)
        
        if (cached) {
          passed++
          convPassed++
          console.log(`   ✅ "${variant.substring(0, 40)}..." - FOUND`)
        } else {
          failed++
          convFailed++
          console.log(`   ❌ "${variant.substring(0, 40)}..." - NOT FOUND`)
        }
      }
      
      results.push({
        id: conv.id,
        category: conv.category,
        totalVariations: questionVariations.length,
        passed: convPassed,
        failed: convFailed,
        accuracy: ((convPassed / questionVariations.length) * 100).toFixed(2)
      })
    }
    
    // Summary
    console.log('\n' + '='.repeat(70))
    console.log('\n📊 Overall Results:')
    console.log(`   Total Tests: ${totalTests}`)
    console.log(`   Passed: ${passed}`)
    console.log(`   Failed: ${failed}`)
    console.log(`   Accuracy: ${((passed / totalTests) * 100).toFixed(2)}%`)
    
    // Category-wise results
    console.log('\n📋 Category-wise Results:')
    const categories = {}
    results.forEach(r => {
      if (!categories[r.category]) {
        categories[r.category] = { passed: 0, total: 0 }
      }
      categories[r.category].passed += r.passed
      categories[r.category].total += r.totalVariations
    })
    
    Object.keys(categories).forEach(cat => {
      const acc = ((categories[cat].passed / categories[cat].total) * 100).toFixed(2)
      console.log(`   ${cat}: ${acc}% (${categories[cat].passed}/${categories[cat].total})`)
    })
    
    // Low accuracy conversations
    const lowAccuracy = results.filter(r => parseFloat(r.accuracy) < 100)
    if (lowAccuracy.length > 0) {
      console.log('\n⚠️  Conversations with < 100% accuracy:')
      lowAccuracy.forEach(r => {
        console.log(`   ${r.id} (${r.category}): ${r.accuracy}% - ${r.passed}/${r.totalVariations}`)
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
      categoryResults: categories,
      detailedResults: results,
      lowAccuracyConversations: lowAccuracy
    }
    
    await fs.writeFile(
      './test-variations-report.json',
      JSON.stringify(report, null, 2)
    )
    
    console.log('\n💾 Detailed report saved to: test-variations-report.json')
    
  } catch (err) {
    console.error('❌ Error:', err.message)
    process.exit(1)
  }
}

testWithVariations()
