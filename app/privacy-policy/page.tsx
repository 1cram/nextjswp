import Link from "next/link"
import MainNavbar from "@/components/navigation/main-navbar"
import ScrollProgress from "@/components/animations/scroll-progress"

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-white">
      <ScrollProgress />
      <MainNavbar />

      <main className="pt-32 pb-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-8 text-unika-dark">Privacy Policy</h1>

          <div className="prose max-w-none text-unika-dark-lighter">
            <p className="text-lg">Ultimo aggiornamento: 28 Aprile 2025</p>

            <h2 className="text-2xl font-semibold mt-8 mb-4 text-unika-dark">1. Introduzione</h2>
            <p>
              Benvenuto nella Privacy Policy di Unika Fitness Club. La presente Privacy Policy descrive come
              raccogliamo, utilizziamo e condividiamo le tue informazioni personali quando visiti o utilizzi i nostri
              servizi.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4 text-unika-dark">2. Informazioni che raccogliamo</h2>
            <p>Raccogliamo diversi tipi di informazioni, tra cui:</p>
            <ul className="list-disc pl-6 mt-4 space-y-2">
              <li>
                <strong>Informazioni personali:</strong> nome, indirizzo email, numero di telefono, indirizzo postale,
                data di nascita e altre informazioni simili che ci fornisci quando ti registri ai nostri servizi o
                compili un modulo.
              </li>
              <li>
                <strong>Informazioni di pagamento:</strong> dettagli della carta di credito o altre informazioni
                finanziarie necessarie per elaborare i pagamenti.
              </li>
              <li>
                <strong>Informazioni sull'utilizzo:</strong> dati su come interagisci con il nostro sito web, app e
                servizi, inclusi i log di accesso, le pagine visitate e le funzionalità utilizzate.
              </li>
              <li>
                <strong>Informazioni sul dispositivo:</strong> dati sul dispositivo che utilizzi per accedere ai nostri
                servizi, come il tipo di dispositivo, il sistema operativo, l'indirizzo IP e l'identificatore del
                dispositivo.
              </li>
            </ul>

            <h2 className="text-2xl font-semibold mt-8 mb-4 text-unika-dark">
              3. Come utilizziamo le tue informazioni
            </h2>
            <p>Utilizziamo le informazioni raccolte per:</p>
            <ul className="list-disc pl-6 mt-4 space-y-2">
              <li>Fornire, mantenere e migliorare i nostri servizi</li>
              <li>Elaborare transazioni e inviare notifiche relative</li>
              <li>Inviare comunicazioni di marketing, se hai acconsentito a riceverle</li>
              <li>Personalizzare la tua esperienza e fornirti contenuti e offerte su misura</li>
              <li>Monitorare e analizzare tendenze, utilizzo e attività connesse ai nostri servizi</li>
              <li>Rilevare, prevenire e affrontare attività fraudolente o illegali</li>
            </ul>

            <h2 className="text-2xl font-semibold mt-8 mb-4 text-unika-dark">4. Condivisione delle informazioni</h2>
            <p>Possiamo condividere le tue informazioni con:</p>
            <ul className="list-disc pl-6 mt-4 space-y-2">
              <li>Fornitori di servizi che ci aiutano a fornire i nostri servizi</li>
              <li>Partner commerciali, con il tuo consenso</li>
              <li>Autorità legali, se richiesto dalla legge o necessario per proteggere i nostri diritti</li>
              <li>
                In caso di fusione, vendita o trasferimento di attività, le tue informazioni potrebbero essere
                trasferite come parte dell'operazione
              </li>
            </ul>

            <h2 className="text-2xl font-semibold mt-8 mb-4 text-unika-dark">5. I tuoi diritti</h2>
            <p>Hai il diritto di:</p>
            <ul className="list-disc pl-6 mt-4 space-y-2">
              <li>Accedere alle tue informazioni personali</li>
              <li>Correggere informazioni inesatte o incomplete</li>
              <li>Richiedere la cancellazione delle tue informazioni</li>
              <li>Opporti al trattamento delle tue informazioni</li>
              <li>Richiedere la limitazione del trattamento</li>
              <li>Richiedere la portabilità dei dati</li>
            </ul>

            <h2 className="text-2xl font-semibold mt-8 mb-4 text-unika-dark">6. Sicurezza dei dati</h2>
            <p>
              Adottiamo misure di sicurezza appropriate per proteggere le tue informazioni personali da perdita, uso
              improprio, accesso non autorizzato, divulgazione, alterazione e distruzione.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4 text-unika-dark">7. Conservazione dei dati</h2>
            <p>
              Conserviamo le tue informazioni personali solo per il tempo necessario a soddisfare le finalità per cui
              sono state raccolte, incluso l'adempimento di obblighi legali, contabili o di reporting.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4 text-unika-dark">8. Modifiche alla Privacy Policy</h2>
            <p>
              Possiamo aggiornare la nostra Privacy Policy di tanto in tanto. Ti informeremo di eventuali modifiche
              pubblicando la nuova Privacy Policy su questa pagina e, se le modifiche sono significative, ti invieremo
              una notifica.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4 text-unika-dark">9. Contattaci</h2>
            <p>
              Se hai domande sulla nostra Privacy Policy, contattaci all'indirizzo email: privacy@unikafitness.com o al
              numero di telefono: +39 331 913 8064.
            </p>

            <div className="mt-12 pt-8 border-t border-gray-200">
              <p>
                Per ulteriori informazioni sui cookie che utilizziamo, consulta la nostra{" "}
                <Link href="/cookie-policy" className="text-unika-yellow hover:underline">
                  Cookie Policy
                </Link>
                .
              </p>
            </div>
          </div>
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
