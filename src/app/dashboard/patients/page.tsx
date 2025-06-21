'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { User } from '@supabase/supabase-js'

// Updated Patient interface for animals
interface AnimalPatient {
  id: string
  name: string
  birth_date: string
  animal_type: string
  notes: string
  user_id: string
  created_at: string
  updated_at: string
}

export default function PatientsPage() {
  const [patients, setPatients] = useState<AnimalPatient[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [showAddForm, setShowAddForm] = useState(false)
  const [showEditForm, setShowEditForm] = useState(false)
  const [editingPatient, setEditingPatient] = useState<AnimalPatient | null>(null)
  const [currentUser, setCurrentUser] = useState<User | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [newPatient, setNewPatient] = useState({
    name: '',
    birth_date: '',
    animal_type: '',
    notes: ''
  })
  const [editPatient, setEditPatient] = useState({
    name: '',
    birth_date: '',
    animal_type: '',
    notes: ''
  })

  useEffect(() => {
    getCurrentUser()
    loadPatients()
  }, [])

  const getCurrentUser = async () => {
    try {
      console.log('Getting current user...')
      const { data: { user }, error } = await supabase.auth.getUser()
      if (error) {
        console.error('Error getting user:', error)
        setError('Authentication error: ' + error.message)
      } else {
        console.log('User found:', user?.email)
        setCurrentUser(user)
      }
    } catch (error) {
      console.error('Error getting user:', error)
      setError('Authentication failed: ' + (error as Error).message)
    }
  }

  const loadPatients = async () => {
    try {
      console.log('Loading patients...')
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        console.error('No authenticated user')
        setError('Please log in to view patients')
        setIsLoading(false)
        return
      }

      console.log('User authenticated, loading patients for user:', user.id)
      const { data, error } = await supabase
        .from('patients')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
      
      if (error) {
        console.error('Error loading patients:', error)
        setError('Error loading patients: ' + error.message)
      } else {
        console.log('Patients loaded:', data?.length || 0)
        setPatients(data || [])
      }
    } catch (error) {
      console.error('Error loading patients:', error)
      setError('Error loading patients: ' + (error as Error).message)
    } finally {
      setIsLoading(false)
    }
  }

  const filteredPatients = patients.filter(patient =>
    patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.animal_type.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleAddPatient = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!currentUser) {
      alert('Please log in to add a patient')
      return
    }

    try {
      const { data, error } = await supabase
        .from('patients')
        .insert([{
          ...newPatient,
          user_id: currentUser.id
        }])
        .select()
      
      if (error) {
        console.error('Error creating patient:', error)
        alert('Error creating patient. Please try again.')
      } else {
        console.log('Patient created successfully:', data)
        setShowAddForm(false)
        setNewPatient({
          name: '',
          birth_date: '',
          animal_type: '',
          notes: ''
        })
        // Reload patients after adding
        loadPatients()
      }
    } catch (error) {
      console.error('Error creating patient:', error)
      alert('Error creating patient. Please try again.')
    }
  }

  const handleEditPatient = (patient: AnimalPatient) => {
    setEditingPatient(patient)
    setEditPatient({
      name: patient.name,
      birth_date: patient.birth_date,
      animal_type: patient.animal_type,
      notes: patient.notes || ''
    })
    setShowEditForm(true)
  }

  const handleUpdatePatient = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!editingPatient) {
      alert('No patient selected for editing')
      return
    }

    try {
      const { data, error } = await supabase
        .from('patients')
        .update({
          name: editPatient.name,
          birth_date: editPatient.birth_date,
          animal_type: editPatient.animal_type,
          notes: editPatient.notes
        })
        .eq('id', editingPatient.id)
        .select()
      
      if (error) {
        console.error('Error updating patient:', error)
        alert('Error updating patient. Please try again.')
      } else {
        console.log('Patient updated successfully:', data)
        setShowEditForm(false)
        setEditingPatient(null)
        setEditPatient({
          name: '',
          birth_date: '',
          animal_type: '',
          notes: ''
        })
        // Reload patients after updating
        loadPatients()
      }
    } catch (error) {
      console.error('Error updating patient:', error)
      alert('Error updating patient. Please try again.')
    }
  }

  const handleDeletePatient = async (id: string) => {
    if (confirm('Are you sure you want to delete this patient?')) {
      try {
        const { error } = await supabase
          .from('patients')
          .delete()
          .eq('id', id)
        
        if (error) {
          console.error('Error deleting patient:', error)
          alert('Error deleting patient. Please try again.')
        } else {
          console.log('Patient deleted successfully')
          // Reload patients after deleting
          loadPatients()
        }
      } catch (error) {
        console.error('Error deleting patient:', error)
        alert('Error deleting patient. Please try again.')
      }
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="space-y-6">
        <div className="bg-red-50 border border-red-200 rounded-md p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">Authentication Error</h3>
              <div className="mt-2 text-sm text-red-700">
                {error}
              </div>
              <div className="mt-4">
                <a href="/login" className="text-sm font-medium text-red-800 hover:text-red-900">
                  Go to Login →
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Patients</h1>
          <p className="text-gray-600">Manage your animal patients and their information</p>
        </div>
        <button
          onClick={() => setShowAddForm(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors w-full sm:w-auto"
        >
          Add New Patient
        </button>
      </div>

      {/* Search */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-2">
              Search Patients
            </label>
            <input
              type="text"
              id="search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by name or animal type..."
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="flex items-end">
            <span className="text-sm text-gray-600">
              {filteredPatients.length} of {patients.length} patients
            </span>
          </div>
        </div>
      </div>

      {/* Add Patient Form */}
      {showAddForm && (
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Add New Patient</h2>
          <form onSubmit={handleAddPatient} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Name *
                </label>
                <input
                  type="text"
                  id="name"
                  required
                  value={newPatient.name}
                  onChange={(e) => setNewPatient({...newPatient, name: e.target.value})}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-2"
                  placeholder="Patient's name"
                />
              </div>
              <div>
                <label htmlFor="birth_date" className="block text-sm font-medium text-gray-700">
                  Birth Date *
                </label>
                <input
                  type="date"
                  id="birth_date"
                  required
                  value={newPatient.birth_date}
                  onChange={(e) => setNewPatient({...newPatient, birth_date: e.target.value})}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-2"
                />
              </div>
              <div className="md:col-span-2">
                <label htmlFor="animal_type" className="block text-sm font-medium text-gray-700">
                  Animal Type *
                </label>
                <input
                  type="text"
                  id="animal_type"
                  required
                  value={newPatient.animal_type}
                  onChange={(e) => setNewPatient({...newPatient, animal_type: e.target.value})}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-2"
                  placeholder="e.g., Dog, Cat, Horse, Bird"
                />
              </div>
            </div>
            <div>
              <label htmlFor="notes" className="block text-sm font-medium text-gray-700">
                Notes
              </label>
              <textarea
                id="notes"
                rows={3}
                value={newPatient.notes}
                onChange={(e) => setNewPatient({...newPatient, notes: e.target.value})}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-2"
                placeholder="Additional notes about the patient..."
              />
            </div>
            <div className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-3">
              <button
                type="button"
                onClick={() => setShowAddForm(false)}
                className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 w-full sm:w-auto"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 w-full sm:w-auto"
              >
                Add Patient
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Edit Patient Form */}
      {showEditForm && editingPatient && (
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Edit Patient: {editingPatient.name}</h2>
          <form onSubmit={handleUpdatePatient} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="edit-name" className="block text-sm font-medium text-gray-700">
                  Name *
                </label>
                <input
                  type="text"
                  id="edit-name"
                  required
                  value={editPatient.name}
                  onChange={(e) => setEditPatient({...editPatient, name: e.target.value})}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-2"
                  placeholder="Patient's name"
                />
              </div>
              <div>
                <label htmlFor="edit-birth_date" className="block text-sm font-medium text-gray-700">
                  Birth Date *
                </label>
                <input
                  type="date"
                  id="edit-birth_date"
                  required
                  value={editPatient.birth_date}
                  onChange={(e) => setEditPatient({...editPatient, birth_date: e.target.value})}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-2"
                />
              </div>
              <div className="md:col-span-2">
                <label htmlFor="edit-animal_type" className="block text-sm font-medium text-gray-700">
                  Animal Type *
                </label>
                <input
                  type="text"
                  id="edit-animal_type"
                  required
                  value={editPatient.animal_type}
                  onChange={(e) => setEditPatient({...editPatient, animal_type: e.target.value})}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-2"
                  placeholder="e.g., Dog, Cat, Horse, Bird"
                />
              </div>
            </div>
            <div>
              <label htmlFor="edit-notes" className="block text-sm font-medium text-gray-700">
                Notes
              </label>
              <textarea
                id="edit-notes"
                rows={3}
                value={editPatient.notes}
                onChange={(e) => setEditPatient({...editPatient, notes: e.target.value})}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-2"
                placeholder="Additional notes about the patient..."
              />
            </div>
            <div className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-3">
              <button
                type="button"
                onClick={() => {
                  setShowEditForm(false)
                  setEditingPatient(null)
                  setEditPatient({
                    name: '',
                    birth_date: '',
                    animal_type: '',
                    notes: ''
                  })
                }}
                className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 w-full sm:w-auto"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 w-full sm:w-auto"
              >
                Update Patient
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Patients Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Animal Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Birth Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Notes
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Created
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredPatients.map((patient) => (
                <tr key={patient.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{patient.name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{patient.animal_type}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {new Date(patient.birth_date).toLocaleDateString()}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900 max-w-xs truncate" title={patient.notes}>
                      {patient.notes || '-'}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">
                      {new Date(patient.created_at).toLocaleDateString()}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end space-x-2">
                      <button
                        onClick={() => handleEditPatient(patient)}
                        className="text-blue-600 hover:text-blue-900 px-2 py-1 rounded hover:bg-blue-50"
                        title="Edit"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </button>
                      <button
                        onClick={() => handleDeletePatient(patient.id)}
                        className="text-red-600 hover:text-red-900 px-2 py-1 rounded hover:bg-red-50"
                        title="Delete"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {filteredPatients.length === 0 && (
          <div className="text-center py-12">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-gray-900">No patients found</h3>
            <p className="mt-1 text-sm text-gray-500">
              {searchTerm ? 'Try a different search term.' : 'Add your first patient to get started.'}
            </p>
          </div>
        )}
      </div>
    </div>
  )
} 