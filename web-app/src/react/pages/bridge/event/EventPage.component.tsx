'use client';
import { EventContent, PrivateLayout } from '@/lib/ui/design-system';
import React, { memo } from 'react';
import { PageContainer } from './EventPage.style';

const Event: React.FC = () => {
  return (
    <PrivateLayout pageName="Bridge">
      <PageContainer>
        <EventContent eventUuid="44fbd0f3-cc02-40bd-9fc2-fd9d8f3372b5" />
      </PageContainer>
    </PrivateLayout>
  );
};

export const EventPage = memo(Event);
