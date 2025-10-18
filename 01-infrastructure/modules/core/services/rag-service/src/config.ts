// src/config.ts
// Configuración centralizada del sistema
// Todas las rutas y configuraciones se cargan desde .env

import * as dotenv from 'dotenv';
import * as path from 'path';

// Cargar variables de entorno desde .env
dotenv.config();

export const config = {
  // Ollama
  ollama: {
    host: process.env.OLLAMA_HOST || 'http://localhost:11434',
    embeddingModel: process.env.EMBEDDING_MODEL || 'nomic-embed-text',
    llmModel: process.env.LLM_MODEL || 'llama3.2:3b',
    timeout: parseInt(process.env.OLLAMA_TIMEOUT || '30000'),
  },

  // Vault paths - ÚNICA FUENTE DE VERDAD
  vault: {
    basePath: process.env.VAULT_PATH || path.resolve('../../../Adrian\'s Mind'),
    projectsPath: '01-Projects',
    contextFiles: ['tasks.md', 'ideas.md', 'decisions.md', 'blockers.md'],
  },

  // Vector DB
  db: {
    path: process.env.DB_PATH || './data/vectors.lance',
    tableName: 'vault_chunks',
  },

  // API
  api: {
    port: parseInt(process.env.PORT || '3000'),
    cors: false,
  },

  // Indexing
  indexing: {
    batchSize: parseInt(process.env.BATCH_SIZE || '10'),
    debounceMs: parseInt(process.env.DEBOUNCE_MS || '5000'),
    minChunkLength: parseInt(process.env.MIN_CHUNK_LENGTH || '10'),
  },

  // Logging
  logging: {
    level: process.env.LOG_LEVEL || 'info',
    pretty: process.env.NODE_ENV !== 'production',
  },
} as const;

// Validar configuración al cargar
export function validateConfig() {
  const errors: string[] = [];
  const fs = require('fs');

  // Validar que existe vault path
  if (!config.vault.basePath) {
    errors.push('VAULT_PATH no está configurado');
  } else if (!fs.existsSync(config.vault.basePath)) {
    errors.push(`VAULT_PATH no existe: ${config.vault.basePath}`);
  }

  // Validar que existe DB path directory
  if (!config.db.path) {
    errors.push('DB_PATH no está configurado');
  }

  if (errors.length > 0) {
    throw new Error(`Configuración inválida:\n${errors.join('\n')}`);
  }

  return true;
}

// Mostrar configuración cargada (útil para debug)
export function printConfig() {
  console.log('📋 Configuration Loaded:');
  console.log(`   Vault Path: ${config.vault.basePath}`);
  console.log(`   Ollama Host: ${config.ollama.host}`);
  console.log(`   DB Path: ${config.db.path}`);
  console.log(`   API Port: ${config.api.port}`);
  console.log('');
}