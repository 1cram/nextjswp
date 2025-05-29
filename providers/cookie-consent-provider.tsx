"use client"

import type React from "react"
import { createContext, useState, useEffect, useContext } from "react"
import CookieConsent from "@/components/cookie/cookie-consent"
import CookiePreferencesModal, { type CookiePreferences } from "@/components/cookie/cookie-preferences-modal"
import WhatsAppButton from "@/components/ui/whatsapp-button"

type CookieConsentContextType = {
  cookiePreferences: CookiePreferences
  showBanner: boolean
  showPreferencesModal: boolean
  acceptAllCookies: () => void
  acceptSelectedCookies: (preferences: CookiePreferences) => void
  openPreferencesModal: () => void
  closePreferencesModal: () => void
}

const defaultCookiePreferences: CookiePreferences = {
  necessary: true, // Always true
  analytics: false,
  marketing: false,
  functional: false,
}

const CookieConsentContext = createContext<CookieConsentContextType | undefined>(undefined)

export function useCookieConsent() {
  const context = useContext(CookieConsentContext)
  if (context === undefined) {
    throw new Error("useCookieConsent must be used within a CookieConsentProvider")
  }
  return context
}

export default function CookieConsentProvider({ children }: { children: React.ReactNode }) {
  const [cookiePreferences, setCookiePreferences] = useState<CookiePreferences>(defaultCookiePreferences)
  const [showBanner, setShowBanner] = useState(false)
  const [showPreferencesModal, setShowPreferencesModal] = useState(false)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
    const savedPreferences = getSavedPreferences()
    if (savedPreferences) {
      setCookiePreferences(savedPreferences)
    } else {
      setShowBanner(true)
    }
  }, [])

  const getSavedPreferences = (): CookiePreferences | null => {
    try {
      if (typeof window !== "undefined") {
        const saved = localStorage.getItem("cookiePreferences")
        return saved ? JSON.parse(saved) : null
      }
      return null
    } catch (error) {
      console.error("Error reading cookie preferences:", error)
      return null
    }
  }

  const savePreferences = (preferences: CookiePreferences) => {
    try {
      if (typeof window !== "undefined") {
        localStorage.setItem("cookiePreferences", JSON.stringify(preferences))
      }
    } catch (error) {
      console.error("Error saving cookie preferences:", error)
    }
  }

  const acceptAllCookies = () => {
    const allAccepted: CookiePreferences = {
      necessary: true,
      analytics: true,
      marketing: true,
      functional: true,
    }
    setCookiePreferences(allAccepted)
    savePreferences(allAccepted)
    setShowBanner(false)
    setShowPreferencesModal(false)

    // Esempio: attivare Google Analytics
    if (typeof window !== "undefined" && "gtag" in window) {
      // @ts-ignore - gtag potrebbe non essere riconosciuto dal TypeScript
      window.gtag("consent", "update", {
        analytics_storage: "granted",
        ad_storage: "granted",
        functionality_storage: "granted",
      })
    }
  }

  const acceptSelectedCookies = (preferences: CookiePreferences) => {
    const updatedPreferences = {
      ...preferences,
      necessary: true, // Always true
    }
    setCookiePreferences(updatedPreferences)
    savePreferences(updatedPreferences)
    setShowBanner(false)
    setShowPreferencesModal(false)

    // Esempio: aggiornare le impostazioni di Google Analytics in base alle preferenze
    if (typeof window !== "undefined" && "gtag" in window) {
      // @ts-ignore - gtag potrebbe non essere riconosciuto dal TypeScript
      window.gtag("consent", "update", {
        analytics_storage: preferences.analytics ? "granted" : "denied",
        ad_storage: preferences.marketing ? "granted" : "denied",
        functionality_storage: preferences.functional ? "granted" : "denied",
      })
    }
  }

  const openPreferencesModal = () => {
    setShowPreferencesModal(true)
    setShowBanner(false)
  }

  const closePreferencesModal = () => {
    setShowPreferencesModal(false)
  }

  const value = {
    cookiePreferences,
    showBanner,
    showPreferencesModal,
    acceptAllCookies,
    acceptSelectedCookies,
    openPreferencesModal,
    closePreferencesModal,
  }

  if (!isClient) {
    return <>{children}</>
  }

  return (
    <CookieConsentContext.Provider value={value}>
      {children}

      {showBanner && (
        <CookieConsent
          onAccept={acceptAllCookies}
          onDecline={() => acceptSelectedCookies(defaultCookiePreferences)}
          onPreferences={openPreferencesModal}
        />
      )}

      {showPreferencesModal && (
        <CookiePreferencesModal
          isOpen={showPreferencesModal}
          onClose={closePreferencesModal}
          onSave={acceptSelectedCookies}
        />
      )}

      <WhatsAppButton
        phoneNumber="+393319138064"
        message="Ciao! Vorrei avere maggiori informazioni su Unika Fitness Club."
      />
    </CookieConsentContext.Provider>
  )
}
