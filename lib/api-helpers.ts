/**
 * Helper functions for API requests and data processing
 */

// Function to strip HTML tags from content
export function stripHtml(html: string): string {
  if (!html) return ""
  return html.replace(/<[^>]*>/g, "").trim()
}

// Function to decode HTML entities
export function decodeHtmlEntities(text: string): string {
  if (!text) return ""
  return text
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/&nbsp;/g, " ")
}

// Function to limit words in a text
export function limitWords(text: string, limit: number): string {
  if (!text) return ""
  const words = text.split(" ")
  if (words.length <= limit) return text
  return words.slice(0, limit).join(" ") + "..."
}

// Function to convert textarea content to array
export function textAreaToArray(textArea: string | null | undefined): string[] {
  if (!textArea) return []
  return textArea
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.length > 0)
}

// Function to get safe image URL
export function getSafeImageUrl(url: string | null | undefined): string | null {
  if (!url) return null

  const urlString = String(url)

  // If it's already a proxy URL or placeholder, return as is
  if (urlString.includes("/api/image-proxy") || urlString.includes("/placeholder.svg")) {
    return urlString
  }

  // Check if it's a WordPress image
  if (urlString.includes("synonymous-knee.localsite.io") || urlString.includes("/wp-content/uploads/")) {
    // Use our image proxy for WordPress images
    return `/api/image-proxy?url=${encodeURIComponent(urlString)}`
  }

  // For other images, return as is
  return urlString
}

// Function to format date
export function formatDate(dateString: string): string {
  try {
    const date = new Date(dateString)
    return date.toLocaleDateString("it-IT", {
      day: "numeric",
      month: "long",
      year: "numeric",
    })
  } catch (error) {
    console.error("Error formatting date:", error)
    return dateString
  }
}
