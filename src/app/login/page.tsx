'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { signIn, signUp } from '@/lib/auth'

export default function Login() {
  console.log('Login component loaded')
  
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [isSignUp, setIsSignUp] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    // Validate passwords match for signup
    if (isSignUp && password !== confirmPassword) {
      setError('Passwörter stimmen nicht überein.')
      setIsLoading(false)
      return
    }

    try {
      if (isSignUp) {
        const { data, error } = await signUp(email, password)
        
        if (error) {
          setError(error.message)
        } else if (data?.user) {
          setError('Konto erfolgreich erstellt! Bitte bestätigen Sie Ihre E-Mail-Adresse.')
          // Reset form
          setEmail('')
          setPassword('')
          setConfirmPassword('')
          setIsSignUp(false)
        }
      } else {
        const { data, error } = await signIn(email, password)
        
        if (error) {
          setError(error.message)
        } else if (data?.user) {
          // Navigate to dashboard
          window.location.href = '/dashboard'
        } else {
          setError('Anmeldung fehlgeschlagen. Keine Benutzerdaten erhalten.')
        }
      }
    } catch (err) {
      setError('Ein Fehler ist aufgetreten. Bitte versuchen Sie es erneut.')
    } finally {
      setIsLoading(false)
    }
  }

  const toggleMode = () => {
    setIsSignUp(!isSignUp)
    setError('')
    setEmail('')
    setPassword('')
    setConfirmPassword('')
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <div className="mx-auto h-12 w-12 bg-blue-600 rounded-full flex items-center justify-center">
            <svg className="h-8 w-8 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
            </svg>
          </div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            {isSignUp ? 'Konto erstellen' : 'Anmelden'}
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Praxis Management Software
          </p>
        </div>
        
        {/* Test button */}
        <button 
          type="button" 
          onClick={() => alert('JavaScript is working!')}
          className="mb-4 w-full bg-red-500 text-white p-2 rounded"
        >
          Test JavaScript
        </button>
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email-address" className="sr-only">
                E-Mail-Adresse
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="E-Mail-Adresse"
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Passwort
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete={isSignUp ? "new-password" : "current-password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm ${isSignUp ? '' : 'rounded-b-md'}`}
                placeholder="Passwort"
              />
            </div>
            {isSignUp && (
              <div>
                <label htmlFor="confirm-password" className="sr-only">
                  Passwort bestätigen
                </label>
                <input
                  id="confirm-password"
                  name="confirm-password"
                  type="password"
                  autoComplete="new-password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                  placeholder="Passwort bestätigen"
                />
              </div>
            )}
          </div>

          {error && (
            <div className={`rounded-md p-4 ${error.includes('erfolgreich') ? 'bg-green-50' : 'bg-red-50'}`}>
              <div className="flex">
                <div className="flex-shrink-0">
                  {error.includes('erfolgreich') ? (
                    <svg className="h-5 w-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  ) : (
                    <svg className="h-5 w-5 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                  )}
                </div>
                <div className="ml-3">
                  <h3 className={`text-sm font-medium ${error.includes('erfolgreich') ? 'text-green-800' : 'text-red-800'}`}>
                    {error.includes('erfolgreich') ? 'Erfolg' : 'Fehler'}
                  </h3>
                  <div className={`mt-2 text-sm ${error.includes('erfolgreich') ? 'text-green-700' : 'text-red-700'}`}>
                    {error}
                  </div>
                </div>
              </div>
            </div>
          )}

          {!isSignUp && (
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                  Angemeldet bleiben
                </label>
              </div>

              <div className="text-sm">
                <a href="#" className="font-medium text-blue-600 hover:text-blue-500">
                  Passwort vergessen?
                </a>
              </div>
            </div>
          )}

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : null}
              {isLoading ? (isSignUp ? 'Konto wird erstellt...' : 'Anmeldung läuft...') : (isSignUp ? 'Konto erstellen' : 'Anmelden')}
            </button>
          </div>

          <div className="text-center">
            <button
              type="button"
              onClick={toggleMode}
              className="text-sm text-blue-600 hover:text-blue-500 font-medium"
            >
              {isSignUp ? 'Bereits ein Konto? Anmelden' : 'Kein Konto? Konto erstellen'}
            </button>
          </div>

          {!isSignUp && (
            <div className="text-center">
              <p className="text-sm text-gray-600">
                Demo-Anmeldedaten: admin@praxis.de / password123
              </p>
            </div>
          )}
        </form>
      </div>
    </div>
  )
} 