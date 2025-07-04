"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { CheckCircle, Mail, ArrowRight } from "lucide-react"

export function CTA() {
  const [email, setEmail] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setIsSubmitted(true)
      // Here you would typically send the email to your backend
      setTimeout(() => {
        setIsSubmitted(false)
        setEmail("")
      }, 3000)
    }
  }

  return (
    <section className="py-20 px-4 bg-gradient-to-br from-blue-600/80 via-purple-600/80 to-indigo-700/80">
      <div className="container mx-auto max-w-4xl text-center">
        <div className="bg-white/15 backdrop-blur-lg rounded-3xl p-12 border border-white/20 dark:border-white/10 shadow-2xl">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Ready to Transform Your Health?</h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Join thousands of users who have already discovered the power of evidence-based supplementation with Silo.
          </p>

          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto mb-6">
              <div className="flex-1">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-white/20 dark:bg-white/10 border-white/30 dark:border-white/20 text-white placeholder:text-white/70 focus:bg-white/30 dark:focus:bg-white/20"
                  required
                />
              </div>
              <Button type="submit" className="bg-white text-blue-600 hover:bg-white/90 font-semibold px-8">
                Get Started
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </form>
          ) : (
            <div className="flex items-center justify-center gap-2 text-white mb-6">
              <CheckCircle className="w-6 h-6 text-green-400" />
              <span className="text-lg font-medium">Thank you! We'll be in touch soon.</span>
            </div>
          )}

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-white/80 text-sm">
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4" />
              <span>No spam, ever</span>
            </div>
            <div className="hidden sm:block w-px h-4 bg-white/30"></div>
            <a href="/privacy" className="hover:text-white transition-colors">
              Privacy Policy
            </a>
            <div className="hidden sm:block w-px h-4 bg-white/30"></div>
            <a href="/terms" className="hover:text-white transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
