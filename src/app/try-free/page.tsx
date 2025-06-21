'use client'

import Link from 'next/link'

export default function TryFreePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Starte deine 30-tägige kostenlose Testphase
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Entdecke, wie einfach Praxismanagement sein kann – ganz ohne Risiko oder Verpflichtung.
          </p>
        </div>

        {/* Benefits Section */}
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 mb-16">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">
            Warum jetzt starten?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Keine Kreditkarte erforderlich</h3>
                <p className="text-gray-600">Starte sofort ohne Zahlungsinformationen – völlig risikofrei.</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Zugriff auf alle Funktionen</h3>
                <p className="text-gray-600">Teste das komplette System ohne Einschränkungen.</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                <svg className="w-5 h-5 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Sofort startklar – ohne Installation</h3>
                <p className="text-gray-600">Browser-basiert und sofort einsatzbereit.</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                <svg className="w-5 h-5 text-orange-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Jederzeit kündbar</h3>
                <p className="text-gray-600">Keine langfristigen Verträge – volle Kontrolle über dein Abo.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Testimonials Section */}
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 mb-16">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">
            Das sagen unsere Kunden
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-6 bg-gray-50 rounded-lg">
              <div className="text-yellow-400 text-2xl mb-4">★★★★★</div>
              <p className="text-gray-700 mb-4 italic">
                "Endlich ein System, das wirklich für Praxen entwickelt wurde. Die Testphase hat uns überzeugt!"
              </p>
              <p className="text-sm text-gray-600 font-semibold">Dr. Schmidt, Zahnarztpraxis</p>
            </div>
            <div className="text-center p-6 bg-gray-50 rounded-lg">
              <div className="text-yellow-400 text-2xl mb-4">★★★★★</div>
              <p className="text-gray-700 mb-4 italic">
                "Intuitive Bedienung und alle Funktionen, die wir brauchen. Perfekt für unsere Praxis!"
              </p>
              <p className="text-sm text-gray-600 font-semibold">Dr. Müller, Allgemeinmedizin</p>
            </div>
            <div className="text-center p-6 bg-gray-50 rounded-lg">
              <div className="text-yellow-400 text-2xl mb-4">★★★★★</div>
              <p className="text-gray-700 mb-4 italic">
                "Die 30-tägige Testphase war der beste Weg, um das System kennenzulernen."
              </p>
              <p className="text-sm text-gray-600 font-semibold">Dr. Weber, Physiotherapie</p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Bereit für den nächsten Schritt?
            </h2>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Starte noch heute und erlebe, wie einfach Praxismanagement sein kann.
            </p>
            <Link 
              href="/login"
              className="inline-block w-full md:w-auto bg-blue-600 text-white text-xl font-bold py-4 px-12 rounded-lg hover:bg-blue-700 transform hover:scale-105 transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-blue-300 shadow-lg"
            >
              Jetzt kostenlos testen
            </Link>
            <p className="text-sm text-gray-500 mt-4">
              Keine Kreditkarte erforderlich • Jederzeit kündbar
            </p>
          </div>
        </div>
      </div>
    </div>
  )
} 