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
    const limit = Number.parseInt(searchParams.get("limit") || "100", 10)
    const page = Number.parseInt(searchParams.get("page") || "1", 10)

    // Costruisci l'URL dell'API WordPress
    const url = `${WORDPRESS_API_V2_URL}/trainers?per_page=${limit}&page=${page}&_embed`

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
    const trainers = await response.json()

    // Processa i trainer per sostituire le URL delle immagini
    const processedTrainers = trainers.map((trainer: any) => {
      return processWordPressPost(trainer)
    })

    // Restituisci i dati
    return NextResponse.json(processedTrainers)
  } catch (error) {
    console.error("Error fetching trainers:", error)

    // Restituisci un array vuoto in caso di errore
    return NextResponse.json([])
  }
}
