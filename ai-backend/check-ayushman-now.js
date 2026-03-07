import fs from 'fs/promises'

const data = JSON.parse(await fs.readFile('./cache/responses.json', 'utf-8'))
const ayushman = Object.entries(data.responses).filter(([k,v]) => 
  v.message.toLowerCase().includes('ayushman')
)

console.log('Total Ayushman entries:', ayushman.length)
console.log()

ayushman.forEach(([key, entry], i) => {
  console.log(`${i+1}. ${entry.message}`)
  console.log(`   Key: ${key}`)
  console.log(`   Length: ${entry.response.length} chars`)
  console.log(`   Response: ${entry.response.substring(0, 100)}...`)
  console.log()
})
