// Helper functions for image handling

// Function to check if an image URL is valid
export async function isImageValid(url: string): Promise<boolean> {
  if (!url || url.includes("placeholder")) return false

  try {
    const response = await fetch(url, { method: "HEAD" })
    return response.ok && response.headers.get("Content-Type")?.startsWith("image/")
  } catch (error) {
    console.error("Error checking image validity:", error)
    return false
  }
}

// Function to get image dimensions
export function getImageDimensions(url: string): Promise<{ width: number; height: number }> {
  return new Promise((resolve) => {
    if (!url || url.includes("placeholder")) {
      resolve({ width: 800, height: 600 })
      return
    }

    const img = new Image()
    img.onload = () => {
      resolve({ width: img.width, height: img.height })
    }
    img.onerror = () => {
      resolve({ width: 800, height: 600 })
    }
    img.src = url
  })
}

// Function to optimize image URL for different devices
export function optimizeImageUrl(url: string, width?: number): string {
  if (!url || url.includes("placeholder")) return url

  // Ensure URL uses HTTPS
  if (url.startsWith("http:")) {
    url = url.replace("http:", "https:")
  }

  // If it's a WordPress image, add size parameters if width is provided
  if (url.includes("synonymous-knee.localsite.io") && width) {
    // Check if URL already has query parameters
    const hasParams = url.includes("?")
    return `${url}${hasParams ? "&" : "?"}w=${width}`
  }

  return url
}
