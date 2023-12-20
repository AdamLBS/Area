'use client';
import React, { useEffect, useState, memo } from 'react';
import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import { getMe } from '@/api/user';
import { Button } from '@/components/ui';
import { toast } from '@/components/ui/use-toast';
import { PrimaryDefault, PrivateLayout } from '@/lib/ui/design-system';
import { PageContainer } from './DashboardPage.style';
import { User } from '@/types/user';

const Dashboard = () => {
  const router = useRouter();
  const [userData, setUserData] = useState<User | null>(null);

  const { mutate: fetchUser } = useMutation<User, Error>({
    mutationFn: getMe,
    onSuccess: (data: User) => {
      setUserData(data);
    },
    onError: (error) => {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: error.message,
      });
    },
  });

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  const goToEvents = () => {
    router.push('/bridge/' + userData?.uuid);
  };

  return (
    <PrivateLayout pageName="Dashboard">
      <PageContainer>
        <PrimaryDefault>Dashboard Page</PrimaryDefault>
        <Button onClick={goToEvents}>Go to events</Button>
      </PageContainer>
    </PrivateLayout>
  );
};

export const DashboardPage = memo(Dashboard);
