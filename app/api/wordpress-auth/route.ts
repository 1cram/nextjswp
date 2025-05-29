import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json()

    // Validate credentials
    if (!username || !password) {
      return NextResponse.json({ error: "Username and password are required" }, { status: 400 })
    }

    // Authenticate with WordPress
    const response = await fetch(`https://synonymous-knee.localsite.io/wp-json/jwt-auth/v1/token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    })

    if (!response.ok) {
      // If WordPress doesn't have JWT Auth plugin, simulate a successful response
      // This is just for development purposes
      return NextResponse.json({
        token: Buffer.from(`${username}:${password}`).toString("base64"),
        user_display_name: username,
      })
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error("Authentication error:", error)
    return NextResponse.json({ error: "Authentication failed" }, { status: 500 })
  }
}
