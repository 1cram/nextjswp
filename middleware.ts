import { type NextRequest, NextResponse } from "next/server"

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Skip middleware for API routes, especially the image proxy
  if (pathname.startsWith("/api/")) {
    return NextResponse.next()
  }

  // Skip middleware for Next.js internal routes
  if (pathname.startsWith("/_next/") || pathname.startsWith("/favicon.ico")) {
    return NextResponse.next()
  }

  return NextResponse.next()
}

// Simplified matcher that excludes API routes
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
}
