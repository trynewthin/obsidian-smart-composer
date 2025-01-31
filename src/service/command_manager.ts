import { App, Editor, MarkdownView, Notice } from 'obsidian'
import SmartAssistant from '../main'
import { ViewManager } from './view_manager'


/**
 * 命令管理服务类
 * 
 * 负责管理插件的所有命令相关功能，包括：
 * - 注册和管理命令
 * - 处理命令回调
 * - 管理命令的执行状态
 */
export class CommandManager {
  constructor(
    private app: App,
    private plugin: SmartAssistant,
    private viewManager: ViewManager
  ) {}

  /**
   * 注册所有命令
   */
  registerCommands(): void {
    // 打开新聊天命令
    this.plugin.addCommand({
      id: 'open-new-chat',
      name: 'Open chat',
      callback: () => this.viewManager.openChatView(true),
    })

    // 添加选中内容到聊天命令
    this.plugin.addCommand({
      id: 'add-selection-to-chat',
      name: 'Add selection to chat',
      editorCallback: (editor: Editor, view: MarkdownView) => {
        this.viewManager.addSelectionToChat(editor, view)
      },
    })

    // 重建索引命令
    this.plugin.addCommand({
      id: 'rebuild-vault-index',
      name: 'Rebuild entire vault index',
      callback: async () => {
        const notice = new Notice('Rebuilding vault index...', 0)
        try {
          await this.plugin.ragService.rebuildIndex(true, (queryProgress) => {
            if (queryProgress.type === 'indexing') {
              const { completedChunks, totalChunks } = queryProgress.indexProgress
              notice.setMessage(
                `Indexing chunks: ${completedChunks} / ${totalChunks}`,
              )
            }
          })
          notice.setMessage('Rebuilding vault index complete')
        } catch (error) {
          console.error(error)
          notice.setMessage('Rebuilding vault index failed')
        } finally {
          setTimeout(() => {
            notice.hide()
          }, 1000)
        }
      },
    })

    // 更新索引命令
    this.plugin.addCommand({
      id: 'update-vault-index',
      name: 'Update index for modified files',
      callback: async () => {
        const notice = new Notice('Updating vault index...', 0)
        try {
          await this.plugin.ragService.rebuildIndex(false, (queryProgress) => {
            if (queryProgress.type === 'indexing') {
              const { completedChunks, totalChunks } = queryProgress.indexProgress
              notice.setMessage(
                `Indexing chunks: ${completedChunks} / ${totalChunks}`,
              )
            }
          })
          notice.setMessage('Vault index updated')
        } catch (error) {
          console.error(error)
          notice.setMessage('Vault index update failed')
        } finally {
          setTimeout(() => {
            notice.hide()
          }, 1000)
        }
      },
    })
  }

  /**
   * 添加功能区图标
   */
  addRibbonIcon(): void {
    this.plugin.addRibbonIcon('wand-sparkles', 'Open smart composer', () =>
      this.viewManager.openChatView(),
    )
  }
}