import {
  Button,
  CardDescription,
  CardTitle,
  Toaster,
  useToast,
} from '@/components/ui';
import React, { memo, useCallback, useEffect } from 'react';
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
import { AlarmClock, Loader, Plus, Settings } from 'lucide-react';
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
import { useEvent, useResponses, useTriggers } from '@/react/hooks/events';

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
  timer: <AlarmClock />,
  null: <Loader />,
};
import { EventSettingsModal } from '../EventSettingsModal';
import { DeleteEventModal } from '../DeleteEventModal';
import { DeleteActionModal } from '../DeleteActionModal';
import { useTriggerVariablesState } from '@/context/TriggerContext';
import { EventSelectModal } from '../EventSelectModal';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  addEventAction,
  updateActionEvent,
  updateAdditionalAction,
  updateTriggerEvent,
} from '@/api/events';

export type EventContentProps = {
  eventUuid: string;
};

const EventContentComponent: React.FC<EventContentProps> = ({ eventUuid }) => {
  const { data: event } = useEvent(eventUuid);
  const { toast } = useToast();
  const queryClient = useQueryClient();
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
  const [UpdateAdditionalActionModalOpen, setUpdateAdditionalActionModalOpen] =
    React.useState(false);
  const [updateAdditionalActionIndex, setUpdateAdditionalActionIndex] =
    React.useState(-1);
  const { updateTriggerVariablesState } = useTriggerVariablesState();
  const { data: triggers } = useTriggers();
  const { data: responses } = useResponses();

  const onDeleteAction = useCallback(
    (index: number) => {
      setDeleteActionIndex(index);
      setDeleteActionModalOpen(true);
    },
    [setDeleteActionModalOpen, setDeleteActionIndex],
  );

  const onUpdateAdditionalAction = useCallback(
    (index: number) => {
      setUpdateAdditionalActionIndex(index);
      setUpdateAdditionalActionModalOpen(true);
    },
    [setUpdateAdditionalActionIndex, setUpdateAdditionalActionModalOpen],
  );

  useEffect(() => {
    updateTriggerVariablesState({
      variables:
        triggers
          ?.find(
            (trigger) =>
              trigger.provider.toLowerCase() ===
              event?.triggerInteraction.provider,
          )
          ?.interactions.find(
            (interaction) => interaction.name === interaction.name,
          )?.variables || {},
    });
  }, [event]);

  const updateTriggerEventMutation = useMutation({
    mutationFn: updateTriggerEvent,
    onSuccess: () => {
      toast({
        title: 'Event action added',
        description: 'The event action has been added',
        variant: 'default',
      });
      queryClient.invalidateQueries({ queryKey: ['event', eventUuid] });
      setUpdateTriggerEventModalOpen(false);
    },
    onError: () => {
      toast({
        title: 'Uh oh! Something went wrong.',
        description: 'An error occurred while adding the event action.',
        variant: 'destructive',
      });
    },
  });

  const updateActionEventMutation = useMutation({
    mutationFn: updateActionEvent,
    onSuccess: () => {
      toast({
        title: 'Event action added',
        description: 'The event action has been added',
        variant: 'default',
      });
      queryClient.invalidateQueries({ queryKey: ['event', eventUuid] });
      setUpdateActionEventModalOpen(false);
    },
    onError: () => {
      toast({
        title: 'Uh oh! Something went wrong.',
        description: 'An error occurred while adding the event action.',
        variant: 'destructive',
      });
    },
  });

  const updateAdditionalActionMutation = useMutation({
    mutationFn: updateAdditionalAction,
    onSuccess: () => {
      toast({
        title: 'Action updated',
        description: 'The additional action has been upated.',
        variant: 'default',
      });
      queryClient.invalidateQueries({ queryKey: ['event', eventUuid] });
      setUpdateAdditionalActionModalOpen(false);
    },
    onError: () => {
      toast({
        title: 'Uh oh! Something went wrong.',
        description: 'An error occurred while updating the additional action.',
        variant: 'destructive',
      });
    },
  });

  const addEventActionMutation = useMutation({
    mutationFn: addEventAction,
    onSuccess: () => {
      toast({
        title: 'Event action added',
        description: 'The event action has been added',
        variant: 'default',
      });
      queryClient.invalidateQueries({ queryKey: ['event', eventUuid] });
      setAddEventActionModalOpen(false);
    },
    onError: () => {
      toast({
        title: 'Uh oh! Something went wrong.',
        description: 'An error occurred while adding the event action.',
        variant: 'destructive',
      });
    },
  });

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
                onClick={() => onUpdateAdditionalAction(index)}
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
      <DeleteActionModal
        isOpen={deleteActionModalOpen}
        onOpenChange={setDeleteActionModalOpen}
        eventUuid={eventUuid}
        index={deleteActionIndex}
      />
      <EventSelectModal
        title="Add an action event"
        description="Add an action event in response to the trigger event"
        type="additional"
        datas={responses}
        eventUuid={eventUuid}
        isOpen={AddEventActionModalOpen}
        onOpenChange={setAddEventActionModalOpen}
        mutation={addEventActionMutation}
      />
      <EventSelectModal
        title="Update your event"
        description="Update your trigger event"
        type="trigger"
        datas={triggers}
        eventUuid={eventUuid}
        isOpen={updateTriggerEventModalOpen}
        onOpenChange={setUpdateTriggerEventModalOpen}
        mutation={updateTriggerEventMutation}
      />
      <EventSelectModal
        title="Update your event"
        description="Update your action event"
        type="response"
        datas={responses}
        eventUuid={eventUuid}
        isOpen={updateActionEventModalOpen}
        onOpenChange={setUpdateActionEventModalOpen}
        mutation={updateActionEventMutation}
      />
      <EventSelectModal
        title="Update your event"
        description="Update your additional action"
        type="additional"
        additionalActionIndex={updateAdditionalActionIndex}
        datas={responses}
        eventUuid={eventUuid}
        isOpen={UpdateAdditionalActionModalOpen}
        onOpenChange={setUpdateAdditionalActionModalOpen}
        mutation={updateAdditionalActionMutation}
      />
      <Toaster />
    </Card>
  );
};

export const EventContent = memo(EventContentComponent);
