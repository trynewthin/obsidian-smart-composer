import { Editor, MarkdownView, Notice, Plugin } from 'obsidian'
import { RAGEngine } from './core/rag/ragEngine'
import { DatabaseManager } from './database/DatabaseManager'
import { SmartCopilotSettingTab } from './settings/SettingTab'
import {
  SmartCopilotSettings,
  parseSmartCopilotSettings,
} from './types/settings'
import { Language } from './i18n'
import { LanguageService } from './service/language_service'
import { ViewManager } from './service/view_manager'
import { CommandManager } from './service/command_manager'
import { SettingsManager } from './service/settings_manager'
import { DatabaseService } from './service/database_service'
import { RAGService } from './service/rag_service'

/**
 * SmartAssistant 插件的主类
 */
export default class SmartAssistant extends Plugin {
  /** 设置管理器实例 */
  settingsManager: SettingsManager

  /** 数据库服务实例 */
  databaseService: DatabaseService

  /** RAG 服务实例 */
  ragService: RAGService

  /** 语言服务实例 */
  languageService: LanguageService

  /** 视图管理器实例 */
  viewManager: ViewManager

  /** 命令管理器实例 */
  commandManager: CommandManager

  /**
   * 获取当前设置
   */
  get settings(): SmartCopilotSettings {
    return this.settingsManager.getSettings()
  }

  /**
   * 翻译指定的键值
   */
  t(key: string, params?: Record<string, string>): string {
    return this.languageService.translate(key, params)
  }

  /**
   * 设置插件语言
   */
  async setLanguage(lang: Language) {
    await this.languageService.setLanguage(lang)
  }

  async onload() {
    // 初始化设置管理器
    this.settingsManager = new SettingsManager(this.app, this)
    await this.settingsManager.loadSettings()

    // 初始化数据库服务
    this.databaseService = new DatabaseService(this.app, this)

    // 初始化 RAG 服务
    this.ragService = new RAGService(this.app, this, this.databaseService)

    // 初始化语言服务
    this.languageService = new LanguageService(
      this.app,
      this.settings,
      async (settings) => await this.settingsManager.saveSettings(settings)
    )

    // 初始化视图管理器
    this.viewManager = new ViewManager(this.app, this)
    this.viewManager.registerViews()

    // 初始化命令管理器
    this.commandManager = new CommandManager(this.app, this, this.viewManager)
    this.commandManager.registerCommands()
    this.commandManager.addRibbonIcon()

    // 添加设置标签页
    this.addSettingTab(new SmartCopilotSettingTab(this.app, this))
  }

  onunload() {
    this.databaseService.cleanup()
  }

  async setSettings(newSettings: SmartCopilotSettings) {
    await this.settingsManager.updateSettings(newSettings)
    await this.languageService.setLanguage(newSettings.language)
    await this.ragService.updateSettings(newSettings)
  }

  addSettingsChangeListener(
    listener: (newSettings: SmartCopilotSettings) => void,
  ) {
    return this.settingsManager.addSettingsChangeListener(listener)
  }

  async getDbManager(): Promise<DatabaseManager> {
    return this.databaseService.getDbManager()
  }

  async getRAGEngine(): Promise<RAGEngine> {
    return this.ragService.getRAGEngine()
  }
}
