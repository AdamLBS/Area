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
} from '@/components/ui';
import {
  EventContainer,
  SelectContainer,
  SelectHeader,
} from './EventSelectModal.style';
import { H4, PrimaryMutted } from '../Text';
import { CustomSelect } from '../CustomSelect';
import { ApiEvent, ApiInteraction, Fields } from '@/api/constants';
import { UpdateEventParamsModal } from '../UpdateEventParamsModal';
import { UseMutationResult } from '@tanstack/react-query';
import { useConnectedServices } from '@/functions/connectedServices';

export type DeleteEventModalProps = {
  title: string;
  description: string;
  type: 'trigger' | 'response' | 'additional';
  additionalActionIndex?: number;
  datas?: ApiEvent[];
  eventUuid: string;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  variables?: Record<string, string>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  mutation: UseMutationResult<any, any, any, any>;
};

const EventSelectModalComponent: React.FC<DeleteEventModalProps> = ({
  title,
  description,
  type,
  additionalActionIndex,
  datas,
  eventUuid,
  isOpen,
  onOpenChange,
  variables,
  mutation,
}) => {
  const [service, setService] = React.useState<string>();
  const [interaction, setInteraction] = React.useState<ApiInteraction>();
  const [step, setStep] = React.useState(0);

  const services = useMemo(() => {
    return datas?.map((data) => data.provider);
  }, [datas]);
  const interactions = useMemo(() => {
    return datas
      ?.find((data) => data.provider === service)
      ?.interactions.map((interaction) => interaction.name);
  }, [datas, service]);
  const onChangeInteraction = useCallback(
    (value: string) => {
      setInteraction(
        datas
          ?.find((data) => data.provider === service)
          ?.interactions.find((interaction) => interaction.name === value),
      );
    },
    [datas, service, setInteraction],
  );

  const connectedServices = useConnectedServices(services);

  const onContinue = useCallback(() => {
    setStep(1);
  }, [setStep]);

  const onAddEventAction = useCallback(
    (newFields: Fields[]) => {
      if (!interaction || !service) {
        return;
      }
      if (type === 'trigger') {
        mutation.mutate({
          eventUuid,
          trigger_provider: service.toLowerCase(),
          id: interaction.id,
          fields: newFields,
        });
      } else if (type === 'response') {
        mutation.mutate({
          eventUuid,
          response_provider: service.toLowerCase(),
          id: interaction.id,
          fields: newFields,
        });
      } else if (type === 'additional' && additionalActionIndex) {
        mutation.mutate({
          eventUuid,
          action_provider: service.toLowerCase(),
          id: interaction.id,
          index: additionalActionIndex,
          fields: newFields,
        });
      } else {
        mutation.mutate({
          eventUuid,
          action_provider: service.toLowerCase(),
          id: interaction.id,
          fiedls: newFields,
        });
      }
    },
    [mutation, eventUuid, interaction],
  );

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        {step === 0 && (
          <>
            <DialogHeader>
              <DialogTitle>{title}</DialogTitle>
              <DialogDescription>{description}</DialogDescription>
            </DialogHeader>
            <EventContainer>
              <SelectContainer>
                <SelectHeader>
                  <H4>Service</H4>
                  <PrimaryMutted>
                    The data service starting the event
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
                    The data interaction of the data service that is checked to
                    start the event
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
            variables={variables || {}}
          />
        )}
      </DialogContent>
    </Dialog>
  );
};

export const EventSelectModal = memo(EventSelectModalComponent);
