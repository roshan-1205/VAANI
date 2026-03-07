import cache from './response-cache.js';

await cache.initialize();

const stats = cache.getStats();

console.log('\n📊 Cache Statistics\n');
console.log('======================================');
console.log(`Total Entries: ${stats.totalEntries}`);
console.log(`Cache Hits: ${stats.hits}`);
console.log(`Cache Misses: ${stats.misses}`);
console.log(`Hit Rate: ${stats.hitRate}`);
console.log(`Estimated Savings: ${stats.estimatedSavings}`);
console.log('======================================\n');

// Show some cached entries
console.log('📝 Sample Cached Entries:\n');
let count = 0;
for (const [key, entry] of cache.cache.entries()) {
  if (count < 5) {
    console.log(`${count + 1}. "${entry.message}"`);
    console.log(`   Response: ${entry.response.substring(0, 60)}...`);
    console.log(`   Use Count: ${entry.useCount} | Source: ${entry.metadata.source}`);
    console.log('');
    count++;
  }
}
