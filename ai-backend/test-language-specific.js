/**
 * Test specific language detection issues
 */

import { detectLanguage } from './language-detector.js'

const testCases = [
  'Ayushman card kaise banwaye?',
  'PM Awas Yojana me apply kaise kare?',
  'Ration card kaise banwaye?',
  'tum kon ho',
  'wani kya hai',
  'complain kese kare',
  'Sarkari scheme kaise pata kare?',
  'sarkari yojana kaise pata kare'
]

console.log('🧪 Testing Language Detection for Specific Queries\n')

testCases.forEach(query => {
  const detected = detectLanguage(query)
  console.log(`Query: "${query}"`)
  console.log(`Detected: ${detected}`)
  console.log()
})
