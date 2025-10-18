// src/embeddings.ts
// Módulo para generar embeddings con Ollama

import { config } from './config';

/**
 * Genera embedding para un texto usando Ollama
 */
export async function generateEmbedding(text: string): Promise<number[]> {
  if (!text || text.trim().length === 0) {
    throw new Error('Text cannot be empty');
  }

  try {
    const response = await fetch(`${config.ollama.host}/api/embeddings`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: config.ollama.embeddingModel,
        prompt: text.trim()
      }),
      signal: AbortSignal.timeout(config.ollama.timeout)
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Ollama error (${response.status}): ${errorText}`);
    }

    const data = await response.json();

    if (!data.embedding || !Array.isArray(data.embedding)) {
      throw new Error('Invalid response from Ollama: missing embedding array');
    }

    return data.embedding;

  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to generate embedding: ${error.message}`);
    }
    throw error;
  }
}

/**
 * Genera embeddings para múltiples textos en batch
 */
export async function generateEmbeddingsBatch(
  texts: string[], 
  onProgress?: (current: number, total: number) => void
): Promise<number[][]> {
  const embeddings: number[][] = [];

  for (let i = 0; i < texts.length; i++) {
    const embedding = await generateEmbedding(texts[i]);
    embeddings.push(embedding);

    if (onProgress) {
      onProgress(i + 1, texts.length);
    }
  }

  return embeddings;
}