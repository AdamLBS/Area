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
import { Loader, Plus, Settings } from 'lucide-react';
import { H3 } from '../Text';
import { EventCard } from '../EventCard';
import {
  IconDiscord,
  IconGithub,
  IconGoogle,
  IconLinkedin,
  IconSpotify,
  IconTwitch,
} from '../../icons';
import { EventActivation } from '../EventActivation';
import { useEvent } from '@/react/hooks/events';

type Provider =
  | 'spotify'
  | 'discord'
  | 'google'
  | 'github'
  | 'linkedin'
  | 'twitch'
  | 'null';

const providerIcon = {
  spotify: <IconSpotify />,
  discord: <IconDiscord />,
  google: <IconGoogle />,
  github: <IconGithub />,
  linkedin: <IconLinkedin />,
  twitch: <IconTwitch />,
  null: <Loader />,
};
import { EventSettingsModal } from '../EventSettingsModal';

export type EventContentProps = {
  eventUuid: string;
};

const EventContentComponent: React.FC<EventContentProps> = ({ eventUuid }) => {
  const { data: event } = useEvent(eventUuid);
  const [open, setOpen] = React.useState(false);

  return (
    <Card>
      <CardHeader>
        <CardTitle>{event?.name}</CardTitle>
        <CardDescription>{event?.description}</CardDescription>
      </CardHeader>
      <Container>
        <Header>
          <HeaderPart>
            <Button variant="outline" onClick={() => setOpen(true)}>
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </Button>
            <EventActivation
              activated={event?.active || true}
              eventUuid={eventUuid}
            />
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
              title={event?.triggerInteraction.provider}
              description={event?.triggerInteraction.name}
              icon={
                providerIcon[
                  (event?.triggerInteraction.provider || 'null') as Provider
                ]
              }
            />
            <BreakLine />
          </EventPartContent>
        </EventPart>
        <EventPart>
          <H3>Action</H3>
          <EventPartContent>
            <EventCard
              title={event?.responseInteraction.provider}
              description={event?.responseInteraction.name}
              icon={
                providerIcon[
                  (event?.responseInteraction.provider || 'null') as Provider
                ]
              }
            />
            <BreakLine />
          </EventPartContent>
        </EventPart>
        <AddButton variant="secondary">
          <Plus className="mr-2 h-4 w-4" />
          Add a new action event
        </AddButton>
      </Container>
      <EventSettingsModal
        isOpen={open}
        setOpen={setOpen}
        name={event?.name}
        description={event?.description}
        eventUuid={eventUuid}
      />
    </Card>
  );
};

export const EventContent = memo(EventContentComponent);
