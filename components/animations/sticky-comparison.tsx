"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import Image from "next/image"

interface ComparisonItem {
  title: string
  features: string[]
  imageSrc: string
  imageAlt: string
  color?: string
}

interface StickyComparisonProps {
  title: string
  subtitle: string
  items: ComparisonItem[]
  backgroundColor?: string
  textColor?: string
}

export default function StickyComparison({
  title,
  subtitle,
  items,
  backgroundColor = "white",
  textColor = "#1d1d1f",
}: StickyComparisonProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  })

  // Calcola l'altezza totale in base al numero di elementi
  const containerHeight = `${items.length * 100}vh`

  // Calculate transform values outside the map function
  const opacityValues = items.map((_, index) => {
    const startProgress = index / items.length
    const endProgress = (index + 1) / items.length
    return [startProgress, startProgress + 0.1, endProgress - 0.1, endProgress]
  })

  const xValues = items.map((_, index) => {
    const startProgress = index / items.length
    const endProgress = (index + 1) / items.length
    return [startProgress, startProgress + 0.1, endProgress - 0.1, endProgress]
  })

  const scaleValues = items.map((_, index) => {
    const startProgress = index / items.length
    const endProgress = (index + 1) / items.length
    return [startProgress, startProgress + 0.1, endProgress - 0.1, endProgress]
  })

  const opacityTransforms = opacityValues.map((values) => useTransform(scrollYProgress, values, [0, 1, 1, 0]))

  const xTransforms = xValues.map((values) => useTransform(scrollYProgress, values, [100, 0, 0, -100]))

  const scaleTransforms = scaleValues.map((values) => useTransform(scrollYProgress, values, [0.8, 1, 1, 0.8]))

  return (
    <div
      ref={containerRef}
      style={{
        height: containerHeight,
        backgroundColor,
        color: textColor,
      }}
      className="relative"
    >
      <div className="sticky top-0 h-screen flex flex-col">
        <div className="py-16 text-center">
          <motion.h2
            className="text-4xl md:text-5xl font-semibold mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            {title}
          </motion.h2>
          <motion.p
            className="text-xl opacity-80 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            {subtitle}
          </motion.p>
        </div>

        <div className="flex-1 flex items-center justify-center px-4">
          <div className="max-w-7xl w-full mx-auto">
            {items.map((item, index) => {
              const opacity = opacityTransforms[index]
              const x = xTransforms[index]
              const scale = scaleTransforms[index]

              return (
                <motion.div
                  key={index}
                  style={{ opacity, x, scale }}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  <div className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
                    <div className="space-y-6 z-10">
                      <h3 className="text-3xl font-semibold" style={{ color: item.color || "#0071e3" }}>
                        {item.title}
                      </h3>
                      <ul className="space-y-4">
                        {item.features.map((feature, featureIndex) => (
                          <motion.li
                            key={featureIndex}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: featureIndex * 0.1 }}
                            className="flex items-start"
                          >
                            <span
                              className="inline-block w-5 h-5 rounded-full mr-3 flex-shrink-0 mt-1"
                              style={{ backgroundColor: item.color || "#0071e3" }}
                            ></span>
                            <span>{feature}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </div>

                    <div className="relative h-[400px]">
                      <Image
                        src={item.imageSrc || "/placeholder.svg?height=800&width=600"}
                        alt={item.imageAlt}
                        fill
                        className="object-contain"
                      />
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
