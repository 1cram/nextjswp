"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Facebook, Instagram, Youtube } from "lucide-react"

interface SocialFollowProps {
  title: string
  subtitle: string
  socials: {
    platform: "facebook" | "instagram" | "youtube"
    url: string
    username: string
  }[]
}

export default function SocialFollow({ title, subtitle, socials }: SocialFollowProps) {
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
      case "facebook":
        return <Facebook size={24} />
      case "instagram":
        return <Instagram size={24} />
      case "youtube":
        return <Youtube size={24} />
      default:
        return null
    }
  }

  const getSocialColor = (platform: string) => {
    switch (platform) {
      case "facebook":
        return "bg-[#1877F2] hover:bg-[#0E65D9]"
      case "instagram":
        return "bg-gradient-to-r from-[#833AB4] via-[#FD1D1D] to-[#FCAF45] hover:opacity-90"
      case "youtube":
        return "bg-[#FF0000] hover:bg-[#D90000]"
      default:
        return "bg-gray-800 hover:bg-gray-700"
    }
  }

  return (
    <section className="py-20 bg-gradient-light">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <motion.h2
          className="text-3xl md:text-4xl font-bold mb-4 text-unika-dark"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          {title}
        </motion.h2>

        <motion.p
          className="text-lg text-unika-dark-lighter mb-12 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {subtitle}
        </motion.p>

        <motion.div
          className="flex flex-wrap justify-center gap-6"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          {socials.map((social, index) => (
            <motion.div key={index} variants={item} className="text-center">
              <Link
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex flex-col items-center group`}
              >
                <div
                  className={`${getSocialColor(social.platform)} text-white p-5 rounded-full transition-transform group-hover:scale-110 mb-3`}
                >
                  {getSocialIcon(social.platform)}
                </div>
                <span className="text-unika-dark font-medium">@{social.username}</span>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
