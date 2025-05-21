"use client"

import { useRef, useEffect, useState } from "react"

interface CanvasSequenceProps {
  totalFrames: number
  width: number
  height: number
  baseUrl: string
  fileExtension: string
  className?: string
}

export default function CanvasSequence({
  totalFrames,
  width,
  height,
  baseUrl,
  fileExtension,
  className = "",
}: CanvasSequenceProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [loadingProgress, setLoadingProgress] = useState(0)
  const [images, setImages] = useState<HTMLImageElement[]>([])

  // Preload all frames
  useEffect(() => {
    const loadImages = async () => {
      try {
        const loadedImages: HTMLImageElement[] = []
        let loadedCount = 0

        for (let i = 1; i <= totalFrames; i++) {
          const img = new Image()
          img.crossOrigin = "anonymous"
          img.src = `${baseUrl}${i}.${fileExtension}`

          await new Promise<void>((resolve) => {
            img.onload = () => {
              loadedImages[i - 1] = img
              loadedCount++
              setLoadingProgress((loadedCount / totalFrames) * 100)
              resolve()
            }
            img.onerror = () => {
              // On error, create a placeholder image
              const placeholderImg = new Image()
              placeholderImg.crossOrigin = "anonymous"
              placeholderImg.src = `/placeholder.svg?height=${height}&width=${width}&text=Frame ${i}`
              loadedImages[i - 1] = placeholderImg
              loadedCount++
              setLoadingProgress((loadedCount / totalFrames) * 100)
              resolve()
            }
          })
        }

        setImages(loadedImages)
        setIsLoading(false)
      } catch (error) {
        console.error("Error loading images:", error)
        setIsLoading(false)
      }
    }

    // For demo purposes, we'll simulate loading frames
    const simulateLoading = () => {
      try {
        const dummyImages: HTMLImageElement[] = []

        for (let i = 1; i <= totalFrames; i++) {
          const img = new Image()
          img.crossOrigin = "anonymous"
          img.src = `/placeholder.svg?height=${height}&width=${width}&text=Frame ${i}`
          dummyImages.push(img)

          setLoadingProgress((i / totalFrames) * 100)
        }

        setImages(dummyImages)
        setIsLoading(false)
      } catch (error) {
        console.error("Error simulating loading:", error)
        setIsLoading(false)
      }
    }

    // Use simulateLoading for demo, in production use loadImages
    simulateLoading()
    // loadImages()
  }, [baseUrl, fileExtension, height, totalFrames, width])

  useEffect(() => {
    if (isLoading || !canvasRef.current || !containerRef.current || images.length === 0) return

    const canvas = canvasRef.current
    const context = canvas.getContext("2d")
    if (!context) return

    let currentFrame = 0
    let animationFrameId: number

    const render = () => {
      if (images[currentFrame]) {
        context.clearRect(0, 0, canvas.width, canvas.height)
        context.drawImage(images[currentFrame], 0, 0, canvas.width, canvas.height)
      }
    }

    const handleScroll = () => {
      if (!containerRef.current) return

      const rect = containerRef.current.getBoundingClientRect()
      const scrollPercentage = 1 - rect.top / (window.innerHeight * 0.8)

      if (scrollPercentage >= 0 && scrollPercentage <= 1) {
        currentFrame = Math.min(Math.floor(scrollPercentage * (totalFrames - 1)), totalFrames - 1)
        render()
      }
    }

    window.addEventListener("scroll", handleScroll)
    handleScroll() // Initial render

    return () => {
      window.removeEventListener("scroll", handleScroll)
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId)
      }
    }
  }, [isLoading, images, totalFrames])

  return (
    <div ref={containerRef} className={`relative ${className}`} style={{ height: `${height * 2}px` }}>
      <div className="sticky top-[20vh] flex items-center justify-center">
        {isLoading ? (
          <div className="bg-gray-100 rounded-lg p-8 flex flex-col items-center justify-center">
            <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
              <div
                className="bg-blue-600 h-2.5 rounded-full transition-all duration-300"
                style={{ width: `${loadingProgress}%` }}
              ></div>
            </div>
            <p className="text-gray-600">Caricamento animazione... {Math.round(loadingProgress)}%</p>
          </div>
        ) : (
          <canvas ref={canvasRef} width={width} height={height} className="rounded-lg shadow-lg" />
        )}
      </div>
    </div>
  )
}
