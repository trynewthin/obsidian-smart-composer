import { ChatCompletion, ChatCompletionChunk } from 'openai/resources/chat/completions'
import { ResponseUsage } from './response'

// 扩展 OpenAI 的类型定义以支持 deepseek-reasoner 的思考过程
export interface DeepseekChatCompletionMessage {
  content: string | null
  role: 'assistant' | 'user' | 'system'
  reasoning_content?: string | null
  metadata?: {
    reasoningContent?: string
    usage?: ResponseUsage
    model?: any
  }
}

export interface DeepseekChatCompletionChunkDelta {
  content?: string | null
  role?: 'assistant' | 'user' | 'system'
  reasoning_content?: string | null
  metadata?: {
    reasoningContent?: string
    usage?: ResponseUsage
    model?: any
  }
}

declare module 'openai/resources/chat/completions' {
  interface ChatCompletionMessage extends DeepseekChatCompletionMessage {}
  interface ChatCompletionChunkDelta extends DeepseekChatCompletionChunkDelta {}
} 