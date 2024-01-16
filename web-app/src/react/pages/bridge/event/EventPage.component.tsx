'use client';
import { EventContent, MenuEvent, PrivateLayout } from '@/lib/ui/design-system';
import React, { memo } from 'react';
import { PageContainer } from './EventPage.style';
import { Boxes } from 'lucide-react';

type EventPageProps = {
  currentUuid: string;
};

const Event: React.FC<EventPageProps> = ({ currentUuid }) => (
  <PrivateLayout pageName="Bridge" icon={<Boxes />}>
    <PageContainer>
      <MenuEvent currentUuid={currentUuid} page="bridge" />
      <EventContent eventUuid={currentUuid} />
    </PageContainer>
  </PrivateLayout>
);

export const EventPage = memo(Event);
