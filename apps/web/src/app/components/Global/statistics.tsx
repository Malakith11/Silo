"use client"
import { motion, easeOut } from "framer-motion"
import { ScrollReveal } from "./ScrollReveal"
import { Badge } from "../ui/badge"
import { FlaskConical } from "lucide-react"

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

export function Statistics() {
  return (
    <motion.div
      className="flex flex-col items-start w-full pl-6 sm:pl-12 md:pl-20 lg:pl-32 pr-6 sm:pr-12 md:pr-20 lg:pr-32 mb-28"
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
      <motion.div variants={fadeUp}>
      </motion.div>
      <motion.div variants={fadeUp}>
        <ScrollReveal>
          <div className="space-y-2 text-left font-medium drop-shadow-lg w-full max-w-full">
            <div className="flex items-center gap-4">
              <span className="font-extrabold text-blue-400 text-2xl sm:text-3xl md:text-4xl lg:text-6xl w-32 text-right">
                52,847
              </span>
              <span className="text-lg sm:text-xl md:text-2xl lg:text-2xl text-white whitespace-nowrap pl-24">
                Research Studies
              </span>
            </div>
            <div className="flex items-center gap-4">
              <span className="font-extrabold text-blue-400 text-2xl sm:text-3xl md:text-4xl lg:text-6xl w-32 text-right">
                12,847
              </span>
              <span className="text-lg sm:text-xl md:text-2xl lg:text-2xl text-white whitespace-nowrap pl-24">
                Supplement Products
              </span>
            </div>
            <div className="flex items-center gap-4">
              <span
                className="font-extrabold text-blue-400 text-2xl sm:text-3xl md:text-4xl lg:text-6xl w-32 text-right"
                aria-label="1,200 plus"
              >
                1,200+
              </span>
              <span className="text-lg sm:text-xl md:text-2xl lg:text-2xl text-white whitespace-nowrap pl-24">
                Brands Tracked
              </span>
            </div>
          </div>
        </ScrollReveal>
      </motion.div>
    </motion.div>
  )
}
