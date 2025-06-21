'use client'

import { useState } from 'react'

export default function Donate() {
  const [donationAmount, setDonationAmount] = useState('')
  const [customAmount, setCustomAmount] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleDonation = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    // Simulate donation processing
    setTimeout(() => {
      alert('Thank you for your donation! This is a demo - in a real application, this would integrate with a payment processor like Stripe.')
      setIsLoading(false)
      setDonationAmount('')
      setCustomAmount('')
    }, 2000)
  }

  const presetAmounts = [
    { value: '10', label: '$10' },
    { value: '25', label: '$25' },
    { value: '50', label: '$50' },
    { value: '100', label: '$100' },
    { value: '250', label: '$250' },
    { value: '500', label: '$500' }
  ]

  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <h2 className="text-base text-blue-600 font-semibold tracking-wide uppercase">Support Us</h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Make a Donation
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
            Help us continue developing innovative healthcare software solutions
          </p>
        </div>

        <div className="mt-20">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-16">
            {/* Donation Form */}
            <div className="bg-gray-50 rounded-lg p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Choose Your Donation Amount</h3>
              
              <form onSubmit={handleDonation} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-4">
                    Select Amount
                  </label>
                  <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                    {presetAmounts?.map((amount) => (
                      <button
                        key={amount?.value || 'custom'}
                        type="button"
                        onClick={() => {
                          setDonationAmount(amount?.value || '')
                          setCustomAmount('')
                        }}
                        className={`p-4 border rounded-lg text-center transition-colors ${
                          donationAmount === amount?.value
                            ? 'border-blue-500 bg-blue-50 text-blue-700'
                            : 'border-gray-300 hover:border-gray-400 text-gray-700'
                        }`}
                      >
                        <span className="text-lg font-semibold">{amount?.label || '$0'}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label htmlFor="custom-amount" className="block text-sm font-medium text-gray-700">
                    Or enter a custom amount
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <span className="text-gray-500 sm:text-sm">$</span>
                    </div>
                    <input
                      type="number"
                      name="custom-amount"
                      id="custom-amount"
                      min="1"
                      step="0.01"
                      value={customAmount}
                      onChange={(e) => {
                        setCustomAmount(e.target.value)
                        setDonationAmount('')
                      }}
                      className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md p-3"
                      placeholder="0.00"
                    />
                  </div>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-blue-800">
                        Your donation will help us:
                      </h3>
                      <div className="mt-2 text-sm text-blue-700">
                        <ul className="list-disc list-inside space-y-1">
                          <li>Develop new features for healthcare providers</li>
                          <li>Improve accessibility and user experience</li>
                          <li>Support open-source healthcare initiatives</li>
                          <li>Provide free software to underserved communities</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <button
                    type="submit"
                    disabled={isLoading || (!donationAmount && !customAmount)}
                    className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Processing...
                      </>
                    ) : (
                      `Donate ${donationAmount ? `$${donationAmount}` : customAmount ? `$${customAmount}` : ''}`
                    )}
                  </button>
                </div>
              </form>
            </div>

            {/* Information */}
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Why Donate?</h3>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                      <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                  <div className="ml-4">
                    <h4 className="text-lg font-medium text-gray-900">Support Healthcare Innovation</h4>
                    <p className="text-gray-600">
                      Your donation helps us develop cutting-edge software that improves patient care and streamlines healthcare operations.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                  <div className="ml-4">
                    <h4 className="text-lg font-medium text-gray-900">Open Source Development</h4>
                    <p className="text-gray-600">
                      We believe in making healthcare technology accessible to everyone. Your support helps us maintain and improve our open-source projects.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                      <svg className="w-4 h-4 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                  </div>
                  <div className="ml-4">
                    <h4 className="text-lg font-medium text-gray-900">Community Impact</h4>
                    <p className="text-gray-600">
                      Help us provide free software solutions to underserved healthcare communities and small practices that need it most.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8 bg-gray-50 rounded-lg p-6">
                <h4 className="text-lg font-medium text-gray-900 mb-4">Transparency</h4>
                <p className="text-gray-600 mb-4">
                  We're committed to transparency in how we use your donations:
                </p>
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex justify-between">
                    <span>Software Development</span>
                    <span className="font-medium">70%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Community Support</span>
                    <span className="font-medium">20%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Infrastructure</span>
                    <span className="font-medium">10%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Testimonials */}
        <div className="mt-20 bg-gray-50 rounded-lg p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">What Our Supporters Say</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: 'Dr. Sarah Johnson',
                role: 'Family Physician',
                quote: 'The software has transformed how I manage my practice. I\'m grateful for the open-source community that made this possible.'
              },
              {
                name: 'Michael Chen',
                role: 'Healthcare Developer',
                quote: 'As a developer working in healthcare, I appreciate the quality and accessibility of this software. Happy to support the project.'
              },
              {
                name: 'Lisa Rodriguez',
                role: 'Clinic Administrator',
                quote: 'The donation was worth every penny. The software has saved us countless hours and improved our patient care.'
              }
            ]?.map((testimonial, index) => (
              <div key={testimonial?.name || index} className="bg-white rounded-lg p-6 shadow-sm">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <h4 className="text-sm font-medium text-gray-900">{testimonial?.name || 'Anonymous'}</h4>
                    <p className="text-sm text-gray-500">{testimonial?.role || 'Supporter'}</p>
                  </div>
                </div>
                <p className="text-gray-600 italic">"{testimonial?.quote || 'Great software!'}"</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
} 