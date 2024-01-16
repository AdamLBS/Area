'use client';
import React, { memo } from 'react';
import {
  EventButton,
  EventPanel,
  EventPanelContent,
  LogoRight,
  LogoLeft,
  Footer,
  EventPanelButton,
  CardHeaderLight,
  CardHeaderDark,
} from './MenuEvent.style';
import { CreateEventModal } from '@/lib/ui/design-system';
import { useRouter } from 'next/navigation';
import { useEvents } from '@/react/hooks/events';
import { PlusIcon } from 'lucide-react';
import { CardDescription, CardTitle } from '@/components/ui';
import { useTheme } from 'next-themes';

export type EventsProps = {
  currentUuid?: string;
  hideCreateEvent?: boolean;
  page: string;
};

const MenuEventComponent: React.FC<EventsProps> = ({
  currentUuid,
  hideCreateEvent,
  page,
}) => {
  const router = useRouter();
  const { data: events } = useEvents();
  const [createEventModalOpen, setCreateEventModalOpen] = React.useState(false);
  const theme = useTheme();

  const handleRedirection = (uuid: string) => {
    router.push('/' + page + '/' + uuid);
  };

  return (
    <EventPanel>
      {theme.theme === 'light' ? (
        <CardHeaderLight>
          <CardTitle>Your bridges</CardTitle>
          <CardDescription>
            All created bridges are listed here.
          </CardDescription>
        </CardHeaderLight>
      ) : (
        <CardHeaderDark>
          <CardTitle>Your bridges</CardTitle>
          <CardDescription>
            All created bridges are listed here.
          </CardDescription>
        </CardHeaderDark>
      )}
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
      {!hideCreateEvent && (
        <Footer>
          <EventPanelButton onClick={() => setCreateEventModalOpen(true)}>
            <PlusIcon size={16} />
            Add a new event
          </EventPanelButton>
        </Footer>
      )}
      <CreateEventModal
        isOpen={createEventModalOpen}
        onOpenChange={setCreateEventModalOpen}
      />
    </EventPanel>
  );
};

export const MenuEvent = memo(MenuEventComponent);
