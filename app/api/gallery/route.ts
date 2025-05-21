import { NextResponse } from "next/server"
import { WORDPRESS_API_V2_URL } from "@/lib/wordpress"

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

    // Costruisci l'URL dell'API WordPress
    let url = `${WORDPRESS_API_V2_URL}/gallery?_embed&per_page=${limit}&page=${page}`

    // Aggiungi il filtro per categoria se specificato
    if (category) {
      url += `&category=${category}`
    }

    console.log(`Fetching gallery from WordPress API: ${url}`)

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
    const images = await response.json()

    // Elabora le immagini per estrarre l'URL dell'immagine in evidenza
    const processedImages = images.map((image: any) => {
      // Estrai l'URL dell'immagine in evidenza
      const featuredImageUrl = image._embedded?.["wp:featuredmedia"]?.[0]?.source_url || ""

      return {
        ...image,
        featured_image_url: featuredImageUrl,
      }
    })

    // Restituisci i dati
    return NextResponse.json(processedImages)
  } catch (error) {
    console.error("Errore durante il recupero delle immagini della galleria:", error)

    // Restituisci un array vuoto in caso di errore
    return NextResponse.json([])
  }
}
