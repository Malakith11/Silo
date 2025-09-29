"use client";

import { useState } from "react";
import { Button, Heading } from "@silo/ui";

interface WaitlistPayload {
  email: string;
  goals: string;
  interestedModules: string[];
  existingStack: string;
}

const moduleOptions = ["Compass", "Lens", "Vanta", "Aegis"];

export function WaitlistForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const payload: WaitlistPayload = {
      email: String(data.get("email") ?? ""),
      goals: String(data.get("goals") ?? ""),
      interestedModules: moduleOptions.filter((option) => data.get(option) === "on"),
      existingStack: String(data.get("stack") ?? ""),
    };

    if (!payload.email) {
      setError("Please provide your email address.");
      return;
    }

    setStatus("loading");
    setError(null);

    try {
      const endpoint = process.env.NEXT_PUBLIC_WAITLIST_ENDPOINT;

      if (!endpoint) {
        await new Promise((resolve) => setTimeout(resolve, 500));
        setStatus("success");
        return;
      }

      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Failed to join waitlist. Please try again later.");
      }

      setStatus("success");
      event.currentTarget.reset();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unexpected error. Please try again.");
      setStatus("error");
    }
  }

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      <Heading level={3} className="text-brand-light">
        Share your goals and reserve a spot
      </Heading>
      <p className="text-sm text-brand-light/80">
        We use these details to curate the right modules and research drops for you as the beta expands.
      </p>
      <div className="space-y-1">
        <label className="text-sm font-semibold text-brand-light" htmlFor="email">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          placeholder="you@silo.health"
          className="w-full rounded-xl border border-brand-light/30 bg-brand-dark/40 px-4 py-3 text-brand-light placeholder:text-brand-light/40 focus:border-brand-secondary focus:outline-none"
        />
      </div>
      <div className="space-y-1">
        <label className="text-sm font-semibold text-brand-light" htmlFor="goals">
          What outcomes are you optimizing for this year?
        </label>
        <textarea
          id="goals"
          name="goals"
          rows={3}
          placeholder="e.g. improve sleep quality and reduce inflammation"
          className="w-full rounded-xl border border-brand-light/30 bg-brand-dark/40 px-4 py-3 text-brand-light placeholder:text-brand-light/40 focus:border-brand-secondary focus:outline-none"
        />
      </div>
      <fieldset className="space-y-3">
        <legend className="text-sm font-semibold text-brand-light">Which modules are you most excited about?</legend>
        <div className="grid grid-cols-2 gap-3">
          {moduleOptions.map((option) => (
            <label key={option} className="flex items-center gap-2 text-sm text-brand-light/80">
              <input
                type="checkbox"
                name={option}
                className="h-4 w-4 rounded border-brand-light/40 bg-transparent text-brand-secondary focus:ring-brand-secondary"
              />
              {option}
            </label>
          ))}
        </div>
      </fieldset>
      <div className="space-y-1">
        <label className="text-sm font-semibold text-brand-light" htmlFor="stack">
          What does your current supplement stack look like?
        </label>
        <textarea
          id="stack"
          name="stack"
          rows={2}
          placeholder="List a few core products you rely on today"
          className="w-full rounded-xl border border-brand-light/30 bg-brand-dark/40 px-4 py-3 text-brand-light placeholder:text-brand-light/40 focus:border-brand-secondary focus:outline-none"
        />
      </div>
      {error ? <p className="text-sm text-red-300">{error}</p> : null}
      {status === "success" ? (
        <p className="text-sm text-brand-secondary">
          You&apos;re on the list! We&apos;ll be in touch as early cohorts open.
        </p>
      ) : null}
      <Button type="submit" size="lg" className="w-full" disabled={status === "loading"}>
        {status === "loading" ? "Submitting..." : "Join the waitlist"}
      </Button>
      <p className="text-xs text-brand-light/60">
        By submitting this form you agree to receive email updates about the Silo beta and can opt out at any time.
      </p>
    </form>
  );
}
