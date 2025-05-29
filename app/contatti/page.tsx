import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { MapPin, Phone, Mail, Clock } from "lucide-react"
import MainNavbar from "@/components/navigation/main-navbar"
import TextReveal from "@/components/animations/text-reveal"

export const metadata: Metadata = {
  title: "Contatti | Unika Fitness Club",
  description: "Contattaci per informazioni sui nostri servizi, orari e prezzi.",
}

export default function ContattiPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigazione principale */}
      <MainNavbar />

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 bg-[#f5f5f7]">
        <div className="max-w-7xl mx-auto text-center">
          <TextReveal>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Contattaci</h1>
          </TextReveal>
          <TextReveal delay={0.1}>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Hai domande sui nostri servizi o vuoi prenotare una sessione? Contattaci e ti risponderemo al più presto.
            </p>
          </TextReveal>
        </div>
      </section>

      {/* Informazioni di contatto e form */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Informazioni di contatto */}
            <div>
              <h2 className="text-3xl font-bold mb-8">Informazioni di contatto</h2>

              <div className="space-y-8">
                <div className="flex items-start">
                  <div className="bg-unika-yellow p-3 rounded-full mr-4">
                    <MapPin className="h-6 w-6 text-unika-dark" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Indirizzo</h3>
                    <p className="text-gray-600">
                      Via Example 123
                      <br />
                      00100 Roma, Italia
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-unika-yellow p-3 rounded-full mr-4">
                    <Phone className="h-6 w-6 text-unika-dark" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Telefono</h3>
                    <p className="text-gray-600">+39 331 913 8064</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-unika-yellow p-3 rounded-full mr-4">
                    <Mail className="h-6 w-6 text-unika-dark" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Email</h3>
                    <p className="text-gray-600">unikafitnessclub@gmail.com</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-unika-yellow p-3 rounded-full mr-4">
                    <Clock className="h-6 w-6 text-unika-dark" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Orari di apertura</h3>
                    <div className="text-gray-600 space-y-1">
                      <p>Lunedì - Venerdì: 7:00 - 22:00</p>
                      <p>Sabato: 9:00 - 20:00</p>
                      <p>Domenica: 9:00 - 14:00</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Mappa */}
              <div className="mt-12 h-[300px] bg-gray-200 rounded-xl overflow-hidden">
                {/* Qui inserire la mappa Google */}
                <div className="w-full h-full flex items-center justify-center">
                  <p className="text-gray-500">Mappa in caricamento...</p>
                </div>
              </div>
            </div>

            {/* Form di contatto */}
            <div>
              <h2 className="text-3xl font-bold mb-8">Inviaci un messaggio</h2>

              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="nome">Nome</Label>
                    <Input id="nome" placeholder="Il tuo nome" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cognome">Cognome</Label>
                    <Input id="cognome" placeholder="Il tuo cognome" required />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="La tua email" required />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="telefono">Telefono</Label>
                  <Input id="telefono" type="tel" placeholder="Il tuo numero di telefono" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="messaggio">Messaggio</Label>
                  <Textarea id="messaggio" placeholder="Scrivi il tuo messaggio qui..." rows={5} required />
                </div>

                <div className="pt-4">
                  <Button className="bg-unika-yellow text-unika-dark hover:bg-unika-yellow-hover rounded-full px-8 py-6 text-lg w-full md:w-auto">
                    Invia messaggio
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-black text-white">
        <div className="max-w-5xl mx-auto text-center">
          <TextReveal>
            <h2 className="text-4xl font-semibold mb-4">Pronto a iniziare il tuo percorso fitness?</h2>
            <p className="text-xl mb-8 max-w-3xl mx-auto">
              Prenota una consulenza gratuita oggi stesso e scopri come possiamo aiutarti a raggiungere i tuoi
              obiettivi.
            </p>
            <Link href="/prenota">
              <Button className="bg-unika-yellow text-unika-dark hover:bg-unika-yellow-hover rounded-full px-8 py-6 text-lg">
                Prenota una consulenza
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
