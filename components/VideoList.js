import React, { useEffect, useState } from 'react';
import { getUserVideos } from '../services/graphqlQueries'; // Adjust the path as needed

const VideoList = () => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const userId = 'some-user-id'; // Replace with the actual user ID
        const videos = await getUserVideos(userId);
        setVideos(videos);
      } catch (error) {
        console.error('Failed to fetch videos:', error);
      }
    };

    fetchVideos();
  }, []);

  return (
    <div>
      <h1>User Videos</h1>
      <ul>
        {videos.map((video) => (
          <li key={video.id}>
            <p>URL: {video.youtube_url}</p>
            <p>Summary: {video.summary}</p>
            <p>Created At: {new Date(video.created_at).toLocaleString()}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default VideoList;
