import { ModelOption } from '../types/llm/model'
import { EmbeddingModelOption } from '../types/embedding'

/**
 * Chat model options available in the plugin
 */
export const CHAT_MODEL_OPTIONS: ModelOption[] = [
  {
    id: 'anthropic/claude-3.5-sonnet-latest',
    name: 'claude-3.5-sonnet (Recommended)',
    model: {
      provider: 'anthropic',
      model: 'claude-3-5-sonnet-latest',
      baseURL: 'https://api.anthropic.com/v1',
    },
  },
  {
    id: 'openai/gpt-4o',
    name: 'gpt-4o',
    model: {
      provider: 'openai',
      model: 'gpt-4o',
    },
  },
  {
    id: 'openai/gpt-4o-mini',
    name: 'gpt-4o-mini',
    model: {
      provider: 'openai',
      model: 'gpt-4o-mini',
    },
  },
  {
    id: 'gemini/gemini-1.5-pro',
    name: 'gemini-1.5-pro',
    model: {
      provider: 'gemini',
      model: 'gemini-1.5-pro',
    },
  },
  {
    id: 'gemini/gemini-2.0-flash',
    name: 'gemini-2.0-flash',
    model: {
      provider: 'gemini',
      model: 'gemini-2.0-flash-exp',
    },
  },
  {
    id: 'gemini/gemini-2.0-flash-thinking',
    name: 'gemini-2.0-flash-thinking',
    model: {
      provider: 'gemini',
      model: 'gemini-2.0-flash-thinking-exp',
    },
  },
  {
    id: 'gemini/gemini-exp-1206',
    name: 'gemini-exp-1206',
    model: {
      provider: 'gemini',
      model: 'gemini-exp-1206',
    },
  },
  {
    id: 'groq/llama-3.1-70b-versatile',
    name: 'llama-3.1-70b (Groq)',
    model: {
      provider: 'groq',
      model: 'llama-3.1-70b-versatile',
    },
  },
  {
    id: 'ollama',
    name: 'Ollama',
    model: {
      provider: 'ollama',
      model: '',
      baseURL: '',
    },
  },
  {
    id: 'llmstudio/local',
    name: 'LM Studio (Local)',
    model: {
      provider: 'openai-compatible',
      model: 'local-model',
      apiKey: 'not-needed',
      baseURL: 'http://localhost:6666/v1',
    },
  },
  {
    id: 'openai-compatible',
    name: 'Custom (OpenAI Compatible)',
    model: {
      provider: 'openai-compatible',
      model: '',
      apiKey: '',
      baseURL: '',
    },
  },
  {
    id: 'deepseek/deepseek-chat',
    name: 'deepseek-chat',
    model: {
      provider: 'deepseek',
      model: 'deepseek-chat',
    },
  },
  {
    id: 'deepseek/deepseek-reasoner',
    name: 'deepseek-reasoner',
    model: {
      provider: 'deepseek',
      model: 'deepseek-reasoner',
    },
  },
]

/**
 * Apply model options available in the plugin
 */
export const APPLY_MODEL_OPTIONS: ModelOption[] = [
  {
    id: 'openai/gpt-4o-mini',
    name: 'gpt-4o-mini (Recommended)',
    model: {
      provider: 'openai',
      model: 'gpt-4o-mini',
    },
  },
  {
    id: 'anthropic/claude-3.5-haiku',
    name: 'claude-3.5-haiku',
    model: {
      provider: 'anthropic',
      model: 'claude-3-5-haiku-latest',
    },
  },
  {
    id: 'gemini/gemini-1.5-flash',
    name: 'gemini-1.5-flash',
    model: {
      provider: 'gemini',
      model: 'gemini-1.5-flash',
    },
  },
  {
    id: 'gemini/gemini-2.0-flash',
    name: 'gemini-2.0-flash',
    model: {
      provider: 'gemini',
      model: 'gemini-2.0-flash-exp',
    },
  },
  {
    id: 'groq/llama-3.1-8b-instant',
    name: 'llama-3.1-8b (Groq)',
    model: {
      provider: 'groq',
      model: 'llama-3.1-8b-instant',
    },
  },
  {
    id: 'groq/llama-3.1-70b-versatile',
    name: 'llama-3.1-70b (Groq)',
    model: {
      provider: 'groq',
      model: 'llama-3.1-70b-versatile',
    },
  },
  {
    id: 'ollama',
    name: 'Ollama',
    model: {
      provider: 'ollama',
      model: '',
      baseURL: '',
    },
  },
  {
    id: 'openai-compatible',
    name: 'Custom (OpenAI Compatible)',
    model: {
      provider: 'openai-compatible',
      model: '',
      apiKey: '',
      baseURL: '',
    },
  },
  {
    id: 'deepseek/deepseek-chat',
    name: 'deepseek-chat',
    model: {
      provider: 'deepseek',
      model: 'deepseek-chat',
    },
  },
]

/**
 * Embedding model options available in the plugin
 */
export const EMBEDDING_MODEL_OPTIONS: EmbeddingModelOption[] = [
  {
    id: 'openai/text-embedding-3-small',
    name: 'openai/text-embedding-3-small (Recommended)',
    model: {
      provider: 'openai',
      model: 'text-embedding-3-small',
    },
    dimension: 1536,
  },
  {
    id: 'openai/text-embedding-3-large',
    name: 'openai/text-embedding-3-large',
    model: {
      provider: 'openai',
      model: 'text-embedding-3-large',
    },
    dimension: 3072,
  },
  {
    id: 'gemini/text-embedding-004',
    name: 'gemini/text-embedding-004',
    model: {
      provider: 'gemini',
      model: 'text-embedding-004',
    },
    dimension: 768,
  },
  {
    name: 'ollama/nomic-embed-text',
    id: 'ollama/nomic-embed-text',
    model: {
      provider: 'ollama',
      model: 'nomic-embed-text',
      baseURL: '',
    },
    dimension: 768,
  },
  {
    name: 'ollama/mxbai-embed-large',
    id: 'ollama/mxbai-embed-large',
    model: {
      provider: 'ollama',
      model: 'mxbai-embed-large',
      baseURL: '',
    },
    dimension: 1024,
  },
  {
    name: 'ollama/bge-m3',
    id: 'ollama/bge-m3',
    model: {
      provider: 'ollama',
      model: 'bge-m3',
      baseURL: '',
    },
    dimension: 1024,
  },
]
