// src/test-config.ts
// Verifica que la configuración está correcta

import { config, validateConfig, printConfig } from '../config';
import * as fs from 'fs';
import * as path from 'path';
import { OllamaModelsResponse } from '../types';

console.log('🔍 Testing Configuration');
console.log('========================');
console.log('');

// Mostrar config cargada
printConfig();

// Validar
try {
  validateConfig();
  console.log('✅ Configuration is valid');
  console.log('');
} catch (error) {
  console.error('❌ Configuration is invalid:');
  console.error(error);
  process.exit(1);
}

// Verificar accesos
console.log('🔍 Checking access to resources:');
console.log('');

// 1. Vault
const vaultPath = config.vault.basePath;
console.log(`📁 Vault Path: ${vaultPath}`);
if (fs.existsSync(vaultPath)) {
  console.log('   ✓ Path exists');
  
  const projectsPath = path.join(vaultPath, config.vault.projectsPath);
  if (fs.existsSync(projectsPath)) {
    console.log('   ✓ Projects folder exists');
    
    const projects = fs.readdirSync(projectsPath)
      .filter((f: string) => {
        const fullPath = path.join(projectsPath, f);
        return fs.statSync(fullPath).isDirectory() 
          && !f.startsWith('.') 
          && !f.startsWith('_');
      });
    
    console.log(`   ✓ Found ${projects.length} projects: ${projects.join(', ')}`);
  } else {
    console.log('   ❌ Projects folder not found!');
  }
} else {
  console.log('   ❌ Path does not exist!');
  process.exit(1);
}
console.log('');

// 2. DB directory
const dbPath = config.db.path;
const dbDir = path.dirname(dbPath);
console.log(`💾 DB Directory: ${dbDir}`);
if (fs.existsSync(dbDir)) {
  console.log('   ✓ Directory exists');
} else {
  console.log('   ⚠️  Directory does not exist (will be created on first index)');
}
console.log('');

// 3. Ollama
console.log(`🤖 Ollama Host: ${config.ollama.host}`);
console.log('   Testing connection...');

fetch(`${config.ollama.host}/api/tags`, {
  signal: AbortSignal.timeout(5000)
})
  .then(response => {
    if (response.ok) {
      console.log('   ✓ Ollama is accessible');
      return response.json();
    } else {
      throw new Error(`HTTP ${response.status}`);
    }
  })
  .then(data => {
    const models = (data as OllamaModelsResponse).models || [];
    console.log(`   ✓ Found ${models.length} models installed`);
    
    const hasEmbedding = models.some((m: any) => m.name.includes(config.ollama.embeddingModel));
    const hasLLM = models.some((m: any) => m.name.includes(config.ollama.llmModel));
    
    if (hasEmbedding) {
      console.log(`   ✓ Embedding model available: ${config.ollama.embeddingModel}`);
    } else {
      console.log(`   ⚠️  Embedding model not found: ${config.ollama.embeddingModel}`);
    }
    
    if (hasLLM) {
      console.log(`   ✓ LLM model available: ${config.ollama.llmModel}`);
    } else {
      console.log(`   ⚠️  LLM model not found: ${config.ollama.llmModel}`);
    }
    
    console.log('');
    console.log('✅ All checks passed!');
  })
  .catch(error => {
    console.log(`   ❌ Cannot connect to Ollama: ${error.message}`);
    console.log('   Make sure Ollama is running: task up:ollama');
    console.log('');
    process.exit(1);
  });