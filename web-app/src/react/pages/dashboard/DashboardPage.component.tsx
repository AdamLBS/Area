'use client';
import React from 'react';
import { Button } from '@/components/ui';
import { PrimaryDefault, PrivateLayout } from '@/lib/ui/design-system';
import { useRouter } from 'next/navigation';
import { memo } from 'react';
import { PageContainer } from './DashboardPage.style';

const Dashboard = () => {
  const router = useRouter();

  const goToEvents = () => {
    router.push('/bridge/');
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
