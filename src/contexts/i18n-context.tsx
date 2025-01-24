import React, { createContext, useContext, useEffect, useState } from 'react'
import { Language, t as translate } from '../i18n'
import SmartCopilotPlugin from '../main'

type I18nContextType = {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string, params?: Record<string, string>) => string
}

const I18nContext = createContext<I18nContextType | null>(null)

export function I18nProvider({ 
  children,
  plugin,
}: { 
  children: React.ReactNode
  plugin: SmartCopilotPlugin
}) {
  const [language, setLanguageState] = useState<Language>(plugin.settings.language)

  const setLanguage = (lang: Language) => {
    setLanguageState(lang)
    plugin.setLanguage(lang)
  }

  useEffect(() => {
    const unsubscribe = plugin.addSettingsChangeListener((newSettings) => {
      setLanguageState(newSettings.language)
    })
    return unsubscribe
  }, [plugin])

  const t = (key: string, params?: Record<string, string>) => {
    return translate(key, language, params)
  }

  return (
    <I18nContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </I18nContext.Provider>
  )
}

export function useI18n() {
  const context = useContext(I18nContext)
  if (!context) {
    throw new Error('useI18n must be used within an I18nProvider')
  }
  return context
} 