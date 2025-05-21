"use client"

import { useRef, useEffect } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"

interface MarqueeBannerProps {
  items: {
    image: string
    alt: string
    width: number
    height: number
    link?: string
  }[]
  speed?: number
  direction?: "left" | "right"
  pauseOnHover?: boolean
  className?: string
}

export default function MarqueeBanner({
  items,
  speed = 40,
  direction = "left",
  pauseOnHover = true,
  className = "",
}: MarqueeBannerProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const scrollerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!scrollerRef.current) return

    // Duplicate items to create a seamless loop
    const scrollerContent = Array.from(scrollerRef.current.children)
    scrollerContent.forEach((item) => {
      const duplicate = item.cloneNode(true)
      scrollerRef.current?.appendChild(duplicate)
    })
  }, [items])

  const directionFactor = direction === "left" ? -1 : 1
  const baseVelocity = speed * directionFactor

  return (
    <div
      ref={containerRef}
      className={`overflow-hidden whitespace-nowrap ${className}`}
      style={{ maskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)" }}
    >
      <motion.div
        ref={scrollerRef}
        className="flex"
        animate={{
          x: direction === "left" ? "-50%" : "0%",
        }}
        transition={{
          duration: items.length * (100 / speed),
          repeat: Number.POSITIVE_INFINITY,
          ease: "linear",
          repeatType: "loop",
        }}
        whileHover={pauseOnHover ? { animationPlayState: "paused" } : undefined}
      >
        {items.map((item, index) => (
          <div key={index} className="flex-shrink-0 px-4">
            {item.link ? (
              <Link href={item.link} className="block relative transition-transform hover:scale-105">
                <div className="relative" style={{ width: `${item.width}px`, height: `${item.height}px` }}>
                  <Image
                    src={item.image || "/placeholder.svg"}
                    alt={item.alt}
                    fill
                    className="object-contain rounded-lg"
                  />
                </div>
              </Link>
            ) : (
              <div className="relative" style={{ width: `${item.width}px`, height: `${item.height}px` }}>
                <Image src={item.image || "/placeholder.svg"} alt={item.alt} fill className="object-contain" />
              </div>
            )}
          </div>
        ))}
      </motion.div>
    </div>
  )
}
