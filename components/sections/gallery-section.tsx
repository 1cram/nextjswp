"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { X } from "lucide-react"

interface GalleryImage {
  id: string
  src: string
  alt: string
  category: string
}

interface GallerySectionProps {
  title: string
  subtitle?: string
  images: GalleryImage[]
  categories: string[]
}

export default function GallerySection({ title, subtitle, images, categories }: GallerySectionProps) {
  const [selectedCategory, setSelectedCategory] = useState("Tutti")
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Imposta isLoading a false quando le immagini sono caricate
  useEffect(() => {
    if (images.length > 0) {
      setIsLoading(false)
    }
  }, [images])

  const filteredImages =
    selectedCategory === "Tutti" ? images : images.filter((image) => image.category === selectedCategory)

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, scale: 0.8 },
    show: { opacity: 1, scale: 1 },
  }

  // Fallback se non ci sono immagini
  if (isLoading) {
    return (
      <section id="galleria" className="py-20 bg-gradient-dark">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <motion.h2
              className="text-3xl md:text-4xl font-bold mb-4 text-white"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              {title}
            </motion.h2>
            {subtitle && (
              <motion.p
                className="text-lg text-gray-300 max-w-3xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                {subtitle}
              </motion.p>
            )}
          </div>
          <div className="flex justify-center items-center h-64">
            <div className="animate-pulse text-white text-xl">Caricamento galleria...</div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="galleria" className="py-20 bg-gradient-dark">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <motion.h2
            className="text-3xl md:text-4xl font-bold mb-4 text-white"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            {title}
          </motion.h2>
          {subtitle && (
            <motion.p
              className="text-lg text-gray-300 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {subtitle}
            </motion.p>
          )}
        </div>

        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedCategory === category
                  ? "bg-unika-yellow text-unika-dark"
                  : "bg-unika-dark-lighter text-white hover:bg-unika-dark-darker"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {filteredImages.length === 0 ? (
          <div className="text-center py-12 text-white">Nessuna immagine trovata per questa categoria.</div>
        ) : (
          <motion.div
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
            variants={container}
            initial="hidden"
            animate="show"
          >
            {filteredImages.map((image) => (
              <motion.div
                key={image.id}
                variants={item}
                className="aspect-square relative overflow-hidden rounded-lg cursor-pointer group"
                onClick={() => setSelectedImage(image)}
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.3 }}
              >
                <Image
                  src={image.src || "/placeholder.svg"}
                  alt={image.alt}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                  <p className="text-white font-medium">{image.alt}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Lightbox */}
        <AnimatePresence>
          {selectedImage && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
              onClick={() => setSelectedImage(null)}
            >
              <button
                className="absolute top-4 right-4 text-white hover:text-gray-300 z-10"
                onClick={() => setSelectedImage(null)}
              >
                <X className="h-8 w-8" />
              </button>
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                className="relative max-w-4xl max-h-[80vh] w-full"
                onClick={(e) => e.stopPropagation()}
              >
                <Image
                  src={selectedImage.src || "/placeholder.svg"}
                  alt={selectedImage.alt}
                  width={1200}
                  height={800}
                  className="object-contain max-h-[80vh] mx-auto"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-black/50 p-4 text-white text-center">
                  <p className="font-medium">{selectedImage.alt}</p>
                  <p className="text-sm text-gray-300">{selectedImage.category}</p>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
