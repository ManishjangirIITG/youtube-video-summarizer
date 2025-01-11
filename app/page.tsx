import { Button } from "@/components/ui/button"
import { ArrowRight, Youtube, LucideIcon } from "lucide-react"
import Link from "next/link"

interface Feature {
  title: string;
  description: string;
  icon: LucideIcon;
}

const features: Feature[] = [
  {
    title: "Quick Summaries",
    description: "Get concise summaries of any YouTube video in seconds",
    icon: Youtube,
  },
  {
    title: "Key Points Extraction",
    description: "AI automatically identifies and extracts the most important points",
    icon: Youtube,
  },
  {
    title: "Multiple Languages",
    description: "Support for videos in multiple languages with accurate translations",
    icon: Youtube,
  },
]

export default function Home() {
  return (
    <div className="flex min-h-[calc(100vh-3.5rem)] flex-col">
      <section className="space-y-6 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-32">
        <div className="container flex max-w-[64rem] flex-col items-center gap-4 text-center">
          <h1 className="font-heading text-3xl sm:text-5xl md:text-6xl lg:text-7xl">
            Summarize YouTube Videos with AI
          </h1>
          <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
            Get instant, accurate summaries of any YouTube video using advanced AI. Save time and extract key insights in seconds.
          </p>
          <div className="space-x-4">
            <Link href="/dashboard">
              <Button size="lg" className="gap-2">
                Try Now <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/pricing">
              <Button size="lg" variant="outline">
                View Pricing
              </Button>
            </Link>
          </div>
        </div>
      </section>
      <section className="container space-y-6 py-8 md:py-12 lg:py-24">
        <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
          <h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl">
            Features
          </h2>
          <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
            Our AI-powered platform offers everything you need to get quick, accurate video summaries.
          </p>
        </div>
        <div className="mx-auto grid justify-center gap-4 sm:grid-cols-2 md:max-w-[64rem] md:grid-cols-3">
          {features.map((feature) => (
            <div key={feature.title} className="relative overflow-hidden rounded-lg border bg-background p-2">
              <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
                <feature.icon className="h-12 w-12" />
                <div className="space-y-2">
                  <h3 className="font-bold">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}