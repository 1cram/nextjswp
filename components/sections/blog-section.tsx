"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Loader2 } from "lucide-react"

interface BlogPost {
  id: string
  title: string
  excerpt: string
  date: string
  author: string
  category: string
  imageSrc: string
}

interface BlogSectionProps {
  title: string
  subtitle?: string
  posts: BlogPost[]
  isLoading?: boolean
  hasError?: boolean
}

export default function BlogSection({ title, subtitle, posts, isLoading = false, hasError = false }: BlogSectionProps) {
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

  // Mostra un indicatore di caricamento
  if (isLoading) {
    return (
      <section id="blog" className="py-20 bg-gradient-light">
        <div className="max-w-7xl mx-auto px-4">
          <motion.h2
            className="text-3xl md:text-4xl font-bold text-center mb-4 text-unika-dark"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            {title}
          </motion.h2>

          {subtitle && (
            <motion.p
              className="text-lg text-center mb-12 max-w-3xl mx-auto text-unika-dark-lighter"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {subtitle}
            </motion.p>
          )}

          <div className="flex justify-center items-center py-16">
            <Loader2 className="h-8 w-8 text-unika-yellow animate-spin" />
            <span className="ml-2 text-unika-dark-lighter">Caricamento articoli...</span>
          </div>
        </div>
      </section>
    )
  }

  // Mostra un messaggio di errore
  if (hasError) {
    return (
      <section id="blog" className="py-20 bg-gradient-light">
        <div className="max-w-7xl mx-auto px-4">
          <motion.h2
            className="text-3xl md:text-4xl font-bold text-center mb-4 text-unika-dark"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            {title}
          </motion.h2>

          {subtitle && (
            <motion.p
              className="text-lg text-center mb-12 max-w-3xl mx-auto text-unika-dark-lighter"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {subtitle}
            </motion.p>
          )}

          <div className="text-center py-12">
            <p className="text-unika-dark-lighter">
              Si è verificato un errore durante il caricamento degli articoli. Riprova più tardi.
            </p>
          </div>
        </div>
      </section>
    )
  }

  // Se non ci sono post, mostra un messaggio
  if (!posts || posts.length === 0) {
    return (
      <section id="blog" className="py-20 bg-gradient-light">
        <div className="max-w-7xl mx-auto px-4">
          <motion.h2
            className="text-3xl md:text-4xl font-bold text-center mb-4 text-unika-dark"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            {title}
          </motion.h2>

          {subtitle && (
            <motion.p
              className="text-lg text-center mb-12 max-w-3xl mx-auto text-unika-dark-lighter"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {subtitle}
            </motion.p>
          )}

          <div className="text-center py-12">
            <p className="text-unika-dark-lighter">Nessun articolo disponibile al momento.</p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="blog" className="py-20 bg-gradient-light">
      <div className="max-w-7xl mx-auto px-4">
        <motion.h2
          className="text-3xl md:text-4xl font-bold text-center mb-4 text-unika-dark"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          {title}
        </motion.h2>

        {subtitle && (
          <motion.p
            className="text-lg text-center mb-12 max-w-3xl mx-auto text-unika-dark-lighter"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {subtitle}
          </motion.p>
        )}

        <motion.div
          className="grid md:grid-cols-3 gap-8"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          {posts.map((post) => (
            <motion.div key={post.id} variants={item} className="group">
              <Link href={`/blog/${post.id}`} className="block">
                <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={post.imageSrc || "/placeholder.svg"}
                      alt={post.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute top-4 left-4 bg-unika-yellow text-unika-dark text-xs font-semibold px-3 py-1 rounded-full">
                      {post.category}
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center text-sm text-unika-gray-dark mb-2">
                      <span>{post.date}</span>
                      <span className="mx-2">•</span>
                      <span>{post.author}</span>
                    </div>
                    <h3 className="text-xl font-semibold mb-2 group-hover:text-unika-yellow transition-colors text-unika-dark">
                      {post.title}
                    </h3>
                    <p className="text-unika-dark-lighter mb-4">{post.excerpt}</p>
                    <div className="flex items-center text-unika-yellow font-medium">
                      <span>Leggi di più</span>
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        <div className="text-center mt-12">
          <Link
            href="/blog"
            className="inline-flex items-center text-unika-yellow font-medium hover:text-unika-yellow-hover transition-colors"
          >
            Vedi tutti gli articoli
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}
