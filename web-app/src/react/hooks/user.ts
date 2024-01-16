import { getMe, getOnboardingStatus } from '@/api/user';
import { useQuery } from '@tanstack/react-query';

export const useProfile = () =>
  useQuery({
    queryKey: ['profile'],
    queryFn: getMe,
  });

export const useOnboarginStatus = () =>
  useQuery({
    queryKey: ['onboarding'],
    queryFn: getOnboardingStatus,
  });
