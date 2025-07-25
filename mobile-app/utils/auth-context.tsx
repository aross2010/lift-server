import { useRouter } from 'expo-router'
import React, { createContext, ReactNode, useState } from 'react'

type AuthState = {
  isLoggedIn: boolean
  logIn: (data: { email: string; password: string }) => void
  logOut: () => void
}

export const AuthContext = createContext<AuthState>({
  isLoggedIn: false,
  logIn: (data: { email: string; password: string }) => {},
  logOut: () => {},
})

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const router = useRouter()

  const logIn = (data: { email: string; password: string }) => {
    console.log('Logging in with:', data)
    setIsLoggedIn(true)
    router.replace('/dashboard')
  }
  const logOut = () => {
    console.log('Logging out')
    setIsLoggedIn(false)
    router.replace('/')
  }

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        logIn,
        logOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
