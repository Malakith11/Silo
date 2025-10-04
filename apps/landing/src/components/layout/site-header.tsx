"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown, Menu, X } from "lucide-react";

const navItems = [
  { label: "FEATURES", hash: "features", hasDropdown: false },
  { label: "HOW IT WORKS", hash: "how-it-works", hasDropdown: false },
  { label: "ABOUT", hash: "about", hasDropdown: false },
] as const;

export function SiteHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="site-header">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-8 px-6 sm:px-8">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 text-xl font-bold text-black transition-opacity hover:opacity-70"
        >
          <svg
            className="h-8 w-8"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M16 28C22.6274 28 28 22.6274 28 16C28 9.37258 22.6274 4 16 4C9.37258 4 4 9.37258 4 16C4 22.6274 9.37258 28 16 28Z"
              stroke="currentColor"
              strokeWidth="2"
            />
            <path
              d="M16 12L20 16L16 20L12 16L16 12Z"
              fill="currentColor"
            />
          </svg>
          SiloMD
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-8 text-sm font-medium lg:flex">
          {navItems.map((item) => (
            <Link
              key={item.hash}
              className="flex items-center gap-1 text-gray-700 transition-colors hover:text-black"
              href={`#${item.hash}`}
            >
              {item.label}
              {item.hasDropdown && (
                <ChevronDown className="h-4 w-4" aria-hidden />
              )}
            </Link>
          ))}
        </nav>

        {/* Desktop CTAs */}
        <div className="hidden items-center gap-3 lg:flex">
          <Link href="#waitlist">
            <button className="btn btn-primary px-6 py-2.5">
              JOIN WAITLIST
            </button>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center rounded-md border border-gray-200 text-black transition-colors hover:bg-gray-50 lg:hidden"
          onClick={() => setIsMenuOpen((open) => !open)}
          aria-label="Toggle navigation"
          aria-expanded={isMenuOpen}
        >
          {isMenuOpen ? (
            <X className="h-5 w-5" aria-hidden />
          ) : (
            <Menu className="h-5 w-5" aria-hidden />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="border-t border-gray-200 bg-white px-6 py-4 shadow-lg sm:px-8 lg:hidden">
          <nav className="flex flex-col gap-3 text-sm font-medium">
            {navItems.map((item) => (
              <Link
                key={item.hash}
                className="flex items-center justify-between rounded-lg px-4 py-3 text-gray-700 transition-colors hover:bg-gray-50 hover:text-black"
                href={`#${item.hash}`}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
                {item.hasDropdown && (
                  <ChevronDown className="h-4 w-4" aria-hidden />
                )}
              </Link>
            ))}
            <div className="mt-4">
              <Link href="#waitlist" onClick={() => setIsMenuOpen(false)}>
                <button className="btn btn-primary w-full">
                  JOIN WAITLIST
                </button>
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}

