export const zh = {
  settings: {
    language: {
      title: '界面语言',
      description: '选择插件界面显示的语言',
      options: {
        en: '英文',
        zh: '中文'
      }
    },
    apiKeys: {
      title: 'API 密钥设置',
      description: '配置各个 AI 服务所需的 API 密钥',
      howToObtain: '如何获取 API 密钥',
      openai: 'OpenAI API 密钥',
      anthropic: 'Anthropic API 密钥',
      gemini: 'Gemini API 密钥',
      groq: 'Groq API 密钥',
      deepseek: 'DeepSeek API 密钥',
      placeholder: '在此输入 API 密钥'
    },
    model: {
      title: '模型设置',
      chat: {
        title: '对话模型',
        description: '选择用于对话功能的 AI 模型'
      },
      apply: {
        title: '应用模型',
        description: '选择用于应用更改的 AI 模型'
      },
      embedding: {
        title: '嵌入模型',
        description: '选择用于文本嵌入的 AI 模型'
      }
    },
    ollama: {
      baseUrl: {
        title: 'Ollama 服务地址',
        description: '设置 Ollama 服务的 API 地址（例如：http://127.0.0.1:11434）',
        placeholder: 'http://127.0.0.1:11434'
      },
      model: {
        title: 'Ollama 模型',
        description: '选择要使用的 Ollama 本地模型'
      }
    },
    openaiCompatible: {
      baseUrl: {
        title: 'OpenAI 兼容服务地址',
        description: '设置 OpenAI 兼容服务的 API 地址（例如：https://api.example.com/v1）',
        placeholder: 'https://api.example.com/v1'
      },
      apiKey: {
        title: '服务密钥',
        description: '输入 OpenAI 兼容服务的认证密钥',
        placeholder: '在此输入服务密钥'
      },
      model: {
        title: '模型名称',
        description: '输入要使用的具体模型名称（例如：llama-3.1-70b, mixtral-8x7b）',
        placeholder: 'llama-3.1-70b'
      }
    },
    systemPrompt: {
      title: '系统提示词',
      description: '设置默认的系统提示词，将添加到每个对话的开头'
    },
    rag: {
      title: '知识检索设置 (RAG)',
      includePatterns: {
        title: '包含文件模式',
        description: '设置要包含在索引中的文件模式。每行一个，支持 glob 格式（如："notes/*", "*.md"）。留空则包含所有未被排除的文件。修改后需要重建索引。',
        testButton: '测试模式'
      },
      excludePatterns: {
        title: '排除文件模式',
        description: '设置要排除的文件模式。每行一个，支持 glob 格式（如："private/*", "*.tmp"）。留空则不排除任何文件。修改后需要重建索引。',
        testButton: '测试模式'
      },
      chunkSize: {
        title: '文本分块大小',
        description: '设置文本分割时的块大小。修改后需要重建索引。',
        placeholder: '1000'
      },
      thresholdTokens: {
        title: '令牌数阈值',
        description: '设置切换到 RAG 模式的令牌数阈值。当引用文件的总令牌数超过此值时，将使用 RAG 而不是全文引用。',
        placeholder: '8192'
      },
      minSimilarity: {
        title: '最小相似度',
        description: '设置 RAG 检索结果的最小相似度分数。较高的值会返回更相关但可能更少的结果。',
        placeholder: '0.0'
      },
      limit: {
        title: '检索结果数量',
        description: '设置在提示中包含的最大检索结果数量。较多的结果提供更多上下文但会增加令牌使用量。',
        placeholder: '10'
      }
    }
  },
  chat: {
    title: '聊天',
    newChat: '新建聊天',
    stopGeneration: '停止生成',
    errors: {
      apiKeyMissing: 'API 密钥缺失。请在设置菜单中设置。',
      apiKeyInvalid: 'API 密钥无效。请在设置菜单中更新。',
      baseUrlMissing: '基础 URL 缺失。请在设置菜单中设置。',
      modelMissing: '模型未设置。请在设置菜单中选择一个模型。',
      failedToLoad: '加载对话失败',
      failedToSave: '保存聊天历史失败',
      failedToGenerate: '生成响应失败',
      noFileOpen: '当前没有打开的文件来应用更改。请打开一个文件并重试。',
      failedToApply: '应用更改失败'
    }
  },
  apply: {
    title: '正在应用: {filename}',
    accept: '接受',
    reject: '拒绝',
    acceptLine: '接受此行',
    excludeLine: '排除此行'
  }
} 