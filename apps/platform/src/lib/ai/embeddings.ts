import { openai } from './openai-client'

export async function generateEmbedding(text: string): Promise<number[]> {
  try {
    const response = await openai.embeddings.create({
      model: "text-embedding-3-small",
      input: text,
    })

    return response.data[0].embedding
  } catch (error) {
    console.error('Embedding generation error:', error)
    throw new Error('Failed to generate embedding')
  }
}

export async function generateEmbeddings(texts: string[]): Promise<number[][]> {
  try {
    const response = await openai.embeddings.create({
      model: "text-embedding-3-small",
      input: texts,
    })

    return response.data.map(item => item.embedding)
  } catch (error) {
    console.error('Batch embedding generation error:', error)
    throw new Error('Failed to generate embeddings')
  }
}

export function cosineSimilarity(a: number[], b: number[]): number {
  if (a.length !== b.length) {
    throw new Error('Vectors must have the same length')
  }

  let dotProduct = 0
  let normA = 0
  let normB = 0

  for (let i = 0; i < a.length; i++) {
    dotProduct += a[i] * b[i]
    normA += a[i] * a[i]
    normB += b[i] * b[i]
  }

  return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB))
}

export async function findSimilarSupplements(
  queryText: string,
  supplementEmbeddings: { id: string; name: string; embedding: number[] }[],
  limit: number = 5
): Promise<{ id: string; name: string; similarity: number }[]> {
  const queryEmbedding = await generateEmbedding(queryText)

  const similarities = supplementEmbeddings.map(supplement => ({
    id: supplement.id,
    name: supplement.name,
    similarity: cosineSimilarity(queryEmbedding, supplement.embedding)
  }))

  return similarities
    .sort((a, b) => b.similarity - a.similarity)
    .slice(0, limit)
}