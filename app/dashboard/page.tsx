"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import { Loader2 } from "lucide-react"


export default function DashboardPage() {
  const [url, setUrl] = useState("")
  const [loading, setLoading] = useState(false)
  const [summary, setSummary] = useState<string | null>(null)
  const [isCached, setIsCached] = useState(false)
  const { toast } = useToast()
  const router = useRouter()

  useEffect(() => {
    const token = localStorage.getItem('access_token')
    if (!token) {
      router.push('/login')
      return
    }

    // Optionally, you can add a token validation check here
    // const validateToken = async () => {
    //   const response = await fetch('/api/validate-token', {
    //     headers: {
    //       'Authorization': `Bearer ${token}`
    //     }
    //   })
    //   if (!response.ok) {
    //     router.push('/login')
    //   }
    // }

    // validateToken()
  }, [router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setSummary(null)
    setIsCached(false)

    try {
      const videoId = extractVideoId(url)
      if (!videoId) {
        throw new Error("Invalid YouTube URL")
      }
  
      const response = await fetch('/.netlify/functions/summarize', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          videoUrl: `https://www.youtube.com/watch?v=${videoId}` 
        })
      });
      
      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }
  
      const data = await response.json();
      if (data.summary) {
        setSummary(data.summary);
        toast({
          title: "Success",
          description: "Summary generated successfully",
        });
      }
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : 'Failed to generate summary',
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
    // e.preventDefault();
    // try {
    //   const videoId = extractVideoId(url);
    //   if (!videoId) {
    //     throw new Error("Invalid YouTube URL");
    //   }

    //   const response = await fetch('/.netlify/functions/api', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify({ 
    //       videoUrl: `https://www.youtube.com/watch?v=${videoId}` 
    //     })
    //   });

    //   if (!response.ok) {
    //     const errorData = await response.json();
    //     throw new Error(errorData.error || 'Failed to generate summary');
    //   }

    //   const data = await response.json();
    //   if (data.summary) {
    //     setTranscript(data.summary, setSummary);
    //   }
    // } catch (error) {
    //   toast({
    //     title: "Error",
    //     description: error instanceof Error ? error.message : 'Something went wrong',
    //     variant: "destructive",
    //   });
    // } finally {
    //   setLoading(false);
    // }
  };

  return (
    <div className="container py-10">
      <h1 className="text-3xl font-bold mb-8">Summarize Video</h1>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Enter YouTube URL</CardTitle>
            <CardDescription>
              Paste a YouTube video URL to generate its summary
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                placeholder="https://www.youtube.com/watch?v=..."
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                disabled={loading}
              />
              <Button type="submit" disabled={loading}>
                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Generate Summary
              </Button>
            </form>
          </CardContent>
        </Card>

        {summary && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                Video Summary
                {isCached && (
                  <span className="text-sm text-muted-foreground">
                    ⚡ Retrieved from cache
                  </span>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="prose dark:prose-invert max-w-none">
                <div className="whitespace-pre-wrap">{summary}</div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}

function extractVideoId(url: string): string | null {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/
  const match = url.match(regExp)
  return match && match[2].length === 11 ? match[2] : null
}
function setTranscript(summary: string, setSummary: React.Dispatch<React.SetStateAction<string | null>>) {
  setSummary(summary);
}
