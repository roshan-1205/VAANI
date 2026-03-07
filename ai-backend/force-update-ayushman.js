/**
 * Force Update Ayushman Answers in Cache
 * Directly cache file ko update karo
 */

import fs from 'fs/promises'
import crypto from 'crypto'

console.log('🔧 Force Updating Ayushman Answers in Cache\n')
console.log('=' .repeat(70))

// Generate hash for cache key (same as response-cache.js)
function generateHash(message) {
  const normalized = message.toLowerCase().trim().replace(/\s+/g, ' ')
  return crypto.createHash('md5').update(normalized).digest('hex')
}

const ayushmanData = [
  {
    question: 'Ayushman Bharat Yojana kya hai?',
    language: 'hinglish',
    answer: 'Ayushman Bharat Yojana (Pradhan Mantri Jan Arogya Yojana - PMJAY) Bharat ki sabse badi health insurance scheme hai jo September 2018 me launch hui thi. Isme eligible families ko har saal 5 lakh rupaye tak ka free medical treatment milta hai. Yeh scheme garib aur middle class families ke liye hai. Isme 1,350+ medical procedures cover hote hain jaise surgery, medicines, diagnostic tests, hospitalization, aur follow-up care. Aap India ke kisi bhi empanelled hospital me cashless treatment le sakte ho. Scheme me 10 crore se zyada families (50 crore+ log) covered hain. Yeh duniya ki sabse badi government funded health scheme hai.'
  },
  {
    question: 'What is Ayushman Bharat Yojana?',
    language: 'english',
    answer: 'Ayushman Bharat Yojana (Pradhan Mantri Jan Arogya Yojana - PMJAY) is India\'s largest health insurance scheme launched in September 2018. It provides eligible families with free medical treatment up to 5 lakh rupees per year. This scheme is designed for poor and middle class families. It covers 1,350+ medical procedures including surgery, medicines, diagnostic tests, hospitalization, and follow-up care. You can get cashless treatment at any empanelled hospital across India. The scheme covers more than 10 crore families (50+ crore people). It is the world\'s largest government funded health scheme.'
  },
  {
    question: 'Ayushman card kaise banwaye?',
    language: 'hinglish',
    answer: 'Ayushman card banwane ke liye yeh detailed steps follow karein:\n\n1. ELIGIBILITY CHECK:\n   - Ayushman Bharat website (pmjay.gov.in) par jaayein\n   - Apna mobile number aur Aadhaar/Ration card number enter karein\n   - System batayega ki aap eligible hain ya nahi\n\n2. DOCUMENTS TAYYAR KAREIN:\n   - Aadhaar card (mandatory)\n   - Ration card (if available)\n   - Address proof (bijli bill, rent agreement, etc.)\n   - Family ID proof\n\n3. CSC/HOSPITAL VISIT:\n   - Nearest Common Service Center (CSC) ya empanelled hospital jaayein\n   - Apne documents dikhaayein\n   - Operator aapki details verify karega\n\n4. CARD PRINTING:\n   - Verification ke baad card instantly print ho jayega\n   - Card bilkul FREE hai, koi charge nahi\n   - Card me aapka naam, photo, aur family details hongi\n\n5. ACTIVATION:\n   - Card turant active ho jata hai\n   - Aap kisi bhi empanelled hospital me treatment le sakte hain\n\nHELPLINE: 14555 (toll-free) - Kisi bhi problem ke liye call karein'
  },
  {
    question: 'How to make Ayushman card?',
    language: 'english',
    answer: 'To make Ayushman card, follow these detailed steps:\n\n1. ELIGIBILITY CHECK:\n   - Visit Ayushman Bharat website (pmjay.gov.in)\n   - Enter your mobile number and Aadhaar/Ration card number\n   - System will tell you if you are eligible\n\n2. PREPARE DOCUMENTS:\n   - Aadhaar card (mandatory)\n   - Ration card (if available)\n   - Address proof (electricity bill, rent agreement, etc.)\n   - Family ID proof\n\n3. VISIT CSC/HOSPITAL:\n   - Go to nearest Common Service Center (CSC) or empanelled hospital\n   - Show your documents\n   - Operator will verify your details\n\n4. CARD PRINTING:\n   - After verification, card will be printed instantly\n   - Card is completely FREE, no charges\n   - Card will have your name, photo, and family details\n\n5. ACTIVATION:\n   - Card gets activated immediately\n   - You can get treatment at any empanelled hospital\n\nHELPLINE: 14555 (toll-free) - Call for any issues'
  },
  {
    question: 'Ayushman card ke liye eligible kaun hai?',
    language: 'english',
    answer: 'Ayushman Bharat scheme me yeh log eligible hain:\n\n1. SECC 2011 DATA:\n   - Socio-Economic Caste Census 2011 me listed families automatically eligible hain\n\n2. RURAL AREAS CRITERIA:\n   - Kaccha ghar (mud house) me rehne wale\n   - Ghar me koi adult member (16-59 years) nahi\n   - Female headed household (mahila mukhiya)\n   - Disabled member wale families\n   - SC/ST (Scheduled Caste/Tribe) families\n   - Landless laborers (bhoomihin majdoor)\n   - Manual scavengers\n   - Primitive tribal groups\n\n3. URBAN AREAS CRITERIA:\n   - Rag pickers (kachra bechne wale)\n   - Beggars (bhikhari)\n   - Domestic workers (ghar ka kaam karne wale)\n   - Street vendors (rehri wale)\n   - Construction workers (nirman majdoor)\n   - Plumbers, electricians, painters\n   - Transport workers (rickshaw pullers, drivers)\n   - Sweepers, sanitation workers\n\n4. ELIGIBILITY CHECK:\n   - Website: pmjay.gov.in\n   - Toll-free helpline: 14555\n   - Nearest CSC center\n\n5. IMPORTANT:\n   - Agar aapka naam SECC list me hai to aap automatically eligible hain\n   - Income limit nahi hai, SECC criteria se decide hota hai'
  },
  {
    question: 'Who is eligible for Ayushman card?',
    language: 'english',
    answer: 'Following people are eligible for Ayushman Bharat scheme:\n\n1. SECC 2011 DATA:\n   - Families listed in Socio-Economic Caste Census 2011 are automatically eligible\n\n2. RURAL AREAS CRITERIA:\n   - Living in kaccha house (mud house)\n   - No adult member in household (16-59 years)\n   - Female headed household\n   - Families with disabled member\n   - SC/ST (Scheduled Caste/Tribe) families\n   - Landless laborers\n   - Manual scavengers\n   - Primitive tribal groups\n\n3. URBAN AREAS CRITERIA:\n   - Rag pickers\n   - Beggars\n   - Domestic workers\n   - Street vendors\n   - Construction workers\n   - Plumbers, electricians, painters\n   - Transport workers (rickshaw pullers, drivers)\n   - Sweepers, sanitation workers\n\n4. ELIGIBILITY CHECK:\n   - Website: pmjay.gov.in\n   - Toll-free helpline: 14555\n   - Nearest CSC center\n\n5. IMPORTANT:\n   - If your name is in SECC list, you are automatically eligible\n   - No income limit, decided by SECC criteria'
  },
  {
    question: 'Ayushman card के लिए eligible कौन है?',
    language: 'hindi',
    answer: 'Ayushman Bharat योजना में ये लोग eligible हैं:\n\n1. SECC 2011 DATA:\n   - Socio-Economic Caste Census 2011 में listed families automatically eligible हैं\n\n2. RURAL AREAS CRITERIA:\n   - कच्चा घर (mud house) में रहने वाले\n   - घर में कोई adult member (16-59 years) नहीं\n   - Female headed household (महिला मुखिया)\n   - Disabled member वाले families\n   - SC/ST (Scheduled Caste/Tribe) families\n   - Landless laborers (भूमिहीन मजदूर)\n   - Manual scavengers\n   - Primitive tribal groups\n\n3. URBAN AREAS CRITERIA:\n   - Rag pickers (कचरा बेचने वाले)\n   - Beggars (भिखारी)\n   - Domestic workers (घर का काम करने वाले)\n   - Street vendors (रेहड़ी वाले)\n   - Construction workers (निर्माण मजदूर)\n   - Plumbers, electricians, painters\n   - Transport workers (rickshaw pullers, drivers)\n   - Sweepers, sanitation workers\n\n4. ELIGIBILITY CHECK:\n   - Website: pmjay.gov.in\n   - Toll-free helpline: 14555\n   - Nearest CSC center\n\n5. IMPORTANT:\n   - अगर आपका नाम SECC list में है तो आप automatically eligible हैं\n   - Income limit नहीं है, SECC criteria से decide होता है'
  }
]

async function forceUpdateCache() {
  try {
    console.log('\n📂 Step 1: Reading cache file...\n')
    
    const cacheData = JSON.parse(await fs.readFile('./cache/responses.json', 'utf-8'))
    const initialCount = Object.keys(cacheData.responses).length
    console.log(`   Current cache entries: ${initialCount}`)
    
    console.log('\n🗑️  Step 2: Removing old Ayushman entries...\n')
    
    let removed = 0
    for (const item of ayushmanData) {
      const key = generateHash(`${item.language}:${item.question}`)
      if (cacheData.responses[key]) {
        delete cacheData.responses[key]
        removed++
        console.log(`   ❌ Removed: ${item.question.substring(0, 50)}...`)
      }
    }
    
    console.log(`\n   Total removed: ${removed}`)
    
    console.log('\n✨ Step 3: Adding new Ayushman entries...\n')
    
    let added = 0
    const timestamp = Date.now()
    
    for (const item of ayushmanData) {
      const key = generateHash(`${item.language}:${item.question}`)
      
      cacheData.responses[key] = {
        message: `${item.language}:${item.question}`,
        response: item.answer,
        metadata: {
          source: 'training_ayushman_force_updated',
          language: item.language,
          category: 'ayushman_bharat'
        },
        createdAt: timestamp,
        lastUsed: timestamp,
        useCount: 1
      }
      
      added++
      console.log(`   ✅ Added: ${item.question.substring(0, 50)}...`)
      console.log(`      Answer length: ${item.answer.length} chars\n`)
    }
    
    console.log('=' .repeat(70))
    console.log(`\n📊 Summary:`)
    console.log(`   Initial entries: ${initialCount}`)
    console.log(`   Removed: ${removed}`)
    console.log(`   Added: ${added}`)
    console.log(`   Final entries: ${Object.keys(cacheData.responses).length}`)
    
    console.log('\n💾 Step 4: Saving cache file...\n')
    
    await fs.writeFile('./cache/responses.json', JSON.stringify(cacheData, null, 2), 'utf-8')
    
    console.log('   ✅ Cache file saved successfully!')
    
    console.log('\n🧪 Step 5: Verifying updates...\n')
    
    // Re-read to verify
    const verifyData = JSON.parse(await fs.readFile('./cache/responses.json', 'utf-8'))
    
    let verified = 0
    for (const item of ayushmanData) {
      const key = generateHash(`${item.language}:${item.question}`)
      if (verifyData.responses[key] && verifyData.responses[key].response === item.answer) {
        verified++
        console.log(`   ✅ Verified: ${item.question.substring(0, 50)}...`)
      } else {
        console.log(`   ❌ Failed: ${item.question.substring(0, 50)}...`)
      }
    }
    
    console.log('\n' + '='.repeat(70))
    console.log(`\n📊 Verification Results:`)
    console.log(`   Total: ${ayushmanData.length}`)
    console.log(`   Verified: ${verified}`)
    console.log(`   Accuracy: ${((verified/ayushmanData.length)*100).toFixed(2)}%`)
    
    if (verified === ayushmanData.length) {
      console.log('\n🎉 SUCCESS! All Ayushman answers force updated in cache!')
      console.log('✅ Cache file directly modified and saved')
    }
    
    console.log('\n' + '='.repeat(70))
    
    return verified === ayushmanData.length
    
  } catch (err) {
    console.error('❌ Error:', err.message)
    console.error(err.stack)
    return false
  }
}

forceUpdateCache()
  .then(success => {
    if (success) {
      console.log('\n✅ Force update completed successfully!')
      console.log('💡 Restart your server to use new answers')
      process.exit(0)
    } else {
      console.log('\n⚠️  Force update completed with errors')
      process.exit(1)
    }
  })
  .catch(err => {
    console.error('\n❌ Fatal Error:', err)
    process.exit(1)
  })
