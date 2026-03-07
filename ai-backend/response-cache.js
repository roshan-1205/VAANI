import fs from 'fs/promises'
import path from 'path'
import crypto from 'crypto'

/**
 * Response Cache System
 * Saves common responses to reduce API calls and costs
 */

const CACHE_FILE = './cache/responses.json'
const CACHE_DIR = './cache'

class ResponseCache {
  constructor() {
    this.cache = new Map()
    this.stats = {
      hits: 0,
      misses: 0,
      saved: 0
    }
    this.initialized = false
  }

  async initialize() {
    try {
      // Create cache directory if it doesn't exist
      await fs.mkdir(CACHE_DIR, { recursive: true })
      
      // Load existing cache
      try {
        const data = await fs.readFile(CACHE_FILE, 'utf-8')
        const cacheData = JSON.parse(data)
        this.cache = new Map(Object.entries(cacheData.responses || {}))
        this.stats = cacheData.stats || this.stats
        console.log(`✅ Cache loaded: ${this.cache.size} entries`)
      } catch (err) {
        console.log('📝 Creating new cache file')
      }
      
      this.initialized = true
    } catch (err) {
      console.error('❌ Cache initialization error:', err.message)
    }
  }

  /**
   * Generate cache key from message
   */
  generateKey(message) {
    // Normalize message for exact matching
    const normalized = message
      .toLowerCase()
      .trim()
      .replace(/\s+/g, ' ')
      .replace(/[?!.]/g, '') // Remove punctuation for better matching
    
    // Use MD5 hash of normalized message
    return crypto.createHash('md5').update(normalized).digest('hex')
  }

  /**
   * Check if response exists in cache
   */
  async get(message) {
    if (!this.initialized) await this.initialize()
    
    const key = this.generateKey(message)
    const cached = this.cache.get(key)
    
    if (cached) {
      this.stats.hits++
      cached.lastUsed = Date.now()
      cached.useCount++
      console.log(`💾 Cache HIT: "${message.substring(0, 50)}..."`)
      return cached.response
    }
    
    this.stats.misses++
    console.log(`🔍 Cache MISS: "${message.substring(0, 50)}..."`)
    return null
  }

  /**
   * Save response to cache
   */
  async set(message, response, metadata = {}) {
    if (!this.initialized) await this.initialize()
    
    const key = this.generateKey(message)
    
    this.cache.set(key, {
      message: message,
      response: response,
      metadata: metadata,
      createdAt: Date.now(),
      lastUsed: Date.now(),
      useCount: 1
    })
    
    this.stats.saved++
    
    // Auto-save every 5 new entries for faster persistence
    if (this.stats.saved % 5 === 0) {
      await this.persist()
    }
    
    console.log(`💾 Cached response for: "${message.substring(0, 50)}..."`)
  }

  /**
   * Save cache to disk
   */
  async persist() {
    if (!this.initialized) return
    
    try {
      const cacheData = {
        responses: Object.fromEntries(this.cache),
        stats: this.stats,
        lastUpdated: new Date().toISOString()
      }
      
      await fs.writeFile(CACHE_FILE, JSON.stringify(cacheData, null, 2))
      console.log(`💾 Cache persisted: ${this.cache.size} entries`)
    } catch (err) {
      console.error('❌ Cache persist error:', err.message)
    }
  }

  /**
   * Get cache statistics
   */
  getStats() {
    const hitRate = this.stats.hits + this.stats.misses > 0
      ? ((this.stats.hits / (this.stats.hits + this.stats.misses)) * 100).toFixed(2)
      : 0
    
    return {
      ...this.stats,
      hitRate: `${hitRate}%`,
      totalEntries: this.cache.size,
      estimatedSavings: `${this.stats.hits} API calls saved`
    }
  }

  /**
   * Clear old/unused cache entries
   */
  async cleanup(maxAge = 30 * 24 * 60 * 60 * 1000) { // 30 days default
    if (!this.initialized) await this.initialize()
    
    const now = Date.now()
    let removed = 0
    
    for (const [key, entry] of this.cache.entries()) {
      if (now - entry.lastUsed > maxAge) {
        this.cache.delete(key)
        removed++
      }
    }
    
    if (removed > 0) {
      await this.persist()
      console.log(`🧹 Cleaned ${removed} old cache entries`)
    }
    
    return removed
  }

  /**
   * Find similar cached responses
   */
  async findSimilar(message, threshold = 0.7) {
    if (!this.initialized) await this.initialize()
    
    const words = message.toLowerCase().split(/\s+/)
    const results = []
    
    for (const [key, entry] of this.cache.entries()) {
      const cachedWords = entry.message.toLowerCase().split(/\s+/)
      const commonWords = words.filter(w => cachedWords.includes(w))
      const similarity = commonWords.length / Math.max(words.length, cachedWords.length)
      
      if (similarity >= threshold) {
        results.push({
          similarity,
          message: entry.message,
          response: entry.response,
          useCount: entry.useCount
        })
      }
    }
    
    return results.sort((a, b) => b.similarity - a.similarity)
  }
}

// Singleton instance
const cache = new ResponseCache()

export default cache
