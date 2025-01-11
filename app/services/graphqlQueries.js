import axiosInstance from './axiosInstance';
import {v4 as uuidv4} from 'uuid'

export const getUserVideos = async (userId) => {
  const query = `
    query getUserVideos($userId: uuid!) {
      videos(where: { user_id: { _eq: $userId } }) {
        id
        youtube_url
        summary
        metadata
        created_at
      }
    }
  `;
  const variables = { userId };

  try {
    const response = await axiosInstance.post('', {
      query,
      variables,
    });
    return response.data.data.videos;
  } catch (error) {
    console.error('Error fetching user videos:', error);
    throw error;
  }
};
