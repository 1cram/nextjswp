"use client"

import type React from "react"

import { useRef } from "react"
import Image from "next/image"
import { motion, useScroll, useTransform } from "framer-motion"

interface StickyProductRevealProps {
  title: string
  description: string
  features: {
    title: string
    description: string
    icon: React.ReactNode
  }[]
  imageSrc: string
}

export default function StickyProductReveal({ title, description, features, imageSrc }: StickyProductRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  })

  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.8, 1, 1, 0.9])
  const opacity = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0, 1, 1, 0])
  const rotate = useTransform(scrollYProgress, [0, 0.5, 1], [-10, 0, 10])

  const titleOpacity = useTransform(scrollYProgress, [0, 0.2], [0, 1])
  const featureOpacities = features.map((_, index) =>
    useTransform(scrollYProgress, [0.2 + index * 0.1, 0.3 + index * 0.1], [0, 1]),
  )
  const featureYs = features.map((_, index) =>
    useTransform(scrollYProgress, [0.2 + index * 0.1, 0.3 + index * 0.1], [50, 0]),
  )

  return (
    <div ref={containerRef} className="relative h-[300vh]">
      <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 py-16 grid md:grid-cols-2 gap-8 items-center">
          <div className="space-y-8">
            <motion.div style={{ opacity: titleOpacity }} className="space-y-4">
              <h2 className="text-4xl md:text-5xl font-bold">{title}</h2>
              <p className="text-xl text-gray-600">{description}</p>
            </motion.div>

            <div className="space-y-6">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  style={{
                    opacity: featureOpacities[index],
                    y: featureYs[index],
                  }}
                  className="flex items-start space-x-4"
                >
                  <div className="bg-gray-100 p-3 rounded-full">{feature.icon}</div>
                  <div>
                    <h3 className="text-lg font-semibold">{feature.title}</h3>
                    <p className="text-gray-600">{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="flex justify-center">
            <motion.div
              style={{
                scale,
                opacity,
                rotateZ: rotate,
              }}
              className="relative h-[400px] w-[400px]"
            >
              <Image src={imageSrc || "/placeholder.svg"} alt={title} fill className="object-contain" />
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}
