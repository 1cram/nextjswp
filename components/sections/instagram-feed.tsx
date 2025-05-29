"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { Instagram, Heart, MessageCircle } from "lucide-react"

interface InstagramPost {
  id: string
  image: string
  caption: string
  likes: number
  comments: number
  url: string
}

interface InstagramFeedProps {
  title: string
  subtitle?: string
  username: string
  posts: InstagramPost[]
}

export default function InstagramFeed({ title, subtitle, username, posts }: InstagramFeedProps) {
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
    hidden: { opacity: 0, scale: 0.9 },
    show: { opacity: 1, scale: 1 },
  }

  return (
    <section className="py-20 bg-gradient-light">
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

          <motion.div
            className="flex items-center justify-center mt-4 mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <Link
              href={`https://instagram.com/${username}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-unika-dark hover:text-unika-yellow transition-colors"
            >
              <Instagram className="h-5 w-5 mr-2" />
              <span className="font-medium">@{username}</span>
            </Link>
          </motion.div>
        </div>

        <motion.div
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          {posts.map((post) => (
            <motion.div key={post.id} variants={item} whileHover={{ scale: 1.03 }} transition={{ duration: 0.3 }}>
              <Link href={post.url} target="_blank" rel="noopener noreferrer" className="block">
                <div className="relative aspect-square overflow-hidden rounded-lg group">
                  <Image
                    src={post.image || "/placeholder.svg"}
                    alt={post.caption}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                    <p className="text-white text-sm line-clamp-2 mb-2">{post.caption}</p>
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center text-white">
                        <Heart className="h-4 w-4 mr-1" />
                        <span className="text-xs">{post.likes}</span>
                      </div>
                      <div className="flex items-center text-white">
                        <MessageCircle className="h-4 w-4 mr-1" />
                        <span className="text-xs">{post.comments}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        <div className="text-center mt-8">
          <Link
            href={`https://instagram.com/${username}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-[#833AB4] via-[#FD1D1D] to-[#FCAF45] text-white font-medium rounded-full hover:opacity-90 transition-opacity"
          >
            <Instagram className="h-5 w-5 mr-2" />
            Seguici su Instagram
          </Link>
        </div>
      </div>
    </section>
  )
}
