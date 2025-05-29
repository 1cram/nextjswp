/**
 * Content processor for WordPress content
 * Handles image URLs and other content transformations
 */

/**
 * Check if a URL is already a proxy URL
 */
function isProxyUrl(url: string): boolean {
  if (!url || typeof url !== "string") return false
  return url.includes("/api/image-proxy") || url.includes("/placeholder.svg")
}

/**
 * Check if a URL is from WordPress
 */
function isWordPressUrl(url: string): boolean {
  if (!url || typeof url !== "string") return false

  const hasWordPressUrl =
    url.includes("synonymous-knee.localsite.io") || url.includes("wp-content/uploads") || url.includes("/uploads/")

  const isImageFile = url.startsWith("/") && Boolean(url.match(/\.(jpg|jpeg|png|gif|webp|avif|svg)$/i))

  return hasWordPressUrl || isImageFile
}

/**
 * Convert a WordPress image URL to a proxy URL
 */
function createProxyUrl(url: string): string {
  if (!url || typeof url !== "string") return url

  // Don't process if it's already a proxy URL
  if (isProxyUrl(url)) return url

  // Handle WordPress URLs
  if (isWordPressUrl(url)) {
    // Handle relative URLs
    let fullUrl = url
    if (url.startsWith("/") && !url.startsWith("//")) {
      fullUrl = `https://synonymous-knee.localsite.io${url}`
    }

    // Always use proxy for WordPress images
    return `/api/image-proxy?url=${encodeURIComponent(fullUrl)}`
  }

  return url
}

/**
 * Process HTML content to replace WordPress image URLs with proxied URLs
 */
export function processHtmlContent(html: string): string {
  if (!html || typeof html !== "string") return html

  try {
    let processedContent = html

    // Replace all WordPress domain references with proxy URLs
    processedContent = processedContent.replace(
      /https?:\/\/synonymous-knee\.localsite\.io\/wp-content\/uploads\/[^"'\s)]+/g,
      (match) => {
        return `/api/image-proxy?url=${encodeURIComponent(match)}`
      },
    )

    // Replace image URLs in src attributes
    processedContent = processedContent.replace(/src="([^"]+)"/g, (match, url) => {
      const proxiedUrl = createProxyUrl(url)
      return `src="${proxiedUrl}"`
    })

    // Replace image URLs in srcset attributes
    processedContent = processedContent.replace(/srcset="([^"]+)"/g, (match, srcset) => {
      const processedSrcset = srcset
        .split(",")
        .map((srcsetItem: string) => {
          const trimmed = srcsetItem.trim()
          const spaceIndex = trimmed.indexOf(" ")
          const url = spaceIndex > -1 ? trimmed.substring(0, spaceIndex) : trimmed
          const descriptor = spaceIndex > -1 ? trimmed.substring(spaceIndex) : ""
          const proxiedUrl = createProxyUrl(url)
          return `${proxiedUrl}${descriptor}`
        })
        .join(", ")
      return `srcset="${processedSrcset}"`
    })

    // Replace background-image URLs in style attributes
    processedContent = processedContent.replace(/background-image:\s*url$$['"]?([^'"$$]+)['"]?\)/g, (match, url) => {
      const proxiedUrl = createProxyUrl(url)
      return `background-image: url('${proxiedUrl}')`
    })

    // Replace any remaining WordPress URLs in the content
    processedContent = processedContent.replace(
      /synonymous-knee\.localsite\.io\/wp-content\/uploads\/[^"'\s)]+/g,
      (match) => {
        const fullUrl = match.startsWith("http") ? match : `https://${match}`
        return `/api/image-proxy?url=${encodeURIComponent(fullUrl)}`
      },
    )

    return processedContent
  } catch (error) {
    console.error("Error processing HTML content:", error)
    return html
  }
}

/**
 * Process a WordPress post object to replace image URLs in all fields
 */
export function processWordPressPost<T extends Record<string, any>>(post: T): T {
  if (!post) return post

  try {
    // Create a deep copy to avoid mutating the original
    const processedPost = JSON.parse(JSON.stringify(post))

    // Process content field
    if (processedPost.content?.rendered) {
      processedPost.content.rendered = processHtmlContent(processedPost.content.rendered)
    }

    // Process excerpt field
    if (processedPost.excerpt?.rendered) {
      processedPost.excerpt.rendered = processHtmlContent(processedPost.excerpt.rendered)
    }

    // Process title field (in case it contains images)
    if (processedPost.title?.rendered) {
      processedPost.title.rendered = processHtmlContent(processedPost.title.rendered)
    }

    // Process featured image URL
    if (processedPost.featured_image_url) {
      processedPost.featured_image_url = createProxyUrl(processedPost.featured_image_url)
    }

    // Process featured media in _embedded
    if (processedPost._embedded?.["wp:featuredmedia"]?.[0]?.source_url) {
      const sourceUrl = processedPost._embedded["wp:featuredmedia"][0].source_url
      if (typeof sourceUrl === "string") {
        processedPost._embedded["wp:featuredmedia"][0].source_url = createProxyUrl(sourceUrl)
      }
    }

    // Process all media attachments
    if (processedPost._embedded?.["wp:featuredmedia"]) {
      processedPost._embedded["wp:featuredmedia"] = processedPost._embedded["wp:featuredmedia"].map((media: any) => {
        if (media.source_url) {
          media.source_url = createProxyUrl(media.source_url)
        }
        if (media.media_details?.sizes) {
          Object.keys(media.media_details.sizes).forEach((size) => {
            if (media.media_details.sizes[size].source_url) {
              media.media_details.sizes[size].source_url = createProxyUrl(media.media_details.sizes[size].source_url)
            }
          })
        }
        return media
      })
    }

    // Process ACF fields if they exist
    if (processedPost.acf && typeof processedPost.acf === "object") {
      processedPost.acf = processAcfFields(processedPost.acf)
    }

    return processedPost
  } catch (error) {
    console.error("Error processing WordPress post:", error)
    return post
  }
}

/**
 * Process ACF fields recursively
 */
function processAcfFields(acf: any): any {
  if (!acf || typeof acf !== "object") return acf

  const processedAcf = { ...acf }

  Object.keys(processedAcf).forEach((key) => {
    const value = processedAcf[key]

    if (typeof value === "string") {
      // Process any string that might contain WordPress URLs
      if (isWordPressUrl(value)) {
        processedAcf[key] = createProxyUrl(value)
      } else {
        // Also process HTML content in string fields
        processedAcf[key] = processHtmlContent(value)
      }
    } else if (typeof value === "object" && value !== null) {
      if (Array.isArray(value)) {
        processedAcf[key] = value.map((item) => {
          if (typeof item === "string") {
            return isWordPressUrl(item) ? createProxyUrl(item) : processHtmlContent(item)
          }
          if (typeof item === "object" && item !== null) {
            return processAcfFields(item)
          }
          return item
        })
      } else {
        // Process nested objects
        if (value.url && typeof value.url === "string") {
          value.url = createProxyUrl(value.url)
        }
        if (value.source_url && typeof value.source_url === "string") {
          value.source_url = createProxyUrl(value.source_url)
        }
        processedAcf[key] = processAcfFields(value)
      }
    }
  })

  return processedAcf
}

// Export helper functions
export { isWordPressUrl, isProxyUrl, createProxyUrl }
