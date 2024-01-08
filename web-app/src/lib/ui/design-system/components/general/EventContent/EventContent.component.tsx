import { Button, CardDescription, CardTitle, Toaster } from '@/components/ui';
import React, { memo, useCallback } from 'react';
import {
  AddButton,
  AdditionnalActionsHeader,
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
import { DeleteEventModal } from '../DeleteEventModal';
import { AddEventActionModal } from '../AddEventActionModal';
import { DeleteActionModal } from '../DeleteActionModal';
import { UpdateTriggerEventModal } from '../UpdateTriggerEventModal';
import { UpdateActionEventModal } from '../UpdateActionEventModal';

export type EventContentProps = {
  eventUuid: string;
};

const EventContentComponent: React.FC<EventContentProps> = ({ eventUuid }) => {
  const { data: event } = useEvent(eventUuid);
  const [open, setOpen] = React.useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = React.useState(false);
  const [AddEventActionModalOpen, setAddEventActionModalOpen] =
    React.useState(false);
  const [deleteActionModalOpen, setDeleteActionModalOpen] =
    React.useState(false);
  const [deleteActionIndex, setDeleteActionIndex] = React.useState(-1);
  const [updateTriggerEventModalOpen, setUpdateTriggerEventModalOpen] =
    React.useState(false);
  const [updateActionEventModalOpen, setUpdateActionEventModalOpen] =
    React.useState(false);

  const onDeleteAction = useCallback(
    (index: number) => {
      setDeleteActionIndex(index);
      setDeleteActionModalOpen(true);
    },
    [setDeleteActionModalOpen, setDeleteActionIndex],
  );

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
              activated={event && event.active ? event.active : false}
              eventUuid={eventUuid}
            />
          </HeaderPart>
          <HeaderPart>
            <Button
              variant="destructive"
              onClick={() => setDeleteModalOpen(true)}
            >
              Delete
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
              onClick={() => setUpdateTriggerEventModalOpen(true)}
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
              onClick={() => setUpdateActionEventModalOpen(true)}
            />
            <BreakLine />
          </EventPartContent>
        </EventPart>
        {event?.additionalActions.map((action, index) => (
          <EventPart key={index}>
            <AdditionnalActionsHeader>
              <H3>Additional action</H3>
              <Button variant="outline" onClick={() => onDeleteAction(index)}>
                Delete
              </Button>
            </AdditionnalActionsHeader>
            <EventPartContent>
              <EventCard
                key={index}
                title={action.action_provider}
                description={action.name}
                icon={
                  providerIcon[(action.action_provider || 'null') as Provider]
                }
              />
              <BreakLine />
            </EventPartContent>
          </EventPart>
        ))}
        <AddButton
          variant="secondary"
          onClick={() => setAddEventActionModalOpen(true)}
        >
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
      <DeleteEventModal
        eventUuid={eventUuid}
        isOpen={deleteModalOpen}
        onOpenChange={setDeleteModalOpen}
      />
      <AddEventActionModal
        isOpen={AddEventActionModalOpen}
        onOpenChange={setAddEventActionModalOpen}
        eventUuid={eventUuid}
      />
      <DeleteActionModal
        isOpen={deleteActionModalOpen}
        onOpenChange={setDeleteActionModalOpen}
        eventUuid={eventUuid}
        index={deleteActionIndex}
      />
      <UpdateTriggerEventModal
        isOpen={updateTriggerEventModalOpen}
        onOpenChange={setUpdateTriggerEventModalOpen}
        eventUuid={eventUuid}
      />
      <UpdateActionEventModal
        isOpen={updateActionEventModalOpen}
        onOpenChange={setUpdateActionEventModalOpen}
        eventUuid={eventUuid}
      />
      <Toaster />
    </Card>
  );
};

export const EventContent = memo(EventContentComponent);
