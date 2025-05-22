import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Function to ensure image URLs are properly formatted for both desktop and mobile
export function getResponsiveImageUrl(url: string | undefined | null): string {
  if (!url) return "/placeholder.svg?height=600&width=600&text=Immagine+non+disponibile"

  // If it's a WordPress image, proxy it through our API
  if (url.includes("synonymous-knee.localsite.io")) {
    return `/api/image-proxy?url=${encodeURIComponent(url)}`
  }

  return url
}

// Function to create srcSet for responsive images
export function createSrcSet(url: string): string {
  if (!url || url.includes("placeholder.svg")) return url

  // If it's not a WordPress image, return the original URL
  if (!url.includes("synonymous-knee.localsite.io")) {
    return url
  }

  // For WordPress images, create a proxied srcSet
  const sizes = [640, 750, 828, 1080, 1200]
  return sizes
    .map((size) => {
      const proxiedUrl = `/api/image-proxy?url=${encodeURIComponent(url)}&width=${size}`
      return `${proxiedUrl} ${size}w`
    })
    .join(", ")
}
