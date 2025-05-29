"use client"

import type React from "react"

import { useState } from "react"
import { authenticateWithWordPress } from "@/lib/wordpress-auth"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { AlertCircle } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface WordPressAuthFormProps {
  onSuccess?: () => void
}

export function WordPressAuthForm({ onSuccess }: WordPressAuthFormProps) {
  const [username, setUsername] = useState("nachos")
  const [password, setPassword] = useState("quickest")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      const success = await authenticateWithWordPress(username, password)

      if (success) {
        if (onSuccess) {
          onSuccess()
        }
      } else {
        setError("Authentication failed. Please check your credentials.")
      }
    } catch (err) {
      setError("An error occurred during authentication.")
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>WordPress Authentication</CardTitle>
        <CardDescription>Enter your WordPress credentials to access protected content.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          <Button type="submit" className="w-full mt-4" disabled={isLoading}>
            {isLoading ? "Authenticating..." : "Login"}
          </Button>
        </form>
      </CardContent>
      <CardFooter className="flex justify-center text-sm text-muted-foreground">
        These credentials are used to access the WordPress API.
      </CardFooter>
    </Card>
  )
}
