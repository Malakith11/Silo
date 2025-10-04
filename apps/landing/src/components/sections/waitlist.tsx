"use client";

import { useState } from "react";

export function Waitlist() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Integrate with Supabase Edge Function
    console.log("Waitlist signup:", email);
    setSubmitted(true);
  };

  return (
    <section id="waitlist" className="bg-gray-50 py-24">
      <div className="container">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-4xl font-normal tracking-tight sm:text-5xl">
            Join the <span className="font-semibold text-purple">Waitlist</span>
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Be among the first to access our evidence-based supplement platform.
            Get early access and exclusive updates.
          </p>

          {!submitted ? (
            <form onSubmit={handleSubmit} className="mt-10">
              <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="rounded-md border border-gray-300 px-4 py-3 text-base focus:border-brand-purple focus:outline-none focus:ring-2 focus:ring-brand-purple/20 sm:w-80"
                />
                <button
                  type="submit"
                  className="btn btn-primary whitespace-nowrap px-8 py-3"
                >
                  JOIN WAITLIST
                </button>
              </div>
              <p className="mt-4 text-sm text-gray-500">
                No spam. Unsubscribe anytime.
              </p>
            </form>
          ) : (
            <div className="mt-10 rounded-lg border border-green-200 bg-green-50 p-6">
              <p className="text-lg font-semibold text-green-900">
                Thank you for joining!
              </p>
              <p className="mt-2 text-green-700">
                {`We'll`} send you updates as we get closer to launch.
              </p>
            </div>
          )}

          <div className="mt-12 grid grid-cols-1 gap-6 text-left sm:grid-cols-3">
            <div className="rounded-lg border border-gray-200 bg-white p-6">
              <div className="text-2xl font-bold text-brand-purple">4</div>
              <p className="mt-1 text-sm font-semibold text-gray-900">
                Integrated Modules
              </p>
              <p className="mt-1 text-xs text-gray-600">
                Compass, Lens, Vanta, Aegis
              </p>
            </div>
            <div className="rounded-lg border border-gray-200 bg-white p-6">
              <div className="text-2xl font-bold text-brand-purple">1,000+</div>
              <p className="mt-1 text-sm font-semibold text-gray-900">
                Clinical Studies
              </p>
              <p className="mt-1 text-xs text-gray-600">
                Research-backed insights
              </p>
            </div>
            <div className="rounded-lg border border-gray-200 bg-white p-6">
              <div className="text-2xl font-bold text-brand-purple">100%</div>
              <p className="mt-1 text-sm font-semibold text-gray-900">
                Evidence-Based
              </p>
              <p className="mt-1 text-xs text-gray-600">
                No guesswork required
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
