'use client'

import { useState } from 'react'

interface JournalEntry {
  id: string
  date: string
  patientName: string
  treatment: string
  notes: string
  doctor: string
  time: string
}

export default function JournalPage() {
  const [entries, setEntries] = useState<JournalEntry[]>([
    {
      id: '1',
      date: '2024-01-15',
      patientName: 'Max Mustermann',
      treatment: 'Routineuntersuchung',
      notes: 'Patient zeigt keine Auffälligkeiten. Blutdruck normal.',
      doctor: 'Dr. Weber',
      time: '09:00'
    },
    {
      id: '2',
      date: '2024-01-15',
      patientName: 'Anna Schmidt',
      treatment: 'Akute Behandlung',
      notes: 'Patient klagt über starke Kopfschmerzen. Schmerzmittel verordnet.',
      doctor: 'Dr. Weber',
      time: '10:30'
    }
  ])

  const [newEntry, setNewEntry] = useState({
    patientName: '',
    treatment: '',
    notes: '',
    doctor: 'Dr. Weber'
  })

  const [showAddForm, setShowAddForm] = useState(false)

  const handleAddEntry = (e: React.FormEvent) => {
    e.preventDefault()
    const entry: JournalEntry = {
      id: Date.now().toString(),
      date: new Date().toISOString().split('T')[0],
      time: new Date().toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' }),
      ...newEntry
    }
    setEntries([entry, ...entries])
    setNewEntry({ patientName: '', treatment: '', notes: '', doctor: 'Dr. Weber' })
    setShowAddForm(false)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Tagesprotokoll</h1>
          <p className="text-gray-600">Dokumentieren Sie Behandlungen und Notizen</p>
        </div>
        <button
          onClick={() => setShowAddForm(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
        >
          Neuen Eintrag
        </button>
      </div>

      {/* Add Entry Form */}
      {showAddForm && (
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Neuen Eintrag hinzufügen</h2>
          <form onSubmit={handleAddEntry} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="patientName" className="block text-sm font-medium text-gray-700">
                  Patient *
                </label>
                <input
                  type="text"
                  id="patientName"
                  required
                  value={newEntry.patientName}
                  onChange={(e) => setNewEntry({...newEntry, patientName: e.target.value})}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-2"
                />
              </div>
              <div>
                <label htmlFor="treatment" className="block text-sm font-medium text-gray-700">
                  Behandlung *
                </label>
                <input
                  type="text"
                  id="treatment"
                  required
                  value={newEntry.treatment}
                  onChange={(e) => setNewEntry({...newEntry, treatment: e.target.value})}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-2"
                />
              </div>
            </div>
            <div>
              <label htmlFor="notes" className="block text-sm font-medium text-gray-700">
                Notizen
              </label>
              <textarea
                id="notes"
                rows={4}
                value={newEntry.notes}
                onChange={(e) => setNewEntry({...newEntry, notes: e.target.value})}
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
                Eintrag hinzufügen
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Journal Entries */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-900">Heutige Einträge</h2>
        </div>
        <div className="p-6">
          {entries.length > 0 ? (
            <div className="space-y-6">
              {entries.map((entry) => (
                <div key={entry.id} className="border-b border-gray-200 pb-6 last:border-b-0">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-lg font-medium text-gray-900">{entry.patientName}</h3>
                        <span className="text-sm text-gray-500">{entry.time}</span>
                        <span className="text-sm text-gray-500">{entry.doctor}</span>
                      </div>
                      <p className="text-sm font-medium text-blue-600 mb-2">{entry.treatment}</p>
                      <p className="text-sm text-gray-600">{entry.notes}</p>
                    </div>
                    <div className="flex space-x-2">
                      <button className="p-2 text-gray-400 hover:text-gray-600">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </button>
                      <button className="p-2 text-gray-400 hover:text-red-600">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center py-8">Noch keine Einträge für heute</p>
          )}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Schnellaktionen</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="flex items-center justify-center p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
            <svg className="w-6 h-6 text-blue-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <span className="text-sm font-medium text-gray-900">Protokoll exportieren</span>
          </button>
          
          <button className="flex items-center justify-center p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors">
            <svg className="w-6 h-6 text-green-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span className="text-sm font-medium text-gray-900">Datum wählen</span>
          </button>
          
          <button className="flex items-center justify-center p-4 bg-yellow-50 rounded-lg hover:bg-yellow-100 transition-colors">
            <svg className="w-6 h-6 text-yellow-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <span className="text-sm font-medium text-gray-900">Nach Einträgen suchen</span>
          </button>
        </div>
      </div>
    </div>
  )
} 