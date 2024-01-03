import { getResponses, getTriggers, getEvents } from '@/api/events';
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

export const useEvents = () =>
  useQuery({
    queryKey: ['events'],
    queryFn: getEvents,
  });
