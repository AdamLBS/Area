'use client';
import React, { memo } from 'react';
import {
  EventButton,
  Header,
  EventPanel,
  EventPanelContent,
  LogoRight,
  LogoLeft,
  Footer,
} from './MenuEvent.style';
import { EventModal, H3, PrimaryMutted } from '@/lib/ui/design-system';
import { useRouter } from 'next/navigation';
import { useEvents } from '@/react/hooks/events';

export type EventsProps = {
  currentUuid?: string;
};

const MenuEventComponent: React.FC<EventsProps> = ({ currentUuid }) => {
  const router = useRouter();
  const { data: events } = useEvents();

  const handleRedirection = (uuid: string) => {
    router.push('/bridge/' + uuid);
  };

  return (
    <EventPanel>
      <Header>
        <H3>Your events</H3>
        <PrimaryMutted>
          All of your events you have already created
        </PrimaryMutted>
      </Header>
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
        <EventModal />
      </Footer>
    </EventPanel>
  );
};

export const MenuEvent = memo(MenuEventComponent);
