import { supabase } from './supabase'

// Patient types
export interface Patient {
  id: string
  first_name: string
  last_name: string
  date_of_birth: string
  email: string
  phone: string
  address: string
  insurance_number: string
  created_at: string
  updated_at: string
}

export interface Appointment {
  id: string
  patient_id: string
  title: string
  description: string
  start_time: string
  end_time: string
  status: 'scheduled' | 'confirmed' | 'cancelled' | 'completed'
  created_at: string
  patients?: {
    first_name: string
    last_name: string
  }
}

// Patient operations
export const getPatients = async () => {
  try {
    const { data, error } = await supabase
      .from('patients')
      .select('*')
      .order('created_at', { ascending: false })
    
    return { data: data || [], error }
  } catch (err) {
    console.error('Error in getPatients:', err)
    return { data: [], error: err as Error }
  }
}

export const getPatient = async (id: string) => {
  try {
    const { data, error } = await supabase
      .from('patients')
      .select('*')
      .eq('id', id)
      .single()
    
    return { data, error }
  } catch (err) {
    console.error('Error in getPatient:', err)
    return { data: null, error: err as Error }
  }
}

export const createPatient = async (patient: Omit<Patient, 'id' | 'created_at' | 'updated_at'>) => {
  try {
    const { data, error } = await supabase
      .from('patients')
      .insert([patient])
      .select()
    
    return { data, error }
  } catch (err) {
    console.error('Error in createPatient:', err)
    return { data: null, error: err as Error }
  }
}

export const updatePatient = async (id: string, updates: Partial<Patient>) => {
  try {
    const { data, error } = await supabase
      .from('patients')
      .update(updates)
      .eq('id', id)
      .select()
    
    return { data, error }
  } catch (err) {
    console.error('Error in updatePatient:', err)
    return { data: null, error: err as Error }
  }
}

export const deletePatient = async (id: string) => {
  try {
    const { error } = await supabase
      .from('patients')
      .delete()
      .eq('id', id)
    
    return { error }
  } catch (err) {
    console.error('Error in deletePatient:', err)
    return { error: err as Error }
  }
}

// Appointment operations
export const getAppointments = async () => {
  try {
    const { data, error } = await supabase
      .from('appointments')
      .select(`
        *,
        patients (
          first_name,
          last_name
        )
      `)
      .order('start_time', { ascending: true })
    
    return { data: data || [], error }
  } catch (err) {
    console.error('Error in getAppointments:', err)
    return { data: [], error: err as Error }
  }
}

export const createAppointment = async (appointment: Omit<Appointment, 'id' | 'created_at'>) => {
  try {
    const { data, error } = await supabase
      .from('appointments')
      .insert([appointment])
      .select()
    
    return { data, error }
  } catch (err) {
    console.error('Error in createAppointment:', err)
    return { data: null, error: err as Error }
  }
} 