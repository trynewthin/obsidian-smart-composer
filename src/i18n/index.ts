import { en } from './locales/en'
import { zh } from './locales/zh'

export type Language = 'en' | 'zh'
export type TranslationKey = keyof typeof en

export const translations = {
  en,
  zh,
} as const

export function t(key: string, lang: Language = 'en', params?: Record<string, string>): string {
  const keys = key.split('.')
  let value: any = translations[lang]
  
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

export function getCurrentLanguage(): Language {
  /**
   * 获取当前语言设置
   * 
   * 该函数根据浏览器的语言设置返回当前语言。
   * 如果浏览器语言以 'zh' 开头，则返回 'zh'（中文）；否则返回 'en'（英文）。
   * 
   * @returns {Language} 当前语言，可能是 'zh' 或 'en'
   */
  // 获取系统语言
  const systemLang = navigator.language.toLowerCase()
  
  // 如果是中文，返回 zh，否则返回 en
  return systemLang.startsWith('zh') ? 'zh' : 'en'
}