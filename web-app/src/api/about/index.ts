import axios from 'axios';
import { API_URL, About } from '../constants';

export const getAbout = async (): Promise<About> => {
  try {
    return (await axios.get(API_URL + '/about.json')).data as About;
  } catch (error) {
    throw new Error('Error getting about.');
  }
};
