"use client"
import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"

interface MotionContextType {
  shouldAnimate: boolean
  setShouldAnimate: (value: boolean) => void
  isSystemReduced: boolean
}

const MotionContext = createContext<MotionContextType | undefined>(undefined)

export function MotionProvider({ children }: { children: React.ReactNode }) {
  const [shouldAnimate, setShouldAnimate] = useState(true)
  const [isSystemReduced, setIsSystemReduced] = useState(false)

  useEffect(() => {
    // Check system preference for reduced motion
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)")
    setIsSystemReduced(mediaQuery.matches)

    // Check localStorage for user preference
    const storedPreference = localStorage.getItem("motion-preference")
    if (storedPreference !== null) {
      setShouldAnimate(storedPreference === "true")
    } else {
      // Default to system preference
      setShouldAnimate(!mediaQuery.matches)
    }

    // Listen for changes to system preference
    const handleChange = (e: MediaQueryListEvent) => {
      setIsSystemReduced(e.matches)
      // Only update if user hasn't set a manual preference
      if (localStorage.getItem("motion-preference") === null) {
        setShouldAnimate(!e.matches)
      }
    }

    mediaQuery.addEventListener("change", handleChange)
    return () => mediaQuery.removeEventListener("change", handleChange)
  }, [])

  const updateShouldAnimate = (value: boolean) => {
    setShouldAnimate(value)
    localStorage.setItem("motion-preference", value.toString())
  }

  return (
    <MotionContext.Provider
      value={{
        shouldAnimate,
        setShouldAnimate: updateShouldAnimate,
        isSystemReduced,
      }}
    >
      {children}
    </MotionContext.Provider>
  )
}

export function useMotion() {
  const context = useContext(MotionContext)
  if (context === undefined) {
    // Fallback for when provider is not available
    return {
      shouldAnimate: true,
      setShouldAnimate: () => {},
      isSystemReduced: false,
    }
  }
  return context
}
