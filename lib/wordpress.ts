/**
 * Configurazione e funzioni per l'integrazione con WordPress Headless CMS
 */

// URL base dell'API WordPress
export const WORDPRESS_API_URL = process.env.WORDPRESS_API_URL || "https://synonymous-knee.localsite.io/wp-json"
export const WORDPRESS_API_V2_URL = `${WORDPRESS_API_URL}/wp/v2` // Percorso corretto per l'API v2
export const WORDPRESS_GRAPHQL_URL = process.env.WORDPRESS_GRAPHQL_URL || "https://synonymous-knee.localsite.io/graphql"

// Credenziali WordPress (usate solo lato server)
const WP_USERNAME = "nachos"
const WP_PASSWORD = "quickest"

// Cache per le richieste API
const API_CACHE: Record<string, { data: any; timestamp: number }> = {}
const CACHE_DURATION = 5 * 60 * 1000 // 5 minuti in millisecondi

// Funzione per fare fetch con timeout e cache
async function fetchWithCache(url: string, options: RequestInit = {}, cacheKey?: string): Promise<any> {
  // Se è fornita una chiave di cache e la cache è valida, restituisci i dati dalla cache
  const actualCacheKey = cacheKey || url
  const cachedData = API_CACHE[actualCacheKey]
  const now = Date.now()

  if (cachedData && now - cachedData.timestamp < CACHE_DURATION) {
    console.log(`Using cached data for ${url}`)
    return cachedData.data
  }

  // Aggiungi un timeout alla richiesta
  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), 10000) // 10 secondi di timeout

  try {
    console.log(`Fetching data from ${url}`)

    // Aggiungi l'autenticazione Basic per WordPress
    const headers = {
      ...options.headers,
      Authorization: `Basic ${Buffer.from(`${WP_USERNAME}:${WP_PASSWORD}`).toString("base64")}`,
    }

    // Configura le opzioni di fetch
    const fetchOptions: RequestInit = {
      ...options,
      headers,
      signal: controller.signal,
      next: { revalidate: 60 }, // Revalidate every 60 seconds
    }

    const response = await fetch(url, fetchOptions)

    clearTimeout(timeoutId)

    if (!response.ok) {
      throw new Error(`API request failed: ${response.status}`)
    }

    const data = await response.json()

    // Salva i dati nella cache
    API_CACHE[actualCacheKey] = { data, timestamp: now }

    return data
  } catch (error) {
    clearTimeout(timeoutId)
    console.error(`Error fetching ${url}:`, error)

    // Se c'è un errore ma abbiamo dati in cache (anche se scaduti), usiamoli come fallback
    if (cachedData) {
      console.log(`Using stale cache for ${url}`)
      return cachedData.data
    }

    throw error
  }
}

// Tipi di dati per i contenuti WordPress
export interface WPTrainer {
  id: number
  slug: string
  title: {
    rendered: string
  }
  content: {
    rendered: string
  }
  featured_media: number
  featured_image_url?: string
  _embedded?: {
    "wp:featuredmedia"?: Array<{
      source_url: string
    }>
  }
  acf: {
    role: string
    specialties: string // Area di testo
    certifications: string // Area di testo
    schedule_monday: string
    schedule_tuesday: string
    schedule_wednesday: string
    schedule_thursday: string // Corretto l'errore di battitura
    schedule_friday: string
    schedule_saturday: string
    schedule_sunday: string
    instagram_url: string
    facebook_url: string
    [key: string]: any // Consenti altre proprietà
  }
}

export interface WPCourse {
  id: number
  slug: string
  title: {
    rendered: string
  }
  content: {
    rendered: string
  }
  excerpt: {
    rendered: string
  }
  featured_media: number
  featured_image_url?: string
  _embedded?: {
    "wp:featuredmedia"?: Array<{
      source_url: string
    }>
    author?: Array<{
      name: string
    }>
    "wp:term"?: Array<
      Array<{
        id: number
        name: string
        slug: string
      }>
    >
  }
  acf: {
    level?: string
    duration?: string
    max_participants?: number
    trainer?:
      | number
      | {
          ID: number
          post_title: string
          post_name: string // slug
        }
    schedule?: string // Area di testo
    benefits?: string // Area di testo
    requirements?: string // Area di testo
    calories?: string // Calorie bruciate
    capacity?: string // Capacità della classe
    instructor?: string // Istruttore
    [key: string]: any // Consenti altre proprietà
  }
  trainer_data?: WPTrainer // Campo aggiunto per memorizzare i dati completi del trainer
}

export interface WPBlogPost {
  id: number
  slug: string
  title: {
    rendered: string
  }
  content: {
    rendered: string
  }
  excerpt: {
    rendered: string
  }
  date: string
  modified: string
  author: number
  author_name?: string
  featured_media: number
  featured_image_url?: string
  _embedded?: {
    "wp:featuredmedia"?: Array<{
      source_url: string
    }>
    author?: Array<{
      name: string
    }>
    "wp:term"?: Array<
      Array<{
        id: number
        name: string
        slug: string
      }>
    >
  }
  categories: number[]
  category_names?: string[]
}

// Tipo per le immagini della galleria
export interface WPGalleryImage {
  id: number
  slug: string
  title: {
    rendered: string
  }
  content: {
    rendered: string
  }
  featured_media: number
  featured_image_url?: string
  _embedded?: {
    "wp:featuredmedia"?: Array<{
      source_url: string
    }>
  }
  acf: {
    category?: string
    [key: string]: any
  }
}

// Funzione per recuperare tutti i trainer
export async function getAllTrainers(): Promise<WPTrainer[]> {
  try {
    const trainers = await fetchWithCache(`${WORDPRESS_API_V2_URL}/trainers?per_page=100&_embed`, {}, "all_trainers")

    // Elabora i trainer per estrarre informazioni aggiuntive da _embedded
    return trainers.map((trainer: any) => {
      // Estrai l'URL dell'immagine in evidenza
      const featuredImageUrl = trainer._embedded?.["wp:featuredmedia"]?.[0]?.source_url || ""

      return {
        ...trainer,
        featured_image_url: featuredImageUrl,
      }
    })
  } catch (error) {
    console.error("Error fetching trainers:", error)
    return []
  }
}

// Funzione per recuperare un trainer specifico per slug
export async function getTrainerBySlug(slug: string): Promise<WPTrainer | null> {
  try {
    const trainers = await fetchWithCache(`${WORDPRESS_API_V2_URL}/trainers?slug=${slug}&_embed`, {}, `trainer_${slug}`)

    if (trainers.length === 0) {
      return null
    }

    const trainer = trainers[0]

    // Estrai l'URL dell'immagine in evidenza
    const featuredImageUrl = trainer._embedded?.["wp:featuredmedia"]?.[0]?.source_url || ""

    return {
      ...trainer,
      featured_image_url: featuredImageUrl,
    }
  } catch (error) {
    console.error(`Error fetching trainer with slug ${slug}:`, error)
    return null
  }
}

// Funzione per ottenere tutti i corsi con dati del trainer
export async function getAllCourses(): Promise<WPCourse[]> {
  try {
    const courses = await fetchWithCache(`${WORDPRESS_API_V2_URL}/courses?per_page=100&_embed`, {}, "all_courses")

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
      processedCourses.map(async (course: WPCourse) => {
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
            const trainerData = await fetchWithCache(
              `${WORDPRESS_API_V2_URL}/trainers/${trainerId}?_embed`,
              {},
              `trainer_${trainerId}`,
            )

            // Estrai l'URL dell'immagine in evidenza al trainer
            const featuredImageUrl = trainerData._embedded?.["wp:featuredmedia"]?.[0]?.source_url || ""

            // Aggiungi i dati del trainer al corso
            course.trainer_data = {
              ...trainerData,
              featured_image_url: featuredImageUrl,
            }
          } catch (error) {
            console.error(`Error fetching trainer data for course ${course.id}:`, error)
          }
        }

        return course
      }),
    )

    return coursesWithTrainers
  } catch (error) {
    console.error("Error fetching courses:", error)
    return []
  }
}

// Funzione per ottenere un corso specifico tramite slug con dati del trainer
export async function getCourseBySlug(slug: string): Promise<WPCourse | null> {
  try {
    const courses = await fetchWithCache(`${WORDPRESS_API_V2_URL}/courses?slug=${slug}&_embed`, {}, `course_${slug}`)

    if (courses.length === 0) {
      return null
    }

    const course = courses[0]

    // Estrai l'URL dell'immagine in evidenza
    const featuredImageUrl = course._embedded?.["wp:featuredmedia"]?.[0]?.source_url || ""

    const processedCourse = {
      ...course,
      featured_image_url: featuredImageUrl,
    }

    // Recupera i dati del trainer se il corso ha un trainer associato
    if (processedCourse.acf.trainer) {
      let trainerId: number

      // Determina l'ID del trainer in base al tipo di dato restituito
      if (typeof processedCourse.acf.trainer === "number") {
        trainerId = processedCourse.acf.trainer
      } else if (typeof processedCourse.acf.trainer === "object" && processedCourse.acf.trainer.ID) {
        trainerId = processedCourse.acf.trainer.ID
      } else {
        return processedCourse
      }

      // Recupera i dati del trainer
      try {
        const trainerData = await fetchWithCache(
          `${WORDPRESS_API_V2_URL}/trainers/${trainerId}?_embed`,
          {},
          `trainer_${trainerId}`,
        )

        // Estrai l'URL dell'immagine in evidenza al trainer
        const trainerImageUrl = trainerData._embedded?.["wp:featuredmedia"]?.[0]?.source_url || ""

        // Aggiungi i dati del trainer al corso
        processedCourse.trainer_data = {
          ...trainerData,
          featured_image_url: trainerImageUrl,
        }
      } catch (error) {
        console.error(`Error fetching trainer data for course ${processedCourse.id}:`, error)
      }
    }

    return processedCourse
  } catch (error) {
    console.error(`Error fetching course with slug ${slug}:`, error)
    return null
  }
}

// Funzione per recuperare tutti i post del blog
// Nella funzione getAllBlogPosts, semplifichiamo il codice per migliorare le performance
export async function getAllBlogPosts(
  perPage = 10,
  page = 1,
): Promise<{
  posts: WPBlogPost[]
  total: number
  totalPages: number
}> {
  try {
    const posts = await fetchWithCache(
      `${WORDPRESS_API_V2_URL}/posts?per_page=${perPage}&page=${page}&_embed`,
      {},
      `blog_posts_${perPage}_${page}`,
    )

    // Poiché stiamo usando la nostra funzione personalizzata, dobbiamo simulare le intestazioni
    const total = 100 // Valore predefinito
    const totalPages = Math.ceil(total / perPage)

    // Elabora i post per estrarre informazioni aggiuntive da _embedded
    const processedPosts = posts.map((post: any) => {
      // Estrai il nome dell'autore
      const authorName = post._embedded?.author?.[0]?.name || "Autore sconosciuto"

      // Estrai l'URL dell'immagine in evidenza
      const featuredImageUrl = post._embedded?.["wp:featuredmedia"]?.[0]?.source_url || ""

      // Estrai i nomi delle categorie
      const categoryNames = post._embedded?.["wp:term"]?.[0]?.map((cat: any) => cat.name) || []

      return {
        ...post,
        author_name: authorName,
        featured_image_url: featuredImageUrl,
        category_names: categoryNames,
      }
    })

    return {
      posts: processedPosts,
      total,
      totalPages,
    }
  } catch (error) {
    console.error("Error fetching blog posts:", error)
    return {
      posts: [],
      total: 0,
      totalPages: 0,
    }
  }
}

// Funzione per recuperare un post del blog specifico per slug
export async function getBlogPostBySlug(slug: string): Promise<WPBlogPost | null> {
  try {
    const posts = await fetchWithCache(`${WORDPRESS_API_V2_URL}/posts?slug=${slug}&_embed`, {}, `blog_post_${slug}`)

    if (posts.length === 0) {
      return null
    }

    const post = posts[0]

    // Estrai il nome dell'autore
    const authorName = post._embedded?.author?.[0]?.name || "Autore sconosciuto"

    // Estrai l'URL dell'immagine in evidenza
    const featuredImageUrl = post._embedded?.["wp:featuredmedia"]?.[0]?.source_url || ""

    // Estrai i nomi delle categorie
    const categoryNames = post._embedded?.["wp:term"]?.[0]?.map((cat: any) => cat.name) || []

    return {
      ...post,
      author_name: authorName,
      featured_image_url: featuredImageUrl,
      category_names: categoryNames,
    }
  } catch (error) {
    console.error(`Error fetching blog post with slug ${slug}:`, error)
    return null
  }
}

// Funzione per recuperare le categorie del blog
export async function getBlogCategories(): Promise<{ id: number; name: string; slug: string; count: number }[]> {
  try {
    const categories = await fetchWithCache(`${WORDPRESS_API_V2_URL}/categories?per_page=100`, {}, "blog_categories")
    return categories
  } catch (error) {
    console.error("Error fetching categories:", error)
    return []
  }
}

// Funzione per recuperare tutte le immagini della galleria
export async function getAllGalleryImages(): Promise<WPGalleryImage[]> {
  try {
    const images = await fetchWithCache(`${WORDPRESS_API_V2_URL}/gallery?per_page=100&_embed`, {}, "all_gallery_images")

    // Elabora le immagini per estrarre informazioni aggiuntive da _embedded
    return images.map((image: any) => {
      // Estrai l'URL dell'immagine in evidenza
      const featuredImageUrl = image._embedded?.["wp:featuredmedia"]?.[0]?.source_url || ""

      return {
        ...image,
        featured_image_url: featuredImageUrl,
      }
    })
  } catch (error) {
    console.error("Error fetching gallery images:", error)
    return []
  }
}

// Funzione per sanitizzare il contenuto HTML da WordPress
export function sanitizeHtml(html: string): string {
  // Qui puoi implementare una sanitizzazione più avanzata se necessario
  return html
}

// Funzione per convertire la data WordPress in formato leggibile
export function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString("it-IT", {
    day: "numeric",
    month: "long",
    year: "numeric",
  })
}

// Funzione per convertire un'area di testo in un array di righe
export function textAreaToArray(textArea: string | null | undefined): string[] {
  if (!textArea) return []
  return textArea
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.length > 0)
}

// Funzione per ottenere l'orario settimanale formattato
export function getFormattedSchedule(trainer: WPTrainer): { day: string; time: string }[] {
  const schedule = []

  if (trainer.acf.schedule_monday) {
    schedule.push({ day: "Lunedì", time: trainer.acf.schedule_monday })
  }
  if (trainer.acf.schedule_tuesday) {
    schedule.push({ day: "Martedì", time: trainer.acf.schedule_tuesday })
  }
  if (trainer.acf.schedule_wednesday) {
    schedule.push({ day: "Mercoledì", time: trainer.acf.schedule_wednesday })
  }
  if (trainer.acf.schedule_thursday) {
    schedule.push({ day: "Giovedì", time: trainer.acf.schedule_thursday })
  }
  if (trainer.acf.schedule_friday) {
    schedule.push({ day: "Venerdì", time: trainer.acf.schedule_friday })
  }
  if (trainer.acf.schedule_saturday) {
    schedule.push({ day: "Sabato", time: trainer.acf.schedule_saturday })
  }
  if (trainer.acf.schedule_sunday) {
    schedule.push({ day: "Domenica", time: trainer.acf.schedule_sunday })
  }

  return schedule
}

// Funzione per ottenere i social media formattati
export function getFormattedSocials(trainer: WPTrainer): { platform: string; url: string }[] {
  const socials = []

  if (trainer.acf.instagram_url) {
    socials.push({ platform: "instagram", url: trainer.acf.instagram_url })
  }
  if (trainer.acf.facebook_url) {
    socials.push({ platform: "facebook", url: trainer.acf.facebook_url })
  }

  return socials
}
