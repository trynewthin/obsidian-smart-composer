import { App } from 'obsidian'
import SmartAssistant from '../main'
import { RAGEngine } from '../core/rag/ragEngine'
import { DatabaseService } from './database_service'
import { SmartCopilotSettings } from '../types/settings'
import { QueryProgressState } from '../components/chat-view/QueryProgress'

/**
 * RAG 服务类
 * 
 * 负责管理插件的所有 RAG（检索增强生成）相关功能，包括：
 * - RAG 引擎的初始化和管理
 * - 向量检索
 * - 上下文生成
 */
export class RAGService {
  /** RAG 引擎实例 */
  private ragEngine: RAGEngine | null = null

  /** RAG 引擎初始化 Promise */
  private ragEngineInitPromise: Promise<RAGEngine> | null = null

  constructor(
    private app: App,
    private plugin: SmartAssistant,
    private databaseService: DatabaseService
  ) {}

  /**
   * 获取 RAG 引擎实例
   * 如果实例不存在，会自动创建一个新实例
   */
  async getRAGEngine(): Promise<RAGEngine> {
    if (this.ragEngine) {
      return this.ragEngine
    }

    if (!this.ragEngineInitPromise) {
      this.ragEngineInitPromise = (async () => {
        const dbManager = await this.databaseService.getDbManager()
        this.ragEngine = new RAGEngine(this.app, this.plugin.settings, dbManager)
        return this.ragEngine
      })()
    }

    return this.ragEngineInitPromise
  }

  /**
   * 更新 RAG 引擎设置
   */
  async updateSettings(settings: SmartCopilotSettings): Promise<void> {
    const ragEngine = await this.getRAGEngine()
    ragEngine.setSettings(settings)
  }

  /**
   * 重建索引
   * @param reindexAll 是否重建所有索引
   * @param onProgress 进度回调函数
   */
  async rebuildIndex(
    reindexAll: boolean,
    onProgress?: (queryProgress: QueryProgressState) => void
  ): Promise<void> {
    const ragEngine = await this.getRAGEngine()
    await ragEngine.updateVaultIndex(
      { reindexAll },
      onProgress
    )
  }
}
