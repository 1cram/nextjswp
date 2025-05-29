"use client"

import type React from "react"

import { useRef } from "react"
import Image from "next/image"
import { motion, useScroll, useTransform } from "framer-motion"

interface ParallaxSectionProps {
  title: string
  description: string
  imageSrc: string
  reverse?: boolean
  children?: React.ReactNode
}

export default function ParallaxSection({
  title,
  description,
  imageSrc,
  reverse = false,
  children,
}: ParallaxSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], [100, -100])
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.8, 1, 1, 0.8])

  return (
    <section ref={sectionRef} className="relative py-20 md:py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-8 md:gap-16 items-center">
        <div className={`${reverse ? "md:order-2" : ""}`}>
          <motion.div style={{ opacity, scale }} className="space-y-6">
            <h2 className="text-3xl md:text-4xl font-semibold">{title}</h2>
            <p className="text-lg text-gray-600">{description}</p>
            {children}
          </motion.div>
        </div>
        <div className={`${reverse ? "md:order-1" : ""}`}>
          <motion.div style={{ y, opacity }} className="relative h-[400px] md:h-[500px] rounded-2xl overflow-hidden">
            <Image src={imageSrc || "/placeholder.svg"} alt={title} fill className="object-cover" />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
