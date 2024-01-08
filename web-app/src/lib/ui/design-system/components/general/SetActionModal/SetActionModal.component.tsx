import React, { memo, useCallback, useMemo } from 'react';
import {
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  Button,
  DialogClose,
} from '@/components/ui';
import { useResponses } from '@/react/hooks/events';
import {
  EventContainer,
  SelectContainer,
  SelectHeader,
} from './SetActionModal.style';
import { H4, PrimaryMutted } from '../Text';
import { CustomSelect } from '../CustomSelect';
import { ApiEvent, Fields } from '@/api/constants';
import { UpdateEventParamsModal } from '../UpdateEventParamsModal';

export type DeleteEventModalProps = {
  onConfirm: (response: ApiEvent) => void;
};

const SetActionModalComponent: React.FC<DeleteEventModalProps> = ({
  onConfirm,
}) => {
  const { data: responses } = useResponses();
  const [service, setService] = React.useState<string>();
  const [interaction, setInteraction] = React.useState<ApiEvent>();
  const [step, setStep] = React.useState(0);

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

  const onContinue = useCallback(() => {
    setStep(1);
  }, [setStep]);

  const onAddResponse = useCallback(
    (newFields: Fields[]) => {
      if (!interaction) {
        return;
      }
      onConfirm({
        id: interaction.id,
        provider: interaction.provider.toLowerCase(),
        name: interaction.name,
        fields: newFields,
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
            <DialogDescription>Add your response event</DialogDescription>
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
              <Button disabled={!interaction} onClick={() => onAddResponse([])}>
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
          onConfirm={onAddResponse}
        />
      )}
    </>
  );
};

export const SetActionModal = memo(SetActionModalComponent);
