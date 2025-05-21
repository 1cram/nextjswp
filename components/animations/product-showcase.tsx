"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform, useSpring } from "framer-motion"
import Image from "next/image"

interface ProductShowcaseProps {
  title: string
  description: string
  features: string[]
  imageSrc: string
  imageAlt: string
  backgroundColor?: string
  textColor?: string
  imagePosition?: "left" | "right"
}

export default function ProductShowcase({
  title,
  description,
  features,
  imageSrc,
  imageAlt,
  backgroundColor = "white",
  textColor = "#1d1d1f",
  imagePosition = "right",
}: ProductShowcaseProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  // Animazioni per il prodotto
  const productRotate = useTransform(scrollYProgress, [0, 1], [imagePosition === "right" ? 10 : -10, 0])
  const productScale = useTransform(scrollYProgress, [0, 0.5], [0.8, 1])
  const productOpacity = useTransform(scrollYProgress, [0, 0.3], [0, 1])

  // Animazioni per il testo
  const textX = useTransform(scrollYProgress, [0, 0.5], [imagePosition === "right" ? -50 : 50, 0])
  const textOpacity = useTransform(scrollYProgress, [0, 0.3], [0, 1])

  // Spring per movimenti più fluidi
  const springProductRotate = useSpring(productRotate, { stiffness: 100, damping: 30 })
  const springTextX = useSpring(textX, { stiffness: 100, damping: 30 })

  return (
    <div ref={containerRef} className="py-32 overflow-hidden" style={{ backgroundColor, color: textColor }}>
      <div className="max-w-7xl mx-auto px-4">
        <div
          className={`grid md:grid-cols-2 gap-12 items-center ${imagePosition === "left" ? "md:flex-row-reverse" : ""}`}
        >
          <motion.div
            style={{
              x: springTextX,
              opacity: textOpacity,
            }}
            className="space-y-6"
          >
            <h2 className="text-4xl md:text-5xl font-semibold">{title}</h2>
            <p className="text-xl text-opacity-80">{description}</p>

            <ul className="space-y-4 mt-8">
              {features.map((feature, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  viewport={{ once: true }}
                  className="flex items-start"
                >
                  <span className="inline-block w-6 h-6 rounded-full bg-blue-500 mr-3 flex-shrink-0 mt-1"></span>
                  <span>{feature}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          <div className={`${imagePosition === "left" ? "md:order-first" : ""}`}>
            <motion.div
              style={{
                rotate: springProductRotate,
                scale: productScale,
                opacity: productOpacity,
              }}
              className="relative h-[400px] md:h-[500px]"
            >
              <Image
                src={imageSrc || "/placeholder.svg?height=800&width=800"}
                alt={imageAlt}
                fill
                className="object-contain"
              />
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}
