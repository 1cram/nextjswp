"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { MessageCircle, X } from "lucide-react"

interface WhatsAppButtonProps {
  phoneNumber: string
  message?: string
}

export default function WhatsAppButton({
  phoneNumber,
  message = "Ciao! Vorrei avere maggiori informazioni.",
}: WhatsAppButtonProps) {
  const [isTooltipVisible, setIsTooltipVisible] = useState(false)

  const handleWhatsAppClick = () => {
    // Formatta il numero di telefono rimuovendo spazi e caratteri non numerici
    const formattedNumber = phoneNumber.replace(/\s+/g, "").replace(/[^\d+]/g, "")

    // Codifica il messaggio per l'URL
    const encodedMessage = encodeURIComponent(message)

    // Crea l'URL di WhatsApp
    const whatsappUrl = `https://wa.me/${formattedNumber}?text=${encodedMessage}`

    // Apri WhatsApp in una nuova finestra
    window.open(whatsappUrl, "_blank")
  }

  return (
    <div className="fixed bottom-6 right-6 z-40">
      <AnimatePresence>
        {isTooltipVisible && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            className="absolute bottom-16 right-0 bg-white rounded-lg shadow-lg p-4 mb-2 w-64"
          >
            <button
              onClick={() => setIsTooltipVisible(false)}
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
            >
              <X size={16} />
            </button>
            <p className="text-sm text-unika-dark">Hai domande? Chatta con noi su WhatsApp!</p>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={handleWhatsAppClick}
        onMouseEnter={() => setIsTooltipVisible(true)}
        className="bg-green-500 hover:bg-green-600 text-white rounded-full p-4 shadow-lg flex items-center justify-center"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <MessageCircle size={24} />
      </motion.button>
    </div>
  )
}
