"use client"
import { Header } from "../Global/header"
import { Footer } from "../Global/footer"
import { StackCompass } from "../Global/stack-compass"

export function StackCompassPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main className="pt-20">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-foreground mb-4">Stack Compass</h1>
            <p className="text-xl text-muted-foreground">
              Discover community-driven supplement protocols organized by goals, demographics, and trends
            </p>
          </div>
          <StackCompass />
        </div>
      </main>
      <Footer />
    </div>
  )
}
