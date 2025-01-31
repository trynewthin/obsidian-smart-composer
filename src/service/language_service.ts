import { App } from 'obsidian'

import { Language, translations } from '../i18n'
import { SmartCopilotSettings } from '../types/settings'

/**
 * 语言服务类
 * 
 * 负责处理插件的多语言支持，包括：
 * - 语言切换
 * - 文本翻译
 * - 语言检测
 */
export class LanguageService {
  private language: Language = 'en'

  constructor(
    private app: App,
    private settings: SmartCopilotSettings,
    private saveSettings: (settings: SmartCopilotSettings) => Promise<void>
  ) {
    this.language = settings.language
  }

  /**
   * 获取当前语言
   * @returns 当前语言设置
   */
  getCurrentLanguage(): Language {
    return this.language
  }

  /**
   * 设置当前语言
   * @param lang - 目标语言
   */
  async setLanguage(lang: Language): Promise<void> {
    this.language = lang
    this.settings.language = lang
    await this.saveSettings(this.settings)
  }

  /**
   * 翻译指定的键值
   * @param key - 翻译键
   * @param params - 翻译参数
   * @returns 翻译后的文本
   */
  translate(key: string, params?: Record<string, string>): string {
    const keys = key.split('.')
    let value: any = translations[this.language]
    
    for (const k of keys) {
      if (value === undefined) return key
      value = value[k]
    }

    if (typeof value !== 'string') return key
    
    if (params) {
      return value.replace(/\{(\w+)\}/g, (_, param) => params[param] || `{${param}}`)
    }
    
    return value
  }

  /**
   * 检测系统语言并返回对应的语言设置
   * @returns 检测到的语言
   */
  static detectSystemLanguage(): Language {
    const systemLang = navigator.language.toLowerCase()
    return systemLang.startsWith('zh') ? 'zh' : 'en'
  }
}