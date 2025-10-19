// src/test-embeddings.ts
// Test simple para verificar que Ollama funciona

import { config } from '../config';

async function testEmbeddings() {
  console.log('🧪 Testing Ollama embeddings...');
  console.log(`📡 Host: ${config.ollama.host}`);
  console.log(`🤖 Model: ${config.ollama.embeddingModel}`);
  console.log('');

  const testTexts = [
    'Decidimos usar arquitectura hexagonal',
    'Bug en el sistema de cache',
    'Reunión de arquitectura a las 3pm',
  ];

  for (const text of testTexts) {
    console.log(`📝 Testing: "${text}"`);
    
    try {
      const startTime = Date.now();
      
      const response = await fetch(`${config.ollama.host}/api/embeddings`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: config.ollama.embeddingModel,
          prompt: text
        }),
        signal: AbortSignal.timeout(config.ollama.timeout)
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${await response.text()}`);
      }

      const data = await response.json();
      const duration = Date.now() - startTime;

      console.log(`  ✅ Success! Vector length: ${data.embedding.length}`);
      console.log(`  ⏱️  Duration: ${duration}ms`);
      console.log(`  📊 First 5 dims: [${data.embedding.slice(0, 5).map((n: number) => n.toFixed(4)).join(', ')}...]`);
      console.log('');

    } catch (error) {
      console.error(`  ❌ Error:`, error);
      console.log('');
      process.exit(1);
    }
  }

  console.log('✅ All tests passed!');
}

// Ejecutar
testEmbeddings().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});