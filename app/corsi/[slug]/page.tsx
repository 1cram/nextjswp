import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Clock, Users, Award, Calendar } from "lucide-react"
import MainNavbar from "@/components/navigation/main-navbar"
import TextReveal from "@/components/animations/text-reveal"
import ScrollProgress from "@/components/animations/scroll-progress"
import FadeInSection from "@/components/animations/fade-in-section"
import { getCourseBySlug, getAllCourses } from "@/lib/wordpress"
import { getSafeImageUrl, decodeHtmlEntities, textAreaToArray } from "@/lib/api-helpers"
import { notFound } from "next/navigation"
import WordPressContent from "@/components/wordpress-content"

// Definiamo un'interfaccia estesa per il tipo ACF
interface ExtendedAcf {
  level?: string
  duration?: string
  max_participants?: number
  trainer?: number | { ID: number; post_title: string; post_name: string }
  schedule?: string
  benefits?: string
  requirements?: string
  calories?: string | number
  instructor?: string
  capacity?: string | number
  [key: string]: any // Consente qualsiasi altra proprietà
}

// Metadati dinamici per SEO
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  // Utilizziamo await Promise.resolve() per risolvere l'errore di params
  const resolvedParams = await Promise.resolve(params)
  const course = await getCourseBySlug(resolvedParams.slug)

  if (!course) {
    return {
      title: "Corso non trovato | Unika Fitness Club",
      description: "Il corso che stai cercando non è disponibile.",
    }
  }

  return {
    title: `${decodeHtmlEntities(course.title.rendered)} | Unika Fitness Club`,
    description: decodeHtmlEntities(course.excerpt.rendered)
      .substring(0, 160)
      .replace(/<[^>]*>/g, ""),
  }
}

// Genera i percorsi statici a build time
export async function generateStaticParams() {
  const courses = await getAllCourses()

  return courses.map((course) => ({
    slug: course.slug,
  }))
}

export default async function CoursePage({ params }: { params: { slug: string } }) {
  // Utilizziamo await Promise.resolve() per risolvere l'errore di params
  const resolvedParams = await Promise.resolve(params)
  const course = await getCourseBySlug(resolvedParams.slug)

  // Se il corso non esiste, mostra la pagina 404
  if (!course) {
    notFound()
  }

  // Cast del tipo ACF per includere le proprietà estese
  const acf = course.acf as ExtendedAcf

  // Converti i benefici in array
  const benefits = acf.benefits ? textAreaToArray(acf.benefits) : []

  // Converti i requisiti in array
  const requirements = acf.requirements ? textAreaToArray(acf.requirements) : []

  return (
    <div className="min-h-screen bg-white">
      {/* Barra di progresso dello scroll */}
      <ScrollProgress />

      {/* Navigazione principale */}
      <MainNavbar />

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 bg-[#f5f5f7]">
        <div className="max-w-7xl mx-auto">
          <Link href="/corsi" className="inline-flex items-center text-gray-600 hover:text-unika-yellow mb-6">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Torna ai corsi
          </Link>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <TextReveal>
                <h1 className="text-4xl md:text-5xl font-bold mb-2">{decodeHtmlEntities(course.title.rendered)}</h1>
              </TextReveal>
              <TextReveal delay={0.1}>
                <div className="flex flex-wrap gap-4 my-6">
                  {acf.level && (
                    <div className="flex items-center bg-unika-yellow text-unika-dark px-3 py-1 rounded-full text-sm">
                      <Award className="mr-2 h-4 w-4" />
                      <span>Livello: {acf.level}</span>
                    </div>
                  )}
                  {acf.duration && (
                    <div className="flex items-center bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm">
                      <Clock className="mr-2 h-4 w-4" />
                      <span>Durata: {acf.duration}</span>
                    </div>
                  )}
                  {acf.max_participants && (
                    <div className="flex items-center bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm">
                      <Users className="mr-2 h-4 w-4" />
                      <span>Max {acf.max_participants} partecipanti</span>
                    </div>
                  )}
                  {acf.calories && (
                    <div className="flex items-center bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm">
                      <span>Calorie: {acf.calories} kcal</span>
                    </div>
                  )}
                </div>
              </TextReveal>
              <TextReveal delay={0.2}>
                <WordPressContent content={course.excerpt.rendered} className="prose prose-lg mb-8" />
              </TextReveal>
              <TextReveal delay={0.3}>
                <div className="flex flex-wrap gap-4">
                  <Link href="/prenota">
                    <Button className="bg-black text-white hover:bg-black/90 rounded-full px-6 py-2">
                      Prenota una lezione
                    </Button>
                  </Link>
                  <Link href="/contatti">
                    <Button variant="outline" className="rounded-full px-6 py-2">
                      Contattaci
                    </Button>
                  </Link>
                </div>
              </TextReveal>
            </div>
            <div className="relative h-[400px] rounded-2xl overflow-hidden">
              <Image
                src={getSafeImageUrl(course.featured_image_url) || "/placeholder.svg"}
                alt={decodeHtmlEntities(course.title.rendered)}
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Descrizione dettagliata */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-12">
            <div className="md:col-span-2">
              <TextReveal>
                <h2 className="text-3xl font-bold mb-8">Descrizione del Corso</h2>
              </TextReveal>
              <WordPressContent content={course.content.rendered} className="prose prose-lg max-w-none" />

              {/* Trainer */}
              {course.trainer_data && (
                <div className="mt-12">
                  <h3 className="text-2xl font-bold mb-6">Trainer</h3>
                  <div className="flex items-center p-6 bg-gray-50 rounded-xl">
                    <div className="relative w-20 h-20 rounded-full overflow-hidden mr-6">
                      <Image
                        src={getSafeImageUrl(course.trainer_data.featured_image_url) || "/placeholder.svg"}
                        alt={decodeHtmlEntities(course.trainer_data.title.rendered)}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="text-xl font-semibold">
                        {decodeHtmlEntities(course.trainer_data.title.rendered)}
                      </h4>
                      {course.trainer_data.acf.role && <p className="text-gray-600">{course.trainer_data.acf.role}</p>}
                      <Link
                        href={`/trainers/${course.trainer_data.slug}`}
                        className="text-unika-yellow hover:underline mt-2 inline-block"
                      >
                        Vedi profilo completo
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div>
              {/* Benefici */}
              {benefits.length > 0 && (
                <>
                  <TextReveal>
                    <h2 className="text-3xl font-bold mb-8">Benefici</h2>
                  </TextReveal>
                  <div className="bg-[#f5f5f7] rounded-2xl p-8 mb-8">
                    <ul className="space-y-4">
                      {benefits.map((benefit, index) => (
                        <FadeInSection key={index} direction="right" delay={index * 0.1}>
                          <li className="flex items-start">
                            <span className="inline-block w-5 h-5 rounded-full bg-unika-yellow mr-3 flex-shrink-0 mt-1"></span>
                            <span className="text-lg">{benefit}</span>
                          </li>
                        </FadeInSection>
                      ))}
                    </ul>
                  </div>
                </>
              )}

              {/* Requisiti */}
              {requirements.length > 0 && (
                <>
                  <TextReveal>
                    <h2 className="text-3xl font-bold mb-8">Requisiti</h2>
                  </TextReveal>
                  <div className="bg-[#f5f5f7] rounded-2xl p-8 mb-8">
                    <ul className="space-y-4">
                      {requirements.map((requirement, index) => (
                        <FadeInSection key={index} direction="right" delay={index * 0.1}>
                          <li className="flex items-start">
                            <span className="inline-block w-5 h-5 rounded-full bg-gray-300 mr-3 flex-shrink-0 mt-1"></span>
                            <span className="text-lg">{requirement}</span>
                          </li>
                        </FadeInSection>
                      ))}
                    </ul>
                  </div>
                </>
              )}

              {/* Orario */}
              {acf.schedule && (
                <>
                  <TextReveal>
                    <h2 className="text-3xl font-bold mb-8">Orario</h2>
                  </TextReveal>
                  <div className="bg-[#f5f5f7] rounded-2xl p-8">
                    <ul className="space-y-4">
                      {textAreaToArray(acf.schedule).map((item, index) => (
                        <FadeInSection key={index} direction="right" delay={index * 0.1}>
                          <li className="flex items-start">
                            <Calendar className="w-5 h-5 text-unika-yellow mr-3 flex-shrink-0 mt-1" />
                            <span className="text-lg">{item}</span>
                          </li>
                        </FadeInSection>
                      ))}
                    </ul>
                  </div>
                </>
              )}

              {/* Informazioni aggiuntive */}
              <div className="mt-8 bg-[#f5f5f7] rounded-2xl p-8">
                <h3 className="text-xl font-bold mb-6">Informazioni aggiuntive</h3>
                <div className="space-y-4">
                  {acf.instructor && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Istruttore:</span>
                      <span className="font-medium">{acf.instructor}</span>
                    </div>
                  )}
                  {acf.level && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Livello:</span>
                      <span className="font-medium">{acf.level}</span>
                    </div>
                  )}
                  {acf.duration && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Durata:</span>
                      <span className="font-medium">{acf.duration}</span>
                    </div>
                  )}
                  {acf.calories && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Calorie bruciate:</span>
                      <span className="font-medium">{acf.calories} kcal</span>
                    </div>
                  )}
                  {acf.capacity && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Capacità:</span>
                      <span className="font-medium">{acf.capacity} persone</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-black text-white">
        <div className="max-w-5xl mx-auto text-center">
          <TextReveal>
            <h2 className="text-4xl font-semibold mb-4">
              Pronto a iniziare con {decodeHtmlEntities(course.title.rendered)}?
            </h2>
            <p className="text-xl mb-8 max-w-3xl mx-auto">
              Prenota una lezione oggi stesso e inizia il tuo percorso verso un corpo più sano e una vita migliore.
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
