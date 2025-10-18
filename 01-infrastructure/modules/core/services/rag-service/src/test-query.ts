// src/test-query.ts
// Test del query engine

import { query } from './query';

async function testQuery() {
  console.log('🧪 Testing Query Engine');
  console.log('=======================');
  console.log('');

  const testQueries = [
    'Qué tareas tengo pendientes?',
    'Qué hice en el proyecto Hub?',
    'Cuáles son las decisiones importantes?',
  ];

  for (const q of testQueries) {
    console.log(`\n${'='.repeat(60)}`);
    console.log(`Query: "${q}"`);
    console.log('='.repeat(60));
    
    try {
      const result = await query(q);
      
      console.log('\n📝 Answer:');
      console.log(result.answer);
      
      console.log('\n📚 Sources:');
      result.sources.forEach((source, i) => {
        console.log(`  [${i + 1}] ${source.project}/${source.type}: ${source.text.substring(0, 60)}...`);
        if (source.dailyRef) {
          console.log(`      → [[${source.dailyRef}]]`);
        }
      });
      
      console.log(`\n📊 Total chunks searched: ${result.totalChunksSearched}`);
      
    } catch (error) {
      console.error('❌ Error:', error);
    }
  }
  
  console.log('\n✅ Test completed');
}

testQuery().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});