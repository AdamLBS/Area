'use client';
import React, { memo, useCallback, useState } from 'react';
import { SwitchContainer } from './EventActivation.style';
import { Switch } from '@/components/ui';
import { PrimarySmall } from '@/lib/ui/design-system';
import { activateEvent } from '@/api/events';
import { toast } from '@/components/ui/use-toast';
import { useMutation } from '@tanstack/react-query';

type ActivationProps = {
  activated: boolean;
  eventUuid: string;
};

const Activation = ({ activated, eventUuid }: ActivationProps) => {
  const [eventActive, setEventActive] = useState<boolean>(activated);

  const handleSwitcher = useCallback(
    (value: boolean) => {
      setEventActive(value);
      activateEventMutation.mutate({ uuid: eventUuid, activated: value });
    },
    [eventActive],
  );

  const activateEventMutation = useMutation({
    mutationFn: activateEvent,
    onSuccess: () => {
      const message = eventActive ? 'activated' : 'desactivated';
      toast({
        title: 'Event successfully activated',
        description: 'Your event has been ' + message,
      });
    },
    onError: (error) => {
      toast({
        variant: 'destructive',
        title: 'Uh oh! Something went wrong.',
        description: error.message,
      });
    },
  });

  return (
    <SwitchContainer>
      <PrimarySmall>Active</PrimarySmall>
      <Switch checked={eventActive} onCheckedChange={handleSwitcher} />
    </SwitchContainer>
  );
};

export const EventActivation = memo(Activation);
