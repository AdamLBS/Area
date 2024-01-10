import React, { memo, useCallback, useMemo } from 'react';
import {
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  Button,
  DialogClose,
} from '@/components/ui';
import { useTriggers } from '@/react/hooks/events';
import {
  EventContainer,
  SelectContainer,
  SelectHeader,
} from './SetTriggerModal.style';
import { H4, PrimaryMutted } from '../Text';
import { CustomSelect } from '../CustomSelect';
import { ApiInteraction, Fields, Trigger } from '@/api/constants';
import { UpdateEventParamsModal } from '../UpdateEventParamsModal';
import { useConnectedServices } from '@/functions/connectedServices';
import { useTriggerVariablesState } from '@/context/TriggerContext';

export type DeleteEventModalProps = {
  onConfirm: (trigger: Trigger) => void;
};

const SetTriggerModalComponent: React.FC<DeleteEventModalProps> = ({
  onConfirm,
}) => {
  const { data: triggers } = useTriggers();
  const [service, setService] = React.useState<string>();
  const [interaction, setInteraction] = React.useState<ApiInteraction>();
  const [step, setStep] = React.useState(0);
  const { updateTriggerVariablesState } = useTriggerVariablesState();

  const services = useMemo(() => {
    return triggers?.map((trigger) => trigger.provider);
  }, [triggers]);
  const interactions = useMemo(() => {
    return triggers
      ?.find((trigger) => trigger.provider === service)
      ?.interactions.map((interaction) => interaction.name);
  }, [triggers, service]);

  const connectedServices = useConnectedServices(services);

  const onChangeInteraction = useCallback(
    (value: string) => {
      setInteraction(
        triggers
          ?.find((trigger) => trigger.provider === service)
          ?.interactions.find((interaction) => interaction.name === value),
      );
    },
    [triggers, service, setInteraction],
  );

  const onContinue = useCallback(() => {
    setStep(1);
  }, [setStep]);

  const onAddTrigger = useCallback(
    (newFields: Fields[]) => {
      if (!interaction || !service) {
        return;
      }
      updateTriggerVariablesState({
        variables:
          triggers
            ?.find((trigger) => trigger.provider === service)
            ?.interactions.find(
              (interaction) => interaction.name === interaction.name,
            )?.variables || {},
      });
      onConfirm({
        trigger_provider: service?.toLowerCase(),
        triggerInteraction: {
          id: interaction.id,
          fields: newFields,
        },
      });
    },
    [interaction, onConfirm],
  );

  return (
    <>
      {step === 0 && (
        <>
          <DialogHeader>
            <DialogTitle>Create a new event</DialogTitle>
            <DialogDescription>Add your trigger event</DialogDescription>
          </DialogHeader>
          <EventContainer>
            <SelectContainer>
              <SelectHeader>
                <H4>Service</H4>
                <PrimaryMutted>
                  The trigger service starting the event
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
                  The trigger interaction of the trigger service that is checked
                  to start the event
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
              <Button disabled={!interaction} onClick={() => onAddTrigger([])}>
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
          onConfirm={onAddTrigger}
        />
      )}
    </>
  );
};

export const SetTriggerModal = memo(SetTriggerModalComponent);
