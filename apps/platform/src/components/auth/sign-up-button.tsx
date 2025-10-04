/* "use client"

import { SignUpButton as ClerkSignUpButton } from "@clerk/nextjs"
//import { Button } from "@/components/ui/button" 

interface SignUpButtonProps {
  variant?: "default" | "outline" | "ghost" | "link"
  size?: "default" | "sm" | "lg"
  className?: string
}

export function SignUpButton({ variant = "default", size = "default", className }: SignUpButtonProps) {
  return (
    <ClerkSignUpButton mode="modal">
      <Button variant={variant} size={size} className={className}>
        Sign Up
      </Button>
    </ClerkSignUpButton>
  )
} */