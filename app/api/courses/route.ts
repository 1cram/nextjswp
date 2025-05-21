import { NextResponse } from "next/server"
import { WORDPRESS_API_V2_URL } from "@/lib/wordpress"

// Credenziali WordPress (usate solo lato server)
const WP_USERNAME = "nachos"
const WP_PASSWORD = "quickest"

export async function GET(request: Request) {
  try {
    // Estrai i parametri dalla query string
    const { searchParams } = new URL(request.url)
    const limit = Number.parseInt(searchParams.get("limit") || "100", 10)
    const page = Number.parseInt(searchParams.get("page") || "1", 10)
    const category = searchParams.get("category") || ""

    // Costruisci l'URL dell'API WordPress
    let url = `${WORDPRESS_API_V2_URL}/courses?per_page=${limit}&page=${page}&_embed`

    // Aggiungi il filtro per categoria se specificato
    if (category) {
      url += `&category=${category}`
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
    const courses = await response.json()

    // Elabora i corsi per estrarre informazioni aggiuntive da _embedded
    const processedCourses = courses.map((course: any) => {
      // Estrai l'URL dell'immagine in evidenza
      const featuredImageUrl = course._embedded?.["wp:featuredmedia"]?.[0]?.source_url || ""

      return {
        ...course,
        featured_image_url: featuredImageUrl,
      }
    })

    // Recupera i dati dei trainer per i corsi che hanno un trainer associato
    const coursesWithTrainers = await Promise.all(
      processedCourses.map(async (course: any) => {
        // Verifica se il corso ha un trainer associato
        if (course.acf.trainer) {
          let trainerId: number

          // Determina l'ID del trainer in base al tipo di dato restituito
          if (typeof course.acf.trainer === "number") {
            trainerId = course.acf.trainer
          } else if (typeof course.acf.trainer === "object" && course.acf.trainer.ID) {
            trainerId = course.acf.trainer.ID
          } else {
            return course
          }

          // Recupera i dati del trainer
          try {
            const trainerResponse = await fetch(`${WORDPRESS_API_V2_URL}/trainers/${trainerId}?_embed`, fetchOptions)

            if (!trainerResponse.ok) {
              throw new Error(`API request failed: ${trainerResponse.status}`)
            }

            const trainerData = await trainerResponse.json()

            // Estrai l'URL dell'immagine in evidenza al trainer
            const trainerImageUrl = trainerData._embedded?.["wp:featuredmedia"]?.[0]?.source_url || ""

            // Aggiungi i dati del trainer al corso
            course.trainer_data = {
              ...trainerData,
              featured_image_url: trainerImageUrl,
            }
          } catch (error) {
            console.error(`Error fetching trainer data for course ${course.id}:`, error)
          }
        }

        return course
      }),
    )

    // Restituisci i dati
    return NextResponse.json(coursesWithTrainers)
  } catch (error) {
    console.error("Error fetching courses:", error)

    // Restituisci un array vuoto in caso di errore
    return NextResponse.json([])
  }
}
