import { createContext, useContext, useState } from 'react'

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  // userType: 'customer' | 'artist' | null
  const [userType, setUserType] = useState(null)

  const login = (userData, type) => {
    setUser(userData)
    setUserType(type)
  }

  const logout = () => {
    setUser(null)
    setUserType(null)
  }

  return (
    <AuthContext.Provider value={{ user, userType, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
