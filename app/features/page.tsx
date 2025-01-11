export default function FeaturesPage() {
  return (
    <div className="container py-10">
      <h1 className="text-4xl font-bold mb-8">Features</h1>
      
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        <div className="p-6 border rounded-lg">
          <h3 className="text-xl font-semibold mb-2">Quick Summaries</h3>
          <p className="text-muted-foreground">
            Get concise summaries of YouTube videos in seconds, saving you valuable time.
          </p>
        </div>

        <div className="p-6 border rounded-lg">
          <h3 className="text-xl font-semibold mb-2">AI-Powered</h3>
          <p className="text-muted-foreground">
            Advanced AI technology ensures accurate and meaningful video summaries.
          </p>
        </div>

        <div className="p-6 border rounded-lg">
          <h3 className="text-xl font-semibold mb-2">Key Points</h3>
          <p className="text-muted-foreground">
            Extract main ideas and important points from any YouTube video.
          </p>
        </div>

        <div className="p-6 border rounded-lg">
          <h3 className="text-xl font-semibold mb-2">Time Stamps</h3>
          <p className="text-muted-foreground">
            Navigate to specific parts of the video using intelligent timestamps.
          </p>
        </div>

        <div className="p-6 border rounded-lg">
          <h3 className="text-xl font-semibold mb-2">History</h3>
          <p className="text-muted-foreground">
            Access your previously summarized videos anytime.
          </p>
        </div>

        <div className="p-6 border rounded-lg">
          <h3 className="text-xl font-semibold mb-2">Share</h3>
          <p className="text-muted-foreground">
            Easily share video summaries with friends and colleagues.
          </p>
        </div>
      </div>
    </div>
  )
} 