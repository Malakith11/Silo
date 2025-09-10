"use client"

import { UserButton as ClerkUserButton, useUser } from "@clerk/nextjs"

export function UserButton() {
  const { isSignedIn, user } = useUser()

  if (!isSignedIn) return null

  return (
    <div className="flex items-center gap-4">
      <span className="text-sm">Hello, {user.firstName || user.emailAddresses[0]?.emailAddress}</span>
      <ClerkUserButton afterSignOutUrl="/" />
    </div>
  )
}