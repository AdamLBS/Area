'use client';
import { CardFooter } from '@/components/ui';
import React, { memo, useEffect } from 'react';
import {
  EventButton,
  Header,
  EventPanel,
  EventPanelButton,
  EventPanelContent,
  ButtonText,
  LogoRight,
  LogoLeft,
} from './MenuEvent.style';
import { PlusIcon } from 'lucide-react';
import { H3, PrimaryMutted } from '@/lib/ui/design-system';
import { useRouter } from 'next/navigation';
import { useEvents } from '@/react/hooks/events';

const MenuEventComponent: React.FC = () => {
  const router = useRouter();
  const { data: events } = useEvents();

  const handleRedirection = (name: string) => {
    router.push('/bridge/' + name);
  };

  useEffect(() => {}, [events]);

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
          Object.keys(events).map((eventId) => {
            const { name, active } = events[eventId];
            return (
              <EventButton
                key={eventId}
                variant="ghost"
                style={{ justifyContent: 'flex-start' }}
                onClick={() => handleRedirection(name)}
              >
                {(active && <LogoRight />) || <LogoLeft />}
                <ButtonText>{name}</ButtonText>
              </EventButton>
            );
          })}
      </EventPanelContent>
      <CardFooter>
        <EventPanelButton>
          <PlusIcon size={16} />
          Add a new event
        </EventPanelButton>
      </CardFooter>
    </EventPanel>
  );
};

export const MenuEvent = memo(MenuEventComponent);
