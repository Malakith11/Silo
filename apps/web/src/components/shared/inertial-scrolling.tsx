"use client"
import { useEffect, useRef } from "react"

export function InertialScrollProvider({ children }: { children: React.ReactNode }) {
  const scrolling = useRef(false)
  const animationFrame = useRef<number | null>(null)
  const targetScroll = useRef(0)
  const currentScroll = useRef(0)
  const snapTimeout = useRef<NodeJS.Timeout | null>(null)
  const lastDirection = useRef<"down" | "up" | null>(null)

  // Helper: Get all snap sections
  const getSections = () =>
    Array.from(document.querySelectorAll<HTMLElement>('[data-snap-section], .snap-section'))

  // Updated: Only snap to sections below (down) or above (up) the current scroll position
  const getSnapTarget = (direction: "down" | "up") => {
    const sections = getSections()
    const viewportHeight = window.innerHeight
    const scrollY = window.scrollY

    if (direction === "down") {
      for (let i = 0; i < sections.length; i++) {
        const section = sections[i]
        const rect = section.getBoundingClientRect()
        const visibleHeight = Math.min(rect.bottom, viewportHeight) - Math.max(rect.top, 0)
        const ratio = Math.max(0, Math.min(visibleHeight / viewportHeight, 1))
        // Only snap if section is below current scroll and at least 80% visible
        if (
          section.offsetTop > scrollY &&
          rect.top < 0 &&
          ratio >= 0.8
        ) {
          return section.offsetTop
        }
      }
    } else {
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i]
        const rect = section.getBoundingClientRect()
        const visibleHeight = Math.min(rect.bottom, viewportHeight) - Math.max(rect.top, 0)
        const ratio = Math.max(0, Math.min(visibleHeight / viewportHeight, 1))
        // Only snap if section is above current scroll and at least 80% visible
        if (
          section.offsetTop < scrollY &&
          rect.bottom > viewportHeight &&
          ratio >= 0.8
        ) {
          return section.offsetTop
        }
      }
    }
    return null
  }

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault()
      const delta = e.deltaY
      targetScroll.current += delta
      targetScroll.current = Math.max(
        0,
        Math.min(targetScroll.current, document.body.scrollHeight - window.innerHeight)
      )
      if (!scrolling.current) {
        scrolling.current = true
        animateScroll()
      }

      // Determine scroll direction
      lastDirection.current = delta > 0 ? "down" : "up"

      // Clear any pending snap
      if (snapTimeout.current) clearTimeout(snapTimeout.current)
      // Set up snap after user stops scrolling for 200ms
      snapTimeout.current = setTimeout(() => {
        const direction = lastDirection.current
        if (!direction) return

        const snapTo = getSnapTarget(direction)
        if (snapTo !== null) {
          targetScroll.current = snapTo
          if (!scrolling.current) {
            scrolling.current = true
            animateScroll()
          }
        }
      }, 200)
    }

    const animateScroll = () => {
      currentScroll.current += (targetScroll.current - currentScroll.current) * 0.1
      window.scrollTo(0, currentScroll.current)
      if (Math.abs(targetScroll.current - currentScroll.current) > 0.2) {
        animationFrame.current = requestAnimationFrame(animateScroll)
      } else {
        currentScroll.current = targetScroll.current
        window.scrollTo(0, currentScroll.current)
        scrolling.current = false
      }
    }

    window.addEventListener("wheel", handleWheel, { passive: false })

    return () => {
      window.removeEventListener("wheel", handleWheel)
      if (animationFrame.current) cancelAnimationFrame(animationFrame.current)
      if (snapTimeout.current) clearTimeout(snapTimeout.current)
    }
  }, [])

  return <>{children}</>
}
