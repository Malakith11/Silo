"use client"
import { useState, useEffect, useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { HeroContent } from "../Global/hero-content"
import { Statistics } from "../Global/statistics"

export function Hero({
  onAnimationComplete,
}: {
  onAnimationComplete?: () => void
}) {
  const [showProgress, setShowProgress] = useState(false)
  const [progress, setProgress] = useState(0)
  const heroRef = useRef<HTMLElement>(null)

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  })

  const smoothstep = (t: number) => t * t * (3 - 2 * t)
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"], { ease: smoothstep })
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "-10%"], { ease: smoothstep })
  const secondaryPanelY = useTransform(scrollYProgress, [0, 1], ["0%", "-5%"], { ease: smoothstep })
  const opacity = useTransform(scrollYProgress, [0, 0.7, 1], [1, 0.8, 0.5])

  useEffect(() => {
    document.documentElement.style.scrollBehavior = "smooth"
    const handleScroll = () => {
      const scrollTop = window.scrollY
      setShowProgress(scrollTop > 0)

      const docHeight = document.body.scrollHeight - window.innerHeight
      setProgress(docHeight > 0 ? scrollTop / docHeight : 0)
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => {
      window.removeEventListener("scroll", handleScroll)
      document.documentElement.style.scrollBehavior = "auto"
    }
  },)

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex flex-col justify-between pt-20 overflow-hidden"
    >
      <motion.div
        className="absolute inset-0 w-full h-[120%] -top-[10%]"
        style={{ y: backgroundY }}
        transition={{ type: "spring", stiffness: 100, damping: 30, duration: 0.8 }}
      >
        <video
          className="w-full h-full object-cover"
          src="/General Images/Silo-Bg-Main.avif"
          autoPlay
          loop
          muted
          playsInline
          onCanPlay={(e) => (e.currentTarget.playbackRate = 0.7)}
        />
        <motion.div
          className="absolute inset-0 bg-black/40"
          style={{ opacity }}
          transition={{ type: "spring", stiffness: 100, damping: 30, duration: 0.8 }}
        />
      </motion.div>

      <motion.div
        className="relative z-20 flex flex-col justify-between min-h-screen"
        style={{ y: contentY }}
        transition={{ type: "spring", stiffness: 100, damping: 30, duration: 0.8 }}
        onAnimationComplete={() => setTimeout(() => onAnimationComplete?.(), 500)}
      >
        <HeroContent />
        <Statistics />
      </motion.div>

      {showProgress && (
        <div className="fixed top-0 left-0 w-full z-[60] pointer-events-none">
          <div
            className="h-1 bg-blue-600 transition-all duration-100"
            style={{ width: `${progress * 100}%` }}
          />
        </div>
      )}

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 1.4 }}
        className="absolute z-40 flex flex-col items-end w-full sm:max-w-[60%] md:max-w-[55%] lg:max-w-[50%] pr-8 md:pr-12 lg:pr-16"
        style={{
          y: secondaryPanelY,
          bottom: "15%",
          right: 0,
        }}
      >      </motion.div>
    </section>
  )
}
