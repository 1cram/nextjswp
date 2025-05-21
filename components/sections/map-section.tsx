"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { MapPin, Phone, Mail, Clock } from "lucide-react"

interface MapSectionProps {
  title: string
  address: string
  phone: string
  email: string
  hours: string[]
  mapEmbedUrl: string
}

export default function MapSection({ title, address, phone, email, hours, mapEmbedUrl }: MapSectionProps) {
  const [isMapLoaded, setIsMapLoaded] = useState(false)

  return (
    <section id="contatti" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <motion.h2
          className="text-3xl md:text-4xl font-bold text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          {title}
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-8 items-start">
          {/* Informazioni di contatto */}
          <motion.div
            className="bg-white p-8 rounded-xl shadow-sm"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h3 className="text-2xl font-semibold mb-6">Vieni a trovarci</h3>

            <div className="space-y-6">
              <div className="flex items-start">
                <MapPin className="h-6 w-6 text-blue-500 mr-4 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-medium mb-1">Indirizzo</h4>
                  <p className="text-gray-600">{address}</p>
                </div>
              </div>

              <div className="flex items-start">
                <Phone className="h-6 w-6 text-blue-500 mr-4 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-medium mb-1">Telefono</h4>
                  <p className="text-gray-600">{phone}</p>
                </div>
              </div>

              <div className="flex items-start">
                <Mail className="h-6 w-6 text-blue-500 mr-4 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-medium mb-1">Email</h4>
                  <p className="text-gray-600">{email}</p>
                </div>
              </div>

              <div className="flex items-start">
                <Clock className="h-6 w-6 text-blue-500 mr-4 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-medium mb-1">Orari</h4>
                  <ul className="text-gray-600 space-y-1">
                    {hours.map((hour, index) => (
                      <li key={index}>{hour}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Mappa Google */}
          <motion.div
            className="h-[400px] rounded-xl overflow-hidden shadow-sm relative"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            {!isMapLoaded && (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
              </div>
            )}

            <iframe
              src={mapEmbedUrl}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              onLoad={() => setIsMapLoaded(true)}
              className={isMapLoaded ? "opacity-100" : "opacity-0"}
            ></iframe>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
