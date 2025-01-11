export default function AboutPage() {
  return (
    <div className="container py-10">
      <h1 className="text-4xl font-bold mb-8">About VideoSum AI</h1>
      
      <div className="max-w-3xl space-y-6">
        <p className="text-lg text-muted-foreground">
          VideoSum AI is your intelligent YouTube video summarization tool. We help you save time by providing concise, accurate summaries of any YouTube video.
        </p>

        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">Our Mission</h2>
          <p className="text-muted-foreground">
            Our mission is to make video content more accessible and efficient to consume. We understand that time is valuable, and not everyone can watch hour-long videos to get the information they need.
          </p>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">How It Works</h2>
          <p className="text-muted-foreground">
            Using advanced AI technology, we analyze YouTube videos and extract the most important information. Our system processes the video content, identifies key points, and generates comprehensive summaries that capture the essence of the video.
          </p>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">Why Choose Us</h2>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground">
            <li>Accurate and reliable summaries</li>
            <li>Time-saving solution</li>
            <li>Easy to use interface</li>
            <li>Support for multiple languages</li>
            <li>Secure and private</li>
          </ul>
        </div>
      </div>
    </div>
  )
} 