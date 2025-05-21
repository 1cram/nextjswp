"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

interface FlipCardProps {
  title: string
  description: string
  imageSrc: string
  link?: string
  tags?: string[]
  features?: string[]
}

export default function FlipCard({ title, description, imageSrc, link, tags = [], features = [] }: FlipCardProps) {
  // Inizializza isFlipped a false per assicurarsi che le card partano sempre dal lato frontale
  const [isFlipped, setIsFlipped] = useState(false)

  // Reset dello stato quando il componente viene montato o aggiornato
  useEffect(() => {
    setIsFlipped(false)
  }, [title]) // Dipendenza da title per assicurarsi che si resetti quando cambia la card

  const handleFlip = () => {
    setIsFlipped(!isFlipped)
  }

  return (
    <>
      {/* Aggiungiamo gli stili globali direttamente qui */}
      <style jsx global>{`
        .perspective-1000 {
          perspective: 1000px;
        }
        
        .preserve-3d {
          transform-style: preserve-3d;
        }
        
        .backface-hidden {
          backface-visibility: hidden;
        }
        
        .rotate-y-180 {
          transform: rotateY(180deg);
        }
      `}</style>

      <div className="relative w-full h-[450px] perspective-1000">
        <motion.div
          className="w-full h-full relative preserve-3d transition-transform duration-500 cursor-pointer"
          initial={{ rotateY: 0 }} // Forza l'inizializzazione a 0 (non girato)
          animate={{ rotateY: isFlipped ? 180 : 0 }}
          transition={{ duration: 0.5 }}
          onClick={handleFlip}
        >
          {/* Front of card - Solo immagine e titolo */}
          <div className="absolute w-full h-full backface-hidden rounded-xl overflow-hidden shadow-lg">
            <div className="relative w-full h-full">
              <img src={imageSrc || "/placeholder.svg"} alt={title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6">
                <h3 className="text-2xl font-bold text-white mb-2">{title}</h3>

                {tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-3">
                    {tags.map((tag, index) => (
                      <span
                        key={index}
                        className="bg-unika-yellow text-unika-dark text-xs font-semibold px-3 py-1 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                <div className="mt-3 text-white/80 text-sm">Clicca per scoprire di più</div>
              </div>
            </div>
          </div>

          {/* Back of card - Informazioni dettagliate */}
          <div className="absolute w-full h-full backface-hidden rounded-xl overflow-hidden shadow-lg bg-white rotate-y-180">
            <div className="p-6 flex flex-col h-full">
              <h3 className="text-2xl font-bold text-unika-dark mb-4">{title}</h3>
              <p className="text-unika-dark-lighter mb-6 flex-grow">{description}</p>

              {features.length > 0 && (
                <div className="mb-6">
                  <h4 className="text-lg font-semibold mb-3 text-unika-dark">Benefici:</h4>
                  <ul className="space-y-2">
                    {features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <span className="inline-block w-2 h-2 rounded-full bg-unika-yellow mr-2 mt-2"></span>
                        <span className="text-unika-dark-lighter">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {link && (
                <Link href={link} className="mt-auto" onClick={(e) => e.stopPropagation()}>
                  <Button className="w-full bg-unika-yellow hover:bg-unika-yellow-hover text-unika-dark rounded-full">
                    Scopri di più
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </>
  )
}
