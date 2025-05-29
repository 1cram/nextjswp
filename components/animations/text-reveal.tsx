"use client"

import type React from "react"

import { useRef, useEffect } from "react"
import { motion, useInView, useAnimation } from "framer-motion"

interface TextRevealProps {
  children: React.ReactNode
  className?: string
  delay?: number
  duration?: number
  once?: boolean
}

export default function TextReveal({
  children,
  className = "",
  delay = 0,
  duration = 0.8,
  once = true,
}: TextRevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once, amount: 0.3 })
  const controls = useAnimation()

  useEffect(() => {
    if (isInView) {
      controls.start("visible")
    } else if (!once) {
      controls.start("hidden")
    }
  }, [isInView, controls, once])

  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <motion.div
        variants={{
          hidden: { y: 75, opacity: 0 },
          visible: {
            y: 0,
            opacity: 1,
            transition: {
              duration,
              delay,
              ease: [0.22, 1, 0.36, 1],
            },
          },
        }}
        initial="hidden"
        animate={controls}
      >
        {children}
      </motion.div>
    </div>
  )
}
