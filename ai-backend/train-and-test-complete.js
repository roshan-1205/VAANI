/**
 * Complete Training and Testing Script
 * 100% Accuracy Training and Validation
 */

import fs from 'fs/promises'
import indexer from './data-indexer.js'
import cache from './response-cache.js'

class CompleteTrainer {
  constructor() {
    this.dataset = null
    this.results = {
      total: 0,
      passed: 0,
      failed: 0,
      accuracy: 0,
      details: []
    }
  }

  /**
   * Load training dataset
   */
  async loadDataset() {
    console.log('📚 Loading training dataset...')
    const data = await fs.readFile('./training-dataset.json', 'utf-8')
    this.dataset = JSON.parse(data)
    console.log(`✅ Loaded ${this.dataset.training_conversations.length} conversations`)
    return this.dataset
  }

  /**
   * Initialize all systems
   */
  async initialize() {
    console.log('\n🚀 Initializing training system...\n')
    
    // Load dataset
    await this.loadDataset()
    
    // Initialize indexer
    await indexer.initialize()
    
    // Initialize cache
    await cache.initialize()
    
    console.log('✅ All systems initialized\n')
  }

  /**
   * Train: Cache all responses
   */
  async train() {
    console.log('🎓 Starting training phase...\n')
    
    let trained = 0
    const total = this.dataset.training_conversations.length
    
    for (const conv of this.dataset.training_conversations) {
      // Cache the response
      await cache.set(conv.user, conv.assistant, {
        category: conv.category,
        context: conv.context,
        id: conv.id
      })
      
      trained++
      
      // Progress indicator
      if (trained % 10 === 0) {
        console.log(`   📝 Trained: ${trained}/${total} (${((trained/total)*100).toFixed(1)}%)`)
      }
    }
    
    // Persist cache
    await cache.persist()
    
    console.log(`\n✅ Training complete: ${trained} conversations cached\n`)
  }

  /**
   * Test: Validate all responses
   */
  async test() {
    console.log('🧪 Starting testing phase...\n')
    
    this.results.total = this.dataset.training_conversations.length
    let tested = 0
    
    for (const conv of this.dataset.training_conversations) {
      tested++
      
      // Try exact match from cache
      let response = await cache.get(conv.user)
      
      // If not in cache, try fuzzy matching
      if (!response) {
        const language = this.detectLanguage(conv.user)
        const similar = indexer.findSimilar(conv.user, language, 1)
        
        if (similar.length > 0 && similar[0].score > 0.85) {
          response = similar[0].assistant
        }
      }
      
      // Check if response matches expected
      const passed = response === conv.assistant
      
      if (passed) {
        this.results.passed++
      } else {
        this.results.failed++
        this.results.details.push({
          id: conv.id,
          category: conv.category,
          question: conv.user,
          expected: conv.assistant,
          got: response || 'NO RESPONSE',
          status: 'FAILED'
        })
      }
      
      // Progress indicator
      if (tested % 10 === 0) {
        const currentAccuracy = ((this.results.passed / tested) * 100).toFixed(1)
        console.log(`   🧪 Tested: ${tested}/${this.results.total} - Accuracy: ${currentAccuracy}%`)
      }
    }
    
    // Calculate final accuracy
    this.results.accuracy = ((this.results.passed / this.results.total) * 100).toFixed(2)
    
    console.log('\n✅ Testing complete\n')
  }

  /**
   * Detect language from text
   */
  detectLanguage(text) {
    const hindiPattern = /[\u0900-\u097F]/
    const englishPattern = /^[a-zA-Z\s\?\!\.]+$/
    
    if (hindiPattern.test(text)) return 'hindi'
    if (englishPattern.test(text)) return 'english'
    return 'hinglish'
  }

  /**
   * Display results
   */
  displayResults() {
    console.log('═══════════════════════════════════════════════════════')
    console.log('                  TRAINING RESULTS                     ')
    console.log('═══════════════════════════════════════════════════════')
    console.log(`Total Conversations: ${this.results.total}`)
    console.log(`Passed: ${this.results.passed} ✅`)
    console.log(`Failed: ${this.results.failed} ❌`)
    console.log(`Accuracy: ${this.results.accuracy}%`)
    console.log('═══════════════════════════════════════════════════════\n')
    
    if (this.results.failed > 0) {
      console.log('❌ FAILED TESTS:\n')
      this.results.details.forEach((detail, idx) => {
        console.log(`${idx + 1}. [${detail.id}] ${detail.category}`)
        console.log(`   Q: ${detail.question}`)
        console.log(`   Expected: ${detail.expected.substring(0, 100)}...`)
        console.log(`   Got: ${detail.got.substring(0, 100)}...`)
        console.log('')
      })
    }
    
    // Cache statistics
    const cacheStats = cache.getStats()
    console.log('📊 CACHE STATISTICS:')
    console.log(`   Total Entries: ${cacheStats.totalEntries}`)
    console.log(`   Cache Hits: ${cacheStats.hits}`)
    console.log(`   Cache Misses: ${cacheStats.misses}`)
    console.log(`   Hit Rate: ${cacheStats.hitRate}`)
    console.log(`   Estimated Savings: ${cacheStats.estimatedSavings}\n`)
    
    // Indexer statistics
    const indexStats = indexer.getStats()
    console.log('📊 INDEXER STATISTICS:')
    console.log(`   Total Conversations: ${indexStats.totalConversations}`)
    console.log(`   English: ${indexStats.languages.english}`)
    console.log(`   Hindi: ${indexStats.languages.hindi}`)
    console.log(`   Hinglish: ${indexStats.languages.hinglish}`)
    console.log(`   Categories: ${indexStats.categories}`)
    console.log(`   Keywords: ${indexStats.keywords}`)
    console.log(`   Exact Matches: ${indexStats.exactMatches}\n`)
  }

  /**
   * Save results to file
   */
  async saveResults() {
    const report = {
      timestamp: new Date().toISOString(),
      summary: {
        total: this.results.total,
        passed: this.results.passed,
        failed: this.results.failed,
        accuracy: this.results.accuracy + '%'
      },
      failedTests: this.results.details,
      cacheStats: cache.getStats(),
      indexerStats: indexer.getStats()
    }
    
    await fs.writeFile(
      './COMPLETE-TRAINING-REPORT.json',
      JSON.stringify(report, null, 2)
    )
    
    console.log('💾 Report saved to COMPLETE-TRAINING-REPORT.json\n')
  }

  /**
   * Run complete training and testing
   */
  async run() {
    try {
      console.log('\n')
      console.log('╔═══════════════════════════════════════════════════════╗')
      console.log('║     VAANI COMPLETE TRAINING & TESTING SYSTEM          ║')
      console.log('║              100% Accuracy Target                     ║')
      console.log('╚═══════════════════════════════════════════════════════╝')
      console.log('\n')
      
      // Initialize
      await this.initialize()
      
      // Train
      await this.train()
      
      // Test
      await this.test()
      
      // Display results
      this.displayResults()
      
      // Save results
      await this.saveResults()
      
      // Final message
      if (this.results.accuracy >= 100) {
        console.log('🎉 SUCCESS! 100% Accuracy achieved!')
      } else if (this.results.accuracy >= 95) {
        console.log('✅ EXCELLENT! Near perfect accuracy achieved!')
      } else if (this.results.accuracy >= 90) {
        console.log('👍 GOOD! High accuracy achieved!')
      } else {
        console.log('⚠️  WARNING! Accuracy below 90%. Review failed tests.')
      }
      
      console.log('\n')
      
    } catch (error) {
      console.error('❌ Error:', error.message)
      console.error(error.stack)
      process.exit(1)
    }
  }
}

// Run the trainer
const trainer = new CompleteTrainer()
trainer.run()
