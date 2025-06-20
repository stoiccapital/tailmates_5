'use client'

import { useState, useEffect } from 'react'
import { getPatients, Patient } from '@/lib/db'
import PatientCard from '@/components/PatientCard'

export default function PatientsPage() {
  const [patients, setPatients] = useState<Patient[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [showAddForm, setShowAddForm] = useState(false)
  const [newPatient, setNewPatient] = useState({
    first_name: '',
    last_name: '',
    date_of_birth: '',
    email: '',
    phone: '',
    address: '',
    insurance_number: ''
  })

  useEffect(() => {
    loadPatients()
  }, [])

  const loadPatients = async () => {
    try {
      const { data, error } = await getPatients()
      if (error) {
        console.error('Error loading patients:', error)
      } else {
        setPatients(data || [])
      }
    } catch (error) {
      console.error('Error loading patients:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const filteredPatients = patients.filter(patient =>
    patient.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.email.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleAddPatient = async (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically call createPatient from db.ts
    console.log('Adding patient:', newPatient)
    setShowAddForm(false)
    setNewPatient({
      first_name: '',
      last_name: '',
      date_of_birth: '',
      email: '',
      phone: '',
      address: '',
      insurance_number: ''
    })
    // Reload patients after adding
    loadPatients()
  }

  const handleEditPatient = (patient: Patient) => {
    console.log('Editing patient:', patient)
    // Here you would typically open an edit modal or navigate to edit page
  }

  const handleDeletePatient = async (id: string) => {
    if (confirm('Sind Sie sicher, dass Sie diesen Patienten löschen möchten?')) {
      // Here you would typically call deletePatient from db.ts
      console.log('Deleting patient:', id)
      // Reload patients after deleting
      loadPatients()
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Patienten (Karteikarte)</h1>
          <p className="text-gray-600">Verwalten Sie Ihre Patienten und deren Daten</p>
        </div>
        <button
          onClick={() => setShowAddForm(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
        >
          Neuen Patienten hinzufügen
        </button>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-2">
              Patienten suchen
            </label>
            <input
              type="text"
              id="search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Name oder E-Mail eingeben..."
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="flex items-end">
            <span className="text-sm text-gray-600">
              {filteredPatients.length} von {patients.length} Patienten
            </span>
          </div>
        </div>
      </div>

      {/* Add Patient Form */}
      {showAddForm && (
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Neuen Patienten hinzufügen</h2>
          <form onSubmit={handleAddPatient} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="first_name" className="block text-sm font-medium text-gray-700">
                  Vorname *
                </label>
                <input
                  type="text"
                  id="first_name"
                  required
                  value={newPatient.first_name}
                  onChange={(e) => setNewPatient({...newPatient, first_name: e.target.value})}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-2"
                />
              </div>
              <div>
                <label htmlFor="last_name" className="block text-sm font-medium text-gray-700">
                  Nachname *
                </label>
                <input
                  type="text"
                  id="last_name"
                  required
                  value={newPatient.last_name}
                  onChange={(e) => setNewPatient({...newPatient, last_name: e.target.value})}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-2"
                />
              </div>
              <div>
                <label htmlFor="date_of_birth" className="block text-sm font-medium text-gray-700">
                  Geburtsdatum *
                </label>
                <input
                  type="date"
                  id="date_of_birth"
                  required
                  value={newPatient.date_of_birth}
                  onChange={(e) => setNewPatient({...newPatient, date_of_birth: e.target.value})}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-2"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  E-Mail *
                </label>
                <input
                  type="email"
                  id="email"
                  required
                  value={newPatient.email}
                  onChange={(e) => setNewPatient({...newPatient, email: e.target.value})}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-2"
                />
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                  Telefon
                </label>
                <input
                  type="tel"
                  id="phone"
                  value={newPatient.phone}
                  onChange={(e) => setNewPatient({...newPatient, phone: e.target.value})}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-2"
                />
              </div>
              <div>
                <label htmlFor="insurance_number" className="block text-sm font-medium text-gray-700">
                  Versicherungsnummer
                </label>
                <input
                  type="text"
                  id="insurance_number"
                  value={newPatient.insurance_number}
                  onChange={(e) => setNewPatient({...newPatient, insurance_number: e.target.value})}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-2"
                />
              </div>
            </div>
            <div>
              <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                Adresse
              </label>
              <textarea
                id="address"
                rows={3}
                value={newPatient.address}
                onChange={(e) => setNewPatient({...newPatient, address: e.target.value})}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-2"
              />
            </div>
            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => setShowAddForm(false)}
                className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Abbrechen
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700"
              >
                Patienten hinzufügen
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Patients Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPatients.map((patient) => (
          <PatientCard
            key={patient.id}
            patient={patient}
            onEdit={handleEditPatient}
            onDelete={handleDeletePatient}
          />
        ))}
      </div>

      {filteredPatients.length === 0 && (
        <div className="text-center py-12">
          <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
          <h3 className="mt-2 text-sm font-medium text-gray-900">Keine Patienten gefunden</h3>
          <p className="mt-1 text-sm text-gray-500">
            {searchTerm ? 'Versuchen Sie einen anderen Suchbegriff.' : 'Fügen Sie Ihren ersten Patienten hinzu.'}
          </p>
        </div>
      )}
    </div>
  )
} 