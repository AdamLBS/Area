import { getMe, getOnboardingOptions, getOnboardingStatus } from '@/api/user';
import { useQuery } from '@tanstack/react-query';

export const useProfile = () =>
  useQuery({
    queryKey: ['profile'],
    queryFn: getMe,
  });

export const useOnboardingStatus = () =>
  useQuery({
    queryKey: ['onboarding-status'],
    queryFn: getOnboardingStatus,
  });

export const useOnboardingOptions = () =>
  useQuery({
    queryKey: ['onboarding-options'],
    queryFn: getOnboardingOptions,
  });
