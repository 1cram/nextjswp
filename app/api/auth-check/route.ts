import { NextResponse } from "next/server"

// This endpoint will check if the WordPress site requires authentication
export async function GET() {
  try {
    // Try to fetch a public endpoint to see if it works without authentication
    const response = await fetch("https://synonymous-knee.localsite.io/wp-json/wp/v2/posts?per_page=1")

    if (response.status === 401) {
      // Authentication required
      return NextResponse.json({ requiresAuth: true })
    } else {
      // No authentication required
      return NextResponse.json({ requiresAuth: false })
    }
  } catch (error) {
    console.error("Error checking authentication status:", error)
    // If there's an error, assume authentication might be required
    return NextResponse.json({ requiresAuth: true, error: "Failed to check authentication status" })
  }
}
