'use client';
import React, { memo } from 'react';
import { PageContainer } from './DashboardPage.style';
import { PrimaryDefault, PrivateLayout } from '@/lib/ui/design-system';

const Dashboard = () => {
  return (
    <PrivateLayout pageName="Dashboard">
      <PageContainer>
        <PrimaryDefault>Dashboard Page</PrimaryDefault>
      </PageContainer>
    </PrivateLayout>
  );
};

export const DashboardPage = memo(Dashboard);
