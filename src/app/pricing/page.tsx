'use client'

import Link from 'next/link'

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Einfache Preisgestaltung
          </h1>
          <p className="text-xl text-gray-600 mb-6">
            Ein Tarif mit allem inklusive. Keine versteckten Gebühren.
          </p>
          <p className="text-lg text-gray-700">
            Starte mit einer 30-tägigen kostenlosen Testphase. Jederzeit kündbar.
          </p>
        </div>

        {/* Pricing Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 max-w-md mx-auto">
          <div className="text-center">
            {/* Price */}
            <div className="mb-8">
              <div className="text-4xl font-bold text-gray-900 mb-2">
                $99
              </div>
              <div className="text-gray-600 text-lg">
                /Monat
              </div>
            </div>

            {/* Features */}
            <div className="space-y-4 mb-8">
              <div className="flex items-center justify-center">
                <svg className="w-5 h-5 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span className="text-gray-700 font-medium">Alle Funktionen</span>
              </div>
              <div className="flex items-center justify-center">
                <svg className="w-5 h-5 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span className="text-gray-700 font-medium">Unbegrenzte Nutzer</span>
              </div>
            </div>

            {/* CTA Button */}
            <Link 
              href="/login"
              className="inline-block w-full bg-blue-600 text-white text-lg font-semibold py-4 px-8 rounded-lg hover:bg-blue-700 transition-colors duration-200 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-300"
            >
              30-tägige Testphase starten
            </Link>
          </div>
        </div>

        {/* Additional Info */}
        <div className="text-center mt-8">
          <p className="text-gray-600 text-sm">
            Keine Kreditkarte erforderlich • Jederzeit kündbar
          </p>
        </div>
      </div>
    </div>
  )
} 