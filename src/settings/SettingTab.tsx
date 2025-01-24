import {
  App,
  DropdownComponent,
  Modal,
  PluginSettingTab,
  Setting,
  TFile,
} from 'obsidian'

import {
  APPLY_MODEL_OPTIONS,
  CHAT_MODEL_OPTIONS,
  EMBEDDING_MODEL_OPTIONS,
} from '../constants'
import SmartCopilotPlugin from '../main'
import { findFilesMatchingPatterns } from '../utils/globUtils'
import { getOllamaModels } from '../utils/ollama'

export class SmartCopilotSettingTab extends PluginSettingTab {
  plugin: SmartCopilotPlugin

  constructor(app: App, plugin: SmartCopilotPlugin) {
    super(app, plugin)
    this.plugin = plugin
  }

  display(): void {
    const { containerEl } = this
    containerEl.empty()

    this.renderAPIKeysSection(containerEl)
    this.renderLanguageSection(containerEl)
    this.renderAPIKeysSection(containerEl)
    this.renderModelSection(containerEl)
    this.renderRAGSection(containerEl)
  }

  renderAPIKeysSection(containerEl: HTMLElement): void {
    const apiKeysHeading = new Setting(containerEl)
      .setHeading()
      .setName(this.plugin.t('settings.apiKeys.title'))
      .setDesc(this.plugin.t('settings.apiKeys.description'))

    apiKeysHeading.descEl.createEl('br')

    apiKeysHeading.descEl.createEl('a', {
      text: this.plugin.t('settings.apiKeys.howToObtain'),
      attr: {
        href: 'https://github.com/glowingjade/obsidian-smart-composer/wiki/1.2-Initial-Setup#getting-your-api-key',
        target: '_blank',
      },
    })

    new Setting(containerEl)
      .setName(this.plugin.t('settings.apiKeys.openai'))
      .addText((text) =>
        text
          .setPlaceholder(this.plugin.t('settings.apiKeys.placeholder'))
          .setValue(this.plugin.settings.openAIApiKey)
          .onChange(async (value) => {
            await this.plugin.setSettings({
              ...this.plugin.settings,
              openAIApiKey: value,
            })
          }),
      )

    new Setting(containerEl)
      .setName(this.plugin.t('settings.apiKeys.anthropic'))
      .addText((text) =>
        text
          .setPlaceholder(this.plugin.t('settings.apiKeys.placeholder'))
          .setValue(this.plugin.settings.anthropicApiKey)
          .onChange(async (value) => {
            await this.plugin.setSettings({
              ...this.plugin.settings,
              anthropicApiKey: value,
            })
          }),
      )

    new Setting(containerEl)
      .setName(this.plugin.t('settings.apiKeys.gemini'))
      .addText((text) =>
        text
          .setPlaceholder(this.plugin.t('settings.apiKeys.placeholder'))
          .setValue(this.plugin.settings.geminiApiKey)
          .onChange(async (value) => {
            await this.plugin.setSettings({
              ...this.plugin.settings,
              geminiApiKey: value,
            })
          }),
      )

    new Setting(containerEl)
      .setName(this.plugin.t('settings.apiKeys.groq'))
      .addText((text) =>
        text
          .setPlaceholder(this.plugin.t('settings.apiKeys.placeholder'))
          .setValue(this.plugin.settings.groqApiKey)
          .onChange(async (value) => {
            await this.plugin.setSettings({
              ...this.plugin.settings,
              groqApiKey: value,
            })
          }),
      )

    new Setting(containerEl)
      .setName(this.plugin.t('settings.apiKeys.deepseek'))
      .addText((text) =>
        text
          .setPlaceholder(this.plugin.t('settings.apiKeys.placeholder'))
          .setValue(this.plugin.settings.deepseekApiKey)
          .onChange(async (value) => {
            await this.plugin.setSettings({
              ...this.plugin.settings,
              deepseekApiKey: value,
            })
          }),
      )
  }

  renderLanguageSection(containerEl: HTMLElement): void {
    new Setting(containerEl)
      .setHeading()
      .setName(this.plugin.t('settings.language.title'))
      .setDesc(this.plugin.t('settings.language.description'))

    containerEl.createEl('hr')

    new Setting(containerEl)
      .addDropdown((dropdown) =>
        dropdown
          .addOptions({
            'en': this.plugin.t('settings.language.options.en'),
            'zh': this.plugin.t('settings.language.options.zh'),
          })
          .setValue(this.plugin.settings.language || 'en')
          .onChange(async (value) => {
            await this.plugin.setSettings({
              ...this.plugin.settings,
              language: value as 'en' | 'zh',
            })
            // Force refresh to update all translations
            this.display()
          }),
      )
  }

  renderModelSection(containerEl: HTMLElement): void {
    new Setting(containerEl)
      .setHeading()
      .setName(this.plugin.t('settings.model.title'))

    new Setting(containerEl)
      .setName(this.plugin.t('settings.model.chat.title'))
      .setDesc(this.plugin.t('settings.model.chat.description'))
      .addDropdown((dropdown) =>
        dropdown
          .addOptions(
            CHAT_MODEL_OPTIONS.reduce<Record<string, string>>((acc, option) => {
              acc[option.id] = option.name
              return acc
            }, {}),
          )
          .setValue(this.plugin.settings.chatModelId)
          .onChange(async (value) => {
            await this.plugin.setSettings({
              ...this.plugin.settings,
              chatModelId: value,
            })
            // Force refresh to show/hide Ollama and OpenAI-compatible settings
            this.display()
          }),
      )
    if (this.plugin.settings.chatModelId === 'ollama') {
      this.renderOllamaChatModelSettings(containerEl)
    }
    if (this.plugin.settings.chatModelId === 'openai-compatible') {
      this.renderOpenAICompatibleChatModelSettings(containerEl)
    }

    new Setting(containerEl)
      .setName(this.plugin.t('settings.model.apply.title'))
      .setDesc(this.plugin.t('settings.model.apply.description'))
      .addDropdown((dropdown) =>
        dropdown
          .addOptions(
            APPLY_MODEL_OPTIONS.reduce<Record<string, string>>(
              (acc, option) => {
                acc[option.id] = option.name
                return acc
              },
              {},
            ),
          )
          .setValue(this.plugin.settings.applyModelId)
          .onChange(async (value) => {
            await this.plugin.setSettings({
              ...this.plugin.settings,
              applyModelId: value,
            })
            // Force refresh to show/hide Ollama and OpenAI-compatible settings
            this.display()
          }),
      )
    if (this.plugin.settings.applyModelId === 'ollama') {
      this.renderOllamaApplyModelSettings(containerEl)
    }
    if (this.plugin.settings.applyModelId === 'openai-compatible') {
      this.renderOpenAICompatibleApplyModelSettings(containerEl)
    }

    new Setting(containerEl)
      .setName(this.plugin.t('settings.model.embedding.title'))
      .setDesc(this.plugin.t('settings.model.embedding.description'))
      .addDropdown((dropdown) =>
        dropdown
          .addOptions(
            EMBEDDING_MODEL_OPTIONS.reduce<Record<string, string>>(
              (acc, option) => {
                acc[option.id] = option.name
                return acc
              },
              {},
            ),
          )
          .setValue(this.plugin.settings.embeddingModelId)
          .onChange(async (value) => {
            await this.plugin.setSettings({
              ...this.plugin.settings,
              embeddingModelId: value,
            })
            // Force refresh to show/hide Ollama settings
            this.display()
          }),
      )
    if (this.plugin.settings.embeddingModelId.startsWith('ollama/')) {
      this.renderOllamaEmbeddingModelSettings(containerEl)
    }

    new Setting(containerEl)
      .setHeading()
      .setName(this.plugin.t('settings.systemPrompt.title'))
      .setDesc(this.plugin.t('settings.systemPrompt.description'))

    new Setting(containerEl)
      .setClass('smtcmp-settings-textarea')
      .addTextArea((text) =>
        text
          .setValue(this.plugin.settings.systemPrompt)
          .onChange(async (value) => {
            await this.plugin.setSettings({
              ...this.plugin.settings,
              systemPrompt: value,
            })
          }),
      )
  }

  renderOllamaChatModelSettings(containerEl: HTMLElement): void {
    const ollamaContainer = containerEl.createDiv(
      'smtcmp-settings-model-container',
    )
    let modelDropdown: DropdownComponent | null = null

    new Setting(ollamaContainer)
      .setName(this.plugin.t('settings.ollama.baseUrl.title'))
      .setDesc(this.plugin.t('settings.ollama.baseUrl.description'))
      .addText((text) => {
        text
          .setPlaceholder(this.plugin.t('settings.ollama.baseUrl.placeholder'))
          .setValue(this.plugin.settings.ollamaChatModel.baseUrl || '')
          .onChange(async (value) => {
            await this.plugin.setSettings({
              ...this.plugin.settings,
              ollamaChatModel: {
                ...this.plugin.settings.ollamaChatModel,
                baseUrl: value,
              },
            })
            if (modelDropdown) {
              await this.updateOllamaModelOptions({
                baseUrl: value,
                dropdown: modelDropdown,
                onModelChange: async (model: string) => {
                  await this.plugin.setSettings({
                    ...this.plugin.settings,
                    ollamaChatModel: {
                      ...this.plugin.settings.ollamaChatModel,
                      model,
                    },
                  })
                },
              })
            }
          })
      })

    new Setting(ollamaContainer)
      .setName(this.plugin.t('settings.ollama.model.title'))
      .setDesc(this.plugin.t('settings.ollama.model.description'))
      .addDropdown(async (dropdown) => {
        const currentModel = this.plugin.settings.ollamaChatModel.model
        modelDropdown = dropdown
          .addOption(currentModel, currentModel)
          .setValue(currentModel)
        await this.updateOllamaModelOptions({
          baseUrl: this.plugin.settings.ollamaChatModel.baseUrl,
          dropdown,
          onModelChange: async (model: string) => {
            await this.plugin.setSettings({
              ...this.plugin.settings,
              ollamaChatModel: {
                ...this.plugin.settings.ollamaChatModel,
                model,
              },
            })
          },
        })
      })
  }

  renderOpenAICompatibleChatModelSettings(containerEl: HTMLElement): void {
    const openAICompatContainer = containerEl.createDiv(
      'smtcmp-settings-model-container',
    )

    new Setting(openAICompatContainer)
      .setName(this.plugin.t('settings.openaiCompatible.baseUrl.title'))
      .setDesc(this.plugin.t('settings.openaiCompatible.baseUrl.description'))
      .addText((text) =>
        text
          .setPlaceholder(this.plugin.t('settings.openaiCompatible.baseUrl.placeholder'))
          .setValue(
            this.plugin.settings.openAICompatibleChatModel.baseUrl || '',
          )
          .onChange(async (value) => {
            await this.plugin.setSettings({
              ...this.plugin.settings,
              openAICompatibleChatModel: {
                ...this.plugin.settings.openAICompatibleChatModel,
                baseUrl: value,
              },
            })
          }),
      )

    new Setting(openAICompatContainer)
      .setName(this.plugin.t('settings.openaiCompatible.apiKey.title'))
      .setDesc(this.plugin.t('settings.openaiCompatible.apiKey.description'))
      .addText((text) =>
        text
          .setPlaceholder(this.plugin.t('settings.openaiCompatible.apiKey.placeholder'))
          .setValue(this.plugin.settings.openAICompatibleChatModel.apiKey || '')
          .onChange(async (value) => {
            await this.plugin.setSettings({
              ...this.plugin.settings,
              openAICompatibleChatModel: {
                ...this.plugin.settings.openAICompatibleChatModel,
                apiKey: value,
              },
            })
          }),
      )

    new Setting(openAICompatContainer)
      .setName(this.plugin.t('settings.openaiCompatible.model.title'))
      .setDesc(this.plugin.t('settings.openaiCompatible.model.description'))
      .addText((text) =>
        text
          .setPlaceholder(this.plugin.t('settings.openaiCompatible.model.placeholder'))
          .setValue(this.plugin.settings.openAICompatibleChatModel.model || '')
          .onChange(async (value) => {
            await this.plugin.setSettings({
              ...this.plugin.settings,
              openAICompatibleChatModel: {
                ...this.plugin.settings.openAICompatibleChatModel,
                model: value,
              },
            })
          }),
      )
  }

  renderOllamaApplyModelSettings(containerEl: HTMLElement): void {
    const ollamaContainer = containerEl.createDiv(
      'smtcmp-settings-model-container',
    )
    let modelDropdown: DropdownComponent | null = null

    new Setting(ollamaContainer)
      .setName(this.plugin.t('settings.ollama.baseUrl.title'))
      .setDesc(this.plugin.t('settings.ollama.baseUrl.description'))
      .addText((text) => {
        text
          .setPlaceholder(this.plugin.t('settings.ollama.baseUrl.placeholder'))
          .setValue(this.plugin.settings.ollamaApplyModel.baseUrl || '')
          .onChange(async (value) => {
            await this.plugin.setSettings({
              ...this.plugin.settings,
              ollamaApplyModel: {
                ...this.plugin.settings.ollamaApplyModel,
                baseUrl: value,
              },
            })
            if (modelDropdown) {
              await this.updateOllamaModelOptions({
                baseUrl: value,
                dropdown: modelDropdown,
                onModelChange: async (model: string) => {
                  await this.plugin.setSettings({
                    ...this.plugin.settings,
                    ollamaApplyModel: {
                      ...this.plugin.settings.ollamaApplyModel,
                      model,
                    },
                  })
                },
              })
            }
          })
      })

    new Setting(ollamaContainer)
      .setName(this.plugin.t('settings.ollama.model.title'))
      .setDesc(this.plugin.t('settings.ollama.model.description'))
      .addDropdown(async (dropdown) => {
        const currentModel = this.plugin.settings.ollamaApplyModel.model
        modelDropdown = dropdown
          .addOption(currentModel, currentModel)
          .setValue(currentModel)
        await this.updateOllamaModelOptions({
          baseUrl: this.plugin.settings.ollamaApplyModel.baseUrl,
          dropdown,
          onModelChange: async (model: string) => {
            await this.plugin.setSettings({
              ...this.plugin.settings,
              ollamaApplyModel: {
                ...this.plugin.settings.ollamaApplyModel,
                model,
              },
            })
          },
        })
      })
  }

  renderOpenAICompatibleApplyModelSettings(containerEl: HTMLElement): void {
    const openAICompatContainer = containerEl.createDiv(
      'smtcmp-settings-model-container',
    )

    new Setting(openAICompatContainer)
      .setName(this.plugin.t('settings.openaiCompatible.baseUrl.title'))
      .setDesc(this.plugin.t('settings.openaiCompatible.baseUrl.description'))
      .addText((text) =>
        text
          .setPlaceholder(this.plugin.t('settings.openaiCompatible.baseUrl.placeholder'))
          .setValue(
            this.plugin.settings.openAICompatibleApplyModel.baseUrl || '',
          )
          .onChange(async (value) => {
            await this.plugin.setSettings({
              ...this.plugin.settings,
              openAICompatibleApplyModel: {
                ...this.plugin.settings.openAICompatibleApplyModel,
                baseUrl: value,
              },
            })
          }),
      )

    new Setting(openAICompatContainer)
      .setName(this.plugin.t('settings.openaiCompatible.apiKey.title'))
      .setDesc(this.plugin.t('settings.openaiCompatible.apiKey.description'))
      .addText((text) =>
        text
          .setPlaceholder(this.plugin.t('settings.openaiCompatible.apiKey.placeholder'))
          .setValue(
            this.plugin.settings.openAICompatibleApplyModel.apiKey || '',
          )
          .onChange(async (value) => {
            await this.plugin.setSettings({
              ...this.plugin.settings,
              openAICompatibleApplyModel: {
                ...this.plugin.settings.openAICompatibleApplyModel,
                apiKey: value,
              },
            })
          }),
      )

    new Setting(openAICompatContainer)
      .setName(this.plugin.t('settings.openaiCompatible.model.title'))
      .setDesc(this.plugin.t('settings.openaiCompatible.model.description'))
      .addText((text) =>
        text
          .setPlaceholder(this.plugin.t('settings.openaiCompatible.model.placeholder'))
          .setValue(this.plugin.settings.openAICompatibleApplyModel.model || '')
          .onChange(async (value) => {
            await this.plugin.setSettings({
              ...this.plugin.settings,
              openAICompatibleApplyModel: {
                ...this.plugin.settings.openAICompatibleApplyModel,
                model: value,
              },
            })
          }),
      )
  }

  renderOllamaEmbeddingModelSettings(containerEl: HTMLElement): void {
    const ollamaContainer = containerEl.createDiv(
      'smtcmp-settings-model-container',
    )

    new Setting(ollamaContainer)
      .setName(this.plugin.t('settings.ollama.baseUrl.title'))
      .setDesc(this.plugin.t('settings.ollama.baseUrl.description'))
      .addText((text) =>
        text
          .setPlaceholder(this.plugin.t('settings.ollama.baseUrl.placeholder'))
          .setValue(this.plugin.settings.ollamaEmbeddingModel.baseUrl || '')
          .onChange(async (value) => {
            await this.plugin.setSettings({
              ...this.plugin.settings,
              ollamaEmbeddingModel: {
                ...this.plugin.settings.ollamaEmbeddingModel,
                baseUrl: value,
              },
            })
          }),
      )
  }

  renderRAGSection(containerEl: HTMLElement): void {
    new Setting(containerEl).setHeading().setName(this.plugin.t('settings.rag.title'))

    new Setting(containerEl)
      .setName(this.plugin.t('settings.rag.includePatterns.title'))
      .setDesc(this.plugin.t('settings.rag.includePatterns.description'))
      .addButton((button) =>
        button.setButtonText(this.plugin.t('settings.rag.includePatterns.testButton')).onClick(async () => {
          const patterns = this.plugin.settings.ragOptions.includePatterns
          const includedFiles = await findFilesMatchingPatterns(
            patterns,
            this.plugin.app.vault,
          )
          new IncludedFilesModal(this.app, includedFiles, patterns).open()
        }),
      )
    new Setting(containerEl)
      .setClass('smtcmp-settings-textarea')
      .addTextArea((text) =>
        text
          .setValue(this.plugin.settings.ragOptions.includePatterns.join('\n'))
          .onChange(async (value) => {
            const patterns = value
              .split('\n')
              .map((p) => p.trim())
              .filter((p) => p.length > 0)
            await this.plugin.setSettings({
              ...this.plugin.settings,
              ragOptions: {
                ...this.plugin.settings.ragOptions,
                includePatterns: patterns,
              },
            })
          }),
      )

    new Setting(containerEl)
      .setName(this.plugin.t('settings.rag.excludePatterns.title'))
      .setDesc(this.plugin.t('settings.rag.excludePatterns.description'))
      .addButton((button) =>
        button.setButtonText(this.plugin.t('settings.rag.excludePatterns.testButton')).onClick(async () => {
          const patterns = this.plugin.settings.ragOptions.excludePatterns
          const excludedFiles = await findFilesMatchingPatterns(
            patterns,
            this.plugin.app.vault,
          )
          new ExcludedFilesModal(this.app, excludedFiles).open()
        }),
      )
    new Setting(containerEl)
      .setClass('smtcmp-settings-textarea')
      .addTextArea((text) =>
        text
          .setValue(this.plugin.settings.ragOptions.excludePatterns.join('\n'))
          .onChange(async (value) => {
            const patterns = value
              .split('\n')
              .map((p) => p.trim())
              .filter((p) => p.length > 0)
            await this.plugin.setSettings({
              ...this.plugin.settings,
              ragOptions: {
                ...this.plugin.settings.ragOptions,
                excludePatterns: patterns,
              },
            })
          }),
      )

    new Setting(containerEl)
      .setName(this.plugin.t('settings.rag.chunkSize.title'))
      .setDesc(this.plugin.t('settings.rag.chunkSize.description'))
      .addText((text) =>
        text
          .setPlaceholder(this.plugin.t('settings.rag.chunkSize.placeholder'))
          .setValue(String(this.plugin.settings.ragOptions.chunkSize))
          .onChange(async (value) => {
            const chunkSize = parseInt(value, 10)
            if (!isNaN(chunkSize)) {
              await this.plugin.setSettings({
                ...this.plugin.settings,
                ragOptions: {
                  ...this.plugin.settings.ragOptions,
                  chunkSize,
                },
              })
            }
          }),
      )

    new Setting(containerEl)
      .setName(this.plugin.t('settings.rag.thresholdTokens.title'))
      .setDesc(this.plugin.t('settings.rag.thresholdTokens.description'))
      .addText((text) =>
        text
          .setPlaceholder(this.plugin.t('settings.rag.thresholdTokens.placeholder'))
          .setValue(String(this.plugin.settings.ragOptions.thresholdTokens))
          .onChange(async (value) => {
            const thresholdTokens = parseInt(value, 10)
            if (!isNaN(thresholdTokens)) {
              await this.plugin.setSettings({
                ...this.plugin.settings,
                ragOptions: {
                  ...this.plugin.settings.ragOptions,
                  thresholdTokens,
                },
              })
            }
          }),
      )

    new Setting(containerEl)
      .setName(this.plugin.t('settings.rag.minSimilarity.title'))
      .setDesc(this.plugin.t('settings.rag.minSimilarity.description'))
      .addText((text) =>
        text
          .setPlaceholder(this.plugin.t('settings.rag.minSimilarity.placeholder'))
          .setValue(String(this.plugin.settings.ragOptions.minSimilarity))
          .onChange(async (value) => {
            const minSimilarity = parseFloat(value)
            if (!isNaN(minSimilarity)) {
              await this.plugin.setSettings({
                ...this.plugin.settings,
                ragOptions: {
                  ...this.plugin.settings.ragOptions,
                  minSimilarity,
                },
              })
            }
          }),
      )

    new Setting(containerEl)
      .setName(this.plugin.t('settings.rag.limit.title'))
      .setDesc(this.plugin.t('settings.rag.limit.description'))
      .addText((text) =>
        text
          .setPlaceholder(this.plugin.t('settings.rag.limit.placeholder'))
          .setValue(String(this.plugin.settings.ragOptions.limit))
          .onChange(async (value) => {
            const limit = parseInt(value, 10)
            if (!isNaN(limit)) {
              await this.plugin.setSettings({
                ...this.plugin.settings,
                ragOptions: {
                  ...this.plugin.settings.ragOptions,
                  limit,
                },
              })
            }
          }),
      )
  }

  private async updateOllamaModelOptions({
    baseUrl,
    dropdown,
    onModelChange,
  }: {
    baseUrl: string
    dropdown: DropdownComponent
    onModelChange: (model: string) => Promise<void>
  }): Promise<void> {
    const currentValue = dropdown.getValue()
    dropdown.selectEl.empty()

    try {
      const models = await getOllamaModels(baseUrl)
      if (models.length > 0) {
        const modelOptions = models.reduce<Record<string, string>>(
          (acc, model) => {
            acc[model] = model
            return acc
          },
          {},
        )

        dropdown.addOptions(modelOptions)

        if (models.includes(currentValue)) {
          dropdown.setValue(currentValue)
        } else {
          dropdown.setValue(models[0])
          await onModelChange(models[0])
        }
      } else {
        dropdown.addOption('', 'No models found - check base URL')
        dropdown.setValue('')
        await onModelChange('')
      }
    } catch (error) {
      console.error('Failed to fetch Ollama models:', error)
      dropdown.addOption('', 'No models found - check base URL')
      dropdown.setValue('')
      await onModelChange('')
    }

    dropdown.onChange(async (value) => {
      await onModelChange(value)
    })
  }
}

class ExcludedFilesModal extends Modal {
  private files: TFile[]

  constructor(app: App, files: TFile[]) {
    super(app)
    this.files = files
  }

  onOpen() {
    const { contentEl } = this
    contentEl.empty()

    this.titleEl.setText(`Excluded Files (${this.files.length})`)

    if (this.files.length === 0) {
      contentEl.createEl('p', { text: 'No files match the exclusion patterns' })
      return
    }

    const list = contentEl.createEl('ul')
    this.files.forEach((file) => {
      list.createEl('li', { text: file.path })
    })
  }

  onClose() {
    const { contentEl } = this
    contentEl.empty()
  }
}

class IncludedFilesModal extends Modal {
  private files: TFile[]
  private patterns: string[]

  constructor(app: App, files: TFile[], patterns: string[]) {
    super(app)
    this.files = files
    this.patterns = patterns
  }

  onOpen() {
    const { contentEl } = this
    contentEl.empty()

    this.titleEl.setText(`Included Files (${this.files.length})`)

    if (this.patterns.length === 0) {
      contentEl.createEl('p', {
        text: 'No inclusion patterns specified - all files will be included (except those matching exclusion patterns)',
      })
      return
    }

    if (this.files.length === 0) {
      contentEl.createEl('p', {
        text: 'No files match the inclusion patterns',
      })
      return
    }

    const list = contentEl.createEl('ul')
    this.files.forEach((file) => {
      list.createEl('li', { text: file.path })
    })
  }

  onClose() {
    const { contentEl } = this
    contentEl.empty()
  }
}
