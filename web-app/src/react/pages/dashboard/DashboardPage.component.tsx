'use client';
import React, { memo } from 'react';
import { PageContainer } from './DashboardPage.style';
import { PrimaryDefault } from '@/lib/ui/design-system';

const Dashboard = () => {
  return (
    <PageContainer>
      <PrimaryDefault>Dashboard Page</PrimaryDefault>
    </PageContainer>
  );
};

export const DashboardPage = memo(Dashboard);
