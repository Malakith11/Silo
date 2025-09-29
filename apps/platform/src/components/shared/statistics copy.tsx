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
      className="flex flex-col items-start w-full pl-6 sm:pl-12 md:pl-20 lg:pl-32 pr-6 sm:pr-12 md:pr-20 lg:pr-32 mb-2"
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
        <ScrollReveal>
          <Badge
            variant="outline"
            className="inline-flex items-center gap-2 px-4 py-2 text-base sm:text-lg font-semibold bg-white text-black border-white mb-2"
          >
            <FlaskConical className="w-5 h-5 text-black" />
            BERT-Lm Powered
          </Badge>
        </ScrollReveal>
      </motion.div>
      <motion.div variants={fadeUp}>
        <ScrollReveal>
          <div className="space-y-2 text-left font-medium drop-shadow-lg w-full max-w-full">
            <div className="flex items-center gap-4">
              <span className="font-extrabold text-blue-400 text-3xl sm:text-5xl md:text-6xl lg:text-7xl w-32 text-right">
                52,847
              </span>
              <span className="text-lg sm:text-2xl md:text-3xl lg:text-4xl text-white whitespace-nowrap pl-4">
                Research Studies
              </span>
            </div>
            <div className="flex items-center gap-4">
              <span className="font-extrabold text-blue-400 text-3xl sm:text-5xl md:text-6xl lg:text-7xl w-32 text-right">
                12,847
              </span>
              <span className="text-lg sm:text-2xl md:text-3xl lg:text-4xl text-white whitespace-nowrap pl-4">
                Supplement Products
              </span>
            </div>
            <div className="flex items-center gap-4">
              <span
                className="font-extrabold text-blue-400 text-3xl sm:text-5xl md:text-6xl lg:text-7xl w-32 text-right"
                aria-label="1,200 plus"
              >
                1,200+
              </span>
              <span className="text-lg sm:text-2xl md:text-3xl lg:text-4xl text-white whitespace-nowrap pl-4">
                Brands Tracked
              </span>
            </div>
          </div>
        </ScrollReveal>
      </motion.div>
    </motion.div>
  )
}
