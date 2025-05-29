"use client"

import { useRef, useEffect, useState } from "react"
import Image from "next/image"

interface ScrollSequenceProps {
  totalFrames: number
  height: number
  width?: number
  baseUrl: string
  fileExtension: string
  startFrame?: number
  className?: string
}

export default function ScrollSequence({
  totalFrames,
  height,
  width = 100,
  baseUrl,
  fileExtension,
  startFrame = 1,
  className = "",
}: ScrollSequenceProps) {
  const [currentFrame, setCurrentFrame] = useState(startFrame)
  const containerRef = useRef<HTMLDivElement>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [loadedFrames, setLoadedFrames] = useState<number[]>([])

  // Preload essential frames
  useEffect(() => {
    const framesToPreload = [startFrame, Math.floor(totalFrames / 2), totalFrames]
    const preloadImages = async () => {
      try {
        const promises = framesToPreload.map((frame) => {
          return new Promise<number>((resolve) => {
            const img = new Image()
            img.src = `${baseUrl}${frame}.${fileExtension}`
            img.onload = () => resolve(frame)
            img.onerror = () => resolve(frame) // Still resolve on error to prevent rejection
          })
        })

        const loaded = await Promise.all(promises)
        setLoadedFrames(loaded)
        setIsLoading(false)
      } catch (error) {
        console.error("Error preloading images:", error)
        setIsLoading(false) // Ensure loading state is updated even on error
      }
    }

    preloadImages()
  }, [baseUrl, fileExtension, startFrame, totalFrames])

  useEffect(() => {
    if (!containerRef.current) return

    const handleScroll = () => {
      if (!containerRef.current) return

      const rect = containerRef.current.getBoundingClientRect()
      const scrollPercentage = 1 - rect.top / (window.innerHeight * 0.8)

      if (scrollPercentage >= 0 && scrollPercentage <= 1) {
        const frame = Math.max(
          startFrame,
          Math.min(Math.floor(startFrame + scrollPercentage * (totalFrames - startFrame)), totalFrames),
        )
        setCurrentFrame(frame)
      }
    }

    window.addEventListener("scroll", handleScroll)
    handleScroll() // Initial check

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [startFrame, totalFrames])

  // For demo purposes, we'll use placeholder images
  const imageSrc = `/placeholder.svg?height=${height}&width=${width}${!isLoading ? `&text=Frame ${currentFrame}` : ""}`

  return (
    <div ref={containerRef} className={`relative ${className}`} style={{ height: `${height * 2}px` }}>
      <div className="sticky top-[20vh] flex items-center justify-center">
        <div className="relative" style={{ height: `${height}px`, width: `${width}px` }}>
          <Image
            src={imageSrc || "/placeholder.svg"}
            alt={`Animation frame ${currentFrame}`}
            fill
            className="object-contain"
            priority
          />
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-100/50 backdrop-blur-sm">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          )}
          <div className="absolute bottom-4 left-4 bg-black/70 text-white px-2 py-1 rounded-md text-xs">
            Frame: {currentFrame} / {totalFrames}
          </div>
        </div>
      </div>
    </div>
  )
}
