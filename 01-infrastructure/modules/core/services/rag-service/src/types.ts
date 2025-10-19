
export type NoteType = 'task' | 'idea' | 'decision' | 'blocker';

export interface OllamaEmbeddingResponse {
  embedding: number[];
}

export interface OllamaGenerateResponse {
  response: string;
  model: string;
  created_at: string;
  done: boolean;
  context?: number[];
  total_duration?: number;
  load_duration?: number;
  prompt_eval_count?: number;
  prompt_eval_duration?: number;
  eval_count?: number;
  eval_duration?: number;
}

export interface OllamaModel {
  name: string;
  modified_at: string;
  size: number;
  digest: string;
}

export interface OllamaModelsResponse {
  models: OllamaModel[];
}