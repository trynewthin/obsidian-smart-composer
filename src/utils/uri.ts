import { App, TFile } from 'obsidian'

/**
 * 解析 Obsidian URI 并提取仓库名称和文件路径
 * @param uri Obsidian URI (例如: obsidian://open?vault=Home&file=path/to/file)
 * @returns 包含仓库名称和解码后文件路径的对象,如果URI无效则返回null
 */
export function parseObsidianUri(uri: string): { vault: string; filePath: string } | null {
  try {
    // 检查是否是有效的 Obsidian URI
    if (!uri.startsWith('obsidian://open?')) {
      return null
    }

    // 解析 URL 参数
    const params = new URLSearchParams(uri.slice('obsidian://open?'.length))
    
    const vault = params.get('vault')
    const file = params.get('file')
    
    if (!vault || !file) {
      return null
    }

    // 解码文件路径
    const decodedPath = decodeURIComponent(file)

    return {
      vault,
      filePath: decodedPath
    }
  } catch (e) {
    return null
  }
}

/**
 * 从 Obsidian URI 获取 TFile 对象
 * 注意: 此函数假设你已经在正确的仓库(vault)中
 * @param app Obsidian App 实例
 * @param uri Obsidian URI
 * @returns 如果找到文件则返回 TFile 对象,否则返回 null
 */
export function getFileFromObsidianUri(app: App, uri: string): TFile | null {
  const parsed = parseObsidianUri(uri)
  if (!parsed) {
    return null
  }

  // 从路径获取文件
  return app.vault.getFileByPath(parsed.filePath)
} 