import Link from "next/link"
import MainNavbar from "@/components/navigation/main-navbar"
import ScrollProgress from "@/components/animations/scroll-progress"

export default function CookiePolicyPage() {
  return (
    <div className="min-h-screen bg-white">
      <ScrollProgress />
      <MainNavbar />

      <main className="pt-32 pb-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-8 text-unika-dark">Cookie Policy</h1>

          <div className="prose max-w-none text-unika-dark-lighter">
            <p className="text-lg">Ultimo aggiornamento: 28 Aprile 2025</p>

            <h2 className="text-2xl font-semibold mt-8 mb-4 text-unika-dark">1. Cosa sono i cookie</h2>
            <p>
              I cookie sono piccoli file di testo che vengono memorizzati sul tuo dispositivo (computer, tablet,
              smartphone) quando visiti un sito web. I cookie sono ampiamente utilizzati per far funzionare i siti web
              in modo più efficiente, per migliorare l'esperienza dell'utente e per fornire informazioni ai proprietari
              del sito.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4 text-unika-dark">2. Tipi di cookie che utilizziamo</h2>
            <p>Il nostro sito utilizza diversi tipi di cookie per vari scopi:</p>

            <h3 className="text-xl font-semibold mt-6 mb-3 text-unika-dark">2.1 Cookie necessari</h3>
            <p>
              Questi cookie sono essenziali per il funzionamento del nostro sito web e non possono essere disattivati
              nei nostri sistemi. Solitamente vengono impostati solo in risposta a azioni da te effettuate che
              costituiscono una richiesta di servizi, come l'impostazione delle preferenze di privacy, l'accesso o la
              compilazione di moduli. Puoi impostare il tuo browser per bloccare o avvisarti dell'esistenza di questi
              cookie, ma alcune parti del sito potrebbero non funzionare correttamente.
            </p>

            <h3 className="text-xl font-semibold mt-6 mb-3 text-unika-dark">2.2 Cookie funzionali</h3>
            <p>
              Questi cookie consentono al sito di fornire funzionalità e personalizzazione avanzate. Possono essere
              impostati da noi o da fornitori terzi i cui servizi abbiamo aggiunto alle nostre pagine. Se non consenti
              questi cookie, alcuni o tutti questi servizi potrebbero non funzionare correttamente.
            </p>

            <h3 className="text-xl font-semibold mt-6 mb-3 text-unika-dark">2.3 Cookie analitici</h3>
            <p>
              Questi cookie ci permettono di contare le visite e le fonti di traffico in modo da poter misurare e
              migliorare le prestazioni del nostro sito. Ci aiutano a sapere quali pagine sono le più e le meno popolari
              e vedere come i visitatori si muovono nel sito. Tutte le informazioni raccolte da questi cookie sono
              aggregate e quindi anonime.
            </p>

            <h3 className="text-xl font-semibold mt-6 mb-3 text-unika-dark">2.4 Cookie di marketing</h3>
            <p>
              Questi cookie possono essere impostati attraverso il nostro sito dai nostri partner pubblicitari. Possono
              essere utilizzati da queste aziende per costruire un profilo dei tuoi interessi e mostrarti annunci
              pertinenti su altri siti. Non memorizzano direttamente informazioni personali, ma sono basati
              sull'identificazione univoca del tuo browser e dispositivo internet.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4 text-unika-dark">3. Come gestire i cookie</h2>
            <p>Puoi gestire le tue preferenze sui cookie in diversi modi:</p>
            <ul className="list-disc pl-6 mt-4 space-y-2">
              <li>
                <strong>Attraverso il nostro banner dei cookie:</strong> Quando visiti il nostro sito per la prima
                volta, ti verrà mostrato un banner che ti consente di accettare o rifiutare i cookie, o di
                personalizzare le tue preferenze.
              </li>
              <li>
                <strong>Attraverso le impostazioni del browser:</strong> La maggior parte dei browser web ti consente di
                controllare i cookie attraverso le impostazioni. Puoi solitamente trovare queste impostazioni nella
                sezione "Opzioni" o "Preferenze" del tuo browser.
              </li>
            </ul>
            <p className="mt-4">
              Tieni presente che la limitazione dei cookie potrebbe influire sulla funzionalità del nostro sito web.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4 text-unika-dark">4. Cookie di terze parti</h2>
            <p>
              Il nostro sito web può utilizzare servizi di terze parti che impostano i propri cookie. Non abbiamo il
              controllo su questi cookie, quindi ti consigliamo di controllare i siti web di queste terze parti per
              ulteriori informazioni sui loro cookie e su come gestirli.
            </p>
            <p className="mt-4">
              Alcuni dei servizi di terze parti che potrebbero impostare cookie sul nostro sito includono:
            </p>
            <ul className="list-disc pl-6 mt-4 space-y-2">
              <li>Google Analytics (cookie analitici)</li>
              <li>Google Ads (cookie di marketing)</li>
              <li>Facebook (cookie di marketing)</li>
              <li>Instagram (cookie di marketing)</li>
            </ul>

            <h2 className="text-2xl font-semibold mt-8 mb-4 text-unika-dark">5. Modifiche alla Cookie Policy</h2>
            <p>
              Possiamo aggiornare la nostra Cookie Policy di tanto in tanto. Ti invitiamo a rivedere periodicamente
              questa pagina per eventuali modifiche. Le modifiche a questa Cookie Policy sono efficaci quando vengono
              pubblicate su questa pagina.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4 text-unika-dark">6. Contattaci</h2>
            <p>
              Se hai domande sulla nostra Cookie Policy, contattaci all'indirizzo email: privacy@unikafitness.com o al
              numero di telefono: +39 331 913 8064.
            </p>

            <div className="mt-12 pt-8 border-t border-gray-200">
              <p>
                Per ulteriori informazioni su come trattiamo i tuoi dati personali, consulta la nostra{" "}
                <Link href="/privacy-policy" className="text-unika-yellow hover:underline">
                  Privacy Policy
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
