"use client";

import { X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export function AnnouncementBanner() {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="relative z-50 bg-brand-purple px-4 py-2 text-white">
      <div className="mx-auto flex max-w-7xl items-center justify-center gap-3 text-center text-sm sm:text-base">
        <Link
          href="#waitlist"
          className="btn-banner rounded-md px-3 py-1 text-xs font-semibold"
        >
          Join Beta
        </Link>
        <p className="flex-1">
          Early access now open — Join the waitlist for our supplement research
          platform
        </p>
        <button
          onClick={() => setIsVisible(false)}
          className="absolute right-4 top-1/2 -translate-y-1/2 rounded-md p-1 transition-colors hover:bg-white/20"
          aria-label="Close banner"
        >
          <X className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}

