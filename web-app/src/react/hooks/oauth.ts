import { getServices } from '@/api/oauth';
import { useQuery } from '@tanstack/react-query';

export const useServices = () =>
  useQuery({
    queryKey: ['services'],
    queryFn: getServices,
  });
