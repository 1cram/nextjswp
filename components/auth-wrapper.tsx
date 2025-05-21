"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { WordPressAuthForm } from "@/components/wordpress-auth-form"
import { isAuthenticated } from "@/lib/wordpress-auth"

interface AuthWrapperProps {
  children: React.ReactNode
}

export function AuthWrapper({ children }: AuthWrapperProps) {
  const [loading, setLoading] = useState(true)
  const [requiresAuth, setRequiresAuth] = useState(false)
  const [isAuthed, setIsAuthed] = useState(false)

  useEffect(() => {
    const checkAuthStatus = async () => {
      // Check if user is already authenticated
      const authed = isAuthenticated()
      setIsAuthed(authed)

      // Check if the WordPress site requires authentication
      try {
        const response = await fetch("/api/auth-check")
        const data = await response.json()
        setRequiresAuth(data.requiresAuth)
      } catch (error) {
        console.error("Error checking auth status:", error)
        // Assume auth is required if check fails
        setRequiresAuth(true)
      }

      setLoading(false)
    }

    checkAuthStatus()
  }, [])

  if (loading) {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>
  }

  // If authentication is required and user is not authenticated, show auth form
  if (requiresAuth && !isAuthed) {
    return (
      <div className="container mx-auto py-10">
        <WordPressAuthForm onSuccess={() => setIsAuthed(true)} />
      </div>
    )
  }

  // Otherwise, show the children
  return <>{children}</>
}
