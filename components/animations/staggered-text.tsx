"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"

interface StaggeredTextProps {
  text: string
  tag?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span"
  delay?: number
  staggerChildren?: number
  className?: string
}

export default function StaggeredText({
  text,
  tag = "p",
  delay = 0,
  staggerChildren = 0.03,
  className = "",
}: StaggeredTextProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })

  const words = text.split(" ")

  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren, delayChildren: delay * i },
    }),
  }

  const child = {
    hidden: {
      opacity: 0,
      y: 20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
  }

  const Tag = tag

  return (
    <div ref={ref} className={className}>
      <motion.div
        variants={container}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="flex flex-wrap"
      >
        {words.map((word, index) => (
          <motion.span key={index} variants={child} className="mr-1 mb-1">
            {word}
          </motion.span>
        ))}
      </motion.div>
    </div>
  )
}
