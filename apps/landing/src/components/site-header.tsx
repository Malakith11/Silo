"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { Button } from "@silo/ui";

const navItems = [
  { label: "Product", hash: "modules" },
  { label: "Workflow", hash: "workflow" },
  { label: "Evidence", hash: "evidence" },
  { label: "Partners", hash: "pillars" },
] as const;

export function SiteHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/20 backdrop-blur">
      <div className="absolute inset-x-0 top-0 z-[-1] h-full bg-gradient-to-b from-white/70 via-white/50 to-transparent" />
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-6 py-4 sm:px-8">
        <Link
          href={{ pathname: "/", hash: "hero" }}
          className="flex items-center gap-2 text-lg font-semibold text-brand-dark"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-2xl bg-brand-primary/15 font-display text-base text-brand-primary">
            S
          </span>
          Silo
        </Link>

        <nav className="hidden items-center gap-8 text-sm font-medium text-brand-dark/70 lg:flex">
          {navItems.map((item) => (
            <Link
              key={item.hash}
              className="transition-colors hover:text-brand-dark"
              href={{ pathname: "/", hash: item.hash }}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:block">
          <Button size="sm" asChild>
            <Link href={{ pathname: "/", hash: "waitlist" }}>
              Join the waitlist
            </Link>
          </Button>
        </div>

        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/40 bg-white/70 text-brand-dark transition-all duration-200 hover:border-brand-primary/40 hover:text-brand-primary lg:hidden"
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

      {isMenuOpen ? (
        <div className="border-t border-white/20 bg-white/90 px-6 py-4 shadow-lg shadow-brand-dark/5 sm:px-8 lg:hidden">
          <nav className="flex flex-col gap-4 text-sm font-medium text-brand-dark/80">
            {navItems.map((item) => (
              <Link
                key={item.hash}
                className="rounded-xl border border-transparent px-4 py-3 transition-colors hover:border-brand-primary/30 hover:bg-brand-primary/5"
                href={{ pathname: "/", hash: item.hash }}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <Button asChild>
              <Link
                href={{ pathname: "/", hash: "waitlist" }}
                onClick={() => setIsMenuOpen(false)}
              >
                Join the waitlist
              </Link>
            </Button>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
