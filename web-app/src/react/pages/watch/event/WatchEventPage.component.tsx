'use client';
import { MenuEvent, PrivateLayout } from '@/lib/ui/design-system';
import React, { memo } from 'react';
import { PageContainer } from './WatchEventPage';
import { Eye } from 'lucide-react';
import { Content } from './Content/Content.component';

type EventPageProps = {
  currentUuid: string;
};

const Event: React.FC<EventPageProps> = ({ currentUuid }) => (
  <PrivateLayout pageName="Watch" icon={<Eye />}>
    <PageContainer>
      <MenuEvent currentUuid={currentUuid} page="watch" hideCreateEvent />
      <Content eventUuid={currentUuid} />
    </PageContainer>
  </PrivateLayout>
);

export const WatchEventPage = memo(Event);
