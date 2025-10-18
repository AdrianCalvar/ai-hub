// src/parser.ts
// Parser de context files (tasks.md, ideas.md, etc.)

import { config } from './config';

export interface VaultChunk {
  id: string;
  text: string;
  type: 'task' | 'idea' | 'decision' | 'blocker';
  project: string;
  sourceFile: string;
  dailyRef?: string;
  date?: string;
}

/**
 * Parsea un context file y extrae chunks
 * 
 * Formato esperado:
 * ### 2025-10-17
 * - Texto del bullet → [[2025-10-17#14:00]]
 */
export function parseContextFile(
  content: string,
  project: string,
  type: 'task' | 'idea' | 'decision' | 'blocker',
  sourceFile: string
): VaultChunk[] {
  const chunks: VaultChunk[] = [];
  const lines = content.split('\n');
  
  let currentDate: string | undefined;
  let chunkIndex = 0;
  
  for (const line of lines) {
    // Detectar headers de fecha: ### 2025-10-17
    if (line.startsWith('### ')) {
      const dateMatch = line.substring(4).trim();
      // Validar formato YYYY-MM-DD
      if (/^\d{4}-\d{2}-\d{2}/.test(dateMatch)) {
        currentDate = dateMatch.substring(0, 10); // Solo YYYY-MM-DD
        continue;
      }
    }
    
    // Procesar bullets: - texto → [[daily#timestamp]]
    const trimmed = line.trim();
    if (trimmed.startsWith('- ')) {
      const rawText = trimmed.substring(2);
      
      // Extraer link a daily: → [[2025-10-17#14:00]]
      const dailyMatch = rawText.match(/→ \[\[([^\]]+)\]\]/);
      const dailyRef = dailyMatch ? dailyMatch[1] : undefined;
      
      // Limpiar texto (remover link a daily)
      let cleanText = rawText.replace(/→ \[\[([^\]]+)\]\]/, '').trim();
      
      // Remover checkboxes si existen
      cleanText = cleanText.replace(/^\[[ xX]\]\s*/, '');
      
      // Skip si es muy corto
      if (cleanText.length < config.indexing.minChunkLength) {
        continue;
      }
      
      const chunk: VaultChunk = {
        id: `${project}_${type}_${currentDate || 'unknown'}_${chunkIndex}`,
        text: cleanText,
        type,
        project,
        sourceFile,
        dailyRef,
        date: currentDate
      };
      
      chunks.push(chunk);
      chunkIndex++;
    }
  }
  
  return chunks;
}

/**
 * Valida que un chunk sea correcto
 */
export function validateChunk(chunk: VaultChunk): boolean {
  if (!chunk.id || !chunk.text || !chunk.type || !chunk.project) {
    return false;
  }
  
  if (chunk.text.length < config.indexing.minChunkLength) {
    return false;
  }
  
  return true;
}