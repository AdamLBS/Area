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
import { useResponses } from '@/react/hooks/events';
import {
  EventContainer,
  SelectContainer,
  SelectHeader,
} from './AddEventActionModal.style';
import { H4, PrimaryMutted } from '../Text';
import { CustomSelect } from '../CustomSelect';
import { ApiEvent } from '@/api/constants';

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

  const onAddEventAction = useCallback(() => {
    // TODO: Call API to add event action
    // eslint-disable-next-line no-console
    console.log(eventUuid, interaction);
  }, [interaction]);

  const onContinue = useCallback(() => {
    // TODO: Show modal to update event action params
    // eslint-disable-next-line no-console
    console.log(eventUuid, interaction);
  }, [interaction]);

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
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
            />
          </SelectContainer>
          <SelectContainer>
            <SelectHeader>
              <H4>Interaction</H4>
              <PrimaryMutted>
                The action interaction of the action service in response to the
                trigger event
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
            <Button disabled={!interaction} onClick={onAddEventAction}>
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
      </DialogContent>
    </Dialog>
  );
};

export const AddEventActionModal = memo(AddEventActionModalComponent);
