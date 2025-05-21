import type { Metadata } from "next"
import { getBlogPostBySlug, getAllBlogPosts } from "@/lib/wordpress"
import { decodeHtmlEntities } from "@/lib/api-helpers"
import { notFound } from "next/navigation"
import BlogPostClientPage from "./BlogPostClientPage"
import type { WPBlogPost } from "@/lib/wordpress"

// Metadati dinamici per SEO
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  // Utilizziamo await Promise.resolve() per risolvere l'errore di params
  const resolvedParams = await Promise.resolve(params)
  const post = await getBlogPostBySlug(resolvedParams.slug)

  if (!post) {
    return {
      title: "Articolo non trovato | Unika Fitness Club",
      description: "L'articolo che stai cercando non è disponibile.",
    }
  }

  return {
    title: `${decodeHtmlEntities(post.title.rendered)} | Unika Fitness Club`,
    description: decodeHtmlEntities(post.excerpt.rendered)
      .substring(0, 160)
      .replace(/<[^>]*>/g, ""),
  }
}

// Genera i percorsi statici a build time
export async function generateStaticParams() {
  const { posts } = await getAllBlogPosts(100) // Recupera fino a 100 post per la generazione statica

  return posts.map((post: WPBlogPost) => ({
    slug: post.slug,
  }))
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  // Utilizziamo await Promise.resolve() per risolvere l'errore di params
  const resolvedParams = await Promise.resolve(params)
  const post = await getBlogPostBySlug(resolvedParams.slug)

  // Se il post non esiste, mostra la pagina 404
  if (!post) {
    notFound()
  }

  return <BlogPostClientPage post={post} />
}
