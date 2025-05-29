import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { notFound } from "next/navigation"
import { Button } from "@/components/ui/button"
import MainNavbar from "@/components/navigation/main-navbar"
import TextReveal from "@/components/animations/text-reveal"
import ScrollProgress from "@/components/animations/scroll-progress"
import FadeInSection from "@/components/animations/fade-in-section"
import { getTrainerBySlug, getAllTrainers, getFormattedSchedule, getFormattedSocials } from "@/lib/wordpress"
import { getSafeImageUrl, decodeHtmlEntities, textAreaToArray } from "@/lib/api-helpers"
import WordPressContent from "@/components/wordpress-content"
import { processWordPressPost } from "@/lib/content-processor"

// Genera i parametri statici per tutti i trainer
export async function generateStaticParams() {
  const trainers = await getAllTrainers()
  return trainers.map((trainer) => ({
    slug: trainer.slug,
  }))
}

// Genera i metadati per la pagina
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const trainer = await getTrainerBySlug(params.slug)

  if (!trainer) {
    return {
      title: "Trainer non trovato",
      description: "Il trainer richiesto non è stato trovato.",
    }
  }

  return {
    title: `${decodeHtmlEntities(trainer.title.rendered)} | Unika Fitness Club`,
    description: `Scopri di più su ${decodeHtmlEntities(trainer.title.rendered)}, ${trainer.acf.role} presso Unika Fitness Club.`,
  }
}

export default async function TrainerPage({ params }: { params: { slug: string } }) {
  let trainer = await getTrainerBySlug(params.slug)

  if (!trainer) {
    notFound()
  }

  // Process the trainer data to handle image URLs
  trainer = processWordPressPost(trainer)

  // Converti le aree di testo in array
  const specialties = textAreaToArray(trainer.acf.specialties)
  const certifications = textAreaToArray(trainer.acf.certifications)

  // Ottieni l'orario formattato
  const schedule = getFormattedSchedule(trainer)

  // Ottieni i social media formattati
  const socials = getFormattedSocials(trainer)

  return (
    <div className="min-h-screen bg-white">
      {/* Barra di progresso dello scroll */}
      <ScrollProgress />

      {/* Navigazione principale */}
      <MainNavbar />

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 bg-[#f5f5f7]">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <TextReveal>
                <h1 className="text-4xl md:text-5xl font-bold mb-2">{decodeHtmlEntities(trainer.title.rendered)}</h1>
              </TextReveal>
              <TextReveal delay={0.1}>
                <p className="text-xl text-blue-500 mb-6">{trainer.acf.role}</p>
              </TextReveal>
              <TextReveal delay={0.2}>
                <WordPressContent content={trainer.content.rendered} className="text-lg text-gray-600 mb-8" />
              </TextReveal>
              <TextReveal delay={0.3}>
                <div className="flex flex-wrap gap-4">
                  <Link href="/prenota">
                    <Button className="bg-black text-white hover:bg-black/90 rounded-full px-6 py-2">
                      Prenota una sessione
                    </Button>
                  </Link>
                  <Link href="/contatti">
                    <Button variant="outline" className="rounded-full px-6 py-2">
                      Contatta
                    </Button>
                  </Link>
                </div>
              </TextReveal>
            </div>
            <div className="relative h-[500px] rounded-2xl overflow-hidden">
              <Image
                src={getSafeImageUrl(trainer.featured_image_url) || "/placeholder.svg"}
                alt={decodeHtmlEntities(trainer.title.rendered)}
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Specializzazioni */}
      {specialties.length > 0 && (
        <section className="py-20 px-4">
          <div className="max-w-7xl mx-auto">
            <TextReveal>
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">Specializzazioni</h2>
            </TextReveal>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {specialties.map((specialty, index) => (
                <FadeInSection key={index} direction="up" delay={index * 0.1}>
                  <div className="bg-white rounded-xl p-6 shadow-sm h-full">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                      <span className="text-blue-500 font-bold">{index + 1}</span>
                    </div>
                    <h3 className="text-xl font-semibold mb-3">{specialty}</h3>
                  </div>
                </FadeInSection>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Certificazioni e Orari */}
      <section className="py-20 px-4 bg-[#f5f5f7]">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12">
            {certifications.length > 0 && (
              <div>
                <TextReveal>
                  <h2 className="text-3xl font-bold mb-8">Certificazioni</h2>
                </TextReveal>
                <ul className="space-y-4">
                  {certifications.map((certification, index) => (
                    <FadeInSection key={index} direction="left" delay={index * 0.1}>
                      <li className="flex items-start">
                        <span className="inline-block w-5 h-5 rounded-full bg-blue-500 mr-3 flex-shrink-0 mt-1"></span>
                        <span className="text-lg">{certification}</span>
                      </li>
                    </FadeInSection>
                  ))}
                </ul>
              </div>
            )}

            {schedule.length > 0 && (
              <div>
                <TextReveal>
                  <h2 className="text-3xl font-bold mb-8">Orari</h2>
                </TextReveal>
                <div className="bg-white rounded-2xl p-8 shadow-sm">
                  <ul className="space-y-4">
                    {schedule.map((item, index) => (
                      <FadeInSection key={index} direction="right" delay={index * 0.1}>
                        <li className="text-lg">
                          {item.day}: {item.time}
                        </li>
                      </FadeInSection>
                    ))}
                  </ul>
                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <p className="text-gray-600">
                      Gli orari possono variare. Contatta il club per confermare la disponibilità.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Social Media */}
      {socials.length > 0 && (
        <section className="py-12 px-4">
          <div className="max-w-7xl mx-auto text-center">
            <h2 className="text-2xl font-bold mb-6">Seguici sui Social</h2>
            <div className="flex justify-center gap-4">
              {socials.map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block p-3 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
                >
                  {social.platform === "Instagram" ? (
                    <span className="sr-only">Instagram</span>
                  ) : social.platform === "Facebook" ? (
                    <span className="sr-only">Facebook</span>
                  ) : (
                    social.platform
                  )}
                </a>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <TextReveal>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Pronto a iniziare con {decodeHtmlEntities(trainer.title.rendered)}?
            </h2>
            <p className="text-lg text-gray-600 mb-8 max-w-3xl mx-auto">
              Prenota una sessione oggi stesso e inizia il tuo percorso verso un corpo più sano e una vita migliore.
            </p>
            <Link href="/prenota">
              <Button className="bg-black text-white hover:bg-black/90 rounded-full px-8 py-6 text-lg">
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
                  <Link href="/trainers" className="hover:text-unika-yellow">
                    Team
                  </Link>
                </li>
                <li>
                  <Link href="/blog" className="hover:text-unika-yellow">
                    Blog
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
