import { type NextRequest, NextResponse } from "next/server"

// WordPress credentials (server-side only)
const WP_USERNAME = "nachos"
const WP_PASSWORD = "quickest"

export async function GET(request: NextRequest) {
  try {
    // Get the image URL from the query parameter
    const { searchParams } = new URL(request.url)
    const imageUrl = searchParams.get("url")

    if (!imageUrl) {
      return new NextResponse("Image URL is required", { status: 400 })
    }

    // Decode the URL if it's encoded
    const decodedUrl = decodeURIComponent(imageUrl)

    // Check if the URL is from our WordPress site
    if (!decodedUrl.includes("synonymous-knee.localsite.io")) {
      return NextResponse.redirect(decodedUrl)
    }

    // Fetch the image with authentication
    const response = await fetch(decodedUrl, {
      headers: {
        Authorization: `Basic ${Buffer.from(`${WP_USERNAME}:${WP_PASSWORD}`).toString("base64")}`,
      },
    })

    if (!response.ok) {
      console.error(`Failed to fetch image: ${response.status} ${response.statusText}`)
      return new NextResponse("Failed to fetch image", { status: response.status })
    }

    // Get the image data and content type
    const imageData = await response.arrayBuffer()
    const contentType = response.headers.get("content-type") || "image/jpeg"

    // Return the image with the correct content type
    return new NextResponse(imageData, {
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=86400", // Cache for 24 hours
      },
    })
  } catch (error) {
    console.error("Error in image proxy:", error)
    return new NextResponse("Internal Server Error", { status: 500 })
  }
}
