/**
 * Strict Training System
 * Ensures exact question-answer mapping with NO cross-contamination
 */

import fs from 'fs/promises'
import crypto from 'crypto'

class StrictTrainer {
  constructor() {
    this.dataset = null
    this.cache = new Map()
    this.exactMatches = new Map()
    this.results = {
      total: 0,
      passed: 0,
      failed: 0,
      details: []
    }
  }

  /**
   * Generate strict cache key - exact normalized match only
   */
  generateKey(message) {
    return message
      .toLowerCase()
      .trim()
      .replace(/\s+/g, ' ')
      .replace(/[?!.]/g, '')
  }

  /**
   * Load and train dataset
   */
  async loadAndTrain() {
    console.log('📚 Loading training dataset...\n')
    
    const data = await fs.readFile('./training-dataset.json', 'utf-8')
    this.dataset = JSON.parse(data)
    
    console.log(`✅ Loaded ${this.dataset.training_conversations.length} conversations\n`)
    console.log('🎓 Training with STRICT matching...\n')
    
    let trained = 0
    const duplicates = []
    
    for (const conv of this.dataset.training_conversations) {
      const key = this.generateKey(conv.user)
      
      // Check for duplicates
      if (this.exactMatches.has(key)) {
        duplicates.push({
          question: conv.user,
          existing: this.exactMatches.get(key),
          new: conv.assistant
        })
      }
      
      // Store exact mapping
      this.exactMatches.set(key, {
        question: conv.user,
        answer: conv.assistant,
        category: conv.category,
        id: conv.id
      })
      
      trained++
      
      if (trained % 20 === 0) {
        console.log(`   📝 Trained: ${trained}/${this.dataset.training_conversations.length}`)
      }
    }
    
    console.log(`\n✅ Training complete: ${trained} conversations\n`)
    
    if (duplicates.length > 0) {
      console.log(`⚠️  Found ${duplicates.length} duplicate questions:\n`)
      duplicates.forEach((dup, idx) => {
        console.log(`${idx + 1}. "${dup.question}"`)
      })
      console.log('')
    }
    
    // Save to cache file
    await this.saveCache()
  }

  /**
   * Save cache to file
   */
  async saveCache() {
    const cacheData = {
      responses: {},
      stats: {
        total: this.exactMatches.size,
        created: new Date().toISOString()
      },
      lastUpdated: new Date().toISOString()
    }
    
    // Convert Map to object
    for (const [key, value] of this.exactMatches.entries()) {
      const hash = crypto.createHash('md5').update(key).digest('hex')
      cacheData.responses[hash] = {
        message: value.question,
        response: value.answer,
        metadata: {
          category: value.category,
          id: value.id
        },
        createdAt: Date.now(),
        lastUsed: Date.now(),
        useCount: 1
      }
    }
    
    await fs.mkdir('./cache', { recursive: true })
    await fs.writeFile('./cache/responses.json', JSON.stringify(cacheData, null, 2))
    
    console.log('💾 Cache saved to cache/responses.json\n')
  }

  /**
   * Test all conversations
   */
  async test() {
    console.log('🧪 Testing with STRICT matching...\n')
    
    this.results.total = this.dataset.training_conversations.length
    let tested = 0
    
    for (const conv of this.dataset.training_conversations) {
      const key = this.generateKey(conv.user)
      const cached = this.exactMatches.get(key)
      
      tested++
      
      if (cached && cached.answer === conv.assistant) {
        this.results.passed++
        console.log(`✅ [${tested}/${this.results.total}] "${conv.user.substring(0, 50)}..."`)
      } else {
        this.results.failed++
        this.results.details.push({
          id: conv.id,
          question: conv.user,
          expected: conv.assistant,
          got: cached ? cached.answer : 'NOT FOUND'
        })
        console.log(`❌ [${tested}/${this.results.total}] "${conv.user.substring(0, 50)}..."`)
      }
    }
    
    console.log('\n✅ Testing complete\n')
  }

  /**
   * Display results
   */
  displayResults() {
    const accuracy = ((this.results.passed / this.results.total) * 100).toFixed(2)
    
    console.log('═══════════════════════════════════════════════════════')
    console.log('            STRICT TRAINING RESULTS                    ')
    console.log('═══════════════════════════════════════════════════════')
    console.log(`Total: ${this.results.total}`)
    console.log(`Passed: ${this.results.passed} ✅`)
    console.log(`Failed: ${this.results.failed} ❌`)
    console.log(`Accuracy: ${accuracy}%`)
    console.log('═══════════════════════════════════════════════════════\n')
    
    if (this.results.failed > 0) {
      console.log('❌ FAILED TESTS:\n')
      this.results.details.forEach((detail, idx) => {
        console.log(`${idx + 1}. [${detail.id}]`)
        console.log(`   Q: ${detail.question}`)
        console.log(`   Expected: ${detail.expected.substring(0, 80)}...`)
        console.log(`   Got: ${detail.got.substring(0, 80)}...`)
        console.log('')
      })
    }
  }

  /**
   * Save report
   */
  async saveReport() {
    const report = {
      timestamp: new Date().toISOString(),
      method: 'STRICT_MATCHING',
      summary: {
        total: this.results.total,
        passed: this.results.passed,
        failed: this.results.failed,
        accuracy: ((this.results.passed / this.results.total) * 100).toFixed(2) + '%'
      },
      failedTests: this.results.details,
      cacheSize: this.exactMatches.size
    }
    
    await fs.writeFile(
      './STRICT-TRAINING-REPORT.json',
      JSON.stringify(report, null, 2)
    )
    
    console.log('💾 Report saved to STRICT-TRAINING-REPORT.json\n')
  }

  /**
   * Run complete training and testing
   */
  async run() {
    try {
      console.log('\n')
      console.log('╔═══════════════════════════════════════════════════════╗')
      console.log('║        VAANI STRICT TRAINING SYSTEM                   ║')
      console.log('║     Exact Question-Answer Mapping Only                ║')
      console.log('╚═══════════════════════════════════════════════════════╝')
      console.log('\n')
      
      await this.loadAndTrain()
      await this.test()
      this.displayResults()
      await this.saveReport()
      
      const accuracy = ((this.results.passed / this.results.total) * 100).toFixed(2)
      
      if (accuracy >= 100) {
        console.log('🎉 PERFECT! 100% Accuracy achieved!')
      } else if (accuracy >= 95) {
        console.log('✅ EXCELLENT! Near perfect accuracy!')
      } else {
        console.log('⚠️  WARNING! Review failed tests!')
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
const trainer = new StrictTrainer()
trainer.run()
