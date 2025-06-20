'use client'

import { useState, useEffect } from 'react'

interface WaitingPatient {
  id: string
  name: string
  appointmentTime: string
  status: 'waiting' | 'in-treatment' | 'completed'
  priority: 'normal' | 'urgent'
  notes: string
}

export default function WaitingRoomPage() {
  const [waitingPatients, setWaitingPatients] = useState<WaitingPatient[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate loading waiting room data
    setTimeout(() => {
      setWaitingPatients([
        {
          id: '1',
          name: 'Max Mustermann',
          appointmentTime: '09:00',
          status: 'waiting',
          priority: 'normal',
          notes: 'Routineuntersuchung'
        },
        {
          id: '2',
          name: 'Anna Schmidt',
          appointmentTime: '09:30',
          status: 'in-treatment',
          priority: 'urgent',
          notes: 'Akute Schmerzen'
        },
        {
          id: '3',
          name: 'Peter Müller',
          appointmentTime: '10:00',
          status: 'waiting',
          priority: 'normal',
          notes: 'Nachsorge'
        }
      ])
      setIsLoading(false)
    }, 1000)
  }, [])

  const updatePatientStatus = (id: string, status: WaitingPatient['status']) => {
    setWaitingPatients(prev => 
      prev.map(patient => 
        patient.id === id ? { ...patient, status } : patient
      )
    )
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'waiting':
        return 'bg-yellow-100 text-yellow-800'
      case 'in-treatment':
        return 'bg-blue-100 text-blue-800'
      case 'completed':
        return 'bg-green-100 text-green-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getPriorityColor = (priority: string) => {
    return priority === 'urgent' ? 'bg-red-100 text-red-800' : 'bg-gray-100 text-gray-800'
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
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Wartezimmer</h1>
        <p className="text-gray-600">Überwachen Sie den Praxisablauf und wartende Patienten</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Wartend</p>
              <p className="text-2xl font-bold text-gray-900">
                {waitingPatients.filter(p => p.status === 'waiting').length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">In Behandlung</p>
              <p className="text-2xl font-bold text-gray-900">
                {waitingPatients.filter(p => p.status === 'in-treatment').length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Abgeschlossen</p>
              <p className="text-2xl font-bold text-gray-900">
                {waitingPatients.filter(p => p.status === 'completed').length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-2 bg-red-100 rounded-lg">
              <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Dringend</p>
              <p className="text-2xl font-bold text-gray-900">
                {waitingPatients.filter(p => p.priority === 'urgent').length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Waiting List */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-900">Warteliste</h2>
        </div>
        <div className="p-6">
          {waitingPatients.length > 0 ? (
            <div className="space-y-4">
              {waitingPatients.map((patient) => (
                <div key={patient.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <span className="text-sm font-medium text-blue-600">
                          {patient.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-900">{patient.name}</h3>
                      <p className="text-sm text-gray-500">Termin: {patient.appointmentTime}</p>
                      <p className="text-sm text-gray-500">{patient.notes}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(patient.status)}`}>
                      {patient.status === 'waiting' ? 'Wartend' :
                       patient.status === 'in-treatment' ? 'In Behandlung' : 'Abgeschlossen'}
                    </span>
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getPriorityColor(patient.priority)}`}>
                      {patient.priority === 'urgent' ? 'Dringend' : 'Normal'}
                    </span>
                    <div className="flex space-x-2">
                      {patient.status === 'waiting' && (
                        <button
                          onClick={() => updatePatientStatus(patient.id, 'in-treatment')}
                          className="px-3 py-1 bg-blue-600 text-white text-xs rounded hover:bg-blue-700"
                        >
                          Behandlung starten
                        </button>
                      )}
                      {patient.status === 'in-treatment' && (
                        <button
                          onClick={() => updatePatientStatus(patient.id, 'completed')}
                          className="px-3 py-1 bg-green-600 text-white text-xs rounded hover:bg-green-700"
                        >
                          Abschließen
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center py-8">Keine Patienten im Wartezimmer</p>
          )}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Schnellaktionen</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="flex items-center justify-center p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
            <svg className="w-6 h-6 text-blue-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            <span className="text-sm font-medium text-gray-900">Patient hinzufügen</span>
          </button>
          
          <button className="flex items-center justify-center p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors">
            <svg className="w-6 h-6 text-green-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-sm font-medium text-gray-900">Nächsten aufrufen</span>
          </button>
          
          <button className="flex items-center justify-center p-4 bg-yellow-50 rounded-lg hover:bg-yellow-100 transition-colors">
            <svg className="w-6 h-6 text-yellow-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span className="text-sm font-medium text-gray-900">Termin verschieben</span>
          </button>
        </div>
      </div>
    </div>
  )
} 