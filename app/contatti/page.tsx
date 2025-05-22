import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Contatti | Fitness Club",
  description: "Contattaci per informazioni sui nostri servizi e corsi",
}

export default function ContattiPage() {
  return (
    <main className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-center mb-8">Contattaci</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Informazioni di contatto</h2>

          <div className="space-y-4">
            <div>
              <h3 className="font-medium text-gray-700">Indirizzo</h3>
              <p>Via Roma 123, 00100 Roma, Italia</p>
            </div>

            <div>
              <h3 className="font-medium text-gray-700">Telefono</h3>
              <p>+39 06 1234567</p>
            </div>

            <div>
              <h3 className="font-medium text-gray-700">Email</h3>
              <p>info@fitnessclub.it</p>
            </div>

            <div>
              <h3 className="font-medium text-gray-700">Orari</h3>
              <p>Lunedì - Venerdì: 6:00 - 22:00</p>
              <p>Sabato: 8:00 - 20:00</p>
              <p>Domenica: 9:00 - 18:00</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Inviaci un messaggio</h2>

          <form className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Nome e Cognome
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                Telefono
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                Messaggio
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              ></textarea>
            </div>

            <div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300"
              >
                Invia messaggio
              </button>
            </div>
          </form>
        </div>
      </div>

      <div className="mt-12">
        <h2 className="text-2xl font-semibold mb-4">Dove siamo</h2>
        <div className="h-96 bg-gray-200 rounded-lg">
          {/* Placeholder for map */}
          <div className="w-full h-full flex items-center justify-center">
            <p className="text-gray-500">Mappa di Google</p>
          </div>
        </div>
      </div>
    </main>
  )
}
