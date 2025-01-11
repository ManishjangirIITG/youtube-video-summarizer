"use client"

import { useUserData } from '@nhost/nextjs'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { nhost } from "@/lib/nhost"
import { useToast } from "@/hooks/use-toast"
import { Loader2 } from "lucide-react"

export default function SettingsPage() {
  const user = useUserData()
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const [displayName, setDisplayName] = useState(user?.displayName || '')

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const { error } = await nhost.auth.updateUserMetadata({
        metadata: {
          displayName: displayName,
        },
      });

      if (error) {
        throw new Error(error.message);
      }

      toast({
        title: "Success",
        description: "Profile updated successfully",
      })
    } catch (error) {
      console.error('Error updating user metadata:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: error?.message,
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container max-w-xl py-10">
      <h1 className="text-3xl font-bold mb-8">Settings</h1>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Profile Settings</CardTitle>
            <CardDescription>
              Manage your profile information
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleUpdateProfile} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  Email
                </label>
                <Input
                  id="email"
                  value={user?.email}
                  disabled
                  className="bg-muted"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="displayName" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  Display Name
                </label>
                <Input
                  id="displayName"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  disabled={loading}
                />
              </div>

              <Button type="submit" disabled={loading}>
                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Save Changes
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Password</CardTitle>
            <CardDescription>
              Change your password
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="outline" onClick={() => nhost.auth.resetPassword(user?.email || '')}>
              Reset Password
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 