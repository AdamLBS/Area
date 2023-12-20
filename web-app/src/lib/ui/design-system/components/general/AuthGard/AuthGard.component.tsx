import { getMe } from '@/api/user';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { memo, useEffect } from 'react';
import React from 'react';

export type AuthGardProps = {
  children: React.ReactNode;
};

const AuthGuardComponent: React.FC<AuthGardProps> = ({ children }) => {
  const router = useRouter();
  const checkMe = useMutation({
    mutationFn: getMe,
    onError: () => {
      router.push('/login');
    },
  });

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token === null) {
      router.push('/login');
    } else {
      checkMe.mutate();
    }
  }, []);

  return <>{children}</>;
};

export const AuthGard = memo(AuthGuardComponent);
