"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Brain } from "lucide-react"
import { ModeToggle } from "@/components/mode-toggle"
import {nhost} from "@/lib/nhost"

// interface AuthContextType{
//   email : string | null
//   isLoggedIn : boolean
//   login : (email: string, accessToken: string,)=> void
//   logout: ()=>void
// }

// const AuthContext = createContext<AuthContextType | undefined>(undefined)

export default function Navbar() {
  const pathname = usePathname()
  const router = useRouter()
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [email, setEmail] = useState<string | null>(null)
  const [dropdownOpen, setDropdownOpen] = useState(false)

  useEffect(()=>{
    const checkAuth = async() => {
      const storedEmail = localStorage.getItem('user_email')
      const accessToken = localStorage.getItem('access_token')
      const sessionExpiration = localStorage.getItem('session_expiration')
      if(storedEmail && accessToken && sessionExpiration){
        const currentTime = new Date().getTime()
        if(currentTime > parseInt(sessionExpiration)){
          // Session has expired
          await nhost.auth.signOut()
          localStorage.removeItem('user_email')
          localStorage.removeItem('access_token')
          localStorage.removeItem('session_expiration')
          setEmail(null)
          setIsLoggedIn(false)
        }else{
          setEmail(storedEmail)
          setIsLoggedIn(true)
        }
      }else{
        const user = await nhost.auth.getUser()
        if(user){
          setEmail(user.email)
          localStorage.setItem('user_email',user.email)
          localStorage.setItem('access_token',user.accessToken)
          const expirationTime = new Date().getTime() + 12*60*60*1000
          localStorage.setItem('session_expiration',expirationTime.toString)
          setIsLoggedIn(true)
        }
      }
    }
    checkAuth()
  },[router])

  const handleLogout = async() =>{
    await nhost.auth.signOut()
    localStorage.removeItem('user_email')
    localStorage.removeItem('access_token')
    localStorage.removeItem('session_expiration')
    setEmail(null)
    setIsLoggedIn(false)
    router.push('/login')
  }

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen)
  }
  
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <Brain className="h-6 w-6" />
            <span className="font-bold">VideoSummarizer</span>
          </Link>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            <Link
              href="/features"
              className={pathname === "/features" ? "text-foreground" : "text-foreground/60 transition-colors hover:text-foreground"}
            >
              Features
            </Link>
            <Link
              href="/pricing"
              className={pathname === "/pricing" ? "text-foreground" : "text-foreground/60 transition-colors hover:text-foreground"}
            >
              Pricing
            </Link>
            <Link
              href="/about"
              className={pathname === "/about" ? "text-foreground" : "text-foreground/60 transition-colors hover:text-foreground"}
            >
              About
            </Link>
            {/* <Link
              href="/support-us"
              className={pathname === "/support-us" ? "text-foreground" : "text-foreground/60 transition-colors hover:text-foreground"}
            >
              Support Us
            </Link> */}
          </nav>
        </div>
        <div className="flex flex-1 items-center justify-end space-x-2">
          <ModeToggle />
          {isLoggedIn ? (
            <div className="relative">
              <button onClick={toggleDropdown} className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center ">
                  <span className="text-white font-bold">{email.charAt(0).toUpperCase()}</span>
                </div>
              </button>
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-lg">
                  <div className="p-2">
                    <p className="text-sm text-gray-700">{email}</p>
                    <Button variant="ghost" size="sm" onClick={handleLogout} className="w-full mt-2 text-gray-500">
                      Logout
                    </Button>
                  </div>
                </div>
              )}
            </div>
          ):(
            <Link href="/login">
              <Button variant="ghost" size="sm" >Login</Button>
            </Link>
          )}
          {/* <nav className="flex items-center space-x-2">
            <ModeToggle />
            <Link href="/login">
              <Button variant="ghost" size="sm">Login</Button>
            </Link>
            <Link href="/register">
              <Button size="sm">Sign up</Button>
            </Link>
          </nav> */}
        </div>
      </div>
    </header>
  )
}