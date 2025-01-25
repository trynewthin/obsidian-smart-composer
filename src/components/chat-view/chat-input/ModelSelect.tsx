import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import { ChevronDown, ChevronUp } from 'lucide-react'
import { useMemo, useState } from 'react'

import { CHAT_MODEL_OPTIONS } from '../../../constants'
import { useSettings } from '../../../contexts/settings-context'
import { ModelOption } from '../../../types/llm/model'

function sortModelOptions(options: ModelOption[], settings: any): ModelOption[] {
  return [...options].sort((a, b) => {
    const aHasKey = hasApiKey(a.model.provider, settings)
    const bHasKey = hasApiKey(b.model.provider, settings)
    
    if (aHasKey && !bHasKey) return -1
    if (!aHasKey && bHasKey) return 1
    return 0
  })
}

function hasApiKey(provider: string, settings: any): boolean {
  switch (provider) {
    case 'openai':
      return !!settings.openAIApiKey
    case 'anthropic':
      return !!settings.anthropicApiKey
    case 'gemini':
      return !!settings.geminiApiKey
    case 'groq':
      return !!settings.groqApiKey
    case 'deepseek':
      return !!settings.deepseekApiKey
    case 'ollama':
      return !!settings.ollamaChatModel?.baseUrl
    case 'openai-compatible':
      return !!settings.openAICompatibleChatModel?.apiKey && !!settings.openAICompatibleChatModel?.baseUrl
    default:
      return false
  }
}

export function ModelSelect() {
  const { settings, setSettings } = useSettings()
  const [isOpen, setIsOpen] = useState(false)

  const sortedOptions = useMemo(() => {
    return sortModelOptions(CHAT_MODEL_OPTIONS, settings)
  }, [settings])

  return (
    <DropdownMenu.Root open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenu.Trigger className="smtcmp-chat-input-model-select">
        <div className="smtcmp-chat-input-model-select__model-name">
          {
            CHAT_MODEL_OPTIONS.find(
              (option) => option.id === settings.chatModelId,
            )?.name
          }
        </div>
        <div className="smtcmp-chat-input-model-select__icon">
          {isOpen ? <ChevronUp size={10} /> : <ChevronDown size={10} />}
        </div>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content className="smtcmp-popover">
          <ul>
            {sortedOptions.map((option) => (
              <DropdownMenu.Item
                key={option.id}
                onSelect={() => {
                  setSettings({
                    ...settings,
                    chatModelId: option.id,
                  })
                }}
                asChild
              >
                <li>{option.name}</li>
              </DropdownMenu.Item>
            ))}
          </ul>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  )
}
