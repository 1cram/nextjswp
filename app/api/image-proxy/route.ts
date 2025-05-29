import { type NextRequest, NextResponse } from "next/server"

// WordPress credentials
const WP_USERNAME = "nachos"
const WP_PASSWORD = "quickest"

export async function GET(request: NextRequest) {
  try {
    // Get the URL from the query parameters
    const { searchParams } = new URL(request.url)
    const imageUrl = searchParams.get("url")

    if (!imageUrl) {
      console.error("No image URL provided")
      return new NextResponse("Missing image URL parameter", { status: 400 })
    }

    // Decode the URL
    let decodedUrl: string
    try {
      decodedUrl = decodeURIComponent(imageUrl)
    } catch (decodeError) {
      console.error("Failed to decode URL:", imageUrl)
      return new NextResponse("Invalid URL encoding", { status: 400 })
    }

    console.log(`Processing image request for: ${decodedUrl}`)

    // Check if the URL is already a proxy URL (prevent infinite loops)
    if (decodedUrl.includes("/api/image-proxy")) {
      console.error("Attempted to proxy an already proxied URL:", decodedUrl)
      return new NextResponse("Recursive proxy detected", { status: 400 })
    }

    // Validate that it's a proper URL
    let validUrl: URL
    try {
      // Handle relative URLs by adding the WordPress domain
      if (decodedUrl.startsWith("/")) {
        validUrl = new URL(decodedUrl, "https://synonymous-knee.localsite.io")
      } else {
        validUrl = new URL(decodedUrl)
      }
    } catch (urlError) {
      console.error("Invalid URL format:", decodedUrl, urlError)
      return NextResponse.redirect("/placeholder.svg?height=400&width=400&text=Invalid+URL")
    }

    // Only proxy WordPress images
    if (!validUrl.hostname.includes("synonymous-knee.localsite.io")) {
      console.log("Redirecting non-WordPress image:", validUrl.href)
      return NextResponse.redirect(validUrl.href)
    }

    console.log(`Fetching WordPress image: ${validUrl.href}`)

    // Fetch the image from WordPress with authentication
    const response = await fetch(validUrl.href, {
      headers: {
        Authorization: `Basic ${Buffer.from(`${WP_USERNAME}:${WP_PASSWORD}`).toString("base64")}`,
        "User-Agent": "Mozilla/5.0 (compatible; NextJS Image Proxy)",
      },
      next: { revalidate: 3600 }, // Cache for 1 hour
    })

    if (!response.ok) {
      console.error(`Failed to fetch image: ${response.status} ${response.statusText} for URL: ${validUrl.href}`)
      return NextResponse.redirect("/placeholder.svg?height=400&width=400&text=Image+Not+Found")
    }

    // Get the image data and content type
    const imageData = await response.arrayBuffer()
    const contentType = response.headers.get("content-type") || "image/jpeg"

    console.log(`Successfully proxied image: ${validUrl.href} (${contentType})`)

    // Return the image with proper headers
    return new NextResponse(imageData, {
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=3600", // Cache for 1 hour
        "Access-Control-Allow-Origin": "*",
      },
    })
  } catch (error) {
    console.error("Unexpected error in image proxy:", error)
    return NextResponse.redirect("/placeholder.svg?height=400&width=400&text=Proxy+Error")
  }
}
