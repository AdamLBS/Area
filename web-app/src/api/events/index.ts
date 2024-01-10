import axios from 'axios';
import {
  API_URL,
  ApiEvent,
  EventCreate,
  Event,
  EventType,
  Fields,
  EventStats,
  Log,
} from '../constants';

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

export const createEvent = async (payload: EventCreate): Promise<Event> => {
  try {
    const res = await axios.post(API_URL + '/event/create', payload, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('authToken')}`,
      },
    });
    return res.data.event;
  } catch (error) {
    throw new Error('Error creating event.');
  }
};

export const getEvents = async (): Promise<EventType[]> => {
  try {
    const res = await axios.get(API_URL + '/user/events', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('authToken')}`,
      },
    });
    return res.data;
  } catch (error) {
    throw new Error('Error getting events.');
  }
};

export const activateEvent = async (payload: {
  uuid: string;
  activated: boolean;
}): Promise<void> => {
  try {
    await axios.patch(
      API_URL + `/events/${payload.uuid}/activate`,
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
    const res = (
      await axios.get(API_URL + `/events/${uuid}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authToken')}`,
        },
      })
    ).data;
    res.triggerInteraction = JSON.parse(res.triggerInteraction);
    res.responseInteraction = JSON.parse(res.responseInteraction);
    return res as Event;
  } catch (error) {
    throw new Error('Error getting event.');
  }
};

export const getEventStats = async (uuid: string): Promise<EventStats> => {
  try {
    const res = (
      await axios.get(API_URL + `/event/${uuid}/stats`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authToken')}`,
        },
      })
    ).data;
    return res.stats as EventStats;
  } catch (error) {
    throw new Error('Error getting event stats.');
  }
};

export const getEventLogs = async (uuid: string): Promise<Log[]> => {
  try {
    const res = (
      await axios.get(API_URL + `/event/${uuid}/logs`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authToken')}`,
        },
      })
    ).data;
    return res.logs as Log[];
  } catch (error) {
    throw new Error('Error getting event logs.');
  }
};

export const updateEventSettings = async (payload: {
  uuid: string;
  name?: string;
  description?: string;
}): Promise<void> => {
  try {
    await axios.patch(
      API_URL + `/event/update/${payload.uuid}`,
      {
        name: payload.name,
        description: payload.description,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authToken')}`,
        },
      },
    );
  } catch (error) {
    throw new Error('Error updating event settings.');
  }
};

export const deleteEvent = async (uuid: string): Promise<void> => {
  try {
    await axios.delete(API_URL + `/events/${uuid}/delete`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('authToken')}`,
      },
    });
  } catch (error) {
    throw new Error('Error deleting event.');
  }
};

export const deleteEventAction = async (payload: {
  uuid: string;
  id: number;
}): Promise<void> => {
  try {
    await axios.delete(API_URL + `/event/${payload.uuid}/action/delete`, {
      data: {
        id: payload.id,
      },
      headers: {
        Authorization: `Bearer ${localStorage.getItem('authToken')}`,
      },
    });
  } catch (error) {
    throw new Error('Error deleting event action.');
  }
};

export const addEventAction = async (payload: {
  eventUuid: string;
  action_provider: string;
  id: string;
  fiedls: Fields[];
}): Promise<void> => {
  try {
    await axios.post(
      API_URL + `/event/${payload.eventUuid}/action/add`,
      {
        action_provider: payload.action_provider,
        id: payload.id,
        fields: payload.fiedls,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authToken')}`,
        },
      },
    );
  } catch (error) {
    throw new Error('Error adding action.');
  }
};

export const updateTriggerEvent = async (payload: {
  eventUuid: string;
  trigger_provider: string;
  id: string;
  fields: Fields[];
}): Promise<void> => {
  try {
    await axios.patch(
      API_URL + `/event/${payload.eventUuid}/trigger/update`,
      {
        trigger_provider: payload.trigger_provider,
        triggerInteraction: {
          id: payload.id,
          fields: payload.fields,
        },
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authToken')}`,
        },
      },
    );
  } catch (error) {
    throw new Error('Error updating trigger event.');
  }
};

export const updateActionEvent = async (payload: {
  eventUuid: string;
  response_provider: string;
  id: string;
  fields: Fields[];
}): Promise<void> => {
  try {
    await axios.patch(
      API_URL + `/event/${payload.eventUuid}/action/update`,
      {
        response_provider: payload.response_provider,
        responseInteraction: {
          id: payload.id,
          fields: payload.fields,
        },
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authToken')}`,
        },
      },
    );
  } catch (error) {
    throw new Error('Error updating action event.');
  }
};

export const updateAdditionalAction = async (payload: {
  index: number;
  eventUuid: string;
  action_provider: string;
  id: string;
  fields: Fields[];
}): Promise<void> => {
  try {
    await axios.patch(
      API_URL + `/event/${payload.eventUuid}/additionalAction/update`,
      {
        index: payload.index,
        action_provider: payload.action_provider,
        id: payload.id,
        fields: payload.fields,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authToken')}`,
        },
      },
    );
  } catch (error) {
    throw new Error('Error updating additional action.');
  }
};
