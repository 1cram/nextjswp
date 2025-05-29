"use client"

import { useState, useEffect, useRef } from "react"
import { motion, useInView } from "framer-motion"

interface CounterItem {
  value: number
  label: string
  prefix?: string
  suffix?: string
}

interface AnimatedCounterProps {
  items: CounterItem[]
  duration?: number
  title?: string
  subtitle?: string
}

export default function AnimatedCounter({ items, duration = 2, title, subtitle }: AnimatedCounterProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })
  const [counts, setCounts] = useState<number[]>(items.map(() => 0))

  useEffect(() => {
    if (!isInView) return

    const intervalIds: NodeJS.Timeout[] = []

    items.forEach((item, index) => {
      const stepTime = Math.floor((duration * 1000) / item.value)
      let currentCount = 0

      const id = setInterval(() => {
        currentCount += 1
        setCounts((prevCounts) => {
          const newCounts = [...prevCounts]
          newCounts[index] = currentCount
          return newCounts
        })

        if (currentCount >= item.value) {
          clearInterval(id)
        }
      }, stepTime)

      intervalIds.push(id)
    })

    return () => {
      intervalIds.forEach((id) => clearInterval(id))
    }
  }, [isInView, items, duration])

  return (
    <section ref={ref} className="py-20 bg-gradient-dark text-white">
      <div className="max-w-7xl mx-auto px-4">
        {title && (
          <motion.h2
            className="text-3xl md:text-4xl font-bold text-center mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8 }}
          >
            {title}
          </motion.h2>
        )}

        {subtitle && (
          <motion.p
            className="text-lg text-center mb-12 max-w-3xl mx-auto text-gray-300"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {subtitle}
          </motion.p>
        )}

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {items.map((item, index) => (
            <motion.div
              key={index}
              className="bg-unika-dark-lighter/50 backdrop-blur-sm rounded-lg p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.8, delay: 0.1 * index }}
            >
              <div className="text-4xl md:text-5xl font-bold mb-2 text-unika-yellow">
                {item.prefix}
                {counts[index]}
                {item.suffix}
              </div>
              <div className="text-gray-300">{item.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
