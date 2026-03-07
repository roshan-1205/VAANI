import fs from 'fs/promises'

async function exportCacheReadable() {
  console.log('📂 Exporting cache to readable format...\n')
  
  const cacheData = JSON.parse(await fs.readFile('./cache/responses.json', 'utf-8'))
  const responses = cacheData.responses
  
  let output = '# VAANI CACHE - ALL ENTRIES\n\n'
  output += `Total Entries: ${Object.keys(responses).length}\n`
  output += `Last Updated: ${cacheData.lastUpdated}\n`
  output += `File Size: ${(JSON.stringify(cacheData).length / 1024).toFixed(2)} KB\n\n`
  output += '='.repeat(100) + '\n\n'
  
  // Sort by creation date
  const entries = Object.entries(responses).sort((a, b) => a[1].createdAt - b[1].createdAt)
  
  entries.forEach(([key, entry], index) => {
    output += `ENTRY ${index + 1}/${entries.length}\n`
    output += `${'='.repeat(100)}\n\n`
    output += `KEY: ${key}\n`
    output += `MESSAGE: ${entry.message}\n`
    output += `LANGUAGE: ${entry.metadata?.language || 'unknown'}\n`
    output += `SOURCE: ${entry.metadata?.source || 'unknown'}\n`
    output += `CREATED: ${new Date(entry.createdAt).toLocaleString()}\n`
    output += `LAST USED: ${new Date(entry.lastUsed).toLocaleString()}\n`
    output += `USE COUNT: ${entry.useCount}\n`
    output += `RESPONSE LENGTH: ${entry.response.length} characters\n\n`
    output += `RESPONSE:\n`
    output += `${'-'.repeat(100)}\n`
    output += `${entry.response}\n`
    output += `${'-'.repeat(100)}\n\n\n`
  })
  
  // Save to file
  await fs.writeFile('./cache/CACHE-READABLE.txt', output)
  
  console.log('✅ Exported to: cache/CACHE-READABLE.txt')
  console.log(`   Total entries: ${entries.length}`)
  console.log(`   File size: ${(output.length / 1024).toFixed(2)} KB`)
  
  // Also create a summary
  let summary = '# CACHE SUMMARY\n\n'
  summary += `Total Entries: ${entries.length}\n\n`
  
  // Group by language
  const byLanguage = {}
  entries.forEach(([key, entry]) => {
    const lang = entry.metadata?.language || 'unknown'
    byLanguage[lang] = (byLanguage[lang] || 0) + 1
  })
  
  summary += '## By Language:\n'
  Object.entries(byLanguage).sort((a, b) => b[1] - a[1]).forEach(([lang, count]) => {
    summary += `- ${lang}: ${count} entries\n`
  })
  
  summary += '\n## Ayushman Entries:\n'
  const ayushmanEntries = entries.filter(([k, v]) => v.message.toLowerCase().includes('ayushman'))
  ayushmanEntries.forEach(([key, entry], i) => {
    summary += `\n${i + 1}. ${entry.message}\n`
    summary += `   Key: ${key}\n`
    summary += `   Length: ${entry.response.length} chars\n`
    summary += `   Use count: ${entry.useCount}\n`
  })
  
  await fs.writeFile('./cache/CACHE-SUMMARY.txt', summary)
  console.log('✅ Summary saved to: cache/CACHE-SUMMARY.txt')
  
  // Create JSON with better formatting
  const prettyJson = JSON.stringify(cacheData, null, 2)
  await fs.writeFile('./cache/responses-formatted.json', prettyJson)
  console.log('✅ Formatted JSON saved to: cache/responses-formatted.json')
  
  console.log('\n📊 Files created:')
  console.log('   1. cache/CACHE-READABLE.txt - Human readable format')
  console.log('   2. cache/CACHE-SUMMARY.txt - Quick summary')
  console.log('   3. cache/responses-formatted.json - Formatted JSON')
}

exportCacheReadable().catch(console.error)
