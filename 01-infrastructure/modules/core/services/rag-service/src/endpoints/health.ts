
import { Request, Response } from 'express';
import { config } from '../config';

export const getBasicHealth = (req: Request, res: Response) => {
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
};
export const getDeepHealth = async (req: Request, res: Response) => {
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
}