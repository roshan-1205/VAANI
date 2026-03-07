/**
 * Complete Ayushman Update
 * 1. Update training-dataset.json
 * 2. Run training to update cache
 */

import fs from 'fs/promises'

console.log('🔄 Complete Ayushman Bharat Update\n')
console.log('=' .repeat(70))

const newAnswers = {
  'Ayushman Bharat Yojana kya hai?': 'Ayushman Bharat Yojana (Pradhan Mantri Jan Arogya Yojana - PMJAY) Bharat ki sabse badi health insurance scheme hai jo September 2018 me launch hui thi. Isme eligible families ko har saal 5 lakh rupaye tak ka free medical treatment milta hai. Yeh scheme garib aur middle class families ke liye hai. Isme 1,350+ medical procedures cover hote hain jaise surgery, medicines, diagnostic tests, hospitalization, aur follow-up care. Aap India ke kisi bhi empanelled hospital me cashless treatment le sakte ho. Scheme me 10 crore se zyada families (50 crore+ log) covered hain. Yeh duniya ki sabse badi government funded health scheme hai.',
  
  'What is Ayushman Bharat Yojana?': 'Ayushman Bharat Yojana (Pradhan Mantri Jan Arogya Yojana - PMJAY) is India\'s largest health insurance scheme launched in September 2018. It provides eligible families with free medical treatment up to 5 lakh rupees per year. This scheme is designed for poor and middle class families. It covers 1,350+ medical procedures including surgery, medicines, diagnostic tests, hospitalization, and follow-up care. You can get cashless treatment at any empanelled hospital across India. The scheme covers more than 10 crore families (50+ crore people). It is the world\'s largest government funded health scheme.',
  
  'Ayushman card kaise banwaye?': 'Ayushman card banwane ke liye yeh detailed steps follow karein:\n\n1. ELIGIBILITY CHECK:\n   - Ayushman Bharat website (pmjay.gov.in) par jaayein\n   - Apna mobile number aur Aadhaar/Ration card number enter karein\n   - System batayega ki aap eligible hain ya nahi\n\n2. DOCUMENTS TAYYAR KAREIN:\n   - Aadhaar card (mandatory)\n   - Ration card (if available)\n   - Address proof (bijli bill, rent agreement, etc.)\n   - Family ID proof\n\n3. CSC/HOSPITAL VISIT:\n   - Nearest Common Service Center (CSC) ya empanelled hospital jaayein\n   - Apne documents dikhaayein\n   - Operator aapki details verify karega\n\n4. CARD PRINTING:\n   - Verification ke baad card instantly print ho jayega\n   - Card bilkul FREE hai, koi charge nahi\n   - Card me aapka naam, photo, aur family details hongi\n\n5. ACTIVATION:\n   - Card turant active ho jata hai\n   - Aap kisi bhi empanelled hospital me treatment le sakte hain\n\nHELPLINE: 14555 (toll-free) - Kisi bhi problem ke liye call karein',
  
  'How to make Ayushman card?': 'To make Ayushman card, follow these detailed steps:\n\n1. ELIGIBILITY CHECK:\n   - Visit Ayushman Bharat website (pmjay.gov.in)\n   - Enter your mobile number and Aadhaar/Ration card number\n   - System will tell you if you are eligible\n\n2. PREPARE DOCUMENTS:\n   - Aadhaar card (mandatory)\n   - Ration card (if available)\n   - Address proof (electricity bill, rent agreement, etc.)\n   - Family ID proof\n\n3. VISIT CSC/HOSPITAL:\n   - Go to nearest Common Service Center (CSC) or empanelled hospital\n   - Show your documents\n   - Operator will verify your details\n\n4. CARD PRINTING:\n   - After verification, card will be printed instantly\n   - Card is completely FREE, no charges\n   - Card will have your name, photo, and family details\n\n5. ACTIVATION:\n   - Card gets activated immediately\n   - You can get treatment at any empanelled hospital\n\nHELPLINE: 14555 (toll-free) - Call for any issues',
  
  'Ayushman card ke liye eligible kaun hai?': 'Ayushman Bharat scheme me yeh log eligible hain:\n\n1. SECC 2011 DATA:\n   - Socio-Economic Caste Census 2011 me listed families automatically eligible hain\n\n2. RURAL AREAS CRITERIA:\n   - Kaccha ghar (mud house) me rehne wale\n   - Ghar me koi adult member (16-59 years) nahi\n   - Female headed household (mahila mukhiya)\n   - Disabled member wale families\n   - SC/ST (Scheduled Caste/Tribe) families\n   - Landless laborers (bhoomihin majdoor)\n   - Manual scavengers\n   - Primitive tribal groups\n\n3. URBAN AREAS CRITERIA:\n   - Rag pickers (kachra bechne wale)\n   - Beggars (bhikhari)\n   - Domestic workers (ghar ka kaam karne wale)\n   - Street vendors (rehri wale)\n   - Construction workers (nirman majdoor)\n   - Plumbers, electricians, painters\n   - Transport workers (rickshaw pullers, drivers)\n   - Sweepers, sanitation workers\n\n4. ELIGIBILITY CHECK:\n   - Website: pmjay.gov.in\n   - Toll-free helpline: 14555\n   - Nearest CSC center\n\n5. IMPORTANT:\n   - Agar aapka naam SECC list me hai to aap automatically eligible hain\n   - Income limit nahi hai, SECC criteria se decide hota hai',
  
  'Who is eligible for Ayushman card?': 'Following people are eligible for Ayushman Bharat scheme:\n\n1. SECC 2011 DATA:\n   - Families listed in Socio-Economic Caste Census 2011 are automatically eligible\n\n2. RURAL AREAS CRITERIA:\n   - Living in kaccha house (mud house)\n   - No adult member in household (16-59 years)\n   - Female headed household\n   - Families with disabled member\n   - SC/ST (Scheduled Caste/Tribe) families\n   - Landless laborers\n   - Manual scavengers\n   - Primitive tribal groups\n\n3. URBAN AREAS CRITERIA:\n   - Rag pickers\n   - Beggars\n   - Domestic workers\n   - Street vendors\n   - Construction workers\n   - Plumbers, electricians, painters\n   - Transport workers (rickshaw pullers, drivers)\n   - Sweepers, sanitation workers\n\n4. ELIGIBILITY CHECK:\n   - Website: pmjay.gov.in\n   - Toll-free helpline: 14555\n   - Nearest CSC center\n\n5. IMPORTANT:\n   - If your name is in SECC list, you are automatically eligible\n   - No income limit, decided by SECC criteria',
  
  'Ayushman card के लिए eligible कौन है?': 'Ayushman Bharat योजना में ये लोग eligible हैं:\n\n1. SECC 2011 DATA:\n   - Socio-Economic Caste Census 2011 में listed families automatically eligible हैं\n\n2. RURAL AREAS CRITERIA:\n   - कच्चा घर (mud house) में रहने वाले\n   - घर में कोई adult member (16-59 years) नहीं\n   - Female headed household (महिला मुखिया)\n   - Disabled member वाले families\n   - SC/ST (Scheduled Caste/Tribe) families\n   - Landless laborers (भूमिहीन मजदूर)\n   - Manual scavengers\n   - Primitive tribal groups\n\n3. URBAN AREAS CRITERIA:\n   - Rag pickers (कचरा बेचने वाले)\n   - Beggars (भिखारी)\n   - Domestic workers (घर का काम करने वाले)\n   - Street vendors (रेहड़ी वाले)\n   - Construction workers (निर्माण मजदूर)\n   - Plumbers, electricians, painters\n   - Transport workers (rickshaw pullers, drivers)\n   - Sweepers, sanitation workers\n\n4. ELIGIBILITY CHECK:\n   - Website: pmjay.gov.in\n   - Toll-free helpline: 14555\n   - Nearest CSC center\n\n5. IMPORTANT:\n   - अगर आपका नाम SECC list में है तो आप automatically eligible हैं\n   - Income limit नहीं है, SECC criteria से decide होता है'
}

async function updateDataset() {
  try {
    console.log('\n📂 Step 1: Reading training-dataset.json...\n')
    
    const dataset = JSON.parse(await fs.readFile('./training-dataset.json', 'utf-8'))
    
    console.log(`   Total conversations: ${dataset.training_conversations.length}`)
    
    console.log('\n✏️  Step 2: Updating Ayushman answers...\n')
    
    let updated = 0
    
    for (const conv of dataset.training_conversations) {
      if (newAnswers[conv.user]) {
        console.log(`   ✅ Updating: ${conv.id} - ${conv.user.substring(0, 50)}...`)
        conv.assistant = newAnswers[conv.user]
        updated++
      }
    }
    
    console.log(`\n   Total updated: ${updated}`)
    
    console.log('\n💾 Step 3: Saving training-dataset.json...\n')
    
    await fs.writeFile('./training-dataset.json', JSON.stringify(dataset, null, 2), 'utf-8')
    
    console.log('   ✅ Training dataset saved!')
    
    console.log('\n' + '='.repeat(70))
    console.log('\n✅ Dataset updated successfully!')
    console.log('\n💡 Next step: Run training to update cache')
    console.log('   Command: npm run train-loop')
    
    return true
    
  } catch (err) {
    console.error('❌ Error:', err.message)
    return false
  }
}

updateDataset()
  .then(success => {
    process.exit(success ? 0 : 1)
  })
  .catch(err => {
    console.error('❌ Fatal Error:', err)
    process.exit(1)
  })
