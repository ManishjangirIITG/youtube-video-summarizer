"use client"

// import { Input } from "@/components/ui/input"
// import { Github } from "lucide-react"
// import Link from "next/link"
// import axios from "axios"
// import { useState } from "react"
// import { nhost } from "@/lib/nhost"
// import { Button } from "@/components/ui/button"
// import { useToast } from "@/hooks/use-toast"
// import { useRouter } from "next/navigation"

// export default function RegisterPage() {
//   const [email, setEmail] = useState("")
//   const [password, setPassword] = useState("")
//   const [loading, setLoading] = useState(false)
//   const router = useRouter()
//   const { toast } = useToast()

//   const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
//     // Clear any existing session
//     await nhost.auth.signOut()
//     event.preventDefault()
//     setLoading(true)
    

//     try {
//       // signUp by nhost
//       const { session, error } = await nhost.auth.signUp({
//         email,
//         password,
//       })

//       console.log('Session:', session) // Debugging statement
//       console.log('Error:', error) // Debugging statement

//       if (error) {
//         toast({
//           title: "Registration failed",
//           description: error.message,
//         })
//       } else if (session) {
//         // Authomatically sign in the user after successful registeration
//         const {session: signInSession, error: signInError} = await nhost.auth.signIn({
//           email,
//           password,
//         })

//         if(signInError){
//           toast({
//             title: "Sign in failed",
//             description: signInError.message,
//           })
//         }else if(signInSession){
//           const expirationTime = new Date().getTime() + 12*60*60*1000
//           localStorage.setItem('access_token',signInSession.accessToken)
//           localStorage.setItem('user_email',signInSession.user.email)
//           localStorage.setItem('session_expiration',expirationTime.toString())
//           toast({
//             title: "Registration successful",
//             description: "You habe been registered and signed in successfully."
//           })
//         }
//         router.push('/dashboard')
//       }
//     } catch (error: any) {
//       console.error('Catch error:', error) // Debugging statement
//       toast({
//         title: "Error",
//         description: error.message,
//         variant: "destructive",
//       })
//     } finally {
//       setLoading(false)
//     }
//   }

        
//   // Function to handle Google Signup
//   const signupWithGoogle = async () => {
//     await nhost.auth.signOut()
//     try {
//       const { error } = await nhost.auth.signIn({
//         provider: 'google',
//       });
//       if (error) {
//         console.error('Google signup error:', error);
//       } else {
//         console.log('Google signup successful');
//       }
//     } catch (error) {
//       console.error('Error during Google signup:', error);
//     }
//   };

//   // Function to handle GitHub Signup
//   const signupWithGithub = async () => {
//     await nhost.auth.signOut()
//     try {
//       const { error } = await nhost.auth.signIn({
//         provider: 'github',
//       });
//       if (error) {
//         console.error('GitHub signup error:', error);
//       } else {
//         console.log('GitHub signup successful');
//       }
//     } catch (error) {
//       console.error('Error during GitHub signup:', error);
//     }
//   };

//   return (
//     <div className="container flex h-screen w-screen flex-col items-center justify-center">
//       <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
//         <div className="flex flex-col space-y-2 text-center">
//           <h1 className="text-2xl font-semibold tracking-tight">Create Account</h1>
//           <p className="text-sm text-muted-foreground">
//             Enter your email to sign up to your account
//           </p>
//         </div>
//         <div className="grid gap-6">
//           <form onSubmit={handleSubmit}>
//             <div className="grid gap-2">
//               <div className="grid gap-1">
//                 <Input
//                   id="email"
//                   placeholder="name@example.com"
//                   type="email"
//                   autoCapitalize="none"
//                   autoComplete="email"
//                   autoCorrect="off"
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                   required
//                 />
//               </div>
//               <div className="grid gap-1">
//                 <Input
//                   id="password"
//                   placeholder="Password"
//                   type="password"
//                   autoCapitalize="none"
//                   autoCorrect="off"
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                   required
//                 />
//               </div>
//               <Button disabled={loading}>
//                 {loading ? "Signing Up..." : "Sign Up"}
//               </Button>
//             </div>
//           </form>
//           <div className="relative">
//             <div className="absolute inset-0 flex items-center">
//               <span className="w-full border-t" />
//             </div>
//             <div className="relative flex justify-center text-xs uppercase">
//               <span className="bg-background px-2 text-muted-foreground">
//                 Or continue with
//               </span>
//             </div>
//           </div>
//           <div className="grid gap-2">
//             <Button variant="outline" className="gap-2" onClick={signupWithGithub} disabled={loading}>
//               <Github className="h-4 w-4" />
//               Github
//             </Button>
//             <Button variant="outline" className="gap-2" onClick={signupWithGoogle} disabled={loading}>
//               <svg className="h-4 w-4" viewBox="0 0 24 24">
//                 <path
//                   d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
//                   fill="#4285F4"
//                 />
//                 <path
//                   d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
//                   fill="#34A853"
//                 />
//                 <path
//                   d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
//                   fill="#FBBC05"
//                 />
//                 <path
//                   d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
//                   fill="#EA4335"
//                 />
//                 <path d="M1 1h22v22H1z" fill="none" />
//               </svg>
//               Google
//             </Button>
//           </div>
//         </div>
//         <p className="px-8 text-center text-sm text-muted-foreground">
//           <Link href="/login" className="hover:text-brand underline underline-offset-4">
//             Already have an account? Sign In
//           </Link>
//         </p>
//       </div>
//     </div>
//   )
// }

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
        localStorage.setItem('access_token', session.accessToken);
        localStorage.setItem('user_email', session.user.email);
        localStorage.setItem('session_expiration', expirationTime.toString());
        router.push('/dashboard');
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
        localStorage.setItem('access_token', session.accessToken);
        localStorage.setItem('user_email', session.user.email);
        localStorage.setItem('session_expiration', expirationTime.toString());
        router.push('/dashboard');
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