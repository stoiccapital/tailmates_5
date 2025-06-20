'use client'

import { useState, useEffect } from 'react'
import { Appointment } from '@/lib/db'

interface CalendarProps {
  appointments?: Appointment[]
  onDateSelect?: (date: Date) => void
  onAppointmentSelect?: (appointment: Appointment) => void
}

export default function Calendar({ appointments = [], onDateSelect, onAppointmentSelect }: CalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const daysInMonth = lastDay.getDate()
    const startingDayOfWeek = firstDay.getDay()

    const days = []
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null)
    }

    // Add all days of the month
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(year, month, i))
    }

    return days
  }

  const getAppointmentsForDate = (date: Date) => {
    return appointments.filter(appointment => {
      const appointmentDate = new Date(appointment.start_time)
      return appointmentDate.toDateString() === date.toDateString()
    })
  }

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString('de-DE', {
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800'
      case 'scheduled':
        return 'bg-blue-100 text-blue-800'
      case 'cancelled':
        return 'bg-red-100 text-red-800'
      case 'completed':
        return 'bg-gray-100 text-gray-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const handleDateClick = (date: Date) => {
    setSelectedDate(date)
    onDateSelect?.(date)
  }

  const days = getDaysInMonth(currentDate)
  const monthNames = [
    'Januar', 'Februar', 'März', 'April', 'Mai', 'Juni',
    'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'
  ]

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      {/* Calendar Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900">
          {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
        </h2>
        <div className="flex space-x-2">
          <button
            onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1))}
            className="p-2 text-gray-600 hover:bg-gray-100 rounded-md"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={() => setCurrentDate(new Date())}
            className="px-3 py-2 text-sm text-blue-600 hover:bg-blue-50 rounded-md"
          >
            Heute
          </button>
          <button
            onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1))}
            className="p-2 text-gray-600 hover:bg-gray-100 rounded-md"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-1">
        {/* Day headers */}
        {['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'].map(day => (
          <div key={day} className="p-2 text-center text-sm font-medium text-gray-500">
            {day}
          </div>
        ))}

        {/* Calendar days */}
        {days.map((day, index) => {
          if (!day) {
            return <div key={index} className="p-2" />
          }

          const dayAppointments = getAppointmentsForDate(day)
          const isToday = day.toDateString() === new Date().toDateString()
          const isSelected = selectedDate && day.toDateString() === selectedDate.toDateString()

          return (
            <div
              key={index}
              onClick={() => handleDateClick(day)}
              className={`p-2 min-h-[80px] border border-gray-200 cursor-pointer hover:bg-gray-50 ${
                isToday ? 'bg-blue-50 border-blue-300' : ''
              } ${isSelected ? 'bg-blue-100 border-blue-400' : ''}`}
            >
              <div className="text-sm font-medium text-gray-900 mb-1">
                {day.getDate()}
              </div>
              
              {/* Appointments for this day */}
              <div className="space-y-1">
                {dayAppointments.slice(0, 2).map(appointment => (
                  <div
                    key={appointment.id}
                    onClick={(e) => {
                      e.stopPropagation()
                      onAppointmentSelect?.(appointment)
                    }}
                    className={`text-xs p-1 rounded cursor-pointer ${getStatusColor(appointment.status)}`}
                    title={`${appointment.title} - ${formatTime(appointment.start_time)}`}
                  >
                    <div className="font-medium truncate">{appointment.title}</div>
                    <div className="text-xs opacity-75">{formatTime(appointment.start_time)}</div>
                  </div>
                ))}
                {dayAppointments.length > 2 && (
                  <div className="text-xs text-gray-500 text-center">
                    +{dayAppointments.length - 2} weitere
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>

      {/* Selected Date Details */}
      {selectedDate && (
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <h3 className="font-medium text-gray-900 mb-2">
            Termine am {selectedDate.toLocaleDateString('de-DE')}
          </h3>
          <div className="space-y-2">
            {getAppointmentsForDate(selectedDate).map(appointment => (
              <div
                key={appointment.id}
                className="flex items-center justify-between p-2 bg-white rounded border"
              >
                <div>
                  <div className="font-medium">{appointment.title}</div>
                  <div className="text-sm text-gray-500">
                    {formatTime(appointment.start_time)} - {formatTime(appointment.end_time)}
                  </div>
                </div>
                <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(appointment.status)}`}>
                  {appointment.status}
                </span>
              </div>
            ))}
            {getAppointmentsForDate(selectedDate).length === 0 && (
              <p className="text-gray-500 text-sm">Keine Termine an diesem Tag</p>
            )}
          </div>
        </div>
      )}
    </div>
  )
} 