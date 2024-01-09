'use client';
import React, { memo } from 'react';
import {
  EventButton,
  CardHeader,
  EventPanel,
  EventPanelContent,
  LogoRight,
  LogoLeft,
  Footer,
  EventPanelButton,
} from './MenuEvent.style';
import { CreateEventModal } from '@/lib/ui/design-system';
import { useRouter } from 'next/navigation';
import { useEvents } from '@/react/hooks/events';
import { PlusIcon } from 'lucide-react';
import { CardDescription, CardTitle } from '@/components/ui';

export type EventsProps = {
  currentUuid?: string;
};

const MenuEventComponent: React.FC<EventsProps> = ({ currentUuid }) => {
  const router = useRouter();
  const { data: events } = useEvents();
  const [createEventModalOpen, setCreateEventModalOpen] = React.useState(false);

  const handleRedirection = (uuid: string) => {
    router.push('/bridge/' + uuid);
  };

  return (
    <EventPanel>
      <CardHeader>
        <CardTitle>Your events</CardTitle>
        <CardDescription>
          All of your events you have already created
        </CardDescription>
      </CardHeader>
      <EventPanelContent>
        {events &&
          events.map((event, index) => {
            return (
              <EventButton
                key={index}
                variant="ghost"
                style={{ justifyContent: 'flex-start' }}
                active={event.uuid === currentUuid}
                onClick={() => handleRedirection(event.uuid)}
              >
                {event.active ? <LogoRight /> : <LogoLeft />}
                {event.name}
              </EventButton>
            );
          })}
      </EventPanelContent>
      <Footer>
        <EventPanelButton onClick={() => setCreateEventModalOpen(true)}>
          <PlusIcon size={16} />
          Add a new event
        </EventPanelButton>
      </Footer>
      <CreateEventModal
        isOpen={createEventModalOpen}
        onOpenChange={setCreateEventModalOpen}
      />
    </EventPanel>
  );
};

export const MenuEvent = memo(MenuEventComponent);
