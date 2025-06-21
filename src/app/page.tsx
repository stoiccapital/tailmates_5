import Link from 'next/link'

// Updated for Vercel deployment - 2025-01-21
export default function Home() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gray-50 py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              {/* Left side - Text content */}
              <div className="text-left">
                <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl mb-6">
                  <span className="block xl:inline">Praxis Management</span>{' '}
                  <span className="block text-blue-600 xl:inline">Software</span>
                </h1>
                <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg md:mt-5 md:text-xl mb-8">
                  Professionelle Praxisverwaltung für Ärzte und medizinisches Personal. 
                  Verwalten Sie Patienten, Termine, Dokumente und mehr - alles an einem Ort.
                </p>
                <div className="mt-8 max-w-md">
                  <form action="/login" method="GET">
                    <div className="flex items-center bg-white border border-gray-300 rounded-full p-1 focus-within:ring-2 focus-within:ring-blue-500 transition-all duration-200">
                      <input
                        type="email"
                        name="email"
                        id="email"
                        placeholder="Ihre E-Mail-Adresse"
                        className="w-full p-2 bg-transparent border-none focus:outline-none text-sm text-gray-800 placeholder-gray-500"
                        required
                      />
                      <button
                        type="submit"
                        className="flex-shrink-0 bg-gray-800 text-white font-semibold text-sm py-2 px-5 rounded-full hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 flex items-center"
                      >
                        <span>Jetzt starten</span>
                        <svg className="ml-2 w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7"></path></svg>
                      </button>
                    </div>
                  </form>
                </div>
              </div>
              
              {/* Right side - Picture */}
              <div className="flex items-center justify-center">
                <div className="w-full max-w-md h-80 bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl flex items-center justify-center">
                  <div className="text-white text-center p-8">
                    <svg className="w-32 h-32 mx-auto mb-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                    </svg>
                    <h3 className="text-2xl font-bold mb-2">Professionelle Praxisverwaltung</h3>
                    <p className="text-blue-100">Alles an einem Ort</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Trusted By Section */}
      <div className="py-12 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
            <div className="text-center mb-12">
              <h2 className="text-2xl font-bold text-gray-900">
                Vertrauen von führenden Praxen
              </h2>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 items-center justify-items-center">
              {[
                'Medica GmbH',
                'VetPro Systems',
                'Praxis365',
                'Healthline Solutions',
                'VetNet AG',
                'MedPoint Software',
                'DocHub',
                'TierData GmbH'
              ].map((brand, index) => (
                <div
                  key={index}
                  className="flex items-center justify-center h-12 w-full max-w-[120px] grayscale hover:grayscale-0 hover:scale-110 transition-all duration-200 cursor-pointer"
                >
                  <div className="text-black hover:text-gray-600 font-semibold text-sm text-center">
                    {brand}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* German Support Section */}
      <div className="py-12 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
              Support auf Deutsch
            </h2>
            <p className="text-lg text-gray-600 mb-8 text-center leading-relaxed">
              Besuchen Sie unsere deutsche Support-Webseite, um Antworten auf häufig gestellte Fragen zu erhalten und Hilfe bei der Nutzung von Tailmates zu bekommen.
            </p>
            <div className="text-center">
              <Link
                href="/support"
                className="inline-block w-full md:w-auto bg-blue-600 text-white px-6 py-3 rounded-md text-base font-medium hover:bg-blue-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Support kontaktieren
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-base text-blue-600 font-semibold tracking-wide uppercase">Features</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Alles was Sie für Ihre Praxis brauchen
            </p>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
              Unsere Software bietet alle Funktionen, die Sie für eine effiziente Praxisverwaltung benötigen.
            </p>
          </div>

          <div className="mt-10">
            <div className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
              {[
                {
                  title: 'Patientenverwaltung',
                  description: 'Verwalten Sie Patientendaten, Anamnesen und Behandlungsverläufe sicher und übersichtlich.',
                  icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z'
                },
                {
                  title: 'Terminplanung',
                  description: 'Organisieren Sie Ihren Praxisalltag mit einem intelligenten Kalendersystem.',
                  icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z'
                },
                {
                  title: 'Wartezimmer',
                  description: 'Überwachen Sie den Praxisablauf und verwalten Sie wartende Patienten.',
                  icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z'
                },
                {
                  title: 'Finanzverwaltung',
                  description: 'Behalten Sie den Überblick über Ihre Praxisfinanzen und Abrechnungen.',
                  icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
                }
              ].map((feature) => (
                <div key={feature.title} className="relative">
                  <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white">
                    <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={feature.icon} />
                    </svg>
                  </div>
                  <p className="ml-16 text-lg leading-6 font-medium text-gray-900">{feature.title}</p>
                  <p className="mt-2 ml-16 text-base text-gray-500">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-blue-600">
        <div className="max-w-2xl mx-auto text-center py-16 px-4 sm:py-20 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
            <span className="block">Bereit für den nächsten Schritt?</span>
            <span className="block">Starten Sie noch heute.</span>
          </h2>
          <p className="mt-4 text-lg leading-6 text-blue-200">
            Erleben Sie, wie einfach Praxisverwaltung sein kann.
          </p>
          <Link
            href="/login"
            className="mt-8 w-full inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-blue-600 bg-white hover:bg-blue-50 sm:w-auto"
          >
            Kostenlos testen
          </Link>
        </div>
      </div>
    </div>
  )
}
