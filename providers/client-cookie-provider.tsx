"use client"

import { useState, useEffect } from "react"
import type React from "react"
import dynamic from "next/dynamic"

// Importa dinamicamente il CookieConsentProvider
const CookieConsentProvider = dynamic(() => import("./cookie-consent-provider"), {
  ssr: false,
  loading: () => null,
})

export default function ClientCookieProvider({ children }: { children: React.ReactNode }) {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return <>{children}</>
  }

  return <CookieConsentProvider>{children}</CookieConsentProvider>
}
