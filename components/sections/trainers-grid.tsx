"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { Instagram, Facebook } from "lucide-react"

interface TrainerSocial {
  platform: "instagram" | "facebook" | "youtube" | "linkedin"
  url: string
}

interface Trainer {
  id: string
  name: string
  role: string
  image: string
  bio: string
  specialties: string[]
  socials?: TrainerSocial[]
}

interface TrainersGridProps {
  title: string
  subtitle?: string
  trainers: Trainer[]
}

export default function TrainersGrid({ title, subtitle, trainers }: TrainersGridProps) {
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
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  }

  const getSocialIcon = (platform: string) => {
    switch (platform) {
      case "instagram":
        return <Instagram size={18} />
      case "facebook":
        return <Facebook size={18} />
      default:
        return null
    }
  }

  return (
    <section id="trainers" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <motion.h2
            className="text-3xl md:text-4xl font-bold mb-4 text-unika-dark"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            {title}
          </motion.h2>
          {subtitle && (
            <motion.p
              className="text-lg text-unika-dark-lighter max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {subtitle}
            </motion.p>
          )}
        </div>

        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          {trainers.map((trainer) => (
            <motion.div key={trainer.id} variants={item} className="group">
              <Link href={`/trainers/${trainer.id}`}>
                <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 h-full">
                  <div className="relative h-80 overflow-hidden">
                    <Image
                      src={trainer.image || "/placeholder.svg"}
                      alt={trainer.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                    {trainer.socials && (
                      <div className="absolute bottom-4 right-4 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        {trainer.socials.map((social, index) => (
                          <a
                            key={index}
                            href={social.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-white/20 backdrop-blur-sm p-2 rounded-full hover:bg-white/40 transition-colors"
                            onClick={(e) => e.stopPropagation()}
                          >
                            {getSocialIcon(social.platform)}
                          </a>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-1 text-unika-dark group-hover:text-unika-yellow transition-colors">
                      {trainer.name}
                    </h3>
                    <p className="text-unika-dark-lighter mb-4">{trainer.role}</p>

                    <p className="text-unika-dark-lighter mb-4 line-clamp-3">{trainer.bio}</p>

                    <div className="flex flex-wrap gap-2">
                      {trainer.specialties.slice(0, 3).map((specialty, index) => (
                        <span
                          key={index}
                          className="bg-gray-100 text-unika-dark-lighter text-xs px-2 py-1 rounded-full"
                        >
                          {specialty}
                        </span>
                      ))}
                      {trainer.specialties.length > 3 && (
                        <span className="bg-gray-100 text-unika-dark-lighter text-xs px-2 py-1 rounded-full">
                          +{trainer.specialties.length - 3}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
