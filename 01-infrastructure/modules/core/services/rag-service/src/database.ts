// src/database.ts
import { connect, Table } from 'vectordb';
import { config } from './config';
import { VaultChunk } from './parser';
import * as fs from 'fs';
import * as path from 'path';

export interface VaultChunkWithVector extends VaultChunk {
  vector: number[];
}

let dbConnection: any = null;

/**
 * Conectar a la base de datos (crea si no existe)
 */
export async function connectDB() {
  if (dbConnection) {
    return dbConnection;
  }

  // Asegurar que el directorio existe
  const dbDir = path.dirname(config.db.path);
  if (!fs.existsSync(dbDir)) {
    fs.mkdirSync(dbDir, { recursive: true });
  }

  dbConnection = await connect(config.db.path);
  console.log(`✓ Connected to DB: ${config.db.path}`);
  
  return dbConnection;
}

/**
 * Normalizar chunk para LanceDB (reemplazar undefined con strings vacíos)
 */
function normalizeChunk(chunk: VaultChunkWithVector): any {
  return {
    id: chunk.id,
    text: chunk.text,
    type: chunk.type,
    project: chunk.project,
    sourceFile: chunk.sourceFile,
    dailyRef: chunk.dailyRef || '',  // ✅ String vacío en lugar de undefined
    date: chunk.date || '',           // ✅ String vacío en lugar de undefined
    vector: chunk.vector,
  };
}

/**
 * Guardar chunks con vectores en la base de datos
 */
export async function saveChunks(chunks: VaultChunkWithVector[]): Promise<void> {
  const db = await connectDB();

  // Normalizar chunks (reemplazar undefined con valores por defecto)
  const normalizedChunks = chunks.map(normalizeChunk);

  // Borrar tabla existente si existe
  try {
    await db.dropTable(config.db.tableName);
    console.log(`✓ Dropped existing table: ${config.db.tableName}`);
  } catch (error) {
    // Tabla no existe, ok
  }

  // Crear nueva tabla
  await db.createTable(config.db.tableName, normalizedChunks);
  console.log(`✓ Created table with ${normalizedChunks.length} chunks`);
}

/**
 * Buscar chunks similares a un vector
 */
export async function searchSimilar(
  queryVector: number[],
  limit: number = 10
): Promise<any[]> {
  const db = await connectDB();
  
  const table = await db.openTable(config.db.tableName);
  
  const results = await table
    .search(queryVector)
    .limit(limit)
    .execute();

  return results;
}

/**
 * Obtener estadísticas de la base de datos
 */
export async function getStats() {
  const db = await connectDB();

  try {
    const table = await db.openTable(config.db.tableName);
    const count = await table.countRows();

    return {
      totalChunks: count,
      tableName: config.db.tableName,
      dbPath: config.db.path,
    };
  } catch (error) {
    return {
      totalChunks: 0,
      tableName: config.db.tableName,
      dbPath: config.db.path,
      error: 'Table does not exist',
    };
  }
}