"use client"

import type React from "react"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"

interface FloatingElementsProps {
  children: React.ReactNode
  delay?: number
  duration?: number
  className?: string
}

export default function FloatingElements({ children, delay = 0, duration = 3, className = "" }: FloatingElementsProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: false, amount: 0.3 })

  return (
    <div ref={ref} className={className}>
      <motion.div
        initial={{ y: 0 }}
        animate={
          isInView
            ? {
                y: [0, -10, 0],
                transition: {
                  duration,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "reverse",
                  ease: "easeInOut",
                  delay,
                },
              }
            : { y: 0 }
        }
      >
        {children}
      </motion.div>
    </div>
  )
}
