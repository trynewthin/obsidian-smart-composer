// These types are based on the OpenRouter API specification
// https://openrouter.ai/docs/responses

export type LLMResponseBase = {
  id: string
  created?: number
  model: string
  system_fingerprint?: string
  usage?: ResponseUsage
}

export type LLMResponseNonStreaming = LLMResponseBase & {
  choices: NonStreamingChoice[]
  object: 'chat.completion'
}

export type LLMResponseStreaming = LLMResponseBase & {
  choices: StreamingChoice[]
  object: 'chat.completion.chunk'
}

export type LLMResponse = LLMResponseNonStreaming | LLMResponseStreaming

export type ResponseUsage = {
  prompt_tokens: number
  completion_tokens: number
  total_tokens: number
}

export interface ResponseMessage {
  content: string | null
  role?: string
  reasoning_content?: string | null
  metadata?: {
    reasoningContent?: string
    usage?: ResponseUsage
    model?: any
  }
}

export interface ResponseChoice {
  finish_reason: string | null
  message?: ResponseMessage
  delta?: ResponseMessage
}

type NonStreamingChoice = {
  finish_reason: string | null
  message: ResponseMessage
  error?: Error
}

type StreamingChoice = {
  finish_reason: string | null
  delta: ResponseMessage
  error?: Error
}

type Error = {
  code: number
  message: string
}
