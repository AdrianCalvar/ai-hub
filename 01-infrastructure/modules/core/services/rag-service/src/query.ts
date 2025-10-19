// src/query.ts
// Query Engine - Búsqueda semántica y generación de respuestas

import { config } from './config';
import { generateEmbedding } from './embeddings';
import { searchSimilar } from './database';
import { NoteType, OllamaGenerateResponse } from './types';

export interface QueryOptions {
  project?: string;
  type?: NoteType;
  dateFrom?: string;
  dateTo?: string;
  limit?: number;
}

export interface QueryResult {
  answer: string;
  sources: Array<{
    project: string;
    type: string;
    text: string;
    date?: string;
    dailyRef?: string;
    score?: number;
  }>;
  totalChunksSearched: number;
}

/**
 * Ejecutar query contra el vault
 */
export async function query(
  queryText: string,
  options: QueryOptions = {}
): Promise<QueryResult> {
  
  console.log(`🔍 Query: "${queryText}"`);
  
  const startTime = Date.now();
  
  // 1. Generar embedding del query
  console.log('   Generating query embedding...');
  const queryVector = await generateEmbedding(queryText);
  console.log(`   ✓ Embedding generated (${Date.now() - startTime}ms)`);
  
  // 2. Buscar en vector DB
  console.log('   Searching vector database...');
  const limit = options.limit || 10;
  let results = await searchSimilar(queryVector, limit);
  console.log(`   ✓ Found ${results.length} similar chunks`);
  
  // 3. Filtrar por metadata si se especificó
  if (options.project) {
    results = results.filter((r: any) => r.project === options.project);
    console.log(`   ✓ Filtered by project "${options.project}": ${results.length} chunks`);
  }
  
  if (options.type) {
    results = results.filter((r: any) => r.type === options.type);
    console.log(`   ✓ Filtered by type "${options.type}": ${results.length} chunks`);
  }
  
  if (options.dateFrom) {
    results = results.filter((r: any) => !r.date || r.date >= options.dateFrom!);
    console.log(`   ✓ Filtered by dateFrom "${options.dateFrom}": ${results.length} chunks`);
  }
  
  if (options.dateTo) {
    results = results.filter((r: any) => !r.date || r.date <= options.dateTo!);
    console.log(`   ✓ Filtered by dateTo "${options.dateTo}": ${results.length} chunks`);
  }
  
  console.log(`📌 Final results: ${results.length} chunks`);
  
  if (results.length === 0) {
    return {
      answer: 'No encontré información relevante en tu vault sobre eso.',
      sources: [],
      totalChunksSearched: 0,
    };
  }
  
  // 4. Construir contexto para el LLM
  const context = results
    .map((r: any, i: number) => {
      const ref = r.dailyRef ? ` → [[${r.dailyRef}]]` : (r.date ? ` (${r.date})` : '');
      return `[${i + 1}] [${r.project}/${r.type}] ${r.text}${ref}`;
    })
    .join('\n\n');
  
  // 5. Generar respuesta con LLM
  console.log('   Generating answer with LLM...');
  const answer = await generateAnswer(queryText, context);
  console.log(`   ✓ Answer generated (${Date.now() - startTime}ms total)`);
  
  // 6. Preparar sources para la respuesta
  const sources = results.map((r: any) => ({
    project: r.project,
    type: r.type,
    text: r.text,
    date: r.date || undefined,
    dailyRef: r.dailyRef || undefined,
    score: r._distance || undefined,
  }));
  
  return {
    answer,
    sources,
    totalChunksSearched: results.length,
  };
}

/**
 * Generar respuesta usando Ollama LLM
 */
async function generateAnswer(queryText: string, context: string): Promise<string> {
  const prompt = `Eres un asistente que ayuda a buscar información en el vault de Obsidian del usuario.

**Contexto relevante del vault:**

${context}

**Pregunta del usuario:**
${queryText}

**Instrucciones:**
- Responde la pregunta basándote SOLO en el contexto proporcionado
- Si hay links a dailies ([[fecha#hora]]), inclúyelos en tu respuesta para que el usuario pueda consultarlos
- Si no hay información suficiente, dilo claramente
- Sé conciso y directo
- Usa español
- Si mencionas información específica, indica de qué proyecto viene

**Respuesta:**`;

  try {
    const response = await fetch(`${config.ollama.host}/api/generate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: config.ollama.llmModel,
        prompt,
        stream: false,
        options: {
          temperature: 0.7,
          top_p: 0.9,
        }
      }),
      signal: AbortSignal.timeout(config.ollama.timeout)
    });

    if (!response.ok) {
      throw new Error(`Ollama error (${response.status}): ${await response.text()}`);
    }

    const data = await response.json() as OllamaGenerateResponse;
    return data.response || 'No pude generar una respuesta.';

  } catch (error) {
    console.error('❌ Error generating answer:', error);
    throw new Error(`Failed to generate answer: ${(error as Error).message}`);
  }
}