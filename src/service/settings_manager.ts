import { App } from 'obsidian'
import SmartAssistant from '../main'
import {
  SmartCopilotSettings,
  parseSmartCopilotSettings,
} from '../types/settings'

/**
 * 设置管理服务类
 * 
 * 负责管理插件的所有设置相关功能，包括：
 * - 加载和保存设置
 * - 设置变更监听
 * - 设置迁移
 */
export class SettingsManager {
  /** 插件设置 */
  private settings: SmartCopilotSettings

  /** 设置变更监听器列表 */
  private settingsChangeListeners: ((newSettings: SmartCopilotSettings) => void)[] = []

  constructor(
    private app: App,
    private plugin: SmartAssistant
  ) {}

  /**
   * 获取当前设置
   */
  getSettings(): SmartCopilotSettings {
    return this.settings
  }

  /**
   * 加载设置
   */
  async loadSettings(): Promise<void> {
    this.settings = parseSmartCopilotSettings(await this.plugin.loadData())
    await this.saveSettings(this.settings)
  }

  /**
   * 保存设置
   * @param settings - 要保存的设置
   */
  async saveSettings(settings: SmartCopilotSettings): Promise<void> {
    await this.plugin.saveData(settings)
  }

  /**
   * 更新设置
   * @param newSettings - 新的设置值
   */
  async updateSettings(newSettings: SmartCopilotSettings): Promise<void> {
    this.settings = newSettings
    await this.saveSettings(newSettings)
    this.notifySettingsChange(newSettings)
  }

  /**
   * 添加设置变更监听器
   * @param listener - 监听器函数
   * @returns 用于移除监听器的函数
   */
  addSettingsChangeListener(
    listener: (newSettings: SmartCopilotSettings) => void,
  ): () => void {
    this.settingsChangeListeners.push(listener)
    return () => {
      this.settingsChangeListeners = this.settingsChangeListeners.filter(
        (l) => l !== listener,
      )
    }
  }

  /**
   * 通知所有监听器设置已变更
   * @param newSettings - 新的设置值
   */
  private notifySettingsChange(newSettings: SmartCopilotSettings): void {
    this.settingsChangeListeners.forEach((listener) => listener(newSettings))
  }
}
