import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Function to ensure image URLs are properly formatted for both desktop and mobile
export function getResponsiveImageUrl(url: string | undefined | null): string {
  if (!url) return "/placeholder.svg?height=600&width=600&text=Immagine+non+disponibile"

  // Ensure URL uses HTTPS
  if (url.startsWith("http:")) {
    url = url.replace("http:", "https:")
  }

  // If it's a relative URL, add the domain
  if (url.startsWith("/")) {
    const wpDomain = process.env.WORDPRESS_API_URL
      ? process.env.WORDPRESS_API_URL.split("/wp-json")[0]
      : "https://synonymous-knee.localsite.io"
    url = `${wpDomain}${url}`
  }

  return url
}

// Function to create srcSet for responsive images
export function createSrcSet(url: string): string {
  if (!url || url.includes("placeholder.svg")) return url

  const baseUrl = getResponsiveImageUrl(url)
  const sizes = [640, 750, 828, 1080, 1200]

  return sizes.map((size) => `${baseUrl} ${size}w`).join(", ")
}
