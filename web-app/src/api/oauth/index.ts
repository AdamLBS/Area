import axios from 'axios';
import { API_URL_OAUTH } from '../constants';

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
