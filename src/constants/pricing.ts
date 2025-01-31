/**
 * Model pricing configuration type
 */
export type ModelPricing = {
  input: number
  output: number
}

/**
 * OpenAI model pricing in dollars per million tokens
 */
export const OPENAI_PRICES: Record<string, ModelPricing> = {
  'gpt-4o': { input: 2.5, output: 10 },
  'gpt-4o-mini': { input: 0.15, output: 0.6 },
}

/**
 * Anthropic model pricing in dollars per million tokens
 */
export const ANTHROPIC_PRICES: Record<string, ModelPricing> = {
  'claude-3-5-sonnet-latest': { input: 3, output: 15 },
  'claude-3-5-haiku-latest': { input: 1, output: 5 },
}

/**
 * Gemini model pricing in dollars per million tokens
 * Currently free for low rate limits
 */
export const GEMINI_PRICES: Record<string, ModelPricing> = {
  'gemini-1.5-pro': { input: 0, output: 0 },
  'gemini-1.5-flash': { input: 0, output: 0 },
}

/**
 * Groq model pricing in dollars per million tokens
 */
export const GROQ_PRICES: Record<string, ModelPricing> = {
  'llama-3.1-70b-versatile': { input: 0.59, output: 0.79 },
  'llama-3.1-8b-instant': { input: 0.05, output: 0.08 },
}

/**
 * DeepSeek model pricing in dollars per million tokens
 */
export const DEEPSEEK_PRICES: Record<string, ModelPricing> = {
  'deepseek-chat': { input: 0.2, output: 0.8 },
  'deepseek-reasoner': { input: 0.4, output: 1.6 },
}
