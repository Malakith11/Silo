"use client"
import { useEffect, useState } from "react"
import type React from "react"

import { useMotion } from "../Global/motion-provider"

export function KeyboardNavigationProvider({ children }: { children: React.ReactNode }) {
  const [isKeyboardUser, setIsKeyboardUser] = useState(false)
  const { shouldAnimate } = useMotion()

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Tab") {
        setIsKeyboardUser(true)
      }
    }

    const handleMouseDown = () => {
      setIsKeyboardUser(false)
    }

    document.addEventListener("keydown", handleKeyDown)
    document.addEventListener("mousedown", handleMouseDown)

    return () => {
      document.removeEventListener("keydown", handleKeyDown)
      document.removeEventListener("mousedown", handleMouseDown)
    }
  }, [])

  useEffect(() => {
    if (isKeyboardUser && shouldAnimate) {
      document.body.classList.add("keyboard-user")
    } else {
      document.body.classList.remove("keyboard-user")
    }
  }, [isKeyboardUser, shouldAnimate])

  return <>{children}</>
}

// Hook to detect keyboard navigation
export function useKeyboardNavigation() {
  const [isKeyboardUser, setIsKeyboardUser] = useState(false)

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Tab") {
        setIsKeyboardUser(true)
      }
    }

    const handleMouseDown = () => {
      setIsKeyboardUser(false)
    }

    document.addEventListener("keydown", handleKeyDown)
    document.addEventListener("mousedown", handleMouseDown)

    return () => {
      document.removeEventListener("keydown", handleKeyDown)
      document.removeEventListener("mousedown", handleMouseDown)
    }
  }, [])

  return isKeyboardUser
}
