/**
 * Train Ayushman Bharat Specific Questions
 * Detailed answers ke saath train karo aur cache me save karo
 */

import cache from './response-cache.js'
import { detectLanguage } from './language-detector.js'

console.log('🏥 Training Ayushman Bharat Questions\n')
console.log('=' .repeat(70))

const ayushmanQuestions = [
  {
    id: 'ayushman_001',
    question: 'Ayushman Bharat Yojana kya hai?',
    answer: 'Ayushman Bharat Yojana (Pradhan Mantri Jan Arogya Yojana) ek government health insurance scheme hai jo September 2018 me launch hui thi. Isme eligible families ko har saal 5 lakh rupaye tak ka free medical treatment milta hai. Yeh scheme garib aur middle class families ke liye hai. Isme 1,350+ procedures cover hote hain jaise surgery, medicines, diagnostic tests, aur hospitalization. Aap kisi bhi empanelled hospital me treatment le sakte ho. Scheme me 10 crore se zyada families covered hain.',
    language: 'hinglish',
    category: 'ayushman_info'
  },
  {
    id: 'ayushman_002',
    question: 'What is Ayushman Bharat Yojana?',
    answer: 'Ayushman Bharat Yojana (Pradhan Mantri Jan Arogya Yojana) is a government health insurance scheme launched in September 2018. It provides eligible families with free medical treatment up to 5 lakh rupees per year. This scheme is for poor and middle class families. It covers 1,350+ procedures including surgery, medicines, diagnostic tests, and hospitalization. You can get treatment at any empanelled hospital. The scheme covers more than 10 crore families.',
    language: 'english',
    category: 'ayushman_info'
  },
  {
    id: 'ayushman_003',
    question: 'Ayushman card kaise banwaye?',
    answer: 'Ayushman card banwane ke liye yeh steps follow karein:\n1. Sabse pehle apni eligibility check karein - Ayushman Bharat website (pmjay.gov.in) par jakar apna mobile number aur Aadhaar/Ration card number enter karein\n2. Agar aap eligible hain to nearest Common Service Center (CSC) ya empanelled hospital jaayein\n3. Apne documents le jaayein - Aadhaar card, Ration card, aur address proof\n4. CSC operator aapka card instantly print kar dega\n5. Card bilkul free hai, koi charge nahi lagta\n6. Card milne ke baad aap kisi bhi empanelled hospital me treatment le sakte hain',
    language: 'hinglish',
    category: 'ayushman_card'
  },
  {
    id: 'ayushman_004',
    question: 'How to make Ayushman card?',
    answer: 'To make Ayushman card, follow these steps:\n1. First check your eligibility - Visit Ayushman Bharat website (pmjay.gov.in) and enter your mobile number and Aadhaar/Ration card number\n2. If you are eligible, visit nearest Common Service Center (CSC) or empanelled hospital\n3. Take your documents - Aadhaar card, Ration card, and address proof\n4. CSC operator will print your card instantly\n5. Card is completely free, no charges\n6. After getting card, you can get treatment at any empanelled hospital',
    language: 'english',
    category: 'ayushman_card'
  },
  {
    id: 'ayushman_005',
    question: 'Ayushman card ke liye eligible kaun hai?',
    answer: 'Ayushman Bharat scheme me yeh log eligible hain:\n1. SECC 2011 (Socio-Economic Caste Census) data me listed families\n2. Garib aur deprived families jo specific criteria meet karte hain\n3. Rural areas me: Kaccha ghar, no adult member (16-59 years), female headed household, disabled member, SC/ST families, landless laborers\n4. Urban areas me: Rag pickers, beggars, domestic workers, street vendors, construction workers, etc.\n5. Eligibility check karne ke liye pmjay.gov.in par jaayein ya toll-free number 14555 par call karein\n6. Agar aapka naam SECC list me hai to aap automatically eligible hain',
    language: 'hinglish',
    category: 'ayushman_eligibility'
  },
  {
    id: 'ayushman_006',
    question: 'Who is eligible for Ayushman card?',
    answer: 'Following people are eligible for Ayushman Bharat scheme:\n1. Families listed in SECC 2011 (Socio-Economic Caste Census) data\n2. Poor and deprived families meeting specific criteria\n3. In rural areas: Kaccha house, no adult member (16-59 years), female headed household, disabled member, SC/ST families, landless laborers\n4. In urban areas: Rag pickers, beggars, domestic workers, street vendors, construction workers, etc.\n5. To check eligibility, visit pmjay.gov.in or call toll-free number 14555\n6. If your name is in SECC list, you are automatically eligible',
    language: 'english',
    category: 'ayushman_eligibility'
  },
  {
    id: 'ayushman_007',
    question: 'Ayushman card के लिए eligible कौन है?',
    answer: 'Ayushman Bharat योजना में ये लोग eligible हैं:\n1. SECC 2011 (Socio-Economic Caste Census) data में listed families\n2. गरीब और deprived families जो specific criteria meet करते हैं\n3. Rural areas में: कच्चा घर, no adult member (16-59 years), female headed household, disabled member, SC/ST families, landless laborers\n4. Urban areas में: Rag pickers, beggars, domestic workers, street vendors, construction workers, etc.\n5. Eligibility check करने के लिए pmjay.gov.in पर जाएं या toll-free number 14555 पर call करें\n6. अगर आपका नाम SECC list में है तो आप automatically eligible हैं',
    language: 'hindi',
    category: 'ayushman_eligibility'
  }
]

async function trainAyushmanQuestions() {
  try {
    console.log('\n📚 Initializing cache...\n')
    await cache.initialize()
    
    console.log(`📊 Training ${ayushmanQuestions.length} Ayushman Bharat questions\n`)
    
    let trained = 0
    
    for (const item of ayushmanQuestions) {
      const language = detectLanguage(item.question)
      
      // Save to cache
      await cache.set(item.question, item.answer, {
        source: 'training_ayushman_detailed',
        language: language,
        category: item.category,
        id: item.id
      })
      
      trained++
      console.log(`✅ [${item.id}] ${item.question.substring(0, 50)}...`)
      console.log(`   Language: ${language}`)
      console.log(`   Answer length: ${item.answer.length} chars`)
      console.log('')
    }
    
    // Force save to disk
    await cache.persist()
    
    console.log('=' .repeat(70))
    console.log(`\n✅ Training Complete!`)
    console.log(`   Questions trained: ${trained}`)
    console.log(`   Total cache entries: ${cache.cache.size}`)
    console.log('')
    
    // Test all questions
    console.log('🧪 Testing trained questions...\n')
    
    let passed = 0
    let failed = 0
    
    for (const item of ayushmanQuestions) {
      const cached = await cache.get(item.question)
      
      if (cached && cached === item.answer) {
        passed++
        console.log(`✅ ${item.id}: PASS`)
      } else {
        failed++
        console.log(`❌ ${item.id}: FAIL`)
      }
    }
    
    console.log('\n' + '='.repeat(70))
    console.log('\n📊 Test Results:')
    console.log(`   Total: ${ayushmanQuestions.length}`)
    console.log(`   Passed: ${passed}`)
    console.log(`   Failed: ${failed}`)
    console.log(`   Accuracy: ${((passed/ayushmanQuestions.length)*100).toFixed(2)}%`)
    
    if (passed === ayushmanQuestions.length) {
      console.log('\n🎉 All Ayushman Bharat questions trained and cached successfully!')
    }
    
    console.log('\n' + '='.repeat(70))
    
    return passed === ayushmanQuestions.length
    
  } catch (err) {
    console.error('❌ Error:', err.message)
    return false
  }
}

trainAyushmanQuestions()
  .then(success => {
    if (success) {
      console.log('\n✅ Training successful - Cache updated!')
      process.exit(0)
    } else {
      console.log('\n⚠️  Training completed with errors')
      process.exit(1)
    }
  })
  .catch(err => {
    console.error('\n❌ Fatal Error:', err)
    process.exit(1)
  })
