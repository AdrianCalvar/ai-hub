import express, { Request, Response, NextFunction } from 'express';
import { config, validateConfig } from './config';
import { enableCors } from './endpoints/api.utils';
import { getBasicHealth, getDeepHealth } from './endpoints/health';
import { doQuery, indexFiles } from './endpoints/service';

const app = express();

// ✅ CORS - Permitir peticiones desde Obsidian
app.use(enableCors);

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
app.get('/health', getBasicHealth);

// Health check profundo (verifica conectividad)
app.get('/health/deep', getDeepHealth);

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
app.post('/index', indexFiles);
app.post('/query', doQuery); 
// Error handler
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
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