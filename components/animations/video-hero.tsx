"use client"

import { useRef, useState, useEffect } from "react"
import { motion, useScroll, useTransform } from "framer-motion"

interface VideoHeroProps {
  title: string
  subtitle: string
  videoSrc: string
  posterSrc?: string
  backgroundColor?: string
  textColor?: string
  height?: string
}

export default function VideoHero({
  title,
  subtitle,
  videoSrc,
  posterSrc,
  backgroundColor = "black",
  textColor = "white",
  height = "100vh",
}: VideoHeroProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const [videoLoaded, setVideoLoaded] = useState(false)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 1.1])

  // Gestione del caricamento del video
  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const handleLoadedData = () => {
      setVideoLoaded(true)
    }

    video.addEventListener("loadeddata", handleLoadedData)

    // Autoplay quando il video è caricato
    if (video.readyState >= 3) {
      setVideoLoaded(true)
    }

    return () => {
      video.removeEventListener("loadeddata", handleLoadedData)
    }
  }, [])

  // Effetto di split text per il titolo
  const titleWords = title.split(" ")

  return (
    <div
      ref={containerRef}
      className="relative overflow-hidden"
      style={{
        backgroundColor,
        color: textColor,
        height,
      }}
    >
      <motion.div className="absolute inset-0 z-0" style={{ opacity, scale }}>
        <div className="absolute inset-0 bg-black/30 z-10"></div>
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          poster={posterSrc || "/placeholder.svg?height=1080&width=1920"}
        >
          <source src={videoSrc} type="video/mp4" />
          Il tuo browser non supporta il tag video.
        </video>
      </motion.div>

      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
        <div className="max-w-4xl">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            {titleWords.map((word, index) => (
              <motion.span
                key={index}
                className="inline-block mr-2"
                initial={{ opacity: 0, y: 50 }}
                animate={{
                  opacity: videoLoaded ? 1 : 0,
                  y: videoLoaded ? 0 : 50,
                }}
                transition={{
                  duration: 0.8,
                  delay: 0.5 + index * 0.1,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                {word}
              </motion.span>
            ))}
          </h1>

          <motion.p
            className="text-xl md:text-2xl opacity-90"
            initial={{ opacity: 0 }}
            animate={{ opacity: videoLoaded ? 1 : 0 }}
            transition={{ duration: 1, delay: 1.2 }}
          >
            {subtitle}
          </motion.p>
        </div>
      </div>
    </div>
  )
}
