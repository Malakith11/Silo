// apps/web/src/middleware.ts
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isPublic = createRouteMatcher([
  "/",
  "/sign-in(.*)",
  "/sign-up(.*)",
  "/api/health(.*)",
  "/api/test-supabase",
  "/api/webhooks/(.*)",
]);

export default clerkMiddleware((auth, req) => {
  if (isPublic(req)) return;

  // Works across Clerk 6.x without .protect()
  const { userId, redirectToSignIn } = auth();
  if (!userId) {
    return redirectToSignIn({ returnBackUrl: req.url });
  }
});

export const config = {
  matcher: [
    // skip Next internals & static
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // include API
    "/(api|trpc)(.*)",
  ],
};
