export const zh = {
  settings: {
    language: {
      title: '语言',
      description: '选择界面语言',
      options: {
        en: '英文',
        zh: '中文'
      }
    },
    apiKeys: {
      title: 'API 密钥',
      description: '输入你想使用的服务的 API 密钥',
      howToObtain: '如何获取 API 密钥',
      openai: 'OpenAI API 密钥',
      anthropic: 'Anthropic API 密钥',
      gemini: 'Gemini API 密钥',
      groq: 'Groq API 密钥',
      deepseek: 'DeepSeek API 密钥',
      placeholder: '输入你的 API 密钥'
    },
    model: {
      title: '模型',
      chat: {
        title: '聊天模型',
        description: '选择你想用于聊天的模型'
      },
      apply: {
        title: '应用模型',
        description: '选择你想用于应用更改的模型'
      },
      embedding: {
        title: '嵌入模型',
        description: '选择你想用于嵌入的模型'
      }
    },
    ollama: {
      baseUrl: {
        title: '基础 URL',
        description: '你的 Ollama 服务的 API 端点（例如：http://127.0.0.1:11434）',
        placeholder: 'http://127.0.0.1:11434'
      },
      model: {
        title: '模型名称',
        description: '从你的 Ollama 实例中选择一个模型'
      }
    },
    openaiCompatible: {
      baseUrl: {
        title: '基础 URL',
        description: '你的 OpenAI 兼容服务的 API 端点（例如：https://api.example.com/v1）',
        placeholder: 'https://api.example.com/v1'
      },
      apiKey: {
        title: 'API 密钥',
        description: '你的 OpenAI 兼容服务的认证密钥',
        placeholder: '输入你的 API 密钥'
      },
      model: {
        title: '模型名称',
        description: '使用的具体模型（例如：llama-3.1-70b, mixtral-8x7b）',
        placeholder: 'llama-3.1-70b'
      }
    },
    systemPrompt: {
      title: '系统提示词',
      description: '这个提示词会被添加到每个聊天的开头。'
    },
    rag: {
      title: 'RAG',
      includePatterns: {
        title: '包含模式',
        description: '如果指定了任何模式，只有匹配至少一个模式的文件会被包含在索引中。每行一个模式。使用 glob 模式（例如："notes/*", "*.md"）。留空则包含所有未被排除模式排除的文件。更改后，请使用"重建整个库索引"命令来应用更改。',
        testButton: '测试模式'
      },
      excludePatterns: {
        title: '排除模式',
        description: '匹配任何这些模式的文件将被排除在索引之外。每行一个模式。使用 glob 模式（例如："private/*", "*.tmp"）。留空则不排除任何文件。更改后，请使用"重建整个库索引"命令来应用更改。',
        testButton: '测试模式'
      },
      chunkSize: {
        title: '块大小',
        description: '设置文本分割的块大小。更改后，请使用"重建整个库索引"命令重新索引库。',
        placeholder: '1000'
      },
      thresholdTokens: {
        title: '阈值令牌数',
        description: '切换到 RAG 之前的最大令牌数。如果提到的文件的总令牌数超过此值，将使用 RAG 而不是包含所有文件内容。',
        placeholder: '8192'
      },
      minSimilarity: {
        title: '最小相似度',
        description: 'RAG 结果的最小相似度分数。较高的值返回更相关但可能更少的结果。',
        placeholder: '0.0'
      },
      limit: {
        title: '限制',
        description: '在提示中包含的 RAG 结果的最大数量。较高的值提供更多上下文但增加令牌使用量。',
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