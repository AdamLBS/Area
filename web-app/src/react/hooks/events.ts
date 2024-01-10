import { getResponses, getTriggers, getEvents, getEvent } from '@/api/events';
import { useQuery } from '@tanstack/react-query';

export const useTriggers = () =>
  useQuery({
    queryKey: ['triggers'],
    queryFn: getTriggers,
  });

export const useResponses = () =>
  useQuery({
    queryKey: ['responses'],
    queryFn: getResponses,
  });

export const useEvent = (uuid: string) =>
  useQuery({
    queryKey: ['event', uuid],
    queryFn: () => getEvent(uuid),
  });

export const useEvents = () =>
  useQuery({
    queryKey: ['events'],
    queryFn: getEvents,
  });

export const useEventStats = (uuid: string) =>
  useQuery({
    queryKey: ['event-stats', uuid],
    queryFn: () => getEvent(uuid),
  });
