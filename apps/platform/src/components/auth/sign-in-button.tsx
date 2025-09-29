"use client"

import { SignInButton as ClerkSignInButton } from "@clerk/nextjs"
import { Button } from "@/components/ui/button"

interface SignInButtonProps {
  variant?: "default" | "outline" | "ghost" | "link"
  size?: "default" | "sm" | "lg"
  className?: string
}

export function SignInButton({ variant = "default", size = "default", className }: SignInButtonProps) {
  return (
    <ClerkSignInButton mode="modal">
      <Button variant={variant} size={size} className={className}>
        Sign In
      </Button>
    </ClerkSignInButton>
  )
}