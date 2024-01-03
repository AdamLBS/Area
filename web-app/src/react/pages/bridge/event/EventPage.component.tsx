'use client';
import { EventContent, MenuEvent, PrivateLayout } from '@/lib/ui/design-system';
import React, { memo } from 'react';
import { PageContainer } from './EventPage.style';

type EventPageProps = {
  currentUuid: string;
};

const Event: React.FC<EventPageProps> = ({ currentUuid }) => (
  <PrivateLayout pageName="Bridge">
    <PageContainer>
      <MenuEvent currentUuid={currentUuid} />
      <EventContent eventUuid={currentUuid} />
    </PageContainer>
  </PrivateLayout>
);

export const EventPage = memo(Event);
