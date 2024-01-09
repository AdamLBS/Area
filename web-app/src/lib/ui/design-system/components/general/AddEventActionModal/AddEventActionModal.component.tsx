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
} from './AddEventActionModal.style';
import { H4, PrimaryMutted } from '../Text';
import { CustomSelect } from '../CustomSelect';
import { ApiEvent, Fields } from '@/api/constants';
import { UpdateEventParamsModal } from '../UpdateEventParamsModal';
import { addEventAction } from '@/api/events';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { getConnectedServices } from '@/functions/connectedServices';

export type DeleteEventModalProps = {
  eventUuid: string;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
};

const AddEventActionModalComponent: React.FC<DeleteEventModalProps> = ({
  eventUuid,
  isOpen,
  onOpenChange,
}) => {
  const { data: responses } = useResponses();
  const [service, setService] = React.useState<string>();
  const [interaction, setInteraction] = React.useState<ApiEvent>();
  const [step, setStep] = React.useState(0);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const services = useMemo(() => {
    return responses?.map((response) => response.provider);
  }, [responses]);
  const interactions = useMemo(() => {
    return responses
      ?.filter((response) => response.provider === service)
      .map((response) => response.name);
  }, [responses, service]);

  const onChangeInteraction = useCallback(
    (value: string) => {
      setInteraction(
        responses?.find(
          (response) =>
            response.provider === service && response.name === value,
        ),
      );
    },
    [responses, service, setInteraction],
  );

  const addEventActionMutation = useMutation({
    mutationFn: addEventAction,
    onSuccess: () => {
      toast({
        title: 'Event action added',
        description: 'The event action has been added',
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
        description: 'An error occurred while adding the event action.',
        variant: 'destructive',
      });
    },
  });

  const onContinue = useCallback(() => {
    setStep(1);
  }, [setStep]);

  const onAddEventAction = useCallback(
    (newFields: Fields[]) => {
      if (!interaction) {
        return;
      }
      addEventActionMutation.mutate({
        eventUuid,
        action_provider: interaction.provider.toLowerCase(),
        id: interaction.id,
        fiedls: newFields,
      });
    },
    [addEventActionMutation, eventUuid, interaction],
  );

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        {step === 0 && (
          <>
            <DialogHeader>
              <DialogTitle>Add an action event</DialogTitle>
              <DialogDescription>
                Add an action event in response to the trigger event
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
                  disabled={getConnectedServices(services)}
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
          />
        )}
      </DialogContent>
    </Dialog>
  );
};

export const AddEventActionModal = memo(AddEventActionModalComponent);
