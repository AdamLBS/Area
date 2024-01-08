import {
  Button,
  Dialog,
  DialogClose,
  DialogDescription,
  DialogFooter,
  DialogTitle,
  Input,
  Label,
  useToast,
} from '@/components/ui';
import React, { memo, useCallback, useState } from 'react';
import { Header, LabelContent, Modal, Page } from './CreateEventModal.style';
import { ApiEvent, Trigger } from '@/api/constants';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createEvent } from '@/api/events';
import { SetTriggerModal } from '../SetTriggerModal';
import { SetActionModal } from '../SetActionModal';

export type CreateEventModalProps = {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
};

const CreateEventModalComponent: React.FC<CreateEventModalProps> = ({
  isOpen,
  onOpenChange,
}) => {
  const [state, setState] = useState<number>(1);
  const [eventName, setEventName] = useState<string>('');
  const [eventDescription, setEventDescription] = useState<string>('');
  const [trigger, setTrigger] = useState<Trigger>();
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const addState = () => {
    if (state === 1 && eventName === '') {
      return;
    }
    setState((prevState) => prevState + 1);
  };

  const onCreateTrigger = useCallback(
    (newTrigger: Trigger) => {
      setTrigger(newTrigger);
      setState(3);
    },
    [setTrigger, setState],
  );

  const createEventMutation = useMutation({
    mutationFn: createEvent,
    onSuccess: () => {
      toast({
        title: 'Event created',
        description: 'The event has been created',
        variant: 'default',
      });
      queryClient.invalidateQueries({ queryKey: ['events'] });
      onOpenChange(false);
      setState(1);
    },
    onError: () => {
      toast({
        title: 'Event creation failed',
        description: 'The event could not be created',
        variant: 'default',
      });
    },
  });

  const handleEvent = useCallback(
    (action: ApiEvent) => {
      if (!trigger || !action) {
        return;
      }
      createEventMutation.mutate({
        name: eventName,
        description: eventDescription,
        trigger_provider: trigger.trigger_provider.toLowerCase(),
        triggerInteraction: trigger.triggerInteraction,
        response_provider: action.provider.toLowerCase(),
        responseInteraction: action,
      });
    },
    [trigger, eventName, eventDescription, createEventMutation],
  );

  const onCreateAction = useCallback(
    (newAction: ApiEvent) => {
      handleEvent(newAction);
    },
    [handleEvent],
  );

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <Modal>
        {state === 1 && (
          <>
            <Header>
              <DialogTitle>Create a new event</DialogTitle>
              <DialogDescription>
                Let’s start to create a new event (* required)
              </DialogDescription>
            </Header>
            <Page>
              <LabelContent>
                <Label>Event name*</Label>
                <Input
                  id="event-name"
                  placeholder="Event name"
                  value={eventName}
                  onChange={(e) => setEventName(e.target.value)}
                />
              </LabelContent>
              <LabelContent>
                <Label>Event description</Label>
                <Input
                  placeholder="Event description"
                  value={eventDescription}
                  onChange={(e) => setEventDescription(e.target.value)}
                />
              </LabelContent>
              <DialogFooter>
                <Button onClick={addState}>Continue</Button>
                <DialogClose asChild>
                  <Button type="button" variant="secondary">
                    Cancel
                  </Button>
                </DialogClose>
              </DialogFooter>
            </Page>
          </>
        )}
        {state === 2 && <SetTriggerModal onConfirm={onCreateTrigger} />}
        {state === 3 && <SetActionModal onConfirm={onCreateAction} />}
      </Modal>
    </Dialog>
  );
};

export const CreateEventModal = memo(CreateEventModalComponent);
