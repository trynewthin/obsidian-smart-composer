import { LLMModel } from '../../types/llm/model'
import {
  LLMOptions,
  LLMRequestNonStreaming,
  LLMRequestStreaming,
} from '../../types/llm/request'
import {
  LLMResponseNonStreaming,
  LLMResponseStreaming,
} from '../../types/llm/response'

import { BaseLLMProvider } from './base'
import { DeepSeekMessageAdapter } from './deepseekMessageAdapter'
import { LLMAPIKeyInvalidException, LLMAPIKeyNotSetException } from './exception'
import OpenAI from 'openai'

export class DeepSeekProvider implements BaseLLMProvider {
  private adapter: DeepSeekMessageAdapter
  private client: OpenAI

  constructor(apiKey: string) {
    this.client = new OpenAI({ 
      apiKey, 
      baseURL: 'https://api.deepseek.com/v1',
      dangerouslyAllowBrowser: true 
    })
    this.adapter = new DeepSeekMessageAdapter()
  }

  async generateResponse(
    model: LLMModel,
    request: LLMRequestNonStreaming,
    options?: LLMOptions,
  ): Promise<LLMResponseNonStreaming> {
    if (!this.client.apiKey) {
      throw new LLMAPIKeyNotSetException(
        'DeepSeek API key is missing. Please set it in settings menu.',
      )
    }

    try {
      return await this.adapter.generateResponse(this.client, request, options)
    } catch (error) {
      if (error instanceof OpenAI.AuthenticationError) {
        throw new LLMAPIKeyInvalidException(
          'DeepSeek API key is invalid. Please update it in settings menu.',
        )
      }
      throw error
    }
  }

  async streamResponse(
    model: LLMModel,
    request: LLMRequestStreaming,
    options?: LLMOptions,
  ): Promise<AsyncIterable<LLMResponseStreaming>> {
    if (!this.client.apiKey) {
      throw new LLMAPIKeyNotSetException(
        'DeepSeek API key is missing. Please set it in settings menu.',
      )
    }

    try {
      return await this.adapter.streamResponse(this.client, request, options)
    } catch (error) {
      if (error instanceof OpenAI.AuthenticationError) {
        throw new LLMAPIKeyInvalidException(
          'DeepSeek API key is invalid. Please update it in settings menu.',
        )
      }
      throw error
    }
  }
} 