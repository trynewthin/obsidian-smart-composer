import OpenAI from 'openai'
import {
  ChatCompletion,
  ChatCompletionChunk,
  ChatCompletionContentPart,
  ChatCompletionMessageParam,
} from 'openai/resources/chat/completions'

import {
  LLMOptions,
  LLMRequestNonStreaming,
  LLMRequestStreaming,
  RequestMessage,
} from '../../types/llm/request'
import {
  LLMResponseNonStreaming,
  LLMResponseStreaming,
} from '../../types/llm/response'

export class DeepSeekMessageAdapter {
  async generateResponse(
    client: OpenAI,
    request: LLMRequestNonStreaming,
    options?: LLMOptions,
  ): Promise<LLMResponseNonStreaming> {
    const response = await client.chat.completions.create(
      {
        model: request.model,
        messages: this.preprocessMessages(request.messages, request.model).map((m) =>
          DeepSeekMessageAdapter.parseRequestMessage(m),
        ),
        max_tokens: request.max_tokens,
        temperature: request.temperature,
        top_p: request.top_p,
        frequency_penalty: request.frequency_penalty,
        presence_penalty: request.presence_penalty,
        logit_bias: request.logit_bias,
        prediction: request.prediction,
      },
      {
        signal: options?.signal,
      },
    )
    return DeepSeekMessageAdapter.parseNonStreamingResponse(response)
  }

  async streamResponse(
    client: OpenAI,
    request: LLMRequestStreaming,
    options?: LLMOptions,
  ): Promise<AsyncIterable<LLMResponseStreaming>> {
    const stream = await client.chat.completions.create(
      {
        model: request.model,
        messages: this.preprocessMessages(request.messages, request.model).map((m) =>
          DeepSeekMessageAdapter.parseRequestMessage(m),
        ),
        max_completion_tokens: request.max_tokens,
        temperature: request.temperature,
        top_p: request.top_p,
        frequency_penalty: request.frequency_penalty,
        presence_penalty: request.presence_penalty,
        logit_bias: request.logit_bias,
        stream: true,
        stream_options: {
          include_usage: true,
        },
      },
      {
        signal: options?.signal,
      },
    )

    // eslint-disable-next-line no-inner-declarations
    async function* streamResponse(): AsyncIterable<LLMResponseStreaming> {
      for await (const chunk of stream) {
        yield DeepSeekMessageAdapter.parseStreamingResponseChunk(chunk)
      }
    }

    return streamResponse()
  }

  private preprocessMessages(messages: RequestMessage[], model: string): RequestMessage[] {
    const result: RequestMessage[] = []
    let lastRole: string | null = null

    // For deepseek-reasoner model, we need to ensure messages alternate between user and assistant
    const isReasoner = model.includes('deepseek-reasoner')

    for (const message of messages) {
      // Skip empty messages
      if (typeof message.content === 'string' && message.content.trim() === '') {
        continue
      }
      if (Array.isArray(message.content) && message.content.length === 0) {
        continue
      }

      // For reasoner model, ensure messages alternate between user and assistant
      if (isReasoner) {
        if (lastRole === message.role) {
          // If we have consecutive messages of the same role, add a dummy message from the other role
          if (message.role === 'user') {
            result.push({
              role: 'assistant',
              content: 'I understand.',
            })
          } else if (message.role === 'assistant') {
            result.push({
              role: 'user',
              content: 'Please continue.',
            })
          }
        }
      } else {
        // For non-reasoner models, merge consecutive messages from the same role
        if (lastRole === message.role) {
          const lastMessage = result[result.length - 1]
          if (typeof lastMessage.content === 'string' && typeof message.content === 'string') {
            lastMessage.content += '\n' + message.content
            continue
          }
        }
      }

      result.push(message)
      lastRole = message.role
    }

    return result
  }

  static parseRequestMessage(
    message: RequestMessage,
  ): ChatCompletionMessageParam {
    switch (message.role) {
      case 'user': {
        const content = Array.isArray(message.content)
          ? message.content.map((part): ChatCompletionContentPart => {
              switch (part.type) {
                case 'text':
                  return { type: 'text', text: part.text }
                case 'image_url':
                  return { type: 'image_url', image_url: part.image_url }
              }
            })
          : message.content
        return { role: 'user', content }
      }
      case 'assistant': {
        if (Array.isArray(message.content)) {
          throw new Error('Assistant message should be a string')
        }
        return { role: 'assistant', content: message.content }
      }
      case 'system': {
        if (Array.isArray(message.content)) {
          throw new Error('System message should be a string')
        }
        return { role: 'system', content: message.content }
      }
    }
  }

  static parseNonStreamingResponse(
    response: ChatCompletion,
  ): LLMResponseNonStreaming {
    return {
      id: response.id,
      choices: response.choices.map((choice) => ({
        finish_reason: choice.finish_reason,
        message: {
          content: choice.message.content,
          role: choice.message.role,
        },
      })),
      created: response.created,
      model: response.model,
      object: 'chat.completion',
      system_fingerprint: response.system_fingerprint,
      usage: response.usage,
    }
  }

  static parseStreamingResponseChunk(
    chunk: ChatCompletionChunk,
  ): LLMResponseStreaming {
    return {
      id: chunk.id,
      choices: chunk.choices.map((choice) => ({
        finish_reason: choice.finish_reason ?? null,
        delta: {
          content: choice.delta.content ?? null,
          role: choice.delta.role,
        },
      })),
      created: chunk.created,
      model: chunk.model,
      object: 'chat.completion.chunk',
      system_fingerprint: chunk.system_fingerprint,
      usage: chunk.usage ?? undefined,
    }
  }
} 