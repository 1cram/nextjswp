"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import MainNavbar from "@/components/navigation/main-navbar"
import ScrollProgress from "@/components/animations/scroll-progress"
import { ArrowLeft, Calendar, User, Tag } from "lucide-react"
import { formatDate, type WPBlogPost } from "@/lib/wordpress"
import { getSafeImageUrl, decodeHtmlEntities } from "@/lib/api-helpers"
import { useEffect, useState } from "react"
import WordPressContent from "@/components/wordpress-content"

export default function BlogPostClientPage({ post }: { post: WPBlogPost }) {
  const [relatedPosts, setRelatedPosts] = useState<WPBlogPost[]>([])
  const [isLoading, setIsLoading] = useState(true)

  // Carica i post correlati
  useEffect(() => {
    const fetchRelatedPosts = async () => {
      try {
        const response = await fetch(`/api/blog?limit=4`, {
          cache: "force-cache",
          next: { revalidate: 60 }, // Revalidate every 60 seconds
        })

        if (response.ok) {
          const data = await response.json()
          // Filtra i post correlati escludendo il post corrente
          const filtered = data.posts.filter((p: WPBlogPost) => p.id !== post.id).slice(0, 3)
          setRelatedPosts(filtered)
        }
      } catch (error) {
        console.error("Errore nel caricamento dei post correlati:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchRelatedPosts()
  }, [post.id])

  return (
    <div className="min-h-screen bg-white">
      {/* Barra di progresso dello scroll */}
      <ScrollProgress />

      {/* Navigazione principale */}
      <MainNavbar />

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 bg-[#f5f5f7]">
        <div className="max-w-4xl mx-auto">
          <Link href="/blog" className="inline-flex items-center text-gray-600 hover:text-unika-yellow mb-6">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Torna al blog
          </Link>

          <h1 className="text-3xl md:text-4xl font-bold mb-6">{decodeHtmlEntities(post.title.rendered)}</h1>

          <div className="flex flex-wrap gap-4 mb-8 text-sm text-gray-600">
            <div className="flex items-center">
              <Calendar className="mr-2 h-4 w-4" />
              <span>{formatDate(post.date)}</span>
            </div>
            <div className="flex items-center">
              <User className="mr-2 h-4 w-4" />
              <span>{post.author_name}</span>
            </div>
            {post.category_names && post.category_names.length > 0 && (
              <div className="flex items-center">
                <Tag className="mr-2 h-4 w-4" />
                <span>{post.category_names.join(", ")}</span>
              </div>
            )}
          </div>

          {post.featured_image_url && (
            <div className="relative h-[400px] rounded-xl overflow-hidden mb-8">
              <Image
                src={getSafeImageUrl(post.featured_image_url) || "/placeholder.svg"}
                alt={decodeHtmlEntities(post.title.rendered)}
                fill
                className="object-cover"
                loading="eager"
                priority
              />
            </div>
          )}
        </div>
      </section>

      {/* Contenuto dell'articolo */}
      <section className="py-12 px-4">
        <div className="max-w-3xl mx-auto">
          <article className="prose prose-lg max-w-none">
            <WordPressContent content={post.content.rendered} />
          </article>
        </div>
      </section>

      {/* Articoli correlati */}
      {!isLoading && relatedPosts.length > 0 && (
        <section className="py-16 px-4 bg-[#f5f5f7]">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">Articoli correlati</h2>

            <div className="grid md:grid-cols-3 gap-8">
              {relatedPosts.map((relatedPost) => (
                <Link key={relatedPost.id} href={`/blog/${relatedPost.slug}`} className="block group">
                  <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow h-full">
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src={getSafeImageUrl(relatedPost.featured_image_url) || "/placeholder.svg"}
                        alt={decodeHtmlEntities(relatedPost.title.rendered)}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                      />
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-semibold mb-2 group-hover:text-unika-yellow transition-colors">
                        {decodeHtmlEntities(relatedPost.title.rendered)}
                      </h3>
                      <p className="text-gray-600 text-sm">{formatDate(relatedPost.date)}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Vuoi saperne di più?</h2>
          <p className="text-lg text-gray-600 mb-8 max-w-3xl mx-auto">
            Prenota una consulenza gratuita con uno dei nostri esperti e scopri come possiamo aiutarti a raggiungere i
            tuoi obiettivi di fitness.
          </p>
          <Link href="/prenota">
            <Button className="bg-unika-yellow text-unika-dark hover:bg-unika-yellow-hover rounded-full px-8 py-6 text-lg">
              Prenota una Consulenza
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-unika-dark text-white py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-sm">
            <div>
              <h4 className="font-semibold mb-4 text-white">Unika Fitness Club</h4>
              <p className="text-gray-400 mb-4">
                Via Example 123
                <br />
                00100 Roma, Italia
              </p>
              <div className="flex items-center mb-2 text-gray-400">
                <span>+39 331 913 8064</span>
              </div>
              <div className="flex items-center text-gray-400">
                <span>unikafitnessclub@gmail.com</span>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-white">Servizi</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/pilates" className="hover:text-unika-yellow">
                    Pilates Reformer
                  </Link>
                </li>
                <li>
                  <Link href="/ems" className="hover:text-unika-yellow">
                    EMS Training
                  </Link>
                </li>
                <li>
                  <Link href="/corsi" className="hover:text-unika-yellow">
                    Corsi di Gruppo
                  </Link>
                </li>
                <li>
                  <Link href="/personal" className="hover:text-unika-yellow">
                    Personal Training
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-white">Informazioni</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/" className="hover:text-unika-yellow">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/club" className="hover:text-unika-yellow">
                    Il Tuo Club
                  </Link>
                </li>
                <li>
                  <Link href="/trainers" className="hover:text-unika-yellow">
                    Team
                  </Link>
                </li>
                <li>
                  <Link href="/blog" className="hover:text-unika-yellow">
                    Blog
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-white">Legale</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/privacy-policy" className="hover:text-unika-yellow">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/cookie-policy" className="hover:text-unika-yellow">
                    Cookie Policy
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="hover:text-unika-yellow">
                    Termini e Condizioni
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-unika-dark-lighter text-gray-400 text-sm flex flex-col md:flex-row justify-between items-center">
            <p>© 2025 Unika Fitness Club. Tutti i diritti riservati.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
