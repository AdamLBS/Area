'use client';
import React, { memo } from 'react';
import {
  PageContainer,
  ServiceContainer,
  ManagementContainer,
} from './DashboardPage.style';
import {
  H3,
  IconStratos,
  PrivateLayout,
  ServiceCard,
} from '@/lib/ui/design-system';
import { Boxes, BrainCircuit, Eye } from 'lucide-react';

const Dashboard = () => {
  return (
    <PrivateLayout pageName="Dashboard" icon={<IconStratos />}>
      <PageContainer>
        <ServiceContainer>
          <H3>Management service</H3>
          <ManagementContainer>
            <ServiceCard
              title="Bridge"
              icon={<Boxes />}
              description="Bridge service allows to you to link different API"
            />
            <ServiceCard
              title="Gateway"
              icon={<BrainCircuit />}
              description="Gateway service allows to you to add and configure your API"
            />
          </ManagementContainer>
        </ServiceContainer>
        <ServiceContainer>
          <H3>Tracking service</H3>
          <ManagementContainer>
            <ServiceCard
              title="Watch"
              icon={<Eye />}
              description="You can see all logs of your different events"
            />
          </ManagementContainer>
        </ServiceContainer>
      </PageContainer>
    </PrivateLayout>
  );
};

export const DashboardPage = memo(Dashboard);
