import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import AppleNav from "@/components/animations/apple-nav"
import TextReveal from "@/components/animations/text-reveal"
import ScrollProgress from "@/components/animations/scroll-progress"
import FadeInSection from "@/components/animations/fade-in-section"

export default function PilatesPage() {
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
                <h1 className="text-4xl md:text-5xl font-bold mb-6">Pilates Reformer</h1>
              </TextReveal>
              <TextReveal delay={0.1}>
                <p className="text-lg text-gray-600 mb-8">
                  Il Pilates Reformer è un metodo di allenamento che utilizza una macchina speciale per migliorare la
                  forza, la flessibilità e la postura. Le nostre lezioni sono adatte a tutti i livelli, dai principianti
                  agli atleti professionisti.
                </p>
              </TextReveal>
              <TextReveal delay={0.2}>
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
                src="/placeholder.svg?height=800&width=800&text=Pilates Reformer"
                alt="Pilates Reformer"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Benefici */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <TextReveal>
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">Benefici del Pilates Reformer</h2>
          </TextReveal>

          <div className="grid md:grid-cols-3 gap-8">
            <FadeInSection direction="up" delay={0.1}>
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                  <span className="text-blue-500 font-bold">1</span>
                </div>
                <h3 className="text-xl font-semibold mb-3">Migliora la postura</h3>
                <p className="text-gray-600">
                  Il Pilates Reformer aiuta a correggere gli squilibri muscolari e a migliorare l'allineamento del
                  corpo.
                </p>
              </div>
            </FadeInSection>

            <FadeInSection direction="up" delay={0.2}>
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                  <span className="text-blue-500 font-bold">2</span>
                </div>
                <h3 className="text-xl font-semibold mb-3">Aumenta la flessibilità</h3>
                <p className="text-gray-600">
                  Gli esercizi di stretching dinamico migliorano la flessibilità e l'ampiezza di movimento.
                </p>
              </div>
            </FadeInSection>

            <FadeInSection direction="up" delay={0.3}>
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                  <span className="text-blue-500 font-bold">3</span>
                </div>
                <h3 className="text-xl font-semibold mb-3">Rafforza i muscoli</h3>
                <p className="text-gray-600">
                  Il Pilates Reformer rafforza i muscoli profondi, in particolare quelli del core e della schiena.
                </p>
              </div>
            </FadeInSection>
          </div>
        </div>
      </section>

      {/* Tipi di lezioni */}
      <section className="py-20 px-4 bg-[#f5f5f7]">
        <div className="max-w-7xl mx-auto">
          <TextReveal>
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">Le Nostre Lezioni</h2>
          </TextReveal>

          <div className="space-y-12">
            <FadeInSection direction="left">
              <div className="bg-white rounded-2xl p-8 shadow-sm">
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  <div>
                    <h3 className="text-2xl font-semibold mb-4">Pilates Reformer Base</h3>
                    <p className="text-gray-600 mb-6">
                      Ideale per i principianti, questa lezione introduce i movimenti fondamentali del Pilates Reformer
                      in un ambiente sicuro e controllato.
                    </p>
                    <ul className="space-y-2 text-gray-600 mb-6">
                      <li className="flex items-start">
                        <span className="inline-block w-5 h-5 rounded-full bg-blue-500 mr-3 flex-shrink-0 mt-1"></span>
                        <span>Durata: 50 minuti</span>
                      </li>
                      <li className="flex items-start">
                        <span className="inline-block w-5 h-5 rounded-full bg-blue-500 mr-3 flex-shrink-0 mt-1"></span>
                        <span>Livello: Principiante</span>
                      </li>
                      <li className="flex items-start">
                        <span className="inline-block w-5 h-5 rounded-full bg-blue-500 mr-3 flex-shrink-0 mt-1"></span>
                        <span>Capacità: max 8 persone</span>
                      </li>
                    </ul>
                    <Link href="/prenota">
                      <Button className="bg-black text-white hover:bg-black/90 rounded-full px-6 py-2">Prenota</Button>
                    </Link>
                  </div>
                  <div className="relative h-[300px] rounded-xl overflow-hidden">
                    <Image
                      src="/placeholder.svg?height=600&width=800&text=Pilates Base"
                      alt="Pilates Reformer Base"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              </div>
            </FadeInSection>

            <FadeInSection direction="right">
              <div className="bg-white rounded-2xl p-8 shadow-sm">
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  <div className="md:order-2">
                    <h3 className="text-2xl font-semibold mb-4">Pilates Reformer Intermedio</h3>
                    <p className="text-gray-600 mb-6">
                      Per chi ha già esperienza con il Pilates Reformer, questa lezione introduce esercizi più complessi
                      e sfidanti.
                    </p>
                    <ul className="space-y-2 text-gray-600 mb-6">
                      <li className="flex items-start">
                        <span className="inline-block w-5 h-5 rounded-full bg-blue-500 mr-3 flex-shrink-0 mt-1"></span>
                        <span>Durata: 50 minuti</span>
                      </li>
                      <li className="flex items-start">
                        <span className="inline-block w-5 h-5 rounded-full bg-blue-500 mr-3 flex-shrink-0 mt-1"></span>
                        <span>Livello: Intermedio</span>
                      </li>
                      <li className="flex items-start">
                        <span className="inline-block w-5 h-5 rounded-full bg-blue-500 mr-3 flex-shrink-0 mt-1"></span>
                        <span>Capacità: max 8 persone</span>
                      </li>
                    </ul>
                    <Link href="/prenota">
                      <Button className="bg-black text-white hover:bg-black/90 rounded-full px-6 py-2">Prenota</Button>
                    </Link>
                  </div>
                  <div className="relative h-[300px] rounded-xl overflow-hidden md:order-1">
                    <Image
                      src="/placeholder.svg?height=600&width=800&text=Pilates Intermedio"
                      alt="Pilates Reformer Intermedio"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              </div>
            </FadeInSection>

            <FadeInSection direction="left">
              <div className="bg-white rounded-2xl p-8 shadow-sm">
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  <div>
                    <h3 className="text-2xl font-semibold mb-4">Pilates Reformer Avanzato</h3>
                    <p className="text-gray-600 mb-6">
                      Per gli esperti di Pilates, questa lezione offre esercizi avanzati e combinazioni complesse per
                      sfidare il corpo.
                    </p>
                    <ul className="space-y-2 text-gray-600 mb-6">
                      <li className="flex items-start">
                        <span className="inline-block w-5 h-5 rounded-full bg-blue-500 mr-3 flex-shrink-0 mt-1"></span>
                        <span>Durata: 50 minuti</span>
                      </li>
                      <li className="flex items-start">
                        <span className="inline-block w-5 h-5 rounded-full bg-blue-500 mr-3 flex-shrink-0 mt-1"></span>
                        <span>Livello: Avanzato</span>
                      </li>
                      <li className="flex items-start">
                        <span className="inline-block w-5 h-5 rounded-full bg-blue-500 mr-3 flex-shrink-0 mt-1"></span>
                        <span>Capacità: max 8 persone</span>
                      </li>
                    </ul>
                    <Link href="/prenota">
                      <Button className="bg-black text-white hover:bg-black/90 rounded-full px-6 py-2">Prenota</Button>
                    </Link>
                  </div>
                  <div className="relative h-[300px] rounded-xl overflow-hidden">
                    <Image
                      src="/placeholder.svg?height=600&width=800&text=Pilates Avanzato"
                      alt="Pilates Reformer Avanzato"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              </div>
            </FadeInSection>
          </div>
        </div>
      </section>

      {/* Istruttori */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <TextReveal>
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">I Nostri Istruttori di Pilates</h2>
          </TextReveal>

          <div className="grid md:grid-cols-3 gap-8">
            <FadeInSection direction="up" delay={0.1}>
              <Link href="/trainers/laura" className="block group">
                <div className="bg-white rounded-xl p-6 shadow-sm transition-transform group-hover:scale-105">
                  <div className="relative h-[300px] rounded-lg overflow-hidden mb-6">
                    <Image
                      src="/placeholder.svg?height=600&width=600&text=Laura"
                      alt="Laura Bianchi"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Laura Bianchi</h3>
                  <p className="text-gray-600">Istruttrice di Pilates certificata con 8 anni di esperienza.</p>
                </div>
              </Link>
            </FadeInSection>

            <FadeInSection direction="up" delay={0.2}>
              <Link href="/trainers/marco" className="block group">
                <div className="bg-white rounded-xl p-6 shadow-sm transition-transform group-hover:scale-105">
                  <div className="relative h-[300px] rounded-lg overflow-hidden mb-6">
                    <Image
                      src="/placeholder.svg?height=600&width=600&text=Marco"
                      alt="Marco Rossi"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Marco Rossi</h3>
                  <p className="text-gray-600">Specialista in riabilitazione e Pilates terapeutico.</p>
                </div>
              </Link>
            </FadeInSection>

            <FadeInSection direction="up" delay={0.3}>
              <Link href="/trainers/sofia" className="block group">
                <div className="bg-white rounded-xl p-6 shadow-sm transition-transform group-hover:scale-105">
                  <div className="relative h-[300px] rounded-lg overflow-hidden mb-6">
                    <Image
                      src="/placeholder.svg?height=600&width=600&text=Sofia"
                      alt="Sofia Russo"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Sofia Russo</h3>
                  <p className="text-gray-600">Esperta in Pilates e yoga, con un approccio olistico al benessere.</p>
                </div>
              </Link>
            </FadeInSection>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-black text-white">
        <div className="max-w-5xl mx-auto text-center">
          <TextReveal>
            <h2 className="text-4xl font-semibold mb-4">Pronto a iniziare con il Pilates Reformer?</h2>
            <p className="text-xl mb-8 max-w-3xl mx-auto">
              Prenota una lezione oggi stesso e scopri i benefici del Pilates Reformer per il tuo corpo e la tua mente.
            </p>
            <Link href="/prenota">
              <Button className="bg-white text-black hover:bg-gray-100 rounded-full px-8 py-6 text-lg">
                Prenota una Lezione
              </Button>
            </Link>
          </TextReveal>
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
