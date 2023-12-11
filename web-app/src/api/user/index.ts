import axios from 'axios';
import { API_URL } from '../constants';

export const verifyEmail = async (payload: {
  email: string;
}): Promise<boolean> => {
  try {
    const reponse = await axios.post(API_URL + '/auth/register/verify/step/1', {
      body: payload,
    });
    if (reponse.data.success) return true;
    return false;
  } catch (error) {
    throw new Error('Error verifying email');
  }
};
