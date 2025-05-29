import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import MainNavbar from "@/components/navigation/main-navbar"
import TextReveal from "@/components/animations/text-reveal"

export const metadata: Metadata = {
  title: "Prenota | Unika Fitness Club",
  description: "Prenota una sessione di allenamento o una consulenza presso Unika Fitness Club.",
}

export default function PrenotaPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigazione principale */}
      <MainNavbar />

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 bg-[#f5f5f7]">
        <div className="max-w-7xl mx-auto text-center">
          <TextReveal>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Prenota una sessione</h1>
          </TextReveal>
          <TextReveal delay={0.1}>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Compila il modulo sottostante per prenotare una sessione di allenamento o una consulenza con uno dei
              nostri trainer.
            </p>
          </TextReveal>
        </div>
      </section>

      {/* Form di prenotazione */}
      <section className="py-20 px-4">
        <div className="max-w-3xl mx-auto">
          <form className="space-y-8">
            {/* Dati personali */}
            <div>
              <h2 className="text-2xl font-bold mb-6">Dati personali</h2>
              <div className="space-y-6">
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

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="La tua email" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="telefono">Telefono</Label>
                    <Input id="telefono" type="tel" placeholder="Il tuo numero di telefono" required />
                  </div>
                </div>
              </div>
            </div>

            {/* Tipo di prenotazione */}
            <div>
              <h2 className="text-2xl font-bold mb-6">Tipo di prenotazione</h2>
              <div className="space-y-6">
                <div className="space-y-3">
                  <Label>Cosa desideri prenotare?</Label>
                  <RadioGroup defaultValue="sessione">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="sessione" id="sessione" />
                      <Label htmlFor="sessione">Sessione di allenamento</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="consulenza" id="consulenza" />
                      <Label htmlFor="consulenza">Consulenza gratuita</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="prova" id="prova" />
                      <Label htmlFor="prova">Lezione di prova</Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="space-y-3">
                  <Label htmlFor="servizio">Servizio</Label>
                  <Select>
                    <SelectTrigger id="servizio">
                      <SelectValue placeholder="Seleziona un servizio" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pilates">Pilates Reformer</SelectItem>
                      <SelectItem value="ems">EMS Training</SelectItem>
                      <SelectItem value="hiit">HIIT</SelectItem>
                      <SelectItem value="personal">Personal Training</SelectItem>
                      <SelectItem value="yoga">Yoga</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-3">
                  <Label htmlFor="trainer">Trainer (opzionale)</Label>
                  <Select>
                    <SelectTrigger id="trainer">
                      <SelectValue placeholder="Seleziona un trainer" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="marco">Marco Rossi</SelectItem>
                      <SelectItem value="laura">Laura Bianchi</SelectItem>
                      <SelectItem value="andrea">Andrea Verdi</SelectItem>
                      <SelectItem value="qualsiasi">Qualsiasi trainer disponibile</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* Data e ora */}
            <div>
              <h2 className="text-2xl font-bold mb-6">Data e ora</h2>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="data">Data preferita</Label>
                    <Input id="data" type="date" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="ora">Ora preferita</Label>
                    <Input id="ora" type="time" required />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="note">Note aggiuntive</Label>
                  <Textarea id="note" placeholder="Eventuali note o richieste particolari..." rows={4} />
                </div>
              </div>
            </div>

            {/* Privacy */}
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <Checkbox id="privacy" required />
                <div>
                  <Label htmlFor="privacy" className="text-sm">
                    Ho letto e accetto la{" "}
                    <Link href="/privacy-policy" className="text-unika-yellow hover:underline">
                      Privacy Policy
                    </Link>
                  </Label>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Checkbox id="marketing" />
                <div>
                  <Label htmlFor="marketing" className="text-sm">
                    Acconsento a ricevere comunicazioni di marketing e promozionali
                  </Label>
                </div>
              </div>
            </div>

            {/* Submit */}
            <div className="pt-4">
              <Button className="bg-unika-yellow text-unika-dark hover:bg-unika-yellow-hover rounded-full px-8 py-6 text-lg w-full md:w-auto">
                Invia richiesta di prenotazione
              </Button>
            </div>
          </form>
        </div>
      </section>

      {/* Informazioni aggiuntive */}
      <section className="py-20 px-4 bg-[#f5f5f7]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Informazioni utili</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Ecco alcune informazioni utili per la tua prenotazione presso Unika Fitness Club.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-sm">
              <h3 className="text-xl font-semibold mb-4">Orari di apertura</h3>
              <ul className="space-y-2 text-gray-600">
                <li>Lunedì - Venerdì: 7:00 - 22:00</li>
                <li>Sabato: 9:00 - 20:00</li>
                <li>Domenica: 9:00 - 14:00</li>
              </ul>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm">
              <h3 className="text-xl font-semibold mb-4">Cosa portare</h3>
              <ul className="space-y-2 text-gray-600">
                <li>Abbigliamento sportivo comodo</li>
                <li>Scarpe da ginnastica pulite</li>
                <li>Asciugamano personale</li>
                <li>Bottiglia d'acqua</li>
              </ul>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm">
              <h3 className="text-xl font-semibold mb-4">Politica di cancellazione</h3>
              <p className="text-gray-600">
                Le prenotazioni possono essere cancellate o riprogrammate fino a 24 ore prima dell'orario previsto senza
                alcuna penale. Per cancellazioni con meno di 24 ore di preavviso, verrà addebitato il 50% del costo
                della sessione.
              </p>
            </div>
          </div>
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
