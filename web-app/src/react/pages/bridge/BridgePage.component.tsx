'use client';
import { Toaster, useToast } from '@/components/ui';
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
import { startOnboarding } from '@/api/user';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useOnboarginStatus } from '@/react/hooks/user';

const Bridge: React.FC = () => {
  const [createEventModalOpen, setCreateEventModalOpen] = React.useState(false);
  const queryClient = useQueryClient();
  const { data: status } = useOnboarginStatus();
  const { toast } = useToast();

  const start = useMutation({
    mutationFn: startOnboarding,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['onboarding'] });
    },
    onError: () => {
      toast({
        title: 'Error',
        description: 'An error occurred while starting the onboarding.',
        variant: 'destructive',
      });
    },
  });

  return (
    <PrivateLayout pageName="Bridge" icon={<Boxes />}>
      <PageContainer>
        <PageContent>
          <MenuEvent />
          <RightPanel>
            {status && !status?.step && (
              <OnboardingComponent>
                <Text>You seem to be new here,</Text>
                <Text>what if we introduce you to Stratos?</Text>
                <EventPanelButton onClick={() => start.mutate()}>
                  Start the onboarding
                </EventPanelButton>
              </OnboardingComponent>
            )}
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
