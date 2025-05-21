import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import MainNavbar from "@/components/navigation/main-navbar"
import TextReveal from "@/components/animations/text-reveal"
import ScrollProgress from "@/components/animations/scroll-progress"
import FadeInSection from "@/components/animations/fade-in-section"
import { ArrowRight } from "lucide-react"
import { getAllBlogPosts, getBlogCategories } from "@/lib/wordpress"
import { getSafeImageUrl, decodeHtmlEntities, stripHtml, limitWords } from "@/lib/api-helpers"

export const metadata: Metadata = {
  title: "Blog | Unika Fitness Club",
  description: "Articoli, consigli e novità dal mondo del fitness e del benessere.",
}

export default async function BlogPage({
  searchParams,
}: {
  searchParams: { page?: string; category?: string }
}) {
  // Utilizziamo await Promise.resolve() per risolvere l'errore di searchParams
  const params = await Promise.resolve(searchParams)
  const currentPage = Number(params.page) || 1
  const categorySlug = params.category

  // Recupera le categorie
  const categories = await getBlogCategories()

  // Recupera i post del blog - rimuoviamo il terzo argomento che causa l'errore
  const { posts, total, totalPages } = await getAllBlogPosts(9, currentPage)

  return (
    <div className="min-h-screen bg-white">
      {/* Barra di progresso dello scroll */}
      <ScrollProgress />

      {/* Navigazione principale */}
      <MainNavbar />

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 bg-[#f5f5f7]">
        <div className="max-w-7xl mx-auto">
          <TextReveal>
            <h1 className="text-4xl md:text-5xl font-bold text-center mb-6">Blog</h1>
          </TextReveal>
          <TextReveal delay={0.1}>
            <p className="text-lg text-gray-600 text-center mb-8 max-w-3xl mx-auto">
              Articoli, consigli e novità dal mondo del fitness e del benessere. Scopri le ultime tendenze e i migliori
              consigli per migliorare il tuo allenamento e il tuo stile di vita.
            </p>
          </TextReveal>
        </div>
      </section>

      {/* Filtro Categorie */}
      <section className="py-8 px-4 border-b">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/blog"
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                !categorySlug ? "bg-unika-yellow text-unika-dark" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Tutti
            </Link>
            {categories.map((category) => (
              <Link
                key={category.id}
                href={`/blog?category=${category.slug}`}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  categorySlug === category.slug
                    ? "bg-unika-yellow text-unika-dark"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {category.name} ({category.count})
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Articoli del Blog */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          {posts.length === 0 ? (
            <div className="text-center py-12">
              <h2 className="text-2xl font-semibold mb-4">Nessun articolo disponibile</h2>
              <p className="text-gray-600 mb-8">Non ci sono articoli in questa categoria al momento.</p>
              <Link href="/blog">
                <Button variant="outline" className="rounded-full px-6 py-2">
                  Torna a tutti gli articoli
                </Button>
              </Link>
            </div>
          ) : (
            <>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {posts.map((post, index) => (
                  <FadeInSection key={post.id} direction="up" delay={index * 0.1}>
                    <Link href={`/blog/${post.slug}`} className="block group">
                      <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow h-full">
                        <div className="relative h-48 overflow-hidden">
                          <Image
                            src={getSafeImageUrl(post.featured_image_url) || "/placeholder.svg"}
                            alt={decodeHtmlEntities(post.title.rendered)}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                          {post.category_names && post.category_names.length > 0 && (
                            <div className="absolute top-4 left-4 bg-unika-yellow text-unika-dark text-xs font-semibold px-3 py-1 rounded-full">
                              {post.category_names[0]}
                            </div>
                          )}
                        </div>
                        <div className="p-6">
                          <div className="flex items-center text-sm text-unika-gray-dark mb-2">
                            <span>{new Date(post.date).toLocaleDateString("it-IT")}</span>
                            <span className="mx-2">•</span>
                            <span>{post.author_name}</span>
                          </div>
                          <h3 className="text-xl font-semibold mb-2 group-hover:text-unika-yellow transition-colors">
                            {decodeHtmlEntities(post.title.rendered)}
                          </h3>
                          <p className="text-unika-dark-lighter mb-4">
                            {limitWords(stripHtml(post.excerpt.rendered), 20)}
                          </p>
                          <div className="flex items-center text-unika-yellow font-medium">
                            <span>Leggi di più</span>
                            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                          </div>
                        </div>
                      </div>
                    </Link>
                  </FadeInSection>
                ))}
              </div>

              {/* Paginazione */}
              {totalPages > 1 && (
                <div className="flex justify-center mt-12">
                  <div className="flex space-x-2">
                    {currentPage > 1 && (
                      <Link
                        href={`/blog?page=${currentPage - 1}${categorySlug ? `&category=${categorySlug}` : ""}`}
                        className="px-4 py-2 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
                      >
                        Precedente
                      </Link>
                    )}

                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                      <Link
                        key={page}
                        href={`/blog?page=${page}${categorySlug ? `&category=${categorySlug}` : ""}`}
                        className={`px-4 py-2 rounded-md ${
                          currentPage === page
                            ? "bg-unika-yellow text-unika-dark"
                            : "bg-gray-100 hover:bg-gray-200 transition-colors"
                        }`}
                      >
                        {page}
                      </Link>
                    ))}

                    {currentPage < totalPages && (
                      <Link
                        href={`/blog?page=${currentPage + 1}${categorySlug ? `&category=${categorySlug}` : ""}`}
                        className="px-4 py-2 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
                      >
                        Successiva
                      </Link>
                    )}
                  </div>
                </div>
              )}
            </>
          )}
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
