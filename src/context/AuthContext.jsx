/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState } from 'react'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [user, setUser] = useState(null)

  const login = (email, name) => {
    setIsLoggedIn(true)
    setUser({
      email,
      name: name || 'Boba Lover',
      favoriteTheme: 'Matcha Green',
      joinedDate: 'May 2026'
    })
  }

  const logout = () => {
    setIsLoggedIn(false)
    setUser(null)
  }

  const updateUser = (updatedDetails) => {
    setUser((prev) => (prev ? { ...prev, ...updatedDetails } : null))
  }

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, login, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used inside <AuthProvider>')
  return ctx
}
