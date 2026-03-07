/**
 * Stress Testing - Test system under load
 * Simulate multiple concurrent requests
 */

import fs from 'fs/promises'
import cache from './response-cache.js'

console.log('🔥 Stress Testing - System Load Test\n')
console.log('='.repeat(70))

async function stressTest() {
  try {
    await cache.initialize()
    
    const data = await fs.readFile('./training-dataset.json', 'utf-8')
    const dataset = JSON.parse(data)
    const conversations = dataset.training_conversations
    
    console.log(`\n📊 Testing ${conversations.length} conversations under stress\n`)
    
    // Test 1: Sequential requests
    console.log('🔄 Test 1: Sequential Requests')
    const startSeq = Date.now()
    for (let i = 0; i < conversations.length; i++) {
      await cache.get(conversations[i].user)
    }
    const endSeq = Date.now()
    const seqTime = endSeq - startSeq
    console.log(`   Time: ${seqTime}ms`)
    console.log(`   Avg per request: ${(seqTime / conversations.length).toFixed(2)}ms`)
    
    // Test 2: Rapid fire (100 requests)
    console.log('\n🔥 Test 2: Rapid Fire (100 requests)')
    const startRapid = Date.now()
    for (let i = 0; i < 100; i++) {
      const conv = conversations[i % conversations.length]
      await cache.get(conv.user)
    }
    const endRapid = Date.now()
    const rapidTime = endRapid - startRapid
    console.log(`   Time: ${rapidTime}ms`)
    console.log(`   Avg per request: ${(rapidTime / 100).toFixed(2)}ms`)
    console.log(`   Requests per second: ${(100 / (rapidTime / 1000)).toFixed(2)}`)
    
    // Test 3: Concurrent requests (Promise.all)
    console.log('\n⚡ Test 3: Concurrent Requests (50 parallel)')
    const startConcurrent = Date.now()
    const promises = []
    for (let i = 0; i < 50; i++) {
      const conv = conversations[i % conversations.length]
      promises.push(cache.get(conv.user))
    }
    await Promise.all(promises)
    const endConcurrent = Date.now()
    const concurrentTime = endConcurrent - startConcurrent
    console.log(`   Time: ${concurrentTime}ms`)
    console.log(`   Avg per request: ${(concurrentTime / 50).toFixed(2)}ms`)
    
    // Test 4: Mixed cache hits and misses
    console.log('\n🎯 Test 4: Mixed Hits and Misses')
    const startMixed = Date.now()
    let hits = 0
    let misses = 0
    for (let i = 0; i < 50; i++) {
      if (i % 2 === 0) {
        // Cached question
        const result = await cache.get(conversations[i % conversations.length].user)
        if (result) hits++
      } else {
        // Random question (likely miss)
        const result = await cache.get(`Random question ${i}`)
        if (result) hits++
        else misses++
      }
    }
    const endMixed = Date.now()
    const mixedTime = endMixed - startMixed
    console.log(`   Time: ${mixedTime}ms`)
    console.log(`   Hits: ${hits}`)
    console.log(`   Misses: ${misses}`)
    console.log(`   Hit Rate: ${((hits / 50) * 100).toFixed(2)}%`)
    
    // Test 5: Long running test (500 requests)
    console.log('\n⏱️  Test 5: Long Running Test (500 requests)')
    const startLong = Date.now()
    for (let i = 0; i < 500; i++) {
      const conv = conversations[i % conversations.length]
      await cache.get(conv.user)
    }
    const endLong = Date.now()
    const longTime = endLong - startLong
    console.log(`   Time: ${longTime}ms`)
    console.log(`   Avg per request: ${(longTime / 500).toFixed(2)}ms`)
    console.log(`   Requests per second: ${(500 / (longTime / 1000)).toFixed(2)}`)
    
    // Summary
    console.log('\n' + '='.repeat(70))
    console.log('\n📊 Stress Test Summary:')
    console.log(`\n   Sequential (${conversations.length} requests):`)
    console.log(`      Total Time: ${seqTime}ms`)
    console.log(`      Avg Time: ${(seqTime / conversations.length).toFixed(2)}ms/request`)
    
    console.log(`\n   Rapid Fire (100 requests):`)
    console.log(`      Total Time: ${rapidTime}ms`)
    console.log(`      Throughput: ${(100 / (rapidTime / 1000)).toFixed(2)} req/s`)
    
    console.log(`\n   Concurrent (50 parallel):`)
    console.log(`      Total Time: ${concurrentTime}ms`)
    console.log(`      Avg Time: ${(concurrentTime / 50).toFixed(2)}ms/request`)
    
    console.log(`\n   Long Running (500 requests):`)
    console.log(`      Total Time: ${longTime}ms`)
    console.log(`      Throughput: ${(500 / (longTime / 1000)).toFixed(2)} req/s`)
    
    // Performance rating
    const avgTime = (seqTime / conversations.length + rapidTime / 100 + longTime / 500) / 3
    console.log(`\n   Overall Avg Response Time: ${avgTime.toFixed(2)}ms`)
    
    let rating = ''
    if (avgTime < 10) rating = '🚀 EXCELLENT'
    else if (avgTime < 50) rating = '✅ GOOD'
    else if (avgTime < 100) rating = '⚠️  ACCEPTABLE'
    else rating = '❌ NEEDS IMPROVEMENT'
    
    console.log(`   Performance Rating: ${rating}`)
    
    // Cache stats
    const stats = cache.getStats()
    console.log(`\n📈 Cache Performance:`)
    console.log(`   Total Entries: ${stats.totalEntries}`)
    console.log(`   Hit Rate: ${stats.hitRate}`)
    console.log(`   Estimated Savings: ${stats.estimatedSavings}`)
    
    console.log('\n' + '='.repeat(70))
    console.log('\n✅ Stress test completed successfully!')
    
  } catch (err) {
    console.error('❌ Error:', err.message)
    process.exit(1)
  }
}

stressTest()
