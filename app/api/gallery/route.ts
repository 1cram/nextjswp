import { NextResponse } from "next/server"
import { WORDPRESS_API_V2_URL } from "@/lib/wordpress"
import { getSafeImageUrl } from "@/lib/api-helpers"

// Credenziali WordPress (usate solo lato server)
const WP_USERNAME = "nachos"
const WP_PASSWORD = "quickest"

export async function GET(request: Request) {
  try {
    // Estrai i parametri dalla query string
    const { searchParams } = new URL(request.url)
    const limit = Number.parseInt(searchParams.get("limit") || "12", 10)
    const page = Number.parseInt(searchParams.get("page") || "1", 10)
    const category = searchParams.get("category") || ""

    console.log(`Fetching gallery from WordPress API: ${WORDPRESS_API_V2_URL}/gallery`)

    // Costruisci l'URL dell'API WordPress
    let url = `${WORDPRESS_API_V2_URL}/gallery?_embed&per_page=${limit}&page=${page}`

    // Aggiungi il filtro per categoria se specificato
    if (category && category !== "Tutti") {
      url += `&acf[category]=${encodeURIComponent(category)}`
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
      console.error(`WordPress API error: ${response.status} ${response.statusText}`)

      // Se l'endpoint gallery non esiste, prova con posts
      const fallbackUrl = `${WORDPRESS_API_V2_URL}/posts?_embed&per_page=${limit}&page=${page}&categories=gallery`
      const fallbackResponse = await fetch(fallbackUrl, fetchOptions)

      if (!fallbackResponse.ok) {
        throw new Error(`Both gallery and fallback API requests failed`)
      }

      const fallbackData = await fallbackResponse.json()
      return NextResponse.json(processFallbackData(fallbackData))
    }

    // Estrai i dati dalla risposta
    const images = await response.json()

    // Processa le immagini per estrarre l'URL dell'immagine in evidenza
    const processedImages = images.map((image: any) => {
      // Estrai l'URL dell'immagine in evidenza
      const featuredImageUrl = image._embedded?.["wp:featuredmedia"]?.[0]?.source_url || ""

      return {
        id: image.id,
        slug: image.slug,
        title: image.title,
        content: image.content,
        featured_image_url: getSafeImageUrl(featuredImageUrl),
        acf: image.acf || {},
      }
    })

    console.log(`Successfully fetched ${processedImages.length} gallery images`)
    return NextResponse.json(processedImages)
  } catch (error) {
    console.error("Errore durante il recupero delle immagini della galleria:", error)

    // Restituisci dati di fallback invece di un array vuoto
    const fallbackImages = [
      {
        id: 1,
        slug: "palestra-1",
        title: { rendered: "Sala Pesi" },
        content: { rendered: "La nostra moderna sala pesi" },
        featured_image_url: "/placeholder.svg?height=600&width=600&text=Sala+Pesi",
        acf: { category: "Struttura" },
      },
      {
        id: 2,
        slug: "pilates-1",
        title: { rendered: "Sala Pilates" },
        content: { rendered: "Sala dedicata al Pilates Reformer" },
        featured_image_url: "/placeholder.svg?height=600&width=600&text=Pilates",
        acf: { category: "Pilates" },
      },
      {
        id: 3,
        slug: "ems-1",
        title: { rendered: "EMS Training" },
        content: { rendered: "Zona EMS Training" },
        featured_image_url: "/placeholder.svg?height=600&width=600&text=EMS",
        acf: { category: "EMS" },
      },
    ]

    return NextResponse.json(fallbackImages)
  }
}

function processFallbackData(posts: any[]) {
  return posts.map((post: any) => {
    const featuredImageUrl = post._embedded?.["wp:featuredmedia"]?.[0]?.source_url || ""

    return {
      id: post.id,
      slug: post.slug,
      title: post.title,
      content: post.content,
      featured_image_url: getSafeImageUrl(featuredImageUrl),
      acf: post.acf || { category: "Generale" },
    }
  })
}
