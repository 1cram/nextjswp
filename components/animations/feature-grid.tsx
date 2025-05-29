"use client"

import { useRef } from "react"
import { motion } from "framer-motion"
import Image from "next/image"

interface Feature {
  title: string
  description: string
  icon: string
  color?: string
}

interface FeatureGridProps {
  title: string
  subtitle: string
  features: Feature[]
  backgroundColor?: string
  textColor?: string
}

export default function FeatureGrid({
  title,
  subtitle,
  features,
  backgroundColor = "#f5f5f7",
  textColor = "#1d1d1f",
}: FeatureGridProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  }

  return (
    <div ref={containerRef} className="py-24 md:py-32" style={{ backgroundColor, color: textColor }}>
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2
            className="text-4xl md:text-5xl font-semibold mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true }}
          >
            {title}
          </motion.h2>
          <motion.p
            className="text-xl opacity-80"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true }}
          >
            {subtitle}
          </motion.p>
        </div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={item}
              className="bg-white rounded-3xl p-8 shadow-sm hover:shadow-md transition-shadow duration-300"
              style={{ borderTop: `4px solid ${feature.color || "#0071e3"}` }}
            >
              <div className="mb-6">
                <Image
                  src={feature.icon || "/placeholder.svg?height=60&width=60"}
                  alt={feature.title}
                  width={60}
                  height={60}
                />
              </div>
              <h3 className="text-2xl font-semibold mb-3">{feature.title}</h3>
              <p className="opacity-80">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  )
}
