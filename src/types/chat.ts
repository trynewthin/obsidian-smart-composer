import { SerializedEditorState } from 'lexical'

import { SelectVector } from '../database/schema'

import { LLMModel } from './llm/model'
import { ContentPart } from './llm/request'
import { ResponseUsage } from './llm/response'
import { Mentionable, SerializedMentionable } from './mentionable'
import { SimilaritySearchResult } from './rag'

export interface ChatMessageMetadata {
  usage?: {
    completion_tokens: number
    prompt_tokens: number
    total_tokens: number
  }
  model?: LLMModel
  reasoningContent?: string
}

export interface ChatUserMessage {
  role: 'user'
  content: any
  promptContent: string | ContentPart[] | null
  id: string
  mentionables: Mentionable[]
  similaritySearchResults?: SimilaritySearchResult[]
  metadata?: ChatMessageMetadata
}

export interface ChatAssistantMessage {
  role: 'assistant'
  content: string
  id: string
  metadata?: ChatMessageMetadata
}

export type ChatMessage = ChatUserMessage | ChatAssistantMessage

export type SerializedChatUserMessage = {
  role: 'user'
  content: SerializedEditorState | null
  promptContent: string | ContentPart[] | null
  id: string
  mentionables: SerializedMentionable[]
  similaritySearchResults?: (Omit<SelectVector, 'embedding'> & {
    similarity: number
  })[]
}
export type SerializedChatAssistantMessage = {
  role: 'assistant'
  content: string
  id: string
  metadata?: {
    usage?: ResponseUsage
    model?: LLMModel
  }
}
export type SerializedChatMessage =
  | SerializedChatUserMessage
  | SerializedChatAssistantMessage

export type ChatConversation = {
  schemaVersion: number
  id: string
  title: string
  createdAt: number
  updatedAt: number
  messages: SerializedChatMessage[]
}
export type ChatConversationMeta = {
  schemaVersion: number
  id: string
  title: string
  createdAt: number
  updatedAt: number
}
