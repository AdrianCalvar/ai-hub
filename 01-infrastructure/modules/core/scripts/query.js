// scripts/query.js
// Cross-platform query script for RAG service

const http = require('http');

const query = process.argv.slice(2).join(' ');

if (!query) {
  console.error('❌ Error: No query provided');
  console.error('Usage: node scripts/query.js "your question here"');
  process.exit(1);
}

console.log(`\n🔍 Query: "${query}"\n`);

const postData = JSON.stringify({ query });

const options = {
  hostname: 'localhost',
  port: 3000,
  path: '/query',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(postData)
  }
};

const req = http.request(options, (res) => {
  let data = '';

  res.on('data', (chunk) => {
    data += chunk;
  });

  res.on('end', () => {
    try {
      const response = JSON.parse(data);

      if (!response.success) {
        console.error('❌ Error:', response.error);
        process.exit(1);
      }

      console.log('📝 Answer:');
      console.log(response.answer);

      if (response.sources && response.sources.length > 0) {
        console.log('\n📚 Sources:');
        response.sources.forEach((source, i) => {
          const text = source.text.substring(0, 60);
          console.log(`  [${i + 1}] [${source.project}/${source.type}] ${text}...`);
          if (source.dailyRef) {
            console.log(`      → [[${source.dailyRef}]]`);
          }
        });
      }

      console.log(`\n📊 Chunks searched: ${response.totalChunksSearched}\n`);

    } catch (error) {
      console.error('❌ Error parsing response:', error.message);
      console.error('Raw response:', data);
      process.exit(1);
    }
  });
});

req.on('error', (error) => {
  console.error('❌ Connection error:', error.message);
  console.error('💡 Make sure RAG service is running: npm run dev\n');
  process.exit(1);
});

req.write(postData);
req.end();