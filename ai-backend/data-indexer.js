/**
 * Data Indexer for Fast Lookups
 * Optimizes training data access for high traffic
 */

import fs from 'fs/promises'

class DataIndexer {
  constructor() {
    this.indexes = {
      byLanguage: new Map(),
      byCategory: new Map(),
      byKeyword: new Map(),
      exactMatch: new Map()
    }
    this.conversations = []
    this.initialized = false
  }

  /**
   * Initialize and build indexes
   */
  async initialize() {
    try {
      console.log('📚 Loading training data...')
      const data = await fs.readFile('./training-dataset.json', 'utf-8')
      const dataset = JSON.parse(data)
      this.conversations = dataset.training_conversations

      console.log('🔨 Building indexes...')
      this.buildIndexes()
      
      this.initialized = true
      console.log(`✅ Indexed ${this.conversations.length} conversations`)
      console.log(`   - Languages: ${this.indexes.byLanguage.size}`)
      console.log(`   - Categories: ${this.indexes.byCategory.size}`)
      console.log(`   - Keywords: ${this.indexes.byKeyword.size}`)
      console.log(`   - Exact matches: ${this.indexes.exactMatch.size}`)
    } catch (err) {
      console.error('❌ Indexer initialization error:', err.message)
      throw err
    }
  }

  /**
   * Build all indexes for fast lookup
   */
  buildIndexes() {
    this.conversations.forEach((conv, idx) => {
      // Index by language
      const language = this.detectLanguageFromCategory(conv.category)
      if (!this.indexes.byLanguage.has(language)) {
        this.indexes.byLanguage.set(language, [])
      }
      this.indexes.byLanguage.get(language).push(idx)

      // Index by category
      if (!this.indexes.byCategory.has(conv.category)) {
        this.indexes.byCategory.set(conv.category, [])
      }
      this.indexes.byCategory.get(conv.category).push(idx)

      // Index by exact match (normalized)
      const normalizedUser = this.normalizeText(conv.user)
      this.indexes.exactMatch.set(normalizedUser, idx)

      // Index by keywords
      const keywords = this.extractKeywords(conv.user)
      keywords.forEach(keyword => {
        if (!this.indexes.byKeyword.has(keyword)) {
          this.indexes.byKeyword.set(keyword, [])
        }
        this.indexes.byKeyword.get(keyword).push(idx)
      })
    })
  }

  /**
   * Detect language from category name
   */
  detectLanguageFromCategory(category) {
    if (category.includes('_english')) return 'english'
    if (category.includes('_hindi')) return 'hindi'
    return 'hinglish'
  }

  /**
   * Normalize text for matching with speech recognition error handling
   */
  normalizeText(text) {
    let normalized = text
      .toLowerCase()
      .trim()
      .replace(/[^\w\s\u0900-\u097F]/g, '') // Keep alphanumeric and Devanagari
      .replace(/\s+/g, ' ')
    
    // Handle common speech recognition errors and variations
    const speechVariations = {
      // Common Hinglish variations
      'kon': 'kaun',
      'koun': 'kaun',
      'kese': 'kaise',
      'kese': 'kaise',
      'kse': 'kaise',
      'nhi': 'nahi',
      'nhi': 'nahin',
      'rha': 'raha',
      'rhi': 'rahi',
      'rhe': 'rahe',
      'gai': 'gayi',
      'gae': 'gaye',
      'tut': 'toot',
      'he': 'hai',
      'hain': 'hai',
      'wani': 'vaani',
      'vani': 'vaani',
      'complain': 'complaint',
      'complen': 'complaint',
      'karna': 'karne',
      'karna': 'kare',
      'banaye': 'banwaye',
      'banae': 'banwaye'
    }
    
    // Replace variations with standard forms
    const words = normalized.split(' ')
    const correctedWords = words.map(word => speechVariations[word] || word)
    normalized = correctedWords.join(' ')
    
    return normalized
  }

  /**
   * Extract keywords from text with better Hindi/Hinglish support
   */
  extractKeywords(text) {
    const normalized = this.normalizeText(text)
    const words = normalized.split(' ')
    
    // Expanded stop words for better filtering
    const stopWords = new Set([
      // English
      'a', 'an', 'the', 'is', 'are', 'was', 'were', 'be', 'been', 'being',
      'have', 'has', 'had', 'do', 'does', 'did', 'will', 'would', 'should',
      'can', 'could', 'may', 'might', 'must', 'shall',
      'i', 'you', 'he', 'she', 'it', 'we', 'they', 'me', 'him', 'her', 'us', 'them',
      'my', 'your', 'his', 'her', 'its', 'our', 'their',
      'this', 'that', 'these', 'those', 'what', 'which', 'who', 'when', 'where', 'why', 'how',
      // Hinglish
      'hai', 'hain', 'ka', 'ki', 'ke', 'ko', 'se', 'me', 'mein', 'par', 'pe', 'aur', 'ya',
      'kya', 'kaise', 'kahan', 'kab', 'kyun', 'kaun', 'main', 'tum', 'aap', 'yeh', 'woh',
      // Hindi (Devanagari)
      'है', 'हैं', 'का', 'की', 'के', 'को', 'से', 'में', 'पर', 'और', 'या',
      'क्या', 'कैसे', 'कहाँ', 'कब', 'क्यों', 'कौन', 'मैं', 'तुम', 'आप', 'यह', 'वह'
    ])
    
    return words.filter(word => word.length > 2 && !stopWords.has(word))
  }
  
  /**
   * Calculate Levenshtein distance for fuzzy matching
   */
  levenshteinDistance(str1, str2) {
    const len1 = str1.length;
    const len2 = str2.length;
    const matrix = [];

    for (let i = 0; i <= len1; i++) {
      matrix[i] = [i];
    }

    for (let j = 0; j <= len2; j++) {
      matrix[0][j] = j;
    }

    for (let i = 1; i <= len1; i++) {
      for (let j = 1; j <= len2; j++) {
        if (str1.charAt(i - 1) === str2.charAt(j - 1)) {
          matrix[i][j] = matrix[i - 1][j - 1];
        } else {
          matrix[i][j] = Math.min(
            matrix[i - 1][j - 1] + 1,
            matrix[i][j - 1] + 1,
            matrix[i - 1][j] + 1
          );
        }
      }
    }

    return matrix[len1][len2];
  }

  /**
   * Calculate similarity score between two texts using multiple methods
   */
  calculateSimilarity(text1, text2) {
    const normalized1 = this.normalizeText(text1)
    const normalized2 = this.normalizeText(text2)
    
    // Exact match gets highest score
    if (normalized1 === normalized2) return 1.0
    
    // Levenshtein distance for fuzzy matching (good for speech recognition errors)
    const maxLen = Math.max(normalized1.length, normalized2.length)
    const distance = this.levenshteinDistance(normalized1, normalized2)
    const levenshteinScore = 1 - (distance / maxLen)
    
    // If very similar by edit distance, give high score
    if (levenshteinScore > 0.85) return levenshteinScore
    
    // Check if one text contains the other (partial match)
    if (normalized1.includes(normalized2) || normalized2.includes(normalized1)) {
      return 0.85 // High score for containment
    }
    
    // If one text is much longer than other, reduce similarity slightly
    const lengthRatio = Math.min(normalized1.length, normalized2.length) / 
                        Math.max(normalized1.length, normalized2.length)
    if (lengthRatio < 0.4) return 0 // Too different in length
    
    const words1 = new Set(this.extractKeywords(text1))
    const words2 = new Set(this.extractKeywords(text2))
    
    if (words1.size === 0 || words2.size === 0) return 0
    
    // Jaccard similarity (keyword overlap)
    const intersection = new Set([...words1].filter(x => words2.has(x)))
    const union = new Set([...words1, ...words2])
    const jaccardScore = intersection.size / union.size
    
    // Must have at least 25% keyword overlap (reduced from 30% for better fuzzy matching)
    if (jaccardScore < 0.25) return 0
    
    // Partial word matching (for typos and variations)
    let partialMatches = 0
    for (const word1 of words1) {
      for (const word2 of words2) {
        if (word1.length > 3 && word2.length > 3) {
          // Check edit distance for similar sounding words
          const wordDistance = this.levenshteinDistance(word1, word2)
          const wordMaxLen = Math.max(word1.length, word2.length)
          const wordSimilarity = 1 - (wordDistance / wordMaxLen)
          
          if (wordSimilarity > 0.7 || word1.includes(word2) || word2.includes(word1)) {
            partialMatches++
            break
          }
        }
      }
    }
    const partialScore = partialMatches / Math.max(words1.size, words2.size)
    
    // Length similarity bonus (similar length questions are more likely to be similar)
    const lengthDiff = Math.abs(normalized1.length - normalized2.length)
    const maxLength = Math.max(normalized1.length, normalized2.length)
    const lengthScore = 1 - (lengthDiff / maxLength)
    
    // Combined score with balanced weighting (including Levenshtein)
    return (jaccardScore * 0.40) + (partialScore * 0.25) + (lengthScore * 0.15) + (levenshteinScore * 0.20)
  }

  /**
   * Find exact match
   */
  findExactMatch(userMessage) {
    if (!this.initialized) return null
    
    const normalized = this.normalizeText(userMessage)
    const idx = this.indexes.exactMatch.get(normalized)
    
    if (idx !== undefined) {
      return this.conversations[idx]
    }
    
    return null
  }

  /**
   * Find by language
   */
  findByLanguage(language, limit = 100) {
    if (!this.initialized) return []
    
    const indexes = this.indexes.byLanguage.get(language) || []
    return indexes.slice(0, limit).map(idx => this.conversations[idx])
  }

  /**
   * Find by category
   */
  findByCategory(category) {
    if (!this.initialized) return []
    
    const indexes = this.indexes.byCategory.get(category) || []
    return indexes.map(idx => this.conversations[idx])
  }

  /**
   * Find similar conversations using improved similarity scoring
   */
  findSimilar(userMessage, language = null, limit = 5) {
    if (!this.initialized) return []
    
    const scores = []
    
    // Get conversations in the target language
    let candidateIndexes = []
    if (language && this.indexes.byLanguage.has(language)) {
      candidateIndexes = this.indexes.byLanguage.get(language)
    } else {
      candidateIndexes = this.conversations.map((_, idx) => idx)
    }
    
    // Calculate similarity score for each candidate
    candidateIndexes.forEach(idx => {
      const conv = this.conversations[idx]
      const similarityScore = this.calculateSimilarity(userMessage, conv.user)
      
      // Lowered threshold from 0.30 to 0.25 for better fuzzy matching (speech recognition errors)
      if (similarityScore > 0.25) {
        scores.push({
          conversation: conv,
          score: similarityScore,
          index: idx
        })
      }
    })
    
    // Sort by score and return top matches with scores
    const results = scores
      .sort((a, b) => b.score - a.score)
      .slice(0, limit)
      .map(item => ({
        ...item.conversation,
        score: item.score
      }))
    
    // Log top match score for debugging
    if (results.length > 0 && scores.length > 0) {
      console.log(`   🎯 Best match score: ${(scores[0].score * 100).toFixed(1)}% for "${scores[0].conversation.user}"`)
    }
    
    return results
  }

  /**
   * Get statistics
   */
  getStats() {
    return {
      totalConversations: this.conversations.length,
      languages: {
        english: this.indexes.byLanguage.get('english')?.length || 0,
        hindi: this.indexes.byLanguage.get('hindi')?.length || 0,
        hinglish: this.indexes.byLanguage.get('hinglish')?.length || 0
      },
      categories: this.indexes.byCategory.size,
      keywords: this.indexes.byKeyword.size,
      exactMatches: this.indexes.exactMatch.size
    }
  }
}

// Singleton instance
const indexer = new DataIndexer()

export default indexer
