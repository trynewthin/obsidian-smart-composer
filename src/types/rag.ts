import { SelectVector, VectorMetaData } from '../database/schema'

export type SimilaritySearchResult = Omit<SelectVector, 'embedding'> & {
  similarity: number
} 