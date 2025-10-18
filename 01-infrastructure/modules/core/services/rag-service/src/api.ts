// src/api.ts
// REST API con todos los endpoints

import express from 'express';
import { config, validateConfig } from './config';

const app = express();
app.use(express.json());

// Validar configuración al inicio
try {
  validateConfig();
  console.log('✅ Configuración validada');
} catch (error) {
  console.error('❌ Error en configuración:', error);
  process.exit(1);
}

// Health check básico
app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    service: 'rag-service',
    version: '1.0.0',
    timestamp: new Date().toISOString(),
    config: {
      ollamaHost: config.ollama.host,
      vaultPath: config.vault.basePath,
      dbPath: config.db.path,
    }
  });
});

// Health check profundo (verifica conectividad)
app.get('/health/deep', async (req, res) => {
  const checks = {
    api: true,
    ollama: false,
    vault: false,
    db: false,
  };

  // Check Ollama
  try {
    const response = await fetch(`${config.ollama.host}/api/tags`, {
      signal: AbortSignal.timeout(5000)
    });
    checks.ollama = response.ok;
  } catch (error) {
    console.warn('⚠️  Ollama no responde:', error);
  }

  // Check Vault (verifica que el path existe)
  try {
    const fs = require('fs');
    const path = require('path');
    const vaultPath = path.resolve(config.vault.basePath);
    checks.vault = fs.existsSync(vaultPath);
  } catch (error) {
    console.warn('⚠️  No se puede acceder al vault:', error);
  }

  // Check DB (verifica que el directorio existe)
  try {
    const fs = require('fs');
    const path = require('path');
    const dbDir = path.dirname(config.db.path);
    checks.db = fs.existsSync(dbDir);
  } catch (error) {
    console.warn('⚠️  No se puede acceder al directorio de DB:', error);
  }

  const allHealthy = Object.values(checks).every(v => v);

  res.status(allHealthy ? 200 : 503).json({
    status: allHealthy ? 'healthy' : 'degraded',
    checks,
    timestamp: new Date().toISOString(),
  });
});

// Stats endpoint
app.get('/stats', async (req, res) => {
  try {
    const { getStats } = await import('./database');
    const stats = await getStats();
    res.json(stats);
  } catch (error) {
    console.error('❌ Error getting stats:', error);
    res.status(500).json({
      success: false,
      error: (error as Error).message
    });
  }
});

// Index endpoint (trigger re-indexing)
app.post('/index', async (req, res) => {
  try {
    console.log('📥 Received index request');
    
    const { indexVault } = await import('./indexer');
    
    // Ejecutar en background
    indexVault().catch((error: Error) => {
      console.error('❌ Background indexing failed:', error);
    });
    
    // Responder inmediatamente
    res.json({
      success: true,
      message: 'Indexing started in background'
    });
  } catch (error) {
    console.error('❌ Error starting indexing:', error);
    res.status(500).json({
      success: false,
      error: (error as Error).message
    });
  }
});
app.post('/query', async (req, res) => {
  try {
    const { query: queryText, project, type, dateFrom, dateTo, limit } = req.body;
    
    if (!queryText) {
      return res.status(400).json({ 
        success: false,
        error: 'Missing query parameter' 
      });
    }
    
    console.log(`📥 Query request: "${queryText}"`);
    
    const { query } = await import('./query');
    const result = await query(queryText, { project, type, dateFrom, dateTo, limit });
    
    res.json({
      success: true,
      query: queryText,
      answer: result.answer,
      sources: result.sources,
      totalChunksSearched: result.totalChunksSearched,
    });
    
  } catch (error) {
    console.error('❌ Query error:', error);
    res.status(500).json({
      success: false,
      error: (error as Error).message
    });
  }
}); 
// Error handler
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('❌ Error:', err);
  res.status(500).json({
    success: false,
    error: err.message || 'Internal server error'
  });
});

// Start server
const PORT = config.api.port;

app.listen(PORT, () => {
  console.log('');
  console.log('🚀 ========================================');
  console.log('🚀 RAG Service Started');
  console.log('🚀 ========================================');
  console.log(`📡 API listening on port ${PORT}`);
  console.log(`🔗 Health check: http://localhost:${PORT}/health`);
  console.log(`🔍 Deep health: http://localhost:${PORT}/health/deep`);
  console.log(`📊 Stats: http://localhost:${PORT}/stats`);
  console.log(`🔄 Index: POST http://localhost:${PORT}/index`);
  console.log(`🔎 Query: POST http://localhost:${PORT}/query`);
  console.log('🚀 ========================================');
  console.log('');
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('⚠️  SIGTERM received, shutting down gracefully...');
  process.exit(0);
});

process.on('SIGINT', () => {
  console.log('⚠️  SIGINT received, shutting down gracefully...');
  process.exit(0);
});