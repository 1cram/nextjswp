"use client"

import { useRef, useEffect } from "react"
import { motion, useScroll, useTransform, useSpring } from "framer-motion"
import Image from "next/image"

interface AppleHeroProps {
  title: string
  subtitle: string
  imageSrc: string
  imageAlt: string
  backgroundColor?: string
  textColor?: string
}

export default function AppleHero({
  title,
  subtitle,
  imageSrc,
  imageAlt,
  backgroundColor = "#f5f5f7",
  textColor = "#1d1d1f",
}: AppleHeroProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  })

  // Effetto parallasse per l'immagine
  const imageY = useTransform(scrollYProgress, [0, 1], [0, 200])
  const imageScale = useTransform(scrollYProgress, [0, 0.5], [1, 1.2])
  const imageOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])

  // Effetto per il titolo
  const titleY = useTransform(scrollYProgress, [0, 0.5], [0, -100])
  const titleOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  // Aggiungi spring per movimenti più fluidi
  const springImageY = useSpring(imageY, { stiffness: 100, damping: 30 })
  const springTitleY = useSpring(titleY, { stiffness: 100, damping: 30 })

  // Effetto di split text per il titolo
  useEffect(() => {
    if (!titleRef.current) return

    const titleElement = titleRef.current
    const text = titleElement.innerText
    const splitText = text
      .split("")
      .map(
        (char, i) =>
          `<span style="display: inline-block; opacity: 0; transform: translateY(20px); 
      animation: fadeUp 0.5s ${i * 0.03}s forwards;">${char}</span>`,
      )
      .join("")

    titleElement.innerHTML = splitText

    const style = document.createElement("style")
    style.textContent = `
      @keyframes fadeUp {
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
    `
    document.head.appendChild(style)

    return () => {
      document.head.removeChild(style)
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className="relative overflow-hidden"
      style={{
        backgroundColor,
        color: textColor,
        minHeight: "100vh",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 pt-32 pb-64 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <motion.h1
            ref={titleRef}
            className="text-6xl md:text-8xl font-bold mb-6"
            style={{
              y: springTitleY,
              opacity: titleOpacity,
            }}
          >
            {title}
          </motion.h1>

          <motion.p
            className="text-xl md:text-2xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            {subtitle}
          </motion.p>
        </div>
      </div>

      <motion.div
        ref={imageRef}
        className="absolute inset-0 flex items-center justify-center"
        style={{
          y: springImageY,
          scale: imageScale,
          opacity: imageOpacity,
        }}
      >
        <div className="relative w-full h-full max-w-5xl mx-auto">
          <Image
            src={imageSrc || "/placeholder.svg?height=800&width=1200"}
            alt={imageAlt}
            fill
            className="object-contain"
            priority
          />
        </div>
      </motion.div>
    </div>
  )
}
