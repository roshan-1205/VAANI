/**
 * Advanced Testing with Variations
 * Tests with typos, speech recognition errors, and variations
 */

import fs from 'fs/promises'
import indexer from './data-indexer.js'
import cache from './response-cache.js'

class AdvancedTester {
  constructor() {
    this.dataset = null
    this.results = {
      exact: { total: 0, passed: 0, failed: 0 },
      variations: { total: 0, passed: 0, failed: 0 },
      fuzzy: { total: 0, passed: 0, failed: 0 },
      overall: { total: 0, passed: 0, failed: 0 },
      details: []
    }
  }

  /**
   * Initialize systems
   */
  async initialize() {
    console.log('🚀 Initializing advanced testing system...\n')
    
    // Load dataset
    const data = await fs.readFile('./training-dataset.json', 'utf-8')
    this.dataset = JSON.parse(data)
    
    // Initialize indexer and cache
    await indexer.initialize()
    await cache.initialize()
    
    console.log('✅ Systems initialized\n')
  }

  /**
   * Generate variations of a question
   */
  generateVariations(text) {
    const variations = []
    
    // Original
    variations.push({ text, type: 'exact' })
    
    // Common speech recognition errors
    const speechErrors = {
      'kaun': 'kon',
      'kaise': 'kese',
      'nahi': 'nhi',
      'raha': 'rha',
      'rahi': 'rhi',
      'gayi': 'gai',
      'vaani': 'wani',
      'complaint': 'complen',
      'karna': 'karne',
      'banaye': 'banae'
    }
    
    let variated = text
    for (const [correct, error] of Object.entries(speechErrors)) {
      if (text.toLowerCase().includes(correct)) {
        variated = text.toLowerCase().replace(correct, error)
        variations.push({ text: variated, type: 'speech_error' })
        break
      }
    }
    
    // Case variations
    variations.push({ text: text.toUpperCase(), type: 'uppercase' })
    variations.push({ text: text.toLowerCase(), type: 'lowercase' })
    
    // Extra spaces
    variations.push({ text: text.replace(/\s+/g, '  '), type: 'extra_spaces' })
    
    // Missing punctuation
    variations.push({ text: text.replace(/[?!.]/g, ''), type: 'no_punctuation' })
    
    return variations
  }

  /**
   * Test a single question with variations
   */
  async testQuestion(conv) {
    const variations = this.generateVariations(conv.user)
    const language = this.detectLanguage(conv.user)
    
    for (const variation of variations) {
      this.results.overall.total++
      
      // Try cache first
      let response = await cache.get(variation.text)
      
      // Try fuzzy matching
      if (!response) {
        const similar = indexer.findSimilar(variation.text, language, 1)
        if (similar.length > 0 && similar[0].score > 0.7) {
          response = similar[0].assistant
        }
      }
      
      const passed = response === conv.assistant
      
      // Update results by type
      if (variation.type === 'exact') {
        this.results.exact.total++
        if (passed) this.results.exact.passed++
        else this.results.exact.failed++
      } else if (variation.type.includes('speech') || variation.type.includes('case')) {
        this.results.variations.total++
        if (passed) this.results.variations.passed++
        else this.results.variations.failed++
      } else {
        this.results.fuzzy.total++
        if (passed) this.results.fuzzy.passed++
        else this.results.fuzzy.failed++
      }
      
      // Update overall
      if (passed) {
        this.results.overall.passed++
      } else {
        this.results.overall.failed++
        this.results.details.push({
          id: conv.id,
          category: conv.category,
          original: conv.user,
          variation: variation.text,
          variationType: variation.type,
          expected: conv.assistant.substring(0, 100),
          got: response ? response.substring(0, 100) : 'NO RESPONSE'
        })
      }
    }
  }

  /**
   * Detect language
   */
  detectLanguage(text) {
    const hindiPattern = /[\u0900-\u097F]/
    const englishPattern = /^[a-zA-Z\s\?\!\.]+$/
    
    if (hindiPattern.test(text)) return 'hindi'
    if (englishPattern.test(text)) return 'english'
    return 'hinglish'
  }

  /**
   * Run all tests
   */
  async runTests() {
    console.log('🧪 Starting advanced testing...\n')
    
    let tested = 0
    const total = this.dataset.training_conversations.length
    
    for (const conv of this.dataset.training_conversations) {
      await this.testQuestion(conv)
      tested++
      
      if (tested % 10 === 0) {
        const accuracy = ((this.results.overall.passed / this.results.overall.total) * 100).toFixed(1)
        console.log(`   Testing: ${tested}/${total} - Overall Accuracy: ${accuracy}%`)
      }
    }
    
    console.log('\n✅ Testing complete\n')
  }

  /**
   * Display results
   */
  displayResults() {
    console.log('═══════════════════════════════════════════════════════')
    console.log('            ADVANCED TESTING RESULTS                   ')
    console.log('═══════════════════════════════════════════════════════\n')
    
    // Exact matches
    const exactAccuracy = ((this.results.exact.passed / this.results.exact.total) * 100).toFixed(2)
    console.log('📊 EXACT MATCHES:')
    console.log(`   Total: ${this.results.exact.total}`)
    console.log(`   Passed: ${this.results.exact.passed} ✅`)
    console.log(`   Failed: ${this.results.exact.failed} ❌`)
    console.log(`   Accuracy: ${exactAccuracy}%\n`)
    
    // Variations
    const variationsAccuracy = ((this.results.variations.passed / this.results.variations.total) * 100).toFixed(2)
    console.log('📊 VARIATIONS (Speech Errors, Case):')
    console.log(`   Total: ${this.results.variations.total}`)
    console.log(`   Passed: ${this.results.variations.passed} ✅`)
    console.log(`   Failed: ${this.results.variations.failed} ❌`)
    console.log(`   Accuracy: ${variationsAccuracy}%\n`)
    
    // Fuzzy matches
    const fuzzyAccuracy = ((this.results.fuzzy.passed / this.results.fuzzy.total) * 100).toFixed(2)
    console.log('📊 FUZZY MATCHES (Spaces, Punctuation):')
    console.log(`   Total: ${this.results.fuzzy.total}`)
    console.log(`   Passed: ${this.results.fuzzy.passed} ✅`)
    console.log(`   Failed: ${this.results.fuzzy.failed} ❌`)
    console.log(`   Accuracy: ${fuzzyAccuracy}%\n`)
    
    // Overall
    const overallAccuracy = ((this.results.overall.passed / this.results.overall.total) * 100).toFixed(2)
    console.log('📊 OVERALL:')
    console.log(`   Total Tests: ${this.results.overall.total}`)
    console.log(`   Passed: ${this.results.overall.passed} ✅`)
    console.log(`   Failed: ${this.results.overall.failed} ❌`)
    console.log(`   Accuracy: ${overallAccuracy}%`)
    console.log('═══════════════════════════════════════════════════════\n')
    
    // Failed tests summary
    if (this.results.details.length > 0) {
      console.log(`❌ FAILED TESTS: ${this.results.details.length}\n`)
      console.log('Top 10 failures:')
      this.results.details.slice(0, 10).forEach((detail, idx) => {
        console.log(`${idx + 1}. [${detail.variationType}] ${detail.variation}`)
        console.log(`   Expected: ${detail.expected}...`)
        console.log(`   Got: ${detail.got}...\n`)
      })
    }
  }

  /**
   * Save results
   */
  async saveResults() {
    const report = {
      timestamp: new Date().toISOString(),
      summary: {
        exact: {
          ...this.results.exact,
          accuracy: ((this.results.exact.passed / this.results.exact.total) * 100).toFixed(2) + '%'
        },
        variations: {
          ...this.results.variations,
          accuracy: ((this.results.variations.passed / this.results.variations.total) * 100).toFixed(2) + '%'
        },
        fuzzy: {
          ...this.results.fuzzy,
          accuracy: ((this.results.fuzzy.passed / this.results.fuzzy.total) * 100).toFixed(2) + '%'
        },
        overall: {
          ...this.results.overall,
          accuracy: ((this.results.overall.passed / this.results.overall.total) * 100).toFixed(2) + '%'
        }
      },
      failedTests: this.results.details
    }
    
    await fs.writeFile(
      './ADVANCED-TEST-REPORT.json',
      JSON.stringify(report, null, 2)
    )
    
    console.log('💾 Report saved to ADVANCED-TEST-REPORT.json\n')
  }

  /**
   * Run complete test suite
   */
  async run() {
    try {
      console.log('\n')
      console.log('╔═══════════════════════════════════════════════════════╗')
      console.log('║        VAANI ADVANCED TESTING SYSTEM                  ║')
      console.log('║    Testing with Variations & Edge Cases               ║')
      console.log('╚═══════════════════════════════════════════════════════╝')
      console.log('\n')
      
      await this.initialize()
      await this.runTests()
      this.displayResults()
      await this.saveResults()
      
      const overallAccuracy = ((this.results.overall.passed / this.results.overall.total) * 100).toFixed(2)
      
      if (overallAccuracy >= 95) {
        console.log('🎉 EXCELLENT! System handles variations very well!')
      } else if (overallAccuracy >= 85) {
        console.log('✅ GOOD! System handles most variations!')
      } else {
        console.log('⚠️  WARNING! System needs improvement for variations!')
      }
      
      console.log('\n')
      
    } catch (error) {
      console.error('❌ Error:', error.message)
      console.error(error.stack)
      process.exit(1)
    }
  }
}

// Run the tester
const tester = new AdvancedTester()
tester.run()
