import Link from "next/link";
import { NetworkBackground } from "./network-background";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-white py-24 sm:py-32">
      {/* Network Background */}
      <NetworkBackground />

      <div className="container relative z-10">
        <div className="max-w-4xl">
          {/* Hero Headline */}
          <h1 className="text-5xl font-normal leading-tight tracking-tight sm:text-6xl lg:text-7xl xl:text-8xl">
            Make{" "}
            <span className="font-semibold text-purple">
              informed decisions
            </span>{" "}
            about supplements with{" "}
            <span className="font-semibold text-coral">research-backed</span>{" "}
            insights
          </h1>

          {/* Subheading */}
          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-gray-600 sm:text-xl">
            Discover supplements, explore clinical research, build personalized
            protocols, and verify product quality — all in one platform designed
            for evidence-based health optimization.
          </p>

          {/* CTA Button */}
          <div className="mt-10">
            <Link href="#waitlist">
              <button className="btn btn-primary text-base">
                JOIN WAITLIST
              </button>
            </Link>
          </div>

          {/* Four Pillars */}
          <div className="mt-16 border-t border-gray-200 pt-8">
            <p className="text-sm font-semibold uppercase tracking-wider text-gray-500">
              Four integrated modules
            </p>
            <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
              <div className="rounded-lg border border-gray-200 bg-white p-4 text-center transition-shadow hover:shadow-md">
                <p className="text-sm font-semibold text-gray-900">Compass</p>
                <p className="mt-1 text-xs text-gray-600">
                  Supplement Discovery
                </p>
              </div>
              <div className="rounded-lg border border-gray-200 bg-white p-4 text-center transition-shadow hover:shadow-md">
                <p className="text-sm font-semibold text-gray-900">Lens</p>
                <p className="mt-1 text-xs text-gray-600">
                  Research Intelligence
                </p>
              </div>
              <div className="rounded-lg border border-gray-200 bg-white p-4 text-center transition-shadow hover:shadow-md">
                <p className="text-sm font-semibold text-gray-900">
                  Vanta Lab
                </p>
                <p className="mt-1 text-xs text-gray-600">Protocol Builder</p>
              </div>
              <div className="rounded-lg border border-gray-200 bg-white p-4 text-center transition-shadow hover:shadow-md">
                <p className="text-sm font-semibold text-gray-900">Aegis</p>
                <p className="mt-1 text-xs text-gray-600">Product Scanner</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

