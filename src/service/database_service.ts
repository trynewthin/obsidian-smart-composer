import { App } from 'obsidian'
import SmartAssistant from '../main'
import { DatabaseManager } from '../database/DatabaseManager'

/**
 * 数据库服务类
 * 
 * 负责管理插件的所有数据库相关功能，包括：
 * - 数据库初始化和清理
 * - 向量数据管理
 * - 模板数据管理
 */
export class DatabaseService {
  /** 数据库管理器实例 */
  private dbManager: DatabaseManager | null = null

  /** 数据库管理器初始化 Promise */
  private dbManagerInitPromise: Promise<DatabaseManager> | null = null

  constructor(
    private app: App,
    private plugin: SmartAssistant
  ) {}

  /**
   * 获取数据库管理器实例
   * 如果实例不存在，会自动创建一个新实例
   */
  async getDbManager(): Promise<DatabaseManager> {
    if (this.dbManager) {
      return this.dbManager
    }

    if (!this.dbManagerInitPromise) {
      this.dbManagerInitPromise = (async () => {
        this.dbManager = await DatabaseManager.create(this.app)
        return this.dbManager
      })()
    }

    return this.dbManagerInitPromise
  }

  /**
   * 获取向量管理器实例
   */
  async getVectorManager() {
    const dbManager = await this.getDbManager()
    return dbManager.getVectorManager()
  }

  /**
   * 获取模板管理器实例
   */
  async getTemplateManager() {
    const dbManager = await this.getDbManager()
    return dbManager.getTemplateManager()
  }

  /**
   * 清理数据库资源
   */
  cleanup(): void {
    if (this.dbManager) {
      this.dbManager.cleanup()
      this.dbManager = null
      this.dbManagerInitPromise = null
    }
  }

  /**
   * 保存数据库状态
   */
  async save(): Promise<void> {
    const dbManager = await this.getDbManager()
    await dbManager.save()
  }
}
