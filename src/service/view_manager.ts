import { App, Editor, MarkdownView, WorkspaceLeaf } from 'obsidian'
import SmartAssistant from '../main'
import { ChatView } from '../ChatView'
import { ApplyView } from '../ApplyView'
import { ChatProps } from '../components/chat-view/Chat'
import { APPLY_VIEW_TYPE, CHAT_VIEW_TYPE } from '../constants'
import { getMentionableBlockData } from '../utils/obsidian'

/**
 * 视图管理服务类
 * 
 * 负责管理插件的所有视图相关功能，包括：
 * - 聊天视图的打开和激活
 * - 应用视图的管理
 * - 选中内容的处理
 */
export class ViewManager {
  private initialChatProps?: ChatProps

  constructor(
    private app: App,
    private plugin: SmartAssistant
  ) {}

  /**
   * 注册所有视图
   */
  registerViews(): void {
    this.plugin.registerView(
      CHAT_VIEW_TYPE, 
      (leaf: WorkspaceLeaf) => new ChatView(leaf, this.plugin)
    )
    this.plugin.registerView(
      APPLY_VIEW_TYPE, 
      (leaf: WorkspaceLeaf) => new ApplyView(leaf, this.plugin)
    )
  }

  /**
   * 打开聊天视图
   * @param openNewChat - 是否打开新的聊天
   */
  async openChatView(openNewChat = false): Promise<void> {
    const view = this.app.workspace.getActiveViewOfType(MarkdownView)
    const editor = view?.editor
    if (!view || !editor) {
      await this.activateChatView(undefined, openNewChat)
      return
    }
    const selectedBlockData = await getMentionableBlockData(editor, view)
    await this.activateChatView(
      {
        selectedBlock: selectedBlockData ?? undefined,
      },
      openNewChat,
    )
  }

  /**
   * 激活聊天视图
   * @param chatProps - 聊天属性
   * @param openNewChat - 是否打开新的聊天
   */
  async activateChatView(chatProps?: ChatProps, openNewChat = false): Promise<void> {
    this.initialChatProps = chatProps

    const leaf = this.app.workspace.getLeavesOfType(CHAT_VIEW_TYPE)[0]

    await (leaf ?? this.app.workspace.getRightLeaf(false))?.setViewState({
      type: CHAT_VIEW_TYPE,
      active: true,
    })

    if (openNewChat && leaf && leaf.view instanceof ChatView) {
      leaf.view.openNewChat(chatProps?.selectedBlock)
    }

    this.app.workspace.revealLeaf(
      this.app.workspace.getLeavesOfType(CHAT_VIEW_TYPE)[0],
    )
  }

  /**
   * 将选中的内容添加到聊天中
   * @param editor - 编辑器实例
   * @param view - Markdown 视图实例
   */
  async addSelectionToChat(editor: Editor, view: MarkdownView): Promise<void> {
    const data = await getMentionableBlockData(editor, view)
    if (!data) return

    const leaves = this.app.workspace.getLeavesOfType(CHAT_VIEW_TYPE)
    if (leaves.length === 0 || !(leaves[0].view instanceof ChatView)) {
      await this.activateChatView({
        selectedBlock: data,
      })
      return
    }

    await this.app.workspace.revealLeaf(leaves[0])

    const chatView = leaves[0].view as ChatView
    chatView.addSelectionToChat(data)
    chatView.focusMessage()
  }

  /**
   * 获取初始聊天属性
   */
  getInitialChatProps(): ChatProps | undefined {
    return this.initialChatProps
  }

  /**
   * 设置初始聊天属性
   */
  setInitialChatProps(props?: ChatProps): void {
    this.initialChatProps = props
  }
}