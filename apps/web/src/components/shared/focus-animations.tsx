"use client"
import { useMotion } from "./motion-provider"
import React from "react"
import { cn } from "@/lib/utils"

interface FocusAnimationProps {
  children: React.ReactNode
  className?: string
  type?: "scale" | "glow" | "lift" | "border" | "background"
  intensity?: "subtle" | "normal" | "strong"
  disabled?: boolean
}

export const FocusAnimation = React.forwardRef<HTMLDivElement, FocusAnimationProps>(function FocusAnimation(
  {
    children,
    className,
    type = "scale",
    intensity = "normal",
    disabled = false,
  },
  ref
) {
  const { shouldAnimate } = useMotion()

  if (disabled || !shouldAnimate) {
    return <div ref={ref} className={className}>{children}</div>
  }

  const baseClasses = "transition-all duration-200 ease-out"

  const animationClasses = {
    scale: {
      subtle: "hover:scale-[1.02] focus-visible:scale-[1.02]",
      normal: "hover:scale-105 focus-visible:scale-105",
      strong: "hover:scale-110 focus-visible:scale-110",
    },
    glow: {
      subtle: "hover:shadow-sm focus-visible:shadow-sm hover:shadow-navy-600/10 focus-visible:shadow-navy-600/10",
      normal: "hover:shadow-md focus-visible:shadow-md hover:shadow-navy-600/20 focus-visible:shadow-navy-600/20",
      strong: "hover:shadow-lg focus-visible:shadow-lg hover:shadow-navy-600/30 focus-visible:shadow-navy-600/30",
    },
    lift: {
      subtle: "hover:-translate-y-0.5 focus-visible:-translate-y-0.5",
      normal: "hover:-translate-y-1 focus-visible:-translate-y-1",
      strong: "hover:-translate-y-2 focus-visible:-translate-y-2",
    },
    border: {
      subtle: "hover:border-navy-600/30 focus-visible:border-navy-600/30",
      normal: "hover:border-navy-600/50 focus-visible:border-navy-600/50",
      strong: "hover:border-navy-600 focus-visible:border-navy-600",
    },
    background: {
      subtle: "hover:bg-navy-600/5 focus-visible:bg-navy-600/5",
      normal: "hover:bg-navy-600/10 focus-visible:bg-navy-600/10",
      strong: "hover:bg-navy-600/20 focus-visible:bg-navy-600/20",
    },
  }

  const focusRing = cn(
    "focus-visible:outline-none",
    "focus-visible:ring-4 focus-visible:ring-navy-600/80 focus-visible:ring-offset-4 focus-visible:ring-offset-background",
    "dark:focus-visible:ring-navy-400/90 dark:focus-visible:ring-offset-background",
    "focus-visible:shadow-lg focus-visible:shadow-navy-600/20",
  )

  // Safely get animation classes with fallbacks
  let typeClasses = animationClasses[type];
  if (!typeClasses) {
    console.warn(`[FocusAnimation] Unknown type "${type}" passed. Falling back to "scale".`);
    typeClasses = animationClasses.scale;
  }
  const intensityClasses = typeClasses[intensity] || typeClasses.normal

  return <div ref={ref} className={cn(baseClasses, intensityClasses, focusRing, className)}>{children}</div>
})
// Specialized components for common use cases

/**
 * FocusCard applies a "lift" animation and enhanced focus ring to its children, suitable for card-like UI elements.
 *
 * @param {Omit<FocusAnimationProps, "type">} props - Props for the FocusCard component, excluding the "type".
export function FocusCard({ children, className, ...props }: Omit<FocusAnimationProps, "type"> & {}) {
 */
export function FocusCard({ children, className, ...props }: Omit<FocusAnimationProps, "type">) {
  const enhancedFocusRing = cn(
    "focus-visible:outline-none",
    "focus-visible:ring-4 focus-visible:ring-navy-600/80 focus-visible:ring-offset-4",
    "dark:focus-visible:ring-navy-400/90",
    "focus-visible:shadow-xl focus-visible:shadow-navy-600/30",
    "focus-visible:border-navy-600/50 dark:focus-visible:border-navy-400/50",
  )

  return (
    <FocusAnimation type="lift" className={cn("rounded-lg", enhancedFocusRing, className)} {...props}>
      {children}
    </FocusAnimation>
  )
}

/**
 * FocusButton applies a "scale" animation and enhanced focus ring to its children, suitable for button elements.
 *
 * @param {Omit<FocusAnimationProps, "type">} props - Props for the FocusButton component, excluding the "type".
 * @returns {JSX.Element} The animated button component.
 */
export function FocusButton({ children, className, ...props }: Omit<FocusAnimationProps, "type">) {
  const enhancedFocusRing = cn(
    "focus-visible:outline-none",
    "focus-visible:ring-4 focus-visible:ring-navy-600 focus-visible:ring-offset-4",
    "dark:focus-visible:ring-navy-400",
    "focus-visible:shadow-lg focus-visible:shadow-navy-600/40",
  )

  return (
    <FocusAnimation
      type="scale"
      className={cn("rounded-md", enhancedFocusRing, className)}
      {...props}
    >
      {children}
    </FocusAnimation>
  )
}

/**
 * FocusIcon applies a subtle "scale" animation and enhanced focus ring to its children, suitable for icon elements.
 *
 * @param {Omit<FocusAnimationProps, "type">} props - Props for the FocusIcon component, excluding the "type".
 * @returns {JSX.Element} The animated icon component.
 */
export function FocusIcon({ children, className, ...props }: Omit<FocusAnimationProps, "type">) {
  const enhancedFocusRing = cn(
    "focus-visible:outline-none",
    "focus-visible:ring-2 focus-visible:ring-navy-600/90 focus-visible:ring-offset-2",
    "dark:focus-visible:ring-navy-400",
    "focus-visible:shadow-md focus-visible:shadow-navy-600/30",
  )

  return (
    <FocusAnimation
      type="scale"
      intensity="subtle"
      className={cn("rounded-full", enhancedFocusRing, className)}
      {...props}
    >
      {children}
    </FocusAnimation>
  )
}
