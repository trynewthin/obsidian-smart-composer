export const en = {
  settings: {
    language: {
      title: 'Language',
      description: 'Choose the language for the interface',
      options: {
        en: 'English',
        zh: 'Chinese'
      }
    },
    apiKeys: {
      title: 'API keys',
      description: 'Enter your API keys for the services you want to use',
      howToObtain: 'How to obtain API keys',
      openai: 'OpenAI API key',
      anthropic: 'Anthropic API key',
      gemini: 'Gemini API key',
      groq: 'Groq API key',
      deepseek: 'DeepSeek API key',
      placeholder: 'Enter your API key'
    },
    model: {
      title: 'Model',
      chat: {
        title: 'Chat model',
        description: 'Choose the model you want to use for chat'
      },
      apply: {
        title: 'Apply model',
        description: 'Choose the model you want to use for apply'
      },
      embedding: {
        title: 'Embedding model',
        description: 'Choose the model you want to use for embeddings'
      }
    },
    ollama: {
      baseUrl: {
        title: 'Base URL',
        description: 'The API endpoint for your Ollama service (e.g., http://127.0.0.1:11434)',
        placeholder: 'http://127.0.0.1:11434'
      },
      model: {
        title: 'Model Name',
        description: 'Select a model from your Ollama instance'
      }
    },
    openaiCompatible: {
      baseUrl: {
        title: 'Base URL',
        description: 'The API endpoint for your OpenAI-compatible service (e.g., https://api.example.com/v1)',
        placeholder: 'https://api.example.com/v1'
      },
      apiKey: {
        title: 'API Key',
        description: 'Your authentication key for the OpenAI-compatible service',
        placeholder: 'Enter your API key'
      },
      model: {
        title: 'Model Name',
        description: 'The specific model to use with your service (e.g., llama-3.1-70b, mixtral-8x7b)',
        placeholder: 'llama-3.1-70b'
      }
    },
    systemPrompt: {
      title: 'System prompt',
      description: 'This prompt will be added to the beginning of every chat.'
    },
    rag: {
      title: 'RAG',
      includePatterns: {
        title: 'Include patterns',
        description: 'If any patterns are specified, ONLY files matching at least one pattern will be included in indexing. One pattern per line. Uses glob patterns (e.g., "notes/*", "*.md"). Leave empty to include all files not excluded by exclude patterns. After changing this, use the command "Rebuild entire vault index" to apply changes.',
        testButton: 'Test patterns'
      },
      excludePatterns: {
        title: 'Exclude patterns',
        description: 'Files matching ANY of these patterns will be excluded from indexing. One pattern per line. Uses glob patterns (e.g., "private/*", "*.tmp"). Leave empty to exclude nothing. After changing this, use the command "Rebuild entire vault index" to apply changes.',
        testButton: 'Test patterns'
      },
      chunkSize: {
        title: 'Chunk size',
        description: 'Set the chunk size for text splitting. After changing this, please re-index the vault using the "Rebuild entire vault index" command.',
        placeholder: '1000'
      },
      thresholdTokens: {
        title: 'Threshold tokens',
        description: 'Maximum number of tokens before switching to RAG. If the total tokens from mentioned files exceed this, RAG will be used instead of including all file contents.',
        placeholder: '8192'
      },
      minSimilarity: {
        title: 'Minimum similarity',
        description: 'Minimum similarity score for RAG results. Higher values return more relevant but potentially fewer results.',
        placeholder: '0.0'
      },
      limit: {
        title: 'Limit',
        description: 'Maximum number of RAG results to include in the prompt. Higher values provide more context but increase token usage.',
        placeholder: '10'
      }
    }
  },
  chat: {
    title: 'Chat',
    newChat: 'New Chat',
    stopGeneration: 'Stop Generation',
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
    title: 'Applying: {filename}'
  }
} 