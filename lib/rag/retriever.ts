import fs from 'fs';
import path from 'path';
import { ai, isGeminiEnabled } from './gemini';
import { rebuildIndex, IndexChunk } from './indexer';

// Compute Cosine Similarity between two vectors
function cosineSimilarity(vecA: number[], vecB: number[]): number {
  let dotProduct = 0.0;
  let normA = 0.0;
  let normB = 0.0;
  for (let i = 0; i < vecA.length; i++) {
    dotProduct += vecA[i] * vecB[i];
    normA += vecA[i] * vecA[i];
    normB += vecB[i] * vecB[i];
  }
  if (normA === 0 || normB === 0) return 0;
  return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB));
}

// Fallback keyword-based search ranker (TF-IDF inspired)
function keywordSearch(query: string, chunks: IndexChunk[], topK = 3): IndexChunk[] {
  const stopwords = new Set(['a', 'about', 'an', 'are', 'as', 'at', 'be', 'by', 'for', 'from', 'how', 'in', 'is', 'it', 'of', 'on', 'or', 'that', 'the', 'this', 'to', 'was', 'what', 'where', 'who', 'will', 'with', 'you', 'your', 'my']);
  
  const queryWords = query
    .toLowerCase()
    .replace(/[^\w\s]/g, '')
    .split(/\s+/)
    .filter(word => word.length > 2 && !stopwords.has(word));

  if (queryWords.length === 0) {
    // If no keywords after filter, return top chunks
    return chunks.slice(0, topK);
  }

  const scoredChunks = chunks.map(chunk => {
    let score = 0;
    const contentLower = chunk.content.toLowerCase();
    
    for (const word of queryWords) {
      // Find term matches
      const regex = new RegExp('\\b' + word + '\\b', 'g');
      const matches = contentLower.match(regex);
      if (matches) {
        score += matches.length * 2; // Exact word match
      } else if (contentLower.includes(word)) {
        score += 0.5; // Substring match
      }
    }
    
    // Add small bonus if query word is in the title
    const titleLower = chunk.title.toLowerCase();
    for (const word of queryWords) {
      if (titleLower.includes(word)) {
        score += 3;
      }
    }

    return { chunk, score };
  });

  return scoredChunks
    .filter(item => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .map(item => item.chunk)
    .slice(0, topK);
}

// Retrieve relevant context chunks for a query
export async function retrieveContext(query: string, workspaceRoot: string, topK = 3): Promise<{ chunks: IndexChunk[]; method: string }> {
  const indexPath = path.join(workspaceRoot, 'data', 'rag-index.json');
  
  // Rebuild index if file is missing
  if (!fs.existsSync(indexPath)) {
    console.log('Index file not found. Rebuilding...');
    await rebuildIndex(workspaceRoot);
  }

  let chunks: IndexChunk[] = [];
  try {
    const rawData = fs.readFileSync(indexPath, 'utf-8');
    chunks = JSON.parse(rawData);
  } catch (err) {
    console.error('Error reading index file, rebuilding...', err);
    await rebuildIndex(workspaceRoot);
    const rawData = fs.readFileSync(indexPath, 'utf-8');
    chunks = JSON.parse(rawData);
  }

  if (chunks.length === 0) {
    return { chunks: [], method: 'none' };
  }

  // Vector embedding retrieval if Gemini is active and index has embeddings
  const useVector = isGeminiEnabled() && chunks[0]?.embedding !== undefined;
  
  if (useVector) {
    try {
      console.log('Retrieving context via Gemini text-embedding-004...');
      const response = await ai.models.embedContent({
        model: 'text-embedding-004',
        contents: query,
      });

      const queryEmbedding = response.embedding?.values;
      if (queryEmbedding) {
        const scoredChunks = chunks
          .filter(c => c.embedding)
          .map(chunk => ({
            chunk,
            similarity: cosineSimilarity(queryEmbedding, chunk.embedding!)
          }))
          .sort((a, b) => b.similarity - a.similarity);

        // Debug output
        console.log('Top retrieved chunk similarities:', scoredChunks.slice(0, 3).map(s => `${s.chunk.title}: ${s.similarity.toFixed(4)}`));

        return {
          chunks: scoredChunks.slice(0, topK).map(s => s.chunk),
          method: 'vector'
        };
      }
    } catch (e) {
      console.error('Vector retrieval failed, falling back to keyword search:', e);
    }
  }

  console.log('Using local keyword-based fallback search retrieval...');
  const matched = keywordSearch(query, chunks, topK);
  return {
    chunks: matched,
    method: 'keyword'
  };
}
