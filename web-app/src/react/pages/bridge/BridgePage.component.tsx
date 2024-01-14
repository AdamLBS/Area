'use client';
import { Toaster } from '@/components/ui';
import { CreateEventModal, PrivateLayout } from '@/lib/ui/design-system';
import React, { memo } from 'react';
import {
  EventPanelButton,
  PageContainer,
  PageContent,
  RightPanel,
  OnboardingComponent,
  Text,
} from './BridgePage.style';
import { MenuEvent } from '@/lib/ui/design-system';
import { PlusIcon, Boxes } from 'lucide-react';

const Bridge: React.FC = () => {
  const [createEventModalOpen, setCreateEventModalOpen] = React.useState(false);

  return (
    <PrivateLayout pageName="Bridge" icon={<Boxes />}>
      <PageContainer>
        <PageContent>
          <MenuEvent />
          <RightPanel>
            <OnboardingComponent>
              <Text>You seem to be new and lost</Text>
              <Text>what if we introduce you to Stratos?</Text>
              <EventPanelButton onClick={() => console.log('start onboarding')}>
                Start the onboarding
              </EventPanelButton>
            </OnboardingComponent>
            <Text>Select an event to update or delete it</Text>
            <Text>or you can create a new event</Text>
            <EventPanelButton onClick={() => setCreateEventModalOpen(true)}>
              <PlusIcon size={16} />
              Add a new bridge
            </EventPanelButton>
            <CreateEventModal
              isOpen={createEventModalOpen}
              onOpenChange={setCreateEventModalOpen}
            />
          </RightPanel>
        </PageContent>
      </PageContainer>
      <Toaster />
    </PrivateLayout>
  );
};

export const BridgePage = memo(Bridge);
