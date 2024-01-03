'use client';
import React, { memo, useCallback, useState } from 'react';
import { SwitchContainer } from './EventActivation.style';
import { Switch } from '@/components/ui';
import { PrimarySmall } from '@/lib/ui/design-system';
import { activateEvent } from '@/api/events';
import { toast } from '@/components/ui/use-toast';
import { useMutation, useQueryClient } from '@tanstack/react-query';

type ActivationProps = {
  activated: boolean;
  eventUuid: string;
};

const Activation = ({ activated, eventUuid }: ActivationProps) => {
  const queryClient = useQueryClient();
  const activateEventMutation = useMutation({
    mutationFn: activateEvent,
    onSuccess: () => {
      const message = activated ? 'activated' : 'desactivated';
      toast({
        title: 'Success!',
        description: 'Your event has been ' + message + '.',
      });
      queryClient.invalidateQueries({ queryKey: ['event'] });
    },
    onError: (error) => {
      toast({
        variant: 'destructive',
        title: 'Uh oh! Something went wrong.',
        description: error.message,
      });
    },
  });

  const handleSwitcher = useCallback((value: boolean) => {
    activateEventMutation.mutate({ uuid: eventUuid, activated: value });
  }, []);

  return (
    <SwitchContainer>
      <PrimarySmall>Active</PrimarySmall>
      <Switch checked={activated} onCheckedChange={handleSwitcher} />
    </SwitchContainer>
  );
};

export const EventActivation = memo(Activation);
