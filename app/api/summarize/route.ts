import { NextResponse } from "next/server"
import { generateVideoSummary } from "@/lib/groq_liama"
import axios from "axios";

const PYTHON_SERVER_URL = process.env.PYTHON_SERVER_URL || 'http://localhost:5000'

async function getTranscriptFromPythonServer(videoUrl: string) {
  console.log('Starting transcript fetch for:', videoUrl);

  try {
    const response = await axios(`${PYTHON_SERVER_URL}/api/transcript`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      data: JSON.stringify({ 
        url: videoUrl.trim() 
      })
    });

    console.log('Python server response status:', response.status);
    const data = response.data;
    console.log('Python server response data:', data);

    if (response.status < 200 || response.status >= 300) {
      throw new Error(data.error || `HTTP error! status: ${response.status}`);
    }

    return data.transcript;
  } catch (error: any) {
    console.error('Transcript fetch error:', error);
    throw error;
  }
}

export async function POST(req: Request) {
  console.log('Received request:', req);
  
  try {
    const contentType = req.headers.get('content-type');
    console.log('Content-Type:', contentType);

    const body = await req.json();
    console.log('Request body:', body);

    // Check if videoUrl exists in any format
    let videoUrl = body.videoId || body.url || body.video_url;
    videoUrl = `https://www.youtube.com/watch?v=${videoUrl}`
    console.log('Extracted videoUrl:', videoUrl);

    if (!videoUrl) {
      return NextResponse.json({
        error: 'Video URL is required',
        receivedBody: body
      }, { status: 400 });
    }

    const transcript = await getTranscriptFromPythonServer(videoUrl);
    if (!transcript) {
      return NextResponse.json({
        error: 'No transcript found'
      }, { status: 404 });
    }

    const summary = await generateVideoSummary(transcript);
    return NextResponse.json({ summary });

  } catch (error: any) {
    console.error('Route handler error:', error);
    return NextResponse.json({
      error: error.message || 'Internal server error',
    }, { status: 500 });
  }
}