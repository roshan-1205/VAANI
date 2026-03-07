/**
 * Retrain Ayushman Bharat Questions
 * Pehle purane entries remove karo, phir naye train karo
 */

import cache from './response-cache.js'
import { detectLanguage } from './language-detector.js'

console.log('🔄 Retraining Ayushman Bharat Questions\n')
console.log('=' .repeat(70))

const questionsToRemove = [
  'Ayushman Bharat Yojana kya hai?',
  'What is Ayushman Bharat Yojana?',
  'Ayushman card kaise banwaye?',
  'How to make Ayushman card?',
  'Ayushman card ke liye eligible kaun hai?',
  'Who is eligible for Ayushman card?',
  'Ayushman card के लिए eligible कौन है?'
]

const newTrainingData = [
  {
    id: 'ayushman_new_001',
    question: 'Ayushman Bharat Yojana kya hai?',
    answer: 'Ayushman Bharat Yojana (Pradhan Mantri Jan Arogya Yojana - PMJAY) Bharat ki sabse badi health insurance scheme hai jo September 2018 me launch hui thi. Isme eligible families ko har saal 5 lakh rupaye tak ka free medical treatment milta hai. Yeh scheme garib aur middle class families ke liye hai. Isme 1,350+ medical procedures cover hote hain jaise surgery, medicines, diagnostic tests, hospitalization, aur follow-up care. Aap India ke kisi bhi empanelled hospital me cashless treatment le sakte ho. Scheme me 10 crore se zyada families (50 crore+ log) covered hain. Yeh duniya ki sabse badi government funded health scheme hai.',
    language: 'hinglish',
    category: 'ayushman_info'
  },
  {
    id: 'ayushman_new_002',
    question: 'What is Ayushman Bharat Yojana?',
    answer: 'Ayushman Bharat Yojana (Pradhan Mantri Jan Arogya Yojana - PMJAY) is India\'s largest health insurance scheme launched in September 2018. It provides eligible families with free medical treatment up to 5 lakh rupees per year. This scheme is designed for poor and middle class families. It covers 1,350+ medical procedures including surgery, medicines, diagnostic tests, hospitalization, and follow-up care. You can get cashless treatment at any empanelled hospital across India. The scheme covers more than 10 crore families (50+ crore people). It is the world\'s largest government funded health scheme.',
    language: 'english',
    category: 'ayushman_info'
  },
  {
    id: 'ayushman_new_003',
    question: 'Ayushman card kaise banwaye?',
    answer: 'Ayushman card banwane ke liye yeh detailed steps follow karein:\n\n1. ELIGIBILITY CHECK:\n   - Ayushman Bharat website (pmjay.gov.in) par jaayein\n   - Apna mobile number aur Aadhaar/Ration card number enter karein\n   - System batayega ki aap eligible hain ya nahi\n\n2. DOCUMENTS TAYYAR KAREIN:\n   - Aadhaar card (mandatory)\n   - Ration card (if available)\n   - Address proof (bijli bill, rent agreement, etc.)\n   - Family ID proof\n\n3. CSC/HOSPITAL VISIT:\n   - Nearest Common Service Center (CSC) ya empanelled hospital jaayein\n   - Apne documents dikhaayein\n   - Operator aapki details verify karega\n\n4. CARD PRINTING:\n   - Verification ke baad card instantly print ho jayega\n   - Card bilkul FREE hai, koi charge nahi\n   - Card me aapka naam, photo, aur family details hongi\n\n5. ACTIVATION:\n   - Card turant active ho jata hai\n   - Aap kisi bhi empanelled hospital me treatment le sakte hain\n\nHELPLINE: 14555 (toll-free) - Kisi bhi problem ke liye call karein',
    language: 'hinglish',
    category: 'ayushman_card'
  },
  {
    id: 'ayushman_new_004',
    question: 'How to make Ayushman card?',
    answer: 'To make Ayushman card, follow these detailed steps:\n\n1. ELIGIBILITY CHECK:\n   - Visit Ayushman Bharat website (pmjay.gov.in)\n   - Enter your mobile number and Aadhaar/Ration card number\n   - System will tell you if you are eligible\n\n2. PREPARE DOCUMENTS:\n   - Aadhaar card (mandatory)\n   - Ration card (if available)\n   - Address proof (electricity bill, rent agreement, etc.)\n   - Family ID proof\n\n3. VISIT CSC/HOSPITAL:\n   - Go to nearest Common Service Center (CSC) or empanelled hospital\n   - Show your documents\n   - Operator will verify your details\n\n4. CARD PRINTING:\n   - After verification, card will be printed instantly\n   - Card is completely FREE, no charges\n   - Card will have your name, photo, and family details\n\n5. ACTIVATION:\n   - Card gets activated immediately\n   - You can get treatment at any empanelled hospital\n\nHELPLINE: 14555 (toll-free) - Call for any issues',
    language: 'english',
    category: 'ayushman_card'
  },
  {
    id: 'ayushman_new_005',
    question: 'Ayushman card ke liye eligible kaun hai?',
    answer: 'Ayushman Bharat scheme me yeh log eligible hain:\n\n1. SECC 2011 DATA:\n   - Socio-Economic Caste Census 2011 me listed families automatically eligible hain\n\n2. RURAL AREAS CRITERIA:\n   - Kaccha ghar (mud house) me rehne wale\n   - Ghar me koi adult member (16-59 years) nahi\n   - Female headed household (mahila mukhiya)\n   - Disabled member wale families\n   - SC/ST (Scheduled Caste/Tribe) families\n   - Landless laborers (bhoomihin majdoor)\n   - Manual scavengers\n   - Primitive tribal groups\n\n3. URBAN AREAS CRITERIA:\n   - Rag pickers (kachra bechne wale)\n   - Beggars (bhikhari)\n   - Domestic workers (ghar ka kaam karne wale)\n   - Street vendors (rehri wale)\n   - Construction workers (nirman majdoor)\n   - Plumbers, electricians, painters\n   - Transport workers (rickshaw pullers, drivers)\n   - Sweepers, sanitation workers\n\n4. ELIGIBILITY CHECK:\n   - Website: pmjay.gov.in\n   - Toll-free helpline: 14555\n   - Nearest CSC center\n\n5. IMPORTANT:\n   - Agar aapka naam SECC list me hai to aap automatically eligible hain\n   - Income limit nahi hai, SECC criteria se decide hota hai',
    language: 'hinglish',
    category: 'ayushman_eligibility'
  },
  {
    id: 'ayushman_new_006',
    question: 'Who is eligible for Ayushman card?',
    answer: 'Following people are eligible for Ayushman Bharat scheme:\n\n1. SECC 2011 DATA:\n   - Families listed in Socio-Economic Caste Census 2011 are automatically eligible\n\n2. RURAL AREAS CRITERIA:\n   - Living in kaccha house (mud house)\n   - No adult member in household (16-59 years)\n   - Female headed household\n   - Families with disabled member\n   - SC/ST (Scheduled Caste/Tribe) families\n   - Landless laborers\n   - Manual scavengers\n   - Primitive tribal groups\n\n3. URBAN AREAS CRITERIA:\n   - Rag pickers\n   - Beggars\n   - Domestic workers\n   - Street vendors\n   - Construction workers\n   - Plumbers, electricians, painters\n   - Transport workers (rickshaw pullers, drivers)\n   - Sweepers, sanitation workers\n\n4. ELIGIBILITY CHECK:\n   - Website: pmjay.gov.in\n   - Toll-free helpline: 14555\n   - Nearest CSC center\n\n5. IMPORTANT:\n   - If your name is in SECC list, you are automatically eligible\n   - No income limit, decided by SECC criteria',
    language: 'english',
    category: 'ayushman_eligibility'
  },
  {
    id: 'ayushman_new_007',
    question: 'Ayushman card के लिए eligible कौन है?',
    answer: 'Ayushman Bharat योजना में ये लोग eligible हैं:\n\n1. SECC 2011 DATA:\n   - Socio-Economic Caste Census 2011 में listed families automatically eligible हैं\n\n2. RURAL AREAS CRITERIA:\n   - कच्चा घर (mud house) में रहने वाले\n   - घर में कोई adult member (16-59 years) नहीं\n   - Female headed household (महिला मुखिया)\n   - Disabled member वाले families\n   - SC/ST (Scheduled Caste/Tribe) families\n   - Landless laborers (भूमिहीन मजदूर)\n   - Manual scavengers\n   - Primitive tribal groups\n\n3. URBAN AREAS CRITERIA:\n   - Rag pickers (कचरा बेचने वाले)\n   - Beggars (भिखारी)\n   - Domestic workers (घर का काम करने वाले)\n   - Street vendors (रेहड़ी वाले)\n   - Construction workers (निर्माण मजदूर)\n   - Plumbers, electricians, painters\n   - Transport workers (rickshaw pullers, drivers)\n   - Sweepers, sanitation workers\n\n4. ELIGIBILITY CHECK:\n   - Website: pmjay.gov.in\n   - Toll-free helpline: 14555\n   - Nearest CSC center\n\n5. IMPORTANT:\n   - अगर आपका नाम SECC list में है तो आप automatically eligible हैं\n   - Income limit नहीं है, SECC criteria से decide होता है',
    language: 'hindi',
    category: 'ayushman_eligibility'
  }
]

async function retrainAyushman() {
  try {
    console.log('\n📚 Step 1: Initializing cache...\n')
    await cache.initialize()
    
    const initialSize = cache.cache.size
    console.log(`   Initial cache size: ${initialSize} entries\n`)
    
    // Step 1: Remove old entries
    console.log('🗑️  Step 2: Removing old Ayushman entries...\n')
    
    let removed = 0
    for (const question of questionsToRemove) {
      const existed = cache.cache.has(question)
      if (existed) {
        cache.cache.delete(question)
        removed++
        console.log(`   ❌ Removed: "${question.substring(0, 50)}..."`)
      } else {
        console.log(`   ⚠️  Not found: "${question.substring(0, 50)}..."`)
      }
    }
    
    await cache.persist()
    console.log(`\n   Total removed: ${removed} entries`)
    console.log(`   Cache size after removal: ${cache.cache.size} entries\n`)
    
    // Step 2: Train new entries
    console.log('=' .repeat(70))
    console.log('\n✨ Step 3: Training new Ayushman entries...\n')
    
    let trained = 0
    for (const item of newTrainingData) {
      const language = detectLanguage(item.question)
      
      await cache.set(item.question, item.answer, {
        source: 'training_ayushman_retrained',
        language: language,
        category: item.category,
        id: item.id
      })
      
      trained++
      console.log(`   ✅ [${item.id}] ${item.question.substring(0, 50)}...`)
      console.log(`      Language: ${language} | Answer: ${item.answer.length} chars\n`)
    }
    
    await cache.persist()
    
    console.log('=' .repeat(70))
    console.log(`\n📊 Summary:`)
    console.log(`   Old entries removed: ${removed}`)
    console.log(`   New entries trained: ${trained}`)
    console.log(`   Final cache size: ${cache.cache.size} entries\n`)
    
    // Step 3: Verify all new entries
    console.log('=' .repeat(70))
    console.log('\n🧪 Step 4: Verifying new entries...\n')
    
    let passed = 0
    let failed = 0
    
    for (const item of newTrainingData) {
      const cached = await cache.get(item.question)
      
      if (cached && cached === item.answer) {
        passed++
        console.log(`   ✅ ${item.id}: VERIFIED`)
      } else {
        failed++
        console.log(`   ❌ ${item.id}: FAILED`)
      }
    }
    
    console.log('\n' + '='.repeat(70))
    console.log('\n📊 Verification Results:')
    console.log(`   Total: ${newTrainingData.length}`)
    console.log(`   Passed: ${passed}`)
    console.log(`   Failed: ${failed}`)
    console.log(`   Accuracy: ${((passed/newTrainingData.length)*100).toFixed(2)}%`)
    
    if (passed === newTrainingData.length) {
      console.log('\n🎉 SUCCESS! All Ayushman questions retrained and verified!')
      console.log('✅ Cache updated with new detailed answers')
    } else {
      console.log('\n⚠️  Some entries failed verification')
    }
    
    console.log('\n' + '='.repeat(70))
    
    return passed === newTrainingData.length
    
  } catch (err) {
    console.error('❌ Error:', err.message)
    console.error(err.stack)
    return false
  }
}

retrainAyushman()
  .then(success => {
    if (success) {
      console.log('\n✅ Retraining completed successfully!')
      process.exit(0)
    } else {
      console.log('\n⚠️  Retraining completed with errors')
      process.exit(1)
    }
  })
  .catch(err => {
    console.error('\n❌ Fatal Error:', err)
    process.exit(1)
  })
