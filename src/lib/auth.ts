import { supabase } from './supabase'

export const signIn = async (email: string, password: string) => {
  try {
    // Check if Supabase is properly configured
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      throw new Error('Supabase configuration is missing. Please check your environment variables.')
    }

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    return { data, error }
  } catch (err) {
    console.error('Error in signIn:', err)
    return { data: null, error: err as Error }
  }
}

export const signUp = async (email: string, password: string) => {
  try {
    // Check if Supabase is properly configured
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      throw new Error('Supabase configuration is missing. Please check your environment variables.')
    }

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    })
    return { data, error }
  } catch (err) {
    console.error('Error in signUp:', err)
    return { data: null, error: err as Error }
  }
}

export const signOut = async () => {
  try {
    const { error } = await supabase.auth.signOut()
    return { error }
  } catch (err) {
    console.error('Error in signOut:', err)
    return { error: err as Error }
  }
}

export const getCurrentUser = async () => {
  try {
    const { data: { user } } = await supabase.auth.getUser()
    return user
  } catch (err) {
    console.error('Error in getCurrentUser:', err)
    return null
  }
}

export const getSession = async () => {
  try {
    const { data: { session } } = await supabase.auth.getSession()
    return session
  } catch (err) {
    console.error('Error in getSession:', err)
    return null
  }
} 