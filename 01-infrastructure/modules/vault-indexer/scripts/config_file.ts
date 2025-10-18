// src/config.ts
// Configuración centralizada del sistema

export const config = {
  // Ollama
  ollama: {
    host: process.env.OLLAMA_HOST || 'http://localhost:11434',
    embeddingModel: 'nomic-embed-text',
    llmModel: 'llama3.2:3b',
    timeout: 30000, // 30 segundos
  },

  // Vault paths
  vault: {
    basePath: process.env.VAULT_PATH || '../../../Adrian\'s Mind',
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
    cors: false, // Deshabilitado para red local
  },

  // Indexing
  indexing: {
    batchSize: 10, // Chunks a procesar en paralelo
    debounceMs: 5000, // 5 segundos para file watcher
    minChunkLength: 10, // Caracteres mínimos por chunk
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

  // Validar que exista vault path
  if (!config.vault.basePath) {
    errors.push('VAULT_PATH no está configurado');
  }

  // Validar que exista DB path
  if (!config.db.path) {
    errors.push('DB_PATH no está configurado');
  }

  if (errors.length > 0) {
    throw new Error(`Configuración inválida:\n${errors.join('\n')}`);
  }

  return true;
}
