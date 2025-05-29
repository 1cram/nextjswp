"use client"

import { useEffect } from "react"

export function ImageErrorHandler() {
  useEffect(() => {
    // Function to handle image errors
    const handleImageError = (event: Event) => {
      const img = event.target as HTMLImageElement
      if (img && img.src) {
        // Check if it's a WordPress image that failed to load
        if (img.src.includes("synonymous-knee.localsite.io")) {
          console.log("Image failed to load, attempting to proxy:", img.src)
          // Replace with proxy URL
          const proxyUrl = `/api/image-proxy?url=${encodeURIComponent(img.src)}`
          img.src = proxyUrl
        }
      }
    }

    // Add error listener to all images
    const images = document.querySelectorAll("img")
    images.forEach((img) => {
      img.addEventListener("error", handleImageError)
    })

    // Also listen for new images added to the DOM
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (node.nodeType === Node.ELEMENT_NODE) {
            const element = node as Element
            const newImages = element.querySelectorAll("img")
            newImages.forEach((img) => {
              img.addEventListener("error", handleImageError)
            })
          }
        })
      })
    })

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    })

    // Cleanup
    return () => {
      images.forEach((img) => {
        img.removeEventListener("error", handleImageError)
      })
      observer.disconnect()
    }
  }, [])

  return null
}
