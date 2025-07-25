"use client"
import { motion, easeOut } from "framer-motion"
import { ScrollReveal } from "./ScrollReveal"

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: easeOut,
    },
  },
}

export function HeroContent() {
  return (
    <motion.div
      className="flex flex-col items-start w-full pl-4 sm:pl-6 md:pl-8 lg:pl-16 max-w-full sm:max-w-2xl mt-0"
      variants={{
        hidden: {},
        show: {
          transition: {
            staggerChildren: 0.25,
          },
        },
      }}
      initial="hidden"
      animate="show"
    >
      <motion.h1
        className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-left text-white"
        variants={fadeUp}
      >
        From Goal to Dose.
        <br />
        <span className="text-white">In Minutes</span>
      </motion.h1>
      <motion.div variants={fadeUp}>
        <ScrollReveal>
          <p className="block text-base sm:text-lg md:text-xl leading-relaxed max-w-full sm:max-w-xl text-left text-white mt-4 sm:mt-6">
            50,000+ studies analysed to build your personalised supplement protocol — evidence‑based with
            drag‑and‑drop simplicity.
          </p>
        </ScrollReveal>
      </motion.div>
    </motion.div>
  )
}
