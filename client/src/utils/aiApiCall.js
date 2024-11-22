import axios from 'axios';
import { apiRoutes } from './apiRoutes';
const token = localStorage.getItem('chatit');

export const GetAiResult = async (message) => {
  try {
    const response = await axios.post(
      `${apiRoutes.aiURI}`,
      { message },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    );

    return { status: 'success', data: response.data };
  } catch (error) {
    console.error('AI Request Error:', error);
    const errorMessage =
      error.response?.data?.message || 'Unable to fetch AI response';
    return { status: 'error', data: errorMessage };
  }
};
