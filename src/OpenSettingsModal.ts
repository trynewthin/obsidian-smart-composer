/**
 * 打开设置模态框
 * 
 * 该类扩展了 Obsidian 的 Modal 类，用于创建一个设置模态框。
 */

import { App, Modal, Setting } from 'obsidian'


export class OpenSettingsModal extends Modal {
  /**
   * 构造函数
   * 
   * @param app - Obsidian 应用实例
   * @param title - 模态框标题
   * @param onSubmit - 提交按钮的回调函数
   */
  constructor(app: App, title: string, onSubmit: () => void) {
    super(app)

    this.setTitle(title)

    new Setting(this.contentEl).addButton((button) => {
      button.setButtonText('Open settings')
      button.onClick(() => {
        this.close()
        onSubmit()
      })
    })
  }
}
