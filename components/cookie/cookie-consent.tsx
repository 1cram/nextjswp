"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from "framer-motion"

interface CookieConsentProps {
  onAccept: () => void
  onDecline: () => void
  onPreferences: () => void
}

export default function CookieConsent({ onAccept, onDecline, onPreferences }: CookieConsentProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Controlla se l'utente ha già fatto una scelta sui cookie
    const cookieConsent = localStorage.getItem("cookie-consent")

    // Se non ha fatto una scelta, mostra il banner
    if (!cookieConsent) {
      // Piccolo ritardo per non mostrare il banner immediatamente al caricamento della pagina
      const timer = setTimeout(() => {
        setIsVisible(true)
      }, 1000)

      return () => clearTimeout(timer)
    }
  }, [])

  const handleAccept = () => {
    localStorage.setItem("cookie-consent", "accepted")
    setIsVisible(false)
    onAccept()
  }

  const handleDecline = () => {
    localStorage.setItem("cookie-consent", "declined")
    setIsVisible(false)
    onDecline()
  }

  const handlePreferences = () => {
    onPreferences()
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-0 inset-x-0 z-50 p-4 bg-white border-t border-gray-200 shadow-lg"
        >
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-unika-dark-lighter">
              Usiamo cookie per ottimizzare il nostro sito web ed i nostri servizi. Per saperne di più, consulta la
              nostra{" "}
              <Link href="/cookie-policy" className="text-unika-yellow hover:underline">
                Cookie Policy
              </Link>{" "}
              e la{" "}
              <Link href="/privacy-policy" className="text-unika-yellow hover:underline">
                Privacy Policy
              </Link>
              .
            </p>
            <div className="flex flex-wrap gap-2">
              <Button variant="outline" size="sm" onClick={handlePreferences}>
                Preferenze
              </Button>
              <Button variant="outline" size="sm" onClick={handleDecline}>
                Nega
              </Button>
              <Button
                size="sm"
                onClick={handleAccept}
                className="bg-unika-yellow text-unika-dark hover:bg-unika-yellow-hover"
              >
                Accetta tutti
              </Button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
