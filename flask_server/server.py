from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
from youtube_transcript_api import YouTubeTranscriptApi
from urllib.parse import urlparse, parse_qs
import logging
import os

app = Flask(__name__)
CORS(app)
logging.basicConfig(level=logging.DEBUG)

@app.route('/')
def home():
    return jsonify({
        'status': 'Server is running',
        'endpoints': {
            'transcript': '/api/transcript',
            'health': '/health'
        }
    })

@app.route('/favicon.ico')
def favicon():
    return '', 204

@app.route('/health')
def health():
    return jsonify({'status': 'healthy'})

def get_video_transcript(url):
    try:
        video_id = parse_qs(urlparse(url).query).get('v')
        if not video_id:
            return {'success': False, 'error': 'Invalid YouTube URL'}
        
        # Get transcript segments
        transcript_list = YouTubeTranscriptApi.get_transcript(video_id[0])
        
        # Convert to paragraph
        text_array = [entry["text"] for entry in transcript_list]
        full_transcript = ' '.join(text_array)
        
        return {
            'success': True, 
            'transcript': full_transcript,
            'videoId':video_id[0]
        }
    except Exception as e:
        logging.error(f"Error fetching transcript: {str(e)}")
        return {'success': False, 'error': str(e)}

# ...existing code...

@app.route('/api/transcript', methods=['POST'])
def get_transcript():
    try:
        data = request.get_json()
        logging.debug(f"Received request data: {data}")

        if not data or 'url' not in data:
            return jsonify({
                'error': 'URL is required in request body',
                'received': data
            }), 400
            
        url = data['url'].strip()
        if not url:
            return jsonify({'error': 'URL cannot be empty'}), 400

        logging.info(f"Processing URL: {url}")
        result = get_video_transcript(url)
        logging.debug(f"Processing result: {result}")
        
        if not result['success']:
            return jsonify({'error': result['error']}), 500
            
        return jsonify(result)
        
    except Exception as e:
        logging.error(f"Server error: {str(e)}")
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)