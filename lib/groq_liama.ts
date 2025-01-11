import Groq from "groq-sdk";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export async function generateVideoSummary(transcript: string) {
  const chatCompletion = await getGroqChatCompletion(transcript);
  return chatCompletion.choices[0]?.message?.content || "";
}

export async function getGroqChatCompletion(transcript: string) {
  const prompt = `Please analyze this video transcript and provide:

1. DETAILED SUMMARY:
- Comprehensive overview of the main content
- Important discussions and arguments
- Context and background information

2. KEY POINTS:
- Main takeaways
- Critical insights
- Important facts and figures

3. ADDITIONAL INSIGHTS:
- Notable quotes
- Recommendations
- Related topics mentioned

Transcript:
${transcript}`;

  return groq.chat.completions.create({
    messages: [
      {
        role: "user",
        content: prompt,
      },
    ],
    model: "llama-3.3-70b-versatile",
    temperature: 0.7,
    max_tokens: 2000,
    top_p: 0.9,
  });
}
