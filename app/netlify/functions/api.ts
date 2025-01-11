// import { Handler } from '@netlify/functions';
import { generateVideoSummary } from '@/lib/groq_liama';


// interface ApiResponse {
//   transcript?: string;
//   summary?: string;
//   error?: string;
// }

// export const handler: Handler = async (event, context) => {
//   // CORS Headers
//   const headers = {
//     'Access-Control-Allow-Origin': '*',
//     'Access-Control-Allow-Headers': 'Content-Type',
//     'Access-Control-Allow-Methods': 'POST, OPTIONS',
//     'Content-Type': 'application/json'
//   };

//   // Handle preflight requests
//   if (event.httpMethod === 'OPTIONS') {
//     return {
//       statusCode: 204,
//       headers
//     };
//   }

//   if (event.httpMethod !== 'POST') {
//     return {
//       statusCode: 405,
//       headers,
//       body: JSON.stringify({ error: 'Method not allowed' })
//     };
//   }

//   try {
//     const { transcript } = JSON.parse(event.body || '{}');

//     if (!transcript) {
//       return {
//         statusCode: 400,
//         headers,
//         body: JSON.stringify({ error: 'Transcript is required' })
//       };
//     }

//     const summary = await generateVideoSummary(transcript);

//     return {
//       statusCode: 200,
//       headers,
//       body: JSON.stringify({ summary })
//     };

//   } catch (error) {
//     console.error('API Error:', error);
//     return {
//       statusCode: 500,
//       headers,
//       body: JSON.stringify({
//         error: 'Internal server error',
//         details: error instanceof Error ? error.message : 'Unknown error'
//       })
//     };
//   }
// };

import { Handler } from '@netlify/functions';
import fetch from 'node-fetch';

interface ApiResponse {
  transcript?: string;
  summary?: string;
  error?: string;
}

export const handler: Handler = async (event, context) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Content-Type': 'application/json'
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 204, headers };
  }

  try {
    const { videoUrl } = JSON.parse(event.body || '{}');

    // Fetch transcript from Python server on Render
    const transcriptResponse = await fetch(`${process.env.PYTHON_SERVER_URL}/api/transcript`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ url: videoUrl })
    });

    if (!transcriptResponse.ok) {
      throw new Error(`Python server error: ${transcriptResponse.status}`);
    }

    const { transcript } = await transcriptResponse.json();

    // Generate summary
    const summary = await generateVideoSummary(transcript);

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ transcript, summary })
    };

  } catch (error) {
    console.error('API Error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        error: 'Internal server error',
        details: error instanceof Error ? error.message : 'Unknown error'
      })
    };
  }
};