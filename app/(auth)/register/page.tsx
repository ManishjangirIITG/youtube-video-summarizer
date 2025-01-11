"use client"

import { Input } from "@/components/ui/input"
import { Github } from "lucide-react"
import Link from "next/link"
import axios from "axios"
import { useState, useEffect } from "react"
import { nhost } from "@/lib/nhost"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"

export default function RegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  // Clear session data from local storage
  const clearSession = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('user_email');
    localStorage.removeItem('session_expiration');
  };

  useEffect(() => {
    // Check for active session on component mount
    const checkSession = async () => {
      const session = await nhost.auth.getSession();
      if (session) {
        router.push('/dashboard');
      }
    };
    checkSession();
  }, [router]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    try {
      // SignUp by nhost
      const { session, error } = await nhost.auth.signUp({ email, password });

      if (error) {
        toast({
          title: "Registration failed",
          description: error.message,
        });
      } else {
        // Clear existing session data
        clearSession();
        // Assuming session is not returned by signUp, set dummy data or handle accordingly
        // If signUp returns a session, use it to set local storage
        // For now, redirect to login or handle as needed
        toast({
          title: "Registration successful",
          description: "Please log in.",
        });
        router.push('/login');
      }
    } catch (error: any) {
      console.error('Sign up error:', error);
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  // Function to handle Google Signup
  const signupWithGoogle = async () => {
    try {
      const { session, error } = await nhost.auth.signIn({ provider: 'google' });
      if (error) {
        console.error('Google sign-in error:', error);
        toast({
          title: "Google Sign-Up failed",
          description: error.message,
          variant: "destructive",
        });
      } else {
        clearSession();
        const expirationTime = new Date().getTime() + 12 * 60 * 60 * 1000;
        if (session) {
          localStorage.setItem('access_token', session.accessToken ?? '');
          localStorage.setItem('user_email', session.user.email ?? '');
          localStorage.setItem('session_expiration', expirationTime.toString());
          router.push('/dashboard');
        }
      }
    } catch (error) {
      console.error('Error during Google sign-up:', error);
    }
  };

  // Function to handle GitHub Signup
  const signupWithGithub = async () => {
    try {
      const { session, error } = await nhost.auth.signIn({ provider: 'github' });
      if (error) {
        console.error('GitHub sign-in error:', error);
        toast({
          title: "GitHub Sign-Up failed",
          description: error.message,
          variant: "destructive",
        });
      } else {
        clearSession();
        const expirationTime = new Date().getTime() + 12 * 60 * 60 * 1000;
        if (session) {
          localStorage.setItem('access_token', session.accessToken ?? '');
          localStorage.setItem('user_email', session.user.email ?? '');
          localStorage.setItem('session_expiration', expirationTime.toString());
          router.push('/dashboard');
        }
      }
    } catch (error) {
      console.error('Error during GitHub sign-up:', error);
    }
  };

  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">Create Account</h1>
          <p className="text-sm text-muted-foreground">
            Enter your email to sign up to your account
          </p>
        </div>
        <div className="grid gap-6">
          <form onSubmit={handleSubmit}>
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
                {loading ? "Signing Up..." : "Sign Up"}
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
            <Button variant="outline" className="gap-2" onClick={signupWithGithub} disabled={loading}>
              <Github className="h-4 w-4" />
              Github
            </Button>
            <Button variant="outline" className="gap-2" onClick={signupWithGoogle} disabled={loading}>
              <svg className="h-4 w-4" viewBox="0 0 24 24">
                {/* Google icon SVG */}
              </svg>
              Google
            </Button>
          </div>
        </div>
        <p className="px-8 text-center text-sm text-muted-foreground">
          <Link href="/login" className="hover:text-brand underline underline-offset-4">
            Already have an account? Sign In
          </Link>
        </p>
      </div>
    </div>
  )
}