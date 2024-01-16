'use client';
import { Toaster } from '@/components/ui';
import { PrivateLayout } from '@/lib/ui/design-system';

import React, { memo } from 'react';
import {
  PageContainer,
  PageContent,
  RightPanel,
  Text,
} from './WatchPage.style';

import { MenuEvent } from '@/lib/ui/design-system';
import { Eye } from 'lucide-react';
import { useEvents } from '@/react/hooks/events';

const Watch: React.FC = () => {
  const { data: events } = useEvents();
  return (
    <PrivateLayout pageName="Watch" icon={<Eye />}>
      <PageContainer>
        <PageContent>
          <MenuEvent page="watch" hideCreateEvent />
          <RightPanel>
            {events && events?.length > 0 ? (
              <Text>{`Select an event to see all its logs`}</Text>
            ) : (
              <Text>{`You don't have any event yet`}</Text>
            )}
          </RightPanel>
        </PageContent>
      </PageContainer>
      <Toaster />
    </PrivateLayout>
  );
};

export const WatchPage = memo(Watch);
