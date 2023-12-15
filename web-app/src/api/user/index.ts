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

export const logIn = async (payload: {
  email: string;
  password: string;
}): Promise<void> => {
  try {
    return await axios.post(API_URL + '/auth/login', payload);
  } catch (error) {
    throw new Error('Error logging in');
  }
};

export const signUp = async (payload: {
  email: string;
  username: string;
  password: string;
  password_confirmation: string;
}): Promise<void> => {
  try {
    return await axios.post(API_URL + '/auth/register', payload);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 422)
        throw new Error('Username already taken');
    } else {
      throw new Error('Error signing up');
    }
  }
};
