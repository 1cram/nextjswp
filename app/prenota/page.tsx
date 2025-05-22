import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Prenota | Fitness Club",
  description: "Prenota una lezione o una consulenza con i nostri trainer",
}

export default function PrenotaPage() {
  return (
    <main className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-center mb-8">Prenota una sessione</h1>

      <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-md">
        <form className="space-y-6">
          <div>
            <h2 className="text-2xl font-semibold mb-4">Informazioni personali</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                  Nome
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                  Cognome
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
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
                  required
                />
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-4">Dettagli prenotazione</h2>

            <div className="space-y-4">
              <div>
                <label htmlFor="serviceType" className="block text-sm font-medium text-gray-700 mb-1">
                  Tipo di servizio
                </label>
                <select
                  id="serviceType"
                  name="serviceType"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                >
                  <option value="">Seleziona un servizio</option>
                  <option value="personal">Personal Training</option>
                  <option value="group">Lezione di gruppo</option>
                  <option value="consultation">Consulenza nutrizionale</option>
                  <option value="massage">Massaggio sportivo</option>
                </select>
              </div>

              <div>
                <label htmlFor="trainer" className="block text-sm font-medium text-gray-700 mb-1">
                  Trainer
                </label>
                <select
                  id="trainer"
                  name="trainer"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                >
                  <option value="">Seleziona un trainer</option>
                  <option value="marco">Marco Rossi</option>
                  <option value="laura">Laura Bianchi</option>
                  <option value="giovanni">Giovanni Verdi</option>
                  <option value="anna">Anna Neri</option>
                </select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
                    Data
                  </label>
                  <input
                    type="date"
                    id="date"
                    name="date"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="time" className="block text-sm font-medium text-gray-700 mb-1">
                    Orario
                  </label>
                  <input
                    type="time"
                    id="time"
                    name="time"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-1">
                  Note aggiuntive
                </label>
                <textarea
                  id="notes"
                  name="notes"
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                ></textarea>
              </div>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 transition duration-300 font-medium"
            >
              Conferma prenotazione
            </button>
          </div>
        </form>
      </div>
    </main>
  )
}
