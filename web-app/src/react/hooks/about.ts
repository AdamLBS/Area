import { getAbout } from '@/api/about';
import { useQuery } from '@tanstack/react-query';

export const useAbout = () =>
  useQuery({
    queryKey: ['about'],
    queryFn: getAbout,
  });
