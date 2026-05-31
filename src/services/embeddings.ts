import { pipeline, env, type FeatureExtractionPipeline } from "@xenova/transformers";

// Use browser cache for models - works offline after first load
env.allowLocalModels = false;
env.useBrowserCache = true;

let extractor: FeatureExtractionPipeline | null = null;
let loadPromise: Promise<FeatureExtractionPipeline> | null = null;

export async function getExtractor(
  onProgress?: (progress: number) => void
): Promise<FeatureExtractionPipeline> {
  if (extractor) return extractor;
  if (loadPromise) return loadPromise;

  loadPromise = pipeline(
    "feature-extraction",
    "Xenova/all-MiniLM-L6-v2",
    {
      progress_callback: (data: { status: string; progress?: number }) => {
        if (data.status === "progress" && onProgress && data.progress) {
          onProgress(data.progress);
        }
      },
    }
  ) as Promise<FeatureExtractionPipeline>;

  extractor = await loadPromise;
  return extractor;
}

export async function getEmbedding(
  text: string,
  onProgress?: (progress: number) => void
): Promise<number[]> {
  const model = await getExtractor(onProgress);
  const output = await model(text, { pooling: "mean", normalize: true });
  return Array.from(output.data as Float32Array);
}

export async function getEmbeddings(
  texts: string[],
  onProgress?: (progress: number) => void
): Promise<number[][]> {
  const model = await getExtractor(onProgress);
  const embeddings: number[][] = [];
  for (const text of texts) {
    const output = await model(text, { pooling: "mean", normalize: true });
    embeddings.push(Array.from(output.data as Float32Array));
  }
  return embeddings;
}

// Cosine similarity (embeddings are already normalized)
export function cosineSimilarity(a: number[], b: number[]): number {
  if (a.length !== b.length) return 0;
  let dot = 0;
  for (let i = 0; i < a.length; i++) {
    dot += a[i] * b[i];
  }
  return dot;
}
