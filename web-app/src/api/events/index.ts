import axios from 'axios';
import { API_URL, ApiEvent, Event, EventCreate } from '../constants';

export const getTriggers = async (): Promise<ApiEvent[]> => {
  try {
    return (await axios.get(API_URL + '/events/trigger')).data as ApiEvent[];
  } catch (error) {
    throw new Error('Error getting triggers.');
  }
};

export const getResponses = async (): Promise<ApiEvent[]> => {
  try {
    return (await axios.get(API_URL + '/events/response')).data as ApiEvent[];
  } catch (error) {
    throw new Error('Error getting responses.');
  }
};

export const createEvent = async (payload: EventCreate): Promise<void> => {
  try {
    await axios.post(API_URL + '/event/create', payload, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('authToken')}`,
      },
    });
  } catch (error) {
    throw new Error('Error creating event.');
  }
};

export const activateEvent = async (payload: {
  uuid: string;
  activated: boolean;
}): Promise<void> => {
  try {
    await axios.patch(
      API_URL + `/events/activate/${payload.uuid}`,
      {
        activated: payload.activated,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authToken')}`,
        },
      },
    );
  } catch (error) {
    throw new Error('Error activating event.');
  }
};

export const getEvent = async (uuid: string): Promise<Event> => {
  try {
    const res = (await axios.get(API_URL + `/events/${uuid}`)).data;
    res.triggerInteraction = JSON.parse(res.triggerInteraction);
    res.responseInteraction = JSON.parse(res.responseInteraction);
    return res as Event;
  } catch (error) {
    throw new Error('Error getting event.');
  }
};
