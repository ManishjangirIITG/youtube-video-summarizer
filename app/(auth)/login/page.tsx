"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Github } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { nhost } from "@/lib/nhost"
import { useToast } from "@/hooks/use-toast"
import axios from "axios"
import { v4 as uuidv4 } from 'uuid';


export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      // Clear any existing session
      await nhost.auth.signOut()

      const { session, error } = await nhost.auth.signIn({
        email,
        password,
      })

      if (error) {
        toast({
          title: "Login failed",
          description: error.message,
        })
      } else if (session) {
        const expirationTime = new Date().getTime() + 24 * 60 * 60 * 1000 // 1 day in milliseconds
        localStorage.setItem('access_token', session.accessToken ?? '')
        localStorage.setItem('user_email', session.user.email ?? '')
        localStorage.setItem('session_expiration', expirationTime.toString())
        toast({
          title: "Login successful",
          description: "You have been logged in successfully.",
        })
        router.push('/dashboard')
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleGithubLogin = async () => {
    try {
      const { session, error } = await nhost.auth.signIn({
        provider: 'github'
      })

      // console.log('GitHub Session:', session) // Debugging statement
      // console.log('GitHub Error:', error) // Debugging statement

      if (error) {
        console.log('first if in the github login tab')
        console.log(error)
        toast({
          title: "GitHub Login failed",
          description: error.message,
          // status: "error",
        })
      } else if (session) {
        localStorage.setItem('access_token', session.accessToken)
        // localStorage.setItem('user_email', session.user.email)
        console.log('Token saved to localStorage:', session.accessToken)
        toast({
          title: "Login successful",
          description: "You have been logged in successfully.",
          // status: "success",
        })
        router.push('/dashboard')
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      })
    }
  }

  const handleGoogleLogin = async () => {
    try {
      const { session, error } = await nhost.auth.signIn({
        provider: 'google'
      })

      // console.log('Google Session:', session) // Debugging statement
      // console.log('Google Error:', error) // Debugging statement

      if (error) {
        // console.log('first if in the google login')
        // console.log(error)
        toast({
          title: "GitHub Login failed",
          description: error.message,
          // status: "error",
        })
      } else if (session) {
        localStorage.setItem('access_token', session.accessToken)
        // localStorage.setItem('user_email', session.user.email)
        console.log('Token saved to localStorage:', session.accessToken)
        toast({
          title: "Login successful",
          description: "You have been logged in successfully.",
          // status: "success",
        })
        router.push('/dashboard')
      }
    } catch (error: any) {
      // console.log('catch in the google login')
      // console.log(error)
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      })
    }
  }

  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">Welcome back</h1>
          <p className="text-sm text-muted-foreground">
            Enter your email to sign in to your account
          </p>
        </div>
        <div className="grid gap-6">
          <form onSubmit={handleLogin}>
            <div className="grid gap-2">
              <div className="grid gap-1">
                <Input
                  id="email"
                  placeholder="name@example.com"
                  type="email"
                  autoCapitalize="none"
                  autoComplete="email"
                  autoCorrect="off"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="grid gap-1">
                <Input
                  id="password"
                  placeholder="Password"
                  type="password"
                  autoCapitalize="none"
                  autoCorrect="off"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <Button disabled={loading}>
                {loading ? "Signing in..." : "Sign In"}
              </Button>
            </div>
          </form>
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Or continue with
              </span>
            </div>
          </div>
          <div className="grid gap-2">
            <Button variant="outline" className="gap-2" onClick={handleGithubLogin} disabled={loading}>
              <Github className="h-4 w-4" />
              Github
            </Button>
            <Button variant="outline" className="gap-2" onClick={handleGoogleLogin} disabled={loading}>
              <svg className="h-4 w-4" viewBox="0 0 24 24">
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
                <path d="M1 1h22v22H1z" fill="none" />
              </svg>
              Google
            </Button>
          </div>
        </div>
        <p className="px-8 text-center text-sm text-muted-foreground">
          <Link href="/register" className="hover:text-brand underline underline-offset-4">
            Don&apos;t have an account? Sign Up
          </Link>
        </p>
      </div>
    </div>
  )
}