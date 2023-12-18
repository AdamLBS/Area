'use client';
import React, { memo } from 'react';
import { NavBar } from '@/lib/ui/design-system';

const Dashboard = () => {
  return <NavBar pageName="Dashboard" />;
};

export const DashboardPage = memo(Dashboard);
