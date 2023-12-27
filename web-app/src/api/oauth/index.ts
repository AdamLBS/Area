import axios from 'axios';
import { API_URL, API_URL_OAUTH, Services } from '../constants';

export const saveOAuth = async (payload: {
  provider: string;
  authToken: string;
  token: string;
  refreshToken: string;
}): Promise<void> => {
  try {
    return await axios.post(
      `${API_URL_OAUTH}/${payload.provider}/save`,
      {
        token: payload.token,
        refreshToken: payload.refreshToken,
      },
      {
        headers: {
          Authorization: `Bearer ${payload.authToken}`,
        },
      },
    );
  } catch (error) {
    throw new Error('Error saving OAuth token');
  }
};

export const getServices = async (): Promise<Services> => {
  try {
    return (
      await axios.get(`${API_URL}/user/me/services`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authToken')}`,
        },
      })
    ).data as Services;
  } catch (error) {
    throw new Error('Error getting services');
  }
};

export const deleteOAuth = async (provider: string): Promise<void> => {
  try {
    return await axios.delete(`${API_URL_OAUTH}/${provider}/delete`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('authToken')}`,
      },
    });
  } catch (error) {
    throw new Error('Error deleting OAuth token');
  }
};
