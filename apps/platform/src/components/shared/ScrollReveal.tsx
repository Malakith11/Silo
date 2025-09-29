"use client"
import { ReactNode } from "react"
import { useInView } from "react-intersection-observer"

export function ScrollReveal({
  children,
  threshold = 0.1,
  rootMargin = "0px",
  className = "",
}: {
  children: ReactNode
  threshold?: number
  rootMargin?: string
  className?: string
}) {
  const { ref, inView } = useInView({ threshold, rootMargin, triggerOnce: true })
  return (
    <div ref={ref} className={`${className} ${inView ? "is-visible" : ""}`}>
      {children}
    </div>
  )
}
