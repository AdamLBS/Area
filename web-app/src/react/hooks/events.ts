import { getResponses, getTriggers } from '@/api/events';
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
