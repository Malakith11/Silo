"use client"

import { WaitlistForm } from "@/components/waitlist/waitlist-form"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            From Goal to Dose.
            <br />
            <span className="text-blue-600">In Minutes</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto mb-8">
            50,000+ studies analyzed to build your personalized supplement protocol —
            evidence‑based with drag‑and‑drop simplicity.
          </p>
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>Evidence-based recommendations</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span>Personalized protocols</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              <span>Easy to follow</span>
            </div>
          </div>
        </div>

        {/* Waitlist Form */}
        <div className="max-w-md mx-auto">
          <WaitlistForm />
        </div>

        {/* Features Preview */}
        <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Science-Backed</h3>
            <p className="text-gray-600">Every recommendation backed by peer-reviewed research and clinical studies.</p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Personalized</h3>
            <p className="text-gray-600">Tailored to your specific health goals, age, lifestyle, and preferences.</p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Simple</h3>
            <p className="text-gray-600">Drag-and-drop interface makes building your protocol effortless.</p>
          </div>
        </div>

        {/* Social Proof */}
        <div className="mt-16 text-center">
          <p className="text-gray-500 mb-4">Trusted by health enthusiasts worldwide</p>
          <div className="flex justify-center items-center gap-8 opacity-60">
            {/* Placeholder for logos/testimonials */}
            <div className="text-2xl font-bold text-gray-400">🧬</div>
            <div className="text-2xl font-bold text-gray-400">⚡</div>
            <div className="text-2xl font-bold text-gray-400">🎯</div>
            <div className="text-2xl font-bold text-gray-400">📊</div>
          </div>
        </div>
      </div>
    </div>
  )
}
