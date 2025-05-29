"use client"

import { useRef } from "react"
import Image from "next/image"
import { motion, useInView } from "framer-motion"

interface SlideInImageProps {
  src: string
  alt: string
  width: number
  height: number
  direction?: "left" | "right" | "top" | "bottom"
  delay?: number
  className?: string
  priority?: boolean
}

export default function SlideInImage({
  src,
  alt,
  width,
  height,
  direction = "left",
  delay = 0,
  className = "",
  priority = false,
}: SlideInImageProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })

  const getVariants = () => {
    switch (direction) {
      case "left":
        return {
          hidden: { x: -100, opacity: 0 },
          visible: { x: 0, opacity: 1 },
        }
      case "right":
        return {
          hidden: { x: 100, opacity: 0 },
          visible: { x: 0, opacity: 1 },
        }
      case "top":
        return {
          hidden: { y: -100, opacity: 0 },
          visible: { y: 0, opacity: 1 },
        }
      case "bottom":
        return {
          hidden: { y: 100, opacity: 0 },
          visible: { y: 0, opacity: 1 },
        }
      default:
        return {
          hidden: { x: -100, opacity: 0 },
          visible: { x: 0, opacity: 1 },
        }
    }
  }

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      <motion.div
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={getVariants()}
        transition={{
          duration: 0.8,
          delay,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="relative"
        style={{ width, height }}
      >
        <Image src={src || "/placeholder.svg"} alt={alt} fill className="object-cover" priority={priority} />
      </motion.div>
    </div>
  )
}
