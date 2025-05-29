"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import MainNavbar from "@/components/navigation/main-navbar"
import TextReveal from "@/components/animations/text-reveal"
import ScrollProgress from "@/components/animations/scroll-progress"
import FadeInSection from "@/components/animations/fade-in-section"
import { Instagram, Facebook } from "lucide-react"
import type { WPTrainer } from "@/lib/wordpress"
import { getSafeImageUrl, decodeHtmlEntities, textAreaToArray } from "@/lib/api-helpers"

interface TrainersClientPageProps {
  trainers: WPTrainer[]
}

export default function TrainersClientPage({ trainers }: TrainersClientPageProps) {
  const getSocialIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case "instagram":
        return <Instagram size={18} />
      case "facebook":
        return <Facebook size={18} />
      default:
        return null
    }
  }

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
            <h1 className="text-4xl md:text-5xl font-bold text-center mb-6">Il Nostro Team</h1>
          </TextReveal>
          <TextReveal delay={0.1}>
            <p className="text-lg text-gray-600 text-center mb-8 max-w-3xl mx-auto">
              Scopri il nostro team di professionisti qualificati, pronti ad accompagnarti nel tuo percorso verso il
              benessere. Ogni membro del nostro staff è certificato e costantemente aggiornato sulle ultime tecniche di
              allenamento.
            </p>
          </TextReveal>
        </div>
      </section>

      {/* Sezione Trainers */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          {trainers.length === 0 ? (
            <div className="text-center py-12">
              <h2 className="text-2xl font-semibold mb-4">Nessun trainer disponibile al momento</h2>
              <p className="text-gray-600">Controlla più tardi per vedere i nostri trainer.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {trainers.map((trainer, index) => {
                // Converti l'area di testo delle specializzazioni in un array
                const specialties = textAreaToArray(trainer.acf.specialties)

                // Prepara i social media
                const socials = []
                if (trainer.acf.instagram_url) {
                  socials.push({ platform: "instagram", url: trainer.acf.instagram_url })
                }
                if (trainer.acf.facebook_url) {
                  socials.push({ platform: "facebook", url: trainer.acf.facebook_url })
                }

                return (
                  <FadeInSection key={trainer.id} direction="up" delay={index * 0.1}>
                    <div className="bg-white rounded-xl p-6 shadow-sm h-full relative group">
                      <div className="relative h-[300px] rounded-lg overflow-hidden mb-6">
                        <Image
                          src={getSafeImageUrl(trainer.featured_image_url) || "/placeholder.svg"}
                          alt={decodeHtmlEntities(trainer.title.rendered)}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute bottom-4 right-4 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                          {socials.map((social, idx) => (
                            <a
                              key={idx}
                              href={social.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="bg-white/20 backdrop-blur-sm p-2 rounded-full hover:bg-white/40 transition-colors"
                              onClick={(e) => e.stopPropagation()}
                            >
                              {getSocialIcon(social.platform)}
                            </a>
                          ))}
                        </div>
                      </div>

                      <Link
                        href={`/trainers/${trainer.slug}`}
                        className="after:absolute after:inset-0 after:content-[''] after:z-0"
                      >
                        <h3 className="text-xl font-semibold mb-2 group-hover:text-unika-yellow transition-colors relative z-1">
                          {decodeHtmlEntities(trainer.title.rendered)}
                        </h3>
                        <p className="text-gray-600 mb-4 relative z-1">{trainer.acf.role}</p>
                        <p className="text-gray-600 mb-4 line-clamp-3 relative z-1">
                          {stripHtml(trainer.content.rendered)}
                        </p>
                        <div className="flex flex-wrap gap-2 relative z-1">
                          {specialties.slice(0, 3).map((specialty, idx) => (
                            <span key={idx} className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full">
                              {specialty}
                            </span>
                          ))}
                          {specialties.length > 3 && (
                            <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full">
                              +{specialties.length - 3}
                            </span>
                          )}
                        </div>
                      </Link>
                    </div>
                  </FadeInSection>
                )
              })}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-black text-white">
        <div className="max-w-5xl mx-auto text-center">
          <TextReveal>
            <h2 className="text-4xl font-semibold mb-4">Pronto a iniziare il tuo percorso?</h2>
            <p className="text-xl mb-8 max-w-3xl mx-auto">
              Prenota una sessione con uno dei nostri trainer e scopri come possiamo aiutarti a raggiungere i tuoi
              obiettivi di fitness.
            </p>
            <Link href="/prenota">
              <Button className="bg-unika-yellow text-unika-dark hover:bg-unika-yellow-hover rounded-full px-8 py-6 text-lg">
                Prenota Ora
              </Button>
            </Link>
          </TextReveal>
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

// Funzione per estrarre il testo puro dall'HTML
function stripHtml(html: string): string {
  if (!html) return ""

  if (typeof window !== "undefined") {
    const doc = new DOMParser().parseFromString(html, "text/html")
    return doc.body.textContent || ""
  }

  // Fallback semplice per il server
  return html.replace(/<[^>]*>?/gm, "")
}
