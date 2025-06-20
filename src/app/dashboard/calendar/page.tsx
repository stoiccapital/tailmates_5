'use client'

import { useState, useEffect } from 'react'
import { getAppointments, Appointment } from '@/lib/db'
import Calendar from '@/components/Calendar'

export default function CalendarPage() {
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null)

  useEffect(() => {
    loadAppointments()
  }, [])

  const loadAppointments = async () => {
    try {
      const { data, error } = await getAppointments()
      if (error) {
        console.error('Error loading appointments:', error)
      } else {
        setAppointments(data || [])
      }
    } catch (error) {
      console.error('Error loading appointments:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleDateSelect = () => {
    setSelectedAppointment(null)
  }

  const handleAppointmentSelect = (appointment: Appointment) => {
    setSelectedAppointment(appointment)
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
        <h1 className="text-2xl font-bold text-gray-900">Kalender</h1>
        <p className="text-gray-600">Verwalten Sie Ihre Termine und den Praxisablauf</p>
      </div>

      {/* Calendar Component */}
      <Calendar
        appointments={appointments}
        onDateSelect={handleDateSelect}
        onAppointmentSelect={handleAppointmentSelect}
      />

      {/* Selected Appointment Details */}
      {selectedAppointment && (
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Termin Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Titel</label>
              <p className="mt-1 text-sm text-gray-900">{selectedAppointment.title}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Status</label>
              <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full mt-1 ${
                selectedAppointment.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                selectedAppointment.status === 'scheduled' ? 'bg-blue-100 text-blue-800' :
                selectedAppointment.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                'bg-gray-100 text-gray-800'
              }`}>
                {selectedAppointment.status}
              </span>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Startzeit</label>
              <p className="mt-1 text-sm text-gray-900">
                {new Date(selectedAppointment.start_time).toLocaleString('de-DE')}
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Endzeit</label>
              <p className="mt-1 text-sm text-gray-900">
                {new Date(selectedAppointment.end_time).toLocaleString('de-DE')}
              </p>
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700">Beschreibung</label>
              <p className="mt-1 text-sm text-gray-900">{selectedAppointment.description}</p>
            </div>
          </div>
          <div className="mt-6 flex space-x-3">
            <button className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700">
              Bearbeiten
            </button>
            <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md text-sm font-medium hover:bg-gray-50">
              Stornieren
            </button>
          </div>
        </div>
      )}

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Schnellaktionen</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="flex items-center justify-center p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
            <svg className="w-6 h-6 text-blue-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            <span className="text-sm font-medium text-gray-900">Neuen Termin</span>
          </button>
          
          <button className="flex items-center justify-center p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors">
            <svg className="w-6 h-6 text-green-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span className="text-sm font-medium text-gray-900">Termin bestätigen</span>
          </button>
          
          <button className="flex items-center justify-center p-4 bg-yellow-50 rounded-lg hover:bg-yellow-100 transition-colors">
            <svg className="w-6 h-6 text-yellow-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-sm font-medium text-gray-900">Erinnerungen</span>
          </button>
        </div>
      </div>
    </div>
  )
} 