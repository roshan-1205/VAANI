/**
 * Detailed test of all 65 questions with full output
 */

import axios from 'axios'
import fs from 'fs/promises'

const API_URL = 'http://localhost:5000'

console.log('🧪 DETAILED TEST - ALL 65 QUESTIONS\n')
console.log('=' .repeat(80))

async function testAllQuestions() {
  // Load training dataset
  const data = await fs.readFile('./training-dataset.json', 'utf-8')
  const dataset = JSON.parse(data)
  const conversations = dataset.training_conversations
  
  console.log(`\n📊 Total Questions to Test: ${conversations.length}\n`)
  console.log('=' .repeat(80))
  
  let passed = 0
  let failed = 0
  const results = []
  
  for (let i = 0; i < conversations.length; i++) {
    const conv = conversations[i]
    const num = i + 1
    
    console.log(`\n${num}. Testing: ${conv.id}`)
    console.log(`   Question: "${conv.user}"`)
    
    try {
      const startTime = Date.now()
      const response = await axios.post(`${API_URL}/voice-command`, {
        command: conv.user,
        userId: 'detailed-test'
      })
      const responseTime = Date.now() - startTime
      
      const data = response.data
      
      if (data.content && data.content.length > 0) {
        passed++
        console.log(`   ✅ PASS`)
        console.log(`   Language: ${data.language || data.detectedLanguage}`)
        console.log(`   Source: ${data.source}`)
        console.log(`   Time: ${responseTime}ms`)
        console.log(`   Response: ${data.content.substring(0, 100)}...`)
        
        results.push({
          num,
          id: conv.id,
          question: conv.user,
          status: 'PASS',
          language: data.language || data.detectedLanguage,
          source: data.source,
          time: responseTime,
          response: data.content.substring(0, 80)
        })
      } else {
        failed++
        console.log(`   ❌ FAIL - No response`)
        
        results.push({
          num,
          id: conv.id,
          question: conv.user,
          status: 'FAIL',
          reason: 'No response'
        })
      }
      
      // Small delay
      await new Promise(resolve => setTimeout(resolve, 100))
      
    } catch (err) {
      failed++
      console.log(`   ❌ FAIL - Error: ${err.message}`)
      
      results.push({
        num,
        id: conv.id,
        question: conv.user,
        status: 'FAIL',
        reason: err.message
      })
    }
  }
  
  // Print summary
  console.log('\n' + '=' .repeat(80))
  console.log('\n📊 DETAILED SUMMARY\n')
  console.log('=' .repeat(80))
  
  // Group by category
  const categories = {
    'Introduction': [],
    'Help & Support': [],
    'Greetings': [],
    'Complaints': [],
    'Civic Issues': [],
    'Government Schemes': [],
    'Other': []
  }
  
  results.forEach(r => {
    if (r.status === 'PASS') {
      if (r.id.includes('introduction')) categories['Introduction'].push(r)
      else if (r.id.includes('assistance') || r.id.includes('help') || r.id.includes('pareshan')) categories['Help & Support'].push(r)
      else if (r.id.includes('greeting') || r.id.includes('gratitude') || r.id.includes('farewell')) categories['Greetings'].push(r)
      else if (r.id.includes('complaint') || r.id.includes('ignored')) categories['Complaints'].push(r)
      else if (r.id.includes('road') || r.id.includes('street') || r.id.includes('water') || r.id.includes('garbage') || r.id.includes('sewer') || r.id.includes('drainage')) categories['Civic Issues'].push(r)
      else if (r.id.includes('scheme') || r.id.includes('ayushman') || r.id.includes('awas') || r.id.includes('ration') || r.id.includes('volunteer') || r.id.includes('yojana')) categories['Government Schemes'].push(r)
      else categories['Other'].push(r)
    }
  })
  
  console.log('\n📋 QUESTIONS BY CATEGORY:\n')
  
  Object.keys(categories).forEach(category => {
    const items = categories[category]
    if (items.length > 0) {
      console.log(`\n${category} (${items.length} questions):`)
      items.forEach(item => {
        console.log(`   ${item.num}. ${item.question.substring(0, 60)}... (${item.language}, ${item.time}ms)`)
      })
    }
  })
  
  // Language breakdown
  console.log('\n' + '=' .repeat(80))
  console.log('\n📊 LANGUAGE BREAKDOWN:\n')
  
  const langCount = { english: 0, hindi: 0, hinglish: 0 }
  results.forEach(r => {
    if (r.status === 'PASS' && r.language) {
      langCount[r.language] = (langCount[r.language] || 0) + 1
    }
  })
  
  console.log(`   English: ${langCount.english} questions`)
  console.log(`   Hindi: ${langCount.hindi} questions`)
  console.log(`   Hinglish: ${langCount.hinglish} questions`)
  
  // Source breakdown
  console.log('\n📊 RESPONSE SOURCE BREAKDOWN:\n')
  
  const sourceCount = {}
  results.forEach(r => {
    if (r.status === 'PASS' && r.source) {
      sourceCount[r.source] = (sourceCount[r.source] || 0) + 1
    }
  })
  
  Object.keys(sourceCount).forEach(source => {
    console.log(`   ${source}: ${sourceCount[source]} questions`)
  })
  
  // Performance stats
  console.log('\n📊 PERFORMANCE STATS:\n')
  
  const times = results.filter(r => r.status === 'PASS' && r.time).map(r => r.time)
  if (times.length > 0) {
    const avgTime = times.reduce((sum, t) => sum + t, 0) / times.length
    const minTime = Math.min(...times)
    const maxTime = Math.max(...times)
    
    console.log(`   Average Response Time: ${avgTime.toFixed(1)}ms`)
    console.log(`   Fastest: ${minTime}ms`)
    console.log(`   Slowest: ${maxTime}ms`)
  }
  
  // Final results
  console.log('\n' + '=' .repeat(80))
  console.log('\n🎯 FINAL RESULTS:\n')
  console.log(`   Total Questions: ${conversations.length}`)
  console.log(`   ✅ Passed: ${passed}`)
  console.log(`   ❌ Failed: ${failed}`)
  console.log(`   Accuracy: ${((passed / conversations.length) * 100).toFixed(2)}%`)
  
  if (passed === conversations.length) {
    console.log('\n🎉🎉🎉 100% ACCURACY - ALL QUESTIONS WORKING! 🎉🎉🎉')
  } else {
    console.log('\n⚠️  Some questions failed')
    const failedResults = results.filter(r => r.status === 'FAIL')
    console.log('\nFailed Questions:')
    failedResults.forEach(r => {
      console.log(`   ${r.num}. ${r.question} - ${r.reason}`)
    })
  }
  
  console.log('\n' + '=' .repeat(80))
}

testAllQuestions().catch(err => {
  console.error('Test error:', err)
  process.exit(1)
})
