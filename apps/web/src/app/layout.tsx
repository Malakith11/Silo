import { ClerkProvider, ClerkLoaded, ClerkLoading } from "@clerk/nextjs";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/shared/theme-provider";
import { MotionProvider } from "@/components/shared/motion-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Silo - Evidence-Based Supplement Protocols",
  description:
    "Transform your health goals into personalized supplement protocols backed by clinical research, biomarker tracking, and expert curation.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider
      signInUrl="/sign-in"
      signUpUrl="/sign-up"
      afterSignInUrl="/dashboard"
      afterSignUpUrl="/dashboard"
      telemetry={{ disabled: process.env.NODE_ENV === "production" }}
    >
      <html lang="en" suppressHydrationWarning className="dark">
        <body className={`${inter.className} min-h-screen bg-background text-foreground`}>
          <ClerkLoading>
            <div className="h-screen w-screen opacity-70" />
          </ClerkLoading>
          <ClerkLoaded>
            <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} disableTransitionOnChange>
              <MotionProvider>{children}</MotionProvider>
            </ThemeProvider>
          </ClerkLoaded>
        </body>
      </html>
    </ClerkProvider>
  );
}
