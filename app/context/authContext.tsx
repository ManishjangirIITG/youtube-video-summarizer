import { createContext, useContext, useState, useEffect, ReactNode } from "react"
import { nhost } from "@/lib/nhost"

interface AuthContextType {
  email: string | null
  isLoggedIn: boolean
  login: (email: string, accessToken: string) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [email, setEmail] = useState<string | null>(null)
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    const checkAuth = async () => {
      const storedEmail = localStorage.getItem('user_email')
      const accessToken = localStorage.getItem('access_token')
      const sessionExpiration = localStorage.getItem('session_expiration')

      if (storedEmail && accessToken && sessionExpiration) {
        const currentTime = new Date().getTime()
        if (currentTime > parseInt(sessionExpiration)) {
          // Session has expired
          await nhost.auth.signOut()
          localStorage.removeItem('user_email')
          localStorage.removeItem('access_token')
          localStorage.removeItem('session_expiration')
          setEmail(null)
          setIsLoggedIn(false)
        } else {
          setEmail(storedEmail)
          setIsLoggedIn(true)
        }
      } else {
        const user = await nhost.auth.getUser()
        if (user) {
          setEmail(user.email)
          localStorage.setItem('user_email', user.email)
          localStorage.setItem('access_token', user.accessToken)
          const expirationTime = new Date().getTime() + 24 * 60 * 60 * 1000 // 1 day in milliseconds
          localStorage.setItem('session_expiration', expirationTime.toString())
          setIsLoggedIn(true)
        }
      }
    }
    checkAuth()
  }, [])

  const login = (email: string, accessToken: string) => {
    setEmail(email)
    setIsLoggedIn(true)
    localStorage.setItem('user_email', email)
    localStorage.setItem('access_token', accessToken)
    const expirationTime = new Date().getTime() + 24 * 60 * 60 * 1000 // 1 day in milliseconds
    localStorage.setItem('session_expiration', expirationTime.toString())
  }

  const logout = async () => {
    await nhost.auth.signOut()
    localStorage.removeItem('user_email')
    localStorage.removeItem('access_token')
    localStorage.removeItem('session_expiration')
    setEmail(null)
    setIsLoggedIn(false)
  }

  return (
    <AuthContext.Provider value={{ email, isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}