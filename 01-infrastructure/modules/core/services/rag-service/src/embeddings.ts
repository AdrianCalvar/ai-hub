// src/embeddings.ts
// Módulo para generar embeddings con Ollama

import { config } from './config';
import axios from 'axios';
import { OllamaEmbeddingResponse } from './types';

/**
 * Genera embedding para un texto usando Ollama
 */
export async function generateEmbedding(text: string): Promise<number[]> {
  try {
    const response = await axios.post(
      `${config.ollama.host}/api/embeddings`,
      {
        model: config.ollama.embeddingModel,
        prompt: text,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
        timeout: 30000,
      }
    );

    const data = response.data as OllamaEmbeddingResponse;

    if (!data.embedding || !Array.isArray(data.embedding)) {
      throw new Error('Invalid response format from Ollama');
    }

    return data.embedding;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Error generating embedding:', {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
      });
    } else {
      console.error('Error generating embedding:', error);
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