import { useState } from 'react'
import { ChevronDown, ChevronRight } from 'lucide-react'
import Markdown from 'react-markdown'
import { useI18n } from '../../contexts/i18n-context'

export default function ThinkingContent({ content }: { content: string }) {
  const [isExpanded, setIsExpanded] = useState(false)
  const { t } = useI18n()

  return (
    <div className="smtcmp-thinking-content">
      <div 
        className="smtcmp-thinking-header" 
        onClick={() => setIsExpanded(!isExpanded)}
      >
        {isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
        <span>{t('chat.thinkingProcess')}</span>
      </div>
      {isExpanded && (
        <div className="smtcmp-thinking-body">
          <Markdown className="smtcmp-markdown">
            {content}
          </Markdown>
        </div>
      )}
    </div>
  )
} 