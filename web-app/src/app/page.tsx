'use client';
import { Button } from '@/components/ui';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
import { me } from '@/api/user';

export default function Home() {
  const router = useRouter();

  const checkMe = useMutation({
    mutationFn: me,
    onSuccess: () => {
      router.push('/dashboard');
    },
    onError: () => {
      router.push('/login');
    },
  });

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token === null) {
      router.push('/login');
    } else {
      checkMe.mutate({ token });
    }
  }, []);

  return (
    <div>
      <Button>Hello</Button>
    </div>
  );
}
