'use client';
import { EventContent, PrivateLayout } from '@/lib/ui/design-system';
import React, { memo } from 'react';
import { PageContainer } from './EventPage.style';

const Event: React.FC = () => {
  return (
    <PrivateLayout pageName="Bridge">
      <PageContainer>
        <EventContent eventUuid="00c2c15e-1c1e-4d90-a352-6041797dd990" />
      </PageContainer>
    </PrivateLayout>
  );
};

export const EventPage = memo(Event);
