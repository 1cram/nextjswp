"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import MainNavbar from "@/components/navigation/main-navbar"
import ScrollProgress from "@/components/animations/scroll-progress"
import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"

// Definizione dei tipi per i risultati di ricerca
interface SearchResult {
  id: string
  title: string
  description: string
  type: "page" | "course" | "blog" | "trainer"
  url: string
  image?: string
  keywords?: string[]
}

// Database completo di contenuti ricercabili
const searchableContent: SearchResult[] = [
  {
    id: "home",
    title: "Home - Unika Fitness Club",
    description: "Trasforma il tuo corpo, migliora la tua vita con i nostri programmi di allenamento personalizzati.",
    type: "page",
    url: "/",
    image: "/placeholder.svg?height=200&width=300&text=Home",
    keywords: ["fitness", "club", "palestra", "allenamento", "benessere", "unika"],
  },
  {
    id: "pilates",
    title: "Pilates Reformer",
    description: "Scopri il nostro programma di Pilates Reformer, adatto a tutti i livelli di fitness.",
    type: "page",
    url: "/pilates",
    image: "/placeholder.svg?height=200&width=300&text=Pilates",
    keywords: ["pilates", "reformer", "postura", "flessibilità", "core", "allenamento"],
  },
  {
    id: "ems",
    title: "EMS Training",
    description:
      "L'EMS Training utilizza impulsi elettrici per intensificare l'allenamento. In soli 20 minuti, ottieni risultati equivalenti a 90 minuti di allenamento tradizionale.",
    type: "page",
    url: "/ems",
    image: "/placeholder.svg?height=200&width=300&text=EMS",
    keywords: ["ems", "elettrostimolazione", "allenamento", "intenso", "rapido", "efficace"],
  },
  {
    id: "club",
    title: "Il Tuo Club",
    description:
      "Unika Fitness Club è un centro fitness all'avanguardia, progettato per offrirti un'esperienza di allenamento unica e personalizzata.",
    type: "page",
    url: "/club",
    image: "/placeholder.svg?height=200&width=300&text=Club",
    keywords: ["club", "centro", "fitness", "struttura", "palestra", "attrezzature"],
  },
  {
    id: "trainers",
    title: "Il Nostro Team",
    description:
      "Scopri il nostro team di professionisti qualificati, pronti ad accompagnarti nel tuo percorso verso il benessere.",
    type: "page",
    url: "/trainers",
    image: "/placeholder.svg?height=200&width=300&text=Team",
    keywords: ["team", "trainer", "istruttori", "professionisti", "esperti", "coach"],
  },
  {
    id: "pilates-course",
    title: "Corso di Pilates Base",
    description:
      "Ideale per i principianti, questa lezione introduce i movimenti fondamentali del Pilates Reformer in un ambiente sicuro e controllato.",
    type: "course",
    url: "/corsi/pilates-base",
    image: "/placeholder.svg?height=200&width=300&text=Pilates Base",
    keywords: ["pilates", "corso", "base", "principianti", "lezione", "reformer"],
  },
  {
    id: "pilates-intermediate",
    title: "Corso di Pilates Intermedio",
    description:
      "Per chi ha già esperienza con il Pilates Reformer, questa lezione introduce esercizi più complessi e sfidanti.",
    type: "course",
    url: "/corsi/pilates-intermedio",
    image: "/placeholder.svg?height=200&width=300&text=Pilates Intermedio",
    keywords: ["pilates", "corso", "intermedio", "avanzato", "lezione", "reformer"],
  },
  {
    id: "ems-training-course",
    title: "Corso di EMS Training",
    description:
      "Sessioni di allenamento con elettrostimolazione muscolare per risultati rapidi ed efficaci in soli 20 minuti.",
    type: "course",
    url: "/corsi/ems-training",
    image: "/placeholder.svg?height=200&width=300&text=EMS Training",
    keywords: ["ems", "corso", "elettrostimolazione", "allenamento", "intenso", "rapido"],
  },
  {
    id: "functional-training",
    title: "Corso di Allenamento Funzionale",
    description: "Allenamento completo che migliora forza, resistenza e mobilità con movimenti naturali e funzionali.",
    type: "course",
    url: "/corsi/functional-training",
    image: "/placeholder.svg?height=200&width=300&text=Functional Training",
    keywords: ["funzionale", "allenamento", "corso", "forza", "resistenza", "mobilità"],
  },
  {
    id: "laura",
    title: "Laura Bianchi - Istruttrice di Pilates",
    description:
      "Laura è un'istruttrice di Pilates certificata con una passione per aiutare le persone a migliorare la loro postura e flessibilità.",
    type: "trainer",
    url: "/trainers/laura",
    image: "/placeholder.svg?height=200&width=200&text=Laura",
    keywords: ["laura", "bianchi", "pilates", "istruttrice", "trainer", "postura", "flessibilità"],
  },
  {
    id: "marco",
    title: "Marco Rossi - Personal Trainer",
    description:
      "Marco è un personal trainer certificato con oltre 10 anni di esperienza. Specializzato in allenamento funzionale e preparazione atletica.",
    type: "trainer",
    url: "/trainers/marco",
    image: "/placeholder.svg?height=200&width=200&text=Marco",
    keywords: ["marco", "rossi", "personal", "trainer", "funzionale", "atletica", "preparazione"],
  },
  {
    id: "giovanni",
    title: "Giovanni Verdi - EMS Specialist",
    description:
      "Giovanni è uno specialista in EMS Training con 5 anni di esperienza. Ha aiutato centinaia di clienti a ottenere risultati rapidi ed efficaci.",
    type: "trainer",
    url: "/trainers/giovanni",
    image: "/placeholder.svg?height=200&width=200&text=Giovanni",
    keywords: ["giovanni", "verdi", "ems", "specialist", "elettrostimolazione", "trainer"],
  },
  {
    id: "benefici-pilates",
    title: "I benefici del Pilates per la salute della schiena",
    description: "Scopri come il Pilates può aiutarti a prevenire e alleviare i dolori alla schiena.",
    type: "blog",
    url: "/blog/benefici-pilates",
    image: "/placeholder.svg?height=200&width=300&text=Pilates Blog",
    keywords: ["pilates", "benefici", "schiena", "salute", "postura", "dolore", "prevenzione"],
  },
  {
    id: "nutrizione-sportiva",
    title: "Nutrizione sportiva: cosa mangiare prima e dopo l'allenamento",
    description: "Una guida completa su come alimentarsi correttamente per supportare la tua attività fisica.",
    type: "blog",
    url: "/blog/nutrizione-sportiva",
    image: "/placeholder.svg?height=200&width=300&text=Nutrizione",
    keywords: ["nutrizione", "sportiva", "alimentazione", "allenamento", "cibo", "energia", "recupero"],
  },
  {
    id: "allenamento-efficace",
    title: "Come rendere il tuo allenamento più efficace",
    description: "Scopri i segreti per massimizzare i risultati del tuo allenamento con questi consigli pratici.",
    type: "blog",
    url: "/blog/allenamento-efficace",
    image: "/placeholder.svg?height=200&width=300&text=Allenamento",
    keywords: ["allenamento", "efficace", "risultati", "consigli", "fitness", "miglioramento", "performance"],
  },
  {
    id: "orari",
    title: "Orari del Club",
    description: "Consulta gli orari di apertura e dei corsi di Unika Fitness Club.",
    type: "page",
    url: "/#orari",
    image: "/placeholder.svg?height=200&width=300&text=Orari",
    keywords: ["orari", "apertura", "corsi", "lezioni", "schedule", "calendario", "disponibilità"],
  },
  {
    id: "prezzi",
    title: "Prezzi e Abbonamenti",
    description: "Scopri i nostri piani di abbonamento e prezzi per i servizi di Unika Fitness Club.",
    type: "page",
    url: "/#abbonamenti",
    image: "/placeholder.svg?height=200&width=300&text=Prezzi",
    keywords: ["prezzi", "abbonamenti", "costi", "tariffe", "mensile", "annuale", "iscrizione"],
  },
  {
    id: "contatti",
    title: "Contatti",
    description: "Contatta Unika Fitness Club per informazioni, prenotazioni o richieste.",
    type: "page",
    url: "/#contatti",
    image: "/placeholder.svg?height=200&width=300&text=Contatti",
    keywords: ["contatti", "telefono", "email", "indirizzo", "mappa", "informazioni", "richieste"],
  },
]

export default function SearchPage() {
  const searchParams = useSearchParams()
  const query = searchParams.get("q") || ""
  const [results, setResults] = useState<SearchResult[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState(query)

  // Funzione di ricerca avanzata
  const performSearch = (searchTerm: string) => {
    if (!searchTerm.trim()) {
      return []
    }

    const normalizedQuery = searchTerm.toLowerCase().trim()
    const queryWords = normalizedQuery.split(/\s+/).filter((word) => word.length > 1)

    return searchableContent
      .map((item) => {
        // Calcola un punteggio di rilevanza per ogni elemento
        let score = 0

        // Controllo nel titolo (peso maggiore)
        if (item.title.toLowerCase().includes(normalizedQuery)) {
          score += 10
        }

        // Controllo nelle parole chiave (peso medio-alto)
        if (item.keywords) {
          for (const keyword of item.keywords) {
            if (keyword.toLowerCase() === normalizedQuery) {
              score += 8
            } else if (keyword.toLowerCase().includes(normalizedQuery)) {
              score += 5
            }
          }
        }

        // Controllo nella descrizione (peso medio)
        if (item.description.toLowerCase().includes(normalizedQuery)) {
          score += 3
        }

        // Controllo per parole singole
        for (const word of queryWords) {
          if (item.title.toLowerCase().includes(word)) {
            score += 2
          }
          if (item.description.toLowerCase().includes(word)) {
            score += 1
          }
          if (item.keywords) {
            for (const keyword of item.keywords) {
              if (keyword.toLowerCase().includes(word)) {
                score += 1
              }
            }
          }
        }

        return { ...item, score }
      })
      .filter((item) => item.score > 0)
      .sort((a, b) => b.score - a.score)
  }

  // Esegui la ricerca quando cambia la query
  useEffect(() => {
    if (!query) {
      setResults([])
      setIsLoading(false)
      return
    }

    // Simuliamo un ritardo di caricamento
    setIsLoading(true)

    // Timeout per simulare una chiamata API
    const timer = setTimeout(() => {
      const searchResults = performSearch(query)
      setResults(searchResults)
      setIsLoading(false)
    }, 500)

    return () => clearTimeout(timer)
  }, [query])

  // Gestione della ricerca
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      window.location.href = `/search?q=${encodeURIComponent(searchQuery.trim())}`
    }
  }

  // Funzione per ottenere l'etichetta del tipo di risultato
  const getTypeLabel = (type: string) => {
    switch (type) {
      case "page":
        return "Pagina"
      case "course":
        return "Corso"
      case "blog":
        return "Blog"
      case "trainer":
        return "Trainer"
      default:
        return "Risultato"
    }
  }

  // Funzione per ottenere il colore dell'etichetta del tipo di risultato
  const getTypeColor = (type: string) => {
    switch (type) {
      case "page":
        return "bg-blue-100 text-blue-800"
      case "course":
        return "bg-green-100 text-green-800"
      case "blog":
        return "bg-purple-100 text-purple-800"
      case "trainer":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="min-h-screen bg-white">
      <ScrollProgress />
      <MainNavbar />

      <main className="pt-32 pb-20 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-6 text-unika-dark">Risultati di ricerca</h1>

            <form onSubmit={handleSearch} className="mb-8">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Cerca nel sito..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-unika-yellow focus:border-unika-yellow"
                />
                <button
                  type="submit"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-unika-yellow"
                >
                  <Search className="h-5 w-5" />
                </button>
              </div>
            </form>

            {query && (
              <p className="text-unika-dark-lighter">
                {isLoading
                  ? "Ricerca in corso..."
                  : results.length > 0
                    ? `Trovati ${results.length} risultati per "${query}"`
                    : `Nessun risultato trovato per "${query}"`}
              </p>
            )}
          </div>

          {isLoading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-unika-yellow"></div>
            </div>
          ) : (
            <>
              {results.length > 0 ? (
                <div className="space-y-8">
                  {results.map((result) => (
                    <div
                      key={result.id}
                      className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 hover:shadow-md transition-shadow"
                    >
                      <Link href={result.url} className="flex flex-col md:flex-row">
                        {result.image && (
                          <div className="md:w-1/4 h-48 md:h-auto relative">
                            <Image
                              src={result.image || "/placeholder.svg"}
                              alt={result.title}
                              fill
                              className="object-cover"
                            />
                          </div>
                        )}
                        <div className={`p-6 ${result.image ? "md:w-3/4" : "w-full"}`}>
                          <div className="flex items-center mb-2">
                            <span className={`text-xs font-medium px-2 py-1 rounded-full ${getTypeColor(result.type)}`}>
                              {getTypeLabel(result.type)}
                            </span>
                          </div>
                          <h2 className="text-xl font-semibold mb-2 text-unika-dark hover:text-unika-yellow transition-colors">
                            {result.title}
                          </h2>
                          <p className="text-unika-dark-lighter mb-4">{result.description}</p>
                          <div className="text-unika-yellow font-medium">Scopri di più</div>
                        </div>
                      </Link>
                    </div>
                  ))}
                </div>
              ) : query ? (
                <div className="text-center py-12">
                  <div className="mb-6">
                    <Search className="h-16 w-16 mx-auto text-gray-300" />
                  </div>
                  <h2 className="text-2xl font-semibold mb-2 text-unika-dark">Nessun risultato trovato</h2>
                  <p className="text-unika-dark-lighter mb-6">
                    Non abbiamo trovato risultati per la tua ricerca. Prova con termini diversi o esplora le nostre
                    sezioni principali.
                  </p>
                  <div className="flex flex-wrap justify-center gap-2">
                    <Link href="/pilates">
                      <Button variant="outline">Pilates Reformer</Button>
                    </Link>
                    <Link href="/ems">
                      <Button variant="outline">EMS Training</Button>
                    </Link>
                    <Link href="/corsi">
                      <Button variant="outline">Corsi di Gruppo</Button>
                    </Link>
                    <Link href="/trainers">
                      <Button variant="outline">Team</Button>
                    </Link>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12">
                  <h2 className="text-2xl font-semibold mb-2 text-unika-dark">Cerca nel sito</h2>
                  <p className="text-unika-dark-lighter mb-6">
                    Inserisci una parola chiave per trovare contenuti nel nostro sito.
                  </p>
                </div>
              )}
            </>
          )}
        </div>
      </main>

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
                <li>
                  <Link href="/faq" className="hover:text-unika-yellow">
                    F.A.Q.
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
