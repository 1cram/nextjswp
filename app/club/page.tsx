import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import AppleNav from "@/components/animations/apple-nav"
import TextReveal from "@/components/animations/text-reveal"
import ScrollProgress from "@/components/animations/scroll-progress"
import FadeInSection from "@/components/animations/fade-in-section"

export default function ClubPage() {
  // Dati per la navigazione
  const navItems = [
    { label: "IL TUO CLUB", href: "/club" },
    { label: "PILATES REFORMER", href: "/pilates" },
    { label: "EMS TRAINING", href: "/ems" },
    { label: "CORSI DI GRUPPO", href: "/corsi" },
    { label: "BLOG", href: "/blog" },
    { label: "F.A.Q.", href: "/faq" },
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Barra di progresso dello scroll */}
      <ScrollProgress />

      {/* Navigazione in stile Apple */}
      <AppleNav logo="/placeholder.svg?height=40&width=40" items={navItems} />

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 bg-[#f5f5f7]">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <TextReveal>
                <h1 className="text-4xl md:text-5xl font-bold mb-6">Il Tuo Club</h1>
              </TextReveal>
              <TextReveal delay={0.1}>
                <p className="text-lg text-gray-600 mb-8">
                  Unika Fitness Club è un centro fitness all'avanguardia, progettato per offrirti un'esperienza di
                  allenamento unica e personalizzata. Scopri i nostri spazi, le nostre attrezzature e la nostra
                  filosofia.
                </p>
              </TextReveal>
              <TextReveal delay={0.2}>
                <div className="flex flex-wrap gap-4">
                  <Link href="/prenota">
                    <Button className="bg-black text-white hover:bg-black/90 rounded-full px-6 py-2">
                      Prenota una visita
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
                src="/placeholder.svg?height=800&width=800&text=Unika Club"
                alt="Unika Fitness Club"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Sezione Struttura */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <TextReveal>
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">La Nostra Struttura</h2>
          </TextReveal>

          <div className="grid md:grid-cols-3 gap-8">
            <FadeInSection direction="up" delay={0.1}>
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <div className="relative h-[200px] mb-6 rounded-lg overflow-hidden">
                  <Image
                    src="/placeholder.svg?height=400&width=600&text=Sala Attrezzi"
                    alt="Sala Attrezzi"
                    fill
                    className="object-cover"
                  />
                </div>
                <h3 className="text-xl font-semibold mb-3">Sala Attrezzi</h3>
                <p className="text-gray-600">
                  Attrezzature di ultima generazione per un allenamento completo ed efficace.
                </p>
              </div>
            </FadeInSection>

            <FadeInSection direction="up" delay={0.2}>
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <div className="relative h-[200px] mb-6 rounded-lg overflow-hidden">
                  <Image
                    src="/placeholder.svg?height=400&width=600&text=Sala Pilates"
                    alt="Sala Pilates"
                    fill
                    className="object-cover"
                  />
                </div>
                <h3 className="text-xl font-semibold mb-3">Sala Pilates</h3>
                <p className="text-gray-600">
                  Uno spazio dedicato al Pilates Reformer, con macchine professionali e ambiente rilassante.
                </p>
              </div>
            </FadeInSection>

            <FadeInSection direction="up" delay={0.3}>
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <div className="relative h-[200px] mb-6 rounded-lg overflow-hidden">
                  <Image
                    src="/placeholder.svg?height=400&width=600&text=Sala Corsi"
                    alt="Sala Corsi"
                    fill
                    className="object-cover"
                  />
                </div>
                <h3 className="text-xl font-semibold mb-3">Sala Corsi</h3>
                <p className="text-gray-600">
                  Ampio spazio per i corsi di gruppo, con pavimentazione professionale e sistema audio di qualità.
                </p>
              </div>
            </FadeInSection>
          </div>
        </div>
      </section>

      {/* Sezione Orari */}
      <section className="py-20 px-4 bg-[#f5f5f7]">
        <div className="max-w-7xl mx-auto">
          <TextReveal>
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">I Nostri Orari</h2>
          </TextReveal>

          <div className="bg-white rounded-2xl p-8 shadow-sm max-w-3xl mx-auto">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="text-xl font-semibold mb-4">Lunedì - Venerdì</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>Mattina: 7:00 - 14:00</li>
                  <li>Pomeriggio: 15:00 - 22:00</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-4">Sabato - Domenica</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>Sabato: 9:00 - 18:00</li>
                  <li>Domenica: 9:00 - 13:00</li>
                </ul>
              </div>
            </div>

            <div className="mt-8 pt-8 border-t border-gray-200">
              <h3 className="text-xl font-semibold mb-4">Note</h3>
              <p className="text-gray-600">
                Gli orari possono variare durante le festività. Controlla sempre il nostro calendario o contattaci per
                confermare gli orari durante i giorni festivi.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Sezione Come Raggiungerci */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <TextReveal>
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">Come Raggiungerci</h2>
          </TextReveal>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative h-[400px] rounded-2xl overflow-hidden">
              <Image
                src="/placeholder.svg?height=800&width=800&text=Mappa"
                alt="Mappa Unika Fitness Club"
                fill
                className="object-cover"
              />
            </div>
            <div>
              <h3 className="text-2xl font-semibold mb-4">Indirizzo</h3>
              <p className="text-gray-600 mb-6">
                Via Example 123
                <br />
                00100 Roma, Italia
              </p>

              <h3 className="text-2xl font-semibold mb-4">Mezzi Pubblici</h3>
              <ul className="space-y-2 text-gray-600 mb-6">
                <li>Metro: Linea A, fermata Example</li>
                <li>Bus: Linee 123, 456, fermata Example</li>
              </ul>

              <h3 className="text-2xl font-semibold mb-4">Parcheggio</h3>
              <p className="text-gray-600 mb-6">Parcheggio gratuito disponibile per i clienti del club.</p>

              <Link href="https://maps.google.com" target="_blank" rel="noopener noreferrer">
                <Button className="bg-black text-white hover:bg-black/90 rounded-full px-6 py-2">
                  Indicazioni su Google Maps
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#f5f5f7] py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-sm">
            <div>
              <h4 className="font-semibold mb-4 text-gray-900">Unika Fitness Club</h4>
              <p className="text-gray-600 mb-4">
                Via Example 123
                <br />
                00100 Roma, Italia
              </p>
              <div className="flex items-center mb-2 text-gray-600">
                <span>+39 331 913 8064</span>
              </div>
              <div className="flex items-center text-gray-600">
                <span>unikafitnessclub@gmail.com</span>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-gray-900">Servizi</h4>
              <ul className="space-y-2 text-gray-600">
                <li>
                  <Link href="/pilates" className="hover:text-gray-900">
                    Pilates Reformer
                  </Link>
                </li>
                <li>
                  <Link href="/ems" className="hover:text-gray-900">
                    EMS Training
                  </Link>
                </li>
                <li>
                  <Link href="/corsi" className="hover:text-gray-900">
                    Corsi di Gruppo
                  </Link>
                </li>
                <li>
                  <Link href="/personal" className="hover:text-gray-900">
                    Personal Training
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-gray-900">Informazioni</h4>
              <ul className="space-y-2 text-gray-600">
                <li>
                  <Link href="/club" className="hover:text-gray-900">
                    Il Tuo Club
                  </Link>
                </li>
                <li>
                  <Link href="/orari" className="hover:text-gray-900">
                    Orari
                  </Link>
                </li>
                <li>
                  <Link href="/blog" className="hover:text-gray-900">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="/faq" className="hover:text-gray-900">
                    F.A.Q.
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-gray-900">Seguici</h4>
              <div className="flex space-x-4 mb-6">
                <Link
                  href="https://facebook.com"
                  className="bg-gray-200 p-2 rounded-full hover:bg-gray-300"
                  aria-label="Facebook"
                >
                  <span className="h-5 w-5 text-gray-700">FB</span>
                </Link>
                <Link
                  href="https://twitter.com"
                  className="bg-gray-200 p-2 rounded-full hover:bg-gray-300"
                  aria-label="Twitter"
                >
                  <span className="h-5 w-5 text-gray-700">TW</span>
                </Link>
                <Link
                  href="https://instagram.com"
                  className="bg-gray-200 p-2 rounded-full hover:bg-gray-300"
                  aria-label="Instagram"
                >
                  <span className="h-5 w-5 text-gray-700">IG</span>
                </Link>
              </div>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-300 text-gray-600 text-sm flex flex-col md:flex-row justify-between items-center">
            <p>© 2025 Unika Fitness Club. Tutti i diritti riservati.</p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <Link href="/privacy" className="hover:text-gray-900">
                Privacy Policy
              </Link>
              <Link href="/cookie" className="hover:text-gray-900">
                Cookie Policy
              </Link>
              <Link href="/terms" className="hover:text-gray-900">
                Termini e Condizioni
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
