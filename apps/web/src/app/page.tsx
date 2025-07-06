// src/app/page.tsx
import ClientLanding from "./ClientLanding"

// This is now a Server Component (no "use client"), it just delegates to the browser-only part.
export default function Page() {
  return <ClientLanding />
}
