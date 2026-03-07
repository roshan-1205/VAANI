/**
 * Test Real Questions
 * Tests the system with actual user questions
 */

import cache from './response-cache.js'
import indexer from './data-indexer.js'

async function testQuestion(question, expectedCategory = null) {
  console.log(`\n${'='.repeat(70)}`)
  console.log(`Q: "${question}"`)
  console.log('='.repeat(70))
  
  // Try cache first
  let response = await cache.get(question)
  let source = 'CACHE'
  
  // If not in cache, try fuzzy matching
  if (!response) {
    const language = detectLanguage(question)
    const similar = indexer.findSimilar(question, language, 3)
    
    if (similar.length > 0) {
      console.log(`\n🔍 Similar matches found:`)
      similar.forEach((match, idx) => {
        console.log(`   ${idx + 1}. [${(match.score * 100).toFixed(1)}%] "${match.user}"`)
      })
      
      // Use best match if score > 0.70 (lowered threshold)
      if (similar[0].score > 0.70) {
        response = similar[0].assistant
        source = `FUZZY (${(similar[0].score * 100).toFixed(1)}%)`
        console.log(`\n✅ Using fuzzy match with ${(similar[0].score * 100).toFixed(1)}% confidence`)
      } else {
        console.log(`\n⚠️  Best match score ${(similar[0].score * 100).toFixed(1)}% is below threshold (70%)`)
      }
    } else {
      console.log(`\n🔍 No similar matches found`)
    }
  }
  
  if (response) {
    console.log(`\n✅ Answer (${source}):`)
    console.log(`"${response}"`)
    if (expectedCategory) {
      console.log(`\nCategory: ${expectedCategory}`)
    }
  } else {
    console.log(`\n❌ NO ANSWER FOUND`)
  }
}

function detectLanguage(text) {
  const hindiPattern = /[\u0900-\u097F]/
  const englishPattern = /^[a-zA-Z\s\?\!\.]+$/
  
  if (hindiPattern.test(text)) return 'hindi'
  if (englishPattern.test(text)) return 'english'
  return 'hinglish'
}

async function runTests() {
  console.log('\n')
  console.log('╔═══════════════════════════════════════════════════════╗')
  console.log('║          REAL QUESTION TESTING                        ║')
  console.log('╚═══════════════════════════════════════════════════════╝')
  console.log('\n')
  
  // Initialize systems
  await cache.initialize()
  await indexer.initialize()
  
  console.log('✅ Systems initialized\n')
  
  // Test exact matches
  console.log('\n📊 TESTING EXACT MATCHES:\n')
  
  await testQuestion('Tum kaun ho?', 'introduction')
  await testQuestion('Who are you?', 'introduction_english')
  await testQuestion('Vaani kya hai?', 'platform_help')
  await testQuestion('Complaint kaise kare?', 'complaint_filing')
  await testQuestion('Ayushman Bharat Yojana kya hai?', 'ayushman_yojana')
  
  // Test variations
  console.log('\n\n📊 TESTING VARIATIONS:\n')
  
  await testQuestion('tum kaun ho', 'introduction') // lowercase, no punctuation
  await testQuestion('WHO ARE YOU', 'introduction_english') // uppercase
  await testQuestion('vaani kya hai', 'platform_help') // lowercase
  await testQuestion('complaint kaise kare', 'complaint_filing') // no punctuation
  
  // Test similar questions
  console.log('\n\n📊 TESTING SIMILAR QUESTIONS:\n')
  
  await testQuestion('Aap kaun ho?', 'introduction') // formal version
  await testQuestion('Apka naam kya hai?', 'introduction') // asking name
  await testQuestion('Sadak toot gayi hai', 'road_pothole') // road issue
  await testQuestion('Pani nahi aa raha', 'water_supply') // water issue
  
  // Test government schemes
  console.log('\n\n📊 TESTING GOVERNMENT SCHEMES:\n')
  
  await testQuestion('Ayushman card kaise banwaye?', 'ayushman_card')
  await testQuestion('PM Awas Yojana me apply kaise kare?', 'pm_awas_yojana')
  await testQuestion('Ration card kaise banwaye?', 'ration_card')
  await testQuestion('Ujjwala Yojana kya hai?', 'ujjwala_yojana')
  
  // Test civic issues
  console.log('\n\n📊 TESTING CIVIC ISSUES:\n')
  
  await testQuestion('Sadak me gadda hai', 'road_pothole')
  await testQuestion('Bijli nahi aa rahi', 'electricity')
  await testQuestion('Kachra nahi utha rahe', 'garbage')
  await testQuestion('Street light kharab hai', 'streetlight')
  
  // Cache statistics
  console.log('\n\n📊 CACHE STATISTICS:\n')
  const stats = cache.getStats()
  console.log(`Total Entries: ${stats.totalEntries}`)
  console.log(`Cache Hits: ${stats.hits}`)
  console.log(`Cache Misses: ${stats.misses}`)
  console.log(`Hit Rate: ${stats.hitRate}`)
  
  console.log('\n✅ Testing complete!\n')
}

runTests().catch(console.error)
