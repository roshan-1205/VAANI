/**
 * Government Schemes Specific Test
 * Sirf government schemes wale questions ko test karo
 */

import fs from 'fs/promises'
import cache from './response-cache.js'

console.log('🏛️  VAANI Government Schemes Test\n')
console.log('=' .repeat(70))

async function testGovernmentSchemes() {
  try {
    // Initialize cache
    await cache.initialize()
    
    // Load training dataset
    const data = await fs.readFile('./training-dataset.json', 'utf-8')
    const dataset = JSON.parse(data)
    const conversations = dataset.training_conversations
    
    // Filter only government scheme related conversations
    const schemeConversations = conversations.filter(conv => 
      conv.category.includes('scheme') || 
      conv.category.includes('ayushman') || 
      conv.category.includes('awas') || 
      conv.category.includes('ration') ||
      conv.category.includes('ujjwala') ||
      conv.category.includes('government')
    )
    
    console.log(`\n📊 Total Government Scheme Questions: ${schemeConversations.length}\n`)
    
    let passed = 0
    let failed = 0
    const results = []
    
    for (const conv of schemeConversations) {
      const cached = await cache.get(conv.user)
      const status = cached && cached === conv.assistant ? 'PASS' : 'FAIL'
      
      if (status === 'PASS') {
        passed++
        console.log(`✅ ${conv.id}: ${conv.user.substring(0, 50)}...`)
      } else {
        failed++
        console.log(`❌ ${conv.id}: ${conv.user.substring(0, 50)}...`)
      }
      
      results.push({
        id: conv.id,
        category: conv.category,
        question: conv.user,
        expected: conv.assistant,
        got: cached || 'NOT FOUND',
        status
      })
    }
    
    const accuracy = ((passed / schemeConversations.length) * 100).toFixed(2)
    
    console.log('\n' + '='.repeat(70))
    console.log('\n📊 Government Schemes Test Results:')
    console.log(`   Total Tests: ${schemeConversations.length}`)
    console.log(`   Passed: ${passed}`)
    console.log(`   Failed: ${failed}`)
    console.log(`   Accuracy: ${accuracy}%`)
    console.log('\n' + '='.repeat(70))
    
    // Show detailed results by category
    console.log('\n📋 Results by Category:\n')
    
    const categories = {}
    results.forEach(r => {
      if (!categories[r.category]) {
        categories[r.category] = { passed: 0, failed: 0 }
      }
      if (r.status === 'PASS') {
        categories[r.category].passed++
      } else {
        categories[r.category].failed++
      }
    })
    
    Object.keys(categories).sort().forEach(cat => {
      const total = categories[cat].passed + categories[cat].failed
      const catAccuracy = ((categories[cat].passed / total) * 100).toFixed(0)
      console.log(`   ${cat}: ${categories[cat].passed}/${total} (${catAccuracy}%)`)
    })
    
    if (failed > 0) {
      console.log('\n❌ Failed Tests Details:\n')
      results.filter(r => r.status === 'FAIL').forEach(r => {
        console.log(`   ID: ${r.id}`)
        console.log(`   Category: ${r.category}`)
        console.log(`   Q: ${r.question}`)
        console.log(`   Expected: ${r.expected.substring(0, 80)}...`)
        console.log(`   Got: ${typeof r.got === 'string' ? r.got.substring(0, 80) : r.got}...`)
        console.log()
      })
    }
    
    console.log('\n✅ Government Schemes Test Complete!')
    
    return accuracy >= 95
  } catch (err) {
    console.error('❌ Error:', err.message)
    return false
  }
}

testGovernmentSchemes()
  .then(success => {
    process.exit(success ? 0 : 1)
  })
  .catch(err => {
    console.error('❌ Fatal Error:', err)
    process.exit(1)
  })
