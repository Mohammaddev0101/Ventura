'use client'
import { createContext, useContext, useState, useEffect } from 'react'
import axios from 'axios'
import { useSession, signIn, signOut } from 'next-auth/react'

const AuthContext = createContext()

// Shared API base URL for the entire frontend
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://ventura-qfwy.onrender.com' //http://localhost:5000

// Set axios default base URL once (affects all axios calls if not overridden)
axios.defaults.baseURL = API_BASE_URL

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [isAdmin, setIsAdmin] = useState(false)
  const { data: session, status } = useSession()

  useEffect(() => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
      fetchUser()
    } else if (status === 'authenticated' && session?.user) {
      // Map next-auth session to app user
      setUser({
        id: session.user.id,
        name: session.user.name,
        email: session.user.email,
        avatar: session.user.image,
        role: 'user'
      })
      setIsAdmin(false)
      setLoading(false)
    } else if (status === 'unauthenticated') {
      setLoading(false)
    }
  }, [status, session])

  const fetchUser = async () => {
    try {
      const response = await axios.get('/api/auth/me')
      setUser(response.data.user)
      setIsAdmin(response.data.user?.role === 'admin')
    } catch (error) {
      localStorage.removeItem('token')
      delete axios.defaults.headers.common['Authorization']
      setIsAdmin(false)
    } finally {
      setLoading(false)
    }
  }

  const login = async (email, password) => {
    try {
      const response = await axios.post('/api/auth/login', {
        email,
        password
      })
      
      const { token, user } = response.data
      localStorage.setItem('token', token)
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
      setUser(user)
      setIsAdmin(user?.role === 'admin')
      
      return { success: true }
    } catch (error) {
      return { 
        success: false, 
        message: error.response?.data?.message || 'خطا در ورود' 
      }
    }
  }

  const register = async (userData) => {
    try {
      const response = await axios.post('/api/auth/register', userData)
      
      const { token, user } = response.data
      localStorage.setItem('token', token)
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
      setUser(user)
      setIsAdmin(user?.role === 'admin')
      
      return { success: true }
    } catch (error) {
      return { 
        success: false, 
        message: error.response?.data?.message || 'خطا در ثبت نام' 
      }
    }
  }

  const logout = () => {
    localStorage.removeItem('token')
    delete axios.defaults.headers.common['Authorization']
    setUser(null)
    setIsAdmin(false)
    // try { signOut({ redirect: false }) } catch {}
  }

  return (
    <AuthContext.Provider value={{
      user,
      loading,
      isAdmin,
      login,
      register,
      logout
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}