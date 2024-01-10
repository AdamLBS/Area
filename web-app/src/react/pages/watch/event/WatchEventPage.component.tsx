'use client';
import { EventContent, MenuEvent, PrivateLayout } from '@/lib/ui/design-system';
import React, { memo } from 'react';
import { PageContainer } from './WatchEventPage';
import { Eye } from 'lucide-react';

type EventPageProps = {
  currentUuid: string;
};

const Event: React.FC<EventPageProps> = ({ currentUuid }) => (
  <PrivateLayout pageName="Watch" icon={<Eye />}>
    <PageContainer>
      <MenuEvent currentUuid={currentUuid} page="watch" hideCreateEvent />
      <EventContent eventUuid={currentUuid} />
    </PageContainer>
  </PrivateLayout>
);

export const WatchEventPage = memo(Event);
