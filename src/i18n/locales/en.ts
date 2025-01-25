export const en = {
  settings: {
    language: {
      title: 'Interface Language',
      description: 'Choose the display language for the plugin interface',
      options: {
        en: 'English',
        zh: 'Chinese'
      }
    },
    apiKeys: {
      title: 'API Keys',
      description: 'Configure API keys for various AI services',
      howToObtain: 'How to obtain API keys',
      openai: 'OpenAI API Key',
      anthropic: 'Anthropic API Key',
      gemini: 'Gemini API Key',
      groq: 'Groq API Key',
      deepseek: 'DeepSeek API Key',
      placeholder: 'Enter your API key here'
    },
    model: {
      title: 'Model Settings',
      chat: {
        title: 'Chat Model',
        description: 'Select the AI model to use for chat functionality'
      },
      apply: {
        title: 'Apply Model',
        description: 'Select the AI model to use for applying changes'
      },
      embedding: {
        title: 'Embedding Model',
        description: 'Select the AI model to use for text embeddings'
      }
    },
    ollama: {
      baseUrl: {
        title: 'Ollama Service URL',
        description: 'Set the API endpoint for your Ollama service (e.g., http://127.0.0.1:11434)',
        placeholder: 'http://127.0.0.1:11434'
      },
      model: {
        title: 'Ollama Model',
        description: 'Select a local model from your Ollama instance'
      }
    },
    openaiCompatible: {
      baseUrl: {
        title: 'OpenAI Compatible Service URL',
        description: 'Set the API endpoint for your OpenAI-compatible service (e.g., https://api.example.com/v1)',
        placeholder: 'https://api.example.com/v1'
      },
      apiKey: {
        title: 'Service Key',
        description: 'Enter the authentication key for your OpenAI-compatible service',
        placeholder: 'Enter your service key here'
      },
      model: {
        title: 'Model Name',
        description: 'Enter the specific model name to use (e.g., llama-3.1-70b, mixtral-8x7b)',
        placeholder: 'llama-3.1-70b'
      }
    },
    systemPrompt: {
      title: 'System Prompt',
      description: 'Set the default system prompt that will be added to the beginning of each chat'
    },
    rag: {
      title: 'Knowledge Retrieval (RAG)',
      includePatterns: {
        title: 'Include File Patterns',
        description: 'Set patterns for files to include in indexing. One per line, using glob format (e.g., "notes/*", "*.md"). Leave empty to include all files not excluded. Requires reindexing after changes.',
        testButton: 'Test Patterns'
      },
      excludePatterns: {
        title: 'Exclude File Patterns',
        description: 'Set patterns for files to exclude from indexing. One per line, using glob format (e.g., "private/*", "*.tmp"). Leave empty to exclude nothing. Requires reindexing after changes.',
        testButton: 'Test Patterns'
      },
      chunkSize: {
        title: 'Text Chunk Size',
        description: 'Set the chunk size for text splitting. Requires reindexing after changes.',
        placeholder: '1000'
      },
      thresholdTokens: {
        title: 'Token Threshold',
        description: 'Set the token threshold for switching to RAG mode. RAG will be used instead of full content when referenced files exceed this token count.',
        placeholder: '8192'
      },
      minSimilarity: {
        title: 'Minimum Similarity',
        description: 'Set the minimum similarity score for RAG results. Higher values return more relevant but potentially fewer results.',
        placeholder: '0.0'
      },
      limit: {
        title: 'Result Limit',
        description: 'Set the maximum number of RAG results to include in prompts. More results provide more context but increase token usage.',
        placeholder: '10'
      }
    }
  },
  chat: {
    title: 'Chat',
    newChat: 'New Chat',
    stopGeneration: 'Stop Generation',
    thinkingProcess: 'Thinking Process',
    errors: {
      apiKeyMissing: 'API key is missing. Please set it in settings menu.',
      apiKeyInvalid: 'API key is invalid. Please update it in settings menu.',
      baseUrlMissing: 'Base URL is missing. Please set it in settings menu.',
      modelMissing: 'Model is not set. Please select a model in settings menu.',
      failedToLoad: 'Failed to load conversation',
      failedToSave: 'Failed to save chat history',
      failedToGenerate: 'Failed to generate response',
      noFileOpen: 'No file is currently open to apply changes. Please open a file and try again.',
      failedToApply: 'Failed to apply changes'
    }
  },
  apply: {
    title: 'Applying: {filename}',
    accept: 'Accept',
    reject: 'Reject',
    acceptLine: 'Accept line',
    excludeLine: 'Exclude line'
  }
} 