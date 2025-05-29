"use client"

import type React from "react"

import { useState, useRef } from "react"
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion"
import Image from "next/image"

interface RotatingCardProps {
  frontImage: string
  backImage: string
  alt: string
  width: number
  height: number
  className?: string
}

export default function RotatingCard({ frontImage, backImage, alt, width, height, className = "" }: RotatingCardProps) {
  const [isFlipped, setIsFlipped] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)

  // Mouse position values
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  // Transform mouse position into rotation values
  const rotateX = useTransform(y, [-300, 300], [15, -15])
  const rotateY = useTransform(x, [-300, 300], [-15, 15])

  // Add spring physics for smoother rotation
  const springRotateX = useSpring(rotateX, { stiffness: 100, damping: 30 })
  const springRotateY = useSpring(rotateY, { stiffness: 100, damping: 30 })

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (!cardRef.current) return

    const rect = cardRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2

    x.set(e.clientX - centerX)
    y.set(e.clientY - centerY)
  }

  function handleMouseLeave() {
    x.set(0)
    y.set(0)
  }

  return (
    <div
      ref={cardRef}
      className={`cursor-pointer perspective-1000 ${className}`}
      style={{ width, height }}
      onClick={() => setIsFlipped(!isFlipped)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        className="relative w-full h-full preserve-3d transition-transform duration-700"
        style={{
          rotateX: springRotateX,
          rotateY: springRotateY,
          transformStyle: "preserve-3d",
          transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
        }}
      >
        {/* Front */}
        <div
          className="absolute w-full h-full backface-hidden rounded-2xl overflow-hidden shadow-lg"
          style={{ backfaceVisibility: "hidden" }}
        >
          <Image src={frontImage || "/placeholder.svg"} alt={alt} fill className="object-cover" />
        </div>

        {/* Back */}
        <div
          className="absolute w-full h-full backface-hidden rounded-2xl overflow-hidden shadow-lg"
          style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
        >
          <Image src={backImage || "/placeholder.svg"} alt={`${alt} (back)`} fill className="object-cover" />
        </div>
      </motion.div>
    </div>
  )
}
