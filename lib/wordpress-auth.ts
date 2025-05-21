// Helper functions for WordPress authentication

// Store the authentication token
let authToken: string | null = null

// Function to authenticate with WordPress
export async function authenticateWithWordPress(username: string, password: string): Promise<boolean> {
  try {
    const response = await fetch("/api/wordpress-auth", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    })

    if (!response.ok) {
      return false
    }

    const data = await response.json()
    authToken = data.token

    // Store token in localStorage for persistence across page refreshes
    if (typeof window !== "undefined") {
      localStorage.setItem("wp_auth_token", authToken)
    }

    return true
  } catch (error) {
    console.error("Authentication error:", error)
    return false
  }
}

// Function to get the authentication token
export function getAuthToken(): string | null {
  // Try to get from memory first
  if (authToken) {
    return authToken
  }

  // Try to get from localStorage if in browser
  if (typeof window !== "undefined") {
    const storedToken = localStorage.getItem("wp_auth_token")
    if (storedToken) {
      authToken = storedToken
      return storedToken
    }
  }

  return null
}

// Function to check if user is authenticated
export function isAuthenticated(): boolean {
  return getAuthToken() !== null
}

// Function to logout
export function logout(): void {
  authToken = null
  if (typeof window !== "undefined") {
    localStorage.removeItem("wp_auth_token")
  }
}
