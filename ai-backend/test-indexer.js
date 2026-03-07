import indexer from './data-indexer.js'

console.log('🧪 Testing Data Indexer...\n')

await indexer.initialize()

const testQueries = [
  'Who are you?',
  'What is VAANI?',
  'Can complaints be registered in VAANI?',
  'Is call assistance available in VAANI?',
  'Hello'
]

for (const query of testQueries) {
  console.log(`\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`)
  console.log(`📝 Query: "${query}"`)
  
  // Test exact match
  const exactMatch = indexer.findExactMatch(query)
  if (exactMatch) {
    console.log(`✅ EXACT MATCH FOUND:`)
    console.log(`   User: ${exactMatch.user}`)
    console.log(`   Assistant: ${exactMatch.assistant.substring(0, 100)}...`)
  } else {
    console.log(`❌ No exact match`)
  }
  
  // Test similar matches
  const similarMatches = indexer.findSimilar(query, 'english', 3)
  console.log(`\n🔍 Similar matches found: ${similarMatches.length}`)
  
  similarMatches.forEach((match, idx) => {
    console.log(`\n   ${idx + 1}. User: ${match.user}`)
    console.log(`      Assistant: ${match.assistant.substring(0, 80)}...`)
  })
}

console.log('\n✅ Test complete!')
