import React, { memo, useCallback, useMemo } from 'react';
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  Dialog,
  Button,
  DialogClose,
  useToast,
} from '@/components/ui';
import { useResponses } from '@/react/hooks/events';
import {
  EventContainer,
  SelectContainer,
  SelectHeader,
} from './UpdateAdditionalActionModal.style';
import { H4, PrimaryMutted } from '../Text';
import { CustomSelect } from '../CustomSelect';
import { ApiInteraction, Fields } from '@/api/constants';
import { UpdateEventParamsModal } from '../UpdateEventParamsModal';
import { updateAdditionalAction } from '@/api/events';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useConnectedServices } from '@/functions/connectedServices';

export type DeleteEventModalProps = {
  eventUuid: string;
  index: number;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
};

const UpdateAdditionalActionModalComponent: React.FC<DeleteEventModalProps> = ({
  eventUuid,
  index,
  isOpen,
  onOpenChange,
}) => {
  const { data: responses } = useResponses();
  const [service, setService] = React.useState<string>();
  const [interaction, setInteraction] = React.useState<ApiInteraction>();
  const [step, setStep] = React.useState(0);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const services = useMemo(() => {
    return responses?.map((response) => response.provider);
  }, [responses]);
  const interactions = useMemo(() => {
    return responses
      ?.find((response) => response.provider === service)
      ?.interactions.map((interaction) => interaction.name);
  }, [responses, service]);

  const connectedServices = useConnectedServices(services);

  const onChangeInteraction = useCallback(
    (value: string) => {
      setInteraction(
        responses
          ?.find((response) => response.provider === service)
          ?.interactions.find((interaction) => interaction.name === value),
      );
    },
    [responses, service, setInteraction],
  );

  const updateAdditionalActionMutation = useMutation({
    mutationFn: updateAdditionalAction,
    onSuccess: () => {
      toast({
        title: 'Action updated',
        description: 'The additional action has been upated.',
        variant: 'default',
      });
      queryClient.invalidateQueries({ queryKey: ['event', eventUuid] });
      onOpenChange(false);
      setStep(0);
      setService(undefined);
      setInteraction(undefined);
    },
    onError: () => {
      toast({
        title: 'Uh oh! Something went wrong.',
        description: 'An error occurred while updating the additional action.',
        variant: 'destructive',
      });
    },
  });

  const onContinue = useCallback(() => {
    setStep(1);
  }, [setStep]);

  const onAddEventAction = useCallback(
    (newFields: Fields[]) => {
      if (!interaction || !service) {
        return;
      }
      updateAdditionalActionMutation.mutate({
        eventUuid,
        action_provider: service.toLowerCase(),
        id: interaction.id,
        index: index,
        fields: newFields,
      });
    },
    [updateAdditionalActionMutation, eventUuid, interaction],
  );

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        {step === 0 && (
          <>
            <DialogHeader>
              <DialogTitle>Update your event</DialogTitle>
              <DialogDescription>
                Update your additional action
              </DialogDescription>
            </DialogHeader>
            <EventContainer>
              <SelectContainer>
                <SelectHeader>
                  <H4>Service</H4>
                  <PrimaryMutted>
                    The action service in response to the trigger event
                  </PrimaryMutted>
                </SelectHeader>
                <CustomSelect
                  value="Service"
                  values={services}
                  onChange={setService}
                  disabled={connectedServices}
                />
              </SelectContainer>
              <SelectContainer>
                <SelectHeader>
                  <H4>Interaction</H4>
                  <PrimaryMutted>
                    The action interaction of the action service in response to
                    the trigger event
                  </PrimaryMutted>
                </SelectHeader>
                <CustomSelect
                  value="Interaction"
                  values={interactions}
                  onChange={onChangeInteraction}
                />
              </SelectContainer>
            </EventContainer>
            <DialogFooter>
              {interaction && interaction?.fields.length === 0 ? (
                <Button
                  disabled={!interaction}
                  onClick={() => onAddEventAction([])}
                >
                  Add
                </Button>
              ) : (
                <Button disabled={!interaction} onClick={onContinue}>
                  Continue
                </Button>
              )}
              <DialogClose asChild>
                <Button type="button" variant="outline">
                  Cancel
                </Button>
              </DialogClose>
            </DialogFooter>
          </>
        )}
        {step === 1 && (
          <UpdateEventParamsModal
            fields={interaction?.fields || []}
            onCancel={() => setStep(0)}
            onConfirm={onAddEventAction}
            // variables={interaction?.variables || {}}
          />
        )}
      </DialogContent>
    </Dialog>
  );
};

export const UpdateAdditionalActionModal = memo(
  UpdateAdditionalActionModalComponent,
);
