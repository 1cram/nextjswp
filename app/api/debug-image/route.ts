import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  let imageUrl: string | null = null
  try {
    // Get the URL from the query parameters
    const { searchParams } = new URL(request.url)
    imageUrl = searchParams.get("url")

    if (!imageUrl) {
      return NextResponse.json({ error: "Missing image URL" }, { status: 400 })
    }

    // Prepare fetch options
    const fetchOptions: RequestInit = {
      method: "HEAD", // Only fetch headers, not the actual image
    }

    // Try to fetch the image headers
    const response = await fetch(imageUrl, fetchOptions)

    // Return debug information
    return NextResponse.json({
      url: imageUrl,
      status: response.status,
      statusText: response.statusText,
      headers: Object.fromEntries(response.headers.entries()),
      ok: response.ok,
    })
  } catch (error) {
    console.error("Error in image debug:", error)
    return NextResponse.json(
      {
        url: imageUrl,
        error: error instanceof Error ? error.message : String(error),
      },
      { status: 500 },
    )
  }
}
