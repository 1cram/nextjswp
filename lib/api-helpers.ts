/**
 * Funzioni di supporto per l'API WordPress
 */

// Funzione per decodificare le entità HTML (compatibile con server e client)
export function decodeHtmlEntities(text: string): string {
  if (!text) return ""

  // Versione server-safe che non usa document
  return text
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/&nbsp;/g, " ")
    .replace(/&#(\d+);/g, (match, dec) => String.fromCharCode(dec))
}

// Funzione per estrarre il testo puro dall'HTML (compatibile con server)
export function stripHtml(html: string): string {
  if (!html) return ""

  // Versione server-safe che non usa DOMParser
  return html
    .replace(/<[^>]*>/g, "") // Rimuove i tag HTML
    .replace(/\s+/g, " ") // Normalizza gli spazi
    .trim() // Rimuove spazi iniziali e finali
}

// Funzione per limitare il testo a un certo numero di parole
export function limitWords(text: string, limit: number): string {
  if (!text) return ""

  const words = text.split(" ")
  if (words.length > limit) {
    return words.slice(0, limit).join(" ") + "..."
  }
  return text
}

// Funzione per generare un URL sicuro per le immagini
export function getSafeImageUrl(url?: string): string {
  if (!url) return "/placeholder.svg?height=600&width=600&text=Immagine+non+disponibile"

  // Ensure URL uses HTTPS
  if (url.startsWith("http:")) {
    url = url.replace("http:", "https:")
  }

  // Verifica se l'URL è relativo e aggiungi il dominio WordPress se necessario
  if (url.startsWith("/")) {
    // Usa una stringa diretta invece di URL constructor per compatibilità server
    const wpApiUrl = process.env.WORDPRESS_API_URL || ""
    const wpDomain = wpApiUrl.split("/wp-json")[0] || "https://synonymous-knee.localsite.io"
    return `${wpDomain}${url}`
  }

  return url
}

// Funzione per convertire un'area di testo in un array di righe
export function textAreaToArray(textArea: string | null | undefined): string[] {
  if (!textArea) return []
  return textArea
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.length > 0)
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

// Add authentication headers to API requests if needed
export async function fetchWithAuth(url: string, options: RequestInit = {}) {
  // Get auth token from cookies or localStorage if you have authentication
  const token = typeof window !== "undefined" ? localStorage.getItem("wp_token") : null

  const headers = {
    ...options.headers,
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  }

  return fetch(url, {
    ...options,
    headers,
  })
}
