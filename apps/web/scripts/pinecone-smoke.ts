import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

import OpenAI from "openai";
import { Pinecone } from "@pinecone-database/pinecone";

const INDEX = process.env.PINECONE_INDEX || "lens-documents"; // 1536-dim

async function ensureIndex(pc: Pinecone) {
  const { indexes } = await pc.listIndexes();
  const exists = indexes?.some(i => i.name === INDEX);
  if (!exists) {
    // Adjust region if you prefer; free tier usually us-east-1
    await pc.createIndex({
      name: INDEX,
      dimension: 1536,
      metric: "cosine",
      spec: { serverless: { cloud: "aws", region: "us-east-1" } },
    });
    // Small wait for readiness (simple poll)
    let ready = false;
    for (let i = 0; i < 20; i++) {
      const d = await pc.describeIndex(INDEX);
      if (d.status?.ready) { ready = true; break; }
      await new Promise(r => setTimeout(r, 3000));
    }
    if (!ready) throw new Error("Pinecone index not ready yet");
  }
}

(async () => {
  const openaiKey = process.env.OPENAI_API_KEY;
  const pineKey = process.env.PINECONE_API_KEY;
  if (!openaiKey || !pineKey) throw new Error("Missing OPENAI_API_KEY or PINECONE_API_KEY");

  const openai = new OpenAI({ apiKey: openaiKey });
  const pc = new Pinecone({ apiKey: pineKey });

  await ensureIndex(pc);
  const index = pc.Index(INDEX);

  const texts = [
    "Curcumin reduces inflammatory markers in knee osteoarthritis.",
    "Magnesium glycinate may improve sleep quality and reduce insomnia.",
    "Creatine supports power output and muscle recovery."
  ];

  const emb = await openai.embeddings.create({
    model: "text-embedding-3-small", // 1536-dim to match index
    input: texts,
  });

  const vectors = emb.data.map((d, i) => ({
    id: `doc-${i + 1}`,
    values: d.embedding,
    metadata: { text: texts[i] }
  }));

  await index.upsert(vectors);

  // Query with one of the texts
  const q = await openai.embeddings.create({ model: "text-embedding-3-small", input: "best supplement to improve sleep" });
  const queryVec = q.data[0].embedding;

  const res = await index.query({ vector: queryVec, topK: 3, includeMetadata: true });
  console.log("Top match:", res.matches?.[0]?.metadata);
  console.log("All:", res.matches?.map(m => ({ score: m.score, text: (m.metadata as any)?.text })));
})().catch(err => {
  console.error("pinecone-smoke failed:", err);
  process.exit(1);
});
