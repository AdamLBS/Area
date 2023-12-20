import { getMe } from '@/api/user';
import { useQuery } from '@tanstack/react-query';

export const useProfile = () =>
  useQuery({
    queryKey: ['profile'],
    queryFn: getMe,
  });
