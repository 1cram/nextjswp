"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { getResponsiveImageUrl } from "@/lib/utils"

interface ResponsiveImageProps {
  src: string
  alt: string
  width?: number
  height?: number
  className?: string
  priority?: boolean
}

export default function ResponsiveImage({
  src,
  alt,
  width = 800,
  height = 600,
  className = "",
  priority = false,
}: ResponsiveImageProps) {
  const [imgSrc, setImgSrc] = useState<string>("/placeholder.svg?height=600&width=600&text=Loading...")
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    // Process the image URL to ensure it works on all devices
    const processedSrc = getResponsiveImageUrl(src)
    setImgSrc(processedSrc)
    setIsLoading(false)
    setError(false)
  }, [src])

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
          <span className="text-sm text-gray-500">Loading...</span>
        </div>
      )}

      <Image
        src={imgSrc || "/placeholder.svg"}
        alt={alt}
        width={width}
        height={height}
        className={`w-full h-auto transition-opacity duration-300 ${isLoading ? "opacity-0" : "opacity-100"}`}
        priority={priority}
        onError={() => {
          setError(true)
          setImgSrc("/placeholder.svg?height=600&width=600&text=Image+Error")
        }}
        unoptimized={false}
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
      />

      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
          <span className="text-sm text-gray-500">Failed to load image</span>
        </div>
      )}
    </div>
  )
}
