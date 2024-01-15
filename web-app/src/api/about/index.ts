import axios from 'axios';
import { About } from '../constants';

export const getAbout = async (): Promise<About> => {
  try {
    return (await axios.get(process.env.NEXT_PUBLIC_API_URL + '/about.json')).data as About;
  } catch (error) {
    throw new Error('Error getting about.');
  }
};
