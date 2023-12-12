import axios from 'axios';
import { API_URL } from '../constants';

export const verifyEmail = async (payload: {
  email: string;
}): Promise<boolean> => {
  try {
    return (await axios.post(API_URL + '/auth/register/verify/step/1', payload))
      .data;
  } catch (error) {
    throw new Error('Error verifying email');
  }
};
