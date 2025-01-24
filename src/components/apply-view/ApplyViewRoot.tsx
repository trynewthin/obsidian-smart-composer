import { Change, diffLines } from 'diff'
import { CheckIcon, X } from 'lucide-react'
import { getIcon } from 'obsidian'
import { useState } from 'react'

import { ApplyViewState } from '../../ApplyView'
import { useApp } from '../../contexts/app-context'
import { useI18n } from '../../contexts/i18n-context'

export default function ApplyViewRoot({
  state,
  close,
}: {
  state: ApplyViewState
  close: () => void
}) {
  const acceptIcon = getIcon('check')
  const rejectIcon = getIcon('x')
  const excludeIcon = getIcon('x')

  const app = useApp()
  const { t } = useI18n()

  const [diff, setDiff] = useState<Change[]>(
    diffLines(state.originalContent, state.newContent),
  )

  const handleAccept = async () => {
    const newContent = diff
      .filter((change) => !change.removed)
      .map((change) => change.value)
      .join('')
    await app.vault.modify(state.file, newContent)
    close()
  }

  const handleReject = async () => {
    close()
  }

  const excludeDiffLine = (index: number) => {
    setDiff((prevDiff) => {
      const newDiff = [...prevDiff]
      const change = newDiff[index]
      if (change.added) {
        // Remove the entry if it's an added line
        return newDiff.filter((_, i) => i !== index)
      } else if (change.removed) {
        change.removed = false
      }
      return newDiff
    })
  }

  const acceptDiffLine = (index: number) => {
    setDiff((prevDiff) => {
      const newDiff = [...prevDiff]
      const change = newDiff[index]
      if (change.added) {
        change.added = false
      } else if (change.removed) {
        // Remove the entry if it's a removed line
        return newDiff.filter((_, i) => i !== index)
      }
      return newDiff
    })
  }

  return (
    <div id="smtcmp-apply-view">
      <div className="view-header">
        <div className="view-header-left">
          <div className="view-header-nav-buttons"></div>
        </div>
        <div className="view-header-title-container mod-at-start">
          <div className="view-header-title">
            {t('apply.title', { filename: state?.file?.name ?? '' })}
          </div>
          <div className="view-actions">
            <button
              className="clickable-icon view-action smtcmp-approve-button"
              aria-label={t('apply.accept')}
              onClick={handleAccept}
            >
              {acceptIcon && <CheckIcon size={14} />}
              <span>{t('apply.accept')}</span>
            </button>
            <button
              className="clickable-icon view-action smtcmp-reject-button"
              aria-label={t('apply.reject')}
              onClick={handleReject}
            >
              {rejectIcon && <X size={14} />}
              <span>{t('apply.reject')}</span>
            </button>
          </div>
        </div>
      </div>

      <div className="view-content">
        <div className="markdown-source-view cm-s-obsidian mod-cm6 node-insert-event is-readable-line-width is-live-preview is-folding show-properties">
          <div className="cm-editor">
            <div className="cm-sizer">
              <div className="smtcmp-inline-title">
                {state?.file?.name
                  ? state.file.name.replace(/\.[^/.]+$/, '')
                  : ''}
              </div>

              {diff.map((part, index) => (
                <div
                  key={index}
                  className={`smtcmp-diff-line ${part.added ? 'added' : part.removed ? 'removed' : ''}`}
                >
                  <div style={{ width: '100%' }}>{part.value}</div>
                  {(part.added || part.removed) && (
                    <div className="smtcmp-diff-line-actions">
                      <button
                        aria-label={t('apply.acceptLine')}
                        onClick={() => acceptDiffLine(index)}
                        className="smtcmp-accept"
                      >
                        {acceptIcon && t('apply.acceptLine')}
                      </button>
                      <button
                        aria-label={t('apply.excludeLine')}
                        onClick={() => excludeDiffLine(index)}
                        className="smtcmp-exclude"
                      >
                        {excludeIcon && t('apply.excludeLine')}
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
