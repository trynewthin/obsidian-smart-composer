declare module '@qdrant/js-client-rest' {
  export interface SelectVector {
    id: string
    embedding: number[]
    payload?: Record<string, any>
  }
} 