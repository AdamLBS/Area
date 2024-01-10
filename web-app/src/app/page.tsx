'use client';
import { Button } from '@/components/ui';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
import { getMe } from '@/api/user';
import { NavBarLandingPage } from '@/lib/ui/design-system';

export default function Home() {
  const router = useRouter();

  const checkMe = useMutation({
    mutationFn: getMe,
    onSuccess: () => {
      router.push('/dashboard');
    },
    onError: () => {
      router.push('/login');
    },
  });

  // useEffect(() => {
  //   const token = localStorage.getItem('authToken');
  //   if (token === null) {
  //     router.push('/login');
  //   } else {
  //     checkMe.mutate();
  //   }
  // }, []);

  return (
    <div style={{ padding: '24px' }}>
      <NavBarLandingPage />
    </div>
  );
}
