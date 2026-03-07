/**
 * Test Hindi Questions Specifically
 * Tests all Hindi language questions from the dataset
 */

import fs from 'fs/promises'
import cache from './response-cache.js'
import indexer from './data-indexer.js'

async function testHindiQuestion(question, expectedAnswer, id) {
  // Try cache first
  let response = await cache.get(question)
  let source = 'CACHE'
  
  // If not in cache, try fuzzy matching
  if (!response) {
    const similar = indexer.findSimilar(question, 'hindi', 1)
    
    if (similar.length > 0 && similar[0].score > 0.70) {
      response = similar[0].assistant
      source = `FUZZY (${(similar[0].score * 100).toFixed(1)}%)`
    }
  }
  
  const passed = response === expectedAnswer
  const status = passed ? '✅' : '❌'
  
  console.log(`${status} [${id}] "${question.substring(0, 60)}..."`)
  if (!passed) {
    console.log(`   Expected: ${expectedAnswer.substring(0, 80)}...`)
    console.log(`   Got: ${response ? response.substring(0, 80) : 'NO RESPONSE'}...`)
    console.log('')
  }
  
  return passed
}

async function runTests() {
  console.log('\n')
  console.log('╔═══════════════════════════════════════════════════════╗')
  console.log('║          HINDI QUESTIONS TESTING                      ║')
  console.log('╚═══════════════════════════════════════════════════════╝')
  console.log('\n')
  
  // Initialize systems
  await cache.initialize()
  await indexer.initialize()
  
  console.log('✅ Systems initialized\n')
  console.log('🧪 Testing Hindi questions...\n')
  
  // Load dataset
  const data = await fs.readFile('./training-dataset.json', 'utf-8')
  const dataset = JSON.parse(data)
  
  // Filter Hindi questions
  const hindiQuestions = dataset.training_conversations.filter(conv => {
    const hasHindiScript = /[\u0900-\u097F]/.test(conv.user)
    const isHindiCategory = conv.category.includes('_hindi')
    return hasHindiScript || isHindiCategory
  })
  
  console.log(`Found ${hindiQuestions.length} Hindi questions\n`)
  
  let passed = 0
  let failed = 0
  
  for (const conv of hindiQuestions) {
    const result = await testHindiQuestion(conv.user, conv.assistant, conv.id)
    if (result) passed++
    else failed++
  }
  
  const total = passed + failed
  const accuracy = ((passed / total) * 100).toFixed(2)
  
  console.log('\n═══════════════════════════════════════════════════════')
  console.log('              HINDI TESTING RESULTS                    ')
  console.log('═══════════════════════════════════════════════════════')
  console.log(`Total Hindi Questions: ${total}`)
  console.log(`Passed: ${passed} ✅`)
  console.log(`Failed: ${failed} ❌`)
  console.log(`Accuracy: ${accuracy}%`)
  console.log('═══════════════════════════════════════════════════════\n')
  
  // Cache statistics
  const stats = cache.getStats()
  console.log('📊 CACHE STATISTICS:')
  console.log(`   Total Entries: ${stats.totalEntries}`)
  console.log(`   Cache Hits: ${stats.hits}`)
  console.log(`   Cache Misses: ${stats.misses}`)
  console.log(`   Hit Rate: ${stats.hitRate}\n`)
  
  if (accuracy >= 100) {
    console.log('🎉 PERFECT! 100% accuracy on Hindi questions!')
  } else if (accuracy >= 95) {
    console.log('✅ EXCELLENT! Near perfect accuracy on Hindi questions!')
  } else {
    console.log('⚠️  WARNING! Some Hindi questions need attention!')
  }
  
  console.log('\n')
}

runTests().catch(console.error)
