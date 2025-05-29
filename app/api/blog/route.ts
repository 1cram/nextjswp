import { NextResponse } from "next/server"
import { WORDPRESS_API_V2_URL } from "@/lib/wordpress"
import { processWordPressPost } from "@/lib/content-processor"

// Credenziali WordPress (usate solo lato server)
const WP_USERNAME = "nachos"
const WP_PASSWORD = "quickest"

export async function GET(request: Request) {
  try {
    // Estrai i parametri dalla query string
    const { searchParams } = new URL(request.url)
    const limit = Number.parseInt(searchParams.get("limit") || "10", 10)
    const page = Number.parseInt(searchParams.get("page") || "1", 10)
    const category = searchParams.get("category") || ""
    const tag = searchParams.get("tag") || ""
    const search = searchParams.get("search") || ""

    console.log(`Fetching blog posts with limit=${limit} and page=${page}`)

    // Costruisci l'URL dell'API WordPress
    let url = `${WORDPRESS_API_V2_URL}/posts?per_page=${limit}&page=${page}&_embed`

    // Aggiungi il filtro per categoria se specificato
    if (category) {
      url += `&categories=${category}`
    }

    // Aggiungi il filtro per tag se specificato
    if (tag) {
      url += `&tags=${tag}`
    }

    // Aggiungi il filtro per ricerca se specificato
    if (search) {
      url += `&search=${encodeURIComponent(search)}`
    }

    // Configura le opzioni di fetch con autenticazione Basic
    const fetchOptions: RequestInit = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${Buffer.from(`${WP_USERNAME}:${WP_PASSWORD}`).toString("base64")}`,
      },
      next: { revalidate: 60 }, // Revalidate every 60 seconds
    }

    // Effettua la richiesta all'API WordPress
    const response = await fetch(url, fetchOptions)

    if (!response.ok) {
      throw new Error(`API request failed: ${response.status}`)
    }

    // Estrai i dati dalla risposta
    const posts = await response.json()

    // Estrai il numero totale di post e pagine dalle intestazioni
    const total = Number.parseInt(response.headers.get("X-WP-Total") || "0", 10)
    const totalPages = Number.parseInt(response.headers.get("X-WP-TotalPages") || "0", 10)

    // Elabora i post per estrarre informazioni aggiuntive da _embedded
    const processedPosts = posts.map((post: any) => {
      // Estrai il nome dell'autore
      const authorName = post._embedded?.author?.[0]?.name || "Autore sconosciuto"

      // Estrai l'URL dell'immagine in evidenza
      const featuredImageUrl = post._embedded?.["wp:featuredmedia"]?.[0]?.source_url || ""

      // Estrai i nomi delle categorie
      const categoryNames = post._embedded?.["wp:term"]?.[0]?.map((cat: any) => cat.name) || []

      // Crea un post processato con le informazioni aggiuntive
      const processedPost = {
        ...post,
        author_name: authorName,
        featured_image_url: featuredImageUrl,
        category_names: categoryNames,
      }

      // Processa il contenuto del post per gestire le immagini
      try {
        if (typeof processWordPressPost === "function") {
          return processWordPressPost(processedPost)
        }
        return processedPost
      } catch (error) {
        console.error("Error processing WordPress post:", error)
        return processedPost
      }
    })

    // Restituisci i dati
    return NextResponse.json({
      posts: processedPosts,
      total,
      totalPages,
    })
  } catch (error) {
    console.error("Error fetching blog posts:", error)

    // Restituisci un oggetto vuoto in caso di errore
    return NextResponse.json({
      posts: [],
      total: 0,
      totalPages: 0,
    })
  }
}
