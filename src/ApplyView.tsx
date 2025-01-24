import { TFile, View, WorkspaceLeaf } from 'obsidian'
import { Root, createRoot } from 'react-dom/client'

import ApplyViewRoot from './components/apply-view/ApplyViewRoot'
import { APPLY_VIEW_TYPE } from './constants'
import { AppProvider } from './contexts/app-context'
import { I18nProvider } from './contexts/i18n-context'
import SmartCopilotPlugin from './main'

export type ApplyViewState = {
  file: TFile
  originalContent: string
  newContent: string
}

export class ApplyView extends View {
  private root: Root | null = null
  private state: ApplyViewState | null = null
  private plugin: SmartCopilotPlugin

  constructor(leaf: WorkspaceLeaf, plugin: SmartCopilotPlugin) {
    super(leaf)
    this.plugin = plugin
  }

  getViewType() {
    return APPLY_VIEW_TYPE
  }

  getDisplayText() {
    return this.plugin.t('apply.title', { filename: this.state?.file?.name ?? '' })
  }

  async setState(state: ApplyViewState) {
    this.state = state
    // Should render here because onOpen is called before setState
    this.render()
  }

  async onOpen() {
    this.root = createRoot(this.containerEl)
  }

  async onClose() {
    this.root?.unmount()
  }

  async render() {
    if (!this.root || !this.state) return
    this.root.render(
      <AppProvider app={this.app}>
        <I18nProvider plugin={this.plugin}>
          <ApplyViewRoot state={this.state} close={() => this.leaf.detach()} />
        </I18nProvider>
      </AppProvider>,
    )
  }
}
