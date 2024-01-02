import { Button, CardDescription, CardTitle } from '@/components/ui';
import React, { memo } from 'react';
import {
  AddButton,
  BreakLine,
  Card,
  CardHeader,
  Container,
  EventPart,
  EventPartContent,
  Header,
  HeaderPart,
} from './EventContent.style';
import { Plus, Settings } from 'lucide-react';
import { H3 } from '../Text';
import { EventCard } from '../EventCard';
import { IconDiscord, IconSpotify } from '../../icons';
import { EventActivation } from '../EventActivation';

export type EventContentProps = {
  eventUuid: string;
};

const EventContentComponent: React.FC<EventContentProps> = ({ eventUuid }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Your event title</CardTitle>
        <CardDescription>Your event description</CardDescription>
      </CardHeader>
      <Container>
        <Header>
          <HeaderPart>
            <Button variant="outline">
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </Button>
            <EventActivation activated={true} eventUuid={eventUuid} />
          </HeaderPart>
          <HeaderPart>
            <Button>Save</Button>
            <Button variant="outline" disabled>
              Reset
            </Button>
          </HeaderPart>
        </Header>
        <EventPart>
          <H3>Trigger</H3>
          <EventPartContent>
            <EventCard
              title="Spotify"
              description="Listening a music"
              icon={<IconSpotify />}
            />
            <BreakLine />
          </EventPartContent>
        </EventPart>
        <EventPart>
          <H3>Action</H3>
          <EventPartContent>
            <EventCard
              title="Discord"
              description="Send a message"
              icon={<IconDiscord />}
            />
            <BreakLine />
          </EventPartContent>
        </EventPart>
        <AddButton variant="secondary">
          <Plus className="mr-2 h-4 w-4" />
          Add a new action event
        </AddButton>
      </Container>
    </Card>
  );
};

export const EventContent = memo(EventContentComponent);
