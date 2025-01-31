/**
 * Native LLM model configurations for official API providers
 */
export type NativeLLMModel = {
  provider: 'openai' | 'anthropic' | 'gemini' | 'groq' | 'deepseek'
  model: string
  baseURL?: string
}

/**
 * Ollama model configuration for local model deployment
 */
export type OllamaModel = {
  provider: 'ollama'
  baseURL: string
  model: string
}

/**
 * OpenAI-compatible model configuration for third-party API providers
 */
export type OpenAICompatibleModel = {
  provider: 'openai-compatible'
  apiKey: string
  baseURL: string
  model: string
}

/**
 * Union type of all supported LLM model configurations
 */
export type LLMModel = NativeLLMModel | OllamaModel | OpenAICompatibleModel

/**
 * Model option configuration for UI display and selection
 */
export type ModelOption = {
  id: string
  name: string
  model: LLMModel
}
