"use client"

import { useRef, useEffect } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ChevronDown } from "lucide-react"

interface HeroSectionProps {
  title: string
  subtitle: string
  videoSrc?: string
  imageSrc?: string
  primaryCTA: {
    text: string
    href: string
  }
  secondaryCTA: {
    text: string
    href: string
  }
}

export default function HeroSection({
  title,
  subtitle,
  videoSrc,
  imageSrc,
  primaryCTA,
  secondaryCTA,
}: HeroSectionProps) {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    // Autoplay del video quando è caricato
    const video = videoRef.current
    let playPromise: Promise<void> | undefined

    if (video) {
      // Wait for the video to be ready before attempting to play
      const handleCanPlay = () => {
        playPromise = video.play()
        playPromise?.catch((error) => {
          console.log("Autoplay not allowed or other error:", error)
        })
      }

      // Add event listener for canplay event
      video.addEventListener("canplay", handleCanPlay)

      // If video is already ready, try to play it
      if (video.readyState >= 3) {
        handleCanPlay()
      }

      // Cleanup function
      return () => {
        video.removeEventListener("canplay", handleCanPlay)

        // If there's a pending play promise, handle it properly
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              if (video.played && !video.paused) {
                video.pause()
              }
            })
            .catch(() => {
              // Ignore errors on cleanup
            })
        }
      }
    }
  }, [])

  const scrollToNextSection = () => {
    const nextSection = document.querySelector("section[id]")
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Video o immagine di sfondo */}
      {videoSrc ? (
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          poster={imageSrc}
        >
          <source src={videoSrc} type="video/mp4" />
          Il tuo browser non supporta il tag video.
        </video>
      ) : (
        imageSrc && (
          <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${imageSrc})` }}></div>
        )
      )}

      {/* Overlay scuro */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-unika-dark/90"></div>

      {/* Contenuto */}
      <div className="relative z-10 text-center text-white px-4 max-w-4xl">
        <motion.h1
          className="text-4xl md:text-6xl font-bold mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {title}
        </motion.h1>

        <motion.p
          className="text-xl md:text-2xl mb-8 text-gray-300"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          {subtitle}
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <Link href={primaryCTA.href}>
            <Button className="bg-unika-yellow hover:bg-unika-yellow-hover text-unika-dark px-8 py-6 rounded-full text-lg font-bold">
              {primaryCTA.text}
            </Button>
          </Link>

          <Link href={secondaryCTA.href}>
            <Button
              variant="outline"
              className="bg-white/10 backdrop-blur-sm border-white text-white hover:bg-white/20 px-8 py-6 rounded-full text-lg"
            >
              {secondaryCTA.text}
            </Button>
          </Link>
        </motion.div>
      </div>

      {/* Freccia scroll down */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 cursor-pointer"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
        onClick={scrollToNextSection}
      >
        <ChevronDown className="h-10 w-10 text-white" />
      </motion.div>
    </section>
  )
}
