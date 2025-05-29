"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"

interface CookiePreferencesModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (preferences: CookiePreferences) => void
}

export interface CookiePreferences {
  necessary: boolean
  functional: boolean
  analytics: boolean
  marketing: boolean
}

export default function CookiePreferencesModal({ isOpen, onClose, onSave }: CookiePreferencesModalProps) {
  const [preferences, setPreferences] = useState<CookiePreferences>({
    necessary: true, // I cookie necessari sono sempre attivi
    functional: true,
    analytics: true,
    marketing: false,
  })

  const handleSave = () => {
    onSave(preferences)
    onClose()
  }

  const handleChange = (key: keyof CookiePreferences) => (checked: boolean) => {
    if (key === "necessary") return // Non permettere di disattivare i cookie necessari

    setPreferences((prev) => ({
      ...prev,
      [key]: checked,
    }))
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="bg-white rounded-xl shadow-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center p-6 border-b border-gray-200">
              <h2 className="text-2xl font-semibold text-unika-dark">Preferenze Cookie</h2>
              <button
                onClick={onClose}
                className="text-gray-500 hover:text-gray-700 transition-colors"
                aria-label="Chiudi"
              >
                <X size={24} />
              </button>
            </div>

            <div className="p-6">
              <p className="text-gray-600 mb-6">
                Utilizziamo i cookie per migliorare la tua esperienza sul nostro sito. Puoi scegliere quali cookie
                accettare. Tieni presente che i cookie necessari sono essenziali per il funzionamento del sito.
              </p>

              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-medium text-unika-dark">Cookie necessari</h3>
                    <p className="text-sm text-gray-500">
                      Questi cookie sono essenziali per il funzionamento del sito e non possono essere disattivati.
                    </p>
                  </div>
                  <Switch checked={preferences.necessary} disabled />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-medium text-unika-dark">Cookie funzionali</h3>
                    <p className="text-sm text-gray-500">
                      Questi cookie consentono al sito di fornire funzionalità e personalizzazione avanzate.
                    </p>
                  </div>
                  <Switch checked={preferences.functional} onCheckedChange={handleChange("functional")} />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-medium text-unika-dark">Cookie analitici</h3>
                    <p className="text-sm text-gray-500">
                      Questi cookie ci aiutano a capire come i visitatori interagiscono con il sito.
                    </p>
                  </div>
                  <Switch checked={preferences.analytics} onCheckedChange={handleChange("analytics")} />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-medium text-unika-dark">Cookie di marketing</h3>
                    <p className="text-sm text-gray-500">
                      Questi cookie vengono utilizzati per mostrare pubblicità più pertinenti ai tuoi interessi.
                    </p>
                  </div>
                  <Switch checked={preferences.marketing} onCheckedChange={handleChange("marketing")} />
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-gray-200 flex justify-end space-x-4">
              <Button variant="outline" onClick={onClose}>
                Annulla
              </Button>
              <Button className="bg-unika-yellow text-unika-dark hover:bg-unika-yellow-hover" onClick={handleSave}>
                Salva preferenze
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
