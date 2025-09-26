import { NextResponse } from "next/server";

export async function GET() {
  const env = (k: string) => (process.env[k] ? "present" : "missing");
  return NextResponse.json({
    openai: env("OPENAI_API_KEY"),
    pinecone: env("PINECONE_API_KEY"),
    supabaseUrl: env("NEXT_PUBLIC_SUPABASE_URL"),
    supabaseAnon: env("NEXT_PUBLIC_SUPABASE_ANON_KEY"),
    redis: env("REDIS_URL"),
    clerkPub: env("NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY"),
    clerkSec: env("CLERK_SECRET_KEY"),
  });
}
