import type { Handler } from '@netlify/functions';
import fetch from 'node-fetch';
import { generateVideoSummary } from '../../lib/groq_liama';

interface TranscriptResponse {
  transcript: string | null;
  error?: string;
}

const handler: Handler = async (event) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json'
  };

  try {
    const { videoUrl } = JSON.parse(event.body || '{}');
    console.log('Processing video URL:', videoUrl);

    const transcriptResponse = await fetch(`${process.env.PYTHON_SERVER_URL}/api/transcript`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({ url: videoUrl })
    });

    const responseData: TranscriptResponse = await transcriptResponse.json();
    console.log('Python server response:', responseData);

    if (!responseData.transcript) {
      throw new Error('Failed to get transcript from video');
    }

    const summary = await generateVideoSummary(responseData.transcript);
    console.log('Summary generated:', summary?.substring(0, 100));

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ summary })
    };

  } catch (error) {
    console.error('Function error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ 
        error: error instanceof Error ? error.message : 'Unknown error'
      })
    };
  }
};

export { handler };