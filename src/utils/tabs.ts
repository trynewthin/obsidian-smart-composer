import { App, TFile, WorkspaceLeaf, MarkdownView } from 'obsidian'

/**
 * 获取所有打开的标签页
 * @param app Obsidian App 实例
 * @returns 所有打开的标签页叶子(WorkspaceLeaf)数组
 */
export function getAllTabs(app: App): WorkspaceLeaf[] {
  return app.workspace.getLeavesOfType('markdown')
}

/**
 * 获取所有打开的文件
 * @param app Obsidian App 实例
 * @returns 所有打开的文件(TFile)数组
 */
export function getOpenFiles(app: App): TFile[] {
  try {
    const leaves = getAllTabs(app)
    return leaves
      .map((leaf) => (leaf.view instanceof MarkdownView ? leaf.view.file : null))
      .filter((file): file is TFile => file !== null)
  } catch (e) {
    console.error('获取打开的文件失败:', e)
    return []
  }
}

/**
 * 检查文件是否已在标签页中打开
 * @param app Obsidian App 实例
 * @param file 要检查的文件
 * @returns 如果文件已打开则返回对应的标签页，否则返回 null
 */
export function findOpenedTab(app: App, file: TFile): WorkspaceLeaf | null {
  const leaves = getAllTabs(app)
  return (
    leaves.find(
      (leaf) =>
        leaf.view instanceof MarkdownView && leaf.view.file?.path === file.path,
    ) || null
  )
}

/**
 * 在新标签页中打开文件
 * @param app Obsidian App 实例
 * @param file 要打开的文件
 * @param newLeaf 是否在新标签页中打开
 * @returns 打开文件的标签页
 */
export function openFileInTab(app: App, file: TFile, newLeaf: boolean = true): WorkspaceLeaf {
  // 检查文件是否已经打开
  const existingLeaf = findOpenedTab(app, file)
  if (existingLeaf) {
    app.workspace.setActiveLeaf(existingLeaf, { focus: true })
    return existingLeaf
  }

  // 在新标签页中打开文件
  const leaf = app.workspace.getLeaf(newLeaf ? 'tab' : false)
  leaf.openFile(file)
  return leaf
}

/**
 * 激活指定的标签页
 * @param app Obsidian App 实例
 * @param leaf 要激活的标签页
 */
export function activateTab(app: App, leaf: WorkspaceLeaf): void {
  app.workspace.setActiveLeaf(leaf, { focus: true })
} 