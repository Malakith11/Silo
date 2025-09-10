import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { ClerkProvider } from "@clerk/nextjs"
import "./globals.css"
import { ThemeProvider } from "./components/Global/theme-provider"
import { MotionProvider } from "./components/Global/motion-provider"


const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Silo - Evidence-Based Supplement Protocols",
  description:
    "Transform your health goals into personalized supplement protocols backed by clinical research, biomarker tracking, and expert curation.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning className="dark">
        <body className={`${inter.className} bg-background text-foreground`}>
          <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} disableTransitionOnChange={false}>
            <MotionProvider>{children}</MotionProvider>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  )
}
